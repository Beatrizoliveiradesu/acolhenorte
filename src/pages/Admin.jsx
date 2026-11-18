import React, { useState } from 'react';
import {
  Users,
  UserCheck,
  MessageCircle,
  Trash2,
  ClipboardList,
  RotateCcw,
  ShieldCheck,
} from 'lucide-react';
import { buildWhatsAppUrl } from '../data/initialCaregivers';

export default function Admin({
  requests,
  caregivers,
  onDeleteRequest,
  onDeleteCaregiver,
  onResetDemoData,
}) {
  const [abaAtiva, setAbaAtiva] = useState('pedidos');

  return (
    <div>
      <section className="page-banner">
        <div className="container">
          <h1>Painel Administrativo — Acolhe Norte</h1>
          <p>
            Gerencie em um só lugar todas as solicitações enviadas pelas famílias e os cuidadores
            cadastrados na plataforma.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {/* Cards de Resumo */}
          <div className="admin-stats">
            <div className="stat-card">
              <div>
                <div className="stat-label">Solicitações de Famílias</div>
                <div className="stat-value">{requests.length}</div>
              </div>
              <div className="feature-icon" style={{ marginBottom: 0 }}>
                <ClipboardList size={24} />
              </div>
            </div>

            <div className="stat-card">
              <div>
                <div className="stat-label">Cuidadores na Vitrine</div>
                <div className="stat-value">{caregivers.length}</div>
              </div>
              <div className="feature-icon" style={{ marginBottom: 0 }}>
                <UserCheck size={24} />
              </div>
            </div>

            <div className="stat-card">
              <div>
                <div className="stat-label">Status do Sistema</div>
                <div className="stat-value" style={{ fontSize: '1.15rem', marginTop: '0.35rem' }}>
                  Sincronizado (LocalStorage)
                </div>
              </div>
              <div className="feature-icon" style={{ marginBottom: 0 }}>
                <ShieldCheck size={24} />
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
                Cuidadores Cadastrados ({caregivers.length})
              </button>
            </div>

            <button
              type="button"
              className="btn btn-outline-green btn-sm"
              onClick={onResetDemoData}
              title="Restaurar os 4 cuidadores padrão caso tenham sido removidos"
            >
              <RotateCcw size={15} />
              Restaurar Vitrine Padrão
            </button>
          </div>

          {/* Tabela de Solicitações das Famílias */}
          {abaAtiva === 'pedidos' && (
            <>
              {requests.length === 0 ? (
                <div className="empty-state">
                  <ClipboardList size={36} color="#2d6a4f" />
                  <h3>Nenhuma solicitação de família registrada ainda</h3>
                  <p>
                    Quando uma família preencher o formulário na aba &ldquo;Para Famílias&rdquo;, o
                    pedido aparecerá aqui automaticamente.
                  </p>
                </div>
              ) : (
                <div className="table-wrapper">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Data</th>
                        <th>Responsável</th>
                        <th>Bairro</th>
                        <th>Nível de Cuidado</th>
                        <th>Turno</th>
                        <th>WhatsApp</th>
                        <th>Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {requests.map((req) => {
                        const msgFamilia = `Olá, ${req.responsavel}! Aqui é da equipe *Acolhe Norte*. Recebemos sua solicitação de cuidador para o bairro *${req.bairro}* (${req.nivelCuidado} - ${req.turno}) e já selecionamos perfis compatíveis para apresentar!`;
                        const linkZap = buildWhatsAppUrl(req.whatsapp, msgFamilia);

                        return (
                          <tr key={req.id}>
                            <td style={{ whiteSpace: 'nowrap', color: 'var(--text-muted)' }}>
                              {req.criadoEm || 'Recente'}
                            </td>
                            <td>
                              <strong>{req.responsavel}</strong>
                              {req.observacoes && (
                                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: 2 }}>
                                  Obs: {req.observacoes}
                                </div>
                              )}
                            </td>
                            <td>{req.bairro}</td>
                            <td>
                              <span className="tag">{req.nivelCuidado}</span>
                            </td>
                            <td>
                              <span className="tag tag-gold">{req.turno}</span>
                            </td>
                            <td style={{ whiteSpace: 'nowrap' }}>{req.whatsapp}</td>
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
                        <th>Especialidades</th>
                        <th>Turno</th>
                        <th>WhatsApp</th>
                        <th>Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {caregivers.map((cg) => {
                        const msgCuidador = `Olá, ${cg.nome}! Aqui é da coordenação do *Acolhe Norte*. Entramos em contato sobre oportunidades de plantão compatíveis com o seu perfil (${cg.turno}).`;
                        const linkZap = buildWhatsAppUrl(cg.whatsapp, msgCuidador);
                        const listaEsp = Array.isArray(cg.especialidades)
                          ? cg.especialidades
                          : [cg.especialidades];

                        return (
                          <tr key={cg.id}>
                            <td>
                              <strong>{cg.nome}</strong>
                              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                                {cg.formacao}
                              </div>
                            </td>
                            <td>{cg.bairros}</td>
                            <td>
                              <div className="tags-list">
                                {listaEsp.map((esp, idx) => (
                                  <span key={`${cg.id}-adm-${idx}`} className="tag">
                                    {esp}
                                  </span>
                                ))}
                              </div>
                            </td>
                            <td>
                              <span className="tag tag-gold">{cg.turno}</span>
                            </td>
                            <td style={{ whiteSpace: 'nowrap' }}>{cg.whatsapp}</td>
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
                                  onClick={() => onDeleteCaregiver(cg.id)}
                                  title="Excluir cuidador"
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
        </div>
      </section>
    </div>
  );
}
