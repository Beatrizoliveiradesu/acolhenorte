import React, { useState } from 'react';
import { CheckCircle2, UserPlus, Sparkles, Award, MapPin, Eye } from 'lucide-react';
import { formatPhoneMask } from '../data/initialCaregivers';

const ESPECIALIDADES_OPCOES = [
  'Alzheimer e Demências',
  'Mobilidade Reduzida',
  'Pós-operatório',
  'Medicação e Sinais Vitais',
  'Companhia e Rotina Diária',
  'Sondas e Curativos',
  'Estímulo Cognitivo',
  'Acompanhamento Hospitalar',
];

const TURNOS_CUIDADOR = [
  'Plantão 12x36',
  'Diurno',
  'Noturno',
  'Diárias / Flexível',
  'Integral',
];

export default function Cuidadores({ onAddCaregiver, onNavigate }) {
  const [formData, setFormData] = useState({
    nome: '',
    bairros: '',
    formacao: '',
    turno: TURNOS_CUIDADOR[0],
    whatsapp: '',
    especialidadeExtra: '',
  });

  const [especialidadesSelecionadas, setEspecialidadesSelecionadas] = useState([
    'Companhia e Rotina Diária',
    'Medicação e Sinais Vitais',
  ]);

  const [perfilCriado, setPerfilCriado] = useState(null);

  const toggleEspecialidade = (item) => {
    setEspecialidadesSelecionadas((prev) =>
      prev.includes(item) ? prev.filter((e) => e !== item) : [...prev, item]
    );
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'whatsapp' ? formatPhoneMask(value) : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const extras = formData.especialidadeExtra
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    const listaEspecialidades = Array.from(
      new Set([...especialidadesSelecionadas, ...extras])
    );

    const novoCuidador = {
      id: `cg-${Date.now()}`,
      nome: formData.nome.trim(),
      bairros: formData.bairros.trim(),
      formacao: formData.formacao.trim(),
      especialidades:
        listaEspecialidades.length > 0
          ? listaEspecialidades
          : ['Cuidado Humanizado ao Idoso'],
      turno: formData.turno,
      whatsapp: formData.whatsapp.trim(),
      verificado: true,
      destaque: true,
      criadoEm: new Date().toLocaleDateString('pt-BR'),
    };

    onAddCaregiver(novoCuidador);
    setPerfilCriado(novoCuidador);

    setFormData({
      nome: '',
      bairros: '',
      formacao: '',
      turno: TURNOS_CUIDADOR[0],
      whatsapp: '',
      especialidadeExtra: '',
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div>
      <section className="page-banner">
        <div className="container">
          <h1>Sou Cuidador — Cadastro Profissional</h1>
          <p>
            Faça parte da rede Acolhe Norte em Manaus e Região Norte. Divulgue seu perfil na nossa
            vitrine e conecte-se a famílias que valorizam o cuidado humanizado.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container form-layout">
          <div className="card-panel">
            {perfilCriado && (
              <div className="success-box" role="status">
                <div className="success-box-header">
                  <CheckCircle2 size={22} color="#1b4332" />
                  <span>Cadastro concluído! Seu perfil já está na Vitrine!</span>
                </div>
                <p>
                  Parabéns, <strong>{perfilCriado.nome}</strong>! Seu perfil profissional foi salvo
                  e adicionado automaticamente à vitrine de Cuidadores em Destaque na página inicial.
                </p>
                <div className="success-actions">
                  <button
                    type="button"
                    className="btn btn-primary btn-sm"
                    onClick={() => onNavigate('home')}
                  >
                    <Eye size={16} />
                    Ver meu perfil na Vitrine da Home
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-green btn-sm"
                    onClick={() => setPerfilCriado(null)}
                  >
                    Cadastrar outro profissional
                  </button>
                </div>
              </div>
            )}

            <h2 style={{ color: 'var(--green-dark)', marginBottom: '0.35rem', fontSize: '1.35rem' }}>
              Perfil Profissional do Cuidador
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', marginBottom: '1.5rem' }}>
              Preencha suas informações para aparecer imediatamente na vitrine do Acolhe Norte.
            </p>

            <form onSubmit={handleSubmit} className="form-grid">
              <div className="form-group">
                <label className="form-label" htmlFor="nome">
                  Nome Completo *
                </label>
                <input
                  id="nome"
                  name="nome"
                  type="text"
                  required
                  className="form-control"
                  placeholder="Ex: Joana Batista Figueiredo"
                  value={formData.nome}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="whatsappCuidador">
                  WhatsApp Profissional *
                </label>
                <input
                  id="whatsappCuidador"
                  name="whatsapp"
                  type="tel"
                  required
                  className="form-control"
                  placeholder="(92) 99234-5678"
                  value={formData.whatsapp}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group full-width">
                <label className="form-label" htmlFor="formacao">
                  Formação e Tempo de Experiência *
                </label>
                <input
                  id="formacao"
                  name="formacao"
                  type="text"
                  required
                  className="form-control"
                  placeholder="Ex: Técnica em Enfermagem • 7 anos de experiência com idosos"
                  value={formData.formacao}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="bairros">
                  Bairros que Atende *
                </label>
                <input
                  id="bairros"
                  name="bairros"
                  type="text"
                  required
                  className="form-control"
                  placeholder="Ex: Parque 10, Adrianópolis, Aleixo, Flores"
                  value={formData.bairros}
                  onChange={handleChange}
                />
                <span className="form-hint">Separe os bairros por vírgula.</span>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="turnoCuidador">
                  Turno Principal Disponível *
                </label>
                <select
                  id="turnoCuidador"
                  name="turno"
                  className="form-control"
                  value={formData.turno}
                  onChange={handleChange}
                >
                  {TURNOS_CUIDADOR.map((turno) => (
                    <option key={turno} value={turno}>
                      {turno}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group full-width">
                <span className="form-label">Especialidades em Cuidado ao Idoso</span>
                <div className="checkbox-pills">
                  {ESPECIALIDADES_OPCOES.map((esp) => {
                    const ativo = especialidadesSelecionadas.includes(esp);
                    return (
                      <label
                        key={esp}
                        className={`checkbox-pill ${ativo ? 'selected' : ''}`}
                      >
                        <input
                          type="checkbox"
                          checked={ativo}
                          onChange={() => toggleEspecialidade(esp)}
                        />
                        {ativo ? '✓ ' : '+ '}
                        {esp}
                      </label>
                    );
                  })}
                </div>
              </div>

              <div className="form-group full-width">
                <label className="form-label" htmlFor="especialidadeExtra">
                  Outras Especialidades ou Certificações (opcional)
                </label>
                <input
                  id="especialidadeExtra"
                  name="especialidadeExtra"
                  type="text"
                  className="form-control"
                  placeholder="Ex: Primeiros Socorros, Fisioterapia Preventiva (separe por vírgula)"
                  value={formData.especialidadeExtra}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group full-width" style={{ marginTop: '0.4rem' }}>
                <button type="submit" className="btn btn-gold btn-block">
                  <UserPlus size={18} />
                  Publicar Meu Perfil na Vitrine
                </button>
              </div>
            </form>
          </div>

          <aside className="info-aside">
            <h3>
              <Sparkles size={20} color="#1b4332" />
              Vantagens para Cuidadores
            </h3>
            <ul className="info-list">
              <li>
                <Award size={18} />
                <span>
                  <strong>Valorização Profissional:</strong> Destaque seus cursos, certificações e
                  experiência em geriatria ou enfermagem.
                </span>
              </li>
              <li>
                <MapPin size={18} />
                <span>
                  <strong>Atue Perto de Casa:</strong> Informe exatamente os bairros e zonas de
                  Manaus onde prefere realizar seus plantões.
                </span>
              </li>
              <li>
                <CheckCircle2 size={18} />
                <span>
                  <strong>Visibilidade Imediata:</strong> Assim que enviar o cadastro, seu card já
                  fica ativo na página inicial para as famílias entrarem em contato.
                </span>
              </li>
            </ul>
          </aside>
        </div>
      </section>
    </div>
  );
}
