
module.exports = {
  testEnvironment: 'node',
  collectCoverage: true,
  coverageReporters: [
    'lcov',
    'text'
  ],
  testPathIgnorePatterns: [
    'node_modules',
    'dist'
  ],
  transform: {
    '^.+\\.(js|ts|tsx)?$': require.resolve('ts-jest')
  }
}
