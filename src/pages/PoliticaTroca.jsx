import React from 'react';
export const PoliticaTroca = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-20 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Política de Troca e Devolução</h1>
        
        <div className="space-y-6 text-gray-700">
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">1. Prazo para Trocas</h2>
            <p>Você tem até <strong>30 dias</strong> após o recebimento do produto para solicitar troca ou devolução, conforme o Código de Defesa do Consumidor.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">2. Condições para Troca</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>Produto em perfeito estado, sem uso</li>
              <li>Etiquetas originais preservadas</li>
              <li>Embalagem original</li>
              <li>Nota fiscal ou comprovante de compra</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">3. Produtos Não Trocáveis</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>Lingerie e produtos íntimos</li>
              <li>Produtos personalizados</li>
              <li>Produtos em promoção (consulte condições específicas)</li>
              <li>Produtos danificados por mau uso</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">4. Como Solicitar Troca</h2>
            <ol className="list-decimal list-inside space-y-2">
              <li>Entre em contato pelo email: trocas@karinamodastore.com.br</li>
              <li>Informe o número do pedido e motivo da troca</li>
              <li>Aguarde as instruções de envio</li>
              <li>Envie o produto conforme orientações</li>
            </ol>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">5. Frete para Devolução</h2>
            <p>O frete de devolução é <strong>gratuito</strong> em casos de defeito ou erro nosso. Para trocas por arrependimento, o frete fica por conta do cliente.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">6. Reembolso</h2>
            <p>O reembolso será processado em até <strong>10 dias úteis</strong> após recebermos e analisarmos o produto devolvido.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">7. Produtos com Defeito</h2>
            <p>Produtos com defeito de fabricação serão trocados imediatamente, sem custo adicional para o cliente.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">8. Contato</h2>
            <p>Dúvidas sobre trocas: trocas@karinamodastore.com.br ou WhatsApp: (11) 99999-9999</p>
          </section>
        </div>

        <div className="mt-8 pt-6 border-t text-sm text-gray-500">
          <p>Última atualização: Janeiro de 2025</p>
        </div>
      </div>
    </div>
  );
};