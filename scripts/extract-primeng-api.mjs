/**
 * scripts/extract-primeng-api.mjs
 *
 * Competitive-benchmark support tool. Packs a pinned PrimeNG version, parses every
 * component/directive `.d.ts`, and emits the authoritative public surface for each one:
 * selector, inputs, outputs, content-projection slots, template slots (query names),
 * public imperative methods, implemented interfaces (e.g. ControlValueAccessor), and
 * generic type params — i.e. the dimensions an input/output diff alone would miss.
 *
 * Why: the slow, error-prone step when filling docs/COMPETITIVE_BENCHMARKS.md is
 * enumerating the competitor's FULL API so no capability hides by simply not having a
 * row (see the `autofocus` gap found in the Button audit). This dumps ground truth from
 * the shipped type declarations — facts only. Verdicts (parity / beyond / excluded) stay
 * human judgement.
 *
 * Source of truth: the Angular `ɵɵComponentDeclaration` / `ɵɵDirectiveDeclaration`
 * generic in each `.d.ts` (arg 1 = selector(s), 3 = inputs, 4 = outputs, 5 = query/template
 * slots, 6 = ng-content selectors) plus the class declaration itself (public methods,
 * `implements` clause, generic params). We read the public aliases, which are exactly the
 * consumer-facing names.
 *
 * Usage:
 *   node scripts/extract-primeng-api.mjs                 # version 19, JSON + Markdown
 *   node scripts/extract-primeng-api.mjs --version 19    # explicit major (npm resolves latest 19.x)
 *   node scripts/extract-primeng-api.mjs --json-only     # skip the Markdown digest
 *   node scripts/extract-primeng-api.mjs --keep-temp     # keep the packed tarball dir
 *
 * Output:
 *   docs/_generated/primeng-api-surface.json   # machine-readable, keyed by component
 *   docs/_generated/primeng-api-surface.md     # human-eyeball digest (unless --json-only)
 */

