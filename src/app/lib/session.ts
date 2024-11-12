import 'server-only';
import { cookies } from 'next/headers';
import { SignJWT, jwtVerify } from 'jose';
import { SessionPayload } from '@/app/lib/definitions';

const secretKey = process.env.SESSION_SECRET;

if (!secretKey) {
  throw new Error('SESSION_SECRET is not defined');
}

const encodedKey = new TextEncoder().encode(secretKey);

async function encrypt(payload: SessionPayload) {
    try {
        return new SignJWT(payload)
            .setProtectedHeader({ alg: 'HS256' })
            .setIssuedAt()
            .setExpirationTime('7d') // The expiration time should match the cookie expiration
            .sign(encodedKey);
    } catch (error) {
        console.error('Error encrypting the session:', error);
        throw new Error('Failed to create JWT');
    }
}

export async function decrypt(session: string | undefined = '') {
    try {
        if (!session) return null; // Avoid unnecessary jwtVerify call with empty session

        const { payload } = await jwtVerify(session, encodedKey, {
            algorithms: ['HS256'],
        });
        return payload;
    } catch (error) {
        console.error('Failed to verify session:', error);
        return null;  // Explicitly return null on error
    }
}

export async function createSession(userId: string) {
    try {
        userId = String(userId); // Ensure userId is a string
        const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // Expiry time for the cookie
        const session = await encrypt({ userId, expiresAt });

        console.log('Session created:', session);

        const cookieStore = await cookies();
        cookieStore.set('session', session, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Set to true only in production
            expires: expiresAt, // Set expiry for cookie
            sameSite: 'lax',
            path: '/',
        });
    } catch (error) {
        console.error('Error creating session:', error);
        throw new Error('Failed to create session');
    }
}
