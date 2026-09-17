# REAL INDIA RPG - development notes

An original 2D top-down pixel-art RPG about everyday problems in a fictional
Indian town. Runs at `/game`. No frameworks, no build step for the game itself:
plain ES modules, one canvas, everything drawn at 240x160 and scaled up.

> Nothing in this project copies characters, sprites, maps, music, names or UI
> from any existing game. The handheld-era *feel* is the reference; the content,
> art and code are original.

---

## Status: Milestone 1 (vertical slice) - complete and playable

Everything listed below is implemented, wired into the game and tested in a
browser. No screen shows a control that does not do something.

| # | First-milestone requirement | Where |
|---|---|---|
| 1 | Title screen | `js/states/TitleState.js` |
| 2 | New game | `Game.newGame()` |
| 3 | One town map (plus the player's home interior) | `data/maps/shivnagar.js`, `data/maps/home.js` |
| 4 | Player character | `js/entities/Player.js` |
| 5 | 4-direction grid movement | `Player.update()` |
| 6 | Collision | `js/world/TileMap.js` |
| 7 | Camera | `js/core/Camera.js` |
| 8 | 11 NPCs | `data/npcs.js` |
| 9 | Branching dialogue | `js/states/DialogueState.js` |
| 10 | 12 problems | `data/problems.js` |
| 11 | Problem encounters | `js/states/EncounterState.js` |
| 12 | Comparison ("whose problem is bigger?") | `js/states/ComparisonState.js` |
| 13 | Journal (7 pages) | `js/states/JournalState.js`, `js/systems/Journal.js` |
| 14 | Save / load / erase | `js/systems/SaveManager.js` |
| 15 | Mobile controls | `game.css` + `Input.attachVirtualControls()` |
| 16 | Original pixel-art UI | `js/ui/UIKit.js`, `js/gfx/*` |
| 17 | Restart / new game | title screen and pause menu |

Also in: 2 quests, 3 items, procedural chiptune music and SFX, fade
transitions, an attribute system with real unlocks, and an in-world signage
layer.

---

## Architecture

```
public/game/
  js/
    core/      Game, GameLoop, Input, Camera, Renderer, StateMachine
    gfx/       Palette, Font (1-bit bitmap font), Tiles, Sprites, Emblems
    world/     TileMap, Structures (building recipes), MapManager
    entities/  Player, NPC
    systems/   WorldState, Effects, Journal, QuestManager, Progression,
               SaveManager, AudioManager
    states/    Title, Overworld, Dialogue, Encounter, Comparison, Journal,
               Menu, Status, Settings, Confirm
    ui/        UIKit (panels, bars, cursors, chips)
  data/        problems, npcs, quests, items, tileLegend, maps/
  css/         game.css (page shell and touch controls)
```

Three rules the codebase keeps to:

1. **Content is data.** Maps, NPCs, dialogue, problems, quests and items are
   plain objects. Adding a problem is adding an entry in `data/problems.js`;
   adding a house is one line in a map's `structures` array. No renderer or
   movement code mentions a specific NPC, building or problem.
2. **One implementation per idea.** One dialogue renderer (NPCs, signs and
   investigations all use it), one effect applier (`systems/Effects.js`, shared
   by dialogue, objects and encounters), one map engine, one character painter.
3. **Only the top state gets input.** The state machine hands the input object
   to the top of the stack only, which is what guarantees the player cannot walk
   while someone is talking.

### Art

All art is generated in code at load time, then cached:

- **Tiles** (`gfx/Tiles.js`): ~70 painters draw 16x16 tiles into one atlas.
  Each has a base, a dither pattern, edge lighting and deterministic detail
  (seeded per tile name, so it is identical on every load).
- **Characters** (`gfx/Sprites.js`): one `paintPerson` routine draws every human
  in the game from a description (skin, hair style, clothing, accessory) into a
  16x20 cell, 4 directions x 4 frames. That single routine is why the cast looks
  like one set.
- **Font** (`gfx/Font.js`): a hand-authored variable-width 1-bit font, baked into
  a white atlas and tinted per colour on demand.
- **Emblems** (`gfx/Emblems.js`): a 48x48 drawing per problem category for the
  encounter screen.

### Audio

`systems/AudioManager.js` generates everything with the Web Audio API - four
tracks for a two-voice sequencer (square lead, triangle bass) and ten sound
effects. There are no audio files. If `AudioContext` is missing or blocked,
every call silently does nothing and the game is unaffected.

### Save data

`localStorage`, one key, version-stamped. Every read is wrapped in try/catch and
shape-validated; anything that fails validation is reported as "no save" rather
than half-loaded. Storage being unavailable (private mode, blocked origin) is a
supported state - the menu says so instead of failing.

---

## The problem model

Each problem carries five impact axes (money, feeling, people, time, years),
affected groups, causes, consequences, connections to other problems, named
perspectives marked as lived experience or opinion, and notes marked as
`observed`, `account` or `contested`.

The comparison screen shows both problems on all five axes and **never totals
them**. The summary names which problem leads on which axis and says plainly
that neither cancels the other.

Encounters reveal that data one piece at a time: *Look closer* reveals a cause
or a consequence, *Ask* reveals one named perspective, *Connect* records a link
between two problems. The journal only ever shows what has actually been
revealed - which is why filling it in feels like work the player did.

### Content rules followed in `data/problems.js` and `data/npcs.js`

- No invented statistics. Numbers appear only when a character is describing
  their own money or their own hours, and are labelled as their account.
- Where the town disagrees, both readings are written as strongly as each other
  and tagged `contested`.
- Opinions are marked as opinions in the data and rendered as "their opinion" in
  the encounter screen.
- No real person, party, government or organisation is named or accused.

---

## Testing done for this milestone

Driven in a real browser (Chromium via Playwright), with screenshots:

- keyboard movement, collision, turning-in-place, map transitions both ways
- touch: D-pad walking, A / B / MENU / JOURNAL buttons, portrait and landscape
- dialogue: typing, skipping, paging, branching choices, conditional choices
- encounters from an NPC and from an object in the street, including the
  strain/openness end conditions
- comparison from an encounter and from the journal, including the "nothing
  links these two" case
- the full `road-cost` quest: giver -> investigate -> three witnesses ->
  evidence flag -> report -> decision recorded -> quest complete
- save -> reload -> continue (state restored), and a deliberately corrupted save
  (title screen hides CONTINUE, new game still works)
- viewports: 390x844, 844x390, 1000x720, 1280x720

---

## Next milestones

**Phase 7 - more maps.** `MapManager` and the ASCII+structures format already
support this; what is missing is the content. The route east, the railway
station, the university town and the industrial city are all sketched in the
problem database (`migration-distance`, `exam-pressure`) but have no maps yet.

**Deeper encounters.** `possibleResponses` per problem (a Help action that does
something specific to each situation) rather than the shared action set.

**NPC schedules.** NPCs currently idle and turn; a time-of-day system would let
the water queue, the shop shutter and the school gate change through the day.

**Accessibility.** A high-contrast palette swap and a text-size option; the
renderer already draws everything through one palette module, so this is a
matter of swapping `PAL` at runtime.
