/**
 * Structures.js
 * ---------------------------------------------------------------------------
 * Buildings are stamped from a few parameterised recipes instead of being spelt
 * out tile by tile in every map. A map says "a teal house here, 4 wide, door on
 * the second column" and this file works out the roof, walls, windows, the
 * rooftop tank and the collision footprint.
 */

/** house: sloped terracotta roof over a plastered body. */
function stampHouse(map, s) {
  const { x, y, w = 4, h = 3, color = 'cream', door = 1, tank = false } = s
  // roof: ridge row, then a body row
  for (let i = 0; i < w; i++) {
    map.place('roof_ridge', x + i, y, 'ground', true)
  }
  for (let i = 0; i < w; i++) {
    const tile = i === 0 ? 'roof_l' : i === w - 1 ? 'roof_r' : 'roof_m'
    map.place(tile, x + i, y + 1, 'ground', true)
  }
  // walls
  const wallTop = y + 2
  const wallRows = Math.max(1, h - 1)
  for (let ry = 0; ry < wallRows; ry++) {
    for (let i = 0; i < w; i++) {
      let tile = `wall_${color}`
      const isBottomRow = ry === wallRows - 1
      if (isBottomRow && i === door) tile = `door_${color}`
      else if (!isBottomRow && (i === 0 || i === w - 1)) tile = `win_${color}`
      else if (isBottomRow && (i === 1 || i === w - 2) && i !== door) tile = `win_${color}`
      map.place(tile, x + i, wallTop + ry, 'ground', true)
    }
  }
  if (tank) map.place('tank', x + w - 2, y - 1, 'top', false)
}

/** shop: flat RCC roof, signboard, awning and an open counter or shutter. */
function stampShop(map, s) {
  const { x, y, w = 4, color = 'saffron', shuttered = false, front = 1 } = s
  for (let i = 0; i < w; i++) {
    const tile = i === 0 ? 'rcc_l' : i === w - 1 ? 'rcc_r' : 'rcc_m'
    map.place(tile, x + i, y, 'ground', true)
  }
  for (let i = 0; i < w; i++) {
    const tile = i === 0 ? 'sign_l' : i === w - 1 ? 'sign_r' : 'sign_m'
    map.place(tile, x + i, y + 1, 'ground', true)
  }
  for (let i = 0; i < w; i++) {
    let tile = `wall_${color}`
    if (i === front) tile = shuttered ? `shutter_${color}` : `counter_${color}`
    else if (i === front + 1 || i === front - 1) tile = `win_${color}`
    map.place(tile, x + i, y + 2, 'ground', true)
  }
  // awning hangs over the walkway in front of the shop
  for (let i = 0; i < w; i++) {
    const tile = i === 0 ? 'awning_l' : i === w - 1 ? 'awning_r' : 'awning_m'
    map.place(tile, x + i, y + 3, 'top', false)
  }
}

/** block: a bigger institutional building (school, clinic, office). */
function stampBlock(map, s) {
  const { x, y, w = 6, h = 4, color = 'cream', door = 2, tank = true } = s
  for (let i = 0; i < w; i++) {
    const tile = i === 0 ? 'rcc_l' : i === w - 1 ? 'rcc_r' : 'rcc_m'
    map.place(tile, x + i, y, 'ground', true)
  }
  for (let ry = 1; ry < h; ry++) {
    for (let i = 0; i < w; i++) {
      let tile = `wall_${color}`
      const isBottomRow = ry === h - 1
      if (isBottomRow && i === door) tile = `door_${color}`
      else if (i % 2 === 1) tile = `win_${color}`
      map.place(tile, x + i, y + ry, 'ground', true)
    }
  }
  if (tank) map.place('tank', x + 1, y - 1, 'top', false)
}

/** tree: a 2x2 canopy. The top half draws above the player. */
function stampTree(map, s) {
  const { x, y } = s
  map.place('tree_tl', x, y, 'top', false)
  map.place('tree_tr', x + 1, y, 'top', false)
  map.place('tree_bl', x, y + 1, 'over', true)
  map.place('tree_br', x + 1, y + 1, 'over', true)
}

/** stall: a two-tile tea/snack stall. */
function stampStall(map, s) {
  map.place('stall_l', s.x, s.y, 'over', true)
  map.place('stall_r', s.x + 1, s.y, 'over', true)
}

/** wall: a run of boundary wall with an optional gate. */
function stampWall(map, s) {
  const { x, y, w = 1, h = 1, gate = -1 } = s
  for (let i = 0; i < w; i++) {
    for (let j = 0; j < h; j++) {
      const isGate = i === gate && j === h - 1
      map.place(isGate ? 'gate' : 'compound_wall', x + i, y + j, 'ground', true)
    }
  }
}

/** pole / lamp: two tiles tall, the head drawn above the player. */
function stampPole(map, s) {
  const head = s.type === 'lamp' ? 'lamp_top' : 'pole_top'
  const foot = s.type === 'lamp' ? 'lamp_base' : 'pole_base'
  map.place(head, s.x, s.y, 'top', false)
  map.place(foot, s.x, s.y + 1, 'over', true)
}

const RECIPES = {
  house: stampHouse,
  shop: stampShop,
  block: stampBlock,
  tree: stampTree,
  stall: stampStall,
  wall: stampWall,
  pole: stampPole,
  lamp: stampPole,
}

export function stampStructure(map, s) {
  const recipe = RECIPES[s.type]
  if (!recipe) {
    console.warn(`map ${map.id}: unknown structure type "${s.type}"`)
    return
  }
  recipe(map, s)
}
