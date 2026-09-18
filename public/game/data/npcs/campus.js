/**
 * npcs/campus.js - Vidya Nagar: the college, the coaching lane and the library.
 * Schema and effect vocabulary are documented in data/npcs.js.
 */

import { PAL } from '../../js/gfx/Palette.js'

export const CAMPUS_NPCS = {
  nitin: {
    id: 'nitin',
    name: 'Nitin Gaikwad',
    age: 24,
    role: 'Graduate, works at a phone shop',
    problem: 'graduate-work',
    look: {
      skin: PAL.skinB,
      hair: PAL.hair,
      hairStyle: 'short',
      top: PAL.teal,
      bottom: PAL.ink,
      outfit: 'shirt',
    },
    entry: [
      { require: { flag: 'nitin.met' }, node: 'repeat' },
      { node: 'first' },
    ],
    nodes: {
      first: {
        effect: { flag: 'nitin.met' },
        text: [
          'You are from Shivnagar. I can hear it.',
          'I graduated from here. Now I sell phone cases two lanes down. Go on, ask, everyone gets there eventually.',
        ],
        next: 'hub',
      },
      hub: {
        text: 'Go on.',
        choices: [
          { label: 'What did you study?', to: 'study' },
          { label: 'How long have you been applying?', to: 'applying', require: { flag: 'nitin.study' } },
          { label: 'What do you tell your family?', to: 'family', require: { flag: 'nitin.applying' } },
          { label: 'What would you tell Deepak?', to: 'deepak', require: { discovered: 'exam-pressure' } },
          { label: 'I will let you get on', to: 'bye' },
        ],
      },
      study: {
        effect: { flag: 'nitin.study', stat: { observation: 1 } },
        text: [
          'Commerce. Second class, which is a sentence people say about a person.',
          'The fee was three years of my mother not replacing anything in the house.',
        ],
        next: 'hub',
      },
      applying: {
        effect: {
          flag: 'nitin.applying',
          discover: 'graduate-work',
          note: { problem: 'graduate-work', text: 'Nitin: roughly two years of applications; he counts one interview that reached a second round.' },
          stat: { knowledge: 1 },
        },
        text: [
          'Two years. One interview that went to a second round, and I still think about what I said in it.',
          'There is a bank exam. Everyone I know is writing the same bank exam. Thirty thousand of us for a number of posts I can count on two hands.',
        ],
        choices: [
          { label: 'Tell me properly', to: 'enc' },
          { label: 'Back', to: 'hub' },
        ],
      },
      enc: {
        effect: { encounter: 'graduate-work' },
        text: 'Sit on the wall. This is not a short answer, and I have had two years to get it wrong.',
        end: true,
      },
      family: {
        effect: {
          discover: 'family-expectation',
          note: { problem: 'graduate-work', text: 'Nitin tells his family he is "preparing"; he calls the shop work temporary out loud and permanent in his head.' },
          stat: { empathy: 1 },
        },
        text: [
          'That I am preparing. Which is true. I do prepare, between customers.',
          'At home the shop is temporary. In my head it has been temporary for twenty-two months. I have not said that sentence out loud before.',
        ],
        next: 'hub',
      },
      deepak: {
        effect: { stat: { communication: 1 } },
        text: [
          'The boy at the school wall? Tell him to keep going. What else is there to tell him?',
          'But also tell him to apply for things while he prepares. I did not. I treated preparing as a full-time job with no salary, for two years.',
        ],
        next: 'hub',
      },
      repeat: {
        text: 'Still here. Shift starts at four.',
        choices: [
          { label: 'Ask something', to: 'hub' },
          { label: 'Good luck', to: 'bye' },
        ],
      },
      bye: { text: 'Yeah. You too. Genuinely.', end: true },
    },
  },

  anjali: {
    id: 'anjali',
    name: 'Prof. Anjali Rao',
    age: 47,
    role: 'Teaches commerce at the college',
    problem: 'graduate-work',
    look: {
      skin: PAL.skinD,
      hair: PAL.hairGrey,
      hairStyle: 'bun',
      top: PAL.purple,
      bottom: PAL.ink,
      outfit: 'saree',
      accent: PAL.white,
      accessory: 'glasses',
    },
    entry: [
      { require: { flag: 'anjali.met' }, node: 'repeat' },
      { node: 'first' },
    ],
    nodes: {
      first: {
        effect: { flag: 'anjali.met' },
        text: [
          'Class is in fifteen minutes, so this is a real fifteen minutes, not a polite one.',
          'A ward survey. Good. Ask me the difficult one first, we will get further.',
        ],
        next: 'hub',
      },
      hub: {
        text: 'Well?',
        choices: [
          { label: 'Do your students find work?', to: 'work' },
          { label: 'Is it the degree or the jobs?', to: 'which', require: { flag: 'anjali.work' } },
          { label: 'What do the fees pay for?', to: 'fees', require: { flag: 'anjali.work' } },
          { label: 'I will let you teach', to: 'bye' },
        ],
      },
      work: {
        effect: {
          flag: 'anjali.work',
          discover: 'graduate-work',
          note: { problem: 'graduate-work', text: 'Prof. Rao: most of her graduates find work; the argument is about what kind, not whether.' },
          stat: { knowledge: 1 },
        },
        text: [
          'Most of them find work. That is the answer people do not expect, so let me finish it.',
          'They find work below the level the degree was for. The degree was not useless. It was also not the ladder it was sold as.',
        ],
        next: 'hub',
      },
      which: {
        effect: { stat: { knowledge: 1 }, note: { problem: 'graduate-work', text: 'Prof. Rao names both readings - too few posts, and courses disconnected from employers - and refuses to pick one.' } },
        text: [
          'Both, and anybody who tells you it is only one is selling something.',
          'There are not enough posts near here. And what I teach is not connected to the people doing the hiring. I can fix the second. I cannot fix the first from a classroom.',
        ],
        choices: [
          { label: 'Go deeper', to: 'enc' },
          { label: 'Back', to: 'hub' },
        ],
      },
      enc: {
        effect: { encounter: 'graduate-work' },
        text: 'Then walk with me to the department. I will talk and you will keep up.',
        end: true,
      },
      fees: {
        effect: {
          discover: 'education-cost',
          note: { problem: 'education-cost', text: 'Prof. Rao: the fee is a small part of what a family spends; the hostel, the travel and the coaching are the rest.' },
          stat: { empathy: 1 },
        },
        text: [
          'The fee here is not the large number. The hostel, the travel, the coaching classes they take on top of us - that is the large number.',
          'A family sees one bill and pays five. Then they call the result a failure if it does not arrive.',
        ],
        next: 'hub',
      },
      repeat: {
        text: 'Back? Ask, I have ten minutes.',
        choices: [
          { label: 'Ask something', to: 'hub' },
          { label: 'Later', to: 'bye' },
        ],
      },
      bye: { text: 'Read something outside your syllabus this week. Anything.', end: true },
    },
  },

  sneha: {
    id: 'sneha',
    name: 'Sneha Kulkarni',
    age: 20,
    role: 'Repeating an attempt at the coaching centre',
    problem: 'exam-pressure',
    look: {
      skin: PAL.skinD,
      hair: PAL.hair,
      hairStyle: 'braid',
      top: PAL.saffron,
      bottom: PAL.blueDark,
      outfit: 'dress',
      accent: PAL.white,
      accessory: 'bag',
    },
    entry: [
      { require: { flag: 'sneha.met' }, node: 'repeat' },
      { node: 'first' },
    ],
    nodes: {
      first: {
        effect: { flag: 'sneha.met' },
        text: [
          'Batch ends at seven, the next one starts at seven, so nobody actually leaves.',
          'You are asking about the survey. Fine. But do not write my rank anywhere.',
        ],
        next: 'hub',
      },
      hub: {
        text: 'Go on.',
        choices: [
          { label: 'Second attempt?', to: 'attempt' },
          { label: 'What does a day look like?', to: 'day', require: { flag: 'sneha.attempt' } },
          { label: 'Who decided you would repeat?', to: 'decided', require: { flag: 'sneha.day' } },
          { label: 'I will let you study', to: 'bye' },
        ],
      },
      attempt: {
        effect: { flag: 'sneha.attempt', discover: 'exam-pressure', stat: { observation: 1 } },
        text: [
          'Second. I was four hundred and something ranks off.',
          'Four hundred ranks sounds like a lot. In that exam it is a bad morning.',
        ],
        next: 'hub',
      },
      day: {
        effect: {
          flag: 'sneha.day',
          note: { problem: 'exam-pressure', text: 'Sneha: batches from seven to seven, a hostel bed, and a phone she has handed to the warden herself.' },
          stat: { knowledge: 1 },
        },
        text: [
          'Class, test, correction, class. Hostel at nine. Phone with the warden - my idea, not theirs, before you write that down wrongly.',
          'I do not know anybody’s surname here. Just their ranks. That is what the year is.',
        ],
        choices: [
          { label: 'That is a lot to hold', to: 'enc' },
          { label: 'Back', to: 'hub' },
        ],
      },
      enc: {
        effect: { encounter: 'exam-pressure' },
        text: 'It is fine. ...Alright, sit. Ten minutes, then I have a test.',
        end: true,
      },
      decided: {
        effect: {
          discover: 'family-expectation',
          note: { problem: 'family-expectation', text: 'Sneha says she asked to repeat; her father sold a plot for the year, which she learned from an aunt.' },
          stat: { empathy: 1 },
        },
        text: [
          'I did. Genuinely, I asked.',
          'Then my father sold a plot for this year. Nobody told me, an aunt did. So now it is my decision with their money in it, and those are different things wearing the same word.',
        ],
        next: 'hub',
      },
      repeat: {
        text: 'Same corridor. Same seven o’clock.',
        choices: [
          { label: 'Ask something', to: 'hub' },
          { label: 'Good luck', to: 'bye' },
        ],
      },
      bye: { text: 'Thanks. Do not say "relax", everyone says "relax".', end: true },
    },
  },

  arif: {
    id: 'arif',
    name: 'Arif Mulla',
    age: 21,
    role: 'Student, works nights at the canteen',
    problem: 'education-cost',
    look: {
      skin: PAL.skinB,
      hair: PAL.hair,
      hairStyle: 'short',
      top: PAL.bone,
      bottom: PAL.grey,
      outfit: 'shirt',
      accessory: 'bag',
    },
    entry: [
      { require: { flag: 'arif.met' }, node: 'repeat' },
      { node: 'first' },
    ],
    nodes: {
      first: {
        effect: { flag: 'arif.met' },
        text: [
          'Two minutes, I am counting change. ...Right.',
          'Third year. And the counter, five to eleven. Both are mine, so ask about either.',
        ],
        next: 'hub',
      },
      hub: {
        text: 'Which one?',
        choices: [
          { label: 'How do the two fit together?', to: 'fit' },
          { label: 'Does the college know?', to: 'know', require: { flag: 'arif.fit' } },
          { label: 'What would you change?', to: 'change', require: { flag: 'arif.fit' } },
          { label: 'I will let you work', to: 'bye' },
        ],
      },
      fit: {
        effect: {
          flag: 'arif.fit',
          discover: 'education-cost',
          note: { problem: 'education-cost', text: 'Arif works 5pm to 11pm at the canteen to cover fees and hostel; he studies between six and eight in the morning.' },
          stat: { observation: 1 },
        },
        text: [
          'They do not. I study six to eight in the morning because that is what is left.',
          'The fee is one payment in June. The hostel is every month. The second one is the one that decides things.',
        ],
        choices: [
          { label: 'Tell me the whole of it', to: 'enc' },
          { label: 'Back', to: 'hub' },
        ],
      },
      enc: {
        effect: { encounter: 'education-cost' },
        text: 'Alright, but if someone comes for tea I am stopping mid-sentence.',
        end: true,
      },
      know: {
        effect: { stat: { knowledge: 1 } },
        text: [
          'Some teachers know. Rao madam knows, she does not make a thing of it, which is the correct amount of knowing.',
          'There is a scholarship. The form needs three certificates and one of them needs my father, and he is in Dubai. So.',
        ],
        next: 'hub',
      },
      change: {
        effect: {
          discover: 'bureaucracy',
          stat: { empathy: 1 },
          note: { problem: 'bureaucracy', text: 'Arif: the scholarship form requires documents that assume a parent is locally available.' },
        },
        text: [
          'Make the scholarship form assume a person like me exists. That is it. That is the whole answer.',
          'Not more money. The money exists. The form does not believe in my family.',
        ],
        next: 'hub',
      },
      repeat: {
        text: 'Counter again. Same counter.',
        choices: [
          { label: 'Ask something', to: 'hub' },
          { label: 'Later', to: 'bye' },
        ],
      },
      bye: { text: 'Tea is six rupees if you ever want one.', end: true },
    },
  },
}
