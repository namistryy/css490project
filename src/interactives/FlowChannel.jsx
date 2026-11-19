import { useEffect, useRef, useState } from 'react'
import Interactive from '../components/Interactive.jsx'

// Chart geometry (SVG units)
const W = 320
const H = 320
const PAD = { left: 40, top: 12, right: 12, bottom: 36 }
const PW = W - PAD.left - PAD.right
const PH = H - PAD.top - PAD.bottom
const sx = (v) => PAD.left + (v / 10) * PW
const sy = (v) => PAD.top + PH - (v / 10) * PH

// How far challenge can sit from skill and still count as flow (illustrative).
const BAND = 1.5

const ZONES = {
  anxiety: { label: 'Anxiety', text: 'The challenge is well above the player’s skill.' },
  flow: { label: 'Flow', text: 'Challenge and skill are balanced.' },
  boredom: { label: 'Boredom', text: 'The player’s skill is well above the challenge.' },
}

function zoneFor(skill, challenge) {
  if (challenge - skill > BAND) return 'anxiety'
  if (skill - challenge > BAND) return 'boredom'
  return 'flow'
}

export default function FlowChannel() {
  const [skill, setSkill] = useState(5)
  const [challenge, setChallenge] = useState(5)
  const [trail, setTrail] = useState([])
  const [replay, setReplay] = useState(null) // 'fixed' | 'dda' | null
  const frame = useRef(0)

  // Replay a session where the player's skill grows from 2 to 9.
  useEffect(() => {
    if (!replay) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const duration = reduce ? 1 : 3500
    const start = performance.now()
    const points = []
    const step = (now) => {
      const k = Math.min(1, (now - start) / duration)
      const s = 2 + 7 * k
      // Fixed difficulty stays put; DDA follows the player's skill with a little lag.
      const c = replay === 'fixed' ? 3.5 : Math.min(10, s + 0.6 * Math.sin(k * 9))
      points.push([s, c])
      setSkill(s)
      setChallenge(c)
      setTrail([...points])
      if (k < 1) frame.current = requestAnimationFrame(step)
      else setReplay(null)
    }
    frame.current = requestAnimationFrame(step)
    return () => cancelAnimationFrame(frame.current)
  }, [replay])

  const zone = zoneFor(skill, challenge)

  const onSlide = (setter) => (e) => {
    setReplay(null)
    setTrail([])
    setter(Number(e.target.value))
  }

  return (
    <Interactive
      title="Find the flow channel"
      caption="Move the sliders to place a player on the chart. Then replay a session where the player gets better over time, once with fixed difficulty and once with the game adjusting."
      note="Illustration of the concept"
      sources="Based on Chen (2007, pp. 32–33), Hunicke and Chapman (2004, p. 2), and Smeddinck et al. (2016, p. 5596). The width of the channel is illustrative."
    >
      <div className="fc">
        <svg className="fc-chart" viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`Flow channel chart. Skill ${skill.toFixed(1)}, challenge ${challenge.toFixed(1)}: ${ZONES[zone].label}.`}>
          {/* Zones */}
          <polygon className="fc-anxiety" points={`${sx(0)},${sy(BAND)} ${sx(0)},${sy(10)} ${sx(10 - BAND)},${sy(10)}`} />
          <polygon className="fc-boredom" points={`${sx(BAND)},${sy(0)} ${sx(10)},${sy(0)} ${sx(10)},${sy(10 - BAND)}`} />
          <polygon
            className="fc-flow"
            points={`${sx(0)},${sy(0)} ${sx(0)},${sy(BAND)} ${sx(10 - BAND)},${sy(10)} ${sx(10)},${sy(10)} ${sx(10)},${sy(10 - BAND)} ${sx(BAND)},${sy(0)}`}
          />

          {/* Axes */}
          <line className="fc-axis" x1={sx(0)} y1={sy(0)} x2={sx(10)} y2={sy(0)} />
          <line className="fc-axis" x1={sx(0)} y1={sy(0)} x2={sx(0)} y2={sy(10)} />
          <text className="fc-axis-label" x={sx(5)} y={H - 10} textAnchor="middle">Skill →</text>
          <text className="fc-axis-label" x={14} y={sy(5)} textAnchor="middle" transform={`rotate(-90 14 ${sy(5)})`}>Challenge →</text>

          {/* Zone labels */}
          <text className="fc-zone-label is-anxiety" x={sx(1)} y={sy(8.7)}>Anxiety</text>
          <text className="fc-zone-label is-boredom" x={sx(6.7)} y={sy(1)}>Boredom</text>
          <text className="fc-zone-label is-flow" x={sx(6.1)} y={sy(7.3)} transform={`rotate(-45 ${sx(6.1)} ${sy(7.3)})`}>Flow channel</text>

          {/* Replay path */}
          {trail.length > 1 && (
            <polyline className="fc-trail" points={trail.map(([s, c]) => `${sx(s)},${sy(c)}`).join(' ')} />
          )}

          {/* Player */}
          <circle className="fc-player" cx={sx(skill)} cy={sy(challenge)} r="8" />
        </svg>

        <div className="fc-controls">
          <label className="fc-slider" htmlFor="fc-skill">
            <span>Player skill</span>
            <output>{skill.toFixed(1)}</output>
          </label>
          <input id="fc-skill" type="range" min="0" max="10" step="0.1" value={skill} onChange={onSlide(setSkill)} />

          <label className="fc-slider" htmlFor="fc-challenge">
            <span>Game challenge</span>
            <output>{challenge.toFixed(1)}</output>
          </label>
          <input id="fc-challenge" type="range" min="0" max="10" step="0.1" value={challenge} onChange={onSlide(setChallenge)} />

          <div className={`fc-state is-${zone}`} aria-live="polite">
            <strong>{ZONES[zone].label}.</strong> {ZONES[zone].text}
          </div>

          <div className="fc-buttons">
            <button type="button" onClick={() => setReplay('fixed')} aria-pressed={replay === 'fixed'}>
              Replay: fixed difficulty
            </button>
            <button type="button" onClick={() => setReplay('dda')} aria-pressed={replay === 'dda'}>
              Replay: with DDA
            </button>
          </div>
        </div>
      </div>
    </Interactive>
  )
}
