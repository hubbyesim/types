import { z, ZodTypeAny } from 'zod';

// ----- export Type Definitions -----

export type TimestampField = {
    _type: 'timestamp';
    optional?: boolean;
    nullable?: boolean;
};

export type DocRefField = {
    _type: 'docRef';
    collection: string;
    optional?: boolean;
    nullable?: boolean;
};

export type ArrayField = {
    _type: 'array';
    of: FieldSpec;
    optional?: boolean;
    nullable?: boolean;
};

export type RecordField = {
    _type: 'record';
    of: FieldSpec;
    optional?: boolean;
    nullable?: boolean;
};

export type CustomField =
    | TimestampField
    | DocRefField
    | ArrayField
    | RecordField;

type ObjectField = {
    _type: 'object';
    of: Record<string, FieldSpec>;
    optional?: boolean;
    nullable?: boolean;
};

export type FieldSpec =
    | z.ZodTypeAny
    | TimestampField
    | DocRefField
    | ArrayField
    | RecordField
    | ObjectField
    | { [key: string]: FieldSpec };

export type SchemaBuilder = (spec: FieldSpec, path: string[]) => ZodTypeAny;