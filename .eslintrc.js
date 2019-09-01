module.exports = {
    env: {
      browser: true,
      es6: true,
      node: true
    },
    extends: [
      'standard',
      'plugin:@typescript-eslint/recommended',
      'plugin:prettier/recommended',
      'prettier/standard',
      'prettier/@typescript-eslint'
    ],
    globals: {
      Atomics: 'readonly',
      SharedArrayBuffer: 'readonly'
    },
    parser: '@typescript-eslint/parser',
    parserOptions: {
      ecmaVersion: 2019,
      sourceType: 'module'
    },
    rules: {
      'no-useless-constructor': 'off',
      '@typescript-eslint/no-useless-constructor': 'error',
    }
  }