import React from "react";
import Slider from "react-slick";

const slides = [
  {
    id: 1,
    image:
      "https://scontent.fdac20-1.fna.fbcdn.net/v/t39.30808-6/460511387_1000908298498477_4378230459284353157_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=2285d6&_nc_ohc=JRRHxJqQUd0Q7kNvwFWcPFh&_nc_oc=AdkgIDciuh7DFLaPbjuhAihAUXPE6SI-nd6RWQbwnIoQNlhKq-Mwz5ug5ZdK97GSv1I&_nc_zt=23&_nc_ht=scontent.fdac20-1.fna&_nc_gid=Fn3TkgIeY5oHhC9km4yoJg&oh=00_AfWWvjZ4Dg1jaW0pZ6koPaBFHwy7GrzVy-83fpLaXpFs1Q&oe=68A12B1E",
    title: "Explore the Mountains",
    description: "Discover beautiful mountain trails and adventures.",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1600&q=80",
    title: "Relax at the Beach",
    description: "Feel the warm sun and calm sea breeze.",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1600&q=80",
    title: "City Lights & Nights",
    description: "Experience the vibrant life of the city after dark.",
  },
];

export default function BannerSlider() {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    pauseOnHover: true,
  };

  return (
    <div className="w-full mx-auto   overflow-hidden shadow-lg">
      <Slider {...settings}>
        {slides.map((slide) => (
          <div key={slide.id} className="relative h-[500px] md:h-[600px]">
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-10 left-10 bg-black bg-opacity-50 text-white p-6 rounded-lg max-w-md">
              <h2 className="text-3xl font-bold">{slide.title}</h2>
              <p className="mt-2">{slide.description}</p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
