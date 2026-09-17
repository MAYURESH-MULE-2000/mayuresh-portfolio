/**
 * Emblems.js
 * ---------------------------------------------------------------------------
 * A 48x48 emblem per problem category, drawn with the same palette and the
 * same chunky pixel logic as the tiles. These stand in the encounter screen
 * where a monster sprite would sit in the games this one is nodding at - the
 * thing you are facing is a situation, so the art is an object from it.
 */

import { PAL } from './Palette.js'

const p = (ctx, c, x, y, w = 1, h = 1) => {
  ctx.fillStyle = c
  ctx.fillRect(x, y, w, h)
}

/** Coins and a note: money problems. */
function economic(ctx, t) {
  const bob = Math.round(Math.sin(t * 2) * 1)
  p(ctx, PAL.dirtDark, 6, 34 + bob, 36, 8)
  p(ctx, PAL.dirt, 6, 32 + bob, 36, 3)
  p(ctx, PAL.yellow, 10, 22 + bob, 12, 12)
  p(ctx, PAL.saffron, 10, 30 + bob, 12, 4)
  p(ctx, PAL.white, 12, 24 + bob, 3, 3)
  p(ctx, PAL.yellow, 24, 26 + bob, 12, 8)
  p(ctx, PAL.saffron, 24, 32 + bob, 12, 2)
  p(ctx, PAL.bone, 14, 8, 22, 12)
  p(ctx, PAL.concreteDark, 14, 18, 22, 2)
  p(ctx, PAL.ink, 18, 11, 2, 6)
  p(ctx, PAL.ink, 18, 11, 6, 2)
  p(ctx, PAL.ink, 18, 14, 6, 2)
  p(ctx, PAL.ink, 22, 16, 2, 3)
  p(ctx, PAL.concreteDark, 27, 12, 6, 1)
  p(ctx, PAL.concreteDark, 27, 15, 6, 1)
}

/** A hole in a road surface: infrastructure. */
function infrastructure(ctx, t) {
  p(ctx, PAL.road, 2, 10, 44, 30)
  p(ctx, PAL.roadDark, 2, 10, 44, 2)
  p(ctx, PAL.bone, 4, 22, 8, 3)
  p(ctx, PAL.bone, 34, 22, 8, 3)
  p(ctx, PAL.roadDark, 12, 16, 22, 18)
  p(ctx, PAL.ink, 14, 18, 18, 14)
  const ripple = Math.round(Math.sin(t * 3) * 1)
  p(ctx, PAL.waterDark, 17, 23 + ripple, 12, 6)
  p(ctx, PAL.water, 19, 24 + ripple, 8, 3)
  p(ctx, PAL.waterLight, 20, 24 + ripple, 3, 1)
  p(ctx, PAL.roadDark, 10, 34, 6, 2)
  p(ctx, PAL.roadDark, 32, 14, 5, 2)
}

/** A book and a clock: education and the time it eats. */
function education(ctx, t) {
  p(ctx, PAL.ink, 6, 18, 28, 22)
  p(ctx, PAL.blue, 7, 19, 26, 20)
  p(ctx, PAL.blueDark, 19, 19, 2, 20)
  p(ctx, PAL.bone, 9, 21, 9, 16)
  p(ctx, PAL.bone, 22, 21, 9, 16)
  for (let i = 0; i < 5; i++) {
    p(ctx, PAL.greyLight, 10, 23 + i * 3, 7, 1)
    p(ctx, PAL.greyLight, 23, 23 + i * 3, 7, 1)
  }
  p(ctx, PAL.ink, 30, 6, 16, 16)
  p(ctx, PAL.bone, 31, 7, 14, 14)
  p(ctx, PAL.ink, 37, 9, 1, 6)
  const hand = Math.floor(t * 2) % 4
  const hx = [4, 6, 4, 2][hand]
  p(ctx, PAL.red, 38, 14, hx, 1)
}

/** A pill strip and a bus stop: care that is somewhere else. */
function health(ctx, t) {
  p(ctx, PAL.white, 4, 12, 24, 12)
  p(ctx, PAL.concreteDark, 4, 22, 24, 2)
  for (let i = 0; i < 4; i++) {
    p(ctx, PAL.red, 6 + i * 6, 14, 4, 6)
    p(ctx, PAL.redDark, 6 + i * 6, 18, 4, 2)
  }
  p(ctx, PAL.grey, 34, 14, 2, 24)
  p(ctx, PAL.saffron, 28, 8, 16, 8)
  p(ctx, PAL.ink, 31, 11, 2, 2)
  p(ctx, PAL.ink, 35, 11, 2, 2)
  p(ctx, PAL.ink, 39, 11, 2, 2)
  const dash = Math.floor(t * 6) % 3
  for (let i = 0; i < 3; i++) {
    p(ctx, PAL.concreteLight, 6 + ((i + dash) % 3) * 10, 32, 6, 2)
  }
  p(ctx, PAL.concreteDark, 2, 38, 44, 2)
}

