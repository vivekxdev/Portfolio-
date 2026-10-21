import { useReducedMotion } from 'framer-motion'

/** Shared easing + distance so every section reveal feels related. */
export const EASE = [0.16, 1, 0.3, 1]

export function useMotionPrefs() {
  const prefersReduced = useReducedMotion()

  return {
    prefersReduced: Boolean(prefersReduced),
    /** Fade-and-rise used by sections. No movement when reduced motion is on. */
    reveal: {
      hidden: { opacity: 0, y: prefersReduced ? 0 : 24 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: prefersReduced ? 0 : 0.7, ease: EASE },
      },
    },
    /** Stagger container for lists of cards. */
    stagger: (delay = 0.06) => ({
      hidden: {},
      visible: {
        transition: {
          staggerChildren: prefersReduced ? 0 : delay,
          delayChildren: prefersReduced ? 0 : 0.08,
        },
      },
    }),
    viewport: { once: true, amount: 0.2, margin: '0px 0px -80px 0px' },
  }
}
