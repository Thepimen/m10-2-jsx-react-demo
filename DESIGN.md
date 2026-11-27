# DESIGN.md — Sistema de Diseño M10.2 JSX Studio

> **Especificación Declarativa de Diseño (`VoltAgent/awesome-design-md`)**  
> **Módulo:** Desarrollo de Interfaces (Código 0488) · 2º CFGS DAM · Instituto Nebrija  
> **Autor:** Luis Lázaro Pimentel (`@Thepimen`)  
> **Marcos Aplicados:** `emilkowalski/skills` · `Leonxlnx/taste-skill` · `VoltAgent/awesome-design-md` · `WCAG 2.1 / 2.2 AA & AAA`

---

## 1. Filosofía Estética Híbrida

La aplicación combina dos lenguajes complementarios de ingeniería frontend:

1. **Portada Editorial Neo-Brutalista (*Landing Split-Screen*):**
   - Composición asimétrica en 2 columnas con píldora superior, titular monumental `Syne 800`, CTA con sombra dura sin difuminado (`5px 5px 0`) y escenario derecho con doble previsualización flotante interactiva (móvil + escritorio).
   - Separador en cinta brutalista (*marquee*) con los 10 tickets del sprint y pausa en hover + soporte `prefers-reduced-motion`.
2. **Workspace Glassy Dashboard V22:**
   - Contenedor translúcido sobre malla cromática ambiental (`backdrop-filter: blur(24px) saturate(165%)`), barra lateral flotante oscura con indicador activo animado por muelle (`layoutId`), cabecera esmeralda con acento en `Instrument Serif` cursiva y tarjetas bento acristaladas con elevación suave en hover.

---

## 2. Arquitectura Tipográfica (Cero Tipografías Genéricas)

| Rol | Familia Tipográfica | Pesos | Aplicación |
| :--- | :--- | :---: | :--- |
| **Display Brutalista** | `Syne` | `700`, `800` | Titular Hero (`clamp(2.45rem, 4.9vw, 4.45rem)`), cabeceras de sección y KPIs |
| **Acento Editorial V22** | `Instrument Serif` | `400 italic` | Palabras clave destacadas en el banner esmeralda del workspace |
| **Interfaz / Cuerpo** | `Plus Jakarta Sans` | `400`–`800` | Formularios, tablas, etiquetas y cuerpo de texto |
| **Telemetría / Código** | `JetBrains Mono` | `400`–`700` | Badges, etiquetas RA, consola XSS y cifras tabulares (`tabular-nums`) |

---

## 3. Tokens Cromáticos y Contraste WCAG 2.1/2.2

### Modo Claro (`.theme-light`)
- `--bg-page`: `#f4f7f5` · `--text-primary`: `#0b1614` (**17.4:1 AAA**)
- `--accent-primary`: `#047857` sobre blanco (**5.48:1 AA**)
- `--accent-danger`: `#b91c1c` sobre blanco (**6.47:1 AA**)
- `--brutal-lime`: `#c8ff3d` con tinta `#091311` (**16.1:1 AAA**)

### Modo Oscuro (`.theme-dark`)
- `--bg-page`: `#060d0c` · `--text-primary`: `#f1f7f5` (**18.2:1 AAA**)
- `--accent-primary`: `#34d399` sobre superficie `#111e1c` (**9.3:1 AAA**)
- `--accent-danger`: `#fca5a5` sobre superficie `#111e1c` (**8.8:1 AAA**)

---

## 4. Ingeniería de Movimiento (`emilkowalski/skills`)

- **Curvas:** `EASE_OUT_EXPO = [0.22, 1, 0.36, 1]` y muelles físicos (`stiffness: 430, damping: 33`) para el indicador de la barra lateral.
- **Restricciones GPU:** Exclusivamente `transform` y `opacity`; prohibido `ease-in` en entradas y `scale(0)`.
- **Accesibilidad:** Envuelto globalmente en `<MotionConfig reducedMotion="user">` + media query `@media (prefers-reduced-motion: reduce)`.
