import { z } from 'zod';
import { Timestamp, DocumentReference, FieldValue, Firestore } from 'firebase-admin/firestore';
import * as admin from 'firebase-admin';
import { UserApp, BookingApp, financialPropertiesAppSchema, PartnerApp, PriceListApp, CountryApp, PackageApp, PromoCodeApp, ESIMApp, PaymentApp, MessageApp, SentMessagesApp, CurrencyApp, ApiLogApp } from './base/index.js';
export { API_LOG_COLLECTION, Address, BOOKING_COLLECTION, BankingDetails, BookingApiRequest, BookingApiResponse, BookingConfirmation, BookingDefaults, BookingStatus, COUNTRY_COLLECTION, CURRENCY_COLLECTION, CommunicationChannel, CommunicationChannelType, CommunicationOptions, CoversionRate, ESIM_COLLECTION, FinancialPropertiesApp, HApiLog, HBooking, HBookingConfirmation, HBookingDefaults, HCountry, HCurrency, HESIM, HFinancialProperties, HPackage, HPackagePrice, HPackageStrategy, HPartner, HPayment, HPlatformSettings, HPriceList, HPromoCode, HSchedule, HScheduleFilter, HVisualIdentity, HVisualIdentityBanner, HVisualIdentityBannerStrategy, MESSAGE_COLLECTION, PACKAGE_COLLECTION, PARTNER_COLLECTION, PAYMENT_COLLECTION, PRICE_LIST_COLLECTION, PROFILE_COLLECTION, PROMO_CODE_COLLECTION, PackagePriceApp, PackageSpecification, PackageSpecifications, PackageStrategy, PartnerApiRequest, PartnerApiResponse, PartnerPricingStrategyApp, PlatformSettings, PromoCodeApiResponse, Registration, SUPPORTED_LOCALES, Schedule, ScheduleFilter, SupportedLocales, SupportedLocalesFromSchema, USER_COLLECTION, UserPricingStrategyApp, VisualIdentity, VisualIdentityBanner, VisualIdentityBannerStrategy, addressSchema, apiLogAppSchema, apiLogRefString, apiLogRefStringArray, apiLogRefStringArrayNullable, apiLogRefStringNullable, bankingDetailsSchema, baseModelAppSchema, bookingApiRequestSchema, bookingApiResponseSchema, bookingAppSchema, bookingConfirmationSchema, bookingDefaultsSchema, bookingRefString, bookingRefStringArray, bookingRefStringArrayNullable, bookingRefStringNullable, bookingStatusSchema, commonBookingFields, commonCurrencyFields, commonESIMFields, commonFinancialPropertiesFields, commonPackageFields, commonPackagePriceFields, commonPartnerFields, commonPricingStrategyFields, communicationChannelSchema, communicationOptionsSchema, conversionRateSchema, convertToDate, countryAppSchema, countryRefString, countryRefStringArray, countryRefStringArrayNullable, countryRefStringNullable, currencyAppSchema, currencyRefString, currencyRefStringArray, currencyRefStringArrayNullable, currencyRefStringNullable, esimAppSchema, esimRefString, esimRefStringArray, esimRefStringArrayNullable, esimRefStringNullable, freeEsimSchema, isDate, messageAppSchema, messageRefString, messageRefStringArray, messageRefStringArrayNullable, messageRefStringNullable, packageAppSchema, packagePriceAppSchema, packageRefString, packageRefStringArray, packageRefStringArrayNullable, packageRefStringNullable, packageSpecificationSchema, packageSpecificationsSchema, packageStrategySchema, partnerApiRequestSchema, partnerApiResponseSchema, partnerAppSchema, partnerPricingStrategyAppSchema, partnerRefString, partnerRefStringArray, partnerRefStringArrayNullable, partnerRefStringNullable, paymentAppSchema, paymentRefString, paymentRefStringArray, paymentRefStringArrayNullable, paymentRefStringNullable, platformSettingsSchema, priceListAppSchema, priceListRefString, priceListRefStringArray, priceListRefStringArrayNullable, priceListRefStringNullable, profileRefString, profileRefStringArray, profileRefStringArrayNullable, profileRefStringNullable, promoCodeApiResponseSchema, promoCodeAppSchema, promoCodeRefString, promoCodeRefStringArray, promoCodeRefStringArrayNullable, promoCodeRefStringNullable, registrationSchema, scheduleFilterSchema, scheduleSchema, supportedLocalesSchema, userPricingStrategyAppSchema, userRefString, userRefStringArray, userRefStringArrayNullable, userRefStringNullable, visualIdentityBannerSchema, visualIdentityBannerStrategySchema, visualIdentitySchema } from './base/index.js';

declare class MockDocumentReference {
    path: string;
    id: string;
    constructor(collectionPath: string, id: string);
}
declare const timestampSchema: z.ZodType<Timestamp, z.ZodTypeDef, Timestamp>;
declare const documentRefSchema: z.ZodType<DocumentReference<admin.firestore.DocumentData, admin.firestore.DocumentData>, z.ZodTypeDef, DocumentReference<admin.firestore.DocumentData, admin.firestore.DocumentData>>;
declare const fieldValueSchema: z.ZodType<FieldValue, z.ZodTypeDef, FieldValue>;
declare const setFirestoreInstance: (db: Firestore) => void;
declare const getFirestoreInstance: () => Firestore;
declare const toFirestore: {
    date: (date: Date) => Timestamp;
    ref: <T>(collectionPath: string, id: string, db?: Firestore) => DocumentReference<T>;
};
declare const fromFirestore: {
    date: (timestamp: Timestamp) => Date;
    ref: <T>(docRef: DocumentReference<T> | MockDocumentReference) => string;
};
declare const baseModelSchema: z.ZodObject<{
    id: z.ZodString;
    created_at: z.ZodType<Timestamp, z.ZodTypeDef, Timestamp>;
    updated_at: z.ZodType<Timestamp, z.ZodTypeDef, Timestamp>;
    created_by: z.ZodUnion<[z.ZodString, z.ZodNull, z.ZodType<DocumentReference<admin.firestore.DocumentData, admin.firestore.DocumentData>, z.ZodTypeDef, DocumentReference<admin.firestore.DocumentData, admin.firestore.DocumentData>>]>;
    updated_by: z.ZodUnion<[z.ZodString, z.ZodNull, z.ZodType<DocumentReference<admin.firestore.DocumentData, admin.firestore.DocumentData>, z.ZodTypeDef, DocumentReference<admin.firestore.DocumentData, admin.firestore.DocumentData>>]>;
}, "strip", z.ZodTypeAny, {
    id: string;
    created_at: Timestamp;
    updated_at: Timestamp;
    created_by: string | DocumentReference<admin.firestore.DocumentData, admin.firestore.DocumentData> | null;
    updated_by: string | DocumentReference<admin.firestore.DocumentData, admin.firestore.DocumentData> | null;
}, {
    id: string;
    created_at: Timestamp;
    updated_at: Timestamp;
    created_by: string | DocumentReference<admin.firestore.DocumentData, admin.firestore.DocumentData> | null;
    updated_by: string | DocumentReference<admin.firestore.DocumentData, admin.firestore.DocumentData> | null;
}>;

declare const hubbyModelFirestoreSchema: z.ZodObject<{
    id: z.ZodString;
    created_at: z.ZodType<Timestamp, z.ZodTypeDef, Timestamp>;
    updated_at: z.ZodType<Timestamp, z.ZodTypeDef, Timestamp>;
    created_by: z.ZodUnion<[z.ZodString, z.ZodNull, z.ZodType<DocumentReference<admin.firestore.DocumentData, admin.firestore.DocumentData>, z.ZodTypeDef, DocumentReference<admin.firestore.DocumentData, admin.firestore.DocumentData>>]>;
    updated_by: z.ZodUnion<[z.ZodString, z.ZodNull, z.ZodType<DocumentReference<admin.firestore.DocumentData, admin.firestore.DocumentData>, z.ZodTypeDef, DocumentReference<admin.firestore.DocumentData, admin.firestore.DocumentData>>]>;
}, "strip", z.ZodTypeAny, {
    id: string;
    created_at: Timestamp;
    updated_at: Timestamp;
    created_by: string | DocumentReference<admin.firestore.DocumentData, admin.firestore.DocumentData> | null;
    updated_by: string | DocumentReference<admin.firestore.DocumentData, admin.firestore.DocumentData> | null;
}, {
    id: string;
    created_at: Timestamp;
    updated_at: Timestamp;
    created_by: string | DocumentReference<admin.firestore.DocumentData, admin.firestore.DocumentData> | null;
    updated_by: string | DocumentReference<admin.firestore.DocumentData, admin.firestore.DocumentData> | null;
}>;
declare const hubbyModelAppSchema: z.ZodObject<{
    id: z.ZodString;
    created_at: z.ZodEffects<z.ZodDate, Date, unknown>;
    updated_at: z.ZodEffects<z.ZodDate, Date, unknown>;
    created_by: z.ZodUnion<[z.ZodString, z.ZodNull]>;
    updated_by: z.ZodUnion<[z.ZodString, z.ZodNull]>;
}, "strip", z.ZodTypeAny, {
    id: string;
    created_at: Date;
    updated_at: Date;
    created_by: string | null;
    updated_by: string | null;
}, {
    id: string;
    created_by: string | null;
    updated_by: string | null;
    created_at?: unknown;
    updated_at?: unknown;
}>;
type HubbyModelFirestore = z.infer<typeof hubbyModelFirestoreSchema>;
type HubbyModelApp = z.infer<typeof hubbyModelAppSchema>;
type HubbyModel = HubbyModelFirestore;
type HHubbyModel = HubbyModelApp;
declare const createDocRefSchema: <T>(collectionPath: string) => {
    schema: z.ZodEffects<z.ZodType<DocumentReference<admin.firestore.DocumentData, admin.firestore.DocumentData>, z.ZodTypeDef, DocumentReference<admin.firestore.DocumentData, admin.firestore.DocumentData>>, DocumentReference<admin.firestore.DocumentData, admin.firestore.DocumentData>, DocumentReference<admin.firestore.DocumentData, admin.firestore.DocumentData>>;
    collectionPath: string;
};
declare const docRefToStringSchema: <T>(docRefSchema: ReturnType<typeof createDocRefSchema<T>>) => z.ZodString;

