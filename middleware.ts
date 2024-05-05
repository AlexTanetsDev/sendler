import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    console.log('PatchName', req.nextUrl.pathname);
    console.log('Midlsession', req.nextauth.token?.user_role);
    if (
      req.nextUrl.pathname.startsWith('/dashboard') &&
      req.nextauth.token?.user_role !== 'admin'
    ) {
      return NextResponse.rewrite(new URL('/private-route', req.url));
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: [
    // "/((?!login|api|_next/static|_next/image|favicon.ico).*)",
    // "/sms-sender/:path*",
    '/dashboard/:path*',
    '/create-group/:path*',
    '/update-group/:path*',
    '/sending-history/:path*',
    '/user/:path*',
    '/admin/:path*',
    '/api/admin/:path*',
    '/api/alfa-name/:path*',
    '/api/clients/:path*',
    '/api/reseller/get-balance/:path*',
    '/api/reseller/send-sms/:path*',
    '/api/sending-groups/:path*',
    '/api/sending-history/:path*',
    '/api/sending-history/refresh-statuses/:path*',
    '/api/users/logout/:path*',
  ],
};
