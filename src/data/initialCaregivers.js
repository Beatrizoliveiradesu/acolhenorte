import { WHATSAPP_OFICIAL } from '../config';

export const STORAGE_KEYS = {
  CAREGIVERS: 'acolhe_norte_cuidadores_v1',
  REQUESTS_LEGACY: 'acolhe_norte_pedidos_v1',
  REQUESTS: 'acolhe_norte_pedidos_v2',
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
    status: 'aprovado',
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
    status: 'aprovado',
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
    status: 'aprovado',
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
    status: 'aprovado',
    criadoEm: '16/11/2026',
  },
];

export const INITIAL_DEMO_REQUESTS = [
  {
    id: 'req-demo-1',
    responsavel: 'Dra. Helena Mendonça',
    bairro: 'Adrianópolis',
    nivelCuidado: 'Alzheimer / Demências',
    turno: 'Plantão 12x36 (Diurno)',
    whatsapp: '(92) 99142-8830',
    observacoes: 'Mãe de 84 anos em fase leve de Alzheimer, precisa de estímulo cognitivo e supervisão de medicação.',
    status: 'Em Atendimento',
    isDemo: true,
    criadoEm: '17/11/2026, 14:20',
  },
  {
    id: 'req-demo-2',
    responsavel: 'Carlos Eduardo Frota',
    bairro: 'Parque 10 de Novembro',
    nivelCuidado: 'Pós-operatório / Recuperação Hospitalar',
    turno: 'Noturno',
    whatsapp: '(92) 98219-4410',
    observacoes: 'Pai de 78 anos em recuperação de cirurgia ortopédica no fêmur, alta prevista no Hospital Adventista.',
    status: 'Novo',
    isDemo: true,
    criadoEm: '17/11/2026, 19:45',
  },
];

export function formatPhoneMask(value = '') {
  const digits = value.replace(/\D/g, '').slice(0, 11);
  if (digits.length <= 2) return digits;
  if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

export function buildWhatsAppUrl(phone = '', message = '') {
  const digits = String(phone || '').replace(/\D/g, '');
  const cleanNumber = digits
    ? digits.startsWith('55')
      ? digits
      : `55${digits}`
    : WHATSAPP_OFICIAL;
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
    if (!Array.isArray(parsed)) return INITIAL_CAREGIVERS;

    // Normaliza perfis antigos para manter retrocompatibilidade sem quebrar vitrine
    return parsed.map((cg) => ({
      ...cg,
      status: cg.status || 'aprovado',
    }));
  } catch {
    return INITIAL_CAREGIVERS;
  }
}

export function saveCaregivers(list) {
  localStorage.setItem(STORAGE_KEYS.CAREGIVERS, JSON.stringify(list));
}

export function loadFamilyRequests() {
  try {
    const rawV2 = localStorage.getItem(STORAGE_KEYS.REQUESTS);
    if (rawV2) {
      const parsedV2 = JSON.parse(rawV2);
      if (Array.isArray(parsedV2)) {
        return parsedV2.map((req) => ({
          ...req,
          status: req.status || 'Novo',
        }));
      }
    }

    // Migra eventuais pedidos já salvos na v1 e adiciona os 2 exemplos de demonstração
    const rawV1 = localStorage.getItem(STORAGE_KEYS.REQUESTS_LEGACY);
    const parsedV1 = rawV1 ? JSON.parse(rawV1) : [];
    const migratedV1 = Array.isArray(parsedV1)
      ? parsedV1.map((req) => ({
          ...req,
          status: req.status || 'Novo',
        }))
      : [];

    const combined = [...migratedV1, ...INITIAL_DEMO_REQUESTS];
    localStorage.setItem(STORAGE_KEYS.REQUESTS, JSON.stringify(combined));
    return combined;
  } catch {
    return INITIAL_DEMO_REQUESTS;
  }
}

export function saveFamilyRequests(list) {
  localStorage.setItem(STORAGE_KEYS.REQUESTS, JSON.stringify(list));
}
