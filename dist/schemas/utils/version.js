"use strict";
/**
 * Semantic versioning compatibility checker for types package
 * Helps consumers of the package ensure they're using compatible versions
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.versionSchema = exports.CURRENT_VERSION = void 0;
exports.checkVersionCompatibility = checkVersionCompatibility;
exports.createVersionCompatibilityGuard = createVersionCompatibilityGuard;
exports.requireVersion = requireVersion;
const zod_1 = require("zod");
// The current version of the package
// Should be updated manually when making breaking changes
exports.CURRENT_VERSION = {
    major: 1,
    minor: 6,
    patch: 0
};
// Schema for semantic version
exports.versionSchema = zod_1.z.object({
    major: zod_1.z.number().int(),
    minor: zod_1.z.number().int(),
    patch: zod_1.z.number().int()
});
/**
 * Checks if the consumer's required version is compatible with the current package version
 *
 * @param requiredVersion The minimum version required by the consumer
 * @returns Object with compatibility status and details
 */
function checkVersionCompatibility(requiredVersion) {
    // Major version must match exactly - breaking changes
    const isMajorCompatible = exports.CURRENT_VERSION.major === requiredVersion.major;
    // Current minor version must be >= required minor version - backward compatible additions
    const isMinorCompatible = exports.CURRENT_VERSION.major > requiredVersion.major ||
        (isMajorCompatible && exports.CURRENT_VERSION.minor >= requiredVersion.minor);
    // Current patch version must be >= required patch version - bug fixes
    const isPatchCompatible = exports.CURRENT_VERSION.major > requiredVersion.major ||
        (exports.CURRENT_VERSION.major === requiredVersion.major && exports.CURRENT_VERSION.minor > requiredVersion.minor) ||
        (isMajorCompatible && exports.CURRENT_VERSION.minor === requiredVersion.minor && exports.CURRENT_VERSION.patch >= requiredVersion.patch);
    const isCompatible = isMajorCompatible && isMinorCompatible && isPatchCompatible;
    return {
        isCompatible,
        isMajorCompatible,
        isMinorCompatible,
        isPatchCompatible,
        current: Object.assign({}, exports.CURRENT_VERSION),
        required: Object.assign({}, requiredVersion)
    };
}
/**
 * Creates a function that will assert compatibility with a specific version
 * Useful for apps to verify they're using a compatible version of the types package
 *
 * @param requiredVersion The minimum version required by the consumer
 * @returns A function that throws an error if versions are incompatible
 */
function createVersionCompatibilityGuard(requiredVersion) {
    return () => {
        const result = checkVersionCompatibility(requiredVersion);
        if (!result.isCompatible) {
            if (!result.isMajorCompatible) {
                throw new Error(`Major version mismatch. Required: ${requiredVersion.major}, Current: ${exports.CURRENT_VERSION.major}. ` +
                    `Major version changes contain breaking changes. Please update your code to be compatible with the new version.`);
            }
            if (!result.isMinorCompatible) {
                throw new Error(`Minor version mismatch. Required: ${requiredVersion.minor}, Current: ${exports.CURRENT_VERSION.minor}. ` +
                    `Your app requires features added in a newer minor version. Please update the types package.`);
            }
            if (!result.isPatchCompatible) {
                throw new Error(`Patch version mismatch. Required: ${requiredVersion.patch}, Current: ${exports.CURRENT_VERSION.patch}. ` +
                    `Your app requires bug fixes added in a newer patch version. Please update the types package.`);
            }
        }
        return true;
    };
}
/**
 * Simple function to check if the consumer is using a compatible version
 *
 * @param requiredMajor The major version required
 * @param requiredMinor The minor version required
 * @param requiredPatch The patch version required
 * @returns True if compatible, false if not
 */
function requireVersion(requiredMajor, requiredMinor = 0, requiredPatch = 0) {
    const result = checkVersionCompatibility({
        major: requiredMajor,
        minor: requiredMinor,
        patch: requiredPatch
    });
    return result.isCompatible;
}
