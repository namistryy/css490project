import { useEffect, useState } from 'react'
import NavBar from './components/NavBar.jsx'
import ProjectPage from './pages/ProjectPage.jsx'
import SourcesPage from './pages/SourcesPage.jsx'
import ResearchPaperPage from './pages/ResearchPapersPage.jsx'

// Simple hash routing: #project (default), #sources, #research-paper-1 to 3.
const PAGES = {
  project: ProjectPage,
  sources: SourcesPage,
  'research-paper-1': () => <ResearchPaperPage number={1} />,
  'research-paper-2': () => <ResearchPaperPage number={2} />,
  'research-paper-3': () => <ResearchPaperPage number={3} />,
}

function currentPage() {
  const hash = window.location.hash.replace('#', '')
  return PAGES[hash] ? hash : 'project'
}

export default function App() {
  const [page, setPage] = useState(currentPage)

  useEffect(() => {
    const onHashChange = () => {
      setPage(currentPage())
      window.scrollTo(0, 0)
    }
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  const Page = PAGES[page]
  return (
    <>
      <NavBar current={page} />
      <Page />
    </>
  )
}
