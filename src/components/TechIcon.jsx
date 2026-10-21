import { TECH, techLabel } from '../data/tech'

export function TechIcon({ name, size = 16, className = '' }) {
  const tech = TECH[name]
  if (!tech) return null

  if (tech.Icon) {
    const Icon = tech.Icon
    return (
      <Icon
        aria-hidden="true"
        strokeWidth={1.8}
        style={{ width: size, height: size }}
        className={`shrink-0 text-subtle ${className}`}
      />
    )
  }

  return (
    <img
      src={tech.src}
      alt=""
      aria-hidden="true"
      width={size}
      height={size}
      loading="lazy"
      decoding="async"
      style={{ width: size, height: size }}
      className={`shrink-0 object-contain ${tech.className ?? ''} ${className}`}
    />
  )
}

/** Compact inline icon + label, used inside the hero paragraph. */
export function TechInline({ name, className = '' }) {
  return (
    <span className={`tech-inline ${className}`}>
      <TechIcon name={name} size={16} />
      <span>{techLabel(name)}</span>
    </span>
  )
}

/** Chip used in the skill cloud and expanded experience details. */
export function TechPill({ name, className = '' }) {
  return (
    <span className={`tech-pill ${className}`}>
      <TechIcon name={name} size={15} />
      <span>{techLabel(name)}</span>
    </span>
  )
}
