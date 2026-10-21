import { ArrowLeft, ArrowRight, ExternalLink, Lock } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'

import ProjectPreview from '../components/ProjectPreview'
import { Github } from '../components/BrandIcons'
import { getProject, projects } from '../data/projects'
import { usePageMeta } from '../lib/usePageMeta'

const STATE_STYLES = {
  'in-progress': {
    label: 'In progress',
    className:
      'border-[color:#d97706]/30 bg-[color:#f59e0b]/10 text-[color:#b45309] dark:text-[#fbbf24]',
  },
  planned: {
    label: 'Planned',
    className: 'border-line bg-muted text-subtle',
  },
  done: {
    label: 'Implemented',
    className:
      'border-[color:#16a34a]/30 bg-[color:#22c55e]/10 text-[color:#15803d] dark:text-[#4ade80]',
  },
}

function FeatureState({ state }) {
  const style = STATE_STYLES[state] ?? STATE_STYLES.planned
  return (
    <span
      className={`inline-flex shrink-0 items-center rounded border px-1.5 py-0.5 text-[10px] font-medium tracking-wide uppercase ${style.className}`}
    >
      {style.label}
    </span>
  )
}

function CaseLink({ url, label, icon: Icon }) {
  if (url) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="small-action"
      >
        <Icon aria-hidden="true" className="size-3.5" strokeWidth={1.7} />
        {label}
        <ExternalLink aria-hidden="true" className="size-3" strokeWidth={1.8} />
      </a>
    )
  }

  return (
    <span
      role="link"
      aria-disabled="true"
      aria-label={`${label} — not published yet`}
      title="Not published yet"
      className="inline-flex h-8 cursor-not-allowed items-center justify-center gap-1.5 rounded-lg border border-dashed border-line px-3 text-xs font-medium text-subtle opacity-70"
    >
      <Icon aria-hidden="true" className="size-3.5" strokeWidth={1.7} />
      {label}
      <Lock aria-hidden="true" className="size-3" strokeWidth={1.8} />
    </span>
  )
}

function Section({ title, children }) {
  return (
    <section className="mt-10 border-t border-line pt-7">
      <h2 className="font-serif text-2xl leading-8 font-medium tracking-wide text-title italic">
        {title}
      </h2>
      <div className="mt-4">{children}</div>
    </section>
  )
}

