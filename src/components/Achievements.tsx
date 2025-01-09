import { useEffect } from "react";
import ScrollReveal from "scrollreveal";
import { Trophy, Award, Medal, Star } from "lucide-react";

export default function Achievements() {
  const achievements = [
    {
      icon: <Trophy className="w-12 h-12 text-pink-300" />,
      title: "Premio Nacional de Danza",
      year: "2023",
      description: "Mejor Academia de Danza del Año",
    },
    {
      icon: <Award className="w-12 h-12 text-pink-300" />,
      title: "Reconocimiento Internacional",
      year: "2022",
      description: "Festival Internacional de Ballet - París",
    },
    {
      icon: <Medal className="w-12 h-12 text-pink-300" />,
      title: "Excelencia Educativa",
      year: "2023",
      description: "Certificación Royal Academy of Dance",
    },
    {
      icon: <Star className="w-12 h-12 text-pink-300" />,
      title: "Mejores Egresadas",
      year: "2021-2023",
      description: "90% de nuestras alumnas en compañías profesionales",
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
      interval: 200, // Para que cada tarjeta aparezca en intervalos
    });
  }, []);

  return (
    <section
      id="achievements"
      className="py-20 bg-gradient-to-b from-pink-50 to-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">
            Nuestros Reconocimientos
          </h2>
          <p className="text-lg text-gray-600">
            Excelencia y dedicación reconocidas internacionalmente
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {achievements.map((achievement, index) => (
            <div
              key={index}
              className="achievement-card bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow transform hover:scale-105"
            >
              <div className="flex justify-center mb-4">{achievement.icon}</div>
              <h3 className="text-xl font-semibold text-center mb-2">
                {achievement.title}
              </h3>
              <p className="text-pink-400 text-center mb-2">
                {achievement.year}
              </p>
              <p className="text-gray-600 text-center">
                {achievement.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
