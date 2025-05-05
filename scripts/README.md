# Automated Type Exports

This directory contains scripts to automate the generation of exports from the schema files.

## Overview

The primary script is `generate-exports.js` which:

1. Scans all schema files in `src/schemas/`
2. Extracts their exported types and functions
3. Generates a consolidated `src/index.ts` that re-exports everything properly

## Type Naming Conventions

The script maintains these conventions:

- `*Firestore` types are exported as-is and also as base names (e.g., `BookingFirestore` and `Booking`)
- `*App` types are exported as `H*` types (e.g., `BookingApp` as `HBooking`)
- Conversion functions and constants are exported as-is
- All types that aren't `*App` or `*Firestore` are exported unchanged

## How to Run

```bash
# Run the script
npm run generate-exports
```

## When to Run

Run this script:

- After creating a new schema file
- After adding new types to existing schema files
- After making changes to how types are named or exported
- Before publishing the package

## After Running

The script will generate `src/index.ts`. This file can then be used to import types from the package root:

```typescript
import { Booking, HBooking, bookingToFirestore } from '@your-package';
```

## Deprecated Files

The separate `.d.ts` files in the `src/` directory (like `booking.d.ts`, etc.) are no longer needed as all types are now automatically exported from the schema files via `index.ts`. 