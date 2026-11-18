export const STORAGE_KEYS = {
  CAREGIVERS: 'acolhe_norte_cuidadores_v1',
  REQUESTS: 'acolhe_norte_pedidos_v1',
};

export const INITIAL_CAREGIVERS = [
  {
    id: 'cg-1',
    nome: 'Maria do Socorro Silva',
    bairros: 'Adrianópolis, Vieiralves, Parque 10, Aleixo',
    formacao: 'Técnica em Enfermagem • 8 anos de experiência',
    especialidades: ['Alzheimer e Demências', 'Mobilidade Reduzida', 'Medicação e Sinais Vitais'],
    turno: 'Plantão 12x36',
    whatsapp: '(92) 99184-3210',
    verificado: true,
    destaque: true,
    criadoEm: '15/11/2026',
  },
  {
    id: 'cg-2',
    nome: 'Raimundo Nonato Souza',
    bairros: 'Ponta Negra, Dom Pedro, Planalto, Alvorada',
    formacao: 'Cuidador Certificado • 6 anos de experiência',
    especialidades: ['Pós-operatório', 'Mobilidade Reduzida', 'Reabilitação Motora'],
    turno: 'Noturno',
    whatsapp: '(92) 99241-7750',
    verificado: true,
    destaque: true,
    criadoEm: '15/11/2026',
  },
  {
    id: 'cg-3',
    nome: 'Ana Clara Vasconcelos',
    bairros: 'Nossa Sra. das Graças, Centro, Cachoeirinha, São Geraldo',
    formacao: 'Enfermeira Gerontóloga • 5 anos de experiência',
    especialidades: ['Alzheimer e Demências', 'Pós-operatório', 'Sondas e Curativos'],
    turno: 'Diurno',
    whatsapp: '(92) 98115-6042',
    verificado: true,
    destaque: true,
    criadoEm: '16/11/2026',
  },
  {
    id: 'cg-4',
    nome: 'Francisca Oliveira Mendes',
    bairros: 'Cidade Nova, Flores, Parque das Laranjeiras, Japiim',
    formacao: 'Cuidadora de Idosos • 10 anos de experiência',
    especialidades: ['Companhia e Rotina Diária', 'Estímulo Cognitivo', 'Alimentação Assistida'],
    turno: 'Diárias / Flexível',
    whatsapp: '(92) 99362-8904',
    verificado: true,
    destaque: true,
    criadoEm: '16/11/2026',
  },
];

export function formatPhoneMask(value = '') {
  const digits = value.replace(/\D/g, '').slice(0, 11);
  if (digits.length <= 2) return digits;
  if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

export function buildWhatsAppUrl(phone = '', message = '') {
  const digits = phone.replace(/\D/g, '');
  const cleanNumber = digits.startsWith('55')
    ? digits
    : `55${digits || '92991000000'}`;
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${cleanNumber}?text=${encoded}`;
}

export function loadCaregivers() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.CAREGIVERS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.CAREGIVERS, JSON.stringify(INITIAL_CAREGIVERS));
      return INITIAL_CAREGIVERS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : INITIAL_CAREGIVERS;
  } catch {
    return INITIAL_CAREGIVERS;
  }
}

export function saveCaregivers(list) {
  localStorage.setItem(STORAGE_KEYS.CAREGIVERS, JSON.stringify(list));
}

export function loadFamilyRequests() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.REQUESTS);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveFamilyRequests(list) {
  localStorage.setItem(STORAGE_KEYS.REQUESTS, JSON.stringify(list));
}
