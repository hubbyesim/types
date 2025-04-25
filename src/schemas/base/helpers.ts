import { z } from 'zod';

// Flag to indicate if we're running in a test environment
// Export as object to make it mutable in ESM context
export const testEnv = { isTestEnvironment: false };

// App version of the base model
export const baseModelAppSchema = z.object({
    id: z.string(),
    created_at: z.date(),
    updated_at: z.date(),
    created_by: z.union([z.string(), z.null()]),
    updated_by: z.union([z.string(), z.null()])
});

// Define HubbyModel schemas explicitly for the app
export const hubbyModelAppSchema = baseModelAppSchema;

// Type for the base model in the app
export type HubbyModelApp = z.infer<typeof hubbyModelAppSchema>;

// For backwards compatibility
export type HHubbyModel = HubbyModelApp;

// Helper function to create string ID schema
export const createIdSchema = (collectionPath: string) => {
    return z.string().describe(`ID from ${collectionPath}`);
}; 