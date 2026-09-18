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

import { SHIVNAGAR_NPCS } from './npcs/shivnagar.js'
import { ROUTE_NPCS } from './npcs/route.js'
import { CITY_NPCS } from './npcs/city.js'
import { CAMPUS_NPCS } from './npcs/campus.js'
import { ESTATE_NPCS } from './npcs/estate.js'
import { COAST_NPCS } from './npcs/coast.js'

/**
 * One registry, assembled from per-region files. Maps refer to people by id,
 * so where a person is written has no bearing on where they stand.
 */
export const NPCS = Object.assign(
  {},
  SHIVNAGAR_NPCS,
  ROUTE_NPCS,
  CITY_NPCS,
  CAMPUS_NPCS,
  ESTATE_NPCS,
  COAST_NPCS,
)

export function getNpc(id) {
  return NPCS[id] || null
}
