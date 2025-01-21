import { useEffect } from "react";
import ScrollReveal from "scrollreveal";
import { Award, BookOpen, Heart } from "lucide-react";
import profesora from "../assets/gallery-img/instructora.jpeg";

export default function Instructor() {
  useEffect(() => {
    const sr = ScrollReveal();

    // Configuración de efectos más sutiles
    sr.reveal("#instructor-section", {
      duration: 1500,
      distance: "40px",
      origin: "bottom",
      opacity: 0,
      interval: 100,
    });

    sr.reveal("#instructor-image", {
      duration: 2500,
      distance: "30px",
      origin: "bottom",
      opacity: 0,
    });
  }, []);

  return (
    <section
      id="instructor"
      className="py-20 bg-gradient-to-b from-white to-pink-50"
    >
      <div
        id="instructor-section"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <img
              id="instructor-image"
              src={profesora}
              alt="Directora María Fernández"
              className="rounded-lg shadow-xl w-full h-[500px] object-cover"
            />
            <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-lg shadow-lg">
              <div className="flex items-center space-x-2">
                <Award className="w-6 h-6 text-pink-300" />
                <span className="text-sm font-medium">
                  30+ años de experiencia
                </span>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Conoce a Nuestra Directora
            </h2>
            <h3 className="text-xl text-pink-400 mb-4">Lic. Karina Gutiérrez García</h3>
            <p className="text-gray-600 mb-6">
              Con más de 30 años de experiencia impartiendo clases de danza Jazz, Danza Árabe y actualmente Acrodance y Danza Aérea. Promotora cultural de danza contemporánea. Ganadora de diversos premios en concursos de baile a nivel nacional como intercolegial de televisa, carnaval de Vhsa. Javo producciones. <br />Organización de festivales de danza. Montaje escénicos para colegios. Organización de cursos de capacitación en materia de danza. Montaje de Vals de XV años, coreografías para bodas, entre otros. Logistica en ferias y eventos particulares. Organizacion de concursos de baile y rondas infantiles. Capacitadora en formacion dancística.
            </p>

            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <BookOpen className="w-6 h-6 text-pink-300 mt-1" />
                <div>
                  <h4 className="font-semibold">Formación Internacional</h4>
                  <p className="text-gray-600">
                    Arabian Dance School
                  </p>
                  <p className="text-gray-600">Maestra certificada en Danzas árabes</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Award className="w-6 h-6 text-pink-300 mt-1" />
                <div>
                  <h4 className="font-semibold">Certificaciones</h4>
                  <p className="text-gray-600">Certificada en Método RAD</p>
                  <p className="text-gray-600">
                    Especialista en Danza Contemporánea
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Heart className="w-6 h-6 text-pink-300 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold">Filosofía de Enseñanza</h4>
                  <p className="text-gray-600">
                    "Cada alumna es única y merece una atención personalizada
                    para desarrollar su máximo potencial artístico y personal."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
