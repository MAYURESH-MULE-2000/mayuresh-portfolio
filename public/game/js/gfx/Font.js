/**
 * Font.js
 * ---------------------------------------------------------------------------
 * A hand-authored 1-bit variable-width bitmap font (cap height 7px, descenders
 * on row 7). Every glyph is a list of rows; the length of a row string is the
 * glyph's width, so 'i' takes 1px and 'M' takes 5px. That variable width is
 * what stops the text looking like a spreadsheet.
 *
 * Rendering strategy: the glyphs are baked once into a white-on-transparent
 * atlas canvas. Tinted copies of that atlas are cached per colour, so drawing
 * text at run time is just a series of drawImage calls with no per-frame
 * allocation.
 */

const G = {
  ' ': ['000', '000', '000', '000', '000', '000', '000', '000'],
  '!': ['1', '1', '1', '1', '1', '0', '1', '0'],
  '"': ['101', '101', '000', '000', '000', '000', '000', '000'],
  '#': ['01010', '01010', '11111', '01010', '11111', '01010', '01010', '00000'],
  $: ['00100', '01111', '10100', '01110', '00101', '11110', '00100', '00000'],
  '%': ['11001', '11010', '00010', '00100', '01000', '01011', '10011', '00000'],
  '&': ['01100', '10010', '10010', '01100', '10101', '10010', '01101', '00000'],
  "'": ['1', '1', '0', '0', '0', '0', '0', '0'],
  '(': ['01', '10', '10', '10', '10', '10', '01', '00'],
  ')': ['10', '01', '01', '01', '01', '01', '10', '00'],
  '*': ['000', '101', '010', '101', '000', '000', '000', '000'],
  '+': ['00000', '00100', '00100', '11111', '00100', '00100', '00000', '00000'],
  ',': ['00', '00', '00', '00', '00', '00', '01', '10'],
  '-': ['000', '000', '000', '111', '000', '000', '000', '000'],
  '.': ['0', '0', '0', '0', '0', '0', '1', '0'],
  '/': ['00001', '00001', '00010', '00100', '01000', '10000', '10000', '00000'],
  0: ['01110', '10001', '10011', '10101', '11001', '10001', '01110', '00000'],
  1: ['00100', '01100', '00100', '00100', '00100', '00100', '01110', '00000'],
  2: ['01110', '10001', '00001', '00110', '01000', '10000', '11111', '00000'],
  3: ['11111', '00010', '00100', '00010', '00001', '10001', '01110', '00000'],
  4: ['00010', '00110', '01010', '10010', '11111', '00010', '00010', '00000'],
  5: ['11111', '10000', '11110', '00001', '00001', '10001', '01110', '00000'],
  6: ['00110', '01000', '10000', '11110', '10001', '10001', '01110', '00000'],
  7: ['11111', '00001', '00010', '00100', '01000', '01000', '01000', '00000'],
  8: ['01110', '10001', '10001', '01110', '10001', '10001', '01110', '00000'],
  9: ['01110', '10001', '10001', '01111', '00001', '00010', '01100', '00000'],
  ':': ['0', '0', '1', '0', '0', '1', '0', '0'],
  ';': ['00', '00', '01', '00', '00', '01', '01', '10'],
  '<': ['000', '001', '010', '100', '010', '001', '000', '000'],
  '=': ['0000', '0000', '1111', '0000', '1111', '0000', '0000', '0000'],
  '>': ['000', '100', '010', '001', '010', '100', '000', '000'],
  '?': ['01110', '10001', '00001', '00110', '00100', '00000', '00100', '00000'],
  '@': ['01110', '10001', '10111', '10101', '10111', '10000', '01110', '00000'],
  A: ['01110', '10001', '10001', '11111', '10001', '10001', '10001', '00000'],
  B: ['11110', '10001', '10001', '11110', '10001', '10001', '11110', '00000'],
  C: ['01110', '10001', '10000', '10000', '10000', '10001', '01110', '00000'],
  D: ['11110', '10001', '10001', '10001', '10001', '10001', '11110', '00000'],
  E: ['11111', '10000', '10000', '11110', '10000', '10000', '11111', '00000'],
  F: ['11111', '10000', '10000', '11110', '10000', '10000', '10000', '00000'],
  G: ['01110', '10001', '10000', '10111', '10001', '10001', '01111', '00000'],
  H: ['10001', '10001', '10001', '11111', '10001', '10001', '10001', '00000'],
  I: ['111', '010', '010', '010', '010', '010', '111', '000'],
  J: ['00111', '00010', '00010', '00010', '00010', '10010', '01100', '00000'],
  K: ['10001', '10010', '10100', '11000', '10100', '10010', '10001', '00000'],
  L: ['10000', '10000', '10000', '10000', '10000', '10000', '11111', '00000'],
  M: ['10001', '11011', '10101', '10101', '10001', '10001', '10001', '00000'],
  N: ['10001', '11001', '10101', '10011', '10001', '10001', '10001', '00000'],
  O: ['01110', '10001', '10001', '10001', '10001', '10001', '01110', '00000'],
  P: ['11110', '10001', '10001', '11110', '10000', '10000', '10000', '00000'],
  Q: ['01110', '10001', '10001', '10001', '10101', '10010', '01101', '00000'],
  R: ['11110', '10001', '10001', '11110', '10100', '10010', '10001', '00000'],
  S: ['01111', '10000', '10000', '01110', '00001', '00001', '11110', '00000'],
  T: ['11111', '00100', '00100', '00100', '00100', '00100', '00100', '00000'],
  U: ['10001', '10001', '10001', '10001', '10001', '10001', '01110', '00000'],
  V: ['10001', '10001', '10001', '10001', '10001', '01010', '00100', '00000'],
  W: ['10001', '10001', '10001', '10101', '10101', '11011', '10001', '00000'],
  X: ['10001', '10001', '01010', '00100', '01010', '10001', '10001', '00000'],
  Y: ['10001', '10001', '01010', '00100', '00100', '00100', '00100', '00000'],
  Z: ['11111', '00001', '00010', '00100', '01000', '10000', '11111', '00000'],
  '[': ['11', '10', '10', '10', '10', '10', '11', '00'],
  '\\': ['10000', '10000', '01000', '00100', '00010', '00001', '00001', '00000'],
  ']': ['11', '01', '01', '01', '01', '01', '11', '00'],
  _: ['00000', '00000', '00000', '00000', '00000', '00000', '00000', '11111'],
  a: ['0000', '0000', '0110', '0001', '0111', '1001', '0111', '0000'],
  b: ['1000', '1000', '1110', '1001', '1001', '1001', '1110', '0000'],
  c: ['0000', '0000', '0111', '1000', '1000', '1000', '0111', '0000'],
  d: ['0001', '0001', '0111', '1001', '1001', '1001', '0111', '0000'],
  e: ['0000', '0000', '0110', '1001', '1111', '1000', '0111', '0000'],
  f: ['0011', '0100', '1110', '0100', '0100', '0100', '0100', '0000'],
  g: ['0000', '0000', '0111', '1001', '1001', '0111', '0001', '0110'],
  h: ['1000', '1000', '1110', '1001', '1001', '1001', '1001', '0000'],
  i: ['1', '0', '1', '1', '1', '1', '1', '0'],
  j: ['001', '000', '001', '001', '001', '001', '001', '110'],
  k: ['1000', '1000', '1001', '1010', '1100', '1010', '1001', '0000'],
  l: ['11', '01', '01', '01', '01', '01', '01', '00'],
  m: ['00000', '00000', '11010', '10101', '10101', '10101', '10101', '00000'],
  n: ['0000', '0000', '1110', '1001', '1001', '1001', '1001', '0000'],
  o: ['0000', '0000', '0110', '1001', '1001', '1001', '0110', '0000'],
  p: ['0000', '0000', '1110', '1001', '1001', '1110', '1000', '1000'],
  q: ['0000', '0000', '0111', '1001', '1001', '0111', '0001', '0001'],
  r: ['0000', '0000', '1011', '1100', '1000', '1000', '1000', '0000'],
  s: ['0000', '0000', '0111', '1000', '0110', '0001', '1110', '0000'],
  t: ['010', '010', '111', '010', '010', '010', '011', '000'],
  u: ['0000', '0000', '1001', '1001', '1001', '1001', '0111', '0000'],
  v: ['00000', '00000', '10001', '10001', '10001', '01010', '00100', '00000'],
  w: ['00000', '00000', '10001', '10001', '10101', '10101', '01010', '00000'],
  x: ['000', '000', '101', '101', '010', '101', '101', '000'],
  y: ['0000', '0000', '1001', '1001', '1001', '0111', '0001', '0110'],
  z: ['0000', '0000', '1111', '0010', '0100', '1000', '1111', '0000'],
  // --- symbols we actually use in the UI ---------------------------------
  '₹': ['11110', '10001', '11110', '11111', '00100', '01000', '10000', '00000'], // rupee
  '▶': ['000', '100', '110', '111', '110', '100', '000', '000'], // menu cursor
  '▼': ['00000', '00000', '00000', '11111', '01110', '00100', '00000', '00000'], // "more text"
  '★': ['00000', '00100', '01110', '11111', '01110', '01010', '00000', '00000'], // star
  '♪': ['0011', '0011', '0001', '0001', '1101', '1111', '0110', '0000'], // note
  '→': ['00000', '00010', '00110', '11111', '00110', '00010', '00000', '00000'],
  '←': ['00000', '01000', '01100', '11111', '01100', '01000', '00000', '00000'],
  '↑': ['00000', '00100', '01110', '11111', '00100', '00100', '00100', '00000'],
  '↓': ['00000', '00100', '00100', '00100', '11111', '01110', '00100', '00000'],
  '·': ['000', '000', '000', '010', '000', '000', '000', '000'], // mid dot
  '•': ['000', '000', '010', '111', '010', '000', '000', '000'], // bullet
}

