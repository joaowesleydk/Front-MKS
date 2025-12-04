import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Button } from '../components/Button';
import { HiOutlineCheckCircle } from 'react-icons/hi2';

export const PagamentoSucesso = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { clearCart } = useCart();
  
  const paymentId = searchParams.get('payment_id');
  const status = searchParams.get('status');
  const externalReference = searchParams.get('external_reference');

  useEffect(() => {
    // Limpar carrinho quando pagamento for aprovado
    if (status === 'approved') {
      clearCart();
    }
  }, [status, clearCart]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 pt-40">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center">
        <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
          <HiOutlineCheckCircle className="text-4xl text-green-600" />
        </div>
        
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Pagamento Realizado!
        </h1>
        
        <p className="text-gray-600 mb-6">
          Seu pagamento foi processado com sucesso. Você receberá um email com os detalhes do pedido.
        </p>
        
        {paymentId && (
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <p className="text-sm text-gray-600">ID do Pagamento:</p>
            <p className="font-mono text-sm font-semibold">{paymentId}</p>
          </div>
        )}
        
        <div className="space-y-3">
          <Button 
            onClick={() => navigate('/')}
            className="w-full bg-green-600 hover:bg-green-700"
          >
            Continuar Comprando
          </Button>
          
          <Button 
            onClick={() => navigate('/perfil')}
            className="w-full bg-gray-600 hover:bg-gray-700"
          >
            Ver Meus Pedidos
          </Button>
        </div>
      </div>
    </div>
  );
};