import { buildServerSchema } from './builders/server';
import {
    userSchemaSpec,
} from './specs/user';
import {
    bookingSchemaSpec,
    communicationChannelSchema,
    bookingStatusSchema,
    communicationOptionsSchema
} from './specs/booking';
import { countrySchemaSpec } from './specs/country';
import { currencySchemaSpec } from './specs/currency';
import { esimSchemaSpec } from './specs/esim';
import { paymentSchemaSpec } from './specs/payment';
import { analyticsSpec } from './specs/analytics';
import { messageSchemaSpec } from './specs/message';
import { trafficPolicySpec } from './specs/traffic_policy';
import { packageSchemaSpec, telnaPackageSchema, bondioPackageSchema } from './specs/package';
import { promoCodeSchemaSpec, packageSpecificationSchema as promoPackageSpecificationSchema } from './specs/promocode';
import {
    partnerSchemaSpec,
    priceListSchemaSpec,
    addressSchema,
    registrationSchema,
    bankingDetailsSchema,
    packageSpecificationSchema as partnerPackageSpecificationSchema,
    visualIdentityBannerSchema,
    visualIdentityBannersSchema,
    scheduleFilterSchema,
    partnerContactSchema,
    partnerDataSchema,
    scheduleSchema,
    visualIdentitySchema,
    packagePriceSchemaSpec,
    platformSettingsSchemaSpec
} from './specs/partner';

import { hubbyModelSpec, tagModelSpec } from './specs/common';
import { SUPPORTED_LOCALES as LOCALES } from './constants';
import { apiLogSchemaSpec } from './specs/apiLogs';
import { 
    reviewSchemaSpec, 
    reviewSubmissionSchemaSpec,
    rewardStrategySchema,
    baseRewardSchema,
    rewardMultipliersSchema,
    rewardPackageTypeSchema
} from './specs/review';
import { destinationSchemaSpec, destinationBundleSchemaSpec } from './specs/destination';
import { packageTemplateSchemaSpec } from './specs/package_template';
import { z } from 'zod';
import { DocumentReference, Timestamp } from 'firebase-admin/firestore';


import { convertFirestoreToJS, convertJSToFirestore } from './utils/firestoreTransformUtils';
import { HPackage, HPartner, HPriceList, HPromoCode } from './index.client';
import { buildClientSchema } from './builders/client';

export {
    partnerSchemaSpec,
    analyticsSpec,
    packageSchemaSpec,
    userSchemaSpec,
    bookingSchemaSpec,
    countrySchemaSpec,
    currencySchemaSpec,
    esimSchemaSpec,
    paymentSchemaSpec,
    messageSchemaSpec,
    promoCodeSchemaSpec,
    priceListSchemaSpec,
    apiLogSchemaSpec,
    reviewSchemaSpec,
    reviewSubmissionSchemaSpec,
    destinationSchemaSpec,
    destinationBundleSchemaSpec,
    packageTemplateSchemaSpec
};


/** ZOD SCHEMAS */
export const UserSchema = buildServerSchema(userSchemaSpec);
export const UserFirestoreSchema = buildServerSchema(userSchemaSpec);
export const BookingSchema = buildServerSchema(bookingSchemaSpec);
export const CountrySchema = buildServerSchema(countrySchemaSpec);
export const CurrencySchema = buildServerSchema(currencySchemaSpec);
export const ESIMSchema = buildServerSchema(esimSchemaSpec);
export const PaymentSchema = buildServerSchema(paymentSchemaSpec);
export const MessageSchema = buildServerSchema(messageSchemaSpec);
export const PackageSchema = buildServerSchema(packageSchemaSpec);
export const PromoCodeSchema = buildServerSchema(promoCodeSchemaSpec);
export const PartnerSchema = buildServerSchema(partnerSchemaSpec);
export const PriceListSchema = buildServerSchema(priceListSchemaSpec);
export const ApiLogSchema = buildServerSchema(apiLogSchemaSpec);
export const VisualIdentitySchema = buildServerSchema(visualIdentitySchema);
export const PackagePriceSchema = buildServerSchema(packagePriceSchemaSpec);
export const PlatformSettingsSchema = buildServerSchema(platformSettingsSchemaSpec);
export const ScheduleSchema = buildServerSchema(scheduleSchema);
export const AnalyticsSchema = buildServerSchema(analyticsSpec);
export const TagSchema = buildServerSchema(tagModelSpec);
export const TelnaPackageSchema = buildServerSchema(telnaPackageSchema);
export const BondioPackageSchema = buildServerSchema(bondioPackageSchema);
export const TrafficPolicySchema = buildServerSchema(trafficPolicySpec);
export const ReviewSchema = buildServerSchema(reviewSchemaSpec);
export const ReviewSubmissionSchema = buildServerSchema(reviewSubmissionSchemaSpec);
export const DestinationSchema = buildServerSchema(destinationSchemaSpec);
export const DestinationBundleSchema = buildServerSchema(destinationBundleSchemaSpec);
export const PackageTemplateSchema = buildServerSchema(packageTemplateSchemaSpec);

