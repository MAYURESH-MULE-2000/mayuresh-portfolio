/**
 * tileLegend.js
 * ---------------------------------------------------------------------------
 * The shared alphabet used by every map's ASCII terrain grid. A map may extend
 * it with its own `legend` block, but keeping one common set means a character
 * means the same thing everywhere.
 *
 * entry = { tile, solid?, animated?, over? }
 *   tile     - ground layer tile name
 *   solid    - blocks movement
 *   animated - swaps frames (water)
 *   over     - prop drawn on the "over" layer on top of this ground tile
 */
export const LEGEND = {
  '.': { tile: 'grass' },
  ',': { tile: 'grass_tuft' },
  '*': { tile: 'grass_flower' },
  d: { tile: 'dirt' },
  D: { tile: 'dirt_worn' },
  p: { tile: 'path' },
  c: { tile: 'path_cracked' },
  k: { tile: 'kerb' },
  r: { tile: 'road' },
  R: { tile: 'road_line' },
  x: { tile: 'road_cracked' },
  o: { tile: 'pothole' },
  m: { tile: 'manhole' },
  s: { tile: 'steps' },
  w: { tile: 'water', solid: true, animated: true },
  W: { tile: 'canal_edge', solid: true },
  '#': { tile: 'compound_wall', solid: true },
  // props that sit on grass or paving
  b: { tile: 'grass', over: 'bush', solid: true },
  h: { tile: 'grass', over: 'hedge', solid: true },
  B: { tile: 'path', over: 'bench', solid: true },
  C: { tile: 'dirt', over: 'charpai', solid: true },
  T: { tile: 'path', over: 'dustbin', solid: true },
  G: { tile: 'path', over: 'garbage', solid: true },
  P: { tile: 'path', over: 'plant_pot', solid: true },
  y: { tile: 'path', over: 'cycle', solid: true },
  S: { tile: 'path', over: 'sacks', solid: true },
  K: { tile: 'dirt', over: 'crates', solid: true },
  Z: { tile: 'dirt', over: 'brick_stack', solid: true },
  N: { tile: 'path', over: 'notice_board', solid: true },
  I: { tile: 'path', over: 'signpost', solid: true },
  U: { tile: 'path', over: 'bus_sign', solid: true },
  H: { tile: 'dirt', over: 'handpump', solid: true },
  u: { tile: 'road', over: 'puddle' },
}
