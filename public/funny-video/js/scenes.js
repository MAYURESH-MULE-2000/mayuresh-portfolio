/**
 * scenes.js
 * The scene engine.
 *
 * generateVideoScript(project) turns the project JSON into a timed script:
 * a list of scenes with text, camera moves, entrances and effects.
 * This function is deliberately pure and side effect free - later it can be
 * swapped for an AI service that returns the same shape.
 */

import { getTemplate, resolveLayout } from './templates.js';
import { personName, readyPeople } from './state.js';
import { createRng, hashString } from './utils.js';

/** Join names the way a desi caption would: "A, B aur C". */
export function joinNames(names) {
  if (!names.length) return '';
  if (names.length === 1) return names[0];
  return `${names.slice(0, -1).join(', ')} aur ${names[names.length - 1]}`;
}

/** Names of everyone who actually has a photo. */
export function projectNames(project) {
  return readyPeople(project).map((p, i) => personName(p, i));
}

/**
 * Copywriting for the four beats. V1 only recombines the names and the
 * opening line the user typed - no generated jokes.
 */
function buildLines(project, rng) {
  const names = projectNames(project);
  const first = names[0] || 'Hero';
  const second = names[1];
  const opening = (project.openingLine || '').trim();

  const introFallbacks = second
    ? [`${first} ki kahani ${second} se shuru hui...`, `Jab ${first} mila ${second} se...`]
    : [`${first} ki kahani...`, `Yeh hai ${first} ki story...`];

  const middle = second
    ? rng.pick([`${first} aur ${second}`, `${first} + ${second}`, `${joinNames(names)}`])
    : rng.pick([`${first} solo`, `${first} akela hi kaafi hai`]);

  const punch = second
    ? rng.pick([`${first} ❤️ ${second}`, `${joinNames(names)} 😍`, `The End... ya shuruaat? 😜`])
    : rng.pick([`${first} 😎`, `${first} rocks! 🔥`]);

  return {
    opening: opening || rng.pick(introFallbacks),
    intro: joinNames(names) || 'Ek nayi kahani',
    middle,
    punch,
  };
}

/** Scene blueprints. Durations are in seconds. */
const SCENE_RECIPES = [
  {
    id: 'opening', kind: 'opening', duration: 3.2,
    showPeople: false, textSlot: 'opening', textPosition: 0.34,
    effects: ['decorFadeIn'],
  },
  {
    id: 'characters', kind: 'characters', duration: 4.2,
    showPeople: true, entrance: 'slide', textSlot: 'intro', textPosition: 0.2,
    effects: ['propsPop'],
  },
  {
    id: 'funny', kind: 'funny', duration: 3.8,
    showPeople: true, entrance: 'settle', textSlot: 'middle', textPosition: 0.22,
    effects: ['characterBounce', 'emojiPop'],
  },
  {
    id: 'punchline', kind: 'punchline', duration: 3.4,
    showPeople: true, entrance: 'settle', textSlot: 'punch', textPosition: 0.28,
    effects: ['shake', 'burst', 'flash'],
  },
];

/** Camera move per scene kind, seeded from the template + project seed. */
function cameraFor(kind, template, project, rng) {
  if (project.camera && project.camera !== 'auto') {
    if (kind === 'punchline') return 'shakeZoom';
    return project.camera;
  }
  const moves = { opening: 'slowZoom', characters: template.camera, funny: 'drift', punchline: 'shakeZoom' };
  return moves[kind] || rng.pick(['slowZoom', 'drift', 'push']);
}

/**
 * THE AI BOUNDARY.
 * Returns a fully timed script for the given project. Replace the body with a
 * call to an AI service later; everything downstream only reads this shape.
 */
export function generateVideoScript(project) {
  const template = getTemplate(project.template);
  const rng = createRng(hashString(`${project.seed}:${project.template}:${project.props.join(',')}`));
  const lines = buildLines(project, rng);
  const people = readyPeople(project);
  const layout = resolveLayout(template, people.length, project.characterLayout);

  let cursor = 0;
  const scenes = SCENE_RECIPES.map((recipe) => {
    const scene = {
      ...recipe,
      start: cursor,
      end: cursor + recipe.duration,
      text: lines[recipe.textSlot] || '',
      textAnimation: project.textAnimation || template.textStyle,
      camera: cameraFor(recipe.kind, template, project, rng),
      transition: template.transition,
      particles: recipe.kind === 'punchline' ? (template.particles || 'confetti') : null,
    };
    cursor += recipe.duration;
    return scene;
  });

  return {
    version: 1,
    duration: cursor,
    template: template.id,
    layout,
    lines,
    people: people.map((p, i) => ({ id: p.id, name: personName(p, i) })),
    scenes,
  };
}

/** The scene that owns a given timestamp (never returns undefined). */
export function sceneAt(script, time) {
  const t = Math.min(Math.max(time, 0), script.duration - 0.0001);
  return script.scenes.find((s) => t >= s.start && t < s.end) || script.scenes[script.scenes.length - 1];
}
