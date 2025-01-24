import { Mail, MapPin, Phone } from "lucide-react";

export function ContactInfo() {
  return (
    <div>
      <h3 className="text-xl font-semibold mb-4 md:justify-start">Contacto</h3>
      <ul className="space-y-2">
        <li className="flex items-start justify-center md:justify-start space-x-2">
          <MapPin className="w-5 h-5 text-pink-300 flex-shrink-0" />
          <span className="text-gray-400">
            Flor de Verónica 102, Col. Las Gaviotas <br />
            (entrada fracc. Rinconada <br />
            casi esq. con malecón)
          </span>
        </li>
        <li className="flex items-center justify-center md:justify-start space-x-2">
          <Phone className="w-5 h-5 text-pink-300 flex-shrink-0" />
          <span className="text-gray-400">9932-12-85-76</span>
        </li>
        <li className="flex items-center justify-center md:justify-start space-x-2">
          <Mail className="w-5 h-5 text-pink-300 flex-shrink-0" />
          <span className="text-gray-400">danzakarinagym@hotmail.com</span>
        </li>
      </ul>
    </div>
  );
}
