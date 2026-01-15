import { renderers } from './renderers.mjs';
import { c as createExports, s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_CMOjHlPA.mjs';
import { manifest } from './manifest_C1NsDyOf.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/blog/_slug_.astro.mjs');
const _page2 = () => import('./pages/case-study/_slug_.astro.mjs');
const _page3 = () => import('./pages/linguavault/learn/_curriculumid_/lesson/_lessonid_.astro.mjs');
const _page4 = () => import('./pages/linguavault/learn/_curriculumid_.astro.mjs');
const _page5 = () => import('./pages/linguavault/settings.astro.mjs');
const _page6 = () => import('./pages/linguavault.astro.mjs');
const _page7 = () => import('./pages/project/_slug_.astro.mjs');
const _page8 = () => import('./pages/resources.astro.mjs');
const _page9 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/blog/[slug].astro", _page1],
    ["src/pages/case-study/[slug].astro", _page2],
    ["src/pages/linguavault/learn/[curriculumId]/lesson/[lessonId].astro", _page3],
    ["src/pages/linguavault/learn/[curriculumId]/index.astro", _page4],
    ["src/pages/linguavault/settings.astro", _page5],
    ["src/pages/linguavault/index.astro", _page6],
    ["src/pages/project/[slug].astro", _page7],
    ["src/pages/resources.astro", _page8],
    ["src/pages/index.astro", _page9]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./noop-entrypoint.mjs'),
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "2a5c3f70-eddb-4a85-9e0b-efb1cd0bd430",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (Object.prototype.hasOwnProperty.call(serverEntrypointModule, _start)) ;

export { __astrojsSsrVirtualEntry as default, pageMap };
