import { motion } from 'framer-motion';
import {
  ArrowRight,
  Calculator,
  CheckCircle2,
  FolderKanban,
  Layers,
  ListChecks,
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import { EASE_OUT_EXPO, heroFloatLeft, heroMockupReveal } from '../lib/motion.js';

const TICKETS_MARQUEE = [
  'T01 TEMA CLARO/OSCURO & FOOTER',
  'T02 VALIDACIÓN REACTIVA FORMULARIO',
  'T03 CALCULADORA FISCAL IVA & DESCUENTOS',
  'T04 FIX TRAMPA DEL 0 & ESTADO VACÍO',
  'T05 BUSCADOR TIEMPO REAL & DUPLICADOS',
  'T06 AUDITORÍA 5 EVENTOS & BANCO XSS',
  'T07 FILTRO & ORDENACIÓN EXPEDIENTES',
  'T08 ALTA DINÁMICA DE ALUMNOS',
  'T09 COMPONENTE REUTILIZABLE RESUMEN KPIS',
  'T10 LOCALSTORAGE & BUILD PRODUCCIÓN'
];

export default function LandingBrutalista({ onExplorarWorkspace, onSeleccionarModulo }) {
  const irAModulo = (id) => {
    onSeleccionarModulo(id);
    onExplorarWorkspace();
  };

  return (
    <>
      <section className="landing-section" id="inicio" aria-labelledby="landing-hero-title">
        <div className="landing-container">
          {/* Columna izquierda: Tipografía brutalista de alto impacto (ref. composición Stric) */}
          <motion.div
            variants={heroFloatLeft}
            initial="hidden"
            animate="visible"
          >
            <div className="landing-eyebrow">
              <span className="eyebrow-dot" aria-hidden="true" />
              <span>ALL IN ONE · SPRINT 10 TICKETS · DAM2</span>
            </div>

            <h1 id="landing-hero-title" className="landing-title">
              Estructura toda tu interfaz{' '}
              <span className="landing-title-highlight">React JSX</span> en un único panel.
            </h1>

            <p className="landing-lead">
              Evolución completa del proyecto <strong>m10-2-jsx-react-demo</strong> hacia un
              prototipo empresarial interactivo: validación en tiempo real, cálculo fiscal con IVA
              dinámico, blindaje XSS, cuadro de mando KPI y persistencia local con estándar WCAG
              2.2 AA.
            </p>

            <div className="landing-cta-row">
              <motion.button
                type="button"
                className="brutal-cta-primary"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.16, ease: EASE_OUT_EXPO }}
                onClick={onExplorarWorkspace}
              >
                <span>Explorar Panel Glassy</span>
                <ArrowRight size={18} aria-hidden="true" />
              </motion.button>

              <motion.button
                type="button"
                className="brutal-cta-secondary"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.16, ease: EASE_OUT_EXPO }}
                onClick={() => irAModulo('06')}
              >
                <FolderKanban size={18} aria-hidden="true" />
                <span>Ver Expedientes &amp; KPIs</span>
              </motion.button>
            </div>

            <div className="ra-strip" aria-label="Resultados de Aprendizaje cubiertos">
              <span className="ra-chip">
                <strong>RA 1</strong> Componentes
              </span>
              <span className="ra-chip">
                <strong>RA 2</strong> JSX Declarativo
              </span>
              <span className="ra-chip">
                <strong>RA 3</strong> Estado y Eventos
              </span>
              <span className="ra-chip">
                <strong>RA 4</strong> WCAG AA · 44px
              </span>
              <span className="ra-chip">
                <strong>RA 7</strong> GitHub + Vercel
              </span>
            </div>
          </motion.div>

          {/* Columna derecha: Escenario arquitectónico con doble preview flotante interactivo */}
          <div className="hero-stage" aria-label="Vista previa interactiva del panel">
            <span className="stage-badge-corner">V22 GLASS LIVE</span>

            {/* Tarjeta móvil frontal (accesos directos reales a las pestañas) */}
            <motion.div
              className="mockup-mobile"
              variants={heroMockupReveal(0.12)}
              initial="hidden"
              animate="visible"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.24, ease: EASE_OUT_EXPO }}
            >
              <div className="mockup-mobile-top">
                <div className="mockup-mobile-user">
                  <span style={{ display: 'inline-flex', alignItems: 'center' }}>
                    <span className="mockup-avatar">LL</span>
                    Hola, Luis Lázaro
                  </span>
                  <Sparkles size={15} color="#c8ff3d" aria-hidden="true" />
                </div>
                <div className="mockup-kpi-label">Backlog completado</div>
                <div className="mockup-kpi-big tabular">10 / 10 Tickets</div>
              </div>

              <div className="mockup-mobile-body">
                <div className="mockup-quick-grid">
                  <button
                    type="button"
                    className="mockup-quick-btn"
                    onClick={() => irAModulo('02')}
                    aria-label="Abrir Calculadora Fiscal (Ticket 03)"
                  >
                    <Calculator size={15} aria-hidden="true" />
                    <span>IVA</span>
                  </button>
                  <button
                    type="button"
                    className="mockup-quick-btn"
                    onClick={() => irAModulo('04')}
                    aria-label="Abrir Listas y Keys (Ticket 05)"
                  >
                    <ListChecks size={15} aria-hidden="true" />
                    <span>Listas</span>
                  </button>
                  <button
                    type="button"
                    className="mockup-quick-btn"
                    onClick={() => irAModulo('05')}
                    aria-label="Abrir Auditoría XSS (Ticket 06)"
                  >
                    <ShieldCheck size={15} aria-hidden="true" />
                    <span>XSS</span>
                  </button>
                  <button
                    type="button"
                    className="mockup-quick-btn"
                    onClick={() => irAModulo('06')}
                    aria-label="Abrir Expedientes y KPIs (Tickets 07-10)"
                  >
                    <Layers size={15} aria-hidden="true" />
                    <span>KPIs</span>
                  </button>
                </div>

                <div className="mockup-progress-box">
                  <div className="mockup-progress-head">
                    <span>Criterios de Aceptación</span>
                    <span className="tabular">100%</span>
                  </div>
                  <div className="mockup-progress-track">
                    <div className="mockup-progress-fill" />
                  </div>
                </div>

                <div className="mockup-status-pill">
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                    <CheckCircle2 size={14} color="#c8ff3d" aria-hidden="true" />
                    Build Vite listo
                  </span>
                  <span>0 warnings</span>
                </div>
              </div>
            </motion.div>

            {/* Tarjeta desktop trasera desplazada (ref. Dashboard V22 Glass) */}
            <motion.div
              className="mockup-desktop"
              variants={heroMockupReveal(0.24)}
              initial="hidden"
              animate="visible"
              whileHover={{ y: -4 }}
              transition={{ duration: 0.24, ease: EASE_OUT_EXPO }}
              aria-hidden="true"
            >
              <div className="mockup-mini-rail">
                <div className="mockup-mini-dot active">
                  <Layers size={13} />
                </div>
                <div className="mockup-mini-dot">
                  <Calculator size={13} />
                </div>
                <div className="mockup-mini-dot">
                  <ListChecks size={13} />
                </div>
                <div className="mockup-mini-dot">
                  <ShieldCheck size={13} />
                </div>
              </div>

              <div className="mockup-desk-content">
                <div className="mockup-desk-banner">
                  <strong>Panel Glassy V22</strong>
                  <span>React 18 en producción</span>
                </div>

                <div className="mockup-desk-row">
                  <span>Lucía Serrano</span>
                  <span className="mockup-grade-ok tabular">8.7</span>
                </div>
                <div className="mockup-desk-row">
                  <span>Sofía Navarro</span>
                  <span className="mockup-grade-ok tabular">9.5</span>
                </div>
                <div className="mockup-desk-row">
                  <span>Media del grupo</span>
                  <span className="mockup-grade-ok tabular">7.50</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Cinta brutalista de tickets del sprint */}
      <div className="brutal-marquee" role="region" aria-label="Resumen de los 10 tickets implementados">
        <div className="marquee-track">
          {[...TICKETS_MARQUEE, ...TICKETS_MARQUEE].map((ticket, index) => (
            <span key={`${ticket}-${index}`} className="marquee-item">
              <span>{ticket}</span>
              <span className="marquee-sep" aria-hidden="true">
                ✦
              </span>
            </span>
          ))}
        </div>
      </div>
    </>
  );
}
