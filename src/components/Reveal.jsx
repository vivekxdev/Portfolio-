import { motion, useReducedMotion } from 'framer-motion'

const EASE = [0.22, 1, 0.36, 1]

export default function Reveal({ children, className = '', delay = 0, as = 'div', ...props }) {
  const reduceMotion = useReducedMotion()
  const Component = motion[as] ?? motion.div

  return (
    <Component
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 14, filter: 'blur(6px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.55, delay, ease: EASE }}
      {...props}
    >
      {children}
    </Component>
  )
}
