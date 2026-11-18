import React, { useMemo, useState } from 'react';
import {
  ShieldCheck,
  CalendarClock,
  HeartHandshake,
  Search,
  Filter,
  Sparkles,
  CheckCircle2,
  MapPin,
  ArrowRight,
  RotateCcw,
  FileCheck2,
  UserCheck,
  Activity,
  Building2,
  SunMoon,
  Repeat,
  Star,
  Quote,
} from 'lucide-react';
import CaregiverCard from '../components/CaregiverCard';
import { LOGO_ACOLHE_NORTE } from '../config';

const TURNOS_FILTRO = [
  'Todos',
  'Plantão 12x36',
  'Diurno',
  'Noturno',
  'Diárias / Flexível',
  'Integral',
];

const PASSOS_SEGURANCA = [
  {
    numero: '01',
    titulo: 'Checagem de referências e certificados',
    descricao:
      'Validamos certificados de formação em enfermagem ou cuidador de idosos, documentos pessoais e referências reais de famílias atendidas anteriormente.',
    Icon: FileCheck2,
  },
  {
    numero: '02',
    titulo: 'Entrevista humanizada',
    descricao:
      'Avaliamos postura ética, escuta ativa, paciência e preparo emocional para lidar com quadros delicados como Alzheimer, demências e pós-operatório.',
    Icon: UserCheck,
  },
  {
    numero: '03',
    titulo: 'Acompanhamento contínuo',
    descricao:
      'Mantemos contato próximo com os familiares após o início dos plantões para assegurar adaptação tranquila, pontualidade e excelência no cuidado.',
    Icon: Activity,
  },
];

const MODALIDADES_PLANTAO = [
  {
    badge: 'Flexibilidade Imediata',
    titulo: 'Diária Avulsa / Hospitalar',
    descricao:
      'Ideal para acompanhamento em internações hospitalares em Manaus, altas médicas, exames ou cobertura pontual de finais de semana e folgas.',
    itens: ['Acompanhamento em hospitais e clínicas', 'Cobertura avulsa sob demanda', 'Relato detalhado do turno à família'],
    Icon: Building2,
  },
  {
    badge: 'Rotina Equilibrada',
    titulo: 'Diurno / Noturno',
    descricao:
      'Assistência dedicada durante o dia para banho, alimentação e estímulo ativo, ou vigilância serena durante toda a noite para prevenção de quedas.',
    itens: ['Turnos de 8h a 12h diários', 'Administração segura de medicamentos', 'Higiene, conforto e companhia ativa'],
    Icon: SunMoon,
  },
  {
    badge: 'Mais Procurado',
    titulo: 'Escala 12x36',
    descricao:
      'Cobertura contínua e previsível para idosos com dependência moderada ou alta, com profissionais alinhados à rotina do lar sem sobrecarga.',
    itens: ['Continuidade no cuidado prolongado', 'Ideal para Alzheimer e acamados', 'Passagem de plantão organizada'],
    Icon: Repeat,
    destaque: true,
  },
];

const DEPOIMENTOS_MANAUS = [
  {
    id: 'dep-1',
    nome: 'Luciana Frota',
    bairro: 'Adrianópolis • Manaus/AM',
    relato:
      'Encontramos a cuidadora ideal para minha mãe com Alzheimer em menos de 24 horas. Extremamente carinhosa, pontual e rigorosa com os horários das medicações.',
  },
  {
    id: 'dep-2',
    nome: 'Roberto Vasconcelos',
    bairro: 'Parque 10 • Manaus/AM',
    relato:
      'Precisávamos de acompanhamento noturno urgente após a cirurgia ortopédica do meu pai. A curadoria do Acolhe Norte trouxe uma tranquilidade imensa para nossa família.',
  },
  {
    id: 'dep-3',
    nome: 'Cláudia & Marcos Moura',
    bairro: 'Ponta Negra • Manaus/AM',
    relato:
      'A escala 12x36 encaixou perfeitamente na rotina do nosso avô de 87 anos. Profissionais verificadas, educadas e que tratam o idoso com verdadeiro respeito e afeto.',
  },
];

