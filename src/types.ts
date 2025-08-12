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

// ----- Type-level mapping from FieldSpec to the resulting Zod schema type -----

type NullableIf<S, T extends ZodTypeAny> = S extends { nullable: true }
    ? z.ZodNullable<T>
    : T;

type OptionalIf<S, T extends ZodTypeAny> = S extends { optional: true }
    ? z.ZodOptional<T>
    : T;

type WithModifiers<S, T extends ZodTypeAny> = OptionalIf<S, NullableIf<S, T>>;

export type SchemaFromSpec<S> =
    // Already a Zod schema → keep exact type (e.g., ZodString, ZodObject, ...)
    S extends z.ZodTypeAny ? S
    // Timestamp → ZodEffects<ZodDate> with optional/nullable modifiers
    : S extends { _type: 'timestamp' }
    ? WithModifiers<S, z.ZodEffects<z.ZodDate>>
    // DocRef → ZodString with modifiers
    : S extends { _type: 'docRef' }
    ? WithModifiers<S, z.ZodString>
    // Array → ZodArray of recursively mapped inner type
    : S extends { _type: 'array'; of: infer U }
    ? WithModifiers<S, z.ZodArray<SchemaFromSpec<U>>>
    // Record<string, V>
    : S extends { _type: 'record'; of: infer U }
    ? WithModifiers<S, z.ZodRecord<z.ZodString, SchemaFromSpec<U>>>
    // Explicit object spec with `of`
    : S extends { _type: 'object'; of: infer O extends Record<string, any> }
    ? WithModifiers<S, z.ZodObject<{ [K in keyof O]: SchemaFromSpec<O[K]> }>>
    // Plain object shape (may optionally carry nullable/optional flags)
    : S extends Record<string, any>
    ? WithModifiers<S, z.ZodObject<{
        [K in keyof S as K extends '_type' | 'nullable' | 'optional' ? never : K]: SchemaFromSpec<S[K]>
    }>>
    : never;

export type SchemaBuilder = <S extends FieldSpec>(spec: S, path: string[]) => SchemaFromSpec<S>;

// ----- Public helper types (client-only) -----

export type ClientSchema<S extends FieldSpec> = SchemaFromSpec<S>;
export type ClientType<S extends FieldSpec> = z.infer<ClientSchema<S>>;