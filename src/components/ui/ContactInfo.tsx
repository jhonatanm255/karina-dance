import { Mail, MapPin, Phone } from 'lucide-react';

export function ContactInfo() {
  return (
    <div>
      <h3 className="text-xl font-semibold mb-4 md:justify-start">Contacto</h3>
      <ul className="space-y-2">
        <li className="flex items-center justify-center md:justify-start space-x-2">
          <MapPin className="w-5 h-5 text-pink-300" />
          <span className="text-gray-400">Av. Principal 123, Ciudad</span>
        </li>
        <li className="flex items-center justify-center md:justify-start space-x-2">
          <Phone className="w-5 h-5 text-pink-300" />
          <span className="text-gray-400">+1 234 567 890</span>
        </li>
        <li className="flex items-center justify-center md:justify-start space-x-2">
          <Mail className="w-5 h-5 text-pink-300" />
          <span className="text-gray-400">info@dreamdance.com</span>
        </li>
      </ul>
    </div>
  );
}