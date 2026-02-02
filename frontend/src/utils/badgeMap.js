 export const getBadgeClass = (nomeCategoria, tipoTransacao = 'DESPESA') => {
  if (!nomeCategoria) return 'badge grey';
  
  if (tipoTransacao.toUpperCase() === 'DESPESA') {
    const despesaMap = {
      'Alimentação': 'badge red',
      'Transporte': 'badge orange',
      'Moradia': 'badge wine',
      'Saúde': 'badge yellow',
      'Lazer': 'badge brown',
      'Educação': 'badge pink',
      'Outras Despesas': 'badge grey'
    };
    return despesaMap[nomeCategoria] || 'badge grey';
  }
  
  if (tipoTransacao.toUpperCase() === 'RECEITA') {
    const receitaMap = {
      'Salário': 'badge green',
      'Investimentos': 'badge turquoise',
      'Serviços/Freelance': 'badge light-blue',
      'Aluguel de Imóveis': 'badge purple',
      'Outras Receitas': 'badge grey'
    };
    return receitaMap[nomeCategoria] || 'badge grey';
  }
  
  if (tipoTransacao.toUpperCase() === 'INVESTIMENTO') {
    const investimentoMap = {
      'Renda Fixa': 'badge blue',
      'Renda Variável': 'badge green',
      'Tesouro Direto': 'badge purple',
      'Fundos Imobiliários': 'badge turquoise',
      'Criptomoedas': 'badge orange',
      'Poupança': 'badge yellow',
      'Outros': 'badge grey'
    };
    return investimentoMap[nomeCategoria] || 'badge grey';
  }
  
  return 'badge grey';
};
