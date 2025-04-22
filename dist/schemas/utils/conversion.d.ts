export interface RefFieldMapping<TApp, TFirestore> {
    app: keyof TApp;
    firestore: keyof TFirestore;
    collection: string;
    isArray?: boolean;
    nullable?: boolean;
}
export interface DateFieldMapping<T> {
    field: keyof T;
    nullable?: boolean;
}
export declare const convertToDate: (value: unknown) => Date;
export declare const isDate: (value: unknown) => value is Date;
export declare function convertToFirestore<TApp extends Record<string, any>, TFirestore extends Record<string, any>>(appData: TApp, refFieldMappings: RefFieldMapping<TApp, TFirestore>[], dateFieldMappings?: DateFieldMapping<TApp>[]): TFirestore;
export declare function convertFromFirestore<TFirestore extends Record<string, any>, TApp extends Record<string, any>>(firestoreData: TFirestore, refFieldMappings: RefFieldMapping<TApp, TFirestore>[], dateFieldMappings?: DateFieldMapping<TFirestore>[], specialCaseHandler?: (result: Record<string, any>, firestoreData: TFirestore) => void): TApp;
