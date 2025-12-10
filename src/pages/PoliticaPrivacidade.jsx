import { Link } from 'react-router-dom';
import { HiArrowLeft, HiShieldCheck } from 'react-icons/hi2';

export const PoliticaPrivacidade = () => {
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
            <div className="flex items-center gap-3">
              <HiShieldCheck className="text-green-600 text-2xl" />
              <h1 className="text-3xl font-bold text-gray-800">Política de Privacidade</h1>
            </div>
          </div>

          <div className="prose prose-gray max-w-none space-y-6">
            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">1. Informações que Coletamos</h2>
              <p className="text-gray-600 leading-relaxed">
                Coletamos as seguintes informações quando você usa nosso site:
              </p>
              <ul className="list-disc list-inside text-gray-600 mt-2 space-y-1">
                <li><strong>Dados pessoais:</strong> Nome, email, telefone, endereço</li>
                <li><strong>Dados de navegação:</strong> IP, cookies, páginas visitadas</li>
                <li><strong>Imagens:</strong> Fotos de perfil e para provador virtual</li>
                <li><strong>Dados de pagamento:</strong> Processados por terceiros seguros</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">2. Como Usamos suas Informações</h2>
              <div className="space-y-3">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-medium text-blue-800 mb-2">Processamento de Pedidos</h3>
                  <p className="text-blue-700 text-sm">
                    Usamos seus dados para processar compras, calcular frete e entregar produtos.
                  </p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h3 className="font-medium text-purple-800 mb-2">Provador Virtual com IA</h3>
                  <p className="text-purple-700 text-sm">
                    Suas fotos são processadas por IA apenas para mostrar como as roupas ficam em você.
                  </p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-medium text-green-800 mb-2">Comunicação</h3>
                  <p className="text-green-700 text-sm">
                    Enviamos emails sobre pedidos, promoções e atualizações (você pode cancelar a qualquer momento).
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">3. Proteção de Dados</h2>
              <p className="text-gray-600 leading-relaxed">
                Implementamos medidas de segurança para proteger suas informações:
              </p>
              <ul className="list-disc list-inside text-gray-600 mt-2 space-y-1">
                <li>Criptografia SSL em todas as transmissões</li>
                <li>Servidores seguros e atualizados</li>
                <li>Acesso restrito aos dados pessoais</li>
                <li>Backup regular e seguro</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">4. Compartilhamento de Dados</h2>
              <p className="text-gray-600 leading-relaxed">
                <strong>NÃO vendemos ou alugamos</strong> suas informações pessoais. 
                Compartilhamos dados apenas com:
              </p>
              <ul className="list-disc list-inside text-gray-600 mt-2 space-y-1">
                <li>Processadores de pagamento (Mercado Pago)</li>
                <li>Transportadoras para entrega</li>
                <li>Serviços de IA para provador virtual</li>
                <li>Autoridades legais quando exigido por lei</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">5. Seus Direitos</h2>
              <p className="text-gray-600 leading-relaxed">
                Você tem direito a:
              </p>
              <div className="grid md:grid-cols-2 gap-4 mt-3">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <h4 className="font-medium text-gray-800">Acessar</h4>
                  <p className="text-sm text-gray-600">Ver quais dados temos sobre você</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <h4 className="font-medium text-gray-800">Corrigir</h4>
                  <p className="text-sm text-gray-600">Atualizar informações incorretas</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <h4 className="font-medium text-gray-800">Excluir</h4>
                  <p className="text-sm text-gray-600">Remover seus dados permanentemente</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <h4 className="font-medium text-gray-800">Portabilidade</h4>
                  <p className="text-sm text-gray-600">Exportar seus dados</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">6. Cookies</h2>
              <p className="text-gray-600 leading-relaxed">
                Usamos cookies para melhorar sua experiência, lembrar preferências e analisar o tráfego. 
                Você pode desabilitar cookies no seu navegador, mas isso pode afetar algumas funcionalidades.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">7. Contato</h2>
              <p className="text-gray-600 leading-relaxed">
                Para exercer seus direitos ou esclarecer dúvidas sobre privacidade:
              </p>
              <div className="bg-blue-50 p-4 rounded-lg mt-2">
                <p className="text-blue-800">
                  <strong>Email:</strong> karinamodastore@gmail.com<br/>
                  <strong>Assunto:</strong> "Privacidade de Dados"<br/>
                  <strong>Telefone:</strong> (35) 9 9885-3145
                </p>
              </div>
            </section>

            <div className="border-t pt-6 mt-8">
              <p className="text-sm text-gray-500">
                Última atualização: Janeiro de 2025 | Esta política está em conformidade com a LGPD
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};