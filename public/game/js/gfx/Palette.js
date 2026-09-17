/**
 * Palette.js
 * ---------------------------------------------------------------------------
 * A single, deliberately small colour palette shared by every tile, sprite and
 * UI panel in the game. Keeping all colour in one place is what makes the art
 * read as one coherent set instead of a pile of unrelated drawings.
 *
 * The palette leans warm and slightly dusty: sun-bleached concrete, ochre dirt,
 * painted shopfronts, dull green municipal paint.
 */

export const PAL = {
  // --- neutrals -----------------------------------------------------------
  black: '#0d0c10',
  ink: '#241f2b',
  shadow: '#3a3347',
  grey: '#6b6478',
  greyLight: '#9a93a6',
  bone: '#ded3c4',
  white: '#f6efe4',

  // --- ground -------------------------------------------------------------
  grassDark: '#2f5d3a',
  grass: '#427a45',
  grassLight: '#5a9651',
  dirtDark: '#8a6a42',
  dirt: '#a98757',
  dirtLight: '#c4a377',
  sand: '#d8bd8e',

  // --- built environment --------------------------------------------------
  roadDark: '#3d3b44',
  road: '#4e4c57',
  roadLight: '#615f6c',
  concrete: '#a59c8f',
  concreteDark: '#7d7568',
  concreteLight: '#c6bcab',
  brick: '#9c5a44',
  brickDark: '#7a4133',

  // --- paint (shopfronts, doors, awnings) ---------------------------------
  saffron: '#e08b30',
  saffronDark: '#b0651d',
  teal: '#2f7f7a',
  tealDark: '#1f5b57',
  blue: '#3b6ea5',
  blueDark: '#27497a',
  red: '#b23a3a',
  redDark: '#842a2c',
  yellow: '#e8c04a',
  green: '#4f8f3d',
  purple: '#6b4a86',
  pink: '#c2698a',

  // --- water & sky --------------------------------------------------------
  water: '#3a6f9c',
  waterDark: '#2a5379',
  waterLight: '#5b92ba',
  sky: '#7fb6d8',
  skyDeep: '#40638f',
  dusk: '#e2874f',

  // --- people -------------------------------------------------------------
  skinA: '#c98f5f',
  skinB: '#a8703f',
  skinC: '#7d4f2b',
  skinD: '#e0ac7c',
  hair: '#1f1a20',
  hairGrey: '#8d8592',

  // --- UI -----------------------------------------------------------------
  uiBack: '#1b1826',
  uiPanel: '#f3ead9',
  uiPanelDark: '#cdbfa6',
  uiBorder: '#3b2f2a',
  uiAccent: '#e08b30',
  uiGood: '#4f8f3d',
  uiWarn: '#e8c04a',
  uiBad: '#b23a3a',
}

/** Impact-dimension colours, shared by battle bars and journal readouts. */
export const DIMENSION_COLORS = {
  financial: PAL.saffron,
  emotional: PAL.pink,
  social: PAL.teal,
  time: PAL.blue,
  longTerm: PAL.purple,
}

/** Category colours used on problem cards. */
export const CATEGORY_COLORS = {
  Economic: PAL.saffron,
  Infrastructure: PAL.concreteDark,
  Institutional: PAL.blue,
  Social: PAL.pink,
  Environmental: PAL.green,
  Health: PAL.red,
  Education: PAL.purple,
  Personal: PAL.teal,
}
