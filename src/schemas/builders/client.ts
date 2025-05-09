import { z, ZodTypeAny } from 'zod';
import type { FieldSpec } from '../types';
import { wrapZodSchema, wrapObjectSchema, wrapPlainObjectSchema, isSchemaSpec } from '../common';

export function buildClientSchema(spec: FieldSpec, path: string[] = []): ZodTypeAny {
  const pathString = path.join('.');

  if (spec === undefined || spec === null) {
    throw new Error(`Invalid schema spec at "${pathString || '<root>'}": received ${spec}`);
  }

  // ----- Zod passed directly -----
  if (spec instanceof z.ZodType) {
    return wrapZodSchema(spec);
  }

  // ----- Array -----
  if ('_type' in spec && spec._type === 'array') {
    if (!('of' in spec)) {
      throw new Error(`Array spec at "${pathString}" is missing 'of'`);
    }
    let schema = z.array(buildClientSchema(spec.of, [...path, '[i]']));
    if (spec.nullable) schema = schema.nullable();
    if (spec.optional) schema = schema.optional();
    return schema;
  }

  // ----- Record -----
  if ('_type' in spec && spec._type === 'record') {
    if (!('of' in spec)) {
      throw new Error(`Record spec at "${pathString}" is missing 'of'`);
    }
    let schema = z.record(buildClientSchema(spec.of, [...path, '[key]']));
    if (spec.nullable) schema = schema.nullable();
    if (spec.optional) schema = schema.optional();
    return schema;
  }

  // ----- Timestamp -----
  if ('_type' in spec && spec._type === 'timestamp') {
    let schema = z.date();
    if (spec.nullable) schema = schema.nullable();
    if (spec.optional) schema = schema.optional();
    return schema;
  }

  // ----- DocRef -----
  if ('_type' in spec && spec._type === 'docRef') {
    let schema = z.string(); // only ID on client
    if (spec.nullable) schema = schema.nullable();
    if (spec.optional) schema = schema.optional();
    return schema;
  }

  // ----- Object (plain nested object spec) -----
  if (
    typeof spec === 'object' &&
    '_type' in spec &&
    spec._type === 'object' &&
    'of' in spec
  ) {
    return wrapObjectSchema(spec, path, buildClientSchema);
  }

  // ----- Plain object shape -----
  if (isSchemaSpec(spec) || typeof spec === 'object' && '_type' in spec && spec._type === 'object') {
    return wrapPlainObjectSchema(spec, path, buildClientSchema);
  }
  // 🔥 If we got here, the spec had a `_type` we didn't handle
  throw new Error(`Unknown or malformed spec at "${pathString}": ${JSON.stringify(spec)}`);
}
