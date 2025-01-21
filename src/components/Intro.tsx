import { useEffect, useState } from "react";
import Ballerina from "../assets/ballerina-2.mp4";

export default function Intro() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black">
      <video
        autoPlay
        muted
        playsInline
        className="w-full h-full object-cover opacity-50"
      >
        <source src={Ballerina} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mt-4">
            Academia de Danza Karina Gym
          </h1>
        </div>
      </div>
    </div>
  );
}




