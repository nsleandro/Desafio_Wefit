/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  verbose: true,
  testEnvironment: 'node',
  maxWorkers: 1,
  setupFilesAfterEnv: ['./src/test/integration/testSetup.ts']
};