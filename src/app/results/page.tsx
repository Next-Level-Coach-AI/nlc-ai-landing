'use client'

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle, XCircle } from 'lucide-react';
import { PageBackground } from '@/lib/components';

const ResultsPage = () => {
    const router = useRouter();
    const [qualified, setQualified] = useState<boolean | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Get qualification status from sessionStorage
        const storedQualified = sessionStorage.getItem('qualified');
        const storedLeadInfo = sessionStorage.getItem('leadInfo');

        if (!storedQualified || !storedLeadInfo) {
            // Redirect back to quiz if no data found
            router.push('/quiz');
            return;
        }

        setQualified(JSON.parse(storedQualified));
        setLoading(false);
    }, [router]);

    if (loading) {
        return (
            <PageBackground>
                <div className="container mx-auto px-6 py-20">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="glass-card rounded-3xl p-8 md:p-12 border border-purple-500/20">
                            <p className="text-2xl font-poppins text-white">Loading your results...</p>
                        </div>
                    </div>
                </div>
            </PageBackground>
        );
    }

    return (
        <PageBackground>
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

                                    <div className="mt-12">
                                        <button
                                            onClick={() => router.push('/')}
                                            className="bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-700 hover:to-fuchsia-700 text-white font-bold py-4 px-8 rounded-xl text-lg transition-all duration-300 font-poppins"
                                        >
                                            Return to Home
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </PageBackground>
    );
};

export default ResultsPage;
