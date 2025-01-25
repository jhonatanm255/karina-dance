import { useState, useEffect } from "react";
import ScrollReveal from "scrollreveal";
import { Trophy, Award, Medal, Star } from "lucide-react";
import diploma1 from "../assets/diplomas/diploma1.jpeg";
import diploma2 from "../assets/diplomas/diploma2.jpeg";
import diploma3 from "../assets/diplomas/diploma3.jpeg";
import diploma4 from "../assets/diplomas/diploma4.jpeg";

export default function Achievements() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentDiploma, setCurrentDiploma] = useState<string | null>(null);

  const achievements = [
    {
      icon: <Trophy className="w-12 h-12 text-pink-300" />,
      title: "Premio Interjuvenil de Baile",
      year: "2009",
      description: "Participacion como coreógrafos en el evento",
      diploma: diploma1,
    },
    {
      icon: <Award className="w-12 h-12 text-pink-300" />,
      title: "Carnaval de Villahermosa",
      year: "2004",
      description: "Teercer lugar de comparsa infantil de fantasía",
      diploma: diploma2,
    },
    {
      icon: <Medal className="w-12 h-12 text-pink-300" />,
      title: "Intercolegial Kids",
      year: "2003",
      description: "Certificación por su valiosa participación en el evento",
      diploma: diploma3,
    },
    {
      icon: <Star className="w-12 h-12 text-pink-300" />,
      title: "Mejores Egresadas",
      year: "2001-2025",
      description: "90% de nuestras alumnas en compañías profesionales",
      diploma: diploma4,
    },
  ];

  const handleOpenModal = (diploma: string) => {
    setCurrentDiploma(diploma);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentDiploma(null);
  };

  useEffect(() => {
    const sr = ScrollReveal();

    // Animación para las tarjetas de logros
    sr.reveal(".achievement-card", {
      duration: 1000,
      opacity: 0,
      distance: "20px",
      origin: "bottom",
      delay: 300,
      interval: 200,
    });

    // Animación para el modal cuando se abre
    if (isModalOpen) {
      sr.reveal(".modal-content", {
        duration: 1000,
        opacity: 0,
        distance: "20px",
        origin: "bottom",
      });
    }
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
              <p className="text-gray-600 text-center mb-4">
                {achievement.description}
              </p>

              {/* Botón de abrir el modal dentro de la card */}
              <button
                onClick={() => handleOpenModal(achievement.diploma)}
                className="flex justify-center m-auto mt-4 bg-pink-50 text-pink-500 px-4 py-2 rounded-full shadow-lg hover:bg-pink-100 transition-all"
              >
                Ver Diploma
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="p-8 fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="relative bg-pink-50 rounded-xl shadow-2xl max-w-md w-full p-8">
            {/* Botón de cerrar dentro de la card */}
            <button
              onClick={handleCloseModal}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            {currentDiploma && (
              <img
                src={currentDiploma}
                alt="Diploma"
                className="flex justify-center items-center m-auto w-[370px] h-auto rounded-lg"
              />
            )}
          </div>
        </div>
      )}
    </section>
  );
}
