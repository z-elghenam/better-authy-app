import { createAuthClient } from "better-auth/react";
const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export const { signUp, signIn, signOut, useSession } = authClient;