export const GLYPH_H = 8
export const LINE_H = 10
const LETTER_SPACING = 1
const SPACE_W = 3

/**
 * Characters the writing uses that are not in the glyph table: curly quotes,
 * long dashes, ellipsis. Mapping them here means content can be written with
 * proper punctuation and still render.
 */
const ALIASES = {
  '\u2019': "'",
  '\u2018': "'",
  '\u201C': '"',
  '\u201D': '"',
  '\u2013': '-',
  '\u2014': '-',
  '\u00A0': ' ',
}

const norm = (ch) => ALIASES[ch] || ch

const chars = Object.keys(G)
/** x offset of each glyph inside the atlas */
const atlasX = {}
let atlasCanvas = null
const tintCache = new Map()

function buildAtlas() {
  let w = 0
  for (const ch of chars) {
    atlasX[ch] = w
    w += G[ch][0].length + 1
  }
  const c = document.createElement('canvas')
  c.width = w
  c.height = GLYPH_H
  const ctx = c.getContext('2d')
  ctx.fillStyle = '#ffffff'
  for (const ch of chars) {
    const rows = G[ch]
    for (let y = 0; y < rows.length; y++) {
      const row = rows[y]
      for (let x = 0; x < row.length; x++) {
        if (row[x] === '1') ctx.fillRect(atlasX[ch] + x, y, 1, 1)
      }
    }
  }
  atlasCanvas = c
}

