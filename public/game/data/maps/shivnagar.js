/**
 * shivnagar.js - the starting town.
 *
 * Shivnagar is fictional: a small town on a state highway, the kind that grew
 * faster than its drainage did. Terrain is broad zones; everything specific
 * (buildings, props, people, things you can investigate) is placed by data.
 */
export const shivnagar = {
  id: 'shivnagar',
  name: 'Shivnagar',
  subtitle: 'Ward 4 - Main Road',
  width: 44,
  height: 36,
  music: 'town',
  blurb:
    'A town on a state highway. One main road, a ward school, a health centre, a row of shops, and lanes behind them that the road does not reach. Everyone here knows which house the water reaches last.',

  // 44 characters per row, 36 rows. See data/tileLegend.js for the alphabet.
  terrain: [
    'hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh', // 0  north hedge
    'h.,..*.....,...*.....,......*....,....*....h', // 1 
    'h..........,....*........,........,......*.h', // 2 
    'hddddddddddddddddddddddddddddddddddddddddddh', // 3  shops, health centre, school
    'hddddddddddddddddddddddddddddddddddddddddddh', // 4 
    'hddddddddddddddddddddddddddddddddddddddddddh', // 5 
    'hddddddddddddddddddddddddddddddddddddddddddh', // 6 
    'hddddddddddddddddddddddddddddddddddddddddddh', // 7 
    'hddddddddddddddddddddddddddddddddddddddddddh', // 8  shop fronts
    'hpppppppppppppppppppppppppppppppppppppppppph', // 9  north footpath
    'hpppppppppppppppccppppppppppppppppppppppppph', // 10
    'hkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkh', // 11 kerb
    'hrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrh', // 12 main road
    'hRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRh', // 13 centre line
    'hrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrh', // 14
    'hkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkh', // 15 kerb
    'hpppppppppppppppppppppppppppppppppppppppppph', // 16 south footpath
    'h............pppppppppppppppppppppppppppppph', // 17
    'h............ddddddddddddddddddddddddddddddh', // 18
    'h............ddddddddddddddddddddddddddddddh', // 19 house row
    'h............ddddddddddddddddddddddddddddddh', // 20
    'h............ddddddddddddddddddddddddddddddh', // 21
    'h............ddddddddddddddddddddddddddddddh', // 22
    'h...........Dddddddddddddddddddddddddddddddh', // 23 lane in front of the houses
    'h...WWWW......d.d.d.ddddd.d.d.d.d.d........h', // 24 pond, lane, and the fringe where they meet
    'h...wwww............dddd...................h', // 25
    'h...wwww............dddd...................h', // 26
    'h..,................dddd..........,........h', // 27
    'h.............ddddddddddddddddddddd........h', // 28 lower settlement
    'h.............ddddddddddddddddddddd........h', // 29
    'h.............ddddddddddddddddddddd........h', // 30
    'h.............ddddddddddddddddddddd........h', // 31
    'h..,.....*...dd.dd.dd.dd.dd.dd*dd.dd...,...h', // 32
    'h.......,.......*..........,...............h', // 33
    'h..*.........,.........,..........*........h', // 34
    'hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh', // 35 south hedge
  ],

  structures: [
    // --- north side: the row of shops, the clinic, the school --------------
    { type: 'tree', x: 2, y: 1 },
    { type: 'tree', x: 10, y: 1 },
    { type: 'tree', x: 20, y: 1 },
    { type: 'tree', x: 33, y: 1 },
    { type: 'tree', x: 40, y: 1 },
    { type: 'shop', x: 4, y: 5, w: 5, color: 'saffron', front: 2 }, // Sawant Stores
    { type: 'block', x: 12, y: 4, w: 6, h: 5, color: 'cream', door: 2 }, // health centre
    { type: 'tree', x: 19, y: 5 },
    { type: 'block', x: 25, y: 3, w: 9, h: 6, color: 'teal', door: 4 }, // school
    { type: 'house', x: 36, y: 5, w: 5, h: 3, color: 'pink', door: 2, tank: true },
    { type: 'tree', x: 1, y: 4 },
    { type: 'tree', x: 9, y: 4 },
    { type: 'tree', x: 22, y: 4 },
    { type: 'tree', x: 34, y: 4 },
    { type: 'pole', x: 2, y: 9 },
    { type: 'lamp', x: 11, y: 9 },
    { type: 'lamp', x: 33, y: 9 },
    { type: 'stall', x: 35, y: 9 }, // tea stall on the footpath

    // --- south side: houses along the lane ---------------------------------
    { type: 'house', x: 14, y: 19, w: 5, h: 3, color: 'blue', door: 2, tank: true },
    { type: 'house', x: 21, y: 19, w: 5, h: 3, color: 'green', door: 2 },
    { type: 'house', x: 28, y: 19, w: 5, h: 3, color: 'cream', door: 2, tank: true }, // player's home
    { type: 'house', x: 36, y: 19, w: 5, h: 3, color: 'saffron', door: 2 },
    { type: 'lamp', x: 20, y: 16 },

    // --- park on the west side ---------------------------------------------
    { type: 'tree', x: 2, y: 18 },
    { type: 'tree', x: 8, y: 18 },
    { type: 'tree', x: 1, y: 21 },
    { type: 'tree', x: 9, y: 22 },
    { type: 'tree', x: 2, y: 28 },
    { type: 'tree', x: 8, y: 30 },

    // --- lower settlement ---------------------------------------------------
    { type: 'house', x: 16, y: 28, w: 5, h: 3, color: 'pink', door: 2 },
    { type: 'house', x: 29, y: 28, w: 5, h: 3, color: 'blue', door: 1, tank: true },
    { type: 'tree', x: 38, y: 27 },
    { type: 'tree', x: 40, y: 31 },
  ],

  // Hand-painted names, drawn onto the signboards and wall bands.
  labels: [
    { x: 6, y: 6, text: 'SAWANT STORES', color: '#e8c04a', offset: 5 },
    { x: 14.5, y: 5, text: 'HEALTH CENTRE', color: '#3b6ea5', offset: 4 },
    { x: 29, y: 4, text: 'WARD 4 SCHOOL', color: '#f6efe4', offset: 5 },
    { x: 35.5, y: 9, text: 'CHAI', color: '#f6efe4', offset: 1 },
  ],

  props: [
    // shopfront clutter
    { tile: 'sacks', x: 4, y: 9 },
    { tile: 'crates', x: 8, y: 9 },
    { tile: 'plant_pot', x: 10, y: 9 },
    { tile: 'notice_board', x: 21, y: 9 },
    { tile: 'dustbin', x: 18, y: 10 },
    { tile: 'cycle', x: 23, y: 9 },
    { tile: 'bus_sign', x: 30, y: 10 },
    { tile: 'plant_pot', x: 24, y: 9 },
    { tile: 'crates', x: 20, y: 7 },
    { tile: 'sacks', x: 21, y: 7 },
    { tile: 'brick_stack', x: 24, y: 7 },
    { tile: 'cycle', x: 11, y: 7 },
    { tile: 'charpai', x: 35, y: 6 },
    { tile: 'dustbin', x: 39, y: 9 },
    // the road itself
    { tile: 'road_cracked', x: 22, y: 13, layer: 'ground', solid: false },
    { tile: 'road_cracked', x: 24, y: 13, layer: 'ground', solid: false },
    { tile: 'road_cracked', x: 23, y: 12, layer: 'ground', solid: false },
    { tile: 'pothole', x: 23, y: 13, layer: 'ground', solid: false },
    { tile: 'puddle', x: 25, y: 14, solid: false },
    { tile: 'manhole', x: 33, y: 12, layer: 'ground', solid: false },
    // south footpath
    { tile: 'dustbin', x: 13, y: 16 },
    { tile: 'garbage', x: 14, y: 16 },
    { tile: 'signpost', x: 27, y: 16 },
    { tile: 'bench', x: 11, y: 19 },
    { tile: 'bench', x: 4, y: 22 },
    { tile: 'handpump', x: 13, y: 23 },
    { tile: 'water_pot', x: 12, y: 24 },
    // lane and lower settlement
    { tile: 'charpai', x: 21, y: 30 },
    { tile: 'cycle', x: 24, y: 30 },
    { tile: 'sacks', x: 26, y: 30 },
    { tile: 'crates', x: 27, y: 30 },
    { tile: 'brick_stack', x: 32, y: 31 },
    { tile: 'bush', x: 35, y: 24 },
    // the residential lane: the things that live outside a house
    { tile: 'charpai', x: 19, y: 23 },
    { tile: 'plant_pot', x: 27, y: 23 },
    { tile: 'plant_pot', x: 33, y: 23 },
    { tile: 'water_pot', x: 34, y: 23 },
    { tile: 'cycle', x: 40, y: 23 },
    { tile: 'crates', x: 41, y: 20 },
    { tile: 'bush', x: 13, y: 20 },
    { tile: 'bush', x: 13, y: 18 },
    { tile: 'sacks', x: 20, y: 18 },
    { tile: 'dustbin', x: 26, y: 18 },
    { tile: 'brick_stack', x: 31, y: 18 },
    { tile: 'bush', x: 36, y: 33 },
    { tile: 'bush', x: 5, y: 32 },
  ],

  // Doorways punched back open after the structure stamps marked them solid.
  walkable: [{ x: 30, y: 22 }],

  exits: [{ x: 30, y: 22, to: 'home', spawn: 'door', transition: 'door' }],

  // Things the player can interact with that are not people.
  objects: [
    {
      x: 23,
      y: 13,
      kind: 'investigate',
      problem: 'road-condition',
      name: 'Broken road surface',
      effect: {
        step: 'road-cost/look',
        note: {
          problem: 'road-condition',
          text: 'The broken patch sits at the low point of the road, where water collects and has nowhere to drain.',
        },
        stat: { observation: 1 },
      },
      look: 'The tar has broken away in a rough circle. The edge is crumbling further every time a tempo goes over it.',
    },
    {
      x: 14,
      y: 16,
      kind: 'investigate',
      problem: 'waste-collection',
      name: 'Kerbside waste heap',
      effect: {
        note: {
          problem: 'waste-collection',
          text: 'The heap sits between the bin and the drain, closer to the drain.',
        },
      },
      look: 'Bags piled beside the bin, not in it. Some of it has been there long enough to flatten.',
    },
    {
      x: 13,
      y: 23,
      kind: 'investigate',
      problem: 'water-supply',
      name: 'Hand pump',
      effect: {
        note: {
          problem: 'water-supply',
          text: 'Pots hold places in the queue while their owners are elsewhere.',
        },
      },
      look: 'A steel handle worn smooth. Two empty pots are already in line, keeping their owners’ places.',
    },
    {
      x: 21,
      y: 9,
      kind: 'board',
      name: 'Ward notice board',
    },
    {
      x: 27,
      y: 16,
      kind: 'sign',
      name: 'Signpost',
      look: 'MAIN ROAD\nMetro City 40 km →\nWard Office 2 km ←',
    },
    {
      x: 30,
      y: 10,
      kind: 'sign',
      name: 'Bus stop',
      look: 'Route 12 - Shivnagar to Metro City.\nSomeone has written under the timings: "if it comes".',
    },
    {
      x: 29,
      y: 8,
      kind: 'sign',
      name: 'School gate',
      look: 'SHIVNAGAR WARD 4 SCHOOL\nClasses 1 to 10.\nThe gate is bolted from the inside. Classes are on.',
    },
    {
      x: 14,
      y: 8,
      kind: 'sign',
      name: 'Health centre',
      look: 'PRIMARY HEALTH CENTRE\nOPD 9 to 1.\nA handwritten sheet below: "Doctor on field duty Tuesdays."',
    },
  ],

  // NPC ids resolve against data/npcs.js.
  npcs: [
    { id: 'rekha', x: 6, y: 9, dir: 'down' },
    { id: 'imran', x: 19, y: 10, dir: 'down' },
    { id: 'sunita', x: 15, y: 9, dir: 'down' },
    { id: 'deepak', x: 28, y: 9, dir: 'right' },
    { id: 'vasant', x: 10, y: 19, dir: 'right' },
    { id: 'ganesh', x: 25, y: 16, dir: 'down' },
    { id: 'fatima', x: 23, y: 23, dir: 'down' },
    { id: 'priya', x: 38, y: 23, dir: 'left' },
    { id: 'tanvi', x: 14, y: 24, dir: 'up' },
    { id: 'chaiwala', x: 35, y: 10, dir: 'up' },
  ],

  spawns: {
    default: { x: 30, y: 23, dir: 'down' },
    door: { x: 30, y: 23, dir: 'down' },
  },
}
