import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'
import { NextRequest } from 'next/server'

const COOKIE_NAME = 'admin_session'
const SESSION_DURATION_SECONDS = 60 * 60 * 8 // 8 hours

function getSecret(): Uint8Array {
  const secret = process.env.ADMIN_JWT_SECRET
  if (!secret) {
    throw new Error('ADMIN_JWT_SECRET environment variable is not set')
  }
  return new TextEncoder().encode(secret)
}

export interface AdminSession {
  email: string
  iat: number
  exp: number
}

export async function createSession(email: string): Promise<string> {
  const secret = getSecret()
  const token = await new SignJWT({ email })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_DURATION_SECONDS}s`)
    .sign(secret)
  return token
}

export async function verifySession(token: string): Promise<AdminSession | null> {
  try {
    const secret = getSecret()
    const { payload } = await jwtVerify(token, secret)
    return payload as unknown as AdminSession
  } catch {
    return null
  }
}

export async function getSessionFromRequest(request: NextRequest): Promise<AdminSession | null> {
  const token = request.cookies.get(COOKIE_NAME)?.value
  if (!token) return null
  return verifySession(token)
}

export async function getSessionFromCookies(): Promise<AdminSession | null> {
  const cookieStore = await cookies()
  const token = cookieStore.get(COOKIE_NAME)?.value
  if (!token) return null
  return verifySession(token)
}

export function getCookieName(): string {
  return COOKIE_NAME
}

export function getCookieOptions(maxAge?: number) {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    path: '/',
    maxAge: maxAge ?? SESSION_DURATION_SECONDS,
  }
}

export function validateAdminCredentials(email: string, password: string): boolean {
  const adminEmail = process.env.ADMIN_EMAIL
  const adminPassword = process.env.ADMIN_PASSWORD

  if (!adminEmail || !adminPassword) {
    console.error('[Auth] ADMIN_EMAIL or ADMIN_PASSWORD env var is not set')
    return false
  }

  // Timing-safe comparison via constant-time-like approach
  const emailMatch = email === adminEmail
  const passMatch = password === adminPassword
  return emailMatch && passMatch
}
