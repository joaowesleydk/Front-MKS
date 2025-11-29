import { useState } from 'react';
import { Link } from 'react-router-dom';
import { HiOutlinePhone, HiOutlineMapPin, HiChevronUp, HiChevronDown } from 'react-icons/hi2';
import { HiOutlineMail } from 'react-icons/hi';
import { FaInstagram, FaFacebook, FaWhatsapp } from 'react-icons/fa';

export const Footer = () => {
  const [isExpanded, setIsExpanded] = useState(false);

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
              <span className="text-gray-400 text-xs lg:text-sm">Informações e contato</span>
            </div>
            {isExpanded ? (
              <HiChevronDown className="text-2xl text-gray-400" />
            ) : (
              <HiChevronUp className="text-2xl text-gray-400" />
            )}
          </button>
        </div>
      </div>

      {/* Conteúdo expansível */}
      <div className={`transition-all duration-300 overflow-hidden ${
        isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-6 lg:py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            
            {/* Links rápidos */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Links Rápidos</h4>
              <ul className="space-y-2">
                <li><Link to="/" className="text-gray-300 hover:text-white transition-colors">Home</Link></li>
                <li><Link to="/cosmeticos/maquiagem" className="text-gray-300 hover:text-white transition-colors">Maquiagem</Link></li>
                <li><Link to="/feminina/vestidos" className="text-gray-300 hover:text-white transition-colors">Vestidos</Link></li>
                <li><Link to="/bijuterias/aneis" className="text-gray-300 hover:text-white transition-colors">Bijuterias</Link></li>
              </ul>
            </div>

            {/* Contato */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Contato</h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <HiOutlinePhone className="text-gray-400" />
                  <span className="text-gray-300">(35) 9 9885-3145</span>
                </div>
                <div className="flex items-center space-x-2">
                  <HiOutlineMail className="text-gray-400" />
                  <span className="text-gray-300">contato@mksstore.com</span>
                </div>
                <div className="flex items-center space-x-2">
                  <HiOutlineMapPin className="text-gray-400" />
                  <span className="text-gray-300">Pouso Alegre, MG</span>
                </div>
              </div>
            </div>

            {/* Redes sociais */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Redes Sociais</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white text-2xl transition-colors">
                  <FaInstagram />
                </a>
                <a href="#" className="text-gray-400 hover:text-white text-2xl transition-colors">
                  <FaFacebook />
                </a>
                <a href="#" className="text-gray-400 hover:text-white text-2xl transition-colors">
                  <FaWhatsapp />
                </a>
              </div>
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