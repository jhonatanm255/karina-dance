interface ProductCardProps {
  name: string;
  price: string;
  image: string;
  description: string;
}

export default function ProductCard({
  name,
  price,
  image,
  description,
}: ProductCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105">
      <div className="relative aspect-square">
        <img src={image} alt={name} className="w-full h-full object-cover" />
        <div className="absolute top-2 right-2">
          <span className="bg-pink-400 text-white px-3 py-1 rounded-full">
            {price}
          </span>
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">{name}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        <p className="text-sm text-center text-pink-500 bg-pink-50 border border-pink-500 px-2 py-1 rounded-md italic">
          Disponible para compra directa en la academia
        </p>
      </div>
    </div>
  );
}
