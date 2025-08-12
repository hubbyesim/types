import { Firestore } from 'firebase-admin/firestore';
import {
  createConvertJSToFirestore,
  createConvertFirestoreToJS
} from './firestoreTransformUtils';
import { FieldSpec, ClientType } from '../types';
import type { ServerType } from '../types.server';

/**
 * Creates converter functions for a specific model type with dependency injection.
 * This lets you use the conversion functions with your own Firebase instance.
 * 
 * @param db - Firestore instance to use for document references
 * @param modelSchemaSpec - Schema specification for the model
 * @returns Object with to/from Firestore conversion functions
 */
export function createModelConverters<S extends FieldSpec>(
  db: Firestore,
  modelSchemaSpec: S
) {
  const convertToFirestore = createConvertJSToFirestore(db);
  const convertFromFirestore = createConvertFirestoreToJS();

  return {
    /**
     * Converts a model instance to Firestore format
     */
    toFirestore: (model: ClientType<S>): ServerType<S> => {
      return convertToFirestore(model, modelSchemaSpec);
    },

    /**
     * Converts Firestore data to a model instance
     */
    fromFirestore: (firestoreData: ServerType<S>): ClientType<S> => {
      return convertFromFirestore(firestoreData, modelSchemaSpec);
    }
  };
} 