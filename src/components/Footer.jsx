import React from 'react';
import { MapPin, Phone, Clock, Shield } from 'lucide-react';
import {
  LOGO_ACOLHE_NORTE,
  WHATSAPP_OFICIAL_FORMATADO,
  buildOfficialWhatsAppUrl,
} from '../config';

export default function Footer({ onNavigate }) {
  const go = (page) => {
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const footerWhatsappUrl = buildOfficialWhatsAppUrl(
    'Olá, equipe *Acolhe Norte*! Gostaria de informações sobre cuidadores de idosos em Manaus.'
  );

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '0.9rem' }}>
              <img
                src={LOGO_ACOLHE_NORTE}
                alt="Acolhe Norte"
                width={48}
                height={48}
                className="footer-logo-img"
                style={{ width: 48, height: 48, objectFit: 'cover', borderRadius: 12, flexShrink: 0 }}
              />
              <div>
                <strong style={{ fontSize: '1.18rem', color: '#ffffff', display: 'block' }}>
                  Acolhe Norte
                </strong>
                <span style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.72)' }}>
                  Cuidado Humanizado para Idosos
                </span>
              </div>
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
              <li style={{ marginTop: '0.35rem' }}>
                <button
                  type="button"
                  onClick={() => go('admin')}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    fontSize: '0.82rem',
                    color: 'rgba(255,255,255,0.6)',
                  }}
                >
                  <Shield size={13} />
                  Painel Administrativo (Acesso Restrito)
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
              <li>
                <a
                  href={footerWhatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    fontSize: '0.9rem',
                    color: '#ffffff',
                    fontWeight: 600,
                  }}
                >
                  <Phone size={16} color="#d4af37" />
                  Central WhatsApp: {WHATSAPP_OFICIAL_FORMATADO}
                </a>
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
