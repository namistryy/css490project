// Shared frame for every interactive break in the paper.
export default function Interactive({ label = 'Try it', title, caption, note, sources, children }) {
  return (
    <figure className="interactive">
      <div className="interactive-head">
        <span className="interactive-label">{label}</span>
        {note && <span className="interactive-note">{note}</span>}
      </div>
      <h4 className="interactive-title">{title}</h4>
      {caption && <p className="interactive-caption">{caption}</p>}
      <div className="interactive-body">{children}</div>
      {sources && <figcaption className="interactive-sources">{sources}</figcaption>}
    </figure>
  )
}
