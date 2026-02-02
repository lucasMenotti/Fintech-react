// src/pages/TransactionsPage.jsx
import React, { useState } from 'react'
import Modal from '../components/Modal'
import TransactionList from '../components/TransactionList'
import TransactionForm from '../components/TransactionForm'
import TotalCard from '../components/TotalCard'
import { getBadgeClass } from '../utils/badgeMap';
import { useFinance } from '../contexts/FinanceContext'
import '../styles/global.css'

const TransactionsPage = ({ tipo, titulo }) => {
  const {
    transactions,
    categories,
    loading,
    error,
    addTransaction,
    updateTransaction,
    deleteTransaction
  } = useFinance()

  const filteredTransactions = transactions.filter(
    t => t.type.toLowerCase() === tipo.toLowerCase()
  )
  const total = filteredTransactions.reduce(
    (acc, t) => acc + (t.valor || 0),
    0
  )

  const [showModal, setShowModal] = useState(false)
  const [transactionToEdit, setTransactionToEdit] = useState(null)

  const handleOpenModal = () => {
    setTransactionToEdit(null)
    setShowModal(true)
  }

  const handleEdit = transaction => {
    setTransactionToEdit(transaction)
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setTransactionToEdit(null)
  }

  const handleSave = async () => {
    handleCloseModal()
  }

  const handleDelete = async (id, type) => {
    if (!window.confirm('Tem certeza que deseja excluir esta transação?')) return
    try {
      await deleteTransaction(id, type)
    } catch (err) {
      console.error('Erro ao excluir:', err)
      alert('Falha ao excluir. Verifique o console.')
    }
  }


  if (loading && transactions.length === 0)
    return <div className="loading-state">Carregando dados...</div>

  if (error) return <div className="error-state">Erro: {error}</div>

  return (
    <div className="main-content">
      <header className="page-header">
        <div className="header-content">
          <div>
            <h1>{titulo}</h1>
            <p>Gerencie todas as suas {tipo}s aqui.</p>
          </div>

          <button className="btn btn-add" onClick={handleOpenModal}>
            + Novo {tipo.charAt(0).toUpperCase() + tipo.slice(1)}
          </button>
        </div>
      </header>

      <div className="cards-grid">
        <TotalCard tipo={tipo} titulo={`Total ${titulo}`} total={total} style={{ gridColumn: '1 / -1' }} />
      </div>

      <div className="table-container">
        <h2>Detalhes das {titulo}</h2>
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
            {filteredTransactions.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center">
                  Nenhuma {tipo} adicionada ainda.
                </td>
              </tr>
            ) : (
              filteredTransactions.map(t => (
                <tr key={t.id}>
                  <td>{t.descricao}</td>
                  <td>
                    <span className={getBadgeClass(t.categoria?.nomeCategoria)}>
                      {t.categoria?.nomeCategoria || '—'}
                    </span>
                  </td>
                  <td>
                    {t.dataRecebimento || t.dataGasto || t.dataInvestimento || '—'}
                  </td>
                  <td
                    className="text-right"
                    style={{ color: tipo.toLowerCase() === 'receita' ? '#22c55e' : '#ef4444', fontWeight: '600' }}
                  >
                    R$ {(typeof t.valor === 'string' ? parseFloat(t.valor) : t.valor)
                      .toFixed(2)
                      .replace('.', ',')}
                  </td>
                  <td className="text-center">
                    <button className="btn btn-edit" onClick={() => handleEdit(t)}>Editar</button>
                    <button className="btn btn-delete" onClick={() => handleDelete(t.id, t.type)}>Excluir</button>
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
          type={tipo}
          initialData={transactionToEdit}
          onSave={handleSave}
          onCancel={handleCloseModal}
        />
      </Modal>
    </div>
  )
}

export default TransactionsPage
