import React from 'react';
import { Link } from 'react-router-dom';

function ErrorPage() {
  return (
    <div>
      <h1>Oops! Página não encontrada (404)</h1>
      <p>A rota que você tentou acessar não existe em nossa aplicação.</p>
      <Link to="/home">Voltar para a Página Inicial</Link>
    </div>
  );
}

export default ErrorPage;