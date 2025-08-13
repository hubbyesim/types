// firestoreTransformUtils.ts

import { z } from 'zod';
import { DocumentReference, Timestamp, Firestore } from 'firebase-admin/firestore';
import { FieldSpec } from '../types';
import { FirebaseService } from '../services/firebase';
// Note: Firestore instance must be injected by consumers/tests via factory

export function createConvertJSToFirestore(db: Firestore) {
    return function convertJSToFirestore(input: any, spec: FieldSpec): any {
        // Handle null/undefined at the top level
        if (input === undefined || input === null) return null;

        if (spec instanceof z.ZodType) {
            if (input instanceof Date) return Timestamp.fromDate(input);
            return input; // already valid
        }

        if ('_type' in spec) {
            switch (spec._type) {
                case 'timestamp':
                    if (input instanceof Date) {
                        return Timestamp.fromDate(input);
                    } else if (typeof input === 'string' || typeof input === 'number') {
                        return Timestamp.fromDate(new Date(input));
                    }
                    return input;
                case 'docRef':
                    return db.collection(spec.collection).doc(input);
                case 'array':
                    return input.map((item: any) => convertJSToFirestore(item, spec.of));
                case 'record':
                    // For records, filter out undefined values
                    return Object.fromEntries(
                        Object.entries(input)
                            .filter(([_, v]) => v !== undefined)
                            .map(([k, v]) => [k, convertJSToFirestore(v, spec.of)])
                    );
                case 'object':
                    if ('of' in spec && typeof spec.of === 'object') {
                        const result: any = {};
                        for (const [key, fieldSpec] of Object.entries(spec.of)) {
                            // Check if the field exists in the input
                            if (key in input) {
                                const value = input[key];

                                // Handle based on field optionality and nullability
                                if (value === undefined) {
                                    // Check if field is optional by looking at its spec
                                    const isOptional = typeof fieldSpec === 'object' && fieldSpec !== null && 'optional' in fieldSpec && fieldSpec.optional === true;
                                    if (!isOptional) {
                                        // If not optional but nullable, convert to null
                                        result[key] = null;
                                    }
                                    // If optional, just skip it (don't add to result)
                                } else {
                                    // Normal case - value exists and is not undefined
                                    result[key] = convertJSToFirestore(value, fieldSpec);
                                }
                            }
                        }
                        return result;
                    }
                    return input;
                default:
                    throw new Error(`Unknown field type: ${spec._type}`);
            }
        }

        // fallback: plain object shape with explicit schema
        if (typeof input === 'object' && !Array.isArray(input) && typeof spec === 'object') {
            const result: any = {};

            for (const [key, fieldSpec] of Object.entries(spec)) {
                if (key in input) {
                    const value = input[key];

                    // Handle undefined values
                    if (value === undefined) {
                        // Check if field is optional
                        const isOptional = typeof fieldSpec === 'object' && fieldSpec !== null && 'optional' in fieldSpec && fieldSpec.optional === true;
                        if (!isOptional) {
                            // If not optional but nullable, convert to null
                            result[key] = null;
                        }
                        // If optional, don't include in the result
                    } else {
                        // Normal case - value exists
                        result[key] = convertJSToFirestore(value, fieldSpec);
                    }
                }
            }

            return result;
        }

        return input;
    };
}

function isDuckTimestamp(obj: any): obj is { toDate: () => Date } {
    return (
        obj &&
        typeof obj === 'object' &&
        typeof obj.toDate === 'function' &&
        Object.prototype.toString.call(obj.toDate()) === '[object Date]'
    );
}

function isDuckDocumentRef(obj: any): obj is { id: string } {
    return (
        obj &&
        typeof obj === 'object' &&
        typeof obj.id === 'string' &&
        typeof obj.path === 'string'
    );
}

export function createConvertFirestoreToJS() {
    return function convertFirestoreToJS(input: any, spec: FieldSpec, path: string[] = []): any {
        const pathString = path.join('.') || '<root>';

        // ✅ Convert Firestore-native or duck-typed Timestamp
        if (input instanceof Timestamp || isDuckTimestamp(input)) {
            return input.toDate();
        }

        // ✅ Convert Firestore-native or duck-typed DocumentReference
        if (input instanceof DocumentReference || isDuckDocumentRef(input)) {
            return input.id;
        }

        if (input === null || input === undefined) return input;
        if (!spec) return input;

        if (spec instanceof z.ZodType) {
            // 🔁 Keep in place if it's already a native value
            return input;
        }

        if ('_type' in spec) {
            switch (spec._type) {
                case 'timestamp':
                    return (input instanceof Timestamp || isDuckTimestamp(input)) ? input.toDate() : input;

                case 'docRef':
                    return (input instanceof DocumentReference || isDuckDocumentRef(input)) ? input.id : input;

                case 'array':
                    return Array.isArray(input)
                        ? input.map((item, i) => convertFirestoreToJS(item, spec.of, [...path, `[${i}]`]))
                        : input;

                case 'record':
                    if (typeof input !== 'object' || input === null) return input;
                    return Object.fromEntries(
                        Object.entries(input)
                            .filter(([_, v]) => v !== undefined)
                            .map(([k, v]) => [
                                k,
                                convertFirestoreToJS(v, spec.of, [...path, k]),
                            ])
                    );

                case 'object':
                    if (!spec.of || typeof spec.of !== 'object') return input;
                    const result: Record<string, any> = {};
                    for (const [key, fieldSpec] of Object.entries(spec.of)) {
                        // Only include properties that exist in the input and aren't undefined
                        if (key in input && input[key] !== undefined) {
                            result[key] = convertFirestoreToJS(input[key], fieldSpec, [...path, key]);
                        }
                    }
                    return result;
            }
        }

        if (typeof spec === 'object' && typeof input === 'object' && !Array.isArray(input)) {
            const result: Record<string, any> = {};
            for (const [key, valSpec] of Object.entries(spec)) {
                // Only include properties that exist in the input and aren't undefined
                if (key in input && input[key] !== undefined) {
                    result[key] = convertFirestoreToJS(input[key], valSpec, [...path, key]);
                }
            }
            return result;
        }

        return input;
    };
}

// For backward compatibility, export the default functions
export const convertFirestoreToJS = createConvertFirestoreToJS();

// Backward-compatible helper that lazily uses injected default Firestore instance
export function convertJSToFirestore(input: any, spec: FieldSpec): any {
    const firestore = FirebaseService.getDefaultInstance().getFirestore();
    return createConvertJSToFirestore(firestore)(input, spec);
}
