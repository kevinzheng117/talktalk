import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

export const isAuthEnabled = Boolean(
  process.env.AUTH_SECRET &&
    process.env.AUTH_GOOGLE_ID &&
    process.env.AUTH_GOOGLE_SECRET
);

export const { handlers, signIn, signOut, auth } = NextAuth({
  trustHost: true,
  secret: isAuthEnabled
    ? process.env.AUTH_SECRET
    : "talktalk-demo-mode-auth-disabled",
  providers: isAuthEnabled ? [Google] : [],
});
