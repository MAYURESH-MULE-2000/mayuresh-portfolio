/**
 * npcs.js
 * ---------------------------------------------------------------------------
 * The people of Shivnagar. Each NPC is data: a look (fed to the shared sprite
 * painter), an entry rule list that picks a starting node based on world state,
 * and a graph of dialogue nodes.
 *
 * Node shape:
 *   text    - one string, or an array of strings shown as consecutive pages
 *   choices - [{ label, to, require?, effect? }]
 *   next    - node to continue to when there are no choices
 *   effect  - applied once, when the node is entered
 *   end     - true closes the conversation after this node
 *
 * Effects understood by DialogueManager:
 *   discover: problemId        note: {problem, text}
 *   flags: ['a', 'b']          decision: {id, title, choice, consequence}
 *   stat: {empathy: 1, ...}    flag: 'name'   item: 'itemId'
 *   quest: 'questId'           step: 'questId/stepId'
 *   encounter: problemId       rest: true
 *
 * Requirements understood by DialogueManager:
 *   flag, notFlag, item, discovered, stat: {key: min}, questDone, questActive
 *
 * On writing: people here speak in short sentences, interrupt themselves, and
 * do not explain their circumstances to the player as if reading a report. Where
 * someone states an opinion about a cause, the dialogue says so.
 */

import { PAL } from '../js/gfx/Palette.js'

