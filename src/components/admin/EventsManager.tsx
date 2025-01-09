import React, { useState, useEffect } from 'react';
import { 
  collection, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc 
} from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { Calendar, Clock, MapPin, Plus, Edit2, Trash2, Save, X } from 'lucide-react';

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
}

export default function EventsManager() {
  const [events, setEvents] = useState<Event[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [newEvent, setNewEvent] = useState<Omit<Event, 'id'>>({
    title: '',
    date: '',
    time: '',
    location: '',
    description: ''
  });
  const [error, setError] = useState('');

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'events'));
      const loadedEvents = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Event[];
      setEvents(loadedEvents);
    } catch (err) {
      setError('Error al cargar los eventos');
      console.error(err);
    }
  };

  const handleAdd = async () => {
    try {
      await addDoc(collection(db, 'events'), newEvent);
      setIsAdding(false);
      setNewEvent({
        title: '',
        date: '',
        time: '',
        location: '',
        description: ''
      });
      await loadEvents();
    } catch (err) {
      setError('Error al agregar el evento');
      console.error(err);
    }
  };

  const handleUpdate = async (event: Event) => {
    try {
      await updateDoc(doc(db, 'events', event.id), event);
      setEditingId(null);
      await loadEvents();
    } catch (err) {
      setError('Error al actualizar el evento');
      console.error(err);
    }
  };

  const handleDelete = async (eventId: string) => {
    try {
      await deleteDoc(doc(db, 'events', eventId));
      await loadEvents();
    } catch (err) {
      setError('Error al eliminar el evento');
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      {error && <p className="text-red-500">{error}</p>}
      
      <button
        onClick={() => setIsAdding(true)}
        className="flex items-center px-4 py-2 bg-pink-500 text-white rounded-md"
      >
        <Plus className="w-4 h-4 mr-2" />
        Agregar Evento
      </button>

      {isAdding && (
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Nuevo Evento</h3>
            <button onClick={() => setIsAdding(false)}>
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Título del evento"
              value={newEvent.title}
              onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
              className="w-full p-2 border rounded"
            />
            <div className="grid grid-cols-2 gap-4">
              <input
                type="date"
                value={newEvent.date}
                onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                className="w-full p-2 border rounded"
              />
              <input
                type="time"
                value={newEvent.time}
                onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                className="w-full p-2 border rounded"
              />
            </div>
            <input
              type="text"
              placeholder="Ubicación"
              value={newEvent.location}
              onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
              className="w-full p-2 border rounded"
            />
            <textarea
              placeholder="Descripción"
              value={newEvent.description}
              onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
              className="w-full p-2 border rounded"
              rows={3}
            />
            <button
              onClick={handleAdd}
              className="w-full px-4 py-2 bg-pink-500 text-white rounded-md"
            >
              Agregar Evento
            </button>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {events.map((event) => (
          <div key={event.id} className="bg-white p-6 rounded-lg shadow-sm">
            {editingId === event.id ? (
              <div className="space-y-4">
                <input
                  type="text"
                  value={event.title}
                  onChange={(e) => setEvents(events.map(ev => 
                    ev.id === event.id ? { ...ev, title: e.target.value } : ev
                  ))}
                  className="w-full p-2 border rounded"
                />
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="date"
                    value={event.date}
                    onChange={(e) => setEvents(events.map(ev => 
                      ev.id === event.id ? { ...ev, date: e.target.value } : ev
                    ))}
                    className="w-full p-2 border rounded"
                  />
                  <input
                    type="time"
                    value={event.time}
                    onChange={(e) => setEvents(events.map(ev => 
                      ev.id === event.id ? { ...ev, time: e.target.value } : ev
                    ))}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <input
                  type="text"
                  value={event.location}
                  onChange={(e) => setEvents(events.map(ev => 
                    ev.id === event.id ? { ...ev, location: e.target.value } : ev
                  ))}
                  className="w-full p-2 border rounded"
                />
                <textarea
                  value={event.description}
                  onChange={(e) => setEvents(events.map(ev => 
                    ev.id === event.id ? { ...ev, description: e.target.value } : ev
                  ))}
                  className="w-full p-2 border rounded"
                  rows={3}
                />
                <button
                  onClick={() => handleUpdate(event)}
                  className="w-full px-4 py-2 bg-pink-500 text-white rounded-md"
                >
                  Guardar Cambios
                </button>
              </div>
            ) : (
              <div>
                <div className="flex justify-between items-start">
                  <h3 className="text-xl font-medium">{event.title}</h3>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setEditingId(event.id)}
                      className="text-gray-500 hover:text-pink-500"
                    >
                      <Edit2 className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(event.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                <div className="mt-4 space-y-2 text-gray-600">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    {event.date}
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-2" />
                    {event.time}
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-2" />
                    {event.location}
                  </div>
                </div>
                <p className="mt-4 text-gray-600">{event.description}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}