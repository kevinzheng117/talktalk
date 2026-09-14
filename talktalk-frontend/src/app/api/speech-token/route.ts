import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const speechKey = process.env.SPEECH_KEY;
  const speechRegion = process.env.SPEECH_REGION ?? "eastus";

  if (!speechKey) {
    return NextResponse.json(
      { error: "Pronunciation practice is not configured for this demo." },
      { status: 503 }
    );
  }

  try {
    const response = await fetch(
      `https://${speechRegion}.api.cognitive.microsoft.com/sts/v1.0/issueToken`,
      {
        method: "POST",
        headers: { "Ocp-Apim-Subscription-Key": speechKey },
        cache: "no-store",
      }
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: "Azure Speech rejected the configured credentials." },
        { status: 502 }
      );
    }

    return NextResponse.json({
      token: await response.text(),
      region: speechRegion,
    });
  } catch {
    return NextResponse.json(
      { error: "Azure Speech is temporarily unavailable." },
      { status: 502 }
    );
  }
}
