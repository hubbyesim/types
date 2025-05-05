import { z } from 'zod';

// Flag to indicate if we're running in a test environment
// Export as object to make it mutable in ESM context
export const testEnv = { isTestEnvironment: false };


const iso8601Regex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{1,3})?Z$/;

// Helper function to convert string dates to Date objects
export const zDateString = () =>
    z.preprocess((input: unknown) => {
        if (typeof input === "string") {
            if (!iso8601Regex.test(input)) {
                return undefined; // invalid ISO format
            }
            const date = new Date(input);
            if (!isNaN(date.getTime())) {
                return date;
            }
            return undefined;
        }
        if (input instanceof Date && !isNaN(input.getTime())) {
            return input;
        }
        return undefined;
    }, z.date());

// App version of the base model
export const baseModelAppSchema = z.object({
    id: z.string(),
    created_at: zDateString(),
    updated_at: zDateString(),
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