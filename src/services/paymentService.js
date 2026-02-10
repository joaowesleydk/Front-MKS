export const paymentService = {
  // Simular criação de preferência (sem backend)
  createPreference: async (orderData) => {
    // Simular delay de API
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Retornar URL de exemplo do Mercado Pago
    return {
      init_point: `https://www.mercadopago.com.br/checkout/v1/redirect?pref_id=exemplo-${Date.now()}`,
      id: `pref-${Date.now()}`,
      status: 'pending'
    };
  },

  // Verificar status (simulado)
  checkPaymentStatus: async (paymentId) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return {
      status: 'approved',
      payment_id: paymentId
    };
  }
};