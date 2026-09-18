/**
 * route01.js - Highway 12, between Shivnagar and the city.
 *
 * A road map: everything here exists because of the road, including the people.
 * It is also the junction - west to the town, east to the city, north up the
 * lane to the college town.
 */
export const route01 = {
  id: 'route01',
  name: 'Highway 12',
  subtitle: 'Shivnagar outskirts',
  blurb:
    'Two lanes of state highway with fields either side, a dhaba that feeds the trucks, and a lane going north to the college town. Everything here is passing through, except the people who live off what passes through.',
  width: 56,
  height: 24,
  music: 'route',
  ambient: 'dust',

  terrain: [
    'hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhddhhhhhhhhhhhhhhhhhhhhhhhh',
    'h...dddddddddddd............dddddd.....................h',
    'h...dddddddddddd............dddddd.....................h',
    'h...dddddddddddd............dddddd.....................h',
    'h...dddddddddddd............dddddd.....................h',
    'h...dddddddddddd............dddddd....DDdDDdDDdDDdDD...h',
    'h...dddddddddddd............dddddd....DdDDdDDdDDdDDd...h',
    'h...dddddddddddd............dddddd....dDDdDDdDDdDDdD...h',
    'h...dddddddddddd............dddddd.....................h',
    'hkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkh',
    'rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr',
    'RRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR',
    'rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr',
    'hkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkh',
    'h.DdddDdddDdddDdddDdddDd...............................h',
    'h.dddDdddDdddDdddDdddDdd...............................h',
    'h.ddDdddDdddDdddDdddDddd...............................h',
    'h.dDddWWWWWWWWWWWWWWWWWWWWWWWW.........................h',
    'h.Ddddwwwwwwwwwwwwwwwwwwwwwwww.........................h',
    'h.dddDdddDdddDdddDdddDdd...............................h',
    'h.ddDdddDdddDdddDdddDddd..........dDDdDDdDDdDDdDDd.....h',
    'h.dDdddDdddDdddDdddDdddD..........DDdDDdDDdDDdDDdD.....h',
    'h.DdddDdddDdddDdddDdddDd...............................h',
    'hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh',
  ],

  structures: [
    // the dhaba: a roof on posts, a kitchen behind
    { type: 'shop', x: 6, y: 3, w: 6, color: 'rust', front: 2 },
    { type: 'tree', x: 2, y: 2 },
    { type: 'tree', x: 17, y: 1 },
    { type: 'tree', x: 24, y: 4 },
    { type: 'tree', x: 35, y: 1 },
    { type: 'tree', x: 46, y: 1 },
    { type: 'tree', x: 52, y: 4 },
    { type: 'lamp', x: 20, y: 7 },
    { type: 'lamp', x: 44, y: 7 },
    { type: 'pole', x: 15, y: 14 },
    { type: 'pole', x: 33, y: 14 },
    { type: 'tree', x: 2, y: 20 },
    { type: 'tree', x: 50, y: 17 },
    // a farm shed on the south side
    { type: 'house', x: 41, y: 17, w: 4, h: 3, color: 'cream', door: 1, tank: true },
  ],

  labels: [
    { x: 8.5, y: 4, text: 'PAWAR DHABA', color: '#e8c04a', offset: 5 },
    { x: 30.5, y: 1, text: 'VIDYA NAGAR 6 km \u2191', color: '#f6efe4', offset: 2 },
  ],

  props: [
    // the forecourt
    { tile: 'charpai', x: 4, y: 7 },
    { tile: 'charpai', x: 13, y: 7 },
    { tile: 'cafe_table', x: 9, y: 7 },
    { tile: 'crates', x: 14, y: 6 },
    { tile: 'sacks', x: 15, y: 6 },
    { tile: 'barrels', x: 5, y: 6 },
    // the highway itself
    { tile: 'road_cracked', x: 26, y: 10, layer: 'ground', solid: false },
    { tile: 'road_cracked', x: 27, y: 12, layer: 'ground', solid: false },
    { tile: 'puddle', x: 41, y: 12, solid: false },
    { tile: 'manhole', x: 19, y: 10, layer: 'ground', solid: false },
    { tile: 'bus_sign', x: 22, y: 8 },
    { tile: 'signpost', x: 34, y: 8 },
    { tile: 'barricade', x: 27, y: 8 },
    { tile: 'cone', x: 28, y: 9 },
    // trucks parked off the road
    { tile: 'bus_l', x: 17, y: 8 },
    { tile: 'bus_m', x: 18, y: 8 },
    { tile: 'bus_r', x: 19, y: 8 },
    // the fields
    { tile: 'sacks', x: 45, y: 21 },
    { tile: 'crates', x: 46, y: 21 },
    { tile: 'brick_stack', x: 39, y: 20 },
    { tile: 'handpump', x: 12, y: 16 },
    { tile: 'water_pot', x: 11, y: 16 },
    { tile: 'bush', x: 31, y: 19 },
    { tile: 'bush', x: 44, y: 16 },
    { tile: 'bush', x: 8, y: 21 },
    { tile: 'cycle', x: 15, y: 16 },
  ],

  objects: [
    {
      x: 26,
      y: 10,
      kind: 'investigate',
      problem: 'road-condition',
      name: 'Shoulder drop',
      look: 'Where the tar ends the ground has fallen away about four inches. Tyre marks come right up to the edge and stop.',
      effect: {
        note: {
          problem: 'road-condition',
          text: 'On the highway the danger is not the holes, it is the drop at the shoulder where the resurfacing ended.',
        },
        stat: { observation: 1 },
      },
    },
    {
      x: 12,
      y: 16,
      kind: 'investigate',
      problem: 'water-supply',
      name: 'Field hand pump',
      look: 'The handle turns easily, which is not a good sign. It takes eleven strokes before anything comes.',
      effect: {
        note: { problem: 'water-supply', text: 'The field pump needs about eleven strokes before it draws. Baban says it was four when it was sunk.' },
      },
    },
    {
      x: 34,
      y: 8,
      kind: 'sign',
      name: 'Signpost',
      look: 'HIGHWAY 12\nNayanagar 28 km \u2192\nShivnagar 12 km \u2190\nVidya Nagar 6 km \u2191',
    },
    {
      x: 22,
      y: 8,
      kind: 'sign',
      name: 'Bus stop',
      look: 'No shelter, no bench, no timings. A painted circle on a pole and a patch of ground worn flat by people standing.',
    },
  ],

  npcs: [
    { id: 'harpal', x: 16, y: 7, dir: 'down' },
    { id: 'mangala', x: 8, y: 7, dir: 'down' },
    { id: 'baban', x: 10, y: 16, dir: 'down' },
  ],

  exits: [
    { x: 0, y: 10, to: 'shivnagar', spawn: 'east' },
    { x: 0, y: 11, to: 'shivnagar', spawn: 'east' },
    { x: 0, y: 12, to: 'shivnagar', spawn: 'east' },
    { x: 55, y: 10, to: 'city', spawn: 'west' },
    { x: 55, y: 11, to: 'city', spawn: 'west' },
    { x: 55, y: 12, to: 'city', spawn: 'west' },
    { x: 30, y: 0, to: 'campus', spawn: 'south' },
    { x: 31, y: 0, to: 'campus', spawn: 'south' },
  ],

  spawns: {
    default: { x: 2, y: 11, dir: 'right' },
    west: { x: 1, y: 11, dir: 'right' },
    east: { x: 54, y: 11, dir: 'left' },
    campus: { x: 30, y: 1, dir: 'down' },
  },
}
