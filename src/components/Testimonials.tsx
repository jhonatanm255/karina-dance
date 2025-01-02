import { useState } from "react";
import { Star } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Autoplay,
  EffectCoverflow,
} from "swiper/modules";
import { useAuth } from "../hooks/useAuth";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";

export default function Testimonials() {
  const { user, error, signIn, signOut } = useAuth();
  const [newTestimonial, setNewTestimonial] = useState("");

  const testimonials = [
    {
      name: "María González",
      role: "Madre de Ana",
      content:
        "Mi hija ha crecido tanto como bailarina y como persona desde que empezó en DreamDance. El ambiente es increíble.",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80",
    },
    {
      name: "Laura Pérez",
      role: "Estudiante",
      content:
        "Los profesores son excelentes y me han ayudado a desarrollar mi técnica y confianza en el escenario.",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80",
    },
    {
      name: "Carmen Rodríguez",
      role: "Madre de Sofia",
      content:
        "La mejor decisión fue inscribir a mi hija aquí. Ha hecho grandes amistades y ama cada clase.",
      avatar:
        "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&q=80",
    },
    {
      name: "María González",
      role: "Madre de Ana",
      content:
        "Mi hija ha crecido tanto como bailarina y como persona desde que empezó en DreamDance. El ambiente es increíble.",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80",
    },
    {
      name: "Laura Pérez",
      role: "Estudiante",
      content:
        "Los profesores son excelentes y me han ayudado a desarrollar mi técnica y confianza en el escenario.",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80",
    },
    {
      name: "Carmen Rodríguez",
      role: "Madre de Sofia",
      content:
        "La mejor decisión fue inscribir a mi hija aquí. Ha hecho grandes amistades y ama cada clase.",
      avatar:
        "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&q=80",
    },
    {
      name: "María González",
      role: "Madre de Ana",
      content:
        "Mi hija ha crecido tanto como bailarina y como persona desde que empezó en DreamDance. El ambiente es increíble.",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80",
    },
    {
      name: "Laura Pérez",
      role: "Estudiante",
      content:
        "Los profesores son excelentes y me han ayudado a desarrollar mi técnica y confianza en el escenario.",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80",
    },
    {
      name: "Carmen Rodríguez",
      role: "Madre de Sofia",
      content:
        "La mejor decisión fue inscribir a mi hija aquí. Ha hecho grandes amistades y ama cada clase.",
      avatar:
        "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&q=80",
    },
    {
      name: "María González",
      role: "Madre de Ana",
      content:
        "Mi hija ha crecido tanto como bailarina y como persona desde que empezó en DreamDance. El ambiente es increíble.",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80",
    },
    {
      name: "Laura Pérez",
      role: "Estudiante",
      content:
        "Los profesores son excelentes y me han ayudado a desarrollar mi técnica y confianza en el escenario.",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80",
    },
    {
      name: "Carmen Rodríguez",
      role: "Madre de Sofia",
      content:
        "La mejor decisión fue inscribir a mi hija aquí. Ha hecho grandes amistades y ama cada clase.",
      avatar:
        "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&q=80",
    },
  ];

  const handleSubmitTestimonial = (e) => {
    e.preventDefault();
    console.log("New testimonial:", newTestimonial);
    setNewTestimonial("");
  };


  return (
    <section id="testimonials" className="py-20 bg-pink-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">
            Lo que dicen nuestras alumnas
          </h2>
          <p className="text-lg text-gray-600">
            Historias de éxito y experiencias en nuestra academia
          </p>
        </div>

        <Swiper
          modules={[Navigation, Pagination, Autoplay, EffectCoverflow]}
          effect="coverflow"
          grabCursor={true}
          centeredSlides={true}
          slidesPerView="auto"
          loop={true}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 2,
            slideShadows: true,
          }}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000 }}
          className="testimonials-swiper mb-16"
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide key={index} className="w-full md:w-2/3 lg:w-1/2">
              <div className="bg-white p-6 rounded-lg shadow-lg mx-4 transform transition-all duration-300 hover:scale-105">
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      {testimonial.name}
                    </h4>
                    <p className="text-gray-600 text-sm">{testimonial.role}</p>
                  </div>
                </div>
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 text-yellow-400 fill-current"
                    />
                  ))}
                </div>
                <p className="text-gray-600">{testimonial.content}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="max-w-2xl mx-auto">
          {error && (
            <div className="mb-4 p-4 bg-red-50 text-red-600 rounded-lg text-center">
              {error}
            </div>
          )}

          {user ? (
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <img
                    src={user.photoURL || ""}
                    alt={user.displayName || ""}
                    className="w-10 h-10 rounded-full mr-3"
                  />
                  <span className="font-medium text-gray-900">
                    {user.displayName}
                  </span>
                </div>
                <button
                  onClick={signOut}
                  className="text-sm text-gray-600 hover:text-pink-500"
                >
                  Cerrar Sesión
                </button>
              </div>
              <form onSubmit={handleSubmitTestimonial}>
                <textarea
                  value={newTestimonial}
                  onChange={(e) => setNewTestimonial(e.target.value)}
                  placeholder="Comparte tu experiencia..."
                  className="w-full p-3 border rounded-lg mb-4 focus:ring-2 focus:ring-pink-300 focus:border-pink-300"
                  rows={4}
                />
                <button
                  type="submit"
                  className="w-full bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600 transition-colors"
                >
                  Publicar Testimonio
                </button>
              </form>
            </div>
          ) : (
            <div className="text-center">
              <button
                onClick={signIn}
                className="bg-white text-gray-900 px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition-shadow flex items-center mx-auto"
              >
                <img
                  src="https://www.google.com/favicon.ico"
                  alt="Google"
                  className="w-5 h-5 mr-3"
                />
                Deja un testimonio
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}