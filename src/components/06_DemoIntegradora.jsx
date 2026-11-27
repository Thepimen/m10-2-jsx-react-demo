import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  AlertCircle,
  ArrowUpDown,
  CheckCircle2,
  Database,
  Filter,
  FolderSearch,
  RotateCcw,
  Search,
  UserPlus
} from 'lucide-react';
import ResumenKPIs from './ResumenKPIs.jsx';
import { EASE_OUT_EXPO, staggerContainer } from '../lib/motion.js';

// ============================================================================
// [CLAVE EXPOSICIÓN 6] DEMO INTEGRADORA + TICKETS 07, 08, 09 y 10
// ----------------------------------------------------------------------------
// - Ticket 07: Buscador por nombre combinable con "Solo aprobados", <select>
//   de ordenación (Nota mayor->menor, Nota menor->mayor, Nombre A–Z) y estado
//   vacío claro ("No se encontraron expedientes con esos criterios").
// - Ticket 08: Estado gestionado con useState + formulario controlado de alta
//   (Nombre completo obligatorio, Nota 0–10, Módulos separados por comas).
// - Ticket 09: Integración del componente reutilizable <ResumenKPIs />.
// - Ticket 10: Persistencia automática en localStorage + botón "Restablecer
//   datos iniciales" que elimina la clave y recupera los 3 registros base.
// ============================================================================

const STORAGE_KEY = 'm10-2-expedientes-dam2';

const EXPEDIENTES_INICIALES = [
  { id: 101, nombre: 'Lucía Serrano', nota: 8.7, modulos: ['DI', 'PSP', 'AD'] },
  { id: 102, nombre: 'Marcos Vega', nota: 4.3, modulos: ['DI', 'SGE'] },
  { id: 103, nombre: 'Sofía Navarro', nota: 9.5, modulos: ['DI', 'PSP', 'AD', 'PMDM'] }
];

function cargarExpedientesGuardados() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return EXPEDIENTES_INICIALES;
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return EXPEDIENTES_INICIALES;
    const validos = parsed.filter(
      (item) =>
        item &&
        (typeof item.id === 'number' || typeof item.id === 'string') &&
        typeof item.nombre === 'string' &&
        typeof item.nota === 'number' &&
        Array.isArray(item.modulos)
    );
    return validos.length > 0 ? validos : EXPEDIENTES_INICIALES;
  } catch {
    return EXPEDIENTES_INICIALES;
  }
}

function TarjetaExpediente({ alumno, seleccionado, onSeleccionar }) {
  const aprobado = alumno.nota >= 5;

  return (
    <motion.article
      layout
      className="box"
      initial={{ opacity: 0, y: 10, scale: 0.985 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -6, scale: 0.985 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.22, ease: EASE_OUT_EXPO }}
      style={{
        borderColor: seleccionado ? 'var(--accent-primary)' : undefined,
        borderWidth: seleccionado ? '2px' : '1px'
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '0.5rem',
          flexWrap: 'wrap'
        }}
      >
        <h3 style={{ margin: 0 }}>{alumno.nombre}</h3>
        <span className={`badge tabular ${aprobado ? 'badge-ok' : 'badge-fail'}`}>
          {aprobado ? `Aprobado (${alumno.nota.toFixed(1)})` : `Pendiente (${alumno.nota.toFixed(1)})`}
        </span>
      </div>

      {alumno.modulos.length > 0 && (
        <div className="btn-row" style={{ marginTop: '0.65rem' }}>
          {alumno.modulos.map((mod) => (
            <span key={`${alumno.id}-${mod}`} className="code-inline">
              {mod}
            </span>
          ))}
        </div>
      )}

      <div
        className="btn-row"
        style={{ justifyContent: 'space-between', alignItems: 'center', marginTop: '0.9rem' }}
      >
        <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }} className="tabular">
          ID #{alumno.id}
        </span>
        <button
          type="button"
          className={`btn ${seleccionado ? 'btn-accent' : ''}`}
          onClick={() => onSeleccionar(alumno)}
        >
          {seleccionado ? 'Expediente seleccionado' : 'Seleccionar expediente'}
        </button>
      </div>
    </motion.article>
  );
}

