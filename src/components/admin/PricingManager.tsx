import { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  addDoc,
  setDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../lib/firebase";
import { Edit2, Save, Plus, Trash2 } from "lucide-react";

interface Plan {
  id: string;
  name: string;
  price: string;
  features: string[];
  popular?: boolean;
}

export default function PricingManager() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [newPlan, setNewPlan] = useState<Plan>({
    id: "",
    name: "",
    price: "",
    features: [""],
  });

  useEffect(() => {
    loadPlans();
  }, []);

  const loadPlans = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "plans"));
      const loadedPlans = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Plan[];
      setPlans(loadedPlans);
    } catch (err) {
      setError("Error al cargar los planes");
      console.error(err);
    }
  };

  const handleEdit = (plan: Plan) => {
    setEditingId(plan.id);
  };

  const handleSave = async (plan: Plan) => {
    try {
      if (!plan.id) {
        setError("ID del plan no válido");
        return;
      }

      const updatedPlan = { ...plan };

      // Elimina cualquier campo con valor `undefined`
      Object.keys(updatedPlan).forEach((key) => {
        if (updatedPlan[key as keyof Plan] === undefined) {
          delete updatedPlan[key as keyof Plan];
        }
      });

      await updateDoc(doc(db, "plans", plan.id), updatedPlan);
      setEditingId(null);
      await loadPlans();
    } catch (err) {
      setError("Error al guardar los cambios");
      console.error(err);
    }
  };


  const handleDelete = async (planId: string) => {
    try {
      await deleteDoc(doc(db, "plans", planId));
      await loadPlans();
    } catch (err) {
      setError("Error al eliminar el plan");
      console.error(err);
    }
  };

  const handleFeatureAdd = (planId: string) => {
    setPlans(
      plans.map((plan) => {
        if (plan.id === planId) {
          return {
            ...plan,
            features: [...plan.features, ""],
          };
        }
        return plan;
      })
    );
  };

  const handleFeatureDelete = (planId: string, index: number) => {
    setPlans(
      plans.map((plan) => {
        if (plan.id === planId) {
          const features = [...plan.features];
          features.splice(index, 1);
          return { ...plan, features };
        }
        return plan;
      })
    );
  };

  const handlePopularToggle = async (planId: string) => {
    try {
      setPlans((prevPlans) =>
        prevPlans.map((plan) => {
          if (plan.id === planId) {
            const updatedPlan = { ...plan, popular: !plan.popular };
            // Actualizar en Firestore
            updateDoc(doc(db, "plans", planId), updatedPlan);
            return updatedPlan;
          }
          return plan;
        })
      );
    } catch (err) {
      setError("Error al actualizar el estado de popularidad");
      console.error(err);
    }
  };

  const handleCreatePlan = async () => {
    try {
      const plansCollection = collection(db, "plans");
      const docRef = doc(plansCollection);

      const newPlanWithId = {
        ...newPlan,
        id: docRef.id,
        popular: newPlan.popular || false, // Asegura un valor booleano
      };

      await setDoc(docRef, newPlanWithId);
      setNewPlan({
        id: "",
        name: "",
        price: "",
        features: [""],
        popular: false,
      });
      await loadPlans();
    } catch (err) {
      setError("Error al crear el plan");
      console.error(err);
    }
  };



  return (
    <div className="space-y-6">
      {error && <p className="text-red-500">{error}</p>}
      <div className="grid md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`bg-white p-6 rounded-lg shadow-sm ${
              plan.popular ? "border border-pink-500" : ""
            }`}
          >
            {editingId === plan.id ? (
              <div className="space-y-4">
                <input
                  type="text"
                  value={plan.name}
                  onChange={(e) =>
                    setPlans(
                      plans.map((p) =>
                        p.id === plan.id ? { ...p, name: e.target.value } : p
                      )
                    )
                  }
                  className="w-full p-2 border rounded"
                />
                <input
                  type="text"
                  value={plan.price}
                  onChange={(e) =>
                    setPlans(
                      plans.map((p) =>
                        p.id === plan.id ? { ...p, price: e.target.value } : p
                      )
                    )
                  }
                  className="w-full p-2 border rounded"
                />
                <div className="space-y-2">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={feature}
                        onChange={(e) => {
                          const newFeatures = [...plan.features];
                          newFeatures[index] = e.target.value;
                          setPlans(
                            plans.map((p) =>
                              p.id === plan.id
                                ? { ...p, features: newFeatures }
                                : p
                            )
                          );
                        }}
                        className="flex-1 p-2 border rounded"
                      />
                      <button
                        onClick={() => handleFeatureDelete(plan.id, index)}
                        className="text-red-500"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={() => handleFeatureAdd(plan.id)}
                    className="flex items-center text-pink-500"
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Agregar característica
                  </button>
                </div>
                <button
                  onClick={() => handleSave(plan)}
                  className="flex items-center px-4 py-2 bg-pink-500 text-white rounded-md"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Guardar
                </button>
              </div>
            ) : (
              <div>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-semibold">{plan.name}</h3>
                    <p className="text-2xl font-bold mt-2">{plan.price}</p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(plan)}
                      className="text-gray-500"
                    >
                      <Edit2 className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(plan.id)}
                      className="text-red-500"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                <ul className="mt-4 space-y-2">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-gray-600">
                      <span className="w-2 h-2 bg-pink-500 rounded-full mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <div className="mt-4 flex justify-between items-center">
                  <button
                    onClick={() => handlePopularToggle(plan.id)}
                    className={`${
                      plan.popular
                        ? "text-red-500 bg-red-50 py-1 px-4 rounded-full"
                        : "text-green-500 bg-green-50 py-1 px-4 rounded-full"
                    }`}
                  >
                    {plan.popular
                      ? "Desmarcar como popular"
                      : "Marcar como popular"}
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="mt-8">
        <h3 className="text-xl font-semibold">Crear un nuevo plan</h3>
        <input
          type="text"
          placeholder="Nombre del plan"
          value={newPlan.name}
          onChange={(e) => setNewPlan({ ...newPlan, name: e.target.value })}
          className="w-full p-2 mt-2 border rounded"
        />
        <input
          type="text"
          placeholder="Precio"
          value={newPlan.price}
          onChange={(e) => setNewPlan({ ...newPlan, price: e.target.value })}
          className="w-full p-2 mt-2 border rounded"
        />
        <button
          onClick={handleCreatePlan}
          className="mt-4 px-4 py-2 bg-pink-500 text-white rounded-md"
        >
          Crear plan
        </button>
      </div>
    </div>
  );
}