/** Returns an atlas tinted to `color`, building and caching it on first use. */
function tinted(color) {
  if (!atlasCanvas) buildAtlas()
  let c = tintCache.get(color)
  if (c) return c
  c = document.createElement('canvas')
  c.width = atlasCanvas.width
  c.height = atlasCanvas.height
  const ctx = c.getContext('2d')
  ctx.drawImage(atlasCanvas, 0, 0)
  ctx.globalCompositeOperation = 'source-in'
  ctx.fillStyle = color
  ctx.fillRect(0, 0, c.width, c.height)
  tintCache.set(color, c)
  return c
}

function glyphWidth(raw) {
  const ch = norm(raw)
  if (ch === ' ') return SPACE_W
  const g = G[ch]
  return g ? g[0].length : SPACE_W
}

/** Pixel width of `text` as it will be drawn. */
export function measure(raw) {
  const text = String(raw).replace(/\u2026/g, '...')
  let w = 0
  for (const ch of text) w += glyphWidth(ch) + LETTER_SPACING
  return Math.max(0, w - LETTER_SPACING)
}

/**
 * Draw `text` with its top-left corner at (x, y).
 * `align` may be 'left' | 'center' | 'right'.
 */
export function drawText(ctx, rawText, x, y, color = '#ffffff', align = 'left') {
  const text = String(rawText).replace(/\u2026/g, '...')
  const atlas = tinted(color)
  let cx = x
  if (align === 'center') cx = Math.round(x - measure(text) / 2)
  else if (align === 'right') cx = Math.round(x - measure(text))
  cx = Math.round(cx)
  const ty = Math.round(y)
  for (const raw of text) {
    const ch = norm(raw)
    if (ch === ' ') {
      cx += SPACE_W + LETTER_SPACING
      continue
    }
    const g = G[ch]
    if (!g) {
      // Unknown character: leave a space rather than drawing garbage.
      cx += SPACE_W + LETTER_SPACING
      continue
    }
    const w = g[0].length
    ctx.drawImage(atlas, atlasX[ch], 0, w, GLYPH_H, cx, ty, w, GLYPH_H)
    cx += w + LETTER_SPACING
  }
  return cx
}

