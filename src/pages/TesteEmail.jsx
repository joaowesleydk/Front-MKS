import { EmailTest } from '../components/EmailTest';

export const TesteEmail = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Teste de Configuração de Email
          </h1>
          <p className="text-gray-600">
            Verifique se o email karinamodastore@gmail.com está funcionando corretamente
          </p>
        </div>
        
        <EmailTest />
        
        <div className="max-w-2xl mx-auto mt-8 bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Como funciona o teste:
          </h2>
          <div className="space-y-3 text-gray-600">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-blue-600 text-sm font-bold">1</span>
              </div>
              <p>Clique no botão "Enviar Email de Teste"</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-blue-600 text-sm font-bold">2</span>
              </div>
              <p>O sistema enviará um email de teste para karinamodastore@gmail.com</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-blue-600 text-sm font-bold">3</span>
              </div>
              <p>Verifique sua caixa de entrada (e spam) para confirmar o recebimento</p>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h3 className="font-medium text-blue-800 mb-2">ℹ️ Informação:</h3>
            <p className="text-blue-700 text-sm">
              O teste tentará enviar um email real através da API do backend. 
              Se o backend não estiver configurado com um serviço de email, 
              você verá uma mensagem de erro, mas isso é normal.
            </p>
          </div>
          
          <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
            <h3 className="font-medium text-green-800 mb-2">✅ Email Configurado:</h3>
            <p className="text-green-700 text-sm font-mono">
              karinamodastore@gmail.com
            </p>
            <p className="text-green-600 text-xs mt-1">
              Todos os emails do sistema serão enviados para este endereço.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};