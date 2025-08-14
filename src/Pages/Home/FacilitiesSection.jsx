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
    <section className="py-16 bg-gray-50">
      <div className="w-11/12 mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 animate-fadeInDown">
            আমাদের সুবিধাসমূহ
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 h-56">
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

      {selectedFacility && (
        <div className="fixed inset-0  flex items-center justify-center z-50 animate-fadeIn">
          <div className="bg-gray-100 rounded-xl p-8 max-w-md mx-auto shadow-xl relative transition transform scale-95 animate-scaleUp">
            <div className="flex justify-center mb-4">
              {iconMap[selectedFacility.icon] || <Monitor size={50} className="text-gray-400" />}
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">
              {selectedFacility.title}
            </h3>
            <p className="text-gray-600 mb-6 text-center">
              {selectedFacility.description}
            </p>
            <button
              onClick={() => setSelectedFacility(null)}
              className="block mx-auto bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg"
            >
              বন্ধ করুন
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default FacilitiesSection;
