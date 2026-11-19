import { useEffect, useRef, useState } from 'react'

const ARROW_SIZE = 22
const NARROW = '(max-width: 700px)'

/*
  One section of the paper: a narrow heading column on the left, a thin
  white line to its right, and the content filling the rest of the screen.

  Wide screens: the arrow sits level with the section heading. The heading
  is sticky, so as the reader scrolls, the heading and arrow travel down
  the line together until the section ends.

  Narrow screens: the heading sits above the content, so the arrow starts
  at the top of the line and tracks how far the reader is through the section.
*/
export default function Section({ id, title, subsections = [], children }) {
  const sectionRef = useRef(null)
  const railRef = useRef(null)
  const headingRef = useRef(null)
  const [arrowTop, setArrowTop] = useState(0)

  useEffect(() => {
    let frame = 0
    const narrow = window.matchMedia(NARROW)

    const update = () => {
      frame = 0
      const rail = railRef.current
      const heading = headingRef.current
      if (!rail || !heading) return
      const railRect = rail.getBoundingClientRect()
      const maxTop = Math.max(0, railRect.height - ARROW_SIZE)

      let top
      if (narrow.matches) {
        const p = (window.innerHeight / 2 - railRect.top) / railRect.height
        top = Math.min(1, Math.max(0, p)) * maxTop
      } else {
        // Center the arrow on the heading's first line of text.
        const headingRect = heading.getBoundingClientRect()
        const lineHeight = parseFloat(getComputedStyle(heading).lineHeight) || headingRect.height
        top = headingRect.top - railRect.top + (lineHeight - ARROW_SIZE) / 2
      }
      setArrowTop(Math.min(maxTop, Math.max(0, top)))
    }

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    narrow.addEventListener('change', schedule)
    const observer = new ResizeObserver(schedule)
    if (sectionRef.current) observer.observe(sectionRef.current)

    return () => {
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      narrow.removeEventListener('change', schedule)
      observer.disconnect()
      cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <section id={id} ref={sectionRef} className="section" aria-labelledby={`${id}-heading`}>
      <div className="section-heading">
        <div className="section-heading-inner">
          <h2 id={`${id}-heading`} ref={headingRef}>{title}</h2>
          {subsections.length > 0 && (
            <ul className="subsection-list">
              {subsections.map((sub) => (
                <li key={sub}>{sub}</li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="section-rail" ref={railRef} aria-hidden="true">
        <span className="rail-line" />
        <span className="rail-arrow" style={{ top: `${arrowTop}px` }}>
          <svg viewBox="0 0 12 12" width="12" height="12">
            <path d="M1 3.5 L6 9 L11 3.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </span>
      </div>

      <div className="section-body">{children}</div>
    </section>
  )
}
