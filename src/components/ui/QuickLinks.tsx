import { Users, Store, Shapes, User } from "lucide-react";

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
            href="#class"
            className="flex gap-2 items-center justify-center md:justify-start text-gray-400 hover:text-pink-300 transition-colors"
          >
            <Shapes className="w-5 h-5 text-pink-300" />
            Clases
          </a>
        </li>
        <li>
          <a
            href="#instructor"
            className="flex gap-2 items-center justify-center md:justify-start text-gray-400 hover:text-pink-300 transition-colors"
          >
            <User className="w-5 h-5 text-pink-300" />
            Instructora
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


