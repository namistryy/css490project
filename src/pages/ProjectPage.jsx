import Section from '../components/Section.jsx'
import TypedTitle from '../components/TypedTitle.jsx'
import Introduction from '../sections/Introduction.jsx'
import FlowTheory from '../sections/FlowTheory.jsx'

// Sections in reading order. Add a Content component to fill a section.
const SECTIONS = [
  { id: 'introduction', title: 'Introduction', Content: Introduction },
  {
    id: 'flow-theory',
    title: 'Flow Theory',
    subsections: ['The Flow Channel', 'The Conditions For Flow'],
    Content: FlowTheory,
  },
]

export default function ProjectPage() {
  return (
    <main className="paper">
      <header className="title-page">
        <TypedTitle
          className="paper-title"
          text="Balancing Challenge and Skill: Flow Theory as the Foundation for Dynamic Difficulty Adjustment in Games"
        />

        {/* APA student title page elements, in APA order */}
        <ul className="title-details">
          <li>Nandini Mistry</li>
          <li>University of Washington - Bothell</li>
          <li>CSS 490: Special Topics in Computing and Software Systems</li>
          <li>William Erdly</li>
          <li>December 15th, 2026</li>
        </ul>
      </header>

      {SECTIONS.map(({ id, title, subsections, Content }) => (
        <Section key={id} id={id} title={title} subsections={subsections}>
          {Content && <Content />}
        </Section>
      ))}
    </main>
  )
}
