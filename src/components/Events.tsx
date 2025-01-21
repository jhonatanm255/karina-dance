import { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import ScrollReveal from "scrollreveal";
import { Calendar, MapPin, Clock } from "lucide-react";
import { db } from "../lib/firebase";

// Definición del tipo para los eventos
interface Event {
  id: string;
  title: string;
  date: string; // Fecha en formato YYYY-MM-DD
  time: string; // Hora en formato HH:mm
  duration: number; // Duración en horas
  location: string;
  description: string;
}

export default function Events() {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    // Función para obtener los eventos de Firestore
    const fetchEvents = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "events"));
        const fetchedEvents = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Event[];

        // Filtrar y eliminar eventos vencidos
        const currentDate = new Date();
        const validEvents = fetchedEvents.filter((event) => {
          const eventEnd = new Date(`${event.date}T${event.time}`);
          eventEnd.setHours(eventEnd.getHours() + event.duration);
          if (eventEnd < currentDate) {
            // Eliminar evento vencido de Firestore
            deleteDoc(doc(db, "events", event.id));
            return false;
          }
          return true;
        });

        setEvents(validEvents);
      } catch (error) {
        console.error("Error al cargar los eventos:", error);
      }
    };

    fetchEvents();
  }, []);

  useEffect(() => {
    // Configuración de ScrollReveal solo si hay eventos
    if (events.length > 0) {
      const sr = ScrollReveal();
      sr.reveal(".event-card", {
        duration: 1000,
        opacity: 0,
        distance: "20px",
        origin: "bottom",
        delay: 300,
        interval: 200,
      });
    }
  }, [events]);

  const isEventInProgress = (date: string, time: string, duration: number) => {
    const currentDate = new Date();
    const eventStart = new Date(`${date}T${time}`);
    const eventEnd = new Date(eventStart);
    eventEnd.setHours(eventEnd.getHours() + duration);
    return currentDate >= eventStart && currentDate <= eventEnd;
  };

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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.length > 0 ? (
            events.map((event) => (
              <div
                key={event.id}
                className="event-card bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-transform transform hover:scale-105 duration-300"
              >
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                  {isEventInProgress(
                    event.date,
                    event.time,
                    event.duration
                  ) && (
                    <p className="text-green-500 px-4 py-1 bg-green-100 rounded-full inline-block mb-4">
                      En curso...
                    </p>
                  )}
                  <div className="flex items-center text-gray-600 mb-2">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center text-gray-600 mb-2">
                    <Clock className="w-4 h-4 mr-2" />
                    <span>
                      {event.time} - {event.duration}{" "}
                      {event.duration > 1 ? "horas" : "hora"}
                    </span>
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
            <div className="col-span-3 flex justify-center items-center">
              <p className="text-center text-pink-500">
                No hay eventos para mostrar
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
