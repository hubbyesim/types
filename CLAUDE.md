# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Is

`@hubbyesim/types` — shared Zod schema definitions and TypeScript types for the Hubby eSIM platform. Consumed as a git dependency by other Hubby services (server and client).

## Commands

- **Build:** `npm run build` (uses tsup, outputs to `dist/`)
- **Test:** `npm test` (Jest with ts-jest ESM preset)
- **Watch:** `npm run dev` (tsup --watch)

## Architecture

### Dual-build system (tsup)

Two separate builds produce two package export paths:

- `@hubbyesim/types` → `dist/index.js` — **server build** from `src/index.server.ts`. Includes Firebase Admin types (Timestamp, DocumentReference).
- `@hubbyesim/types/base` → `dist/base/index.js` — **client build** from `src/index.client.ts`. Firebase Admin is externalized; DocRefs become `z.string()`, Timestamps become `z.preprocess(..., z.date())`.

### Schema spec system

Schemas are NOT written as raw Zod schemas. Instead, each domain model is defined as a **spec object** (a plain JS object using custom field descriptors) in `src/specs/`. The spec is then compiled into a real Zod schema by one of two builders:

- `buildClientSchema` (`src/builders/client.ts`) — resolves `docRef` → `z.string()`, `timestamp` → `z.date()` with preprocessing
- `buildServerSchema` (`src/builders/server.ts`) — resolves `docRef` → Firestore DocumentReference via `FirebaseService`, `timestamp` → `Timestamp.fromDate()`

Custom field types in specs (`src/types.ts`):
- `{ _type: 'timestamp', nullable?, optional? }` — Firestore Timestamp / JS Date
- `{ _type: 'docRef', collection: string, nullable?, optional? }` — Firestore DocumentReference / string ID
- `{ _type: 'array', of: FieldSpec }` — array of nested specs
- `{ _type: 'record', of: FieldSpec }` — Record<string, V>
- `{ _type: 'object', of: {...} }` — nested object
- Raw Zod schemas can be used directly for simple fields

Spec objects must be wrapped with `markAsSchemaSpec()` (from `src/common.ts`) to be recognized by the plain-object fallback path.

### Naming conventions

- **Server types** (from `index.server.ts`): `UserSchema`, `BookingSchema` → types `User`, `Booking`
- **Client types** (from `index.client.ts`): `HUserSchema`, `HBookingSchema` → types `HUser`, `HBooking` (H-prefixed)
- Conversion functions: `xxxFromFirestore`, `xxxToFirestore` (in `index.server.ts`)

### FirebaseService dependency injection

Server-side schema building and Firestore conversion depend on `FirebaseService.getDefaultInstance()`. Consumers must call `FirebaseService.setDefaultInstance(createFirebaseService(db))` at startup. Tests use the setup in `test/setup.ts` to initialize this with the Firestore emulator.

### Key files

- `src/specs/common.ts` — collection path constants, shared timestamp helpers, `hubbyModelSpec` base fields
- `src/constants.ts` — `SUPPORTED_LOCALES` array and Zod schema
- `src/utils/firestoreTransformUtils.ts` — `convertFirestoreToJS` / `convertJSToFirestore` generic converters
- `src/utils.ts` — `genericToFirestore` / `genericFromFirestore` with field mapping configs

## Adding a New Model

1. Create spec in `src/specs/newmodel.ts` using field descriptors and `markAsSchemaSpec()`
2. Add collection constant to `src/specs/common.ts`
3. Export client schema + type in `src/index.client.ts` (use `buildClientSchema`)
4. Export server schema + type + conversion functions in `src/index.server.ts` (use `buildServerSchema`)
5. Add tests in `test/newmodel.test.ts`

## Versioning

Published as a git dependency (`git+https://github.com/hubbyesim/types.git#v{version}`). Bump version in `package.json` and tag.
