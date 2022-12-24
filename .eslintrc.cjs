/*
 * @Author: LinRenJie
 * @Date: 2022-12-19 14:28:57
 * @LastEditTime: 2022-12-24 13:47:39
 * @Description:
 * @FilePath: /admin/.eslintrc.cjs
 * @Email: xoxosos666@gmail.com
 */
/* eslint-env node */
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
    // 禁止使用 var
    'no-var': 'error',
    // 优先使用 interface 而不是 type
    '@typescript-eslint/consistent-type-definitions': ['error', 'interface']
  }
}
// module.exports = {
//   parser: '@typescript-eslint/parser',
//   plugins: ['@typescript-eslint'],
//   root: true,
//   extends: [
//     'plugin:vue/vue3-essential',
//     'eslint:recommended',
//     '@vue/eslint-config-prettier',
//     'prettier'
//   ],
//   parserOptions: {
//     ecmaVersion: 'latest'
//   },
//   rules: {
//     // 禁止使用 var
//     'no-var': "error",
//     // 优先使用 interface 而不是 type
//     '@typescript-eslint/consistent-type-definitions': [
//       "error",
//       "interface"
//     ]
//
//   }
// }
