import React, { useState } from 'react';
import {
  Users,
  UserCheck,
  MessageCircle,
  Trash2,
  ClipboardList,
  RotateCcw,
  Clock,
  Lock,
  LogOut,
  Plus,
  CheckCircle2,
  EyeOff,
  X,
} from 'lucide-react';
import { buildWhatsAppUrl, formatPhoneMask } from '../data/initialCaregivers';
import {
  ADMIN_PIN_PADRAO,
  ADMIN_SESSION_KEY,
  LOGO_ACOLHE_NORTE,
} from '../config';
import { BAIRROS_MANAUS, NIVEIS_CUIDADO, TURNOS_FAMILIA } from './Familias';

const STATUS_PEDIDO_OPCOES = ['Novo', 'Em Atendimento', 'Concluído'];

export default function Admin({
  requests,
  caregivers,
  onAddRequest,
  onUpdateRequestStatus,
  onDeleteRequest,
  onUpdateCaregiverStatus,
  onDeleteCaregiver,
  onResetDemoData,
  onNavigate,
}) {
  const [unlocked, setUnlocked] = useState(() => {
    try {
      return sessionStorage.getItem(ADMIN_SESSION_KEY) === 'true';
    } catch {
      return false;
    }
  });

  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState('');
  const [abaAtiva, setAbaAtiva] = useState('pedidos');
  const [modalAberto, setModalAberto] = useState(false);

  const [novoPedidoManual, setNovoPedidoManual] = useState({
    responsavel: '',
    whatsapp: '',
    bairro: '',
    nivelCuidado: NIVEIS_CUIDADO[0],
    turno: TURNOS_FAMILIA[0],
    status: 'Em Atendimento',
    observacoes: '',
  });

  const pendentesCount = caregivers.filter((cg) => cg.status === 'pendente').length;
  const aprovadosCount = caregivers.filter((cg) => cg.status === 'aprovado').length;

  const handlePinSubmit = (e) => {
    e.preventDefault();
    if (pinInput.trim() === ADMIN_PIN_PADRAO) {
      try {
        sessionStorage.setItem(ADMIN_SESSION_KEY, 'true');
      } catch {
        // fallback em memória caso sessionStorage esteja indisponível
      }
      setUnlocked(true);
      setPinError('');
      setPinInput('');
    } else {
      setPinError('PIN incorreto. Digite o código de 4 dígitos da coordenação.');
    }
  };

  const handleLockSession = () => {
    try {
      sessionStorage.removeItem(ADMIN_SESSION_KEY);
    } catch {
      // ignore
    }
    setUnlocked(false);
  };

  const handleConfirmReset = () => {
    const confirmado = window.confirm(
      'Deseja realmente restaurar a vitrine padrão e as solicitações de demonstração? Os registros atuais não existentes no padrão serão mantidos e os padrões ausentes serão restaurados.'
    );
    if (confirmado) {
      onResetDemoData();
    }
  };

  const handleManualChange = (e) => {
    const { name, value } = e.target;
    setNovoPedidoManual((prev) => ({
      ...prev,
      [name]: name === 'whatsapp' ? formatPhoneMask(value) : value,
    }));
  };

  const handleManualSubmit = (e) => {
    e.preventDefault();
    const registro = {
      id: `req-manual-${Date.now()}`,
      responsavel: novoPedidoManual.responsavel.trim(),
      whatsapp: novoPedidoManual.whatsapp.trim(),
      bairro: novoPedidoManual.bairro.trim(),
      nivelCuidado: novoPedidoManual.nivelCuidado,
      turno: novoPedidoManual.turno,
      status: novoPedidoManual.status,
      observacoes: novoPedidoManual.observacoes.trim() || 'Registrado manualmente via WhatsApp',
      isDemo: false,
      criadoEm: new Date().toLocaleString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
    };

    onAddRequest(registro);
    setModalAberto(false);
    setNovoPedidoManual({
      responsavel: '',
      whatsapp: '',
      bairro: '',
      nivelCuidado: NIVEIS_CUIDADO[0],
      turno: TURNOS_FAMILIA[0],
      status: 'Em Atendimento',
      observacoes: '',
    });
  };

  const getPedidoStatusBadgeClass = (status) => {
    if (status === 'Concluído') return 'status-pill status-approved';
    if (status === 'Em Atendimento') return 'status-pill status-progress';
    return 'status-pill status-new';
  };

  const ciclarStatusPedido = ( req ) => {
    const atual = req.status || 'Novo';
    const idx = STATUS_PEDIDO_OPCOES.indexOf(atual);
    const proximo = STATUS_PEDIDO_OPCOES[(idx + 1) % STATUS_PEDIDO_OPCOES.length];
    onUpdateRequestStatus(req.id, proximo);
  };

  if (!unlocked) {
    return (
      <section className="section">
        <div className="container">
          <div className="pin-gate-card">
            <img
              src={LOGO_ACOLHE_NORTE}
              alt="Acolhe Norte"
              width={88}
              height={88}
              className="pin-gate-logo"
              style={{ width: 88, height: 88, objectFit: 'cover', borderRadius: 16, margin: '0 auto 1rem' }}
            />
            <div className="pin-gate-badge">
              <Lock size={15} />
              Acesso Restrito • Coordenação
            </div>
            <h1>Painel Administrativo</h1>
            <p>
              Insira o PIN de 4 dígitos para visualizar solicitações de famílias e aprovar
              cuidadores na vitrine.
            </p>

            <form onSubmit={handlePinSubmit} className="pin-gate-form">
              <input
                type="password"
                inputMode="numeric"
                maxLength={4}
                pattern="[0-9]*"
                autoFocus
                required
                placeholder="••••"
                aria-label="PIN de 4 dígitos"
                className="pin-input"
                value={pinInput}
                onChange={(e) => {
                  setPinError('');
                  setPinInput(e.target.value.replace(/\D/g, '').slice(0, 4));
                }}
              />

              {pinError && <div className="pin-error">{pinError}</div>}

              <button type="submit" className="btn btn-primary btn-block">
                <Lock size={17} />
                Liberar Painel Admin
              </button>

              {onNavigate && (
                <button
                  type="button"
                  className="btn btn-outline-green btn-sm btn-block"
                  onClick={() => onNavigate('home')}
                >
                  Voltar para a Página Inicial
                </button>
              )}
            </form>
          </div>
        </div>
      </section>
    );
  }

  return (
    <div>
      <section className="page-banner">
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h1>Painel Administrativo — Acolhe Norte</h1>
            <p>
              Gerencie solicitações das famílias, registre atendimentos vindos do WhatsApp e aprove
              cuidadores para a vitrine pública.
            </p>
          </div>

          <button
            type="button"
            className="btn btn-outline-light btn-sm"
            onClick={handleLockSession}
            title="Encerrar sessão do Painel Admin"
          >
            <LogOut size={15} />
            Bloquear Painel
          </button>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {/* Cards Operacionais */}
          <div className="admin-stats">
            <div className="stat-card" onClick={() => setAbaAtiva('pedidos')} style={{ cursor: 'pointer' }}>
              <div>
                <div className="stat-label">Solicitações de Famílias</div>
                <div className="stat-value">{requests.length}</div>
              </div>
              <div className="feature-icon" style={{ marginBottom: 0 }}>
                <ClipboardList size={24} />
              </div>
            </div>

            <div className="stat-card" onClick={() => setAbaAtiva('cuidadores')} style={{ cursor: 'pointer' }}>
              <div>
                <div className="stat-label">Cuidadores na Vitrine</div>
                <div className="stat-value">{aprovadosCount}</div>
              </div>
              <div className="feature-icon" style={{ marginBottom: 0 }}>
                <UserCheck size={24} />
              </div>
            </div>

            <div
              className={`stat-card ${pendentesCount > 0 ? 'stat-card-warning' : ''}`}
              onClick={() => setAbaAtiva('cuidadores')}
              style={{ cursor: 'pointer' }}
            >
              <div>
                <div className="stat-label">Aguardando Triagem</div>
                <div className="stat-value">{pendentesCount}</div>
              </div>
              <div
                className="feature-icon"
                style={{
                  marginBottom: 0,
                  background: pendentesCount > 0 ? 'var(--gold-light)' : undefined,
                  color: pendentesCount > 0 ? '#8a6d14' : undefined,
                }}
              >
                <Clock size={24} />
              </div>
            </div>
          </div>

          {/* Barra de Abas e Ações */}
          <div className="admin-tabs">
            <div className="tab-group" role="tablist">
              <button
                type="button"
                role="tab"
                aria-selected={abaAtiva === 'pedidos'}
                className={`tab-btn ${abaAtiva === 'pedidos' ? 'active' : ''}`}
                onClick={() => setAbaAtiva('pedidos')}
              >
                <Users size={16} />
                Solicitações das Famílias ({requests.length})
              </button>

              <button
                type="button"
                role="tab"
                aria-selected={abaAtiva === 'cuidadores'}
                className={`tab-btn ${abaAtiva === 'cuidadores' ? 'active' : ''}`}
                onClick={() => setAbaAtiva('cuidadores')}
              >
                <UserCheck size={16} />
                Cuidadores ({caregivers.length})
                {pendentesCount > 0 && (
                  <span className="pending-count-pill">{pendentesCount} pendente(s)</span>
                )}
              </button>
            </div>

            <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
              {abaAtiva === 'pedidos' && (
                <button
                  type="button"
                  className="btn btn-gold btn-sm"
                  onClick={() => setModalAberto(true)}
                >
                  <Plus size={16} />
                  Nova Solicitação Manual
                </button>
              )}

              <button
                type="button"
                className="btn btn-outline-green btn-sm"
                onClick={handleConfirmReset}
                title="Restaurar os 4 cuidadores padrão e solicitações de demonstração"
              >
                <RotateCcw size={15} />
                Restaurar Vitrine Padrão
              </button>
            </div>
          </div>

          {/* Modal / Formulário Rápido de Nova Solicitação Manual */}
          {modalAberto && (
            <div className="modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="modal-manual-title">
              <div className="modal-card">
                <div className="modal-header">
                  <div>
                    <h2 id="modal-manual-title" style={{ color: 'var(--green-dark)', fontSize: '1.25rem' }}>
                      + Nova Solicitação Manual
                    </h2>
                    <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)' }}>
                      Registre rapidamente um pedido recebido via WhatsApp ou ligação.
                    </p>
                  </div>
                  <button
                    type="button"
                    className="modal-close-btn"
                    onClick={() => setModalAberto(false)}
                    aria-label="Fechar janela"
                  >
                    <X size={20} />
                  </button>
                </div>

                <form onSubmit={handleManualSubmit} className="form-grid">
                  <div className="form-group">
                    <label className="form-label" htmlFor="manual-resp">
                      Nome do Responsável *
                    </label>
                    <input
                      id="manual-resp"
                      name="responsavel"
                      type="text"
                      required
                      className="form-control"
                      placeholder="Ex: Sra. Fátima Souza"
                      value={novoPedidoManual.responsavel}
                      onChange={handleManualChange}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="manual-zap">
                      WhatsApp *
                    </label>
                    <input
                      id="manual-zap"
                      name="whatsapp"
                      type="tel"
                      required
                      className="form-control"
                      placeholder="(92) 99100-0000"
                      value={novoPedidoManual.whatsapp}
                      onChange={handleManualChange}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="manual-bairro">
                      Bairro *
                    </label>
                    <input
                      id="manual-bairro"
                      name="bairro"
                      type="text"
                      list="admin-bairros-manaus"
                      required
                      className="form-control"
                      placeholder="Ex: Vieiralves, Flores..."
                      value={novoPedidoManual.bairro}
                      onChange={handleManualChange}
                    />
                    <datalist id="admin-bairros-manaus">
                      {BAIRROS_MANAUS.map((b) => (
                        <option key={b} value={b} />
                      ))}
                    </datalist>
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="manual-status">
                      Status Inicial
                    </label>
                    <select
                      id="manual-status"
                      name="status"
                      className="form-control"
                      value={novoPedidoManual.status}
                      onChange={handleManualChange}
                    >
                      {STATUS_PEDIDO_OPCOES.map((st) => (
                        <option key={st} value={st}>
                          {st}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="manual-nivel">
                      Nível de Cuidado
                    </label>
                    <select
                      id="manual-nivel"
                      name="nivelCuidado"
                      className="form-control"
                      value={novoPedidoManual.nivelCuidado}
                      onChange={handleManualChange}
                    >
                      {NIVEIS_CUIDADO.map((n) => (
                        <option key={n} value={n}>
                          {n}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="manual-turno">
                      Turno
                    </label>
                    <select
                      id="manual-turno"
                      name="turno"
                      className="form-control"
                      value={novoPedidoManual.turno}
                      onChange={handleManualChange}
                    >
                      {TURNOS_FAMILIA.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group full-width">
                    <label className="form-label" htmlFor="manual-obs">
                      Observações do Atendimento
                    </label>
                    <input
                      id="manual-obs"
                      name="observacoes"
                      type="text"
                      className="form-control"
                      placeholder="Ex: Pedido recebido no WhatsApp urgente para início na segunda-feira."
                      value={novoPedidoManual.observacoes}
                      onChange={handleManualChange}
                    />
                  </div>

                  <div className="form-group full-width" style={{ display: 'flex', justifyContent: 'flex-end', flexDirection: 'row', gap: '0.65rem', marginTop: '0.35rem' }}>
                    <button
                      type="button"
                      className="btn btn-outline-green btn-sm"
                      onClick={() => setModalAberto(false)}
                    >
                      Cancelar
                    </button>
                    <button type="submit" className="btn btn-primary btn-sm">
                      Salvar Solicitação
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Tabela de Solicitações das Famílias */}
          {abaAtiva === 'pedidos' && (
            <>
              {requests.length === 0 ? (
                <div className="empty-state">
                  <ClipboardList size={36} color="#2d6a4f" />
                  <h3>Nenhuma solicitação de família registrada no momento</h3>
                  <p style={{ marginBottom: '1rem' }}>
                    Registre um atendimento vindo do WhatsApp ou aguarde novos envios da página
                    &ldquo;Para Famílias&rdquo;.
                  </p>
                  <button
                    type="button"
                    className="btn btn-gold btn-sm"
                    onClick={() => setModalAberto(true)}
                  >
                    <Plus size={16} />
                    Nova Solicitação Manual
                  </button>
                </div>
              ) : (
                <div className="table-wrapper">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Data</th>
                        <th>Responsável</th>
                        <th>Bairro / Cuidado</th>
                        <th>Turno</th>
                        <th>Status do Pedido</th>
                        <th>Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {requests.map((req) => {
                        const statusAtual = req.status || 'Novo';
                        const msgFamilia = `Olá, ${req.responsavel}! Aqui é da equipe *Acolhe Norte*. Recebemos sua solicitação de cuidador para o bairro *${req.bairro}* (${req.nivelCuidado} - ${req.turno}) e já selecionamos perfis compatíveis para apresentar!`;
                        const linkZap = buildWhatsAppUrl(req.whatsapp, msgFamilia);

                        return (
                          <tr key={req.id}>
                            <td style={{ whiteSpace: 'nowrap', color: 'var(--text-muted)', fontSize: '0.83rem' }}>
                              {req.criadoEm || 'Recente'}
                            </td>
                            <td>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', flexWrap: 'wrap' }}>
                                <strong>{req.responsavel}</strong>
                                {req.isDemo && <span className="demo-badge">Demonstração</span>}
                              </div>
                              <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: 2 }}>
                                {req.whatsapp}
                              </div>
                              {req.observacoes && (
                                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: 3, maxWidth: 280 }}>
                                  {req.observacoes}
                                </div>
                              )}
                            </td>
                            <td>
                              <div style={{ fontWeight: 600, marginBottom: '0.25rem' }}>{req.bairro}</div>
                              <span className="tag">{req.nivelCuidado}</span>
                            </td>
                            <td>
                              <span className="tag tag-gold">{req.turno}</span>
                            </td>
                            <td>
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', alignItems: 'flex-start' }}>
                                <span className={getPedidoStatusBadgeClass(statusAtual)}>
                                  {statusAtual}
                                </span>
                                <button
                                  type="button"
                                  className="status-cycle-btn"
                                  onClick={() => ciclarStatusPedido(req)}
                                  title="Clique para alternar entre Novo, Em Atendimento e Concluído"
                                >
                                  Alterar status ↻
                                </button>
                              </div>
                            </td>
                            <td>
                              <div className="admin-actions">
                                <a
                                  href={linkZap}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="btn btn-whatsapp btn-sm"
                                >
                                  <MessageCircle size={15} />
                                  WhatsApp
                                </a>
                                <button
                                  type="button"
                                  className="btn btn-danger-ghost"
                                  onClick={() => onDeleteRequest(req.id)}
                                  title="Excluir solicitação"
                                >
                                  <Trash2 size={15} />
                                  Excluir
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </>
          )}

          {/* Tabela de Cuidadores Cadastrados */}
          {abaAtiva === 'cuidadores' && (
            <>
              {caregivers.length === 0 ? (
                <div className="empty-state">
                  <UserCheck size={36} color="#2d6a4f" />
                  <h3>Nenhum cuidador cadastrado no momento</h3>
                  <p>
                    Cadastre novos profissionais na aba &ldquo;Sou Cuidador&rdquo; ou clique em
                    &ldquo;Restaurar Vitrine Padrão&rdquo;.
                  </p>
                </div>
              ) : (
                <div className="table-wrapper">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Profissional</th>
                        <th>Bairros Atendidos</th>
                        <th>Especialidades / Turno</th>
                        <th>Status na Vitrine</th>
                        <th>Ações de Curadoria</th>
                      </tr>
                    </thead>
                    <tbody>
                      {caregivers.map((cg) => {
                        const msgCuidador = `Olá, ${cg.nome}! Aqui é da coordenação do *Acolhe Norte*. Entramos em contato sobre seu cadastro profissional (${cg.turno}).`;
                        const linkZap = buildWhatsAppUrl(cg.whatsapp, msgCuidador);
                        const listaEsp = Array.isArray(cg.especialidades)
                          ? cg.especialidades
                          : [cg.especialidades];
                        const isApproved = cg.status === 'aprovado';
                        const isPending = cg.status === 'pendente';

                        return (
                          <tr key={cg.id}>
                            <td>
                              <strong>{cg.nome}</strong>
                              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                                {cg.formacao}
                              </div>
                              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: 2 }}>
                                {cg.whatsapp}
                              </div>
                            </td>
                            <td>{cg.bairros}</td>
                            <td>
                              <div style={{ marginBottom: '0.35rem' }}>
                                <span className="tag tag-gold">{cg.turno}</span>
                              </div>
                              <div className="tags-list">
                                {listaEsp.map((esp, idx) => (
                                  <span key={`${cg.id}-adm-${idx}`} className="tag">
                                    {esp}
                                  </span>
                                ))}
                              </div>
                            </td>
                            <td>
                              {isApproved && (
                                <span className="status-pill status-approved">Aprovado (Visível)</span>
                              )}
                              {isPending && (
                                <span className="status-pill status-pending">Aguardando Triagem</span>
                              )}
                              {!isApproved && !isPending && (
                                <span className="status-pill status-hidden">Oculto da Vitrine</span>
                              )}
                            </td>
                            <td>
                              <div className="admin-actions" style={{ flexWrap: 'wrap' }}>
                                {!isApproved ? (
                                  <button
                                    type="button"
                                    className="btn btn-primary btn-sm"
                                    onClick={() => onUpdateCaregiverStatus(cg.id, 'aprovado')}
                                    title="Aprovar e exibir na vitrine pública da Home"
                                  >
                                    <CheckCircle2 size={15} />
                                    Aprovar
                                  </button>
                                ) : (
                                  <button
                                    type="button"
                                    className="btn btn-outline-green btn-sm"
                                    onClick={() => onUpdateCaregiverStatus(cg.id, 'oculto')}
                                    title="Ocultar perfil da vitrine pública sem excluir"
                                  >
                                    <EyeOff size={15} />
                                    Ocultar
                                  </button>
                                )}

                                <a
                                  href={linkZap}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="btn btn-whatsapp btn-sm"
                                >
                                  <MessageCircle size={15} />
                                  WhatsApp
                                </a>

                                <button
                                  type="button"
                                  className="btn btn-danger-ghost"
                                  onClick={() => onDeleteCaregiver(cg.id)}
                                  title="Excluir cuidador permanentemente"
                                >
                                  <Trash2 size={15} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
}
