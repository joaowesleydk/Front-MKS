import React, { useState } from "react";
import api from "../services/api"; // ou ajuste o caminho
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

export const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || "SEU_CLIENT_ID_GOOGLE_AQUI";


  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", { email, password });
      const token = res.data.access_token;
      const user = res.data.user;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/");
    } catch (err) {
      alert("Erro ao logar: verifique suas credenciais.");
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const credential = credentialResponse.credential;
      const res = await api.post("/auth/google", { credential });
      const token = res.data.access_token;
      const user = res.data.user;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/");
    } catch (err) {
      alert("Erro no login com Google.");
    }
  };

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <div className="flex items-center justify-center min-h-screen bg-[url('/Fundologin.png')] bg-cover bg-center bg-no-repeat">
        <div className="bg-black/60 backdrop-blur-md p-8 rounded-3xl shadow-lg w-full max-w-md text-white">
          <h1 className="text-3xl font-bold text-center mb-3">Login</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm mb-1 font-medium">E-mail</label>
              <input
                type="email"
                placeholder="Digite seu e-mail"
                className="w-full bg-transparent border border-white/80 p-2 rounded-md"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-sm mb-1 font-medium">Senha</label>
              <input
                type="password"
                placeholder="Digite sua senha"
                className="w-full bg-transparent border border-white/80 p-2 rounded-md"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="w-full bg-white text-black font-semibold py-2 rounded-md">
              Continuar
            </button>
          </form>

          <div className="text-center text-sm mt-4 mb-3">ou</div>

          <div className="flex flex-col gap-3">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={() => alert("Erro ao logar com Google")}
            />
          </div>

          {/* Login rápido para desenvolvimento */}
          <button 
            onClick={() => {
              const fakeUser = { name: 'Admin Teste', email: 'admin@teste.com', role: 'admin' };
              const fakeToken = 'fake-token-123';
              localStorage.setItem('token', fakeToken);
              localStorage.setItem('user', JSON.stringify(fakeUser));
              navigate('/');
            }}
            className="w-full bg-green-600 text-white font-semibold py-2 rounded-md mt-3"
          >
            Login Rápido (Admin)
          </button>

          <div className="text-center mt-6">
            <span className="text-gray-200 mr-1">Não tem uma conta?</span>
            <button onClick={() => navigate("/cadastro")} className="text-orange-400 underline font-semibold">
              Cadastre-se
            </button>
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};
