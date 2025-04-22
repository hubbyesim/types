"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isDate = exports.convertToDate = void 0;
exports.genericToFirestore = genericToFirestore;
exports.genericFromFirestore = genericFromFirestore;
const helpers_1 = require("./helpers");
// Helper function to convert date-like values to Date
const convertToDate = (value) => {
    if (value && typeof value === 'object' && 'getTime' in value) {
        return value;
    }
    if (typeof value === 'string') {
        return new Date(value);
    }
    if (value && typeof value === 'object' && typeof value.toDate === 'function') {
        return value.toDate();
    }
    throw new Error(`Unable to convert value to Date: ${value}`);
};
exports.convertToDate = convertToDate;
const isDate = (value) => {
    return value && typeof value === 'object' && 'getTime' in value;
};
exports.isDate = isDate;
// Generic toFirestore conversion function
function genericToFirestore({ appObject, refFieldMappings, dateFieldMappings, specialCaseHandler }) {
    // Create base object with common fields but exclude reference fields
    const result = {};
    // Copy all fields except references that will be handled separately
    const refFieldNames = refFieldMappings.map(mapping => mapping.app);
    Object.keys(appObject).forEach(key => {
        if (!refFieldNames.includes(key)) {
            result[key] = appObject[key];
        }
    });
    // Handle base model fields
    if ('created_at' in appObject && (0, exports.isDate)(appObject.created_at)) {
        result.created_at = helpers_1.toFirestore.date(appObject.created_at);
    }
    if ('updated_at' in appObject && (0, exports.isDate)(appObject.updated_at)) {
        result.updated_at = helpers_1.toFirestore.date(appObject.updated_at);
    }
    if ('created_by' in appObject) {
        result.created_by = typeof appObject.created_by === 'string' ? appObject.created_by : null;
    }
    if ('updated_by' in appObject) {
        result.updated_by = typeof appObject.updated_by === 'string' ? appObject.updated_by : null;
    }
    // Convert date fields
    dateFieldMappings.forEach(({ field, nullable }) => {
        const value = appObject[field];
        if (nullable && value === null) {
            result[field] = null;
        }
        else if ((0, exports.isDate)(value)) {
            result[field] = helpers_1.toFirestore.date(value);
        }
    });
    // Convert reference fields
    refFieldMappings.forEach(({ app, firestore, collection, isArray, nullable }) => {
        const value = appObject[app];
        if (isArray) {
            if (nullable && value === null) {
                result[firestore] = null;
            }
            else if (Array.isArray(value)) {
                result[firestore] = value.map((id) => helpers_1.toFirestore.ref(collection, id));
            }
        }
        else {
            if (nullable && value === null) {
                result[firestore] = null;
            }
            else if (typeof value === 'string') {
                result[firestore] = helpers_1.toFirestore.ref(collection, value);
            }
        }
    });
    // Apply any special case handling
    if (specialCaseHandler) {
        specialCaseHandler(result, appObject);
    }
    return result;
}
// Generic fromFirestore conversion function
function genericFromFirestore({ firestoreObject, refFieldMappings, dateFieldMappings, specialCaseHandler }) {
    // Create base object excluding reference fields that will be handled separately
    const result = {};
    // Copy all fields except references that will be handled separately
    const refFieldNames = refFieldMappings.map(mapping => mapping.firestore);
    Object.keys(firestoreObject).forEach(key => {
        if (!refFieldNames.includes(key)) {
            result[key] = firestoreObject[key];
        }
    });
    // Handle base model fields
    if ('created_at' in firestoreObject) {
        result.created_at = helpers_1.fromFirestore.date(firestoreObject.created_at);
    }
    if ('updated_at' in firestoreObject) {
        result.updated_at = helpers_1.fromFirestore.date(firestoreObject.updated_at);
    }
    if ('created_by' in firestoreObject) {
        const createdBy = firestoreObject.created_by;
        result.created_by = typeof createdBy === 'string'
            ? createdBy
            : createdBy ? helpers_1.fromFirestore.ref(createdBy) : null;
    }
    if ('updated_by' in firestoreObject) {
        const updatedBy = firestoreObject.updated_by;
        result.updated_by = typeof updatedBy === 'string'
            ? updatedBy
            : updatedBy ? helpers_1.fromFirestore.ref(updatedBy) : null;
    }
    // Convert date fields
    dateFieldMappings.forEach(({ field, nullable }) => {
        const value = firestoreObject[field];
        if (nullable && value === null) {
            result[field] = null;
        }
        else {
            result[field] = (0, exports.convertToDate)(value);
        }
    });
    // Convert reference fields
    refFieldMappings.forEach(({ app, firestore, nullable, isArray }) => {
        const value = firestoreObject[firestore];
        if (isArray) {
            if (nullable && value === null) {
                result[app] = null;
            }
            else if (Array.isArray(value)) {
                result[app] = value.map((ref) => helpers_1.fromFirestore.ref(ref));
            }
        }
        else {
            if (nullable && value === null) {
                result[app] = null;
            }
            else if (value) {
                result[app] = helpers_1.fromFirestore.ref(value);
            }
        }
    });
    // Apply any special case handling
    if (specialCaseHandler) {
        specialCaseHandler(result, firestoreObject);
    }
    return result;
}
