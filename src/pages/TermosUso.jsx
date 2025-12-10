import { Link } from 'react-router-dom';
import { HiArrowLeft } from 'react-icons/hi2';

export const TermosUso = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="flex items-center gap-4 mb-8">
            <Link 
              to="/cadastro" 
              className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors"
            >
              <HiArrowLeft />
              Voltar
            </Link>
            <h1 className="text-3xl font-bold text-gray-800">Termos de Uso</h1>
          </div>

          <div className="prose prose-gray max-w-none space-y-6">
            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">1. Aceitação dos Termos</h2>
              <p className="text-gray-600 leading-relaxed">
                Ao acessar e usar o site da MKS Store, você concorda em cumprir estes termos de uso. 
                Se você não concordar com qualquer parte destes termos, não deve usar nosso serviço.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">2. Uso do Site</h2>
              <p className="text-gray-600 leading-relaxed">
                Você pode usar nosso site para navegar, pesquisar e comprar produtos. É proibido:
              </p>
              <ul className="list-disc list-inside text-gray-600 mt-2 space-y-1">
                <li>Usar o site para fins ilegais</li>
                <li>Tentar hackear ou comprometer a segurança</li>
                <li>Fazer upload de conteúdo malicioso</li>
                <li>Violar direitos de propriedade intelectual</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">3. Conta do Usuário</h2>
              <p className="text-gray-600 leading-relaxed">
                Você é responsável por manter a confidencialidade da sua conta e senha. 
                Notifique-nos imediatamente sobre qualquer uso não autorizado da sua conta.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">4. Produtos e Preços</h2>
              <p className="text-gray-600 leading-relaxed">
                Todos os preços estão sujeitos a alterações sem aviso prévio. 
                Nos reservamos o direito de modificar ou descontinuar produtos a qualquer momento.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">5. Política de Troca e Devolução</h2>
              <p className="text-gray-600 leading-relaxed">
                Aceitamos trocas e devoluções em até 7 dias após o recebimento, 
                desde que o produto esteja em perfeitas condições e com etiquetas originais.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">6. Limitação de Responsabilidade</h2>
              <p className="text-gray-600 leading-relaxed">
                A MKS Store não se responsabiliza por danos indiretos, incidentais ou consequenciais 
                decorrentes do uso do site ou produtos adquiridos.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">7. Contato</h2>
              <p className="text-gray-600 leading-relaxed">
                Para dúvidas sobre estes termos, entre em contato conosco:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg mt-2">
                <p className="text-gray-700">
                  <strong>Email:</strong> karinamodastore@gmail.com<br/>
                  <strong>Telefone:</strong> (35) 9 9885-3145<br/>
                  <strong>Endereço:</strong> Pouso Alegre, MG
                </p>
              </div>
            </section>

            <div className="border-t pt-6 mt-8">
              <p className="text-sm text-gray-500">
                Última atualização: Janeiro de 2025
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};