export default function Home({ caregivers, onNavigate, onSelectCaregiverForRequest }) {
  const [buscaBairro, setBuscaBairro] = useState('');
  const [filtroTurno, setFiltroTurno] = useState('Todos');

  const cuidadoresAprovados = useMemo(
    () => caregivers.filter((cg) => cg.status === 'aprovado'),
    [caregivers]
  );

  const cuidadoresFiltrados = useMemo(() => {
    const termo = buscaBairro.trim().toLowerCase();

    return cuidadoresAprovados.filter((cg) => {
      const matchBairro =
        !termo ||
        cg.bairros.toLowerCase().includes(termo) ||
        cg.nome.toLowerCase().includes(termo) ||
        (Array.isArray(cg.especialidades) &&
          cg.especialidades.some((e) => e.toLowerCase().includes(termo)));

      const matchTurno =
        filtroTurno === 'Todos' ||
        cg.turno.toLowerCase().includes(filtroTurno.toLowerCase());

      return matchBairro && matchTurno;
    });
  }, [cuidadoresAprovados, buscaBairro, filtroTurno]);

  const limparFiltros = () => {
    setBuscaBairro('');
    setFiltroTurno('Todos');
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="hero">
        <div className="container hero-grid">
          <div>
            <span className="hero-tag">
              <Sparkles size={15} />
              Plataforma de Cuidado Humanizado em Manaus e Região Norte
            </span>

            <h1>
              Quem sempre cuidou de você merece{' '}
              <span>acolhimento, respeito e segurança.</span>
            </h1>

            <p className="hero-lead">
              Conectamos famílias de Manaus a cuidadores de idosos verificados para plantões
              flexíveis, acompanhamento pós-operatório, Alzheimer e rotina diária no conforto do lar.
            </p>

            <div className="hero-actions">
              <button
                type="button"
                className="btn btn-gold"
                onClick={() => onNavigate('familias')}
              >
                Preciso de um Cuidador
                <ArrowRight size={18} />
              </button>

              <button
                type="button"
                className="btn btn-outline-light"
                onClick={() => onNavigate('cuidadores')}
              >
                Sou Cuidador
              </button>
            </div>

            <div className="hero-trust">
              <div className="hero-trust-item">
                <CheckCircle2 size={18} color="#d4af37" />
                <span>Atendimento em todas as zonas de Manaus</span>
              </div>
              <div className="hero-trust-item">
                <CheckCircle2 size={18} color="#d4af37" />
                <span>Profissionais aprovados em triagem</span>
              </div>
            </div>
          </div>

          <aside className="hero-card" aria-label="Identidade e compromissos Acolhe Norte">
            <div
              className="hero-logo-showcase"
              style={{
                background: '#fbfaf5',
                borderRadius: 16,
                padding: '0.85rem',
                marginBottom: '1.15rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '2px solid rgba(212, 175, 55, 0.5)',
              }}
            >
              <img
                src={LOGO_ACOLHE_NORTE}
                alt="Acolhe Norte — Cuidado Humanizado para Idosos"
                width={175}
                height={175}
                className="hero-logo-img"
                style={{ width: 175, height: 175, maxWidth: '100%', objectFit: 'contain', borderRadius: 10 }}
              />
            </div>

            <ul className="hero-card-list">
              <li>
                <MapPin size={18} color="#d4af37" style={{ flexShrink: 0, marginTop: 2 }} />
                <span>
                  <strong>Busca por Bairro:</strong> Adrianópolis, Ponta Negra, Parque 10, Cidade
                  Nova, Vieiralves, Centro e demais regiões.
                </span>
              </li>
              <li>
                <ShieldCheck size={18} color="#d4af37" style={{ flexShrink: 0, marginTop: 2 }} />
                <span>
                  <strong>Curadoria Rigorosa:</strong> Apenas cuidadores aprovados na triagem ficam
                  visíveis na nossa vitrine pública.
                </span>
              </li>
            </ul>
          </aside>
        </div>
      </section>

      {/* Seção de Diferenciais */}
      <section className="section section-alt">
        <div className="container">
          <div className="section-header">
            <span className="section-eyebrow">Nossos Pilares</span>
            <h2>Por que as famílias confiam no Acolhe Norte?</h2>
            <p>
              Unimos rigor técnico e sensibilidade humana para proporcionar tranquilidade aos
              familiares e bem-estar aos idosos.
            </p>
          </div>

          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <ShieldCheck size={26} />
              </div>
              <h3>Profissionais Verificados</h3>
              <p>
                Avaliamos formação, certificados de curso de cuidador ou enfermagem, experiência
                comprovada e referências anteriores antes de aprovar cada perfil.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <CalendarClock size={26} />
              </div>
              <h3>Plantões Flexíveis (12x36 / Diárias)</h3>
              <p>
                Contrate conforme a necessidade real da família: escalas 12x36, turnos diurnos ou
                noturnos, finais de semana ou diárias pontuais para cobertura.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <HeartHandshake size={26} />
              </div>
              <h3>Atendimento Humanizado</h3>
              <p>
                Mais do que assistência física, valorizamos a escuta, o afeto, o estímulo cognitivo
                e o respeito aos hábitos e à cultura das famílias nortistas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Como garantimos a segurança da sua família (3 Passos) */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-eyebrow">Protocolo de Confiança</span>
            <h2>Como garantimos a segurança da sua família</h2>
            <p>
              Todo profissional passa por um processo estruturado em 3 etapas antes de ser
              recomendado ao lar do seu familiar.
            </p>
          </div>

          <div className="steps-grid">
            {PASSOS_SEGURANCA.map(({ numero, titulo, descricao, Icon }) => (
              <div key={numero} className="step-card">
                <div className="step-card-top">
                  <span className="step-number">Passo {numero}</span>
                  <div className="step-icon">
                    <Icon size={22} />
                  </div>
                </div>
                <h3>{titulo}</h3>
                <p>{descricao}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modalidades de Plantão */}
      <section className="section section-alt">
        <div className="container">
          <div className="section-header">
            <span className="section-eyebrow">Formatos de Atendimento</span>
            <h2>Modalidades de Plantão</h2>
            <p>
              Opções pensadas para acompanhar desde uma alta hospitalar pontual até o cuidado
              contínuo em domicílio.
            </p>
          </div>

          <div className="modalities-grid">
            {MODALIDADES_PLANTAO.map(({ badge, titulo, descricao, itens, Icon, destaque }) => (
              <div
                key={titulo}
                className={`modality-card ${destaque ? 'modality-card-featured' : ''}`}
              >
                <div className="modality-header">
                  <span className={`tag ${destaque ? 'tag-gold' : ''}`}>{badge}</span>
                  <div className="feature-icon" style={{ marginBottom: 0, width: 44, height: 44 }}>
                    <Icon size={22} />
                  </div>
                </div>
                <h3>{titulo}</h3>
                <p>{descricao}</p>
                <ul className="modality-list">
                  {itens.map((item) => (
                    <li key={item}>
                      <CheckCircle2 size={16} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  className={`btn btn-sm btn-block ${destaque ? 'btn-gold' : 'btn-outline-green'}`}
                  onClick={() => onNavigate('familias')}
                >
                  Solicitar esta modalidade
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vitrine de Cuidadores em Destaque */}
      <section className="section" id="vitrine">
        <div className="container">
          <div className="section-header">
            <span className="section-eyebrow">Vitrine Acolhe Norte</span>
            <h2>Cuidadores em Destaque</h2>
            <p>
              Perfis verificados e aprovados pela nossa curadoria. Filtre por bairro de Manaus ou
              pelo turno desejado.
            </p>
          </div>

          <div className="filter-bar" role="search" aria-label="Filtrar cuidadores">
            <div className="input-with-icon">
              <Search size={18} />
              <input
                type="text"
                value={buscaBairro}
                onChange={(e) => setBuscaBairro(e.target.value)}
                placeholder="Buscar por bairro (ex: Adrianópolis, Ponta Negra, Cidade Nova) ou nome..."
                aria-label="Buscar por bairro ou nome"
              />
            </div>

            <div className="input-with-icon">
              <Filter size={18} />
              <select
                value={filtroTurno}
                onChange={(e) => setFiltroTurno(e.target.value)}
                aria-label="Filtrar por turno"
              >
                {TURNOS_FILTRO.map((turno) => (
                  <option key={turno} value={turno}>
                    {turno === 'Todos' ? 'Todos os turnos' : `Turno: ${turno}`}
                  </option>
                ))}
              </select>
            </div>

            {(buscaBairro || filtroTurno !== 'Todos') && (
              <button
                type="button"
                className="btn btn-outline-green btn-sm"
                onClick={limparFiltros}
              >
                <RotateCcw size={15} />
                Limpar
              </button>
            )}
          </div>

          {cuidadoresFiltrados.length > 0 ? (
            <div className="caregivers-grid">
              {cuidadoresFiltrados.map((caregiver) => (
                <CaregiverCard
                  key={caregiver.id}
                  caregiver={caregiver}
                  onRequestCare={onSelectCaregiverForRequest}
                />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <Search size={36} color="#2d6a4f" />
              <h3>Nenhum cuidador aprovado encontrado para esse filtro</h3>
              <p style={{ marginBottom: '1.15rem' }}>
                Tente buscar por outro bairro de Manaus ou selecione &ldquo;Todos os turnos&rdquo;.
              </p>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                <button type="button" className="btn btn-outline-green btn-sm" onClick={limparFiltros}>
                  Ver todos os cuidadores aprovados
                </button>
                <button
                  type="button"
                  className="btn btn-primary btn-sm"
                  onClick={() => onNavigate('familias')}
                >
                  Enviar pedido sob medida
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Depoimentos de Famílias de Manaus */}
      <section className="section section-alt">
        <div className="container">
          <div className="section-header">
            <span className="section-eyebrow">Histórias Reais</span>
            <h2>O que dizem as famílias atendidas em Manaus</h2>
            <p>
              A tranquilidade de saber que quem você ama está cercado de atenção, carinho e
              profissionalismo.
            </p>
          </div>

          <div className="testimonials-grid">
            {DEPOIMENTOS_MANAUS.map((dep) => (
              <article key={dep.id} className="testimonial-card">
                <div className="testimonial-stars" aria-label="Avaliação 5 de 5 estrelas">
                  {[...Array(5)].map((_, idx) => (
                    <Star key={idx} size={16} fill="#d4af37" color="#d4af37" />
                  ))}
                </div>
                <p className="testimonial-quote">
                  <Quote size={18} className="quote-icon" />
                  {dep.relato}
                </p>
                <div className="testimonial-author">
                  <strong>{dep.nome}</strong>
                  <span>{dep.bairro}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
