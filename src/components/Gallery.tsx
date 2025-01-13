import { useEffect } from "react";
import ScrollReveal from "scrollreveal";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";
import img1 from "../assets/gallery-img/img-1.jpg"; 
import img5 from "../assets/gallery-img/img-5.jpg";
import img7 from "../assets/gallery-img/img-7.jpg";
import img10 from "../assets/gallery-img/img-10.jpg";
import img11 from "../assets/gallery-img/img-11.jpg";
import img12 from "../assets/gallery-img/img-12.jpg";
import img14 from "../assets/gallery-img/img-14.jpg";
import img16 from "../assets/gallery-img/img-16.jpg";
import img17 from "../assets/gallery-img/img-17.jpg";

export default function Gallery() {
  const images = [
    {
      url: img1,
      alt: "Bailarina practicando",
    },
    {
      url: img5,
      alt: "Bailarina practicando",
    },
    {
      url: img7,
      alt: "Bailarina practicando",
    },
    {
      url: img10,
      alt: "Bailarina practicando",
    },
    {
      url: img11,
      alt: "Bailarina practicando",
    },
    {
      url: img12,
      alt: "Bailarina practicando",
    },
    {
      url: img14,
      alt: "Bailarina practicando",
    },
    {
      url: img16,
      alt: "Bailarina practicando",
    },
    {
      url: img17,
      alt: "Bailarina practicando",
    },
  ];

  useEffect(() => {
    const sr = ScrollReveal();

    // Animar solo el título y el párrafo
    sr.reveal(".gallery-title", {
      duration: 1000,
      opacity: 0,
      distance: "20px",
      origin: "bottom",
      delay: 200,
    });

    sr.reveal(".gallery-subtitle", {
      duration: 1000,
      opacity: 0,
      distance: "20px",
      origin: "bottom",
      delay: 400,
    });
  }, []);

  return (
    <section id="gallery" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2
            className="gallery-title text-3xl font-bold text-gray-900 sm:text-4xl mb-4"
          >
            Nuestra Galería
          </h2>
          <p className="gallery-subtitle text-lg text-gray-600">
            Momentos mágicos capturados en nuestra academia
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <Swiper
            modules={[Navigation, Pagination, Autoplay, EffectCoverflow]}
            effect="coverflow"
            grabCursor={true}
            centeredSlides={true}
            slidesPerView="auto"
            coverflowEffect={{
              rotate: 50,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: true,
            }}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000 }}
            className="gallery-swiper"
          >
            {images.map((image, index) => (
              <SwiperSlide key={index} className="w-full md:w-3/4 lg:w-2/3">
                <div className="relative overflow-hidden rounded-lg group aspect-w-16 aspect-h-9">
                  <img
                    src={image.url}
                    alt={image.alt}
                    className="w-full h-[500px] lg:h-[600px] object-cover transform transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <p className="text-white text-lg font-medium">
                      {image.alt}
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  )};





