import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { AlertCircle, CheckCircle2, Code2, Sparkles, UserCheck } from 'lucide-react';
import { EASE_OUT_EXPO, cardReveal, staggerContainer } from '../lib/motion.js';

// ============================================================================
// [CLAVE EXPOSICIÓN 1] REGLAS SINTÁCTICAS FUNDAMENTALES DE JSX + TICKET 02
// ----------------------------------------------------------------------------
// 1. UN SOLO ELEMENTO RAÍZ mediante Fragmentos (<>...</>).
// 2. CIERRE OBLIGATORIO: <input />, <br /> cerrados con `/`.
// 3. ATRIBUTOS ADAPTADOS A JS: className, htmlFor.
// 4. MAYÚSCULAS VS MINÚSCULAS: <EtiquetaInfo /> (Componente) vs <span> (HTML).
// 5. TICKET 02: Input controlado vinculado a useState con validación reactiva
//    inmediata (< 3 caracteres -> error en rojo role="alert"; >= 3 -> saludo).
// ============================================================================

function EtiquetaInfo({ texto }) {
  return (
    <span className="pill">
      <Sparkles size={13} aria-hidden="true" />
      <span>{texto}</span>
    </span>
  );
}

export default function SintaxisYFragmentos() {
  const [nombreAlumno, setNombreAlumno] = useState('');

  const nombreLimpio = nombreAlumno.trim();
  const tieneError = nombreAlumno.length > 0 && nombreLimpio.length < 3;
  const esValido = nombreLimpio.length >= 3;

  return (
    <>
      <motion.section
        className="card"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        <div className="card-head">
          <div>
            <h2>1. Reglas Sintácticas, Fragmentos y Validación Reactiva</h2>
            <p className="subtitle">
              JSX se compila a llamadas <code className="code-inline">_jsx()</code>. Aquí
              combinamos Fragmentos, atributos <code className="code-inline">htmlFor</code> y un
              campo controlado con validación instantánea.
            </p>
          </div>
          <div className="ticket-badges">
            <span className="ticket-tag">Ticket 02</span>
            <span className="ticket-tag">RA 2 · RA 4</span>
          </div>
        </div>

        <div className="grid-2">
          {/* Ticket 02: Input controlado con validación reactiva */}
          <motion.div
            className={`box ${tieneError ? 'box-danger' : 'box-success'}`}
            variants={cardReveal}
            whileHover={{ y: -3 }}
            transition={{ duration: 0.2, ease: EASE_OUT_EXPO }}
          >
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
              <UserCheck size={18} aria-hidden="true" />
              <span>Validación Reactiva del Alumno</span>
            </h3>

            <label htmlFor="campo-alumno" className="field-label">
              Nombre del alumno (<code className="code-inline">htmlFor</code> vinculado a{' '}
              <code className="code-inline">useState</code>):
            </label>

            <input
              id="campo-alumno"
              type="text"
              className={`input ${tieneError ? 'input-error' : ''}`}
              placeholder="Ej.: Elena"
              value={nombreAlumno}
              onChange={(e) => setNombreAlumno(e.target.value)}
              aria-invalid={tieneError}
              aria-describedby="campo-alumno-estado"
              autoComplete="name"
            />

            <div id="campo-alumno-estado" aria-live="polite">
              <AnimatePresence mode="wait">
                {tieneError && (
                  <motion.p
                    key="error-corto"
                    role="alert"
                    className="alert-error"
                    style={{ color: 'var(--accent-danger)' }}
                    initial={{ opacity: 0, y: 6, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.2, ease: EASE_OUT_EXPO }}
                  >
                    <AlertCircle size={17} aria-hidden="true" style={{ flexShrink: 0 }} />
                    <span>
                      El nombre es demasiado corto: escribe al menos 3 caracteres (actual:{' '}
                      <strong className="tabular">{nombreLimpio.length}</strong>).
                    </span>
                  </motion.p>
                )}

                {esValido && (
                  <motion.p
                    key="saludo-valido"
                    className="alert-success"
                    initial={{ opacity: 0, y: 6, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.22, ease: EASE_OUT_EXPO }}
                  >
                    <CheckCircle2 size={17} aria-hidden="true" style={{ flexShrink: 0 }} />
                    <span>Bienvenido/a al portal, {nombreLimpio}</span>
                  </motion.p>
                )}

                {!tieneError && !esValido && (
                  <motion.p
                    key="hint-inicial"
                    style={{
                      marginTop: '0.65rem',
                      fontSize: '0.85rem',
                      color: 'var(--text-muted)'
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    Empieza a escribir tu nombre para activar la validación en tiempo real.
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Reglas de componentes en Mayúscula y etiquetas autocerradas */}
          <motion.div
            className="box box-warn"
            variants={cardReveal}
            whileHover={{ y: -3 }}
            transition={{ duration: 0.2, ease: EASE_OUT_EXPO }}
          >
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
              <Code2 size={18} aria-hidden="true" />
              <span>Componentes en Mayúscula vs. HTML</span>
            </h3>
            <p
              style={{
                marginBottom: '0.85rem',
                color: 'var(--text-secondary)',
                fontSize: '0.91rem'
              }}
            >
              A continuación renderizamos un componente personalizado{' '}
              <code className="code-inline">&lt;EtiquetaInfo /&gt;</code> junto con etiquetas
              autocerradas obligatorias:
            </p>

            <EtiquetaInfo texto="Componente con inicial Mayúscula" />
            <br />
            <br />

            <small style={{ color: 'var(--text-muted)', display: 'block', lineHeight: 1.5 }}>
              Regla JSX verificada: los saltos de línea anteriores usan{' '}
              <code className="code-inline">&lt;br /&gt;</code> cerrado y el nodo raíz del
              componente emplea un Fragmento <code className="code-inline">&lt;&gt;...&lt;/&gt;</code>{' '}
              sin crear <code className="code-inline">&lt;div&gt;</code> superfluos.
            </small>
          </motion.div>
        </div>

        <p className="file-hint">
          <span>
            Archivo fuente:{' '}
            <code className="code-inline">src/components/01_SintaxisYFragmentos.jsx</code>
          </span>
          <span className="tabular">Caracteres: {nombreLimpio.length}</span>
        </p>
      </motion.section>
    </>
  );
}
