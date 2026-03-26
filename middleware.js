import { NextResponse } from 'next/server';

export function middleware(req) {
  const protectedRoutes = ['/dashboard', '/profile', '/billing', '/settings'];
  const isProtectedRoute = protectedRoutes.some(route => req.nextUrl.pathname.startsWith(route));

  if (isProtectedRoute) {
    const token = req.cookies.get('refreshToken');

    if (!token) {
      const loginUrl = new URL('/login', req.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
