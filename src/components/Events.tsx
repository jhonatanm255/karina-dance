import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import ScrollReveal from "scrollreveal";
import { Calendar, MapPin } from "lucide-react";
import { db } from "../lib/firebase";

// Definición del tipo para los eventos
interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
  description: string;
}

export default function Events() {
  const [events, setEvents] = useState<Event[]>([]); // Usamos el tipo definido

  useEffect(() => {
    // Función para obtener los eventos de Firestore
    const fetchEvents = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "events"));
        const fetchedEvents = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Event[]; // Aseguramos el tipado aquí
        setEvents(fetchedEvents);
      } catch (error) {
        console.error("Error al cargar los eventos:", error);
      }
    };

    fetchEvents();

    // Configuración de ScrollReveal
    const sr = ScrollReveal();
    sr.reveal(".event-card", {
      duration: 1000,
      opacity: 0,
      distance: "20px",
      origin: "bottom",
      delay: 300,
      interval: 200,
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
          {events.length > 0 ? (
            events.map((event) => (
              <div
                key={event.id}
                className="event-card bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-transform transform hover:scale-105 duration-300"
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
            ))
          ) : (
            <p className="text-center text-pink-500">
              No hay eventos para mostrar
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
