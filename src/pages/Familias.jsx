import React, { useState } from 'react';
import {
  CheckCircle2,
  MessageCircle,
  HeartHandshake,
  ShieldCheck,
  Clock,
  Send,
} from 'lucide-react';
import { buildWhatsAppUrl, formatPhoneMask } from '../data/initialCaregivers';

const BAIRROS_MANAUS = [
  'Adrianópolis',
  'Aleixo',
  'Alvorada',
  'Cachoeirinha',
  'Centro',
  'Cidade Nova',
  'Compensa',
  'Coroado',
  'Dom Pedro',
  'Flores',
  'Japiim',
  'Nossa Senhora das Graças (Vieiralves)',
  'Parque 10 de Novembro',
  'Parque das Laranjeiras',
  'Planalto',
  'Ponta Negra',
  'São Geraldo',
  'Tarumã',
];

const NIVEIS_CUIDADO = [
  'Alzheimer / Demências',
  'Mobilidade Reduzida / Prevenção de Quedas',
  'Pós-operatório / Recuperação Hospitalar',
  'Companhia Ativa e Rotina Diária',
  'Acamado / Alta Complexidade (Sonda, Curativos)',
];

const TURNOS = [
  'Plantão 12x36 (Diurno)',
  'Plantão 12x36 (Noturno)',
  'Diurno (Segunda a Sexta)',
  'Noturno',
  'Diárias Avulsas / Fim de Semana',
  'Integral / Acompanhamento Contínuo',
];

const CENTRAL_WHATSAPP = '92991000000';

