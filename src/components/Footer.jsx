import React from 'react';
import { HeartHandshake, MapPin, Phone, Clock } from 'lucide-react';

export default function Footer({ onNavigate }) {
  const go = (page) => {
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.85rem' }}>
              <span className="brand-icon" style={{ width: 36, height: 36, borderRadius: 10 }}>
                <HeartHandshake size={20} />
              </span>
              <strong style={{ fontSize: '1.15rem', color: '#ffffff' }}>Acolhe Norte</strong>
            </div>
            <p style={{ fontSize: '0.9rem', maxWidth: '380px', color: 'rgba(255,255,255,0.78)' }}>
              Conectamos famílias de Manaus e da Região Norte a cuidadores de idosos qualificados,
              com respeito, segurança e calor humano.
            </p>
          </div>

          <div>
            <h4>Navegação</h4>
            <ul className="footer-links">
              <li>
                <button type="button" onClick={() => go('home')}>
                  Início e Vitrine de Cuidadores
                </button>
              </li>
              <li>
                <button type="button" onClick={() => go('familias')}>
                  Solicitar um Cuidador (Para Famílias)
                </button>
              </li>
              <li>
                <button type="button" onClick={() => go('cuidadores')}>
                  Cadastrar Perfil Profissional (Sou Cuidador)
                </button>
              </li>
              <li>
                <button type="button" onClick={() => go('admin')}>
                  Painel Administrativo
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4>Atendimento Regional</h4>
            <ul className="footer-links" style={{ gap: '0.65rem' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem' }}>
                <MapPin size={16} color="#d4af37" />
                Manaus — AM e Região Metropolitana
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem' }}>
                <Clock size={16} color="#d4af37" />
                Plantões 12x36, Diárias, Diurno e Noturno
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem' }}>
                <Phone size={16} color="#d4af37" />
                Central Acolhe Norte: (92) 99100-0000
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Acolhe Norte — Cuidado Humanizado para Idosos.</span>
          <span>Feito com carinho para famílias da Região Norte.</span>
        </div>
      </div>
    </footer>
  );
}
