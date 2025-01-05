
import { Check } from "lucide-react";

interface PriceCardProps {
  name: string;
  price: string;
  features: string[];
  popular?: boolean;
}

export default function PriceCard({
  name,
  price,
  features,
  popular,
}: PriceCardProps) {
  return (
    <div
      className={`
      relative bg-white rounded-2xl shadow-lg p-8
      transform transition-all duration-300 hover:scale-105
      ${popular ? "border-2 border-pink-400" : ""}
    `}
    >
      {popular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <span className="bg-pink-400 text-white px-4 py-1 rounded-full text-sm">
            Más Popular
          </span>
        </div>
      )}
      <h3 className="text-2xl font-bold text-gray-900 mb-4">{name}</h3>
      <div className="mb-6">
        <span className="text-4xl font-bold">{price}</span>
        <span className="text-gray-600">/mes</span>
      </div>
      <ul className="space-y-4 mb-8">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center text-gray-600">
            <Check className="w-5 h-5 text-pink-400 mr-2" />
            {feature}
          </li>
        ))}
      </ul>
      <button
        onClick={() => console.log("Inscripción:", name)}
        className="w-full bg-pink-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-pink-600 transition-colors"
      >
        Inscríbete Ahora
      </button>
    </div>
  );
}
