import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext'; 
import "../styles/global.css";

function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');
  const { login, loading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await login(email, senha);
      navigate('/home');
    } catch (err) {
      console.error("Falha no login:", err);
      setError(err.message || "Email ou senha incorretos.");
    }
  };

  return (
    <div className="login-background">
      <div className="card login-card">
        <h3 className="text-center">Login</h3>
        <p className="text-center text-muted">Faça login para continuar</p>

        <form onSubmit={handleSubmit} autoComplete="off">
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Digite seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Senha</label>
            <input
              type="password"
              className="form-control"
              placeholder="Digite sua senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
          </div>

          {error && (
            <div className="alert alert-danger py-2 text-center" role="alert">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="btn btn-login w-100"
            disabled={loading}
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </button>

          <div className="text-center mt-3 small">
            <a href="/cadastro">
              Não tem uma conta? <strong>Cadastre-se</strong>
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
