import ProductCard from "./ProductCard";

const products = [
  {
    name: "Leotardo Clásico",
    price: "$39.99",
    image:
      "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&q=80",
    description: "Leotardo profesional de alta calidad para ballet clásico.",
  },
  {
    name: "Zapatillas de Punta",
    price: "$89.99",
    image:
      "https://images.unsplash.com/photo-1554062614-6da4fa67725a?auto=format&fit=crop&q=80",
    description: "Zapatillas de punta profesionales con soporte reforzado.",
  },
  {
    name: "Kit de Práctica",
    price: "$129.99",
    image:
      "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&q=80",
    description: "Kit completo con todo lo necesario para tus clases.",
  },
  {
    name: "Bolso DreamDance",
    price: "$49.99",
    image:
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&q=80",
    description: "Bolso espacioso y elegante con el logo de la academia.",
  },
];

export default function Merchandise() {
  return (
    <section id="merchandise" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">
            Tienda Karina Dance
          </h2>
          <p className="text-lg text-gray-600">
            Equipo y accesorios de alta calidad para bailarines
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <ProductCard key={index} {...product} />
          ))}
        </div>
      </div>
    </section>
  );
}
