
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext'; 
import { FinanceProvider } from './contexts/FinanceContext';
import { MetasProvider } from './contexts/MetasContext';

import ErrorBoundary from './components/ErrorBoundary'; 
import Sidebar from './components/Sidebar';

import Login from './pages/LoginPage';
import HomePage from './pages/HomePage';
import Investimentos from './pages/InvestimentosPage';
import Despesas from './pages/DespesasPage';
import Receitas from './pages/ReceitasPage';
import MetasFinanceiras from './pages/MetasFinanceiras';

function PrivateRoute() {
  const { user } = useAuth();
  return user ? <Outlet /> : <Navigate to="/login" />;
}

function AppRoutes() {
  const handleLogout = () => {
    console.log('Usuário deslogou');
  };

  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route element={<PrivateRoute />}>
        <Route element={<Sidebar onLogout={handleLogout} />}>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/investimentos" element={<Investimentos />} />
          <Route path="/despesas" element={<Despesas />} />
          <Route path="/receitas" element={<Receitas />} />
          <Route path="/metas" element={<MetasFinanceiras />} />
        </Route>
      </Route>

      <Route path="*" element={<div>Página não encontrada</div>} />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider> 
      <FinanceProvider>
        <MetasProvider>
          <BrowserRouter>
            <ErrorBoundary>
              <AppRoutes />
            </ErrorBoundary>
          </BrowserRouter>
        </MetasProvider>
      </FinanceProvider>
    </AuthProvider>
  );
}

export default App;