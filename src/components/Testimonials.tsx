import { useState, useEffect } from "react";
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
import { db } from "../lib/firebase";
import { collection, getDocs, addDoc } from "firebase/firestore";
import Swal from "sweetalert2";

export default function Testimonials() {
  const { user, signIn, signOut } = useAuth(); // Control de autenticación
  const [newTestimonial, setNewTestimonial] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // Para mostrar un mensaje de error
  const [testimonials, setTestimonials] = useState<any[]>([]); // Estado para almacenar los testimonios

  // Expresión regular para permitir solo letras, números y algunos signos
  const testimonialRegex = /^[a-zA-Z0-9\s.,!?'"()-]*$/;

  // Obtener los testimonios desde Firebase al cargar el componente
  useEffect(() => {
    const fetchTestimonials = async () => {
      const querySnapshot = await getDocs(collection(db, "testimonials"));
      const testimonialsData = querySnapshot.docs.map((doc) => doc.data());
      setTestimonials(testimonialsData);
    };

    fetchTestimonials();
  }, []);

  const handleSubmitTestimonial = async (e) => {
    e.preventDefault();

    if (!user) {
      setErrorMessage("Debes iniciar sesión para publicar un testimonio.");
      return;
    }

    // Validar que el testimonio no esté vacío
    if (!newTestimonial.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Testimonio vacío",
        text: "Por favor, escribe un mensaje antes de enviar.",
      });
      return;
    }

    // Validar el testimonio usando la expresión regular
    if (!testimonialRegex.test(newTestimonial)) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "El testimonio contiene caracteres no permitidos.",
      });
      return;
    }

    // Crear un nuevo testimonio y guardarlo en Firebase
    try {
      const newTestimonialData = {
        name: user.displayName || "Usuario anónimo", // Usar nombre predeterminado si no está disponible
        content: newTestimonial,
        avatar: user.photoURL || "https://via.placeholder.com/150", // Foto predeterminada si no está disponible
      };

      // Guardar el testimonio en Firebase
      await addDoc(collection(db, "testimonials"), newTestimonialData);

      // Actualizar el estado de los testimonios para incluir el nuevo testimonio
      setTestimonials((prevState) => [newTestimonialData, ...prevState]);

      // Limpiar el formulario
      setNewTestimonial("");
      setErrorMessage(null); // Limpiar mensaje de error al enviar testimonio

      // Mostrar notificación de éxito
      Swal.fire({
        icon: "success",
        title: "¡Testimonio enviado!",
        text: "Gracias por compartir tu experiencia.",
      });
    } catch (error) {
      console.error("Error al agregar testimonio:", error);
      // Mostrar notificación de error en caso de fallar
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Hubo un problema al enviar tu testimonio. Intenta nuevamente.",
      });
    }
  };

  return (
    <section
      id="testimonials"
      className="py-20 bg-gradient-to-b from-white to-pink-100"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">
            Lo que dicen nuestras alumnas
          </h2>
          <p className="text-lg text-gray-600">
            Historias de éxito y experiencias en nuestra academia
          </p>
        </div>

        {/* Mostrar mensaje si no hay testimonios */}
        {testimonials.length === 0 ? (
          <div className="text-center">
            <p className="text-sm text-pink-400">
              No hay testimonios publicados por el momento. Sé el primero en
              dejar uno.
            </p>
          </div>
        ) : (
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
              depth: 150,
              modifier: 2,
              slideShadows: true,
            }}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000 }}
            className="testimonials-swiper"
          >
            {testimonials.map((testimonial, index) => (
              <SwiperSlide key={index} className="max-w-sm mx-auto">
                <div className="bg-white p-6 rounded-lg shadow-xl text-center transform transition-all duration-300 hover:scale-105">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover mx-auto mb-4 border-4 border-pink-400"
                  />
                  <h4 className="font-semibold text-gray-900">
                    {testimonial.name}
                  </h4>
                  <p className="text-gray-600 text-sm mb-4">
                    {testimonial.role}
                  </p>
                  <div className="flex justify-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 text-yellow-400 fill-current"
                      />
                    ))}
                  </div>
                  <p className="text-gray-600 italic">
                    "{testimonial.content}"
                  </p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}

        <div className="max-w-2xl mx-auto mt-16">
          {user ? (
            <form onSubmit={handleSubmitTestimonial}>
              {errorMessage && (
                <p className="text-red-500 mb-4">{errorMessage}</p>
              )}
              <textarea
                value={newTestimonial}
                onChange={(e) => setNewTestimonial(e.target.value)}
                placeholder="Comparte tu experiencia..."
                className="w-full p-4 border rounded-lg mb-4 focus:ring-2 focus:ring-pink-300 focus:border-pink-300"
                rows={4}
              />
              <button
                type="submit"
                className="w-full bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600 transition-colors"
              >
                Publicar Testimonio
              </button>
              <button
                onClick={() => {
                  signOut();
                  Swal.fire({
                    icon: "success",
                    title: "Cerraste sesión exitosamente",
                    text: "Has cerrado sesión correctamente.",
                  });
                }}
                className="mt-4 flex justify-center mx-auto text-pink-500 hover:underline"
              >
                Cerrar sesión
              </button>
            </form>
          ) : (
            <div className="text-center">
              <button
                onClick={signIn}
                className="bg-white text-gray-600 px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition-shadow flex items-center mx-auto"
              >
                <img
                  src="https://www.google.com/favicon.ico"
                  alt="Google"
                  className="w-6 h-6 mr-2"
                />
                Deja un Testimonio
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
