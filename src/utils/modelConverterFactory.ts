import { Firestore } from 'firebase-admin/firestore';
import {
  createConvertJSToFirestore,
  createConvertFirestoreToJS
} from './firestoreTransformUtils';
import { FieldSpec } from '../types';

/**
 * Creates converter functions for a specific model type with dependency injection.
 * This lets you use the conversion functions with your own Firebase instance.
 * 
 * @param db - Firestore instance to use for document references
 * @param modelSchemaSpec - Schema specification for the model
 * @returns Object with to/from Firestore conversion functions
 */
export function createModelConverters<TModel, TFirestore>(
  db: Firestore,
  modelSchemaSpec: FieldSpec
) {
  const convertToFirestore = createConvertJSToFirestore(db);
  const convertFromFirestore = createConvertFirestoreToJS();

  return {
    /**
     * Converts a model instance to Firestore format
     */
    toFirestore: (model: TModel): TFirestore => {
      console.log('Converting model to Firestore format, before:', model, modelSchemaSpec);
      const result = convertToFirestore(model, modelSchemaSpec);
      console.log('Converting model to Firestore format, after:', result);
      return result;
    },

    /**
     * Converts Firestore data to a model instance
     */
    fromFirestore: (firestoreData: TFirestore): TModel => {
      return convertFromFirestore(firestoreData, modelSchemaSpec);
    }
  };
} 