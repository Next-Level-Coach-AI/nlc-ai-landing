import { FC } from 'react';
import Image from "next/image";

interface HeroSectionProps {
    onStartQuiz: () => void;
}

export const HeroSection: FC<HeroSectionProps> = ({ onStartQuiz }) => {
    return (
        <>
            <style jsx>
                {`
                    /*@keyframes shimmer {
                        0% { transform: translateX(0%); }
                        50% { transform: translateX(400%); }
                        100% { transform: translateX(0%) }
                    }*/

                    @keyframes shimmer-reverse {
                        0% { transform: translateX(0%); }
                        50% { transform: translateX(100%); }
                        100% { transform: translateX(0%) }
                    }

                    @keyframes rotate {
                      from {
                        transform: translate(-100%, -65%) rotate(0turn);
                      }
                      to {
                        transform: translate(100%, -65%) rotate(0turn);
                      }
                    }

                    .video-box::before {
                        content: '';
                        background: conic-gradient(
                          from 0deg,
                          transparent 0%,
                          transparent 75%,
                          #d946ef 75%,
                          #f5d0fe 85%,
                          #4c1d95 95%,
                          transparent 100%
                        );
                        /* if you’re animating it, you’ll often want to tile it */
                        //background-size: 200% 100%;
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        transform: translate(-100%, -65%);
                        aspect-ratio: 1;
                        width: 50%;
                        animation: rotate 3s ease-in-out infinite alternate;
                    }

                    /* Overlay */
                    .video-box::after {
                        content: '';
                        background: inherit;
                        border-radius: inherit;
                        position: absolute;
                        inset: 5px;
                        height: calc(100% - 2 * 5px);
                        width: calc(100% - 2 * 5px);
                    }

                    .animate-shimmer {
                        animation: shimmer 4s ease-in-out infinite;
                    }

                    .animate-shimmer-reverse {
                        animation: shimmer-reverse 5s ease-in-out infinite;
                    }
                `}
            </style>

            <div className="relative">
                {/* Header with Logo - Moved to top left */}
                <div className="absolute top-6 left-6 z-20">
                    <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 relative">
                            <Image src={'/images/logo.png'} height={48} width={48} alt={'Logo'}/>
                        </div>
                        <div className="text-left">
                            <div className="text-white text-sm font-poppins tracking-widest">Next Level</div>
                            <div className="text-white text-xl font-semibold font-poppins">CoachAI</div>
                        </div>
                    </div>
                </div>

                <div className="container mx-auto px-6 pt-24">
                    <div className="text-center max-w-6xl mx-auto">
                        {/* Main Headline */}
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-poppins mb-6 leading-tight">
                            <span className="text-white">Your Coaching Business.</span>
                            <br />
                            <span className="bg-gradient-to-t from-fuchsia-200 via-fuchsia-600 to-purple-900 bg-clip-text text-transparent">
                              On Autopilot.
                            </span>
                        </h1>

                        {/* Subtitle */}
                        <p className="text-lg md:text-xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed font-poppins">
                            AI Agents designed for you that handle client emails, content creation, client
                            retention, lead qualifiers and lead follow-ups, so you don't have to!
                        </p>

                        {/* Video Demo Placeholder with Glow Orbs and Animated Borders */}
                        <div className="mb-20 relative">
                            {/* Glow Orbs around video */}
                            <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 w-32 h-32 bg-gradient-to-r from-fuchsia-400/30 to-purple-500/30 rounded-full blur-3xl animate-pulse"></div>
                            <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 w-40 h-40 bg-gradient-to-r from-purple-500/30 to-violet-600/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>

                            <div className="rounded-3xl p-1 max-w-4xl mx-auto border border-purple-500/20 relative overflow-hidden video-box">
                                {/* Moving highlight on top edge */}
                                {/*<div className="absolute top-0 left-0 right-0 h-0.5 overflow-hidden rounded-t-3xl">
                                    <div className="absolute top-0 left-0 w-32 h-0.5 bg-gradient-to-r from-fuchsia-500 via-fuchsia-200 to-purple-900 animate-shimmer"></div>
                                </div>*/}

                                {/* Moving highlight on bottom edge */}
                                <div className="absolute bottom-0 left-1/4 right-1/4 h-0.5 overflow-hidden">
                                    <div className="absolute bottom-0 left-0 w-32 h-0.5 bg-gradient-to-r from-fuchsia-500 via-fuchsia-200 to-purple-900 animate-shimmer-reverse"></div>
                                </div>

                                <div className="aspect-video w-full h-full z-20 bg-background rounded-2xl flex items-center justify-center relative overflow-hidden">
                                    <div className="text-center relative z-10">
                                        <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mb-4 mx-auto hover:bg-white/20 hover:scale-110 transition-all cursor-pointer backdrop-blur-sm border border-white/20 group">
                                            <svg className="w-8 h-8 text-white ml-1 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M8 5v14l11-7z"/>
                                            </svg>
                                        </div>
                                        <p className="text-gray-300 font-poppins">Watch Demo</p>
                                    </div>

                                    {/* Video background pattern */}
                                    <div className="absolute inset-0 opacity-10">
                                        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-purple-400 rounded-full animate-ping"></div>
                                        <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-fuchsia-400 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
                                        <div className="absolute bottom-1/4 left-1/2 w-1.5 h-1.5 bg-violet-400 rounded-full animate-ping" style={{ animationDelay: '2s' }}></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
