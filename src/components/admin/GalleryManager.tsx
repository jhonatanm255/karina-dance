import React, { useState, useEffect } from "react";
import { Trash2 } from "lucide-react";
import supabase from "../../lib/supabase";

interface GalleryImage {
  id: string;
  url: string;
  alt: string;
}

export default function GalleryManager() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    loadImages();
  }, []);

  const loadImages = async () => {
    try {
      const { data: files, error: listError } = await supabase.storage
        .from("gallery")
        .list();
      if (listError) throw listError;

      const imageUrls = await Promise.all(
        files.map(async (file) => {
          const { data, error: urlError } = supabase.storage
            .from("gallery")
            .getPublicUrl(file.name);

          if (urlError) throw urlError;

          return {
            id: file.name,
            url: data.publicUrl, // Aquí se corrige el acceso a la URL pública
            alt: file.name,
          };
        })
      );

      setImages(imageUrls);
    } catch (err) {
      setError("Error al cargar las imágenes");
      console.error(err);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;

    setUploading(true);
    setError("");

    try {
      const file = e.target.files[0];
      const fileName = `${Date.now()}_${file.name}`;

      const { error: uploadError } = await supabase.storage
        .from("gallery")
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      await loadImages(); // Recargar las imágenes después de subir
    } catch (err) {
      setError("Error al subir la imagen");
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (image: GalleryImage) => {
    try {
      const { error: deleteError } = await supabase.storage
        .from("gallery")
        .remove([image.id]);

      if (deleteError) throw deleteError;

      setImages(images.filter((img) => img.id !== image.id)); // Actualizar el estado local
    } catch (err) {
      setError("Error al eliminar la imagen");
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-medium mb-4">Subir Nueva Imagen</h3>
        <label className="block">
          <span className="sr-only">Seleccionar imagen</span>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            disabled={uploading}
            className="block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-pink-50 file:text-pink-700
              hover:file:bg-pink-100"
          />
        </label>
        {uploading && <p className="text-sm text-gray-500 mt-2">Subiendo...</p>}
        {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((image) => (
          <div key={image.id} className="relative group">
            <img
              src={image.url}
              alt={image.alt}
              className="w-full h-48 object-cover rounded-lg"
            />
            <button
              onClick={() => handleDelete(image)}
              className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

