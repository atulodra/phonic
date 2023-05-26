import { NextRequest, NextResponse } from 'next/server'
// import type { NextRequest } from 'next/server'

const signedinPages = ['/', '/playlist', '/recentlyplayed','/favourties']

export default function middleware(req: NextRequest) {
    if (signedinPages.find((p) => p === req.nextUrl.pathname)) {
        const token = req.cookies.get('PHONIC_ACCESS_TOKEN')?.value

        if (!token) {
            const url = req.nextUrl.clone()
            url.pathname = '/signin'
            return NextResponse.rewrite(url)
        }
    }
}