import { useEffect } from "react";
import ScrollReveal from "scrollreveal";
import img1 from "../assets/clase1.jpeg";
import img2 from "../assets/clase2.jpeg";
import img3 from "../assets/clase3.jpeg";
import img4 from "../assets/clase4.jpeg";

export default function Class() {
  const achievements = [
    {
      image: img2,
      description: "Lunes",
    },
    {
      image: img4,
      description: "Martes",
    },
    {
      image: img1,
      description: "Miercoles",
    },
    {
      image: img3,
      description: "Jueves",
    },
  ];

  useEffect(() => {
    const sr = ScrollReveal();

    // Animación para los logros
    sr.reveal(".achievement-card", {
      duration: 1000,
      opacity: 0,
      distance: "20px",
      origin: "bottom",
      delay: 300,
      interval: 200,
    });
  }, []);

  return (
    <section
      id="class"
      className="py-20 bg-gradient-to-b from-pink-50 to-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">
            Disciplinas que se Imparten
          </h2>
          <p className="text-lg text-gray-600">
            Variedad de estilos para descubrir tu pasión por la danza
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {achievements.map((achievement, index) => (
            <div
              key={index}
              className="achievement-card bg-white lg:h-[460px] rounded-lg shadow-lg hover:shadow-xl transition-shadow transform hover:scale-105"
            >
              <div>
                <img
                  src={achievement.image}
                  alt={achievement.description}
                  className="w-full lg:h-96 lg:object-cover rounded-t-lg" // Imagen más alta
                />
              </div>
              {/* <div className="flex justify-center">
                <p className="text-pink-500 rounded-full bg-pink-50 inline-block text-center px-8 py-2 my-4">
                  {achievement.description}
                </p>
              </div> */}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
