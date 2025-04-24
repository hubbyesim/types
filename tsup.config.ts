import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  outDir: 'dist',
  clean: true,
  sourcemap: true, // optional: helpful for debugging
  splitting: false, // set to true if you want code splitting
  skipNodeModulesBundle: true
});
