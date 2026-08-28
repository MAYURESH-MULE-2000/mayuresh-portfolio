/**
 * people.js
 * The "people" panel: upload a photo, name the person, remove them.
 *
 * Everything it does ends up in the project state; the renderer never reads
 * the DOM.
 */

import { store, createPerson, MAX_PEOPLE, personName } from './state.js';
import { escapeHtml, loadImage, imageHasTransparency, readFileAsDataURL } from './utils.js';

const ACCEPTED = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];
const ACCEPT_ATTR = '.png,.jpg,.jpeg,.webp,image/png,image/jpeg,image/webp';

function personCard(person, index) {
  const hasPhoto = !!person.src;
  const warning = hasPhoto && !person.hasTransparency
    ? '<p class="jvm-hint jvm-hint--warn">For best results, upload a photo with the background removed. This one will be shown as a sticker cut-out.</p>'
    : '';
  return `
    <article class="jvm-person" data-person="${person.id}">
      <header class="jvm-person__head">
        <span class="jvm-chip">Person ${index + 1}</span>
        <button type="button" class="jvm-icon-btn" data-action="remove" title="Remove ${escapeHtml(personName(person, index))}" aria-label="Remove person ${index + 1}">&times;</button>
      </header>
      <div class="jvm-person__body">
        <label class="jvm-drop ${hasPhoto ? 'is-filled' : ''}" data-drop>
          <input type="file" accept="${ACCEPT_ATTR}" hidden data-action="upload" />
          ${hasPhoto
            ? `<img src="${person.src}" alt="Photo of ${escapeHtml(personName(person, index))}" class="jvm-thumb" />`
            : '<span class="jvm-drop__icon">📷</span><span class="jvm-drop__text">Upload photo</span>'}
        </label>
        <div class="jvm-person__fields">
          <label class="jvm-label" for="name-${person.id}">Name</label>
          <input id="name-${person.id}" class="jvm-input" type="text" maxlength="24"
                 value="${escapeHtml(person.name)}" placeholder="e.g. Akash" data-action="name" />
          ${hasPhoto ? `<p class="jvm-hint">${escapeHtml(person.fileName || 'Photo added')}</p>` : '<p class="jvm-hint">PNG, JPG or WEBP</p>'}
          ${warning}
        </div>
      </div>
    </article>`;
}

/**
 * @param {{container:HTMLElement, addButton:HTMLElement, onError:(msg:string)=>void}} opts
 */
export function initPeoplePanel({ container, addButton, onError = () => {} }) {
  const render = () => {
    const { people } = store.get();
    container.innerHTML = people.map(personCard).join('');
    addButton.disabled = people.length >= MAX_PEOPLE;
    addButton.textContent = people.length >= MAX_PEOPLE
      ? 'Maximum 4 people'
      : '+ Add another person';
  };

  const findPerson = (el) => {
    const card = el.closest('[data-person]');
    if (!card) return null;
    const id = card.dataset.person;
    return store.get().people.find((p) => p.id === id) || null;
  };

  async function applyFile(person, file) {
    if (!file) return;
    if (!ACCEPTED.includes(file.type)) {
      onError('That file type is not supported. Please use PNG, JPG or WEBP.');
      return;
    }
    if (file.size > 12 * 1024 * 1024) {
      onError('That image is larger than 12 MB. Please pick a smaller photo.');
      return;
    }
    try {
      const dataUrl = await readFileAsDataURL(file);
      const img = await loadImage(dataUrl);
      if (!img) throw new Error('decode failed');
      store.mutate((project) => {
        const target = project.people.find((p) => p.id === person.id);
        if (!target) return;
        target.src = dataUrl;
        target.fileName = file.name;
        target.hasTransparency = imageHasTransparency(img);
      }, { reason: 'people' });
      render();
    } catch {
      onError('That image could not be read. Try a different file.');
    }
  }

  container.addEventListener('change', (e) => {
    const el = e.target;
    const person = findPerson(el);
    if (!person) return;
    if (el.dataset.action === 'upload') applyFile(person, el.files?.[0]);
  });

  container.addEventListener('input', (e) => {
    const el = e.target;
    if (el.dataset.action !== 'name') return;
    const person = findPerson(el);
    if (!person) return;
    store.mutate((project) => {
      const target = project.people.find((p) => p.id === person.id);
      if (target) target.name = el.value;
    }, { reason: 'people-name' });
  });

  container.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-action="remove"]');
    if (!btn) return;
    const person = findPerson(btn);
    if (!person) return;
    store.mutate((project) => {
      project.people = project.people.filter((p) => p.id !== person.id);
      if (!project.people.length) project.people.push(createPerson(''));
    }, { reason: 'people' });
    render();
  });

  // drag & drop straight onto a card
  container.addEventListener('dragover', (e) => {
    if (!e.target.closest('[data-drop]')) return;
    e.preventDefault();
    e.target.closest('[data-drop]').classList.add('is-dragging');
  });
  container.addEventListener('dragleave', (e) => {
    e.target.closest('[data-drop]')?.classList.remove('is-dragging');
  });
  container.addEventListener('drop', (e) => {
    const drop = e.target.closest('[data-drop]');
    if (!drop) return;
    e.preventDefault();
    drop.classList.remove('is-dragging');
    const person = findPerson(drop);
    if (person) applyFile(person, e.dataTransfer?.files?.[0]);
  });

  addButton.addEventListener('click', () => {
    const { people } = store.get();
    if (people.length >= MAX_PEOPLE) return;
    store.mutate((project) => project.people.push(createPerson('')), { reason: 'people' });
    render();
  });

  render();
  return { render };
}
