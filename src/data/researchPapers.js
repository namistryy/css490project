/*
  The three research papers attached to the project, with the passages
  highlighted for the course requirement. Quotes are copied exactly from
  each paper. Page numbers are the ones printed on each PDF.

  The full papers are not reproduced here: they are copyrighted, so the
  Download button links to the free copy each one is hosted at.
*/

export const RESEARCH_PAPERS = [
  {
    number: 1,
    title: 'How to Present Game Difficulty Choices? Exploring the Impact on Player Experience',
    authors: 'Smeddinck, J. D., Mandryk, R. L., Birk, M. V., Gerling, K. M., Barsilowski, D., & Malaka, R.',
    year: 2016,
    venue: 'Proceedings of the 2016 CHI Conference on Human Factors in Computing Systems',
    details: '(pp. 5595–5607). Association for Computing Machinery.',
    doi: 'https://doi.org/10.1145/2858036.2858574',
    download: 'https://figshare.com/articles/conference_contribution/How_to_present_game_difficulty_choices_Exploring_the_impact_on_player_experience/25168910',
    downloadHost: 'Figshare (authors’ submitted version)',
    highlights: [
      { page: 5595, text: 'This paper examines the impact of automatic and player-initiated difficulty adjustment on player experience through two studies.' },
      { page: 5595, text: 'Our findings suggest that most players express a preference for manual difficulty choices, but that overall game experience was not notably impacted by automated difficulty adjustments.' },
      { page: 5596, text: 'The most prominent precondition that is required if flow is to be achieved is an optimal balance of risk of failure (in games e.g., losing a move, a life, a level, or the entire game) and the chance to attain the goals (in games e.g., winning some points, a bonus, a level, or the entire game) when performing an activity [41].' },
      { page: 5596, text: 'However, DDA adoption faces challenges, because decisions that contradict the will of the players are potentially harmful to player experience' },
      { page: 5597, text: 'he develops the concept of embedded difficulty choices, which are implemented in such a manner that they blend with the actual game, so that the feeling of being in control as an autonomous actor is provided, while players remain in the magic circle [29] of the game world.' },
      { page: 5597, text: 'the major SDT dimensions of competence and autonomy needs satisfaction can be interpreted as provisions for flow experiences, mapping in particular to balance of challenge and skills and the sense of potential and control.' },
      { page: 5600, text: 'There was a significant difference on the PENS autonomy dimension (F(2,76) = 5.01, p = .009, gen. η2 = .02 [4], Mauchly not sig.) with post-hoc pairwise comparisons confirming a sig. diff. between embedded and auto (p = .02).' },
      { page: 5602, text: 'with post-hoc pairwise comparisons confirming a sig. diff. between menu and auto (p = .047).' },
      { page: 5604, text: 'In the interviews, many players expressed that they prefer the presence of manual difficulty choices in games, yet our participants were more likely to be positive about DDA than to be negative about it and did not remark negatively on the presence of DDA.' },
      { page: 5604, text: 'Our findings suggest that the game difficulty choice interaction mode in casual games might play a minor role compared to other game design choices.' },
    ],
  },
  {
    number: 2,
    title: 'AI for Dynamic Difficulty Adjustment in Games',
    authors: 'Hunicke, R., & Chapman, V.',
    year: 2004,
    venue: 'Challenges in game artificial intelligence: Papers from the 2004 AAAI Workshop',
    details: '(Technical Report WS-04-04, pp. 91–96). AAAI Press.',
    doi: 'https://aaai.org/proceeding/ws04-04/',
    download: 'https://users.cs.northwestern.edu/~hunicke/pubs/Hamlet.pdf',
    downloadHost: 'Northwestern University (author’s site)',
    highlights: [
      { page: 1, text: 'Video Games are boring when they are too easy and frustrating when they are too hard.' },
      { page: 1, text: 'Ultimately, DDA systems take control away from the designer and put it in the hands of code, which has obvious drawbacks.' },
      { page: 2, text: 'Basically, we are trying to predict when the player is “flailing” – repeatedly edging towards a state where her current means can no longer accomplish necessary and immediate ends.' },
      { page: 2, text: 'One common approach to player investment is the flow model developed by M. Csikszentmihalyi. Here our goal is to keep the player in the flow channel – away from states where the game is far too challenging, or way too easy.' },
      { page: 3, text: 'We want the system to support the player – without eliminating negative feedback and making everything very easy and predictable' },
      { page: 4, text: 'Reactive changes run the risk of disrupting the player’s sense of disbelief.' },
      { page: 4, text: 'Proactive changes, because they happen “in the wings”, are less likely to interrupt the player’s suspension of disbelief.' },
      { page: 5, text: 'Much like a benevolent babysitter, it intervenes frequently, but leaves room for mistakes.' },
      { page: 5, text: 'This policy is much more like an aggressive drill sergeant or boxing coach.' },
      { page: 6, text: 'In the meantime, we plan to evaluate a broad sample of users interacting with the Hamlet system.' },
    ],
  },
  {
    number: 3,
    title: 'The Motivational Pull of Video Games: A Self-Determination Theory Approach',
    authors: 'Ryan, R. M., Rigby, C. S., & Przybylski, A.',
    year: 2006,
    venue: 'Motivation and Emotion, 30',
    details: '(4), 344–360.',
    doi: 'https://doi.org/10.1007/s11031-006-9051-8',
    download: 'https://www.rochester.edu/warner/lida/wp-content/uploads/2022/11/02bfe513dd59366750000000.pdf',
    downloadHost: 'University of Rochester',
    highlights: [
      { page: 347, text: 'Studies 1–3 examine individuals playing 1, 2 and 4 games, respectively and show that perceived in-game autonomy and competence are associated with game enjoyment, preferences, and changes in well-being pre- to post-play.' },
      { page: 349, text: 'Autonomy within SDT concerns a sense of volition or willingness when doing a task (Deci & Ryan, 1980; 2000).' },
      { page: 349, text: 'Conversely, events or conditions that diminish a sense of choice, control or freedom for either the means or ends of action interfere with perceived autonomy, and can undermine intrinsic motivation (Deci, Koestner, & Ryan, 1999).' },
      { page: 349, text: 'Perceived competence would thus be enhanced in gaming contexts where game controls are intuitive and readily mastered, and tasks within the game provide ongoing optimal challenges and opportunities for positive feedback.' },
      { page: 350, text: 'perceived competence is among the most important satisfactions provided by games, as they represent arenas in which a person can feel accomplishment and control.' },
      { page: 361, text: 'People who experienced autonomy and competence in playing showed more positive outcomes, helping again to explain why, for some people, games may provide a source of pleasure and perhaps restoration.' },
    ],
  },
]
