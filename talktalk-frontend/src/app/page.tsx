import Link from "next/link";

export default function Home() {
  return (
    <div>
      <main>
        <div className="flex gap-4">
          <Link href="/explore">Explore</Link>
          <Link href="/login">Login</Link>
          <Link href="/signup">Signup</Link>
        </div>
      </main>
    </div>
  );
}
