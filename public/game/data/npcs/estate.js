/**
 * npcs/estate.js - Ambewadi industrial estate: the sheds, the lane behind them
 * and the clinic that sees both.
 * Schema and effect vocabulary are documented in data/npcs.js.
 */

import { PAL } from '../../js/gfx/Palette.js'

export const ESTATE_NPCS = {
  shabnam: {
    id: 'shabnam',
    name: 'Shabnam Shaikh',
    age: 33,
    role: 'Contract worker on a packing line',
    problem: 'work-hours',
    look: {
      skin: PAL.skinB,
      hair: PAL.hair,
      hairStyle: 'braid',
      top: PAL.teal,
      bottom: PAL.blueDark,
      outfit: 'kurta',
      accent: PAL.yellow,
      accessory: 'dupatta',
    },
    entry: [
      { require: { flag: 'shabnam.met' }, node: 'repeat' },
      { node: 'first' },
    ],
    nodes: {
      first: {
        effect: { flag: 'shabnam.met' },
        text: [
          'Shift change. Twenty minutes, then the gate closes and I am late.',
          'Ask. But not my full name near the gate, please.',
        ],
        next: 'hub',
      },
      hub: {
        text: 'Go on.',
        choices: [
          { label: 'How long at this unit?', to: 'years' },
          { label: 'Who is your employer?', to: 'employer', require: { flag: 'shabnam.years' } },
          { label: 'What about the water here?', to: 'water', require: { discovered: 'industrial-water' } },
          { label: 'I will let you clock in', to: 'bye' },
        ],
      },
      years: {
        effect: { flag: 'shabnam.years', stat: { observation: 1 } },
        text: [
          'Four years. Same line, same machine, same corner of the same shed.',
          'On paper I have been new five times.',
        ],
        next: 'hub',
      },
      employer: {
        effect: {
          discover: 'work-hours',
          note: { problem: 'work-hours', text: 'Shabnam: four years on the same line, with the contractor changed roughly every eleven months.' },
          stat: { knowledge: 1 },
        },
        text: [
          'The contractor. It changes every eleven months, near enough. Before anything has to become permanent.',
          'I am not saying anybody broke a law. I am saying the calendar is not a coincidence, and everyone on that line can read a calendar.',
        ],
        choices: [
          { label: 'Tell me the whole of it', to: 'enc' },
          { label: 'Back', to: 'hub' },
        ],
      },
      enc: {
        effect: { encounter: 'work-hours' },
        text: 'Quickly, then. Walk with me to the gate.',
        end: true,
      },
      water: {
        effect: {
          note: { problem: 'industrial-water', text: 'Shabnam lives in the lane and works in the shed; she says both facts make her careful about what she says out loud.' },
          stat: { empathy: 1 },
        },
        text: [
          'I live in that lane and I work in this shed. You understand what that means.',
          'I want the water clean and I want the line running. People keep asking me to pick one, and I will not, because my daughter needs both.',
        ],
        next: 'hub',
      },
      repeat: {
        text: 'Gate in a few minutes.',
        choices: [
          { label: 'Ask something', to: 'hub' },
          { label: 'Go on then', to: 'bye' },
        ],
      },
      bye: { text: 'Stay off the estate road at shift change. Trucks do not expect people.', end: true },
    },
  },

  sanjay: {
    id: 'sanjay',
    name: 'Sanjay Bhosle',
    age: 51,
    role: 'Runs a small fabrication unit',
    problem: 'power-supply',
    look: {
      skin: PAL.skinB,
      hair: PAL.hairGrey,
      hairStyle: 'bald',
      top: PAL.blue,
      bottom: PAL.concreteDark,
      outfit: 'shirt',
      accessory: 'glasses',
    },
    entry: [
      { require: { flag: 'sanjay.met' }, node: 'repeat' },
      { node: 'first' },
    ],
    nodes: {
      first: {
        effect: { flag: 'sanjay.met' },
        text: [
          'If you are from the pollution board, the file is inside and it is up to date.',
          '...A survey. Even better. Nobody surveys us, they only inspect us. Ask.',
        ],
        next: 'hub',
      },
      hub: {
        text: 'Go on.',
        choices: [
          { label: 'How many people work here?', to: 'people' },
          { label: 'What about the power cuts?', to: 'power', require: { flag: 'sanjay.people' } },
          { label: 'And the effluent in the nallah?', to: 'effluent', require: { flag: 'sanjay.people' } },
          { label: 'Why not hire permanent staff?', to: 'permanent', require: { discovered: 'work-hours' } },
          { label: 'I will let you work', to: 'bye' },
        ],
      },
      people: {
        effect: { flag: 'sanjay.people', stat: { observation: 1 } },
        text: [
          'Nine on the floor, eleven when an order is big. My father had six, permanent, for twenty years.',
          'Different era, and I am not going to pretend it was not a better one for them.',
        ],
        next: 'hub',
      },
      power: {
        effect: {
          discover: 'power-supply',
          note: { problem: 'power-supply', text: 'Sanjay: a roughly two-hour afternoon cut; his diesel backup costs more per running hour than his labour.' },
          stat: { knowledge: 1 },
        },
        text: [
          'Two hours, most afternoons. Right through the middle of a shift.',
          'The generator costs me more per hour than the men do. Say that sentence slowly and you will understand why nothing here is efficient.',
        ],
        choices: [
          { label: 'Walk me through it', to: 'enc' },
          { label: 'Back', to: 'hub' },
        ],
      },
      enc: {
        effect: { encounter: 'power-supply' },
        text: 'Come to the back. I will show you the meter, the log and the diesel bills.',
        end: true,
      },
      effluent: {
        effect: {
          discover: 'industrial-water',
          step: 'nallah/ask-sanjay',
          note: { problem: 'industrial-water', text: 'Sanjay says his unit is connected to the common treatment plant and pays for it; he names connection status as the question to ask of each unit.' },
          stat: { knowledge: 1 },
        },
        text: [
          'Mine goes to the common plant. I pay a charge for it, quarterly, and I can show you the receipts.',
          'There are forty units on this estate. Ask how many are connected before you decide the answer. I am not saying it is nobody. I am saying it is not everybody, and it is not me.',
        ],
        next: 'hub',
      },
      permanent: {
        effect: { stat: { empathy: 1 }, note: { problem: 'work-hours', text: 'Sanjay: order books swing, so he keeps the line contract-staffed; he calls it survival, not preference.' } },
        text: [
          'Because in March I have three orders and in July I have none.',
          'Permanent means paying a line that is not running. I would like to be the man who does it anyway. I have been the man who tried it, in 2009, and I nearly lost the unit.',
        ],
        next: 'hub',
      },
      repeat: {
        text: 'Still here. Still two hours off in the afternoon.',
        choices: [
          { label: 'Ask something', to: 'hub' },
          { label: 'Leave him to it', to: 'bye' },
        ],
      },
      bye: { text: 'Mind the sparks that side. And write it honestly, whatever you write.', end: true },
    },
  },

  kavita: {
    id: 'kavita',
    name: 'Kavita Jadhav',
    age: 37,
    role: 'Lives in the lane behind the estate',
    problem: 'industrial-water',
    look: {
      skin: PAL.skinC,
      hair: PAL.hair,
      hairStyle: 'bun',
      top: PAL.green,
      bottom: PAL.purple,
      outfit: 'saree',
      accent: PAL.saffron,
    },
    entry: [
      { require: { flag: 'nallah.resolved' }, node: 'after_quest' },
      { require: { questActive: 'nallah', flag: 'nallah.evidence.ready' }, node: 'report' },
      { require: { questActive: 'nallah' }, node: 'quest_progress' },
      { require: { flag: 'kavita.met' }, node: 'repeat' },
      { node: 'first' },
    ],
    nodes: {
      first: {
        effect: { flag: 'kavita.met' },
        text: [
          'Do not step there, that is where it collects.',
          'You are writing things down. Good. People come, they look at the nallah, they say "hmm", they leave. Ask properly instead.',
        ],
        next: 'hub',
      },
      hub: {
        text: 'Ask.',
        choices: [
          { label: 'What have you noticed?', to: 'noticed' },
          { label: 'What do you use for water?', to: 'water', require: { flag: 'kavita.noticed' } },
          { label: 'Has anyone tested it?', to: 'tested', require: { flag: 'kavita.noticed' } },
          { label: 'I will not take more of your time', to: 'bye' },
        ],
      },
      noticed: {
        effect: {
          flag: 'kavita.noticed',
          quest: 'nallah',
          step: 'nallah/ask-kavita',
          discover: 'industrial-water',
          note: { problem: 'industrial-water', text: 'Kavita and neighbours independently describe the nallah running pale on the same weeknight.' },
          stat: { observation: 1 },
        },
        text: [
          'Wednesday nights the nallah runs pale. Not every week. Most weeks.',
          'Ask four houses in this lane separately. You will get Wednesday from all four. That is not gossip, that is four people looking at the same water.',
        ],
        choices: [
          { label: 'Tell me the whole of it', to: 'enc' },
          { label: 'Back', to: 'hub' },
        ],
      },
      enc: {
        effect: { encounter: 'industrial-water' },
        text: 'Come to the edge. Not too close, the bank gives way.',
        end: true,
      },
      water: {
        effect: {
          discover: 'water-supply',
          note: { problem: 'industrial-water', text: 'Kavita: the household stopped drinking bore water and buys cans; washing still uses the bore.' },
          stat: { empathy: 1 },
        },
        text: [
          'Cans for drinking. Two a week, forty rupees each. Bore water for everything else because I cannot afford to wash in cans.',
          'So we drink safely and bathe in whatever that is. I hear how that sounds.',
        ],
        next: 'hub',
      },
      tested: {
        effect: {
          discover: 'bureaucracy',
          stat: { knowledge: 1 },
          note: { problem: 'industrial-water', text: 'No sample the residents know of has been taken; a promised test has not produced a result they have seen.' },
        },
        text: [
          'Somebody came with bottles two years ago. We never heard a result. Maybe there was one. Nobody brought it to this lane.',
          'That is the part that wears you down. Not the water. The not knowing, on purpose or by accident, it makes no difference to my daughter.',
        ],
        next: 'hub',
      },
      quest_progress: {
        text: [
          'Look at it yourself first. Then talk to Bhosle in the unit - he will be straight with you, whatever else he is.',
          'And the doctor. She will not say what we want her to say, which is exactly why you should ask her.',
        ],
        choices: [
          { label: 'Ask something else', to: 'hub' },
          { label: 'On my way', to: 'bye' },
        ],
      },
      report: {
        effect: { stat: { communication: 1 } },
        text: [
          'So. You have been to all three. What did you come back with?',
          'Four houses saying Wednesday, one unit owner with receipts and forty units he cannot vouch for, and a doctor with a tally she will not call a finding.',
          'That is more than this lane has ever had written down at once. What do you want to do with it?',
        ],
        choices: [
          {
            label: 'Take samples with the clinic bottle',
            to: 'resolve_sample',
            require: { item: 'sample-bottle' },
          },
          { label: 'One written complaint from the whole lane', to: 'resolve_letter' },
          { label: 'Not yet - this needs care', to: 'resolve_wait' },
        ],
      },
      resolve_sample: {
        effect: {
          flags: ['nallah.resolved', 'nallah.sampled'],
          step: 'nallah/resolve',
          stat: { knowledge: 2, observation: 1 },
          decision: {
            id: 'nallah',
            title: 'What the nallah carries',
            choice: 'Took upstream and downstream samples on a Wednesday night, with the clinic\u2019s labels on them.',
            consequence:
              'Two bottles and a date. It settles nothing by itself, and it is the first thing here that could.',
          },
        },
        text: [
          'Wednesday night, then. Upstream first, downstream after, both labelled in front of two witnesses.',
          'I am not expecting anything. Two years I have not expected anything.',
          '...But nobody has ever taken the bottles before. That part is new.',
        ],
        end: true,
      },
      resolve_letter: {
        effect: {
          flags: ['nallah.resolved', 'nallah.letter'],
          step: 'nallah/resolve',
          stat: { communication: 2, empathy: 1 },
          decision: {
            id: 'nallah',
            title: 'What the nallah carries',
            choice: 'Wrote one complaint signed by the whole lane, naming the pattern and asking for testing.',
            consequence:
              'Signed by nineteen households. It asks for a test rather than claiming a result - which is the part that might survive an office.',
          },
        },
        text: [
          'One letter, nineteen houses. Better than nineteen letters, I have learned that much.',
          'And we ask them to test it. We do not tell them what they will find. The moment we do that, we are the ones making things up.',
        ],
        end: true,
      },
      resolve_wait: {
        effect: { stat: { resilience: 1 } },
        text: [
          'Careful is right. We have been wrong loudly before and it cost us two years.',
          'The nallah is not going anywhere. Neither am I.',
        ],
        end: true,
      },
      after_quest: {
        text: [
          'The lane is talking about it differently now. Less shouting, more dates.',
          'Whatever comes of it - somebody wrote down what we have been saying. That is not nothing, even if it turns out to be nothing.',
        ],
        choices: [
          { label: 'Ask something', to: 'hub' },
          { label: 'Take care', to: 'bye' },
        ],
      },
      repeat: {
        text: 'Still the same lane. Still Wednesdays.',
        choices: [
          { label: 'Ask something', to: 'hub' },
          { label: 'Take care', to: 'bye' },
        ],
      },
      bye: { text: 'And tell them, whoever you tell, that we asked politely for two years first.', end: true },
    },
  },

  meera: {
    id: 'meera',
    name: 'Dr. Meera Iyer',
    age: 39,
    role: 'Runs the estate clinic',
    problem: 'air-quality',
    look: {
      skin: PAL.skinD,
      hair: PAL.hair,
      hairStyle: 'bun',
      top: PAL.white,
      bottom: PAL.blueDark,
      outfit: 'uniform',
      accessory: 'glasses',
    },
    entry: [
      { require: { flag: 'meera.met' }, node: 'repeat' },
      { node: 'first' },
    ],
    nodes: {
      first: {
        effect: { flag: 'meera.met' },
        text: [
          'Sit. Not there, that is for patients. There.',
          'A ward survey. Then I will be careful with you, because careless numbers travel faster than careful ones.',
        ],
        next: 'hub',
      },
      hub: {
        text: 'Go on.',
        choices: [
          { label: 'What do you see most?', to: 'see' },
          { label: 'Is it the air? The water?', to: 'cause', require: { flag: 'meera.see' } },
          { label: 'What would settle it?', to: 'settle', require: { flag: 'meera.cause' } },
          { label: 'Thank you, doctor', to: 'bye' },
        ],
      },
      see: {
        effect: { flag: 'meera.see', stat: { observation: 1 } },
        text: [
          'Respiratory complaints, skin complaints, and injuries from the sheds. In that order, most weeks.',
          'More skin complaints from the lane by the nallah than from the lane behind it. I keep my own tally. It is a tally, not a study.',
        ],
        next: 'hub',
      },
      cause: {
        effect: {
          flag: 'meera.cause',
          discover: 'air-quality',
          note: { problem: 'air-quality', text: 'Dr. Iyer keeps a personal tally of complaints by lane; she is explicit that it is a pattern, not an attribution.' },
          stat: { knowledge: 1 },
        },
        text: [
          'I cannot tell you that. I want to be very clear, because you are writing it down.',
          'I can tell you what walks through my door and where it lives. I cannot tell you what any one person breathed or drank. Anybody who says they can, from a clinic like this, is guessing in a confident voice.',
        ],
        choices: [
          { label: 'Take me through what you can say', to: 'enc' },
          { label: 'Back', to: 'hub' },
        ],
      },
      enc: {
        effect: { encounter: 'air-quality' },
        text: 'Good. Then we will do it properly, with the caveats attached.',
        end: true,
      },
      settle: {
        effect: {
          discover: 'industrial-water',
          step: 'nallah/ask-meera',
          item: 'sample-bottle',
          stat: { knowledge: 1, communication: 1 },
          note: { problem: 'industrial-water', text: 'Dr. Iyer: sampling upstream and downstream on the same nights residents describe would turn an argument into a question with an answer.' },
        },
        text: [
          'Samples. Upstream and downstream, on the nights the lane says it happens, by somebody with no stake either way.',
          'Then it is a question with an answer instead of an argument with sides. Until that exists, everyone here is honest and nobody here is right.',
          'Here. Sterile bottle, my label, my handwriting. If you do take them, take both, and write the time on each. A single bottle from the wrong end proves nothing and will be used to prove something.',
        ],
        next: 'hub',
      },
      repeat: {
        text: 'Back? Sit. Not there.',
        choices: [
          { label: 'Ask something', to: 'hub' },
          { label: 'Another time', to: 'bye' },
        ],
      },
      bye: { text: 'And when you write it: patterns, not verdicts.', end: true },
    },
  },
}
