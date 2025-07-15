'use client'

import React, { useState, useEffect } from 'react';
import { ChevronRight, Lock, Users, Zap, Target, Mail, Phone, User, CheckCircle, XCircle } from 'lucide-react';
import {Answers, Dot, Question, QuestionOption} from "@/lib/types";

const Home = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [leadInfo, setLeadInfo] = useState({ name: '', email: '', phone: '' });
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [qualified, setQualified] = useState(false);

  // Animated dots background
  const [dots, setDots] = useState<Dot[]>([]);

  useEffect(() => {
    const newDots = [];
    for (let i = 0; i < 50; i++) {
      newDots.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 1,
        opacity: Math.random() * 0.5 + 0.1,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5
      });
    }
    setDots(newDots);

    const interval = setInterval(() => {
      setDots(prevDots =>
          prevDots.map(dot => ({
            ...dot,
            x: (dot.x + dot.speedX + 100) % 100,
            y: (dot.y + dot.speedY + 100) % 100
          }))
      );
    }, 100);

    return () => clearInterval(interval);
  }, []);

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
    // Check disqualifying factors
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

  const currentQ = questions.find(({ id }) => currentQuestion === id);

  return (
      <div className="min-h-screen bg-gradient-button text-white overflow-hidden relative">
        {/* Animated Background Dots */}
        <div className="absolute inset-0 overflow-hidden">
          {dots.map(dot => (
              <div
                  key={dot.id}
                  className="absolute rounded-full bg-magenta"
                  style={{
                    left: `${dot.x}%`,
                    top: `${dot.y}%`,
                    width: `${dot.size}px`,
                    height: `${dot.size}px`,
                    opacity: dot.opacity,
                    filter: 'blur(0.5px)'
                  }}
              />
          ))}
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 to-blue-900/20"></div>

        <div className="relative z-10">
          {!quizCompleted ? (
              <>
                {/* Hero Section */}
                {currentQuestion === 0 && (
                    <div className="container mx-auto px-6 pt-20 pb-16">
                      <div className="text-center max-w-6xl mx-auto">
                        <div className="flex items-center justify-center mb-6">
                          <span className="text-4xl mr-3">🔥</span>
                          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent">
                            Only 100 Coaches Will Get In — Will You Be One of Them?
                          </h1>
                        </div>

                        <div className="flex items-center justify-center mb-8">
                          <Lock className="w-8 h-8 mr-4 text-yellow-400" />
                          <h2 className="text-2xl md:text-4xl font-semibold">
                            Access to the Next Level Coach Vault{' '}
                            <span className="text-magenta-light italic">(exclusive early-access community)</span>
                          </h2>
                        </div>

                        <p className="text-xl mb-12 max-w-3xl mx-auto">
                          This is not for everyone.
                        </p>

                        <div className="bg-gradient-glass backdrop-blur-lg rounded-2xl p-8 border border-white/20 mb-12">
                          <p className="text-lg mb-6">
                            Only the <span className="text-yellow-400 font-bold">first 100 coaches who qualify</span> will be granted access to our private AI Vault — a behind-the-scenes community where you'll:
                          </p>

                          <div className="grid md:grid-cols-3 gap-6 text-left">
                            <div className="flex items-start space-x-3">
                              <Zap className="w-6 h-6 text-purple mt-1 flex-shrink-0" />
                              <span>Be the first to access our software before the public launch</span>
                            </div>
                            <div className="flex items-start space-x-3">
                              <Target className="w-6 h-6 text-blue-400 mt-1 flex-shrink-0" />
                              <span>Receive insider drops with automation, retention, and scaling strategies</span>
                            </div>
                            <div className="flex items-start space-x-3">
                              <Users className="w-6 h-6 text-green-400 mt-1 flex-shrink-0" />
                              <span>Join a private circle of elite coaches pioneering the future of AI in coaching</span>
                            </div>
                          </div>
                        </div>

                        <div className="text-2xl font-bold text-red-400 mb-8">
                          Once the 100 spots are gone — they're gone for good.
                        </div>

                        <div className="bg-gradient-to-r from-purple-600/30 to-blue-600/30 rounded-xl p-6 border border-purple/30 mb-8">
                          <p className="text-lg mb-4">
                            If you're serious about scaling smarter and staying ahead of the curve, this is your moment.
                          </p>
                          <p className="text-xl font-semibold">
                            Take the quiz now to see if you qualify.
                          </p>
                        </div>

                        <button
                            onClick={() => setCurrentQuestion(1)}
                            className="bg-gradient-to-t from-fuchsia-200 via-fuchsia-600 to-violet-600 hover:bg-[#8B31CA] hover:opacity-90 cursor-pointer text-white font-bold py-4 px-8 rounded-xl text-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                        >
                          Take The Quiz: "What's Your AI Automation Score?"
                          <ChevronRight className="inline ml-2 w-6 h-6" />
                        </button>

                        <p className="text-sm mt-4 text-gray-300">
                          Discover where your coaching business is bleeding time, dropping clients, and how AI could boost your income — without hiring another team member.
                        </p>
                      </div>
                    </div>
                )}

                {/* Quiz Section */}
                {currentQuestion > 0 && !showLeadForm && (
                    <div className="container mx-auto px-6 py-20">
                      <div className="max-w-4xl mx-auto">
                        <div className="bg-gradient-glass backdrop-blur-lg rounded-2xl p-8 border border-white/20">
                          <div className="mb-8">
                            <div className="flex justify-between items-center mb-4">
                              <span className="text-magenta-light">Question {currentQuestion} of {questions.length}</span>
                              <div className="w-32 bg-gray-700 rounded-full h-2">
                                <div
                                    className="bg-gradient-to-r from-magenta to-purple h-2 rounded-full transition-all duration-300"
                                    style={{ width: `${(currentQuestion / questions.length) * 100}%` }}
                                ></div>
                              </div>
                            </div>

                            <h2 className="text-2xl md:text-3xl font-bold mb-2">{currentQ?.text}</h2>
                            {currentQ?.subtitle && (
                                <p className="text-gray-300">{currentQ?.subtitle}</p>
                            )}
                            {currentQ?.multiSelect && (
                                <p className="text-sm text-magenta-light mt-2">Select all that apply</p>
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
                                      className={`w-full p-4 rounded-xl border-2 transition-all duration-300 text-left ${
                                          isSelected
                                              ? 'border-purple bg-purple-600/30 text-white'
                                              : 'border-gray-600 bg-gray-800/50 hover:border-purple-500 hover:bg-purple-600/20'
                                      }`}
                                  >
                                    <div className="flex items-center">
                                      {currentQ?.multiSelect && (
                                          <div className={`w-5 h-5 rounded border-2 mr-3 flex items-center justify-center ${
                                              isSelected ? 'bg-purple-600 border-purple' : 'border-gray-500'
                                          }`}>
                                            {isSelected && <CheckCircle className="w-3 h-3" />}
                                          </div>
                                      )}
                                      <span className="text-lg">{option.text}</span>
                                    </div>
                                  </button>
                              );
                            })}
                          </div>

                          {currentQ?.multiSelect && (
                              <div className="mt-8 text-center">
                                <button
                                    onClick={handleNextMultiSelect}
                                    disabled={!answers[currentQ?.id] || answers[currentQ?.id].length === 0}
                                    className="bg-gradient-button hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3 px-6 rounded-xl transition-all duration-300"
                                >
                                  Next Question <ChevronRight className="inline ml-2 w-5 h-5" />
                                </button>
                              </div>
                          )}
                        </div>
                      </div>
                    </div>
                )}

                {/* Lead Form */}
                {showLeadForm && (
                    <div className="container mx-auto px-6 py-20">
                      <div className="max-w-2xl mx-auto">
                        <div className="bg-gradient-glass backdrop-blur-lg rounded-2xl p-8 border border-white/20">
                          <h2 className="text-3xl font-bold mb-6 text-center">
                            🔍 See Your AI Automation Score
                          </h2>
                          <p className="text-xl mb-8 text-center">
                            Enter your details to see your personalized results and qualification status
                          </p>

                          <div className="space-y-6">
                            <div>
                              <label className="block text-sm font-medium mb-2">
                                <User className="inline w-4 h-4 mr-2" />
                                Name
                              </label>
                              <input
                                  type="text"
                                  value={leadInfo.name}
                                  onChange={(e) => setLeadInfo(prev => ({ ...prev, name: e.target.value }))}
                                  className="w-full px-4 py-3 rounded-xl bg-gray-800/50 border border-gray-600 focus:border-purple-500 focus:outline-none"
                                  placeholder="Your full name"
                              />
                            </div>

                            <div>
                              <label className="block text-sm font-medium mb-2">
                                <Mail className="inline w-4 h-4 mr-2" />
                                Email
                              </label>
                              <input
                                  type="email"
                                  value={leadInfo.email}
                                  onChange={(e) => setLeadInfo(prev => ({ ...prev, email: e.target.value }))}
                                  className="w-full px-4 py-3 rounded-xl bg-gray-800/50 border border-gray-600 focus:border-purple-500 focus:outline-none"
                                  placeholder="your@email.com"
                              />
                            </div>

                            <div>
                              <label className="block text-sm font-medium mb-2">
                                <Phone className="inline w-4 h-4 mr-2" />
                                Phone Number
                              </label>
                              <input
                                  type="tel"
                                  value={leadInfo.phone}
                                  onChange={(e) => setLeadInfo(prev => ({ ...prev, phone: e.target.value }))}
                                  className="w-full px-4 py-3 rounded-xl bg-gray-800/50 border border-gray-600 focus:border-purple-500 focus:outline-none"
                                  placeholder="(555) 123-4567"
                              />
                            </div>

                            <button
                                onClick={handleLeadSubmit}
                                disabled={!leadInfo.name || !leadInfo.email || !leadInfo.phone}
                                className="cursor-pointer w-full bg-gradient-to-t from-fuchsia-200 via-fuchsia-600 to-violet-600 hover:bg-[#8B31CA] hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-4 px-6 rounded-xl text-xl transition-all duration-300 transform hover:scale-105"
                            >
                              See My Results & Qualification Status
                            </button>
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
                  <div className="bg-gradient-glass backdrop-blur-lg rounded-2xl p-8 border border-white/20">
                    {qualified ? (
                        <div>
                          <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-6" />
                          <h2 className="text-4xl font-bold text-green-400 mb-4">
                            You Qualify — Welcome to the Inner Circle
                          </h2>
                          <p className="text-xl mb-8">
                            Based on your answers, you're exactly the kind of coach we built this for.
                          </p>
                          <p className="text-lg mb-8">
                            You've officially secured your spot inside the Next Level Coach Vault — one of only 100 coaches to gain early access.
                          </p>
                          <p className="text-lg mb-8">
                            This is your invite into the room where the future of coaching is being built.
                          </p>
                          <p className="text-2xl font-bold text-magenta-light mb-8">
                            Let's make it count!
                          </p>

                          <div className="bg-gradient-to-r from-green-600/30 to-blue-600/30 rounded-xl p-6 border border-green-400/30 mb-8">
                            <h3 className="text-xl font-bold mb-4">🎯 AI-Ready Coach</h3>
                            <p className="text-lg">
                              Eligible for the AI Coach Vault + Free Automation Blueprint
                            </p>
                          </div>

                          <button className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-bold py-4 px-8 rounded-xl text-xl transition-all duration-300 transform hover:scale-105">
                            Join the Vault Now
                          </button>
                        </div>
                    ) : (
                        <div>
                          <XCircle className="w-16 h-16 text-red-400 mx-auto mb-6" />
                          <h2 className="text-4xl font-bold text-red-400 mb-4">
                            You Didn't Qualify — Yet
                          </h2>
                          <p className="text-xl mb-6">
                            Thanks for taking the quiz. Based on your answers, you're not quite ready for Next Level Coach AI.
                          </p>
                          <p className="text-lg mb-6">
                            But businesses evolve — and when things shift, we'd love to reconnect.
                          </p>
                          <p className="text-lg text-gray-300">
                            Keep doing great work. We'll be here when the timing makes sense.
                          </p>
                        </div>
                    )}
                  </div>
                </div>
              </div>
          )}
        </div>
      </div>
  );
};

export default Home;