/** A bag and a blocked drain: environmental. */
function environmental(ctx, t) {
  p(ctx, PAL.concrete, 2, 30, 44, 12)
  p(ctx, PAL.concreteDark, 2, 30, 44, 2)
  p(ctx, PAL.ink, 8, 34, 30, 5)
  for (let i = 0; i < 5; i++) p(ctx, PAL.shadow, 10 + i * 6, 34, 2, 5)
  p(ctx, PAL.ink, 10, 14, 18, 18)
  p(ctx, PAL.shadow, 12, 16, 12, 14)
  p(ctx, PAL.grey, 14, 12, 8, 4)
  p(ctx, PAL.blueDark, 28, 20, 12, 12)
  p(ctx, PAL.blue, 30, 22, 8, 8)
  p(ctx, PAL.bone, 34, 14, 8, 7)
  const fly = Math.round(Math.sin(t * 9) * 2)
  p(ctx, PAL.ink, 22 + fly, 8, 2, 1)
  p(ctx, PAL.ink, 30 - fly, 10, 2, 1)
}

/** A stack of files with a stamp: institutional. */
function institutional(ctx, t) {
  p(ctx, PAL.dirtDark, 4, 26, 34, 14)
  p(ctx, PAL.bone, 5, 22, 32, 6)
  p(ctx, PAL.concreteLight, 5, 18, 32, 6)
  p(ctx, PAL.white, 6, 14, 30, 6)
  p(ctx, PAL.greyLight, 9, 16, 16, 1)
  p(ctx, PAL.greyLight, 9, 20, 20, 1)
  p(ctx, PAL.greyLight, 9, 24, 14, 1)
  const stampY = 6 + Math.round(Math.abs(Math.sin(t * 1.6)) * 4)
  p(ctx, PAL.ink, 30, stampY, 12, 6)
  p(ctx, PAL.grey, 33, stampY - 4, 6, 4)
  p(ctx, PAL.red, 30, stampY + 6, 12, 2)
}

/** Two people with distance between them: social. */
function social(ctx, t) {
  const sway = Math.round(Math.sin(t * 1.4) * 1)
  p(ctx, PAL.hair, 8, 10, 8, 4)
  p(ctx, PAL.skinB, 8, 13, 8, 7)
  p(ctx, PAL.teal, 6, 20, 12, 12)
  p(ctx, PAL.ink, 7, 32, 4, 6)
  p(ctx, PAL.ink, 13, 32, 4, 6)
  p(ctx, PAL.hair, 32 + sway, 12, 8, 4)
  p(ctx, PAL.skinD, 32 + sway, 15, 8, 7)
  p(ctx, PAL.pink, 30 + sway, 22, 12, 11)
  p(ctx, PAL.ink, 31 + sway, 33, 4, 5)
  p(ctx, PAL.ink, 37 + sway, 33, 4, 5)
  for (let i = 0; i < 4; i++) p(ctx, PAL.concreteDark, 19 + i * 3, 26, 2, 1)
  p(ctx, PAL.grassDark, 2, 40, 44, 4)
}

/** A figure under a weight: personal. */
function personal(ctx, t) {
  const press = Math.round(Math.abs(Math.sin(t * 1.2)) * 2)
  p(ctx, PAL.shadow, 8, 6 + press, 32, 8)
  p(ctx, PAL.grey, 8, 6 + press, 32, 3)
  p(ctx, PAL.greyLight, 10, 7 + press, 10, 1)
  p(ctx, PAL.hair, 18, 16 + press, 10, 4)
  p(ctx, PAL.skinA, 18, 19 + press, 10, 8)
  p(ctx, PAL.ink, 21, 22 + press, 2, 2)
  p(ctx, PAL.ink, 25, 22 + press, 2, 2)
  p(ctx, PAL.saffron, 15, 27 + press, 16, 11)
  p(ctx, PAL.blueDark, 16, 38, 5, 6)
  p(ctx, PAL.blueDark, 25, 38, 5, 6)
}

const BY_CATEGORY = {
  Economic: economic,
  Infrastructure: infrastructure,
  Education: education,
  Health: health,
  Environmental: environmental,
  Institutional: institutional,
  Social: social,
  Personal: personal,
}

/** Draw the emblem for a problem's category at (x, y). 48x48. */
export function drawEmblem(ctx, problem, x, y, t = 0) {
  const painter = BY_CATEGORY[problem?.category] || economic
  ctx.save()
  ctx.translate(Math.round(x), Math.round(y))
  ctx.beginPath()
  ctx.rect(0, 0, 48, 48)
  ctx.clip()
  painter(ctx, t)
  ctx.restore()
}
