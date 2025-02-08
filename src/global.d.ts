// src/global.d.ts
import { Clerk } from '@clerk/nextjs';  // Import the Clerk type

declare global {
  interface Window {
    Clerk: Clerk | undefined;  // Make it optional in case it's not yet loaded
  }
}