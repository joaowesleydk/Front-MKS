import React, { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

export const Cadastro = () => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();
   const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || "SEU_CLIENT_ID_GOOGLE_AQUI";


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/api/users/register", {
        name: nome,
        email,
        password: senha,
      });
      alert(`Usuário ${response.data.name} cadastrado com sucesso!`);
      navigate("/login");
    } catch (error) {
      alert("Erro ao cadastrar usuário: talvez e-mail já exista.");
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const credential = credentialResponse.credential;
      const response = await api.post("/api/users/google", { credential });
      // retorna token e user — opcional: já logar automaticamente
      const token = response.data.access_token;
      const user = response.data.user;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      alert(`Bem-vindo(a), ${user.name}`);
      navigate("/");
    } catch (error) {
      alert("Erro ao cadastrar com Google");
    }
  };

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <div className="min-h-screen flex items-center justify-center bg-[url('/fundocadastro.png')] bg-cover bg-center bg-no-repeat">
        <div className="bg-black/60 backdrop-blur-md p-8 rounded-3xl shadow-lg w-full max-w-md text-white">
          <h2 className="text-2xl font-bold text-center mb-6">Cadastro</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm mb-1">Nome</label>
              <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} required className="w-full bg-transparent border border-white/80 p-2 rounded-md" placeholder="Digite seu nome" />
            </div>

            <div>
              <label className="block text-sm mb-1">E-mail</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full bg-transparent border border-white/80 p-2 rounded-md" placeholder="Digite seu e-mail" />
            </div>

            <div>
              <label className="block text-sm mb-1">Senha</label>
              <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} required className="w-full bg-transparent border border-white/80 p-2 rounded-md" placeholder="Digite sua senha" />
            </div>

            <button type="submit" className="mt-4 w-full bg-white text-black font-semibold py-2 rounded-md">Criar conta</button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm mb-2">Ou cadastre-se com:</p>
            <div className="flex justify-center">
              <GoogleLogin onSuccess={handleGoogleSuccess} onError={() => alert("Erro ao cadastrar com o Google")} />
            </div>
          </div>

          <p className="mt-6 text-center text-sm">
            Já tem conta? <a href="/login" className="text-orange-400 hover:underline">Faça login</a>
          </p>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};
