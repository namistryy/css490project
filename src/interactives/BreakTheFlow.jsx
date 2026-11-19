import { useEffect, useRef, useState } from 'react'
import Interactive from '../components/Interactive.jsx'

/*
  "Break the flow": a looping target-clicking task. Each toggle switches one
  condition for flow on or off, so the reader can feel the experience fall
  apart. Only one condition (challenge matching skill) is something DDA adjusts.
*/

const CONDITIONS = [
  { key: 'goals', name: 'Clear goals', off: 'No goal is shown, so there is nothing to aim for.' },
  { key: 'feedback', name: 'Immediate feedback', off: 'Hits and misses show nothing, and the score disappears.' },
  { key: 'balance', name: 'Challenge matches skill', off: 'The target moves far too fast for most players.', dda: true },
  { key: 'concentration', name: 'Concentration on the task', off: 'Pop-ups and moving shapes compete for attention.' },
  { key: 'control', name: 'Sense of control', off: 'Clicks register late, so the game ignores what you meant.' },
]

const GOAL = 10
const RADIUS = 22
const INPUT_LAG = 350 // ms, when control is off

const cssVar = (name) => getComputedStyle(document.documentElement).getPropertyValue(name).trim()

export default function BreakTheFlow() {
  const [on, setOn] = useState({ goals: true, feedback: true, balance: true, concentration: true, control: true })
  const [hud, setHud] = useState({ hits: 0, misses: 0, progress: 0, completed: 0 })
  const [running, setRunning] = useState(false)

  const canvasRef = useRef(null)
  const wrapRef = useRef(null)
  const onRef = useRef(on)
  const game = useRef(null)

  useEffect(() => {
    onRef.current = on
  }, [on])

  // Game loop
  useEffect(() => {
    if (!running) return
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let w = 0
    let h = 0
    let raf = 0
    let last = performance.now()
    const colors = {
      target: cssVar('--flow'),
      white: cssVar('--white'),
      muted: cssVar('--muted'),
      warn: cssVar('--frustrated'),
      blue: cssVar('--bored'),
    }

    // Keep score and difficulty when resuming after a pause.
    const prev = game.current
    const g = (game.current = {
      target: null,
      speed: prev?.speed ?? 140,
      recent: [],
      effects: [],
      distractors: [],
      banner: 0,
      hits: prev?.hits ?? 0,
      misses: prev?.misses ?? 0,
      progress: prev?.progress ?? 0,
      completed: prev?.completed ?? 0,
      goalFlash: 0,
    })

    const resize = () => {
      const r = canvas.getBoundingClientRect()
      const dpr = window.devicePixelRatio || 1
      w = r.width
      h = r.height
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    const newTarget = () => {
      const a = Math.random() * Math.PI * 2
      g.target = {
        x: RADIUS + Math.random() * (w - 2 * RADIUS),
        y: RADIUS + Math.random() * (h - 2 * RADIUS),
        vx: Math.cos(a),
        vy: Math.sin(a),
      }
    }
    newTarget()
    for (let i = 0; i < 4; i++) {
      g.distractors.push({ x: Math.random() * w, y: Math.random() * h, vx: (Math.random() - 0.5) * 160, vy: (Math.random() - 0.5) * 160, s: 18 + Math.random() * 26, c: i % 2 ? colors.warn : colors.blue })
    }

    const syncHud = () => setHud({ hits: g.hits, misses: g.misses, progress: g.progress, completed: g.completed })

    const resolveClick = (x, y) => {
      const t = g.target
      const hit = Math.hypot(x - t.x, y - t.y) <= RADIUS
      if (hit) {
        g.hits++
        g.progress++
        g.effects.push({ x: t.x, y: t.y, t: 0, kind: 'hit' })
        if (g.progress >= GOAL) {
          g.progress = 0
          g.completed++
          g.goalFlash = 1.2
        }
        newTarget()
      } else {
        g.misses++
        g.effects.push({ x, y, t: 0, kind: 'miss' })
      }
      // Dynamic adjustment: only active when "challenge matches skill" is on.
      g.recent.push(hit ? 1 : 0)
      if (g.recent.length >= 5) {
        const rate = g.recent.reduce((a, b) => a + b, 0) / g.recent.length
        g.recent = []
        if (rate >= 0.8) g.speed = Math.min(380, g.speed * 1.2)
        else if (rate <= 0.4) g.speed = Math.max(70, g.speed * 0.8)
      }
      syncHud()
    }

    const onPointer = (e) => {
      const r = canvas.getBoundingClientRect()
      const x = e.clientX - r.left
      const y = e.clientY - r.top
      if (onRef.current.control) resolveClick(x, y)
      else setTimeout(() => resolveClick(x, y), INPUT_LAG)
    }
    canvas.addEventListener('pointerdown', onPointer)

    const draw = (dt) => {
      const c = onRef.current
      ctx.clearRect(0, 0, w, h)

      // Move target. Without balance, it moves far too fast.
      const t = g.target
      const v = c.balance ? g.speed : 620
      t.x += t.vx * v * dt
      t.y += t.vy * v * dt
      if (t.x < RADIUS || t.x > w - RADIUS) { t.vx *= -1; t.x = Math.max(RADIUS, Math.min(w - RADIUS, t.x)) }
      if (t.y < RADIUS || t.y > h - RADIUS) { t.vy *= -1; t.y = Math.max(RADIUS, Math.min(h - RADIUS, t.y)) }

      // Distractions
      if (!c.concentration) {
        for (const d of g.distractors) {
          d.x = (d.x + d.vx * dt + w) % w
          d.y = (d.y + d.vy * dt + h) % h
          ctx.globalAlpha = 0.55
          ctx.fillStyle = d.c
          ctx.fillRect(d.x, d.y, d.s, d.s)
        }
        ctx.globalAlpha = 1
        g.banner = (g.banner + dt) % 3
        if (g.banner < 1.4) {
          ctx.fillStyle = colors.warn
          ctx.fillRect(w / 2 - 110, 12, 220, 34)
          ctx.fillStyle = '#000'
          ctx.font = '600 13px Poppins, sans-serif'
          ctx.textAlign = 'center'
          ctx.fillText('New message! Tap to read', w / 2, 34)
        }
      }

      // Target
      ctx.beginPath()
      ctx.arc(t.x, t.y, RADIUS, 0, Math.PI * 2)
      ctx.fillStyle = colors.target
      ctx.fill()
      ctx.beginPath()
      ctx.arc(t.x, t.y, RADIUS * 0.45, 0, Math.PI * 2)
      ctx.fillStyle = '#0b0b0b'
      ctx.fill()

      // Feedback effects
      g.effects = g.effects.filter((e) => (e.t += dt) < 0.5)
      if (c.feedback) {
        for (const e of g.effects) {
          const k = e.t / 0.5
          ctx.globalAlpha = 1 - k
          if (e.kind === 'hit') {
            ctx.beginPath()
            ctx.arc(e.x, e.y, RADIUS + k * 26, 0, Math.PI * 2)
            ctx.strokeStyle = colors.white
            ctx.lineWidth = 2
            ctx.stroke()
            ctx.fillStyle = colors.white
            ctx.font = '600 14px Poppins, sans-serif'
            ctx.textAlign = 'center'
            ctx.fillText('+1', e.x, e.y - RADIUS - 8 - k * 14)
          } else {
            ctx.strokeStyle = colors.muted
            ctx.lineWidth = 2
            ctx.beginPath()
            ctx.moveTo(e.x - 6, e.y - 6); ctx.lineTo(e.x + 6, e.y + 6)
            ctx.moveTo(e.x + 6, e.y - 6); ctx.lineTo(e.x - 6, e.y + 6)
            ctx.stroke()
          }
          ctx.globalAlpha = 1
        }
      }

      // Goal complete message
      if (g.goalFlash > 0) {
        g.goalFlash -= dt
        if (c.goals && c.feedback) {
          ctx.fillStyle = colors.white
          ctx.font = '600 18px Poppins, sans-serif'
          ctx.textAlign = 'center'
          ctx.fillText('Goal complete!', w / 2, h - 20)
        }
      }
    }

    const loop = (now) => {
      const dt = Math.min(0.05, (now - last) / 1000)
      last = now
      draw(dt)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    // Pause when scrolled out of view.
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) setRunning(false)
    })
    io.observe(canvas)

    return () => {
      cancelAnimationFrame(raf)
      canvas.removeEventListener('pointerdown', onPointer)
      ro.disconnect()
      io.disconnect()
    }
  }, [running])

  const toggle = (key) => setOn((prev) => ({ ...prev, [key]: !prev[key] }))
  const count = Object.values(on).filter(Boolean).length

  return (
    <Interactive
      title="Break the flow"
      caption="Click the moving target. While you play, switch the conditions for flow off one at a time and notice how the experience changes. Only one of them is something difficulty adjustment can fix."
      note="Illustration of the concept"
      sources="Conditions from Smeddinck et al. (2016, p. 5596) and Chen (2007, pp. 31–32). The task and its settings are illustrative."
    >
      <div className="btf">
        <div className="btf-play" ref={wrapRef}>
          <div className="btf-hud" aria-live="polite">
            {on.goals ? <span>Goal: hit {GOAL} targets</span> : <span className="btf-hud-off">No goal</span>}
            {on.feedback ? (
              <span>
                {on.goals && <>Progress {hud.progress}/{GOAL} · </>}Hits {hud.hits} · Misses {hud.misses}
              </span>
            ) : (
              <span className="btf-hud-off">Score hidden</span>
            )}
          </div>
          <div className="btf-canvas-wrap">
            <canvas ref={canvasRef} className="btf-canvas" aria-label="Moving target to click" />
            {!running && (
              <div className="btf-overlay">
                <button type="button" onClick={() => setRunning(true)}>
                  {hud.hits + hud.misses > 0 ? 'Resume' : 'Start'}
                </button>
              </div>
            )}
          </div>
        </div>

        <fieldset className="btf-toggles">
          <legend>
            Conditions for flow · <span className="btf-count">{count} of 5 on</span>
          </legend>
          {CONDITIONS.map((c) => (
            <label key={c.key} className={`btf-toggle${on[c.key] ? '' : ' is-off'}`} htmlFor={`btf-${c.key}`}>
              <input id={`btf-${c.key}`} type="checkbox" checked={on[c.key]} onChange={() => toggle(c.key)} />
              <span className="btf-switch" aria-hidden="true" />
              <span className="btf-text">
                <span className="btf-name">
                  {c.name}
                  {c.dda && <span className="btf-badge">What DDA adjusts</span>}
                </span>
                {!on[c.key] && <span className="btf-off">{c.off}</span>}
              </span>
            </label>
          ))}
        </fieldset>
      </div>
    </Interactive>
  )
}
