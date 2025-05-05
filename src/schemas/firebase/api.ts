import { z } from 'zod';

// Explicitly import all schemas and types from base API
import {
    packageSpecificationSchema,
    packageSpecificationsSchema,
    bookingApiResponseSchema,
    promoCodeApiResponseSchema,
    bookingApiRequestSchema,
    partnerApiRequestSchema,
    partnerApiResponseSchema,
    // Types
    PackageSpecification,
    PackageSpecifications,
    BookingApiRequest,
    BookingApiResponse,
    PromoCodeApiResponse,
    PartnerApiRequest,
    PartnerApiResponse
} from '../base/api';

// Explicitly export all schemas
export {
    packageSpecificationSchema,
    packageSpecificationsSchema,
    bookingApiResponseSchema,
    promoCodeApiResponseSchema,
    bookingApiRequestSchema,
    partnerApiRequestSchema,
    partnerApiResponseSchema,
};

// Explicitly export all types
export type {
    PackageSpecification,
    PackageSpecifications,
    BookingApiRequest,
    BookingApiResponse,
    PromoCodeApiResponse,
    PartnerApiRequest,
    PartnerApiResponse
}; 