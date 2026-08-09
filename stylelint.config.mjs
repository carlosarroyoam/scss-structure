export default {
  extends: ['stylelint-config-standard-scss', 'stylelint-config-recess-order'],
  ignoreFiles: ['dist/**', 'node_modules/**'],
  rules: {
    'at-rule-disallowed-list': ['import'],
    'custom-property-pattern': '^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$',
    'declaration-no-important': true,
    'max-nesting-depth': 2,
    'selector-max-id': 0,
    'selector-max-specificity': '0,4,0',
    // Token/primitive maps intentionally use blank lines to group related
    // entries; that grouping is unrelated to property ordering.
    'custom-property-empty-line-before': null,
    'scss/dollar-variable-empty-line-before': null,
  },
};
