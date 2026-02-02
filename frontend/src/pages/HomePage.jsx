import React, { useState, useMemo } from 'react';
import TotalCard from '../components/TotalCard';
import { useFinance } from '../contexts/FinanceContext';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import '../styles/global.css';

function HomePage() {
  const { transactions, loading, error, totals, categories } = useFinance();
  const [periodoFluxo, setPeriodoFluxo] = useState(6); 

  const saldoCalculado = totals.totalReceitas - totals.totalDespesas;

  const dadosFluxoCaixa = useMemo(() => {
    const meses = [];
    const hoje = new Date();
    

    for (let i = periodoFluxo - 1; i >= 0; i--) {
      const data = new Date(hoje.getFullYear(), hoje.getMonth() - i, 1);
      const mesAno = data.toLocaleDateString('pt-BR', { month: 'short', year: 'numeric' });
      
      meses.push({
        mes: mesAno.charAt(0).toUpperCase() + mesAno.slice(1),
        receitas: 0,
        despesas: 0,
        mesData: data
      });
    }


    transactions.forEach(t => {
      const dataTransacao = new Date(t.data);
      const mesIndex = meses.findIndex(m => {
        return m.mesData.getMonth() === dataTransacao.getMonth() &&
               m.mesData.getFullYear() === dataTransacao.getFullYear();
      });

      if (mesIndex !== -1) {
        if (t.type === 'receita') {
          meses[mesIndex].receitas += t.valor || 0;
        } else if (t.type === 'despesa') {
          meses[mesIndex].despesas += t.valor || 0;
        }
      }
    });

    return meses.map(m => ({
      mes: m.mes,
      Receitas: m.receitas,
      Despesas: m.despesas
    }));
  }, [transactions, periodoFluxo]);

  // Processa dados para o gráfico de pizza (despesas por categoria)
  const dadosDespesasPorCategoria = useMemo(() => {
    const categoriaMap = {};

    transactions.forEach(t => {
      if (t.type === 'despesa' && t.categoria) {
        const nomeCategoria = t.categoria.nomeCategoria || 'Sem Categoria';
        if (!categoriaMap[nomeCategoria]) {
          categoriaMap[nomeCategoria] = 0;
        }
        categoriaMap[nomeCategoria] += t.valor || 0;
      }
    });

    return Object.keys(categoriaMap).map(nome => ({
      name: nome,
      value: categoriaMap[nome]
    }));
  }, [transactions]);

  const COLORS = ['#ef4444', '#3b82f6', '#f59e0b', '#8b5cf6', '#06b6d4', '#64748b'];

  const transacoesRecentes = transactions.slice(0, 5);

  const formatDate = (dateString) => {
    if (!dateString) return '—';
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };

  const getBadgeClass = (tipo) => {
    if (tipo === 'receita') return 'badge green';
    if (tipo === 'despesa') return 'badge red';
    if (tipo === 'investimento') return 'badge blue';
    return 'badge gray';
  };

 
  const formatTipo = (tipo) => {
    if (tipo === 'receita') return 'Receita';
    if (tipo === 'despesa') return 'Despesa';
    if (tipo === 'investimento') return 'Investimento';
    return tipo;
  };

  if (loading && transactions.length === 0) {
    return <div className="loading-state">Carregando dados financeiros...</div>;
  }

  if (error) {
    return <div className="error-state">Erro: {error}</div>;
  }

  return (
    <div className="main-content">
      <header className="page-header">
        <div className="header-content">
          <div>
            <h1>Dashboard</h1>
            <p>Visão geral das suas finanças</p>
          </div>
        </div>
      </header>

      <div className="cards-grid">
        <TotalCard
          tipo="receita"
          titulo="Receitas"
          total={totals.totalReceitas}
        />

        <TotalCard
          tipo="despesa"
          titulo="Despesas"
          total={totals.totalDespesas}
        />

        <TotalCard
          tipo="saldo"
          titulo="Saldo Total"
          total={saldoCalculado}
        />

        <TotalCard
          tipo="investimento"
          titulo="Investido"
          total={totals.totalInvestido}
        />
      </div>

      <div className="cards-grid" style={{ gridTemplateColumns: '2fr 1fr', marginTop: '2rem' }}>

        <div className="card" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <div>
              <h3 style={{ margin: 0, fontSize: '1.125rem', fontWeight: '600' }}>Fluxo de Caixa</h3>
              <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.875rem', color: '#6b7280' }}>Receitas vs Despesas</p>
            </div>
            <select
              value={periodoFluxo}
              onChange={(e) => setPeriodoFluxo(Number(e.target.value))}
              style={{
                padding: '0.5rem 1rem',
                borderRadius: '0.375rem',
                border: '1px solid #d1d5db',
                fontSize: '0.875rem'
              }}
            >
              <option value={3}>Últimos 3 meses</option>
              <option value={6}>Últimos 6 meses</option>
              <option value={12}>Últimos 12 meses</option>
            </select>
          </div>
          
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={dadosFluxoCaixa}>
              <defs>
                <linearGradient id="colorReceitas" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22c55e" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#22c55e" stopOpacity={0.1}/>
                </linearGradient>
                <linearGradient id="colorDespesas" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="mes" stroke="#6b7280" style={{ fontSize: '0.75rem' }} />
              <YAxis stroke="#6b7280" style={{ fontSize: '0.75rem' }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#fff', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '0.375rem',
                  fontSize: '0.875rem'
                }}
                formatter={(value) => `R$ ${value.toFixed(2)}`}
              />
              <Area 
                type="monotone" 
                dataKey="Receitas" 
                stackId="1"
                stroke="#22c55e" 
                fillOpacity={1} 
                fill="url(#colorReceitas)" 
              />
              <Area 
                type="monotone" 
                dataKey="Despesas" 
                stackId="1"
                stroke="#ef4444" 
                fillOpacity={1} 
                fill="url(#colorDespesas)" 
              />
            </AreaChart>
          </ResponsiveContainer>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginTop: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#22c55e' }}></div>
              <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>Receitas</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#ef4444' }}></div>
              <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>Despesas</span>
            </div>
          </div>
        </div>

        <div className="card" style={{ padding: '1.5rem' }}>
          <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.125rem', fontWeight: '600' }}>Despesas por Categoria</h3>
          
          {dadosDespesasPorCategoria.length === 0 ? (
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              height: '300px',
              color: '#6b7280',
              fontSize: '0.875rem'
            }}>
              Nenhuma despesa cadastrada
            </div>
          ) : (
            <>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={dadosDespesasPorCategoria}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {dadosDespesasPorCategoria.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `R$ ${value.toFixed(2)}`} />
                </PieChart>
              </ResponsiveContainer>

              <div style={{ marginTop: '1rem' }}>
                {dadosDespesasPorCategoria.map((item, index) => (
                  <div key={item.name} style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'space-between',
                    marginBottom: '0.5rem',
                    fontSize: '0.875rem'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <div style={{ 
                        width: '12px', 
                        height: '12px', 
                        borderRadius: '2px', 
                        backgroundColor: COLORS[index % COLORS.length] 
                      }}></div>
                      <span style={{ color: '#374151' }}>{item.name}</span>
                    </div>
                    <span style={{ color: '#6b7280', fontWeight: '500' }}>
                      R$ {item.value.toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
      <div className="table-container">
        <h2>Transações Recentes</h2>
        <table className="table">
          <thead>
            <tr>
              <th>Data</th>
              <th>Descrição</th>
              <th>Categoria</th>
              <th>Tipo</th>
              <th className="text-right">Valor</th>
            </tr>
          </thead>
          <tbody>
            {transacoesRecentes.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center">
                  Nenhuma transação cadastrada ainda.
                </td>
              </tr>
            ) : (
              transacoesRecentes.map((transacao) => (
                <tr key={transacao.id}>
                  <td>{formatDate(transacao.data)}</td>
                  <td>{transacao.descricao}</td>
                  <td>
                    <span className={getBadgeClass(transacao.type)}>
                      {transacao.categoria?.nomeCategoria || '—'}
                    </span>
                  </td>
                  <td>
                    <span className={getBadgeClass(transacao.type)}>
                      {formatTipo(transacao.type)}
                    </span>
                  </td>
                  <td
                    className="text-right"
                    style={{
                      color:
                        transacao.type === 'receita'
                          ? '#22c55e'
                          : transacao.type === 'despesa'
                          ? '#ef4444'
                          : '#3b82f6',
                      fontWeight: '600'
                    }}
                  >
                    {transacao.type === 'receita' ? '+' : '-'}R${' '}
                    {(typeof transacao.valor === 'string'
                      ? parseFloat(transacao.valor)
                      : transacao.valor
                    )
                      .toFixed(2)
                      .replace('.', ',')}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default HomePage;