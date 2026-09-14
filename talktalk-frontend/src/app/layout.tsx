import type { Metadata } from "next";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  title: "TalkTalk - Learn Languages Through Social Connection",
  description:
    "Join millions of language learners on TalkTalk. Watch short videos, create content, and connect with native speakers from around the world.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className="bg-background text-foreground antialiased dark"
        suppressHydrationWarning={true}
      >
        <SessionProvider>
          {children}
          <Analytics />
        </SessionProvider>
      </body>
    </html>
  );
}
