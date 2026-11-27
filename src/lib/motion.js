// ============================================================================
// SISTEMA DE MOVIMIENTO Y FÍSICA DE INTERACCIÓN (emilkowalski/skills + V22)
// ----------------------------------------------------------------------------
// - Prohibido `ease-in` en entradas: curvas ease-out exponenciales para respuesta
//   instantánea con desaceleración orgánica.
// - Solo propiedades aceleradas por GPU (`transform`, `opacity`).
// - Nunca `scale(0)` desde vacío; entradas suaves desde 0.96 -> 1.
// ============================================================================

export const EASE_OUT_EXPO = [0.22, 1, 0.36, 1];
export const EASE_OUT_SNAPPY = [0.16, 1, 0.3, 1];

export const SPRING_PILL = {
  type: 'spring',
  stiffness: 430,
  damping: 33,
  mass: 0.78
};

export const SPRING_CARD = {
  type: 'spring',
  stiffness: 340,
  damping: 28,
  mass: 0.85
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.055,
      delayChildren: 0.04
    }
  }
};

export const cardReveal = {
  hidden: { opacity: 0, y: 14, scale: 0.985 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.34,
      ease: EASE_OUT_EXPO
    }
  }
};

export const tabTransition = {
  initial: { opacity: 0, y: 12, scale: 0.99 },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.28,
      ease: EASE_OUT_EXPO
    }
  },
  exit: {
    opacity: 0,
    y: -8,
    scale: 0.99,
    transition: {
      duration: 0.16,
      ease: EASE_OUT_SNAPPY
    }
  }
};

export const heroFloatLeft = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: EASE_OUT_EXPO
    }
  }
};

export const heroMockupReveal = (delay = 0.1) => ({
  hidden: { opacity: 0, y: 24, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.55,
      delay,
      ease: EASE_OUT_EXPO
    }
  }
});
