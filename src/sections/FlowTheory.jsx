import FlowChannel from '../interactives/FlowChannel.jsx'
import BreakTheFlow from '../interactives/BreakTheFlow.jsx'

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

      <h3 id="the-conditions-for-flow">The Conditions For Flow</h3>

      <p>
        Balancing challenge and skill is necessary, but it is not the only condition for flow.
        Smeddinck et al. (2016) list the full set of prerequisites as "clear goals, immediate
        feedback, match of challenges and skills, action and awareness merge, concentration on the
        task at hand, sense of potential and control, loss of self-consciousness, sense of time
        altered" (p. 5596). Chen (2007) identifies the same eight components, while noting that
        "not all of them are needed" for an activity to produce flow (p. 32).
      </p>

      <p>
        Games are well suited to meeting these conditions. According to Chen (2007), most video
        games "deliver instantaneous, accessible sensory feedback and offer clear goals the player
        accomplishes through the mastery of specific gameplay skills" (p. 32). When one of these
        conditions is removed, however, the experience can fall apart even if the difficulty is
        well tuned.
      </p>

      <BreakTheFlow />

      <p>
        This matters for dynamic difficulty adjustment because DDA only addresses one condition:
        the match between challenge and skill. Goals, feedback, and concentration depend on the
        rest of the game's design. The way difficulty is adjusted can also work against the other
        conditions. Chen (2007) warns that asking players to make frequent choices can interrupt
        gameplay, and that this would "confound the fundamental components of Flow—a sense of
        control and concentration on the task at hand" (p. 33). Each approach to DDA therefore has
        to be judged on two questions: whether it keeps challenge matched to skill, and whether it
        does so without disrupting the player's sense of control and concentration.
      </p>
    </>
  )
}
