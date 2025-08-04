'use client'

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Mail, Phone, User } from 'lucide-react';
import { PageBackground } from '@/lib/components';
import { type Answers, type LeadInfo } from '@/lib/types';
import { calculateQualification } from "@/lib/data";


const LeadFormPage = () => {
    const router = useRouter();
    const [leadInfo, setLeadInfo] = useState<LeadInfo>({ name: '', email: '', phone: '' });

    const handleSubmit = () => {
        if (!leadInfo.name || !leadInfo.email || !leadInfo.phone) return;

        // Get quiz answers from sessionStorage
        const storedAnswers = sessionStorage.getItem('quizAnswers');
        if (!storedAnswers) {
            router.push('/quiz'); // Redirect back to quiz if no answers found
            return;
        }

        const answers: Answers = JSON.parse(storedAnswers);
        const isQualified = calculateQualification(answers);

        // Store lead info and qualification status
        sessionStorage.setItem('leadInfo', JSON.stringify(leadInfo));
        sessionStorage.setItem('qualified', JSON.stringify(isQualified));

        // Navigate to results
        router.push('/results');
    };

    return (
        <PageBackground>
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
                                    onClick={handleSubmit}
                                    disabled={!leadInfo.name || !leadInfo.email || !leadInfo.phone}
                                    className="w-full bg-gradient-to-t cursor-pointer from-fuchsia-200 via-fuchsia-600 to-purple-700 hover:from-fuchsia-300 hover:via-fuchsia-700 hover:to-purple-800 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3 px-8 rounded-lg text-xl transition-all duration-300 transform hover:scale-105 shadow-[0px_4px_20px_0px_rgba(168,85,247,0.4)] font-poppins"
                                >
                                    See My Results & Qualification Status
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </PageBackground>
    );
};

export default LeadFormPage;
