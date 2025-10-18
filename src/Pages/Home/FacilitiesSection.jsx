import React, { useEffect, useState } from "react";
import { Monitor, BookOpen, FlaskConical, Music, Sparkles, X } from "lucide-react";

// Volleyball icon SVG component
const VolleyballIcon = ({ size = 50, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="10"/>
    <path d="M12 2a10 10 0 0 0-6.88 2.77 10 10 0 0 0 13.76 0A10 10 0 0 0 12 2"/>
    <path d="M12 22a10 10 0 0 0 6.88-2.77 10 10 0 0 0-13.76 0A10 10 0 0 0 12 22"/>
    <path d="M2 12h20"/>
  </svg>
);

const iconMap = {
  Monitor: Monitor,
  BookOpen: BookOpen,
  FlaskConical: FlaskConical,
  Volleyball: VolleyballIcon,
  Music: Music
};

const FacilitiesSection = () => {
  const [facilities, setFacilities] = useState([]);
  const [selectedFacility, setSelectedFacility] = useState(null);
  const [hoveredId, setHoveredId] = useState(null);

  useEffect(() => {
    fetch("/Facilities.json")
      .then((res) => res.json())
      .then((data) => setFacilities(data))
      .catch((err) => console.error("Error loading facilities:", err));
  }, []);

  return (
    <section className="py-16 bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-10 left-10 w-64 h-64 bg-orange-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"></div>
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-yellow-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float-delayed"></div>
      <div className="absolute top-1/2 left-1/3 w-72 h-72 bg-amber-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float-slow"></div>

      <div className="w-11/12 max-w-7xl mx-auto px-4 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16 animate-fadeInDown">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-600 to-amber-600 text-white px-6 py-2 rounded-full text-sm font-semibold mb-6 shadow-lg">
            <Sparkles className="w-4 h-4" />
            <span>Our Facilities</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-600 via-amber-600 to-yellow-600 bg-clip-text text-transparent mb-4">
            আমাদের সুবিধাসমূহ
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-orange-600 to-amber-600 mx-auto rounded-full"></div>
        </div>

        {/* Facilities Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {facilities.map((facility, index) => {
            const IconComponent = iconMap[facility.icon] || Monitor;
            return (
              <div
                key={facility.id}
                onClick={() => setSelectedFacility(facility)}
                onMouseEnter={() => setHoveredId(facility.id)}
                onMouseLeave={() => setHoveredId(null)}
                className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 cursor-pointer overflow-hidden animate-fadeInUp"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Gradient Border on Hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-orange-400 via-amber-400 to-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
                <div className="absolute inset-[2px] bg-white rounded-2xl"></div>

                {/* Content */}
                <div className="relative p-6 text-center">
                  {/* Icon Container with Animated Background */}
                  <div className="relative mb-6 flex justify-center">
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-amber-400 rounded-full blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500 scale-150"></div>
                    <div className={`relative w-20 h-20 rounded-full flex items-center justify-center transition-all duration-500 ${
                      hoveredId === facility.id 
                        ? 'bg-gradient-to-br from-orange-500 to-amber-500 scale-110 rotate-12' 
                        : 'bg-gradient-to-br from-orange-100 to-amber-100'
                    }`}>
                      <IconComponent 
                        size={40} 
                        className={`transition-all duration-500 ${
                          hoveredId === facility.id ? 'text-white' : 'text-orange-600'
                        }`}
                      />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-gray-800 mb-3 group-hover:text-orange-600 transition-colors duration-300">
                    {facility.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
                    {facility.description}
                  </p>

                  {/* View More Indicator */}
                  <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-xs font-semibold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                      বিস্তারিত দেখুন →
                    </span>
                  </div>

                  {/* Corner Decoration */}
                  <div className="absolute top-2 right-2 w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="w-full h-full bg-gradient-to-br from-orange-400 to-amber-400 rounded-full animate-ping-slow"></div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Enhanced Popup Modal */}
      {selectedFacility && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-3xl w-full shadow-2xl transform animate-scaleUp overflow-hidden">
            <div className="flex flex-col lg:flex-row">
              {/* Left Side - Icon Section */}
              <div className="lg:w-2/5 bg-gradient-to-br from-orange-500 via-amber-500 to-yellow-500 p-8 lg:p-12 flex flex-col items-center justify-center relative overflow-hidden">
                {/* Decorative Circles */}
                <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-0 right-0 w-40 h-40 bg-white/10 rounded-full translate-x-1/2 translate-y-1/2"></div>
                
                {/* Icon */}
                <div className="relative z-10">
                  <div className="w-32 h-32 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mb-4 animate-pulse-slow">
                    {React.createElement(iconMap[selectedFacility.icon] || Monitor, {
                      size: 64,
                      className: "text-white"
                    })}
                  </div>
                  <div className="text-center">
                    <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-semibold">
                      <Sparkles className="w-4 h-4" />
                      <span>সুবিধা</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side - Content Section */}
              <div className="flex-1 p-8 lg:p-12 relative">
                {/* Close Button */}
                <button
                  onClick={() => setSelectedFacility(null)}
                  className="absolute top-4 right-4 w-10 h-10 bg-gray-100 hover:bg-orange-100 rounded-full flex items-center justify-center transition-all duration-300 hover:rotate-90 group"
                >
                  <X   className="w-5 h-5 text-gray-700 group-hover:text-orange-600" />
                </button>

                {/* Decorative Element */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-200 to-amber-200 rounded-full filter blur-3xl opacity-30"></div>

                {/* Content */}
                <div className="relative z-10">
                  {/* Title */}
                  <h3 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-orange-600 via-amber-600 to-yellow-600 bg-clip-text text-transparent">
                    {selectedFacility.title}
                  </h3>

                  {/* Divider */}
                  <div className="w-16 h-1 bg-gradient-to-r from-orange-600 to-amber-600 rounded-full mb-6"></div>

                  {/* Description */}
                  <p className="text-gray-700 leading-relaxed text-base md:text-lg mb-8">
                    {selectedFacility.description}
                  </p>

                  {/* Action Button */}
                  <button
                    onClick={() => setSelectedFacility(null)}
                    className="group relative px-8 py-3 bg-gradient-to-r from-orange-600 to-amber-600 text-white font-semibold rounded-full overflow-hidden transition-all hover:scale-105 hover:shadow-xl"
                  >
                    <span className="relative z-10">বন্ধ করুন</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-amber-600 to-orange-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
                  </button>

                  {/* Decorative Quote Mark */}
                  <div className="absolute bottom-4 right-4">
                    <div className="text-6xl font-serif text-orange-200 leading-none opacity-50">
                      "
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeInDown {
          animation: fadeInDown 0.8s ease-out;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out forwards;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }

        @keyframes scaleUp {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-scaleUp {
          animation: scaleUp 0.4s ease-out;
        }

        @keyframes float {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(20px, -20px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float 8s ease-in-out infinite;
          animation-delay: 1s;
        }
        .animate-float-slow {
          animation: float 10s ease-in-out infinite;
          animation-delay: 2s;
        }

        @keyframes ping-slow {
          0%, 100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.2);
            opacity: 0.8;
          }
        }
        .animate-ping-slow {
          animation: ping-slow 2s ease-in-out infinite;
        }

        @keyframes pulse-slow {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }
        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default FacilitiesSection;