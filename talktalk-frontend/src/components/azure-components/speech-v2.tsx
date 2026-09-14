"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import * as sdk from "microsoft-cognitiveservices-speech-sdk";

interface SpeechTokenResponse {
  token?: string;
  region?: string;
  error?: string;
}

function getWordFeedback(words: sdk.PronunciationAssessmentResult["detailResult"]["Words"]) {
  const notes = words.flatMap((word) => {
    const errorType = word.PronunciationAssessment?.ErrorType;

    if (errorType === "Omission") return [`Try including “${word.Word}”.`];
    if (errorType === "Insertion") return [`“${word.Word}” was added.`];
    if (errorType === "Mispronunciation") {
      return [`Practice the pronunciation of “${word.Word}”.`];
    }

    return [];
  });

  return notes.join(" ");
}

export function SpeechToText({ referenceText }: { referenceText: string }) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [feedback, setFeedback] = useState("");
  const [error, setError] = useState("");
  const recognizerRef = useRef<sdk.SpeechRecognizer | null>(null);

  const closeRecognizer = useCallback(() => {
    recognizerRef.current?.close();
    recognizerRef.current = null;
    setIsListening(false);
  }, []);

  useEffect(() => closeRecognizer, [closeRecognizer]);

  const startListening = async () => {
    if (isListening) return;

    setError("");
    setFeedback("");
    setTranscript("");

    try {
      const response = await fetch("/api/speech-token", { cache: "no-store" });
      const credentials = (await response.json()) as SpeechTokenResponse;

      if (!response.ok || !credentials.token || !credentials.region) {
        throw new Error(
          credentials.error ?? "Pronunciation practice is not configured."
        );
      }

      const speechConfig = sdk.SpeechConfig.fromAuthorizationToken(
        credentials.token,
        credentials.region
      );
      speechConfig.speechRecognitionLanguage = "es-MX";

      const audioConfig = sdk.AudioConfig.fromDefaultMicrophoneInput();
      const pronunciationConfig = new sdk.PronunciationAssessmentConfig(
        referenceText,
        sdk.PronunciationAssessmentGradingSystem.HundredMark,
        sdk.PronunciationAssessmentGranularity.Phoneme,
        true
      );
      pronunciationConfig.enableProsodyAssessment = true;

      const recognizer = new sdk.SpeechRecognizer(speechConfig, audioConfig);
      recognizerRef.current = recognizer;
      pronunciationConfig.applyTo(recognizer);

      recognizer.recognizing = (_sender, event) => {
        setTranscript(event.result.text);
      };

      setIsListening(true);
      recognizer.recognizeOnceAsync(
        (result) => {
          if (result.reason === sdk.ResultReason.RecognizedSpeech) {
            const assessment = sdk.PronunciationAssessmentResult.fromResult(result);
            const notes = getWordFeedback(assessment.detailResult.Words);

            setTranscript(result.text);
            setFeedback(
              `Pronunciation score: ${Math.round(assessment.pronunciationScore)}%. ${
                notes || "Nice work — every word was recognized."
              }`
            );
          } else {
            setError("No speech was recognized. Please try again and speak clearly.");
          }

          closeRecognizer();
        },
        () => {
          setError("Speech recognition could not connect. Please try again.");
          closeRecognizer();
        }
      );
    } catch (caughtError) {
      setError(
        caughtError instanceof Error
          ? caughtError.message
          : "Speech recognition could not start."
      );
      closeRecognizer();
    }
  };

  return (
    <div className="w-full max-w-lg space-y-6 p-4">
      <div className="rounded-lg border border-zinc-800 bg-black/50 p-4 dark:border-zinc-700">
        <p className="mb-1 text-lg font-medium text-zinc-100">Practice saying:</p>
        <p className="text-xl text-purple-400 dark:text-purple-300">
          {referenceText}
        </p>
      </div>

      <div className="flex gap-3">
        <button
          onClick={startListening}
          disabled={isListening}
          className="flex-1 rounded-lg bg-purple-600 px-4 py-2 text-white transition-colors hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isListening ? "Listening…" : "Start Listening"}
        </button>
        <button
          onClick={closeRecognizer}
          disabled={!isListening}
          className="flex-1 rounded-lg bg-zinc-800 px-4 py-2 text-white transition-colors hover:bg-zinc-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          Stop Listening
        </button>
      </div>

      <div className="space-y-4" aria-live="polite">
        <div className="rounded-lg border border-zinc-800 bg-black/50 p-4 dark:border-zinc-700">
          <span className="text-zinc-400">Recognized text: </span>
          <span className="text-zinc-100">
            {transcript || "Your words will appear here."}
          </span>
        </div>

        {feedback && (
          <div className="rounded-lg border border-zinc-800 bg-black/30 p-4 dark:border-zinc-700">
            <p className="mb-2 font-medium text-zinc-100">Pronunciation feedback</p>
            <p className="text-zinc-300">{feedback}</p>
          </div>
        )}

        {error && (
          <div className="rounded-lg border border-amber-700/60 bg-amber-950/30 p-4 text-amber-200">
            {error}
          </div>
        )}
      </div>
    </div>
  );
}
