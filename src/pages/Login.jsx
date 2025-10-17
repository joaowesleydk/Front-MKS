import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
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
    <div className="flex items-center justify-center min-h-screen bg-[url('/Fundologin.png')] bg-cover bg-center bg-no-repeat">
      {/* Painel translúcido */}
      <div className="bg-black/60 backdrop-blur-md p-8 rounded-3xl shadow-lg w-full max-w-md text-white">
        {/* Título */}
        <h1 className="text-3xl font-bold text-center mb-3">Login</h1>
        <p className="text-center text-sm mb-6 text-gray-200">
          Entre com seus dados para continuar
        </p>

        {/* Formulário */}
        <form onSubmit={handleLogin} className="space-y-4">
          {/* Campo de email */}
          <div>
            <label className="block text-sm mb-1 font-medium">E-mail</label>
            <input
              type="email"
              id="email"
              placeholder="Digite seu e-mail"
              className="w-full bg-transparent border border-white/80 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-white text-white placeholder-gray-300 text-sm"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Campo de senha */}
          <div>
            <label className="block text-sm mb-1 font-medium">Senha</label>
            <input
              type="password"
              id="password"
              placeholder="Digite sua senha"
              className="w-full bg-transparent border border-white/80 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-white text-white placeholder-gray-300 text-sm"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Botão principal */}
          <button
            type="submit"
            className="w-full bg-white text-black font-semibold py-2 rounded-md hover:bg-gray-200 transition"
          >
            Continuar
          </button>
        </form>

        {/* Separador */}
        <div className="text-center text-sm mt-4 mb-3 text-gray-200">ou</div>

        {/* Login com Google */}
        <div className="flex flex-col gap-3">
          <button
            type="button"
            className="flex items-center justify-center gap-2 bg-white text-black font-semibold py-2 px-4 rounded hover:bg-gray-200 transition"
            onClick={() =>
              window.location.href = "https://accounts.google.com"
            }
          >
            <FcGoogle size={20} />
            Entrar com Google
          </button>
        </div>

        {/* Link para cadastro */}
        <div className="text-center mt-6">
          <span className="text-gray-200 mr-1">Não tem uma conta?</span>
          <button
            type="button"
            className="text-orange-400 underline font-semibold hover:text-orange-300 transition"
            onClick={() => navigate("/cadastro")}
          >
            Cadastre-se
          </button>
        </div>

        {/* Reportar problema */}
        <div className="mt-8 text-center">
          <span className="block text-sm text-gray-300 mb-2">
            Tenho um problema de segurança
          </span>
          <button
            type="button"
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
            onClick={() => alert('Redirecionando para suporte...')}
          >
            <a href="/reportar">Reportar</a>
          </button>
        </div>
      </div>
    </div>
  );
};
