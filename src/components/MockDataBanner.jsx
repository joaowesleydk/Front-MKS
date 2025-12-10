import { HiOutlineInformationCircle } from 'react-icons/hi2';

export const MockDataBanner = ({ showOnPayment = false }) => {
  const isMockData = localStorage.getItem('usingMockData') === 'true';
  
  if (!isMockData) return null;

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
      <div className="flex items-start gap-3">
        <HiOutlineInformationCircle className="text-blue-500 text-xl mt-0.5 flex-shrink-0" />
        <div className="text-sm">
          <p className="text-blue-800 font-medium mb-1">
            {showOnPayment ? 'Modo Demonstração - Pagamento Real' : 'Modo Demonstração'}
          </p>
          <p className="text-blue-700">
            {showOnPayment 
              ? 'Os produtos são fictícios para demonstração, mas o pagamento será processado normalmente pelo Mercado Pago.'
              : 'Você está visualizando produtos de demonstração. O backend não está disponível no momento.'
            }
          </p>
        </div>
      </div>
    </div>
  );
};