export default function SectionHeading({ eyebrow, title, id }) {
  return (
    <div>
      <p className="text-sm text-subtle md:text-base">{eyebrow}</p>
      <div className="section-heading-row">
        <h2 id={id} className="section-heading-title shrink-0">
          {title}
        </h2>
        <div className="section-heading-rule" aria-hidden="true" />
      </div>
    </div>
  )
}
