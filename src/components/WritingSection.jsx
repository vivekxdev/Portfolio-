import { ArrowUpRight, FileText } from 'lucide-react'

import { articles, writingCta } from '../data/writing'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'

function ArticleRow({ article }) {
  const content = (
    <>
      <div className="min-w-0 flex-1">
        <h3 className="text-base font-medium leading-6 text-title">{article.title}</h3>

        <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-subtle">
          <FileText aria-hidden="true" className="size-3.5" strokeWidth={1.5} />
          <span className="text-[11px] font-medium">
            {article.status}
            <span className="font-normal"> · not published</span>
          </span>
          {article.date ? <span className="text-[11px]">· {article.date}</span> : null}
          {article.readTime ? <span className="text-[11px]">· {article.readTime}</span> : null}
        </div>

        <div className="mt-2 flex flex-wrap items-center gap-1.5">
          {article.tags.map((tag) => (
            <span key={tag} className="tag-pill">
              {tag}
            </span>
          ))}
        </div>
      </div>

      {article.url ? (
        <ArrowUpRight
          aria-hidden="true"
          className="size-4 shrink-0 text-subtle transition-transform group-hover/blog:-translate-y-0.5 group-hover/blog:translate-x-0.5"
          strokeWidth={1.5}
        />
      ) : null}
    </>
  )

  if (!article.url) {
    return <div className="writing-row">{content}</div>
  }

  return (
    <a
      href={article.url}
      target="_blank"
      rel="noopener noreferrer"
      className="writing-row group/blog"
    >
      {content}
      <span className="sr-only">(opens in a new tab)</span>
    </a>
  )
}

export default function WritingSection() {
  return (
    <section id="writing" className="section" aria-labelledby="writing-heading">
      <Reveal>
        <SectionHeading eyebrow="Featured" title="My Writing" id="writing-heading" />
      </Reveal>

      <Reveal className="mt-6" delay={0.04}>
        {articles.map((article) => (
          <ArticleRow key={article.id} article={article} />
        ))}
      </Reveal>

      <div className="mt-5 text-center">
        {writingCta.href ? (
          <a
            href={writingCta.href}
            target="_blank"
            rel="noopener noreferrer"
            className="small-action"
          >
            {writingCta.label}
            <ArrowUpRight aria-hidden="true" className="size-3.5" strokeWidth={1.8} />
          </a>
        ) : (
          <p className="text-[11px] text-subtle">
            These are drafts. Links will be added when an article is published.
          </p>
        )}
      </div>
    </section>
  )
}
