// import { z } from 'zod';
// import { FieldValue } from 'firebase-admin/firestore';
// import { analyticsSpec } from '../src/specs/analytics';
// import { buildServerSchema } from '../src/builders/server';
// import { buildClientSchema } from '../src/builders/client';

// FIELD VALUE IS BROKEN 

// describe('Analytics Spec', () => {
//   const serverSchema = buildServerSchema(analyticsSpec);
//   const clientSchema = buildClientSchema(analyticsSpec);

//   describe('FieldValue Operations', () => {
//     it('should accept positive increment values', () => {
//       const data = {
//         service: 'test-service',
//         date: '2024-03-20',
//         event: 'test-event',
//         parameters: {
//           sum: { type: 'increment', value: 5 }
//         }
//       };

//       const result = serverSchema.parse(data);
//       expect(result.parameters.sum).toBeInstanceOf(FieldValue);
//       expect(result.parameters.sum).toEqual(FieldValue.increment(5));
//     });

//     it('should accept negative increment values', () => {
//       const data = {
//         service: 'test-service',
//         date: '2024-03-20',
//         event: 'test-event',
//         parameters: {
//           sum: { type: 'increment', value: -3 }
//         }
//       };

//       const result = serverSchema.parse(data);
//       expect(result.parameters.sum).toBeInstanceOf(FieldValue);
//       expect(result.parameters.sum).toEqual(FieldValue.increment(-3));
//     });

//     it('should accept direct FieldValue instances', () => {
//       const data = {
//         service: 'test-service',
//         date: '2024-03-20',
//         event: 'test-event',
//         parameters: {
//           sum: FieldValue.increment(10)
//         }
//       };

//       const result = serverSchema.parse(data);
//       expect(result.parameters.sum).toBeInstanceOf(FieldValue);
//       expect(result.parameters.sum).toEqual(FieldValue.increment(10));
//     });

//     it('should handle zero values', () => {
//       const data = {
//         service: 'test-service',
//         date: '2024-03-20',
//         event: 'test-event',
//         parameters: {
//           sum: { type: 'increment', value: 0 }
//         }
//       };

//       const result = serverSchema.parse(data);
//       expect(result.parameters.sum).toBeInstanceOf(FieldValue);
//       expect(result.parameters.sum).toEqual(FieldValue.increment(0));
//     });

//     it('should reject non-numeric values', () => {
//       const data = {
//         service: 'test-service',
//         date: '2024-03-20',
//         event: 'test-event',
//         parameters: {
//           sum: { type: 'increment', value: 'not-a-number' }
//         }
//       };

//       expect(() => serverSchema.parse(data)).toThrow();
//     });

//     it('should handle client-side FieldValue operations', () => {
//       const data = {
//         service: 'test-service',
//         date: '2024-03-20',
//         event: 'test-event',
//         parameters: {
//           sum: { type: 'increment', value: 7 }
//         }
//       };

//       const result = clientSchema.parse(data);
//       expect(result.parameters.sum).toEqual({ type: 'increment', value: 7 });
//     });
//   });
// });

// // Create a test spec with different FieldValue operations
// const testSpec = {
//   increment: { _type: 'fieldValue' as const, operation: { type: 'increment' as const, value: z.number() } },
//   arrayUnion: { _type: 'fieldValue' as const, operation: { type: 'arrayUnion' as const, value: z.array(z.string()) } },
//   arrayRemove: { _type: 'fieldValue' as const, operation: { type: 'arrayRemove' as const, value: z.array(z.string()) } },
//   delete: { _type: 'fieldValue' as const, operation: { type: 'delete' as const } }
// };

// describe('FieldValue Operations', () => {
//   const schema = buildServerSchema(testSpec);

//   it('should handle arrayUnion operation', () => {
//     const data = {
//       increment: { type: 'increment', value: 5 },
//       arrayUnion: { type: 'arrayUnion', value: ['item1', 'item2'] },
//       arrayRemove: { type: 'arrayRemove', value: ['item3'] },
//       delete: { type: 'delete' }
//     };

//     const result = schema.parse(data);
//     expect(result.increment).toEqual(FieldValue.increment(5));
//     expect(result.arrayUnion).toEqual(FieldValue.arrayUnion('item1', 'item2'));
//     expect(result.arrayRemove).toEqual(FieldValue.arrayRemove('item3'));
//     expect(result.delete).toEqual(FieldValue.delete());
//   });

//   it('should validate arrayUnion input', () => {
//     const data = {
//       increment: { type: 'increment', value: 5 },
//       arrayUnion: { type: 'arrayUnion', value: 'not-an-array' }, // Invalid type
//       arrayRemove: { type: 'arrayRemove', value: ['item3'] },
//       delete: { type: 'delete' }
//     };

//     expect(() => schema.parse(data)).toThrow();
//   });

//   it('should handle empty arrays', () => {
//     const data = {
//       increment: { type: 'increment', value: 5 },
//       arrayUnion: { type: 'arrayUnion', value: [] },
//       arrayRemove: { type: 'arrayRemove', value: [] },
//       delete: { type: 'delete' }
//     };

//     const result = schema.parse(data);
//     expect(result.arrayUnion).toEqual(FieldValue.arrayUnion());
//     expect(result.arrayRemove).toEqual(FieldValue.arrayRemove());
//   });

//   it('should handle direct FieldValue instances', () => {
//     const data = {
//       increment: FieldValue.increment(5),
//       arrayUnion: FieldValue.arrayUnion('item1'),
//       arrayRemove: FieldValue.arrayRemove('item2'),
//       delete: FieldValue.delete()
//     };

//     const result = schema.parse(data);
//     expect(result.increment).toEqual(FieldValue.increment(5));
//     expect(result.arrayUnion).toEqual(FieldValue.arrayUnion('item1'));
//     expect(result.arrayRemove).toEqual(FieldValue.arrayRemove('item2'));
//     expect(result.delete).toEqual(FieldValue.delete());
//   });
// }); 