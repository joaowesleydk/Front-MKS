import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    const user = { email };
    localStorage.setItem("user", JSON.stringify(user));
    navigate("/");
  };

  return (
    <div
      className="relative flex flex-col items-center justify-center min-h-screen bg-[url('/Fundologin.png')] 
      bg-cover bg-center bg-no-repeat p-4"
    >
      {/* camada escura para contraste no texto */}
      <div className="absolute inset-0 bg-black/50"></div>

      <div className="relative z-10 w-full max-w-md bg-white/90 rounded-2xl shadow-lg px-8 py-6 sm:px-10 sm:py-8 backdrop-blur-md">
        <h1 className="text-3xl sm:text-4xl font-bold text-[#1C1C1C] mb-3 text-center">
          Entre ou Cadastre-se
        </h1>

        <p className="text-[#1C1C1C] text-sm sm:text-base mb-6 text-center">
          Para começar, digite seu email e senha no campo abaixo
        </p>

        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-[#1C1C1C] text-sm font-semibold mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Digite seu email"
              className="bg-white border border-gray-300 rounded-lg w-full py-2 px-3 text-[#1C1C1C] focus:outline-none focus:ring-2 focus:ring-[#FF6B00]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-[#1C1C1C] text-sm font-semibold mb-2" htmlFor="password">
              Senha
            </label>
            <input
              type="password"
              id="password"
              placeholder="Digite sua senha"
              className="bg-white border border-gray-300 rounded-lg w-full py-2 px-3 text-[#1C1C1C] focus:outline-none focus:ring-2 focus:ring-[#FF6B00]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="flex justify-center mb-5">
            <button
              type="submit"
              className="bg-[#FF6B00] hover:bg-orange-600 text-white font-bold py-2 px-20 rounded-lg transition duration-300 w-full sm:w-auto"
            >
              Continuar
            </button>
          </div>

          <div className="text-center text-[#1C1C1C] mb-4 font-medium">ou</div>

          <div className="flex flex-col gap-3">
            <button
              type="button"
              className="flex items-center justify-center gap-2 bg-white text-[#1C1C1C] font-semibold py-2 px-4 rounded-lg hover:bg-gray-100 transition-colors"
              onClick={() => window.location.href = "https://accounts.google.com"}
            >
              <FcGoogle size={20} />
              Entrar com Google
            </button>

            <button
              type="button"
              className="flex items-center justify-center gap-2 bg-[#1877F2] text-white font-semibold py-2 px-4 rounded-lg hover:bg-[#1558c0] transition-colors"
              onClick={() => window.location.href = "https://www.facebook.com"}
            >
              <FaFacebook size={20} />
              Entrar com Facebook
            </button>
          </div>

          <div className="text-center mt-5">
            <span className="text-[#1C1C1C] mr-2 text-sm sm:text-base">Não tem uma conta?</span>
            <button
              type="button"
              className="text-[#FF6B00] underline font-semibold hover:text-orange-600 transition-colors text-sm sm:text-base"
              onClick={() => navigate("/cadastro")}
            >
              Cadastre-se
            </button>
          </div>
        </form>
      </div>

      <div className="relative z-10 bg-white/90 backdrop-blur-md px-6 py-4 mt-6 rounded-xl shadow w-full max-w-md text-center">
        <span className="block text-[#1C1C1C] font-medium mb-2 text-sm sm:text-base">
          Tenho um problema de segurança
        </span>
        <button
          type="button"
          className="bg-[#FF6B00] text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors w-full sm:w-auto"
          onClick={() => alert('Redirecionando para suporte...')}
        >
          <a href="/reportar">Reportar</a>
        </button>
      </div>
    </div>
  );
};
