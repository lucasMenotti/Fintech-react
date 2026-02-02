
import React, { useState, useEffect } from 'react';
import { useFinance } from '../contexts/FinanceContext';

function TransactionFormInvestimento({ initialData, onSave, onCancel }) {
  const { 
    addTransaction, 
    updateTransaction, 
    categories,
    loading 
  } = useFinance();

  const isEditing = !!initialData;
  const initialDate = (initialData?.data || new Date().toISOString().split('T')[0]).split('T')[0];

  const [descricao, setDescricao] = useState(initialData?.descricao || '');
  const [valor, setValor] = useState(initialData?.valor || '');
  const [categoriaId, setCategoriaId] = useState(initialData?.categoria?.id || '');
  const [data, setData] = useState(initialDate);
  const [submitError, setSubmitError] = useState(null);

  const investimentoCategories = categories.filter(
    cat => cat.tipoCategoria?.toUpperCase() === 'INVESTIMENTO'
  );

  useEffect(() => {
    if (initialData) {
      setDescricao(initialData.descricao || '');
      setValor(initialData.valor || '');
      setCategoriaId(initialData.categoria?.id || '');
      setData((initialData.data || new Date().toISOString().split('T')[0]).split('T')[0]);
    }
  }, [initialData]);

  const handleSubmit = async e => {
    e.preventDefault();
    setSubmitError(null);

    const numericAmount = parseFloat(valor);
    if (isNaN(numericAmount) || numericAmount <= 0) {
      setSubmitError('O valor deve ser um número válido e positivo.');
      return;
    }
    if (!descricao.trim()) {
      setSubmitError('A descrição é obrigatória.');
      return;
    }
    if (!categoriaId) {
      setSubmitError('Selecione uma categoria.');
      return;
    }

    try {
      const transactionData = {
        descricao: descricao,
        valor: numericAmount,
        categoria: { id: parseInt(categoriaId) },
        usuario: { id: 1 },
        type: 'investimento',
        dataInvestimento: data
      };

      if (isEditing) {
        await updateTransaction(initialData.id, transactionData);
      } else {
        await addTransaction(transactionData);
      }

      if (onSave) onSave();
    } catch (error) {
      console.error('Erro ao salvar investimento:', error);
      setSubmitError(
        'Erro ao salvar: ' + (error.message || 'Verifique a conexão com a API.')
      );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="transaction-form-content">
  
      {submitError && <div className="error-message">{submitError}</div>}

      <div className="form-group">
        <label>Descrição</label>
        <input
          type="text"
          required
          placeholder="Ex: Tesouro Direto, Ações, CDB..."
          value={descricao}
          onChange={e => setDescricao(e.target.value)}
          className="modal-input"
        />
      </div>

      <div className="form-group">
        <label>Valor (R$)</label>
        <input
          type="number"
          required
          min="0.01"
          step="0.01"
          placeholder="0.00"
          value={valor}
          onChange={e => setValor(e.target.value)}
          className="modal-input"
        />
      </div>

      <div className="form-group">
        <label>Categoria</label>
        <select
          required
          value={categoriaId}
          onChange={e => setCategoriaId(e.target.value)}
          className="modal-select"
        >
          <option value="">Selecione uma Categoria</option>
          {investimentoCategories.map(cat => (
            <option key={cat.id} value={cat.id}>
              {cat.nomeCategoria}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>Data do Investimento</label>
        <input
          type="date"
          required
          value={data}
          onChange={e => setData(e.target.value)}
          className="modal-input"
        />
      </div>

      <div className="modal-buttons">
        <button type="submit" disabled={loading} className="btn btn-submit">
          {loading ? 'Salvando...' : isEditing ? 'Salvar Edição' : 'Adicionar Investimento'}
        </button>
        
     
      </div>
    </form>
  );
}

export default TransactionFormInvestimento;