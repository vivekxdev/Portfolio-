import { useState } from 'react'
import { ArrowLeft, Check, Copy, Send } from 'lucide-react'
import { Link } from 'react-router-dom'

import { site, social } from '../data/site'
import { usePageMeta } from '../lib/usePageMeta'

const ENDPOINT = import.meta.env.VITE_CONTACT_ENDPOINT

function validate(values) {
  const errors = {}

  if (values.name.trim().length < 2) {
    errors.name = 'Please enter your name (at least 2 characters).'
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    errors.email = 'Please enter a valid email address.'
  }

  if (values.message.trim().length < 20) {
    errors.message = 'Please add a little more detail (at least 20 characters).'
  }

  return errors
}

function MailtoLink({ draft, children }) {
  if (!site.email) return null
  return (
    <a
      href={draft}
      className="text-title underline decoration-line underline-offset-4 transition-colors hover:decoration-title"
    >
      {children}
    </a>
  )
}

export default function ContactPage() {
  usePageMeta(
    'Contact — Vivek Kumar',
    'Get in touch with Vivek Kumar about full-stack development work, projects or opportunities.',
  )

  const [values, setValues] = useState({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')
  const [copied, setCopied] = useState(false)
  const hasSocialLinks = Boolean(social.github.url || social.linkedin.url)

  const draftHref = `mailto:${site.email}?subject=${encodeURIComponent(
    `Portfolio enquiry from ${values.name || 'a visitor'}`,
  )}&body=${encodeURIComponent(
    `${values.message}\n\n— ${values.name}\n${values.email}`,
  )}`

  const update = (event) => {
    const { name, value } = event.target
    setValues((current) => ({ ...current, [name]: value }))
    if (errors[name]) {
      setErrors((current) => ({ ...current, [name]: undefined }))
    }
    if (status === 'error' || status === 'draft' || status === 'success') setStatus('idle')
  }

  const copyEmail = async () => {
    if (!site.email) return
    try {
      await navigator.clipboard.writeText(site.email)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1800)
    } catch {
      setCopied(false)
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const nextErrors = validate(values)
    setErrors(nextErrors)

    if (Object.keys(nextErrors).length) {
      const first = document.getElementById(`contact-${Object.keys(nextErrors)[0]}`)
      first?.focus()
      return
    }

    if (!ENDPOINT && !site.email) {
      setStatus('error')
      return
    }

    if (!ENDPOINT) {
      window.location.href = draftHref
      setStatus('draft')
      return
    }

    setStatus('sending')
    try {
      const response = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      })
      if (!response.ok) throw new Error(`Request failed with ${response.status}`)
      setStatus('success')
      setValues({ name: '', email: '', message: '' })
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="pb-4">
      <Link
        to="/"
        className="inline-flex items-center gap-1.5 text-xs text-subtle no-underline transition-colors hover:text-title"
      >
        <ArrowLeft aria-hidden="true" className="size-3.5" strokeWidth={1.8} />
        Back home
      </Link>

      <header className="mt-6">
        <p className="text-xs text-subtle">Contact</p>
        <h1 className="mt-1 font-serif text-[2rem] leading-9 font-medium tracking-[0.025em] text-title italic sm:text-4xl sm:leading-10">
          Get in touch
        </h1>
        <p className="mt-4 max-w-xl text-base leading-8 text-muted-foreground">
          Have a question, a role, or a project worth discussing? Send a note below.
        </p>
      </header>

      <div className="mt-8 grid gap-8 md:grid-cols-[1fr_220px] md:gap-10">
        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          <div>
            <label className="contact-label" htmlFor="contact-name">
              Name
            </label>
            <input
              id="contact-name"
              name="name"
              type="text"
              autoComplete="name"
              required
              value={values.name}
              onChange={update}
              aria-invalid={errors.name ? 'true' : undefined}
              aria-describedby={errors.name ? 'contact-name-error' : undefined}
              className="contact-field"
              placeholder="Your name"
            />
            {errors.name ? (
              <p id="contact-name-error" className="mt-1.5 text-xs text-danger">
                {errors.name}
              </p>
            ) : null}
          </div>

          <div>
            <label className="contact-label" htmlFor="contact-email">
              Email
            </label>
            <input
              id="contact-email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={values.email}
              onChange={update}
              aria-invalid={errors.email ? 'true' : undefined}
              aria-describedby={errors.email ? 'contact-email-error' : undefined}
              className="contact-field"
              placeholder="you@example.com"
            />
            {errors.email ? (
              <p id="contact-email-error" className="mt-1.5 text-xs text-danger">
                {errors.email}
              </p>
            ) : null}
          </div>

          <div>
            <label className="contact-label" htmlFor="contact-message">
              Message
            </label>
            <textarea
              id="contact-message"
              name="message"
              rows={6}
              required
              value={values.message}
              onChange={update}
              aria-invalid={errors.message ? 'true' : undefined}
              aria-describedby={errors.message ? 'contact-message-error' : undefined}
              className="contact-field resize-y"
              placeholder="A little context about what you have in mind…"
            />
            {errors.message ? (
              <p id="contact-message-error" className="mt-1.5 text-xs text-danger">
                {errors.message}
              </p>
            ) : null}
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-1">
            <button type="submit" disabled={status === 'sending'} className="action-button action-button--primary">
              <Send aria-hidden="true" className="size-4" strokeWidth={1.7} />
              {status === 'sending' ? 'Sending…' : 'Send message'}
            </button>
            <span className="text-[11px] text-subtle">
              {ENDPOINT
                ? 'Delivered by the site contact endpoint.'
                : site.email
                  ? 'Opens a draft in your email app.'
                  : 'No contact channel is configured yet.'}
            </span>
          </div>

          <div aria-live="polite" className="min-h-5">
            {status === 'success' ? (
              <p className="text-sm text-success">Thanks — your message was sent.</p>
            ) : null}
            {status === 'draft' ? (
              <p className="text-sm leading-6 text-muted-foreground">
                Your email app should have opened with a draft. Nothing has been sent yet — review it
                and hit send there. If nothing opened, email me directly at{' '}
                <MailtoLink draft={draftHref}>{site.email}</MailtoLink>.
              </p>
            ) : null}
            {status === 'error' ? (
              <p className="text-sm leading-6 text-muted-foreground">
                {site.email ? (
                  <>
                    The message could not be sent. You can still email me directly at{' '}
                    <MailtoLink draft={draftHref}>{site.email}</MailtoLink>.
                  </>
                ) : (
                  'The message could not be sent. Please try again later.'
                )}
              </p>
            ) : null}
          </div>
        </form>

        <aside className="border-t border-line pt-5 md:border-t-0 md:border-l md:pt-0 md:pl-6">
          <p className="text-xs font-medium text-title">Direct email</p>
          {site.email ? (
            <div className="mt-2 flex items-center gap-2">
              <a
                href={`mailto:${site.email}`}
                className="min-w-0 truncate text-sm text-muted-foreground no-underline transition-colors hover:text-title"
              >
                {site.email}
              </a>
              <button
                type="button"
                onClick={copyEmail}
                aria-label={copied ? 'Email copied' : 'Copy email address'}
                title={copied ? 'Copied' : 'Copy email address'}
                className="grid size-7 shrink-0 place-items-center rounded border border-line text-subtle transition-colors hover:text-title"
              >
                {copied ? (
                  <Check aria-hidden="true" className="size-3.5" strokeWidth={2} />
                ) : (
                  <Copy aria-hidden="true" className="size-3.5" strokeWidth={1.7} />
                )}
              </button>
            </div>
          ) : (
            <p className="mt-2 text-sm text-subtle">Email address not added yet.</p>
          )}

          {hasSocialLinks ? (
            <>
              <p className="mt-5 text-xs leading-5 text-subtle">
                Prefer another channel? The links below are the same profiles used across the site.
              </p>
              <div className="mt-3 flex flex-wrap gap-3 text-xs">
                {social.github.url ? (
                  <a
                    href={social.github.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-title underline decoration-line underline-offset-4"
                  >
                    GitHub
                  </a>
                ) : null}
                {social.linkedin.url ? (
                  <a
                    href={social.linkedin.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-title underline decoration-line underline-offset-4"
                  >
                    LinkedIn
                  </a>
                ) : null}
              </div>
            </>
          ) : null}
        </aside>
      </div>
    </div>
  )
}
