import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Bell, BellOff, CheckCheck, Loader2, LogIn, LogOut, ShieldCheck } from 'lucide-react';
import { EASE_OUT_EXPO, cardReveal, staggerContainer } from '../lib/motion.js';

// ============================================================================
// [CLAVE EXPOSICIÓN 3] RENDERIZADO CONDICIONAL + TICKET 04 (FIX TRAMPA DEL 0)
// ----------------------------------------------------------------------------
// 1. EARLY RETURN para estados de carga.
// 2. OPERADOR TERNARIO (? :) para dos ramas alternativas de sesión.
// 3. TICKET 04:
//    - Bug corregido: se elimina `{notificaciones && ...}` para no pintar jamás
//      un `0` suelto en pantalla; se emplea `{notificaciones > 0 && ...}`.
//    - Botón "Marcar todas como leídas" deshabilitado si `notificaciones === 0`.
//    - Estado vacío informativo cuando `notificaciones === 0`.
// ============================================================================

export default function RenderizadoCondicional() {
  const [cargando, setCargando] = useState(false);
  const [sesionIniciada, setSesionIniciada] = useState(true);
  const [notificaciones, setNotificaciones] = useState(0);

  // 1. PATRÓN EARLY RETURN (fuera del JSX sí podemos usar `if` estándar)
  if (cargando) {
    return (
      <motion.section
        className="card"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, ease: EASE_OUT_EXPO }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.6rem' }}>
          <Loader2 size={22} className="spin-icon" aria-hidden="true" />
          <h2 style={{ margin: 0 }}>Cargando módulo mediante Early Return...</h2>
        </div>
        <p className="subtitle" style={{ marginBottom: '1rem' }}>
          El componente retornó antes de evaluar el JSX principal para mostrar un estado de carga
          limpio.
        </p>
        <button type="button" className="btn" onClick={() => setCargando(false)}>
          Finalizar simulación de carga
        </button>
      </motion.section>
    );
  }

  return (
    <motion.section
      className="card"
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
    >
      <div className="card-head">
        <div>
          <h2>3. Renderizado Condicional y Gestión de Avisos</h2>
          <p className="subtitle">
            Patrones Early Return, operador ternario y corrección de producción de{' '}
            <strong>&ldquo;La Trampa del 0&rdquo;</strong> con estado vacío informativo.
          </p>
        </div>
        <div className="ticket-badges">
          <span className="ticket-tag">Ticket 04</span>
          <span className="ticket-tag">Bugfix Producción</span>
        </div>
      </div>

      <div className="btn-row" style={{ marginTop: 0, marginBottom: '1.15rem' }}>
        <button type="button" className="btn btn-secondary" onClick={() => setCargando(true)}>
          Probar Early Return (Cargando)
        </button>

        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => setSesionIniciada((prev) => !prev)}
        >
          {sesionIniciada ? <LogOut size={16} aria-hidden="true" /> : <LogIn size={16} aria-hidden="true" />}
          <span>Alternar Sesión ({sesionIniciada ? 'Activa' : 'Cerrada'})</span>
        </button>

        <button
          type="button"
          className="btn"
          onClick={() => setNotificaciones((n) => n + 1)}
        >
          <Bell size={16} aria-hidden="true" />
          <span className="tabular">+1 Notificación ({notificaciones})</span>
        </button>

        {/* Ticket 04 criterio 2: Botón "Marcar todas como leídas" con disabled={notificaciones === 0} */}
        <button
          type="button"
          className="btn btn-accent"
          onClick={() => setNotificaciones(0)}
          disabled={notificaciones === 0}
        >
          <CheckCheck size={16} aria-hidden="true" />
          <span>Marcar todas como leídas</span>
        </button>
      </div>

      <div className="grid-2">
        {/* 2. OPERADOR TERNARIO */}
        <motion.div
          className="box box-info"
          variants={cardReveal}
          whileHover={{ y: -3 }}
          transition={{ duration: 0.2, ease: EASE_OUT_EXPO }}
        >
          <h3>Operador Ternario (? :)</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', marginBottom: '0.75rem' }}>
            Ideal cuando existen dos ramas visuales excluyentes según un estado booleano:
          </p>
          <p style={{ display: 'flex', alignItems: 'center', gap: '0.55rem', flexWrap: 'wrap' }}>
            <span>Estado de autenticación:</span>
            {sesionIniciada ? (
              <span className="badge badge-ok">Usuario autenticado</span>
            ) : (
              <span className="badge badge-fail">Acceso como invitado</span>
            )}
          </p>
        </motion.div>

        {/* 3. OPERADOR && CORREGIDO — SIN TRAMPA DEL 0 + ESTADO VACÍO */}
        <motion.div
          className="box box-success"
          variants={cardReveal}
          whileHover={{ y: -3 }}
          transition={{ duration: 0.2, ease: EASE_OUT_EXPO }}
        >
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
            <ShieldCheck size={18} aria-hidden="true" />
            <span>Bandeja de Notificaciones (Bug 0 corregido)</span>
          </h3>

          <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>
            Expresión corregida en producción usando condición booleana explícita{' '}
            <code className="code-inline">notificaciones &gt; 0 &amp;&amp; ...</code> para no
            renderizar nunca un <code className="code-inline">0</code> suelto.
          </p>

          <div aria-live="polite">
            <AnimatePresence mode="wait">
              {notificaciones > 0 && (
                <motion.div
                  key="con-avisos"
                  className="alert-success"
                  initial={{ opacity: 0, y: 6, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.2, ease: EASE_OUT_EXPO }}
                >
                  <Bell size={17} aria-hidden="true" style={{ flexShrink: 0 }} />
                  <span className="tabular">
                    Tienes {notificaciones}{' '}
                    {notificaciones === 1 ? 'aviso pendiente' : 'avisos pendientes'}.
                  </span>
                </motion.div>
              )}

              {notificaciones === 0 && (
                <motion.div
                  key="sin-avisos"
                  className="alert-info"
                  initial={{ opacity: 0, y: 6, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.2, ease: EASE_OUT_EXPO }}
                >
                  <BellOff size={17} aria-hidden="true" style={{ flexShrink: 0 }} />
                  <span>Estás al día. No tienes notificaciones pendientes</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>

      <p className="file-hint">
        <span>
          Archivo fuente:{' '}
          <code className="code-inline">src/components/03_RenderizadoCondicional.jsx</code>
        </span>
        <span className="tabular">Notificaciones activas: {notificaciones}</span>
      </p>
    </motion.section>
  );
}
