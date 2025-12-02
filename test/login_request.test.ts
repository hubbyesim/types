import { HLoginRequestSchema, LoginRequestSchema } from '../src';

describe('LoginRequest Schema', () => {
    const validLoginRequest = {
        email: 'user@example.com',
        status: 'pending' as const,
        created_at: new Date('2024-01-01'),
        expires_at: new Date('2024-01-01T00:15:00Z') // 15 minutes later
    };

    it('should validate a valid login request for client schema', () => {
        const result = HLoginRequestSchema.safeParse(validLoginRequest);
        expect(result.success).toBe(true);
        if (result.success) {
            expect(result.data.email).toBe('user@example.com');
            expect(result.data.status).toBe('pending');
            expect(result.data.created_at).toBeInstanceOf(Date);
            expect(result.data.expires_at).toBeInstanceOf(Date);
        }
    });

    it('should validate a valid login request for server schema', () => {
        const result = LoginRequestSchema.safeParse(validLoginRequest);
        expect(result.success).toBe(true);
    });

    it('should reject invalid email', () => {
        const invalidRequest = {
            ...validLoginRequest,
            email: 'invalid-email'
        };
        const result = HLoginRequestSchema.safeParse(invalidRequest);
        expect(result.success).toBe(false);
    });

    it('should reject invalid status', () => {
        const invalidRequest = {
            ...validLoginRequest,
            status: 'invalid-status'
        };
        const result = HLoginRequestSchema.safeParse(invalidRequest);
        expect(result.success).toBe(false);
    });

    it('should accept all valid status values', () => {
        const statuses = ['pending', 'completed', 'expired'] as const;
        
        statuses.forEach(status => {
            const request = {
                ...validLoginRequest,
                status
            };
            const result = HLoginRequestSchema.safeParse(request);
            expect(result.success).toBe(true);
        });
    });

    it('should require all fields', () => {
        const incompleteRequest = {
            email: 'user@example.com'
            // missing status, created_at, expires_at
        };
        const result = HLoginRequestSchema.safeParse(incompleteRequest);
        expect(result.success).toBe(false);
    });
});
