/**
 * npcs/coast.js - Vangaon: the jetty, the fish market and the low lane.
 * Schema and effect vocabulary are documented in data/npcs.js.
 */

import { PAL } from '../../js/gfx/Palette.js'

export const COAST_NPCS = {
  yusuf: {
    id: 'yusuf',
    name: 'Yusuf Daruwala',
    age: 58,
    role: 'Owns a small fishing boat',
    problem: 'fishing-livelihood',
    look: {
      skin: PAL.skinC,
      hair: PAL.hairGrey,
      hairStyle: 'cap',
      capColor: PAL.bone,
      top: PAL.teal,
      bottom: PAL.ink,
      outfit: 'shirt',
      accessory: 'beard',
    },
    entry: [
      { require: { flag: 'yusuf.met' }, node: 'repeat' },
      { node: 'first' },
    ],
    nodes: {
      first: {
        effect: { flag: 'yusuf.met' },
        text: [
          'Mind the rope. It goes tight without warning.',
          'We came in at four this morning. So I am awake, which is the only qualification your questions need.',
        ],
        next: 'hub',
      },
      hub: {
        text: 'Ask.',
        choices: [
          { label: 'How is the catch?', to: 'catch' },
          { label: 'What does a trip cost?', to: 'cost', require: { flag: 'yusuf.catch' } },
          { label: 'Who is on your boat?', to: 'crew', require: { flag: 'yusuf.catch' } },
          { label: 'About the sea wall', to: 'wall', require: { discovered: 'coastal-erosion' } },
          { label: 'I will let you mend that', to: 'bye' },
        ],
      },
      catch: {
        effect: {
          flag: 'yusuf.catch',
          discover: 'fishing-livelihood',
          note: { problem: 'fishing-livelihood', text: 'Yusuf: his father fished four hours out, he goes eleven - a family account across two generations.' },
          stat: { observation: 1 },
        },
        text: [
          'My father went out four hours. I go out eleven. The sea did not get bigger.',
          'Why? Trawlers, some say. Warmer water, the college people say. Too many of us, my own brother says. I have been out there forty years and I will not pretend I know the split.',
        ],
        choices: [
          { label: 'Tell me the whole of it', to: 'enc' },
          { label: 'Back', to: 'hub' },
        ],
      },
      enc: {
        effect: { encounter: 'fishing-livelihood' },
        text: 'Sit on the crate. Not that one, that one is wet.',
        end: true,
      },
      cost: {
        effect: {
          discover: 'debt',
          note: { problem: 'fishing-livelihood', text: 'Yusuf: diesel and ice are paid before the boat leaves; the catch decides afterwards whether that was affordable.' },
          stat: { knowledge: 1 },
        },
        text: [
          'Diesel and ice, before we leave. Both paid in advance, both decided by people who have never been on a boat.',
          'Then the sea decides whether that was a good idea. Every single trip is a small loan against a guess.',
        ],
        next: 'hub',
      },
      crew: {
        effect: {
          discover: 'migration-distance',
          note: { problem: 'fishing-livelihood', text: 'Yusuf: two of his crew now work in the city between seasons and may not come back.' },
          stat: { empathy: 1 },
        },
        text: [
          'Four. Was six. Two are in the city now, between seasons, and I do not think they are coming back for the next one.',
          'I am not angry. I told my own son to take the exam instead of the boat. You cannot say that to your son and then be hurt when the crew hears it too.',
        ],
        next: 'hub',
      },
      wall: {
        effect: { stat: { knowledge: 1 }, note: { problem: 'coastal-erosion', text: 'Yusuf on the sea wall: "I am not saying it was done to us. Water has to go somewhere."' } },
        text: [
          'They built it at that end. Now that end is fine.',
          'I am not saying anybody did it to us. I am saying water has to go somewhere, and it went here. Somebody with instruments should say whether I am right. Nobody has come.',
        ],
        next: 'hub',
      },
      repeat: {
        text: 'Still the same net. It is always the same net.',
        choices: [
          { label: 'Ask something', to: 'hub' },
          { label: 'Good season', to: 'bye' },
        ],
      },
      bye: { text: 'Inshallah. Mind the rope on your way past.', end: true },
    },
  },

  lakshmi: {
    id: 'lakshmi',
    name: 'Lakshmi Kolambkar',
    age: 52,
    role: 'Sells fish at the market',
    problem: 'fishing-livelihood',
    look: {
      skin: PAL.skinC,
      hair: PAL.hair,
      hairStyle: 'bun',
      top: PAL.red,
      bottom: PAL.green,
      outfit: 'saree',
      accent: PAL.yellow,
    },
    entry: [
      { require: { flag: 'lakshmi.met' }, node: 'repeat' },
      { node: 'first' },
    ],
    nodes: {
      first: {
        effect: { flag: 'lakshmi.met' },
        text: [
          'Fresh, all of it. Came in at four. Do not make that face at the prawns, they are fine.',
          'Not buying. I know. Ask, then, but let me keep my hands working.',
        ],
        next: 'hub',
      },
      hub: {
        text: 'Well?',
        choices: [
          { label: 'Who decides the price?', to: 'price' },
          { label: 'How was the market before?', to: 'before', require: { flag: 'lakshmi.price' } },
          { label: 'Does your lane flood?', to: 'flood', require: { flag: 'lakshmi.price' } },
          { label: 'I will let you sell', to: 'bye' },
        ],
      },
      price: {
        effect: {
          flag: 'lakshmi.price',
          discover: 'fishing-livelihood',
          note: { problem: 'fishing-livelihood', text: 'Lakshmi: the price is set by ice, transport and the city buyer before she opens her mouth.' },
          stat: { observation: 1 },
        },
        text: [
          'Not me. Not the fish. The ice man, the truck man, and a man in the city I have never met.',
          'By the time it reaches my basket the number is decided. I only get to argue about the last ten rupees, with women who have as little as I do.',
        ],
        choices: [
          { label: 'Tell me the whole of it', to: 'enc' },
          { label: 'Back', to: 'hub' },
        ],
      },
      enc: {
        effect: { encounter: 'fishing-livelihood' },
        text: 'Then sit on the step. Mind your clothes, everything here smells eventually.',
        end: true,
      },
      before: {
        effect: {
          stat: { knowledge: 1 },
          note: { problem: 'fishing-livelihood', text: 'Lakshmi: more sellers than before, smaller baskets each - her description of the same market over twenty years.' },
        },
        text: [
          'Twenty years back there were nine of us on this row. Now there are seventeen.',
          'More sellers, smaller baskets. Nobody left the trade, the trade just got divided thinner. Ask my son what he thinks of that, he will tell you at length.',
        ],
        next: 'hub',
      },
      flood: {
        effect: {
          discover: 'coastal-erosion',
          note: { problem: 'coastal-erosion', text: 'Lakshmi: her mother’s house was third from the water; hers is first, and the house did not move.' },
          stat: { empathy: 1 },
        },
        text: [
          'Two or three days a year. More, if a storm comes in from that side.',
          'My mother’s house was the third one from the water. Mine is the first. Nobody moved the house.',
        ],
        choices: [
          { label: 'That is a lot to carry', to: 'enc_flood' },
          { label: 'Back', to: 'hub' },
        ],
      },
      enc_flood: {
        effect: { encounter: 'coastal-erosion' },
        text: 'Come, I will show you the mark on the wall. It is at my waist now.',
        end: true,
      },
      repeat: {
        text: 'Back? The prawns are still fine.',
        choices: [
          { label: 'Ask something', to: 'hub' },
          { label: 'Next time', to: 'bye' },
        ],
      },
      bye: { text: 'Buy from anybody on this row. Not only me. Anybody.', end: true },
    },
  },

  rohan: {
    id: 'rohan',
    name: 'Rohan Kolambkar',
    age: 17,
    role: 'Lakshmi’s son, finishing school',
    problem: 'migration-distance',
    look: {
      skin: PAL.skinB,
      hair: PAL.hair,
      hairStyle: 'short',
      top: PAL.blue,
      bottom: PAL.grey,
      outfit: 'shirt',
      accessory: 'bag',
    },
    entry: [
      { require: { flag: 'rohan.met' }, node: 'repeat' },
      { node: 'first' },
    ],
    nodes: {
      first: {
        effect: { flag: 'rohan.met' },
        text: [
          'If my mother sent you to tell me to help at the stall, I am helping. This is me helping. I am watching the ice.',
          '...Oh. A survey. Then ask me, nobody asks the ones who are leaving.',
        ],
        next: 'hub',
      },
      hub: {
        text: 'Go on.',
        choices: [
          { label: 'Are you leaving?', to: 'leaving' },
          { label: 'Why not the boats?', to: 'boats', require: { flag: 'rohan.leaving' } },
          { label: 'What does your mother say?', to: 'mother', require: { flag: 'rohan.leaving' } },
          { label: 'Good luck', to: 'bye' },
        ],
      },
      leaving: {
        effect: {
          flag: 'rohan.leaving',
          discover: 'migration-distance',
          note: { problem: 'migration-distance', text: 'Rohan intends to leave for the city after his exams; he says nobody in his family has told him not to.' },
          stat: { observation: 1 },
        },
        text: [
          'After the exams. City, I think. Everyone says city like it is one place with one job in it.',
          'Nobody in my family has told me not to. That is the loudest thing anybody has said about it.',
        ],
        choices: [
          { label: 'Tell me more', to: 'enc' },
          { label: 'Back', to: 'hub' },
        ],
      },
      enc: {
        effect: { encounter: 'migration-distance' },
        text: 'Fine. But I am still watching the ice, so talk fast.',
        end: true,
      },
      boats: {
        effect: {
          discover: 'fishing-livelihood',
          stat: { knowledge: 1 },
          note: { problem: 'fishing-livelihood', text: 'Rohan: eleven-hour trips for a catch that is argued about; he calls the boats "a loan you row".' },
        },
        text: [
          'Because I have been on them. Eleven hours out, and everyone comes back arguing about why it was small.',
          'Yusuf chacha loves it and he still told his own son to take the exam. That is my answer, and it is his answer, he just does not say it in daylight.',
        ],
        next: 'hub',
      },
      mother: {
        effect: {
          discover: 'family-expectation',
          stat: { empathy: 1 },
          note: { problem: 'migration-distance', text: 'Rohan: his mother will not say "stay"; he reads the silence as permission he did not want.' },
        },
        text: [
          'Nothing. That is the point. She says "do what is good" and then she sells fish for eleven hours.',
          'If she said stay, I would have something to argue with. She will not give me that, because she thinks it would be selfish. It would be a relief.',
        ],
        next: 'hub',
      },
      repeat: {
        text: 'Still watching the ice.',
        choices: [
          { label: 'Ask something', to: 'hub' },
          { label: 'See you', to: 'bye' },
        ],
      },
      bye: { text: 'Tell her I was helping. It is even true.', end: true },
    },
  },

  sushila: {
    id: 'sushila',
    name: 'Sushila Naik',
    age: 64,
    role: 'Lives in the low lane',
    problem: 'coastal-erosion',
    look: {
      skin: PAL.skinB,
      hair: PAL.hairGrey,
      hairStyle: 'bun',
      top: PAL.bone,
      bottom: PAL.tealDark,
      outfit: 'saree',
      accent: PAL.red,
    },
    entry: [
      { require: { flag: 'sushila.met' }, node: 'repeat' },
      { node: 'first' },
    ],
    nodes: {
      first: {
        effect: { flag: 'sushila.met' },
        text: [
          'Do not stand there in the wet. Come up on the step.',
          'You want to know about the water. Everybody who comes here wants to know about the water. Nobody comes in June.',
        ],
        next: 'hub',
      },
      hub: {
        text: 'Ask, child.',
        choices: [
          { label: 'How high does it come?', to: 'high' },
          { label: 'What do you do when it comes?', to: 'do', require: { flag: 'sushila.high' } },
          { label: 'Could you move?', to: 'move', require: { flag: 'sushila.high' } },
          { label: 'Thank you', to: 'bye' },
        ],
      },
      high: {
        effect: {
          flag: 'sushila.high',
          discover: 'coastal-erosion',
          note: { problem: 'coastal-erosion', text: 'Sushila: water reaches knee height in the lane two or three times a year, more in a storm.' },
          stat: { observation: 1 },
        },
        text: [
          'To my knee, in the lane. Twice, three times a year. More if a storm comes across.',
          'That mark on the wall is from four years ago. We left it there so nobody argues.',
        ],
        choices: [
          { label: 'Tell me the whole of it', to: 'enc' },
          { label: 'Back', to: 'hub' },
        ],
      },
      enc: {
        effect: { encounter: 'coastal-erosion' },
        text: 'Sit. My knees are not what they were, so I will sit too.',
        end: true,
      },
      do: {
        effect: {
          stat: { empathy: 1 },
          note: { problem: 'coastal-erosion', text: 'Sushila keeps documents and the gas cylinder above waist height all year; the lane organises itself without being asked.' },
        },
        text: [
          'Papers up. Cylinder up. Grandchildren to my sister’s, on the high side.',
          'We do it without discussing it now. Every house in this lane knows its own order of things. That is not resilience, that is practice.',
        ],
        next: 'hub',
      },
      move: {
        effect: {
          discover: 'housing-rent',
          stat: { resilience: 1 },
          note: { problem: 'coastal-erosion', text: 'Sushila: a house in a flooding lane is not worth what a dry one costs, so leaving needs money the flooding removed.' },
        },
        text: [
          'To where, with what? Nobody buys a house in this lane at the price of a house in a dry lane.',
          'So the water takes value from the house, and the missing value is what I would need to leave. Work that circle out and tell me where it opens.',
        ],
        next: 'hub',
      },
      repeat: {
        text: 'Still here. The house is still here also.',
        choices: [
          { label: 'Ask something', to: 'hub' },
          { label: 'Take care', to: 'bye' },
        ],
      },
      bye: { text: 'Go on the high side of the lane. It is drier and it is shorter.', end: true },
    },
  },
}
