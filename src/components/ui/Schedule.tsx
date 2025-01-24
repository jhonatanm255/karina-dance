import { Clock9, X } from "lucide-react";

export function Schedule() {
  return (
    <div>
      <h3 className="text-xl text-center md:text-start font-semibold mb-4">
        Horario
      </h3>
      <ul className="space-y-2 text-gray-400">
        <li className="flex items-center justify-center md:justify-start gap-2">
          <Clock9 className="w-5 h-5 text-pink-300" />
          Lunes - Jueves: 4:30 - 07:00
        </li>
        <li className="flex items-center justify-center md:justify-start gap-2">
          <X className="w-5 h-5 text-pink-300" />
          Sábado y Domingo: Cerrado
        </li>
        {/* <li className="flex items-center justify-center md:justify-start gap-2">
          <X className="w-5 h-5 text-pink-300" />
          Domingo: Cerrado
        </li> */}
      </ul>
    </div>
  );
}