import { execFileSync, execSync } from 'node:child_process';
import {
  existsSync,
  mkdirSync,
  mkdtempSync,
  readdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
/** @type {import('typescript')} */
const ts = require('typescript');

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(__dirname, '..');
const OUT_DIR = resolve(REPO_ROOT, 'docs/_generated');

function parseArgs(argv) {
  const args = { version: '19', jsonOnly: false, keepTemp: false };
  for (let index = 0; index < argv.length; index += 1) {
    const token = argv[index];
    if (token === '--version') {
      args.version = argv[index + 1];
      index += 1;
    } else if (token === '--json-only') {
      args.jsonOnly = true;
    } else if (token === '--keep-temp') {
      args.keepTemp = true;
    }
  }
  return args;
}

/** Pack `primeng@<version>` into a fresh temp dir and extract it. Returns the package root. */
function packPrimeng(version) {
  const workDir = mkdtempSync(join(tmpdir(), 'primeng-api-'));
  // `npm` is a `.cmd` shim on Windows, which Node 24 refuses to spawn without a shell.
  // We therefore run through a shell — and to keep that safe, the only interpolated value
  // (`version`) is restricted to npm's own version/dist-tag charset before it reaches the
  // command line.
  if (!/^[a-zA-Z0-9._~^-]+$/.test(version)) {
    throw new Error(`Refusing unsafe --version value: ${JSON.stringify(version)}`);
  }
  process.stdout.write(`Packing primeng@${version} …\n`);
  // npm pack prints the produced tarball filename on stdout.
  const tarball = execSync(`npm pack primeng@${version} --silent`, {
    cwd: workDir,
    encoding: 'utf8',
  })
    .trim()
    .split('\n')
    .pop()
    .trim();
  execFileSync('tar', ['-xzf', tarball], { cwd: workDir });
  return { packageRoot: join(workDir, 'package'), workDir, tarball };
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

// Framework methods that are not part of a component's consumer-facing imperative API.
const NON_API_METHODS = new Set([
  // Lifecycle hooks
  'ngOnInit',
  'ngOnChanges',
  'ngOnDestroy',
  'ngDoCheck',
  'ngAfterContentInit',
  'ngAfterContentChecked',
  'ngAfterViewInit',
  'ngAfterViewChecked',
  // ControlValueAccessor / Validator (captured via `implements` instead)
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

// Angular lifecycle interfaces carry no consumer-facing contract — drop them as noise so
// meaningful contracts (ControlValueAccessor, Validator, …) stand out.
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
          // Query property names — @ContentChild/@ViewChild template slots (e.g. `iconTemplate`).
          templateQueries: readStringLiterals(typeArgs[5]).sort(),
          // ng-content projection selectors (`["*"]`, `["[pButtonIcon]"]`, …).
          contentSlots: readStringLiterals(typeArgs[6]),
          // Class-level surface that an input/output diff misses:
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

function main() {
  const args = parseArgs(process.argv.slice(2));
  const { packageRoot, workDir } = packPrimeng(args.version);

  const resolvedVersion = JSON.parse(
    readFileSync(join(packageRoot, 'package.json'), 'utf8'),
  ).version;
  process.stdout.write(`Resolved primeng@${resolvedVersion}. Parsing declarations …\n`);

  const dtsFiles = collectDtsFiles(packageRoot);
  const components = {};

  for (const file of dtsFiles) {
    const text = readFileSync(file, 'utf8');
    const sourceFile = ts.createSourceFile(file, text, ts.ScriptTarget.Latest, true);
    const decls = extractFromSource(sourceFile);
    if (decls.length === 0) continue;

    const relPath = relative(packageRoot, file).replace(/\\/g, '/');
    for (const decl of decls) {
      // Key by the most descriptive selector, else class name.
      const key = decl.selectors[0] ?? decl.className;
      if (!components[key]) {
        components[key] = { ...decl, source: relPath };
      }
    }
  }

  const sortedKeys = Object.keys(components).sort();
  const payload = {
    library: 'primeng',
    version: resolvedVersion,
    checkedAt: new Date().toISOString().slice(0, 10),
    componentCount: sortedKeys.length,
    components: Object.fromEntries(sortedKeys.map((key) => [key, components[key]])),
  };

  if (!existsSync(OUT_DIR)) mkdirSync(OUT_DIR, { recursive: true });
  const jsonPath = join(OUT_DIR, 'primeng-api-surface.json');
  writeFileSync(jsonPath, `${JSON.stringify(payload, null, 2)}\n`, 'utf8');
  process.stdout.write(
    `Wrote ${relative(REPO_ROOT, jsonPath)} (${sortedKeys.length} declarations)\n`,
  );

  if (!args.jsonOnly) {
    const lines = [
      '# PrimeNG API Surface (generated)',
      '',
      `> Generated by \`scripts/extract-primeng-api.mjs\` from **primeng@${resolvedVersion}** on ${payload.checkedAt}.`,
      '> Do not edit by hand. This is ground-truth row source for `docs/COMPETITIVE_BENCHMARKS.md`.',
      '',
    ];
    for (const key of sortedKeys) {
      const decl = components[key];
      lines.push(`## \`${key}\` — ${decl.className} (${decl.kind})`);
      lines.push('');
      const asCode = (items) =>
        items.length ? items.map((item) => `\`${item}\``).join(', ') : '—';
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
    }
    const mdPath = join(OUT_DIR, 'primeng-api-surface.md');
    writeFileSync(mdPath, `${lines.join('\n')}\n`, 'utf8');
    process.stdout.write(`Wrote ${relative(REPO_ROOT, mdPath)}\n`);
  }

  if (args.keepTemp) {
    process.stdout.write(`Kept packed dir: ${workDir}\n`);
  } else {
    rmSync(workDir, { recursive: true, force: true });
  }
}

main();
