import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import toast from "react-hot-toast";

export const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '', confirmPassword: '' });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Verifica se a confirmação de senha é igual
    if (formData.password !== formData.confirmPassword) {
      toast.error("As senhas não coincidem.");
      setLoading(false);
      return;
    }

    try {
      const { user, token } = await mockApi.login(formData.email, formData.password);
      login(user, token);
      toast.success('Login realizado com sucesso!');
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="flex items-center p-8 py-12 space-y-16 relative min-h-screen justify-center text-center bg-cover bg-center"
      style={{ backgroundImage: "url('/Fundologin.png')" }}
    >
      <Card className="px-20 max-w-wd bg-white">
        {/* Cabeçalho */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-black mb-2">Entrar</h1>
          <p className="text-black">Acesse a sua conta </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Campo de email */}
          <Input
            label="E-mail"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="seu@email.com"
            required
          />

          {/* Campo de senha */}
          <Input
            label="Senha"
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            placeholder="Sua senha"
            required
          />

          {/* Botão de login */}
          <Button
            type="submit"
            loading={loading}
            className="w-full text-black"
          >
            Entrar
          </Button>
        </form>

        {/* Links adicionais */}
        <div className="mt-6 text-center space-y-2">
          <p className="text-black">
            Não tem uma conta?{' '}
            <Link to="/register" className="text-blue-500 hover:text-blue-300 font-medium">
              Criar conta
            </Link>
          </p>
          <p className="text-black">
            <Link to="/home" className="text-black hover:text-gray-300 font-medium">
              ← Voltar ao início
            </Link>
          </p>
        </div>
      </Card>
    </div>
  );
};