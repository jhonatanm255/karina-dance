import { useEffect, useState } from "react";
import ScrollReveal from "scrollreveal";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Autoplay,
  EffectCoverflow,
} from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";
import supabase from "../lib/supabase"; // Asegúrate de que este archivo contiene tu configuración de Supabase

interface Image {
  name: string;
  url: string;
}

export default function Gallery() {
  const [images, setImages] = useState<Image[]>([]);

  useEffect(() => {
    const fetchImages = async () => {
      const { data, error } = await supabase.storage.from("gallery").list();
      if (error) {
        console.error("Error fetching images:", error.message);
        return;
      }

      const urls = await Promise.all(
        data.map(async (file) => {
          const { data: publicUrlData } = supabase.storage
            .from("gallery")
            .getPublicUrl(file.name);
          return {
            name: file.name,
            url: publicUrlData?.publicUrl || "",
          };
        })
      );

      setImages(urls.filter((image) => image.url)); // Filtra imágenes válidas
    };

    fetchImages();

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

    sr.reveal(".gallery-swiper", {
      duration: 1000,
      opacity: 0,
      distance: "20px",
      origin: "bottom",
      delay: 600,
    });
  }, []);

  return (
    <section id="gallery" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="gallery-title text-3xl font-bold text-gray-900 sm:text-4xl mb-4">
            Nuestra Galería
          </h2>
          <p className="gallery-subtitle text-lg text-gray-600">
            Momentos mágicos capturados en nuestra academia
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
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
                    alt={`Imagen ${index + 1}`}
                    className="w-full h-[500px] lg:h-[600px] object-cover transform transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <p className="text-white text-lg font-medium">
                      {`Imagen ${index + 1}`}
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}





