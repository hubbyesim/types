import { defineConfig } from 'tsup';

export default defineConfig({
  entry: {
    index: 'src/index.ts',
    firebase: 'src/schemas/firebase/index.ts'
  },
  format: ['esm', 'cjs'],
  dts: true,
  outDir: 'dist',
  clean: true,
  sourcemap: true,
  splitting: false,
  skipNodeModulesBundle: true,
});
