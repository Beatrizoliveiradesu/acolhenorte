import React, { useState } from 'react';
import { Home, Users, UserPlus, HeartHandshake, Phone, Menu, X } from 'lucide-react';
import {
  LOGO_ACOLHE_NORTE,
  WHATSAPP_OFICIAL_FORMATADO,
  buildOfficialWhatsAppUrl,
} from '../config';

export default function Navbar({ currentPage, onNavigate }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNav = (page) => {
    onNavigate(page);
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navWhatsappUrl = buildOfficialWhatsAppUrl(
    'Olá, equipe *Acolhe Norte*! Gostaria de conversar sobre atendimento de cuidador de idosos.'
  );

  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <button
          type="button"
          className="brand-btn"
          onClick={() => handleNav('home')}
          aria-label="Ir para a página inicial do Acolhe Norte"
        >
          <img
            src={LOGO_ACOLHE_NORTE}
            alt="Logo oficial Acolhe Norte"
            width={46}
            height={46}
            className="brand-logo-img"
            style={{ width: 46, height: 46, objectFit: 'cover', borderRadius: 11, flexShrink: 0 }}
          />
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

          <a
            href={navWhatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="nav-phone-link"
            title="Central WhatsApp Acolhe Norte"
          >
            <Phone size={15} />
            <span>{WHATSAPP_OFICIAL_FORMATADO}</span>
          </a>

          <button
            type="button"
            className="btn btn-gold btn-sm nav-cta-btn"
            onClick={() => handleNav('familias')}
          >
            <HeartHandshake size={17} />
            Solicitar Cuidador
          </button>
        </nav>
      </div>
    </header>
  );
}
