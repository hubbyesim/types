#!/usr/bin/env node

/**
 * This script generates a clean index.ts file that exports all types and functions from schemas
 * It helps eliminate duplication between index.ts and index.d.ts
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get __dirname equivalent in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SCHEMA_DIR = path.join(__dirname, '../src/schemas');
const OUTPUT_FILE = path.join(__dirname, '../src/index.ts');

// Get all schema files
const schemaFiles = fs.readdirSync(SCHEMA_DIR)
  .filter(file => file.endsWith('.ts') && !file.startsWith('index'));

// Start with the header comment
let output = `// This file is auto-generated. Do not edit manually.
`;

// Import and re-export everything from each schema file
schemaFiles.forEach(file => {
  const baseName = path.basename(file, '.ts');
  output += `// Export from ${baseName} schema\n`;
  output += `export * from "./schemas/${baseName}";\n\n`;
});

// Export constants separately
output += `// Export from constants\n`;
output += `export * from "./constants";\n`;

// Write the output file
fs.writeFileSync(OUTPUT_FILE, output);

console.log(`Generated exports in ${OUTPUT_FILE}`); 