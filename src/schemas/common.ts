import { ZodTypeAny, z } from 'zod';
import type { SchemaBuilder } from './types';

/**
 * Ensures a Zod schema is wrapped to be optional and/or nullable,
 * if not already. Use this in recursive schema builders.
 */
export function wrapZodSchema(
    schema: ZodTypeAny,
    options?: { optional?: boolean; nullable?: boolean }
): ZodTypeAny {
    let wrapped = schema;

    if (options?.nullable && !wrapped.isNullable?.()) {
        wrapped = wrapped.nullable();
    }

    if (options?.optional && !wrapped.isOptional?.()) {
        wrapped = wrapped.optional();
    }

    return wrapped;
}

export function wrapObjectSchema(
    spec: any, // using any to support dynamic `spec.type === 'object'`
    path: string[],
    builder: SchemaBuilder
): ZodTypeAny {
    const pathString = path.join('.');

    if (!('of' in spec)) {
        throw new Error(`Object spec at "${pathString}" is missing 'of'`);
    }

    const shape: Record<string, ZodTypeAny> = {};
    for (const [key, value] of Object.entries(spec.of)) {
        shape[key] = builder(value, [...path, key]);
    }

    let objectSchema = z.object(shape);
    if (spec.nullable) objectSchema = objectSchema.nullable();
    if (spec.optional) objectSchema = objectSchema.optional();
    return objectSchema;
}

/**
 * Wraps a plain object shape (no `type: 'object'`) into a Zod schema.
 * Assumes each field is either a Zod schema or another FieldSpec.
 */
export function wrapPlainObjectSchema(
    spec: Record<string, any>,
    path: string[],
    builder: SchemaBuilder
): ZodTypeAny {
    const pathString = path.join('.');

    // Handle object field specs with '_type': 'object'
    if ('_type' in spec && spec._type === 'object' && 'of' in spec) {
        return wrapObjectSchema(spec, path, builder);
    }

    const shape: Record<string, ZodTypeAny> = {};

    // Only add fields to the schema if they're not special control properties
    for (const [key, val] of Object.entries(spec)) {
        if (key !== '_type' && key !== 'nullable' && key !== 'optional') {
            shape[key] = builder(val, [...path, key]);
        }
    }

    // Create the base object schema
    let schema = z.object(shape);

    // Apply nullable/optional modifiers if needed
    if ('nullable' in spec && spec.nullable === true) {
        schema = schema.nullable();
    }

    if ('optional' in spec && spec.optional === true) {
        schema = schema.optional();
    }

    return schema;
}

export const SCHEMA_MARKER = Symbol('ZodSchemaSpecMarker');

export function markAsSchemaSpec<T extends object>(spec: T): T {
    Object.defineProperty(spec, SCHEMA_MARKER, {
        value: true,
        enumerable: false,
        configurable: false,
        writable: false,
    });
    return spec;
}

export function isSchemaSpec(obj: unknown): obj is Record<string, any> {
    return typeof obj === 'object' && obj !== null && SCHEMA_MARKER in obj;
}