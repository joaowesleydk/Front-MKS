// Serviço de cálculo de frete
export const freteService = {
  // Consultar CEP
  consultarCEP: async (cep) => {
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error('Erro ao consultar CEP');
    }
  },

  // Calcular frete por região
  calcularFrete: (estado, peso = 1) => {
    const tabelaFrete = {
      // Sudeste
      'SP': 15.00,
      'RJ': 18.00,
      'MG': 20.00,
      'ES': 22.00,
      
      // Sul
      'RS': 25.00,
      'SC': 23.00,
      'PR': 22.00,
      
      // Nordeste
      'BA': 28.00,
      'PE': 30.00,
      'CE': 32.00,
      'RN': 30.00,
      'PB': 30.00,
      'AL': 30.00,
      'SE': 28.00,
      'MA': 35.00,
      'PI': 33.00,
      
      // Norte
      'AM': 40.00,
      'PA': 38.00,
      'AC': 45.00,
      'RO': 42.00,
      'RR': 50.00,
      'AP': 45.00,
      'TO': 35.00,
      
      // Centro-Oeste
      'GO': 25.00,
      'MT': 30.00,
      'MS': 28.00,
      'DF': 20.00
    };

    const freteBase = tabelaFrete[estado] || 25.00;
    
    return freteBase;
  },

  // Verificar frete grátis
  freteGratis: (total) => {
    return total >= 150.00;
  },

  // Verificar se é da sua cidade (substitua pela sua cidade)
  isCidadeLocal: (cidade, estado) => {
    // Substitua por sua cidade real
    const CIDADE_LOCAL = 'São Paulo'; // Mude aqui
    const ESTADO_LOCAL = 'SP'; // Mude aqui
    
    return cidade?.toLowerCase().includes(CIDADE_LOCAL.toLowerCase()) && 
           estado === ESTADO_LOCAL;
  }
};