
import React, { useState } from 'react';
import Modal from '../components/Modal';
import { Target, Edit, Trash2, Plus } from 'lucide-react';
import { useMetas } from '../contexts/MetasContext';
import '../styles/global.css';

function MetasFinanceiras() {
  const { metas, loading, error, addMeta, updateMeta, deleteMeta, adicionarValor } = useMetas();
  
  const [showModal, setShowModal] = useState(false);
  const [showAddValueModal, setShowAddValueModal] = useState(false);
  const [metaToEdit, setMetaToEdit] = useState(null);
  const [metaParaValor, setMetaParaValor] = useState(null);
  const [valorCustomizado, setValorCustomizado] = useState('');
  
  const [novaMeta, setNovaMeta] = useState({
    titulo: '',
    prazo: '',
    valorAtual: '',
    valorMeta: ''
  });

  const calcularDiasRestantes = (prazo) => {
    const hoje = new Date();
    const dataPrazo = new Date(prazo);
    const diffTime = dataPrazo - hoje;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  const calcularProgresso = (atual, meta) => {
    return ((atual / meta) * 100).toFixed(1);
  };

  const calcularFaltam = (atual, meta) => {
    return meta - atual;
  };

  const formatarData = (data) => {
    return new Date(data).toLocaleDateString('pt-BR');
  };

  const handleNovaMetaClick = () => {
    setMetaToEdit(null);
    setNovaMeta({
      titulo: '',
      prazo: '',
      valorAtual: '',
      valorMeta: ''
    });
    setShowModal(true);
  };

  const handleEditClick = (meta) => {
    setMetaToEdit(meta);
    setNovaMeta({
      titulo: meta.nomeMeta || meta.titulo,
      prazo: meta.dataAlvo || meta.prazo,
      valorAtual: (meta.valorAtual || 0).toString(),
      valorMeta: (meta.valorAlvo || meta.valorMeta || 0).toString()
    });
    setShowModal(true);
  };

  const handleDeleteClick = async (metaId) => {
    if (!window.confirm('Tem certeza que deseja excluir esta meta?')) return;
    
    try {
      await deleteMeta(metaId);
    } catch (err) {
      console.error('Erro ao excluir meta:', err);
      alert('Falha ao excluir a meta. Verifique o console.');
    }
  };

  const handleSalvarMeta = async (e) => {
    e.preventDefault();
    
    try {
      const metaData = {
        titulo: novaMeta.titulo,
        prazo: novaMeta.prazo,
        valorAtual: parseFloat(novaMeta.valorAtual) || 0,
        valorMeta: parseFloat(novaMeta.valorMeta)
      };

      if (metaToEdit) {
        await updateMeta(metaToEdit.id, metaData);
      } else {
        await addMeta(metaData);
      }
      
      setShowModal(false);
      setMetaToEdit(null);
    } catch (err) {
      console.error('Erro ao salvar meta:', err);
      alert('Erro ao salvar meta: ' + err.message);
    }
  };

  const handleOpenAddValueModal = (meta) => {
    setMetaParaValor(meta);
    setValorCustomizado('');
    setShowAddValueModal(true);
  };

  const handleAdicionarValorCustomizado = async (e) => {
    e.preventDefault();
    
    const valor = parseFloat(valorCustomizado);
    if (isNaN(valor) || valor <= 0) {
      alert('Por favor, insira um valor válido.');
      return;
    }

    try {
      await adicionarValor(metaParaValor.id, valor);
      setShowAddValueModal(false);
      setMetaParaValor(null);
      setValorCustomizado('');
    } catch (err) {
      console.error('Erro ao adicionar valor:', err);
      alert('Erro ao adicionar valor: ' + err.message);
    }
  };

  const handleAdicionarValorRapido = async (metaId, valor) => {
    try {
      await adicionarValor(metaId, valor);
    } catch (err) {
      console.error('Erro ao adicionar valor:', err);
      alert('Erro ao adicionar valor: ' + err.message);
    }
  };

  if (loading && metas.length === 0) {
    return <div className="loading-state">Carregando metas...</div>;
  }

  if (error) {
    return <div className="error-state">Erro: {error}</div>;
  }

  return (
    <div className="main-content">
      <header className="page-header">
        <div className="header-content">
          <div>
            <h1>Metas Financeiras</h1>
            <p>Defina e acompanhe suas metas</p>
          </div>
          <button className="btn btn-add" onClick={handleNovaMetaClick}>
            + Nova Meta
          </button>
        </div>
      </header>

      {metas.length === 0 ? (
        <div className="empty-state" style={{ 
          textAlign: 'center', 
          padding: '3rem', 
          background: 'white', 
          borderRadius: '12px' 
        }}>
          <Target size={48} color="#9ca3af" style={{ margin: '0 auto 1rem' }} />
          <p style={{ color: '#6b7280', fontSize: '1.125rem' }}>
            Nenhuma meta cadastrada ainda.
          </p>
          <p style={{ color: '#9ca3af', marginTop: '0.5rem' }}>
            Clique em "Nova Meta" para começar!
          </p>
        </div>
      ) : (
        <div className="metas-grid">
          {metas.map(meta => {

            const valorAtual = parseFloat(meta.valorAtual) || 0;
            const valorMeta = parseFloat(meta.valorAlvo || meta.valorMeta) || 1;
            const prazo = meta.dataAlvo || meta.prazo || new Date().toISOString().split('T')[0];
            const titulo = meta.nomeMeta || meta.titulo || 'Meta sem título';
            
            const progresso = calcularProgresso(valorAtual, valorMeta);
            const diasRestantes = calcularDiasRestantes(prazo);
            const faltam = calcularFaltam(valorAtual, valorMeta);
            const concluida = valorAtual >= valorMeta;

            return (
              <div key={meta.id} className="card meta-card">
                <div className="meta-header">
                  <div className="meta-icon" style={{ 
                    backgroundColor: concluida ? '#dcfce7' : '#dbeafe' 
                  }}>
                    <Target size={24} color={concluida ? '#22c55e' : '#3b82f6'} />
                  </div>
                  <div className="meta-info">
                    <h3>{titulo}</h3>
                    <p className="meta-prazo">Prazo: {formatarData(prazo)}</p>
                    <p className="meta-dias">
                      {concluida ? '✓ Meta concluída!' : `${diasRestantes} dias restantes`}
                    </p>
                  </div>
                  <div style={{ 
                    display: 'flex', 
                    gap: '0.25rem',
                    marginLeft: 'auto'
                  }}>
                    <button
                      className="btn-icon-small"
                      onClick={() => handleEditClick(meta)}
                      title="Editar meta"
                      style={{
                        width: '32px',
                        height: '32px',
                        padding: '0.5rem'
                      }}
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      className="btn-icon-small btn-icon-delete"
                      onClick={() => handleDeleteClick(meta.id)}
                      title="Excluir meta"
                      style={{
                        width: '32px',
                        height: '32px',
                        padding: '0.5rem'
                      }}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                <div className="meta-progresso">
                  <div className="progresso-header">
                    <span>Progresso</span>
                    <span className="progresso-valor">{progresso}%</span>
                  </div>
                  <div className="progresso-bar">
                    <div 
                      className="progresso-fill" 
                      style={{ 
                        width: `${Math.min(parseFloat(progresso) || 0, 100)}%`,
                        backgroundColor: concluida ? '#22c55e' : '#3b82f6'
                      }}
                    />
                  </div>
                </div>

                <div className="meta-valores">
                  <div className="valor-item">
                    <p className="valor-label">Atual</p>
                    <p className="valor-amount">
                      R$ {valorAtual.toFixed(2).replace('.', ',')}
                    </p>
                  </div>
                  <div className="valor-item valor-right">
                    <p className="valor-label">Meta</p>
                    <p className="valor-amount">
                      R$ {valorMeta.toFixed(2).replace('.', ',')}
                    </p>
                  </div>
                </div>

                {!concluida && (
                  <>
                    <p className="meta-faltam">
                      Faltam: R$ {faltam.toFixed(2).replace('.', ',')}
                    </p>

                    <div className="meta-actions">
                      <button
                        className="btn-quick-add"
                        onClick={() => handleAdicionarValorRapido(meta.id, 100)}
                      >
                        + R$ 100
                      </button>
                      <button
                        className="btn-quick-add"
                        onClick={() => handleAdicionarValorRapido(meta.id, 500)}
                      >
                        + R$ 500
                      </button>
                      <button
                        className="btn-quick-add"
                        onClick={() => handleAdicionarValorRapido(meta.id, 1000)}
                      >
                        + R$ 1000
                      </button>
                    </div>

                    <button
                      className="btn-custom-value"
                      onClick={() => handleOpenAddValueModal(meta)}
                    >
                      <Plus size={16} />
                      Adicionar Valor Customizado
                    </button>
                  </>
                )}
              </div>
            );
          })}
        </div>
      )}

      <Modal
        show={showModal}
        title={metaToEdit ? 'Editar Meta Financeira' : 'Nova Meta Financeira'}
        onClose={() => {
          setShowModal(false);
          setMetaToEdit(null);
        }}
      >
        <form onSubmit={handleSalvarMeta} className="transaction-form-content">
          <div className="form-group">
            <label>Título da Meta</label>
            <input
              type="text"
              required
              placeholder="Ex: Viagem, Casa, Carro..."
              value={novaMeta.titulo}
              onChange={(e) => setNovaMeta({ ...novaMeta, titulo: e.target.value })}
              className="modal-input"
            />
          </div>

          <div className="form-group">
            <label>Valor da Meta (R$)</label>
            <input
              type="number"
              required
              min="0.01"
              step="0.01"
              placeholder="0.00"
              value={novaMeta.valorMeta}
              onChange={(e) => setNovaMeta({ ...novaMeta, valorMeta: e.target.value })}
              className="modal-input"
            />
          </div>

          <div className="form-group">
            <label>Valor Atual (R$)</label>
            <input
              type="number"
              min="0"
              step="0.01"
              placeholder="0.00"
              value={novaMeta.valorAtual}
              onChange={(e) => setNovaMeta({ ...novaMeta, valorAtual: e.target.value })}
              className="modal-input"
            />
          </div>

          <div className="form-group">
            <label>Prazo</label>
            <input
              type="date"
              required
              value={novaMeta.prazo}
              onChange={(e) => setNovaMeta({ ...novaMeta, prazo: e.target.value })}
              className="modal-input"
            />
          </div>

          <div className="modal-buttons">
            <button type="submit" className="btn btn-submit" disabled={loading}>
              {loading ? 'Salvando...' : metaToEdit ? 'Salvar Alterações' : 'Criar Meta'}
            </button>
          </div>
        </form>
      </Modal>

      <Modal
        show={showAddValueModal}
        title="Adicionar Valor"
        onClose={() => {
          setShowAddValueModal(false);
          setMetaParaValor(null);
          setValorCustomizado('');
        }}
      >
        <form onSubmit={handleAdicionarValorCustomizado} className="transaction-form-content">
          {metaParaValor && (
            <>
              <div style={{ 
                marginBottom: '1.5rem', 
                padding: '1rem', 
                background: '#f9fafb', 
                borderRadius: '8px' 
              }}>
                <p style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.5rem' }}>
                  Meta: <strong>{metaParaValor.nomeMeta || metaParaValor.titulo}</strong>
                </p>
                <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                  Valor Atual: <strong>R$ {(metaParaValor.valorAtual || 0).toFixed(2)}</strong>
                </p>
                <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                  Faltam: <strong>R$ {calcularFaltam(metaParaValor.valorAtual || 0, metaParaValor.valorAlvo || metaParaValor.valorMeta || 0).toFixed(2)}</strong>
                </p>
              </div>

              <div className="form-group">
                <label>Valor a Adicionar (R$)</label>
                <input
                  type="number"
                  required
                  min="0.01"
                  step="0.01"
                  placeholder="0.00"
                  value={valorCustomizado}
                  onChange={(e) => setValorCustomizado(e.target.value)}
                  className="modal-input"
                  autoFocus
                />
              </div>

              <div className="modal-buttons">
                <button type="submit" className="btn btn-submit" disabled={loading}>
                  {loading ? 'Adicionando...' : 'Adicionar Valor'}
                </button>

              </div>
            </>
          )}
        </form>
      </Modal>
    </div>
  );
}

export default MetasFinanceiras;