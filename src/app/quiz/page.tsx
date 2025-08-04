'use client'

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronRight, CheckCircle } from 'lucide-react';
import { PageBackground } from '../../lib/components';
import { type Answers, type QuestionOption } from '@/lib/types';
import { questions } from "@/lib/data";


const QuizPage = () => {
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});

  const handleAnswer = (questionID: number, option: QuestionOption, isMultiSelect = false) => {
    if (isMultiSelect) {
      const currentAnswers = (answers[questionID] as string[]) || [];
      const newAnswers = currentAnswers.includes(option.value)
          ? currentAnswers.filter(a => a !== option.value)
          : [...currentAnswers, option.value];

      setAnswers(prev => ({
        ...prev,
        [questionID]: newAnswers
      }));
    } else {
      setAnswers(prev => ({
        ...prev,
        [questionID]: option.value
      }));

      setTimeout(() => {
        if (currentQuestion < questions.length - 1) {
          setCurrentQuestion(currentQuestion + 1);
        } else {
          // Store answers in sessionStorage and navigate to lead form
          sessionStorage.setItem('quizAnswers', JSON.stringify({
            ...answers,
            [questionID]: option.value
          }));
          router.push('/lead-form');
        }
      }, 500);
    }
  };

  const handleNextMultiSelect = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Store answers in sessionStorage and navigate to lead form
      sessionStorage.setItem('quizAnswers', JSON.stringify(answers));
      router.push('/lead-form');
    }
  };

  const currentQ = questions[currentQuestion];

  return (
      <PageBackground>
        <div className="container mx-auto px-6 py-20">
          <div className="max-w-4xl mx-auto">
            <div className="glass-card rounded-3xl p-8 md:p-12 border border-purple-500/20 relative overflow-hidden">
              {/* Background glow effects */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-l from-purple-600/10 via-fuchsia-600/10 to-violet-600/10 rounded-full blur-3xl"></div>

              <div className="relative z-10">
                <div className="mb-12">
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-purple-300 font-poppins text-lg">Question {currentQuestion + 1} of {questions.length}</span>
                    <div className="w-48 bg-gray-800 rounded-full h-3">
                      <div
                          className="bg-gradient-to-r from-purple-500 via-fuchsia-500 to-purple-600 h-3 rounded-full transition-all duration-500"
                          style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                      ></div>
                    </div>
                  </div>

                  <h2 className="text-3xl md:text-4xl font-bold mb-4 font-poppins text-white">{currentQ?.text}</h2>
                  {currentQ?.subtitle && (
                      <p className="text-white/70 text-lg font-poppins">{currentQ?.subtitle}</p>
                  )}
                  {currentQ?.multiSelect && (
                      <p className="text-base text-purple-300 mt-4 font-poppins">Select all that apply</p>
                  )}
                </div>

                <div className="space-y-4">
                  {currentQ?.options.map((option, index) => {
                    const isSelected = currentQ?.multiSelect
                        ? (answers[currentQ?.id] || []).includes(option.value)
                        : answers[currentQ?.id] === option.value;

                    return (
                        <button
                            key={index}
                            onClick={() => handleAnswer(currentQ?.id, option, currentQ?.multiSelect)}
                            className={`w-full p-6 rounded-2xl border-2 transition-all duration-300 text-left font-poppins ${
                                isSelected
                                    ? 'border-purple-400 bg-gradient-to-r from-purple-500/20 to-fuchsia-500/20 text-white'
                                    : 'border-gray-700 bg-black/20 hover:border-purple-400/50 hover:bg-gradient-to-r hover:from-purple-500/10 hover:to-fuchsia-500/10 text-white/80'
                            }`}
                        >
                          <div className="flex items-center">
                            {currentQ?.multiSelect && (
                                <div className={`w-6 h-6 rounded border-2 mr-4 flex items-center justify-center ${
                                    isSelected ? 'bg-purple-600 border-purple-400' : 'border-gray-500'
                                }`}>
                                  {isSelected && <CheckCircle className="w-4 h-4 text-white" />}
                                </div>
                            )}
                            <span className="text-lg">{option.text}</span>
                          </div>
                        </button>
                    );
                  })}
                </div>

                {currentQ?.multiSelect && (
                    <div className="mt-12 text-center">
                      <button
                          onClick={handleNextMultiSelect}
                          disabled={!answers[currentQ?.id] || answers[currentQ?.id].length === 0}
                          className="bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-700 hover:to-fuchsia-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 font-poppins text-lg"
                      >
                        Next Question <ChevronRight className="inline ml-2 w-5 h-5" />
                      </button>
                    </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </PageBackground>
  );
};

export default QuizPage;
