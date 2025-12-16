import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { HiOutlineCreditCard, HiOutlineQrCode, HiOutlineBanknotes } from 'react-icons/hi2';
import { Button } from '../components/Button';
import { paymentService } from '../services/paymentService';
import { freteService } from '../services/freteService';

import toast from 'react-hot-toast';

export const Pagamento = () => {
  const navigate = useNavigate();
  const { items, getTotal, clearCart } = useCart();
  const [tempProduct, setTempProduct] = useState(null);
  
  // Verificar se há produto temporário (compra direta)
  useState(() => {
    const temp = localStorage.getItem('tempProduct');
    if (temp) {
      setTempProduct(JSON.parse(temp));
      localStorage.removeItem('tempProduct');
    }
  }, []);

  const calcularFrete = async () => {
    const cep = dadosEntrega.cep.replace(/\D/g, '');
    if (cep.length !== 8) {
      toast.error('Digite um CEP válido com 8 dígitos');
      return;
    }

    setLoadingFrete(true);
    try {
      const endereco = await freteService.consultarCEP(cep);
      if (endereco.erro) {
        toast.error('CEP não encontrado. Verifique se digitou corretamente.');
        return;
      }

      // Preencher endereço automaticamente
      setDadosEntrega(prev => ({
        ...prev,
        endereco: endereco.logradouro || prev.endereco,
        cidade: endereco.localidade || prev.cidade,
        estado: endereco.uf || prev.estado
      }));

      // Mostrar endereço encontrado
      const enderecoCompleto = `${endereco.logradouro ? endereco.logradouro + ', ' : ''}${endereco.bairro ? endereco.bairro + ', ' : ''}${endereco.localidade}/${endereco.uf}`;
      
      // Verificar se é da cidade local
      const isCidadeLocal = freteService.isCidadeLocal(endereco.localidade, endereco.uf);
      
      if (isCidadeLocal) {
        toast.success(`📍 ${enderecoCompleto}\n🎉 Você pode retirar na loja gratuitamente!`);
      }
      
      // Calcular frete
      const valorFrete = freteService.freteGratis(subtotal) ? 
        0 : freteService.calcularFrete(endereco.uf);
      
      setFrete(valorFrete);
      
      if (valorFrete === 0 && !isCidadeLocal) {
        toast.success(`📍 ${enderecoCompleto}\n🎉 Frete grátis!`);
      } else if (valorFrete > 0) {
        toast.success(`📍 ${enderecoCompleto}\n📦 Frete: R$ ${valorFrete.toFixed(2)}`);
      }
    } catch (error) {
      console.error('Erro ao consultar CEP:', error);
      toast.error('Erro ao consultar CEP. Tente novamente.');
    } finally {
      setLoadingFrete(false);
    }
  };
  const [metodoPagamento, setMetodoPagamento] = useState('cartao');
  const [dadosCartao, setDadosCartao] = useState({
    numero: '',
    nome: '',
    validade: '',
    cvv: ''
  });
  const [dadosEntrega, setDadosEntrega] = useState({
    nome: '',
    email: '',
    cpf: '',
    rg: '',
    telefone: '',
    cep: '',
    endereco: '',
    numero: '',
    cidade: '',
    estado: ''
  });
  const [loading, setLoading] = useState(false);
  const [frete, setFrete] = useState(0);
  const [loadingFrete, setLoadingFrete] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Limpar e validar email
      const cleanEmail = dadosEntrega.email.trim().toLowerCase();
      if (!cleanEmail.includes('@') || !cleanEmail.includes('.')) {
        toast.error('Por favor, insira um email válido');
        setLoading(false);
        return;
      }

      // Preparar dados do pedido
      const orderData = {
        items: paymentItems.map(item => ({
          title: item.nome,
          unit_price: parseFloat(item.preco.replace('R$', '').replace(',', '.')),
          quantity: item.quantidade,
          currency_id: 'BRL'
        })),
        payer: {
          name: dadosEntrega.nome,
          email: cleanEmail
        },
        payment_methods: {
          excluded_payment_methods: [],
          excluded_payment_types: [],
          installments: 12
        },
        back_urls: {
          success: `${window.location.origin}/pagamento/sucesso`,
          failure: `${window.location.origin}/pagamento/erro`,
          pending: `${window.location.origin}/pagamento/pendente`
        },
        auto_return: 'approved',
        external_reference: `pedido_${Date.now()}`
      };

      // Criar preferência no Mercado Pago
      const preference = await paymentService.createPreference(orderData);
      
      // Redirecionar para checkout do Mercado Pago
      window.location.href = preference.init_point;
      
    } catch (error) {
      console.error('Erro completo no pagamento:', error);
      console.error('Response data:', error.response?.data);
      console.error('Status:', error.response?.status);
      
      const errorMsg = error.response?.data?.message || error.response?.data?.detail || 'Erro ao processar pagamento. Tente novamente.';
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  // Determinar itens para pagamento (sacola ou produto temporário)
  const paymentItems = tempProduct ? [{ ...tempProduct, quantidade: 1 }] : items;
  const subtotal = tempProduct ? 
    parseFloat(tempProduct.preco.replace('R$', '').replace(',', '.')) : 
    getTotal();
  const paymentTotal = subtotal + frete;

  if (paymentItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Sacola vazia</h2>
          <p className="text-gray-600 mb-6">Adicione produtos à sacola para continuar</p>
          <Button onClick={() => navigate('/')}>
            Continuar Comprando
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 pt-40">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center py-12 mb-8 text-gray-800">
          Finalizar Compra
        </h1>
        


        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Formulário de pagamento */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-bold mb-6">Dados de Entrega</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Nome completo"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black"
                  value={dadosEntrega.nome}
                  onChange={(e) => setDadosEntrega({...dadosEntrega, nome: e.target.value})}
                  required
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black"
                  value={dadosEntrega.email}
                  onChange={(e) => setDadosEntrega({...dadosEntrega, email: e.target.value})}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="CPF (000.000.000-00)"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black"
                  value={dadosEntrega.cpf}
                  onChange={(e) => {
                    let value = e.target.value.replace(/\D/g, '');
                    if (value.length > 0) {
                      if (value.length <= 3) {
                        value = value;
                      } else if (value.length <= 6) {
                        value = `${value.slice(0, 3)}.${value.slice(3)}`;
                      } else if (value.length <= 9) {
                        value = `${value.slice(0, 3)}.${value.slice(3, 6)}.${value.slice(6)}`;
                      } else {
                        value = `${value.slice(0, 3)}.${value.slice(3, 6)}.${value.slice(6, 9)}-${value.slice(9, 11)}`;
                      }
                    }
                    setDadosEntrega({...dadosEntrega, cpf: value});
                  }}
                  maxLength={14}
                  required
                />
                <input
                  type="text"
                  placeholder="RG (00.000.000-0)"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black"
                  value={dadosEntrega.rg}
                  onChange={(e) => {
                    let value = e.target.value.replace(/[^0-9X]/gi, '');
                    if (value.length > 0) {
                      if (value.length <= 2) {
                        value = value;
                      } else if (value.length <= 5) {
                        value = `${value.slice(0, 2)}.${value.slice(2)}`;
                      } else if (value.length <= 8) {
                        value = `${value.slice(0, 2)}.${value.slice(2, 5)}.${value.slice(5)}`;
                      } else {
                        value = `${value.slice(0, 2)}.${value.slice(2, 5)}.${value.slice(5, 8)}-${value.slice(8, 9)}`;
                      }
                    }
                    setDadosEntrega({...dadosEntrega, rg: value});
                  }}
                  maxLength={12}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="tel"
                  placeholder="Telefone (00) 00000-0000"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black"
                  value={dadosEntrega.telefone}
                  onChange={(e) => {
                    let value = e.target.value.replace(/\D/g, '');
                    if (value.length > 0) {
                      if (value.length <= 2) {
                        value = `(${value}`;
                      } else if (value.length <= 7) {
                        value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
                      } else {
                        value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7, 11)}`;
                      }
                    }
                    setDadosEntrega({...dadosEntrega, telefone: value});
                  }}
                  maxLength={15}
                  required
                />
                <input
                  type="text"
                  placeholder="CEP (00000-000)"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black"
                  value={dadosEntrega.cep}
                  onChange={(e) => {
                    let value = e.target.value.replace(/\D/g, '');
                    if (value.length > 5) {
                      value = value.replace(/(\d{5})(\d)/, '$1-$2');
                    }
                    if (value.length > 9) {
                      value = value.substring(0, 9);
                    }
                    setDadosEntrega({...dadosEntrega, cep: value});
                  }}
                  maxLength={9}
                  required
                />
              </div>

              <input
                type="text"
                placeholder="Endereço completo"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black"
                value={dadosEntrega.endereco}
                onChange={(e) => setDadosEntrega({...dadosEntrega, endereco: e.target.value})}
                required
              />

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <input
                  type="text"
                  placeholder="Número"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black"
                  value={dadosEntrega.numero}
                  onChange={(e) => setDadosEntrega({...dadosEntrega, numero: e.target.value})}
                  required
                />
                <input
                  type="text"
                  placeholder="Cidade"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black"
                  value={dadosEntrega.cidade}
                  onChange={(e) => setDadosEntrega({...dadosEntrega, cidade: e.target.value})}
                  required
                />
                <input
                  type="text"
                  placeholder="Estado"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black"
                  value={dadosEntrega.estado}
                  onChange={(e) => setDadosEntrega({...dadosEntrega, estado: e.target.value})}
                  required
                />
              </div>

              {/* Cálculo de Frete */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-3">Opções de Entrega</h3>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      id="entrega"
                      name="tipoEntrega"
                      value="entrega"
                      defaultChecked
                      className="w-4 h-4 text-black"
                    />
                    <label htmlFor="entrega" className="flex-1">
                      <span className="font-medium">Entrega via Correios</span>
                      <div className="flex items-center gap-2 mt-1">
                        <button
                          type="button"
                          onClick={calcularFrete}
                          disabled={!dadosEntrega.cep || dadosEntrega.cep.length < 8 || loadingFrete}
                          className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                        >
                          {loadingFrete ? (
                            <div className="flex items-center gap-2">
                              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                              Consultando CEP...
                            </div>
                          ) : (
                            'Calcular Frete'
                          )}
                        </button>
                        {dadosEntrega.cep && dadosEntrega.cep.length < 8 && (
                          <span className="text-xs text-red-500">
                            CEP deve ter 8 dígitos
                          </span>
                        )}
                        {frete > 0 && (
                          <span className="text-sm text-gray-600">
                            R$ {frete.toFixed(2)} - Entrega em 5-10 dias úteis
                          </span>
                        )}
                        {frete === 0 && dadosEntrega.cep && (
                          <span className="text-sm text-green-600 font-medium">
                            Frete Grátis! 🎉
                          </span>
                        )}
                      </div>
                    </label>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      id="retirada"
                      name="tipoEntrega"
                      value="retirada"
                      onChange={() => setFrete(0)}
                      className="w-4 h-4 text-black"
                    />
                    <label htmlFor="retirada" className="flex-1">
                      <span className="font-medium">Retirar na Loja</span>
                      <p className="text-sm text-gray-600 mt-1">
                        📍 Sua Cidade - Grátis | Pronto em 2 horas
                      </p>
                    </label>
                  </div>
                </div>
              </div>

              <h3 className="text-lg font-semibold mt-6 mb-4">Método de Pagamento</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <button
                  type="button"
                  onClick={() => setMetodoPagamento('cartao')}
                  className={`p-4 border-2 rounded-lg flex flex-col items-center gap-2 transition-all ${
                    metodoPagamento === 'cartao' ? 'border-black bg-gray-50' : 'border-gray-300'
                  }`}
                >
                  <HiOutlineCreditCard className="text-2xl" />
                  <span className="text-sm font-medium">Cartão</span>
                </button>
                
                <button
                  type="button"
                  onClick={() => setMetodoPagamento('pix')}
                  className={`p-4 border-2 rounded-lg flex flex-col items-center gap-2 transition-all ${
                    metodoPagamento === 'pix' ? 'border-black bg-gray-50' : 'border-gray-300'
                  }`}
                >
                  <HiOutlineQrCode className="text-2xl" />
                  <span className="text-sm font-medium">PIX</span>
                </button>
                
                <button
                  type="button"
                  onClick={() => setMetodoPagamento('boleto')}
                  className={`p-4 border-2 rounded-lg flex flex-col items-center gap-2 transition-all ${
                    metodoPagamento === 'boleto' ? 'border-black bg-gray-50' : 'border-gray-300'
                  }`}
                >
                  <HiOutlineBanknotes className="text-2xl" />
                  <span className="text-sm font-medium">Boleto</span>
                </button>
              </div>

              {metodoPagamento === 'cartao' && (
                <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                  <input
                    type="text"
                    placeholder="Número do cartão"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black"
                    value={dadosCartao.numero}
                    onChange={(e) => setDadosCartao({...dadosCartao, numero: e.target.value})}
                    required
                  />
                  <input
                    type="text"
                    placeholder="Nome no cartão"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black"
                    value={dadosCartao.nome}
                    onChange={(e) => setDadosCartao({...dadosCartao, nome: e.target.value})}
                    required
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="MM/AA"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black"
                      value={dadosCartao.validade}
                      onChange={(e) => setDadosCartao({...dadosCartao, validade: e.target.value})}
                      required
                    />
                    <input
                      type="text"
                      placeholder="CVV"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black"
                      value={dadosCartao.cvv}
                      onChange={(e) => setDadosCartao({...dadosCartao, cvv: e.target.value})}
                      required
                    />
                  </div>
                </div>
              )}

              {metodoPagamento === 'pix' && (
                <div className="p-4 bg-gray-50 rounded-lg text-center">
                  <p className="text-gray-600 mb-2">Após confirmar, você receberá o código PIX</p>
                  <p className="text-sm text-gray-500">Pagamento instantâneo</p>
                </div>
              )}

              {metodoPagamento === 'boleto' && (
                <div className="p-4 bg-gray-50 rounded-lg text-center">
                  <p className="text-gray-600 mb-2">Boleto será gerado após confirmação</p>
                  <p className="text-sm text-gray-500">Vencimento em 3 dias úteis</p>
                </div>
              )}

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 mt-6"
              >
                {loading ? 'Redirecionando para pagamento...' : `Pagar R$ ${paymentTotal.toFixed(2)} - Mercado Pago`}
              </Button>
              
              <p className="text-xs text-gray-500 text-center mt-2">
                Você será redirecionado para o Mercado Pago para finalizar o pagamento
              </p>
            </form>
          </div>

          {/* Resumo do pedido */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-bold mb-6">Resumo do Pedido</h2>
            
            <div className="space-y-4 mb-6">
              {paymentItems.map((item) => (
                <div key={item.id} className="flex items-center gap-4 pb-4 border-b">
                  <img
                    src={item.imagem || 'https://via.placeholder.com/60x60'}
                    alt={item.nome}
                    className="w-15 h-15 object-contain rounded"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium text-sm">{item.nome}</h3>
                    <p className="text-gray-600 text-sm">Qtd: {item.quantidade}</p>
                  </div>
                  <p className="font-semibold">R$ {item.preco}</p>
                </div>
              ))}
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>R$ {subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Frete:</span>
                <span className={frete === 0 ? "text-green-600" : "text-gray-800"}>
                  {frete === 0 ? 'Grátis' : `R$ ${frete.toFixed(2)}`}
                </span>
              </div>
              {freteService.freteGratis(subtotal) && frete > 0 && (
                <div className="text-xs text-green-600">
                  🎉 Frete grátis em compras acima de R$ 150!
                </div>
              )}
              <div className="flex justify-between text-lg font-bold pt-2 border-t">
                <span>Total:</span>
                <span>R$ {paymentTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};