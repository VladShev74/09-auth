import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { checkSession } from './lib/api/serverApi';

const privateRoutes = ['/notes', '/profile'];
const authRoutes = ['/sign-in', '/sign-up'];

export async function proxy(req: NextRequest) {
  const cookieStore = await cookies();
  const token = cookieStore.get('accessToken')?.value;
  const refreshToken = cookieStore.get('refreshToken')?.value;
  const { pathname } = req.nextUrl;

  const isPrivate = privateRoutes.some(r => pathname.startsWith(r));
  const isAuth = authRoutes.some(r => pathname.startsWith(r));

  let isAuthenticated = !!token;

  if (!token && refreshToken) {
    try {
      const response = await checkSession();
      if (response.data) {
        isAuthenticated = true;
        const nextResponse = isAuth
          ? NextResponse.redirect(new URL('/', req.url))
          : NextResponse.next();
        const setCookie = response.headers['set-cookie'];
        if (setCookie) {
          const cookies = Array.isArray(setCookie) ? setCookie : [setCookie];
          cookies.forEach(c => nextResponse.headers.append('Set-Cookie', c));
        }
        return nextResponse;
      }
    } catch {
      isAuthenticated = false;
    }
  }

  if (!isAuthenticated && isPrivate) {
    return NextResponse.redirect(new URL('/sign-in', req.url));
  }

  if (isAuthenticated && isAuth) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/notes/:path*', '/profile/:path*', '/sign-in', '/sign-up'],
};