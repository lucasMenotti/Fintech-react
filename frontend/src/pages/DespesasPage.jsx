import React, { useState } from 'react';
import Modal from '../components/Modal';
import TotalCard from '../components/TotalCard';
import TransactionForm from '../components/TransactionForm';
import { useFinance } from '../contexts/FinanceContext';
import { getBadgeClass } from '../utils/badgeMap';
import { TrendingDown } from 'lucide-react';
import '../styles/global.css';

function DespesasPage() {
  const { transactions, loading, error, deleteTransaction } = useFinance();
  const despesasList = transactions.filter(t => t.type === 'despesa');
  const [showModal, setShowModal] = useState(false);
  const [despesaToEdit, setDespesaToEdit] = useState(null);

  const totalDespesas = despesasList.reduce((acc, d) => acc + (d.valor || 0), 0);

  const handleOpenModal = () => {
    setDespesaToEdit(null);
    setShowModal(true);
  };

  const handleEdit = despesa => {
    setDespesaToEdit({
      id: despesa.id,
      descricao: despesa.descricao,
      valor: despesa.valor,
      categoria: despesa.categoria?.id,
      type: despesa.type.toUpperCase(),
      data: despesa.data
    });
    setShowModal(true);
  };

  const handleDelete = async (id, type) => {
    if (!window.confirm('Tem certeza que deseja excluir esta despesa?')) {
      return;
    }
    try {
      await deleteTransaction(id, type);
    } catch (err) {
      console.error('Erro ao excluir:', err);
      alert('Falha ao excluir a despesa. Verifique o console.');
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setDespesaToEdit(null);
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
            <h1>Despesas</h1>
            <p>Gerencie todas as suas saídas financeiras aqui.</p>
          </div>
          <button className="btn btn-add" onClick={handleOpenModal}>
            + Nova Despesa
          </button>
        </div>
      </header>

      <div className="cards-grid">
        <TotalCard
          tipo="despesa"
          titulo="Total Despesas"
          total={totalDespesas}
          icon={<TrendingDown size={24} />}
          style={{ gridColumn: '1 / -1' }}
        />
      </div>

      <div className="table-container">
        <h2>Detalhes das Despesas</h2>
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
            {despesasList.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center">
                  Nenhuma despesa adicionada ainda.
                </td>
              </tr>
            ) : (
              despesasList.map(despesa => (
                <tr key={despesa.id}>
                  <td>{despesa.descricao}</td>
                  <td>
                    <span className={getBadgeClass(despesa.categoria?.nomeCategoria, 'DESPESA')}>
                      {despesa.categoria?.nomeCategoria || '—'}
                    </span>
                  </td>
                  <td>{despesa.data}</td>
                  <td className="text-right" style={{ color: '#ef4444', fontWeight: '600' }}>
                    R$ {despesa.valor?.toFixed(2).replace('.', ',')}
                  </td>
                  <td className="text-center">
                    <button
                      className="btn btn-edit"
                      style={{ marginRight: '5px' }}
                      onClick={() => handleEdit(despesa)}
                    >
                      Editar
                    </button>
                    <button
                      className="btn btn-delete"
                      onClick={() => handleDelete(despesa.id, despesa.type)}
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
        title={despesaToEdit ? 'Editar Despesa' : 'Adicionar Despesa'}
        onClose={handleCloseModal}
      >
        <TransactionForm
          type="DESPESA"
          initialData={despesaToEdit}
          onSave={handleCloseModal}
          onCancel={handleCloseModal}
        />
      </Modal>
    </div>
  );
}

export default DespesasPage;

