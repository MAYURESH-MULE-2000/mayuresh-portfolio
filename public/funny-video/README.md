# Joke Video Maker

Turn photos into funny videos in seconds. Upload 1–4 people, pick a background
template, toggle props, type an opening line, choose audio and export a real
9:16 video (1080 × 1920) — everything runs in the browser, no server, no
external libraries.

Live route: **`/funny-video`**

---

## 1. How to run the application

It is part of this Astro site, so the normal dev server serves it:

```bash
npm install
npm run dev          # then open http://localhost:4321/funny-video
```

Production build:

```bash
npm run build && npm run preview
```

The app itself is plain HTML/CSS/ES modules under `public/funny-video/`, so it
does not need a build step of its own — edits are live on reload.

```
public/funny-video/
    README.md
    css/    app.css, editor.css, animations.css
    js/     app.js, state.js, people.js, props.js, templates.js, scenes.js,
            animation.js, audio.js, renderer.js, exporter.js, assets.js, utils.js
    assets/ backgrounds/, props/, audio/, fonts/
src/pages/funny-video/index.astro   <- the page markup (site layout + design system)
```

### Data flow

```
USER INPUT -> PROJECT JSON -> TEMPLATE ENGINE -> SCENE ENGINE -> CANVAS -> VIDEO
   app.js       state.js       templates.js       scenes.js     renderer.js  exporter.js
```

Nothing renders from the DOM: `renderer.renderFrame(t)` is a pure function of
the project state and the timestamp, which is why the exported file matches the
preview exactly.

---

## 2. Where to put background images

`public/funny-video/assets/backgrounds/`

| Template            | Expected file          |
| ------------------- | ---------------------- |
| Romantic Garden     | `garden.jpg`           |
| Night Garden        | `night-garden.jpg`     |
| Wedding             | `wedding.jpg`          |
| Village             | `village.jpg`          |
| Road                | `road.jpg`             |
| Park                | `park.jpg`             |
| Classroom           | `classroom.jpg`        |
| Bedroom             | `bedroom.jpg`          |
| Funny Colorful      | `funny.jpg`            |
| Custom Background   | uploaded by the user   |

Use 1080 × 1920 (9:16). Anything else is scaled to cover the frame and centred.

**No file is required.** When a background is missing the matching procedural
painter in `js/templates.js` draws the scene instead, so the app always runs.

## 3. Where to put prop images

`public/funny-video/assets/props/` — transparent PNG or WebP:

`grass.png`, `flowers.png`, `lamp.png`, `heart.png`, `star.png`, `balloons.png`,
`tree.png`, `bike.png`, `car.png`, `moon.png`, `cloud.png`, `wedding.png`,
`confetti.png`, `sparkle.png`

Again optional: each prop has a canvas painter used as a fallback. A yellow note
under the Generate panel lists which files were not found.

## 4. Where to put audio files

`public/funny-video/assets/audio/` — `audio1.mp3` … `audio5.mp3`.

If a file is missing, the matching track is **synthesised** with the Web Audio
API (dhol/bhangra, romantic flute, dramatic twist, comedy bounce, shehnai
wedding). Synthesised tracks are real audio and are recorded into the export
just like an MP3 would be. Drop your own MP3s in to replace them — same file
names, nothing else to change.

Audio shorter than the video loops; audio longer than the video is cut when the
video ends.

---

## 5. How to add a new background

Two lines of work in `js/templates.js`:

```js
// 1. optional: a procedural painter used when the JPG is missing
function paintBeach(ctx, w, h, rng) { /* draw with the 2d context */ }

// 2. add the template
{
  id: 'beach', label: 'Beach', emoji: '🏖️',
  backgroundFile: 'beach.jpg', paint: paintBeach,
  characterLayout: 'couple', groundY: 0.76,
  props: ['sparkles', 'clouds'],
  textStyle: 'zoom', camera: 'drift', transition: 'fade',
  palette: { text: '#fff7ed', stroke: '#0c4a6e', accent: '#38bdf8', band: '#0369a1' },
  particles: 'sparkles',
}
```

The background grid, randomizer and prop defaults pick it up automatically.

## 6. How to add a new prop

In `js/props.js`, append to `PROP_LIBRARY`:

```js
{
  id: 'dhol', label: 'Dhol', emoji: '🥁', file: 'dhol.png',
  layer: 45,                 // paint order: <60 behind people, >=60 in front
  placement: 'groundSingle', // groundRow | groundScatter | groundSingle | sideAnchor
                             // hangTop | topBanner | skyScatter | skyCorner
                             // skyDrift | float | ambientParticles
  count: [1, 2], scale: [1, 1.2],
  anim: 'bob',               // sway | swing | bob | drift | twinkle | rise | drive | none
  size: [320, 320],
  paint: (ctx, w, h, rng) => { /* fallback drawing */ },
}
```

That is all — the card appears in the UI and the layout engine places it.

## 7. How to add a new template

A "template" *is* the background entry above: it also carries the character
layout, the default props, the text style, the camera move and the transition.
Add a new character arrangement in `CHARACTER_LAYOUTS` (same file) if you need
one, then reference it by name via `characterLayout`.

## 8. How to add a new animation

* **Camera move** — add a `case` to `cameraTransform()` in `js/animation.js`,
  then add its id to `CAMERA_MOVES` in `js/state.js`.
* **Text animation** — add a `case` to `textState()`, then add its id to
  `TEXT_ANIMATIONS` in `js/state.js`.
* **Prop motion** — add a `case` to `propMotion()` and use the name in a prop's
  `anim` field.
* **Particles** — add a `case` to `particleState()` (`js/animation.js`); fields
  are analytic (position from time only) so they stay deterministic.
* **Scene beats** — edit `SCENE_RECIPES` in `js/scenes.js` to add or retime a
  scene.

## 9. Browser compatibility

| Feature            | Chrome / Edge | Firefox | Safari 17+ | Mobile              |
| ------------------ | ------------- | ------- | ---------- | ------------------- |
| Editor + preview   | ✅            | ✅      | ✅         | ✅                  |
| Audio playback     | ✅            | ✅      | ✅         | ✅ (after a tap)    |
| Export             | ✅ WebM       | ✅ WebM | ✅ MP4     | ⚠️ varies by OS     |

If `MediaRecorder` or `canvas.captureStream()` is missing, the editor and the
preview keep working and the export button explains why it is disabled.

## 10. How video export works

1. `canvas.captureStream(30)` gives a live 30 FPS video track of the renderer.
2. The audio graph exposes a `MediaStreamDestination`, so the same buffer you
   hear is recorded.
3. Both tracks go into one `MediaStream` and into `MediaRecorder`, using the
   best container `MediaRecorder.isTypeSupported()` reports (MP4/H.264 on
   Safari 17+, otherwise WebM VP9/VP8 + Opus).
4. During recording the render loop is driven by **elapsed wall-clock time**
   (`performance.now()`), not by a frame counter, so audio and video stay in
   sync even if a frame is dropped.
5. The recorded blob is downloaded as `joke-video-<names>.webm|mp4` — a real,
   playable file. Nothing is faked or renamed.

Want guaranteed MP4 everywhere? `VideoExporter.postProcess()` in
`js/exporter.js` is the single hook to add FFmpeg.wasm transcoding; no other
file needs to change.

---

## Future AI hook

`generateVideoScript(project)` in `js/scenes.js` is the only place where the
video's script (scenes, lines, camera, effects) is authored. V1 recombines the
names and the opening line the user typed. Swapping that function for an AI
service call is enough to get AI-written jokes — the renderer only consumes its
output shape.
