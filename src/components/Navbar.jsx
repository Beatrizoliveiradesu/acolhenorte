import React, { useState } from 'react';
import { HeartHandshake, Home, Users, UserPlus, ShieldCheck, Menu, X } from 'lucide-react';

export default function Navbar({ currentPage, onNavigate, requestsCount = 0 }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNav = (page) => {
    onNavigate(page);
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <button
          type="button"
          className="brand-btn"
          onClick={() => handleNav('home')}
          aria-label="Ir para a página inicial do Acolhe Norte"
        >
          <span className="brand-icon">
            <HeartHandshake size={24} strokeWidth={2.3} />
          </span>
          <span className="brand-text">
            <span className="brand-title">Acolhe Norte</span>
            <span className="brand-subtitle">Manaus • Região Norte</span>
          </span>
        </button>

        <button
          type="button"
          className="mobile-menu-btn"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        <nav className={`nav-links ${menuOpen ? 'open' : ''}`} aria-label="Navegação principal">
          <button
            type="button"
            className={`nav-link ${currentPage === 'home' ? 'active' : ''}`}
            onClick={() => handleNav('home')}
          >
            <Home size={17} />
            Início
          </button>

          <button
            type="button"
            className={`nav-link ${currentPage === 'familias' ? 'active' : ''}`}
            onClick={() => handleNav('familias')}
          >
            <Users size={17} />
            Para Famílias
          </button>

          <button
            type="button"
            className={`nav-link ${currentPage === 'cuidadores' ? 'active' : ''}`}
            onClick={() => handleNav('cuidadores')}
          >
            <UserPlus size={17} />
            Sou Cuidador
          </button>

          <button
            type="button"
            className={`nav-link nav-link-admin ${currentPage === 'admin' ? 'active' : ''}`}
            onClick={() => handleNav('admin')}
            title="Painel Administrativo"
          >
            <ShieldCheck size={15} />
            Painel Admin
            {requestsCount > 0 && <span className="nav-badge">{requestsCount}</span>}
          </button>
        </nav>
      </div>
    </header>
  );
}
