/** @type {import('ts-jest').JestConfigWithTsJest} */
export default {
  preset: 'ts-jest/presets/default-esm', // Keep ESM preset
  testEnvironment: 'node',
  // Remove the explicit transform block, let the preset handle it
  // transform: { ... },
  moduleNameMapper: {
    // Crucial for resolving '.js' extensions in ESM imports
    '^(\.{1,2}/.*)\.js$': '$1',
  },
  // extensionsToTreatAsEsm is handled by the preset
  
  // Add global setup configuration
  globalSetup: './test/setup.ts',
  setupFilesAfterEnv: ['./test/setup.ts'],
  
  // Use test-specific TypeScript configuration
  transform: {
    '^.+\\.tsx?$': ['ts-jest', {
      tsconfig: 'tsconfig.test.json'
    }]
  }
}; 