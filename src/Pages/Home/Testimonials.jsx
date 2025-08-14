import React, { useEffect, useState } from "react";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:5000/api/testimonials")
      .then(res => setTestimonials(res.data))
      .catch(err => console.error(err));
  }, []);

  const settings = {
    infinite: true,
    speed: 700,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    pauseOnHover: true,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } }
    ]
  };

  return (
    <section className="relative z-0 p-6 bg-gray-50">
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Student Achievements</h2>

      <Slider {...settings}>
        {testimonials.map(t => (
          <div key={t._id} className="px-2 cursor-pointer" onClick={() => setSelected(t)}>
            <div className="bg-white rounded-xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500">
              <img 
                src={t.image} 
                alt={t.name} 
                className="w-32 h-32 md:w-40 md:h-40 mx-auto rounded-full object-cover mt-4 transition-transform duration-300 hover:scale-110"
              />
              <div className="p-4 text-center">
                <h3 className="text-lg font-semibold text-gray-800">{t.name}</h3>
                <p className="text-gray-600 mt-1 text-sm">{t.achievement}</p>
              </div>
            </div>
          </div>
        ))}
      </Slider>

      {/* Popup */}
      {selected && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4 overflow-auto">
          <div className="bg-white rounded-3xl w-full md:w-3/4 lg:w-2/3 p-6 relative flex flex-col lg:flex-row gap-6 shadow-2xl">
            
            {/* Image */}
            <img 
              src={selected.image} 
              alt={selected.name} 
              className="w-48 h-48 md:w-64 md:h-64 lg:w-1/2 lg:h-auto object-cover "
            />
            
            {/* Content */}
            <div className="flex-1 relative">
              <button 
                className="absolute top-3 right-3 text-3xl font-bold text-gray-700 hover:text-gray-900"
                onClick={() => setSelected(null)}
              >
                &times;
              </button>
              <h3 className="text-2xl font-bold mb-2 text-gray-800">{selected.name}</h3>
              <p className="text-gray-600 mb-2 font-semibold">{selected.achievement}</p>
              <p className="text-gray-700 leading-relaxed">{selected.description}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Testimonials;
