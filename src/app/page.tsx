'use client'

import React, { useState, useEffect } from 'react';
import { ChevronRight, Lock, Mail, Phone, User, CheckCircle, XCircle } from 'lucide-react';
import Image from "next/image";

interface Dot {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  speedX: number;
  speedY: number;
}

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

  // Animated dots background
  const [dots, setDots] = useState<Dot[]>([]);

  useEffect(() => {
    const newDots = [];
    for (let i = 0; i < 30; i++) {
      newDots.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        opacity: Math.random() * 0.3 + 0.1,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: (Math.random() - 0.5) * 0.3
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
      <div className="min-h-screen bg-black text-white overflow-hidden relative">
        {/* Animated Background Dots */}
        <div className="absolute inset-0 overflow-hidden">
          {dots.map(dot => (
              <div
                  key={dot.id}
                  className="absolute rounded-full"
                  style={{
                    left: `${dot.x}%`,
                    top: `${dot.y}%`,
                    width: `${dot.size}px`,
                    height: `${dot.size}px`,
                    opacity: dot.opacity,
                    background: 'linear-gradient(135deg, #FEBEFA, #B339D4, #7B21BA)',
                    filter: 'blur(1px)'
                  }}
              />
          ))}
        </div>

        {/* Large gradient blurs for atmosphere */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-fuchsia-600/20 via-purple-600/20 to-violet-600/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-violet-600/20 via-purple-600/20 to-fuchsia-600/20 rounded-full blur-3xl"></div>

        <div className="relative z-10">
          {!quizCompleted ? (
              <>
                {/* Hero Section */}
                {currentQuestion === 0 && (
                    <div className="container mx-auto px-6 pt-16 pb-16">
                      {/* Header with Logo */}
                      <div className="flex items-center justify-center mb-12">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 relative">
                            <Image src={'/images/logo.png'} height={48} width={48} alt={'Logo'}/>
                          </div>
                          <div className="text-center">
                            <div className="text-white text-sm font-['Inter'] tracking-widest">Next Level</div>
                            <div className="text-white text-2xl font-semibold font-['Inter']">Coach AI</div>
                          </div>
                        </div>
                      </div>

                      <div className="text-center max-w-6xl mx-auto">
                        <div className="flex items-center justify-center mb-8">
                          <span className="text-5xl mr-4">🔥</span>
                          <h1 className="text-5xl md:text-7xl font-bold font-['Poppins']">
                            <span className="text-white">Only 100 Coaches Will Get In — </span>
                            <span className="bg-gradient-to-r from-fuchsia-200 to-fuchsia-600 bg-clip-text text-transparent">
                        Will You Be One of Them?
                      </span>
                          </h1>
                        </div>

                        <div className="flex items-center justify-center mb-12">
                          <Lock className="w-8 h-8 mr-4 text-fuchsia-200" />
                          <h2 className="text-3xl md:text-4xl font-semibold font-['Poppins'] text-white">
                            Access to the Next Level Coach Vault{' '}
                            <span className="text-fuchsia-200 italic">(exclusive early-access community)</span>
                          </h2>
                        </div>

                        <p className="text-2xl mb-16 max-w-3xl mx-auto font-['Poppins'] text-white/80">
                          This is not for everyone.
                        </p>

                        <div className="bg-gradient-to-b from-neutral-800/30 to-neutral-900/30 backdrop-blur-lg rounded-[40px] p-12 border-2 border-fuchsia-200 mb-16 relative overflow-hidden">
                          {/* Glassmorphism background effect */}
                          <div className="absolute inset-0 bg-gradient-to-b from-black/0 to-black opacity-70"></div>
                          <div className="relative z-10">
                            <p className="text-xl mb-8 font-['Poppins'] text-white">
                              Only the <span className="text-fuchsia-200 font-bold">first 100 coaches who qualify</span> will be granted access to our private AI Vault — a behind-the-scenes community where you'll:
                            </p>

                            <div className="grid md:grid-cols-3 gap-8 text-left">
                              <div className="flex items-start space-x-4">
                                <div className="w-2 h-2 bg-fuchsia-400 rounded-full mt-3 flex-shrink-0"></div>
                                <span className="text-lg font-['Poppins'] text-white/80">Be the first to access our software before the public launch</span>
                              </div>
                              <div className="flex items-start space-x-4">
                                <div className="w-2 h-2 bg-fuchsia-400 rounded-full mt-3 flex-shrink-0"></div>
                                <span className="text-lg font-['Poppins'] text-white/80">Receive insider drops with automation, retention, and scaling strategies</span>
                              </div>
                              <div className="flex items-start space-x-4">
                                <div className="w-2 h-2 bg-fuchsia-400 rounded-full mt-3 flex-shrink-0"></div>
                                <span className="text-lg font-['Poppins'] text-white/80">Join a private circle of elite coaches pioneering the future of AI in coaching</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="text-3xl font-bold text-fuchsia-200 mb-12 font-['Poppins']">
                          Once the 100 spots are gone — they're gone for good.
                        </div>

                        <div className="bg-gradient-to-b from-neutral-800/30 to-neutral-900/30 rounded-[40px] p-8 border-2 border-fuchsia-200/50 mb-12 backdrop-blur-lg">
                          <p className="text-xl mb-6 font-['Poppins'] text-white/80">
                            If you're serious about scaling smarter and staying ahead of the curve, this is your moment.
                          </p>
                          <p className="text-2xl font-semibold font-['Poppins'] text-white">
                            Take the quiz now to see if you qualify.
                          </p>
                        </div>

                        <button
                            onClick={() => setCurrentQuestion(1)}
                            className="bg-gradient-to-l from-fuchsia-200 via-fuchsia-600 to-violet-600 hover:opacity-90 cursor-pointer text-white font-bold py-6 px-12 rounded-xl text-2xl transition-all duration-300 transform hover:scale-105 shadow-[0px_2px_12px_0px_rgba(212,151,255,1.00)] font-['Inter']"
                        >
                          Take The Quiz: "What's Your AI Automation Score?"
                          <ChevronRight className="inline ml-3 w-6 h-6" />
                        </button>

                        <p className="text-lg mt-6 text-white/60 font-['Poppins']">
                          Discover where your coaching business is bleeding time, dropping clients, and how AI could boost your income — without hiring another team member.
                        </p>
                      </div>
                    </div>
                )}

                {/* Quiz Section */}
                {currentQuestion > 0 && !showLeadForm && (
                    <div className="container mx-auto px-6 py-20">
                      <div className="max-w-4xl mx-auto">
                        <div className="bg-gradient-to-b from-neutral-800/30 to-neutral-900/30 backdrop-blur-lg rounded-[40px] p-12 border-2 border-fuchsia-200 relative overflow-hidden">
                          {/* Background blur effects */}
                          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-l from-fuchsia-200/10 via-fuchsia-600/10 to-violet-600/10 rounded-full blur-3xl"></div>

                          <div className="relative z-10">
                            <div className="mb-12">
                              <div className="flex justify-between items-center mb-6">
                                <span className="text-fuchsia-200 font-['Poppins'] text-lg">Question {currentQuestion} of {questions.length}</span>
                                <div className="w-48 bg-neutral-700 rounded-full h-3">
                                  <div
                                      className="bg-gradient-to-r from-fuchsia-200 via-fuchsia-600 to-violet-600 h-3 rounded-full transition-all duration-500"
                                      style={{ width: `${(currentQuestion / questions.length) * 100}%` }}
                                  ></div>
                                </div>
                              </div>

                              <h2 className="text-3xl md:text-4xl font-bold mb-4 font-['Poppins'] text-white">{currentQ?.text}</h2>
                              {currentQ?.subtitle && (
                                  <p className="text-white/70 text-lg font-['Poppins']">{currentQ?.subtitle}</p>
                              )}
                              {currentQ?.multiSelect && (
                                  <p className="text-base text-fuchsia-200 mt-4 font-['Poppins']">Select all that apply</p>
                              )}
                            </div>

                            <div className="space-y-6">
                              {currentQ?.options.map((option, index) => {
                                const isSelected = currentQ?.multiSelect
                                    ? (answers[currentQ?.id] || []).includes(option.value)
                                    : answers[currentQ?.id] === option.value;

                                return (
                                    <button
                                        key={index}
                                        onClick={() => handleAnswer(currentQ?.id, option, currentQ?.multiSelect)}
                                        className={`w-full p-6 rounded-[20px] border-2 transition-all duration-300 text-left font-['Poppins'] ${
                                            isSelected
                                                ? 'border-fuchsia-200 bg-gradient-to-b from-neutral-800/50 to-neutral-900/50 text-white'
                                                : 'border-neutral-700 bg-gradient-to-b from-neutral-800/30 to-neutral-900/30 hover:border-fuchsia-200/50 hover:bg-gradient-to-b hover:from-neutral-800/50 hover:to-neutral-900/50 text-white/80'
                                        }`}
                                    >
                                      <div className="flex items-center">
                                        {currentQ?.multiSelect && (
                                            <div className={`w-6 h-6 rounded border-2 mr-4 flex items-center justify-center ${
                                                isSelected ? 'bg-fuchsia-600 border-fuchsia-200' : 'border-neutral-500'
                                            }`}>
                                              {isSelected && <CheckCircle className="w-4 h-4 text-white" />}
                                            </div>
                                        )}
                                        <span className="text-xl">{option.text}</span>
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
                                      className="bg-gradient-to-l from-fuchsia-200 via-fuchsia-600 to-violet-600 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 font-['Inter'] text-lg"
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
                        <div className="bg-gradient-to-b from-neutral-800/30 to-neutral-900/30 backdrop-blur-lg rounded-[40px] p-12 border-2 border-fuchsia-200 relative overflow-hidden">
                          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-l from-fuchsia-200/10 via-fuchsia-600/10 to-violet-600/10 rounded-full blur-3xl"></div>

                          <div className="relative z-10">
                            <h2 className="text-4xl font-bold mb-8 text-center font-['Poppins'] text-white">
                              🔍 See Your AI Automation Score
                            </h2>
                            <p className="text-xl mb-12 text-center font-['Poppins'] text-white/80">
                              Enter your details to see your personalized results and qualification status
                            </p>

                            <div className="space-y-8">
                              <div>
                                <label className="block text-lg font-medium mb-3 font-['Poppins'] text-white">
                                  <User className="inline w-5 h-5 mr-3" />
                                  Name
                                </label>
                                <input
                                    type="text"
                                    value={leadInfo.name}
                                    onChange={(e) => setLeadInfo(prev => ({ ...prev, name: e.target.value }))}
                                    className="w-full px-6 py-4 rounded-xl bg-gradient-to-b from-neutral-800/50 to-neutral-900/50 border border-neutral-700 focus:border-fuchsia-200 focus:outline-none text-white placeholder-white/50 font-['Inter']"
                                    placeholder="Your full name"
                                />
                              </div>

                              <div>
                                <label className="block text-lg font-medium mb-3 font-['Poppins'] text-white">
                                  <Mail className="inline w-5 h-5 mr-3" />
                                  Email
                                </label>
                                <input
                                    type="email"
                                    value={leadInfo.email}
                                    onChange={(e) => setLeadInfo(prev => ({ ...prev, email: e.target.value }))}
                                    className="w-full px-6 py-4 rounded-xl bg-gradient-to-b from-neutral-800/50 to-neutral-900/50 border border-neutral-700 focus:border-fuchsia-200 focus:outline-none text-white placeholder-white/50 font-['Inter']"
                                    placeholder="your@email.com"
                                />
                              </div>

                              <div>
                                <label className="block text-lg font-medium mb-3 font-['Poppins'] text-white">
                                  <Phone className="inline w-5 h-5 mr-3" />
                                  Phone Number
                                </label>
                                <input
                                    type="tel"
                                    value={leadInfo.phone}
                                    onChange={(e) => setLeadInfo(prev => ({ ...prev, phone: e.target.value }))}
                                    className="w-full px-6 py-4 rounded-xl bg-gradient-to-b from-neutral-800/50 to-neutral-900/50 border border-neutral-700 focus:border-fuchsia-200 focus:outline-none text-white placeholder-white/50 font-['Inter']"
                                    placeholder="(555) 123-4567"
                                />
                              </div>

                              <button
                                  onClick={handleLeadSubmit}
                                  disabled={!leadInfo.name || !leadInfo.email || !leadInfo.phone}
                                  className="cursor-pointer w-full bg-gradient-to-l from-fuchsia-200 via-fuchsia-600 to-violet-600 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-6 px-8 rounded-xl text-xl transition-all duration-300 transform hover:scale-105 shadow-[0px_2px_12px_0px_rgba(212,151,255,1.00)] font-['Inter']"
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
                  <div className="bg-gradient-to-b from-neutral-800/30 to-neutral-900/30 backdrop-blur-lg rounded-[40px] p-12 border-2 border-fuchsia-200 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-l from-fuchsia-200/10 via-fuchsia-600/10 to-violet-600/10 rounded-full blur-3xl"></div>

                    <div className="relative z-10">
                      {qualified ? (
                          <div>
                            <CheckCircle className="w-20 h-20 text-green-400 mx-auto mb-8" />
                            <h2 className="text-5xl font-bold text-green-400 mb-6 font-['Poppins']">
                              You Qualify — Welcome to the Inner Circle
                            </h2>
                            <p className="text-2xl mb-12 font-['Poppins'] text-white/80">
                              Based on your answers, you're exactly the kind of coach we built this for.
                            </p>
                            <p className="text-xl mb-8 font-['Poppins'] text-white/80">
                              You've officially secured your spot inside the Next Level Coach Vault — one of only 100 coaches to gain early access.
                            </p>
                            <p className="text-xl mb-8 font-['Poppins'] text-white/80">
                              This is your invite into the room where the future of coaching is being built.
                            </p>
                            <p className="text-3xl font-bold text-fuchsia-200 mb-12 font-['Poppins']">
                              Let's make it count!
                            </p>

                            <div className="bg-gradient-to-r from-green-600/30 to-blue-600/30 rounded-[20px] p-8 border border-green-400/30 mb-12">
                              <h3 className="text-2xl font-bold mb-4 font-['Poppins'] text-white">🎯 AI-Ready Coach</h3>
                              <p className="text-xl font-['Poppins'] text-white/80">
                                Eligible for the AI Coach Vault + Free Automation Blueprint
                              </p>
                            </div>

                            <button className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-bold py-6 px-12 rounded-xl text-xl transition-all duration-300 transform hover:scale-105 font-['Inter']">
                              Join the Vault Now
                            </button>
                          </div>
                      ) : (
                          <div>
                            <XCircle className="w-20 h-20 text-red-400 mx-auto mb-8" />
                            <h2 className="text-5xl font-bold text-red-400 mb-6 font-['Poppins']">
                              You Didn't Qualify — Yet
                            </h2>
                            <p className="text-2xl mb-8 font-['Poppins'] text-white/80">
                              Thanks for taking the quiz. Based on your answers, you're not quite ready for Next Level Coach AI.
                            </p>
                            <p className="text-xl mb-8 font-['Poppins'] text-white/80">
                              But businesses evolve — and when things shift, we'd love to reconnect.
                            </p>
                            <p className="text-xl text-white/60 font-['Poppins']">
                              Keep doing great work. We'll be here when the timing makes sense.
                            </p>
                          </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
          )}
        </div>
      </div>
  );
};

export default Home;
