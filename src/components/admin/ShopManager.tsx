import React, { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { createClient } from "@supabase/supabase-js";
import { db } from "../../lib/firebase";
import { Plus, Edit2, Trash2, Save, X } from "lucide-react";

const supabase = createClient(
  "https://ntsnljqqodacrqgckmge.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im50c25sanFxb2RhY3JxZ2NrbWdlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY4MTUyMDYsImV4cCI6MjA1MjM5MTIwNn0.IEEIwvOiz58X-dJpdCjkT6OgXOTAf8YJj3BGDeiIW_s"
);

interface Product {
  id: string;
  name: string;
  price: string;
  description: string;
  image: string;
}

export default function ShopManager() {
  const [products, setProducts] = useState<Product[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [newProduct, setNewProduct] = useState<Omit<Product, "id">>({
    name: "",
    price: "",
    description: "",
    image: "",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "products"));
      const loadedProducts = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Product[];
      setProducts(loadedProducts);
    } catch (err) {
      setError("Error al cargar los productos");
      console.error(err);
    }
  };

  const handleImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    productId?: string
  ) => {
    if (!e.target.files?.length) return;

    try {
      const file = e.target.files[0];
      const fileName = `${Date.now()}_${file.name}`;
      const { data, error: uploadError } = await supabase.storage
        .from("store")
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data: publicUrlData } = supabase.storage
        .from("store")
        .getPublicUrl(fileName);

      const url = publicUrlData.publicUrl;

      if (productId) {
        setProducts(
          products.map((p) => (p.id === productId ? { ...p, image: url } : p))
        );
      } else {
        setNewProduct({ ...newProduct, image: url });
      }
    } catch (err) {
      setError("Error al subir la imagen");
      console.error(err);
    }
  };

  const handleAdd = async () => {
    try {
      await addDoc(collection(db, "products"), newProduct);
      setIsAdding(false);
      setNewProduct({
        name: "",
        price: "",
        description: "",
        image: "",
      });
      await loadProducts();
    } catch (err) {
      setError("Error al agregar el producto");
      console.error(err);
    }
  };

  const handleUpdate = async () => {
    if (!editingId) return;

    const productToUpdate = products.find((p) => p.id === editingId);
    if (!productToUpdate) return;

    try {
      // Actualiza el producto con los datos modificados
      await updateDoc(doc(db, "products", editingId), productToUpdate);
      setEditingId(null); // Cierra el modo de edición
      await loadProducts(); // Recarga los productos desde la base de datos
    } catch (err) {
      setError("Error al actualizar el producto");
      console.error(err);
    }
  };

  const handleDelete = async (product: Product) => {
    try {
      await deleteDoc(doc(db, "products", product.id));
      if (product.image) {
        const fileName = product.image.split("/").pop();
        await supabase.storage.from("store").remove([fileName || ""]);
      }
      await loadProducts();
    } catch (err) {
      setError("Error al eliminar el producto");
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      {error && <p className="text-red-500">{error}</p>}

      <p className="mb-4 px-4 text-gray-600 text-sm">
        El tamaño ideal para las imagenes es de 280px de ancho por 285px de alto
      </p>

      <button
        onClick={() => setIsAdding(true)}
        className="flex items-center px-4 py-2 bg-pink-500 text-white rounded-md"
      >
        <Plus className="w-4 h-4 mr-2" />
        Agregar Producto
      </button>

      {isAdding && (
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Nuevo Producto</h3>
            <button onClick={() => setIsAdding(false)}>
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Nombre del producto"
              value={newProduct.name}
              onChange={(e) =>
                setNewProduct({ ...newProduct, name: e.target.value })
              }
              className="w-full p-2 border rounded"
            />
            <input
              type="text"
              placeholder="Precio"
              value={newProduct.price}
              onChange={(e) =>
                setNewProduct({ ...newProduct, price: e.target.value })
              }
              className="w-full p-2 border rounded"
            />
            <textarea
              placeholder="Descripción"
              value={newProduct.description}
              onChange={(e) =>
                setNewProduct({ ...newProduct, description: e.target.value })
              }
              className="w-full p-2 border rounded"
              rows={3}
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-pink-50 file:text-pink-700
              hover:file:bg-pink-100"
            />
            <button
              onClick={handleAdd}
              className="w-full px-4 py-2 bg-pink-500 text-white rounded-md"
            >
              Agregar Producto
            </button>
          </div>
        </div>
      )}

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow-sm overflow-hidden"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover"
            />
            {editingId === product.id ? (
              <div className="p-4 space-y-4">
                <input
                  type="text"
                  value={product.name}
                  onChange={(e) => {
                    const updatedProduct = { ...product, name: e.target.value };
                    setProducts(
                      products.map((p) =>
                        p.id === product.id ? updatedProduct : p
                      )
                    );
                  }}
                  className="w-full p-2 border rounded"
                />
                <input
                  type="text"
                  value={product.price}
                  onChange={(e) => {
                    const updatedProduct = {
                      ...product,
                      price: e.target.value,
                    };
                    setProducts(
                      products.map((p) =>
                        p.id === product.id ? updatedProduct : p
                      )
                    );
                  }}
                  className="w-full p-2 border rounded"
                />
                <textarea
                  value={product.description}
                  onChange={(e) => {
                    const updatedProduct = {
                      ...product,
                      description: e.target.value,
                    };
                    setProducts(
                      products.map((p) =>
                        p.id === product.id ? updatedProduct : p
                      )
                    );
                  }}
                  className="w-full p-2 border rounded"
                  rows={3}
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, product.id)}
                  className="w-full"
                />
                <button
                  onClick={handleUpdate}
                  className="w-full px-4 py-2 bg-pink-500 text-white rounded-md"
                >
                  Guardar Cambios
                </button>
              </div>
            ) : (
              <div className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{product.name}</h3>
                    <p className="text-lg font-bold text-pink-500">
                      {product.price}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setEditingId(product.id)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <Edit2 className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(product)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                <p className="mt-2 text-gray-600">{product.description}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
