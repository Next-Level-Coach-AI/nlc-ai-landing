'use client'

import React, { useState } from 'react';
import { ChevronRight, Mail, Phone, User, CheckCircle, XCircle } from 'lucide-react';
import {
  PageBackground,
  HeroSection,
  ExclusiveAccessSection,
  UrgencySection,
  QuizCTASection
} from './components';

// Keep your existing interfaces and quiz logic
interface Question {
  id: number;
  text: string;
  subtitle?: string;
  options: QuestionOption[];
  multiSelect?: boolean;
}

interface QuestionOption {
  text: string;
  value: string;
  disqualifies?: boolean;
  qualifies?: boolean;
  points?: number;
}

type Answers = Record<number, string | string[]>;

const Home = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [leadInfo, setLeadInfo] = useState({ name: '', email: '', phone: '' });
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [qualified, setQualified] = useState(false);

  // Your existing questions array
  const questions: Question[] = [
    {
      id: 1,
      text: "What's your average monthly revenue from coaching and digital products?",
      options: [
        { text: "Less than $5K", value: "under5k", disqualifies: true },
        { text: "$5K-$20K", value: "5k-20k", qualifies: true },
        { text: "$20K-$50K", value: "20k-50k", qualifies: true },
        { text: "$50K-$100K", value: "50k-100k", qualifies: true },
        { text: "$100K+/month", value: "100k+", qualifies: true }
      ]
    },
    {
      id: 2,
      text: "Which best describes your current role?",
      options: [
        { text: "I'm the sole decision-maker in my coaching business", value: "sole_decision", qualifies: true },
        { text: "I'm a co-founder or part of a leadership team", value: "leadership", qualifies: true },
        { text: "I work under a coach/founder as support staff", value: "support_staff", disqualifies: true },
        { text: "I'm a freelancer or assistant evaluating tools", value: "freelancer", disqualifies: true }
      ]
    },
    {
      id: 3,
      text: "Which of these problems do you most relate to? (Select all that apply)",
      options: [
        { text: "I fall behind on replying to client emails and DMs", value: "email_behind", points: 1 },
        { text: "I lose track of client engagement and drop-offs", value: "lose_track", points: 1 },
        { text: "I forget to follow up with leads who ghosted", value: "no_followup", points: 1 },
        { text: "I post inconsistently because content creation burns me out", value: "content_burnout", points: 1 },
        { text: "None of these — my systems are running smoothly", value: "no_problems", disqualifies: true }
      ],
      multiSelect: true
    },
    {
      id: 4,
      text: "Which feels more true?",
      options: [
        { text: "I need more leads", value: "need_leads" },
        { text: "I need better systems to keep up with demand", value: "need_systems" },
        { text: "I need both", value: "need_both" },
        { text: "I'm not sure", value: "not_sure" }
      ]
    },
    {
      id: 5,
      text: "What's your biggest focus over the next 90 days?",
      options: [
        { text: "Scaling revenue without burning out", value: "scale_revenue", qualifies: true },
        { text: "Hiring more team members", value: "hire_team", qualifies: true },
        { text: "Fixing client fulfillment & retention", value: "fix_retention", qualifies: true },
        { text: "Getting more leads", value: "get_leads", qualifies: true },
        { text: "Just maintaining what I have", value: "maintain", points: -1 }
      ]
    },
    {
      id: 6,
      text: "If we could help you plug in AI agents that save 10+ hours/week and improve client retention without hiring, how interested would you be?",
      subtitle: "(Scale: Not Interested – Somewhat Interested – Very Interested – I want this yesterday)",
      options: [
        { text: "Not Interested", value: "not_interested", points: 0 },
        { text: "Somewhat Interested", value: "somewhat", points: 1 },
        { text: "Very Interested", value: "very", points: 2 },
        { text: "I want this yesterday", value: "want_now", points: 3 }
      ]
    }
  ];

  // Your existing handler functions
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
          setShowLeadForm(true);
        }
      }, 500);
    }
  };

  const handleNextMultiSelect = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowLeadForm(true);
    }
  };

  const calculateQualification = () => {
    if (answers[1] === 'under5k') return false;
    if (answers[2] === 'support_staff' || answers[2] === 'freelancer') return false;
    if (answers[3] && answers[3].includes('no_problems')) return false;

    let points = 0;
    if (answers[3]) {
      points += (answers[3] as string[]).filter(a => a !== 'no_problems').length;
    }
    if (answers[6]) {
      const interestPoints = {
        'not_interested': 0,
        'somewhat': 1,
        'very': 2,
        'want_now': 3
      };
      points += interestPoints[answers[6] as keyof typeof interestPoints] || 0;
    }

    return points >= 3;
  };

  const handleLeadSubmit = () => {
    if (!leadInfo.name || !leadInfo.email || !leadInfo.phone) return;

    const isQualified = calculateQualification();
    setQualified(isQualified);
    setQuizCompleted(true);
  };

  const handleStartQuiz = () => {
    setCurrentQuestion(1);
  };

  const currentQ = questions.find(({ id }) => currentQuestion === id);

  return (
      <PageBackground>
        {!quizCompleted ? (
            <>
              {/* Landing Page Sections */}
              {currentQuestion === 0 && (
                  <>
                    <HeroSection onStartQuiz={handleStartQuiz} />
                    <ExclusiveAccessSection />
                    <UrgencySection />
                    <QuizCTASection onStartQuiz={handleStartQuiz} />
                  </>
              )}

              {/* Quiz Section */}
              {currentQuestion > 0 && !showLeadForm && (
                  <div className="container mx-auto px-6 py-20">
                    <div className="max-w-4xl mx-auto">
                      <div className="glass-card rounded-3xl p-8 md:p-12 border border-purple-500/20 relative overflow-hidden">
                        {/* Background glow effects */}
                        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-l from-purple-600/10 via-fuchsia-600/10 to-violet-600/10 rounded-full blur-3xl"></div>

                        <div className="relative z-10">
                          <div className="mb-12">
                            <div className="flex justify-between items-center mb-6">
                              <span className="text-purple-300 font-poppins text-lg">Question {currentQuestion} of {questions.length}</span>
                              <div className="w-48 bg-gray-800 rounded-full h-3">
                                <div
                                    className="bg-gradient-to-r from-purple-500 via-fuchsia-500 to-purple-600 h-3 rounded-full transition-all duration-500"
                                    style={{ width: `${(currentQuestion / questions.length) * 100}%` }}
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
              )}

              {/* Lead Form */}
              {showLeadForm && (
                  <div className="container mx-auto px-6 py-20">
                    <div className="max-w-2xl mx-auto">
                      <div className="glass-card rounded-3xl p-8 md:p-12 border border-purple-500/20 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-l from-purple-600/10 via-fuchsia-600/10 to-violet-600/10 rounded-full blur-3xl"></div>

                        <div className="relative z-10">
                          <h2 className="text-4xl font-bold mb-8 text-center font-poppins text-white">
                            🔍 See Your AI Automation Score
                          </h2>
                          <p className="text-xl mb-12 text-center font-poppins text-white/80">
                            Enter your details to see your personalized results and qualification status
                          </p>

                          <div className="space-y-6">
                            <div>
                              <label className="block text-lg font-medium mb-3 font-poppins text-white">
                                <User className="inline w-5 h-5 mr-3" />
                                Name
                              </label>
                              <input
                                  type="text"
                                  value={leadInfo.name}
                                  onChange={(e) => setLeadInfo(prev => ({ ...prev, name: e.target.value }))}
                                  className="w-full px-6 py-4 rounded-xl bg-black/30 border border-gray-700 focus:border-purple-400 focus:outline-none text-white placeholder-white/50 font-poppins"
                                  placeholder="Your full name"
                              />
                            </div>

                            <div>
                              <label className="block text-lg font-medium mb-3 font-poppins text-white">
                                <Mail className="inline w-5 h-5 mr-3" />
                                Email
                              </label>
                              <input
                                  type="email"
                                  value={leadInfo.email}
                                  onChange={(e) => setLeadInfo(prev => ({ ...prev, email: e.target.value }))}
                                  className="w-full px-6 py-4 rounded-xl bg-black/30 border border-gray-700 focus:border-purple-400 focus:outline-none text-white placeholder-white/50 font-poppins"
                                  placeholder="your@email.com"
                              />
                            </div>

                            <div>
                              <label className="block text-lg font-medium mb-3 font-poppins text-white">
                                <Phone className="inline w-5 h-5 mr-3" />
                                Phone Number
                              </label>
                              <input
                                  type="tel"
                                  value={leadInfo.phone}
                                  onChange={(e) => setLeadInfo(prev => ({ ...prev, phone: e.target.value }))}
                                  className="w-full px-6 py-4 rounded-xl bg-black/30 border border-gray-700 focus:border-purple-400 focus:outline-none text-white placeholder-white/50 font-poppins"
                                  placeholder="(555) 123-4567"
                              />
                            </div>

                            <button
                                onClick={handleLeadSubmit}
                                disabled={!leadInfo.name || !leadInfo.email || !leadInfo.phone}
                                className="w-full bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-700 hover:to-fuchsia-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-6 px-8 rounded-xl text-xl transition-all duration-300 transform hover:scale-105 shadow-[0px_4px_20px_0px_rgba(168,85,247,0.4)] font-poppins"
                            >
                              See My Results & Qualification Status
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
              )}
            </>
        ) : (
            /* Results Section */
            <div className="container mx-auto px-6 py-20">
              <div className="max-w-4xl mx-auto text-center">
                <div className="glass-card rounded-3xl p-8 md:p-12 border border-purple-500/20 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-l from-purple-600/10 via-fuchsia-600/10 to-violet-600/10 rounded-full blur-3xl"></div>

                  <div className="relative z-10">
                    {qualified ? (
                        <div>
                          <CheckCircle className="w-20 h-20 text-green-400 mx-auto mb-8" />
                          <h2 className="text-5xl font-bold text-green-400 mb-6 font-poppins">
                            You Qualify — Welcome to the Inner Circle
                          </h2>
                          <p className="text-2xl mb-12 font-poppins text-white/80">
                            Based on your answers, you're exactly the kind of coach we built this for.
                          </p>
                          <p className="text-xl mb-8 font-poppins text-white/80">
                            You've officially secured your spot inside the Next Level Coach Vault — one of only 100 coaches to gain early access.
                          </p>
                          <p className="text-xl mb-8 font-poppins text-white/80">
                            This is your invite into the room where the future of coaching is being built.
                          </p>
                          <p className="text-3xl font-bold text-purple-300 mb-12 font-poppins">
                            Let's make it count!
                          </p>

                          <div className="bg-gradient-to-r from-green-600/30 to-blue-600/30 rounded-2xl p-8 border border-green-400/30 mb-12">
                            <h3 className="text-2xl font-bold mb-4 font-poppins text-white">🎯 AI-Ready Coach</h3>
                            <p className="text-xl font-poppins text-white/80">
                              Eligible for the AI Coach Vault + Free Automation Blueprint
                            </p>
                          </div>

                          <button className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-bold py-6 px-12 rounded-xl text-xl transition-all duration-300 transform hover:scale-105 font-poppins">
                            Join the Vault Now
                          </button>
                        </div>
                    ) : (
                        <div>
                          <XCircle className="w-20 h-20 text-red-400 mx-auto mb-8" />
                          <h2 className="text-5xl font-bold text-red-400 mb-6 font-poppins">
                            You Didn't Qualify — Yet
                          </h2>
                          <p className="text-2xl mb-8 font-poppins text-white/80">
                            Thanks for taking the quiz. Based on your answers, you're not quite ready for Next Level Coach AI.
                          </p>
                          <p className="text-xl mb-8 font-poppins text-white/80">
                            But businesses evolve — and when things shift, we'd love to reconnect.
                          </p>
                          <p className="text-xl text-white/60 font-poppins">
                            Keep doing great work. We'll be here when the timing makes sense.
                          </p>
                        </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
        )}
      </PageBackground>
  );
};

export default Home;
