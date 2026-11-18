import React from 'react';
import { MessageCircle } from 'lucide-react';
import { buildOfficialWhatsAppUrl } from '../config';

export default function FloatingWhatsApp() {
  const urgentUrl = buildOfficialWhatsAppUrl(
    'Olá, equipe *Acolhe Norte*! Preciso de atendimento urgente para orientação sobre cuidador de idosos em Manaus.'
  );

  return (
    <a
      href={urgentUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="floating-whatsapp"
      aria-label="Atendimento Urgente pelo WhatsApp"
    >
      <span className="floating-whatsapp-icon">
        <MessageCircle size={20} />
      </span>
      <span className="floating-whatsapp-text">Atendimento Urgente</span>
    </a>
  );
}
