import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { AlertCircle, ArrowUpDown, BookOpen, Plus, Search, Trash2 } from 'lucide-react';
import { EASE_OUT_EXPO, staggerContainer } from '../lib/motion.js';

// ============================================================================
// [CLAVE EXPOSICIÓN 4] RENDERIZADO DE LISTAS CON .map() Y KEYS + TICKET 05
// ----------------------------------------------------------------------------
// - Control de duplicados insensible a mayúsculas/minúsculas con aviso claro.
// - Buscador en tiempo real filtrando por nombre o código.
// - Contador dinámico encima de la lista: "Mostrando X de Y módulos".
// ============================================================================

const MODULOS_INICIALES = [
  { id: 'di-01', codigo: 'DI', nombre: 'Desarrollo de Interfaces', horas: 120 },
  { id: 'psp-02', codigo: 'PSP', nombre: 'Programación de Servicios y Procesos', horas: 90 },
  { id: 'ad-03', codigo: 'AD', nombre: 'Acceso a Datos', horas: 120 }
];

export default function ListasYKeys() {
  const [modulos, setModulos] = useState(MODULOS_INICIALES);
  const [nuevoNombre, setNuevoNombre] = useState('');
  const [busqueda, setBusqueda] = useState('');
  const [errorDuplicado, setErrorDuplicado] = useState('');

  const agregarModulo = (e) => {
    e.preventDefault();
    const nombreLimpio = nuevoNombre.trim();

    if (!nombreLimpio) {
      setErrorDuplicado('Introduce un nombre de módulo antes de añadirlo.');
      return;
    }

    // Ticket 05 criterio 1: Control de duplicados sin distinguir mayúsculas/minúsculas
    const yaExiste = modulos.some(
      (m) => m.nombre.trim().toLowerCase() === nombreLimpio.toLowerCase()
    );

    if (yaExiste) {
      setErrorDuplicado(
        `El módulo "${nombreLimpio}" ya existe en el catálogo (no se permiten duplicados).`
      );
      return;
    }

    const palabras = nombreLimpio.split(/\s+/).filter(Boolean);
    const codigoAuto =
      palabras.length > 1
        ? palabras
            .map((p) => p[0])
            .join('')
            .slice(0, 4)
            .toUpperCase()
        : nombreLimpio.slice(0, 3).toUpperCase();

    const nuevo = {
      id: `mod-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      codigo: codigoAuto || 'OPT',
      nombre: nombreLimpio,
      horas: 60
    };

    setModulos((prev) => [nuevo, ...prev]);
    setNuevoNombre('');
    setErrorDuplicado('');
  };

  const eliminarModulo = (idAEliminar) => {
    setModulos((prev) => prev.filter((m) => m.id !== idAEliminar));
  };

  const invertirOrden = () => {
    setModulos((prev) => [...prev].reverse());
  };

  // Ticket 05 criterio 2: Búsqueda en tiempo real por nombre o código
  const consulta = busqueda.trim().toLowerCase();
  const modulosFiltrados = modulos.filter(
    (m) =>
      consulta === '' ||
      m.nombre.toLowerCase().includes(consulta) ||
      m.codigo.toLowerCase().includes(consulta)
  );

  return (
    <motion.section
      className="card"
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
    >
      <div className="card-head">
        <div>
          <h2>4. Catálogo de Módulos: Listas, Keys y Buscador</h2>
          <p className="subtitle">
            Cada fila utiliza <code className="code-inline">key=&#123;modulo.id&#125;</code> único
            y estable, evitando duplicados y filtrando en tiempo real por nombre o código.
          </p>
        </div>
        <div className="ticket-badges">
          <span className="ticket-tag">Ticket 05</span>
          <span className="ticket-tag">Sin Duplicados</span>
        </div>
      </div>

      {/* Formulario de alta con control de duplicados */}
      <form
        onSubmit={agregarModulo}
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1fr) auto auto',
          gap: '0.6rem',
          alignItems: 'end'
        }}
        className="toolbar-row"
      >
        <div>
          <label htmlFor="nuevo-modulo-input" className="field-label">
            Nuevo módulo formativo
          </label>
          <input
            id="nuevo-modulo-input"
            type="text"
            className={`input ${errorDuplicado ? 'input-error' : ''}`}
            placeholder="Ej.: Sistemas de Gestión Empresarial"
            value={nuevoNombre}
            onChange={(e) => {
              setNuevoNombre(e.target.value);
              if (errorDuplicado) setErrorDuplicado('');
            }}
            aria-invalid={Boolean(errorDuplicado)}
          />
        </div>

        <button type="submit" className="btn">
          <Plus size={16} aria-hidden="true" />
          <span>Añadir módulo</span>
        </button>

        <button type="button" className="btn btn-secondary" onClick={invertirOrden}>
          <ArrowUpDown size={16} aria-hidden="true" />
          <span>Invertir orden</span>
        </button>
      </form>

      <AnimatePresence>
        {errorDuplicado && (
          <motion.p
            role="alert"
            className="alert-error"
            style={{ marginBottom: '0.9rem' }}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.18, ease: EASE_OUT_EXPO }}
          >
            <AlertCircle size={17} aria-hidden="true" style={{ flexShrink: 0 }} />
            <span>{errorDuplicado}</span>
          </motion.p>
        )}
      </AnimatePresence>

      {/* Buscador en tiempo real + contador dinámico encima de la lista */}
      <div
        className="box"
        style={{
          marginTop: '0.5rem',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '0.85rem'
        }}
      >
        <div style={{ flex: '1 1 260px' }}>
          <label
            htmlFor="buscador-modulos"
            className="field-label"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}
          >
            <Search size={14} aria-hidden="true" />
            <span>Buscar módulo por nombre o código</span>
          </label>
          <input
            id="buscador-modulos"
            type="search"
            className="input"
            placeholder="Filtrar por DI, PSP, Acceso..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
        </div>

        {/* Ticket 05 criterio 3: Contador dinámico encima de la lista */}
        <div
          className="pill tabular"
          aria-live="polite"
          style={{ alignSelf: 'flex-end', minHeight: '44px', padding: '0 0.95rem' }}
        >
          <BookOpen size={15} aria-hidden="true" />
          <span>
            Mostrando {modulosFiltrados.length} de {modulos.length} módulos
          </span>
        </div>
      </div>

      {/* Lista de módulos filtrados */}
      {modulosFiltrados.length > 0 ? (
        <ul className="list">
          <AnimatePresence initial={false}>
            {modulosFiltrados.map((modulo) => (
              <motion.li
                key={modulo.id}
                layout
                className="list-item"
                initial={{ opacity: 0, y: 8, scale: 0.985 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -6, scale: 0.985 }}
                transition={{ duration: 0.22, ease: EASE_OUT_EXPO }}
              >
                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.55rem' }}>
                  <span className="pill">{modulo.codigo}</span>
                  <strong>{modulo.nombre}</strong>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.84rem' }} className="tabular">
                    ({modulo.horas} h · key: <code className="code-inline">{modulo.id}</code>)
                  </span>
                </div>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => eliminarModulo(modulo.id)}
                  aria-label={`Eliminar módulo ${modulo.nombre}`}
                >
                  <Trash2 size={15} aria-hidden="true" />
                  <span>Eliminar</span>
                </button>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      ) : (
        <div className="empty-state" style={{ marginTop: '0.9rem' }}>
          <BookOpen size={24} aria-hidden="true" />
          <p>
            {modulos.length === 0
              ? 'No quedan módulos en el catálogo. Añade uno nuevo arriba.'
              : `No hay módulos que coincidan con "${busqueda}".`}
          </p>
        </div>
      )}

      <p className="file-hint">
        <span>
          Archivo fuente: <code className="code-inline">src/components/04_ListasYKeys.jsx</code>
        </span>
        <span className="tabular">Total en catálogo: {modulos.length}</span>
      </p>
    </motion.section>
  );
}
