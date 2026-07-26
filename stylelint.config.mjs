export default {
  extends: ['stylelint-config-standard-scss'],
  ignoreFiles: ['dist/**', 'node_modules/**'],
  rules: {
    'at-rule-disallowed-list': ['import'],
    'custom-property-pattern': '^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$',
    'declaration-no-important': true,
    'max-nesting-depth': 2,
    'selector-max-id': 0,
    'selector-max-specificity': '0,4,0',
  },
};
