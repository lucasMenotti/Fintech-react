import React, { createContext, useState, useContext, useEffect } from 'react'

const FinanceContext = createContext()

const API_BASE_URL = 'http://localhost:8080/api'
const DESPESAS_URL = `${API_BASE_URL}/despesas`
const RECEITAS_URL = `${API_BASE_URL}/receitas`
const CATEGORIAS_URL = `${API_BASE_URL}/categorias`
const INVESTIMENTOS_URL = `${API_BASE_URL}/investimentos`
const META_API_URL = `${API_BASE_URL}/metas`
const CONTAS_URL = `${API_BASE_URL}/contas`

export const FinanceProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([])
  const [categories, setCategories] = useState([])
  const [contas, setContas] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const usuario = { id: 1 }
  const apiFetch = async (url, options = {}) => {
    const response = await fetch(url, options)
    if (!response.ok) {
      const errorDetail = await response.text()
      throw new Error(errorDetail || `Erro na API: ${response.statusText}`)
    }
    if (response.status === 204) return null
    try {
      return await response.json()
    } catch {
      return response.text()
    }
  }

  //   const mapTransactionToPayload = transaction => {
  //   const payload = {}
  //   payload.descricao = transaction.descricao
  //   payload.valor = parseFloat(transaction.valor)
  //   payload.usuario = transaction.usuario

  //   if (transaction.type === 'investimento') {
  //     payload.tipoInvestimento = transaction.tipoInvestimento || 'OUTROS'
  //     payload.dataInvestimento = transaction.dataInvestimento
  //   } else {

  //     if (transaction.categoria) {
  //       payload.categoria = transaction.categoria
  //     }

  //     if (transaction.type === 'receita') {
  //       payload.dataRecebimento = transaction.dataRecebimento
  //     } else if (transaction.type === 'despesa') {
  //       payload.dataGasto = transaction.dataGasto
  //     }
  //   }

  //   if (transaction.conta) {
  //     payload.conta = transaction.conta
  //   }

  //   return payload
  // }

  const mapTransactionToPayload = transaction => {
  const payload = {
    descricao: transaction.descricao,
    valor: parseFloat(transaction.valor),
    usuario: transaction.usuario,
    categoria: transaction.categoria ? { id: transaction.categoria.id } : null
  };

  if (transaction.type === 'investimento') {
    payload.tipoInvestimento = transaction.tipoInvestimento || 'OUTROS';
    payload.dataInvestimento = transaction.dataInvestimento;
  } else if (transaction.type === 'receita') {
    payload.dataRecebimento = transaction.dataRecebimento;
  } else if (transaction.type === 'despesa') {
    payload.dataGasto = transaction.dataGasto;
  }

  return payload;
};


  const fetchAllTransactions = async () => {
    setLoading(true)
    setError(null)
    try {
      const despesas = await apiFetch(DESPESAS_URL)
      const receitas = await apiFetch(RECEITAS_URL)
      const investimentos = await apiFetch(INVESTIMENTOS_URL)

      const mapItem = (item, type) => ({
        ...item,
        type,
        categoria: item.categoria || null,
        data:
          item.dataGasto ||
          item.dataRecebimento ||
          item.dataInvestimento ||
          item.dataAplicacao ||
          item.data ||
          ''
      })

      const allTransactions = [
        ...(despesas || []).map(d => mapItem(d, 'despesa')),
        ...(receitas || []).map(r => mapItem(r, 'receita')),
        ...(investimentos || []).map(i => mapItem(i, 'investimento'))
      ].sort((a, b) => new Date(b.data) - new Date(a.data))

      setTransactions(allTransactions)
    } catch (err) {
      console.error('Erro ao buscar transações:', err)
      setError('Não foi possível carregar os dados.')
    } finally {
      setLoading(false)
    }
  }

  // Buscar categorias
  const fetchCategories = async () => {
    try {
      const data = await apiFetch(CATEGORIAS_URL)
      const mapped = (data || []).map(cat => ({
        id: cat.id,
        nomeCategoria: cat.nomeCategoria,
        tipoCategoria: cat.tipoCategoria
      }))
      setCategories(mapped)
      console.log('Categorias carregadas:', mapped)
    } catch (err) {
      console.error('Erro ao buscar categorias:', err)
    }
  }

  const fetchContas = async () => {
    try {
      const data = await apiFetch(CONTAS_URL)
      setContas(data || [])
    } catch (err) {
      console.error('Erro ao buscar contas:', err)
    }
  }

  // Adicionar despesa/receita/invetimento
  const addTransaction = async transaction => {
    setLoading(true)
    setError(null)
    let url
    if (transaction.type === 'despesa') {
      url = DESPESAS_URL
    } else if (transaction.type === 'receita') {
      url = RECEITAS_URL
    } else if (transaction.type === 'investimento') {
      url = INVESTIMENTOS_URL
    } else {
      throw new Error('Tipo de transação desconhecido.')
    }
    const finalPayload = mapTransactionToPayload(transaction)
    console.log('PAYLOAD ENVIADO:', finalPayload)

    try {
      const newTransaction = await apiFetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(finalPayload)
      })

      const data =
        newTransaction.dataRecebimento ||
        newTransaction.dataGasto ||
        newTransaction.dataInvestimento ||
        ''

      setTransactions(prev =>
        [
          { ...newTransaction, type: transaction.type, data: data },
          ...prev
        ].sort((a, b) => new Date(b.data) - new Date(a.data))
      )
      return newTransaction
    } catch (err) {
      console.error('Erro ao adicionar transação:', err)
      throw new Error(err.message || 'Falha ao adicionar transação.')
    } finally {
      setLoading(false)
    }
  }

  // Atualizar despesa/receita
  const updateTransaction = async (id, transaction) => {
    setLoading(true)
    setError(null)

    let url
    if (transaction.type === 'despesa') {
      url = `${DESPESAS_URL}/${id}`
    } else if (transaction.type === 'receita') {
      url = `${RECEITAS_URL}/${id}`
    } else if (transaction.type === 'investimento') {
      url = `${INVESTIMENTOS_URL}/${id}`
    } else {
      throw new Error('Tipo de transação desconhecido.')
    }

    const payload = mapTransactionToPayload(transaction)

    try {
      const updatedTransaction = await apiFetch(url, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      const transactionWithData = {
        ...updatedTransaction,
        type: transaction.type,
        data:
          updatedTransaction.dataRecebimento ||
          updatedTransaction.dataGasto ||
          updatedTransaction.dataInvestimento ||
          ''
      }

      setTransactions(prev =>
        prev
          .map(t => (t.id === id ? transactionWithData : t))
          .sort((a, b) => new Date(b.data) - new Date(a.data))
      )
      return updatedTransaction
    } catch (err) {
      console.error('Erro ao atualizar transação:', err)
      throw new Error(err.message || 'Falha ao atualizar transação.')
    } finally {
      setLoading(false)
    }
  } // Excluir transação (Despesa/Receita/Investimento)

  const deleteTransaction = async (id, type) => {
    setLoading(true)
    setError(null)

    let url
    if (type === 'despesa') {
      url = `${DESPESAS_URL}/${id}`
    } else if (type === 'receita') {
      url = `${RECEITAS_URL}/${id}`
    } else if (type === 'investimento') {
      url = `${INVESTIMENTOS_URL}/${id}`
    } else {
      throw new Error('Tipo de transação desconhecido.')
    }

    try {
      await apiFetch(url, { method: 'DELETE' })
      await apiFetch(url, { method: 'DELETE' })
      await fetchAllTransactions()
    } catch (err) {
      console.error('Erro ao deletar transação:', err)
      setError('Falha ao deletar transação.')
      throw err
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
      try {
        await Promise.all([
          fetchAllTransactions(),
          fetchCategories(),
          fetchContas()
        ])
      } catch (err) {
        console.error('Erro ao carregar dados iniciais:', err)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  const calculateTotals = () => {
    let totalReceitas = 0
    let totalDespesas = 0
    let totalInvestido = 0

    transactions.forEach(t => {
      const valor = t.valor || 0
      const type = t.type.toLowerCase()

      if (type === 'receita') {
        totalReceitas += valor
      } else if (type === 'despesa') {
        totalDespesas += valor
      } else if (type === 'investimento') {
        totalInvestido += valor
      }
    })

    const saldoTotal = totalReceitas - totalDespesas - totalInvestido

    return {
      saldoTotal,
      totalReceitas,
      totalDespesas,
      totalInvestido
    }
  }

  const totals = calculateTotals()

  const value = {
    transactions,
    loading,
    error,
    categories,
    contas,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    fetchAllTransactions,
    totals
  }

  return (
    <FinanceContext.Provider value={value}>{children}</FinanceContext.Provider>
  )
}

export const useFinance = () => {
  const context = useContext(FinanceContext)
  if (!context) {
    throw new Error('useFinance deve ser usado dentro de um FinanceProvider')
  }
  return context
}
