"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import type { QuizQuestion } from "@/types/quiz-data";

interface TikTokQuizProps {
  questions: QuizQuestion[];
}

export default function TikTokQuiz({ questions }: TikTokQuizProps) {
  console.log("questions:", questions)
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const handleAnswerClick = (answer: string) => {
    if (isAnswered) return;

    setSelectedAnswer(answer);
    setIsAnswered(true);

    if (answer === questions[currentQuestion].correct_answer) {
      setScore((prev) => prev + 1);
    }

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion((prev) => prev + 1);
        setSelectedAnswer(null);
        setIsAnswered(false);
      } else {
        setShowResult(true);
      }
    }, 1500);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    setSelectedAnswer(null);
    setIsAnswered(false);
  };

  return (
    <div className="w-full max-w-lg h-[600px] flex items-center">
      <div className="w-full rounded-lg border p-6 shadow-sm dark:border-gray-700 bg-background/95 backdrop-blur">
        <Progress value={progress} className="mb-6" />
        <div className="mb-4 text-sm text-muted-foreground">
          Question {currentQuestion + 1} of {questions.length}
        </div>
        <AnimatePresence mode="wait">
          {showResult ? (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex flex-col items-center justify-center py-8"
            >
              <h2 className="text-2xl font-bold mb-4">Quiz Complete! 🎉</h2>
              <p className="text-xl mb-6">
                You scored {score} out of {questions.length}
              </p>
              <Button onClick={resetQuiz} className="w-full max-w-xs">
                Try Again
              </Button>
            </motion.div>
          ) : (
            <motion.div
              key={currentQuestion}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
            >
              <h2 className="text-xl font-semibold mb-6">
                {questions[currentQuestion].question}
              </h2>
              <div className="grid gap-3">
                {questions[currentQuestion].answers.map((answer) => (
                  <Button
                    key={answer}
                    variant={
                      isAnswered
                        ? answer === questions[currentQuestion].correct_answer
                          ? "default"
                          : answer === selectedAnswer
                          ? "destructive"
                          : "outline"
                        : "outline"
                    }
                    className="relative w-full p-4 text-left h-auto"
                    onClick={() => handleAnswerClick(answer)}
                    disabled={isAnswered}
                  >
                    <span className="mr-8">{answer}</span>
                    {isAnswered &&
                      answer === questions[currentQuestion].correct_answer && (
                        <Check className="absolute right-4 h-4 w-4" />
                      )}
                    {isAnswered &&
                      answer === selectedAnswer &&
                      answer !== questions[currentQuestion].correct_answer && (
                        <X className="absolute right-4 h-4 w-4" />
                      )}
                  </Button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
