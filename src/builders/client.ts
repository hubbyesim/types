import { z, ZodTypeAny } from 'zod';
import type { FieldSpec, SchemaFromSpec } from '../types';
import { wrapZodSchema, wrapObjectSchema, wrapPlainObjectSchema, isSchemaSpec } from '../common';

export function buildClientSchema<S extends FieldSpec>(spec: S, path: string[] = []): any {
  const pathString = path.join('.');

  if (spec === undefined || spec === null) {
    throw new Error(`Invalid schema spec at "${pathString || '<root>'}": received ${spec}`);
  }

  // ----- Zod passed directly -----
  if (spec instanceof z.ZodType) {
    return wrapZodSchema(spec) as unknown as SchemaFromSpec<S>;
  }

  // Check if object might be a Zod schema (has _def property or ~standard metadata)
  if (typeof spec === 'object' && spec !== null &&
    (('_def' in spec) || ('~standard' in spec && (spec as any)['~standard']?.vendor === 'zod'))) {
    try {
      // Try to use it as a Zod schema directly
      return wrapZodSchema(spec as unknown as z.ZodTypeAny) as unknown as SchemaFromSpec<S>;
    } catch (error) {
      // If this fails, we'll continue with the other checks
      console.warn(`Failed to use object as Zod schema at "${pathString}":`, error);
    }
  }

  // ----- Array -----
  if (typeof spec === 'object' && spec !== null && '_type' in spec && spec._type === 'array') {
    if (!('of' in spec)) {
      throw new Error(`Array spec at "${pathString}" is missing 'of'`);
    }
    let schema: ZodTypeAny = z.array(buildClientSchema(spec.of, [...path, '[i]']));
    if (spec.nullable) schema = schema.nullable();
    if (spec.optional) schema = schema.optional();
    return schema as unknown as SchemaFromSpec<S>;
  }

  // ----- Record -----
  if (typeof spec === 'object' && spec !== null && '_type' in spec && spec._type === 'record') {
    if (!('of' in spec)) {
      throw new Error(`Record spec at "${pathString}" is missing 'of'`);
    }
    let schema: ZodTypeAny = z.record(z.string(), buildClientSchema(spec.of, [...path, '[key]']));
    if (spec.nullable) schema = schema.nullable();
    if (spec.optional) schema = schema.optional();
    return schema as unknown as SchemaFromSpec<S>;
  }

  // ----- Timestamp -----
  if (typeof spec === 'object' && spec !== null && '_type' in spec && spec._type === 'timestamp') {
    let schema: ZodTypeAny = z.preprocess((val) => {
      if (typeof val === 'string') {
        // Try to parse the string to a Date object
        const date = new Date(val);
        return isNaN(date.getTime()) ? undefined : date; // undefined will cause z.date() to fail
      }
      if (typeof val === 'number') {
        // Handle numeric timestamps
        const date = new Date(val);
        return isNaN(date.getTime()) ? undefined : date;
      }
      // If it's already a Date or something else, return it as is
      return val;
    }, z.date({ message: 'Invalid date format' }));
    if (spec.nullable) schema = schema.nullable();
    if (spec.optional) schema = schema.optional();
    return schema as unknown as SchemaFromSpec<S>;
  }

  // ----- DocRef -----
  if (typeof spec === 'object' && spec !== null && '_type' in spec && spec._type === 'docRef') {
    let schema: ZodTypeAny = z.string(); // only ID on client
    if (spec.nullable) schema = schema.nullable();
    if (spec.optional) schema = schema.optional();
    return schema as unknown as SchemaFromSpec<S>;
  }

  // ----- Object (plain nested object spec) -----
  if (
    typeof spec === 'object' &&
    spec !== null &&
    '_type' in spec &&
    spec._type === 'object' &&
    'of' in spec
  ) {
    return wrapObjectSchema(spec, path, buildClientSchema) as unknown as SchemaFromSpec<S>;
  }

  // ----- Plain object shape -----
  if (isSchemaSpec(spec) || (typeof spec === 'object' && spec !== null && '_type' in spec && (spec as any)._type === 'object')) {
    return wrapPlainObjectSchema(spec, path, buildClientSchema) as unknown as SchemaFromSpec<S>;
  }

  // If we have an object with fields that look like schema specs, try to handle it as a schema object
  if (typeof spec === 'object' && spec !== null) {
    try {
      return wrapPlainObjectSchema(spec, path, buildClientSchema) as unknown as SchemaFromSpec<S>;
    } catch (error) {
      // If this also fails, we'll throw the error below
      console.warn(`Failed to handle object as plain schema at "${pathString}":`, error);
    }
  }

  // 🔥 If we got here, the spec had a structure we didn't handle
  throw new Error(`Unknown or malformed spec at "${pathString}": ${JSON.stringify(spec)}`);
}

