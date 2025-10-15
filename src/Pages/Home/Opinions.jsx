import { useEffect, useState } from "react";

const OpinionSection = () => {
  const [opinions, setOpinions] = useState([]);
  const [selectedOpinion, setSelectedOpinion] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/opinions")
      .then((res) => res.json())
      .then((data) => setOpinions(data.slice(0, 4))); // শুধু ৪টা দেখাবে
  }, []);

  return (
    <div className="w-11/12 mx-auto py-10 bg-gray-50">
      <h2 className="text-xl md:text-3xl font-bold text-center mb-8">
        আমাদের শিক্ষকবৃন্দের বক্তব্য
      </h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 px-4">
        {opinions.map((opinion) => (
          <div
            key={opinion._id}
            className="bg-white shadow-lg rounded-xl overflow-hidden flex flex-col transform transition duration-300 hover:scale-105 hover:shadow-2xl"
          >
            <div className="flex justify-center mt-4">
              <img
                src={opinion.image}
                alt={opinion.name}
                className="h-20 md:h-24 w-20 md:w-24 object-cover rounded-full border-2 border-blue-500"
              />
            </div>
            <div className="p-4 flex flex-col flex-1">
              <h3 className="text-sm md:text-lg font-semibold text-center mt-2">{opinion.name}</h3>
              <p className="text-xs md:text-sm text-gray-500 text-center">{opinion.designation}</p>
              <p className="text-gray-600 mt-2 line-clamp-3">{opinion.description}</p>
              <button
                onClick={() => setSelectedOpinion(opinion)}
                className="w-2/5 mx-auto mt-4 bg-orange-400 text-white py-2 rounded-md transition text-xs md:text-sm"
              >
                বিস্তারিত দেখুন
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Popup */}
      {selectedOpinion && (
        <div className="fixed inset-0 flex justify-center items-center z-50 animate-fadeIn p-4">
          <div className="bg-gray-100 rounded-xl p-4 md:p-6 max-w-full md:max-w-4xl w-full md:flex md:items-start md:space-x-6 animate-slideUp">
            {/* Image */}
            <div className="md:w-1/3 flex justify-center mb-4 md:mb-0">
              <img
                src={selectedOpinion.image}
                alt={selectedOpinion.name}
                className="h-40 w-40 md:h-64 md:w-64 object-cover rounded-full border-4 border-blue-500"
              />
            </div>
            {/* Content */}
            <div className="md:w-2/3 flex flex-col">
              <h3 className="text-lg md:text-2xl font-bold">{selectedOpinion.name}</h3>
              <p className="text-sm md:text-gray-500 mb-2 md:mb-4">{selectedOpinion.designation}</p>
              <p className="text-gray-700 mb-4 md:mb-6 text-sm md:text-base">{selectedOpinion.description}</p>
              <button
                onClick={() => setSelectedOpinion(null)}
                className="self-start bg-red-500 hover:bg-red-600 text-white py-1 md:py-2 px-4 md:px-6 rounded-md transition text-xs md:text-sm"
              >
                বন্ধ করুন
              </button>
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
            animation: slideUp 0.3s ease-out;
          }
        `}
      </style>
    </div>
  );
};

export default OpinionSection;
