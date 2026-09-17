/**
 * Tiles.js
 * ---------------------------------------------------------------------------
 * Every tile in the game is painted here, pixel by pixel, into one 16x16-cell
 * atlas that is baked once at start-up. Nothing in the world is a flat coloured
 * square: each painter lays down a base, a dither pattern, edge highlights and
 * a few deterministic details so the tiles read as drawn art.
 *
 * Painters are pure functions of (ctx, rng) drawing into a 16x16 cell whose
 * origin has already been translated for them. The rng is seeded per tile name,
 * so speckles and cracks are identical on every load.
 */

import { PAL } from './Palette.js'

export const TILE = 16

/** Small deterministic PRNG (mulberry32) so "random" detail is stable. */
function makeRng(seedStr) {
  let h = 1779033703 ^ seedStr.length
  for (let i = 0; i < seedStr.length; i++) {
    h = Math.imul(h ^ seedStr.charCodeAt(i), 3432918353)
    h = (h << 13) | (h >>> 19)
  }
  let a = h >>> 0
  return function rng() {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

// --- tiny drawing helpers ---------------------------------------------------
const p = (ctx, c, x, y, w = 1, h = 1) => {
  ctx.fillStyle = c
  ctx.fillRect(x, y, w, h)
}
const fill = (ctx, c) => p(ctx, c, 0, 0, TILE, TILE)

/** Scatter `n` single pixels of colour `c` across the cell. */
function speckle(ctx, rng, c, n, x0 = 0, y0 = 0, w = TILE, h = TILE) {
  ctx.fillStyle = c
  for (let i = 0; i < n; i++) {
    ctx.fillRect(x0 + Math.floor(rng() * w), y0 + Math.floor(rng() * h), 1, 1)
  }
}

/** Checkerboard dither over a region - the workhorse of the ground tiles. */
function dither(ctx, c, x0, y0, w, h, offset = 0) {
  ctx.fillStyle = c
  for (let y = 0; y < h; y++) {
    for (let x = (y + offset) % 2; x < w; x += 2) ctx.fillRect(x0 + x, y0 + y, 1, 1)
  }
}

// --- shared sub-painters ----------------------------------------------------
function grassBase(ctx, rng) {
  fill(ctx, PAL.grass)
  // A sparse diagonal weave rather than a full checkerboard: at this scale a
  // 50% dither reads as noise, which fights everything drawn on top of it.
  ctx.fillStyle = PAL.grassDark
  for (let y = 0; y < TILE; y += 2) {
    for (let x = (y / 2) % 4; x < TILE; x += 4) ctx.fillRect(x, y, 1, 1)
  }
  speckle(ctx, rng, PAL.grassDark, 6)
  // a few upright blades
  for (let i = 0; i < 4; i++) {
    const x = Math.floor(rng() * 15)
    const y = Math.floor(rng() * 12) + 2
    p(ctx, PAL.grassLight, x, y, 1, 2)
    p(ctx, PAL.grassDark, x, y + 2, 1, 1)
  }
}

function dirtBase(ctx, rng) {
  fill(ctx, PAL.dirt)
  speckle(ctx, rng, PAL.dirtDark, 26)
  speckle(ctx, rng, PAL.dirtLight, 18)
  // small stones
  for (let i = 0; i < 3; i++) {
    const x = Math.floor(rng() * 14)
    const y = Math.floor(rng() * 14)
    p(ctx, PAL.concreteDark, x, y, 2, 1)
    p(ctx, PAL.concreteLight, x, y - 1, 1, 1)
  }
}

function asphaltBase(ctx, rng) {
  fill(ctx, PAL.road)
  speckle(ctx, rng, PAL.roadDark, 40)
  speckle(ctx, rng, PAL.roadLight, 22)
}

function plasterWall(ctx, rng, base, dark, light) {
  fill(ctx, base)
  // vertical light gradient: brighter near the top of the wall
  p(ctx, light, 0, 0, TILE, 2)
  dither(ctx, light, 0, 2, TILE, 3, 1)
  // grime creeping up from the ground line
  dither(ctx, dark, 0, 11, TILE, 5, 0)
  p(ctx, dark, 0, 15, TILE, 1)
  speckle(ctx, rng, dark, 10)
}

/**
 * One tree, drawn in a 32x32 space and sliced into four tiles. Each tile
 * painter draws the whole tree translated so that its quadrant lands in the
 * cell - the atlas clip does the slicing, which is what keeps the four pieces
 * lined up exactly. The rng is seeded per tree, not per tile, for the same
 * reason.
 */
const CANOPY = [
  [10, 21], [8, 23], [6, 25], [5, 26], [4, 27], [3, 28], [2, 29], [2, 29],
  [1, 30], [1, 30], [1, 30], [2, 29], [2, 29], [3, 28], [4, 27], [5, 26],
  [6, 25], [7, 24], [9, 22], [11, 20],
]

function paintTree(ctx, ox, oy) {
  const rng = makeRng('tree-canopy')
  ctx.save()
  ctx.translate(-ox, -oy)

  // trunk first, so the canopy overlaps it
  p(ctx, PAL.dirtDark, 14, 17, 4, 13)
  p(ctx, PAL.dirt, 15, 17, 2, 13)
  p(ctx, PAL.dirtDark, 16, 20, 1, 8)
  p(ctx, PAL.dirtDark, 12, 28, 8, 2)
  p(ctx, PAL.dirt, 13, 28, 2, 1)
  ctx.globalAlpha = 0.3
  p(ctx, PAL.black, 10, 30, 12, 2)
  ctx.globalAlpha = 1

  // canopy mass, then a lit shoulder and shaded underside
  CANOPY.forEach((span, y) => {
    p(ctx, PAL.grassDark, span[0], y, span[1] - span[0] + 1, 1)
  })
  CANOPY.forEach((span, y) => {
    if (y > 13) return
    const inset = y < 4 ? 2 : 1
    p(ctx, PAL.grass, span[0] + inset, y + 1, span[1] - span[0] + 1 - inset * 2, 1)
  })
  for (let i = 0; i < 26; i++) {
    const y = 2 + Math.floor(rng() * 10)
    const span = CANOPY[y]
    const x = span[0] + 2 + Math.floor(rng() * (span[1] - span[0] - 3))
    p(ctx, PAL.grassLight, x, y, 2, 1)
  }
  for (let i = 0; i < 22; i++) {
    const y = 10 + Math.floor(rng() * 9)
    const span = CANOPY[y]
    const x = span[0] + 1 + Math.floor(rng() * (span[1] - span[0] - 2))
    p(ctx, PAL.grassDark, x, y, 2, 1)
  }
  ctx.restore()
}

// --- the tile table ---------------------------------------------------------
// Key = tile name used in map data. Value = painter.
export const TILE_PAINTERS = {
  // ---- ground ----
  grass: (ctx, rng) => grassBase(ctx, rng),
  grass_tuft: (ctx, rng) => {
    grassBase(ctx, rng)
    p(ctx, PAL.grassDark, 6, 9, 4, 1)
    p(ctx, PAL.grassLight, 6, 6, 1, 3)
    p(ctx, PAL.grassLight, 8, 5, 1, 4)
    p(ctx, PAL.grassLight, 10, 7, 1, 3)
    p(ctx, PAL.grass, 7, 7, 1, 2)
  },
  grass_flower: (ctx, rng) => {
    grassBase(ctx, rng)
    p(ctx, PAL.grassDark, 4, 10, 1, 3)
    p(ctx, PAL.yellow, 3, 8, 3, 1)
    p(ctx, PAL.yellow, 4, 7, 1, 3)
    p(ctx, PAL.saffron, 4, 8, 1, 1)
    p(ctx, PAL.grassDark, 11, 12, 1, 2)
    p(ctx, PAL.white, 10, 10, 3, 1)
    p(ctx, PAL.white, 11, 9, 1, 3)
    p(ctx, PAL.yellow, 11, 10, 1, 1)
  },
  dirt: (ctx, rng) => dirtBase(ctx, rng),
  dirt_worn: (ctx, rng) => {
    dirtBase(ctx, rng)
    p(ctx, PAL.dirtDark, 2, 5, 12, 1)
    p(ctx, PAL.dirtDark, 1, 11, 13, 1)
    dither(ctx, PAL.dirtLight, 0, 6, TILE, 5, 1)
  },
  // ---- footpath / paving ----
  path: (ctx, rng) => {
    fill(ctx, PAL.concrete)
    speckle(ctx, rng, PAL.concreteDark, 16)
    speckle(ctx, rng, PAL.concreteLight, 20)
    p(ctx, PAL.concreteDark, 0, 7, TILE, 1)
    p(ctx, PAL.concreteDark, 7, 0, 1, 8)
    p(ctx, PAL.concreteDark, 3, 8, 1, 8)
    p(ctx, PAL.concreteDark, 11, 8, 1, 8)
    p(ctx, PAL.concreteDark, 0, 15, TILE, 1)
    p(ctx, PAL.concreteLight, 0, 8, TILE, 1)
  },
  path_cracked: (ctx, rng) => {
    TILE_PAINTERS.path(ctx, rng)
    p(ctx, PAL.shadow, 4, 2, 1, 2)
    p(ctx, PAL.shadow, 5, 4, 1, 2)
    p(ctx, PAL.shadow, 6, 6, 3, 1)
    p(ctx, PAL.grassDark, 12, 12, 2, 1)
    p(ctx, PAL.grass, 13, 11, 1, 1)
  },
  kerb: (ctx, rng) => {
    fill(ctx, PAL.road)
    speckle(ctx, rng, PAL.roadDark, 14)
    p(ctx, PAL.concreteLight, 0, 0, TILE, 4)
    p(ctx, PAL.concrete, 0, 4, TILE, 3)
    p(ctx, PAL.concreteDark, 0, 7, TILE, 1)
    for (let x = 0; x < TILE; x += 8) p(ctx, PAL.concreteDark, x, 0, 1, 7)
    speckle(ctx, rng, PAL.concreteDark, 6, 0, 0, TILE, 6)
  },

  // ---- road ----
  road: (ctx, rng) => asphaltBase(ctx, rng),
  road_line: (ctx, rng) => {
    asphaltBase(ctx, rng)
    p(ctx, PAL.bone, 3, 7, 10, 2)
    p(ctx, PAL.greyLight, 3, 9, 10, 1)
  },
  road_cracked: (ctx, rng) => {
    asphaltBase(ctx, rng)
    p(ctx, PAL.roadDark, 2, 1, 1, 4)
    p(ctx, PAL.roadDark, 3, 5, 1, 3)
    p(ctx, PAL.roadDark, 4, 8, 5, 1)
    p(ctx, PAL.roadDark, 9, 9, 1, 5)
    p(ctx, PAL.shadow, 11, 3, 4, 1)
  },
  pothole: (ctx, rng) => {
    asphaltBase(ctx, rng)
    // rim of broken tarmac, then the hole with a little standing water
    p(ctx, PAL.roadDark, 2, 4, 12, 9)
    p(ctx, PAL.roadDark, 3, 3, 10, 1)
    p(ctx, PAL.roadDark, 4, 13, 8, 1)
    p(ctx, PAL.ink, 3, 5, 10, 7)
    p(ctx, PAL.ink, 4, 4, 8, 1)
    p(ctx, PAL.ink, 5, 12, 6, 1)
    p(ctx, PAL.waterDark, 5, 7, 7, 4)
    p(ctx, PAL.water, 6, 8, 4, 2)
    p(ctx, PAL.waterLight, 7, 8, 2, 1)
    speckle(ctx, rng, PAL.concreteDark, 8, 2, 2, 12, 12)
  },
  manhole: (ctx, rng) => {
    asphaltBase(ctx, rng)
    p(ctx, PAL.shadow, 3, 4, 10, 8)
    p(ctx, PAL.grey, 4, 5, 8, 6)
    p(ctx, PAL.greyLight, 5, 6, 6, 1)
    for (let y = 7; y < 11; y += 2) p(ctx, PAL.shadow, 5, y, 6, 1)
  },

  // ---- water ----
  water: (ctx, rng) => {
    fill(ctx, PAL.water)
    dither(ctx, PAL.waterDark, 0, 0, TILE, TILE, 0)
    p(ctx, PAL.waterLight, 2, 4, 4, 1)
    p(ctx, PAL.waterLight, 9, 9, 3, 1)
    speckle(ctx, rng, PAL.waterLight, 4)
  },
  water_b: (ctx, rng) => {
    fill(ctx, PAL.water)
    dither(ctx, PAL.waterDark, 0, 0, TILE, TILE, 1)
    p(ctx, PAL.waterLight, 5, 6, 4, 1)
    p(ctx, PAL.waterLight, 10, 2, 3, 1)
    speckle(ctx, rng, PAL.waterLight, 4)
  },
  canal_edge: (ctx, rng) => {
    fill(ctx, PAL.water)
    dither(ctx, PAL.waterDark, 0, 6, TILE, 10, 0)
    p(ctx, PAL.concrete, 0, 0, TILE, 4)
    p(ctx, PAL.concreteDark, 0, 4, TILE, 2)
    speckle(ctx, rng, PAL.concreteDark, 10, 0, 0, TILE, 4)
    p(ctx, PAL.waterLight, 3, 9, 5, 1)
  },
}

// ---------------------------------------------------------------------------
// Nature and props. These live on the map's "over" layer, so they are painted
// without a background fill and keep their transparency.
// ---------------------------------------------------------------------------
Object.assign(TILE_PAINTERS, {
  tree_tl: (ctx) => paintTree(ctx, 0, 0),
  tree_tr: (ctx) => paintTree(ctx, 16, 0),
  tree_bl: (ctx) => paintTree(ctx, 0, 16),
  tree_br: (ctx) => paintTree(ctx, 16, 16),
  bush: (ctx, rng) => {
    p(ctx, PAL.grassDark, 2, 6, 12, 8)
    p(ctx, PAL.grassDark, 4, 4, 8, 2)
    p(ctx, PAL.grass, 3, 7, 10, 6)
    p(ctx, PAL.grass, 5, 5, 6, 2)
    p(ctx, PAL.grassLight, 5, 7, 4, 2)
    speckle(ctx, rng, PAL.grassDark, 8, 3, 6, 10, 7)
    p(ctx, PAL.shadow, 4, 14, 8, 1)
  },
  hedge: (ctx, rng) => {
    p(ctx, PAL.grassDark, 0, 3, TILE, 12)
    p(ctx, PAL.grass, 0, 5, TILE, 9)
    dither(ctx, PAL.grassDark, 0, 5, TILE, 9, 1)
    speckle(ctx, rng, PAL.grassLight, 10, 0, 4, TILE, 8)
    p(ctx, PAL.shadow, 0, 15, TILE, 1)
  },
  plant_pot: (ctx, rng) => {
    p(ctx, PAL.grassDark, 4, 3, 8, 5)
    p(ctx, PAL.grass, 5, 4, 5, 3)
    p(ctx, PAL.grassLight, 6, 4, 2, 1)
    speckle(ctx, rng, PAL.grassDark, 4, 4, 3, 8, 5)
    p(ctx, PAL.brickDark, 5, 8, 7, 6)
    p(ctx, PAL.brick, 6, 8, 4, 6)
    p(ctx, PAL.brickDark, 4, 7, 9, 2)
    p(ctx, PAL.shadow, 5, 14, 7, 1)
  },
  puddle: (ctx, rng) => {
    p(ctx, PAL.waterDark, 2, 7, 12, 6)
    p(ctx, PAL.water, 3, 8, 10, 4)
    p(ctx, PAL.waterLight, 5, 9, 4, 1)
    speckle(ctx, rng, PAL.waterDark, 5, 3, 8, 10, 4)
  },
  garbage: (ctx, rng) => {
    // an overflowing kerbside heap: bags, a broken crate, scattered paper
    p(ctx, PAL.shadow, 1, 11, 14, 4)
    p(ctx, PAL.ink, 2, 6, 6, 7)
    p(ctx, PAL.shadow, 3, 5, 4, 3)
    p(ctx, PAL.grey, 3, 7, 2, 2)
    p(ctx, PAL.blueDark, 7, 8, 6, 6)
    p(ctx, PAL.blue, 8, 9, 3, 3)
    p(ctx, PAL.bone, 11, 5, 4, 4)
    p(ctx, PAL.concreteDark, 12, 6, 2, 2)
    p(ctx, PAL.saffronDark, 5, 12, 4, 2)
    speckle(ctx, rng, PAL.bone, 10, 1, 9, 14, 6)
    speckle(ctx, rng, PAL.red, 4, 2, 8, 12, 6)
  },
  dustbin: (ctx, rng) => {
    p(ctx, PAL.shadow, 3, 14, 10, 2)
    p(ctx, PAL.tealDark, 3, 5, 10, 10)
    p(ctx, PAL.teal, 4, 6, 7, 9)
    p(ctx, PAL.tealDark, 7, 6, 1, 9)
    p(ctx, PAL.greyLight, 2, 3, 12, 2)
    p(ctx, PAL.grey, 2, 5, 12, 1)
    p(ctx, PAL.greyLight, 7, 1, 2, 2)
    speckle(ctx, rng, PAL.tealDark, 6, 4, 6, 8, 8)
  },
  handpump: (ctx) => {
    p(ctx, PAL.concreteDark, 1, 12, 14, 4)
    p(ctx, PAL.concrete, 2, 11, 12, 3)
    p(ctx, PAL.concreteLight, 3, 11, 9, 1)
    p(ctx, PAL.blueDark, 6, 4, 4, 8)
    p(ctx, PAL.blue, 7, 5, 2, 7)
    p(ctx, PAL.blueDark, 3, 9, 4, 2)
    p(ctx, PAL.grey, 9, 2, 6, 2)
    p(ctx, PAL.greyLight, 10, 2, 4, 1)
    p(ctx, PAL.blueDark, 5, 7, 3, 2)
    p(ctx, PAL.waterLight, 4, 11, 2, 1)
    p(ctx, PAL.water, 2, 14, 5, 1)
  },
  bench: (ctx) => {
    p(ctx, PAL.shadow, 1, 13, 14, 2)
    p(ctx, PAL.brickDark, 1, 8, 14, 2)
    p(ctx, PAL.brick, 1, 8, 14, 1)
    p(ctx, PAL.brickDark, 2, 4, 12, 2)
    p(ctx, PAL.brick, 2, 4, 12, 1)
    p(ctx, PAL.grey, 2, 6, 1, 7)
    p(ctx, PAL.grey, 13, 6, 1, 7)
    p(ctx, PAL.grey, 3, 10, 10, 1)
  },
  charpai: (ctx, rng) => {
    // a rope cot left out in front of a house
    p(ctx, PAL.shadow, 2, 13, 12, 2)
    p(ctx, PAL.dirtDark, 2, 3, 12, 10)
    p(ctx, PAL.sand, 3, 4, 10, 8)
    for (let y = 5; y < 12; y += 2) p(ctx, PAL.dirtLight, 3, y, 10, 1)
    for (let x = 4; x < 13; x += 3) p(ctx, PAL.dirtLight, x, 4, 1, 8)
    p(ctx, PAL.dirtDark, 2, 12, 2, 3)
    p(ctx, PAL.dirtDark, 12, 12, 2, 3)
    speckle(ctx, rng, PAL.dirtDark, 5, 3, 4, 10, 8)
  },
  sacks: (ctx, rng) => {
    p(ctx, PAL.shadow, 1, 13, 14, 2)
    p(ctx, PAL.sand, 1, 7, 7, 7)
    p(ctx, PAL.dirtLight, 2, 8, 4, 5)
    p(ctx, PAL.dirtDark, 1, 6, 6, 2)
    p(ctx, PAL.sand, 8, 5, 7, 9)
    p(ctx, PAL.dirtLight, 9, 6, 4, 6)
    p(ctx, PAL.dirtDark, 8, 4, 6, 2)
    speckle(ctx, rng, PAL.dirtDark, 12, 1, 5, 14, 8)
  },
  crates: (ctx) => {
    p(ctx, PAL.shadow, 2, 13, 12, 2)
    p(ctx, PAL.dirtDark, 2, 8, 12, 6)
    p(ctx, PAL.dirt, 3, 9, 10, 4)
    p(ctx, PAL.dirtDark, 7, 9, 1, 4)
    p(ctx, PAL.dirtDark, 3, 11, 10, 1)
    p(ctx, PAL.dirtDark, 4, 3, 9, 5)
    p(ctx, PAL.dirt, 5, 4, 7, 3)
    p(ctx, PAL.dirtDark, 8, 4, 1, 3)
  },
  brick_stack: (ctx, rng) => {
    p(ctx, PAL.shadow, 1, 13, 14, 2)
    for (let y = 0; y < 4; y++) {
      const top = 13 - y * 3
      for (let x = 1; x < 14; x += 4) {
        p(ctx, PAL.brickDark, x + (y % 2), top - 3, 4, 3)
        p(ctx, PAL.brick, x + (y % 2), top - 3, 3, 2)
      }
    }
    speckle(ctx, rng, PAL.brickDark, 10, 1, 2, 13, 12)
  },
})

// ---------------------------------------------------------------------------
// Buildings. Wall/window/door/shutter tiles are generated once per house paint
// colour so a street can be varied without hand-drawing every combination.
// ---------------------------------------------------------------------------
const WALL_COLORS = {
  cream: { base: PAL.bone, light: PAL.white, dark: PAL.concreteDark },
  teal: { base: PAL.teal, light: '#4fa39d', dark: PAL.tealDark },
  pink: { base: PAL.pink, light: '#d98ba6', dark: '#8f4a63' },
  blue: { base: PAL.blue, light: '#5b8cc0', dark: PAL.blueDark },
  saffron: { base: PAL.saffron, light: '#efa657', dark: PAL.saffronDark },
  green: { base: PAL.green, light: '#6eab57', dark: '#37682a' },
}

for (const [name, c] of Object.entries(WALL_COLORS)) {
  TILE_PAINTERS[`wall_${name}`] = (ctx, rng) => plasterWall(ctx, rng, c.base, c.dark, c.light)

  // Barred window with a sill - the bars are what make it read as Indian.
  TILE_PAINTERS[`win_${name}`] = (ctx, rng) => {
    plasterWall(ctx, rng, c.base, c.dark, c.light)
    p(ctx, c.dark, 2, 2, 12, 11)
    p(ctx, PAL.ink, 3, 3, 10, 9)
    p(ctx, PAL.skyDeep, 4, 4, 8, 7)
    p(ctx, PAL.sky, 4, 4, 4, 3)
    for (let x = 5; x < 12; x += 3) p(ctx, PAL.ink, x, 4, 1, 7)
    p(ctx, PAL.ink, 4, 7, 8, 1)
    p(ctx, PAL.concreteLight, 1, 12, 14, 2)
    p(ctx, PAL.concreteDark, 1, 14, 14, 1)
  }

  // Panelled door with a step and a small lamp above it.
  TILE_PAINTERS[`door_${name}`] = (ctx, rng) => {
    plasterWall(ctx, rng, c.base, c.dark, c.light)
    p(ctx, c.dark, 2, 1, 12, 15)
    p(ctx, PAL.brickDark, 3, 2, 10, 14)
    p(ctx, PAL.brick, 4, 3, 8, 12)
    p(ctx, PAL.brickDark, 5, 4, 6, 4)
    p(ctx, PAL.brickDark, 5, 9, 6, 4)
    p(ctx, PAL.brick, 6, 5, 4, 2)
    p(ctx, PAL.brick, 6, 10, 4, 2)
    p(ctx, PAL.yellow, 11, 8, 1, 1)
    p(ctx, PAL.concreteLight, 1, 15, 14, 1)
  }

  // Rolling shutter, the front of every small shop.
  TILE_PAINTERS[`shutter_${name}`] = (ctx, rng) => {
    plasterWall(ctx, rng, c.base, c.dark, c.light)
    p(ctx, PAL.shadow, 1, 1, 14, 14)
    p(ctx, PAL.grey, 2, 2, 12, 12)
    for (let y = 3; y < 14; y += 2) p(ctx, PAL.greyLight, 2, y, 12, 1)
    p(ctx, PAL.shadow, 2, 13, 12, 2)
    p(ctx, PAL.ink, 7, 8, 2, 2)
    speckle(ctx, rng, PAL.shadow, 8, 2, 2, 12, 12)
  }

  // Open shop counter: goods on a bench behind a low front.
  TILE_PAINTERS[`counter_${name}`] = (ctx, rng) => {
    plasterWall(ctx, rng, c.base, c.dark, c.light)
    p(ctx, PAL.ink, 1, 1, 14, 9)
    p(ctx, PAL.shadow, 2, 2, 12, 7)
    p(ctx, PAL.saffron, 3, 3, 2, 3)
    p(ctx, PAL.green, 6, 3, 2, 3)
    p(ctx, PAL.red, 9, 3, 2, 3)
    p(ctx, PAL.yellow, 12, 3, 2, 3)
    p(ctx, PAL.bone, 3, 7, 11, 2)
    p(ctx, PAL.dirtDark, 1, 10, 14, 4)
    p(ctx, PAL.dirt, 1, 10, 14, 2)
    p(ctx, PAL.shadow, 1, 14, 14, 2)
  }
}

Object.assign(TILE_PAINTERS, {
  // ---- sloped terracotta roof ----
  roof_l: (ctx, rng) => {
    fill(ctx, PAL.brickDark)
    p(ctx, PAL.brick, 2, 0, 14, TILE)
    for (let y = 0; y < TILE; y += 4) {
      p(ctx, PAL.brickDark, 2, y, 14, 1)
      for (let x = 3; x < TILE; x += 5) p(ctx, PAL.brickDark, x, y, 1, 4)
    }
    p(ctx, PAL.shadow, 0, 0, 2, TILE)
    speckle(ctx, rng, PAL.brickDark, 10, 2, 0, 14, TILE)
  },
  roof_m: (ctx, rng) => {
    fill(ctx, PAL.brick)
    for (let y = 0; y < TILE; y += 4) {
      p(ctx, PAL.brickDark, 0, y, TILE, 1)
      for (let x = 1; x < TILE; x += 5) p(ctx, PAL.brickDark, x, y, 1, 4)
    }
    speckle(ctx, rng, PAL.brickDark, 12)
  },
  roof_r: (ctx, rng) => {
    fill(ctx, PAL.brickDark)
    p(ctx, PAL.brick, 0, 0, 14, TILE)
    for (let y = 0; y < TILE; y += 4) {
      p(ctx, PAL.brickDark, 0, y, 14, 1)
      for (let x = 1; x < 14; x += 5) p(ctx, PAL.brickDark, x, y, 1, 4)
    }
    p(ctx, PAL.shadow, 14, 0, 2, TILE)
    speckle(ctx, rng, PAL.brickDark, 10, 0, 0, 14, TILE)
  },
  roof_ridge: (ctx, rng) => {
    fill(ctx, PAL.brick)
    p(ctx, PAL.brickDark, 0, 0, TILE, 3)
    p(ctx, PAL.dirtLight, 0, 1, TILE, 1)
    for (let x = 1; x < TILE; x += 5) p(ctx, PAL.brickDark, x, 3, 1, 13)
    for (let y = 5; y < TILE; y += 4) p(ctx, PAL.brickDark, 0, y, TILE, 1)
    speckle(ctx, rng, PAL.brickDark, 10, 0, 3, TILE, 13)
  },
  // ---- flat concrete roof with parapet ----
  rcc_l: (ctx, rng) => {
    fill(ctx, PAL.concrete)
    speckle(ctx, rng, PAL.concreteDark, 18)
    p(ctx, PAL.concreteLight, 0, 0, TILE, 3)
    p(ctx, PAL.concreteDark, 0, 3, TILE, 1)
    p(ctx, PAL.concreteLight, 0, 0, 3, TILE)
    p(ctx, PAL.concreteDark, 3, 4, 1, 12)
  },
  rcc_m: (ctx, rng) => {
    fill(ctx, PAL.concrete)
    speckle(ctx, rng, PAL.concreteDark, 18)
    p(ctx, PAL.concreteLight, 0, 0, TILE, 3)
    p(ctx, PAL.concreteDark, 0, 3, TILE, 1)
    speckle(ctx, rng, PAL.concreteLight, 10, 0, 5, TILE, 10)
  },
  rcc_r: (ctx, rng) => {
    fill(ctx, PAL.concrete)
    speckle(ctx, rng, PAL.concreteDark, 18)
    p(ctx, PAL.concreteLight, 0, 0, TILE, 3)
    p(ctx, PAL.concreteDark, 0, 3, TILE, 1)
    p(ctx, PAL.concreteLight, 13, 0, 3, TILE)
    p(ctx, PAL.concreteDark, 12, 4, 1, 12)
  },
  // ---- rooftop water tank ----
  tank: (ctx) => {
    p(ctx, PAL.shadow, 2, 13, 12, 2)
    p(ctx, PAL.ink, 3, 4, 10, 10)
    p(ctx, PAL.shadow, 4, 5, 6, 8)
    p(ctx, PAL.grey, 4, 5, 3, 2)
    p(ctx, PAL.ink, 3, 2, 10, 3)
    p(ctx, PAL.shadow, 5, 1, 4, 2)
    p(ctx, PAL.greyLight, 6, 1, 2, 1)
  },

  // ---- shopfront dressing ----
  awning_l: (ctx) => {
    p(ctx, PAL.shadow, 0, 9, TILE, 2)
    p(ctx, PAL.red, 2, 2, 14, 7)
    p(ctx, PAL.bone, 5, 2, 3, 7)
    p(ctx, PAL.bone, 11, 2, 3, 7)
    p(ctx, PAL.redDark, 2, 8, 14, 1)
    p(ctx, PAL.grey, 2, 1, 14, 1)
  },
  awning_m: (ctx) => {
    p(ctx, PAL.shadow, 0, 9, TILE, 2)
    p(ctx, PAL.red, 0, 2, TILE, 7)
    p(ctx, PAL.bone, 1, 2, 3, 7)
    p(ctx, PAL.bone, 7, 2, 3, 7)
    p(ctx, PAL.bone, 13, 2, 3, 7)
    p(ctx, PAL.redDark, 0, 8, TILE, 1)
    p(ctx, PAL.grey, 0, 1, TILE, 1)
  },
  awning_r: (ctx) => {
    p(ctx, PAL.shadow, 0, 9, TILE, 2)
    p(ctx, PAL.red, 0, 2, 14, 7)
    p(ctx, PAL.bone, 2, 2, 3, 7)
    p(ctx, PAL.bone, 8, 2, 3, 7)
    p(ctx, PAL.redDark, 0, 8, 14, 1)
    p(ctx, PAL.grey, 0, 1, 14, 1)
  },
  // Hand-painted signboard. The "lettering" is deliberately abstract strokes -
  // readable shop names are drawn as real text by the renderer where needed.
  sign_l: (ctx) => {
    p(ctx, PAL.ink, 1, 3, 15, 11)
    p(ctx, PAL.teal, 2, 4, 14, 9)
    p(ctx, PAL.tealDark, 2, 12, 14, 1)
    p(ctx, PAL.yellow, 4, 6, 1, 5)
    p(ctx, PAL.yellow, 5, 8, 2, 1)
    p(ctx, PAL.yellow, 7, 6, 1, 5)
    p(ctx, PAL.yellow, 10, 6, 3, 1)
    p(ctx, PAL.yellow, 11, 7, 1, 4)
  },
  sign_m: (ctx) => {
    p(ctx, PAL.ink, 0, 3, TILE, 11)
    p(ctx, PAL.teal, 0, 4, TILE, 9)
    p(ctx, PAL.tealDark, 0, 12, TILE, 1)
    p(ctx, PAL.yellow, 1, 6, 1, 5)
    p(ctx, PAL.yellow, 2, 6, 2, 1)
    p(ctx, PAL.yellow, 2, 8, 2, 1)
    p(ctx, PAL.yellow, 6, 6, 1, 5)
    p(ctx, PAL.yellow, 7, 10, 2, 1)
    p(ctx, PAL.yellow, 11, 6, 1, 5)
    p(ctx, PAL.yellow, 12, 6, 3, 1)
  },
  sign_r: (ctx) => {
    p(ctx, PAL.ink, 0, 3, 15, 11)
    p(ctx, PAL.teal, 0, 4, 14, 9)
    p(ctx, PAL.tealDark, 0, 12, 14, 1)
    p(ctx, PAL.yellow, 2, 6, 1, 5)
    p(ctx, PAL.yellow, 3, 6, 3, 1)
    p(ctx, PAL.yellow, 5, 7, 1, 4)
    p(ctx, PAL.yellow, 8, 6, 3, 5)
  },
  // ---- street furniture ----
  pole_top: (ctx) => {
    p(ctx, PAL.concreteDark, 6, 0, 4, TILE)
    p(ctx, PAL.concrete, 7, 0, 2, TILE)
    p(ctx, PAL.shadow, 1, 3, 14, 1)
    p(ctx, PAL.shadow, 2, 6, 12, 1)
    p(ctx, PAL.greyLight, 3, 2, 1, 2)
    p(ctx, PAL.greyLight, 12, 2, 1, 2)
    p(ctx, PAL.grey, 2, 3, 12, 1)
  },
  pole_base: (ctx, rng) => {
    p(ctx, PAL.concreteDark, 6, 0, 4, 14)
    p(ctx, PAL.concrete, 7, 0, 2, 14)
    p(ctx, PAL.concreteDark, 4, 13, 8, 2)
    p(ctx, PAL.shadow, 4, 15, 9, 1)
    speckle(ctx, rng, PAL.shadow, 5, 6, 2, 4, 11)
  },
  lamp_top: (ctx) => {
    p(ctx, PAL.grey, 7, 4, 2, 12)
    p(ctx, PAL.greyLight, 7, 4, 1, 12)
    p(ctx, PAL.grey, 8, 3, 5, 1)
    p(ctx, PAL.shadow, 11, 4, 4, 3)
    p(ctx, PAL.yellow, 12, 6, 3, 2)
    p(ctx, PAL.white, 13, 6, 1, 1)
  },
  lamp_base: (ctx) => {
    p(ctx, PAL.grey, 7, 0, 2, 14)
    p(ctx, PAL.greyLight, 7, 0, 1, 14)
    p(ctx, PAL.concreteDark, 5, 13, 6, 2)
    p(ctx, PAL.shadow, 5, 15, 7, 1)
  },
  signpost: (ctx) => {
    p(ctx, PAL.grey, 7, 8, 2, 8)
    p(ctx, PAL.shadow, 2, 2, 13, 8)
    p(ctx, PAL.blue, 2, 2, 12, 7)
    p(ctx, PAL.blueDark, 2, 8, 12, 1)
    p(ctx, PAL.white, 4, 4, 8, 1)
    p(ctx, PAL.white, 4, 6, 5, 1)
  },
  notice_board: (ctx, rng) => {
    p(ctx, PAL.dirtDark, 3, 11, 2, 5)
    p(ctx, PAL.dirtDark, 11, 11, 2, 5)
    p(ctx, PAL.ink, 1, 1, 14, 11)
    p(ctx, PAL.dirtDark, 2, 2, 12, 9)
    p(ctx, PAL.bone, 3, 3, 4, 4)
    p(ctx, PAL.white, 8, 3, 5, 3)
    p(ctx, PAL.bone, 4, 8, 6, 2)
    p(ctx, PAL.yellow, 11, 7, 2, 3)
    speckle(ctx, rng, PAL.grey, 6, 3, 3, 10, 7)
  },
  bus_sign: (ctx) => {
    p(ctx, PAL.grey, 7, 6, 2, 10)
    p(ctx, PAL.shadow, 2, 1, 13, 7)
    p(ctx, PAL.saffron, 2, 1, 12, 6)
    p(ctx, PAL.ink, 4, 3, 2, 2)
    p(ctx, PAL.ink, 7, 3, 2, 2)
    p(ctx, PAL.ink, 10, 3, 2, 2)
    p(ctx, PAL.shadow, 5, 15, 6, 1)
  },
  // ---- boundary walls, gates, steps ----
  compound_wall: (ctx, rng) => {
    fill(ctx, PAL.concrete)
    speckle(ctx, rng, PAL.concreteDark, 14)
    p(ctx, PAL.concreteLight, 0, 0, TILE, 2)
    p(ctx, PAL.saffronDark, 0, 3, TILE, 4)
    p(ctx, PAL.saffron, 0, 3, TILE, 2)
    p(ctx, PAL.concreteDark, 0, 14, TILE, 2)
    speckle(ctx, rng, PAL.concreteDark, 8, 0, 8, TILE, 6)
  },
  gate: (ctx) => {
    p(ctx, PAL.concreteDark, 0, 0, 2, TILE)
    p(ctx, PAL.concreteDark, 14, 0, 2, TILE)
    p(ctx, PAL.ink, 2, 2, 12, 13)
    p(ctx, PAL.blueDark, 3, 3, 10, 11)
    for (let x = 4; x < 13; x += 3) p(ctx, PAL.blue, x, 3, 1, 11)
    p(ctx, PAL.blue, 3, 7, 10, 1)
    p(ctx, PAL.greyLight, 7, 9, 2, 1)
  },
  steps: (ctx, rng) => {
    fill(ctx, PAL.concrete)
    p(ctx, PAL.concreteLight, 0, 0, TILE, 4)
    p(ctx, PAL.concreteDark, 0, 4, TILE, 1)
    p(ctx, PAL.concrete, 0, 5, TILE, 4)
    p(ctx, PAL.concreteDark, 0, 9, TILE, 1)
    p(ctx, PAL.concreteDark, 0, 10, TILE, 5)
    p(ctx, PAL.shadow, 0, 15, TILE, 1)
    speckle(ctx, rng, PAL.concreteDark, 10)
  },
  // ---- tea stall (two tiles wide) ----
  stall_l: (ctx) => {
    p(ctx, PAL.shadow, 2, 14, 14, 2)
    p(ctx, PAL.redDark, 3, 1, 13, 4)
    p(ctx, PAL.red, 3, 1, 13, 2)
    p(ctx, PAL.grey, 4, 5, 1, 9)
    p(ctx, PAL.dirtDark, 4, 8, 12, 6)
    p(ctx, PAL.dirt, 5, 8, 11, 2)
    p(ctx, PAL.ink, 8, 5, 5, 3)
    p(ctx, PAL.saffron, 9, 6, 3, 2)
    p(ctx, PAL.greyLight, 6, 6, 2, 2)
  },
  stall_r: (ctx) => {
    p(ctx, PAL.shadow, 0, 14, 14, 2)
    p(ctx, PAL.redDark, 0, 1, 13, 4)
    p(ctx, PAL.red, 0, 1, 13, 2)
    p(ctx, PAL.grey, 11, 5, 1, 9)
    p(ctx, PAL.dirtDark, 0, 8, 12, 6)
    p(ctx, PAL.dirt, 0, 8, 11, 2)
    p(ctx, PAL.bone, 2, 6, 2, 2)
    p(ctx, PAL.bone, 5, 6, 2, 2)
    p(ctx, PAL.concreteLight, 2, 5, 6, 1)
  },
  cycle: (ctx) => {
    p(ctx, PAL.shadow, 1, 14, 14, 1)
    p(ctx, PAL.ink, 2, 8, 5, 5)
    p(ctx, PAL.shadow, 3, 9, 3, 3)
    p(ctx, PAL.ink, 9, 8, 5, 5)
    p(ctx, PAL.shadow, 10, 9, 3, 3)
    p(ctx, PAL.blueDark, 5, 6, 6, 1)
    p(ctx, PAL.blueDark, 4, 7, 2, 3)
    p(ctx, PAL.blueDark, 10, 6, 1, 5)
    p(ctx, PAL.grey, 9, 4, 3, 1)
    p(ctx, PAL.ink, 4, 5, 3, 1)
  },
})

// ---------------------------------------------------------------------------
// Atlas baking. Every painter is run once into a shared canvas; the world
// renderer then only ever does drawImage from that canvas.
// ---------------------------------------------------------------------------
const ATLAS_COLS = 16
let atlas = null
const tileIndex = new Map()

export function buildTileAtlas() {
  if (atlas) return atlas
  const names = Object.keys(TILE_PAINTERS)
  const rows = Math.ceil(names.length / ATLAS_COLS)
  const c = document.createElement('canvas')
  c.width = ATLAS_COLS * TILE
  c.height = rows * TILE
  const ctx = c.getContext('2d')
  ctx.imageSmoothingEnabled = false
  names.forEach((name, i) => {
    const cx = (i % ATLAS_COLS) * TILE
    const cy = Math.floor(i / ATLAS_COLS) * TILE
    tileIndex.set(name, { x: cx, y: cy })
    ctx.save()
    ctx.translate(cx, cy)
    ctx.beginPath()
    ctx.rect(0, 0, TILE, TILE)
    ctx.clip()
    try {
      TILE_PAINTERS[name](ctx, makeRng(name))
    } catch (err) {
      // A broken painter must not take the whole game down; flag it loudly
      // in dev but keep the atlas usable.
      console.error(`tile painter "${name}" failed`, err)
    }
    ctx.restore()
  })
  atlas = c
  return atlas
}

export function hasTile(name) {
  if (!atlas) buildTileAtlas()
  return tileIndex.has(name)
}

/** Blit tile `name` at pixel position (dx, dy) on the given context. */
export function drawTile(ctx, name, dx, dy) {
  if (!atlas) buildTileAtlas()
  const t = tileIndex.get(name)
  if (!t) return false
  ctx.drawImage(atlas, t.x, t.y, TILE, TILE, dx, dy, TILE, TILE)
  return true
}

export function getTileAtlas() {
  return atlas || buildTileAtlas()
}

// ---------------------------------------------------------------------------
// Interior set - used by the player's home. Same palette, same dither habits,
// so stepping indoors does not look like a different game.
// ---------------------------------------------------------------------------
Object.assign(TILE_PAINTERS, {
  floor: (ctx, rng) => {
    fill(ctx, PAL.concreteLight)
    speckle(ctx, rng, PAL.concrete, 20)
    p(ctx, PAL.concrete, 0, 0, TILE, 1)
    p(ctx, PAL.concrete, 0, 0, 1, TILE)
    p(ctx, PAL.bone, 1, 1, TILE - 1, 1)
    p(ctx, PAL.concreteDark, 0, 15, TILE, 1)
    p(ctx, PAL.concreteDark, 15, 0, 1, TILE)
  },
  floor_rug: (ctx, rng) => {
    fill(ctx, PAL.redDark)
    p(ctx, PAL.red, 1, 1, 14, 14)
    p(ctx, PAL.saffron, 3, 3, 10, 10)
    p(ctx, PAL.redDark, 5, 5, 6, 6)
    p(ctx, PAL.yellow, 7, 7, 2, 2)
    speckle(ctx, rng, PAL.saffronDark, 8, 2, 2, 12, 12)
  },
  wall_in: (ctx, rng) => {
    fill(ctx, PAL.bone)
    speckle(ctx, rng, PAL.concreteDark, 8)
    p(ctx, PAL.white, 0, 0, TILE, 2)
    p(ctx, PAL.teal, 0, 11, TILE, 4)
    p(ctx, PAL.tealDark, 0, 11, TILE, 1)
    p(ctx, PAL.tealDark, 0, 15, TILE, 1)
  },
  wall_in_win: (ctx, rng) => {
    TILE_PAINTERS.wall_in(ctx, rng)
    p(ctx, PAL.ink, 2, 1, 12, 9)
    p(ctx, PAL.sky, 3, 2, 10, 7)
    p(ctx, PAL.skyDeep, 3, 6, 10, 3)
    p(ctx, PAL.grassDark, 3, 8, 10, 1)
    p(ctx, PAL.ink, 8, 2, 1, 7)
    p(ctx, PAL.ink, 3, 5, 10, 1)
    p(ctx, PAL.concreteLight, 1, 10, 14, 1)
  },
  wall_in_frame: (ctx, rng) => {
    // a framed photo and a wall calendar - the details that say "someone lives here"
    TILE_PAINTERS.wall_in(ctx, rng)
    p(ctx, PAL.dirtDark, 1, 2, 7, 7)
    p(ctx, PAL.bone, 2, 3, 5, 5)
    p(ctx, PAL.skinB, 3, 5, 1, 2)
    p(ctx, PAL.skinB, 5, 5, 1, 2)
    p(ctx, PAL.hair, 3, 4, 1, 1)
    p(ctx, PAL.hair, 5, 4, 1, 1)
    p(ctx, PAL.ink, 10, 2, 5, 7)
    p(ctx, PAL.white, 10, 3, 5, 6)
    p(ctx, PAL.red, 10, 3, 5, 1)
    speckle(ctx, rng, PAL.grey, 6, 10, 5, 5, 4)
  },
  bed_top: (ctx) => {
    p(ctx, PAL.dirtDark, 1, 1, 14, 15)
    p(ctx, PAL.dirt, 2, 2, 12, 14)
    p(ctx, PAL.white, 3, 3, 10, 5)
    p(ctx, PAL.concreteLight, 3, 7, 10, 1)
    p(ctx, PAL.blue, 3, 9, 10, 7)
    p(ctx, PAL.blueDark, 3, 12, 10, 1)
    p(ctx, PAL.blueDark, 8, 9, 1, 7)
  },
  bed_bottom: (ctx) => {
    p(ctx, PAL.dirtDark, 1, 0, 14, 15)
    p(ctx, PAL.dirt, 2, 0, 12, 14)
    p(ctx, PAL.blue, 3, 0, 10, 11)
    p(ctx, PAL.blueDark, 3, 4, 10, 1)
    p(ctx, PAL.blueDark, 8, 0, 1, 11)
    p(ctx, PAL.dirtDark, 2, 12, 12, 3)
    p(ctx, PAL.shadow, 2, 15, 12, 1)
  },
  table_in: (ctx) => {
    p(ctx, PAL.shadow, 1, 13, 14, 2)
    p(ctx, PAL.dirtDark, 1, 5, 14, 8)
    p(ctx, PAL.dirt, 2, 5, 12, 6)
    p(ctx, PAL.dirtLight, 2, 5, 12, 1)
    p(ctx, PAL.bone, 4, 2, 5, 3)
    p(ctx, PAL.white, 5, 2, 3, 1)
    p(ctx, PAL.teal, 10, 1, 4, 4)
    p(ctx, PAL.tealDark, 10, 4, 4, 1)
  },
  shelf_in: (ctx, rng) => {
    p(ctx, PAL.dirtDark, 1, 0, 14, 16)
    p(ctx, PAL.dirt, 2, 1, 12, 14)
    p(ctx, PAL.dirtDark, 2, 6, 12, 1)
    p(ctx, PAL.dirtDark, 2, 11, 12, 1)
    p(ctx, PAL.red, 3, 2, 2, 4)
    p(ctx, PAL.blue, 6, 2, 2, 4)
    p(ctx, PAL.green, 9, 3, 2, 3)
    p(ctx, PAL.bone, 3, 8, 8, 3)
    p(ctx, PAL.saffron, 4, 12, 3, 3)
    speckle(ctx, rng, PAL.dirtDark, 6, 2, 1, 12, 14)
  },
  stove_in: (ctx) => {
    p(ctx, PAL.concreteDark, 0, 4, TILE, 12)
    p(ctx, PAL.concrete, 0, 4, TILE, 2)
    p(ctx, PAL.shadow, 2, 7, 6, 5)
    p(ctx, PAL.grey, 3, 8, 4, 3)
    p(ctx, PAL.blue, 4, 9, 2, 1)
    p(ctx, PAL.greyLight, 10, 6, 5, 5)
    p(ctx, PAL.grey, 11, 7, 3, 3)
    p(ctx, PAL.concreteDark, 0, 15, TILE, 1)
  },
  door_in: (ctx) => {
    p(ctx, PAL.ink, 2, 0, 12, 14)
    p(ctx, PAL.brickDark, 3, 0, 10, 13)
    p(ctx, PAL.brick, 4, 0, 8, 11)
    p(ctx, PAL.brickDark, 5, 2, 6, 4)
    p(ctx, PAL.yellow, 11, 7, 1, 1)
    p(ctx, PAL.dirtLight, 3, 14, 10, 2)
    p(ctx, PAL.dirtDark, 3, 15, 10, 1)
  },
  water_pot: (ctx) => {
    p(ctx, PAL.shadow, 3, 14, 10, 2)
    p(ctx, PAL.brickDark, 3, 6, 10, 9)
    p(ctx, PAL.brick, 4, 7, 6, 7)
    p(ctx, PAL.brickDark, 5, 4, 6, 3)
    p(ctx, PAL.dirtLight, 5, 3, 6, 1)
    p(ctx, PAL.waterLight, 6, 4, 3, 1)
  },
})
