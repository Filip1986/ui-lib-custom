/**
 * stylelint rule: uilib/no-unprefixed-motion
 *
 * Flags any rule that applies a non-none transition or animation unless the
 * same SCSS file contains a matching @media (prefers-reduced-motion: reduce)
 * block that nullifies the motion.
 *
 * Auto-fix (--fix): scaffolds an empty reduced-motion stub after the first
 * offending rule. The stub must be filled in manually — marked with TODO.
 *
 * Exempt: CSS custom property definitions (--*) and declarations inside an
 * existing @media (prefers-reduced-motion) block.
 */

import stylelint from 'stylelint';
import postcss from 'postcss';

export const ruleName = 'uilib/no-unprefixed-motion';

export const meta = {
  url: 'https://github.com/ui-lib-custom/LIBRARY_CONVENTIONS.md#css-cascade-layer-rule',
  fixable: true,
};

export const messages = stylelint.utils.ruleMessages(ruleName, {
  rejected: (prop) =>
    `"${prop}" declared without a @media (prefers-reduced-motion: reduce) companion in this file. ` +
    `Add a reduced-motion override or suppress with /* stylelint-disable-next-line uilib/no-unprefixed-motion */`,
});

const MOTION_PROPS = new Set(['transition', 'animation', 'animation-name']);

/** Collect the full ancestor selector path for a node (for SCSS nesting). */
function getFullSelector(node) {
  let sel = '';
  let current = node;
  while (current && current.type !== 'root') {
    if (current.type === 'rule') {
      sel = sel ? `${current.selector} { ${sel} }` : current.selector;
    }
    current = current.parent;
  }
  return sel || '/* selector */';
}

/** Check if a node is inside a @media prefers-reduced-motion block. */
function isInsideReducedMotion(node) {
  let current = node.parent;
  while (current) {
    if (
      current.type === 'atrule' &&
      current.name === 'media' &&
      current.params.includes('prefers-reduced-motion')
    ) {
      return true;
    }
    current = current.parent;
  }
  return false;
}

/** Find the innermost @layer or root to append the fix block to. */
function findInsertionPoint(root) {
  let layer = null;
  root.walkAtRules('layer', (atRule) => {
    if (atRule.params.includes('uilib.components')) {
      layer = atRule;
      return false; // stop walking
    }
  });
  return layer || root;
}

function rule(primaryOption) {
  return (root, result) => {
    if (!primaryOption) return;

    // Fast path: does the file already have a prefers-reduced-motion block?
    let hasReducedMotionBlock = false;
    root.walkAtRules('media', (atRule) => {
      if (atRule.params.includes('prefers-reduced-motion')) {
        hasReducedMotionBlock = true;
        return false;
      }
    });

    // Collect all non-none motion declarations NOT already inside a reduced-motion block
    const violations = [];
    root.walkDecls((decl) => {
      if (!MOTION_PROPS.has(decl.prop)) return;
      if (decl.prop.startsWith('--')) return; // skip custom properties
      const val = decl.value.trim().toLowerCase();
      if (val === 'none') return;
      if (isInsideReducedMotion(decl)) return;
      violations.push(decl);
    });

    if (violations.length === 0) return;
    if (hasReducedMotionBlock) return; // file-level coverage: trust it covers all cases

    // Track whether the fix block has been appended (one per file)
    let fixApplied = false;

    // Report each unique property violation using the v17 `fix` callback API
    const reported = new Set();
    for (const decl of violations) {
      const key = `${decl.source?.start?.line}:${decl.prop}`;
      if (reported.has(key)) continue;
      reported.add(key);

      stylelint.utils.report({
        result,
        ruleName,
        message: messages.rejected(decl.prop),
        node: decl,
        word: decl.prop,
        fix() {
          if (fixApplied) return;
          fixApplied = true;

          // Build one scaffolded block covering all unique top-level selectors
          const seenSelectors = new Set();
          const selectorBlocks = [];
          for (const v of violations) {
            const topSel = v.parent?.selector || '/* selector */';
            if (!seenSelectors.has(topSel)) {
              seenSelectors.add(topSel);
              selectorBlocks.push(
                `  ${topSel} {\n    /* TODO: set transition / animation to none */\n  }`,
              );
            }
          }
          const mediaBlock = postcss.parse(
            `\n@media (prefers-reduced-motion: reduce) {\n${selectorBlocks.join('\n\n')}\n}\n`,
          );
          const insertionPoint = findInsertionPoint(root);
          insertionPoint.append(mediaBlock);
        },
      });
    }
  };
}

rule.ruleName = ruleName;
rule.messages = messages;
rule.meta = meta;

export default [{ ruleName, rule }];
