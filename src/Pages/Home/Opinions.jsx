import { useEffect, useState } from "react";

const OpinionSection = () => {
  const [opinions, setOpinions] = useState([]);
  const [selectedOpinion, setSelectedOpinion] = useState(null);

  useEffect(() => {
    fetch("https://kalamajhi-high-school-backend.vercel.app/api/opinions")
      .then((res) => res.json())
      .then((data) => setOpinions(data.slice(0, 4))); // শুধু ৪টা দেখাবে
  }, []);

  return (
    <div className="w-11/12 mx-auto py-16 bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-orange-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-yellow-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-amber-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>

      {/* Header Section */}
      <div className="text-center mb-12 relative z-10">
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-600 to-amber-600 text-white px-6 py-2 rounded-full text-sm font-semibold mb-6 shadow-lg">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
          <span>Teacher's Voice</span>
        </div>
        <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-600 via-amber-600 to-yellow-600 bg-clip-text text-transparent mb-4">
          আমাদের শিক্ষকবৃন্দের বক্তব্য
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-orange-600 to-amber-600 mx-auto rounded-full"></div>
      </div>

      {/* Cards Grid */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 px-4 relative z-10">
        {opinions.map((opinion, index) => (
          <div
            key={opinion._id}
            className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transform transition-all duration-500 hover:-translate-y-3 animate-fadeInUp"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {/* Gradient Border Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-orange-400 via-amber-400 to-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
            <div className="absolute inset-[2px] bg-white rounded-2xl"></div>

            {/* Content Container */}
            <div className="relative flex flex-col h-full p-6">
              {/* Image with Animated Ring */}
              <div className="flex justify-center -mt-12 mb-4">
                <div className="relative">
                  {/* Rotating Gradient Ring */}
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500 via-amber-500 to-yellow-500 rounded-full animate-spin-slow opacity-75 scale-110"></div>
                  <div className="absolute inset-1 bg-white rounded-full"></div>
                  <img
                    src={opinion.image}
                    alt={opinion.name}
                    className="relative h-24 w-24 md:h-28 md:w-28 object-cover rounded-full border-4 border-white shadow-lg transition-transform duration-500 group-hover:scale-110"
                  />
                  {/* Corner Badge */}
                  <div className="absolute -top-1 -right-1 w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <svg className="w-4 h-4 text-white fill-white" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  </div>
                </div>
              </div>

              {/* Name & Designation */}
              <div className="text-center mb-4">
                <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-1 group-hover:text-orange-600 transition-colors duration-300">
                  {opinion.name}
                </h3>
                <p className="text-xs md:text-sm font-semibold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                  {opinion.designation}
                </p>
              </div>

              {/* Description with Gradient Background */}
              <div className="flex-1 mb-4 p-4 bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl border border-orange-100 group-hover:border-orange-200 transition-colors duration-300">
                <p className="text-gray-700 text-sm leading-relaxed line-clamp-4">
                  {opinion.description}
                </p>
              </div>

              {/* Button */}
              <button
                onClick={() => setSelectedOpinion(opinion)}
                className="relative mx-auto px-6 py-2.5 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold rounded-full text-sm shadow-md hover:shadow-xl transform hover:scale-105 transition-all duration-300 overflow-hidden group/btn"
              >
                <span className="relative z-10">বিস্তারিত দেখুন</span>
                <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-orange-500 transform scale-x-0 group-hover/btn:scale-x-100 transition-transform origin-left duration-300"></div>
              </button>

              {/* Decorative Quote Mark */}
              <div className="absolute top-4 left-4 text-6xl font-serif text-orange-200 opacity-0 group-hover:opacity-30 transition-opacity duration-500 leading-none">
                "
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Enhanced Popup Modal */}
      {selectedOpinion && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-4xl w-full shadow-2xl overflow-hidden animate-slideUp">
            <div className="flex flex-col md:flex-row">
              {/* Left Side - Image Section */}
              <div className="md:w-2/5 bg-gradient-to-br from-orange-500 via-amber-500 to-yellow-500 p-8 md:p-12 flex flex-col items-center justify-center relative overflow-hidden">
                {/* Decorative Circles */}
                <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-0 right-0 w-40 h-40 bg-white/10 rounded-full translate-x-1/2 translate-y-1/2"></div>
                
                {/* Image with Glowing Effect */}
                <div className="relative z-10">
                  <div className="absolute inset-0 bg-white/20 rounded-full blur-2xl animate-pulse"></div>
                  <img
                    src={selectedOpinion.image}
                    alt={selectedOpinion.name}
                    className="relative h-48 w-48 md:h-64 md:w-64 object-cover rounded-full border-8 border-white/30 shadow-2xl"
                  />
                </div>

                {/* Badge */}
                <div className="mt-6 inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-semibold">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>শিক্ষক</span>
                </div>
              </div>

              {/* Right Side - Content Section */}
              <div className="flex-1 p-8 md:p-12 relative">
                {/* Close Button */}
                <button
                  onClick={() => setSelectedOpinion(null)}
                  className="absolute top-4 right-4 w-10 h-10 bg-gray-100 hover:bg-orange-100 rounded-full flex items-center justify-center transition-all duration-300 hover:rotate-90 group"
                >
                  <svg className="w-5 h-5 text-gray-700 group-hover:text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                {/* Decorative Element */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-200 to-amber-200 rounded-full filter blur-3xl opacity-30"></div>

                {/* Content */}
                <div className="relative z-10">
                  {/* Name */}
                  <h3 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-orange-600 via-amber-600 to-yellow-600 bg-clip-text text-transparent">
                    {selectedOpinion.name}
                  </h3>

                  {/* Designation Badge */}
                  <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-100 to-amber-100 text-orange-700 px-4 py-2 rounded-full text-sm font-semibold mb-6 border border-orange-200">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span>{selectedOpinion.designation}</span>
                  </div>

                  {/* Divider */}
                  <div className="w-16 h-1 bg-gradient-to-r from-orange-600 to-amber-600 rounded-full mb-6"></div>

                  {/* Description */}
                  <div className="prose prose-lg max-w-none mb-8">
                    <p className="text-gray-700 leading-relaxed text-base md:text-lg">
                      {selectedOpinion.description}
                    </p>
                  </div>

                  {/* Close Button */}
                  <button
                    onClick={() => setSelectedOpinion(null)}
                    className="relative px-8 py-3 bg-gradient-to-r from-orange-600 to-amber-600 text-white font-semibold rounded-full overflow-hidden transition-all hover:scale-105 hover:shadow-xl group/btn"
                  >
                    <span className="relative z-10">বন্ধ করুন</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-amber-600 to-orange-600 transform scale-x-0 group-hover/btn:scale-x-100 transition-transform origin-left duration-300"></div>
                  </button>

                  {/* Decorative Quote */}
                  <div className="absolute bottom-4 right-4">
                    <div className="text-8xl font-serif text-orange-200 leading-none opacity-40">
                      "
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Animations */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          .animate-fadeIn {
            animation: fadeIn 0.3s ease-out;
          }
          @keyframes slideUp {
            from { transform: translateY(20px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }
          .animate-slideUp {
            animation: slideUp 0.4s ease-out;
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
          @keyframes spin-slow {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          .animate-spin-slow {
            animation: spin-slow 3s linear infinite;
          }
        `}
      </style>
    </div>
  );
};

export default OpinionSection;