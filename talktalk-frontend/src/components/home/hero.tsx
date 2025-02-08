// app/components/hero.tsx
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

// Update the hero section content
export default function Hero() {
  return (
    <section className="container flex min-h-[calc(100vh-3.5rem)] max-w-screen-2xl flex-col items-center justify-center space-y-8 py-24 text-center md:py-32">
      <div className="space-y-4">
        <h1 className="bg-gradient-to-r from-primary to-accent bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl md:text-6xl lg:text-7xl">
          Learn Languages
          <br />
          Through Social Connection
        </h1>
        <p className="mx-auto max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
          Join millions of language learners on TalkTalk. Watch short videos,
          create content, and connect with native speakers from around the
          world.
        </p>
      </div>
      <div className="flex gap-4">
        <Button
          size="lg"
          className="bg-gradient-to-r from-primary to-accent hover:opacity-90"
        >
          Start Learning
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
        <Button variant="outline" size="lg">
          Browse Languages
        </Button>
      </div>
    </section>
  );
}
