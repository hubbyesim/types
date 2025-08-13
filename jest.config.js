/** @type {import('ts-jest').JestConfigWithTsJest} */
export default {
  preset: 'ts-jest/presets/default-esm', // Keep ESM preset
  testEnvironment: 'node',
  extensionsToTreatAsEsm: ['.ts'],
  // Remove the explicit transform block, let the preset handle it
  // transform: { ... },
  moduleNameMapper: {
    // Strip explicit .js extensions in relative ESM imports from TS source
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
  // extensionsToTreatAsEsm is handled by the preset

  // Add global setup configuration
  globalSetup: './test/setup.ts',
  setupFilesAfterEnv: ['./test/setup.ts'],
  testPathIgnorePatterns: [
    '/node_modules/',
    '<rootDir>/test/analytics.test.ts',
  ],

  // Use test-specific TypeScript configuration
  transform: {
    '^.+\\.tsx?$': ['ts-jest', {
      tsconfig: 'tsconfig.test.json'
    }]
  }
}; 