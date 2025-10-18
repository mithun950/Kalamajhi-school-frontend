import React, { useEffect, useState } from "react";

const MarqueeSection = () => {
  const [text, setText] = useState("");

  useEffect(() => {
    const fetchNotice = async () => {
      try {
        const res = await fetch("https://kalamajhi-high-school-backend.vercel.app/api/marquees");
        const data = await res.json();
        const latest = data[0];
        setText(latest?.text || "");
      } catch (error) {
        console.error("Failed to fetch marquee text:", error);
      }
    };
    fetchNotice();
  }, []);

  if (!text) return null;

  return (
    <div className="w-full bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 shadow-lg relative overflow-hidden">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full" style={{
          backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,.1) 35px, rgba(255,255,255,.1) 70px)',
          animation: 'slide 20s linear infinite'
        }}></div>
      </div>

      {/* Top Border Glow */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white to-transparent opacity-50"></div>
      
      {/* Content Container */}
      <div className="relative flex items-center py-3 px-4">
        {/* Left Icon with Pulse Animation */}
        <div className="flex-shrink-0 mr-4 relative">
          <div className="absolute inset-0 bg-white rounded-full animate-ping opacity-30"></div>
          <div className="relative w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-white/30 shadow-lg">
            <svg className="w-5 h-5 text-white animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15.536a5 5 0 001.414 1.414m2.828-9.9a9 9 0 012.828-2.828" />
            </svg>
          </div>
        </div>

        {/* Notice Badge */}
        <div className="flex-shrink-0 mr-4">
          <div className="relative">
            <div className="absolute inset-0 bg-white blur-sm opacity-50 rounded-lg"></div>
            <div className="relative bg-white/90 backdrop-blur-sm px-4 py-1.5 rounded-lg shadow-lg border border-white/50">
              <span className="font-bold text-sm bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent flex items-center gap-2">
                <svg className="w-4 h-4 text-orange-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                </svg>
                নোটিশ
              </span>
            </div>
          </div>
        </div>

        {/* Scrolling Text Container */}
        <div className="flex-1 overflow-hidden">
          <div className="marquee-container">
            <div className="marquee-content">
              <span className="inline-flex items-center px-6 text-base md:text-lg font-semibold text-white drop-shadow-lg whitespace-nowrap">
                ✦ {text} ✦
              </span>
              <span className="inline-flex items-center px-6 text-base md:text-lg font-semibold text-white drop-shadow-lg whitespace-nowrap">
                ✦ {text} ✦
              </span>
              <span className="inline-flex items-center px-6 text-base md:text-lg font-semibold text-white drop-shadow-lg whitespace-nowrap">
                ✦ {text} ✦
              </span>
            </div>
          </div>
        </div>

        {/* Right Decorative Icon */}
        <div className="flex-shrink-0 ml-4 hidden md:block">
          <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-white/30 shadow-lg animate-pulse">
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
          </div>
        </div>
      </div>

      {/* Bottom Border Glow */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white to-transparent opacity-50"></div>

      {/* Floating Particles Effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/4 w-2 h-2 bg-white/30 rounded-full animate-float-particle"></div>
        <div className="absolute top-1/3 left-1/2 w-1.5 h-1.5 bg-white/40 rounded-full animate-float-particle" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-2/3 left-3/4 w-2.5 h-2.5 bg-white/20 rounded-full animate-float-particle" style={{ animationDelay: '2s' }}></div>
      </div>

      <style>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }

        .marquee-container {
          width: 100%;
          overflow: hidden;
        }

        .marquee-content {
          display: flex;
          animation: marquee 15s linear infinite;
          will-change: transform;
        }

        .marquee-content:hover {
          animation-play-state: paused;
        }

        @keyframes slide {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-70px);
          }
        }

        @keyframes float-particle {
          0%, 100% {
            transform: translateY(0) translateX(0);
            opacity: 0;
          }
          50% {
            transform: translateY(-20px) translateX(10px);
            opacity: 1;
          }
        }

        .animate-float-particle {
          animation: float-particle 3s ease-in-out infinite;
        }

        /* Responsive text size */
        @media (max-width: 640px) {
          .marquee-content span {
            font-size: 0.875rem;
          }
        }
      `}</style>
    </div>
  );
};

export default MarqueeSection;