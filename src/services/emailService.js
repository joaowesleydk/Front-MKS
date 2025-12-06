import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

// Configuração do email da loja
export const STORE_EMAIL = 'karinamodastore@gmail.com';

/**
 * Serviço de envio de emails
 */
export const emailService = {
  /**
   * Envia email de teste
   */
  async sendTestEmail() {
    try {
      const response = await axios.post(`${API_URL}/api/email/test`, {
        to: STORE_EMAIL,
        subject: 'Teste de Configuração - MKS Store',
        template: 'test',
        data: {
          timestamp: new Date().toISOString(),
          system: 'MKS Store E-commerce'
        }
      });

      return {
        success: true,
        message: 'Email de teste enviado com sucesso!',
        data: response.data
      };
    } catch (error) {
      console.error('Erro ao enviar email de teste:', error);
      return {
        success: false,
        message: 'Erro ao enviar email de teste',
        error: error.response?.data?.message || error.message
      };
    }
  },

  /**
   * Envia email de contato do cliente
   */
  async sendContactEmail(contactData) {
    try {
      const response = await axios.post(`${API_URL}/api/email/contact`, {
        to: STORE_EMAIL,
        subject: `Novo Contato - ${contactData.subject}`,
        template: 'contact',
        data: {
          name: contactData.name,
          email: contactData.email,
          phone: contactData.phone,
          subject: contactData.subject,
          message: contactData.message,
          timestamp: new Date().toISOString()
        }
      });

      return {
        success: true,
        message: 'Mensagem enviada com sucesso!',
        data: response.data
      };
    } catch (error) {
      console.error('Erro ao enviar email de contato:', error);
      return {
        success: false,
        message: 'Erro ao enviar mensagem',
        error: error.response?.data?.message || error.message
      };
    }
  },

  /**
   * Envia confirmação de pedido
   */
  async sendOrderConfirmation(orderData) {
    try {
      const response = await axios.post(`${API_URL}/api/email/order-confirmation`, {
        to: orderData.customerEmail,
        subject: `Pedido Confirmado #${orderData.orderId} - MKS Store`,
        template: 'order-confirmation',
        data: {
          orderId: orderData.orderId,
          customerName: orderData.customerName,
          items: orderData.items,
          total: orderData.total,
          shippingAddress: orderData.shippingAddress,
          paymentMethod: orderData.paymentMethod,
          timestamp: new Date().toISOString()
        }
      });

      return {
        success: true,
        message: 'Email de confirmação enviado!',
        data: response.data
      };
    } catch (error) {
      console.error('Erro ao enviar confirmação de pedido:', error);
      return {
        success: false,
        message: 'Erro ao enviar confirmação',
        error: error.response?.data?.message || error.message
      };
    }
  },

  /**
   * Envia notificação de novo pedido para a loja
   */
  async sendNewOrderNotification(orderData) {
    try {
      const response = await axios.post(`${API_URL}/api/email/new-order`, {
        to: STORE_EMAIL,
        subject: `Novo Pedido #${orderData.orderId} - MKS Store`,
        template: 'new-order',
        data: {
          orderId: orderData.orderId,
          customerName: orderData.customerName,
          customerEmail: orderData.customerEmail,
          customerPhone: orderData.customerPhone,
          items: orderData.items,
          total: orderData.total,
          shippingAddress: orderData.shippingAddress,
          paymentMethod: orderData.paymentMethod,
          timestamp: new Date().toISOString()
        }
      });

      return {
        success: true,
        message: 'Notificação enviada para a loja!',
        data: response.data
      };
    } catch (error) {
      console.error('Erro ao enviar notificação de pedido:', error);
      return {
        success: false,
        message: 'Erro ao enviar notificação',
        error: error.response?.data?.message || error.message
      };
    }
  },

  /**
   * Envia email de recuperação de senha
   */
  async sendPasswordReset(email, resetToken) {
    try {
      const response = await axios.post(`${API_URL}/api/email/password-reset`, {
        to: email,
        subject: 'Recuperação de Senha - MKS Store',
        template: 'password-reset',
        data: {
          resetToken,
          resetUrl: `${window.location.origin}/reset-password?token=${resetToken}`,
          timestamp: new Date().toISOString()
        }
      });

      return {
        success: true,
        message: 'Email de recuperação enviado!',
        data: response.data
      };
    } catch (error) {
      console.error('Erro ao enviar email de recuperação:', error);
      return {
        success: false,
        message: 'Erro ao enviar email de recuperação',
        error: error.response?.data?.message || error.message
      };
    }
  }
};

export default emailService;