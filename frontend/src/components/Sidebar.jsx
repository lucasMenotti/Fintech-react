import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import {
  Home,
  TrendingDown,
  TrendingUp,
  Wallet,
  Target,
  LogOut,
  Menu,
  X
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import '../styles/global.css';

const Sidebar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { logout } = useAuth();

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  const closeMobileMenu = () => setMobileMenuOpen(false);

  const handleLogout = () => {
    closeMobileMenu();
    logout();
    navigate('/login');
  };

  const menuItems = [
    { to: '/home', icon: Home, label: 'Dashboard' },
    { to: '/receitas', icon: TrendingUp, label: 'Receitas' },
    { to: '/despesas', icon: TrendingDown, label: 'Despesas' },
    { to: '/investimentos', icon: Wallet, label: 'Investimentos' },
    { to: '/metas', icon: Target, label: 'Metas' }
  ];

  return (
    <>
      <button
        className="mobile-menu-btn"
        onClick={toggleMobileMenu}
        aria-label="Toggle menu"
      >
        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {mobileMenuOpen && <div className="sidebar-overlay" onClick={closeMobileMenu} />}

      <aside className={`sidebar ${mobileMenuOpen ? 'mobile-open' : ''}`}>
        <div className="sidebar-header">
          <h1 className="sidebar-title">FinupX</h1>
          <button
            className="sidebar-close-btn"
            onClick={closeMobileMenu}
            aria-label="Fechar menu"
          >
            <X size={24} />
          </button>
        </div>

        <nav className="sidebar-nav">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
                onClick={closeMobileMenu}
              >
                <Icon size={20} />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        <div className="sidebar-footer">
          <div className="sidebar-divider" />
          <button
            onClick={handleLogout}
            className="logout-btn"
          >
            <LogOut size={20} />
            <span>Sair</span>
          </button>
        </div>
      </aside>

      <main className="main-content">
        <Outlet />
      </main>
    </>
  );
};

export default Sidebar;