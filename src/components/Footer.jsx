import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { HiOutlinePhone, HiOutlineMapPin, HiChevronUp, HiChevronDown } from 'react-icons/hi2';
import { HiOutlineMail } from 'react-icons/hi';
import { FaInstagram, FaFacebook, FaWhatsapp } from 'react-icons/fa';

export const Footer = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const footerRef = useRef(null);

  return (
    <footer ref={footerRef} className="bg-black text-white">
      {/* Barra retrátil */}
      <div className="border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <button
            onClick={() => {
              setIsExpanded(!isExpanded);
              if (isExpanded) {
                setTimeout(() => {
                  footerRef.current?.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'end' 
                  });
                }, 100);
              }
            }}
            className="w-full py-3 lg:py-4 flex items-center justify-between hover:bg-gray-900/50 transition-all duration-300 rounded-lg"
          >
            <div className="flex flex-col lg:flex-row lg:items-center lg:space-x-4">
              <h3 className="text-lg lg:text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">MKS Store</h3>
              <span className="text-gray-400 text-xs lg:text-sm">{isExpanded ? 'Ocultar informações' : 'Ver mais informações'}</span>
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
      <div className={`transition-all duration-500 ease-in-out overflow-hidden ${
        isExpanded ? 'max-h-0 opacity-0' : 'max-h-80 opacity-100'
      }`}>
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            
            {/* Sobre */}
            <div className="md:col-span-2">
              <h4 className="text-lg font-semibold mb-4 text-white">Sobre a MKS Store</h4>
              <p className="text-gray-300 text-sm leading-relaxed mb-4">
                Sua loja online de confiança. Oferecemos moda, beleza e acessórios com qualidade e preços incríveis para toda a família.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-pink-400 hover:text-pink-300 text-2xl transition-all duration-300 hover:scale-110">
                  <FaInstagram />
                </a>
                <a href="#" className="text-blue-400 hover:text-blue-300 text-2xl transition-all duration-300 hover:scale-110">
                  <FaFacebook />
                </a>
                <a href="#" className="text-green-400 hover:text-green-300 text-2xl transition-all duration-300 hover:scale-110">
                  <FaWhatsapp />
                </a>
              </div>
            </div>

            {/* Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4 text-white">Links Úteis</h4>
              <ul className="space-y-2">
                <li><Link to="/" className="text-gray-300 hover:text-white transition-colors text-sm">Home</Link></li>
                <li><Link to="/cosmeticos/maquiagem" className="text-gray-300 hover:text-white transition-colors text-sm">Maquiagem</Link></li>
                <li><Link to="/feminina/vestidos" className="text-gray-300 hover:text-white transition-colors text-sm">Moda Feminina</Link></li>
                <li><Link to="/masculina/camisetas" className="text-gray-300 hover:text-white transition-colors text-sm">Moda Masculina</Link></li>
                <li><Link to="/bijuterias/aneis" className="text-gray-300 hover:text-white transition-colors text-sm">Bijuterias</Link></li>
              </ul>
            </div>

            {/* Contato e Legal */}
            <div>
              <h4 className="text-lg font-semibold mb-4 text-white">Contato & Legal</h4>
              <div className="space-y-3 mb-4">
                <div className="flex items-center space-x-2">
                  <HiOutlinePhone className="text-blue-400" />
                  <span className="text-gray-300 text-sm">(35) 9 9885-3145</span>
                </div>
                <div className="flex items-center space-x-2">
                  <HiOutlineMail className="text-red-400" />
                  <span className="text-gray-300 text-sm">contato@mksstore.com</span>
                </div>
                <div className="flex items-center space-x-2">
                  <HiOutlineMapPin className="text-green-400" />
                  <span className="text-gray-300 text-sm">Pouso Alegre, MG</span>
                </div>
              </div>
              
              {/* Links legais */}
              <div className="space-y-1">
                <a href="#" className="block text-gray-400 hover:text-white transition-colors text-xs">Termos de Uso</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors text-xs">Política de Privacidade</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors text-xs">Política de Troca</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors text-xs">FAQ</a>
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