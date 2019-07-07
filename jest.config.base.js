//@ts-check

/*
jest monorepo configuration setup heavily inspired by
https://github.com/facebook/jest/issues/3112#issuecomment-398581705 by @nolazybits
*/
module.exports = {
  clearMocks: true,
  collectCoverage: true,
  coveragePathIgnorePatterns: [
    '(tests/.*.mock).(jsx?|tsx?)$',
    '/node_modules/',
  ],
  verbose: true,
};
