import { z } from 'zod';
import type { Timestamp, DocumentReference } from 'firebase-admin/firestore';
import type { FieldSpec } from './types';

type NullableIf<S, T extends z.ZodTypeAny> = S extends { nullable: true }
    ? z.ZodNullable<T>
    : T;

type OptionalIf<S, T extends z.ZodTypeAny> = S extends { optional: true }
    ? z.ZodOptional<T>
    : T;

type WithModifiers<S, T extends z.ZodTypeAny> = OptionalIf<S, NullableIf<S, T>>;

export type ServerSchemaFromSpec<S> =
    S extends z.ZodTypeAny ? S
    : S extends { _type: 'timestamp' }
    ? WithModifiers<S, z.ZodEffects<z.ZodDate, Timestamp>>
    : S extends { _type: 'docRef' }
    ? WithModifiers<S, z.ZodEffects<z.ZodString, DocumentReference>>
    : S extends { _type: 'array'; of: infer U }
    ? WithModifiers<S, z.ZodArray<ServerSchemaFromSpec<U>>>
    : S extends { _type: 'record'; of: infer U }
    ? WithModifiers<S, z.ZodRecord<z.ZodString, ServerSchemaFromSpec<U>>>
    : S extends { _type: 'object'; of: infer O extends Record<string, any> }
    ? WithModifiers<S, z.ZodObject<{ [K in keyof O]: ServerSchemaFromSpec<O[K]> }>>
    : S extends Record<string, any>
    ? WithModifiers<S, z.ZodObject<{
        [K in keyof S as K extends '_type' | 'nullable' | 'optional' ? never : K]: ServerSchemaFromSpec<S[K]>
    }>>
    : never;

export type ServerSchema<S extends FieldSpec> = ServerSchemaFromSpec<S>;
export type ServerType<S extends FieldSpec> = z.infer<ServerSchema<S>>;


