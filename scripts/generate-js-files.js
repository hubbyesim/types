import fs from 'fs';
import path from 'path';

// Get a list of all .d.ts files in the src directory
const srcDir = path.join(__dirname, '../src');
const distDir = path.join(__dirname, '../dist');

// Make sure the scripts directory exists
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

// First, copy all d.ts files to dist
const dtsFiles = fs.readdirSync(srcDir)
  .filter(file => file.endsWith('.d.ts'));

dtsFiles.forEach(file => {
  const srcPath = path.join(srcDir, file);
  const distPath = path.join(distDir, file);

  // Copy the d.ts file to dist
  fs.copyFileSync(srcPath, distPath);

  // Create a corresponding JS file that re-exports from index
  const jsFileName = file.replace('.d.ts', '.js');
  const jsFilePath = path.join(distDir, jsFileName);

  if (!fs.existsSync(jsFilePath)) {
    const moduleName = file.replace('.d.ts', '');
    // Create a JS file with a proper Object.defineProperty and empty exports
    const jsContent = `"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// This is an auto-generated file to make the TypeScript definitions available at runtime`;
    fs.writeFileSync(jsFilePath, jsContent);
  }
});

console.log('Generated JS files for all d.ts files in src directory'); 