declare const partnerRefSchema: {
    schema: z.ZodEffects<z.ZodType<FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>, z.ZodTypeDef, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>;
    collectionPath: string;
};
declare const userRefSchema: {
    schema: z.ZodEffects<z.ZodType<FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>, z.ZodTypeDef, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>;
    collectionPath: string;
};
declare const profileRefSchema: {
    schema: z.ZodEffects<z.ZodType<FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>, z.ZodTypeDef, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>;
    collectionPath: string;
};
declare const packageRefSchema: {
    schema: z.ZodEffects<z.ZodType<FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>, z.ZodTypeDef, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>;
    collectionPath: string;
};
declare const promoCodeRefSchema: {
    schema: z.ZodEffects<z.ZodType<FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>, z.ZodTypeDef, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>;
    collectionPath: string;
};
declare const countryRefSchema: {
    schema: z.ZodEffects<z.ZodType<FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>, z.ZodTypeDef, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>;
    collectionPath: string;
};
declare const esimRefSchema: {
    schema: z.ZodEffects<z.ZodType<FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>, z.ZodTypeDef, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>;
    collectionPath: string;
};
declare const paymentRefSchema: {
    schema: z.ZodEffects<z.ZodType<FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>, z.ZodTypeDef, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>;
    collectionPath: string;
};
declare const priceListRefSchema: {
    schema: z.ZodEffects<z.ZodType<FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>, z.ZodTypeDef, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>;
    collectionPath: string;
};
declare const bookingRefSchema: {
    schema: z.ZodEffects<z.ZodType<FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>, z.ZodTypeDef, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>;
    collectionPath: string;
};
declare const messageRefSchema: {
    schema: z.ZodEffects<z.ZodType<FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>, z.ZodTypeDef, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>;
    collectionPath: string;
};
declare const currencyRefSchema: {
    schema: z.ZodEffects<z.ZodType<FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>, z.ZodTypeDef, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>;
    collectionPath: string;
};
declare const apiLogRefSchema: {
    schema: z.ZodEffects<z.ZodType<FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>, z.ZodTypeDef, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>;
    collectionPath: string;
};
declare const partnerRefNullable: z.ZodNullable<z.ZodEffects<z.ZodType<FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>, z.ZodTypeDef, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>>;
declare const userRefNullable: z.ZodNullable<z.ZodEffects<z.ZodType<FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>, z.ZodTypeDef, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>>;
declare const profileRefNullable: z.ZodNullable<z.ZodEffects<z.ZodType<FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>, z.ZodTypeDef, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>>;
declare const packageRefNullable: z.ZodNullable<z.ZodEffects<z.ZodType<FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>, z.ZodTypeDef, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>>;
declare const promoCodeRefNullable: z.ZodNullable<z.ZodEffects<z.ZodType<FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>, z.ZodTypeDef, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>>;
declare const countryRefNullable: z.ZodNullable<z.ZodEffects<z.ZodType<FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>, z.ZodTypeDef, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>>;
declare const esimRefNullable: z.ZodNullable<z.ZodEffects<z.ZodType<FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>, z.ZodTypeDef, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>>;
declare const paymentRefNullable: z.ZodNullable<z.ZodEffects<z.ZodType<FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>, z.ZodTypeDef, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>>;
declare const priceListRefNullable: z.ZodNullable<z.ZodEffects<z.ZodType<FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>, z.ZodTypeDef, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>>;
declare const bookingRefNullable: z.ZodNullable<z.ZodEffects<z.ZodType<FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>, z.ZodTypeDef, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>>;
declare const messageRefNullable: z.ZodNullable<z.ZodEffects<z.ZodType<FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>, z.ZodTypeDef, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>>;
declare const currencyRefNullable: z.ZodNullable<z.ZodEffects<z.ZodType<FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>, z.ZodTypeDef, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>>;
declare const apiLogRefNullable: z.ZodNullable<z.ZodEffects<z.ZodType<FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>, z.ZodTypeDef, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>>;
declare const partnerRefArray: z.ZodArray<z.ZodEffects<z.ZodType<FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>, z.ZodTypeDef, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>, "many">;
declare const userRefArray: z.ZodArray<z.ZodEffects<z.ZodType<FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>, z.ZodTypeDef, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>, "many">;
declare const profileRefArray: z.ZodArray<z.ZodEffects<z.ZodType<FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>, z.ZodTypeDef, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>, "many">;
declare const packageRefArray: z.ZodArray<z.ZodEffects<z.ZodType<FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>, z.ZodTypeDef, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>, "many">;
declare const promoCodeRefArray: z.ZodArray<z.ZodEffects<z.ZodType<FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>, z.ZodTypeDef, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>, "many">;
declare const countryRefArray: z.ZodArray<z.ZodEffects<z.ZodType<FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>, z.ZodTypeDef, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>, "many">;
declare const esimRefArray: z.ZodArray<z.ZodEffects<z.ZodType<FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>, z.ZodTypeDef, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>, "many">;
declare const paymentRefArray: z.ZodArray<z.ZodEffects<z.ZodType<FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>, z.ZodTypeDef, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>, "many">;
declare const priceListRefArray: z.ZodArray<z.ZodEffects<z.ZodType<FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>, z.ZodTypeDef, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>, "many">;
declare const bookingRefArray: z.ZodArray<z.ZodEffects<z.ZodType<FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>, z.ZodTypeDef, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>, "many">;
declare const messageRefArray: z.ZodArray<z.ZodEffects<z.ZodType<FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>, z.ZodTypeDef, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>, "many">;
declare const currencyRefArray: z.ZodArray<z.ZodEffects<z.ZodType<FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>, z.ZodTypeDef, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>, "many">;
declare const apiLogRefArray: z.ZodArray<z.ZodEffects<z.ZodType<FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>, z.ZodTypeDef, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>, "many">;
declare const partnerRefArrayNullable: z.ZodNullable<z.ZodArray<z.ZodEffects<z.ZodType<FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>, z.ZodTypeDef, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>, "many">>;
declare const userRefArrayNullable: z.ZodNullable<z.ZodArray<z.ZodEffects<z.ZodType<FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>, z.ZodTypeDef, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>, "many">>;
declare const profileRefArrayNullable: z.ZodNullable<z.ZodArray<z.ZodEffects<z.ZodType<FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>, z.ZodTypeDef, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>, "many">>;
declare const packageRefArrayNullable: z.ZodNullable<z.ZodArray<z.ZodEffects<z.ZodType<FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>, z.ZodTypeDef, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>, "many">>;
declare const promoCodeRefArrayNullable: z.ZodNullable<z.ZodArray<z.ZodEffects<z.ZodType<FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>, z.ZodTypeDef, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>, "many">>;
declare const countryRefArrayNullable: z.ZodNullable<z.ZodArray<z.ZodEffects<z.ZodType<FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>, z.ZodTypeDef, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>, "many">>;
declare const esimRefArrayNullable: z.ZodNullable<z.ZodArray<z.ZodEffects<z.ZodType<FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>, z.ZodTypeDef, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>, "many">>;
declare const paymentRefArrayNullable: z.ZodNullable<z.ZodArray<z.ZodEffects<z.ZodType<FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>, z.ZodTypeDef, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>, "many">>;
declare const priceListRefArrayNullable: z.ZodNullable<z.ZodArray<z.ZodEffects<z.ZodType<FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>, z.ZodTypeDef, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>, "many">>;
declare const bookingRefArrayNullable: z.ZodNullable<z.ZodArray<z.ZodEffects<z.ZodType<FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>, z.ZodTypeDef, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>, "many">>;
declare const messageRefArrayNullable: z.ZodNullable<z.ZodArray<z.ZodEffects<z.ZodType<FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>, z.ZodTypeDef, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>, "many">>;
declare const currencyRefArrayNullable: z.ZodNullable<z.ZodArray<z.ZodEffects<z.ZodType<FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>, z.ZodTypeDef, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>, "many">>;
declare const apiLogRefArrayNullable: z.ZodNullable<z.ZodArray<z.ZodEffects<z.ZodType<FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>, z.ZodTypeDef, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>, "many">>;

declare const apiKeySchema: z.ZodObject<{
    expires_at: z.ZodType<Timestamp, z.ZodTypeDef, Timestamp>;
    secret: z.ZodString;
    is_active: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    expires_at: Timestamp;
    secret: string;
    is_active: boolean;
}, {
    expires_at: Timestamp;
    secret: string;
    is_active: boolean;
}>;
declare const apiKeysSchema: z.ZodObject<{
    allowed_keys: z.ZodArray<z.ZodString, "many">;
    keys: z.ZodRecord<z.ZodString, z.ZodObject<{
        expires_at: z.ZodType<Timestamp, z.ZodTypeDef, Timestamp>;
        secret: z.ZodString;
        is_active: z.ZodBoolean;
    }, "strip", z.ZodTypeAny, {
        expires_at: Timestamp;
        secret: string;
        is_active: boolean;
    }, {
        expires_at: Timestamp;
        secret: string;
        is_active: boolean;
    }>>;
}, "strip", z.ZodTypeAny, {
    keys: Record<string, {
        expires_at: Timestamp;
        secret: string;
        is_active: boolean;
    }>;
    allowed_keys: string[];
}, {
    keys: Record<string, {
        expires_at: Timestamp;
        secret: string;
        is_active: boolean;
    }>;
    allowed_keys: string[];
}>;
declare const userFirestoreSchema: z.ZodObject<{
    id: z.ZodString;
    created_at: z.ZodType<Timestamp, z.ZodTypeDef, Timestamp>;
    updated_at: z.ZodType<Timestamp, z.ZodTypeDef, Timestamp>;
    created_by: z.ZodUnion<[z.ZodString, z.ZodNull, z.ZodType<DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>, z.ZodTypeDef, DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>]>;
    updated_by: z.ZodUnion<[z.ZodString, z.ZodNull, z.ZodType<DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>, z.ZodTypeDef, DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>]>;
} & {
    createdAt: z.ZodType<Timestamp, z.ZodTypeDef, Timestamp>;
    partner: z.ZodNullable<z.ZodEffects<z.ZodType<DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>, z.ZodTypeDef, DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>, DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>, DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>>;
    profileRef: z.ZodNullable<z.ZodEffects<z.ZodType<DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>, z.ZodTypeDef, DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>, DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>, DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>>;
    balance: z.ZodUnion<[z.ZodNumber, z.ZodNull, z.ZodType<FieldValue, z.ZodTypeDef, FieldValue>]>;
    review_requested: z.ZodNullable<z.ZodType<Timestamp, z.ZodTypeDef, Timestamp>>;
    last_seen: z.ZodNullable<z.ZodType<Timestamp, z.ZodTypeDef, Timestamp>>;
    api_keys: z.ZodNullable<z.ZodObject<{
        allowed_keys: z.ZodArray<z.ZodString, "many">;
        keys: z.ZodRecord<z.ZodString, z.ZodObject<{
            expires_at: z.ZodType<Timestamp, z.ZodTypeDef, Timestamp>;
            secret: z.ZodString;
            is_active: z.ZodBoolean;
        }, "strip", z.ZodTypeAny, {
            expires_at: Timestamp;
            secret: string;
            is_active: boolean;
        }, {
            expires_at: Timestamp;
            secret: string;
            is_active: boolean;
        }>>;
    }, "strip", z.ZodTypeAny, {
        keys: Record<string, {
            expires_at: Timestamp;
            secret: string;
            is_active: boolean;
        }>;
        allowed_keys: string[];
    }, {
        keys: Record<string, {
            expires_at: Timestamp;
            secret: string;
            is_active: boolean;
        }>;
        allowed_keys: string[];
    }>>;
    name: z.ZodNullable<z.ZodString>;
    email: z.ZodNullable<z.ZodString>;
    stripe_id: z.ZodNullable<z.ZodString>;
    referral: z.ZodNullable<z.ZodString>;
    fcm: z.ZodOptional<z.ZodString>;
    deeplink: z.ZodNullable<z.ZodString>;
    gender: z.ZodNullable<z.ZodString>;
    company: z.ZodNullable<z.ZodString>;
    coordinates: z.ZodNullable<z.ZodString>;
    parameters: z.ZodNullable<z.ZodAny>;
    locale: z.ZodNullable<z.ZodString>;
    phone_model: z.ZodNullable<z.ZodString>;
    phone_os: z.ZodNullable<z.ZodString>;
    phone_os_version: z.ZodNullable<z.ZodString>;
    ios: z.ZodNullable<z.ZodBoolean>;
    has_card_saved: z.ZodNullable<z.ZodBoolean>;
    admin: z.ZodNullable<z.ZodBoolean>;
    currency: z.ZodNullable<z.ZodString>;
    receipt_email: z.ZodNullable<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    id: string;
    created_at: Timestamp;
    updated_at: Timestamp;
    created_by: string | DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData> | null;
    updated_by: string | DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData> | null;
    createdAt: Timestamp;
    partner: DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData> | null;
    profileRef: DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData> | null;
    balance: number | FieldValue | null;
    review_requested: Timestamp | null;
    last_seen: Timestamp | null;
    name: string | null;
    email: string | null;
    stripe_id: string | null;
    referral: string | null;
    deeplink: string | null;
    gender: string | null;
    company: string | null;
    coordinates: string | null;
    locale: string | null;
    phone_model: string | null;
    phone_os: string | null;
    phone_os_version: string | null;
    ios: boolean | null;
    has_card_saved: boolean | null;
    admin: boolean | null;
    api_keys: {
        keys: Record<string, {
            expires_at: Timestamp;
            secret: string;
            is_active: boolean;
        }>;
        allowed_keys: string[];
    } | null;
    currency: string | null;
    receipt_email: string | null;
    fcm?: string | undefined;
    parameters?: any;
}, {
    id: string;
    created_at: Timestamp;
    updated_at: Timestamp;
    created_by: string | DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData> | null;
    updated_by: string | DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData> | null;
    createdAt: Timestamp;
    partner: DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData> | null;
    profileRef: DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData> | null;
    balance: number | FieldValue | null;
    review_requested: Timestamp | null;
    last_seen: Timestamp | null;
    name: string | null;
    email: string | null;
    stripe_id: string | null;
    referral: string | null;
    deeplink: string | null;
    gender: string | null;
    company: string | null;
    coordinates: string | null;
    locale: string | null;
    phone_model: string | null;
    phone_os: string | null;
    phone_os_version: string | null;
    ios: boolean | null;
    has_card_saved: boolean | null;
    admin: boolean | null;
    api_keys: {
        keys: Record<string, {
            expires_at: Timestamp;
            secret: string;
            is_active: boolean;
        }>;
        allowed_keys: string[];
    } | null;
    currency: string | null;
    receipt_email: string | null;
    fcm?: string | undefined;
    parameters?: any;
}>;
type UserFirestore = z.infer<typeof userFirestoreSchema>;
type ApiKeys = z.infer<typeof apiKeysSchema>;
type ApiKey = z.infer<typeof apiKeySchema>;
declare const userToFirestore: (user: UserApp) => UserFirestore;
declare const userFromFirestore: (firestoreUser: UserFirestore) => UserApp;
declare const userToFirestoreWithBalance: (user: UserApp) => UserFirestore;

type User = UserFirestore;

