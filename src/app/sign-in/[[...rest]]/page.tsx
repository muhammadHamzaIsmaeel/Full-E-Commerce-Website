// app/sign-in/page.tsx
"use client";
import { SignIn } from "@clerk/nextjs";
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export default function SignInPage() {
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        // Check if the user has successfully signed in by checking if Clerk has reloaded.  It's an imperfect
        // solution, but the most reliable and simple to do with client components.  Alternatively you can build a
        // custom <SignIn/> using Clerk's low-level API and track the state manually.
        const intervalId = setInterval(() => {
            if (typeof window !== 'undefined' && window.Clerk?.session) {
                // If we have a session, we assume the user is logged in
                clearInterval(intervalId);

                const returnBackUrl = searchParams.get('returnBackUrl') || '/';
                router.push(returnBackUrl);
            }
        }, 50); // Check every 50ms

        return () => clearInterval(intervalId); // Cleanup on unmount to prevent memory leaks
    }, [router, searchParams]);


    return (
        <div className="flex justify-center items-center h-screen">
            <SignIn afterSignInUrl={searchParams.get('returnBackUrl') || '/'} />
        </div>
    );
}
