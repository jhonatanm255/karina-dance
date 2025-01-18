import { Users, Store, CalendarSearch, NotepadText } from "lucide-react";

export function QuickLinks() {
  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">Enlaces Rápidos</h3>
      <ul className="space-y-2">
        <li>
          <a
            href="#about"
            className="flex gap-2 items-center justify-center md:justify-start text-gray-400 hover:text-pink-300 transition-colors"
          >
            <Users className="w-5 h-5 text-pink-300" />
            Sobre Nosotros
          </a>
        </li>
        <li>
          <a
            href="#events"
            className="flex gap-2 items-center justify-center md:justify-start text-gray-400 hover:text-pink-300 transition-colors"
          >
            <CalendarSearch className="w-5 h-5 text-pink-300" />
            Eventos
          </a>
        </li>
        <li>
          <a
            href="#pricing"
            className="flex gap-2 items-center justify-center md:justify-start text-gray-400 hover:text-pink-300 transition-colors"
          >
            <NotepadText className="w-5 h-5 text-pink-300" />
            Planes
          </a>
        </li>
        <li>
          <a
            href="#merchandise"
            className="flex gap-2 items-center justify-center md:justify-start text-gray-400 hover:text-pink-300 transition-colors"
          >
            <Store className="w-5 h-5 text-pink-300" />
            Tienda
          </a>
        </li>
      </ul>
    </div>
  );
}


