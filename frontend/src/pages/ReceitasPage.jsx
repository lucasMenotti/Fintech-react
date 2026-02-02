import React, { useState } from 'react';
import Modal from '../components/Modal';
import TotalCard from '../components/TotalCard';
import TransactionForm from '../components/TransactionForm';
import { useFinance } from '../contexts/FinanceContext';
import { getBadgeClass } from '../utils/badgeMap';
import { TrendingUp } from 'lucide-react';
import '../styles/global.css';

function ReceitasPage() {
  const tipo = 'RECEITA';
  const [transactionToEdit, setTransactionToEdit] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const { transactions, loading, error, deleteTransaction } = useFinance();

  const receitasList = transactions.filter(
    t => t.type.toLowerCase() === tipo.toLowerCase()
  );

  const totalReceitas = receitasList.reduce(
    (acc, r) => acc + (r.valor || 0),
    0
  );

  const handleOpenModal = () => {
    setTransactionToEdit(null);
    setShowModal(true);
  };

  const handleEdit = receita => {
    setTransactionToEdit({
      id: receita.id,
      descricao: receita.descricao,
      valor: receita.valor,
      categoria: receita.categoria,
      data: receita.dataRecebimento || receita.data
    });
    setShowModal(true);
  };

  const handleDelete = async (id, type) => {
    if (!window.confirm('Tem certeza que deseja excluir esta receita?')) return;
    try {
      await deleteTransaction(id, type);
    } catch (err) {
      console.error('Erro ao excluir:', err);
      alert('Falha ao excluir a receita. Verifique o console.');
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
            <h1>Receitas</h1>
            <p>Gerencie todas as suas entradas financeiras aqui.</p>
          </div>
          <button className="btn btn-add" onClick={handleOpenModal}>
            + Nova Receita
          </button>
        </div>
      </header>

      <div className="cards-grid">
        <TotalCard
          tipo="receita"
          titulo="Total Receitas"
          total={totalReceitas}
          icon={<TrendingUp size={24} />}
          style={{ gridColumn: '1 / -1' }}
        />
      </div>

      <div className="table-container">
        <h2>Detalhes das Receitas</h2>
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
            {receitasList.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center">
                  Nenhuma receita adicionada ainda.
                </td>
              </tr>
            ) : (
              receitasList.map(receita => (
                <tr key={receita.id}>
                  <td>{receita.descricao}</td>
                  <td>
                    <span className={getBadgeClass(receita.categoria?.nomeCategoria, 'RECEITA')}>
                      {receita.categoria?.nomeCategoria || '—'}
                    </span>
                  </td>
                  <td>{receita.dataRecebimento || receita.data || '—'}</td>
                  <td
                    className="text-right"
                    style={{ color: '#22c55e', fontWeight: '600' }}
                  >
                    R${' '}
                    {(typeof receita.valor === 'string'
                      ? parseFloat(receita.valor)
                      : receita.valor
                    )
                      .toFixed(2)
                      .replace('.', ',')}
                  </td>
                  <td className="text-center">
                    <button
                      className="btn btn-edit"
                      style={{ marginRight: '5px' }}
                      onClick={() => handleEdit(receita)}
                    >
                      Editar
                    </button>
                    <button
                      className="btn btn-delete"
                      onClick={() => handleDelete(receita.id, receita.type)}
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
        title={`${transactionToEdit ? 'Editar' : 'Adicionar'} ${tipo}`}
        onClose={handleCloseModal}
      >
        <TransactionForm
          type="RECEITA"
          initialData={transactionToEdit}
          onSave={handleCloseModal}
          onCancel={handleCloseModal}
        />
      </Modal>
    </div>
  );
}

export default ReceitasPage;


