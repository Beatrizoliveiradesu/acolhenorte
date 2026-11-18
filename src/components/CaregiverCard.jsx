import React from 'react';
import { BadgeCheck, MapPin, Clock, Award, MessageCircle } from 'lucide-react';
import { buildWhatsAppUrl } from '../data/initialCaregivers';

function getInitials(name = '') {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() || '')
    .join('');
}

export default function CaregiverCard({ caregiver, onRequestCare }) {
  const especialidades = Array.isArray(caregiver.especialidades)
    ? caregiver.especialidades
    : String(caregiver.especialidades || '')
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean);

  const whatsappMsg = `Olá, ${caregiver.nome}! Encontrei seu perfil na vitrine da plataforma *Acolhe Norte* e gostaria de conversar sobre disponibilidade para cuidado de idoso (${caregiver.turno}).`;
  const whatsappHref = buildWhatsAppUrl(caregiver.whatsapp, whatsappMsg);

  return (
    <article className="caregiver-card">
      <div>
        <div className="caregiver-top">
          <div className="caregiver-profile">
            <div className="caregiver-avatar" aria-hidden="true">
              {getInitials(caregiver.nome)}
            </div>
            <div>
              <h3 className="caregiver-name">{caregiver.nome}</h3>
              <p className="caregiver-formation">{caregiver.formacao}</p>
            </div>
          </div>

          <span className="verified-badge">
            <BadgeCheck size={15} />
            {caregiver.verificado ? 'Perfil Verificado' : 'Cadastro Ativo'}
          </span>
        </div>

        <div className="caregiver-meta" style={{ marginTop: '1rem' }}>
          <div className="caregiver-meta-row">
            <MapPin size={16} />
            <span>
              <strong>Bairros:</strong> {caregiver.bairros}
            </span>
          </div>
          <div className="caregiver-meta-row">
            <Clock size={16} />
            <span>
              <strong>Disponibilidade:</strong> {caregiver.turno}
            </span>
          </div>
          {especialidades.length > 0 && (
            <div className="caregiver-meta-row" style={{ alignItems: 'flex-start', marginTop: '0.25rem' }}>
              <Award size={16} style={{ marginTop: '0.25rem' }} />
              <div className="tags-list">
                {especialidades.map((esp, idx) => (
                  <span key={`${caregiver.id}-esp-${idx}`} className="tag">
                    {esp}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="caregiver-footer">
        <span className="tag tag-gold">{caregiver.turno}</span>

        <div style={{ display: 'flex', gap: '0.55rem', flexWrap: 'wrap' }}>
          {onRequestCare && (
            <button
              type="button"
              className="btn btn-outline-green btn-sm"
              onClick={() => onRequestCare(caregiver)}
            >
              Solicitar Plantão
            </button>
          )}
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-whatsapp btn-sm"
          >
            <MessageCircle size={16} />
            WhatsApp
          </a>
        </div>
      </div>
    </article>
  );
}