// Additional lower-level schemas
export const AddressSchema = addressSchema;
export const RegistrationSchema = registrationSchema;
export const BankingDetailsSchema = bankingDetailsSchema;
export const PartnerPackageSpecificationSchema = partnerPackageSpecificationSchema;
export const PromoPackageSpecificationSchema = promoPackageSpecificationSchema;
export const VisualIdentityBannerSchema = visualIdentityBannerSchema;
export const ScheduleFilterSchema = scheduleFilterSchema;
export const PartnerContactSchema = partnerContactSchema;
export const PartnerDataSchema = partnerDataSchema;
export const CommunicationChannelSchema = communicationChannelSchema;
export const BookingStatusSchema = bookingStatusSchema;
export const CommunicationOptionsSchema = communicationOptionsSchema;
export const VisualIdentityBannersSchema = visualIdentityBannersSchema;
export const RewardStrategySchema = rewardStrategySchema;
export const BaseRewardSchema = baseRewardSchema;
export const RewardMultipliersSchema = rewardMultipliersSchema;
export const RewardPackageTypeSchema = rewardPackageTypeSchema;

export type User = z.infer<typeof UserSchema>;
export type UserFirestore = z.infer<typeof UserFirestoreSchema>;
export type Booking = z.infer<typeof BookingSchema>;
export type Country = z.infer<typeof CountrySchema>;
export type Currency = z.infer<typeof CurrencySchema>;
export type ESIM = z.infer<typeof ESIMSchema>;
export type Payment = z.infer<typeof PaymentSchema>;
export type Message = z.infer<typeof MessageSchema>;
export type Package = z.infer<typeof PackageSchema>;
export type PromoCode = z.infer<typeof PromoCodeSchema>;
export type Partner = z.infer<typeof PartnerSchema>;
export type PriceList = z.infer<typeof PriceListSchema>;
export type ApiLog = z.infer<typeof ApiLogSchema>;
export type Analytics = z.infer<typeof AnalyticsSchema>;
export type Schedule = z.infer<typeof ScheduleSchema>;
export type TelnaPackage = z.infer<typeof TelnaPackageSchema>;
export type BondioPackage = z.infer<typeof BondioPackageSchema>;
export type TrafficPolicy = z.infer<typeof TrafficPolicySchema>;
export type Review = z.infer<typeof ReviewSchema>;
export type ReviewSubmission = z.infer<typeof ReviewSubmissionSchema>;
export type Destination = z.infer<typeof DestinationSchema>;
export type DestinationBundle = z.infer<typeof DestinationBundleSchema>;
export type PackageTemplate = z.infer<typeof PackageTemplateSchema>;

