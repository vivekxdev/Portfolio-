import { ArrowUpRight, ExternalLink } from 'lucide-react'
import { Link } from 'react-router-dom'

import { projects } from '../data/projects'
import { social } from '../data/site'
import { techLabel } from '../data/tech'
import { Github } from './BrandIcons'
import ProjectPreview from './ProjectPreview'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'
import { TechIcon } from './TechIcon'

function ProjectIcon({ url, label, children }) {
  if (!url) {
    return (
      <span
        role="link"
        aria-disabled="true"
        aria-label={`${label} — not published yet`}
        title="Not published yet"
        className="icon-action"
      >
        {children}
      </span>
    )
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${label} (opens in a new tab)`}
      title={label}
      className="icon-action"
    >
      {children}
    </a>
  )
}

function Status({ status, tone }) {
  if (!status) {
    return (
      <span className="status-chip status-chip--empty" title="Implementation status not set">
        Status not set
      </span>
    )
  }

  return (
    <span className="status-chip" data-tone={tone ?? 'muted'}>
      {status}
    </span>
  )
}

function ProjectCard({ project, index, wide }) {
  return (
    <Reveal
      as="article"
      className={`project-card ${wide ? 'project-card--wide' : ''}`}
      delay={index * 0.04}
    >
      <Link
        to={`/projects/${project.slug}`}
        aria-label={`Read the ${project.title} case study`}
        tabIndex={-1}
        className="project-frame block"
      >
        <div className="project-shot">
          <div className="project-shot-inner">
            <ProjectPreview variant={project.preview} />
          </div>
          <span
            title="Illustrative interface concept — not a product screenshot"
            className="absolute right-2 bottom-2 rounded border border-line bg-background/85 px-1.5 py-0.5 text-[9px] font-medium tracking-[0.08em] text-subtle uppercase backdrop-blur-sm"
          >
            Concept preview
          </span>
        </div>
      </Link>

      <div className="flex w-full flex-col gap-3 px-2 pt-3">
        <div className="flex items-start justify-between gap-3">
          <h3 className="min-w-0 text-base leading-6 font-medium text-title">
            <Link
              to={`/projects/${project.slug}`}
              className="underline-offset-4 transition-colors hover:underline"
            >
              {project.title}
            </Link>
          </h3>
          <div className="flex shrink-0 items-center gap-1.5">
            <ProjectIcon url={project.demoUrl} label={`${project.title} live demo`}>
              <ExternalLink aria-hidden="true" className="size-5" strokeWidth={1.7} />
            </ProjectIcon>
            <ProjectIcon url={project.repoUrl} label={`${project.title} repository`}>
              <Github className="size-5" />
            </ProjectIcon>
          </div>
        </div>

        <p className="line-clamp-3 text-base leading-6 text-muted-foreground">
          {project.cardDescription ?? project.description}
        </p>

        <div className="mt-auto flex items-end justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[11px] text-subtle">Technologies</p>
            <div className="mt-1.5 flex flex-wrap items-center gap-2">
              {project.stack.map((tech) => (
                <span key={tech} title={techLabel(tech)} className="inline-flex">
                  <TechIcon name={tech} size={20} />
                  <span className="sr-only">{techLabel(tech)}</span>
                </span>
              ))}
            </div>
          </div>
          <Status status={project.status} tone={project.statusTone} />
        </div>

        <div className="flex items-center justify-between gap-3 border-t border-line pt-2.5">
          <Link
            to={`/projects/${project.slug}`}
            aria-label={`View the ${project.title} case study`}
            className="inline-flex items-center gap-1 text-[11px] font-medium text-subtle underline-offset-4 transition-colors hover:text-title hover:underline"
          >
            View case study
            <ArrowUpRight aria-hidden="true" className="size-3" strokeWidth={1.8} />
          </Link>
          <span className="hidden truncate text-[11px] text-subtle sm:inline">{project.kind}</span>
        </div>
      </div>
    </Reveal>
  )
}

export default function ProjectSection() {
  const allProjectsUrl = social.github.url

  return (
    <section id="projects" className="section" aria-labelledby="projects-heading">
      <Reveal>
        <SectionHeading eyebrow="Featured" title="My Projects" id="projects-heading" />
      </Reveal>

      <div className="mt-8 grid grid-cols-1 gap-x-4 gap-y-4 md:grid-cols-2">
        {projects.map((project, index) => (
          <ProjectCard
            key={project.slug}
            project={project}
            index={index}
            wide={projects.length % 2 === 1 && index === projects.length - 1}
          />
        ))}
      </div>

      <div className="mt-8 flex justify-center">
        {allProjectsUrl ? (
          <a
            href={allProjectsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="small-action"
          >
            More on GitHub
            <ArrowUpRight aria-hidden="true" className="size-3.5" strokeWidth={1.8} />
          </a>
        ) : (
          <button
            type="button"
            disabled
            title="Add your GitHub URL in src/data/site.js to enable this action"
            className="small-action"
          >
            More on GitHub
            <ArrowUpRight aria-hidden="true" className="size-3.5" strokeWidth={1.8} />
          </button>
        )}
      </div>
    </section>
  )
}
