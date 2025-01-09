import { SocialLinks } from "./ui/SocialLinks";
import { ContactInfo } from "./ui/ContactInfo";
import { QuickLinks } from "./ui/QuickLinks";
import { Schedule } from "./ui/Schedule";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="text-center md:text-left">
            <h3 className="text-xl font-semibold mb-4">Karina Dance Academy</h3>
            <p className="text-gray-400 mb-4">
              Formando bailarinas con pasión y excelencia desde 2010.
            </p>
            <div className="flex justify-center md:justify-start">
              <SocialLinks />
            </div>
          </div>

          <div className="text-center md:text-left">
            <QuickLinks />
          </div>

          <div className="flex justify-center text-center md:text-left">
            <ContactInfo />
          </div>

          <div className="text-center md:text-left">
            <Schedule />
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 mt-8 text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} Karina Dance Academy.
          </p>
          <Link to="/admin" className="text-pink-300 hover:underline">
            Admin
          </Link>
        </div>
      </div>
    </footer>
  );
}