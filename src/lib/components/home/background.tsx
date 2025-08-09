import React, { useState, useEffect, useRef } from 'react';

interface Dot {
    id: number;
    x: number;
    y: number;
    size: number;
    opacity: number;
    speedX: number;
    speedY: number;
}

const DOT_COUNT = 60
const SPEED_RANGE = 8

export const AnimatedDots: React.FC = () => {
    const [dots, setDots] = useState<Dot[]>([]);

    const rafId = useRef<number | null>(null);
    const lastTs = useRef<number | null>(null);
    const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    useEffect(() => {
        const initialDots: Dot[] = [];
        for (let i = 0; i < DOT_COUNT; i++) {
            initialDots.push({
                id: i,
                x: Math.random() * 100,
                y: Math.random() * 100,
                size: Math.random() * 3 + 1,
                opacity: Math.random() * 0.3 + 0.1,
                speedX: (Math.random() - 0.5) * SPEED_RANGE,
                speedY: (Math.random() - 0.5) * SPEED_RANGE,
            });
        }
        setDots(initialDots);

        if (prefersReducedMotion) {
            return;
        }

        const tick = (ts: number) => {
            if (lastTs.current == null) {
                lastTs.current = ts;
            }
            const dt = (ts - lastTs.current) / 1000
            lastTs.current = ts;

            setDots(prev => prev.map(dot => ({
                ...dot,
                x: (dot.x + dot.speedX * dt + 100) % 100,
                y: (dot.y + dot.speedY * dt + 100) % 100,
            })));

            rafId.current = requestAnimationFrame(tick);
        };

        rafId.current = requestAnimationFrame(tick);

        return () => {
            if (rafId.current != null) cancelAnimationFrame(rafId.current);
        };
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
                        filter: 'blur(1px)',
                        willChange: 'left, top, transform',
                        transform: 'translateZ(0)',
                    }}
                />
            ))}
        </div>
    );
};

export const GlowOrbs: React.FC = () => (
  <>
    <div className="hidden sm:block fixed top-0 right-0 w-96 h-96 bg-gradient-to-r from-fuchsia-600/20 via-purple-600/20 to-violet-600/20 rounded-full blur-3xl"></div>
    <div className="hidden sm:block fixed bottom-0 left-0 w-96 h-96 bg-gradient-to-r from-violet-600/20 via-purple-600/20 to-fuchsia-600/20 rounded-full blur-3xl"></div>
  </>
);

export const PageBackground: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div className="min-h-screen bg-black text-white overflow-hidden" style={{ background: '#070300' }}>
            <AnimatedDots />

            <GlowOrbs />

            <div className="z-10">
                {children}
            </div>
        </div>
    );
};
