import { FaInstagram, FaWhatsapp } from 'react-icons/fa';

export const Footer = () => {
  return (
    <footer className="bg-black text-white py-4">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Logo e Copyright */}
          <div className="text-center md:text-left">
            <span className="font-bold text-white">Moda Karina Store</span>
            <span className="text-gray-400 text-xs ml-2">© 2025</span>
          </div>

          {/* Contato */}
          <div className="text-center">
            <span className="text-gray-300 text-xs">
              (35) 9 9885-3145 • karinamodastore@gmail.com
            </span>
          </div>

          {/* Redes Sociais */}
          <div className="flex space-x-3">
            <a href="https://www.instagram.com/kaarinamodas_?igsh=NW53YmhuaDZrazlv" 
               className="text-pink-400 hover:text-pink-300 transition-colors">
              <FaInstagram size={16} />
            </a>
            <a href="#" className="text-green-400 hover:text-green-300 transition-colors">
              <FaWhatsapp size={16} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};