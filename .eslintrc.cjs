/*
 * @Author: LinRenJie xoxosos666@gmail.com
 * @Date: 2023-05-09 19:01:32
 * @Description:
 */
require('@rushstack/eslint-patch/modern-module-resolution')
module.exports = {
  parser: 'vue-eslint-parser',
  plugins: ['@typescript-eslint'],
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 'latest',
    sourceType: 'module',
    extends: [
      'plugin:vue/vue3-essential',
      'eslint:recommended',
      '@vue/eslint-config-prettier',
      'prettier'
    ],
    ecmaFeatures: {
      jsx: true
    }
  },
  rules: {
    'no-debugger': 'error',
    // 禁止使用 var
    'no-var': 'error',
    // 优先使用 interface 而不是 type
    '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
    eqeqeq: 2, //必须使用全等
    'max-lines': ['error', 500], //限制行数 请勿修改 请优化你的代码
    complexity: ['error', 10], // 限制复杂度
    'require-await': 'error'
  }
}
