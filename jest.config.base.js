//@ts-check

module.exports = {
  clearMocks: true,
  roots: ['<rootDir>/src'],
  collectCoverage: true,
  coveragePathIgnorePatterns: ['(tests/.*.mock).(jsx?|tsx?)$'],
  verbose: true,
};
