import { signOut } from "firebase/auth";
import { auth } from "../../lib/firebase";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import GalleryManager from "./GalleryManager";
import TestimonialsManager from "./TestimonialsManager";
import PricingManager from "./PricingManager";
import ShopManager from "./ShopManager";
import EventsManager from "./EventsManager";
import { useNavigate } from "react-router-dom";

export default function AdminPanel() {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut(auth); // Cierra la sesión de Firebase
      navigate("/");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <h1 className="text-xl font-semibold text-gray-900">
              Panel Administrativo
            </h1>
            <button
              onClick={handleSignOut}
              className="text-sm text-gray-600 hover:text-pink-500"
            >
              Cerrar Sesión
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <Tabs defaultValue="gallery">
          <TabsList>
            <TabsTrigger value="gallery">Galería</TabsTrigger>
            <TabsTrigger value="testimonials">Testimonios</TabsTrigger>
            <TabsTrigger value="pricing">Planes y Precios</TabsTrigger>
            <TabsTrigger value="shop">Tienda</TabsTrigger>
            <TabsTrigger value="events">Eventos</TabsTrigger>
          </TabsList>

          <TabsContent value="gallery">
            <GalleryManager />
          </TabsContent>
          <TabsContent value="testimonials">
            <TestimonialsManager />
          </TabsContent>
          <TabsContent value="pricing">
            <PricingManager />
          </TabsContent>
          <TabsContent value="shop">
            <ShopManager />
          </TabsContent>
          <TabsContent value="events">
            <EventsManager />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
