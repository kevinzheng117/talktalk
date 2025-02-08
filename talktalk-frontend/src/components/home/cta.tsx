// app/components/cta.tsx
import { Button } from "@/components/ui/button";

// Update CTA content
export default function CTA() {
  return (
    <section className="border-t">
      <div className="container flex flex-col items-center gap-4 py-24 text-center md:py-32">
        <h2 className="font-bold text-3xl leading-[1.1] sm:text-3xl md:text-5xl">
          Ready to start your language journey?
        </h2>
        <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
          Join our community of over 10 million language learners and start
          speaking with confidence today.
        </p>
        <Button
          size="lg"
          className="mt-4 bg-gradient-to-r from-primary to-accent hover:opacity-90"
        >
          Download TalkTalk
        </Button>
      </div>
    </section>
  );
}
