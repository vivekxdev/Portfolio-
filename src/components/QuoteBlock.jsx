import { Plus, Quote } from 'lucide-react'

import Reveal from './Reveal'

const CORNERS = [
  'left-[-11.5px] top-[-12.5px]',
  'right-[-11.5px] top-[-12.5px]',
  'bottom-[-12.5px] left-[-11.5px]',
  'bottom-[-12.5px] right-[-11.5px]',
]

export default function QuoteBlock() {
  return (
    <Reveal as="section" className="mb-12" aria-label="Working principle">
      <div className="quote-panel">
        {CORNERS.map((position) => (
          <Plus
            key={position}
            aria-hidden="true"
            strokeWidth={1}
            className={`quote-plus ${position}`}
          />
        ))}

        <div className="relative flex flex-col items-center overflow-hidden py-4 text-center sm:py-6">
          <Quote
            aria-hidden="true"
            className="mb-4 size-9 fill-current text-subtle sm:mb-6"
            strokeWidth={0}
          />
          <blockquote className="relative z-10 max-w-2xl px-1 sm:px-4">
            <p className="font-serif text-xl leading-relaxed tracking-wide text-title italic sm:text-2xl">
              &ldquo;Simplicity is prerequisite for reliability.&rdquo;
            </p>
          </blockquote>
          <div className="z-10 mt-6 flex items-center gap-3 sm:mt-7">
            <div className="h-px w-8 bg-subtle" aria-hidden="true" />
            <span className="text-[10px] font-semibold tracking-[0.18em] text-subtle uppercase sm:text-xs">
              Edsger W. Dijkstra
            </span>
            <div className="h-px w-8 bg-subtle" aria-hidden="true" />
          </div>
        </div>
      </div>
    </Reveal>
  )
}
