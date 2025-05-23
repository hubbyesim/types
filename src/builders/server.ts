import { z } from 'zod';
import { Timestamp } from 'firebase-admin/firestore';
import type { FieldSpec } from '../types';
import { wrapZodSchema, wrapObjectSchema, wrapPlainObjectSchema, isSchemaSpec } from '../common';
import { db } from '../services/firebase';

// Helper function to apply nullable and optional modifiers
const applyModifiers = <T extends z.ZodTypeAny>(
  schema: T,
  nullable?: boolean,
  optional?: boolean
): z.ZodTypeAny => {
  let result: z.ZodTypeAny = schema;
  if (nullable) result = result.nullable();
  if (optional) result = result.optional();
  return result;
};

export const buildServerSchema = (spec: FieldSpec, path: string[] = [], depth: number = 0): z.ZodTypeAny => {
  const pathString = path.join('.');

  if (spec === undefined || spec === null) {
    throw new Error(`Invalid spec at "${pathString || '<root>'}": received ${spec}`);
  }

  // ----- Zod schema passed directly -----
  if (spec instanceof z.ZodType) {
    return wrapZodSchema(spec);
  }

  // ----- Array -----
  if ('_type' in spec && spec._type === 'array') {
    if (!('of' in spec)) {
      throw new Error(`Array spec at "${pathString}" is missing 'of'`);
    }

    const itemSchema =
      spec.of instanceof z.ZodType
        ? spec.of
        : buildServerSchema(spec.of, [...path, '[i]'], depth + 1);

    return applyModifiers(z.array(itemSchema), spec.nullable, spec.optional);
  }

  // ----- Record -----
  if ('_type' in spec && spec._type === 'record') {
    if (!('of' in spec)) {
      throw new Error(`Record spec at "${pathString}" is missing 'of'`);
    }

    const valueSchema =
      spec.of instanceof z.ZodType
        ? spec.of
        : buildServerSchema(spec.of, [...path, '[key]'], depth + 1);

    return applyModifiers(z.record(valueSchema), spec.nullable, spec.optional);
  }

  // ----- Timestamp -----
  if ('_type' in spec && spec._type === 'timestamp') {
    const baseSchema = z.preprocess(
      (arg) => (typeof arg === 'string' || typeof arg === 'number') ? new Date(arg) : arg,
      z.date()
    ).transform(date => Timestamp.fromDate(date));

    return applyModifiers(baseSchema, spec.nullable, spec.optional);
  }

  // ----- Document Reference -----
  if ('_type' in spec && spec._type === 'docRef') {
    const baseSchema = z.string().transform(id => db.doc(`${spec.collection}/${id}`));
    return applyModifiers(baseSchema, spec.nullable, spec.optional);
  }

  // ----- Nested object shape -----
  if (typeof spec === 'object' && !('_type' in spec)) {
    const shape: Record<string, z.ZodTypeAny> = {};
    for (const [key, val] of Object.entries(spec)) {
      shape[key] = buildServerSchema(val, [...path, key], depth + 1);
    }
    return z.object(shape);
  }

  // ----- Object -----
  if (
    typeof spec === 'object' &&
    '_type' in spec &&
    spec._type === 'object' &&
    'of' in spec
  ) {
    return wrapObjectSchema(spec, path, (s, p) => buildServerSchema(s, p, depth + 1));
  }

  // ----- Plain object shape -----
  if (isSchemaSpec(spec) || typeof spec === 'object' && '_type' in spec && spec._type === 'object') {
    return wrapPlainObjectSchema(spec, path, (s, p) => buildServerSchema(s, p, depth + 1));
  }

  // ----- Unknown or malformed spec -----
  throw new Error(`Unknown or malformed spec at "${pathString}": ${JSON.stringify(spec)}`);
};
