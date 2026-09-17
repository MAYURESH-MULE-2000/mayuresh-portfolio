/**
 * problems.js
 * ---------------------------------------------------------------------------
 * The problem database. Nothing here is hard-coded anywhere else in the game:
 * encounters, the comparison screen, the journal and the connection map all
 * read these objects. Adding a problem is a matter of adding an entry.
 *
 * Writing rules this file follows, deliberately:
 *  - No invented statistics. Numbers only appear when a character is talking
 *    about their own money or their own hours, and are labelled as their
 *    account.
 *  - Impact scores are the game's model of a situation, not a measurement.
 *    They exist so that two problems can be compared on several axes at once
 *    and come out differently on each - never so one can "win".
 *  - Perspectives disagree on purpose. Where people in the town disagree, both
 *    readings are written as strongly as each other.
 *
 * impacts: 0-100 on five axes.
 *   financial - money in and out
 *   emotional - what it does to the person carrying it
 *   social    - relationships, standing, isolation
 *   time      - hours it takes out of a life
 *   longTerm  - how much it shapes the years ahead
 */

export const PROBLEMS = {
  'job-insecurity': {
    id: 'job-insecurity',
    name: 'Work without a floor',
    short: 'Job insecurity',
    category: 'Economic',
    summary: 'Work that exists day by day, with earnings that move and no cushion under them.',
    description:
      'There is work. What there is not is a floor: no fixed monthly figure, nothing that holds if a week goes badly, and no way to plan past the next few days.',
    impacts: { financial: 82, emotional: 74, social: 48, time: 78, longTerm: 80 },
    affectedGroups: ['Delivery and platform riders', 'Daily-wage workers', 'Households with one earner'],
    causes: [
      'Work paid per task rather than per month',
      'Costs the worker carries themselves - fuel, phone, repairs',
      'No savings to absorb a bad week',
    ],
    consequences: [
      'Income cannot be planned against, only reacted to',
      'Small shocks - an illness, a breakdown - become large ones',
      'Long hours become the only lever the worker controls',
    ],
    connections: ['cost-of-living', 'debt', 'healthcare-access'],
    perspectives: [
      {
        speaker: 'Imran Shaikh',
        role: 'Delivery rider, 27',
        stance: 'lived',
        text: 'Good week, bad week, same effort. That is the part nobody explains to you when you start.',
      },
      {
        speaker: 'Rekha Sawant',
        role: 'Shopkeeper, 41',
        stance: 'lived',
        text: 'He is not idle. He is on that bike from morning. I see him. But "working hard" and "earning steadily" are two different things now.',
      },
      {
        speaker: 'Vasant Pawar',
        role: 'Retired clerk, 58',
        stance: 'opinion',
        text: 'My job was dull and it was slow. It also paid on the first of every month for thirty-one years. I am not sure the trade was worth it for them.',
      },
    ],
    notes: [
      { kind: 'account', text: 'Imran says his earnings swing week to week, and that fuel and phone costs come out of his own pocket.' },
      { kind: 'contested', text: 'Whether this kind of work is freedom or exposure is argued about in the town. Imran calls it both, on different days.' },
    ],
  },

  'cost-of-living': {
    id: 'cost-of-living',
    name: 'The price of an ordinary month',
    short: 'Cost of living',
    category: 'Economic',
    summary: 'Prices that move faster than what people are paid, felt first at the smallest shop.',
    description:
      'Nobody in Shivnagar experiences this as a number. They experience it as a smaller packet for the same coin, and as a notebook of credit that keeps getting longer.',
    impacts: { financial: 88, emotional: 58, social: 62, time: 30, longTerm: 70 },
    affectedGroups: ['Households on fixed incomes', 'Pensioners', 'Small shopkeepers carrying credit'],
    causes: [
      'Household earnings that do not move when prices do',
      'Credit at the shop standing in for savings',
      'Costs that cannot be cut - school fees, medicine, fuel',
    ],
    consequences: [
      'Quantity bought shrinks before the shopping stops',
      'Shopkeepers become informal lenders they cannot afford to be',
      'What gets dropped first is usually the thing nobody sees you drop',
    ],
    connections: ['job-insecurity', 'debt', 'education-cost'],
    perspectives: [
      {
        speaker: 'Rekha Sawant',
        role: 'Shopkeeper, 41',
        stance: 'lived',
        text: 'People do not stop buying. They buy the small packet instead of the big one. That is how I know before anyone tells me.',
      },
      {
        speaker: 'Vasant Pawar',
        role: 'Retired clerk, 58',
        stance: 'lived',
        text: 'A pension is a fixed number meeting a moving one. You can guess how that conversation ends.',
      },
      {
        speaker: 'Shalini Gaikwad',
        role: 'Household, 47',
        stance: 'opinion',
        text: 'Everyone says prices. Nobody says wages. To me they are the same sentence from two ends.',
      },
    ],
    notes: [
      { kind: 'observed', text: 'Sawant Stores keeps a credit notebook. Rekha did not want you to read the names in it.' },
      { kind: 'account', text: 'Rekha says the shift she notices is packet size, not customer count.' },
    ],
  },

  debt: {
    id: 'debt',
    name: 'Borrowed against next month',
    short: 'Debt',
    category: 'Economic',
    summary: 'A loan taken for one good reason that quietly reorganises everything after it.',
    description:
      'Debt in Shivnagar is rarely reckless. It is a sewing machine, a hospital bill, a fee receipt. The trouble is not the reason - it is that repayment has first claim on every rupee that arrives.',
    impacts: { financial: 86, emotional: 79, social: 55, time: 44, longTerm: 84 },
    affectedGroups: ['Self-employed workers', 'Families after a medical event', 'Anyone paying fees in instalments'],
    causes: [
      'A large one-time cost with no savings behind it',
      'Income that arrives irregularly against payments that do not',
      'Informal borrowing when formal credit is out of reach',
    ],
    consequences: [
      'Work is chosen for how fast it pays, not how well',
      'The household hides the debt before it hides anything else',
      'Recovery takes years even after the original reason is long gone',
    ],
    connections: ['job-insecurity', 'healthcare-access', 'cost-of-living'],
    perspectives: [
      {
        speaker: 'Fatima Qureshi',
        role: 'Tailor, 46',
        stance: 'lived',
        text: 'The machine earns. The instalment also earns, for somebody else. Both are true and I have to live inside both.',
      },
      {
        speaker: 'Rekha Sawant',
        role: 'Shopkeeper, 41',
        stance: 'opinion',
        text: 'I give credit because I know the family. Ask me if that is generosity or a trap and I will give you a different answer on a different day.',
      },
    ],
    notes: [
      { kind: 'account', text: 'Fatima describes a monthly instalment on her machine that she says she has never missed.' },
      { kind: 'contested', text: 'People here disagree about whether shop credit protects families or keeps them dependent.' },
    ],
  },

  'exam-pressure': {
    id: 'exam-pressure',
    name: 'One exam, one exit',
    short: 'Exam pressure',
    category: 'Education',
    summary: 'A single result carrying the weight of an entire family’s hopes.',
    description:
      'The pressure is not only about studying. It is about being the plan - the one attempt everyone agreed to fund and wait for.',
    impacts: { financial: 46, emotional: 90, social: 66, time: 88, longTerm: 74 },
    affectedGroups: ['Students in exam years', 'First-generation college aspirants', 'Their parents'],
    causes: [
      'Few routes to stable work that do not run through one test',
      'Family money committed to coaching before the result is known',
      'Comparison with whoever cleared it last year',
    ],
    consequences: [
      'Sleep, friendships and health treated as things to spend',
      'Failure read as a personal verdict rather than a filter',
      'A second attempt costs another year and another fee',
    ],
    connections: ['education-cost', 'job-insecurity', 'family-expectation'],
    perspectives: [
      {
        speaker: 'Deepak Rathod',
        role: 'Student, 19',
        stance: 'lived',
        text: 'If I clear it, everyone was right to wait. If I do not clear it, everyone waited for nothing. That is the whole thing, every day.',
      },
      {
        speaker: 'Shalini Gaikwad',
        role: 'Household, 47',
        stance: 'opinion',
        text: 'We tell them it is only an exam. Then we arrange our whole year around it. They are not fools - they can see which one we mean.',
      },
      {
        speaker: 'Sunita Kamble',
        role: 'Community health worker, 34',
        stance: 'opinion',
        text: 'I see these students in February. Not for their studies. For their stomachs, their sleep, their hands shaking.',
      },
    ],
    notes: [
      { kind: 'account', text: 'Deepak says his coaching fee was paid in one instalment his family had been saving towards.' },
      { kind: 'observed', text: 'The school gate is bolted during class hours. Deepak studies outside it because the reading room is full by seven.' },
    ],
  },

  'education-cost': {
    id: 'education-cost',
    name: 'Paying to try',
    short: 'Cost of education',
    category: 'Education',
    summary: 'Fees and coaching charged before any result exists, to families betting on one.',
    description:
      'The cost is front-loaded and the outcome is not guaranteed. A family pays in full for a chance, and the chance does not refund.',
    impacts: { financial: 78, emotional: 62, social: 58, time: 50, longTerm: 86 },
    affectedGroups: ['Families with school and college-age children', 'Students repeating an attempt'],
    causes: [
      'Coaching treated as necessary rather than optional',
      'Fees due in lumps while income arrives in trickles',
      'Costs beyond fees: travel, books, a phone, a quiet place to sit',
    ],
    consequences: [
      'Other household spending is cut to protect the fee',
      'Siblings’ turns get deferred',
      'Dropping out becomes a financial decision, not an academic one',
    ],
    connections: ['exam-pressure', 'debt', 'cost-of-living'],
    perspectives: [
      {
        speaker: 'Deepak Rathod',
        role: 'Student, 19',
        stance: 'lived',
        text: 'My sister is two years behind me. If I take another attempt, her turn moves. Nobody has said that out loud yet.',
      },
      {
        speaker: 'Rekha Sawant',
        role: 'Shopkeeper, 41',
        stance: 'opinion',
        text: 'Every June my credit book gets longer. That is not a coincidence, that is school fees.',
      },
    ],
    notes: [
      { kind: 'account', text: 'Deepak’s coaching fee and his sister’s next admission fall in the same season, by his account.' },
    ],
  },

  'healthcare-access': {
    id: 'healthcare-access',
    name: 'The distance to a doctor',
    short: 'Healthcare access',
    category: 'Health',
    summary: 'Care that exists, but not always on the day or at the hour you need it.',
    description:
      'Shivnagar has a health centre. Whether that counts as having healthcare depends on which day you fall ill, and how far you can travel if the answer is "not here".',
    impacts: { financial: 70, emotional: 72, social: 44, time: 74, longTerm: 78 },
    affectedGroups: ['Older residents', 'Families without transport', 'Pregnant women and infants'],
    causes: [
      'One centre, limited hours, staff also assigned to field duty',
      'Anything serious means a journey to the city',
      'A day spent seeking care is a day not earned',
    ],
    consequences: [
      'Treatment delayed until it is urgent, which costs more',
      'One illness can become the household’s largest expense of the year',
      'People self-medicate from the chemist instead',
    ],
    connections: ['debt', 'road-condition', 'job-insecurity'],
    perspectives: [
      {
        speaker: 'Sunita Kamble',
        role: 'Community health worker, 34',
        stance: 'lived',
        text: 'I can reach every house in this ward. What I cannot do is be a hospital. People want me to be one, and I understand why.',
      },
      {
        speaker: 'Vasant Pawar',
        role: 'Retired clerk, 58',
        stance: 'lived',
        text: 'For my knee they sent me to the city. Two buses. I went once. I have not gone again, and that is my own decision, not anyone’s fault.',
      },
      {
        speaker: 'Ganesh More',
        role: 'Auto driver, 31',
        stance: 'opinion',
        text: 'Half my night trips are to the city hospital. Nobody calls an auto at two in the morning for a small thing.',
      },
    ],
    notes: [
      { kind: 'observed', text: 'A handwritten sheet at the health centre says the doctor is on field duty on Tuesdays.' },
      { kind: 'account', text: 'Sunita says she covers the whole ward on foot and by bus.' },
    ],
  },

  'road-condition': {
    id: 'road-condition',
    name: 'The road that eats the day',
    short: 'Road condition',
    category: 'Infrastructure',
    summary: 'A broken stretch of main road whose cost lands on whoever drives it most.',
    description:
      'It is one bad patch on one road. It is also repairs, slower trips, a stretcher case shaken for two kilometres, and a fruit cart that avoids the whole lane.',
    impacts: { financial: 58, emotional: 40, social: 52, time: 66, longTerm: 60 },
    affectedGroups: ['Auto and tempo drivers', 'Ambulance and emergency journeys', 'Anyone walking here in the rain'],
    causes: [
      'Water standing on a surface with nowhere to drain',
      'Heavy vehicles on a stretch not built for them',
      'Repairs that patch the hole and not the drainage',
    ],
    consequences: [
      'Vehicle repair costs fall on drivers, not on the road',
      'Journeys stretch, which costs earning hours',
      'The same patch reopens after every monsoon',
    ],
    connections: ['waste-collection', 'healthcare-access', 'bureaucracy'],
    perspectives: [
      {
        speaker: 'Ganesh More',
        role: 'Auto driver, 31',
        stance: 'lived',
        text: 'Suspension work twice this year. I can show you both bills. The road does not pay them, I do.',
      },
      {
        speaker: 'Vasant Pawar',
        role: 'Retired clerk, 58',
        stance: 'opinion',
        text: 'It has been repaired. Three times. Patching a hole in a road that cannot drain is not repair, it is a receipt.',
      },
      {
        speaker: 'Sunita Kamble',
        role: 'Community health worker, 34',
        stance: 'lived',
        text: 'Ask me about the road when someone is being carried over it.',
      },
    ],
    notes: [
      { kind: 'observed', text: 'The broken patch sits at the low point of the road. Water has nowhere to go from here.' },
      { kind: 'account', text: 'Ganesh says he has paid for suspension repairs twice this year.' },
      { kind: 'contested', text: 'Vasant blames drainage design; Ganesh blames the quality of the patching. Both may be describing the same failure.' },
    ],
  },

  'water-supply': {
    id: 'water-supply',
    name: 'Water by the hour',
    short: 'Water supply',
    category: 'Infrastructure',
    summary: 'Water that arrives on a schedule the household has to arrange itself around.',
    description:
      'The supply is not absent. It is timed - and somebody in every house has to be awake, present and in the queue when it comes. That somebody is usually the youngest girl or the oldest woman.',
    impacts: { financial: 34, emotional: 56, social: 60, time: 84, longTerm: 62 },
    affectedGroups: ['Households without storage', 'Women and girls who do the fetching', 'Families in the lower lane'],
    causes: [
      'Supply timed to hours rather than available on tap',
      'Storage that costs money not every household has',
      'Pressure that reaches the lane’s far end last, or not at all',
    ],
    consequences: [
      'Hours spent queuing that could be school, study or paid work',
      'The cost is paid in time, so it is easy for everyone else to miss',
      'Disputes in the queue that are really disputes about the schedule',
    ],
    connections: ['waste-collection', 'exam-pressure', 'healthcare-access'],
    perspectives: [
      {
        speaker: 'Tanvi',
        role: 'Student, 9',
        stance: 'lived',
        text: 'I keep the pots in line, then I go back and wash, then I go to school. If I am late, I am late.',
      },
      {
        speaker: 'Shalini Gaikwad',
        role: 'Household, 47',
        stance: 'lived',
        text: 'A tank is eight thousand rupees I do not have. So I have a daughter who wakes at five instead. I know exactly what that sentence sounds like.',
      },
      {
        speaker: 'Vasant Pawar',
        role: 'Retired clerk, 58',
        stance: 'opinion',
        text: 'The supply reaches the main road houses first. That is gravity and pipe length, not a conspiracy. It is still unfair to the far end.',
      },
    ],
    notes: [
      { kind: 'observed', text: 'Two pots stand in line at the hand pump with nobody beside them. The queue is held by objects, not people.' },
      { kind: 'account', text: 'Tanvi says she is in the queue before school. Her mother says a storage tank is out of reach for now.' },
    ],
  },

  'waste-collection': {
    id: 'waste-collection',
    name: 'The heap nobody owns',
    short: 'Waste collection',
    category: 'Environmental',
    summary: 'A collection point that became a dumping point, and the drain that pays for it.',
    description:
      'The bin is there. The heap is beside it. Once waste sits outside the bin long enough, it stops being anyone’s and starts being everyone’s - especially the drain’s.',
    impacts: { financial: 30, emotional: 44, social: 66, time: 24, longTerm: 72 },
    affectedGroups: ['Households next to the collection point', 'Sanitation workers', 'Everyone downstream of the drain'],
    causes: [
      'Collection that does not match how much is produced',
      'A bin too small for the street it serves',
      'No agreement about whose job the overflow is',
    ],
    consequences: [
      'Drains block, so water stands, so the road breaks',
      'Neighbours argue with each other instead of with the service',
      'Health risk concentrates on the people living closest to it',
    ],
    connections: ['road-condition', 'water-supply', 'bureaucracy'],
    perspectives: [
      {
        speaker: 'Rekha Sawant',
        role: 'Shopkeeper, 41',
        stance: 'lived',
        text: 'I sweep my front every morning. By evening it is back. I have stopped taking it personally, which took a few years.',
      },
      {
        speaker: 'Sunita Kamble',
        role: 'Community health worker, 34',
        stance: 'opinion',
        text: 'Standing water and a heap in the sun, next to each other, in this climate. You do not need a study to worry about that.',
      },
    ],
    notes: [
      { kind: 'observed', text: 'The heap sits beside the bin, not in it, and it is closer to the drain than the bin is.' },
      { kind: 'contested', text: 'Residents blame collection frequency. Shopkeepers blame households. Neither group disputes that it blocks the drain.' },
    ],
  },

  bureaucracy: {
    id: 'bureaucracy',
    name: 'The file that has to travel',
    short: 'Paperwork',
    category: 'Institutional',
    summary: 'A process that works, at the speed of the people who know how to work it.',
    description:
      'Complaints, pensions, certificates: the route exists and is usually followed. What varies is how much time, travel and confidence it takes to follow it - and who has those to spend.',
    impacts: { financial: 40, emotional: 66, social: 48, time: 82, longTerm: 58 },
    affectedGroups: ['Pensioners', 'Anyone filing a complaint', 'People without a contact inside the office'],
    causes: [
      'Steps that must be done in person, in office hours',
      'Documents that reference other documents',
      'Knowledge of the process concentrated in a few people',
    ],
    consequences: [
      'Those who can spare days get outcomes; those who cannot, give up',
      'Legitimate complaints never enter the record at all',
      'People who know the system become unofficial guides for a whole ward',
    ],
    connections: ['road-condition', 'waste-collection', 'cost-of-living'],
    perspectives: [
      {
        speaker: 'Vasant Pawar',
        role: 'Retired clerk, 58',
        stance: 'lived',
        text: 'I sat on that side of the counter for thirty-one years. The system is not evil. It is slow, it is literal, and it rewards whoever knows exactly which words to write.',
      },
      {
        speaker: 'Ganesh More',
        role: 'Auto driver, 31',
        stance: 'opinion',
        text: 'A complaint takes half a day. Half a day is four hundred rupees I did not earn. So the road stays broken and I stay quiet.',
      },
      {
        speaker: 'Fatima Qureshi',
        role: 'Tailor, 46',
        stance: 'opinion',
        text: 'Twice I went. Twice the man who signs was not there. I am not angry at him. I am angry that nobody told me before the bus fare.',
      },
    ],
    notes: [
      { kind: 'account', text: 'Vasant describes the process as slow and literal rather than corrupt - he is explicit that this is his own reading of it.' },
      { kind: 'contested', text: 'Ganesh thinks filing is pointless; Vasant thinks it is winnable but tedious. They are both talking about the same counter.' },
    ],
  },

  'migration-distance': {
    id: 'migration-distance',
    name: 'Two hours from everyone',
    short: 'Distance and migration',
    category: 'Social',
    summary: 'A job in the city and a family in the town, held together by a weekly journey.',
    description:
      'The work is real and the money is better. So is the rent, the commute and the distance from everyone who knows you.',
    impacts: { financial: 60, emotional: 76, social: 82, time: 70, longTerm: 64 },
    affectedGroups: ['Young workers in city jobs', 'Parents left in town', 'Anyone paying two rents in effect'],
    causes: [
      'Skilled work concentrated in the city',
      'City rent taking a large share of a city salary',
      'A journey too long for daily travel and too expensive to make often',
    ],
    consequences: [
      'Presence at home becomes a scheduled event',
      'Support runs one way - money out, worry back',
      'Belonging in neither place completely',
    ],
    connections: ['cost-of-living', 'family-expectation', 'job-insecurity'],
    perspectives: [
      {
        speaker: 'Priya Nair',
        role: 'Works in Metro City, 25',
        stance: 'lived',
        text: 'I earn more than anyone in my family ever has. I also see them four days a month. Both of those are the same decision.',
      },
      {
        speaker: 'Shalini Gaikwad',
        role: 'Household, 47',
        stance: 'opinion',
        text: 'Everyone is proud of the ones who leave. Nobody counts what the house is like on a Tuesday.',
      },
    ],
    notes: [
      { kind: 'account', text: 'Priya says roughly half her salary goes on rent and travel, by her own reckoning.' },
      { kind: 'contested', text: 'Whether leaving is escape or loss is argued about in almost every house here. Priya says it is plainly both.' },
    ],
  },

  'family-expectation': {
    id: 'family-expectation',
    name: 'Carrying the plan',
    short: 'Family expectation',
    category: 'Personal',
    summary: 'Love expressed as a plan, and a person who has to be it.',
    description:
      'Nobody in this is a villain. A family invests everything it has in one person’s path; that person then cannot fail privately, or change their mind cheaply.',
    impacts: { financial: 38, emotional: 88, social: 74, time: 42, longTerm: 70 },
    affectedGroups: ['Eldest children', 'First-generation students', 'Anyone who left and anyone who stayed'],
    causes: [
      'One route seen as the safe one by the previous generation',
      'Sacrifice made visible so the stakes stay visible',
      'No private space to be uncertain in',
    ],
    consequences: [
      'Doubt gets hidden rather than discussed',
      'Changing direction feels like betrayal, not choice',
      'The pressure is hardest to name because it comes from care',
    ],
    connections: ['exam-pressure', 'migration-distance', 'education-cost'],
    perspectives: [
      {
        speaker: 'Deepak Rathod',
        role: 'Student, 19',
        stance: 'lived',
        text: 'They have never once shouted at me about it. That is somehow worse.',
      },
      {
        speaker: 'Shalini Gaikwad',
        role: 'Household, 47',
        stance: 'lived',
        text: 'I do not want him to be a great man. I want him to not be frightened at the end of the month. Somewhere that turned into pressure.',
      },
      {
        speaker: 'Priya Nair',
        role: 'Works in Metro City, 25',
        stance: 'opinion',
        text: 'I was the plan too. It worked. I still would not describe it as light.',
      },
    ],
    notes: [
      { kind: 'account', text: 'Both Deepak and Priya describe the same pressure from opposite ends of it - before the result, and after.' },
    ],
  },
}

/** Ordered list, used by the journal and comparison pickers. */
export const PROBLEM_LIST = Object.values(PROBLEMS)

export function getProblem(id) {
  return PROBLEMS[id] || null
}

/** The five axes, in the order every screen displays them. */
export const DIMENSIONS = [
  { key: 'financial', label: 'Money' },
  { key: 'emotional', label: 'Feeling' },
  { key: 'social', label: 'People' },
  { key: 'time', label: 'Time' },
  { key: 'longTerm', label: 'Years' },
]
