import Section from '../components/Section.jsx'
import Introduction from '../sections/Introduction.jsx'
import FlowTheory from '../sections/FlowTheory.jsx'

// Sections in reading order. Add a Content component to fill a section.
// An entry with `part` is a larger subtitle heading that groups the sections after it.
const SECTIONS = [
  { id: 'introduction', title: 'Introduction', Content: Introduction },
  {
    id: 'flow-theory',
    title: 'Flow Theory',
    subsections: ['The Flow Channel', 'The Conditions For Flow'],
    Content: FlowTheory,
  },
  { id: 'motivation', title: 'Motivation' },
  { part: 'Three Approaches to Dynamic Difficulty Adjustment', id: 'approaches' },
  { id: 'hidden-adjustment', title: 'Hidden Adjustment' },
  { id: 'explicit-settings', title: 'Explicit Settings' },
  { id: 'embedded-choice', title: 'Embedded Choice' },
  { part: 'Discussion', id: 'discussion' },
  { id: 'what-evidence-shows', title: 'What Evidence Shows' },
  { id: 'trade-offs', title: 'Trade-offs' },
  { id: 'conclusions', title: 'Conclusions' },
]

export default function ProjectPage() {
  return (
    <main className="paper">
      <header className="title-page">
        {/* Typing animation (TypedTitle) turned off for now */}
        <h1 className="paper-title">
          Balancing Challenge and Skill: Flow Theory as the Foundation for Dynamic Difficulty
          Adjustment in Games
        </h1>

        {/* APA student title page elements, in APA order */}
        <ul className="title-details">
          <li>Nandini Mistry</li>
          <li>University of Washington - Bothell</li>
          <li>CSS 490: Special Topics in Computing and Software Systems</li>
          <li>William Erdly</li>
          <li>December 15th, 2026</li>
        </ul>
      </header>

      {SECTIONS.map(({ id, part, title, subsections, Content }) =>
        part ? (
          <h2 key={id} id={id} className="part-title">
            {part}
          </h2>
        ) : (
          <Section key={id} id={id} title={title} subsections={subsections}>
            {Content && <Content />}
          </Section>
        ),
      )}
    </main>
  )
}
