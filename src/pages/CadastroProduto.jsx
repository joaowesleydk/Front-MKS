import { useState } from 'react';
import { productService } from '../services/productService';
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
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const categorias = [
    'feminina', 'masculina', 'infantil', 'acessorios', 'cosmeticos', 'bijuterias'
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imageUrl = produto.imagem;
      
      // Se tem arquivo, faz upload
      if (imageFile) {
        toast.loading('Fazendo upload da imagem...');
        imageUrl = await productService.uploadImage(imageFile);
        toast.dismiss();
      }
      
      // Cria produto com URL da imagem
      await productService.create({
        ...produto,
        imagem: imageUrl
      });
      
      toast.success('Produto cadastrado com sucesso!');
      setProduto({
        nome: '',
        preco: '',
        categoria: '',
        imagem: '',
        descricao: '',
        promocao: false
      });
      setImageFile(null);
    } catch (error) {
      toast.error(error.message || 'Erro ao cadastrar produto');
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

  return (
    <div className="min-h-screen bg-gray-50 py-20 px-4">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-center mb-6">Cadastrar Produto</h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="nome"
            placeholder="Nome do produto"
            value={produto.nome}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
            required
          />

          <input
            type="number"
            name="preco"
            placeholder="Preço"
            value={produto.preco}
            onChange={handleChange}
            step="0.01"
            className="w-full p-3 border rounded-lg"
            required
          />

          <select
            name="categoria"
            value={produto.categoria}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
            required
          >
            <option value="">Selecione uma categoria</option>
            {categorias.map(cat => (
              <option key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>

          <input
            type="url"
            name="imagem"
            placeholder="URL da imagem (opcional)"
            value={produto.imagem}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
          />

          <div>
            <label className="block text-sm font-medium mb-2">Ou fazer upload:</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files[0])}
              className="w-full p-3 border rounded-lg"
            />
            {imageFile && (
              <p className="text-sm text-green-600 mt-2">✓ {imageFile.name}</p>
            )}
          </div>

          <textarea
            name="descricao"
            placeholder="Descrição do produto"
            value={produto.descricao}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg h-24 resize-none"
          />

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="promocao"
              name="promocao"
              checked={produto.promocao}
              onChange={(e) => setProduto({...produto, promocao: e.target.checked})}
              className="w-5 h-5"
            />
            <label htmlFor="promocao">Produto em promoção</label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 text-white p-3 rounded-lg"
          >
            {loading ? 'Cadastrando...' : 'Cadastrar Produto'}
          </button>
        </form>
      </div>
    </div>
  );
};