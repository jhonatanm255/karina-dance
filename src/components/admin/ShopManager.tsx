import React, { useState, useEffect } from 'react';
import { 
  collection, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc 
} from 'firebase/firestore';
import { 
  ref, 
  uploadBytes, 
  getDownloadURL, 
  deleteObject 
} from 'firebase/storage';
import { db, storage } from '../../lib/firebase';
import { Plus, Edit2, Trash2, Save, X } from 'lucide-react';

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
  const [newProduct, setNewProduct] = useState<Omit<Product, 'id'>>({
    name: '',
    price: '',
    description: '',
    image: ''
  });
  const [error, setError] = useState('');

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'products'));
      const loadedProducts = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Product[];
      setProducts(loadedProducts);
    } catch (err) {
      setError('Error al cargar los productos');
      console.error(err);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, productId?: string) => {
    if (!e.target.files?.length) return;

    try {
      const file = e.target.files[0];
      const storageRef = ref(storage, `products/${Date.now()}_${file.name}`);
      
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      
      if (productId) {
        setProducts(products.map(p => 
          p.id === productId ? { ...p, image: url } : p
        ));
      } else {
        setNewProduct({ ...newProduct, image: url });
      }
    } catch (err) {
      setError('Error al subir la imagen');
      console.error(err);
    }
  };

  const handleAdd = async () => {
    try {
      await addDoc(collection(db, 'products'), newProduct);
      setIsAdding(false);
      setNewProduct({
        name: '',
        price: '',
        description: '',
        image: ''
      });
      await loadProducts();
    } catch (err) {
      setError('Error al agregar el producto');
      console.error(err);
    }
  };

  const handleUpdate = async (product: Product) => {
    try {
      await updateDoc(doc(db, 'products', product.id), product);
      setEditingId(null);
      await loadProducts();
    } catch (err) {
      setError('Error al actualizar el producto');
      console.error(err);
    }
  };

  const handleDelete = async (product: Product) => {
    try {
      await deleteDoc(doc(db, 'products', product.id));
      if (product.image) {
        const storageRef = ref(storage, product.image);
        await deleteObject(storageRef);
      }
      await loadProducts();
    } catch (err) {
      setError('Error al eliminar el producto');
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      {error && <p className="text-red-500">{error}</p>}
      
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
              onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
              className="w-full p-2 border rounded"
            />
            <input
              type="text"
              placeholder="Precio"
              value={newProduct.price}
              onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
              className="w-full p-2 border rounded"
            />
            <textarea
              placeholder="Descripción"
              value={newProduct.description}
              onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
              className="w-full p-2 border rounded"
              rows={3}
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="w-full"
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
          <div key={product.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
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
                  onChange={(e) => setProducts(products.map(p => 
                    p.id === product.id ? { ...p, name: e.target.value } : p
                  ))}
                  className="w-full p-2 border rounded"
                />
                <input
                  type="text"
                  value={product.price}
                  onChange={(e) => setProducts(products.map(p => 
                    p.id === product.id ? { ...p, price: e.target.value } : p
                  ))}
                  className="w-full p-2 border rounded"
                />
                <textarea
                  value={product.description}
                  onChange={(e) => setProducts(products.map(p => 
                    p.id === product.id ? { ...p, description: e.target.value } : p
                  ))}
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
                  onClick={() => handleUpdate(product)}
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
                    <p className="text-lg font-bold text-pink-500">{product.price}</p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setEditingId(product.id)}
                      className="text-gray-500 hover:text-pink-500"
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