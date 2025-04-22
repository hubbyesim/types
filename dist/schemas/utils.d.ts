export interface GenericRefFieldMapping<AppType, FirestoreType> {
    app: keyof AppType;
    firestore: keyof FirestoreType;
    collection: string;
    nullable?: boolean;
    isArray?: boolean;
}
export interface GenericDateFieldMapping<AppType, FirestoreType> {
    field: keyof FirestoreType & keyof AppType;
    nullable?: boolean;
}
export declare const convertToDate: (value: any) => Date;
export declare const isDate: (value: any) => value is Date;
export declare function genericToFirestore<AppType extends Record<string, any>, FirestoreType extends Record<string, any>>({ appObject, refFieldMappings, dateFieldMappings, specialCaseHandler }: {
    appObject: AppType;
    refFieldMappings: GenericRefFieldMapping<AppType, FirestoreType>[];
    dateFieldMappings: GenericDateFieldMapping<AppType, FirestoreType>[];
    specialCaseHandler?: (result: Record<string, any>, appData: AppType) => void;
}): FirestoreType;
export declare function genericFromFirestore<FirestoreType extends Record<string, any>, AppType extends Record<string, any>>({ firestoreObject, refFieldMappings, dateFieldMappings, specialCaseHandler }: {
    firestoreObject: FirestoreType;
    refFieldMappings: GenericRefFieldMapping<AppType, FirestoreType>[];
    dateFieldMappings: GenericDateFieldMapping<AppType, FirestoreType>[];
    specialCaseHandler?: (result: Record<string, any>, firestoreData: FirestoreType) => void;
}): AppType;
