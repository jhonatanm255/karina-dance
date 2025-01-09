import { useEffect } from "react";
import ScrollReveal from "scrollreveal";
import { Calendar, MapPin } from "lucide-react";

export default function Events() {
  const events = [
    {
      title: "Recital de Fin de Año",
      date: "15 de Diciembre, 2024",
      location: "Teatro Municipal",
      description:
        "Gran presentación de todas nuestras alumnas mostrando lo aprendido durante el año.",
    },
    {
      title: "Workshop de Verano",
      date: "5-10 de Enero, 2024",
      location: "Academia DreamDance",
      description:
        "Intensivo de verano con profesores invitados internacionales.",
    },
    {
      title: "Competencia Regional",
      date: "20 de Marzo, 2024",
      location: "Centro de Convenciones",
      description:
        "Participación en la competencia regional de danza contemporánea.",
    },
  ];

  useEffect(() => {
    const sr = ScrollReveal();

    // Animación para los eventos
    sr.reveal(".event-card", {
      duration: 1000,
      opacity: 0,
      distance: "20px",
      origin: "bottom",
      delay: 300,
      interval: 200, // Para que cada tarjeta aparezca en intervalos
    });
  }, []);

  return (
    <section id="events" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">
            Próximos Eventos
          </h2>
          <p className="text-lg text-gray-600">
            No te pierdas nuestras presentaciones y actividades especiales
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {events.map((event, index) => (
            <div
              key={index}
              className="event-card bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow transform hover:scale-105"
            >
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                <div className="flex items-center text-gray-600 mb-2">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center text-gray-600 mb-4">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span>{event.location}</span>
                </div>
                <p className="text-gray-600">{event.description}</p>
                <button className="mt-4 w-full bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-600 transition-colors">
                  Más Información
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
