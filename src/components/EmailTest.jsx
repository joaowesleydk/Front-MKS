import { useState } from 'react';
import { HiOutlineMail, HiOutlinePaperAirplane } from 'react-icons/hi';
import toast from 'react-hot-toast';
import { emailService, STORE_EMAIL } from '../services/emailService';

export const EmailTest = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [testResult, setTestResult] = useState(null);

  const testEmail = async () => {
    setIsLoading(true);
    setTestResult(null);

    try {
      const result = await emailService.sendTestEmail();
      
      setTestResult({
        success: result.success,
        message: result.message,
        details: result.success 
          ? `Enviado para: ${STORE_EMAIL}` 
          : result.error || 'Erro desconhecido'
      });

      if (result.success) {
        toast.success('Email de teste enviado!');
      } else {
        toast.error('Erro no envio do email');
      }

    } catch (error) {
      setTestResult({
        success: false,
        message: 'Erro ao enviar email de teste',
        details: error.message
      });

      toast.error('Erro no envio do email');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6 m-4">
      <div className="text-center mb-6">
        <HiOutlineMail className="mx-auto text-4xl text-blue-500 mb-2" />
        <h3 className="text-lg font-semibold text-gray-800">Teste de Email</h3>
        <p className="text-sm text-gray-600">
          Verificar configuração do email: <br />
          <span className="font-mono text-blue-600">{STORE_EMAIL}</span>
        </p>
      </div>

      <button
        onClick={testEmail}
        disabled={isLoading}
        className={`w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-lg font-medium transition-all duration-300 ${
          isLoading
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl'
        }`}
      >
        {isLoading ? (
          <>
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            <span>Enviando...</span>
          </>
        ) : (
          <>
            <HiOutlinePaperAirplane className="text-xl" />
            <span>Enviar Email de Teste</span>
          </>
        )}
      </button>

      {testResult && (
        <div className={`mt-4 p-4 rounded-lg ${
          testResult.success 
            ? 'bg-green-50 border border-green-200' 
            : 'bg-red-50 border border-red-200'
        }`}>
          <div className={`flex items-center space-x-2 mb-2 ${
            testResult.success ? 'text-green-700' : 'text-red-700'
          }`}>
            <div className={`w-2 h-2 rounded-full ${
              testResult.success ? 'bg-green-500' : 'bg-red-500'
            }`}></div>
            <span className="font-medium">{testResult.message}</span>
          </div>
          <p className={`text-sm ${
            testResult.success ? 'text-green-600' : 'text-red-600'
          }`}>
            {testResult.details}
          </p>
        </div>
      )}

      <div className="mt-4 p-3 bg-gray-50 rounded-lg">
        <h4 className="text-sm font-medium text-gray-700 mb-2">Informações do Teste:</h4>
        <ul className="text-xs text-gray-600 space-y-1">
          <li>• Email de destino: {STORE_EMAIL}</li>
          <li>• Assunto: Teste de Configuração - MKS Store</li>
          <li>• Tipo: Verificação de conectividade</li>
        </ul>
      </div>
    </div>
  );
};