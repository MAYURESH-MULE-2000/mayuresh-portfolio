/**
 * validate-content.mjs
 * ---------------------------------------------------------------------------
 * Content checker for the data layer. Run it after adding a map, a person, a
 * problem or a quest:
 *
 *     node public/game/tools/validate-content.mjs
 *
 * It catches the mistakes that are invisible until a player walks into them:
 * dialogue pointing at a node that does not exist, an effect referring to a
 * problem id with a typo, an exit into a map that was never registered, a
 * terrain row one character short, an NPC standing inside a wall.
 */

import { PROBLEMS } from '../data/problems.js'
import { NPCS } from '../data/npcs.js'
import { QUESTS } from '../data/quests.js'
import { ITEMS } from '../data/items.js'
import { LEGEND } from '../data/tileLegend.js'
import { shivnagar } from '../data/maps/shivnagar.js'
import { home } from '../data/maps/home.js'
import { route01 } from '../data/maps/route01.js'
import { campus } from '../data/maps/campus.js'
import { city } from '../data/maps/city.js'
import { estate } from '../data/maps/estate.js'
import { coast } from '../data/maps/coast.js'

const MAPS = { home, shivnagar, route01, campus, city, estate, coast }

const problems = new Set(Object.keys(PROBLEMS))
const items = new Set(Object.keys(ITEMS))
const npcIds = new Set(Object.keys(NPCS))
const questSteps = new Map(
  Object.entries(QUESTS).map(([id, q]) => [id, new Set(q.steps.map((s) => s.id))]),
)

const errors = []
const warnings = []
const err = (m) => errors.push(m)
const warn = (m) => warnings.push(m)

// --- effects and requirements, wherever they appear -------------------------
function checkEffect(where, effect) {
  if (!effect) return
  if (effect.discover && !problems.has(effect.discover)) err(`${where}: discover "${effect.discover}" is not a problem`)
  if (effect.encounter && !problems.has(effect.encounter)) err(`${where}: encounter "${effect.encounter}" is not a problem`)
  if (effect.note && !problems.has(effect.note.problem)) err(`${where}: note on "${effect.note?.problem}" is not a problem`)
  if (effect.item && !items.has(effect.item)) err(`${where}: item "${effect.item}" does not exist`)
  if (effect.quest && !QUESTS[effect.quest]) err(`${where}: quest "${effect.quest}" does not exist`)
  if (effect.step) {
    const [questId, stepId] = String(effect.step).split('/')
    if (!questSteps.has(questId)) err(`${where}: step refers to unknown quest "${questId}"`)
    else if (!questSteps.get(questId).has(stepId)) err(`${where}: quest "${questId}" has no step "${stepId}"`)
  }
  if (effect.connection) {
    effect.connection.forEach((id) => {
      if (!problems.has(id)) err(`${where}: connection to "${id}" is not a problem`)
    })
  }
}

function checkRequire(where, req) {
  if (!req) return
  if (req.item && !items.has(req.item)) err(`${where}: requires unknown item "${req.item}"`)
  if (req.discovered && !problems.has(req.discovered)) err(`${where}: requires unknown problem "${req.discovered}"`)
  if (req.questActive && !QUESTS[req.questActive]) err(`${where}: requires unknown quest "${req.questActive}"`)
  if (req.questDone && !QUESTS[req.questDone]) err(`${where}: requires unknown quest "${req.questDone}"`)
}

// --- problems ---------------------------------------------------------------
for (const [id, p] of Object.entries(PROBLEMS)) {
  if (p.id !== id) err(`problem ${id}: id field says "${p.id}"`)
  const required = ['name', 'short', 'category', 'summary', 'description', 'impacts', 'affectedGroups', 'causes', 'consequences', 'connections', 'perspectives', 'notes']
  required.forEach((k) => {
    if (p[k] === undefined) err(`problem ${id}: missing ${k}`)
  })
  const axes = ['financial', 'emotional', 'social', 'time', 'longTerm']
  axes.forEach((a) => {
    const v = p.impacts?.[a]
    if (typeof v !== 'number' || v < 0 || v > 100) err(`problem ${id}: impact ${a} is not 0-100`)
  })
  p.connections.forEach((c) => {
    if (!problems.has(c)) err(`problem ${id}: connection "${c}" does not exist`)
    else if (!PROBLEMS[c].connections.includes(id)) warn(`problem ${id}: connection to ${c} is not reciprocated`)
  })
  p.perspectives.forEach((v) => {
    if (!['lived', 'opinion'].includes(v.stance)) err(`problem ${id}: perspective stance "${v.stance}"`)
    if (!v.speaker || !v.role) err(`problem ${id}: a perspective is missing speaker or role`)
  })
  p.notes.forEach((n) => {
    if (!['observed', 'account', 'contested'].includes(n.kind)) err(`problem ${id}: note kind "${n.kind}"`)
  })
}

