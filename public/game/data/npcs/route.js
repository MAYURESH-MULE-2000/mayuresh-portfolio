/**
 * npcs/route.js - the highway between Shivnagar and the city.
 * Schema and effect vocabulary are documented in data/npcs.js.
 */

import { PAL } from '../../js/gfx/Palette.js'

export const ROUTE_NPCS = {
  harpal: {
    id: 'harpal',
    name: 'Harpal Singh',
    age: 44,
    role: 'Drives a goods truck',
    problem: 'work-hours',
    look: {
      skin: PAL.skinB,
      hair: PAL.hair,
      hairStyle: 'turban',
      capColor: PAL.blue,
      top: PAL.bone,
      bottom: PAL.concreteDark,
      outfit: 'kurta',
      accessory: 'beard',
    },
    entry: [
      { require: { flag: 'harpal.met' }, node: 'repeat' },
      { node: 'first' },
    ],
    nodes: {
      first: {
        effect: { flag: 'harpal.met' },
        text: [
          'Careful, that side is hot. Been running since two in the morning.',
          'Forty minutes here, then on. Ask what you want to ask.',
        ],
        next: 'hub',
      },
      hub: {
        text: 'Go on.',
        choices: [
          { label: 'How long is a run?', to: 'run' },
          { label: 'When do you sleep?', to: 'sleep', require: { flag: 'harpal.run' } },
          { label: 'How is this road?', to: 'road', require: { flag: 'harpal.run' } },
          { label: 'Safe driving', to: 'bye' },
        ],
      },
      run: {
        effect: { flag: 'harpal.run', stat: { observation: 1 } },
        text: [
          'Loading yesterday evening, unloading tomorrow morning. In between is my problem, not theirs.',
          'The clock is on the consignment, not on me. That is the whole arrangement in one line.',
        ],
        next: 'hub',
      },
      sleep: {
        effect: {
          discover: 'work-hours',
          note: { problem: 'work-hours', text: 'Harpal: the delivery clock runs on the consignment, so rest comes out of his own hours.' },
          stat: { empathy: 1 },
        },
        text: [
          'Two hours at a dhaba, sometimes three. On the seat, engine off.',
          'Everyone talks about drivers sleeping at the wheel like it is a character problem. Give me a schedule where sleep fits and see what happens.',
        ],
        choices: [
          { label: 'Tell me the whole shape of it', to: 'enc' },
          { label: 'Back', to: 'hub' },
        ],
      },
      enc: {
        effect: { encounter: 'work-hours' },
        text: 'Sit. The tea is coming anyway.',
        end: true,
      },
      road: {
        effect: {
          discover: 'road-condition',
          note: { problem: 'road-condition', text: 'Harpal: the Shivnagar stretch costs him tyres; he budgets for it like fuel.' },
          stat: { knowledge: 1 },
        },
        text: [
          'This stretch? Tyres. I budget for it the way I budget for diesel.',
          'And it is not the potholes that get you. It is the edge where the tar drops four inches and you are carrying eighteen tonnes.',
        ],
        next: 'hub',
      },
      repeat: {
        text: 'Still here. Loading in twenty.',
        choices: [
          { label: 'Ask something', to: 'hub' },
          { label: 'Safe driving', to: 'bye' },
        ],
      },
      bye: { text: 'Go. And walk on the right side of the road, facing me.', end: true },
    },
  },

  mangala: {
    id: 'mangala',
    name: 'Mangala Pawar',
    age: 50,
    role: 'Runs the highway dhaba',
    problem: 'power-supply',
    look: {
      skin: PAL.skinB,
      hair: PAL.hairGrey,
      hairStyle: 'bun',
      top: PAL.saffron,
      bottom: PAL.redDark,
      outfit: 'saree',
      accent: PAL.green,
    },
    entry: [
      { require: { flag: 'mangala.met' }, node: 'repeat' },
      { node: 'first' },
    ],
    nodes: {
      first: {
        effect: { flag: 'mangala.met' },
        text: [
          'Sit anywhere. Tea is ready, food is twenty minutes.',
          'You are the one asking people questions. Harpal told me. Nothing travels faster than a dhaba.',
        ],
        next: 'hub',
      },
      hub: {
        text: 'Ask, then.',
        choices: [
          { label: 'Who stops here?', to: 'who' },
          { label: 'The fridge, the fan - is power steady?', to: 'power', require: { flag: 'mangala.who' } },
          { label: 'Has the highway changed things?', to: 'highway', require: { flag: 'mangala.who' } },
          { label: 'I will let you cook', to: 'bye' },
        ],
      },
      who: {
        effect: { flag: 'mangala.who', stat: { observation: 1 } },
        text: [
          'Truck drivers, mostly. Bus at eleven. Families on Sundays if the season is good.',
          'I know which drivers are late by who arrives grumpy.',
        ],
        next: 'hub',
      },
      power: {
        effect: {
          discover: 'power-supply',
          note: { problem: 'power-supply', text: 'Mangala: the afternoon cut lands when the fridge is fullest; she runs a small generator for the milk.' },
          stat: { knowledge: 1 },
        },
        text: [
          'Two hours in the afternoon, most days. That is when the fridge is fullest.',
          'So I run the small generator for the milk. Diesel for milk. Write that down, it sounds stupid and it is true.',
        ],
        choices: [
          { label: 'Walk me through it', to: 'enc' },
          { label: 'Back', to: 'hub' },
        ],
      },
      enc: {
        effect: { encounter: 'power-supply' },
        text: 'Come behind, I will show you the meter and the generator together.',
        end: true,
      },
      highway: {
        effect: {
          discover: 'migration-distance',
          note: { problem: 'migration-distance', text: 'Mangala: the widened highway brought her trade and took the village’s young people the other way.' },
          stat: { empathy: 1 },
        },
        text: [
          'The widening brought me customers. I will not pretend otherwise.',
          'It also took my sister’s boys to the city in ninety minutes instead of half a day. Same road. Both directions.',
        ],
        next: 'hub',
      },
      repeat: {
        text: 'Back? Sit. Tea or no tea?',
        choices: [
          { label: 'Ask something', to: 'hub' },
          { label: 'Next time', to: 'bye' },
        ],
      },
      bye: { text: 'Eat something before the city. It is expensive there.', end: true },
    },
  },

  baban: {
    id: 'baban',
    name: 'Baban Shinde',
    age: 61,
    role: 'Farms two acres beside the highway',
    problem: 'water-supply',
    look: {
      skin: PAL.skinC,
      hair: PAL.hairGrey,
      hairStyle: 'short',
      top: PAL.white,
      bottom: PAL.bone,
      outfit: 'kurta',
      accessory: 'headload',
    },
    entry: [
      { require: { flag: 'baban.met' }, node: 'repeat' },
      { node: 'first' },
    ],
    nodes: {
      first: {
        effect: { flag: 'baban.met' },
        text: [
          'Mind the channel, it is open there.',
          'Two acres. Was four. The road took some and my brother took some, and both of those were legal, before you ask.',
        ],
        next: 'hub',
      },
      hub: {
        text: 'Well?',
        choices: [
          { label: 'How is the water?', to: 'water' },
          { label: 'Who works the land with you?', to: 'who', require: { flag: 'baban.water' } },
          { label: 'Is farming worth it now?', to: 'worth', require: { flag: 'baban.water' } },
          { label: 'I will leave you to it', to: 'bye' },
        ],
      },
      water: {
        effect: {
          flag: 'baban.water',
          discover: 'water-supply',
          note: { problem: 'water-supply', text: 'Baban: the borewell has been deepened twice in his working life; the canal turn comes at night.' },
          stat: { knowledge: 1 },
        },
        text: [
          'Deepened the bore twice in my life. Second time we borrowed for it.',
          'The canal turn comes at night, when it comes. I have slept in that field more nights than in my bed this season.',
        ],
        choices: [
          { label: 'Tell me the whole of it', to: 'enc' },
          { label: 'Back', to: 'hub' },
        ],
      },
      enc: {
        effect: { encounter: 'water-supply' },
        text: 'Then walk the channel with me. It explains itself.',
        end: true,
      },
      who: {
        effect: {
          discover: 'migration-distance',
          note: { problem: 'migration-distance', text: 'Baban: both his sons work in the city; he hires labour at sowing and harvest.' },
          stat: { empathy: 1 },
        },
        text: [
          'Both my sons are in the city. One sends money, one sends messages.',
          'I hire at sowing and at harvest. The rest is me. That is not a complaint, it is an arrangement we all agreed to without saying it out loud.',
        ],
        next: 'hub',
      },
      worth: {
        effect: {
          discover: 'debt',
          note: { problem: 'debt', text: 'Baban: the borewell loan is against the season; a bad year moves it to the next one.' },
          stat: { resilience: 1 },
        },
        text: [
          'Some years. The loan is against the season, so a bad season does not cancel it, it just moves it.',
          'People ask why I do not sell to the plot people. Ask me again in a bad year and you may get a different answer. I am being honest with you.',
        ],
        next: 'hub',
      },
      repeat: {
        text: 'Still the same field. Still the same questions.',
        choices: [
          { label: 'Ask something', to: 'hub' },
          { label: 'Going on', to: 'bye' },
        ],
      },
      bye: { text: 'Go straight, do not cut across. There are snakes in that grass.', end: true },
    },
  },
}
