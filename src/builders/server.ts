import { z } from 'zod';
import { Timestamp } from 'firebase-admin/firestore';
import type { FieldSpec } from '../types';
import { wrapZodSchema, wrapObjectSchema, wrapPlainObjectSchema, isSchemaSpec } from '../common';
import { db } from '../services/firebase';

export const buildServerSchema = (spec: FieldSpec, path: string[] = []): z.ZodTypeAny => {
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
        : buildServerSchema(spec.of, [...path, '[i]']);

    let arraySchema = z.array(itemSchema);
    if (spec.nullable) arraySchema = arraySchema.nullable();
    if (spec.optional) arraySchema = arraySchema.optional();
    return arraySchema;
  }

  // ----- Record -----
  if ('_type' in spec && spec._type === 'record') {
    if (!('of' in spec)) {
      throw new Error(`Record spec at "${pathString}" is missing 'of'`);
    }

    const valueSchema =
      spec.of instanceof z.ZodType
        ? spec.of
        : buildServerSchema(spec.of, [...path, '[key]']);

    let recordSchema = z.record(valueSchema);
    if (spec.nullable) recordSchema = recordSchema.nullable();
    if (spec.optional) recordSchema = recordSchema.optional();
    return recordSchema;
  }

  // ----- Timestamp -----
  if ('_type' in spec && spec._type === 'timestamp') {
    let tsSchema = z.date().transform(date => Timestamp.fromDate(date));
    if (spec.nullable) tsSchema = tsSchema.nullable();
    if (spec.optional) tsSchema = tsSchema.optional();
    return tsSchema;
  }

  // ----- Document Reference -----
  if ('_type' in spec && spec._type === 'docRef') {
    let refSchema = z.string().transform(id => db.doc(`${spec.collection}/${id}`));
    if (spec.nullable) refSchema = refSchema.nullable();
    if (spec.optional) refSchema = refSchema.optional();
    return refSchema;
  }

  // ----- Nested object shape -----
  if (typeof spec === 'object' && !('_type' in spec)) {
    const shape: Record<string, z.ZodTypeAny> = {};
    for (const [key, val] of Object.entries(spec)) {
      shape[key] = buildServerSchema(val, [...path, key]);
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
    return wrapObjectSchema(spec, path, buildServerSchema);
  }

  // ----- Plain object shape -----
  if (isSchemaSpec(spec) || typeof spec === 'object' && '_type' in spec && spec._type === 'object') {
    return wrapPlainObjectSchema(spec, path, buildServerSchema);
  }

  // ----- Unknown or malformed spec -----
  throw new Error(`Unknown or malformed spec at "${pathString}": ${JSON.stringify(spec)}`);
};
