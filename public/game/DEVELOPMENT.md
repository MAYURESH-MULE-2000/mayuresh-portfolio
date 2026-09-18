# REAL INDIA RPG - development notes

An original 2D top-down pixel-art RPG about everyday problems in a fictional
Indian region. Runs at `/game`. No frameworks and no build step for the game
itself: plain ES modules, one canvas, everything drawn at 240x160 and
integer-scaled.

> Nothing in this project copies characters, sprites, maps, music, names or UI
> from any existing game. The handheld-era *feel* is the reference; the content,
> art and code are original.

---

## Status

Milestones 1 through 8 are implemented, integrated and tested in a browser.
Every screen the game shows is finished - there is no control anywhere that
does not do something now.

| System | State |
|---|---|
| Engine: loop, input, camera, state stack, collision | done |
| Seven maps on one data-driven map engine | done |
| 31 NPCs with branching, state-aware dialogue | done |
| 22 problems as data, with five impact axes each | done |
| Problem encounters (Look / Ask / Compare / Share / Connect) | done |
| "Whose problem is bigger?" comparison screen | done |
| Journal: 7 pages over world state | done |
| 4 quests with real decisions and consequences | done |
| 5 items, each required by something | done |
| Progression: 5 attributes with 4 real unlocks | done |
| Save / load / erase, corrupt-save handling | done |
| Procedural chiptune: 9 tracks, 10 effects | done |
| Ambient particles and per-region colour grading | done |
| Keyboard, touch, portrait and landscape layouts | done |

---

## The world

```
                    campus (Vidya Nagar)
                        |
  home - shivnagar - route01 - city (Nayanagar)
                                   |
                                estate (Ambewadi)
                                   |
                                coast (Vangaon)
```

Every link is walkable in both directions; there is no fast travel and no
locked door. What the player finds in each place:

| Map | Size | What it is about |
|---|---|---|
| `home` | 12x9 | The notebook, the mother, and a save point |
| `shivnagar` | 44x36 | The ward: shops, health centre, school, the broken road |
| `route01` | 56x24 | The highway: a dhaba, a truck driver's hours, a farmer's water |
| `campus` | 40x32 | College, hostel, coaching lane, and what a degree is worth |
| `city` | 52x40 | Station, market lane, office gate, construction site |
| `estate` | 44x32 | Forty units, contract shifts, and a nallah nobody has sampled |
| `coast` | 44x30 | Jetty, fish market, and the lane that floods first |

---

## Architecture

```
public/game/
  js/
    core/      Game, GameLoop, Input, Camera, Renderer, StateMachine
    gfx/       Palette, Font, Tiles, Sprites, Emblems, Particles
    world/     TileMap, Structures (building recipes), MapManager
    entities/  Player, NPC
    systems/   WorldState, Effects, Journal, QuestManager, Progression,
               SaveManager, AudioManager
    states/    Title, Overworld, Dialogue, Encounter, Comparison, Journal,
               Menu, Status, Settings, Confirm
    ui/        UIKit (panels, bars, cursors, chips)
  data/        problems, quests, items, tileLegend
    npcs/      one file per region, merged by data/npcs.js
    maps/      one file per map
  tools/       validate-content.mjs
  css/         game.css (page shell and touch controls)
```

Three rules the codebase keeps to:

1. **Content is data.** Maps, people, dialogue, problems, quests and items are
   plain objects. Adding a problem is an entry in `data/problems.js`; adding a
   house is a line in a map's `structures` array; adding a region is a file in
   `data/maps/` plus one line in `MapManager`. No renderer or movement code
   mentions a specific NPC, building or problem.
2. **One implementation per idea.** One dialogue renderer (people, signs and
   investigations all use it), one effect applier (`systems/Effects.js`, shared
   by dialogue, objects, quests and encounters), one map engine, one character
   painter, one particle field.
3. **Only the top state gets input.** The state machine hands the input object
   to the top of the stack only, which is what guarantees the player cannot walk
   while someone is talking.

### Art

All art is generated in code at load time and cached:

- **Tiles** (`gfx/Tiles.js`): ~200 painters draw 16x16 tiles into one atlas -
  ground, buildings, street furniture, rail, industry, coast, interiors. Each
  has a base, a dither pattern, edge lighting and deterministic detail (seeded
  per tile name, so it is identical on every load). Trees and palms are drawn
  once at 32x32 and sliced into four tiles through the atlas clip, which is why
  their quarters line up exactly.
