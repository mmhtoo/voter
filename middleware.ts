import { authMiddleware, redirectToSignIn } from '@clerk/nextjs'
import { NextFetchEvent, NextRequest, NextResponse } from 'next/server'

// This example protects all routes including api/trpc routes7
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your Middleware
export default authMiddleware({
  ignoredRoutes: ['/((?!api|trpc))(_next.*|.+.[w]+$)'],
  publicRoutes: ['/', /^\/*(?!.*\badmin\b).*/],
})

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}
