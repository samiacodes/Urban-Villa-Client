// components/HeroBanner.jsx
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

const Banner = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 4000,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
  };

  const slides = [
    {
      title: "Luxury Apartment in the Heart of City",
      img: "https://i.ibb.co/93sPBqyw/b6.jpg",
    },
    {
      title: "Modern Lifestyle in Your Dream Home",
      img: "https://i.ibb.co/nM3d4MwY/b4.jpg",
    },
    {
      title: "Feel Comfort and Class Together",
      img: "https://i.ibb.co/VWRKbHyD/b5.jpg",
    },
  ];

  return (
    <div>
      <div className="relative w-full h-[85vh] overflow-hidden">
        <Slider {...settings}>
          {slides.map((slide, index) => (
            <div key={index} className="relative">
              <img
                src={slide.img}
                alt={slide.title}
                className="w-full h-[85vh] object-cover"
                />
              <div
                className="absolute inset-0 bg-black/40 flex flex-col justify-center items-start px-10 md:px-24"
                data-aos="fade-up"
                >
                
                <h2 className="text-white text-3xl md:text-5xl lg:text-6xl font-bold max-w-[700px] leading-tight mb-4">
                  {slide.title}
                </h2>
                
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Banner;
