export const WHATSAPP_OFICIAL = '5592991000000';
export const WHATSAPP_OFICIAL_FORMATADO = '(92) 99100-0000';

export const LOGO_ACOLHE_NORTE = '/logo-acolhe-norte.jpg';

export const ADMIN_PIN_PADRAO = '2026';
export const ADMIN_SESSION_KEY = 'acolhe_norte_admin_unlocked';

export function buildOfficialWhatsAppUrl(message = '') {
  const cleanDigits = WHATSAPP_OFICIAL.replace(/\D/g, '');
  if (!message) {
    return `https://wa.me/${cleanDigits}`;
  }
  return `https://wa.me/${cleanDigits}?text=${encodeURIComponent(message)}`;
}
