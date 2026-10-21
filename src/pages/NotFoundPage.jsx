import { ArrowLeft, Compass } from 'lucide-react'
import { Link } from 'react-router-dom'

import { usePageMeta } from '../lib/usePageMeta'

export default function NotFoundPage() {
  usePageMeta(
    'Page not found — Vivek Kumar',
    'The page you were looking for does not exist. Head back to the portfolio.',
  )

  return (
    <div className="flex min-h-[58vh] flex-col items-center justify-center py-12 text-center">
      <span className="grid size-10 place-items-center rounded-full border border-line text-subtle">
        <Compass aria-hidden="true" className="size-5" strokeWidth={1.5} />
      </span>
      <p className="mt-4 text-[11px] tracking-[0.14em] text-subtle uppercase">404</p>
      <h1 className="mt-1 font-serif text-4xl leading-10 font-medium tracking-wide text-title italic">
        This page does not exist.
      </h1>
      <p className="mt-3 max-w-sm text-sm leading-6 text-muted-foreground">
        The link may be out of date, or the address may have a typo.
      </p>
      <Link to="/" className="small-action mt-6">
        <ArrowLeft aria-hidden="true" className="size-3.5" strokeWidth={1.8} />
        Back to the portfolio
      </Link>
    </div>
  )
}
