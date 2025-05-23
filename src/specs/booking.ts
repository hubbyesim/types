import { z } from 'zod';
import {
    PARTNER_COLLECTION,
    PROMO_CODE_COLLECTION,
    USER_COLLECTION,
    ESIM_COLLECTION,
    timestampNullable,
    timestampRequired,
    timestampNullableOptional,
    hubbyModelSpec
} from './common';
import { markAsSchemaSpec } from '../common';
import { supportedLocalesSchema } from '../constants';
import { packageSpecificationSchema } from './promocode';

// Enum for communication channels
export const communicationChannelSchema = z.enum([
    'EMAIL',
    'WHATSAPP',
    'PUSH_NOTIFICATION',
    'SMS'
]);
export type CommunicationChannelType = z.infer<typeof communicationChannelSchema>;

// For backward compatibility
export type CommunicationChannel = CommunicationChannelType;

// Add enum-like object for use in code
export const CommunicationChannel = {
    EMAIL: 'EMAIL' as const,
    WHATSAPP: 'WHATSAPP' as const,
    PUSH_NOTIFICATION: 'PUSH_NOTIFICATION' as const,
    SMS: 'SMS' as const
} as const;

// Status type for bookings
export const bookingStatusSchema = z.enum([
    'PENDING',
    'CONFIRMED',
    'COMPLETED',
    'CANCELLED',
    'UNPAID',
    'EXPIRED'
]);
export type BookingStatus = z.infer<typeof bookingStatusSchema>;

// Communication options schema
export const communicationOptionsSchema = z.object({
    should_send_message: z.boolean(),
    channels: z.array(communicationChannelSchema)
});

export type CommunicationOptions = z.infer<typeof communicationOptionsSchema>;

// Define the booking schema spec
export const bookingSchemaSpec = markAsSchemaSpec({
    external_id: z.string().nullable().optional(),
    title: z.string().nullable().optional(),
    first_name: z.string().nullable().optional(),
    last_name: z.string().nullable().optional(),
    full_name: z.string().nullable().optional(),
    pax: z.number().optional(),
    email: z.string().email().nullable().optional(),
    phone: z.string().nullable().optional(),
    booking_id: z.string().nullable(),
    flight_number: z.string().optional(),
    gender: z.enum(['M', 'F', 'O']).optional(),
    package_size: z.string().optional(),
    sent_messages: z.record(z.any()).optional(),
    locale: supportedLocalesSchema,
    status: bookingStatusSchema,
    data: z.object({
        source: z.string(),
        manual: z.boolean()
    }),
    communication_options: z.object({
        should_send_message: z.boolean(),
        channels: z.array(communicationChannelSchema)
    }),
    is_processed_for_esim_restoration: z.boolean(),
    is_pseudonymized: z.boolean(),
    import_id: z.string().nullable().optional(),
    package_specifications: z.array(packageSpecificationSchema).nullable().optional().default([]),
    departure_date: timestampRequired,
    return_date: timestampNullableOptional,
    partner: { _type: 'docRef' as const, collection: PARTNER_COLLECTION },
    promo_codes: {
        _type: 'array' as const,
        of: { _type: 'docRef' as const, collection: PROMO_CODE_COLLECTION },
        nullable: true,
        optional: true,
        default: []
    },
    users: {
        _type: 'array' as const,
        of: { _type: 'docRef' as const, collection: USER_COLLECTION },
        nullable: true,
        optional: true
    },
    esims: {
        _type: 'array' as const,
        of: { _type: 'docRef' as const, collection: ESIM_COLLECTION },
        nullable: true,
        optional: true
    },
    ...hubbyModelSpec
});

