'use client';
import React, { useState } from 'react';
import { quizData } from '@/lib/quizData';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleAnswer = (answer: string) => {
    setSelectedAnswer(answer);
    setTimeout(() => {
      setAnswers([...answers, answer]);
      setSelectedAnswer(null);
      if (currentQuestion < quizData.questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        setIsSubmitting(true);
        const result = calculateResult([...answers, answer]);
        setTimeout(() => {
          router.push(`/bloating-breakthrough-blueprint/bloating-quiz/results?result=${result}`);
        }, 1000);
      }
    }, 300);
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
        setCurrentQuestion(currentQuestion - 1);
        setAnswers(answers.slice(0, -1));
    }
  };

  const calculateResult = (userAnswers: string[]) => {
    // Question 9: Hormonal bloating
    if (userAnswers[8] === 'a') { // Q9 is at index 8
      return 'hormonal-bloat';
    }

    // Question 8: Constipation
    if (userAnswers[7] === 'a') { // Q8 is at index 7
      return 'constipation-related';
    }
    
    // Question 3: Food sensitivities
    if (userAnswers[2] === 'a' || userAnswers[2] === 'b') { // Q3 is at index 2
        return 'fodmap-sensitivity';
    }
    if (userAnswers[12] === 'a') { // Q13 is at index 12 (dairy)
        return 'lactose-intolerance';
    }

    // Question 10: Stress
    if (userAnswers[9] === 'c') { // Q10 is at index 9
      return 'stress-linked';
    }
    
    // Question 6: Air swallowing
    if (userAnswers[5] === 'd') { // Q6 is at index 5
        return 'air-swallowing-carbonation';
    }
    
    // Question 15: Gut dysbiosis
    if (userAnswers[14] === 'a' || userAnswers[14] === 'b') { // Q15 is at index 14
        return 'gut-dysbiosis';
    }

    // Fallback to general discomfort
    return 'general-digestive-discomfort';
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-2xl w-full mx-auto my-12 p-8 rounded-lg glass-morphism">
        {isSubmitting ? (
          <div className="text-center">
            <h2 className="typography-h2 gradient-text">Calculating your results...</h2>
          </div>
        ) : (
          <>
            <div className="mb-8">
                <div className="flex justify-between items-center mb-2">
                    <span className="typography-utility-sans text-gray-500">Question {currentQuestion + 1} of {quizData.questions.length}</span>
                    <button onClick={handleBack} disabled={currentQuestion === 0} className="text-sm text-camber-sage-primary disabled:opacity-50">Back</button>
                </div>
                <div className="w-full bg-camber-background-muted rounded-full h-2.5">
                    <motion.div
                        className="bg-camber-sage-primary h-2.5 rounded-full"
                        initial={{ width: '0%' }}
                        animate={{ width: `${((currentQuestion + 1) / quizData.questions.length) * 100}%` }}
                        transition={{ duration: 0.5, ease: 'easeInOut' }}
                    />
                </div>
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentQuestion}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="typography-h2 gradient-text text-center mb-8">
                  {quizData.questions[currentQuestion].text}
                </h2>
                <div className="grid grid-cols-1 gap-4">
                  {quizData.questions[currentQuestion].answers.map((answer) => (
                    <button
                      key={answer.value}
                      onClick={() => handleAnswer(answer.value)}
                      className={`btn-secondary focus-ring ${selectedAnswer === answer.value ? 'bg-camber-sage-medium' : ''}`}>
                      {answer.text}
                    </button>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </>
        )}
      </div>
    </div>
  );
};

export default Quiz;