import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { authService } from "../services/authService";
import toast from 'react-hot-toast';

export const Cadastro = () => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const navigate = useNavigate();
   const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || "SEU_CLIENT_ID_GOOGLE_AQUI";


  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!acceptTerms) {
      toast.error('Você deve aceitar os termos de uso para continuar');
      return;
    }
    
    try {
      const { access_token, user } = await authService.register({ name: nome, email, password: senha });
      localStorage.setItem("token", access_token);
      localStorage.setItem("user", JSON.stringify(user));
      toast.success(`Bem-vindo, ${user.nome}!`);
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.detail || 'Erro ao cadastrar');
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const { access_token, user } = await authService.googleLogin(credentialResponse.credential);
      localStorage.setItem("token", access_token);
      localStorage.setItem("user", JSON.stringify(user));
      toast.success(`Bem-vindo, ${user.nome}!`);
      navigate("/");
    } catch (error) {
      toast.error('Erro ao cadastrar com Google');
    }
  };

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4">
        <div className="bg-white/90 backdrop-blur-xl p-6 md:p-8 rounded-2xl md:rounded-3xl shadow-2xl w-full max-w-md border border-white/20">
          <div className="text-center mb-6 md:mb-8">
            <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
              <span className="text-lg md:text-2xl text-white font-bold">MKS</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">Criar Conta</h2>
            <p className="text-sm md:text-base text-gray-600">Junte-se à nossa comunidade</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
            <div className="space-y-3 md:space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 md:mb-2">Nome Completo</label>
                <input 
                  type="text" 
                  value={nome} 
                  onChange={(e) => setNome(e.target.value)} 
                  required 
                  className="w-full bg-white/70 border border-gray-200 p-3 md:p-4 rounded-lg md:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-gray-800 placeholder-gray-400 text-sm md:text-base" 
                  placeholder="Seu nome completo" 
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 md:mb-2">E-mail</label>
                <input 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  required 
                  className="w-full bg-white/70 border border-gray-200 p-3 md:p-4 rounded-lg md:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-gray-800 placeholder-gray-400 text-sm md:text-base" 
                  placeholder="seu@email.com" 
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 md:mb-2">Senha</label>
                <div className="relative">
                  <input 
                    type={showPassword ? "text" : "password"}
                    value={senha} 
                    onChange={(e) => setSenha(e.target.value)} 
                    required 
                    className="w-full bg-white/70 border border-gray-200 p-3 md:p-4 rounded-lg md:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-gray-800 placeholder-gray-400 text-sm md:text-base pr-12" 
                    placeholder="Crie uma senha segura" 
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                  </button>
                </div>
              </div>
            </div>

            {/* Aceitar Termos */}
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="acceptTerms"
                checked={acceptTerms}
                onChange={(e) => setAcceptTerms(e.target.checked)}
                className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                required
              />
              <label htmlFor="acceptTerms" className="text-sm text-gray-700 leading-relaxed">
                Eu aceito os{' '}
                <button
                  type="button"
                  onClick={() => navigate('/termos-uso')}
                  className="text-blue-600 hover:text-blue-700 underline"
                >
                  Termos de Uso
                </button>
                {' '}e a{' '}
                <button
                  type="button"
                  onClick={() => navigate('/politica-privacidade')}
                  className="text-blue-600 hover:text-blue-700 underline"
                >
                  Política de Privacidade
                </button>
              </label>
            </div>

            <button 
              type="submit" 
              disabled={!acceptTerms}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed text-white font-semibold py-3 md:py-4 rounded-lg md:rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg text-sm md:text-base"
            >
              Criar Minha Conta
            </button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">ou cadastre-se com</span>
            </div>
          </div>

          <div className="flex justify-center">
            <GoogleLogin 
              onSuccess={handleGoogleSuccess} 
              onError={() => alert("Erro ao cadastrar com o Google")} 
              theme="outline"
              size="large"
            />
          </div>

          <div className="text-center mt-6 md:mt-8">
            <span className="text-gray-600 mr-1 text-sm md:text-base">Já tem uma conta?</span>
            <button onClick={() => navigate("/login")} className="text-blue-600 hover:text-blue-700 font-semibold transition-colors text-sm md:text-base">
              Faça login aqui
            </button>
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};
