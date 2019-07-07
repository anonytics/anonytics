module.exports = {
  extends: ['./.eslintrc.base.js'],
  env: { browser: true, jest: true },
  parserOptions: {
    project: './tsconfig.json',
  },
  rules: {},
};
