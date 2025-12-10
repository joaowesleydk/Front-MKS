import React, { useState, useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useNavigate, useLocation } from "react-router-dom";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import api from "../services/api";
import toast from 'react-hot-toast';

export const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || "SEU_CLIENT_ID_GOOGLE_AQUI";

  useEffect(() => {
    // Verifica se foi redirecionado por tentativa de compra/carrinho
    if (location.state?.from === 'cart' || location.state?.from === 'buy') {
      setShowMessage(true);
    }
  }, [location]);


  const handleLogin = async (e) => {
    e.preventDefault();
    console.log('Tentando login com:', { email, password: '***' });
    try {
      const response = await api.post('/api/auth/login', { email, password });
      console.log('Login realizado com sucesso');
      
      const { access_token, user, token, data } = response.data;
      const finalToken = access_token || token;
      const finalUser = user || data?.user;
      
      // Limpar dados sensíveis do usuário
      const cleanUser = {
        id: finalUser.id,
        name: finalUser.name || finalUser.nome,
        email: finalUser.email,
        role: finalUser.role || 'user'
      };
      
      localStorage.setItem("token", finalToken);
      localStorage.setItem("user", JSON.stringify(cleanUser));
      toast.success(`Bem-vindo, ${cleanUser.name}!`);
      
      // Redirecionar para onde o usuário estava tentando ir
      const from = location.state?.from;
      if (from === 'cart') {
        navigate('/sacola');
      } else if (from === 'buy') {
        navigate('/pagamento');
      } else if (from === 'provador') {
        navigate('/');
      } else {
        navigate('/');
      }
    } catch (err) {
      console.error('Erro completo no login:', err);
      console.error('Resposta do erro:', err.response?.data);
      console.error('Status do erro:', err.response?.status);
      toast.error(err.response?.data?.detail || 'Email ou senha incorretos');
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      console.log('Google credential recebido:', credentialResponse);
      const response = await api.post('/api/auth/google', { 
        credential: credentialResponse.credential 
      });
      console.log('Login Google realizado com sucesso');
      
      const { access_token, user, token, data } = response.data;
      const finalToken = access_token || token;
      const finalUser = user || data?.user;
      
      // Limpar dados sensíveis do usuário
      const cleanUser = {
        id: finalUser.id,
        name: finalUser.name || finalUser.nome,
        email: finalUser.email,
        role: finalUser.role || 'user'
      };
      
      localStorage.setItem("token", finalToken);
      localStorage.setItem("user", JSON.stringify(cleanUser));
      toast.success(`Bem-vindo, ${cleanUser.name}!`);
      
      // Redirecionar para onde o usuário estava tentando ir
      const from = location.state?.from;
      if (from === 'cart') {
        navigate('/sacola');
      } else if (from === 'buy') {
        navigate('/pagamento');
      } else if (from === 'provador') {
        navigate('/');
      } else {
        navigate('/');
      }
    } catch (err) {
      console.error('Erro no login com Google:', err);
      const errorMsg = err.response?.data?.detail || 'Erro ao fazer login com Google. Tente novamente.';
      toast.error(errorMsg);
    }
  };

  const handleGoogleError = (error) => {
    console.error('Google OAuth Error:', error);
    toast.error('Erro ao conectar com Google');
  };

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 p-4">
        <div className="bg-white/90 backdrop-blur-xl p-6 md:p-8 rounded-2xl md:rounded-3xl shadow-2xl w-full max-w-md border border-white/20">
          <div className="text-center mb-6 md:mb-8">
            <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
              <span className="text-lg md:text-2xl text-white font-bold">MKS</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">Bem-vindo!</h1>
            <p className="text-sm md:text-base text-gray-600">Entre na sua conta para continuar</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4 md:space-y-6">
            <div className="space-y-3 md:space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 md:mb-2">E-mail</label>
                <input
                  type="email"
                  placeholder="seu@email.com"
                  className="w-full bg-white/70 border border-gray-200 p-3 md:p-4 rounded-lg md:rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 text-gray-800 placeholder-gray-400 text-sm md:text-base"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 md:mb-2">Senha</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="w-full bg-white/70 border border-gray-200 p-3 md:p-4 rounded-lg md:rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 text-gray-800 placeholder-gray-400 text-sm md:text-base pr-12"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
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
            <button type="submit" className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 md:py-4 rounded-lg md:rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg text-sm md:text-base">
              Entrar na Conta
            </button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">ou continue com</span>
            </div>
          </div>

          <div className="flex justify-center">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleError}
              theme="outline"
              size="large"
              useOneTap={false}
              auto_select={false}
            />
          </div>



          <div className="text-center mt-6 md:mt-8">
            <span className="text-gray-600 mr-1 text-sm md:text-base">Não tem uma conta?</span>
            <button onClick={() => navigate("/cadastro")} className="text-purple-600 hover:text-purple-700 font-semibold transition-colors text-sm md:text-base">
              Cadastre-se aqui
            </button>
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};
