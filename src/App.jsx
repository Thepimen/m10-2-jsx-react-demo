import { useEffect, useState } from 'react';
import { AnimatePresence, MotionConfig, motion } from 'framer-motion';
import {
  ArrowUp,
  BellRing,
  Calculator,
  Code2,
  FolderKanban,
  ListChecks,
  Moon,
  ShieldAlert,
  Sparkles,
  Sun
} from 'lucide-react';

// [CLAVE EXPOSICIÓN] Importación de componentes React.
// Todos los componentes propios empiezan por MAYÚSCULA.
import LandingBrutalista from './components/LandingBrutalista.jsx';
import SintaxisYFragmentos from './components/01_SintaxisYFragmentos.jsx';
import ExpresionesYEstilos from './components/02_ExpresionesYEstilos.jsx';
import RenderizadoCondicional from './components/03_RenderizadoCondicional.jsx';
import ListasYKeys from './components/04_ListasYKeys.jsx';
import EventosYSeguridadXSS from './components/05_EventosYSeguridadXSS.jsx';
import DemoIntegradora from './components/06_DemoIntegradora.jsx';
import { SPRING_PILL, tabTransition } from './lib/motion.js';

const THEME_STORAGE_KEY = 'm10-2-jsx-theme';

const SECCIONES = [
  {
    id: '01',
    titulo: '1. Sintaxis y Fragmentos',
    corto: 'Sintaxis',
    tickets: ['Ticket 02'],
    icono: Code2,
    componente: SintaxisYFragmentos
  },
  {
    id: '02',
    titulo: '2. Expresiones y Estilos',
    corto: 'Fiscal IVA',
    tickets: ['Ticket 03'],
    icono: Calculator,
    componente: ExpresionesYEstilos
  },
  {
    id: '03',
    titulo: '3. Condicionales (y el 0)',
    corto: 'Avisos',
    tickets: ['Ticket 04'],
    icono: BellRing,
    componente: RenderizadoCondicional
  },
  {
    id: '04',
    titulo: '4. Listas y Keys',
    corto: 'Catálogo',
    tickets: ['Ticket 05'],
    icono: ListChecks,
    componente: ListasYKeys
  },
  {
    id: '05',
    titulo: '5. Eventos y XSS',
    corto: 'Seguridad',
    tickets: ['Ticket 06'],
    icono: ShieldAlert,
    componente: EventosYSeguridadXSS
  },
  {
    id: '06',
    titulo: '6. Demo Integradora',
    corto: 'Expedientes',
    tickets: ['Tickets 07–10'],
    icono: FolderKanban,
    componente: DemoIntegradora
  }
];

