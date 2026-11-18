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
} from 'lucide-react';
import CaregiverCard from '../components/CaregiverCard';

const TURNOS_FILTRO = [
  'Todos',
  'Plantão 12x36',
  'Diurno',
  'Noturno',
  'Diárias / Flexível',
  'Integral',
];

export default function Home({ caregivers, onNavigate, onSelectCaregiverForRequest }) {
  const [buscaBairro, setBuscaBairro] = useState('');
  const [filtroTurno, setFiltroTurno] = useState('Todos');

  const cuidadoresFiltrados = useMemo(() => {
    const termo = buscaBairro.trim().toLowerCase();

    return caregivers.filter((cg) => {
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
  }, [caregivers, buscaBairro, filtroTurno]);

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
              Plataforma #1 de Cuidado Humanizado em Manaus e Região Norte
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
                <span>Contato rápido via WhatsApp</span>
              </div>
            </div>
          </div>

          <aside className="hero-card" aria-label="Como funciona o Acolhe Norte">
            <div className="hero-card-header">
              <div className="hero-card-icon">
                <HeartHandshake size={26} />
              </div>
              <div>
                <h2 style={{ fontSize: '1.15rem', fontWeight: 700 }}>
                  Cuidado próximo da sua família
                </h2>
                <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.75)' }}>
                  Simples, transparente e sem burocracia
                </p>
              </div>
            </div>

            <ul className="hero-card-list">
              <li>
                <MapPin size={18} color="#d4af37" style={{ flexShrink: 0, marginTop: 2 }} />
                <span>
                  <strong>Busca por Bairro:</strong> Encontre cuidadores que atendem Adrianópolis,
                  Ponta Negra, Parque 10, Cidade Nova, Centro e mais.
                </span>
              </li>
              <li>
                <CalendarClock size={18} color="#d4af37" style={{ flexShrink: 0, marginTop: 2 }} />
                <span>
                  <strong>Rotina Sob Medida:</strong> Plantões 12x36, diárias avulsas, período
                  diurno, noturno ou acompanhamento hospitalar.
                </span>
              </li>
              <li>
                <ShieldCheck size={18} color="#d4af37" style={{ flexShrink: 0, marginTop: 2 }} />
                <span>
                  <strong>Curadoria Acolhe Norte:</strong> Perfis com formação em enfermagem ou
                  certificação em cuidado à pessoa idosa.
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
                comprovada e referências anteriores antes de destacar cada perfil.
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

      {/* Vitrine de Cuidadores em Destaque */}
      <section className="section" id="vitrine">
        <div className="container">
          <div className="section-header">
            <span className="section-eyebrow">Vitrine Acolhe Norte</span>
            <h2>Cuidadores em Destaque</h2>
            <p>
              Filtre por bairro de Manaus ou pelo turno desejado e converse diretamente com o
              profissional ou envie sua solicitação personalizada.
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
              <h3>Nenhum cuidador encontrado para esse filtro</h3>
              <p style={{ marginBottom: '1.15rem' }}>
                Tente buscar por outro bairro de Manaus ou selecione &ldquo;Todos os turnos&rdquo;.
              </p>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                <button type="button" className="btn btn-outline-green btn-sm" onClick={limparFiltros}>
                  Ver todos os cuidadores
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
    </div>
  );
}
