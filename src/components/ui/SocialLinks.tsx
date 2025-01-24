import { Facebook, Instagram, Youtube } from 'lucide-react';

export function SocialLinks() {
  return (
    <div className="flex space-x-4">
      <a
        href="https://www.facebook.com/Danzakarinagym/?locale=es_LA"
        target="_blank"
        className=" text-gray-400 hover:text-pink-300 transition-colors"
      >
        <Facebook className="w-6 h-6" />
      </a>
      <a
        href="https://www.instagram.com/danza_karina_gym/"
        target="_blank"
        className="text-gray-400 hover:text-pink-300 transition-colors"
      >
        <Instagram className="w-6 h-6" />
      </a>
      <a
        href="#"
        target="_blank"
        className="text-gray-400 hover:text-pink-300 transition-colors"
      >
        <Youtube className="w-6 h-6" />
      </a>
    </div>
  );
}