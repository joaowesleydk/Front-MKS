import api from './api';

export const paymentService = {
  // Criar preferência de pagamento
  createPreference: async (orderData) => {
    try {
      const response = await api.post('/api/payments/create-preference', orderData);
      return response.data;
    } catch (error) {
      console.error('Erro no pagamento:', error);
      // Se backend não estiver disponível, mostrar erro específico
      if (error.code === 'ECONNABORTED' || error.code === 'ERR_NETWORK') {
        throw new Error('Backend de pagamento indisponível. Tente novamente em alguns minutos.');
      }
      throw new Error(error.response?.data?.message || 'Erro ao criar preferência de pagamento');
    }
  },

  // Verificar status do pagamento
  checkPaymentStatus: async (paymentId) => {
    try {
      const response = await api.get(`/api/payments/status/${paymentId}`);
      return response.data;
    } catch (error) {
      throw new Error('Erro ao verificar status do pagamento');
    }
  },

  // Processar webhook do Mercado Pago
  processWebhook: async (webhookData) => {
    try {
      const response = await api.post('/api/payments/webhook', webhookData);
      return response.data;
    } catch (error) {
      throw new Error('Erro ao processar webhook');
    }
  }
};