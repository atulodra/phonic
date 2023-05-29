import { NextRequest, NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server'

const signedinPages = ['/', '/playlist', '/recentlyplayed', '/favourites'];
const PUBLIC_FILE = /\.(.*)$/;

export default function middleware(req: NextRequest) {
    if (signedinPages.find((p) => p === req.nextUrl.pathname)) {
        const token = req.cookies.get('PHONIC_ACCESS_TOKEN')?.value;

        if (!token) {
            const url = req.nextUrl.clone();
            url.pathname = '/signin';
            return NextResponse.rewrite(url);
        }
    }
    const { pathname } = req.nextUrl;

    if (
        pathname.startsWith('/_next') ||
        pathname.startsWith('/api') ||
        pathname.startsWith('/static') ||
        pathname.startsWith('/signin') ||
        pathname.startsWith('/signup') ||
        PUBLIC_FILE.test(pathname)
    ) {
        return NextResponse.next();
    }
}
