// Main entry point for the Hubby types package
// This file consolidates exports from both client and server schemas

// In a Node.js environment, we'll export both client and server types
// In a browser environment, only client types will be available through the 'base' subpath export
// The browser-specific exports are handled in the package.json exports field

// We're using a direct re-export which will be modified by the bundler
// based on the target environment. The tsup configuration handles the exclusion
// of firebase-admin from client builds.
export * from './index.server';