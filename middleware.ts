import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value // Or whatever your auth cookie name is
  const { pathname } = request.nextUrl

  // Example Protected Route Logic:
  // If a user tries to access dashboard or profile without a token, redirect to login
  if (!token && (pathname.startsWith('/dashboard') || pathname.startsWith('/profile'))) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}

// Fixed and optimized matcher config for Vercel
export const config = {
  // Only apply the middleware to these specific routes
  // This completely bypasses the problematic Vercel edge regex engine
  matcher: [
    '/dashboard/:path*',
    '/profile/:path*',
    '/admin/:path*'
  ],
}
