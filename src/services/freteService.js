// Serviço de cálculo de frete por região
export const freteService = {
  // Tabela de frete por estado
  tabelaFrete: {
    // Minas Gerais - Estado da loja
    'MG': { valor: 12, prazo: '3-5 dias', regiao: 'Local' },
    
    // Sudeste
    'SP': { valor: 18, prazo: '4-6 dias', regiao: 'Sudeste' },
    'RJ': { valor: 18, prazo: '4-6 dias', regiao: 'Sudeste' },
    'ES': { valor: 18, prazo: '4-6 dias', regiao: 'Sudeste' },
    
    // Sul
    'PR': { valor: 22, prazo: '5-8 dias', regiao: 'Sul' },
    'SC': { valor: 22, prazo: '5-8 dias', regiao: 'Sul' },
    'RS': { valor: 22, prazo: '5-8 dias', regiao: 'Sul' },
    
    // Centro-Oeste
    'GO': { valor: 25, prazo: '6-10 dias', regiao: 'Centro-Oeste' },
    'MT': { valor: 25, prazo: '6-10 dias', regiao: 'Centro-Oeste' },
    'MS': { valor: 25, prazo: '6-10 dias', regiao: 'Centro-Oeste' },
    'DF': { valor: 25, prazo: '6-10 dias', regiao: 'Centro-Oeste' },
    
    // Nordeste
    'BA': { valor: 28, prazo: '7-12 dias', regiao: 'Nordeste' },
    'PE': { valor: 28, prazo: '7-12 dias', regiao: 'Nordeste' },
    'CE': { valor: 28, prazo: '7-12 dias', regiao: 'Nordeste' },
    'AL': { valor: 28, prazo: '7-12 dias', regiao: 'Nordeste' },
    'SE': { valor: 28, prazo: '7-12 dias', regiao: 'Nordeste' },
    'PB': { valor: 28, prazo: '7-12 dias', regiao: 'Nordeste' },
    'RN': { valor: 28, prazo: '7-12 dias', regiao: 'Nordeste' },
    'PI': { valor: 28, prazo: '7-12 dias', regiao: 'Nordeste' },
    'MA': { valor: 28, prazo: '7-12 dias', regiao: 'Nordeste' },
    
    // Norte
    'AM': { valor: 35, prazo: '10-15 dias', regiao: 'Norte' },
    'PA': { valor: 35, prazo: '10-15 dias', regiao: 'Norte' },
    'AC': { valor: 35, prazo: '10-15 dias', regiao: 'Norte' },
    'RO': { valor: 35, prazo: '10-15 dias', regiao: 'Norte' },
    'RR': { valor: 35, prazo: '10-15 dias', regiao: 'Norte' },
    'AP': { valor: 35, prazo: '10-15 dias', regiao: 'Norte' },
    'TO': { valor: 35, prazo: '10-15 dias', regiao: 'Norte' }
  },

  // Buscar endereço pelo CEP
  async buscarEnderecoPorCep(cep) {
    try {
      const cepLimpo = cep.replace(/\D/g, '');
      
      if (cepLimpo.length !== 8) {
        throw new Error('CEP deve ter 8 dígitos');
      }

      const response = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
      const data = await response.json();

      if (data.erro) {
        throw new Error('CEP não encontrado');
      }

      return {
        cep: data.cep,
        logradouro: data.logradouro,
        bairro: data.bairro,
        localidade: data.localidade,
        uf: data.uf,
        estado: data.estado
      };
    } catch (error) {
      throw new Error(`Erro ao buscar CEP: ${error.message}`);
    }
  },

  // Calcular frete
  calcularFrete(endereco, valorCompra = 0) {
    const uf = endereco.uf;
    const freteInfo = this.tabelaFrete[uf];

    if (!freteInfo) {
      return {
        valor: 30,
        prazo: '10-15 dias',
        regiao: 'Outras regiões',
        gratis: false
      };
    }

    // Frete grátis acima de R$ 150
    const freteGratis = valorCompra >= 150;
    
    // Pouso Alegre - retirada grátis
    const isPousoAlegre = endereco.localidade?.toLowerCase().includes('pouso alegre');
    
    return {
      valor: (freteGratis || isPousoAlegre) ? 0 : freteInfo.valor,
      prazo: freteInfo.prazo,
      regiao: freteInfo.regiao,
      gratis: freteGratis || isPousoAlegre,
      retirada: isPousoAlegre
    };
  },

  // Opções de entrega
  getOpcoesEntrega(endereco, valorCompra = 0) {
    const frete = this.calcularFrete(endereco, valorCompra);
    const opcoes = [];

    // Retirada na loja (sempre disponível)
    opcoes.push({
      tipo: 'retirada',
      nome: 'Retirar na Loja',
      valor: 0,
      prazo: 'Imediato',
      descricao: 'Pouso Alegre, MG'
    });

    // Entrega pelos Correios
    if (!frete.retirada) {
      opcoes.push({
        tipo: 'correios',
        nome: `Correios - ${frete.regiao}`,
        valor: frete.valor,
        prazo: frete.prazo,
        descricao: frete.gratis ? 'Frete Grátis!' : `R$ ${frete.valor.toFixed(2)}`
      });
    }

    return opcoes;
  }
};