// Additional lower-level types
export type Address = z.infer<typeof AddressSchema>;
export type Registration = z.infer<typeof RegistrationSchema>;
export type BankingDetails = z.infer<typeof BankingDetailsSchema>;
export type PartnerPackageSpecification = z.infer<typeof PartnerPackageSpecificationSchema>;
export type PackageSpecification = z.infer<typeof PromoPackageSpecificationSchema>;
export type VisualIdentity = z.infer<typeof VisualIdentitySchema>;
export type VisualIdentityBanner = z.infer<typeof VisualIdentityBannerSchema>;
export type VisualIdentityBanners = z.infer<typeof VisualIdentityBannersSchema>;
export type VisualIdentityBannerStrategy = VisualIdentityBanners;
export type ScheduleFilter = z.infer<typeof ScheduleFilterSchema>;
export type PartnerContact = z.infer<typeof PartnerContactSchema>;
export type PartnerData = z.infer<typeof PartnerDataSchema>;
export type CommunicationChannel = z.infer<typeof CommunicationChannelSchema>;
export type BookingStatus = z.infer<typeof BookingStatusSchema>;
export type CommunicationOptions = z.infer<typeof CommunicationOptionsSchema>;
export type PackagePrice = z.infer<typeof PackagePriceSchema>;
export type PlatformSettings = z.infer<typeof PlatformSettingsSchema>;
export type RewardStrategy = z.infer<typeof RewardStrategySchema>;
export type BaseReward = z.infer<typeof BaseRewardSchema>;
export type RewardMultipliers = z.infer<typeof RewardMultipliersSchema>;
export type RewardPackageType = z.infer<typeof RewardPackageTypeSchema>;
export type BookingApiRequest = Booking;
export type BookingApiResponse = Booking;
export type PartnerApiRequest = Partner;
export type PartnerApiResponse = Partner;
export type PriceListApiRequest = PriceList;
export type PriceListApiResponse = PriceList;
export type ApiLogApiRequest = ApiLog;
export type ApiLogApiResponse = ApiLog;
export type Tag = z.infer<typeof TagSchema>;

export * from './index.client';

export type HubbyModel = {
    id: string;
    created_at: Date;
    updated_at: Date | null;
    created_by: string;
    updated_by: string | null;
}

export type HubbyModelFirestore = {
    id: string;
    created_at: Timestamp;
    updated_at: Timestamp | null;
    created_by: DocumentReference | null | string;
    updated_by: DocumentReference | null | string;
}

export const partnerFromFirestore = (partner: Partner): HPartner => {
    return convertFirestoreToJS(partner, partnerSchemaSpec);
}

export const partnerToFirestore = (partner: HPartner): Partner => {
    return convertJSToFirestore(partner, partnerSchemaSpec);
}

export const userToFirestore = (user: User): UserFirestore => {
    return convertJSToFirestore(user, userSchemaSpec);
}

export const userFromFirestore = (user: UserFirestore): User => {
    return convertFirestoreToJS(user, userSchemaSpec);
}

export const priceListFromFirestore = (priceList: PriceList): HPriceList => {
    return convertFirestoreToJS(priceList, priceListSchemaSpec);
}

export const priceListToFirestore = (priceList: HPriceList): PriceList => {
    return convertJSToFirestore(priceList, priceListSchemaSpec);
}

export const promoCodeFromFirestore = (promoCode: PromoCode): HPromoCode => {
    return convertFirestoreToJS(promoCode, promoCodeSchemaSpec);
}

export const promoCodeToFirestore = (promoCode: HPromoCode): PromoCode => {
    return convertJSToFirestore(promoCode, promoCodeSchemaSpec);
}


export const bookingAppSchema = buildClientSchema(bookingSchemaSpec);
export const partnerAppSchema = buildClientSchema(partnerSchemaSpec);
export const destinationAppSchema = buildClientSchema(destinationSchemaSpec);
export const destinationBundleAppSchema = buildClientSchema(destinationBundleSchemaSpec);
export const packageTemplateAppSchema = buildClientSchema(packageTemplateSchemaSpec);
export const promoPackageSpecificationAppSchema = buildClientSchema(promoPackageSpecificationSchema);
// Export the type and constant
export type SupportedLocales = typeof LOCALES[number];
export const SUPPORTED_LOCALES = LOCALES;

// Dependency Injection exports
export { createModelConverters } from './utils/modelConverterFactory';
export { createConvertJSToFirestore, createConvertFirestoreToJS } from './utils/firestoreTransformUtils';
export { FirebaseService, createFirebaseService } from './services/firebase';

export { USER_COLLECTION, PACKAGE_COLLECTION, PARTNER_COLLECTION, BOOKING_COLLECTION, ROLE_COLLECTION, PERMISSION_COLLECTION, TRAFFIC_POLICY_COLLECTION, PROFILE_COLLECTION, PROMO_CODE_COLLECTION, COUNTRY_COLLECTION, ESIM_COLLECTION, PAYMENT_COLLECTION, PRICE_LIST_COLLECTION, MESSAGE_COLLECTION, CURRENCY_COLLECTION, API_LOG_COLLECTION, REVIEW_COLLECTION, REVIEW_SUBMISSION_COLLECTION, DESTINATION_COLLECTION, DESTINATION_OFFER_COLLECTION } from './specs/common';
