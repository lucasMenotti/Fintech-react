import React from 'react';
import '../styles/global.css';

function TotalCard({ tipo, titulo, total, icon, style }) {
  const getColorClass = () => {
    switch(tipo) {
      case "despesa":
        return "red";
      case "receita":
        return "green";
      case "investimento":
        return "blue";
      case "saldo":
        return "dark";
      default:
        return "dark";
    }
  };

  const colorClass = getColorClass();
  const totalFormatado = (total || 0).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });

  return (
    <div className={`card ${colorClass}`} style={style}>
      <div className="card-content">
        <div className="card-text">
          <p className="card-title">{titulo}</p>
          <h2 className="card-value">{totalFormatado}</h2>
        </div>
    
      </div>
    </div>
  );
}

export default TotalCard;


