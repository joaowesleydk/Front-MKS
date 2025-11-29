import { useState } from 'react';
import { Link } from 'react-router-dom';
import { HiOutlinePhone, HiOutlineMapPin, HiChevronUp, HiChevronDown } from 'react-icons/hi2';
import { HiOutlineMail } from 'react-icons/hi';
import { FaInstagram, FaFacebook, FaWhatsapp } from 'react-icons/fa';

export const Footer = () => {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <footer className="bg-black text-white">
      {/* Barra retrátil */}
      <div className="border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full py-3 lg:py-4 flex items-center justify-between hover:bg-gray-900 transition-colors"
          >
            <div className="flex flex-col lg:flex-row lg:items-center lg:space-x-4">
              <h3 className="text-lg lg:text-xl font-bold">MKS Store</h3>
              <span className="text-gray-400 text-xs lg:text-sm">{isExpanded ? 'Mostrar menos' : 'Mais informações'}</span>
            </div>
            {isExpanded ? (
              <HiChevronUp className="text-2xl text-gray-400" />
            ) : (
              <HiChevronDown className="text-2xl text-gray-400" />
            )}
          </button>
        </div>
      </div>

      {/* Conteúdo expansível */}
      <div className={`transition-all duration-300 overflow-hidden ${
        isExpanded ? 'max-h-0 opacity-0' : 'max-h-32 opacity-100'
      }`}>
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-4">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm">
            
            {/* Links essenciais */}
            <div className="flex flex-wrap justify-center sm:justify-start gap-4">
              <Link to="/" className="text-gray-400 hover:text-white transition-colors">Home</Link>
              <Link to="/cosmeticos/maquiagem" className="text-gray-400 hover:text-white transition-colors">Produtos</Link>
              <span className="text-gray-400">(35) 9 9885-3145</span>
            </div>

            {/* Redes sociais minimalistas */}
            <div className="flex space-x-3">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FaInstagram size={18} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FaWhatsapp size={18} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright sempre visível */}
      <div className="border-t border-gray-700 py-3 lg:py-4">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 text-center">
          <p className="text-gray-400 text-xs lg:text-sm">
            © 2025 MKS Store. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};