export default function App() {
  const [activa, setActiva] = useState('01');
  const [tema, setTema] = useState(() => {
    try {
      const guardado = localStorage.getItem(THEME_STORAGE_KEY);
      return guardado === 'dark' || guardado === 'light' ? guardado : 'light';
    } catch {
      return 'light';
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(THEME_STORAGE_KEY, tema);
    } catch {
      // Ignora restricciones de almacenamiento privado
    }
    document.body.style.backgroundColor = tema === 'dark' ? '#060d0c' : '#f4f7f5';
  }, [tema]);

  const alternarTema = () => {
    setTema((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const irAlWorkspace = () => {
    const el = document.getElementById('workspace');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const volverArriba = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Localizamos dinámicamente el componente a renderizar según la pestaña activa
  const seccionActual = SECCIONES.find((sec) => sec.id === activa) ?? SECCIONES[0];
  const ComponenteActivo = seccionActual.componente;

  return (
    <MotionConfig reducedMotion="user">
      {/* Ticket 01: Clase CSS dinámica en el contenedor principal para modo claro / oscuro */}
      <div className={`app-shell ${tema === 'dark' ? 'theme-dark' : 'theme-light'}`}>
        <a href="#workspace" className="skip-link">
          Saltar al panel interactivo
        </a>

        {/* Ticket 01: <header> corporativo con botón alternador de tema Claro / Oscuro */}
        <header className="site-header">
          <div className="site-header-inner">
            <a href="#inicio" className="brand-lockup">
              <span className="brand-mark" aria-hidden="true">
                M10
              </span>
              <span className="brand-text">
                <span className="brand-name">M10.2 JSX Studio</span>
                <span className="brand-sub">React 18 · Vite · DAM2</span>
              </span>
            </a>

            <nav className="header-nav" aria-label="Navegación principal">
              <a href="#inicio" className="header-nav-link">
                Inicio
              </a>
              <a href="#workspace" className="header-nav-link">
                Panel Glassy V22
              </a>
              <button
                type="button"
                className="header-nav-link"
                style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}
                onClick={() => {
                  setActiva('06');
                  irAlWorkspace();
                }}
              >
                Expedientes &amp; KPIs
              </button>
              <a href="#pie-corporativo" className="header-nav-link">
                Créditos
              </a>
            </nav>

            <div className="header-actions">
              <button
                type="button"
                className="theme-toggle-btn"
                onClick={alternarTema}
                aria-pressed={tema === 'dark'}
                aria-label={
                  tema === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'
                }
              >
                {tema === 'dark' ? (
                  <>
                    <Sun size={16} aria-hidden="true" />
                    <span>Modo Claro</span>
                  </>
                ) : (
                  <>
                    <Moon size={16} aria-hidden="true" />
                    <span>Modo Oscuro</span>
                  </>
                )}
              </button>

              <button
                type="button"
                className="brutal-cta-sm"
                onClick={irAlWorkspace}
              >
                <span>Abrir Panel</span>
              </button>
            </div>
          </div>
        </header>

        {/* Landing Neo-Brutalista inspirada en referencia Stric */}
        <LandingBrutalista
          onExplorarWorkspace={irAlWorkspace}
          onSeleccionarModulo={setActiva}
        />

        {/* Workspace Glassy estilo Dashboard V22 */}
        <section
          id="workspace"
          className="workspace-zone"
          aria-labelledby="workspace-heading"
        >
          <div className="workspace-container">
            <div className="workspace-intro-bar">
              <div>
                <p className="workspace-kicker">WORKSPACE INTERACTIVO · DASHBOARD V22</p>
                <h2 id="workspace-heading" className="workspace-heading">
                  Evolución de Aplicación React (JSX)
                </h2>
              </div>
              <span className="pill">
                <Sparkles size={14} aria-hidden="true" />
                <span>Sprint completo · 10 Tickets verificados</span>
              </span>
            </div>

            <div className="v22-shell">
              {/* Barra lateral flotante oscura con indicador animado spring (estilo V22) */}
              <aside className="v22-rail" aria-label="Accesos rápidos de módulos">
                <div className="v22-rail-brand" aria-hidden="true">
                  JSX
                </div>

                <div className="v22-rail-nav" role="tablist" aria-label="Módulos de demostración JSX">
                  {SECCIONES.map((sec) => {
                    const Icono = sec.icono;
                    const esActiva = activa === sec.id;
                    return (
                      <button
                        key={sec.id}
                        type="button"
                        role="tab"
                        aria-selected={esActiva}
                        aria-label={sec.titulo}
                        title={sec.titulo}
                        className={`v22-rail-btn ${esActiva ? 'active' : ''}`}
                        onClick={() => setActiva(sec.id)}
                      >
                        {esActiva && (
                          <motion.span
                            layoutId="v22-rail-active-pill"
                            className="v22-rail-pill"
                            transition={SPRING_PILL}
                          />
                        )}
                        <span className="v22-rail-icon">
                          <Icono size={20} strokeWidth={2.1} aria-hidden="true" />
                        </span>
                      </button>
                    );
                  })}
                </div>

                <div className="v22-rail-footer">
                  <button
                    type="button"
                    className="v22-rail-util"
                    onClick={alternarTema}
                    aria-label={tema === 'dark' ? 'Activar tema claro' : 'Activar tema oscuro'}
                    title={tema === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
                  >
                    {tema === 'dark' ? (
                      <Sun size={18} aria-hidden="true" />
                    ) : (
                      <Moon size={18} aria-hidden="true" />
                    )}
                  </button>
                  <button
                    type="button"
                    className="v22-rail-util"
                    onClick={volverArriba}
                    aria-label="Volver a la portada"
                    title="Volver a la portada"
                  >
                    <ArrowUp size={18} aria-hidden="true" />
                  </button>
                </div>
              </aside>

              {/* Panel derecho glassy */}
              <div className="v22-main">
                {/* Banner superior esmeralda V22 */}
                <div className="v22-hero-banner">
                  <div>
                    <h3 className="v22-hero-title">
                      Arquitectura JSX{' '}
                      <span className="v22-hero-serif">siempre interactiva</span> en producción
                    </h3>
                    <p className="v22-hero-sub">
                      Módulo activo: <strong>{seccionActual.titulo}</strong> · Explora cada ticket
                      del backlog con feedback inmediato y cero warnings en consola.
                    </p>
                  </div>

                  <div className="v22-hero-meta">
                    {seccionActual.tickets.map((t) => (
                      <span key={t} className="v22-stat-pill v22-stat-pill--lime">
                        {t}
                      </span>
                    ))}
                    <span className="v22-stat-pill tabular">
                      Tema: {tema === 'dark' ? 'Oscuro' : 'Claro'}
                    </span>
                  </div>
                </div>

                {/* Navegación por pestañas generada dinámicamente con .map() y key única */}
                <nav className="tabs" aria-label="Temas de JSX">
                  {SECCIONES.map((sec) => (
                    <button
                      key={sec.id}
                      type="button"
                      className={`tab-btn ${activa === sec.id ? 'active' : ''}`}
                      aria-current={activa === sec.id ? 'page' : undefined}
                      onClick={() => setActiva(sec.id)}
                    >
                      <span className="tab-num">{sec.id}</span>
                      <span>{sec.titulo.replace(/^\d+\.\s*/, '')}</span>
                    </button>
                  ))}
                </nav>

                {/* Renderizado animado del componente seleccionado */}
                <main aria-live="polite">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={seccionActual.id}
                      initial={tabTransition.initial}
                      animate={tabTransition.animate}
                      exit={tabTransition.exit}
                    >
                      <ComponenteActivo />
                    </motion.div>
                  </AnimatePresence>
                </main>
              </div>
            </div>
          </div>
        </section>

        {/* Ticket 01: <footer> corporativo con nombre completo, módulo y año dinámico JS */}
        <footer id="pie-corporativo" className="site-footer">
          <div className="site-footer-inner">
            <div>
              <p className="footer-brand-title">M10.2 JSX Studio · Prototipo Empresarial React</p>
              <p className="footer-meta">
                Desarrollado por <strong>Luis Lázaro Pimentel</strong> · Módulo:{' '}
                <strong>Desarrollo de Interfaces (0488)</strong> — 2º CFGS DAM · Instituto Nebrija
              </p>
            </div>

            <div className="footer-right">
              <div className="footer-ra-row" aria-label="Resultados de aprendizaje verificados">
                <span className="footer-ra-badge">RA 1</span>
                <span className="footer-ra-badge">RA 2</span>
                <span className="footer-ra-badge">RA 3</span>
                <span className="footer-ra-badge">RA 4 WCAG AA</span>
                <span className="footer-ra-badge">RA 7 Vercel</span>
              </div>
              <p className="footer-copy tabular">
                © {new Date().getFullYear()} Luis Lázaro Pimentel · Desarrollo de Interfaces
              </p>
            </div>
          </div>
        </footer>
      </div>
    </MotionConfig>
  );
}
