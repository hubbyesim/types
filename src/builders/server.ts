import { z } from 'zod';
import type { Firestore, DocumentReference } from 'firebase-admin/firestore';
import { Timestamp } from 'firebase-admin/firestore';
import type { FieldSpec } from '../types';
import type { ServerSchemaFromSpec } from '../types.server';
import { wrapZodSchema, wrapObjectSchema, wrapPlainObjectSchema, isSchemaSpec } from '../common';
import { FirebaseService } from '../services/firebase';

export function createServerSchemaBuilder(db?: Firestore) {
  return function buildServerSchema<S extends FieldSpec>(spec: S, path: string[] = []): ServerSchemaFromSpec<S> {
    const pathString = path.join('.');

    if (spec === undefined || spec === null) {
      throw new Error(`Invalid spec at "${pathString || '<root>'}": received ${spec}`);
    }

    // ----- Zod schema passed directly -----
    if (spec instanceof z.ZodType) {
      return wrapZodSchema(spec) as unknown as ServerSchemaFromSpec<S>;
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
      return arraySchema as unknown as ServerSchemaFromSpec<S>;
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
      return recordSchema as unknown as ServerSchemaFromSpec<S>;
    }

    // ----- Timestamp -----
    if ('_type' in spec && spec._type === 'timestamp') {
      let tsSchema: z.ZodTypeAny = z.date().transform(date => Timestamp.fromDate(date));
      if (spec.nullable) tsSchema = tsSchema.nullable();
      if (spec.optional) tsSchema = tsSchema.optional();
      return tsSchema as unknown as ServerSchemaFromSpec<S>;
    }

    // ----- Document Reference -----
    if ('_type' in spec && spec._type === 'docRef') {
      let refSchema: z.ZodTypeAny = z.string().transform(id => {
        const firestore = db ?? FirebaseService.getDefaultInstance().firestore;
        return firestore.doc(`${spec.collection}/${id}`) as unknown as DocumentReference;
      });
      if (spec.nullable) refSchema = refSchema.nullable();
      if (spec.optional) refSchema = refSchema.optional();
      return refSchema as unknown as ServerSchemaFromSpec<S>;
    }

    // ----- Nested object shape -----
    if (typeof spec === 'object' && !('_type' in spec)) {
      const shape: Record<string, z.ZodTypeAny> = {};
      for (const [key, val] of Object.entries(spec)) {
        shape[key] = buildServerSchema(val, [...path, key]);
      }
      return z.object(shape) as unknown as ServerSchemaFromSpec<S>;
    }

    // ----- Object -----
    if (
      typeof spec === 'object' &&
      '_type' in spec &&
      spec._type === 'object' &&
      'of' in spec
    ) {
      return wrapObjectSchema(spec, path, buildServerSchema) as unknown as ServerSchemaFromSpec<S>;
    }

    // ----- Plain object shape -----
    if (isSchemaSpec(spec) || typeof spec === 'object' && '_type' in spec && spec._type === 'object') {
      return wrapPlainObjectSchema(spec, path, buildServerSchema) as unknown as ServerSchemaFromSpec<S>;
    }

    // ----- Unknown or malformed spec -----
    throw new Error(`Unknown or malformed spec at "${pathString}": ${JSON.stringify(spec)}`);
  };
}

// Backward-compatible default builder using global FirebaseService
export const buildServerSchema = createServerSchemaBuilder();
