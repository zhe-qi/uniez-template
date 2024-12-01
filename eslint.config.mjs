/** @type {import('eslint').Linter.Config} */
import process from 'node:process';
import antfu from '@antfu/eslint-config';

/**
 * @see https://github.com/antfu/eslint-config
 */
export default antfu({
  formatters: true,
  vue: true,
  unocss: true,
  rules: {
    'style/indent': ['error', 2, { SwitchCase: 2 }],
    'style/quotes': ['error', 'single'],
    'style/semi': ['error', 'always'],
    'style/semi-style': ['error', 'last'],
    'style/brace-style': ['error', '1tbs', { allowSingleLine: true }],
    'vue/script-indent': ['error', 2, { baseIndent: 0 }],
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
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
  ],
});
