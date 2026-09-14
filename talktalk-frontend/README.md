# TalkTalk frontend

TalkTalk is a short-form language-learning demo built with Next.js 15, React
19, TypeScript, Tailwind CSS, Auth.js, Supabase, and Azure Speech.

The core demo is deliberately resilient: three bundled MP4 lessons and seeded
quizzes keep `/explore`, `/profile`, and `/progress` usable without external
services. When configured, the app loads public video metadata and media from
the Supabase `videos` table and `videos` Storage bucket. Google sign-in and
Azure pronunciation assessment remain optional.

## Getting started

Install dependencies and run the development server from this directory:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

Copy `.env.example` to `.env.local`. Every integration is optional for the
seeded demo, but each configured integration needs its complete variable set.

- `AUTH_SECRET`, `AUTH_GOOGLE_ID`, `AUTH_GOOGLE_SECRET`: Google sign-in.
- `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`: public video
  metadata and the `videos` Storage bucket. Guests can browse the feed; a
  signed-in learner's `user_info.content_interest` is used when available.
- `SPEECH_KEY`, `SPEECH_REGION`: Azure Speech pronunciation assessment.

Do not prefix `SPEECH_KEY` with `NEXT_PUBLIC_`; the subscription key stays on
the server and the browser receives only a short-lived Azure token.

## Verification

```bash
npm run build
npm start
```

Then verify `/`, `/explore`, `/profile`, `/progress`, and
`/api/speech-token`.

## Bundled demo media

The resilient guest feed uses local copies of open sample media so playback
does not depend on a third-party CDN at runtime:

- the Sintel trailer from the W3C media test collection;
- MDN's CC0 flower clip;
- a short Big Buck Bunny browser-test clip from `cseitz/sample-files`.

## Vercel deployment

Use `talktalk-frontend` as the Vercel Root Directory. The framework preset,
install command, build command (`npm run build`), and output settings can use
Vercel's Next.js defaults. Add environment variables for Production and
Preview as needed, then redeploy.
