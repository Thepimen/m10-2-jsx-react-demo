import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, Palette, Percent, Receipt } from 'lucide-react';
import { EASE_OUT_EXPO, cardReveal, staggerContainer } from '../lib/motion.js';

// ============================================================================
// [CLAVE EXPOSICIÓN 2] EXPRESIONES JAVASCRIPT { }, ESTILOS EN LÍNEA Y TICKET 03
// ----------------------------------------------------------------------------
// - Calculadora fiscal reactiva con selector de IVA (21%, 10%, 4%), descuento
//   numérico 0–50%, desglose completo con 2 decimales y resaltado verde mediante
//   style={{ ... }} cuando el descuento es mayor que 0.
// ============================================================================

const TIPOS_IVA = [
  { valor: 0.21, etiqueta: 'General (21%)' },
  { valor: 0.1, etiqueta: 'Reducido (10%)' },
  { valor: 0.04, etiqueta: 'Superreducido (4%)' }
];

const formatearEuros = (cantidad) => `${cantidad.toFixed(2)} €`;

export default function ExpresionesYEstilos() {
  const [precioBase, setPrecioBase] = useState(100);
  const [tipoIva, setTipoIva] = useState(0.21);
  const [descuento, setDescuento] = useState(0);
  const [colorDestacado, setColorDestacado] = useState('#059669');

  const precioSeguro = Number.isFinite(precioBase) && precioBase >= 0 ? precioBase : 0;
  const descuentoSeguro = Math.min(50, Math.max(0, Number.isFinite(descuento) ? descuento : 0));

  const importeDescontado = precioSeguro * (descuentoSeguro / 100);
  const baseImponible = precioSeguro - importeDescontado;
  const cuotaIva = baseImponible * tipoIva;
  const totalFinal = baseImponible + cuotaIva;
  const porcentajeIva = Math.round(tipoIva * 100);

  const manejarDescuento = (e) => {
    const raw = e.target.value;
    if (raw === '') {
      setDescuento(0);
      return;
    }
    const numero = Number(raw);
    if (Number.isNaN(numero)) return;
    setDescuento(Math.min(50, Math.max(0, numero)));
  };

  // Objeto de estilos dinámico en JavaScript (camelCase)
  const estiloTarjetaDinamica = {
    backgroundColor: 'var(--glass-sub-bg)',
    border: `2px solid ${colorDestacado}`,
    borderRadius: '18px',
    padding: '1.2rem',
    transition: 'border-color 0.22s ease, box-shadow 0.22s ease',
    boxShadow: `0 14px 28px -18px ${colorDestacado}`
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
          <h2>2. Expresiones JSX, Estilos en Línea y Calculadora Fiscal</h2>
          <p className="subtitle">
            Cálculo impositivo dinámico con expresiones entre llaves{' '}
            <code className="code-inline">&#123; &#125;</code> y estilos condicionales en{' '}
            <code className="code-inline">style=&#123;&#123; ... &#125;&#125;</code>.
          </p>
        </div>
        <div className="ticket-badges">
          <span className="ticket-tag">Ticket 03</span>
          <span className="ticket-tag">IVA Dinámico</span>
        </div>
      </div>

      <div className="grid-2">
        {/* Calculadora Fiscal (Ticket 03) */}
        <motion.div
          className="box box-success"
          variants={cardReveal}
          whileHover={{ y: -3 }}
          transition={{ duration: 0.2, ease: EASE_OUT_EXPO }}
        >
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
            <Calculator size={18} aria-hidden="true" />
            <span>Calculadora Fiscal con Descuentos e IVA</span>
          </h3>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
              gap: '0.75rem',
              marginBottom: '0.9rem'
            }}
          >
            <div>
              <label htmlFor="precio-input" className="field-label">
                Precio base (€)
              </label>
              <input
                id="precio-input"
                type="number"
                min="0"
                step="0.01"
                className="input tabular"
                value={precioBase}
                onChange={(e) => setPrecioBase(Math.max(0, Number(e.target.value) || 0))}
              />
            </div>

            <div>
              <label htmlFor="iva-select" className="field-label">
                Tipo de IVA
              </label>
              <select
                id="iva-select"
                className="select"
                value={tipoIva}
                onChange={(e) => setTipoIva(Number(e.target.value))}
              >
                {TIPOS_IVA.map((item) => (
                  <option key={item.valor} value={item.valor}>
                    {item.etiqueta}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="descuento-input" className="field-label">
                Descuento (0–50%)
              </label>
              <input
                id="descuento-input"
                type="number"
                min={0}
                max={50}
                step={1}
                className="input tabular"
                value={descuentoSeguro}
                onChange={manejarDescuento}
              />
            </div>
          </div>

          {/* Atajos rápidos de descuento */}
          <div className="btn-row" style={{ marginTop: 0, marginBottom: '0.85rem' }}>
            {[0, 10, 20, 35, 50].map((pct) => (
              <button
                key={pct}
                type="button"
                className={`btn ${descuentoSeguro === pct ? '' : 'btn-secondary'}`}
                style={{ minHeight: '38px', padding: '0.35rem 0.72rem', fontSize: '0.78rem' }}
                onClick={() => setDescuento(pct)}
              >
                <Percent size={13} aria-hidden="true" />
                <span>{pct}%</span>
              </button>
            ))}
          </div>

          {/* Desglose completo con 2 decimales */}
          <ul className="list" aria-label="Desglose fiscal completo">
            <li className="list-item">
              <span>Precio Base</span>
              <strong className="tabular">{formatearEuros(precioSeguro)}</strong>
            </li>
            <li className="list-item">
              <span>Importe Descontado ({descuentoSeguro}%)</span>
              <strong className="tabular">-{formatearEuros(importeDescontado)}</strong>
            </li>
            <li className="list-item">
              <span>Base Imponible</span>
              <strong className="tabular">{formatearEuros(baseImponible)}</strong>
            </li>
            <li className="list-item">
              <span>Cuota de IVA ({porcentajeIva}%)</span>
              <strong className="tabular">{formatearEuros(cuotaIva)}</strong>
            </li>
            <li className="list-item">
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontWeight: 700 }}>
                <Receipt size={16} aria-hidden="true" />
                Total Final
              </span>
              {/* Ticket 03 criterio 4: resaltar el precio final en verde mediante style={{ ... }} */}
              <strong
                className="tabular"
                style={
                  descuentoSeguro > 0
                    ? {
                        color: 'var(--fiscal-green)',
                        backgroundColor: 'var(--fiscal-green-bg)',
                        border: '1px solid var(--fiscal-green-border)',
                        padding: '0.25rem 0.7rem',
                        borderRadius: '10px',
                        fontSize: '1.12rem'
                      }
                    : {
                        fontSize: '1.08rem'
                      }
                }
              >
                {formatearEuros(totalFinal)}
              </strong>
            </li>
          </ul>
        </motion.div>

        {/* Estilos dinámicos en línea y valores ignorados por React */}
        <motion.div
          style={estiloTarjetaDinamica}
          variants={cardReveal}
          whileHover={{ y: -3 }}
          transition={{ duration: 0.2, ease: EASE_OUT_EXPO }}
        >
          <h3
            style={{
              color: colorDestacado,
              marginTop: 0,
              display: 'flex',
              alignItems: 'center',
              gap: '0.45rem'
            }}
          >
            <Palette size={18} aria-hidden="true" />
            <span>Estilos en línea con style=&#123;&#123; camelCase &#125;&#125;</span>
          </h3>

          <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', marginBottom: '0.85rem' }}>
            El borde, la sombra y el titular de esta tarjeta se evalúan en vivo desde un objeto de
            estilos JavaScript usando propiedades <code className="code-inline">camelCase</code>{' '}
            como <code className="code-inline">backgroundColor</code> y{' '}
            <code className="code-inline">borderRadius</code>.
          </p>

          <div className="btn-row">
            <button
              type="button"
              className="btn"
              style={{ backgroundColor: '#047857', color: '#ffffff' }}
              onClick={() => setColorDestacado('#059669')}
            >
              Esmeralda
            </button>
            <button
              type="button"
              className="btn"
              style={{ backgroundColor: '#0369a1', color: '#ffffff' }}
              onClick={() => setColorDestacado('#0284c7')}
            >
              Azul Cyan
            </button>
            <button
              type="button"
              className="btn"
              style={{ backgroundColor: '#b45309', color: '#ffffff' }}
              onClick={() => setColorDestacado('#d97706')}
            >
              Ámbar
            </button>
            <button
              type="button"
              className="btn"
              style={{ backgroundColor: '#4338ca', color: '#ffffff' }}
              onClick={() => setColorDestacado('#4f46e5')}
            >
              Índigo
            </button>
          </div>

          <div
            className="list-item"
            style={{ marginTop: '1.15rem' }}
          >
            <span style={{ fontSize: '0.86rem' }}>
              Valores ignorados por React (<code className="code-inline">true/false/null/undefined</code>):
            </span>
            <strong className="code-inline">
              [{true}
              {false}
              {null}
              {undefined}] (vacío)
            </strong>
          </div>
        </motion.div>
      </div>

      <p className="file-hint">
        <span>
          Archivo fuente:{' '}
          <code className="code-inline">src/components/02_ExpresionesYEstilos.jsx</code>
        </span>
        <span className="tabular">
          Descuento activo: {descuentoSeguro}% · IVA: {porcentajeIva}%
        </span>
      </p>
    </motion.section>
  );
}
