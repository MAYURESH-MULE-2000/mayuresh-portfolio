import 'piccolore';
import { k as decodeKey } from './chunks/astro/server_BMOK3aS7.mjs';
import 'clsx';
import { N as NOOP_MIDDLEWARE_FN } from './chunks/astro-designed-error-pages_yCXhYaZy.mjs';
import 'es-module-lexer';

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///C:/Users/ptriv/Projects/mayuresh-portfolio/","cacheDir":"file:///C:/Users/ptriv/Projects/mayuresh-portfolio/node_modules/.astro/","outDir":"file:///C:/Users/ptriv/Projects/mayuresh-portfolio/dist/","srcDir":"file:///C:/Users/ptriv/Projects/mayuresh-portfolio/src/","publicDir":"file:///C:/Users/ptriv/Projects/mayuresh-portfolio/public/","buildClientDir":"file:///C:/Users/ptriv/Projects/mayuresh-portfolio/dist/client/","buildServerDir":"file:///C:/Users/ptriv/Projects/mayuresh-portfolio/dist/server/","adapterName":"@astrojs/vercel","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"linguavault/settings/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/linguavault/settings","isIndex":false,"type":"page","pattern":"^\\/linguavault\\/settings\\/?$","segments":[[{"content":"linguavault","dynamic":false,"spread":false}],[{"content":"settings","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/linguavault/settings.astro","pathname":"/linguavault/settings","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"linguavault/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/linguavault","isIndex":true,"type":"page","pattern":"^\\/linguavault\\/?$","segments":[[{"content":"linguavault","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/linguavault/index.astro","pathname":"/linguavault","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"resources/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/resources","isIndex":false,"type":"page","pattern":"^\\/resources\\/?$","segments":[[{"content":"resources","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/resources.astro","pathname":"/resources","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image\\/?$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/_slug_.93NxAQ_I.css"},{"type":"external","src":"/_astro/index.CaHx_RVp.css"},{"type":"external","src":"/_astro/_lessonId_.DFextuBm.css"}],"routeData":{"route":"/linguavault/learn/[curriculumid]/lesson/[lessonid]","isIndex":false,"type":"page","pattern":"^\\/linguavault\\/learn\\/([^/]+?)\\/lesson\\/([^/]+?)\\/?$","segments":[[{"content":"linguavault","dynamic":false,"spread":false}],[{"content":"learn","dynamic":false,"spread":false}],[{"content":"curriculumId","dynamic":true,"spread":false}],[{"content":"lesson","dynamic":false,"spread":false}],[{"content":"lessonId","dynamic":true,"spread":false}]],"params":["curriculumId","lessonId"],"component":"src/pages/linguavault/learn/[curriculumId]/lesson/[lessonId].astro","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/_slug_.93NxAQ_I.css"},{"type":"external","src":"/_astro/index.CaHx_RVp.css"},{"type":"external","src":"/_astro/index.OW3zafmO.css"}],"routeData":{"route":"/linguavault/learn/[curriculumid]","isIndex":true,"type":"page","pattern":"^\\/linguavault\\/learn\\/([^/]+?)\\/?$","segments":[[{"content":"linguavault","dynamic":false,"spread":false}],[{"content":"learn","dynamic":false,"spread":false}],[{"content":"curriculumId","dynamic":true,"spread":false}]],"params":["curriculumId"],"component":"src/pages/linguavault/learn/[curriculumId]/index.astro","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["C:/Users/ptriv/Projects/mayuresh-portfolio/src/pages/linguavault/index.astro",{"propagation":"none","containsHead":true}],["C:/Users/ptriv/Projects/mayuresh-portfolio/src/pages/linguavault/learn/[curriculumId]/index.astro",{"propagation":"none","containsHead":true}],["C:/Users/ptriv/Projects/mayuresh-portfolio/src/pages/linguavault/learn/[curriculumId]/lesson/[lessonId].astro",{"propagation":"none","containsHead":true}],["C:/Users/ptriv/Projects/mayuresh-portfolio/src/pages/linguavault/settings.astro",{"propagation":"none","containsHead":true}],["C:/Users/ptriv/Projects/mayuresh-portfolio/src/pages/blog/[slug].astro",{"propagation":"in-tree","containsHead":true}],["C:/Users/ptriv/Projects/mayuresh-portfolio/src/pages/case-study/[slug].astro",{"propagation":"in-tree","containsHead":true}],["C:/Users/ptriv/Projects/mayuresh-portfolio/src/pages/index.astro",{"propagation":"in-tree","containsHead":true}],["C:/Users/ptriv/Projects/mayuresh-portfolio/src/pages/project/[slug].astro",{"propagation":"in-tree","containsHead":true}],["C:/Users/ptriv/Projects/mayuresh-portfolio/src/pages/resources.astro",{"propagation":"in-tree","containsHead":true}],["\u0000astro:content",{"propagation":"in-tree","containsHead":false}],["C:/Users/ptriv/Projects/mayuresh-portfolio/src/lib/content.ts",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/blog/[slug]@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astrojs-ssr-virtual-entry",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/case-study/[slug]@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/index@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/project/[slug]@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/resources@_@astro",{"propagation":"in-tree","containsHead":false}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000noop-middleware":"_noop-middleware.mjs","\u0000virtual:astro:actions/noop-entrypoint":"noop-entrypoint.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","\u0000@astro-page:src/pages/blog/[slug]@_@astro":"pages/blog/_slug_.astro.mjs","\u0000@astro-page:src/pages/case-study/[slug]@_@astro":"pages/case-study/_slug_.astro.mjs","\u0000@astro-page:src/pages/linguavault/learn/[curriculumId]/lesson/[lessonId]@_@astro":"pages/linguavault/learn/_curriculumid_/lesson/_lessonid_.astro.mjs","\u0000@astro-page:src/pages/linguavault/learn/[curriculumId]/index@_@astro":"pages/linguavault/learn/_curriculumid_.astro.mjs","\u0000@astro-page:src/pages/linguavault/settings@_@astro":"pages/linguavault/settings.astro.mjs","\u0000@astro-page:src/pages/linguavault/index@_@astro":"pages/linguavault.astro.mjs","\u0000@astro-page:src/pages/project/[slug]@_@astro":"pages/project/_slug_.astro.mjs","\u0000@astro-page:src/pages/resources@_@astro":"pages/resources.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-manifest":"manifest_C1NsDyOf.mjs","C:/Users/ptriv/Projects/mayuresh-portfolio/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp_BQEupyRN.mjs","C:\\Users\\ptriv\\Projects\\mayuresh-portfolio\\.astro\\content-assets.mjs":"chunks/content-assets_DleWbedO.mjs","C:\\Users\\ptriv\\Projects\\mayuresh-portfolio\\.astro\\content-modules.mjs":"chunks/content-modules_Dz-S_Wwv.mjs","\u0000astro:data-layer-content":"chunks/_astro_data-layer-content_CDf8EOZM.mjs","C:/Users/ptriv/Projects/mayuresh-portfolio/src/components/SocialSidebar.vue":"_astro/SocialSidebar.CuOfvtE1.js","C:/Users/ptriv/Projects/mayuresh-portfolio/src/components/EmailSidebar.vue":"_astro/EmailSidebar.CAK9WhvE.js","C:/Users/ptriv/Projects/mayuresh-portfolio/src/components/LetsConnect.vue":"_astro/LetsConnect.BbtajaL2.js","C:/Users/ptriv/Projects/mayuresh-portfolio/src/components/linguavault/learning/LVLessonView.vue":"_astro/LVLessonView.C9JDs3zG.js","C:/Users/ptriv/Projects/mayuresh-portfolio/src/components/linguavault/learning/LVCurriculumView.vue":"_astro/LVCurriculumView.Bqvf9Wf0.js","C:/Users/ptriv/Projects/mayuresh-portfolio/src/components/linguavault/LVSettings.vue":"_astro/LVSettings.F6781UfA.js","C:/Users/ptriv/Projects/mayuresh-portfolio/src/components/ResourcesGrid.vue":"_astro/ResourcesGrid.COW1gAOA.js","C:/Users/ptriv/Projects/mayuresh-portfolio/src/components/ImpactStories.vue":"_astro/ImpactStories.Dnx9QdIy.js","C:/Users/ptriv/Projects/mayuresh-portfolio/src/components/HowIWork.vue":"_astro/HowIWork.DJDahUjX.js","C:/Users/ptriv/Projects/mayuresh-portfolio/src/components/WhereImWorking.vue":"_astro/WhereImWorking.CTXEQdNa.js","C:/Users/ptriv/Projects/mayuresh-portfolio/src/components/Particles.vue":"_astro/Particles.D1wYYxZ1.js","C:/Users/ptriv/Projects/mayuresh-portfolio/src/layouts/Layout.astro?astro&type=script&index=0&lang.ts":"_astro/Layout.astro_astro_type_script_index_0_lang.tHMU6yav.js","C:/Users/ptriv/Projects/mayuresh-portfolio/src/components/Header.vue":"_astro/Header.DhFshhsE.js","C:/Users/ptriv/Projects/mayuresh-portfolio/src/components/linguavault/LVDashboard.vue":"_astro/LVDashboard.CQcLNhIU.js","@astrojs/vue/client.js":"_astro/client.XKwE_LFN.js","C:/Users/ptriv/Projects/mayuresh-portfolio/src/components/ContentLayout.vue":"_astro/ContentLayout.0y5dpu33.js","C:/Users/ptriv/Projects/mayuresh-portfolio/src/components/MagnifyText.vue":"_astro/MagnifyText.D128s9Cg.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[["C:/Users/ptriv/Projects/mayuresh-portfolio/src/layouts/Layout.astro?astro&type=script&index=0&lang.ts","function r(){const e=document.documentElement.classList.contains(\"dark\"),t=document.getElementById(\"particles-background\");t&&t.setAttribute(\"color\",e?\"#ffffff\":\"#000000\")}r();const c=new MutationObserver(e=>{e.forEach(t=>{t.attributeName===\"class\"&&r()})});c.observe(document.documentElement,{attributes:!0,attributeFilter:[\"class\"]});"]],"assets":["/_astro/_lessonId_.DFextuBm.css","/_astro/_slug_.93NxAQ_I.css","/_astro/index.CaHx_RVp.css","/_astro/index.r4RZP6So.css","/_astro/index.OW3zafmO.css","/_astro/settings.Bla8yhpe.css","/favicon.svg","/ProductMayureshMule.pdf","/sample-curriculum.json","/admin/index.html","/audio/shaadi-case-study.m4a","/audio/zomatoAudio.m4a","/video/zomatoVideo.mp4","/video/zomatoVideo1.mp4","/video/zomatoVideo2.mp4","/_astro/arrow-right.BOtVoS29.js","/_astro/check.DlaGxj1r.js","/_astro/chevron-down.DApLtB9_.js","/_astro/client.XKwE_LFN.js","/_astro/ContentLayout.0y5dpu33.js","/_astro/copy.CG5jb8wy.js","/_astro/createLucideIcon.Cswp-0MP.js","/_astro/EmailSidebar.CAK9WhvE.js","/_astro/Header.DhFshhsE.js","/_astro/HowIWork.DJDahUjX.js","/_astro/ImpactStories.Dnx9QdIy.js","/_astro/index.DTP38CVu.css","/_astro/layout-grid.BqreHGPw.js","/_astro/LetsConnect.BbtajaL2.js","/_astro/linkedin.C2zJy-KB.js","/_astro/LVCurriculumView.Bqvf9Wf0.js","/_astro/LVDashboard.CQcLNhIU.js","/_astro/LVLessonView.C9JDs3zG.js","/_astro/LVSettings.F6781UfA.js","/_astro/MagnifyText.D128s9Cg.js","/_astro/Particles.D1wYYxZ1.js","/_astro/play.BE5k7Euy.js","/_astro/resources.D4iwnS_x.css","/_astro/ResourcesGrid.COW1gAOA.js","/_astro/rocket.DC28VDcv.js","/_astro/runtime-core.esm-bundler.BNdVnsgS.js","/_astro/runtime-dom.esm-bundler.gdpx9ppu.js","/_astro/SocialSidebar.CuOfvtE1.js","/_astro/sparkles.CbFgOF_O.js","/_astro/storage.C6ps69LL.js","/_astro/sun.CjCweWVQ.js","/_astro/type.tf3Lsrfr.js","/_astro/volume-2.P1Il-_6E.js","/_astro/WhereImWorking.CTXEQdNa.js","/_astro/wifi-off.DNPJu4tA.js","/_astro/wrench.h8CTtOer.js","/_astro/x.v6i0-WRI.js","/_astro/_plugin-vue_export-helper.DlAUqK2U.js","/_astro/_slug_.CIamvV8Y.css","/_astro/_slug_.CLe1T7YX.css","/images/avatars/avatar-1.png","/images/avatars/avatar-2.png","/images/avatars/avatar-3.png","/images/avatars/avatar-4.png","/images/avatars/avatar-5.png","/images/caseStudy/shaadiCoverPage.png","/images/caseStudy/shaadiLogo.png","/images/caseStudy/zomatoLogo.png","/images/caseStudy/zomato/Z1.1.png","/images/caseStudy/zomato/Z1.2.png","/linguavault/settings/index.html","/linguavault/index.html","/resources/index.html","/index.html"],"buildFormat":"directory","checkOrigin":true,"allowedDomains":[],"serverIslandNameMap":[],"key":"ssLCt9FeiNmvwUYKdvgOayj24haeKniG75JkMDSDE3I="});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = null;

export { manifest };
