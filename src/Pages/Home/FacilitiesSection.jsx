import React, { useEffect, useState } from "react";
import { Monitor, BookOpen, FlaskConical, Volleyball, Music } from "lucide-react";

const iconMap = {
  Monitor: <Monitor size={50} className="text-blue-500" />,
  BookOpen: <BookOpen size={50} className="text-green-500" />,
  FlaskConical: <FlaskConical size={50} className="text-red-500" />,
  Volleyball: <Volleyball size={50} className="text-yellow-500" />,
  Music: <Music size={50} className="text-purple-500" />
};

const FacilitiesSection = () => {
  const [facilities, setFacilities] = useState([]);
  const [selectedFacility, setSelectedFacility] = useState(null);

  useEffect(() => {
    fetch("/Facilities.json")
      .then((res) => res.json())
      .then((data) => setFacilities(data))
      .catch((err) => console.error("Error loading facilities:", err));
  }, []);

  return (
    <section className="py-10 bg-gray-50 relative">
      <div className="w-11/12 mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 animate-fadeInDown">
            আমাদের সুবিধাসমূহ
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
          {facilities.map((facility) => (
            <div
              key={facility.id}
              onClick={() => setSelectedFacility(facility)}
              className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition duration-500 transform hover:-translate-y-2 cursor-pointer text-center animate-fadeInUp"
            >
              <div className="flex justify-center mb-4">
                {iconMap[facility.icon] || <Monitor size={50} className="text-gray-400" />}
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {facility.title}
              </h3>
              <p className="text-sm text-gray-600 truncate">
                {facility.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Popup */}
      {selectedFacility && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fadeIn">
          <div className="bg-white rounded-xl p-8 max-w-2xl w-full shadow-xl transform transition duration-300 scale-95 animate-scaleUp flex flex-col lg:flex-row">
            {/* Image/Icon Left */}
            <div className="flex justify-center lg:justify-start mb-6 lg:mb-0 lg:mr-6">
              {iconMap[selectedFacility.icon] || <Monitor size={80} className="text-gray-400" />}
            </div>

            {/* Content Right */}
            <div className="flex flex-col justify-center text-center lg:text-left">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                {selectedFacility.title}
              </h3>
              <p className="text-gray-600 mb-6">
                {selectedFacility.description}
              </p>
              <button
                onClick={() => setSelectedFacility(null)}
                className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg self-center lg:self-start"
              >
                বন্ধ করুন
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default FacilitiesSection;
