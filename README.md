# M10.2 JSX Studio — Evolución de Aplicación React (JSX)

> **Alumno:** Luis Lázaro Pimentel ([`@Thepimen`](https://github.com/Thepimen))  
> **Módulo:** Desarrollo de Interfaces (Código 0488) · 2º CFGS DAM · Instituto Nebrija  
> **Stack:** React 18 · Vite 5 · Framer Motion · Lucide React · CSS Custom Properties  
> **Repositorio GitHub:** [`https://github.com/Thepimen/m10-2-jsx-react-demo`](https://github.com/Thepimen/m10-2-jsx-react-demo)  
> **Aplicación en Producción (Vercel):** [`https://m10-2-jsx-react-demo-chi.vercel.app`](https://m10-2-jsx-react-demo-chi.vercel.app)

---

## Resumen de Mejoras Implementadas (Backlog de 10 Tickets)

Evolución del proyecto base `m10-2-jsx-react-demo` hacia un prototipo funcional con arquitectura empresarial, combinando una **portada editorial Neo-Brutalista** con un **workspace acristalado (Glassy Dashboard V22)**, tipografía de autor (`Syne`, `Instrument Serif`, `Plus Jakarta Sans`, `JetBrains Mono`) y animaciones físicas respetuosas con `prefers-reduced-motion`.

| Ticket | Archivo(s) | Funcionalidad Implementada |
| :---: | :--- | :--- |
| **01** | `src/App.jsx`, `src/index.css` | Selector de tema **Claro / Oscuro** en `<header>` alternando clase CSS en el contenedor principal (`.theme-light` / `.theme-dark`) y `<footer>` corporativo con nombre completo, módulo y año dinámico `{new Date().getFullYear()}`. |
| **02** | `src/components/01_SintaxisYFragmentos.jsx` | Campo `<input id="campo-alumno" />` controlado con `useState`, validación reactiva con error en rojo y `role="alert"` para `< 3` caracteres y saludo personalizado en tiempo real para `>= 3` caracteres. |
| **03** | `src/components/02_ExpresionesYEstilos.jsx` | Calculadora fiscal con selector `<select>` de IVA (**General 21%**, **Reducido 10%**, **Superreducido 4%**), descuento numérico `0–50%`, desglose completo a 2 decimales y resaltado del total en verde vía `style={{ ... }}` cuando `descuento > 0`. |
| **04** | `src/components/03_RenderizadoCondicional.jsx` | Corrección definitiva de **«La Trampa del 0»** (`notificaciones > 0 && ...`), botón **«Marcar todas como leídas»** con `disabled={notificaciones === 0}` y mensaje informativo de estado vacío. |
| **05** | `src/components/04_ListasYKeys.jsx` | Control de duplicados insensible a mayúsculas/minúsculas con alerta de error, buscador en tiempo real por nombre o código y contador dinámico **«Mostrando X de Y módulos»**. |
| **06** | `src/components/05_EventosYSeguridadXSS.jsx` | Auditoría trazable con historial de los **últimos 5 eventos** (`.map()` + `key` única), botón **«Limpiar historial»** y **3 botones de payloads XSS de prueba** para verificar el escapado automático de JSX. |
| **07** | `src/components/06_DemoIntegradora.jsx` | Buscador de alumnos por nombre combinable con **«Solo aprobados»**, `<select>` de ordenación (**Nota mayor→menor**, **Nota menor→mayor**, **Nombre A–Z**) y estado vacío claro. |
| **08** | `src/components/06_DemoIntegradora.jsx` | Estado gestionado con `useState` y formulario controlado de alta (**Nombre completo**, **Nota 0–10**, **Módulos separados por comas**) con asignación de `id` único y limpieza tras envío. |
| **09** | `src/components/ResumenKPIs.jsx` | Componente reutilizable `<ResumenKPIs alumnos={...} />` con 3 tarjetas KPI reactivas (**Total de alumnos**, **Nota media del grupo** con 2 decimales y **Porcentaje de aprobados**). |
| **10** | `src/components/06_DemoIntegradora.jsx` | Persistencia automática en `localStorage`, botón **«Restablecer datos iniciales»** (elimina la clave y restaura los 3 expedientes base) y build de producción limpio sin warnings de React. |

---

## Trazabilidad Curricular (Resultados de Aprendizaje — Módulo 0488)

- **RA 1 (Confección de interfaces):** Flujo unidireccional de datos, descomposición en componentes reutilizables (`LandingBrutalista`, `ResumenKPIs`, `TarjetaExpediente`).
- **RA 2 (Interfaces declarativas):** Sintaxis estricta JSX, Fragmentos (`<>...</>`), variables CSS nativas y estilos condicionales.
- **RA 3 (Componentes visuales):** Gestión reactiva de estado, eventos sintéticos, listas con `key` estable, formularios controlados y sincronización con `localStorage`.
- **RA 4 (Usabilidad y accesibilidad):** Diseño responsivo (*mobile-first*, sin scroll horizontal en `360×800` ni `1280×800`), áreas táctiles `>= 44×44 px`, contraste **WCAG 2.1/2.2 AA & AAA**, `role="alert"`, `aria-live`, `aria-pressed`, `:focus-visible` y `prefers-reduced-motion`.
- **RA 7 (Distribución y despliegue):** Historial Git semántico por ticket en repositorio público de GitHub y despliegue continuo en Vercel (`npm run build` → `dist`).

---

## Puesta en marcha local

```bash
npm install
npm run dev
```

Compilación de producción verificada:

```bash
npm run build
npm run preview
```

Más detalles del sistema de diseño en [`DESIGN.md`](./DESIGN.md).
