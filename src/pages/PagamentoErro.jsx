import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '../components/Button';
import { HiOutlineXCircle } from 'react-icons/hi2';

export const PagamentoErro = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  const paymentId = searchParams.get('payment_id');
  const status = searchParams.get('status');

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 pt-40">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center">
        <div className="bg-red-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
          <HiOutlineXCircle className="text-4xl text-red-600" />
        </div>
        
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Pagamento Não Realizado
        </h1>
        
        <p className="text-gray-600 mb-6">
          Houve um problema com seu pagamento. Você pode tentar novamente ou escolher outro método de pagamento.
        </p>
        
        {status && (
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <p className="text-sm text-gray-600">Status:</p>
            <p className="font-semibold text-red-600">{status}</p>
          </div>
        )}
        
        <div className="space-y-3">
          <Button 
            onClick={() => navigate('/pagamento')}
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            Tentar Novamente
          </Button>
          
          <Button 
            onClick={() => navigate('/sacola')}
            className="w-full bg-gray-600 hover:bg-gray-700"
          >
            Voltar ao Carrinho
          </Button>
        </div>
      </div>
    </div>
  );
};