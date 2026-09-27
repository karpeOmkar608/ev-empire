import { NextRequest, NextResponse } from 'next/server'
import { validateAdminCredentials, createSession, getCookieName, getCookieOptions } from '@/lib/admin-auth'
import { loginSchema } from '@/lib/admin-validation'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate input
    const parsed = loginSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 400 })
    }

    const { email, password } = parsed.data

    // Validate credentials (server-side only)
    const valid = validateAdminCredentials(email, password)
    if (!valid) {
      // Add a small delay to prevent brute-force timing attacks
      await new Promise(resolve => setTimeout(resolve, 500))
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }

    // Create JWT session token
    const token = await createSession(email)

    // Set HTTP-only cookie
    const response = NextResponse.json({ success: true })
    response.cookies.set(getCookieName(), token, getCookieOptions())

    return response
  } catch (error) {
    console.error('[Login API] Error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
