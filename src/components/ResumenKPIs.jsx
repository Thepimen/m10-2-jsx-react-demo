import { motion } from 'framer-motion';
import { Award, TrendingUp, Users } from 'lucide-react';
import { EASE_OUT_EXPO, cardReveal } from '../lib/motion.js';

// ============================================================================
// TICKET 09 — COMPONENTE REUTILIZABLE DE CUADRO DE MANDO (KPIs)
// ----------------------------------------------------------------------------
// Recibe la lista actual de alumnos por props (`alumnos`) y calcula de forma
// reactiva:
// 1. Total de alumnos
// 2. Nota media del grupo (2 decimales)
// 3. Porcentaje de aprobados (%)
// ============================================================================

export default function ResumenKPIs({ alumnos = [] }) {
  const totalAlumnos = alumnos.length;

  const notaMedia =
    totalAlumnos > 0
      ? alumnos.reduce((acum, alumno) => acum + Number(alumno.nota || 0), 0) / totalAlumnos
      : 0;

  const aprobados = alumnos.filter((alumno) => Number(alumno.nota) >= 5).length;
  const porcentajeAprobados = totalAlumnos > 0 ? (aprobados / totalAlumnos) * 100 : 0;

  const tarjetas = [
    {
      id: 'kpi-total',
      titulo: 'Total de alumnos',
      valor: String(totalAlumnos),
      pie: totalAlumnos === 1 ? '1 expediente visible' : `${totalAlumnos} expedientes visibles`,
      icono: Users
    },
    {
      id: 'kpi-media',
      titulo: 'Nota media del grupo',
      valor: notaMedia.toFixed(2),
      pie: totalAlumnos > 0 ? 'Escala académica 0.00 – 10.00' : 'Sin datos en la vista actual',
      icono: Award
    },
    {
      id: 'kpi-aprobados',
      titulo: 'Porcentaje de aprobados',
      valor: `${porcentajeAprobados.toFixed(1)}%`,
      pie: `${aprobados} de ${totalAlumnos} con nota >= 5`,
      icono: TrendingUp
    }
  ];

  return (
    <section className="kpi-grid" aria-label="Cuadro de mando de indicadores KPI">
      {tarjetas.map((kpi) => {
        const Icono = kpi.icono;
        return (
          <motion.article
            key={kpi.id}
            className="kpi-card"
            variants={cardReveal}
            whileHover={{ y: -4 }}
            transition={{ duration: 0.2, ease: EASE_OUT_EXPO }}
          >
            <div className="kpi-card-top">
              <span className="kpi-label">{kpi.titulo}</span>
              <span className="kpi-icon-wrap" aria-hidden="true">
                <Icono size={18} />
              </span>
            </div>
            <p className="kpi-value tabular">{kpi.valor}</p>
            <p className="kpi-foot">{kpi.pie}</p>
          </motion.article>
        );
      })}
    </section>
  );
}
