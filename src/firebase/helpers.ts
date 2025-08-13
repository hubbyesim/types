import { Timestamp } from 'firebase-admin/firestore';

// Helper functions for converting between JavaScript and Firestore types
export const toFirestore = {
    date: (date: Date): Timestamp => Timestamp.fromDate(date),
    timestamp: (timestamp: Timestamp): Timestamp => timestamp,
    ref: <T>(collection: string, id: string): any => ({ collection, id }),
    // Add other conversion functions as needed
};

export const fromFirestore = {
    date: (timestamp: Timestamp): Date => timestamp.toDate(),
    timestamp: (timestamp: Timestamp): Timestamp => timestamp,
    ref: (ref: any): string => ref?.id || ref,
    // Add other conversion functions as needed
};
