/**
 * scripts/lib/ng-surface.mjs
 *
 * Shared core for the competitive-benchmark tooling. Parses the public API surface of any
 * Angular library from its shipped `.d.ts` declarations — works identically on a packed npm
 * package (PrimeNG, @angular/material) and on a local build output (dist/ui-lib-custom),
 * because ng-packager emits the same `ɵɵComponentDeclaration` / `ɵɵDirectiveDeclaration`
 * generic in every case.
 *
 * Extracted per declaration: selector(s), inputs, outputs, content-projection slots, template
 * slots (query names), public imperative methods, implemented interfaces (e.g.
 * ControlValueAccessor), and generic type params.
 *
 * Facts only — no verdicts. Consumed by extract-primeng-api.mjs and competitive-surfaces.mjs.
 */

import { execFileSync, execSync } from 'node:child_process';
import { mkdtempSync, readdirSync, readFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, relative } from 'node:path';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
/** @type {import('typescript')} */
const ts = require('typescript');

// npm version / dist-tag charset, plus the `@` and `/` needed for scoped specs like
// `@angular/material@19`. Anything outside this set is rejected before it reaches a shell.
const SAFE_SPEC = /^[@a-zA-Z0-9._~^/-]+$/;

/** Pack an npm package spec into a fresh temp dir and extract it. Returns `{ packageRoot, workDir }`. */
export function packPackage(spec) {
  if (!SAFE_SPEC.test(spec)) {
    throw new Error(`Refusing unsafe package spec: ${JSON.stringify(spec)}`);
  }
  const workDir = mkdtempSync(join(tmpdir(), 'ng-surface-'));
  process.stdout.write(`Packing ${spec} …\n`);
  // `npm` is a `.cmd` shim on Windows, which Node 24 refuses to spawn without a shell; the spec
  // is charset-validated above, so the interpolation into the shell command line is safe.
  const tarball = execSync(`npm pack ${spec} --silent`, { cwd: workDir, encoding: 'utf8' })
    .trim()
    .split('\n')
    .pop()
    .trim();
  execFileSync('tar', ['-xzf', tarball], { cwd: workDir });
  return { packageRoot: join(workDir, 'package'), workDir };
}

/** Read the `version` field from a package root's package.json (or `'local'` if absent). */
export function readPackageVersion(packageRoot) {
  try {
    return JSON.parse(readFileSync(join(packageRoot, 'package.json'), 'utf8')).version ?? 'unknown';
  } catch {
    return 'local';
  }
}

/** Recursively collect every `.d.ts` under a directory. */
function collectDtsFiles(dir, found = []) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      collectDtsFiles(full, found);
    } else if (entry.name.endsWith('.d.ts')) {
      found.push(full);
    }
  }
  return found;
}

/** Flatten a string-literal, union, or tuple of string literals into an array of strings. */
function readStringLiterals(typeNode) {
  if (!typeNode) return [];
  if (ts.isLiteralTypeNode(typeNode) && ts.isStringLiteral(typeNode.literal)) {
    return [typeNode.literal.text];
  }
  if (ts.isUnionTypeNode(typeNode)) {
    return typeNode.types.flatMap(readStringLiterals);
  }
  if (ts.isTupleTypeNode(typeNode)) {
    return typeNode.elements.flatMap(readStringLiterals);
  }
  return [];
}

/** Read the public binding names (object-literal keys) from an inputs/outputs map type node. */
function readBindingNames(typeNode) {
  if (!typeNode || !ts.isTypeLiteralNode(typeNode)) return [];
  return typeNode.members
    .filter(ts.isPropertySignature)
    .map((member) => {
      const name = member.name;
      if (ts.isStringLiteral(name) || ts.isIdentifier(name)) return name.text;
      return null;
    })
    .filter(Boolean);
}

// Framework methods that are not part of a component's consumer-facing imperative API.
const NON_API_METHODS = new Set([
  'ngOnInit',
  'ngOnChanges',
  'ngOnDestroy',
  'ngDoCheck',
  'ngAfterContentInit',
  'ngAfterContentChecked',
  'ngAfterViewInit',
  'ngAfterViewChecked',
  'writeValue',
  'registerOnChange',
  'registerOnTouched',
  'setDisabledState',
  'validate',
  'registerOnValidatorChange',
]);

/** Read public, consumer-callable method names declared directly on a class. */
function readPublicMethods(classNode) {
  return classNode.members
    .filter(ts.isMethodDeclaration)
    .filter((member) => {
      const modifiers = ts.getModifiers(member) ?? [];
      const isHidden = modifiers.some(
        (modifier) =>
          modifier.kind === ts.SyntaxKind.PrivateKeyword ||
          modifier.kind === ts.SyntaxKind.ProtectedKeyword ||
          modifier.kind === ts.SyntaxKind.StaticKeyword,
      );
      return !isHidden;
    })
    .map((member) => (member.name && ts.isIdentifier(member.name) ? member.name.text : null))
    .filter(
      (name) =>
        name && !name.startsWith('_') && !name.startsWith('ɵ') && !NON_API_METHODS.has(name),
    )
    .sort();
}

