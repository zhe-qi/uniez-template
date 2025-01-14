/** @type {import('eslint').Linter.Config} */
import antfu from '@antfu/eslint-config';

/**
 * @see https://github.com/antfu/eslint-config
 */
export default antfu({
  vue: true,
  unocss: true,
  stylistic: {
    semi: true,
  },
  formatters: true,
  rules: {
    'style/indent': ['error', 2, { SwitchCase: 2 }],
    'style/quotes': ['error', 'single'],
    'style/semi': ['error', 'always'],
    'style/semi-style': ['error', 'last'],
    'style/brace-style': ['error', '1tbs', { allowSingleLine: true }],
    'no-console': 'off',
    'no-debugger': 'off',
    'no-useless-catch': 'off',
    'vue/eqeqeq': 'off',
    'eqeqeq': 'off',
    'curly': ['error', 'multi-line'],
    'brace-style': ['error', '1tbs', { allowSingleLine: true }],
    'ts/no-unused-expressions': 'off',
    'node/prefer-global/process': 'off',
    'prefer-promise-reject-errors': 'off',
    'style/max-statements-per-line': 'off',
    'ts/consistent-type-definitions': 'off',
    'unused-imports/no-unused-vars': 'off',
    'eslint-comments/no-unlimited-disable': 'off',
  },
  ignores: [
    './dist/*',
    '**/static/*',
    '**/uni_modules/*',
    'src/manifest.json',
    'src/pages.json',
  ],
});
