import React from 'react';

export const UrgencySection: React.FC = () => {
    return (
        <div>
            <div className="w-full flex items-center justify-center">
                <div className="w-1/2">
                    {/* Urgency Headline */}
                    <h2 className="text-4xl text-left font-bold mb-6 leading-tight font-poppins">
                        <span className="text-white">Once the 100 spots are gone</span>
                        <br />
                        <span className="bg-gradient-to-t from-purple-300 via-purple-400 to-fuchsia-900 bg-clip-text text-transparent">— they're gone for good.</span>
                    </h2>

                    <div className="mb-12 text-left">
                        <p className="text-lg md:text-xl text-gray-300 mb-6 font-poppins leading-relaxed">
                            If you're serious about scaling smarter and staying ahead of the curve, this is your moment.
                        </p>
                        <p className="text-xl md:text-2xl font-semibold text-fuchsia-50 font-poppins">
                            Take the quiz now to see if you qualify.
                        </p>
                    </div>
                </div>

                {/* 3D Logo Element */}
                <div className="flex justify-center w-1/4">
                    <img src={"/images/bg/urgency-bg.png"} alt="" />
                </div>
            </div>
        </div>
    );
};
