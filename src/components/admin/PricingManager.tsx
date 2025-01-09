import React, { useState, useEffect } from 'react';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { Edit2, Save, Plus, Trash } from 'lucide-react';

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
  const [error, setError] = useState('');

  useEffect(() => {
    loadPlans();
  }, []);

  const loadPlans = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'plans'));
      const loadedPlans = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Plan[];
      setPlans(loadedPlans);
    } catch (err) {
      setError('Error al cargar los planes');
      console.error(err);
    }
  };

  const handleEdit = (plan: Plan) => {
    setEditingId(plan.id);
  };

  const handleSave = async (plan: Plan) => {
    try {
      await updateDoc(doc(db, 'plans', plan.id), plan);
      setEditingId(null);
      await loadPlans();
    } catch (err) {
      setError('Error al guardar los cambios');
      console.error(err);
    }
  };

  const handleFeatureAdd = (planId: string) => {
    setPlans(plans.map(plan => {
      if (plan.id === planId) {
        return {
          ...plan,
          features: [...plan.features, '']
        };
      }
      return plan;
    }));
  };

  const handleFeatureDelete = (planId: string, index: number) => {
    setPlans(plans.map(plan => {
      if (plan.id === planId) {
        const features = [...plan.features];
        features.splice(index, 1);
        return { ...plan, features };
      }
      return plan;
    }));
  };

  return (
    <div className="space-y-6">
      {error && <p className="text-red-500">{error}</p>}
      
      <div className="grid md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <div key={plan.id} className="bg-white p-6 rounded-lg shadow-sm">
            {editingId === plan.id ? (
              <div className="space-y-4">
                <input
                  type="text"
                  value={plan.name}
                  onChange={(e) => setPlans(plans.map(p => 
                    p.id === plan.id ? { ...p, name: e.target.value } : p
                  ))}
                  className="w-full p-2 border rounded"
                />
                <input
                  type="text"
                  value={plan.price}
                  onChange={(e) => setPlans(plans.map(p => 
                    p.id === plan.id ? { ...p, price: e.target.value } : p
                  ))}
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
                          setPlans(plans.map(p => 
                            p.id === plan.id ? { ...p, features: newFeatures } : p
                          ));
                        }}
                        className="flex-1 p-2 border rounded"
                      />
                      <button
                        onClick={() => handleFeatureDelete(plan.id, index)}
                        className="text-red-500"
                      >
                        <Trash className="w-4 h-4" />
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
                  <button
                    onClick={() => handleEdit(plan)}
                    className="text-gray-500 hover:text-pink-500"
                  >
                    <Edit2 className="w-5 h-5" />
                  </button>
                </div>
                <ul className="mt-4 space-y-2">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-gray-600">
                      <span className="w-2 h-2 bg-pink-500 rounded-full mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}