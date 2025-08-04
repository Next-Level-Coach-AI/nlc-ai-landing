import React, { useState, useEffect } from 'react';

interface Dot {
    id: number;
    x: number;
    y: number;
    size: number;
    opacity: number;
    speedX: number;
    speedY: number;
}

export const AnimatedDots: React.FC = () => {
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

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
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
    );
};

export const GlowOrbs: React.FC = () => {
    return (
        <>
            {/* Large gradient blurs for atmosphere */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-fuchsia-600/20 via-purple-600/20 to-violet-600/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-violet-600/20 via-purple-600/20 to-fuchsia-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
            <div className="absolute top-1/2 left-0 w-64 h-64 bg-gradient-to-r from-purple-600/15 via-fuchsia-600/15 to-violet-600/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
            <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-r from-fuchsia-600/15 via-purple-600/15 to-violet-600/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </>
    );
};

export const PageBackground: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div className="min-h-screen bg-black text-white overflow-hidden" style={{ background: '#070300' }}>
            {/* Animated Background Dots */}
            <AnimatedDots />

            {/* Glow Orbs */}
            <GlowOrbs />

            {/* Content */}
            <div className="z-10">
                {children}
            </div>
        </div>
    );
};
