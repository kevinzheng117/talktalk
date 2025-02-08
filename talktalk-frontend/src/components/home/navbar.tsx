// app/components/navbar.tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";

// Update the navbar content
export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <span className="font-bold text-xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            TalkTalk
          </span>
        </Link>
        <nav className="flex flex-1 items-center space-x-6 text-sm font-medium">
          <Link
            href="/explore"
            className="transition-colors hover:text-primary"
          >
            Explore
          </Link>
          <Link href="#" className="transition-colors hover:text-primary">
            Learn
          </Link>
          <Link href="#" className="transition-colors hover:text-primary">
            Community
          </Link>
        </nav>
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" asChild>
            <Link href="http://127.0.0.1:8000/auth/login/google-oauth2/">
              Sign In
            </Link>
          </Button>
          <Button
            size="sm"
            className="bg-gradient-to-r from-primary to-accent hover:opacity-90"
            asChild
          >
            <Link href="http://127.0.0.1:8000/auth/login/google-oauth2/">
              Join Free
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
