module.exports = {
  extends: ['../../.eslintrc.base.js'],
  env: { browser: true, jest: true },
  parserOptions: {
    ecmaVersion: 5,
    project: './tsconfig.json',
  },
  rules: {},
};
