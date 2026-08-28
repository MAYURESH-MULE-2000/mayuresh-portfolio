/**
 * state.js
 * The single source of truth for the whole application.
 *
 *   USER INPUT -> PROJECT JSON -> TEMPLATE ENGINE -> SCENE ENGINE -> CANVAS -> VIDEO
 *
 * Every module reads from this project object; nothing renders from the DOM.
 */

import { uid } from './utils.js';

export const VIDEO_WIDTH = 1080;
export const VIDEO_HEIGHT = 1920;
export const MAX_PEOPLE = 4;
const STORAGE_KEY = 'jvm.project.v1';

/** Text animation styles offered in the UI. */
export const TEXT_ANIMATIONS = ['dramatic', 'fade', 'zoom', 'typewriter', 'bounce', 'slide'];

/** Camera moves offered by the template engine. */
export const CAMERA_MOVES = ['slowZoom', 'zoomOut', 'drift', 'push', 'still'];

/** Create an empty person slot. */
export function createPerson(name = '') {
  return {
    id: uid('person'),
    name,
    src: null,          // data URL of the uploaded photo
    fileName: null,
    hasTransparency: false,
  };
}

/** A brand new project. */
export function createDefaultProject() {
  return {
    width: VIDEO_WIDTH,
    height: VIDEO_HEIGHT,
    people: [createPerson(''), createPerson('')],
    template: 'romanticGarden',
    background: 'romanticGarden',
    customBackground: null,   // data URL when the "Custom" background is used
    props: ['grass', 'flowers', 'lamps', 'hearts'],
    openingLine: '',
    textAnimation: 'dramatic',
    camera: 'slowZoom',
    characterLayout: null,    // null = let the template decide
    audio: 'random',          // audio1..audio5 | random
    resolvedAudio: null,      // the track actually chosen for this render
    seed: Math.floor(Math.random() * 1e9),
    generated: false,         // true once "Create Video" has been pressed
  };
}

/** Tiny observable store. */
class Store {
  constructor(initial) {
    this.project = initial;
    this.listeners = new Set();
  }

  get() {
    return this.project;
  }

  /** Shallow patch + notify. */
  update(patch, meta = {}) {
    Object.assign(this.project, typeof patch === 'function' ? patch(this.project) : patch);
    this.notify(meta);
    return this.project;
  }

  /** Mutate through a callback (for nested edits like people[i].name). */
  mutate(fn, meta = {}) {
    fn(this.project);
    this.notify(meta);
    return this.project;
  }

  notify(meta = {}) {
    this.persist();
    this.listeners.forEach((fn) => fn(this.project, meta));
  }

  subscribe(fn) {
    this.listeners.add(fn);
    return () => this.listeners.delete(fn);
  }

  reset() {
    this.project = createDefaultProject();
    this.notify({ reason: 'reset' });
    return this.project;
  }

  /**
   * Persist everything except the photos, which can be several megabytes
   * and would blow past the localStorage quota.
   */
  persist() {
    try {
      const { people, customBackground, ...rest } = this.project;
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        ...rest,
        people: people.map(({ src, ...p }) => p),
      }));
    } catch {
      /* storage full or blocked - non fatal */
    }
  }

  /** Restore names and selections from a previous session (photos are never restored). */
  restore() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const saved = JSON.parse(raw);
      if (!saved || typeof saved !== 'object') return;
      const fresh = createDefaultProject();
      this.project = {
        ...fresh,
        ...saved,
        generated: false,
        customBackground: null,
        people: Array.isArray(saved.people) && saved.people.length
          ? saved.people.slice(0, MAX_PEOPLE).map((p) => ({ ...createPerson(p.name || ''), ...p, src: null }))
          : fresh.people,
      };
    } catch {
      /* corrupt payload - keep the default project */
    }
  }
}

export const store = new Store(createDefaultProject());

/** People that actually have a photo - the only ones the renderer draws. */
export const readyPeople = (project) => project.people.filter((p) => !!p.src);

/** Display name with a sensible fallback so text never renders empty. */
export const personName = (person, index) =>
  (person?.name || '').trim() || `Person ${index + 1}`;
