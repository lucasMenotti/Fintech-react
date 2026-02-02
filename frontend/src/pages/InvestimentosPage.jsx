import React, { useState } from 'react';
import Modal from '../components/Modal';
import TotalCard from '../components/TotalCard';
import TransactionFormInvestimento from '../components/TransactionFormInvestimento';
import { useFinance } from '../contexts/FinanceContext';
import { getBadgeClass } from '../utils/badgeMap';
import { Wallet } from 'lucide-react';
import '../styles/global.css';

function InvestimentosPage() {
  const [transactionToEdit, setTransactionToEdit] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const { transactions, loading, error, deleteTransaction } = useFinance();

  const investimentosList = transactions.filter(
    t => t.type.toLowerCase() === 'investimento'
  );

  const totalInvestido = investimentosList.reduce(
    (acc, inv) => acc + (inv.valor || 0),
    0
  );

  const handleOpenModal = () => {
    setTransactionToEdit(null);
    setShowModal(true);
  };

  const handleEdit = investimento => {
    setTransactionToEdit({
      id: investimento.id,
      descricao: investimento.descricao,
      valor: investimento.valor,
      categoria: investimento.categoria,
      data: investimento.dataInvestimento || investimento.data
    });
    setShowModal(true);
  };

  const handleDelete = async (id, type) => {
    if (!window.confirm('Tem certeza que deseja excluir este investimento?'))
      return;
    try {
      await deleteTransaction(id, type);
    } catch (err) {
      console.error('Erro ao excluir:', err);
      alert('Falha ao excluir o investimento. Verifique o console.');
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setTransactionToEdit(null);
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
            <h1>Investimentos</h1>
            <p>Gerencie todos os seus investimentos aqui.</p>
          </div>
          <button className="btn btn-add" onClick={handleOpenModal}>
            + Novo Investimento
          </button>
        </div>
      </header>

      <div className="cards-grid">
        <TotalCard
          tipo="investimento"
          titulo="Total Investido"
          total={totalInvestido}
          icon={<Wallet size={24} />}
          style={{ gridColumn: '1 / -1' }}
        />
      </div>

      <div className="table-container">
        <h2>Detalhes dos Investimentos</h2>
        <table className="table">
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Categoria</th>
              <th>Data</th>
              <th className="text-right">Valor</th>
              <th className="text-center">Ações</th>
            </tr>
          </thead>
          <tbody>
            {investimentosList.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center">
                  Nenhum investimento adicionado ainda.
                </td>
              </tr>
            ) : (
              investimentosList.map(investimento => (
                <tr key={investimento.id}>
                  <td>{investimento.descricao}</td>
                  <td>
                    <span className={getBadgeClass(investimento.categoria?.nomeCategoria, 'INVESTIMENTO')}>
                      {investimento.categoria?.nomeCategoria || '—'}
                    </span>
                  </td>
                  <td>
                    {investimento.dataInvestimento || investimento.data || '—'}
                  </td>
                  <td
                    className="text-right"
                    style={{ color: '#3b82f6', fontWeight: '600' }}
                  >
                    R${' '}
                    {(typeof investimento.valor === 'string'
                      ? parseFloat(investimento.valor)
                      : investimento.valor
                    )
                      .toFixed(2)
                      .replace('.', ',')}
                  </td>
                  <td className="text-center">
                    <button
                      className="btn btn-edit"
                      style={{ marginRight: '5px' }}
                      onClick={() => handleEdit(investimento)}
                    >
                      Editar
                    </button>
                    <button
                      className="btn btn-delete"
                      onClick={() =>
                        handleDelete(investimento.id, investimento.type)
                      }
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <Modal
        show={showModal}
        title={`${transactionToEdit ? 'Editar' : 'Adicionar'} Investimento`}
        onClose={handleCloseModal}
      >
        <TransactionFormInvestimento
          initialData={transactionToEdit}
          onSave={handleCloseModal}
          onCancel={handleCloseModal}
        />
      </Modal>
    </div>
  );
}

export default InvestimentosPage;


