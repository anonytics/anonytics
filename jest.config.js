//@ts-check

const baseConfig = require('./jest.config.base.js');

module.exports = {
  ...baseConfig,
  projects: ['<rootDir>/packages/*/jest.config.js'],
  coverageDirectory: '<rootDir>/coverage/',
  collectCoverageFrom: ['<rootDir>/src/**/*.{ts,tsx}'],
  coverageReporters: ['text', 'html', 'json'],
};
