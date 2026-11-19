import FlowChannel from '../interactives/FlowChannel.jsx'

// DRAFT: written with AI assistance. Revise in your own words, or list it in the AI footnotes.
export default function FlowTheory() {
  return (
    <>
      <h3 id="the-flow-channel">The Flow Channel</h3>

      <p>
        Flow is a concept introduced by psychologist Mihaly Csikszentmihalyi in the mid-1970s. Chen
        (2007) describes it as "the feeling of complete and energized focus in an activity, with a
        high level of enjoyment and fulfillment" (p. 31). Players in flow lose track of time and
        outside worries, and their focus lets them perform at their best (Chen, 2007).
      </p>

      <p>
        The central idea for game design is the balance between challenge and skill. To keep a
        player in flow, "the activity must balance the inherent challenge of the activity and the
        player's ability to address and overcome it" (Chen, 2007, pp. 32–33). If the challenge is
        too far beyond the player's ability, the activity "generates anxiety," and if it fails to
        engage the player, "the player quickly loses interest and tends to leave the game" (Chen,
        2007, p. 33). Smeddinck et al. (2016) describe this balance as the most important
        precondition for flow (p. 5596). The band where challenge and skill stay matched is often
        called the flow channel, and Hunicke and Chapman (2004) frame the goal of difficulty
        adjustment as keeping the player inside it, "away from states where the game is far too
        challenging, or way too easy" (p. 2).
      </p>

      <FlowChannel />

      <p>
        The channel is not a fixed target. As players practice, their skill grows, so a game whose
        challenge stays the same will gradually drift from anxiety, through flow, and into boredom.
        Hunicke and Chapman (2004) note that "challenge and pacing must ramp to match skill, in
        order to support continued engagement" (p. 2). Players also start from different places.
        Chen (2007) observes that "no two people experience the same thing the same way," and that
        a single, static difficulty curve "might keep the typical player in the Flow but will not
        be fun for the hardcore or even the novice player" (p. 33). This is the problem dynamic
        difficulty adjustment tries to solve.
      </p>
    </>
  )
}
