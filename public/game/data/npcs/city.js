/**
 * npcs/city.js - Nayanagar: the station, the market and the offices.
 * Schema and effect vocabulary are documented in data/npcs.js.
 */

import { PAL } from '../../js/gfx/Palette.js'

export const CITY_NPCS = {
  anil: {
    id: 'anil',
    name: 'Anil Deshpande',
    age: 38,
    role: 'Commutes in from the eastern line',
    problem: 'commute-time',
    look: {
      skin: PAL.skinA,
      hair: PAL.hair,
      hairStyle: 'short',
      top: PAL.blue,
      bottom: PAL.ink,
      outfit: 'shirt',
      accessory: 'bag',
    },
    entry: [
      { require: { flag: 'anil.met' }, node: 'repeat' },
      { node: 'first' },
    ],
    nodes: {
      first: {
        effect: { flag: 'anil.met' },
        text: [
          'Six minutes. The board says six minutes, which means eleven.',
          'Ask while we wait. Everyone at this end of the platform is waiting for the same thing.',
        ],
        next: 'hub',
      },
      hub: {
        text: 'Go on.',
        choices: [
          { label: 'How long is your day?', to: 'day' },
          { label: 'Why not live closer?', to: 'closer', require: { flag: 'anil.day' } },
          { label: 'What does it cost you?', to: 'cost', require: { flag: 'anil.day' } },
          { label: 'I will let you catch it', to: 'bye' },
        ],
      },
      day: {
        effect: { flag: 'anil.day', stat: { observation: 1 } },
        text: [
          'Out at half past five, back around nine. Ninety minutes each way when nothing goes wrong.',
          'Nothing going wrong is a good week, not a normal one.',
        ],
        next: 'hub',
      },
      closer: {
        effect: {
          discover: 'housing-rent',
          note: { problem: 'housing-rent', text: 'Anil: a deposit near the office would be about four months of everything he does not spend.' },
          stat: { knowledge: 1 },
        },
        text: [
          'With what? The rent I could argue about. The deposit is four months of everything I do not spend.',
          'And my daughter is in a school she likes. That is not nothing, even if it is not on any spreadsheet.',
        ],
        next: 'hub',
      },
      cost: {
        effect: {
          discover: 'commute-time',
          step: 'daily-commute/ask-anil',
          note: { problem: 'commute-time', text: 'Anil: about three hours a day in transit; he describes it as the second largest thing in his life.' },
          stat: { empathy: 1 },
        },
        text: [
          'Three hours a day. Add it up over a year and do not tell me the number, I have done it once and that was enough.',
          'I see my daughter awake for about an hour on weekdays. She is eleven. I know exactly how many of those hours are left.',
        ],
        choices: [
          { label: 'Tell me properly', to: 'enc' },
          { label: 'Back', to: 'hub' },
        ],
      },
      enc: {
        effect: { encounter: 'commute-time' },
        text: 'Alright. The train is late anyway, apparently.',
        end: true,
      },
      repeat: {
        text: 'Same platform. Same six minutes.',
        choices: [
          { label: 'Ask something', to: 'hub' },
          { label: 'Get home safe', to: 'bye' },
        ],
      },
      bye: { text: 'Stand behind the yellow line. People forget, then they are surprised.', end: true },
    },
  },

  farida: {
    id: 'farida',
    name: 'Farida Ansari',
    age: 44,
    role: 'Cleans the station platforms',
    problem: 'air-quality',
    look: {
      skin: PAL.skinC,
      hair: PAL.hair,
      hairStyle: 'long',
      top: PAL.green,
      bottom: PAL.tealDark,
      outfit: 'saree',
      accent: PAL.bone,
      accessory: 'dupatta',
    },
    entry: [
      { require: { flag: 'commute.resolved' }, node: 'after_quest' },
      { require: { questActive: 'daily-commute', flag: 'commute.evidence.ready' }, node: 'report' },
      { require: { questActive: 'daily-commute' }, node: 'quest_progress' },
      { require: { flag: 'farida.met' }, node: 'repeat' },
      { node: 'first' },
    ],
    nodes: {
      first: {
        effect: { flag: 'farida.met' },
        text: [
          'Move that side, I have done this half.',
          '...You are asking questions, not travelling. I can tell. Travellers do not look at the floor.',
        ],
        next: 'hub',
      },
      hub: {
        text: 'What?',
        choices: [
          { label: 'How long on the platform?', to: 'hours' },
          { label: 'What is the air like here?', to: 'air', require: { flag: 'farida.hours' } },
          { label: 'Who do you see most?', to: 'see', require: { flag: 'farida.hours' } },
          { label: 'Could I ask them myself?', to: 'give_quest', require: { flag: 'farida.see', notFlag: 'commute.started' } },
          { label: 'I will get out of your way', to: 'bye' },
        ],
      },
      hours: {
        effect: { flag: 'farida.hours', stat: { observation: 1 } },
        text: [
          'Eight hours, six days. Two platforms and the stairs.',
          'Contract, not railway. People assume railway because of the uniform. It is not the same thing at all.',
        ],
        next: 'hub',
      },
      air: {
        effect: {
          discover: 'air-quality',
          note: { problem: 'air-quality', text: 'Farida: eight hours on the platform daily; her chest tightens every winter, by her own account.' },
          stat: { knowledge: 1 },
        },
        text: [
          'By February my chest is tight. Every year. I do not need a machine to tell me the month.',
          'The doctor says it could be many things. Fine. It is the same many things every February.',
        ],
        choices: [
          { label: 'Tell me more', to: 'enc' },
          { label: 'Back', to: 'hub' },
        ],
      },
      enc: {
        effect: { encounter: 'air-quality' },
        text: 'Stand here a while then. You will see what I mean by evening.',
        end: true,
      },
      see: {
        effect: {
          flag: 'farida.see',
          discover: 'commute-time',
          note: { problem: 'commute-time', text: 'Farida: the same faces at six and at nine; she says nobody looks at anybody, they are saving it.' },
          stat: { empathy: 1 },
        },
        text: [
          'The same faces at six in the morning and the same faces at nine at night.',
          'Nobody looks at anybody. They are saving it for when they get home. I understand it. I do the same on my bus.',
        ],
        next: 'hub',
      },
      give_quest: {
        effect: {
          flags: ['commute.started'],
          quest: 'daily-commute',
          item: 'platform-ticket',
          stat: { communication: 1 },
        },
        text: [
          'Ask them, not me. I only see them, I do not travel with them.',
          'Take this - ten rupees, platform ticket, two hours. Then nobody moves you along while you stand and watch.',
          'Ask that one at the end, he is here every day. And the guard at the office block, he is on the other side of the same arrangement. Then come back and tell me what it adds up to.',
        ],
        next: 'hub',
      },
      quest_progress: {
        text: [
          'Not yet. Ask the commuter, ask the guard, and stand here long enough to actually watch a train empty.',
          'And hold it against something else in that notebook. One thing on its own tells you nothing.',
        ],
        choices: [
          { label: 'Ask something else', to: 'hub' },
          { label: 'On it', to: 'bye' },
        ],
      },
      report: {
        effect: { stat: { communication: 1 } },
        text: [
          'Go on. What does it add up to?',
          'Three hours a day, a twelve-hour shift, and a deposit that decides who travels and who does not.',
          'So it is not laziness and it is not bad planning. It is a timetable made out of three separate arrangements. What do you want done with that?',
        ],
        choices: [
          { label: 'Put it in the survey, with the hours', to: 'resolve_survey' },
          { label: 'Take it to the housing side instead', to: 'resolve_housing' },
          { label: 'I am not sure yet', to: 'resolve_wait' },
        ],
      },
      resolve_survey: {
        effect: {
          flags: ['commute.resolved', 'commute.survey'],
          step: 'daily-commute/report',
          stat: { knowledge: 1, communication: 1 },
          decision: {
            id: 'daily-commute',
            title: 'Three hours that belong to nobody',
            choice: 'Recorded the commute as hours - unpaid, daily, and counted alongside the shift.',
            consequence: 'It puts a number on time that no payslip carries. It changes nothing about the trains.',
          },
        },
        text: [
          'Good. Write the hours, not the feelings. The feelings are in the hours anyway.',
          'People argue with "tiring". Nobody argues with fourteen hours between leaving and returning.',
        ],
        end: true,
      },
      resolve_housing: {
        effect: {
          flags: ['commute.resolved', 'commute.housing'],
          step: 'daily-commute/report',
          stat: { knowledge: 2 },
          decision: {
            id: 'daily-commute',
            title: 'Three hours that belong to nobody',
            choice: 'Filed the commute under housing - the deposit, not the train, as the thing that sets the journey.',
            consequence: 'It points at the cause rather than the symptom, and at an office much further away from this platform.',
          },
        },
        text: [
          'The deposit rather than the train. ...Yes. That is the honest end of it.',
          'It will also go to an office that has never stood on this platform at six in the morning. Both of those are true, and you are choosing anyway. That is fine. Choose.',
        ],
        end: true,
      },
      resolve_wait: {
        effect: { stat: { resilience: 1 } },
        text: [
          'Then do not write it badly in a hurry.',
          'The six-twelve will be late tomorrow as well. Come back.',
        ],
        end: true,
      },
      after_quest: {
        text: [
          'You came back. People do not, usually.',
          'Whatever happens with it - somebody wrote down what this platform costs. That is more than it had yesterday.',
        ],
        choices: [
          { label: 'Ask something', to: 'hub' },
          { label: 'Leave', to: 'bye' },
        ],
      },
      repeat: {
        text: 'Still sweeping. Still February soon.',
        choices: [
          { label: 'Ask something', to: 'hub' },
          { label: 'Take care', to: 'bye' },
        ],
      },
      bye: { text: 'And do not throw that there. I am right here.', end: true },
    },
  },

  ravi: {
    id: 'ravi',
    name: 'Ravi Kale',
    age: 46,
    role: 'Security guard at the office block',
    problem: 'work-hours',
    look: {
      skin: PAL.skinB,
      hair: PAL.hairGrey,
      hairStyle: 'cap',
      capColor: PAL.ink,
      top: PAL.concreteDark,
      bottom: PAL.ink,
      outfit: 'uniform',
      accessory: 'beard',
    },
    entry: [
      { require: { flag: 'ravi.met' }, node: 'repeat' },
      { node: 'first' },
    ],
    nodes: {
      first: {
        effect: { flag: 'ravi.met' },
        text: [
          'Visitors sign here. ...No? Then stand that side of the line, please, there is a camera.',
          'You can talk. Standing is the job. Nobody said silent standing.',
        ],
        next: 'hub',
      },
      hub: {
        text: 'Go on.',
        choices: [
          { label: 'How long is the shift?', to: 'shift' },
          { label: 'Who do you work for?', to: 'employer', require: { flag: 'ravi.shift' } },
          { label: 'About the cart outside', to: 'cart', require: { discovered: 'informal-work' } },
          { label: 'I will move along', to: 'bye' },
        ],
      },
      shift: {
        effect: { flag: 'ravi.shift', step: 'daily-commute/ask-ravi', stat: { observation: 1 } },
        text: [
          'Twelve hours, six days. Seven to seven.',
          'Add the travel and it is fourteen. On the seventh day I sleep, and my wife says I have visited rather than come home.',
        ],
        choices: [
          { label: 'Tell me the whole of it', to: 'enc' },
          { label: 'Back', to: 'hub' },
        ],
      },
      enc: {
        effect: {
          encounter: 'work-hours',
          discover: 'work-hours',
        },
        text: 'Alright. Do not stand in front of the camera while I talk.',
        end: true,
      },
      employer: {
        effect: {
          discover: 'job-insecurity',
          note: { problem: 'work-hours', text: 'Ravi guards one building but is employed by an agency; the building changes agency, the guards mostly stay.' },
          stat: { knowledge: 1 },
        },
        text: [
          'The agency. Not the building. That matters more than you would think.',
          'The building changed agency twice. Same gate, same chair, same me. New uniform each time, and I paid for one of them.',
        ],
        next: 'hub',
      },
      cart: {
        effect: { stat: { empathy: 1 }, note: { problem: 'informal-work', text: 'Ravi: "I am not against her. I am against nobody deciding anything." - on the vendor outside his gate.' } },
        text: [
          'Salma? She is there before me and after me.',
          'My problem is not her. My problem is that people walk on the road to get past, and one day a bike will not stop. Somebody should decide something. Nobody does, so we both look bad.',
        ],
        next: 'hub',
      },
      repeat: {
        text: 'Same chair. Same gate.',
        choices: [
          { label: 'Ask something', to: 'hub' },
          { label: 'Moving on', to: 'bye' },
        ],
      },
      bye: { text: 'Mind the step there. Everyone finds it with their toe.', end: true },
    },
  },

  salma: {
    id: 'salma',
    name: 'Salma Qureshi',
    age: 29,
    role: 'Fruit cart outside the office gate',
    problem: 'informal-work',
    look: {
      skin: PAL.skinB,
      hair: PAL.hair,
      hairStyle: 'braid',
      top: PAL.pink,
      bottom: PAL.purple,
      outfit: 'saree',
      accent: PAL.yellow,
      accessory: 'dupatta',
    },
    entry: [
      { require: { flag: 'salma.met' }, node: 'repeat' },
      { node: 'first' },
    ],
    nodes: {
      first: {
        effect: { flag: 'salma.met' },
        text: [
          'Sweet lime, guava, banana. ...Not buying. Right.',
          'Then stand on that side so people can still see the cart. You can ask, I am not busy for ten minutes.',
        ],
        next: 'hub',
      },
      hub: {
        text: 'Ask.',
        choices: [
          { label: 'How long have you been here?', to: 'years' },
          { label: 'Do you have a licence?', to: 'licence', require: { flag: 'salma.years' } },
          { label: 'What happens on a drive day?', to: 'drive', require: { flag: 'salma.licence' } },
          { label: 'I will let you sell', to: 'bye' },
        ],
      },
      years: {
        effect: { flag: 'salma.years', stat: { observation: 1 } },
        text: [
          'Eleven years, this spot. My mother before me, from the same cart.',
          'Those office people know my name. They do not know my surname, but they know my name.',
        ],
        next: 'hub',
      },
      licence: {
        effect: {
          flag: 'salma.licence',
          discover: 'informal-work',
          note: { problem: 'informal-work', text: 'Salma: eleven years on the same pitch, no settled allotment; she has applied and been told to wait.' },
          stat: { knowledge: 1 },
        },
        text: [
          'I applied. Twice. There is a list, and the list has not moved in three years as far as anyone can tell.',
          'So legally I am nothing. In practice I am a fruit shop. Both of those are true every single morning.',
        ],
        next: 'hub',
      },
      drive: {
        effect: {
          stat: { empathy: 1 },
          note: { problem: 'informal-work', text: 'Salma: on a clearance day the cart is moved and the day’s stock is a loss; fruit does not wait.' },
        },
        text: [
          'They come, we move, they go, we come back. Nobody enjoys it, including them.',
          'But fruit does not wait. A day moved is a day of stock gone soft. That is the part that actually costs.',
        ],
        choices: [
          { label: 'Tell me the whole of it', to: 'enc' },
          { label: 'Back', to: 'hub' },
        ],
      },
      enc: {
        effect: { encounter: 'informal-work' },
        text: 'Then hold this side of the tarpaulin while I talk, it keeps slipping.',
        end: true,
      },
      repeat: {
        text: 'Back? Guava is good today, genuinely.',
        choices: [
          { label: 'Ask something', to: 'hub' },
          { label: 'Not today', to: 'bye' },
        ],
      },
      bye: { text: 'Next time buy something. I will still talk, but buy something.', end: true },
    },
  },

  nikhil: {
    id: 'nikhil',
    name: 'Nikhil Save',
    age: 31,
    role: 'Property broker',
    problem: 'housing-rent',
    look: {
      skin: PAL.skinD,
      hair: PAL.hair,
      hairStyle: 'short',
      top: PAL.white,
      bottom: PAL.blueDark,
      outfit: 'shirt',
      accessory: 'glasses',
    },
    entry: [
      { require: { flag: 'nikhil.met' }, node: 'repeat' },
      { node: 'first' },
    ],
    nodes: {
      first: {
        effect: { flag: 'nikhil.met' },
        text: [
          'One BHK, two BHK, sharing? I have three vacant in this lane.',
          '...Questions. Fine. I will answer honestly, which will not make me look good. Sit.',
        ],
        next: 'hub',
      },
      hub: {
        text: 'Ask.',
        choices: [
          { label: 'Why are deposits so high?', to: 'deposit' },
          { label: 'Who gets refused a flat?', to: 'refused', require: { flag: 'nikhil.deposit' } },
          { label: 'Is any of this changing?', to: 'change', require: { flag: 'nikhil.deposit' } },
          { label: 'Thanks, that is enough', to: 'bye' },
        ],
      },
      deposit: {
        effect: {
          flag: 'nikhil.deposit',
          discover: 'housing-rent',
          note: { problem: 'housing-rent', text: 'Nikhil: deposits are set by what owners fear losing, and by what the last tenant did - his own explanation.' },
          stat: { knowledge: 1 },
        },
        text: [
          'Because an owner cannot get a tenant out quickly if it goes wrong. So they hold money instead.',
          'Is that fair to the tenant? No. Is it irrational? Also no. I am in the middle of that sentence for a living.',
        ],
        choices: [
          { label: 'Walk me through it', to: 'enc' },
          { label: 'Back', to: 'hub' },
        ],
      },
      enc: {
        effect: { encounter: 'housing-rent' },
        text: 'Alright. You will like about half of this.',
        end: true,
      },
      refused: {
        effect: {
          stat: { empathy: 1 },
          note: { problem: 'housing-rent', text: 'Nikhil says owners routinely set conditions on who may rent, and that he passes them on without recording them.' },
        },
        text: [
          'Single men, sometimes. Single women, often, and then they are asked questions a family would never be asked.',
          'Some owners specify things I am not going to repeat to you as if they were my own words. I pass the message and I am part of it. I know that.',
        ],
        next: 'hub',
      },
      change: {
        text: [
          'Deposits came down after the last slowdown. Then they went back up.',
          'What actually changes it is supply. Everything else is people arguing about the same number of rooms.',
        ],
        next: 'hub',
      },
      repeat: {
        text: 'Still looking? Still nothing under four months deposit.',
        choices: [
          { label: 'Ask something', to: 'hub' },
          { label: 'Just passing', to: 'bye' },
        ],
      },
      bye: { text: 'My number is on the board. Everyone’s is.', end: true },
    },
  },
}
