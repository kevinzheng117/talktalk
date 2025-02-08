import React, { useState, useEffect, useRef } from "react";
import * as sdk from "microsoft-cognitiveservices-speech-sdk";

function parseResultsForFeedback(words) {
  let feedback = "";
  words.forEach((wordInfo) => {
    const wordText = wordInfo.Word;
    const err = wordInfo.PronunciationAssessment.ErrorType;
    if (err === "Omission")
      feedback += `You did not say the word ${wordText}. \n`;
    if (err === "Insertion") feedback += `You added the word ${wordText}. \n`;
    if (err === "Mispronunciation")
      feedback += `You mispronounced the word ${wordText}. \n`;
  });
  return feedback;
}

function rescaleAccuracy(accuracy) {
  // const cutoff = 20;
  // if (accuracy <= cutoff) return 0;
  // accuracy -= cutoff;
  return accuracy * 20;
}

export function SpeechToText({ referenceText }) {
  const SPEECH_KEY =
    "75DPZx6SPx84mwP5QC2LXdQSZECnE5mJ73ZQNsylOTTY1YWZ1wrjJQQJ99BBACYeBjFXJ3w3AAAAACOGCju2";
  const SPEECH_REGION = "eastus";

  const [isListening, setIsListening] = useState(false);
  const [feedback, setFeedback] = useState("");
  const speechConfig = useRef(null);
  const audioConfig = useRef(null);
  const pronunciationConfig = useRef(null);
  const recognizer = useRef(null);

  const [recognizingTranscript, setRecTranscript] = useState("");
  const configJson = {
    GradingSystem: "HundredMark",
    Granularity: "Phoneme",
    Dimension: "Comprehensive",
    EnableMiscue: true,
    EnableProsodyAssessment: true,
    NBestPhonemeCount: 0,
  };

  useEffect(() => {
    speechConfig.current = sdk.SpeechConfig.fromSubscription(
      SPEECH_KEY,
      SPEECH_REGION
    );
    speechConfig.current.speechRecognitionLanguage = "es-MX";

    audioConfig.current = sdk.AudioConfig.fromDefaultMicrophoneInput();
    pronunciationConfig.current = new sdk.PronunciationAssessmentConfig({
      GradingSystem: "HundredMark",
      Granularity: "Phoneme",
      Dimension: "Comprehensive",
      EnableMiscue: true,
      EnableProsodyAssessment: true,
      NBestPhonemeCount: 0,
    });
    pronunciationConfig.current.referenceText = referenceText;

    recognizer.current = new sdk.SpeechRecognizer(
      speechConfig.current,
      audioConfig.current
    );
    pronunciationConfig.current.applyTo(recognizer.current);

    const processRecognizedTranscript = (event) => {
      const result = event.result;
      console.log("Recognition result:", result);

      if (result.reason === sdk.ResultReason.RecognizedSpeech) {
        const transcript = result.text;
        console.log("Transcript: -->", transcript);
        // Call a function to process the transcript as needed
        const pronunciationResult =
          sdk.PronunciationAssessmentResult.fromResult(result);
        console.log("res in this exact fn", pronunciationResult);
        const raw =
          pronunciationResult["privPronJson"]["PronunciationAssessment"];
        const acc = (raw.AccuracyScore + raw.FluencyScore) / 2;
        const accuracy = rescaleAccuracy(acc);
        const feed = parseResultsForFeedback(
          pronunciationResult["privPronJson"]["Words"]
        );
        console.log("setting feedback");
        setFeedback(`Score: ${accuracy}%. ${feed}`);
        console.log("feedback is now", feedback);

        setMyTranscript(transcript);
      }
    };

    const processRecognizingTranscript = (event) => {
      const result = event.result;
      console.log("Recognition result:", result);
      if (result.reason === sdk.ResultReason.RecognizingSpeech) {
        const transcript = result.text;
        console.log("Transcript: -->", transcript);

        // Call a function to process the transcript as needed

        setRecTranscript(transcript);
      }
    };

    recognizer.current.recognized = (s, e) => processRecognizedTranscript(e);
    recognizer.current.recognizing = (s, e) => processRecognizingTranscript(e);

    recognizer.current.startContinuousRecognitionAsync(() => {
      console.log("Speech recognition started.");
      setIsListening(true);
    });

    return () => {
      recognizer.current.stopContinuousRecognitionAsync(() => {
        setIsListening(false);
      });
    };
  }, []);

  const pauseListening = () => {
    setIsListening(false);
    recognizer.current.stopContinuousRecognitionAsync();
    console.log("Paused listening.");
  };

  const resumeListening = () => {
    if (!isListening) {
      setIsListening(true);
      recognizer.current.startContinuousRecognitionAsync(() => {
        console.log("Resumed listening...");
      });
    }
  };

  const stopListening = () => {
    setIsListening(false);
    recognizer.current.stopContinuousRecognitionAsync(() => {
      console.log("Speech recognition stopped.");
    });
  };

  return (
    <div className="w-full max-w-lg space-y-6 p-4">
      <div className="rounded-lg border border-zinc-800 bg-black/50 p-4 dark:border-zinc-700">
        <p className="text-lg font-medium mb-1 text-zinc-100">
          Practice saying:
        </p>
        <p className="text-xl text-purple-400 dark:text-purple-300">
          {referenceText}
        </p>
      </div>

      <div className="flex gap-3">
        <button
          onClick={resumeListening}
          className="flex-1 rounded-lg bg-purple-600 px-4 py-2 text-white transition-colors hover:bg-purple-700 active:bg-purple-800"
        >
          Start Listening
        </button>
        <button
          onClick={stopListening}
          className="flex-1 rounded-lg bg-zinc-800 px-4 py-2 text-white transition-colors hover:bg-zinc-700 active:bg-zinc-600"
        >
          Stop Listening
        </button>
      </div>

      <div className="space-y-4">
        <div className="rounded-lg border border-zinc-800 bg-black/50 p-4 dark:border-zinc-700">
          <span className="text-zinc-400">Recognizing Transcript: </span>
          <span className="text-zinc-100">{recognizingTranscript}</span>
        </div>

        {feedback != "" && (
          <div className="rounded-lg border border-zinc-800 bg-black/30 p-4 dark:border-zinc-700">
            <p className="mb-2 font-medium text-zinc-100">
              Here's some feedback on what you said:
            </p>
            <p className="text-zinc-300 whitespace-pre-line">{feedback}</p>
          </div>
        )}
      </div>
    </div>
  );
}
