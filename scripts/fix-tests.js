#!/usr/bin/env node

/**
 * Script to fix all test files from CommonJS to ESM module pattern
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const testDir = path.join(__dirname, '../test');

// Get all test files
const testFiles = fs.readdirSync(testDir)
  .filter(file => file.endsWith('.test.ts'));

console.log(`Found ${testFiles.length} test files to fix`);

// Process each file
testFiles.forEach(file => {
  const filePath = path.join(testDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Skip files that have already been fixed
  if (content.includes('import.meta.url.endsWith')) {
    console.log(`Skipping ${file} - already fixed`);
    return;
  }
  
  // Replace require.main === module with ESM equivalent
  if (content.includes('require.main === module')) {
    console.log(`Fixing ${file}...`);
    
    content = content.replace(
      /if\s*\(\s*require\.main\s*===\s*module\s*\)\s*{/g,
      `// In ESM, there's no direct replacement for require.main === module
// We can check if the current file's URL ends with this file's name
const isDirectlyExecuted = import.meta.url.endsWith('/${file.replace('.ts', '.js')}');
if (isDirectlyExecuted) {`
    );
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ Fixed ${file}`);
  } else {
    console.log(`Skipping ${file} - no CommonJS pattern found`);
  }
});

console.log('Done!'); 