// Helper function to convert date-like values to Date
export const convertToDate = (value: any, field: string): Date => {
    if (typeof value === undefined) {
        return new Date('1970-01-01');
    }
    if (value && typeof value === 'object' && 'getTime' in value) {
        return value as Date;
    }
    if (typeof value === 'string') {
        return new Date(value);
    }
    throw new Error(`Unable to convert value to Date: ${value} for field: ${field}`);
};

export const isDate = (value: any): value is Date => {
    return value && typeof value === 'object' && 'getTime' in value;
}; 