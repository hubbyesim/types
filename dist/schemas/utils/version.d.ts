/**
 * Semantic versioning compatibility checker for types package
 * Helps consumers of the package ensure they're using compatible versions
 */
import { z } from 'zod';
export declare const CURRENT_VERSION: {
    major: number;
    minor: number;
    patch: number;
};
export declare const versionSchema: z.ZodObject<{
    major: z.ZodNumber;
    minor: z.ZodNumber;
    patch: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    patch: number;
    major: number;
    minor: number;
}, {
    patch: number;
    major: number;
    minor: number;
}>;
export type Version = z.infer<typeof versionSchema>;
/**
 * Checks if the consumer's required version is compatible with the current package version
 *
 * @param requiredVersion The minimum version required by the consumer
 * @returns Object with compatibility status and details
 */
export declare function checkVersionCompatibility(requiredVersion: Version): {
    isCompatible: boolean;
    isMajorCompatible: boolean;
    isMinorCompatible: boolean;
    isPatchCompatible: boolean;
    current: {
        major: number;
        minor: number;
        patch: number;
    };
    required: {
        patch: number;
        major: number;
        minor: number;
    };
};
/**
 * Creates a function that will assert compatibility with a specific version
 * Useful for apps to verify they're using a compatible version of the types package
 *
 * @param requiredVersion The minimum version required by the consumer
 * @returns A function that throws an error if versions are incompatible
 */
export declare function createVersionCompatibilityGuard(requiredVersion: Version): () => boolean;
/**
 * Simple function to check if the consumer is using a compatible version
 *
 * @param requiredMajor The major version required
 * @param requiredMinor The minor version required
 * @param requiredPatch The patch version required
 * @returns True if compatible, false if not
 */
export declare function requireVersion(requiredMajor: number, requiredMinor?: number, requiredPatch?: number): boolean;
