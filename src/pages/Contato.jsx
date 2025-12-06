import { useState } from 'react';
import { HiOutlineMail, HiOutlinePhone, HiOutlinePaperAirplane } from 'react-icons/hi';
import { HiOutlineMapPin } from 'react-icons/hi2';
import { FaInstagram, FaWhatsapp } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { emailService } from '../services/emailService';

export const Contato = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await emailService.sendContactEmail(formData);
      
      if (result.success) {
        toast.success('Mensagem enviada com sucesso!');
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        });
      } else {
        toast.error('Erro ao enviar mensagem. Tente novamente.');
      }
    } catch (error) {
      toast.error('Erro ao enviar mensagem. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Entre em Contato</h1>
          <p className="text-gray-600 text-lg">Estamos aqui para ajudar você!</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Informações de Contato */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Informações de Contato</h2>
            
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="bg-blue-100 p-3 rounded-full">
                  <HiOutlineMail className="text-blue-600 text-xl" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Email</h3>
                  <p className="text-gray-600">karinamodastore@gmail.com</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="bg-green-100 p-3 rounded-full">
                  <HiOutlinePhone className="text-green-600 text-xl" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Telefone</h3>
                  <p className="text-gray-600">(35) 9 9885-3145</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="bg-purple-100 p-3 rounded-full">
                  <HiOutlineMapPin className="text-purple-600 text-xl" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Localização</h3>
                  <p className="text-gray-600">Pouso Alegre, MG</p>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <h3 className="font-semibold text-gray-800 mb-4">Redes Sociais</h3>
              <div className="flex space-x-4">
                <a 
                  href="https://www.instagram.com/kaarinamodas_?igsh=NW53YmhuaDZrazlv" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-pink-100 p-3 rounded-full hover:bg-pink-200 transition-colors"
                >
                  <FaInstagram className="text-pink-600 text-xl" />
                </a>
                <a 
                  href="https://wa.me/5535998853145" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-green-100 p-3 rounded-full hover:bg-green-200 transition-colors"
                >
                  <FaWhatsapp className="text-green-600 text-xl" />
                </a>
              </div>
            </div>
          </div>

          {/* Formulário de Contato */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Envie sua Mensagem</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nome *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Seu nome completo"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="seu@email.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Telefone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="(00) 00000-0000"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Assunto *
                  </label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Selecione o assunto</option>
                    <option value="Dúvida sobre produto">Dúvida sobre produto</option>
                    <option value="Problema com pedido">Problema com pedido</option>
                    <option value="Troca/Devolução">Troca/Devolução</option>
                    <option value="Sugestão">Sugestão</option>
                    <option value="Outros">Outros</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mensagem *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  placeholder="Descreva sua dúvida ou mensagem..."
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className={`w-full flex items-center justify-center space-x-2 py-3 px-6 rounded-lg font-medium transition-all duration-300 ${
                  isLoading
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl'
                }`}
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Enviando...</span>
                  </>
                ) : (
                  <>
                    <HiOutlinePaperAirplane className="text-xl" />
                    <span>Enviar Mensagem</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};