// APA 7 reference list: alphabetical by first author, hanging indent, double-spaced.
function Link({ href }) {
  return (
    <a href={href} target="_blank" rel="noreferrer">
      {href}
    </a>
  )
}

export default function SourcesPage() {
  return (
    <main className="paper sources-page">
      <p className="sources-note">
        This webpage is adapted concept of what was originally a research paper. It follows APA
        Format guidelines as closely as possible.
      </p>

      <h2 className="sources-heading">Works Cited</h2>

      <ul className="reference-list">
        <li>
          Chen, J. (2007). Flow in games (and everything else). <em>Communications of the ACM, 50</em>
          (4), 31–34. <Link href="https://doi.org/10.1145/1232743.1232769" />
        </li>

        <li>
          Game Developer Staff. (2018, January 25).{' '}
          <em>
            Check out <span className="roman">Celeste</span>&rsquo;s remarkably granular
            &lsquo;Assist&rsquo; options
          </em>
          . Game Developer.{' '}
          <Link href="https://gamedeveloper.com/design/check-out-i-celeste-s-i-remarkably-granular-assist-options" />
        </li>

        <li>
          Hunicke, R., &amp; Chapman, V. (2004). AI for dynamic difficulty adjustment in games. In{' '}
          <em>Challenges in game artificial intelligence: Papers from the 2004 AAAI Workshop</em>{' '}
          (Technical Report WS-04-04, pp. 91–96). AAAI Press.{' '}
          <Link href="https://aaai.org/proceeding/ws04-04/" />
        </li>

        <li>
          Ryan, R. M., Rigby, C. S., &amp; Przybylski, A. (2006). The motivational pull of video
          games: A self-determination theory approach. <em>Motivation and Emotion, 30</em>(4),
          344–360. <Link href="https://doi.org/10.1007/s11031-006-9051-8" />
        </li>

        <li>
          Smeddinck, J. D., Mandryk, R. L., Birk, M. V., Gerling, K. M., Barsilowski, D., &amp;
          Malaka, R. (2016). How to present game difficulty choices? Exploring the impact on player
          experience. In{' '}
          <em>Proceedings of the 2016 CHI Conference on Human Factors in Computing Systems</em> (pp.
          5595–5607). Association for Computing Machinery.{' '}
          <Link href="https://doi.org/10.1145/2858036.2858574" />
        </li>

        <li>
          Venturelli, M. (2016, June 24). <em>Difficulty levels and why you should never use them</em>
          . Game Developer.{' '}
          <Link href="https://gamedeveloper.com/design/difficulty-levels-and-why-you-should-never-use-them" />
        </li>
      </ul>
    </main>
  )
}
