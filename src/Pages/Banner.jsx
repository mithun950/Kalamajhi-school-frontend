import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Circle } from 'lucide-react';

const slides = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1600&q=80",
    title: "Explore the Mountains",
    description: "Discover beautiful mountain trails and adventures.",
    gradient: "from-purple-900/80 via-blue-900/60 to-transparent"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1600&q=80",
    title: "Relax at the Beach",
    description: "Feel the warm sun and calm sea breeze.",
    gradient: "from-orange-900/80 via-pink-900/60 to-transparent"
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1600&q=80",
    title: "City Lights & Nights",
    description: "Experience the vibrant life of the city after dark.",
    gradient: "from-indigo-900/80 via-purple-900/60 to-transparent"
  },
];

export default function ModernBannerSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const nextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setTimeout(() => setIsAnimating(false), 600);
  };

  const prevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setTimeout(() => setIsAnimating(false), 600);
  };

  const goToSlide = (index) => {
    if (isAnimating || index === currentSlide) return;
    setIsAnimating(true);
    setCurrentSlide(index);
    setTimeout(() => setIsAnimating(false), 600);
  };

  React.useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [currentSlide, isAnimating]);

  return (
    <div className="relative w-full h-[500px] md:h-[700px] overflow-hidden bg-black group">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-all duration-700 ease-in-out ${
            index === currentSlide
              ? 'opacity-100 scale-100'
              : 'opacity-0 scale-105'
          }`}
        >
          {/* Background Image with Parallax Effect */}
          <div 
            className="absolute inset-0 transition-transform duration-[8000ms] ease-out"
            style={{
              transform: index === currentSlide ? 'scale(1.1)' : 'scale(1)',
            }}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            {/* Gradient Overlay */}
            <div className={`absolute inset-0 bg-gradient-to-r ${slide.gradient}`} />
          </div>

          {/* Content Container */}
          <div className="relative h-full flex items-center px-6 md:px-16 lg:px-24">
            <div 
              className={`max-w-2xl transform transition-all duration-700 delay-200 ${
                index === currentSlide
                  ? 'translate-x-0 opacity-100'
                  : '-translate-x-12 opacity-0'
              }`}
            >
              {/* Decorative Line */}
              <div className="w-20 h-1 bg-gradient-to-r from-white to-transparent mb-6 rounded-full" />
              
              {/* Title */}
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 leading-tight">
                {slide.title}
              </h2>
              
              {/* Description */}
              <p className="text-lg md:text-xl text-gray-200 mb-8 leading-relaxed">
                {slide.description}
              </p>
              
              {/* CTA Button */}
              <button className="group/btn relative px-8 py-4 bg-white text-black font-semibold rounded-full overflow-hidden transition-all hover:scale-105 hover:shadow-2xl">
                <span className="relative z-10">Explore Now</span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 transform scale-x-0 group-hover/btn:scale-x-100 transition-transform origin-left duration-300" />
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 md:w-14 md:h-14 bg-white/10 backdrop-blur-md text-white rounded-full flex items-center justify-center transition-all hover:bg-white/20 hover:scale-110 opacity-0 group-hover:opacity-100 z-10"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6 md:w-7 md:h-7" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 md:w-14 md:h-14 bg-white/10 backdrop-blur-md text-white rounded-full flex items-center justify-center transition-all hover:bg-white/20 hover:scale-110 opacity-0 group-hover:opacity-100 z-10"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6 md:w-7 md:h-7" />
      </button>

      {/* Progress Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className="group/dot relative"
            aria-label={`Go to slide ${index + 1}`}
          >
            {/* Outer Ring */}
            <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
              index === currentSlide ? 'bg-white/20' : 'bg-transparent'
            }`}>
              {/* Inner Dot */}
              <div className={`rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? 'w-3 h-3 bg-white'
                  : 'w-2 h-2 bg-white/50 group-hover/dot:bg-white/80 group-hover/dot:w-2.5 group-hover/dot:h-2.5'
              }`} />
            </div>
            
            {/* Progress Ring for Active Slide */}
            {index === currentSlide && (
              <svg className="absolute inset-0 w-10 h-10 -rotate-90">
                <circle
                  cx="20"
                  cy="20"
                  r="18"
                  stroke="white"
                  strokeWidth="2"
                  fill="none"
                  strokeDasharray="113"
                  strokeDashoffset="0"
                  className="animate-progress"
                  style={{
                    animation: 'progress 5s linear forwards'
                  }}
                />
              </svg>
            )}
          </button>
        ))}
      </div>

      {/* Slide Counter */}
      <div className="absolute top-8 right-8 text-white font-semibold backdrop-blur-md bg-white/10 px-4 py-2 rounded-full z-10">
        <span className="text-2xl">{String(currentSlide + 1).padStart(2, '0')}</span>
        <span className="text-white/60"> / {String(slides.length).padStart(2, '0')}</span>
      </div>

      <style>{`
        @keyframes progress {
          from {
            stroke-dashoffset: 113;
          }
          to {
            stroke-dashoffset: 0;
          }
        }
      `}</style>
    </div>
  );
}