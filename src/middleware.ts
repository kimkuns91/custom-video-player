import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  // 로그 추가
  console.log('Token:', token);
  console.log('Request URL:', req.nextUrl);

  if (!token) {
    const url = req.nextUrl.clone();
    url.pathname = '/onboarding';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// 이 middleware가 적용될 경로를 설정합니다.
export const config = {
  matcher: '/((?!onboarding|login|api/auth|_next|static|favicon.ico|images).*)',
};
