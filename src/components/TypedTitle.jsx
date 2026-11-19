import { useEffect, useRef, useState } from 'react'

const CHAR_DELAY = 18 // ms per character

/*
  Types the title out character by character. It replays:
  - every time the page mounts (first visit, or navigating back to it)
  - every time the title scrolls out of view and comes back into view

  The untyped part of the text stays in place but invisible, so the line
  breaks never shift while typing. Screen readers get the full title at once.
*/
export default function TypedTitle({ text, className }) {
  const ref = useRef(null)
  const [count, setCount] = useState(0)
  const [run, setRun] = useState(0) // bump to restart typing

  // Restart when the title comes back into view after leaving it.
  useEffect(() => {
    const el = ref.current
    if (!el) return
    let wasHidden = false
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) {
        wasHidden = true
      } else if (wasHidden) {
        wasHidden = false
        setRun((r) => r + 1)
      }
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  // Type the text out.
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setCount(text.length)
      return
    }
    setCount(0)
    let i = 0
    const timer = setInterval(() => {
      i += 1
      setCount(i)
      if (i >= text.length) clearInterval(timer)
    }, CHAR_DELAY)
    return () => clearInterval(timer)
  }, [text, run])

  const typing = count < text.length

  return (
    <h1 ref={ref} className={className} aria-label={text}>
      <span aria-hidden="true">
        {text.slice(0, count)}
        <span className={`typed-caret${typing ? '' : ' is-done'}`} />
        <span className="typed-rest">{text.slice(count)}</span>
      </span>
    </h1>
  )
}
