import React from 'react';
import { Edit, Trash2 } from "lucide-react";
import { useFinance } from '../contexts/FinanceContext';

export default function TransactionList({ transactions, type, onEdit, onDelete }) {

  const { categories, contas } = useFinance(); 

  const campos = [
    { chave: 'descricao', titulo: 'Descrição' },
    { chave: 'categoria', titulo: 'Categoria' },
    { chave: 'conta', titulo: 'Conta' },
    { chave: 'data', titulo: 'Data' },
    { chave: 'valor', titulo: 'Valor' },
  ];

  const getNomeItem = (lista, itemOuId, campoNome = 'nomeCategoria') => {
    const id = typeof itemOuId === 'object' && itemOuId !== null ? itemOuId.id : itemOuId;
    
    if (!id) return 'N/A';
    const item = lista.find(i => i.id === id);

    if (item) {
  
        const nomeChave = lista === contas ? 'nomeConta' : 'nomeCategoria';
        return item[nomeChave] || item.nome || 'N/A';
    }
     
    return id; 
  }

  return (
    <div className="card tabela-card p-4 shadow-lg">
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            {campos.map((c) => (<th key={c.chave} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{c.titulo}</th>))}
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {transactions.length === 0 ? (
            <tr>
              <td colSpan={campos.length + 1} className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-500">
                Nenhum {type} cadastrado
              </td>
            </tr>
          ) : (
            transactions.map((i) => (
              <tr key={i.id} className="hover:bg-gray-50">
                {campos.map((c) => (
                  <td key={c.chave} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {c.chave === 'valor' 
                      ? (i[c.chave] || 0).toLocaleString("pt-BR", { style: "currency", currency: "BRL" }) 

                    : c.chave === 'categoria' 
                      ? getNomeItem(categories, i[c.chave], 'nomeCategoria')
       
                    : c.chave === 'conta' 
                      ? getNomeItem(contas, i[c.chave], 'nomeConta') 

                    : c.chave === 'data' 
                      ? (i.data && !isNaN(new Date(i.data)) 
                          ? new Date(i.data).toLocaleDateString('pt-BR')
                          : i.data || 'N/A')

                    : i[c.chave]}
                  </td>
                ))}
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium acoes space-x-2">
                  <button 
                    className="btn-icon text-blue-500 hover:text-blue-700" 
                    onClick={() => onEdit(i)}
                  >
                    <Edit size={16} />
                  </button>
                  <button 
                    className="btn-icon text-red-500 hover:text-red-700" 
                    onClick={() => onDelete(i.id, i.type)}
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}