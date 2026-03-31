import { z } from 'zod';
import { Timestamp } from 'firebase-admin/firestore';
import type { FieldSpec, SchemaBuilder } from '../types';
import { wrapZodSchema, wrapObjectSchema, wrapPlainObjectSchema, isSchemaSpec } from '../common';
import { FirebaseService } from '../services/firebase';

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

    let arraySchema: z.ZodTypeAny = z.array(itemSchema);
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

    let recordSchema: z.ZodTypeAny = z.record(valueSchema);
    if (spec.nullable) recordSchema = recordSchema.nullable();
    if (spec.optional) recordSchema = recordSchema.optional();
    return recordSchema;
  }

  // ----- Timestamp -----
  if ('_type' in spec && spec._type === 'timestamp') {
    let tsSchema: z.ZodTypeAny = z.date().transform(date => Timestamp.fromDate(date));
    if (spec.nullable) tsSchema = tsSchema.nullable();
    if (spec.optional) tsSchema = tsSchema.optional();
    return tsSchema;
  }

  // ----- Document Reference -----
  if ('_type' in spec && spec._type === 'docRef') {
    let refSchema: z.ZodTypeAny = z.string().transform(id => {
      const firestore = FirebaseService.getDefaultInstance().getFirestore()
      return firestore.collection(spec.collection).doc(id);
    });
    if (spec.nullable) refSchema = refSchema.nullable();
    if (spec.optional) refSchema = refSchema.optional();
    return refSchema;
  }

  // ----- Object with _type: 'object' -----
  if (
    typeof spec === 'object' &&
    '_type' in spec &&
    spec._type === 'object' &&
    'of' in spec
  ) {
    return wrapObjectSchema(spec, path, buildServerSchema as SchemaBuilder);
  }

  // ----- Plain object shape (with or without SchemaSpec marker) -----
  if (isSchemaSpec(spec) || (typeof spec === 'object' && spec !== null)) {
    return wrapPlainObjectSchema(spec, path, buildServerSchema as SchemaBuilder);
  }

  // ----- Unknown or malformed spec -----
  throw new Error(`Unknown or malformed spec at "${pathString}": ${JSON.stringify(spec)}`);
};
