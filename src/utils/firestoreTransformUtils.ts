// firestoreTransformUtils.ts

import { z } from 'zod';
import { DocumentReference, Timestamp, Firestore } from 'firebase-admin/firestore';
import { FieldSpec } from '../types';
import { db as defaultDb } from '../services/firebase';

export function createConvertJSToFirestore(db: Firestore) {
    return function convertJSToFirestore(input: any, spec: FieldSpec): any {
        if (input === undefined || input === null) return input;

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
                    console.log('convertJSToFirestore docRef', input, spec);
                    return db.collection(spec.collection).doc(input);
                case 'array':
                    return input.map((item: any) => convertJSToFirestore(item, spec.of));
                case 'record':
                    return Object.fromEntries(
                        Object.entries(input).map(([k, v]) => [k, convertJSToFirestore(v, spec.of)])
                    );
                case 'object':
                    if ('of' in spec && typeof spec.of === 'object') {
                        const result: any = {};
                        for (const [key, fieldSpec] of Object.entries(spec.of)) {
                            if (key in input) {
                                result[key] = convertJSToFirestore(input[key], fieldSpec);
                            }
                        }
                        return result;
                    }
                    return input;
                default:
                    throw new Error(`Unknown field type: ${spec._type}`);
            }
        }

        // fallback: plain object shape
        if (typeof input === 'object' && typeof spec === 'object') {
            return Object.fromEntries(
                Object.entries(spec).map(([key, fieldSpec]) => [
                    key,
                    convertJSToFirestore(input[key], fieldSpec),
                ])
            );
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
                        Object.entries(input).map(([k, v]) => [
                            k,
                            convertFirestoreToJS(v, spec.of, [...path, k]),
                        ])
                    );

                case 'object':
                    if (!spec.of || typeof spec.of !== 'object') return input;
                    const result: Record<string, any> = {};
                    for (const [key, fieldSpec] of Object.entries(spec.of)) {
                        result[key] = convertFirestoreToJS(input[key], fieldSpec, [...path, key]);
                    }
                    return result;
            }
        }

        if (typeof spec === 'object' && typeof input === 'object' && !Array.isArray(input)) {
            const result: Record<string, any> = {};
            for (const [key, valSpec] of Object.entries(spec)) {
                result[key] = convertFirestoreToJS(input[key], valSpec, [...path, key]);
            }
            return result;
        }

        return input;
    };
}

// For backward compatibility, export the default functions
export const convertJSToFirestore = createConvertJSToFirestore(defaultDb);
export const convertFirestoreToJS = createConvertFirestoreToJS();