export const NPCS = {
  // =========================================================================
  rekha: {
    id: 'rekha',
    name: 'Rekha Sawant',
    age: 41,
    role: 'Runs Sawant Stores',
    problem: 'cost-of-living',
    look: {
      skin: PAL.skinB,
      hair: PAL.hair,
      hairStyle: 'bun',
      top: PAL.teal,
      bottom: PAL.purple,
      outfit: 'saree',
      accent: PAL.yellow,
    },
    entry: [
      { require: { flag: 'rekha.helped' }, node: 'after_help' },
      { require: { flag: 'rekha.met' }, node: 'repeat' },
      { node: 'first' },
    ],
    nodes: {
      first: {
        effect: { flag: 'rekha.met' },
        text: [
          'One second. Let me finish this column.',
          'Right. You are the one going around with a notebook. Shalini’s child.',
        ],
        next: 'q_hub',
      },
      q_hub: {
        text: 'Ask. I can talk and weigh at the same time.',
        choices: [
          { label: 'How is the shop doing?', to: 'shop' },
          { label: 'What is the notebook for?', to: 'credit', require: { flag: 'rekha.shop' } },
          { label: 'About the heap outside', to: 'waste', require: { flag: 'rekha.shop' } },
          { label: 'The road, before you go', to: 'road_q', require: { questActive: 'road-cost' } },
          { label: 'I will let you work', to: 'bye' },
        ],
      },
      shop: {
        effect: { flag: 'rekha.shop', stat: { observation: 1 } },
        text: [
          'Steady. Same customers, twenty years, most of them.',
          'What changed is the size. Same person, same money, smaller packet. Half kilo instead of one.',
          'They do not say anything. I just see it in what I am weighing.',
        ],
        next: 'shop_follow',
      },
      shop_follow: {
        text: 'You can write that down if you want. It is not a secret.',
        choices: [
          { label: 'Does that worry you?', to: 'shop_worry' },
          { label: 'Back', to: 'q_hub' },
        ],
      },
      shop_worry: {
        effect: {
          discover: 'cost-of-living',
          note: {
            problem: 'cost-of-living',
            text: 'Rekha notices the change first in packet size, not in customer numbers.',
          },
          stat: { knowledge: 1 },
        },
        text: [
          'Worry is a strong word. I plan.',
          'But yes. When people start buying less of the thing they already buy least of, something is wrong further up.',
        ],
        choices: [
          { label: 'Tell me more about that', to: 'enc_cost' },
          { label: 'Back', to: 'q_hub' },
        ],
      },
      enc_cost: {
        text: 'Sit on the sack. This takes more than one sentence.',
        effect: { encounter: 'cost-of-living' },
        end: true,
      },
      credit: {
        effect: {
          discover: 'debt',
          note: { problem: 'debt', text: 'Sawant Stores carries households on credit between earnings. Rekha keeps the names to herself.' },
          stat: { observation: 1, empathy: 1 },
        },
        text: [
          'Credit. Who owes what.',
          'No, you cannot read it. Those are my neighbours.',
          'Some of them clear it the day the money comes. Some carry it for months. I am not a bank, but for some houses I am the nearest thing.',
        ],
        choices: [
          { label: 'Is that hard on you?', to: 'credit_hard' },
          { label: 'Back', to: 'q_hub' },
        ],
      },
      credit_hard: {
        text: [
          'It is money I have already spent on stock and not yet been paid for. Do the arithmetic.',
          'Do I stop? Then a family eats less this week. So I do not stop. That is the whole thinking.',
        ],
        next: 'q_hub',
      },
      waste: {
        effect: {
          discover: 'waste-collection',
          note: { problem: 'waste-collection', text: 'Rekha sweeps her frontage daily; the heap returns by evening.' },
        },
        text: [
          'The heap. Yes.',
          'I sweep at six. By seven in the evening it is back. Not from my shop, before you write that.',
          'Everyone here blames everyone. Meanwhile it sits next to the drain.',
        ],
        next: 'q_hub',
      },
      road_q: {
        effect: {
          step: 'road-cost/ask-rekha',
          note: { problem: 'road-condition', text: 'Rekha: the fruit cart stopped coming down this lane after the patch broke open.' },
          stat: { knowledge: 1 },
        },
        text: [
          'That hole? It cost me a customer, in a way.',
          'The fruit cart used to come down this lane. He stopped. Said his axle could not take it twice a week.',
          'So people walk further for fruit, or they buy less fruit. That is the road, showing up in my shop.',
        ],
        next: 'q_hub',
      },
      repeat: {
        text: 'Still writing? Good. Somebody should.',
        choices: [
          { label: 'Ask something', to: 'q_hub' },
          { label: 'Just passing', to: 'bye' },
        ],
      },
      after_help: {
        text: [
          'The drain is clearing better since they took the heap back. Do not look so pleased, it will return.',
          'But it is better. I will say that much.',
        ],
        choices: [
          { label: 'Ask something', to: 'q_hub' },
          { label: 'Leave', to: 'bye' },
        ],
      },
      bye: { text: 'Go on. And eat something.', end: true },
    },
  },

  // =========================================================================
  imran: {
    id: 'imran',
    name: 'Imran Shaikh',
    age: 27,
    role: 'Delivery rider',
    problem: 'job-insecurity',
    look: {
      skin: PAL.skinA,
      hair: PAL.hair,
      hairStyle: 'cap',
      capColor: PAL.red,
      top: PAL.red,
      bottom: PAL.ink,
      outfit: 'shirt',
      accessory: 'bag',
    },
    entry: [
      { require: { flag: 'imran.met' }, node: 'repeat' },
      { node: 'first' },
    ],
    nodes: {
      first: {
        effect: { flag: 'imran.met' },
        text: [
          'Two minutes. I am waiting for the next one to come through.',
          'You can ask while I wait. Standing still is the only free time in this job.',
        ],
        next: 'hub',
      },
      hub: {
        text: 'Go on.',
        choices: [
          { label: 'How much do you ride in a day?', to: 'hours' },
          { label: 'Is the money steady?', to: 'money', require: { flag: 'imran.hours' } },
          { label: 'Would you go back to a shop job?', to: 'shopjob', require: { flag: 'imran.money' } },
          { label: 'Let you get on', to: 'bye' },
        ],
      },
      hours: {
        effect: { flag: 'imran.hours', stat: { observation: 1 } },
        text: [
          'Eleven hours. Sometimes twelve.',
          'Not riding the whole time. Waiting counts too, and waiting does not pay.',
        ],
        next: 'hub',
      },
      money: {
        effect: {
          flag: 'imran.money',
          discover: 'job-insecurity',
          note: { problem: 'job-insecurity', text: 'Imran: earnings swing week to week; fuel, phone and bike repairs come out of his own pocket.' },
          stat: { knowledge: 1 },
        },
        text: [
          'Steady?',
          'A good week and a bad week are the same effort. That is the part that gets to you.',
          'And fuel is mine. Phone is mine. If the bike stops, that is mine too. Nobody pays me to have a bad Tuesday.',
        ],
        choices: [
          { label: 'Tell me the whole of it', to: 'enc' },
          { label: 'Back', to: 'hub' },
        ],
      },
      enc: {
        effect: { encounter: 'job-insecurity' },
        text: 'Fine. But if the phone goes, I go.',
        end: true,
      },
      shopjob: {
        effect: { stat: { empathy: 1 }, note: { problem: 'job-insecurity', text: 'Imran turned down a fixed shop job that paid less; he calls the choice "mine, and I would make it again, most days."' } },
        text: [
          'There was one. Fixed pay, fixed hours, less money.',
          'I said no. My choice, nobody forced me. Some days I think about it.',
          'The freedom is real, understand. So is the floor being missing. People want me to say only one of those.',
        ],
        next: 'hub',
      },
      repeat: {
        text: 'Back again? Ask, but I am watching the phone.',
        choices: [
          { label: 'Ask something', to: 'hub' },
          { label: 'Nothing, ride safe', to: 'bye' },
        ],
      },
      bye: { text: 'Right. Moving.', end: true },
    },
  },

  // =========================================================================
  sunita: {
    id: 'sunita',
    name: 'Sunita Kamble',
    age: 34,
    role: 'Community health worker',
    problem: 'healthcare-access',
    look: {
      skin: PAL.skinC,
      hair: PAL.hair,
      hairStyle: 'braid',
      top: PAL.white,
      bottom: PAL.blueDark,
      outfit: 'uniform',
      accessory: 'bag',
    },
    entry: [
      { require: { flag: 'sunita.met' }, node: 'repeat' },
      { node: 'first' },
    ],
    nodes: {
      first: {
        effect: { flag: 'sunita.met' },
        text: [
          'You are Shalini’s. I weighed you once, long back.',
          'I have four houses left before lunch, so talk while I walk, or talk fast.',
        ],
        next: 'hub',
      },
      hub: {
        text: 'Which is it?',
        choices: [
          { label: 'What does your work cover?', to: 'work' },
          { label: 'What happens if it is serious?', to: 'serious', require: { flag: 'sunita.work' } },
          { label: 'The road, when you carry someone', to: 'road_q', require: { questActive: 'road-cost' } },
          { label: 'The students you mentioned', to: 'students', require: { discovered: 'exam-pressure' } },
          { label: 'Let you go', to: 'bye' },
        ],
      },
      work: {
        effect: { flag: 'sunita.work', stat: { knowledge: 1 } },
        text: [
          'Weights, pressure, medicines, follow-ups. Reminding people to finish a course they stopped when they felt better.',
          'The centre has OPD hours. On Tuesdays the doctor is on field duty. That is written on the board, but people still come on Tuesdays.',
        ],
        next: 'hub',
      },
      serious: {
        effect: {
          discover: 'healthcare-access',
          note: { problem: 'healthcare-access', text: 'Sunita covers the ward on foot and by bus. Anything serious is referred to the city hospital.' },
          stat: { empathy: 1 },
        },
        text: [
          'Then it is the city. Forty kilometres.',
          'I can reach every house in this ward. I cannot be a hospital. People look at me as if I am one, and I understand why they do.',
          'A day going to the city is also a day not earned. So people wait. Waiting is the expensive part.',
        ],
        choices: [
          { label: 'Walk me through it properly', to: 'enc' },
          { label: 'Back', to: 'hub' },
        ],
      },
      enc: {
        effect: { encounter: 'healthcare-access' },
        text: 'Come on then. Walk with me.',
        end: true,
      },
      students: {
        effect: { stat: { empathy: 1 }, note: { problem: 'exam-pressure', text: 'Sunita says she sees exam-season students for sleep, stomach and appetite complaints - her own observation, not a diagnosis.' } },
        text: [
          'Every February the same complaints. Stomach, sleep, appetite.',
          'I am not a doctor and I will not pretend to name it. I can tell you what I see, and I see it every year at the same time.',
        ],
        next: 'hub',
      },
      road_q: {
        effect: {
          step: 'road-cost/ask-sunita',
          note: { problem: 'road-condition', text: 'Sunita: the broken stretch is on the route any stretcher case takes out of the ward.' },
          stat: { observation: 1 },
        },
        text: [
          'That patch is on the way out of the ward. Every stretcher case goes over it.',
          'You have not heard the sound a person makes when a vehicle drops into that hole. I have.',
          'So when someone tells me it is a small thing - it is a small thing on a good day.',
        ],
        next: 'hub',
      },
      repeat: {
        text: 'Still here? Ask, quickly.',
        choices: [
          { label: 'Ask something', to: 'hub' },
          { label: 'Nothing today', to: 'bye' },
        ],
      },
      bye: { text: 'Drink water. It is hotter than it looks.', end: true },
    },
  },

  // =========================================================================
  deepak: {
    id: 'deepak',
    name: 'Deepak Rathod',
    age: 19,
    role: 'Studying for entrance exams',
    problem: 'exam-pressure',
    look: {
      skin: PAL.skinA,
      hair: PAL.hair,
      hairStyle: 'short',
      top: PAL.blue,
      bottom: PAL.grey,
      outfit: 'shirt',
      accessory: 'glasses',
    },
    entry: [
      { require: { flag: 'deepak.met' }, node: 'repeat' },
      { node: 'first' },
    ],
    nodes: {
      first: {
        effect: { flag: 'deepak.met' },
        text: [
          'Do not tell me it is a nice day. I know. I am outside, I can see it.',
          '...sorry. That was rude. Three hours on one chapter and it is still not in my head.',
        ],
        next: 'hub',
      },
      hub: {
        text: 'What?',
        choices: [
          { label: 'Why study out here?', to: 'here' },
          { label: 'What happens if you clear it?', to: 'clear', require: { flag: 'deepak.here' } },
          { label: 'And if you do not?', to: 'notclear', require: { flag: 'deepak.clear' } },
          { label: 'What does it cost?', to: 'cost', require: { flag: 'deepak.here' } },
          { label: 'Leave him to it', to: 'bye' },
        ],
      },
      here: {
        effect: { flag: 'deepak.here', stat: { observation: 1 } },
        text: [
          'The reading room fills by seven. I was at half past.',
          'At home there are four of us in two rooms and my sister has her own exams. So, the wall outside the school.',
        ],
        next: 'hub',
      },
      clear: {
        effect: { flag: 'deepak.clear', discover: 'exam-pressure' },
        text: [
          'Then everyone was right to wait.',
          'My father tells people his son is preparing. He says it like it is already a job.',
        ],
        next: 'hub',
      },
      notclear: {
        effect: {
          stat: { empathy: 1 },
          discover: 'family-expectation',
          note: { problem: 'family-expectation', text: 'Deepak: "They have never once shouted at me about it. That is somehow worse."' },
        },
        text: [
          'Then everyone waited for nothing. And nobody will say that, which is worse.',
          'They have never shouted at me. Not once. I almost wish they would - then I could argue with it.',
        ],
        choices: [
          { label: 'That sounds heavy', to: 'enc' },
          { label: 'Back', to: 'hub' },
        ],
      },
      enc: {
        effect: { encounter: 'exam-pressure' },
        text: 'It is. Sit. The chapter is not going anywhere.',
        end: true,
      },
      cost: {
        effect: {
          discover: 'education-cost',
          note: { problem: 'education-cost', text: 'Deepak: the coaching fee was paid in one instalment his family had saved towards; his sister’s admission falls in the same season.' },
          stat: { knowledge: 1 },
        },
        text: [
          'The coaching fee was one payment. They had been putting it aside for two years.',
          'My sister’s admission is the same season. If I take another attempt, her turn moves.',
          'Nobody has said that out loud. Everybody has done the arithmetic.',
        ],
        next: 'hub',
      },
      repeat: {
        text: 'Same wall. Same chapter.',
        choices: [
          { label: 'Ask something', to: 'hub' },
          { label: 'Good luck', to: 'bye' },
        ],
      },
      bye: { text: 'Yeah. Thanks.', end: true },
    },
  },

  // =========================================================================
  vasant: {
    id: 'vasant',
    name: 'Vasant Pawar',
    age: 58,
    role: 'Retired ward clerk',
    problem: 'bureaucracy',
    look: {
      skin: PAL.skinB,
      hair: PAL.hairGrey,
      hairStyle: 'bald',
      top: PAL.bone,
      bottom: PAL.concreteDark,
      outfit: 'kurta',
      accessory: 'glasses',
    },
    entry: [
      { require: { flag: 'road.resolved' }, node: 'after_quest' },
      { require: { questActive: 'road-cost', flag: 'road.evidence.ready' }, node: 'report' },
      { require: { questActive: 'road-cost' }, node: 'quest_progress' },
      { require: { flag: 'vasant.met' }, node: 'repeat' },
      { node: 'first' },
    ],
    nodes: {
      first: {
        effect: { flag: 'vasant.met' },
        text: [
          'Sit, sit. You have been walking since morning, I have been watching you do it.',
          'Thirty-one years at the ward office. Now I watch the road. The road is more honest.',
        ],
        next: 'hub',
      },
      hub: {
        text: 'Ask me something. I have nowhere to be.',
        choices: [
          { label: 'What did you do at the office?', to: 'office' },
          { label: 'Can a complaint actually work?', to: 'complaint', require: { flag: 'vasant.office' } },
          { label: 'About the broken road', to: 'road', require: { flag: 'vasant.office' } },
          { label: 'How is the pension?', to: 'pension', require: { flag: 'vasant.office' } },
          { label: 'Leave him to the shade', to: 'bye' },
        ],
      },
      office: {
        effect: { flag: 'vasant.office', stat: { knowledge: 1 } },
        text: [
          'Receipts, registers, forwarding. The unglamorous middle of everything.',
          'People think an office like that is a wall. It is not a wall. It is a queue with rules, and the rules are written down.',
        ],
        next: 'hub',
      },
      complaint: {
        effect: {
          discover: 'bureaucracy',
          note: { problem: 'bureaucracy', text: 'Vasant calls the process "slow and literal rather than corrupt" - he is explicit that this is his own reading.' },
          stat: { knowledge: 1 },
        },
        text: [
          'It can. It is slow, it is literal, and it rewards whoever writes the right words on the right form.',
          'That is my opinion, understand, from my side of the counter. Ganesh will tell you it is a waste of half a day. He is not wrong either.',
        ],
        choices: [
          { label: 'Take me through it', to: 'enc_bureau' },
          { label: 'Back', to: 'hub' },
        ],
      },
      enc_bureau: {
        effect: { encounter: 'bureaucracy' },
        text: 'Then listen properly, because most people do not.',
        end: true,
      },
      pension: {
        effect: {
          discover: 'cost-of-living',
          note: { problem: 'cost-of-living', text: 'Vasant: a fixed pension against moving prices - his description of his own month.' },
          stat: { empathy: 1 },
        },
        text: [
          'It arrives. On time, mostly. It is a fixed number meeting a moving one.',
          'I do not complain about it in front of Fatima. She has a machine to pay for. Everyone here is carrying something.',
        ],
        next: 'hub',
      },
      road: {
        effect: {
          discover: 'road-condition',
          quest: 'road-cost',
          stat: { observation: 1 },
        },
        text: [
          'Three times that patch has been repaired. Three.',
          'You want to know what I think? Patching a hole in a road that cannot drain is not a repair, it is a receipt.',
          'But I am one old man with an opinion. Go and find out what it actually costs people. Then come back to me.',
        ],
        next: 'hub',
      },
      quest_progress: {
        text: [
          'Not yet. Go and ask. Ganesh, Sunita, Rekha - three different people, three different costs.',
          'And look at the hole yourself. Properly. Not a glance.',
        ],
        choices: [
          { label: 'Ask something else', to: 'hub' },
          { label: 'On my way', to: 'bye' },
        ],
      },
      report: {
        effect: { stat: { communication: 1 } },
        text: [
          'Go on then. What did you find?',
          'Repairs paid by a driver. A stretcher going over it. A fruit cart that stopped coming. And standing water with nowhere to drain.',
          'That is not a complaint about a hole any more. That is four people’s week. So - what do you want to do with it?',
        ],
        choices: [
          { label: 'File it properly, with you', to: 'resolve_file' },
          { label: 'Get the drain cleared first', to: 'resolve_drain' },
          { label: 'I am not ready to decide', to: 'resolve_wait' },
        ],
      },
      resolve_file: {
        effect: {
          flags: ['road.resolved', 'road.filed'],
          step: 'road-cost/resolve',
          item: 'complaint-form',
          stat: { communication: 2, knowledge: 1 },
          decision: {
            id: 'road-cost',
            title: 'The road at the low point',
            choice: 'Filed a written complaint with Vasant, naming drainage as the cause.',
            consequence: 'Vasant expects months, not weeks. The evidence is now on a record that exists.',
          },
        },
        text: [
          'Good. Then we write it correctly, once.',
          'Not "the road is bad". Location, dates, what it cost, and the word drainage in the first line. Otherwise they patch it again and we meet here next year.',
          'It will take months. I want you to know that before you feel clever about it.',
        ],
        end: true,
      },
      resolve_drain: {
        effect: {
          flags: ['road.resolved', 'road.drain'],
          step: 'road-cost/resolve',
          stat: { communication: 1, empathy: 2 },
          decision: {
            id: 'road-cost',
            title: 'The road at the low point',
            choice: 'Organised neighbours to clear the drain and move the waste heap back from it.',
            consequence: 'The standing water drops. The broken surface is still broken, and the cause is not on any record.',
          },
        },
        text: [
          'Practical. I will not pretend that is wrong.',
          'Clear the drain, move that heap back from it, and the water has somewhere to go. The hole stays a hole.',
          'It helps this monsoon. It fixes nothing after it. Both of those are true, and you chose knowing that.',
        ],
        end: true,
      },
      resolve_wait: {
        effect: { stat: { resilience: 1 } },
        text: [
          'Also an answer. Better than a fast wrong one.',
          'The road will wait. It is very good at that. Come back when you know.',
        ],
        end: true,
      },
      after_quest: {
        text: [
          'The notebook is fuller than it was.',
          'Whatever else you do - do not become a person who collects problems. Collect them, then put them somewhere they can be answered.',
        ],
        choices: [
          { label: 'Ask something', to: 'hub' },
          { label: 'Leave', to: 'bye' },
        ],
      },
      repeat: {
        text: 'The bench is still here. So am I.',
        choices: [
          { label: 'Ask something', to: 'hub' },
          { label: 'Later', to: 'bye' },
        ],
      },
      bye: { text: 'Go. Mind the hole.', end: true },
    },
  },

  // =========================================================================
  ganesh: {
    id: 'ganesh',
    name: 'Ganesh More',
    age: 31,
    role: 'Auto driver',
    problem: 'road-condition',
    look: {
      skin: PAL.skinB,
      hair: PAL.hair,
      hairStyle: 'short',
      top: PAL.saffron,
      bottom: PAL.ink,
      outfit: 'shirt',
      accessory: 'beard',
    },
    entry: [
      { require: { flag: 'ganesh.met' }, node: 'repeat' },
      { node: 'first' },
    ],
    nodes: {
      first: {
        effect: { flag: 'ganesh.met' },
        text: [
          'Where to? ...No? Then you are the third person today who is not a passenger.',
          'Fine. I am waiting for the school to let out anyway.',
        ],
        next: 'hub',
      },
      hub: {
        text: 'Say it.',
        choices: [
          { label: 'How is the work?', to: 'work' },
          { label: 'What does that hole cost you?', to: 'road_q', require: { flag: 'ganesh.work' } },
          { label: 'Why not complain about it?', to: 'complain', require: { discovered: 'road-condition' } },
          { label: 'Night trips?', to: 'night', require: { discovered: 'healthcare-access' } },
          { label: 'Nothing, thanks', to: 'bye' },
        ],
      },
      work: {
        effect: { flag: 'ganesh.work', stat: { observation: 1 } },
        text: [
          'Work is fine. Work is always fine. It is the day around the work.',
          'Fuel goes up on its own. Fare goes up only when people shout about it. You can guess which one moves faster.',
        ],
        next: 'hub',
      },
      road_q: {
        effect: {
          discover: 'road-condition',
          step: 'road-cost/ask-ganesh',
          item: 'repair-bill',
          note: { problem: 'road-condition', text: 'Ganesh says he has paid for suspension repairs twice this year and has the bills.' },
          stat: { knowledge: 1 },
        },
        text: [
          'Twice this year. Suspension. I have both bills in the box under my seat, if you want to see them.',
          'And time. I go around by the old lane now, which is four minutes longer. Four minutes, eight, ten times a day.',
          'The road does not pay for any of that. I do.',
        ],
        choices: [
          { label: 'Tell me the whole cost', to: 'enc' },
          { label: 'Back', to: 'hub' },
        ],
      },
      enc: {
        effect: { encounter: 'road-condition' },
        text: 'Get in, I will show you the patch on the way.',
        end: true,
      },
      complain: {
        effect: {
          discover: 'bureaucracy',
          note: { problem: 'bureaucracy', text: 'Ganesh: a complaint costs half a day of earnings, which is why he has not filed one - his own reasoning.' },
          stat: { empathy: 1 },
        },
        text: [
          'Complain where? The office is open when I am earning.',
          'Half a day there is four hundred rupees I did not make. For a form that may or may not move.',
          'Pawar sahib says it works if you do it right. Maybe. He had a salary while he learned that.',
        ],
        next: 'hub',
      },
      night: {
        effect: {
          note: { problem: 'healthcare-access', text: 'Ganesh: most night trips out of the ward are to the city hospital.' },
          stat: { empathy: 1 },
        },
        text: [
          'Night trips are mostly hospital. Nobody books an auto at two for a small thing.',
          'Forty kilometres with someone breathing badly behind you. And that hole at the eleventh kilometre.',
        ],
        next: 'hub',
      },
      repeat: {
        text: 'Still not a passenger?',
        choices: [
          { label: 'Ask something', to: 'hub' },
          { label: 'Not today', to: 'bye' },
        ],
      },
      bye: { text: 'Then move, you are standing in my shade.', end: true },
    },
  },

  // =========================================================================
  fatima: {
    id: 'fatima',
    name: 'Fatima Qureshi',
    age: 46,
    role: 'Tailor',
    problem: 'debt',
    look: {
      skin: PAL.skinC,
      hair: PAL.hair,
      hairStyle: 'long',
      top: PAL.purple,
      bottom: PAL.teal,
      outfit: 'saree',
      accent: PAL.pink,
      accessory: 'dupatta',
    },
    entry: [
      { require: { flag: 'fatima.met' }, node: 'repeat' },
      { node: 'first' },
    ],
    nodes: {
      first: {
        effect: { flag: 'fatima.met' },
        text: [
          'Mind the pins. There, on the step.',
          'Two blouses by evening, so I am not stopping work. But I can talk.',
        ],
        next: 'hub',
      },
      hub: {
        text: 'Well?',
        choices: [
          { label: 'Is the machine new?', to: 'machine' },
          { label: 'How is the instalment?', to: 'emi', require: { flag: 'fatima.machine' } },
          { label: 'Has anyone helped with it?', to: 'help', require: { flag: 'fatima.emi' } },
          { label: 'I will let you sew', to: 'bye' },
        ],
      },
      machine: {
        effect: { flag: 'fatima.machine', stat: { observation: 1 } },
        text: [
          'Two years old. Before it, I did everything by hand and took half the orders.',
          'It earns. Genuinely. I am not going to stand here and say the machine was a mistake.',
        ],
        next: 'hub',
      },
      emi: {
        effect: {
          flag: 'fatima.emi',
          discover: 'debt',
          note: { problem: 'debt', text: 'Fatima pays a monthly instalment on her sewing machine and says she has never missed one.' },
          stat: { knowledge: 1 },
        },
        text: [
          'Every month, on the date. I have never missed one. I want that written down exactly like that.',
          'But the date does not care whether the orders came. In a thin month I take work I would refuse otherwise.',
          'The machine earns for me. The instalment earns for somebody else. I live inside both.',
        ],
        choices: [
          { label: 'Tell me more', to: 'enc' },
          { label: 'Back', to: 'hub' },
        ],
      },
      enc: {
        effect: { encounter: 'debt' },
        text: 'Sit on the step. Do not move the pins.',
        end: true,
      },
      help: {
        effect: {
          discover: 'bureaucracy',
          note: { problem: 'bureaucracy', text: 'Fatima made two trips about a scheme form; the signing officer was absent both times.' },
          stat: { empathy: 1 },
        },
        text: [
          'There is a scheme. For machines, for small work like mine.',
          'Twice I went. Twice the man who signs was not there. I am not angry at him - he has his own duty list.',
          'I am angry that nobody told me before I paid the bus fare. Twice.',
        ],
        next: 'hub',
      },
      repeat: {
        text: 'Still pins everywhere. Careful.',
        choices: [
          { label: 'Ask something', to: 'hub' },
          { label: 'Just passing', to: 'bye' },
        ],
      },
      bye: { text: 'Tell your mother the fall is ready.', end: true },
    },
  },

  // =========================================================================
  priya: {
    id: 'priya',
    name: 'Priya Nair',
    age: 25,
    role: 'Works in Metro City, home for the weekend',
    problem: 'migration-distance',
    look: {
      skin: PAL.skinD,
      hair: PAL.hair,
      hairStyle: 'long',
      top: PAL.pink,
      bottom: PAL.blueDark,
      outfit: 'shirt',
      accessory: 'bag',
    },
    entry: [
      { require: { flag: 'priya.met' }, node: 'repeat' },
      { node: 'first' },
    ],
    nodes: {
      first: {
        effect: { flag: 'priya.met' },
        text: [
          'You have grown. That is the compulsory sentence, now it is done.',
          'I get the evening bus back tomorrow, so if you are asking things, ask today.',
        ],
        next: 'hub',
      },
      hub: {
        text: 'Go on.',
        choices: [
          { label: 'What is the city job like?', to: 'job' },
          { label: 'Why not move everyone there?', to: 'move', require: { flag: 'priya.job' } },
          { label: 'Do you miss it here?', to: 'miss', require: { flag: 'priya.job' } },
          { label: 'Enjoy the weekend', to: 'bye' },
        ],
      },
      job: {
        effect: { flag: 'priya.job', stat: { knowledge: 1 } },
        text: [
          'Good, mostly. I earn more than anyone in my family ever has. I am allowed to say that here, not there.',
          'Rent and travel take about half of it. That is my own arithmetic, not a statistic.',
        ],
        next: 'hub',
      },
      move: {
        effect: {
          discover: 'migration-distance',
          note: { problem: 'migration-distance', text: 'Priya: about half her salary goes on rent and travel, by her own reckoning.' },
          stat: { observation: 1 },
        },
        text: [
          'On what? A room for four people at city rent?',
          'My mother would not know one person on that street. Here she knows everyone and complains about all of them. That is not nothing.',
        ],
        next: 'hub',
      },
      miss: {
        effect: {
          discover: 'family-expectation',
          note: { problem: 'migration-distance', text: 'Priya: "I see them four days a month. That is the same decision as the salary, not a separate one."' },
          stat: { empathy: 1 },
        },
        text: [
          'Four days a month. That is what I get of everybody here.',
          'People say I escaped. People also say I left. Both of them mean it kindly and both of them are half right.',
          'I was the plan, you know. It worked. I would still not call it light.',
        ],
        choices: [
          { label: 'Tell me properly', to: 'enc' },
          { label: 'Back', to: 'hub' },
        ],
      },
      enc: {
        effect: { encounter: 'migration-distance' },
        text: 'Alright. Sit on the wall, this is not a two-minute answer.',
        end: true,
      },
      repeat: {
        text: 'One more day, then the bus.',
        choices: [
          { label: 'Ask something', to: 'hub' },
          { label: 'Safe journey', to: 'bye' },
        ],
      },
      bye: { text: 'Look after them. You are here, I am not.', end: true },
    },
  },

  // =========================================================================
  tanvi: {
    id: 'tanvi',
    name: 'Tanvi',
    age: 9,
    role: 'Class 4, and first in the water queue',
    problem: 'water-supply',
    look: {
      skin: PAL.skinB,
      hair: PAL.hair,
      hairStyle: 'braid',
      top: PAL.yellow,
      bottom: PAL.blue,
      outfit: 'dress',
      accent: PAL.red,
    },
    entry: [
      { require: { flag: 'tanvi.met' }, node: 'repeat' },
      { node: 'first' },
    ],
    nodes: {
      first: {
        effect: { flag: 'tanvi.met' },
        text: [
          'Those two pots are ours. That one is Meena aunty’s. You cannot put yours in front.',
          '...oh. You do not have pots. Sorry.',
        ],
        next: 'hub',
      },
      hub: {
        text: 'What?',
        choices: [
          { label: 'How long have you been here?', to: 'queue' },
          { label: 'Do you do this every day?', to: 'daily', require: { flag: 'tanvi.queue' } },
          { label: 'What about school?', to: 'school', require: { flag: 'tanvi.daily' } },
          { label: 'Good luck with the pots', to: 'bye' },
        ],
      },
      queue: {
        effect: { flag: 'tanvi.queue', stat: { observation: 1 } },
        text: [
          'Since it was dark. Not standing - you put the pot and it keeps your place. Then you go and come back.',
          'If the water comes and your pot is not here, you are last. Everyone knows that rule. Nobody wrote it.',
        ],
        next: 'hub',
      },
      daily: {
        effect: {
          flag: 'tanvi.daily',
          discover: 'water-supply',
          note: { problem: 'water-supply', text: 'The queue at the hand pump is held by pots, not people. Tanvi places hers before dawn.' },
        },
        text: [
          'Every day. Sunday also, water does not know Sunday.',
          'Aai does the evening one. I do the morning because she has the cooking.',
        ],
        next: 'hub',
      },
      school: {
        effect: {
          stat: { empathy: 1 },
          note: { problem: 'water-supply', text: 'Tanvi: "If I am late, I am late." Water comes before school in her morning.' },
        },
        text: [
          'School is at eight. If the water is late, I am late.',
          'Teacher asked why. I said water. She said okay and did not ask again, so I think she knows.',
        ],
        choices: [
          { label: 'That is a lot to carry', to: 'enc' },
          { label: 'Back', to: 'hub' },
        ],
      },
      enc: {
        effect: { encounter: 'water-supply' },
        text: 'It is only two pots. ...Alright, it is heavy. Come, I will show you.',
        end: true,
      },
      repeat: {
        text: 'Still no water. Still my place, though.',
        choices: [
          { label: 'Ask something', to: 'hub' },
          { label: 'See you', to: 'bye' },
        ],
      },
      bye: { text: 'Bye! Do not step on the pots!', end: true },
    },
  },

  // =========================================================================
  chaiwala: {
    id: 'chaiwala',
    name: 'Bhaskar',
    age: 52,
    role: 'Runs the tea stall',
    problem: null,
    look: {
      skin: PAL.skinB,
      hair: PAL.hairGrey,
      hairStyle: 'short',
      top: PAL.white,
      bottom: PAL.dirtDark,
      outfit: 'kurta',
      accessory: 'beard',
    },
    entry: [
      { require: { flag: 'chai.met' }, node: 'repeat' },
      { node: 'first' },
    ],
    nodes: {
      first: {
        effect: { flag: 'chai.met', stat: { observation: 1 } },
        text: [
          'Cutting or full?',
          '...Neither. Of course. Everybody wants to talk at a tea stall, nobody wants tea.',
          'Stand there then. Everything in this ward passes this stall by eleven o’clock.',
        ],
        next: 'hub',
      },
      hub: {
        text: 'What do you want to know?',
        choices: [
          { label: 'Who comes here?', to: 'who' },
          { label: 'What do people complain about?', to: 'complaints' },
          { label: 'Nothing, thanks', to: 'bye' },
        ],
      },
      who: {
        text: [
          'Drivers at six. Office people at nine. Students when their money allows.',
          'Pawar sahib at four, exactly four, and he checks his watch as if I am the one who is late.',
        ],
        next: 'hub',
      },
      complaints: {
        effect: { stat: { knowledge: 1 } },
        text: [
          'Water in the summer. The road in the monsoon. Fees in June. Same calendar every year.',
          'Do not write that as wisdom. It is just what you hear when you stand in one place for twenty years.',
        ],
        next: 'hub',
      },
      repeat: {
        text: 'Still not drinking tea?',
        choices: [
          { label: 'Ask something', to: 'hub' },
          { label: 'Next time', to: 'bye' },
        ],
      },
      bye: { text: 'Next time, cutting. My prediction.', end: true },
    },
  },

  // =========================================================================
  shalini: {
    id: 'shalini',
    name: 'Shalini Gaikwad',
    age: 47,
    role: 'Your mother',
    problem: 'family-expectation',
    look: {
      skin: PAL.skinB,
      hair: PAL.hairGrey,
      hairStyle: 'bun',
      top: PAL.green,
      bottom: PAL.saffronDark,
      outfit: 'saree',
      accent: PAL.white,
    },
    entry: [
      { require: { flag: 'road.resolved' }, node: 'after_quest' },
      { require: { flag: 'shalini.brief' }, node: 'repeat' },
      { node: 'first' },
    ],
    nodes: {
      first: {
        effect: { flag: 'shalini.brief', item: 'notebook', stat: { observation: 1 } },
        text: [
          'It is on the table. Your notebook, the ward survey one.',
          'Sunita tai gave your name to the community group, so now you are the one who walks around asking people their business.',
          'Ask properly. These are neighbours, not a form.',
        ],
        next: 'hub',
      },
      hub: {
        text: 'What?',
        choices: [
          { label: 'What am I supposed to ask?', to: 'how' },
          { label: 'How was your day?', to: 'day' },
          { label: 'About the water', to: 'water', require: { discovered: 'water-supply' } },
          { label: 'I will get going', to: 'bye' },
        ],
      },
      how: {
        effect: { stat: { communication: 1 } },
        text: [
          'Ask what their day costs them. Not "what is your problem" - nobody answers that honestly.',
          'And listen to the second answer, not the first. The first one is the polite one.',
        ],
        next: 'hub',
      },
      day: {
        effect: { stat: { empathy: 1 } },
        text: [
          'The same. Which is a good day, at our level.',
          'Your father would have walked with you today. He liked this kind of thing - asking people, remembering names.',
        ],
        next: 'hub',
      },
      water: {
        effect: {
          discover: 'water-supply',
          note: { problem: 'water-supply', text: 'Shalini: a storage tank is out of reach for the household, so the morning queue falls to whoever is free - usually a child.' },
          stat: { empathy: 1 },
        },
        text: [
          'A tank is eight thousand rupees. We do not have eight thousand rupees sitting idle.',
          'So Meena’s girl stands with pots at five in the morning, and I stand there in the evening.',
          'I know what that sentence sounds like. Say it back to me with a better ending and I will use yours.',
        ],
        next: 'hub',
      },
      after_quest: {
        text: [
          'Pawar sahib sent word. He says you asked the right people.',
          'He also says you should eat. On that we agree.',
        ],
        choices: [
          { label: 'Talk', to: 'hub' },
          { label: 'Rest for a while', to: 'bye' },
        ],
      },
      repeat: {
        text: 'Back already, or back finally?',
        choices: [
          { label: 'Talk', to: 'hub' },
          { label: 'Going out again', to: 'bye' },
        ],
      },
      bye: { text: 'Go. Water bottle. It is hot.', end: true },
    },
  },
}

export function getNpc(id) {
  return NPCS[id] || null
}
