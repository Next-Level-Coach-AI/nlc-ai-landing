const DownArrow = ({ className = '', width = 4, height = 120, color = '#FFF' }) => {
  const half = width / 2;
  const markerId = 'arrowhead';
  const markerSize = width * 2;
  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      overflow="visible"
    >
      <defs>
        <marker
          id={markerId}
          markerWidth={markerSize}
          markerHeight={markerSize}
          refX={markerSize / 2}
          refY={markerSize / 2}
          orient="auto"
        >
          <polygon
            points={`0,0 ${markerSize},${markerSize/2} 0,${markerSize}`}
            fill={color}
          />
        </marker>
      </defs>
      <line
        x1={half}
        y1={0}
        x2={half}
        y2={height - markerSize / 2}
        stroke={color}
        strokeWidth={width}
        strokeLinecap="round"
        markerEnd={`url(#${markerId})`}
      />
    </svg>
  );
};

export const UrgencySection = () => {
    return (
        <div className={"container mx-auto px-6 py-10"}>
            <div className="mx-auto max-w-4xl text-center flex flex-col sm:flex-row items-center justify-center">
                <p className="text-xl md:text-2xl font-semibold text-fuchsia-50 font-poppins block sm:hidden">
                    Take the quiz below to access the AI Vault.
                </p>
                <div className="text-center my-6">
                    <span className="text-white text-2xl">↓</span>
                </div>
                <div className="w-full sm:w-1/2">
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
                        <p className="text-xl md:text-2xl font-semibold text-fuchsia-50 font-poppins hidden sm:block">
                            Take the quiz below to access the AI Vault.
                        </p>
                    </div>
                </div>

                {/* 3D Logo Element */}
                <div className="sm:flex justify-center w-1/4 hidden">
                    <img src={"/images/bg/urgency-bg.png"} alt="" />
                </div>
            </div>
        </div>
    );
};
