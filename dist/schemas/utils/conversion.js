"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isDate = exports.convertToDate = void 0;
exports.convertToFirestore = convertToFirestore;
exports.convertFromFirestore = convertFromFirestore;
const helpers_1 = require("../helpers");
// Helper function to convert date-like values to Date
const convertToDate = (value) => {
    if (value instanceof Date) {
        return value;
    }
    if (typeof value === 'string') {
        return new Date(value);
    }
    if (value && typeof value.toDate === 'function') {
        return value.toDate();
    }
    throw new Error(`Unable to convert value to Date: ${value}`);
};
exports.convertToDate = convertToDate;
// Helper function to safely check if a value is a Date
const isDate = (value) => {
    return value instanceof Date;
};
exports.isDate = isDate;
// Generic conversion function from App to Firestore
function convertToFirestore(appData, refFieldMappings, dateFieldMappings) {
    // Create base object with common fields but exclude reference fields
    const result = {};
    // Copy all fields except references that will be handled separately
    const refFieldNames = refFieldMappings.map(mapping => String(mapping.app));
    Object.keys(appData).forEach(key => {
        if (!refFieldNames.includes(key)) {
            result[key] = appData[key];
        }
    });
    // Handle base model fields
    result.created_at = helpers_1.toFirestore.date(appData.created_at);
    result.updated_at = helpers_1.toFirestore.date(appData.updated_at);
    result.created_by = typeof appData.created_by === 'string' ? appData.created_by : null;
    result.updated_by = typeof appData.updated_by === 'string' ? appData.updated_by : null;
    // Convert date fields
    if (dateFieldMappings) {
        dateFieldMappings.forEach(({ field, nullable }) => {
            const value = appData[field];
            if (nullable && value === null) {
                result[String(field)] = null;
            }
            else if ((0, exports.isDate)(value)) {
                result[String(field)] = helpers_1.toFirestore.date(value);
            }
        });
    }
    // Convert reference fields
    refFieldMappings.forEach(({ app, firestore, collection, isArray, nullable }) => {
        const value = appData[app];
        const firestoreKey = String(firestore);
        if (isArray) {
            if (nullable && value === null) {
                result[firestoreKey] = null;
            }
            else if (Array.isArray(value)) {
                result[firestoreKey] = value.map((id) => helpers_1.toFirestore.ref(collection, id));
            }
        }
        else {
            if (nullable && value === null) {
                result[firestoreKey] = null;
            }
            else if (typeof value === 'string') {
                result[firestoreKey] = helpers_1.toFirestore.ref(collection, value);
            }
        }
    });
    return result;
}
// Generic conversion function from Firestore to App
function convertFromFirestore(firestoreData, refFieldMappings, dateFieldMappings, specialCaseHandler) {
    // Create base object excluding reference fields that will be handled separately
    const result = {};
    // Copy all fields except references that will be handled separately
    const refFieldNames = refFieldMappings.map(mapping => String(mapping.firestore));
    Object.keys(firestoreData).forEach(key => {
        if (!refFieldNames.includes(key)) {
            result[key] = firestoreData[key];
        }
    });
    // Handle base model fields
    result.created_at = helpers_1.fromFirestore.date(firestoreData.created_at);
    result.updated_at = helpers_1.fromFirestore.date(firestoreData.updated_at);
    result.created_by = typeof firestoreData.created_by === 'string'
        ? firestoreData.created_by
        : firestoreData.created_by ? helpers_1.fromFirestore.ref(firestoreData.created_by) : null;
    result.updated_by = typeof firestoreData.updated_by === 'string'
        ? firestoreData.updated_by
        : firestoreData.updated_by ? helpers_1.fromFirestore.ref(firestoreData.updated_by) : null;
    // Convert date fields
    if (dateFieldMappings) {
        dateFieldMappings.forEach(({ field, nullable }) => {
            const value = firestoreData[field];
            const fieldName = String(field);
            if (nullable && value === null) {
                result[fieldName] = null;
            }
            else {
                result[fieldName] = (0, exports.convertToDate)(value);
            }
        });
    }
    // Convert reference fields
    refFieldMappings.forEach(({ app, firestore, isArray, nullable }) => {
        const value = firestoreData[firestore];
        const appKey = String(app);
        if (isArray) {
            if (nullable && value === null) {
                result[appKey] = null;
            }
            else if (Array.isArray(value)) {
                result[appKey] = value.map((ref) => helpers_1.fromFirestore.ref(ref));
            }
        }
        else {
            if (nullable && value === null) {
                result[appKey] = null;
            }
            else if (value) {
                result[appKey] = helpers_1.fromFirestore.ref(value);
            }
        }
    });
    // Apply any special case handling
    if (specialCaseHandler) {
        specialCaseHandler(result, firestoreData);
    }
    return result;
}
