import { useState, useEffect } from 'react';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { Trash2, Star } from 'lucide-react';

interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  avatar: string;
}

export default function TestimonialsManager() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    loadTestimonials();
  }, []);

  const loadTestimonials = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'testimonials'));
      const loadedTestimonials = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Testimonial[];
      setTestimonials(loadedTestimonials);
    } catch (err) {
      setError('Error al cargar los testimonios');
      console.error(err);
    }
  };

  const handleDelete = async (testimonialId: string) => {
    try {
      await deleteDoc(doc(db, 'testimonials', testimonialId));
      await loadTestimonials();
    } catch (err) {
      setError('Error al eliminar el testimonio');
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      {error && <p className="text-red-500">{error}</p>}
      
      <div className="grid gap-6">
        {testimonials.map((testimonial) => (
          <div key={testimonial.id} className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-4">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <h3 className="font-medium">{testimonial.name}</h3>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
              <button
                onClick={() => handleDelete(testimonial.id)}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
            <div className="mt-4">
              <div className="flex mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600">{testimonial.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}