/**
 * home.js - the player's house. Small on purpose: it exists to prove the map
 * engine handles more than one map, to give the player a place to save, and to
 * put one conversation somewhere private.
 */
export const home = {
  id: 'home',
  name: 'Home',
  subtitle: 'Ward 4, Lane 2',
  width: 12,
  height: 9,
  music: 'home',
  blurb: 'Two rooms, a kitchen corner, and a photograph of a workshop that closed.',
  indoor: true,

  legend: {
    '=': { tile: 'wall_in', solid: true },
    '-': { tile: 'wall_in_win', solid: true },
    F: { tile: 'wall_in_frame', solid: true },
    '.': { tile: 'floor' },
    g: { tile: 'floor_rug' },
    _: { tile: 'door_in' },
  },

  terrain: [
    '====-==-====',
    '=F========F=',
    '=..........=',
    '=..........=',
    '=..........=',
    '=....gg....=',
    '=..........=',
    '=..........=',
    '=====_======',
  ],

  props: [
    { tile: 'bed_top', x: 1, y: 2 },
    { tile: 'bed_bottom', x: 1, y: 3 },
    { tile: 'shelf_in', x: 10, y: 2 },
    { tile: 'table_in', x: 8, y: 5 },
    { tile: 'stove_in', x: 2, y: 7 },
    { tile: 'water_pot', x: 3, y: 7 },
  ],

  exits: [{ x: 5, y: 8, to: 'shivnagar', spawn: 'door', transition: 'door' }],

  objects: [
    {
      x: 1,
      y: 3,
      kind: 'rest',
      name: 'Your bed',
      look: 'Your side of the room. The notebook lives under the pillow.',
    },
    {
      x: 8,
      y: 5,
      kind: 'sign',
      name: 'Table',
      look: 'Two steel plates upside down, a radio that only gets one station clearly, and last month’s electricity bill under a glass.',
    },
    {
      x: 10,
      y: 2,
      kind: 'sign',
      name: 'Shelf',
      look: 'School textbooks that are not yours, a tin of sugar, and a photo of your father’s workshop before it closed.',
    },
  ],

  npcs: [{ id: 'shalini', x: 7, y: 3, dir: 'down' }],

  spawns: {
    default: { x: 5, y: 7, dir: 'up' },
    door: { x: 5, y: 7, dir: 'up' },
  },
}
