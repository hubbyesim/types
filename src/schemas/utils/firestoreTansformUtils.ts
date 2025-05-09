// firestoreTransformUtils.ts

import { Timestamp } from 'firebase-admin/firestore';
import { z } from 'zod';
import { getFirestore, DocumentReference } from 'firebase-admin/firestore';
import { FieldSpec } from '../types';
import { db } from './firestore';

export function convertJSToFirestore(input: any, spec: FieldSpec): any {
    if (input === undefined || input === null) return input;

    if (spec instanceof z.ZodType) {
        if (input instanceof Date) return Timestamp.fromDate(input);
        return input; // already valid
    }

    if ('_type' in spec) {
        switch (spec._type) {
            case 'timestamp':
                return input instanceof Date ? Timestamp.fromDate(input) : input;
            case 'docRef':
                return db.doc(`${spec.collection}/${input}`);
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
}


export function convertFirestoreToJS(data: any): any {
    // Convert Firestore Timestamp to JS Date
    if (data instanceof Timestamp) {
        return data.toDate();
    }
    // Convert Firestore DocumentReference to string (use .id or .path as needed)
    if (data instanceof DocumentReference) {
        return data.id;
    }
    // Recursively handle arrays
    if (Array.isArray(data)) {
        return data.map(item => convertFirestoreToJS(item));
    }
    // Recursively handle plain objects (excluding special Firestore classes)
    if (data !== null && typeof data === 'object') {
        const result: any = {};
        for (const [key, value] of Object.entries(data)) {
            result[key] = convertFirestoreToJS(value);
        }
        return result;
    }
    // For primitive values (string, number, boolean, null, or already a Date)
    return data;
}

