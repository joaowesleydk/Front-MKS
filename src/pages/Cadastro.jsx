import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

export const Cadastro = () => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  // ✅ Cadastro manual
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://trazpramimback.onrender.com/api/users", {
        name: nome,
        email,
        password: senha,
      });

      alert(`✅ Usuário cadastrado com sucesso!\nNome: ${response.data.name}\nEmail: ${response.data.email}`);
      navigate("/login");
    } catch (error) {
      alert("❌ Erro ao cadastrar usuário");
    }
  };

  // ✅ Cadastro com Google
  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const decoded = jwtDecode(credentialResponse.credential);
      const { name, email, sub } = decoded;

      const response = await axios.post("https://trazpramimback.onrender.com/api/users", {
        name,
        email,
        password: sub, // senha gerada automaticamente
      });

      alert(`✅ Conta Google cadastrada!\nBem-vindo(a), ${response.data.name}`);
      navigate("/login");
    } catch (error) {
      alert("❌ Erro ao cadastrar com Google");
    }
  };

  return (
    <GoogleOAuthProvider clientId="SEU_CLIENT_ID_REAL_AQUI">
      <div className="min-h-screen flex items-center justify-center bg-[url('/fundocadastro.png')] bg-cover bg-center bg-no-repeat">
        {/* Painel */}
        <div className="bg-black/60 backdrop-blur-md p-8 rounded-3xl shadow-lg w-full max-w-md text-white">
          <h2 className="text-2xl font-bold text-center mb-6">Cadastro</h2>

          {/* Formulário padrão */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm mb-1">Nome</label>
              <input
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
                className="w-full bg-transparent border border-white/80 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-white text-white placeholder-gray-200 text-sm"
                placeholder="Digite seu nome"
              />
            </div>

            <div>
              <label className="block text-sm mb-1">E-mail</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-transparent border border-white/80 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-white text-white placeholder-gray-200 text-sm"
                placeholder="Digite seu e-mail"
              />
            </div>

            <div>
              <label className="block text-sm mb-1">Senha</label>
              <input
                type="password"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required
                className="w-full bg-transparent border border-white/80 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-white text-white placeholder-gray-200 text-sm"
                placeholder="Digite sua senha"
              />
            </div>

            <button
              type="submit"
              className="mt-4 w-full bg-white text-black font-semibold py-2 rounded-md hover:bg-gray-200 transition"
            >
              Criar conta
            </button>
          </form>

          {/* Cadastro com Google */}
          <div className="mt-6 text-center">
            <p className="text-sm mb-2">Ou cadastre-se com:</p>
            <div className="flex justify-center">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={() => alert("Erro ao cadastrar com o Google")}
              />
            </div>
          </div>

          <p className="mt-6 text-center text-sm">
            Já tem conta?{" "}
            <a href="/login" className="text-orange-400 hover:underline">
              Faça login
            </a>
          </p>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};