export default function DemoIntegradora() {
  // Ticket 08 + Ticket 10: Estado con carga inicial desde localStorage
  const [expedientes, setExpedientes] = useState(cargarExpedientesGuardados);
  const [soloAprobados, setSoloAprobados] = useState(false);
  const [busqueda, setBusqueda] = useState('');
  const [orden, setOrden] = useState('nota-desc');
  const [seleccionado, setSeleccionado] = useState(null);

  // Ticket 08: Estado del formulario controlado de alta
  const [nuevoNombre, setNuevoNombre] = useState('');
  const [nuevaNota, setNuevaNota] = useState('');
  const [nuevosModulos, setNuevosModulos] = useState('');
  const [errorForm, setErrorForm] = useState('');
  const [mensajeEstado, setMensajeEstado] = useState('');

  // Permite eliminar la clave de localStorage al pulsar "Restablecer datos iniciales"
  const omitirGuardadoRef = useRef(false);

  useEffect(() => {
    if (omitirGuardadoRef.current) {
      omitirGuardadoRef.current = false;
      return;
    }
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(expedientes));
    } catch {
      // Ignora restricciones de almacenamiento privado
    }
  }, [expedientes]);

  // Ticket 07: Filtrado combinado (nombre + solo aprobados) y ordenación dinámica
  const listaFiltrada = useMemo(() => {
    const texto = busqueda.trim().toLowerCase();

    const filtrados = expedientes.filter((alumno) => {
      const pasaAprobados = !soloAprobados || alumno.nota >= 5;
      const pasaNombre = texto === '' || alumno.nombre.toLowerCase().includes(texto);
      return pasaAprobados && pasaNombre;
    });

    return [...filtrados].sort((a, b) => {
      if (orden === 'nota-desc') return b.nota - a.nota;
      if (orden === 'nota-asc') return a.nota - b.nota;
      return a.nombre.localeCompare(b.nombre, 'es', { sensitivity: 'base' });
    });
  }, [expedientes, soloAprobados, busqueda, orden]);

  // Ticket 08: Alta dinámica de nuevo expediente con ID único
  const manejarAltaExpediente = (e) => {
    e.preventDefault();
    const nombreLimpio = nuevoNombre.trim();
    const notaNumerica = Number(nuevaNota);

    if (!nombreLimpio) {
      setErrorForm('El nombre completo del alumno es obligatorio.');
      return;
    }

    if (nuevaNota === '' || Number.isNaN(notaNumerica) || notaNumerica < 0 || notaNumerica > 10) {
      setErrorForm('Introduce una nota válida comprendida entre 0 y 10.');
      return;
    }

    const listaModulos = [
      ...new Set(
        nuevosModulos
          .split(',')
          .map((mod) => mod.trim().toUpperCase())
          .filter(Boolean)
      )
    ];

    const siguienteId =
      expedientes.reduce((max, item) => Math.max(max, Number(item.id) || 100), 100) + 1;

    const nuevoExpediente = {
      id: siguienteId,
      nombre: nombreLimpio,
      nota: Math.round(notaNumerica * 10) / 10,
      modulos: listaModulos.length > 0 ? listaModulos : ['DI']
    };

    setExpedientes((prev) => [nuevoExpediente, ...prev]);
    setNuevoNombre('');
    setNuevaNota('');
    setNuevosModulos('');
    setErrorForm('');
    setMensajeEstado(`Expediente de ${nuevoExpediente.nombre} (#${nuevoExpediente.id}) añadido y guardado en localStorage.`);
  };

  // Ticket 10: Restablecer datos iniciales borrando la clave de localStorage
  const restablecerDatosIniciales = () => {
    omitirGuardadoRef.current = true;
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignora restricciones de almacenamiento privado
    }
    setExpedientes(EXPEDIENTES_INICIALES);
    setSeleccionado(null);
    setBusqueda('');
    setSoloAprobados(false);
    setOrden('nota-desc');
    setErrorForm('');
    setMensajeEstado('Datos iniciales restablecidos y clave de localStorage eliminada.');
  };

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
            <h2>6. Panel Integral de Expedientes DAM2 y Cuadro de Mando</h2>
            <p className="subtitle">
              Composición de componentes reutilizables, filtros combinados, alta controlada, KPIs
              reactivos y persistencia en <code className="code-inline">localStorage</code>.
            </p>
          </div>
          <div className="ticket-badges">
            <span className="ticket-tag">Tickets 07–10</span>
            <span className="ticket-tag">localStorage</span>
          </div>
        </div>

        {/* Ticket 09: Cuadro de Mando KPI reutilizable sincronizado con la lista filtrada */}
        <ResumenKPIs alumnos={listaFiltrada} />

        {/* Ticket 08: Formulario controlado de alta de nuevos expedientes */}
        <div className="box box-info" style={{ marginBottom: '1.15rem' }}>
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
            <UserPlus size={18} aria-hidden="true" />
            <span>Alta Dinámica de Nuevo Expediente</span>
          </h3>

          <form onSubmit={manejarAltaExpediente} className="form-grid-3" noValidate>
            <div>
              <label htmlFor="alta-nombre" className="field-label">
                Nombre completo *
              </label>
              <input
                id="alta-nombre"
                type="text"
                className="input"
                placeholder="Ej.: Elena Morales"
                value={nuevoNombre}
                onChange={(e) => {
                  setNuevoNombre(e.target.value);
                  if (errorForm) setErrorForm('');
                }}
                required
              />
            </div>

            <div>
              <label htmlFor="alta-nota" className="field-label">
                Nota (0 – 10) *
              </label>
              <input
                id="alta-nota"
                type="number"
                min="0"
                max="10"
                step="0.1"
                className="input tabular"
                placeholder="8.5"
                value={nuevaNota}
                onChange={(e) => {
                  setNuevaNota(e.target.value);
                  if (errorForm) setErrorForm('');
                }}
                required
              />
            </div>

            <div>
              <label htmlFor="alta-modulos" className="field-label">
                Módulos (separados por comas)
              </label>
              <input
                id="alta-modulos"
                type="text"
                className="input"
                placeholder="DI, PSP, AD"
                value={nuevosModulos}
                onChange={(e) => setNuevosModulos(e.target.value)}
              />
            </div>

            <button type="submit" className="btn">
              <UserPlus size={16} aria-hidden="true" />
              <span>Añadir expediente</span>
            </button>
          </form>

          <AnimatePresence>
            {errorForm && (
              <motion.p
                role="alert"
                className="alert-error"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.18, ease: EASE_OUT_EXPO }}
              >
                <AlertCircle size={16} aria-hidden="true" style={{ flexShrink: 0 }} />
                <span>{errorForm}</span>
              </motion.p>
            )}

            {mensajeEstado && !errorForm && (
              <motion.p
                role="status"
                className="alert-success"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.18, ease: EASE_OUT_EXPO }}
              >
                <CheckCircle2 size={16} aria-hidden="true" style={{ flexShrink: 0 }} />
                <span>{mensajeEstado}</span>
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* Ticket 07 + Ticket 10: Buscador, selector de ordenación, filtro aprobados y reset */}
        <div className="toolbar-row">
          <div>
            <label
              htmlFor="buscar-expediente"
              className="field-label"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}
            >
              <Search size={14} aria-hidden="true" />
              <span>Buscar alumno por nombre</span>
            </label>
            <input
              id="buscar-expediente"
              type="search"
              className="input"
              placeholder="Ej.: Lucía, Marcos, Sofía..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
          </div>

          <div>
            <label
              htmlFor="orden-expedientes"
              className="field-label"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}
            >
              <ArrowUpDown size={14} aria-hidden="true" />
              <span>Ordenar expedientes</span>
            </label>
            <select
              id="orden-expedientes"
              className="select"
              value={orden}
              onChange={(e) => setOrden(e.target.value)}
            >
              <option value="nota-desc">Nota (mayor a menor)</option>
              <option value="nota-asc">Nota (menor a mayor)</option>
              <option value="nombre-asc">Nombre (A–Z)</option>
            </select>
          </div>

          <div className="btn-row" style={{ marginTop: 0 }}>
            <button
              type="button"
              className={`btn ${soloAprobados ? '' : 'btn-secondary'}`}
              aria-pressed={soloAprobados}
              onClick={() => setSoloAprobados((prev) => !prev)}
            >
              <Filter size={15} aria-hidden="true" />
              <span>{soloAprobados ? 'Solo aprobados: SÍ' : 'Solo aprobados (>= 5)'}</span>
            </button>

            <button
              type="button"
              className="btn btn-danger"
              onClick={restablecerDatosIniciales}
            >
              <RotateCcw size={15} aria-hidden="true" />
              <span>Restablecer datos iniciales</span>
            </button>
          </div>
        </div>

        {/* Selección activa */}
        {seleccionado && (
          <div style={{ marginBottom: '1rem' }}>
            <span className="pill tabular">
              Seleccionado: {seleccionado.nombre} (ID #{seleccionado.id} · Nota:{' '}
              {seleccionado.nota.toFixed(1)})
            </span>
          </div>
        )}

        {/* Grid de expedientes o estado vacío claro (Ticket 07 criterio 3) */}
        {listaFiltrada.length > 0 ? (
          <div className="grid-2">
            <AnimatePresence initial={false}>
              {listaFiltrada.map((alumno) => (
                <TarjetaExpediente
                  key={alumno.id}
                  alumno={alumno}
                  seleccionado={seleccionado?.id === alumno.id}
                  onSeleccionar={setSeleccionado}
                />
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <div className="empty-state" role="status">
            <FolderSearch size={28} aria-hidden="true" />
            <p>No se encontraron expedientes con esos criterios</p>
          </div>
        )}

        <p className="file-hint">
          <span>
            Archivos fuente:{' '}
            <code className="code-inline">src/components/06_DemoIntegradora.jsx</code> y{' '}
            <code className="code-inline">src/components/ResumenKPIs.jsx</code>
          </span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }} className="tabular">
            <Database size={14} aria-hidden="true" />
            Total almacenados: {expedientes.length}
          </span>
        </p>
      </motion.section>
    </>
  );
}