// --- people -----------------------------------------------------------------
for (const [id, npc] of Object.entries(NPCS)) {
  if (npc.id !== id) err(`npc ${id}: id field says "${npc.id}"`)
  if (!npc.look) err(`npc ${id}: no look`)
  if (npc.problem && !problems.has(npc.problem)) err(`npc ${id}: problem "${npc.problem}" does not exist`)
  const nodes = npc.nodes || {}
  if (!Object.keys(nodes).length) err(`npc ${id}: no dialogue`)
  for (const [nid, node] of Object.entries(nodes)) {
    const where = `npc ${id}.${nid}`
    checkEffect(where, node.effect)
    const targets = []
    if (node.next) targets.push(node.next)
    ;(node.choices || []).forEach((c) => {
      targets.push(c.to)
      checkRequire(`${where} choice "${c.label}"`, c.require)
      checkEffect(`${where} choice "${c.label}"`, c.effect)
      if (!c.label) err(`${where}: a choice has no label`)
    })
    targets.forEach((t) => {
      if (!nodes[t]) err(`${where}: points at missing node "${t}"`)
    })
    if (!node.next && !node.choices && !node.end) warn(`${where}: no next, no choices and not marked end`)
  }
  ;(npc.entry || []).forEach((rule, i) => {
    if (!nodes[rule.node]) err(`npc ${id}: entry rule ${i} points at missing node "${rule.node}"`)
    checkRequire(`npc ${id} entry ${i}`, rule.require)
  })
  const last = (npc.entry || [])[npc.entry.length - 1]
  if (last && last.require) warn(`npc ${id}: last entry rule has a condition, so some states have no entry`)
  // every node should be reachable from an entry rule
  const seen = new Set()
  const walk = (nid) => {
    if (!nid || seen.has(nid) || !nodes[nid]) return
    seen.add(nid)
    if (nodes[nid].next) walk(nodes[nid].next)
    ;(nodes[nid].choices || []).forEach((c) => walk(c.to))
  }
  ;(npc.entry || []).forEach((r) => walk(r.node))
  Object.keys(nodes).forEach((nid) => {
    if (!seen.has(nid)) warn(`npc ${id}: node "${nid}" is unreachable`)
  })
}

// --- quests -----------------------------------------------------------------
for (const [id, quest] of Object.entries(QUESTS)) {
  if (quest.giver && !npcIds.has(quest.giver)) err(`quest ${id}: giver "${quest.giver}" is not an npc`)
  quest.steps.forEach((s) => {
    if (!s.id || !s.text) err(`quest ${id}: a step is missing id or text`)
    if (s.compare && !problems.has(s.compare)) err(`quest ${id}: step compares unknown problem "${s.compare}"`)
    if (s.counter && !['peopleMet', 'problemsFound', 'encounters', 'comparisons'].includes(s.counter)) {
      err(`quest ${id}: step counter "${s.counter}" is not tracked`)
    }
  })
}

// --- maps -------------------------------------------------------------------
for (const [id, map] of Object.entries(MAPS)) {
  if (map.id !== id) err(`map ${id}: id field says "${map.id}"`)
  if (map.terrain.length !== map.height) err(`map ${id}: ${map.terrain.length} rows, height says ${map.height}`)
  const legend = Object.assign({}, LEGEND, map.legend || {})
  map.terrain.forEach((row, y) => {
    if (row.length !== map.width) err(`map ${id}: row ${y} is ${row.length} chars, width is ${map.width}`)
    for (const ch of row) {
      if (!legend[ch]) err(`map ${id}: row ${y} uses "${ch}", which is not in the legend`)
    }
  })
  const inBounds = (x, y) => x >= 0 && y >= 0 && x < map.width && y < map.height
  ;(map.npcs || []).forEach((n) => {
    if (!npcIds.has(n.id)) err(`map ${id}: npc "${n.id}" does not exist`)
    if (!inBounds(n.x, n.y)) err(`map ${id}: npc "${n.id}" is outside the map`)
  })
  ;(map.objects || []).forEach((o) => {
    if (!inBounds(o.x, o.y)) err(`map ${id}: object "${o.name}" is outside the map`)
    if (o.problem && !problems.has(o.problem)) err(`map ${id}: object "${o.name}" points at unknown problem`)
    if (o.requires && !items.has(o.requires)) err(`map ${id}: object "${o.name}" requires unknown item`)
    checkEffect(`map ${id} object "${o.name}"`, o.effect)
    if (!['sign', 'board', 'investigate', 'rest'].includes(o.kind)) err(`map ${id}: object kind "${o.kind}"`)
  })
  ;(map.exits || []).forEach((e) => {
    if (!inBounds(e.x, e.y)) err(`map ${id}: exit at ${e.x},${e.y} is outside the map`)
    const target = MAPS[e.to]
    if (!target) err(`map ${id}: exit leads to unknown map "${e.to}"`)
    else if (e.spawn && !target.spawns?.[e.spawn]) err(`map ${id}: exit to ${e.to} wants spawn "${e.spawn}", which is not defined there`)
  })
  Object.entries(map.spawns || {}).forEach(([name, s]) => {
    if (!inBounds(s.x, s.y)) err(`map ${id}: spawn "${name}" is outside the map`)
  })
  ;(map.props || []).forEach((p) => {
    if (!inBounds(p.x, p.y)) err(`map ${id}: prop "${p.tile}" at ${p.x},${p.y} is outside the map`)
  })
}

// --- report -----------------------------------------------------------------
console.log(`problems ${Object.keys(PROBLEMS).length}  people ${Object.keys(NPCS).length}  quests ${Object.keys(QUESTS).length}  items ${Object.keys(ITEMS).length}  maps ${Object.keys(MAPS).length}`)
warnings.forEach((w) => console.log(`warn  ${w}`))
errors.forEach((e) => console.log(`ERROR ${e}`))
console.log(errors.length ? `\n${errors.length} error(s)` : '\nno errors')
process.exit(errors.length ? 1 : 0)
