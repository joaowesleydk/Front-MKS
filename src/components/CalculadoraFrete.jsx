import { useState } from 'react';
import { HiOutlineMapPin, HiOutlineTruck } from 'react-icons/hi2';
import { freteService } from '../services/freteService';
import toast from 'react-hot-toast';

export const CalculadoraFrete = ({ valorCompra = 0, onFreteCalculado }) => {
  const [cep, setCep] = useState('');
  const [loading, setLoading] = useState(false);
  const [endereco, setEndereco] = useState(null);
  const [opcoesFrete, setOpcoesFrete] = useState([]);

  const formatarCep = (valor) => {
    const numeros = valor.replace(/\D/g, '');
    return numeros.replace(/(\d{5})(\d{3})/, '$1-$2');
  };

  const calcularFrete = async () => {
    if (!cep || cep.length < 9) {
      toast.error('Digite um CEP válido');
      return;
    }

    setLoading(true);
    try {
      const enderecoData = await freteService.buscarEnderecoPorCep(cep);
      const opcoes = freteService.getOpcoesEntrega(enderecoData, valorCompra);
      
      setEndereco(enderecoData);
      setOpcoesFrete(opcoes);
      
      if (onFreteCalculado) {
        onFreteCalculado(opcoes[1] || opcoes[0]); // Prioriza correios, senão retirada
      }
      
      toast.success('Frete calculado com sucesso!');
    } catch (error) {
      toast.error(error.message);
      setEndereco(null);
      setOpcoesFrete([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      <h3 className="font-semibold mb-3 flex items-center gap-2">
        <HiOutlineTruck className="text-blue-500" />
        Calcular Frete
      </h3>
      
      {/* Input CEP */}
      <div className="flex gap-2 mb-3">
        <input
          type="text"
          placeholder="Digite seu CEP"
          value={cep}
          onChange={(e) => setCep(formatarCep(e.target.value))}
          maxLength={9}
          className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={calcularFrete}
          disabled={loading}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
        >
          {loading ? '...' : 'OK'}
        </button>
      </div>

      {/* Endereço encontrado */}
      {endereco && (
        <div className="mb-3 p-3 bg-white rounded border">
          <div className="flex items-start gap-2">
            <HiOutlineMapPin className="text-green-500 mt-1" />
            <div className="text-sm">
              <p className="font-medium">{endereco.localidade} - {endereco.uf}</p>
              <p className="text-gray-600">{endereco.bairro}</p>
              {endereco.logradouro && (
                <p className="text-gray-600">{endereco.logradouro}</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Opções de frete */}
      {opcoesFrete.length > 0 && (
        <div className="space-y-2">
          {opcoesFrete.map((opcao, index) => (
            <div key={index} className="p-3 bg-white rounded border hover:border-blue-300 cursor-pointer">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium text-sm">{opcao.nome}</p>
                  <p className="text-xs text-gray-600">{opcao.prazo}</p>
                </div>
                <div className="text-right">
                  {opcao.valor === 0 ? (
                    <span className="text-green-600 font-bold text-sm">GRÁTIS</span>
                  ) : (
                    <span className="font-bold text-sm">R$ {opcao.valor.toFixed(2)}</span>
                  )}
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-1">{opcao.descricao}</p>
            </div>
          ))}
          
          {valorCompra < 150 && valorCompra > 0 && (
            <div className="text-xs text-gray-600 mt-2 p-2 bg-yellow-50 rounded">
              💡 Frete GRÁTIS em compras acima de R$ 150,00
            </div>
          )}
        </div>
      )}
    </div>
  );
};