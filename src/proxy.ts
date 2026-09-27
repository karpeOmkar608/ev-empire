import { NextRequest, NextResponse } from 'next/server'
import { getSessionFromRequest } from '@/lib/admin-auth'

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Only protect /admin/* routes
  if (!pathname.startsWith('/admin')) {
    return NextResponse.next()
  }

  // Allow the login page and login API without auth
  if (
    pathname === '/admin/login' ||
    pathname.startsWith('/api/admin/auth/login')
  ) {
    return NextResponse.next()
  }

  // Verify session
  const session = await getSessionFromRequest(request)

  if (!session) {
    // Redirect to login with return URL
    const loginUrl = new URL('/admin/login', request.url)
    loginUrl.searchParams.set('from', pathname)
    return NextResponse.redirect(loginUrl)
  }

  // Session is valid — allow request
  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
}
