import { NextRequest, NextResponse } from 'next/server'
import { getSessionFromRequest } from '@/lib/admin-auth'

export async function GET(request: NextRequest) {
  const session = await getSessionFromRequest(request)
  if (!session) {
    return NextResponse.json({ authenticated: false }, { status: 401 })
  }
  return NextResponse.json({ authenticated: true, email: session.email })
}
