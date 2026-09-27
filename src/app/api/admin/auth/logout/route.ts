import { NextResponse } from 'next/server'
import { getCookieName, getCookieOptions } from '@/lib/admin-auth'

export async function POST() {
  const response = NextResponse.json({ success: true })
  // Clear the session cookie
  response.cookies.set(getCookieName(), '', getCookieOptions(0))
  return response
}
