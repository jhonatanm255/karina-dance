import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../lib/firebase"; // Asegúrate de que el archivo Firebase esté configurado correctamente.

interface Product {
  id: string;
  name: string;
  price: string;
  image: string;
  description: string;
}

export default function Merchandise() {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "products"));
      const loadedProducts = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          name: data.name,
          price: data.price,
          description: data.description,
          image: data.image || "", // Asegúrate de que la imagen esté presente
        } as Product;
      });
      setProducts(loadedProducts);
    } catch (err) {
      setError("No se pudieron cargar los productos. Inténtalo más tarde.");
      console.error("Error al cargar productos:", err);
    }
  };

  // Función para verificar si la URL de la imagen es válida
  const isValidUrl = (url: string) => {
    try {
      new URL(url); // Esto lanzará un error si la URL no es válida
      return true;
    } catch (e) {
      return false;
    }
  };

  return (
    <section id="merchandise" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">
            Tienda Karina Gym
          </h2>
          <p className="text-lg text-gray-600">
            Equipo y accesorios de alta calidad para bailarines
          </p>
        </div>

        {error && <p className="text-center text-red-500 mb-8">{error}</p>}

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              // price={product.price}
              description={product.description}
              image={
                isValidUrl(product.image)
                  ? product.image
                  : "/path/to/default-image.jpg"
              } // Verificar la URL de la imagen
            />
          ))}
        </div>
      </div>
    </section>
  );
}
