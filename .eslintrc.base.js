module.exports = {
  extends: [
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
    'plugin:unicorn/recommended',
    'plugin:prettier/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'prettier', 'unicorn'],
  parserOptions: {
    sourceType: 'module',
    ecmaFeatures: {
      modules: true,
    },
    ecmaVersion: 2018,
  },
  overrides: [
    {
      files: ['*.test.ts', '__tests__/*'],
      rules: {
        // we don't want to write return types for all our 'describe' and 'it' blocks
        '@typescript-eslint/explicit-function-return-type': 'off',
      },
    },
  ],
  rules: { 'no-console': 'error' },
};