- **Characters** (`gfx/Sprites.js`): one `paintPerson` routine draws all 32
  people from a description (skin, hair style, clothing, accessory) into a 16x20
  cell, 4 directions x 4 frames.
- **Font** (`gfx/Font.js`): a hand-authored variable-width 1-bit font, baked to a
  white atlas and tinted per colour on demand.
- **Emblems** (`gfx/Emblems.js`): one 48x48 drawing per problem category.
- **Signage**: map `labels` paint real text onto signboards in the world, so
  shops and buildings have readable names without a single tooltip.

### Audio

`systems/AudioManager.js` generates everything with the Web Audio API: nine
tracks for a two-voice sequencer (square lead, triangle bass) and ten effects.
There are no audio files. If `AudioContext` is missing or blocked, every call
silently does nothing and the game is unaffected.

### Save data

`localStorage`, one key, version-stamped. Every read is wrapped and
shape-validated; anything that fails validation is reported as "no save" rather
than half-loaded. Storage being unavailable is a supported state - the menu says
so instead of failing.

---

## The problem model

Each problem carries five impact axes (money, feeling, people, time, years),
affected groups, causes, consequences, connections to other problems, named
perspectives marked as lived experience or opinion, and notes marked `observed`,
`account` or `contested`. Connections are written once and made symmetric at
load.

The comparison screen shows two problems on all five axes and **never totals
them**: it names which problem leads on which axis and says plainly that neither
cancels the other.

Encounters reveal that data a piece at a time - *Look closer* gives a cause or a
consequence, *Ask* gives one named perspective, *Connect* records a link, and
*Share* costs the player something instead of asking for more. The journal only
ever shows what has actually been revealed.

### Content rules followed in `data/problems.js` and `data/npcs/`

- No invented statistics. Numbers appear only when a character is describing
  their own money or their own hours, and are labelled as their account.
- Where the region disagrees, both readings are written as strongly as each
  other and tagged `contested` - the unit owner answers the lane, the broker
  answers the tenant, the professor answers her own students.
- Opinions are marked as opinions in the data and rendered as "their opinion".
- No real person, party, government, official or company is named or accused.

---

## Quests

| Quest | Given by | Shape |
|---|---|---|
| First Notes | Shalini (auto) | Talk to two people, record three problems |
| What the Road Costs | Vasant | Investigate, three witnesses, then file / clear the drain / wait |
| The Daily Commute | Farida | Two commuters, watch the platform, compare, then hours / housing / wait |
| What the Nallah Carries | Kavita | Look, three perspectives, then sample / one letter / wait |

Each ending is a real choice with a stated cost, recorded in the journal's
Choices page with its consequence. None of them is the "right" one.

---

## Tools

```
node public/game/tools/validate-content.mjs
```

Checks the whole data layer: dialogue nodes that point nowhere, unreachable
nodes, effects naming problems/items/quests/steps that do not exist, terrain
rows of the wrong width, legend characters with no tile, NPCs or props outside
their map, and exits pointing at maps or spawns that do not exist. Run it after
editing anything in `data/`.

---

## Testing done

Driven in a real browser (Chromium via Playwright) against the production
build, with screenshots:

- keyboard movement, collision, turning in place; every map transition in both
  directions across the whole chain
- touch: D-pad walking, A / B / MENU / JOURNAL, portrait and landscape
- dialogue: typing, skipping, paging, branching, conditional choices, and the
  case where one press must not both finish the text and pick an option
- encounters from people and from objects in the street, including both end
  conditions and the gated actions
- comparison from an encounter, from the journal and from the menu, including
  the "nothing links these two" case and the 22-problem picker
- all four quests end to end, including every ending branch recorded as a
  decision
- save -> reload -> continue, and a deliberately corrupted save
- viewports 390x844, 844x390, 1000x720, 1280x720; 60fps in the production build

---

## Next

- **NPC schedules.** People currently idle and glance around. A time-of-day
  system would let the water queue, the shutter and the school gate change
  through a day; the renderer already supports per-map tinting to sell it.
- **More responses inside encounters.** A *Help* action specific to each
  problem, rather than the shared action set.
- **Accessibility.** A high-contrast palette swap and a text-size option;
  everything draws through one palette module, so this is a runtime swap.
