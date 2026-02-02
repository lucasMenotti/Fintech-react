// src/contexts/MetasContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';

const MetasContext = createContext();

const API_BASE_URL = 'http://localhost:8080/api';
const METAS_URL = `${API_BASE_URL}/metas`;

export const MetasProvider = ({ children }) => {
  const [metas, setMetas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const apiFetch = async (url, options = {}) => {
    const response = await fetch(url, options);
    if (!response.ok) {
      const errorDetail = await response.text();
      throw new Error(errorDetail || `Erro na API: ${response.statusText}`);
    }
    if (response.status === 204) return null;
    try {
      return await response.json();
    } catch {
      return response.text();
    }
  };

  // Buscar todas as metas
  const fetchMetas = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiFetch(METAS_URL);
      console.log('Metas recebidas do backend:', data);
      setMetas(data || []);
    } catch (err) {
      console.error('Erro ao buscar metas:', err);
      setError('Não foi possível carregar as metas.');
    } finally {
      setLoading(false);
    }
  };

  // Adicionar nova meta
  const addMeta = async (meta) => {
    setLoading(true);
    setError(null);
    try {
      const payload = {
        nomeMeta: meta.titulo,
        valorAlvo: parseFloat(meta.valorMeta),
        valorAtual: parseFloat(meta.valorAtual) || 0.0,
        dataAlvo: meta.prazo,
        usuario: { id: 1 }
      };

      const newMeta = await apiFetch(METAS_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      setMetas(prev => [...prev, newMeta]);
      return newMeta;
    } catch (err) {
      console.error('Erro ao adicionar meta:', err);
      throw new Error(err.message || 'Falha ao adicionar meta.');
    } finally {
      setLoading(false);
    }
  };

 const updateMeta = async (id, meta) => {
  setLoading(true);
  setError(null);
  try {
    const payload = {
      nomeMeta: meta.titulo || meta.nomeMeta,
      valorAlvo: parseFloat(meta.valorMeta ?? meta.valorAlvo),
      valorAtual: parseFloat(meta.valorAtual) || 0.0,
      dataAlvo: meta.prazo || meta.dataAlvo,
      usuario: { id: 1 }
    };

    const updatedMeta = await apiFetch(`${METAS_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    setMetas(prev => prev.map(m => m.id === id ? updatedMeta : m));
    return updatedMeta;
  } catch (err) {
    console.error('Erro ao atualizar meta:', err);
    throw new Error(err.message || 'Falha ao atualizar meta.');
  } finally {
    setLoading(false);
  }
};

 const adicionarValor = async (id, valor) => {
  const meta = metas.find(m => m.id === id);
  if (!meta) return;

  const valorMeta = meta.valorAlvo ?? meta.valorMeta;
  const novoValorAtual = Math.min((meta.valorAtual || 0) + valor, valorMeta);

  try {
    await updateMeta(id, {
      ...meta,
      valorAtual: novoValorAtual,
      valorMeta: valorMeta
    });
  } catch (err) {
    console.error('Erro ao adicionar valor:', err);
    throw err;
  }
};
  // Excluir meta
  const deleteMeta = async (id) => {
    setLoading(true);
    setError(null);
    try {
      await apiFetch(`${METAS_URL}/${id}`, { method: 'DELETE' });
      setMetas(prev => prev.filter(m => m.id !== id));
    } catch (err) {
      console.error('Erro ao deletar meta:', err);
      setError('Falha ao deletar meta.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMetas();
  }, []);

  const value = {
    metas,
    loading,
    error,
    addMeta,
    updateMeta,
    deleteMeta,
    adicionarValor,
    fetchMetas
  };

  return (
    <MetasContext.Provider value={value}>
      {children}
    </MetasContext.Provider>
  );
};

export const useMetas = () => {
  const context = useContext(MetasContext);
  if (!context) {
    throw new Error('useMetas deve ser usado dentro de um MetasProvider');
  }
  return context;
};