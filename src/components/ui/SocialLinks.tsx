import { Facebook, Instagram, Youtube } from 'lucide-react';

export function SocialLinks() {
  return (
    <div className="flex space-x-4">
      <a
        href="#"
        className="text-gray-400 hover:text-pink-300 transition-colors"
      >
        <Facebook className="w-6 h-6" />
      </a>
      <a
        href="#"
        className="text-gray-400 hover:text-pink-300 transition-colors"
      >
        <Instagram className="w-6 h-6" />
      </a>
      <a
        href="#"
        className="text-gray-400 hover:text-pink-300 transition-colors"
      >
        <Youtube className="w-6 h-6" />
      </a>
    </div>
  );
}