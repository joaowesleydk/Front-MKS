import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { productService } from '../services/productService';
import { carouselService } from '../services/carouselService';
import { HiOutlineTrash, HiOutlinePencil, HiOutlinePlus } from 'react-icons/hi2';
import { Button } from '../components/Button';
import toast from 'react-hot-toast';

export const GerenciarProdutos = () => {
  const navigate = useNavigate();
  const [produtos, setProdutos] = useState([]);
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState('produtos');
  const [showModal, setShowModal] = useState(false);
  const [editSlide, setEditSlide] = useState(null);
  const [formData, setFormData] = useState({
    img: '',
    titulo: '',
    preco: '',
    desconto: '',
    link: '',
    gradient: 'linear-gradient(to bottom, #7C3AED, #fff)'
  });

  useEffect(() => {
    carregarProdutos();
    carregarSlides();
  }, []);

  const carregarProdutos = async () => {
    try {
      const response = await productService.getAll();
      setProdutos(response.data);
    } catch (error) {
      toast.error('Erro ao carregar produtos');
    } finally {
      setLoading(false);
    }
  };

  const carregarSlides = async () => {
    try {
      const response = await carouselService.getAll();
      setSlides(response.data);
    } catch (error) {
      console.error('Erro ao carregar slides');
    }
  };

  const handleDeleteSlide = async (id, titulo) => {
    if (!confirm(`Excluir slide "${titulo}"?`)) return;
    try {
      await carouselService.delete(id);
      toast.success('Slide excluído!');
      carregarSlides();
    } catch (error) {
      toast.error('Erro ao excluir slide');
    }
  };

  const handleSaveSlide = async (e) => {
    e.preventDefault();
    try {
      if (editSlide) {
        await carouselService.update(editSlide.id, formData);
        toast.success('Slide atualizado!');
      } else {
        await carouselService.create(formData);
        toast.success('Slide criado!');
      }
      setShowModal(false);
      setEditSlide(null);
      setFormData({ img: '', titulo: '', preco: '', desconto: '', link: '', gradient: 'linear-gradient(to bottom, #7C3AED, #fff)' });
      carregarSlides();
    } catch (error) {
      toast.error('Erro ao salvar slide');
    }
  };

  const openModal = (slide = null) => {
    if (slide) {
      setEditSlide(slide);
      setFormData(slide);
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditSlide(null);
    setFormData({ img: '', titulo: '', preco: '', desconto: '', link: '', gradient: 'linear-gradient(to bottom, #7C3AED, #fff)' });
  };

  const handleDelete = async (id, nome) => {
    if (!confirm(`Tem certeza que deseja excluir "${nome}"?`)) return;

    try {
      await productService.delete(id);
      toast.success('Produto excluído com sucesso!');
      carregarProdutos();
    } catch (error) {
      toast.error('Erro ao excluir produto');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-50 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Painel Admin</h1>
          <Button
            onClick={() => tab === 'produtos' ? navigate('/admin/produtos/cadastrar') : openModal()}
            className="bg-green-600 hover:bg-green-700 flex items-center gap-2"
          >
            <HiOutlinePlus /> {tab === 'produtos' ? 'Novo Produto' : 'Novo Slide'}
          </Button>
        </div>

        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setTab('produtos')}
            className={`px-6 py-2 rounded-lg font-semibold ${tab === 'produtos' ? 'bg-purple-600 text-white' : 'bg-white text-gray-600'}`}
          >
            Produtos
          </button>
          <button
            onClick={() => setTab('carousel')}
            className={`px-6 py-2 rounded-lg font-semibold ${tab === 'carousel' ? 'bg-purple-600 text-white' : 'bg-white text-gray-600'}`}
          >
            Carrossel
          </button>
        </div>

        {tab === 'produtos' && (
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Imagem</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nome</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Categoria</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Preço</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {produtos.map((produto) => (
                  <tr key={produto.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <img
                        src={produto.imagem || produto.image}
                        alt={produto.nome || produto.name}
                        className="w-16 h-16 object-contain rounded"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">{produto.nome || produto.name}</div>
                      <div className="text-sm text-gray-500">{produto.descricao || produto.description}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">{produto.categoria || produto.category}</td>
                    <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                      R$ {typeof produto.preco === 'string' ? produto.preco : produto.preco?.toFixed(2)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleDelete(produto.id, produto.nome || produto.name)}
                          className="text-red-600 hover:text-red-800 p-2"
                          title="Excluir"
                        >
                          <HiOutlineTrash className="text-xl" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {produtos.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">Nenhum produto cadastrado</p>
            </div>
          )}
        </div>
        )}

        {tab === 'carousel' && (
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Imagem</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Título</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Preço</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Desconto</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {slides.map((slide) => (
                  <tr key={slide.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <img src={slide.img} alt={slide.titulo} className="w-24 h-16 object-cover rounded" />
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{slide.titulo}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{slide.preco}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{slide.desconto}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button onClick={() => openModal(slide)} className="text-blue-600 hover:text-blue-800 p-2" title="Editar">
                          <HiOutlinePencil className="text-xl" />
                        </button>
                        <button onClick={() => handleDeleteSlide(slide.id, slide.titulo)} className="text-red-600 hover:text-red-800 p-2" title="Excluir">
                          <HiOutlineTrash className="text-xl" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {slides.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">Nenhum slide cadastrado</p>
            </div>
          )}
        </div>
        )}

        {showModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-6 max-w-md w-full">
              <h2 className="text-2xl font-bold mb-4">{editSlide ? 'Editar Slide' : 'Novo Slide'}</h2>
              <form onSubmit={handleSaveSlide} className="space-y-4">
                <input type="text" placeholder="URL da Imagem" value={formData.img} onChange={(e) => setFormData({...formData, img: e.target.value})} className="w-full px-4 py-2 border rounded-lg" required />
                <input type="text" placeholder="Título" value={formData.titulo} onChange={(e) => setFormData({...formData, titulo: e.target.value})} className="w-full px-4 py-2 border rounded-lg" required />
                <input type="text" placeholder="Preço (ex: R$ 89,90)" value={formData.preco} onChange={(e) => setFormData({...formData, preco: e.target.value})} className="w-full px-4 py-2 border rounded-lg" required />
                <input type="text" placeholder="Desconto (ex: 50% OFF)" value={formData.desconto} onChange={(e) => setFormData({...formData, desconto: e.target.value})} className="w-full px-4 py-2 border rounded-lg" required />
                <input type="text" placeholder="Link (ex: /feminina/vestidos)" value={formData.link} onChange={(e) => setFormData({...formData, link: e.target.value})} className="w-full px-4 py-2 border rounded-lg" required />
                <select value={formData.gradient} onChange={(e) => setFormData({...formData, gradient: e.target.value})} className="w-full px-4 py-2 border rounded-lg">
                  <option value="linear-gradient(to bottom, #DC2626, #fff)">Vermelho</option>
                  <option value="linear-gradient(to bottom, #059669, #fff)">Verde</option>
                  <option value="linear-gradient(to bottom, #7C3AED, #fff)">Roxo</option>
                  <option value="linear-gradient(to bottom, #EA580C, #fff)">Laranja</option>
                  <option value="linear-gradient(to bottom, #DB2777, #fff)">Rosa</option>
                </select>
                <div className="flex gap-2">
                  <Button type="submit" className="flex-1 bg-green-600 hover:bg-green-700">Salvar</Button>
                  <Button type="button" onClick={closeModal} className="flex-1 bg-gray-500 hover:bg-gray-600">Cancelar</Button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