declare const bookingFirestoreSchema: z.ZodObject<{
    id: z.ZodString;
    created_at: z.ZodType<FirebaseFirestore.Timestamp, z.ZodTypeDef, FirebaseFirestore.Timestamp>;
    updated_at: z.ZodType<FirebaseFirestore.Timestamp, z.ZodTypeDef, FirebaseFirestore.Timestamp>;
    created_by: z.ZodUnion<[z.ZodString, z.ZodNull, z.ZodType<FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>, z.ZodTypeDef, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>]>;
    updated_by: z.ZodUnion<[z.ZodString, z.ZodNull, z.ZodType<FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>, z.ZodTypeDef, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>]>;
} & {
    return_date: z.ZodNullable<z.ZodType<FirebaseFirestore.Timestamp, z.ZodTypeDef, FirebaseFirestore.Timestamp>>;
    departure_date: z.ZodType<FirebaseFirestore.Timestamp, z.ZodTypeDef, FirebaseFirestore.Timestamp>;
    partner: z.ZodEffects<z.ZodType<FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>, z.ZodTypeDef, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>;
    promo_codes: z.ZodArray<z.ZodEffects<z.ZodType<FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>, z.ZodTypeDef, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>, "many">;
    users: z.ZodNullable<z.ZodArray<z.ZodEffects<z.ZodType<FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>, z.ZodTypeDef, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>, "many">>;
    esims: z.ZodNullable<z.ZodArray<z.ZodEffects<z.ZodType<FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>, z.ZodTypeDef, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>, "many">>;
    title: z.ZodNullable<z.ZodString>;
    first_name: z.ZodString;
    last_name: z.ZodString;
    full_name: z.ZodString;
    pax: z.ZodNumber;
    email: z.ZodNullable<z.ZodString>;
    phone: z.ZodNullable<z.ZodString>;
    booking_id: z.ZodNullable<z.ZodString>;
    flight_number: z.ZodOptional<z.ZodString>;
    gender: z.ZodOptional<z.ZodEnum<["M", "F", "O"]>>;
    package_size: z.ZodOptional<z.ZodString>;
    sent_messages: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
    locale: z.ZodEnum<["en-US", "en-GB", "nl-NL", "de-DE", "fr-FR", "it-IT", "es-ES", "cs-CZ", "pl-PL", "pt-PT", "fr-BE", "nl-BE", "de-AT", "de-CH", "fr-CH", "it-CH", "de-BE"]>;
    status: z.ZodEnum<["PENDING", "CONFIRMED", "COMPLETED", "CANCELLED", "UNPAID", "EXPIRED"]>;
    data: z.ZodObject<{
        source: z.ZodString;
        manual: z.ZodBoolean;
    }, "strip", z.ZodTypeAny, {
        source: string;
        manual: boolean;
    }, {
        source: string;
        manual: boolean;
    }>;
    communication_options: z.ZodObject<{
        should_send_message: z.ZodBoolean;
        channels: z.ZodArray<z.ZodEnum<["EMAIL", "WHATSAPP", "PUSH_NOTIFICATION", "SMS"]>, "many">;
    }, "strip", z.ZodTypeAny, {
        should_send_message: boolean;
        channels: ("EMAIL" | "WHATSAPP" | "PUSH_NOTIFICATION" | "SMS")[];
    }, {
        should_send_message: boolean;
        channels: ("EMAIL" | "WHATSAPP" | "PUSH_NOTIFICATION" | "SMS")[];
    }>;
    is_processed_for_esim_restoration: z.ZodBoolean;
    is_pseudonymized: z.ZodBoolean;
    import_id: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    package_specifications: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
}, "strip", z.ZodTypeAny, {
    id: string;
    status: "PENDING" | "CONFIRMED" | "COMPLETED" | "CANCELLED" | "UNPAID" | "EXPIRED";
    created_at: FirebaseFirestore.Timestamp;
    updated_at: FirebaseFirestore.Timestamp;
    created_by: string | FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData> | null;
    updated_by: string | FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData> | null;
    users: FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>[] | null;
    promo_codes: FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>[];
    esims: FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>[] | null;
    partner: FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>;
    email: string | null;
    locale: "en-US" | "en-GB" | "nl-NL" | "de-DE" | "fr-FR" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "de-BE";
    return_date: FirebaseFirestore.Timestamp | null;
    departure_date: FirebaseFirestore.Timestamp;
    title: string | null;
    first_name: string;
    last_name: string;
    full_name: string;
    pax: number;
    phone: string | null;
    booking_id: string | null;
    data: {
        source: string;
        manual: boolean;
    };
    communication_options: {
        should_send_message: boolean;
        channels: ("EMAIL" | "WHATSAPP" | "PUSH_NOTIFICATION" | "SMS")[];
    };
    is_processed_for_esim_restoration: boolean;
    is_pseudonymized: boolean;
    gender?: "M" | "F" | "O" | undefined;
    flight_number?: string | undefined;
    package_size?: string | undefined;
    sent_messages?: Record<string, any> | undefined;
    import_id?: string | null | undefined;
    package_specifications?: Record<string, any> | undefined;
}, {
    id: string;
    status: "PENDING" | "CONFIRMED" | "COMPLETED" | "CANCELLED" | "UNPAID" | "EXPIRED";
    created_at: FirebaseFirestore.Timestamp;
    updated_at: FirebaseFirestore.Timestamp;
    created_by: string | FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData> | null;
    updated_by: string | FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData> | null;
    users: FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>[] | null;
    promo_codes: FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>[];
    esims: FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>[] | null;
    partner: FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>;
    email: string | null;
    locale: "en-US" | "en-GB" | "nl-NL" | "de-DE" | "fr-FR" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "de-BE";
    return_date: FirebaseFirestore.Timestamp | null;
    departure_date: FirebaseFirestore.Timestamp;
    title: string | null;
    first_name: string;
    last_name: string;
    full_name: string;
    pax: number;
    phone: string | null;
    booking_id: string | null;
    data: {
        source: string;
        manual: boolean;
    };
    communication_options: {
        should_send_message: boolean;
        channels: ("EMAIL" | "WHATSAPP" | "PUSH_NOTIFICATION" | "SMS")[];
    };
    is_processed_for_esim_restoration: boolean;
    is_pseudonymized: boolean;
    gender?: "M" | "F" | "O" | undefined;
    flight_number?: string | undefined;
    package_size?: string | undefined;
    sent_messages?: Record<string, any> | undefined;
    import_id?: string | null | undefined;
    package_specifications?: Record<string, any> | undefined;
}>;
type BookingFirestore = z.infer<typeof bookingFirestoreSchema>;
declare const bookingToFirestore: (booking: BookingApp) => BookingFirestore;
declare const bookingFromFirestore: (firestoreBooking: BookingFirestore) => BookingApp;
type Booking = BookingFirestore;

