import Image from "next/image";

export const HeroSection = () => {
    return (
        <>

            <div className="relative">
                <div className="absolute top-6 left-0 sm:left-6 z-20 w-full sm:w-auto">
                    <div className="flex items-center justify-center space-x-3">
                        <Image src={'/images/logo-large.png'} height={192} width={192} alt={'Logo'}/>
                    </div>
                </div>

                <div className="container mx-auto px-6 pt-24">
                    <div className="text-center max-w-6xl mx-auto">
                        <h1 className="text-[40px] md:text-6xl lg:text-[76px] font-bold mb-6 leading-tight">
                            <span className="text-white">Your Coaching Business.</span>
                            <br />
                            <span className="text-primary">
                              On Autopilot.
                            </span>
                        </h1>

                        <p className="text-lg md:text-xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
                            AI Agents designed for you that handle client emails, content creation, client
                            retention, lead qualifiers and lead follow-ups, so you don't have to!
                        </p>

                        <div className="mb-20 relative">
                            <div className="absolute -top-72 left-1/2 -translate-x-1/2 w-[48rem] h-[32rem] opacity-70 rounded-full blur-3xl" style={{
                                background:
                                    "radial-gradient(50% 50% at 50% 50%, rgba(212, 151, 255, 0.35) 0%, rgba(123, 33, 186, 0.15) 70%, transparent 100%)",
                            }}></div>
                            <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 w-40 h-40 bg-gradient-to-r from-purple-500/30 to-violet-600/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>

                            <div className="rounded-3xl p-1 max-w-4xl mx-auto border border-purple-500/20 relative overflow-hidden video-box">
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
                                        <p className="text-gray-300">Watch Demo</p>
                                    </div>

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
