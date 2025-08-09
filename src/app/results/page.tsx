'use client'

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { PageBackground } from '@/lib/components';
import Image from "next/image";
import { SiX, SiInstagram, SiTiktok, SiYoutube } from 'react-icons/si';

const RejectedScreen = () => (
    <div>
        <div className="mx-auto mb-6 w-16 h-auto">
            <Image src={'/images/logo.png'} height={48} width={48} alt={'Logo'}/>
        </div>
        <h2 className="text-5xl font-bold text-[#FF3E14] mb-6">
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
    </div>
);

const QualifiedScreen = () => (
    <div>
        <div className="mx-auto mb-6 w-16 h-auto" >
            <Image src={'/images/logo.png'} height={48} width={48} alt={'Logo'}/>
        </div>
        <h2 className="text-5xl font-bold text-white mb-2">
            You Qualify
        </h2>
        <h2 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-500 to-purple-600 mb-6">
            Welcome to the Inner Circle
        </h2>
        <p className="text-2xl text-white/90 mb-4">
            Based on your answers, you're exactly the kind of coach we built this for.
        </p>
        <p className="text-xl mb-8 text-white/80">
            You've officially secured your spot inside the Next Level Coach Vault, one of only 100 coaches to gain early access.
        </p>
        <p className="text-xl mb-8 text-white/80">
            This is your invite into the room where the future of coaching is being built.
        </p>
        <p className="text-lg text-purple-400 mb-8">Let's make it count!</p>

        <div className="bg-transparent border-qualified p-1 rounded-2xl mb-8">
            <div className="bg-black/40 rounded-xl px-8 py-6">
                <h3 className="text-2xl font-bold mb-2 text-white">AI‑Ready Coach</h3>
                <p className="text-lg text-white/80">
                    Eligible for the AI Vault + Be the first to access the software
                </p>
            </div>
        </div>

        <button className="bg-gradient-to-t from-fuchsia-200 via-fuchsia-600 to-purple-700 hover:from-fuchsia-300 hover:via-fuchsia-700 hover:to-purple-800 cursor-pointer text-white font-bold py-3 px-12 rounded-lg text-xl transition-all duration-300 transform hover:scale-105">
            Join The AI Vault Now
        </button>
    </div>
);

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
                            <p className="text-2xl text-white">Loading your results...</p>
                        </div>
                    </div>
                </div>
            </PageBackground>
        );
    }

    return (
        <PageBackground>
            <div className="container mx-auto px-6 py-10">
                <div className="max-w-3xl mx-auto text-center">
                    <div className="glass-card rounded-3xl p-8 md:p-12 border border-purple-500/20 relative overflow-hidden">
                        <div className="relative z-10">
                            {qualified ? <QualifiedScreen/> : <RejectedScreen />}
                        </div>
                    </div>
                </div>
            </div>
        </PageBackground>
    );
};

export default ResultsPage;