declare const packagePriceFirestoreSchema: z.ZodObject<{
    package: z.ZodEffects<z.ZodType<FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>, z.ZodTypeDef, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>;
    destination: z.ZodString;
    label: z.ZodString;
    type: z.ZodEnum<["data-limit", "time-limit"]>;
    price: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    type: "data-limit" | "time-limit";
    package: FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>;
    destination: string;
    label: string;
    price: number;
}, {
    type: "data-limit" | "time-limit";
    package: FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>;
    destination: string;
    label: string;
    price: number;
}>;
declare const partnerPricingStrategyFirestoreSchema: z.ZodObject<{
    strategy: z.ZodEnum<["split", "bundle"]>;
    default_price_list: z.ZodNullable<z.ZodEffects<z.ZodType<FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>, z.ZodTypeDef, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>>;
    custom_prices: z.ZodArray<z.ZodObject<{
        package: z.ZodEffects<z.ZodType<FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>, z.ZodTypeDef, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>;
        destination: z.ZodString;
        label: z.ZodString;
        type: z.ZodEnum<["data-limit", "time-limit"]>;
        price: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        type: "data-limit" | "time-limit";
        package: FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>;
        destination: string;
        label: string;
        price: number;
    }, {
        type: "data-limit" | "time-limit";
        package: FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>;
        destination: string;
        label: string;
        price: number;
    }>, "many">;
    modification_percentage: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    strategy: "split" | "bundle";
    default_price_list: FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData> | null;
    custom_prices: {
        type: "data-limit" | "time-limit";
        package: FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>;
        destination: string;
        label: string;
        price: number;
    }[];
    modification_percentage: number;
}, {
    strategy: "split" | "bundle";
    default_price_list: FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData> | null;
    custom_prices: {
        type: "data-limit" | "time-limit";
        package: FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>;
        destination: string;
        label: string;
        price: number;
    }[];
    modification_percentage: number;
}>;
declare const userPricingStrategyFirestoreSchema: z.ZodObject<{
    default_price_list: z.ZodNullable<z.ZodEffects<z.ZodType<FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>, z.ZodTypeDef, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>>;
    custom_prices: z.ZodArray<z.ZodObject<{
        package: z.ZodEffects<z.ZodType<FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>, z.ZodTypeDef, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>;
        destination: z.ZodString;
        label: z.ZodString;
        type: z.ZodEnum<["data-limit", "time-limit"]>;
        price: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        type: "data-limit" | "time-limit";
        package: FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>;
        destination: string;
        label: string;
        price: number;
    }, {
        type: "data-limit" | "time-limit";
        package: FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>;
        destination: string;
        label: string;
        price: number;
    }>, "many">;
    modification_percentage: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    default_price_list: FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData> | null;
    custom_prices: {
        type: "data-limit" | "time-limit";
        package: FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>;
        destination: string;
        label: string;
        price: number;
    }[];
    modification_percentage: number;
}, {
    default_price_list: FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData> | null;
    custom_prices: {
        type: "data-limit" | "time-limit";
        package: FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>;
        destination: string;
        label: string;
        price: number;
    }[];
    modification_percentage: number;
}>;
declare const financialPropertiesFirestoreSchema: z.ZodNullable<z.ZodObject<{
    pricing_strategies: z.ZodNullable<z.ZodObject<{
        partner: z.ZodOptional<z.ZodObject<{
            strategy: z.ZodEnum<["split", "bundle"]>;
            default_price_list: z.ZodNullable<z.ZodEffects<z.ZodType<FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>, z.ZodTypeDef, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>>;
            custom_prices: z.ZodArray<z.ZodObject<{
                package: z.ZodEffects<z.ZodType<FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>, z.ZodTypeDef, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>;
                destination: z.ZodString;
                label: z.ZodString;
                type: z.ZodEnum<["data-limit", "time-limit"]>;
                price: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                type: "data-limit" | "time-limit";
                package: FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>;
                destination: string;
                label: string;
                price: number;
            }, {
                type: "data-limit" | "time-limit";
                package: FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>;
                destination: string;
                label: string;
                price: number;
            }>, "many">;
            modification_percentage: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            strategy: "split" | "bundle";
            default_price_list: FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData> | null;
            custom_prices: {
                type: "data-limit" | "time-limit";
                package: FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>;
                destination: string;
                label: string;
                price: number;
            }[];
            modification_percentage: number;
        }, {
            strategy: "split" | "bundle";
            default_price_list: FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData> | null;
            custom_prices: {
                type: "data-limit" | "time-limit";
                package: FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>;
                destination: string;
                label: string;
                price: number;
            }[];
            modification_percentage: number;
        }>>;
        user: z.ZodOptional<z.ZodObject<{
            default_price_list: z.ZodNullable<z.ZodEffects<z.ZodType<FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>, z.ZodTypeDef, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>>;
            custom_prices: z.ZodArray<z.ZodObject<{
                package: z.ZodEffects<z.ZodType<FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>, z.ZodTypeDef, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>;
                destination: z.ZodString;
                label: z.ZodString;
                type: z.ZodEnum<["data-limit", "time-limit"]>;
                price: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                type: "data-limit" | "time-limit";
                package: FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>;
                destination: string;
                label: string;
                price: number;
            }, {
                type: "data-limit" | "time-limit";
                package: FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>;
                destination: string;
                label: string;
                price: number;
            }>, "many">;
            modification_percentage: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            default_price_list: FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData> | null;
            custom_prices: {
                type: "data-limit" | "time-limit";
                package: FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>;
                destination: string;
                label: string;
                price: number;
            }[];
            modification_percentage: number;
        }, {
            default_price_list: FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData> | null;
            custom_prices: {
                type: "data-limit" | "time-limit";
                package: FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>;
                destination: string;
                label: string;
                price: number;
            }[];
            modification_percentage: number;
        }>>;
    }, "strip", z.ZodTypeAny, {
        partner?: {
            strategy: "split" | "bundle";
            default_price_list: FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData> | null;
            custom_prices: {
                type: "data-limit" | "time-limit";
                package: FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>;
                destination: string;
                label: string;
                price: number;
            }[];
            modification_percentage: number;
        } | undefined;
        user?: {
            default_price_list: FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData> | null;
            custom_prices: {
                type: "data-limit" | "time-limit";
                package: FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>;
                destination: string;
                label: string;
                price: number;
            }[];
            modification_percentage: number;
        } | undefined;
    }, {
        partner?: {
            strategy: "split" | "bundle";
            default_price_list: FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData> | null;
            custom_prices: {
                type: "data-limit" | "time-limit";
                package: FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>;
                destination: string;
                label: string;
                price: number;
            }[];
            modification_percentage: number;
        } | undefined;
        user?: {
            default_price_list: FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData> | null;
            custom_prices: {
                type: "data-limit" | "time-limit";
                package: FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>;
                destination: string;
                label: string;
                price: number;
            }[];
            modification_percentage: number;
        } | undefined;
    }>>;
    next_invoice: z.ZodNullable<z.ZodType<FirebaseFirestore.Timestamp, z.ZodTypeDef, FirebaseFirestore.Timestamp>>;
    last_invoice: z.ZodNullable<z.ZodType<FirebaseFirestore.Timestamp, z.ZodTypeDef, FirebaseFirestore.Timestamp>>;
    administration_fee: z.ZodNullable<z.ZodNumber>;
    income_per_gb: z.ZodNullable<z.ZodNumber>;
    commission_fee: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    payment_method: z.ZodEnum<["invoice", "direct"]>;
    requires_card: z.ZodNullable<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    pricing_strategies: {
        partner?: {
            strategy: "split" | "bundle";
            default_price_list: FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData> | null;
            custom_prices: {
                type: "data-limit" | "time-limit";
                package: FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>;
                destination: string;
                label: string;
                price: number;
            }[];
            modification_percentage: number;
        } | undefined;
        user?: {
            default_price_list: FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData> | null;
            custom_prices: {
                type: "data-limit" | "time-limit";
                package: FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>;
                destination: string;
                label: string;
                price: number;
            }[];
            modification_percentage: number;
        } | undefined;
    } | null;
    administration_fee: number | null;
    income_per_gb: number | null;
    payment_method: "invoice" | "direct";
    requires_card: boolean | null;
    next_invoice: FirebaseFirestore.Timestamp | null;
    last_invoice: FirebaseFirestore.Timestamp | null;
    commission_fee?: number | null | undefined;
}, {
    pricing_strategies: {
        partner?: {
            strategy: "split" | "bundle";
            default_price_list: FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData> | null;
            custom_prices: {
                type: "data-limit" | "time-limit";
                package: FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>;
                destination: string;
                label: string;
                price: number;
            }[];
            modification_percentage: number;
        } | undefined;
        user?: {
            default_price_list: FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData> | null;
            custom_prices: {
                type: "data-limit" | "time-limit";
                package: FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>;
                destination: string;
                label: string;
                price: number;
            }[];
            modification_percentage: number;
        } | undefined;
    } | null;
    administration_fee: number | null;
    income_per_gb: number | null;
    payment_method: "invoice" | "direct";
    requires_card: boolean | null;
    next_invoice: FirebaseFirestore.Timestamp | null;
    last_invoice: FirebaseFirestore.Timestamp | null;
    commission_fee?: number | null | undefined;
}>>;
declare const partnerFirestoreSchema: z.ZodObject<{
    id: z.ZodString;
    created_at: z.ZodType<FirebaseFirestore.Timestamp, z.ZodTypeDef, FirebaseFirestore.Timestamp>;
    updated_at: z.ZodType<FirebaseFirestore.Timestamp, z.ZodTypeDef, FirebaseFirestore.Timestamp>;
    created_by: z.ZodUnion<[z.ZodString, z.ZodNull, z.ZodType<FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>, z.ZodTypeDef, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>]>;
    updated_by: z.ZodUnion<[z.ZodString, z.ZodNull, z.ZodType<FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>, z.ZodTypeDef, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>]>;
} & {
    parent: z.ZodNullable<z.ZodEffects<z.ZodType<FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>, z.ZodTypeDef, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>>;
    users: z.ZodNullable<z.ZodArray<z.ZodEffects<z.ZodType<FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>, z.ZodTypeDef, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>, "many">>;
    financial_properties: z.ZodNullable<z.ZodObject<{
        pricing_strategies: z.ZodNullable<z.ZodObject<{
            partner: z.ZodOptional<z.ZodObject<{
                strategy: z.ZodEnum<["split", "bundle"]>;
                default_price_list: z.ZodNullable<z.ZodEffects<z.ZodType<FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>, z.ZodTypeDef, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>>;
                custom_prices: z.ZodArray<z.ZodObject<{
                    package: z.ZodEffects<z.ZodType<FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>, z.ZodTypeDef, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>;
                    destination: z.ZodString;
                    label: z.ZodString;
                    type: z.ZodEnum<["data-limit", "time-limit"]>;
                    price: z.ZodNumber;
                }, "strip", z.ZodTypeAny, {
                    type: "data-limit" | "time-limit";
                    package: FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>;
                    destination: string;
                    label: string;
                    price: number;
                }, {
                    type: "data-limit" | "time-limit";
                    package: FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>;
                    destination: string;
                    label: string;
                    price: number;
                }>, "many">;
                modification_percentage: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                strategy: "split" | "bundle";
                default_price_list: FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData> | null;
                custom_prices: {
                    type: "data-limit" | "time-limit";
                    package: FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>;
                    destination: string;
                    label: string;
                    price: number;
                }[];
                modification_percentage: number;
            }, {
                strategy: "split" | "bundle";
                default_price_list: FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData> | null;
                custom_prices: {
                    type: "data-limit" | "time-limit";
                    package: FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>;
                    destination: string;
                    label: string;
                    price: number;
                }[];
                modification_percentage: number;
            }>>;
            user: z.ZodOptional<z.ZodObject<{
                default_price_list: z.ZodNullable<z.ZodEffects<z.ZodType<FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>, z.ZodTypeDef, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>>;
                custom_prices: z.ZodArray<z.ZodObject<{
                    package: z.ZodEffects<z.ZodType<FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>, z.ZodTypeDef, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>;
                    destination: z.ZodString;
                    label: z.ZodString;
                    type: z.ZodEnum<["data-limit", "time-limit"]>;
                    price: z.ZodNumber;
                }, "strip", z.ZodTypeAny, {
                    type: "data-limit" | "time-limit";
                    package: FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>;
                    destination: string;
                    label: string;
                    price: number;
                }, {
                    type: "data-limit" | "time-limit";
                    package: FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>;
                    destination: string;
                    label: string;
                    price: number;
                }>, "many">;
                modification_percentage: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                default_price_list: FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData> | null;
                custom_prices: {
                    type: "data-limit" | "time-limit";
                    package: FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>;
                    destination: string;
                    label: string;
                    price: number;
                }[];
                modification_percentage: number;
            }, {
                default_price_list: FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData> | null;
                custom_prices: {
                    type: "data-limit" | "time-limit";
                    package: FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>;
                    destination: string;
                    label: string;
                    price: number;
                }[];
                modification_percentage: number;
            }>>;
        }, "strip", z.ZodTypeAny, {
            partner?: {
                strategy: "split" | "bundle";
                default_price_list: FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData> | null;
                custom_prices: {
                    type: "data-limit" | "time-limit";
                    package: FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>;
                    destination: string;
                    label: string;
                    price: number;
                }[];
                modification_percentage: number;
            } | undefined;
            user?: {
                default_price_list: FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData> | null;
                custom_prices: {
                    type: "data-limit" | "time-limit";
                    package: FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>;
                    destination: string;
                    label: string;
                    price: number;
                }[];
                modification_percentage: number;
            } | undefined;
        }, {
            partner?: {
                strategy: "split" | "bundle";
                default_price_list: FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData> | null;
                custom_prices: {
                    type: "data-limit" | "time-limit";
                    package: FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>;
                    destination: string;
                    label: string;
                    price: number;
                }[];
                modification_percentage: number;
            } | undefined;
            user?: {
                default_price_list: FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData> | null;
                custom_prices: {
                    type: "data-limit" | "time-limit";
                    package: FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>;
                    destination: string;
                    label: string;
                    price: number;
                }[];
                modification_percentage: number;
            } | undefined;
        }>>;
        next_invoice: z.ZodNullable<z.ZodType<FirebaseFirestore.Timestamp, z.ZodTypeDef, FirebaseFirestore.Timestamp>>;
        last_invoice: z.ZodNullable<z.ZodType<FirebaseFirestore.Timestamp, z.ZodTypeDef, FirebaseFirestore.Timestamp>>;
        administration_fee: z.ZodNullable<z.ZodNumber>;
        income_per_gb: z.ZodNullable<z.ZodNumber>;
        commission_fee: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        payment_method: z.ZodEnum<["invoice", "direct"]>;
        requires_card: z.ZodNullable<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        pricing_strategies: {
            partner?: {
                strategy: "split" | "bundle";
                default_price_list: FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData> | null;
                custom_prices: {
                    type: "data-limit" | "time-limit";
                    package: FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>;
                    destination: string;
                    label: string;
                    price: number;
                }[];
                modification_percentage: number;
            } | undefined;
            user?: {
                default_price_list: FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData> | null;
                custom_prices: {
                    type: "data-limit" | "time-limit";
                    package: FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>;
                    destination: string;
                    label: string;
                    price: number;
                }[];
                modification_percentage: number;
            } | undefined;
        } | null;
        administration_fee: number | null;
        income_per_gb: number | null;
        payment_method: "invoice" | "direct";
        requires_card: boolean | null;
        next_invoice: FirebaseFirestore.Timestamp | null;
        last_invoice: FirebaseFirestore.Timestamp | null;
        commission_fee?: number | null | undefined;
    }, {
        pricing_strategies: {
            partner?: {
                strategy: "split" | "bundle";
                default_price_list: FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData> | null;
                custom_prices: {
                    type: "data-limit" | "time-limit";
                    package: FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>;
                    destination: string;
                    label: string;
                    price: number;
                }[];
                modification_percentage: number;
            } | undefined;
            user?: {
                default_price_list: FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData> | null;
                custom_prices: {
                    type: "data-limit" | "time-limit";
                    package: FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>;
                    destination: string;
                    label: string;
                    price: number;
                }[];
                modification_percentage: number;
            } | undefined;
        } | null;
        administration_fee: number | null;
        income_per_gb: number | null;
        payment_method: "invoice" | "direct";
        requires_card: boolean | null;
        next_invoice: FirebaseFirestore.Timestamp | null;
        last_invoice: FirebaseFirestore.Timestamp | null;
        commission_fee?: number | null | undefined;
    }>>;
    platform_settings: z.ZodNullable<z.ZodObject<{
        package_strategy: z.ZodOptional<z.ZodNullable<z.ZodObject<{
            name: z.ZodString;
            iso3_white_list: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            parameters: z.ZodAny;
        }, "strip", z.ZodTypeAny, {
            name: string;
            parameters?: any;
            iso3_white_list?: string[] | undefined;
        }, {
            name: string;
            parameters?: any;
            iso3_white_list?: string[] | undefined;
        }>>>;
        free_esim: z.ZodOptional<z.ZodNullable<z.ZodObject<{
            package_specification: z.ZodObject<{
                size: z.ZodString;
                type: z.ZodString;
                destination: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                type: string;
                destination: string;
                size: string;
            }, {
                type: string;
                destination: string;
                size: string;
            }>;
            allowance: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            package_specification: {
                type: string;
                destination: string;
                size: string;
            };
            allowance: number;
        }, {
            package_specification: {
                type: string;
                destination: string;
                size: string;
            };
            allowance: number;
        }>>>;
        booking_defaults: z.ZodOptional<z.ZodNullable<z.ZodObject<{
            locale: z.ZodEnum<["en-US", "en-GB", "nl-NL", "de-DE", "fr-FR", "it-IT", "es-ES", "cs-CZ", "pl-PL", "pt-PT", "fr-BE", "nl-BE", "de-AT", "de-CH", "fr-CH", "it-CH", "de-BE"]>;
        }, "strip", z.ZodTypeAny, {
            locale: "en-US" | "en-GB" | "nl-NL" | "de-DE" | "fr-FR" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "de-BE";
        }, {
            locale: "en-US" | "en-GB" | "nl-NL" | "de-DE" | "fr-FR" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "de-BE";
        }>>>;
        booking_confirmation: z.ZodOptional<z.ZodNullable<z.ZodObject<{
            brevo_template_id: z.ZodNumber;
            send_booking_confirmation: z.ZodBoolean;
        }, "strip", z.ZodTypeAny, {
            brevo_template_id: number;
            send_booking_confirmation: boolean;
        }, {
            brevo_template_id: number;
            send_booking_confirmation: boolean;
        }>>>;
        schedules: z.ZodOptional<z.ZodArray<z.ZodObject<{
            days: z.ZodNumber;
            email: z.ZodOptional<z.ZodNullable<z.ZodObject<{
                brevo_template_id: z.ZodNumber;
                subject: z.ZodOptional<z.ZodEffects<z.ZodRecord<z.ZodString, z.ZodString>, Record<string, string>, Record<string, string>>>;
                preview_text: z.ZodOptional<z.ZodEffects<z.ZodRecord<z.ZodString, z.ZodString>, Record<string, string>, Record<string, string>>>;
            }, "strip", z.ZodTypeAny, {
                brevo_template_id: number;
                subject?: Record<string, string> | undefined;
                preview_text?: Record<string, string> | undefined;
            }, {
                brevo_template_id: number;
                subject?: Record<string, string> | undefined;
                preview_text?: Record<string, string> | undefined;
            }>>>;
            push: z.ZodOptional<z.ZodNullable<z.ZodObject<{
                title: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
                body: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
                target: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                target: string;
                title?: Record<string, string> | undefined;
                body?: Record<string, string> | undefined;
            }, {
                target: string;
                title?: Record<string, string> | undefined;
                body?: Record<string, string> | undefined;
            }>>>;
            hour: z.ZodNumber;
            key: z.ZodString;
            method: z.ZodEnum<["email", "sms", "whatsapp", "push"]>;
            moment: z.ZodEnum<["departure", "return", "immediate"]>;
            filter: z.ZodOptional<z.ZodNullable<z.ZodNullable<z.ZodObject<{
                type: z.ZodEnum<["iso3", "gender", "percentage", "age"]>;
                value: z.ZodUnion<[z.ZodString, z.ZodNumber]>;
                comparison: z.ZodEnum<["equal", "not_equal", "greater_than", "less_than", "greater_than_or_equal", "less_than_or_equal"]>;
            }, "strip", z.ZodTypeAny, {
                value: string | number;
                type: "gender" | "iso3" | "percentage" | "age";
                comparison: "equal" | "not_equal" | "greater_than" | "less_than" | "greater_than_or_equal" | "less_than_or_equal";
            }, {
                value: string | number;
                type: "gender" | "iso3" | "percentage" | "age";
                comparison: "equal" | "not_equal" | "greater_than" | "less_than" | "greater_than_or_equal" | "less_than_or_equal";
            }>>>>;
        }, "strip", z.ZodTypeAny, {
            days: number;
            hour: number;
            key: string;
            method: "push" | "email" | "sms" | "whatsapp";
            moment: "departure" | "return" | "immediate";
            push?: {
                target: string;
                title?: Record<string, string> | undefined;
                body?: Record<string, string> | undefined;
            } | null | undefined;
            filter?: {
                value: string | number;
                type: "gender" | "iso3" | "percentage" | "age";
                comparison: "equal" | "not_equal" | "greater_than" | "less_than" | "greater_than_or_equal" | "less_than_or_equal";
            } | null | undefined;
            email?: {
                brevo_template_id: number;
                subject?: Record<string, string> | undefined;
                preview_text?: Record<string, string> | undefined;
            } | null | undefined;
        }, {
            days: number;
            hour: number;
            key: string;
            method: "push" | "email" | "sms" | "whatsapp";
            moment: "departure" | "return" | "immediate";
            push?: {
                target: string;
                title?: Record<string, string> | undefined;
                body?: Record<string, string> | undefined;
            } | null | undefined;
            filter?: {
                value: string | number;
                type: "gender" | "iso3" | "percentage" | "age";
                comparison: "equal" | "not_equal" | "greater_than" | "less_than" | "greater_than_or_equal" | "less_than_or_equal";
            } | null | undefined;
            email?: {
                brevo_template_id: number;
                subject?: Record<string, string> | undefined;
                preview_text?: Record<string, string> | undefined;
            } | null | undefined;
        }>, "many">>;
    }, "strip", z.ZodTypeAny, {
        package_strategy?: {
            name: string;
            parameters?: any;
            iso3_white_list?: string[] | undefined;
        } | null | undefined;
        free_esim?: {
            package_specification: {
                type: string;
                destination: string;
                size: string;
            };
            allowance: number;
        } | null | undefined;
        booking_defaults?: {
            locale: "en-US" | "en-GB" | "nl-NL" | "de-DE" | "fr-FR" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "de-BE";
        } | null | undefined;
        booking_confirmation?: {
            brevo_template_id: number;
            send_booking_confirmation: boolean;
        } | null | undefined;
        schedules?: {
            days: number;
            hour: number;
            key: string;
            method: "push" | "email" | "sms" | "whatsapp";
            moment: "departure" | "return" | "immediate";
            push?: {
                target: string;
                title?: Record<string, string> | undefined;
                body?: Record<string, string> | undefined;
            } | null | undefined;
            filter?: {
                value: string | number;
                type: "gender" | "iso3" | "percentage" | "age";
                comparison: "equal" | "not_equal" | "greater_than" | "less_than" | "greater_than_or_equal" | "less_than_or_equal";
            } | null | undefined;
            email?: {
                brevo_template_id: number;
                subject?: Record<string, string> | undefined;
                preview_text?: Record<string, string> | undefined;
            } | null | undefined;
        }[] | undefined;
    }, {
        package_strategy?: {
            name: string;
            parameters?: any;
            iso3_white_list?: string[] | undefined;
        } | null | undefined;
        free_esim?: {
            package_specification: {
                type: string;
                destination: string;
                size: string;
            };
            allowance: number;
        } | null | undefined;
        booking_defaults?: {
            locale: "en-US" | "en-GB" | "nl-NL" | "de-DE" | "fr-FR" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "de-BE";
        } | null | undefined;
        booking_confirmation?: {
            brevo_template_id: number;
            send_booking_confirmation: boolean;
        } | null | undefined;
        schedules?: {
            days: number;
            hour: number;
            key: string;
            method: "push" | "email" | "sms" | "whatsapp";
            moment: "departure" | "return" | "immediate";
            push?: {
                target: string;
                title?: Record<string, string> | undefined;
                body?: Record<string, string> | undefined;
            } | null | undefined;
            filter?: {
                value: string | number;
                type: "gender" | "iso3" | "percentage" | "age";
                comparison: "equal" | "not_equal" | "greater_than" | "less_than" | "greater_than_or_equal" | "less_than_or_equal";
            } | null | undefined;
            email?: {
                brevo_template_id: number;
                subject?: Record<string, string> | undefined;
                preview_text?: Record<string, string> | undefined;
            } | null | undefined;
        }[] | undefined;
    }>>;
    name: z.ZodNullable<z.ZodString>;
    type: z.ZodNullable<z.ZodString>;
    is_active: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
    external_id: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    contact: z.ZodNullable<z.ZodObject<{
        email: z.ZodNullable<z.ZodString>;
        office_phone: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    }, "strip", z.ZodTypeAny, {
        email: string | null;
        office_phone?: string | null | undefined;
    }, {
        email: string | null;
        office_phone?: string | null | undefined;
    }>>;
    address: z.ZodNullable<z.ZodObject<{
        street: z.ZodOptional<z.ZodString>;
        city: z.ZodOptional<z.ZodString>;
        postal_code: z.ZodOptional<z.ZodString>;
        country: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        street?: string | undefined;
        city?: string | undefined;
        postal_code?: string | undefined;
        country?: string | undefined;
    }, {
        street?: string | undefined;
        city?: string | undefined;
        postal_code?: string | undefined;
        country?: string | undefined;
    }>>;
    registration: z.ZodNullable<z.ZodObject<{
        chamber_of_commerce_number: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        vat_number: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        anvr_number: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        tax_number: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    }, "strip", z.ZodTypeAny, {
        chamber_of_commerce_number?: string | null | undefined;
        vat_number?: string | null | undefined;
        anvr_number?: number | null | undefined;
        tax_number?: string | null | undefined;
    }, {
        chamber_of_commerce_number?: string | null | undefined;
        vat_number?: string | null | undefined;
        anvr_number?: number | null | undefined;
        tax_number?: string | null | undefined;
    }>>;
    banking_details: z.ZodNullable<z.ZodObject<{
        account_holder: z.ZodString;
        bank_name: z.ZodString;
        iban: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        account_holder: string;
        bank_name: string;
        iban: string;
    }, {
        account_holder: string;
        bank_name: string;
        iban: string;
    }>>;
    visual_identity: z.ZodNullable<z.ZodObject<{
        primary_color: z.ZodString;
        secondary_color: z.ZodString;
        logo: z.ZodString;
        font: z.ZodString;
        top_banner: z.ZodOptional<z.ZodObject<{
            strategy: z.ZodEnum<["fixed", "rotating", "destination", "time_of_day"]>;
            banners: z.ZodOptional<z.ZodNullable<z.ZodArray<z.ZodObject<{
                image_url: z.ZodString;
                alt: z.ZodString;
                click_url: z.ZodString;
                locale: z.ZodEnum<["en-US", "en-GB", "nl-NL", "de-DE", "fr-FR", "it-IT", "es-ES", "cs-CZ", "pl-PL", "pt-PT", "fr-BE", "nl-BE", "de-AT", "de-CH", "fr-CH", "it-CH", "de-BE"]>;
                properties: z.ZodRecord<z.ZodString, z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                locale: "en-US" | "en-GB" | "nl-NL" | "de-DE" | "fr-FR" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "de-BE";
                image_url: string;
                alt: string;
                click_url: string;
                properties: Record<string, string>;
            }, {
                locale: "en-US" | "en-GB" | "nl-NL" | "de-DE" | "fr-FR" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "de-BE";
                image_url: string;
                alt: string;
                click_url: string;
                properties: Record<string, string>;
            }>, "many">>>;
        }, "strip", z.ZodTypeAny, {
            strategy: "fixed" | "destination" | "rotating" | "time_of_day";
            banners?: {
                locale: "en-US" | "en-GB" | "nl-NL" | "de-DE" | "fr-FR" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "de-BE";
                image_url: string;
                alt: string;
                click_url: string;
                properties: Record<string, string>;
            }[] | null | undefined;
        }, {
            strategy: "fixed" | "destination" | "rotating" | "time_of_day";
            banners?: {
                locale: "en-US" | "en-GB" | "nl-NL" | "de-DE" | "fr-FR" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "de-BE";
                image_url: string;
                alt: string;
                click_url: string;
                properties: Record<string, string>;
            }[] | null | undefined;
        }>>;
        mid_banner: z.ZodOptional<z.ZodObject<{
            strategy: z.ZodEnum<["fixed", "rotating", "destination", "time_of_day"]>;
            banners: z.ZodOptional<z.ZodNullable<z.ZodArray<z.ZodObject<{
                image_url: z.ZodString;
                alt: z.ZodString;
                click_url: z.ZodString;
                locale: z.ZodEnum<["en-US", "en-GB", "nl-NL", "de-DE", "fr-FR", "it-IT", "es-ES", "cs-CZ", "pl-PL", "pt-PT", "fr-BE", "nl-BE", "de-AT", "de-CH", "fr-CH", "it-CH", "de-BE"]>;
                properties: z.ZodRecord<z.ZodString, z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                locale: "en-US" | "en-GB" | "nl-NL" | "de-DE" | "fr-FR" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "de-BE";
                image_url: string;
                alt: string;
                click_url: string;
                properties: Record<string, string>;
            }, {
                locale: "en-US" | "en-GB" | "nl-NL" | "de-DE" | "fr-FR" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "de-BE";
                image_url: string;
                alt: string;
                click_url: string;
                properties: Record<string, string>;
            }>, "many">>>;
        }, "strip", z.ZodTypeAny, {
            strategy: "fixed" | "destination" | "rotating" | "time_of_day";
            banners?: {
                locale: "en-US" | "en-GB" | "nl-NL" | "de-DE" | "fr-FR" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "de-BE";
                image_url: string;
                alt: string;
                click_url: string;
                properties: Record<string, string>;
            }[] | null | undefined;
        }, {
            strategy: "fixed" | "destination" | "rotating" | "time_of_day";
            banners?: {
                locale: "en-US" | "en-GB" | "nl-NL" | "de-DE" | "fr-FR" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "de-BE";
                image_url: string;
                alt: string;
                click_url: string;
                properties: Record<string, string>;
            }[] | null | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        primary_color: string;
        secondary_color: string;
        logo: string;
        font: string;
        top_banner?: {
            strategy: "fixed" | "destination" | "rotating" | "time_of_day";
            banners?: {
                locale: "en-US" | "en-GB" | "nl-NL" | "de-DE" | "fr-FR" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "de-BE";
                image_url: string;
                alt: string;
                click_url: string;
                properties: Record<string, string>;
            }[] | null | undefined;
        } | undefined;
        mid_banner?: {
            strategy: "fixed" | "destination" | "rotating" | "time_of_day";
            banners?: {
                locale: "en-US" | "en-GB" | "nl-NL" | "de-DE" | "fr-FR" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "de-BE";
                image_url: string;
                alt: string;
                click_url: string;
                properties: Record<string, string>;
            }[] | null | undefined;
        } | undefined;
    }, {
        primary_color: string;
        secondary_color: string;
        logo: string;
        font: string;
        top_banner?: {
            strategy: "fixed" | "destination" | "rotating" | "time_of_day";
            banners?: {
                locale: "en-US" | "en-GB" | "nl-NL" | "de-DE" | "fr-FR" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "de-BE";
                image_url: string;
                alt: string;
                click_url: string;
                properties: Record<string, string>;
            }[] | null | undefined;
        } | undefined;
        mid_banner?: {
            strategy: "fixed" | "destination" | "rotating" | "time_of_day";
            banners?: {
                locale: "en-US" | "en-GB" | "nl-NL" | "de-DE" | "fr-FR" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "de-BE";
                image_url: string;
                alt: string;
                click_url: string;
                properties: Record<string, string>;
            }[] | null | undefined;
        } | undefined;
    }>>;
    data: z.ZodOptional<z.ZodNullable<z.ZodObject<{
        source: z.ZodString;
        manual: z.ZodBoolean;
    }, "strip", z.ZodTypeAny, {
        source: string;
        manual: boolean;
    }, {
        source: string;
        manual: boolean;
    }>>>;
}, "strip", z.ZodTypeAny, {
    id: string;
    type: string | null;
    created_at: FirebaseFirestore.Timestamp;
    updated_at: FirebaseFirestore.Timestamp;
    created_by: string | FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData> | null;
    updated_by: string | FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData> | null;
    users: FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>[] | null;
    name: string | null;
    parent: FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData> | null;
    financial_properties: {
        pricing_strategies: {
            partner?: {
                strategy: "split" | "bundle";
                default_price_list: FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData> | null;
                custom_prices: {
                    type: "data-limit" | "time-limit";
                    package: FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>;
                    destination: string;
                    label: string;
                    price: number;
                }[];
                modification_percentage: number;
            } | undefined;
            user?: {
                default_price_list: FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData> | null;
                custom_prices: {
                    type: "data-limit" | "time-limit";
                    package: FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>;
                    destination: string;
                    label: string;
                    price: number;
                }[];
                modification_percentage: number;
            } | undefined;
        } | null;
        administration_fee: number | null;
        income_per_gb: number | null;
        payment_method: "invoice" | "direct";
        requires_card: boolean | null;
        next_invoice: FirebaseFirestore.Timestamp | null;
        last_invoice: FirebaseFirestore.Timestamp | null;
        commission_fee?: number | null | undefined;
    } | null;
    platform_settings: {
        package_strategy?: {
            name: string;
            parameters?: any;
            iso3_white_list?: string[] | undefined;
        } | null | undefined;
        free_esim?: {
            package_specification: {
                type: string;
                destination: string;
                size: string;
            };
            allowance: number;
        } | null | undefined;
        booking_defaults?: {
            locale: "en-US" | "en-GB" | "nl-NL" | "de-DE" | "fr-FR" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "de-BE";
        } | null | undefined;
        booking_confirmation?: {
            brevo_template_id: number;
            send_booking_confirmation: boolean;
        } | null | undefined;
        schedules?: {
            days: number;
            hour: number;
            key: string;
            method: "push" | "email" | "sms" | "whatsapp";
            moment: "departure" | "return" | "immediate";
            push?: {
                target: string;
                title?: Record<string, string> | undefined;
                body?: Record<string, string> | undefined;
            } | null | undefined;
            filter?: {
                value: string | number;
                type: "gender" | "iso3" | "percentage" | "age";
                comparison: "equal" | "not_equal" | "greater_than" | "less_than" | "greater_than_or_equal" | "less_than_or_equal";
            } | null | undefined;
            email?: {
                brevo_template_id: number;
                subject?: Record<string, string> | undefined;
                preview_text?: Record<string, string> | undefined;
            } | null | undefined;
        }[] | undefined;
    } | null;
    contact: {
        email: string | null;
        office_phone?: string | null | undefined;
    } | null;
    address: {
        street?: string | undefined;
        city?: string | undefined;
        postal_code?: string | undefined;
        country?: string | undefined;
    } | null;
    registration: {
        chamber_of_commerce_number?: string | null | undefined;
        vat_number?: string | null | undefined;
        anvr_number?: number | null | undefined;
        tax_number?: string | null | undefined;
    } | null;
    banking_details: {
        account_holder: string;
        bank_name: string;
        iban: string;
    } | null;
    visual_identity: {
        primary_color: string;
        secondary_color: string;
        logo: string;
        font: string;
        top_banner?: {
            strategy: "fixed" | "destination" | "rotating" | "time_of_day";
            banners?: {
                locale: "en-US" | "en-GB" | "nl-NL" | "de-DE" | "fr-FR" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "de-BE";
                image_url: string;
                alt: string;
                click_url: string;
                properties: Record<string, string>;
            }[] | null | undefined;
        } | undefined;
        mid_banner?: {
            strategy: "fixed" | "destination" | "rotating" | "time_of_day";
            banners?: {
                locale: "en-US" | "en-GB" | "nl-NL" | "de-DE" | "fr-FR" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "de-BE";
                image_url: string;
                alt: string;
                click_url: string;
                properties: Record<string, string>;
            }[] | null | undefined;
        } | undefined;
    } | null;
    is_active?: boolean | null | undefined;
    data?: {
        source: string;
        manual: boolean;
    } | null | undefined;
    external_id?: string | null | undefined;
}, {
    id: string;
    type: string | null;
    created_at: FirebaseFirestore.Timestamp;
    updated_at: FirebaseFirestore.Timestamp;
    created_by: string | FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData> | null;
    updated_by: string | FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData> | null;
    users: FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>[] | null;
    name: string | null;
    parent: FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData> | null;
    financial_properties: {
        pricing_strategies: {
            partner?: {
                strategy: "split" | "bundle";
                default_price_list: FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData> | null;
                custom_prices: {
                    type: "data-limit" | "time-limit";
                    package: FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>;
                    destination: string;
                    label: string;
                    price: number;
                }[];
                modification_percentage: number;
            } | undefined;
            user?: {
                default_price_list: FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData> | null;
                custom_prices: {
                    type: "data-limit" | "time-limit";
                    package: FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>;
                    destination: string;
                    label: string;
                    price: number;
                }[];
                modification_percentage: number;
            } | undefined;
        } | null;
        administration_fee: number | null;
        income_per_gb: number | null;
        payment_method: "invoice" | "direct";
        requires_card: boolean | null;
        next_invoice: FirebaseFirestore.Timestamp | null;
        last_invoice: FirebaseFirestore.Timestamp | null;
        commission_fee?: number | null | undefined;
    } | null;
    platform_settings: {
        package_strategy?: {
            name: string;
            parameters?: any;
            iso3_white_list?: string[] | undefined;
        } | null | undefined;
        free_esim?: {
            package_specification: {
                type: string;
                destination: string;
                size: string;
            };
            allowance: number;
        } | null | undefined;
        booking_defaults?: {
            locale: "en-US" | "en-GB" | "nl-NL" | "de-DE" | "fr-FR" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "de-BE";
        } | null | undefined;
        booking_confirmation?: {
            brevo_template_id: number;
            send_booking_confirmation: boolean;
        } | null | undefined;
        schedules?: {
            days: number;
            hour: number;
            key: string;
            method: "push" | "email" | "sms" | "whatsapp";
            moment: "departure" | "return" | "immediate";
            push?: {
                target: string;
                title?: Record<string, string> | undefined;
                body?: Record<string, string> | undefined;
            } | null | undefined;
            filter?: {
                value: string | number;
                type: "gender" | "iso3" | "percentage" | "age";
                comparison: "equal" | "not_equal" | "greater_than" | "less_than" | "greater_than_or_equal" | "less_than_or_equal";
            } | null | undefined;
            email?: {
                brevo_template_id: number;
                subject?: Record<string, string> | undefined;
                preview_text?: Record<string, string> | undefined;
            } | null | undefined;
        }[] | undefined;
    } | null;
    contact: {
        email: string | null;
        office_phone?: string | null | undefined;
    } | null;
    address: {
        street?: string | undefined;
        city?: string | undefined;
        postal_code?: string | undefined;
        country?: string | undefined;
    } | null;
    registration: {
        chamber_of_commerce_number?: string | null | undefined;
        vat_number?: string | null | undefined;
        anvr_number?: number | null | undefined;
        tax_number?: string | null | undefined;
    } | null;
    banking_details: {
        account_holder: string;
        bank_name: string;
        iban: string;
    } | null;
    visual_identity: {
        primary_color: string;
        secondary_color: string;
        logo: string;
        font: string;
        top_banner?: {
            strategy: "fixed" | "destination" | "rotating" | "time_of_day";
            banners?: {
                locale: "en-US" | "en-GB" | "nl-NL" | "de-DE" | "fr-FR" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "de-BE";
                image_url: string;
                alt: string;
                click_url: string;
                properties: Record<string, string>;
            }[] | null | undefined;
        } | undefined;
        mid_banner?: {
            strategy: "fixed" | "destination" | "rotating" | "time_of_day";
            banners?: {
                locale: "en-US" | "en-GB" | "nl-NL" | "de-DE" | "fr-FR" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "de-BE";
                image_url: string;
                alt: string;
                click_url: string;
                properties: Record<string, string>;
            }[] | null | undefined;
        } | undefined;
    } | null;
    is_active?: boolean | null | undefined;
    data?: {
        source: string;
        manual: boolean;
    } | null | undefined;
    external_id?: string | null | undefined;
}>;
declare const priceListFirestoreSchema: z.ZodObject<{
    id: z.ZodString;
    created_at: z.ZodType<FirebaseFirestore.Timestamp, z.ZodTypeDef, FirebaseFirestore.Timestamp>;
    updated_at: z.ZodType<FirebaseFirestore.Timestamp, z.ZodTypeDef, FirebaseFirestore.Timestamp>;
    created_by: z.ZodUnion<[z.ZodString, z.ZodNull, z.ZodType<FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>, z.ZodTypeDef, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>]>;
    updated_by: z.ZodUnion<[z.ZodString, z.ZodNull, z.ZodType<FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>, z.ZodTypeDef, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>]>;
} & {
    name: z.ZodString;
    description: z.ZodNullable<z.ZodString>;
    type: z.ZodEnum<["partner", "consumer"]>;
    partner: z.ZodNullable<z.ZodEffects<z.ZodType<FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>, z.ZodTypeDef, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>>;
    package_prices: z.ZodArray<z.ZodObject<{
        package: z.ZodEffects<z.ZodType<FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>, z.ZodTypeDef, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>;
        destination: z.ZodString;
        label: z.ZodString;
        type: z.ZodEnum<["data-limit", "time-limit"]>;
        price: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        type: "data-limit" | "time-limit";
        package: FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>;
        destination: string;
        label: string;
        price: number;
    }, {
        type: "data-limit" | "time-limit";
        package: FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>;
        destination: string;
        label: string;
        price: number;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    id: string;
    type: "partner" | "consumer";
    created_at: FirebaseFirestore.Timestamp;
    updated_at: FirebaseFirestore.Timestamp;
    created_by: string | FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData> | null;
    updated_by: string | FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData> | null;
    description: string | null;
    partner: FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData> | null;
    name: string;
    package_prices: {
        type: "data-limit" | "time-limit";
        package: FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>;
        destination: string;
        label: string;
        price: number;
    }[];
}, {
    id: string;
    type: "partner" | "consumer";
    created_at: FirebaseFirestore.Timestamp;
    updated_at: FirebaseFirestore.Timestamp;
    created_by: string | FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData> | null;
    updated_by: string | FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData> | null;
    description: string | null;
    partner: FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData> | null;
    name: string;
    package_prices: {
        type: "data-limit" | "time-limit";
        package: FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>;
        destination: string;
        label: string;
        price: number;
    }[];
}>;
type PartnerFirestore = z.infer<typeof partnerFirestoreSchema>;
type PriceListFirestore = z.infer<typeof priceListFirestoreSchema>;
type PackagePriceFirestore = z.infer<typeof packagePriceFirestoreSchema>;
type PartnerPricingStrategyFirestore = z.infer<typeof partnerPricingStrategyFirestoreSchema>;
type UserPricingStrategyFirestore = z.infer<typeof userPricingStrategyFirestoreSchema>;
type FinancialPropertiesFirestore = z.infer<typeof financialPropertiesFirestoreSchema>;
type FinancialProperties = z.infer<typeof financialPropertiesAppSchema>;
type Partner = PartnerFirestore;
type PriceList = PriceListFirestore;
type PackagePrice = PackagePriceFirestore;
declare const partnerToFirestore: (partner: PartnerApp) => PartnerFirestore;
declare const partnerFromFirestore: (firestorePartner: PartnerFirestore) => PartnerApp;
declare const priceListToFirestore: (priceList: PriceListApp) => PriceListFirestore;
declare const priceListFromFirestore: (firestorePriceList: PriceListFirestore) => PriceListApp;

declare const countryFirestoreSchema: z.ZodObject<{
    id: z.ZodNullable<z.ZodString>;
    bokun_id: z.ZodNullable<z.ZodNumber>;
    LTE: z.ZodNullable<z.ZodBoolean>;
    apn: z.ZodNullable<z.ZodString>;
    click_count: z.ZodNullable<z.ZodNumber>;
    global_network: z.ZodNullable<z.ZodString>;
    global_price: z.ZodNullable<z.ZodNumber>;
    hubby: z.ZodNullable<z.ZodNumber>;
    imsi: z.ZodNullable<z.ZodNumber>;
    has_esim: z.ZodBoolean;
    name: z.ZodNullable<z.ZodString>;
    region: z.ZodNullable<z.ZodBoolean>;
    is_region: z.ZodNullable<z.ZodBoolean>;
    countries: z.ZodNullable<z.ZodArray<z.ZodString, "many">>;
    tier: z.ZodNullable<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    id: string | null;
    countries: string[] | null;
    name: string | null;
    bokun_id: number | null;
    LTE: boolean | null;
    apn: string | null;
    click_count: number | null;
    global_network: string | null;
    global_price: number | null;
    hubby: number | null;
    imsi: number | null;
    has_esim: boolean;
    region: boolean | null;
    is_region: boolean | null;
    tier: number | null;
}, {
    id: string | null;
    countries: string[] | null;
    name: string | null;
    bokun_id: number | null;
    LTE: boolean | null;
    apn: string | null;
    click_count: number | null;
    global_network: string | null;
    global_price: number | null;
    hubby: number | null;
    imsi: number | null;
    has_esim: boolean;
    region: boolean | null;
    is_region: boolean | null;
    tier: number | null;
}>;
type CountryFirestore = z.infer<typeof countryFirestoreSchema>;
declare const countryToFirestore: (country: CountryApp) => CountryFirestore;
declare const countryFromFirestore: (firestoreCountry: CountryFirestore) => CountryApp;
type Country = CountryFirestore;

declare const packageFirestoreSchema: z.ZodObject<{
    id: z.ZodString;
    created_at: z.ZodType<FirebaseFirestore.Timestamp, z.ZodTypeDef, FirebaseFirestore.Timestamp>;
    updated_at: z.ZodType<FirebaseFirestore.Timestamp, z.ZodTypeDef, FirebaseFirestore.Timestamp>;
    created_by: z.ZodUnion<[z.ZodString, z.ZodNull, z.ZodType<DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>, z.ZodTypeDef, DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>]>;
    updated_by: z.ZodUnion<[z.ZodString, z.ZodNull, z.ZodType<DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>, z.ZodTypeDef, DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>]>;
} & {
    country: z.ZodEffects<z.ZodType<DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>, z.ZodTypeDef, DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>, DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>, DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>;
    partner: z.ZodNullable<z.ZodEffects<z.ZodType<DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>, z.ZodTypeDef, DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>, DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>, DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>>;
    external_id: z.ZodString;
    provider: z.ZodString;
    coverage_label: z.ZodNullable<z.ZodString>;
    label: z.ZodString;
    bytes: z.ZodNumber;
    hidden: z.ZodBoolean;
    is_hidden: z.ZodBoolean;
    is_active: z.ZodBoolean;
    priority: z.ZodNumber;
    country_data: z.ZodNullable<z.ZodObject<{
        id: z.ZodNullable<z.ZodString>;
        bokun_id: z.ZodNullable<z.ZodNumber>;
        LTE: z.ZodNullable<z.ZodBoolean>;
        apn: z.ZodNullable<z.ZodString>;
        click_count: z.ZodNullable<z.ZodNumber>;
        global_network: z.ZodNullable<z.ZodString>;
        global_price: z.ZodNullable<z.ZodNumber>;
        hubby: z.ZodNullable<z.ZodNumber>;
        imsi: z.ZodNullable<z.ZodNumber>;
        has_esim: z.ZodBoolean;
        name: z.ZodNullable<z.ZodString>;
        region: z.ZodNullable<z.ZodBoolean>;
        is_region: z.ZodNullable<z.ZodBoolean>;
        countries: z.ZodNullable<z.ZodArray<z.ZodString, "many">>;
        tier: z.ZodNullable<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        id: string | null;
        countries: string[] | null;
        name: string | null;
        bokun_id: number | null;
        LTE: boolean | null;
        apn: string | null;
        click_count: number | null;
        global_network: string | null;
        global_price: number | null;
        hubby: number | null;
        imsi: number | null;
        has_esim: boolean;
        region: boolean | null;
        is_region: boolean | null;
        tier: number | null;
    }, {
        id: string | null;
        countries: string[] | null;
        name: string | null;
        bokun_id: number | null;
        LTE: boolean | null;
        apn: string | null;
        click_count: number | null;
        global_network: string | null;
        global_price: number | null;
        hubby: number | null;
        imsi: number | null;
        has_esim: boolean;
        region: boolean | null;
        is_region: boolean | null;
        tier: number | null;
    }>>;
    price: z.ZodNumber;
    partner_price: z.ZodNumber;
    days: z.ZodNumber;
    name: z.ZodString;
    type: z.ZodNullable<z.ZodEnum<["data-limited", "time-limited"]>>;
    throttling: z.ZodOptional<z.ZodNumber>;
    provider_parameters: z.ZodNullable<z.ZodObject<{
        imsi: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        imsi: number;
    }, {
        imsi: number;
    }>>;
}, "strip", z.ZodTypeAny, {
    id: string;
    type: "data-limited" | "time-limited" | null;
    created_at: FirebaseFirestore.Timestamp;
    updated_at: FirebaseFirestore.Timestamp;
    created_by: string | DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData> | null;
    updated_by: string | DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData> | null;
    is_active: boolean;
    partner: DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData> | null;
    name: string;
    country: DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>;
    label: string;
    price: number;
    days: number;
    external_id: string;
    provider: string;
    coverage_label: string | null;
    bytes: number;
    hidden: boolean;
    is_hidden: boolean;
    priority: number;
    country_data: {
        id: string | null;
        countries: string[] | null;
        name: string | null;
        bokun_id: number | null;
        LTE: boolean | null;
        apn: string | null;
        click_count: number | null;
        global_network: string | null;
        global_price: number | null;
        hubby: number | null;
        imsi: number | null;
        has_esim: boolean;
        region: boolean | null;
        is_region: boolean | null;
        tier: number | null;
    } | null;
    partner_price: number;
    provider_parameters: {
        imsi: number;
    } | null;
    throttling?: number | undefined;
}, {
    id: string;
    type: "data-limited" | "time-limited" | null;
    created_at: FirebaseFirestore.Timestamp;
    updated_at: FirebaseFirestore.Timestamp;
    created_by: string | DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData> | null;
    updated_by: string | DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData> | null;
    is_active: boolean;
    partner: DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData> | null;
    name: string;
    country: DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>;
    label: string;
    price: number;
    days: number;
    external_id: string;
    provider: string;
    coverage_label: string | null;
    bytes: number;
    hidden: boolean;
    is_hidden: boolean;
    priority: number;
    country_data: {
        id: string | null;
        countries: string[] | null;
        name: string | null;
        bokun_id: number | null;
        LTE: boolean | null;
        apn: string | null;
        click_count: number | null;
        global_network: string | null;
        global_price: number | null;
        hubby: number | null;
        imsi: number | null;
        has_esim: boolean;
        region: boolean | null;
        is_region: boolean | null;
        tier: number | null;
    } | null;
    partner_price: number;
    provider_parameters: {
        imsi: number;
    } | null;
    throttling?: number | undefined;
}>;
type PackageFirestore = z.infer<typeof packageFirestoreSchema>;
declare const packageToFirestore: (packageData: PackageApp) => PackageFirestore;
declare const packageFromFirestore: (firestorePackage: PackageFirestore) => PackageApp;
type Package = PackageFirestore;

declare const promoCodeFirestoreSchema: z.ZodObject<{
    id: z.ZodString;
    created_at: z.ZodType<FirebaseFirestore.Timestamp, z.ZodTypeDef, FirebaseFirestore.Timestamp>;
    updated_at: z.ZodType<FirebaseFirestore.Timestamp, z.ZodTypeDef, FirebaseFirestore.Timestamp>;
    created_by: z.ZodUnion<[z.ZodString, z.ZodNull, z.ZodType<FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>, z.ZodTypeDef, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>]>;
    updated_by: z.ZodUnion<[z.ZodString, z.ZodNull, z.ZodType<FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>, z.ZodTypeDef, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>]>;
} & {
    external_id: z.ZodString;
    code: z.ZodString;
    allowance_user: z.ZodNumber;
    allowance_total: z.ZodNumber;
    type: z.ZodUnion<[z.ZodNullable<z.ZodEnum<["full-discount", "partial-discount", "booking", "traveler"]>>, z.ZodString]>;
    usage: z.ZodArray<z.ZodString, "many">;
    uuid_usage: z.ZodArray<z.ZodString, "many">;
    package_specification: z.ZodOptional<z.ZodObject<{
        destination: z.ZodOptional<z.ZodString>;
        size: z.ZodOptional<z.ZodString>;
        package_id: z.ZodOptional<z.ZodString>;
        iata_code: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        destination?: string | undefined;
        size?: string | undefined;
        package_id?: string | undefined;
        iata_code?: string | undefined;
    }, {
        destination?: string | undefined;
        size?: string | undefined;
        package_id?: string | undefined;
        iata_code?: string | undefined;
    }>>;
    partner: z.ZodNullable<z.ZodEffects<z.ZodType<FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>, z.ZodTypeDef, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>>;
    valid_from: z.ZodUnion<[z.ZodString, z.ZodDate, z.ZodType<FirebaseFirestore.Timestamp, z.ZodTypeDef, FirebaseFirestore.Timestamp>]>;
    valid_to: z.ZodUnion<[z.ZodString, z.ZodDate, z.ZodType<FirebaseFirestore.Timestamp, z.ZodTypeDef, FirebaseFirestore.Timestamp>]>;
    discount: z.ZodOptional<z.ZodNumber>;
    package_size: z.ZodOptional<z.ZodString>;
    package: z.ZodNullable<z.ZodEffects<z.ZodType<FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>, z.ZodTypeDef, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>>;
    country: z.ZodNullable<z.ZodEffects<z.ZodType<FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>, z.ZodTypeDef, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>>;
    booking: z.ZodNullable<z.ZodEffects<z.ZodType<FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>, z.ZodTypeDef, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>>;
    countries: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    max_bytes: z.ZodOptional<z.ZodNumber>;
    starter_data: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    id: string;
    code: string;
    type: string | null;
    created_at: FirebaseFirestore.Timestamp;
    updated_at: FirebaseFirestore.Timestamp;
    created_by: string | FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData> | null;
    updated_by: string | FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData> | null;
    partner: FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData> | null;
    country: FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData> | null;
    package: FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData> | null;
    external_id: string;
    allowance_user: number;
    allowance_total: number;
    booking: FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData> | null;
    usage: string[];
    uuid_usage: string[];
    valid_from: string | Date | FirebaseFirestore.Timestamp;
    valid_to: string | Date | FirebaseFirestore.Timestamp;
    countries?: string[] | undefined;
    package_size?: string | undefined;
    package_specification?: {
        destination?: string | undefined;
        size?: string | undefined;
        package_id?: string | undefined;
        iata_code?: string | undefined;
    } | undefined;
    discount?: number | undefined;
    max_bytes?: number | undefined;
    starter_data?: number | undefined;
}, {
    id: string;
    code: string;
    type: string | null;
    created_at: FirebaseFirestore.Timestamp;
    updated_at: FirebaseFirestore.Timestamp;
    created_by: string | FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData> | null;
    updated_by: string | FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData> | null;
    partner: FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData> | null;
    country: FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData> | null;
    package: FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData> | null;
    external_id: string;
    allowance_user: number;
    allowance_total: number;
    booking: FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData> | null;
    usage: string[];
    uuid_usage: string[];
    valid_from: string | Date | FirebaseFirestore.Timestamp;
    valid_to: string | Date | FirebaseFirestore.Timestamp;
    countries?: string[] | undefined;
    package_size?: string | undefined;
    package_specification?: {
        destination?: string | undefined;
        size?: string | undefined;
        package_id?: string | undefined;
        iata_code?: string | undefined;
    } | undefined;
    discount?: number | undefined;
    max_bytes?: number | undefined;
    starter_data?: number | undefined;
}>;
type PromoCodeFirestore = z.infer<typeof promoCodeFirestoreSchema>;
declare const promoCodeToFirestore: (promoCode: PromoCodeApp) => PromoCodeFirestore;
declare const promoCodeFromFirestore: (firestorePromoCode: PromoCodeFirestore) => PromoCodeApp;
type PromoCode = PromoCodeFirestore;

declare const esimFirestoreSchema: z.ZodObject<{
    id: z.ZodString;
    created_at: z.ZodType<Timestamp, z.ZodTypeDef, Timestamp>;
    updated_at: z.ZodType<Timestamp, z.ZodTypeDef, Timestamp>;
    created_by: z.ZodUnion<[z.ZodString, z.ZodNull, z.ZodType<DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>, z.ZodTypeDef, DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>]>;
    updated_by: z.ZodUnion<[z.ZodString, z.ZodNull, z.ZodType<DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>, z.ZodTypeDef, DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>]>;
} & {
    country: z.ZodNullable<z.ZodEffects<z.ZodType<DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>, z.ZodTypeDef, DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>, DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>, DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>>;
    time_assigned: z.ZodNullable<z.ZodType<Timestamp, z.ZodTypeDef, Timestamp>>;
    last_updated: z.ZodNullable<z.ZodType<Timestamp, z.ZodTypeDef, Timestamp>>;
    partner: z.ZodNullable<z.ZodEffects<z.ZodType<DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>, z.ZodTypeDef, DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>, DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>, DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>>;
    imsi: z.ZodNumber;
    qr: z.ZodString;
    iccid: z.ZodString;
    provider: z.ZodString;
    coverage_label: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    total_data: z.ZodNullable<z.ZodNumber>;
    data_left: z.ZodNullable<z.ZodNumber>;
    data_used: z.ZodNullable<z.ZodBoolean>;
    status: z.ZodNullable<z.ZodString>;
    name: z.ZodString;
    android_auto: z.ZodBoolean;
    partner_price: z.ZodNullable<z.ZodNumber>;
    promo: z.ZodNullable<z.ZodString>;
    type: z.ZodEnum<["api", "promo", "balance", "code", "external", "payment"]>;
    is_auto_install: z.ZodBoolean;
    is_archived: z.ZodBoolean;
    user: z.ZodNullable<z.ZodString>;
    payment: z.ZodNullable<z.ZodString>;
    apn: z.ZodNullable<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    id: string;
    type: "code" | "balance" | "api" | "promo" | "external" | "payment";
    status: string | null;
    created_at: Timestamp;
    updated_at: Timestamp;
    created_by: string | DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData> | null;
    updated_by: string | DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData> | null;
    partner: DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData> | null;
    name: string;
    country: DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData> | null;
    user: string | null;
    apn: string | null;
    imsi: number;
    provider: string;
    partner_price: number | null;
    promo: string | null;
    payment: string | null;
    time_assigned: Timestamp | null;
    last_updated: Timestamp | null;
    qr: string;
    iccid: string;
    total_data: number | null;
    data_left: number | null;
    data_used: boolean | null;
    android_auto: boolean;
    is_auto_install: boolean;
    is_archived: boolean;
    coverage_label?: string | null | undefined;
}, {
    id: string;
    type: "code" | "balance" | "api" | "promo" | "external" | "payment";
    status: string | null;
    created_at: Timestamp;
    updated_at: Timestamp;
    created_by: string | DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData> | null;
    updated_by: string | DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData> | null;
    partner: DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData> | null;
    name: string;
    country: DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData> | null;
    user: string | null;
    apn: string | null;
    imsi: number;
    provider: string;
    partner_price: number | null;
    promo: string | null;
    payment: string | null;
    time_assigned: Timestamp | null;
    last_updated: Timestamp | null;
    qr: string;
    iccid: string;
    total_data: number | null;
    data_left: number | null;
    data_used: boolean | null;
    android_auto: boolean;
    is_auto_install: boolean;
    is_archived: boolean;
    coverage_label?: string | null | undefined;
}>;
type ESIMFirestore = z.infer<typeof esimFirestoreSchema>;
declare const esimToFirestore: (esim: ESIMApp) => ESIMFirestore;
declare const esimFromFirestore: (firestoreEsim: ESIMFirestore) => ESIMApp;
type ESIM = ESIMFirestore;

declare const paymentFirestoreSchema: z.ZodObject<{
    id: z.ZodString;
    created_at: z.ZodType<FirebaseFirestore.Timestamp, z.ZodTypeDef, FirebaseFirestore.Timestamp>;
    updated_at: z.ZodType<FirebaseFirestore.Timestamp, z.ZodTypeDef, FirebaseFirestore.Timestamp>;
    created_by: z.ZodUnion<[z.ZodString, z.ZodNull, z.ZodType<FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>, z.ZodTypeDef, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>]>;
    updated_by: z.ZodUnion<[z.ZodString, z.ZodNull, z.ZodType<FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>, z.ZodTypeDef, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>]>;
} & {
    amount: z.ZodNumber;
    customer: z.ZodString;
    date: z.ZodType<FirebaseFirestore.Timestamp, z.ZodTypeDef, FirebaseFirestore.Timestamp>;
    iccid: z.ZodString;
    package: z.ZodString;
    promo: z.ZodString;
    topup: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    id: string;
    created_at: FirebaseFirestore.Timestamp;
    updated_at: FirebaseFirestore.Timestamp;
    created_by: string | FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData> | null;
    date: FirebaseFirestore.Timestamp;
    updated_by: string | FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData> | null;
    package: string;
    promo: string;
    iccid: string;
    amount: number;
    customer: string;
    topup: boolean;
}, {
    id: string;
    created_at: FirebaseFirestore.Timestamp;
    updated_at: FirebaseFirestore.Timestamp;
    created_by: string | FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData> | null;
    date: FirebaseFirestore.Timestamp;
    updated_by: string | FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData> | null;
    package: string;
    promo: string;
    iccid: string;
    amount: number;
    customer: string;
    topup: boolean;
}>;
type PaymentFirestore = z.infer<typeof paymentFirestoreSchema>;
declare const paymentToFirestore: (payment: PaymentApp) => PaymentFirestore;
declare const paymentFromFirestore: (firestorePayment: PaymentFirestore) => PaymentApp;
type Payment = PaymentFirestore;

declare const messageFirestoreSchema: z.ZodObject<{
    id: z.ZodString;
    key: z.ZodString;
    method: z.ZodEnum<["push", "sms", "email"]>;
    status: z.ZodEnum<["pending", "sent", "failed", "delivered"]>;
    created_at: z.ZodType<Timestamp, z.ZodTypeDef, Timestamp>;
    updated_at: z.ZodType<Timestamp, z.ZodTypeDef, Timestamp>;
}, "strip", z.ZodTypeAny, {
    id: string;
    status: "pending" | "sent" | "failed" | "delivered";
    created_at: Timestamp;
    updated_at: Timestamp;
    key: string;
    method: "push" | "email" | "sms";
}, {
    id: string;
    status: "pending" | "sent" | "failed" | "delivered";
    created_at: Timestamp;
    updated_at: Timestamp;
    key: string;
    method: "push" | "email" | "sms";
}>;
declare const sentMessagesFirestoreSchema: z.ZodRecord<z.ZodString, z.ZodObject<{
    id: z.ZodString;
    key: z.ZodString;
    method: z.ZodEnum<["push", "sms", "email"]>;
    status: z.ZodEnum<["pending", "sent", "failed", "delivered"]>;
    created_at: z.ZodType<Timestamp, z.ZodTypeDef, Timestamp>;
    updated_at: z.ZodType<Timestamp, z.ZodTypeDef, Timestamp>;
}, "strip", z.ZodTypeAny, {
    id: string;
    status: "pending" | "sent" | "failed" | "delivered";
    created_at: Timestamp;
    updated_at: Timestamp;
    key: string;
    method: "push" | "email" | "sms";
}, {
    id: string;
    status: "pending" | "sent" | "failed" | "delivered";
    created_at: Timestamp;
    updated_at: Timestamp;
    key: string;
    method: "push" | "email" | "sms";
}>>;
type MessageFirestore = z.infer<typeof messageFirestoreSchema>;
type SentMessagesFirestore = z.infer<typeof sentMessagesFirestoreSchema>;

declare const messageToFirestore: (message: MessageApp) => MessageFirestore;
declare const messageFromFirestore: (firestoreMessage: MessageFirestore) => MessageApp;
declare const sentMessagesToFirestore: (sentMessages: SentMessagesApp) => SentMessagesFirestore;
declare const sentMessagesFromFirestore: (firestoreSentMessages: SentMessagesFirestore) => SentMessagesApp;
type Message = MessageFirestore;
type SentMessages = SentMessagesFirestore;
declare const convertSentMessagesToFirestore: (sentMessages: Record<string, MessageApp>) => Record<string, MessageFirestore>;
declare const convertSentMessagesFromFirestore: (firestoreSentMessages: Record<string, MessageFirestore>) => Record<string, MessageApp>;

declare const currencyFirestoreSchema: z.ZodObject<{
    id: z.ZodString;
    created_at: z.ZodType<FirebaseFirestore.Timestamp, z.ZodTypeDef, FirebaseFirestore.Timestamp>;
    updated_at: z.ZodType<FirebaseFirestore.Timestamp, z.ZodTypeDef, FirebaseFirestore.Timestamp>;
    created_by: z.ZodUnion<[z.ZodString, z.ZodNull, z.ZodType<FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>, z.ZodTypeDef, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>]>;
    updated_by: z.ZodUnion<[z.ZodString, z.ZodNull, z.ZodType<FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>, z.ZodTypeDef, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>]>;
} & {
    code: z.ZodString;
    symbol: z.ZodString;
    name: z.ZodString;
    rate: z.ZodNumber;
    is_default: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    symbol: string;
    id: string;
    code: string;
    created_at: FirebaseFirestore.Timestamp;
    updated_at: FirebaseFirestore.Timestamp;
    created_by: string | FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData> | null;
    updated_by: string | FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData> | null;
    name: string;
    rate: number;
    is_default: boolean;
}, {
    symbol: string;
    id: string;
    code: string;
    created_at: FirebaseFirestore.Timestamp;
    updated_at: FirebaseFirestore.Timestamp;
    created_by: string | FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData> | null;
    updated_by: string | FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData> | null;
    name: string;
    rate: number;
    is_default: boolean;
}>;
type CurrencyFirestore = z.infer<typeof currencyFirestoreSchema>;
declare const currencyToFirestore: (currency: CurrencyApp) => CurrencyFirestore;
declare const currencyFromFirestore: (firestoreCurrency: CurrencyFirestore) => CurrencyApp;
type Currency = CurrencyFirestore;

declare const apiLogFirestoreSchema: z.ZodObject<{
    id: z.ZodOptional<z.ZodString>;
    method: z.ZodString;
    user_id: z.ZodOptional<z.ZodString>;
    path: z.ZodString;
    resource_type: z.ZodOptional<z.ZodString>;
    resource_id: z.ZodOptional<z.ZodString>;
    partner_id: z.ZodOptional<z.ZodString>;
    payload: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    timestamp: z.ZodType<FirebaseFirestore.Timestamp, z.ZodTypeDef, FirebaseFirestore.Timestamp>;
    status_code: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    path: string;
    method: string;
    timestamp: FirebaseFirestore.Timestamp;
    status_code: number;
    id?: string | undefined;
    user_id?: string | undefined;
    resource_type?: string | undefined;
    resource_id?: string | undefined;
    partner_id?: string | undefined;
    payload?: Record<string, unknown> | undefined;
}, {
    path: string;
    method: string;
    timestamp: FirebaseFirestore.Timestamp;
    status_code: number;
    id?: string | undefined;
    user_id?: string | undefined;
    resource_type?: string | undefined;
    resource_id?: string | undefined;
    partner_id?: string | undefined;
    payload?: Record<string, unknown> | undefined;
}>;
type ApiLogFirestore = z.infer<typeof apiLogFirestoreSchema>;
declare const apiLogToFirestore: (apiLog: ApiLogApp) => ApiLogFirestore;
declare const apiLogFromFirestore: (firestoreApiLog: ApiLogFirestore) => ApiLogApp;
type ApiLog = ApiLogFirestore;

interface GenericRefFieldMapping<AppType, FirestoreType> {
    app: keyof AppType;
    firestore: keyof FirestoreType;
    collection: string;
    nullable?: boolean;
    isArray?: boolean;
}
interface GenericDateFieldMapping<AppType, FirestoreType> {
    field: keyof FirestoreType & keyof AppType;
    nullable?: boolean;
}
declare function genericToFirestore<AppType extends Record<string, any>, FirestoreType extends Record<string, any>>({ appObject, refFieldMappings, dateFieldMappings, specialCaseHandler }: {
    appObject: AppType;
    refFieldMappings: GenericRefFieldMapping<AppType, FirestoreType>[];
    dateFieldMappings: GenericDateFieldMapping<AppType, FirestoreType>[];
    specialCaseHandler?: (result: Record<string, any>, appData: AppType) => void;
}): FirestoreType;
declare function genericFromFirestore<FirestoreType extends Record<string, any>, AppType extends Record<string, any>>({ firestoreObject, refFieldMappings, dateFieldMappings, specialCaseHandler }: {
    firestoreObject: FirestoreType;
    refFieldMappings: GenericRefFieldMapping<AppType, FirestoreType>[];
    dateFieldMappings: GenericDateFieldMapping<AppType, FirestoreType>[];
    specialCaseHandler?: (result: Record<string, any>, firestoreData: FirestoreType) => void;
}): AppType;

export { ApiKey, ApiKeys, ApiLog, ApiLogApp, ApiLogFirestore, Booking, BookingApp, BookingFirestore, Country, CountryApp, CountryFirestore, Currency, CurrencyApp, CurrencyFirestore, ESIM, ESIMApp, ESIMFirestore, FinancialProperties, FinancialPropertiesFirestore, GenericDateFieldMapping, GenericRefFieldMapping, HHubbyModel, HubbyModel, HubbyModelApp, HubbyModelFirestore, Message, MessageApp, MessageFirestore, MockDocumentReference, Package, PackageApp, PackageFirestore, PackagePrice, PackagePriceFirestore, Partner, PartnerApp, PartnerFirestore, PartnerPricingStrategyFirestore, Payment, PaymentApp, PaymentFirestore, PriceList, PriceListApp, PriceListFirestore, PromoCode, PromoCodeApp, PromoCodeFirestore, SentMessages, SentMessagesApp, SentMessagesFirestore, User, UserApp, UserFirestore, UserPricingStrategyFirestore, apiKeySchema, apiKeysSchema, apiLogFirestoreSchema, apiLogFromFirestore, apiLogRefArray, apiLogRefArrayNullable, apiLogRefNullable, apiLogRefSchema, apiLogToFirestore, baseModelSchema, bookingFirestoreSchema, bookingFromFirestore, bookingRefArray, bookingRefArrayNullable, bookingRefNullable, bookingRefSchema, bookingToFirestore, convertSentMessagesFromFirestore, convertSentMessagesToFirestore, countryFirestoreSchema, countryFromFirestore, countryRefArray, countryRefArrayNullable, countryRefNullable, countryRefSchema, countryToFirestore, createDocRefSchema, currencyFirestoreSchema, currencyFromFirestore, currencyRefArray, currencyRefArrayNullable, currencyRefNullable, currencyRefSchema, currencyToFirestore, docRefToStringSchema, documentRefSchema, esimFirestoreSchema, esimFromFirestore, esimRefArray, esimRefArrayNullable, esimRefNullable, esimRefSchema, esimToFirestore, fieldValueSchema, financialPropertiesAppSchema, financialPropertiesFirestoreSchema, fromFirestore, genericFromFirestore, genericToFirestore, getFirestoreInstance, hubbyModelAppSchema, hubbyModelFirestoreSchema, messageFirestoreSchema, messageFromFirestore, messageRefArray, messageRefArrayNullable, messageRefNullable, messageRefSchema, messageToFirestore, packageFirestoreSchema, packageFromFirestore, packagePriceFirestoreSchema, packageRefArray, packageRefArrayNullable, packageRefNullable, packageRefSchema, packageToFirestore, partnerFirestoreSchema, partnerFromFirestore, partnerPricingStrategyFirestoreSchema, partnerRefArray, partnerRefArrayNullable, partnerRefNullable, partnerRefSchema, partnerToFirestore, paymentFirestoreSchema, paymentFromFirestore, paymentRefArray, paymentRefArrayNullable, paymentRefNullable, paymentRefSchema, paymentToFirestore, priceListFirestoreSchema, priceListFromFirestore, priceListRefArray, priceListRefArrayNullable, priceListRefNullable, priceListRefSchema, priceListToFirestore, profileRefArray, profileRefArrayNullable, profileRefNullable, profileRefSchema, promoCodeFirestoreSchema, promoCodeFromFirestore, promoCodeRefArray, promoCodeRefArrayNullable, promoCodeRefNullable, promoCodeRefSchema, promoCodeToFirestore, sentMessagesFirestoreSchema, sentMessagesFromFirestore, sentMessagesToFirestore, setFirestoreInstance, timestampSchema, toFirestore, userFirestoreSchema, userFromFirestore, userPricingStrategyFirestoreSchema, userRefArray, userRefArrayNullable, userRefNullable, userRefSchema, userToFirestore, userToFirestoreWithBalance };
