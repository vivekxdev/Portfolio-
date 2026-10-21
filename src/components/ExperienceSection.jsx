import { useId, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, ChevronDown } from 'lucide-react'

import { experience, experienceCta } from '../data/experience'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'
import { TechPill } from './TechIcon'

function ExperienceItem({ item, open, onToggle }) {
  const panelId = useId()
  const reduceMotion = useReducedMotion()
  const initials =
    item.logo ??
    item.organisation
      .split(/\s+/)
      .slice(0, 2)
      .map((word) => word[0])
      .join('')

  return (
    <div className="border-b border-line last:border-b-0">
      <h3 className="flex">
        <button
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={onToggle}
          className="experience-row group/trigger flex-1 text-left"
        >
          <div className="flex min-w-0 items-center gap-2 md:gap-3">
            <div className="dashed-frame shrink-0 rounded-[10px] p-[2px]">
              <div className="experience-logo text-[11px] font-semibold tracking-wide" aria-hidden="true">
                {initials}
              </div>
            </div>

            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-base font-semibold leading-6 text-title">
                  {item.organisation}
                </span>
                <span className="hidden rounded border border-line px-1.5 py-0.5 text-[10px] leading-4 font-medium text-subtle sm:inline">
                  {item.type}
                </span>
              </div>
              <p className="mt-0.5 text-sm text-subtle">{item.title}</p>
            </div>
          </div>

          <div className="flex shrink-0 items-start gap-2">
            <div className="text-right">
              <p className="text-sm leading-6 text-title sm:text-base">{item.period}</p>
              {item.location ? (
                <p className="text-xs leading-5 text-subtle sm:text-sm">{item.location}</p>
              ) : null}
            </div>
            <ChevronDown
              aria-hidden="true"
              className={`mt-1 size-4 shrink-0 text-subtle transition-transform duration-300 ${
                open ? 'rotate-180' : ''
              }`}
              strokeWidth={1.6}
            />
          </div>
        </button>
      </h3>

      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            id={panelId}
            role="region"
            aria-label={`${item.organisation} details`}
            initial={reduceMotion ? false : { height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="flex flex-col gap-4 px-4 pb-5 text-sm">
              <p className="leading-relaxed text-muted-foreground">{item.summary}</p>

              {item.responsibilities?.length ? (
                <ul className="list-inside list-disc space-y-1 pl-1 leading-relaxed text-muted-foreground">
                  {item.responsibilities.map((responsibility) => (
                    <li key={responsibility} className="marker:text-subtle">
                      {responsibility}
                    </li>
                  ))}
                </ul>
              ) : null}

              {item.stack?.length ? (
                <div>
                  <h4 className="mb-2 text-[11px] font-semibold tracking-wide text-title uppercase">
                    Tech stack
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {item.stack.map((tech) => (
                      <TechPill key={tech} name={tech} />
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  )
}

export default function ExperienceSection() {
  const [openId, setOpenId] = useState(null)

  return (
    <section id="work" className="section" aria-labelledby="experience-heading">
      <Reveal>
        <SectionHeading
          eyebrow="Featured"
          title="Experience & Learning"
          id="experience-heading"
        />
      </Reveal>

      <Reveal className="mt-6" delay={0.04}>
        {experience.map((item) => (
          <ExperienceItem
            key={item.id}
            item={item}
            open={openId === item.id}
            onToggle={() => setOpenId((current) => (current === item.id ? null : item.id))}
          />
        ))}
      </Reveal>

      <div className="mt-8 flex justify-center">
        {experienceCta.href ? (
          <a
            href={experienceCta.href}
            download={experienceCta.href.endsWith('.pdf') ? true : undefined}
            className="small-action"
          >
            {experienceCta.label}
            <ArrowUpRight aria-hidden="true" className="size-3.5" strokeWidth={1.8} />
          </a>
        ) : (
          <button
            type="button"
            disabled
            title="Add a full experience URL in src/data/experience.js"
            className="small-action"
          >
            {experienceCta.label}
            <ArrowUpRight aria-hidden="true" className="size-3.5" strokeWidth={1.8} />
          </button>
        )}
      </div>
    </section>
  )
}
