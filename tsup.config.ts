import { defineConfig } from 'tsup';

export default defineConfig([
  // Server build - includes all types with Firebase dependencies
  {
    entry: {
      index: 'src/index.server.ts',
    },
    format: ['esm', 'cjs'],
    dts: true,
    outDir: 'dist',
    clean: true,
    sourcemap: true,
    splitting: false,
    skipNodeModulesBundle: true,
    treeshake: true,
    external: [],
  },
  // Client build - only client types without Firebase dependency
  {
    entry: {
      'base/index': 'src/index.client.ts',
    },
    format: ['esm', 'cjs'],
    dts: true,
    outDir: 'dist',
    clean: false, // Don't clean again since the server build does it
    sourcemap: true,
    splitting: false,
    skipNodeModulesBundle: true,
    treeshake: true,
    external: ['firebase-admin'], // Ensure Firebase is excluded from client build
    esbuildOptions: (options) => {
      options.conditions = ['browser'];
    },
  }
]);
