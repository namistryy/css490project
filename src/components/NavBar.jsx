import { useEffect, useRef, useState } from 'react'

const RESEARCH_PAPERS = [
  { id: 'research-paper-1', label: 'Research Paper 1' },
  { id: 'research-paper-2', label: 'Research Paper 2' },
  { id: 'research-paper-3', label: 'Research Paper 3' },
]

function ResearchPapersMenu({ current }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const active = RESEARCH_PAPERS.some((p) => p.id === current)

  // Close when clicking elsewhere or pressing Escape.
  useEffect(() => {
    if (!open) return
    const onClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onClick)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onClick)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  // Close after navigating to a paper.
  useEffect(() => setOpen(false), [current])

  return (
    <li className="nav-dropdown" ref={ref}>
      <button
        type="button"
        className={active ? 'is-active' : undefined}
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpen((o) => !o)}
      >
        Research Papers
        <svg viewBox="0 0 12 12" width="10" height="10" aria-hidden="true">
          <path d="M1 3.5 L6 9 L11 3.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </button>
      {open && (
        <ul className="nav-menu">
          {RESEARCH_PAPERS.map(({ id, label }) => (
            <li key={id}>
              <a href={`#${id}`} aria-current={current === id ? 'page' : undefined}>
                {label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </li>
  )
}

export default function NavBar({ current }) {
  return (
    <nav className="navbar" aria-label="Main">
      <ul>
        <li>
          <a href="#project" aria-current={current === 'project' ? 'page' : undefined}>
            Project
          </a>
        </li>
        <li>
          <a href="#sources" aria-current={current === 'sources' ? 'page' : undefined}>
            Sources
          </a>
        </li>
        <ResearchPapersMenu current={current} />
      </ul>
    </nav>
  )
}
