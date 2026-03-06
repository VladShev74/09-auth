import { NextRequest, NextResponse } from 'next/server';

const privateRoutes = ['/notes', '/profile'];
const authRoutes = ['/sign-in', '/sign-up'];

export function middleware(req: NextRequest) {
  const token = req.cookies.get('accessToken')?.value;
  const { pathname } = req.nextUrl;

  const isPrivate = privateRoutes.some(r => pathname.startsWith(r));
  const isAuth = authRoutes.some(r => pathname.startsWith(r));

  if (!token && isPrivate) {
    return NextResponse.redirect(new URL('/sign-in', req.url));
  }

  if (token && isAuth) {
    return NextResponse.redirect(new URL('/profile', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/notes/:path*', '/profile/:path*', '/sign-in', '/sign-up'],
};