import React, { useState, useEffect } from "react";

interface WhatsAppButtonProps {
  phoneNumber: string;
  message?: string;
}

const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({
  phoneNumber,
  message,
}) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true);
    }, 4500);

    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  const encodedMessage = encodeURIComponent(
    message || "¡Hola! Estoy interesado en la academia de danza."
  );
  const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-5 flex items-center p-2 rounded-full z-50"
    >
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
        alt="WhatsApp"
        className="w-16 h-16"
      />
    </a>
  );
};

export default WhatsAppButton;