export default function Familias({ onAddRequest, preselectedCaregiver, onClearPreselected }) {
  const [formData, setFormData] = useState({
    responsavel: '',
    bairro: '',
    nivelCuidado: NIVEIS_CUIDADO[0],
    turno: preselectedCaregiver?.turno || TURNOS[0],
    whatsapp: '',
    observacoes: preselectedCaregiver
      ? `Interesse inicial no perfil de: ${preselectedCaregiver.nome}`
      : '',
  });

  const [ultimoPedido, setUltimoPedido] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'whatsapp' ? formatPhoneMask(value) : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const novoPedido = {
      id: `req-${Date.now()}`,
      responsavel: formData.responsavel.trim(),
      bairro: formData.bairro.trim(),
      nivelCuidado: formData.nivelCuidado,
      turno: formData.turno,
      whatsapp: formData.whatsapp.trim(),
      observacoes: formData.observacoes.trim(),
      criadoEm: new Date().toLocaleString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
    };

    onAddRequest(novoPedido);
    setUltimoPedido(novoPedido);

    if (onClearPreselected) {
      onClearPreselected();
    }

    setFormData({
      responsavel: '',
      bairro: '',
      nivelCuidado: NIVEIS_CUIDADO[0],
      turno: TURNOS[0],
      whatsapp: '',
      observacoes: '',
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const gerarLinkResumoWhatsApp = (pedido) => {
    if (!pedido) return '#';
    const resumo = [
      'Olá, equipe *Acolhe Norte*! Acabei de registrar uma solicitação de cuidador:',
      '',
      `• *Responsável:* ${pedido.responsavel}`,
      `• *Bairro:* ${pedido.bairro}`,
      `• *Nível de Cuidado:* ${pedido.nivelCuidado}`,
      `• *Turno Desejado:* ${pedido.turno}`,
      `• *WhatsApp p/ retorno:* ${pedido.whatsapp}`,
      pedido.observacoes ? `• *Observações:* ${pedido.observacoes}` : '',
    ]
      .filter(Boolean)
      .join('\n');

    return buildWhatsAppUrl(CENTRAL_WHATSAPP, resumo);
  };

  return (
    <div>
      <section className="page-banner">
        <div className="container">
          <h1>Para Famílias — Solicitar um Cuidador</h1>
          <p>
            Conte-nos sobre a rotina e as necessidades do seu familiar idoso. Nossa equipe conecta
            você ao profissional ideal no seu bairro em Manaus.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container form-layout">
          <div className="card-panel">
            {ultimoPedido && (
              <div className="success-box" role="status">
                <div className="success-box-header">
                  <CheckCircle2 size={22} color="#1b4332" />
                  <span>Solicitação registrada com sucesso!</span>
                </div>
                <p>
                  Recebemos o pedido de <strong>{ultimoPedido.responsavel}</strong> para o bairro{' '}
                  <strong>{ultimoPedido.bairro}</strong> ({ultimoPedido.nivelCuidado} •{' '}
                  {ultimoPedido.turno}). Seus dados já estão salvos com segurança.
                </p>
                <div className="success-actions">
                  <a
                    href={gerarLinkResumoWhatsApp(ultimoPedido)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-whatsapp btn-sm"
                  >
                    <MessageCircle size={17} />
                    Abrir conversa no WhatsApp com resumo do pedido
                  </a>
                  <button
                    type="button"
                    className="btn btn-outline-green btn-sm"
                    onClick={() => setUltimoPedido(null)}
                  >
                    Fazer nova solicitação
                  </button>
                </div>
              </div>
            )}

            <h2 style={{ color: 'var(--green-dark)', marginBottom: '0.35rem', fontSize: '1.35rem' }}>
              Dados do Atendimento
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', marginBottom: '1.5rem' }}>
              Preencha os campos abaixo em menos de 1 minuto.
            </p>

            <form onSubmit={handleSubmit} className="form-grid">
              <div className="form-group">
                <label className="form-label" htmlFor="responsavel">
                  Nome do Responsável *
                </label>
                <input
                  id="responsavel"
                  name="responsavel"
                  type="text"
                  required
                  className="form-control"
                  placeholder="Ex: Beatriz Oliveira"
                  value={formData.responsavel}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="whatsapp">
                  WhatsApp para Contato *
                </label>
                <input
                  id="whatsapp"
                  name="whatsapp"
                  type="tel"
                  required
                  className="form-control"
                  placeholder="(92) 99123-4567"
                  value={formData.whatsapp}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="bairro">
                  Bairro do Atendimento *
                </label>
                <input
                  id="bairro"
                  name="bairro"
                  type="text"
                  list="lista-bairros-manaus"
                  required
                  className="form-control"
                  placeholder="Ex: Adrianópolis, Parque 10, Ponta Negra..."
                  value={formData.bairro}
                  onChange={handleChange}
                />
                <datalist id="lista-bairros-manaus">
                  {BAIRROS_MANAUS.map((b) => (
                    <option key={b} value={b} />
                  ))}
                </datalist>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="turno">
                  Turno ou Escala Desejada *
                </label>
                <select
                  id="turno"
                  name="turno"
                  className="form-control"
                  value={formData.turno}
                  onChange={handleChange}
                >
                  {TURNOS.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group full-width">
                <label className="form-label" htmlFor="nivelCuidado">
                  Nível / Perfil de Cuidado *
                </label>
                <select
                  id="nivelCuidado"
                  name="nivelCuidado"
                  className="form-control"
                  value={formData.nivelCuidado}
                  onChange={handleChange}
                >
                  {NIVEIS_CUIDADO.map((nivel) => (
                    <option key={nivel} value={nivel}>
                      {nivel}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group full-width">
                <label className="form-label" htmlFor="observacoes">
                  Detalhes sobre a rotina do idoso (opcional)
                </label>
                <textarea
                  id="observacoes"
                  name="observacoes"
                  className="form-control"
                  placeholder="Ex: Idosa de 82 anos, tranquila, precisa de auxílio no banho, controle de medicação e companhia à tarde."
                  value={formData.observacoes}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group full-width" style={{ marginTop: '0.4rem' }}>
                <button type="submit" className="btn btn-primary btn-block">
                  <Send size={18} />
                  Enviar Solicitação de Cuidado
                </button>
              </div>
            </form>
          </div>

          <aside className="info-aside">
            <h3>
              <HeartHandshake size={20} color="#1b4332" />
              Acolhimento com Segurança
            </h3>
            <ul className="info-list">
              <li>
                <ShieldCheck size={18} />
                <span>
                  <strong>Triagem Criteriosa:</strong> Indicamos profissionais compatíveis com o
                  quadro clínico (Alzheimer, pós-cirúrgico, locomoção reduzida).
                </span>
              </li>
              <li>
                <Clock size={18} />
                <span>
                  <strong>Agilidade Regional:</strong> Priorizamos cuidadores que moram ou já atuam
                  próximos ao seu bairro em Manaus para pontualidade total.
                </span>
              </li>
              <li>
                <MessageCircle size={18} />
                <span>
                  <strong>Atendimento Direto:</strong> Após enviar o formulário, você também pode
                  encaminhar o resumo pronto direto no WhatsApp com 1 clique.
                </span>
              </li>
            </ul>
          </aside>
        </div>
      </section>
    </div>
  );
}
