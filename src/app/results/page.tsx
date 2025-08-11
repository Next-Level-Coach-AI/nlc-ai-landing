'use client'

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { PageBackground } from '@/lib/components';
import Image from "next/image";
import { SiX, SiInstagram, SiTiktok, SiYoutube } from 'react-icons/si';

const RejectedScreen = () => (
    <>
        <h2 className="text-[40px] sm:text-[45px] font-semibold text-[#FF3E14] mb-6">
            You Didn't Qualify — Yet
        </h2>
        <p className="text-2xl text-white/90 mb-4">
            Thanks for taking the quiz. Based on your answers, you're not quite ready for Next Level Coach AI.
        </p>
        <p className="text-xl text-white/80 mb-6">
            But businesses evolve and when things shift, we'd love to reconnect.
        </p>
        <p className="text-lg text-white/60">
            Keep doing great work. We'll be here when the timing makes sense.
        </p>
        <div className="flex justify-center space-x-6 mt-8">
            <a href="https://x.com/nextlevelcoach.ai" target="_blank" rel="noopener noreferrer">
                <SiX size={24} color="#FFFFFF" />
            </a>
            <a href="https://instagram.com/nextlevelcoach.ai" target="_blank" rel="noopener noreferrer">
                <SiInstagram size={24} color="#FFFFFF" />
            </a>
            <a href="https://tiktok.com/@nextlevelcoach.ai" target="_blank" rel="noopener noreferrer">
                <SiTiktok size={24} color="#FFFFFF" />
            </a>
            <a href="https://youtube.com/channel/nextlevelcoach.ai" target="_blank" rel="noopener noreferrer">
                <SiYoutube size={24} color="#FFFFFF" />
            </a>
        </div>
    </>
);

const QualifiedScreen = () => (
    <>
        <h2 className="text-[40px] sm:text-5xl font-semibold text-white mb-2">
            You Qualify
        </h2>
        <h2 className="text-[36px] sm:text-5xl font-semibold bg-clip-text text-transparent bg-gradient-to-l from-fuchsia-200 via-fuchsia-400 to-purple-600 mb-6">
            Welcome to the<br className={"block sm:hidden"}/> Inner Circle
        </h2>
        <p className="text-lg sm:text-2xl text-white/90 mb-4">
            Based on your answers, you're exactly the kind of coach we built this for.
        </p>
        <p className="text-[16px] sm:text-xl mb-8 text-white/80">
            You've officially secured your spot inside the Next Level Coach Vault, one of only 100 coaches to gain early access.
        </p>
        <p className="text-[16px] sm:text-xl mb-8 text-white/80">
            This is your invite into the room where the future of coaching is being built.
        </p>
        <p className="text-lg bg-clip-text text-transparent bg-gradient-to-t from-fuchsia-200 via-fuchsia-400 to-purple-600 mb-8">Let's make it count!</p>

        <div className="bg-[#171717] border-qualified p-1 rounded-xl mb-8">
            <div className="rounded-xl px-8 py-6">
                <h3 className="text-2xl font-semibold mb-2 text-white">AI‑Ready Coach</h3>
                <p className="text-[16px] sm:text-lg text-white/80">
                    Eligible for the AI Vault + Be the first to access the software
                </p>
            </div>
        </div>

        <button className="bg-gradient-to-t from-fuchsia-200 via-fuchsia-600 to-purple-700 hover:from-fuchsia-300 hover:via-fuchsia-700 hover:to-purple-800 cursor-pointer text-white font-semibold py-3 px-12 rounded-lg text-xl transition-all duration-300 transform hover:scale-105">
            Join The AI Vault Now
        </button>
    </>
);

const ResultsPage = () => {
    const router = useRouter();
    const [qualified, setQualified] = useState<boolean | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedQualified = sessionStorage.getItem('qualified');
        const storedLeadInfo = sessionStorage.getItem('leadInfo');

        if (!storedQualified || !storedLeadInfo) {
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
                            <p className="text-2xl text-white">Loading your results...</p>
                        </div>
                    </div>
                </div>
            </PageBackground>
        );
    }

    return (
        <PageBackground>
            <div className="glow-orb glow-orb--xxl -top-72 -right-72 sm:-top-96 sm:-right-96 opacity-70" />
            <div className="glow-orb glow-orb--xxl glow-orb--purple -bottom-72 -left-72 sm:-bottom-96 sm:-left-96 opacity-70" />

            <div className="container mx-auto px-6 py-10 relative z-10">
                <div className="max-w-3xl mx-auto text-center">
                    <div className="glass-card rounded-3xl p-8 md:p-12 border border-purple-500/20 relative overflow-hidden">
                        <div className="glow-orb glow-orb--md -top-24 -left-28 sm:-top-28 sm:-left-24 opacity-60" />
                        <div className="glow-orb glow-orb--sm glow-orb--purple -bottom-16 -right-20 opacity-50" />
                        <div className="relative z-10">
                            <div>
                                <div className="flex justify-center mb-6 w-full" >
                                    <Image src={'/images/logo.png'} height={57} width={67} alt={'Logo'}
                                           className={"cursor-pointer"}
                                           onClick={() => router.push('/')}/>
                                </div>
                                {qualified ? <QualifiedScreen/> : <RejectedScreen />}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </PageBackground>
    );
};

export default ResultsPage;