export default function CaseStudyPage() {
  const { slug } = useParams()
  const project = getProject(slug)

  usePageMeta(
    project ? `${project.title} case study — Vivek Kumar` : 'Project not found — Vivek Kumar',
    project?.tagline,
  )

  if (!project) {
    return (
      <div className="py-10 text-center">
        <p className="text-xs tracking-wide text-subtle uppercase">404</p>
        <h1 className="mt-2 font-serif text-4xl text-title italic">Project not found</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          There is no case study at this address.
        </p>
        <Link to="/" className="small-action mt-6">
          Back to the portfolio
        </Link>
      </div>
    )
  }

  const index = projects.findIndex((item) => item.slug === project.slug)
  const next = projects[(index + 1) % projects.length]

  return (
    <article className="pb-6">
      <Link
        to="/"
        state={{ scrollTo: 'projects' }}
        className="inline-flex items-center gap-1.5 text-xs text-subtle no-underline transition-colors hover:text-title"
      >
        <ArrowLeft aria-hidden="true" className="size-3.5" strokeWidth={1.8} />
        All projects
      </Link>

      <header className="mt-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs text-subtle">Case study</span>
          <span className="text-xs text-line" aria-hidden="true">
            /
          </span>
          <span className="status-chip" data-tone={project.statusTone ?? 'muted'}>
            {project.status}
          </span>
        </div>

        <h1 className="mt-2 font-serif text-[2.25rem] leading-10 font-medium tracking-[0.025em] text-title italic sm:text-[2.75rem] sm:leading-[3rem]">
          {project.title}
        </h1>
        <p className="mt-2 max-w-2xl text-base leading-7 text-muted-foreground">{project.tagline}</p>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground">{project.summary}</p>

        <dl className="mt-6 grid grid-cols-2 gap-x-4 gap-y-3 border-y border-line py-4 text-xs sm:grid-cols-4">
          {[
            ['Role', project.role],
            ['Type', project.category],
            ['Focus', project.focus],
            ['Status', project.status],
          ].map(([label, value]) => (
            <div key={label}>
              <dt className="text-[10px] tracking-[0.08em] text-subtle uppercase">{label}</dt>
              <dd className="mt-1 font-medium text-title">{value}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-4 flex flex-wrap gap-2">
          <CaseLink url={project.demoUrl} label="Live demo" icon={ExternalLink} />
          <CaseLink url={project.repoUrl} label="Repository" icon={Github} />
        </div>
      </header>

      <div className="project-frame mt-8">
        <div className="project-shot case-shot">
          <div className="project-shot-inner">
            <ProjectPreview variant={project.preview} />
          </div>
        </div>
      </div>
      <p className="mt-2 text-right text-[10px] tracking-[0.06em] text-subtle uppercase">
        Concept preview with illustrative data — not a product screenshot
      </p>

      <div className="mt-6 rounded-lg border border-[color:#d97706]/25 bg-[color:#f59e0b]/5 px-4 py-3 text-xs leading-6 text-muted-foreground">
        {project.statusNote}
      </div>

      <div className="mt-8 grid gap-8 md:grid-cols-2">
        <div>
          <h2 className="font-serif text-2xl leading-8 font-medium tracking-wide text-title italic">
            The problem
          </h2>
          <p className="prose-case mt-3">{project.problem}</p>
        </div>
        <div>
          <h2 className="font-serif text-2xl leading-8 font-medium tracking-wide text-title italic">
            The approach
          </h2>
          <p className="prose-case mt-3">{project.approach}</p>
        </div>
      </div>

      <Section title="Architecture">
        <div className="grid gap-3 sm:grid-cols-2">
          {project.architecture.map((item) => (
            <div key={item.label} className="rounded-lg border border-line bg-card p-4">
              <p className="text-xs font-semibold text-title">{item.label}</p>
              <p className="mt-1.5 text-xs leading-5 text-muted-foreground">{item.detail}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Feature status">
        <ul>
          {project.features.map((feature) => (
            <li
              key={feature.title}
              className="flex items-start justify-between gap-4 border-b border-line py-3 last:border-b-0"
            >
              <div>
                <p className="text-sm font-medium text-title">{feature.title}</p>
                <p className="mt-1 text-xs leading-5 text-muted-foreground">
                  {feature.description}
                </p>
              </div>
              <FeatureState state={feature.state} />
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Design decisions">
        <ol className="space-y-4">
          {project.decisions.map((decision, decisionIndex) => (
            <li key={decision.title} className="flex gap-3">
              <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full border border-line text-[10px] font-medium text-subtle">
                {decisionIndex + 1}
              </span>
              <div>
                <p className="text-sm font-medium text-title">{decision.title}</p>
                <p className="mt-1 text-sm leading-6 text-muted-foreground">{decision.detail}</p>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      <Section title="My contribution">
        <p className="prose-case">{project.contribution}</p>
      </Section>

      <Section title="Next steps">
        <ol className="list-inside list-decimal space-y-1.5 text-sm leading-6 text-muted-foreground">
          {project.nextSteps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </Section>

      <div className="mt-12 flex items-center justify-between gap-4 border-t border-line pt-5">
        <Link
          to="/"
          state={{ scrollTo: 'projects' }}
          className="inline-flex items-center gap-1.5 text-xs text-subtle no-underline transition-colors hover:text-title"
        >
          <ArrowLeft aria-hidden="true" className="size-3.5" strokeWidth={1.8} />
          All projects
        </Link>

        <Link
          to={`/projects/${next.slug}`}
          className="group inline-flex items-center gap-2 text-right no-underline"
        >
          <span>
            <span className="block text-[10px] tracking-[0.08em] text-subtle uppercase">
              Next project
            </span>
            <span className="mt-0.5 block text-sm font-medium text-title">{next.title}</span>
          </span>
          <ArrowRight
            aria-hidden="true"
            className="size-4 text-subtle transition-transform group-hover:translate-x-0.5"
            strokeWidth={1.8}
          />
        </Link>
      </div>
    </article>
  )
}
