import { NextRequest, NextResponse } from 'next/server';

// Basic認証
export const config = {
  // matcher: ['/:path*', '/index/:path*'],
  matcher: ['/:path*'],
};

/**
 * リリースまでlocal以外のdev, prdにもBasic認証をかける
 * @param req
 * @returns
 */
export function middleware(req: NextRequest) {
  if (
    // process.env.CURRENT_STAGE !== 'local'
    process.env.CURRENT_STAGE === 'dev'
  ) {
    const basicAuth = req.headers.get('Authorization');
    if (basicAuth) {
      const authValue = basicAuth.split(' ')[1];
      const [user, password] = atob(authValue).split(':');
      if (
        user === process.env.BASIC_USER &&
        password === process.env.BASIC_PASSWORD
      ) {
        return NextResponse.next();
      }
      return NextResponse.json(
        { error: 'Invalid credentials' },
        {
          headers: { 'WWW-Authenticate': 'Basic realm="Secure Area"' },
          status: 401,
        },
      );
    }
    return NextResponse.json(
      { error: 'Please enter credentials' },
      {
        headers: { 'WWW-Authenticate': 'Basic realm="Secure Area"' },
        status: 401,
      },
    );
  }
  return NextResponse.next();
}