/** Draw text with a 1px drop shadow - used for text over busy backgrounds. */
export function drawTextShadow(ctx, text, x, y, color, shadow = '#0d0c10', align = 'left') {
  drawText(ctx, text, x + 1, y + 1, shadow, align)
  drawText(ctx, text, x, y, color, align)
}

/**
 * Greedy word wrap. Returns an array of lines that each fit inside `maxWidth`.
 * Words longer than the line are hard-broken so nothing ever overflows.
 */
export function wrapText(text, maxWidth) {
  const lines = []
  for (const paragraph of String(text).replace(/\u2026/g, '...').split('\n')) {
    const words = paragraph.split(' ')
    let line = ''
    for (let word of words) {
      while (measure(word) > maxWidth) {
        let cut = word.length - 1
        while (cut > 1 && measure(word.slice(0, cut)) > maxWidth) cut--
        if (line) {
          lines.push(line)
          line = ''
        }
        lines.push(word.slice(0, cut))
        word = word.slice(cut)
      }
      const candidate = line ? `${line} ${word}` : word
      if (measure(candidate) > maxWidth) {
        if (line) lines.push(line)
        line = word
      } else {
        line = candidate
      }
    }
    lines.push(line)
  }
  return lines
}

/**
 * Draw text at an integer scale. Used for the title: the glyph atlas is nearest
 * neighbour scaled, so big text stays as crunchy as small text.
 */
export function drawTextScaled(ctx, rawText, x, y, color, scale = 2, align = 'left') {
  const text = String(rawText).replace(/…/g, '...')
  const atlas = tinted(color)
  const width = measure(text) * scale
  let cx = x
  if (align === 'center') cx = Math.round(x - width / 2)
  else if (align === 'right') cx = Math.round(x - width)
  cx = Math.round(cx)
  const ty = Math.round(y)
  const prev = ctx.imageSmoothingEnabled
  ctx.imageSmoothingEnabled = false
  for (const raw of text) {
    const ch = norm(raw)
    if (ch === ' ' || !G[ch]) {
      cx += (SPACE_W + LETTER_SPACING) * scale
      continue
    }
    const w = G[ch][0].length
    ctx.drawImage(atlas, atlasX[ch], 0, w, GLYPH_H, cx, ty, w * scale, GLYPH_H * scale)
    cx += (w + LETTER_SPACING) * scale
  }
  ctx.imageSmoothingEnabled = prev
  return cx
}
