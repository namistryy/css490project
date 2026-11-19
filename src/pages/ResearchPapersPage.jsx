import { RESEARCH_PAPERS } from '../data/researchPapers.js'

// One page per research paper: citation, download link, and the highlighted passages.
export default function ResearchPaperPage({ number }) {
  const paper = RESEARCH_PAPERS.find((p) => p.number === number)
  if (!paper) return <main className="paper" />

  return (
    <main className="paper paper-page">
      <p className="paper-page-eyebrow">Research Paper {paper.number}</p>
      <h1 className="paper-page-title">{paper.title}</h1>

      <p className="paper-page-citation">
        {paper.authors} ({paper.year}). {paper.title}. <em>{paper.venue}</em>
        {paper.details}{' '}
        <a href={paper.doi} target="_blank" rel="noreferrer">
          {paper.doi}
        </a>
      </p>

      <div className="paper-page-download">
        <a className="download-button" href={paper.download} target="_blank" rel="noreferrer">
          <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
            <path d="M8 2v8M4.5 6.5 8 10l3.5-3.5M3 13h10" fill="none" stroke="currentColor" strokeWidth="1.5" />
          </svg>
          Download PDF
        </a>
        <span className="download-note">Opens the free copy hosted by {paper.downloadHost}.</span>
      </div>

      <h2 className="sources-heading">Highlighted Passages</h2>
      <ol className="highlight-list">
        {paper.highlights.map((h, i) => (
          <li key={i}>
            <blockquote>
              <mark>{h.text}</mark>
            </blockquote>
            <span className="highlight-page">p. {h.page}</span>
          </li>
        ))}
      </ol>
    </main>
  )
}
