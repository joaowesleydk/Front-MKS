import { useState } from 'react';
import { productService } from '../services/productService';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import toast from 'react-hot-toast';

export const CadastroProduto = () => {
  const [produto, setProduto] = useState({
    nome: '',
    preco: '',
    categoria: '',
    imagem: '',
    descricao: '',
    promocao: false
  });
  const [loading, setLoading] = useState(false);
  const [imagemFile, setImagemFile] = useState(null);
  const [previewImagem, setPreviewImagem] = useState('');
  const [tipoImagem, setTipoImagem] = useState('url'); // 'url' ou 'file'

  const categorias = [
    // Cosméticos e Beleza
    'maquiagem', 'hidratantes', 'perfumes', 'sabonetes',
    // Feminina
    'vestidos', 'saias', 'blusas', 'calcas', 'shorts', 'jeans', 'lingerie',
    // Masculina
    'bermudas', 'calcas-masculinas', 'camisetas', 'camisas', 'blazers', 'jaquetas',
    // Bijuterias
    'aneis', 'brincos', 'pulseiras', 'colares'
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let produtoFinal = { ...produto };
      
      // Se for upload de arquivo, enviar o arquivo
      if (tipoImagem === 'file' && imagemFile) {
        const formData = new FormData();
        Object.keys(produto).forEach(key => {
          formData.append(key, produto[key]);
        });
        formData.append('imagemFile', imagemFile);
        
        await productService.createWithFile(formData);
      } else {
        // Se for URL, enviar normalmente
        await productService.create(produtoFinal);
      }
      
      toast.success('Produto cadastrado com sucesso! Recarregando página...');
      setProduto({
        nome: '',
        preco: '',
        categoria: '',
        imagem: '',
        descricao: '',
        promocao: false
      });
      setImagemFile(null);
      setPreviewImagem('');
      
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      toast.error('Erro ao cadastrar produto');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setProduto({
      ...produto,
      [e.target.name]: e.target.value
    });
  };
  
  const handleImagemFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Imagem muito grande. Máximo 5MB.');
        return;
      }
      
      setImagemFile(file);
      
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewImagem(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-50 px-4">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-center mb-6">Cadastrar Produto</h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="text"
            name="nome"
            placeholder="Nome do produto"
            value={produto.nome}
            onChange={handleChange}
            required
          />

          <Input
            type="number"
            name="preco"
            placeholder="Preço"
            value={produto.preco}
            onChange={handleChange}
            step="0.01"
            required
          />

          <select
            name="categoria"
            value={produto.categoria}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Selecione uma categoria</option>
            {categorias.map(cat => (
              <option key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>

          {/* Seleção do tipo de imagem */}
          <div className="space-y-4">
            <div className="flex gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="tipoImagem"
                  value="url"
                  checked={tipoImagem === 'url'}
                  onChange={(e) => setTipoImagem(e.target.value)}
                  className="text-blue-600"
                />
                <span>URL da Imagem</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="tipoImagem"
                  value="file"
                  checked={tipoImagem === 'file'}
                  onChange={(e) => setTipoImagem(e.target.value)}
                  className="text-blue-600"
                />
                <span>Upload da Máquina</span>
              </label>
            </div>
            
            {tipoImagem === 'url' ? (
              <Input
                type="url"
                name="imagem"
                placeholder="URL da imagem"
                value={produto.imagem}
                onChange={handleChange}
                required
              />
            ) : (
              <div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImagemFile}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
                {previewImagem && (
                  <div className="mt-3">
                    <img
                      src={previewImagem}
                      alt="Preview"
                      className="w-32 h-32 object-cover rounded-lg border"
                    />
                  </div>
                )}
              </div>
            )}
          </div>

          <textarea
            name="descricao"
            placeholder="Descrição do produto"
            value={produto.descricao}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 h-24 resize-none"
          />

          {/* Campo de Promoção */}
          <div className="flex items-center gap-3 p-4 bg-orange-50 rounded-lg border border-orange-200">
            <input
              type="checkbox"
              id="promocao"
              name="promocao"
              checked={produto.promocao}
              onChange={(e) => setProduto({...produto, promocao: e.target.checked})}
              className="w-5 h-5 text-orange-600 rounded focus:ring-orange-500"
            />
            <label htmlFor="promocao" className="flex-1">
              <span className="font-medium text-orange-800">🔥 Produto em Promoção</span>
              <p className="text-sm text-orange-600 mt-1">
                Produtos marcados aparecerão na página inicial como destaque
              </p>
            </label>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700"
          >
            {loading ? 'Cadastrando...' : 'Cadastrar Produto'}
          </Button>
        </form>
      </div>
    </div>
  );
};