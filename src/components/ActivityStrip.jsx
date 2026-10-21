import { hero } from '../data/site'

/**
 * A compact, factual replacement for a GitHub contribution graph.
 *
 * We do not have contribution data to show, so this panel presents the things
 * that are actually true: the current build focus, learning focus and status.
 * It keeps the visual rhythm of the reference's activity block without
 * inventing a heatmap.
 */
export default function ActivityStrip() {
  return (
    <div className="mt-8">
      <div
        className="overflow-hidden rounded-lg border border-line"
        role="region"
        aria-label="Current focus"
      >
        <div className="flex items-center justify-between gap-3 border-b border-line bg-card px-4 py-2.5">
          <span className="text-xs font-medium text-title">Current focus</span>
          <span className="text-[11px] text-subtle">October 2026</span>
        </div>

        <div className="grid grid-cols-2 gap-px bg-line sm:grid-cols-4">
          {hero.focus.map((item) => (
            <div key={item.label} className="bg-background px-3.5 py-3">
              <p className="text-[10px] font-medium tracking-[0.08em] text-subtle uppercase">
                {item.label}
              </p>
              <p className="mt-1 truncate text-[13px] font-medium text-title">{item.value}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 flex items-center justify-between gap-4 py-4">
        <div className="flex min-w-0 items-center gap-3">
          <span
            className="size-2 shrink-0 rounded-full bg-[color:var(--success)]"
            aria-hidden="true"
          />
          <div className="min-w-0">
            <p className="text-sm leading-5 font-medium text-title">{hero.statusLine}</p>
            <p className="mt-1 text-xs leading-4 text-muted-foreground">{hero.statusMeta}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
