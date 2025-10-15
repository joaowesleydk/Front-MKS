
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
    <>


      <div className="flex flex-col items-center justify-center min-h-screen bg-white p-4
      bg-[url('/Fundologin.png')] bg-cover bg-center bg-no-repeat"
      >
      
        <h1 className="text-4xl font-bold text-white mb-2 text-center">
          Entre ou Cadastre-se
        </h1>
        <p className="text-white text-base mb-6 text-center">
          Para começar, digite seu email e senha no campo abaixo
        </p>

        <div className="bg-white shadow-md rounded-xl px-10 pt-5 pb-5 mb-6 w-full max-w-md">
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block text-black text-sm font-semibold mb-2" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Digite seu email"
                className="bg-white border border-gray-300 rounded w-full py-2 px-3 text-[#1C1C1C] leading-tight focus:outline-none focus:ring-2 "
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
                name="password"
                placeholder="Digite sua senha"
                className="bg-white border border-gray-300 rounded w-full py-2 px-3 text-[#1C1C1C] leading-tight focus:outline-none focus:ring-2 focus:ring-[#FF6B00]"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="flex justify-center mb-4">
              <button
                type="submit"
                className="bg-black  text-white font-bold py-2 px-20 rounded transition duration-200"
              >
                Continuar
              </button>
            </div>

            <div className="text-center text-[#1C1C1C] mb-4 font-medium">ou</div>

            <div className="flex flex-col gap-3">
              <button
                type="button"
                className="flex items-center justify-center gap-2 bg-gray-200 text-[#1C1C1C] font-semibold py-2 px-4 rounded hover:bg-gray-300 transition-colors"
                onClick={() => window.location.href = "https://accounts.google.com"}
              >
                <FcGoogle size={20} />
                Entrar com Google
              </button>

              <button
                type="button"
                className="flex items-center justify-center gap-2 bg-blue-600 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700 transition-colors"
                onClick={() => window.location.href = "https://www.facebook.com"}
              >
                <FaFacebook size={20} />
                Entrar com Facebook
              </button>
            </div>

            <div className="text-center mt-4">
              <span className="text-[#1C1C1C] mr-2">Não tem uma conta?</span>
              <button
                type="button"
                className="text-black underline font-semibold hover:text-gray-700 transition-colors"
                onClick={() => navigate("/cadastro")}
              >
                Cadastre-se
              </button>
            </div>
          </form>
        </div>

        <div className="bg-[#F2F2F2] px-6 py-4 rounded-xl shadow w-full max-w-md text-center">
          <span className="block text-[#1C1C1C] font-medium mb-2">
            Tenho um problema de segurança
          </span>
          <button
            type="button"
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
            onClick={() => alert("Redirecionando para suporte...")}
          >
            <a href="/reportar">Reportar</a>
          </button>
        </div>
      </div>


    </>
  );
};

