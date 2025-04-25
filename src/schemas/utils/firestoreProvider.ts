/**
 * FirestoreProvider interface
 * 
 * This interface defines the required methods and objects needed from Firestore
 * to allow the shared types package to work without directly depending on firebase or firebase-admin.
 * 
 * Implementation can be provided by either:
 * - firebase (client SDK)
 * - firebase-admin (server SDK)
 */

export interface FirestoreProvider {
    Timestamp: {
        fromDate(date: Date): any;
        now(): any;
    };
    FieldValue: {
        serverTimestamp(): any;
        increment(n: number): any;
    };
    doc(path: string): any; // for DocumentReference
    collection(path: string): any; // for CollectionReference
}

// Types for compatibility with Firestore objects
export interface TimestampLike {
    toDate(): Date;
    seconds: number;
    nanoseconds: number;
    isEqual?(other: TimestampLike): boolean;
}

export interface FieldValueLike {
    isEqual?(other: FieldValueLike): boolean;
}

export interface DocumentReferenceLike {
    id: string;
    path: string;
}

// Type guard functions
export function isTimestamp(value: any): value is TimestampLike {
    return value &&
        typeof value === 'object' &&
        'toDate' in value &&
        typeof value.toDate === 'function' &&
        'seconds' in value &&
        'nanoseconds' in value;
}

export function isDocumentReference(value: any): value is DocumentReferenceLike {
    return value &&
        typeof value === 'object' &&
        'id' in value &&
        'path' in value;
}

export function isFieldValue(value: any): value is FieldValueLike {
    return value &&
        typeof value === 'object' &&
        'isEqual' in value &&
        typeof value.isEqual === 'function';
} 