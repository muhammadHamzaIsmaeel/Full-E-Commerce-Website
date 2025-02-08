// src/middleware.ts
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

// Define protected routes
const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)', // Protect all routes under /dashboard
  '/profile(.*)',   // Protect all routes under /profile
]);

export default clerkMiddleware(async (auth, req) => {
  // Await the auth() function to resolve the ClerkMiddlewareAuthObject
  const authObject = await auth();

  // Check if the route is protected
  if (isProtectedRoute(req)) {
    // Redirect unauthenticated users to the sign-in page
    if (!authObject.userId) {
      return authObject.redirectToSignIn({ returnBackUrl: req.url });
    }
  }

  // Add security headers to all responses
  const response = NextResponse.next();
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');

  // Cache static assets for better performance
  if (req.nextUrl.pathname.startsWith('/_next/static')) {
    response.headers.set('Cache-Control', 'public, max-age=31536000, immutable');
  }

  return response;
});

export const config = {
  matcher: [
    // Skip Next.js internals, static files, and the sign-in route.
    '/((?!_next|sign-in|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};