// Angular lifecycle interfaces carry no consumer-facing contract — drop them as noise.
const LIFECYCLE_INTERFACES = new Set([
  'OnInit',
  'OnChanges',
  'OnDestroy',
  'DoCheck',
  'AfterContentInit',
  'AfterContentChecked',
  'AfterViewInit',
  'AfterViewChecked',
]);

/** Read the names of meaningful interfaces a class implements (e.g. `ControlValueAccessor`). */
function readImplementsNames(classNode, sourceFile) {
  const clauses = classNode.heritageClauses ?? [];
  const implementsClause = clauses.find(
    (clause) => clause.token === ts.SyntaxKind.ImplementsKeyword,
  );
  if (!implementsClause) return [];
  return implementsClause.types
    .map((type) => type.expression.getText(sourceFile))
    .filter((name) => !LIFECYCLE_INTERFACES.has(name))
    .sort();
}

/** Read declared generic type-parameter names (e.g. `<T>` on a data component). */
function readTypeParams(classNode) {
  return (classNode.typeParameters ?? []).map((param) => param.name.text);
}

/**
 * Extract declarations from one `.d.ts` source. Looks for the static `ɵcmp` / `ɵdir`
 * members whose type is `ɵɵComponentDeclaration<…>` / `ɵɵDirectiveDeclaration<…>`.
 */
function extractFromSource(sourceFile) {
  const declarations = [];

  const visit = (node) => {
    if (ts.isClassDeclaration(node)) {
      const className = node.name ? node.name.text : '(anonymous)';
      for (const member of node.members) {
        if (!ts.isPropertyDeclaration(member) || !member.type) continue;
        if (!ts.isTypeReferenceNode(member.type)) continue;
        const refName = member.type.typeName.getText(sourceFile);
        const isComponent = refName.endsWith('ɵɵComponentDeclaration');
        const isDirective = refName.endsWith('ɵɵDirectiveDeclaration');
        if (!isComponent && !isDirective) continue;

        const typeArgs = member.type.typeArguments ?? [];
        // Generic shape:
        // <Type, Selector, ExportAs, Inputs, Outputs, Queries, NgContentSelectors, Standalone, …>
        declarations.push({
          className,
          kind: isComponent ? 'component' : 'directive',
          selectors: readStringLiterals(typeArgs[1]),
          inputs: readBindingNames(typeArgs[3]).sort(),
          outputs: readBindingNames(typeArgs[4]).sort(),
          templateQueries: readStringLiterals(typeArgs[5]).sort(),
          contentSlots: readStringLiterals(typeArgs[6]),
          methods: readPublicMethods(node),
          implements: readImplementsNames(node, sourceFile),
          typeParams: readTypeParams(node),
        });
      }
    }
    ts.forEachChild(node, visit);
  };

  visit(sourceFile);
  return declarations;
}

/**
 * Parse every `.d.ts` under `packageRoot` and return a components map keyed by the primary
 * selector (falling back to class name). First declaration for a key wins.
 */
export function extractSurfaceFromDir(packageRoot) {
  const components = {};
  for (const file of collectDtsFiles(packageRoot)) {
    const text = readFileSync(file, 'utf8');
    const sourceFile = ts.createSourceFile(file, text, ts.ScriptTarget.Latest, true);
    const decls = extractFromSource(sourceFile);
    if (decls.length === 0) continue;

    const relPath = relative(packageRoot, file).replace(/\\/g, '/');
    for (const decl of decls) {
      const key = decl.selectors[0] ?? decl.className;
      if (!components[key]) {
        components[key] = { ...decl, source: relPath };
      }
    }
  }
  return components;
}

/** Assemble the standard surface payload written to `<library>-api-surface.json`. */
export function buildPayload(library, version, components) {
  const sortedKeys = Object.keys(components).sort();
  return {
    library,
    version,
    checkedAt: new Date().toISOString().slice(0, 10),
    componentCount: sortedKeys.length,
    components: Object.fromEntries(sortedKeys.map((key) => [key, components[key]])),
  };
}

/** Render one component's surface as Markdown list lines (shared digest format). */
export function componentToMdLines(key, decl) {
  const asCode = (items) => (items.length ? items.map((item) => `\`${item}\``).join(', ') : '—');
  const lines = [`## \`${key}\` — ${decl.className} (${decl.kind})`, ''];
  lines.push(`- **Selectors:** ${asCode(decl.selectors)}`);
  if (decl.typeParams.length) lines.push(`- **Generic:** \`<${decl.typeParams.join(', ')}>\``);
  if (decl.implements.length) lines.push(`- **Implements:** ${asCode(decl.implements)}`);
  lines.push(`- **Inputs (${decl.inputs.length}):** ${asCode(decl.inputs)}`);
  lines.push(`- **Outputs (${decl.outputs.length}):** ${asCode(decl.outputs)}`);
  lines.push(`- **Content slots (${decl.contentSlots.length}):** ${asCode(decl.contentSlots)}`);
  lines.push(
    `- **Template slots (${decl.templateQueries.length}):** ${asCode(decl.templateQueries)}`,
  );
  lines.push(`- **Public methods (${decl.methods.length}):** ${asCode(decl.methods)}`);
  lines.push('');
  return lines;
}
