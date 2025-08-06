import { z } from 'zod';
import { markAsSchemaSpec } from '../common';
import { hubbyModelSpec } from './common';

// Country schema spec
export const trafficPolicySpec = markAsSchemaSpec({
    ...hubbyModelSpec,
    name: z.string(),
    description: z.string(),
    external_id: z.string(),
    provider: z.string()
})