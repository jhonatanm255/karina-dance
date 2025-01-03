import { Heart, Star, Users } from 'lucide-react';

export default function About() {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">
            Sobre Nuestra Academia
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Más de 10 años formando bailarinas y creando momentos inolvidables
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center p-6 rounded-lg bg-pink-50 hover:bg-pink-100 transition-colors">
            <Heart className="w-12 h-12 text-pink-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Pasión por la Danza</h3>
            <p className="text-gray-600">
              Transmitimos el amor por el arte y la danza a cada una de nuestras alumnas
            </p>
          </div>

          <div className="text-center p-6 rounded-lg bg-pink-50 hover:bg-pink-100 transition-colors">
            <Star className="w-12 h-12 text-pink-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Excelencia</h3>
            <p className="text-gray-600">
              Instructoras certificadas y metodología probada para resultados excepcionales
            </p>
          </div>

          <div className="text-center p-6 rounded-lg bg-pink-50 hover:bg-pink-100 transition-colors">
            <Users className="w-12 h-12 text-pink-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Comunidad</h3>
            <p className="text-gray-600">
              Creamos un ambiente acogedor donde cada alumna puede brillar
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}