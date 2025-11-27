import { z } from 'zod';
import {
    PARTNER_COLLECTION,
    PROMO_CODE_COLLECTION,
    USER_COLLECTION,
    ESIM_COLLECTION,
    timestampNullable,
    timestampRequired
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

export const financialInsightsSchema = z.object({
    partner_commission_percentage: z.number().nullable().optional(),
    total_commission_amount: z.number().nullable().optional(),
    price: z.number().nullable().optional(),
}).nullable().optional()

export type CommunicationOptions = z.infer<typeof communicationOptionsSchema>;

// Define the booking schema spec
export const bookingSchemaSpec = markAsSchemaSpec({
    id: z.string().optional(),
    external_id: z.string().nullable().optional(),
    created_at: timestampRequired,
    updated_at: timestampRequired,
    created_by: z.string().nullable(),
    updated_by: z.string().nullable(),
    title: z.string().nullable().optional(),
    first_name: z.string().nullable().optional(),
    last_name: z.string().nullable().optional(),
    full_name: z.string().nullable().optional(),
    pax: z.number(),
    email: z.string().email().nullable().optional(),
    phone: z.string().nullable().optional(),
    booking_id: z.string().nullable().optional(),
    flight_number: z.string().optional(),
    gender: z.enum(['M', 'F', 'O']).optional(),
    sent_messages: z.record(z.any()).optional(),
    locale: supportedLocalesSchema,
    status: bookingStatusSchema.optional().nullable(),
    data: {
        _type: 'object' as const,
        of: {
            source: z.string(),
            manual: z.boolean()
        },
        nullable: true,
        optional: true
    },
    communication_options: {
        _type: 'object' as const,
        of: {
            should_send_message: z.boolean(),
            channels: {
                _type: 'array' as const,
                of: communicationChannelSchema
            }
        }
    },
    is_processed_for_esim_restoration: z.boolean().optional().nullable(),
    is_pseudonymized: z.boolean().optional().nullable(),
    import_id: z.string().nullable().optional(),
    package_specifications: z.array(packageSpecificationSchema).min(1),
    departure_date: timestampRequired,
    return_date: timestampNullable,
    partner: { _type: 'docRef' as const, collection: PARTNER_COLLECTION },
    financial_insights: financialInsightsSchema,
    promo_codes: {
        _type: 'array' as const,
        of: { _type: 'docRef' as const, collection: PROMO_CODE_COLLECTION },
        nullable: true,
        optional: true
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
    hubby_foreign_identifiers: z.object({
        messaging_contact_id: z.string().nullable()
    }).nullable().optional()
});

