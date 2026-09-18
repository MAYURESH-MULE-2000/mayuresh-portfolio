/**
 * quests.js
 * ---------------------------------------------------------------------------
 * Quests are objective lists with completion rules. Steps are ticked by effects
 * fired from dialogue and from investigating things in the world, so a quest
 * never needs code of its own.
 *
 * on completion: `grants` are applied and `setFlag` is raised, which is how the
 * world changes - NPC entry rules watch those flags.
 */
export const QUESTS = {
  'first-notes': {
    id: 'first-notes',
    name: 'First Notes',
    giver: 'shalini',
    summary: 'Sunita gave your name to the ward survey group. Walk the ward, talk to people, and write down what you actually find.',
    autoStart: true,
    steps: [
      { id: 'talk-two', text: 'Talk to two people in the ward', count: 2, counter: 'peopleMet' },
      { id: 'record-three', text: 'Record three problems in the notebook', count: 3, counter: 'problemsFound' },
    ],
    grants: { stat: { observation: 1, communication: 1 } },
    setFlag: 'notes.started',
    completionText: 'Three entries. The notebook has stopped being blank, which is the hard part.',
  },

  'road-cost': {
    id: 'road-cost',
    name: 'What the Road Costs',
    giver: 'vasant',
    summary:
      'Vasant thinks the broken patch on Main Road is a drainage failure, not a surface one. He wants to know what it costs the people who use it before he says so to anyone.',
    steps: [
      { id: 'look', text: 'Look at the broken patch properly' },
      { id: 'ask-ganesh', text: 'Ask Ganesh what it costs him' },
      { id: 'ask-sunita', text: 'Ask Sunita about carrying patients over it' },
      { id: 'ask-rekha', text: 'Ask Rekha how it reaches her shop' },
      { id: 'resolve', text: 'Take what you found back to Vasant', gatedBy: 'evidence' },
    ],
    /** When every step except `resolve` is done, this flag opens Vasant's report node. */
    evidenceFlag: 'road.evidence.ready',
    grants: { stat: { knowledge: 1, communication: 1 } },
    completionText: 'Four people, four different costs, one drain. That is a different complaint from "the road is bad".',
  },

  'daily-commute': {
    id: 'daily-commute',
    name: 'The Daily Commute',
    giver: 'farida',
    summary:
      'Farida sees the same faces at six in the morning and at nine at night. She wants the survey to carry what those two journeys actually cost, from the people making them rather than from her.',
    steps: [
      { id: 'ask-anil', text: 'Ask Anil what the journey costs him' },
      { id: 'ask-ravi', text: 'Ask Ravi how long his day runs' },
      { id: 'look-platform', text: 'Watch the platform properly' },
      { id: 'compare', text: 'Hold the commute against another problem', compare: 'commute-time' },
      { id: 'report', text: 'Take it back to Farida', gatedBy: 'evidence' },
    ],
    evidenceFlag: 'commute.evidence.ready',
    grants: { stat: { observation: 1, communication: 1 } },
    completionText:
      'Three hours a day, twelve-hour shifts, and a deposit that decides who travels. Three separate arrangements that add up to one timetable.',
  },

  nallah: {
    id: 'nallah',
    name: 'What the Nallah Carries',
    giver: 'kavita',
    summary:
      'Four households describe the same weeknight discolouration. Nobody has a sample, and without one it stays an argument. Find out what it would actually take to settle it.',
    steps: [
      { id: 'look', text: 'Look at the nallah yourself' },
      { id: 'ask-kavita', text: 'Ask Kavita what the lane has noticed' },
      { id: 'ask-sanjay', text: 'Hear the unit owner\u2019s side of it' },
      { id: 'ask-meera', text: 'Ask Dr. Iyer what would settle it' },
      { id: 'resolve', text: 'Decide what to do with it', gatedBy: 'evidence' },
    ],
    evidenceFlag: 'nallah.evidence.ready',
    grants: { stat: { knowledge: 1, resilience: 1 } },
    completionText:
      'Everyone here is honest and nobody here is right, because the one thing that would decide it has never been collected.',
  },
}

export const QUEST_LIST = Object.values(QUESTS)

export function getQuest(id) {
  return QUESTS[id] || null
}
