import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, MotionConfig, motion } from 'framer-motion';
import {
  BellRing,
  Calculator,
  Code2,
  FolderKanban,
  Home,
  LayoutDashboard,
  ListChecks,
  Moon,
  ShieldAlert,
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
import { EASE_OUT_EXPO, SPRING_PILL, tabTransition } from './lib/motion.js';

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
    corto: 'Condicionales',
    tickets: ['Ticket 04'],
    icono: BellRing,
    componente: RenderizadoCondicional
  },
  {
    id: '04',
    titulo: '4. Listas y Keys',
    corto: 'Listas & Keys',
    tickets: ['Ticket 05'],
    icono: ListChecks,
    componente: ListasYKeys
  },
  {
    id: '05',
    titulo: '5. Eventos y XSS',
    corto: 'Eventos & XSS',
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

function leerPaginaDesdeURL() {
  const path = window.location.pathname.replace(/\/+$/, '');
  return path === '/panel' ? 'panel' : 'landing';
}

function leerTabDesdeURL() {
  const params = new URLSearchParams(window.location.search);
  const tab = params.get('tab');
  return SECCIONES.some((s) => s.id === tab) ? tab : '01';
}

export default function App() {
  const [pagina, setPagina] = useState(leerPaginaDesdeURL);
  const [activa, setActiva] = useState(leerTabDesdeURL);
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

  // Sincronización con los botones Atrás / Adelante del navegador
  useEffect(() => {
    const manejarPopState = () => {
      setPagina(leerPaginaDesdeURL());
      setActiva(leerTabDesdeURL());
    };
    window.addEventListener('popstate', manejarPopState);
    return () => window.removeEventListener('popstate', manejarPopState);
  }, []);

  const navegarA = useCallback((destino, tabId) => {
    const siguienteTab = tabId && SECCIONES.some((s) => s.id === tabId) ? tabId : null;
    if (siguienteTab) {
      setActiva(siguienteTab);
    }

    const url =
      destino === 'panel'
        ? siguienteTab
          ? `/panel?tab=${siguienteTab}`
          : '/panel'
        : '/';

    if (`${window.location.pathname}${window.location.search}` !== url) {
      window.history.pushState({}, '', url);
    }

    setPagina(destino);
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const seleccionarTab = useCallback((tabId) => {
    setActiva(tabId);
    const url = `/panel?tab=${tabId}`;
    if (`${window.location.pathname}${window.location.search}` !== url) {
      window.history.replaceState({}, '', url);
    }
  }, []);

  const alternarTema = () => {
    setTema((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Localizamos dinámicamente el componente a renderizar según la pestaña activa
  const seccionActual = SECCIONES.find((sec) => sec.id === activa) ?? SECCIONES[0];
  const ComponenteActivo = seccionActual.componente;
  const esPanel = pagina === 'panel';

  return (
    <MotionConfig reducedMotion="user">
      {/* Ticket 01: Clase CSS dinámica en el contenedor principal para modo claro / oscuro */}
      <div
        className={`app-shell ${tema === 'dark' ? 'theme-dark' : 'theme-light'} ${
          esPanel ? 'is-panel-page' : 'is-landing-page'
        }`}
      >
        <a href="#contenido-principal" className="skip-link">
          Saltar al contenido principal
        </a>

        {/* Ticket 01: <header> corporativo con botón alternador de tema Claro / Oscuro */}
        <header className="site-header">
          <div className={`site-header-inner ${esPanel ? 'site-header-inner--full' : ''}`}>
            <button
              type="button"
              className="brand-lockup brand-lockup-btn"
              onClick={() => navegarA('landing')}
              aria-label="Ir a la portada M10.2 JSX Studio"
            >
              <span className="brand-mark" aria-hidden="true">
                M10
              </span>
              <span className="brand-text">
                <span className="brand-name">M10.2 JSX Studio</span>
                <span className="brand-sub">React 18 · Vite · DAM2</span>
              </span>
            </button>

            <nav className="header-nav" aria-label="Navegación principal">
              <button
                type="button"
                className={`header-nav-link ${!esPanel ? 'is-current' : ''}`}
                aria-current={!esPanel ? 'page' : undefined}
                onClick={() => navegarA('landing')}
              >
                <Home size={15} aria-hidden="true" />
                <span>Inicio</span>
              </button>
              <button
                type="button"
                className={`header-nav-link ${esPanel && activa !== '06' ? 'is-current' : ''}`}
                aria-current={esPanel ? 'page' : undefined}
                onClick={() => navegarA('panel', activa)}
              >
                <LayoutDashboard size={15} aria-hidden="true" />
                <span>Panel Glassy V22</span>
              </button>
              <button
                type="button"
                className={`header-nav-link ${esPanel && activa === '06' ? 'is-current' : ''}`}
                onClick={() => navegarA('panel', '06')}
              >
                <FolderKanban size={15} aria-hidden="true" />
                <span>Expedientes &amp; KPIs</span>
              </button>
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

              {esPanel ? (
                <button
                  type="button"
                  className="brutal-cta-sm brutal-cta-sm--outline"
                  onClick={() => navegarA('landing')}
                >
                  <Home size={15} aria-hidden="true" />
                  <span>Portada</span>
                </button>
              ) : (
                <button
                  type="button"
                  className="brutal-cta-sm"
                  onClick={() => navegarA('panel', activa)}
                >
                  <LayoutDashboard size={15} aria-hidden="true" />
                  <span>Abrir Panel</span>
                </button>
              )}
            </div>
          </div>
        </header>

        {/* Páginas independientes: Portada Brutalista (/) vs Panel Glassy a pantalla completa (/panel) */}
        <div id="contenido-principal" className="page-stage">
          <AnimatePresence mode="wait">
            {!esPanel ? (
              <motion.div
                key="page-landing"
                className="landing-page-wrap"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.24, ease: EASE_OUT_EXPO }}
              >
                <LandingBrutalista
                  onExplorarWorkspace={() => navegarA('panel', activa)}
                  onSeleccionarModulo={(id) => navegarA('panel', id)}
                />
              </motion.div>
            ) : (
              <motion.section
                key="page-panel"
                id="workspace"
                className="workspace-zone workspace-zone--fullscreen"
                aria-label="Panel Interactivo Dashboard V22"
                initial={{ opacity: 0, scale: 0.992 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.992 }}
                transition={{ duration: 0.26, ease: EASE_OUT_EXPO }}
              >
                <div className="v22-shell v22-shell--fullscreen">
                  {/* Barra lateral flotante oscura fija (estilo Dashboard V22) */}
                  <aside className="v22-rail" aria-label="Accesos rápidos de módulos">
                    <button
                      type="button"
                      className="v22-rail-brand"
                      onClick={() => navegarA('landing')}
                      title="Volver a la portada"
                      aria-label="Volver a la portada"
                    >
                      JSX
                    </button>

                    <div
                      className="v22-rail-nav"
                      role="tablist"
                      aria-label="Módulos de demostración JSX"
                    >
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
                            onClick={() => seleccionarTab(sec.id)}
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
                        onClick={() => navegarA('landing')}
                        aria-label="Volver a la portada"
                        title="Volver a la portada"
                      >
                        <Home size={18} aria-hidden="true" />
                      </button>
                    </div>
                  </aside>

                  {/* Contenido principal a ancho completo estable */}
                  <div className="v22-main">
                    {/* Banner superior esmeralda V22 compacto */}
                    <div className="v22-hero-banner">
                      <div className="v22-hero-copy">
                        <h1 className="v22-hero-title">
                          Arquitectura JSX{' '}
                          <span className="v22-hero-serif">siempre interactiva</span> en producción
                        </h1>
                        <p className="v22-hero-sub">
                          Módulo activo: <strong>{seccionActual.titulo}</strong> · Workspace a
                          pantalla completa con los 10 tickets verificados.
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

                    {/* Barra de pestañas en 1 sola fila fija (6 columnas en escritorio) */}
                    <nav className="tabs tabs--uniform" aria-label="Temas de JSX">
                      {SECCIONES.map((sec) => (
                        <button
                          key={sec.id}
                          type="button"
                          className={`tab-btn ${activa === sec.id ? 'active' : ''}`}
                          aria-current={activa === sec.id ? 'page' : undefined}
                          title={sec.titulo}
                          onClick={() => seleccionarTab(sec.id)}
                        >
                          <span className="tab-num">{sec.id}</span>
                          <span className="tab-label">{sec.corto}</span>
                        </button>
                      ))}
                    </nav>

                    {/* Área principal del módulo activo */}
                    <main className="v22-module-stage" aria-live="polite">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={seccionActual.id}
                          className="v22-module-frame"
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
              </motion.section>
            )}
          </AnimatePresence>
        </div>

        {/* Ticket 01: <footer> corporativo con nombre completo, módulo y año dinámico JS */}
        <footer
          id="pie-corporativo"
          className={`site-footer ${esPanel ? 'site-footer--compact' : ''}`}
        >
          <div className={`site-footer-inner ${esPanel ? 'site-footer-inner--full' : ''}`}>
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
