import{v as B}from"./runtime-dom.esm-bundler.BqHWZDzq.js";import{C as U,a as J,S as q}from"./CodePlayground.BfsJ0Qmt.js";import{_ as K}from"./_plugin-vue_export-helper.DlAUqK2U.js";import{c as a,e as Y,a as e,b as d,f as C,F as g,g as y,r as O,h as M,k as R,o as r,i as f,n as v,t as n,l as S,j as T,w as G}from"./runtime-core.esm-bundler.BGCLfWho.js";/* empty css                       */const Z={__name:"LearnPerformance",setup(W,{expose:o}){o();const L=[{id:"rendering",label:"Rendering",icon:"🎨",badge:"2"},{id:"loading",label:"Loading",icon:"🦥",badge:"3"},{id:"caching",label:"Caching",icon:"🧠",badge:"2"},{id:"framework",label:"Framework",icon:"🌳",badge:"2"}],t=O("rendering");function E(c){t.value=c,window.scrollTo({top:0,behavior:"smooth"})}const A=O(0),s=[{title:"HTML → DOM",detail:"Browser parses HTML bytes into tokens, then builds the DOM tree — a tree of nodes representing all elements."},{title:"CSS → CSSOM",detail:"Browser parses CSS into the CSS Object Model — a tree of styles. Each node knows its computed styles."},{title:"DOM + CSSOM → Render Tree",detail:"Combines visible DOM nodes with their computed styles. display:none elements are excluded."},{title:"Layout (Reflow)",detail:"Calculates the exact position and size of each element on screen. This is expensive for complex layouts."},{title:"Paint",detail:"Fills in pixels — colors, backgrounds, shadows, borders. Multiple layers may be created."},{title:"Composite",detail:"GPU composites all layers into the final image. transform and opacity changes only trigger this step (cheapest!)."}],i=M({badWidths:[20,40,60,80,100],goodWidths:[20,40,60,80,100],badTime:"—",goodTime:"—",running:!1});function z(){i.running=!0;const c=performance.now(),m=[];for(let p=0;p<1e3;p++)m.push(Math.random()*100);const b=performance.now();i.badTime=(b-c).toFixed(2),i.badWidths=m.slice(0,5).map(p=>Math.max(10,p));const k=performance.now(),l=[];for(let p=0;p<1e3;p++)l.push(Math.random()*100);const u=l.map(p=>p),j=performance.now();i.goodTime=(j-k).toFixed(2),i.goodWidths=u.slice(0,5).map(p=>Math.max(10,p)),i.running=!1}const D=M({eager:[{size:240,width:60,offset:0},{size:180,width:45,offset:5},{size:320,width:80,offset:3},{size:150,width:38,offset:8},{size:200,width:50,offset:12}],lazy:[{size:240,width:60,offset:0,deferred:!1},{size:180,width:45,offset:0,deferred:!1},{size:0,width:0,offset:0,deferred:!0},{size:0,width:0,offset:0,deferred:!0},{size:0,width:0,offset:0,deferred:!0}],animating:!1}),V=R(()=>D.eager.reduce((c,m)=>c+m.size,0)+100),N=R(()=>D.lazy.filter(c=>!c.deferred).reduce((c,m)=>c+m.size,0)+50);function H(){D.animating=!1,setTimeout(()=>{D.animating=!0},50)}const _=O(30),h=M({rawTime:"—",memoTime:"—",rawResult:null,memoResult:null,speedup:null});function F(){function c(l){return l<=1?l:c(l-1)+c(l-2)}function m(l,u={}){return l in u?u[l]:l<=1?l:(u[l]=m(l-1,u)+m(l-2,u),u[l])}if(_.value<=38){const l=performance.now();h.rawResult=c(_.value);const u=performance.now();h.rawTime=(u-l).toFixed(2)+"ms"}else h.rawTime="⚠️ Too slow!",h.rawResult=null;const b=performance.now();h.memoResult=m(_.value);const k=performance.now();if(h.memoTime=(k-b).toFixed(4)+"ms",_.value<=38){const l=parseFloat(h.rawTime),u=parseFloat(h.memoTime);h.speedup=u>0?Math.round(l/u):"∞"}else h.speedup="∞"}const x=M({oldTree:[{id:1,tag:"h1",text:"Hello World"},{id:2,tag:"p",text:"Count: 0"},{id:3,tag:"button",text:"Click me"},{id:4,tag:"span",text:"Status: idle"}],newTree:[{id:1,tag:"h1",text:"Hello World",changed:!1},{id:2,tag:"p",text:"Count: 1",changed:!0},{id:3,tag:"button",text:"Click me",changed:!1},{id:4,tag:"span",text:"Status: active",changed:!0}],patches:['UPDATE p: "Count: 0" → "Count: 1"','UPDATE span: "Status: idle" → "Status: active"']});let w=1;function I(){w++;const c=["idle","active","loading","error","success"],m=c[w%c.length];x.oldTree=x.newTree.map(b=>({...b,changed:!1})),x.newTree=x.oldTree.map((b,k)=>k===1?{...b,text:`Count: ${w}`,changed:!0}:k===3?{...b,text:`Status: ${m}`,changed:!0}:{...b,changed:!1}),x.patches=[`UPDATE p: "${x.oldTree[1].text}" → "Count: ${w}"`,`UPDATE span: "${x.oldTree[3].text}" → "Status: ${m}"`]}const P={sections:L,activeSection:t,setSection:E,crpActiveStep:A,crpSteps:s,thrashingDemo:i,runThrashingDemo:z,lazyDemo:D,eagerTotal:V,lazyTotal:N,runLazyDemo:H,fibN:_,fibDemo:h,runFibDemo:F,vdomDemo:x,get vdomCounter(){return w},set vdomCounter(c){w=c},shuffleVdomDemo:I,scriptStrategies:[{name:"regular",label:"<script> (regular)",color:"text-red-400",blocks:[{label:"parse",class:"bg-blue-500",flex:3},{label:"blocked",class:"bg-gray-500",flex:1},{label:"download",class:"bg-amber-500",flex:2},{label:"exec",class:"bg-red-500",flex:1},{label:"parse",class:"bg-blue-500",flex:3}]},{name:"async",label:"<script async>",color:"text-amber-400",blocks:[{label:"parse",class:"bg-blue-500",flex:3},{label:"exec",class:"bg-red-500",flex:1},{label:"parse",class:"bg-blue-500",flex:6}]},{name:"defer",label:"<script defer>",color:"text-emerald-400",blocks:[{label:"parse (no blocking)",class:"bg-blue-500",flex:8},{label:"exec",class:"bg-red-500",flex:2}]}],codes:{criticalPath:`// Critical Rendering Path Optimization Checklist

console.log("🎯 CRP Optimization Strategies:");
console.log("");
console.log("1. MINIMIZE critical resources:");
console.log("   • Inline critical CSS (<14kb)");
console.log("   • Defer non-critical CSS with media queries");
console.log("   • Async/defer non-essential JavaScript");
console.log("");
console.log("2. REDUCE critical bytes:");
console.log("   • Minify CSS, JS, HTML");
console.log("   • Enable Brotli/gzip compression");
console.log("   • Optimize and compress images (WebP/AVIF)");
console.log("");
console.log("3. SHORTEN critical path:");
console.log("   • Reduce number of critical resources");
console.log("   • Use resource hints: preload, prefetch, preconnect");
console.log("   • Avoid render-blocking resources");
console.log("");
console.log("💡 Key metrics to track:");
console.log("   FCP (First Contentful Paint) < 1.8s");
console.log("   LCP (Largest Contentful Paint) < 2.5s");
console.log("   CLS (Cumulative Layout Shift) < 0.1");
console.log("   INP (Interaction to Next Paint) < 200ms");`,layoutThrashing:`// 🔴 Layout Thrashing Example

// ❌ BAD: Read-write-read-write loop forces sync layout
function thrashLayout(elements) {
  for (let i = 0; i < elements.length; i++) {
    // FORCED SYNC LAYOUT on every iteration!
    const height = elements[i].offsetHeight; // READ
    elements[i].style.height = (height + 10) + 'px'; // WRITE
  }
}

// ✅ GOOD: Batch all reads, then batch all writes
function batchedLayout(elements) {
  // Phase 1: Read all values
  const heights = elements.map(el => el.offsetHeight);

  // Phase 2: Write all values
  elements.forEach((el, i) => {
    el.style.height = (heights[i] + 10) + 'px';
  });
}

// ✅ BETTER: Use requestAnimationFrame
function rafBatched(elements) {
  // Reads can happen anytime
  const heights = elements.map(el => el.offsetHeight);

  // Writes batched in next frame
  requestAnimationFrame(() => {
    elements.forEach((el, i) => {
      el.style.height = (heights[i] + 10) + 'px';
    });
  });
}

console.log("Layout Thrashing: read→write→read→write in loop");
console.log("Fix: batch reads first, then batch all writes");
console.log("Best: Use requestAnimationFrame for writes");`,lazyLoading:`// Native Lazy Loading (simplest)
// <img src="hero.jpg" loading="eager">  ← Above fold
// <img src="below.jpg" loading="lazy">   ← Below fold

// Intersection Observer (more control)
console.log("Intersection Observer API:");

const observerCode = \`
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;  // Load real image
      observer.unobserve(img);    // Stop watching
    }
  });
}, { rootMargin: '200px' }); // Start loading 200px before visible

document.querySelectorAll('img[data-src]')
  .forEach(img => observer.observe(img));
\`;
console.log(observerCode);

// Route-based code splitting (Frameworks)
console.log("\\nDynamic imports for routes:");
console.log("const Home = () => import('./views/Home.vue')");
console.log("const About = () => import('./views/About.vue')");
console.log("Webpack/Vite creates separate chunks automatically!");`,codeSplitting:`// Code Splitting Strategies

console.log("1️⃣ Route-based splitting:");
console.log("   const Home = () => import('./Home.vue')");
console.log("   Each route = separate JS chunk\\n");

console.log("2️⃣ Component-based splitting:");
console.log("   const Modal = defineAsyncComponent(");
console.log("     () => import('./HeavyModal.vue')");
console.log("   )\\n");

console.log("3️⃣ Library-based splitting:");
console.log("   Use dynamic import() for heavy libraries:");
console.log("   const { Chart } = await import('chart.js')\\n");

console.log("🌲 Tree Shaking:");
console.log("   WORKS:   import { debounce } from 'lodash-es'");
console.log("   NO WORK: import _ from 'lodash' ← imports ALL 70kb!\\n");

console.log("⚠️ Tree shaking ONLY works with ES6 modules");
console.log("   Because import/export are static (analyzable)");
console.log("   CommonJS require() is dynamic (can't be analyzed)");`,scriptLoading:`// Script Loading Strategies

console.log("📜 <script> loading behaviors:\\n");

console.log("1. Regular <script>:");
console.log("   • Blocks HTML parsing");
console.log("   • Downloads and executes immediately");
console.log("   • Use for: critical inline scripts\\n");

console.log("2. <script async>:");
console.log("   • Downloads in parallel (non-blocking)");
console.log("   • Executes AS SOON as downloaded");
console.log("   • Execution ORDER is NOT guaranteed");
console.log("   • Use for: analytics, ads, independent scripts\\n");

console.log("3. <script defer>:");
console.log("   • Downloads in parallel (non-blocking)");
console.log("   • Executes AFTER HTML is fully parsed");
console.log("   • Execution ORDER IS guaranteed");
console.log("   • Use for: your app bundle, framework scripts\\n");

console.log("🎯 Ad-Tech Pro Tip:");
console.log("   Third-party ad scripts should ALWAYS be async");
console.log("   Your framework bundle should be defer");
console.log("   Inline critical CSS + preload key assets");`,memoization:`// Memoize: generic higher-order function
function memoize(fn) {
  const cache = new Map();
  return function(...args) {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      console.log("  ✅ Cache hit for:", key);
      return cache.get(key);
    }
    console.log("  ❌ Cache miss for:", key);
    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  };
}

// Example: expensive computation
const expensiveAdd = memoize((a, b) => {
  // Simulate heavy work
  let sum = 0;
  for (let i = 0; i < 1000000; i++) sum += 0;
  return a + b;
});

console.log("First call (cache miss):");
console.log("Result:", expensiveAdd(5, 3));
console.log("\\nSecond call (cache hit!):");
console.log("Result:", expensiveAdd(5, 3));
console.log("\\nDifferent args (cache miss):");
console.log("Result:", expensiveAdd(10, 20));`,minification:`// What minification does to your code

// BEFORE (readable, 245 bytes):
const beforeCode = \`
function calculateTotal(items) {
  // Calculate the total price
  let total = 0;
  for (const item of items) {
    total += item.price * item.quantity;
  }
  return total;
}
\`;

// AFTER minification (98 bytes — 60% smaller!):
// function calculateTotal(t){let o=0;for(const l of t)o+=l.price*l.quantity;return o}

console.log("Minification removes:");
console.log("  • Whitespace and newlines");
console.log("  • Comments");
console.log("  • Shortens variable names (total → o)");
console.log("  • Removes unnecessary semicolons\\n");

console.log("Compression (gzip/brotli) on top:");
console.log("  Original:   245 bytes");
console.log("  Minified:    98 bytes (−60%)");
console.log("  + Brotli:    62 bytes (−75% total!)\\n");

console.log("Tools: Terser (JS), cssnano (CSS), html-minifier");
console.log("💡 Brotli > gzip (20% better compression)");`,virtualDom:`// Virtual DOM Simplified

// The VDOM is just a JS object tree
const oldVDOM = {
  tag: 'div',
  props: { class: 'container' },
  children: [
    { tag: 'h1', children: ['Hello World'] },
    { tag: 'p', children: ['Count: 0'] },
    { tag: 'button', children: ['Click me'] },
  ]
};

const newVDOM = {
  tag: 'div',
  props: { class: 'container' },
  children: [
    { tag: 'h1', children: ['Hello World'] },      // Same
    { tag: 'p', children: ['Count: 1'] },           // Changed!
    { tag: 'button', children: ['Click me'] },      // Same
  ]
};

// Diff algorithm finds minimal changes
function diff(oldNode, newNode) {
  const patches = [];
  if (JSON.stringify(oldNode) !== JSON.stringify(newNode)) {
    patches.push({ type: 'UPDATE', node: newNode });
  }
  return patches;
}

// Only the <p> changed → only 1 DOM update!
console.log("VDOM Reconciliation Process:");
console.log("1. State changes → new VDOM tree created");
console.log("2. Diff old vs new VDOM (in memory, fast!)");
console.log("3. Calculate minimal patches");
console.log("4. Apply ONLY changed nodes to real DOM");
console.log("\\nResult: Instead of re-rendering everything,");
console.log("only the changed <p> tag is updated. 🚀");`,bundlers:`// Webpack vs Vite — Key Differences

console.log("📦 WEBPACK (Traditional):");
console.log("  • Bundles EVERYTHING before dev server starts");
console.log("  • Uses loaders for file transforms (babel-loader, etc)");
console.log("  • Hot Module Replacement (HMR) gets slower with size");
console.log("  • Mature ecosystem, handles edge cases well");
console.log("  • Config: webpack.config.js (verbose)\\n");

console.log("⚡ VITE (Modern):");
console.log("  • Dev: serves native ES modules (no bundling!)");
console.log("  • Production: bundles with Rollup");
console.log("  • HMR is instant regardless of app size");
console.log("  • 10-100x faster cold start than Webpack");
console.log("  • Config: vite.config.js (minimal)\\n");

console.log("🤔 Why is Vite faster in dev?");
console.log("  Webpack: bundle ALL files → serve bundle");
console.log("  Vite: serve files AS-IS → browser resolves imports");
console.log("  Browser calls: import './module.js'");
console.log("  Vite intercepts and transforms on-demand\\n");

console.log("💡 Rule of thumb:");
console.log("  New project → Vite");
console.log("  Legacy project → Webpack (migration later)");
console.log("  Need SSR → Both support it (Next.js/Nuxt)");`},ref:O,reactive:M,computed:R,SectionNav:q,ConceptCard:J,CodePlayground:U};return Object.defineProperty(P,"__isScriptSetup",{enumerable:!1,value:!0}),P}},Q={class:"learn-perf min-h-screen"},X={class:"px-4 md:px-8 max-w-6xl mx-auto flex flex-col lg:flex-row gap-6 pb-16"},$={class:"flex-1 min-w-0 space-y-5"},ee={class:"p-4 rounded-xl bg-gray-100/80 dark:bg-white/5 border border-gray-200/50 dark:border-white/5"},te={class:"space-y-2"},oe=["onClick"],se={class:"font-medium text-sm text-gray-900 dark:text-white"},ne={key:0,class:"text-xs text-gray-500 dark:text-gray-400 mt-1 leading-relaxed"},ie={class:"mt-4 h-1.5 rounded-full bg-gray-200 dark:bg-white/10 overflow-hidden"},ae={class:"p-4 rounded-xl bg-gray-100/80 dark:bg-white/5 border border-gray-200/50 dark:border-white/5"},re={class:"grid grid-cols-1 md:grid-cols-2 gap-4 mb-4"},le={class:"p-3 rounded-lg border border-red-500/20 bg-red-500/5"},de={class:"space-y-1 mb-3"},ce={class:"text-xs font-mono text-red-300"},ge={class:"font-bold"},me={class:"p-3 rounded-lg border border-emerald-500/20 bg-emerald-500/5"},ue={class:"space-y-1 mb-3"},he={class:"text-xs font-mono text-emerald-300"},pe={class:"font-bold"},fe=["disabled"],be={class:"p-4 rounded-xl bg-gray-100/80 dark:bg-white/5 border border-gray-200/50 dark:border-white/5"},ye={class:"space-y-4"},xe={class:"text-xs font-medium text-red-400 mb-2"},ve={class:"space-y-1"},we={class:"text-xs text-gray-400 w-16 flex-shrink-0 font-mono"},ke={class:"flex-1 h-5 bg-gray-200 dark:bg-white/5 rounded overflow-hidden"},Ce={class:"text-xs text-gray-400 font-mono w-10 text-right"},Se={class:"text-xs font-medium text-emerald-400 mb-2"},Te={class:"space-y-1"},De={class:"text-xs text-gray-400 w-16 flex-shrink-0 font-mono"},_e={class:"flex-1 h-5 bg-gray-200 dark:bg-white/5 rounded overflow-hidden"},Me={class:"p-4 rounded-xl bg-gray-100/80 dark:bg-white/5 border border-gray-200/50 dark:border-white/5"},ze={class:"space-y-4"},Oe={class:"flex gap-0.5 h-6"},Re={class:"p-4 rounded-xl bg-gray-100/80 dark:bg-white/5 border border-gray-200/50 dark:border-white/5"},Le={class:"flex flex-wrap items-center gap-3 mb-4"},Ee={class:"text-sm font-mono text-gray-300 w-8"},Ae={class:"grid grid-cols-2 gap-3"},Pe={class:"p-3 rounded-lg border border-red-500/20 bg-red-500/5 text-center"},We={class:"text-xl font-mono font-bold text-red-400"},Ve={class:"text-xs text-gray-400 mt-1"},Ne={class:"p-3 rounded-lg border border-emerald-500/20 bg-emerald-500/5 text-center"},He={class:"text-xl font-mono font-bold text-emerald-400"},Fe={class:"text-xs text-gray-400 mt-1"},Ie={key:0,class:"text-xs text-emerald-400 mt-2 text-center"},je={class:"p-4 rounded-xl bg-gray-100/80 dark:bg-white/5 border border-gray-200/50 dark:border-white/5"},Be={class:"grid grid-cols-1 md:grid-cols-3 gap-3 mb-4"},Ue={class:"p-3 rounded-lg border border-gray-500/20 bg-gray-500/5"},Je={class:"space-y-1.5"},qe={class:"p-3 rounded-lg border border-blue-500/20 bg-blue-500/5"},Ke={class:"space-y-1.5"},Ye={class:"p-3 rounded-lg border border-amber-500/20 bg-amber-500/5"},Ge={class:"space-y-1.5"},Ze={class:"text-xs text-gray-500 mt-1"};function Qe(W,o,L,t,E,A){return r(),a("div",Q,[o[18]||(o[18]=Y('<div class="px-4 md:px-8 py-8 pb-4 max-w-6xl mx-auto"><a href="/learn" class="inline-flex items-center gap-1 text-sm text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors mb-4"> ← Back to Topics </a><div class="flex items-center gap-3 mb-2"><span class="text-3xl">🚀</span><h1 class="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">Performance Optimization</h1></div><p class="text-gray-500 dark:text-gray-400 text-sm md:text-base max-w-2xl"> Senior-level performance knowledge. Understanding these concepts and speaking about them confidently is a massive signal. </p></div>',1)),e("div",X,[d(t.SectionNav,{sections:t.sections,activeSection:t.activeSection,activeColor:"bg-emerald-600",onSelect:t.setSection,class:"lg:w-56 flex-shrink-0"},null,8,["activeSection"]),e("div",$,[t.activeSection==="rendering"?(r(),a(g,{key:0},[d(t.ConceptCard,{id:"critical-rendering-path",icon:"🎨",title:"Critical Rendering Path",subtitle:"How your page goes from HTML to pixels",definition:"The Critical Rendering Path is the sequence of steps the browser takes to convert HTML, CSS, and JS into pixels: HTML → DOM, CSS → CSSOM, DOM + CSSOM → Render Tree → Layout → Paint → Composite.",analogy:"Think of building a house: HTML is the blueprint (DOM), CSS is the interior design plan (CSSOM), combining them creates the actual plan (Render Tree), Layout is measuring rooms, Paint is applying colors, Composite is assembling floors.",seniorTip:"To optimize CRP: minimize critical resources, reduce critical bytes, and shorten critical path length. Inline critical CSS, defer non-essential JS, and preload key resources.",defaultOpen:""},{default:y(()=>[e("div",ee,[o[1]||(o[1]=e("p",{class:"text-xs font-medium text-gray-500 dark:text-gray-400 mb-3"},"🎮 Click through each step of the rendering pipeline",-1)),e("div",te,[(r(),a(g,null,f(t.crpSteps,(s,i)=>e("div",{key:i,onClick:z=>t.crpActiveStep=i,class:v(["flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-all duration-200",t.crpActiveStep===i?"bg-emerald-500/10 border border-emerald-500/20":"hover:bg-white/5 border border-transparent"])},[e("span",{class:v(["flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold",t.crpActiveStep>=i?"bg-emerald-500 text-white":"bg-gray-200 dark:bg-white/10 text-gray-400"])},n(i+1),3),e("div",null,[e("p",se,n(s.title),1),t.crpActiveStep===i?(r(),a("p",ne,n(s.detail),1)):C("",!0)])],10,oe)),64))]),e("div",ie,[e("div",{class:"h-full bg-emerald-500 transition-all duration-500 rounded-full",style:S({width:(t.crpActiveStep+1)/t.crpSteps.length*100+"%"})},null,4)])]),d(t.CodePlayground,{title:"critical-path.js",initialCode:t.codes.criticalPath},null,8,["initialCode"])]),_:1}),d(t.ConceptCard,{id:"reflow-vs-repaint",icon:"💥",title:"Layout Thrashing — Why Your Animations Jank",subtitle:"The most common performance mistake",definition:"Layout thrashing occurs when you interleave DOM reads and writes. Each read forces the browser to recalculate layout synchronously, and each write invalidates it. In a loop, this creates thousands of forced layouts.",analogy:"Imagine reorganizing a library: layout thrashing is like checking the catalog (read), moving one book (write), checking again (forced re-catalog!), moving another... versus checking everything first, then moving all books at once.",seniorTip:"Use requestAnimationFrame for DOM writes. Batch reads first, then writes. Use CSS transform/opacity for animations (they skip layout). The FastDOM library automates read/write batching."},{default:y(()=>[e("div",ae,[o[6]||(o[6]=e("p",{class:"text-xs font-medium text-gray-500 dark:text-gray-400 mb-3"},"🎮 Compare: Thrashing vs Batched DOM operations",-1)),e("div",re,[e("div",le,[o[3]||(o[3]=e("p",{class:"text-xs font-medium text-red-400 mb-2"},"❌ Layout Thrashing",-1)),e("div",de,[(r(),a(g,null,f(5,s=>e("div",{key:"bad"+s,class:"h-3 rounded-full bg-red-500/20 transition-all duration-300",style:S({width:t.thrashingDemo.badWidths[s-1]+"%"})},null,4)),64))]),e("p",ce,[o[2]||(o[2]=T(" Time: ",-1)),e("span",ge,n(t.thrashingDemo.badTime)+"ms",1)])]),e("div",me,[o[5]||(o[5]=e("p",{class:"text-xs font-medium text-emerald-400 mb-2"},"✅ Batched Reads/Writes",-1)),e("div",ue,[(r(),a(g,null,f(5,s=>e("div",{key:"good"+s,class:"h-3 rounded-full bg-emerald-500/20 transition-all duration-300",style:S({width:t.thrashingDemo.goodWidths[s-1]+"%"})},null,4)),64))]),e("p",he,[o[4]||(o[4]=T(" Time: ",-1)),e("span",pe,n(t.thrashingDemo.goodTime)+"ms",1)])])]),e("button",{onClick:t.runThrashingDemo,class:"px-4 py-2 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-sm font-medium transition-all",disabled:t.thrashingDemo.running},n(t.thrashingDemo.running?"Running...":"▶ Run Comparison"),9,fe)]),d(t.CodePlayground,{title:"layout-thrashing.js",initialCode:t.codes.layoutThrashing},null,8,["initialCode"])]),_:1})],64)):C("",!0),t.activeSection==="loading"?(r(),a(g,{key:1},[d(t.ConceptCard,{id:"lazy-loading",icon:"🦥",title:"Lazy Loading",subtitle:"Don't load what you don't need yet",definition:"Lazy loading defers loading of resources until they're needed. Images: use loading='lazy' or Intersection Observer. Components: dynamic import() for route-based code splitting. Data: paginate and load on scroll.",analogy:"Lazy loading is like a buffet with a kitchen in the back — food appears on the counter only when a dish runs low (viewport intersection), not all at once at the start.",seniorTip:"Use native loading='lazy' for images below the fold. For hero images, preload them instead. Combine with skeleton screens for perceived performance.",defaultOpen:""},{default:y(()=>[e("div",be,[o[7]||(o[7]=e("p",{class:"text-xs font-medium text-gray-500 dark:text-gray-400 mb-3"},"🎮 Waterfall comparison: Eager vs Lazy loading",-1)),e("div",ye,[e("div",null,[e("p",xe,"❌ Eager: All loaded upfront ("+n(t.eagerTotal)+"ms total)",1),e("div",ve,[(r(!0),a(g,null,f(t.lazyDemo.eager,(s,i)=>(r(),a("div",{key:"eager"+i,class:"flex items-center gap-2"},[e("span",we,"img"+n(i+1)+".jpg",1),e("div",ke,[e("div",{class:"h-full rounded transition-all duration-700 bg-red-500/50",style:S({width:t.lazyDemo.animating?s.width+"%":"0%",marginLeft:s.offset+"%"})},null,4)]),e("span",Ce,n(s.size)+"k",1)]))),128))])]),e("div",null,[e("p",Se,"✅ Lazy: Loaded on demand ("+n(t.lazyTotal)+"ms initial)",1),e("div",Te,[(r(!0),a(g,null,f(t.lazyDemo.lazy,(s,i)=>(r(),a("div",{key:"lazy"+i,class:"flex items-center gap-2"},[e("span",De,"img"+n(i+1)+".jpg",1),e("div",_e,[e("div",{class:v(["h-full rounded transition-all duration-700",s.deferred?"bg-gray-400/30":"bg-emerald-500/50"]),style:S({width:t.lazyDemo.animating?s.width+"%":"0%",marginLeft:s.offset+"%"})},null,6)]),e("span",{class:v(["text-xs font-mono w-10 text-right",s.deferred?"text-gray-500":"text-gray-400"])},n(s.deferred?"defer":s.size+"k"),3)]))),128))])])]),e("button",{onClick:t.runLazyDemo,class:"mt-3 px-4 py-2 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-sm font-medium transition-all"}," ▶ Animate Waterfall ")]),d(t.CodePlayground,{title:"lazy-loading.js",initialCode:t.codes.lazyLoading},null,8,["initialCode"])]),_:1}),d(t.ConceptCard,{id:"code-splitting",icon:"✂️",title:"Code Splitting & Tree Shaking",subtitle:"Ship only what users need",definition:"Code splitting breaks your bundle into smaller chunks loaded on demand (route-based or component-based). Tree shaking removes unused exports during bundling — only works with ES6 modules (static analysis).",analogy:"Code splitting is like packing for a trip — you bring a carry-on (critical code) and check the rest. Tree shaking is Marie Kondo — if the code doesn't spark joy (get used), throw it out.",seniorTip:"Dynamic import() creates split points. Use React.lazy() or Vue defineAsyncComponent(). Analyze bundle size with webpack-bundle-analyzer. A 100KB JS saving = ~300ms faster on 3G."},{default:y(()=>[d(t.CodePlayground,{title:"code-splitting.js",initialCode:t.codes.codeSplitting},null,8,["initialCode"])]),_:1}),d(t.ConceptCard,{id:"script-loading",icon:"📜",title:"Script Loading: async vs defer",subtitle:"How you load scripts affects everything",definition:"Regular <script>: blocks HTML parsing. async: downloads in parallel, executes immediately when ready (blocks parsing briefly). defer: downloads in parallel, executes after HTML parsing, in order. For ad-tech, this is critical.",analogy:"Regular script = a roadblock (parsing stops). async = a delivery that interrupts you when it arrives (out of order). defer = packages stacked neatly at your door, opened after you finish what you're doing (in order).",seniorTip:"Use defer for your own scripts (maintains order, doesn't block). Use async for independent third-party scripts (analytics, ads). In ad-tech, script loading strategy directly impacts page speed scores."},{default:y(()=>[e("div",Me,[o[8]||(o[8]=e("p",{class:"text-xs font-medium text-gray-500 dark:text-gray-400 mb-3"},"📊 Script loading strategies — HTML parsing timeline",-1)),e("div",ze,[(r(),a(g,null,f(t.scriptStrategies,s=>e("div",{key:s.name},[e("p",{class:v(["text-xs font-medium mb-1.5",s.color])},n(s.label),3),e("div",Oe,[(r(!0),a(g,null,f(s.blocks,(i,z)=>(r(),a("div",{key:z,class:v(["h-full rounded-sm flex items-center justify-center text-[10px] font-mono text-white/80",i.class]),style:S({flex:i.flex})},n(i.label),7))),128))])])),64))]),o[9]||(o[9]=e("div",{class:"mt-3 flex flex-wrap gap-3 text-xs"},[e("span",{class:"flex items-center gap-1"},[e("span",{class:"w-3 h-3 rounded-sm bg-blue-500"}),T(" HTML Parse")]),e("span",{class:"flex items-center gap-1"},[e("span",{class:"w-3 h-3 rounded-sm bg-amber-500"}),T(" Download")]),e("span",{class:"flex items-center gap-1"},[e("span",{class:"w-3 h-3 rounded-sm bg-red-500"}),T(" Execute")]),e("span",{class:"flex items-center gap-1"},[e("span",{class:"w-3 h-3 rounded-sm bg-gray-500"}),T(" Blocked")])],-1))]),d(t.CodePlayground,{title:"script-loading.js",initialCode:t.codes.scriptLoading},null,8,["initialCode"])]),_:1})],64)):C("",!0),t.activeSection==="caching"?(r(),a(g,{key:2},[d(t.ConceptCard,{id:"memoization",icon:"🧠",title:"Memoization",subtitle:"Cache expensive computations",definition:"Memoization stores function results based on arguments. If called again with the same args, it returns the cached result instead of recomputing. Works best for pure functions (same input → same output).",analogy:"Imagine a math teacher who writes solved problems on the board. When a student asks '24 × 17?', she checks the board first. If it's there, instant answer. If not, she solves it and adds it to the board.",seniorTip:"Use memoization for expensive computations (Fibonacci, factorial, complex transforms). In React, useMemo/useCallback. In Vue, computed properties are auto-memoized. Watch cache size — memoizing everything wastes memory.",defaultOpen:""},{default:y(()=>[e("div",Re,[o[13]||(o[13]=e("p",{class:"text-xs font-medium text-gray-500 dark:text-gray-400 mb-3"},"🎮 Fibonacci Calculator — Compare raw vs memoized speed",-1)),e("div",Le,[o[10]||(o[10]=e("label",{class:"text-sm text-gray-400"},"n =",-1)),G(e("input",{"onUpdate:modelValue":o[0]||(o[0]=s=>t.fibN=s),type:"range",min:"5",max:"40",class:"flex-1 min-w-[100px] max-w-[200px] accent-emerald-500"},null,512),[[B,t.fibN,void 0,{number:!0}]]),e("span",Ee,n(t.fibN),1),e("button",{onClick:t.runFibDemo,class:"px-4 py-2 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-sm font-medium transition-all"}," ▶ Compute ")]),e("div",Ae,[e("div",Pe,[o[11]||(o[11]=e("p",{class:"text-xs text-red-400 mb-1"},"❌ Raw Recursive",-1)),e("p",We,n(t.fibDemo.rawTime),1),e("p",Ve,n(t.fibDemo.rawResult!==null?"Result: "+t.fibDemo.rawResult:""),1)]),e("div",Ne,[o[12]||(o[12]=e("p",{class:"text-xs text-emerald-400 mb-1"},"✅ Memoized",-1)),e("p",He,n(t.fibDemo.memoTime),1),e("p",Fe,n(t.fibDemo.memoResult!==null?"Result: "+t.fibDemo.memoResult:""),1)])]),t.fibDemo.speedup?(r(),a("p",Ie," ⚡ Memoized is "+n(t.fibDemo.speedup)+"x faster! ",1)):C("",!0)]),d(t.CodePlayground,{title:"memoization.js",initialCode:t.codes.memoization,autoRun:!0},null,8,["initialCode"])]),_:1}),d(t.ConceptCard,{id:"minification",icon:"🗜️",title:"Minification & Compression",subtitle:"Shrink your files before shipping",definition:"Minification removes whitespace, comments, and shortens variable names (Terser for JS, cssnano for CSS). Compression (gzip/brotli) further reduces transfer size. Combined, they can reduce bundle size by 60-80%.",analogy:"Minification is removing all vowels from a txt msg (u cn stll rd it). Compression is vacuum-sealing a suitcase — same clothes, fraction of the space.",seniorTip:"Enable Brotli compression (better than gzip) on your server. Use source maps in production for debugging. Monitor bundle size in CI with bundlesize or size-limit packages."},{default:y(()=>[d(t.CodePlayground,{title:"minification.js",initialCode:t.codes.minification},null,8,["initialCode"])]),_:1})],64)):C("",!0),t.activeSection==="framework"?(r(),a(g,{key:3},[d(t.ConceptCard,{id:"virtual-dom",icon:"🌳",title:"Virtual DOM — Why Frameworks Are Fast",subtitle:"The diffing algorithm explained",definition:"The Virtual DOM is a lightweight JS representation of the real DOM. When state changes, a new VDOM tree is created, diffed against the old one, and only the changed nodes are updated in the real DOM (reconciliation).",analogy:"Imagine editing a Word document: instead of reprinting the entire document (real DOM update), you track changes (diff) and only reprint the modified pages (minimal DOM patches).",seniorTip:"The VDOM isn't inherently faster than hand-optimized DOM updates — it provides a good-enough performance floor with a great developer experience. Svelte skips VDOM entirely and compiles to direct DOM updates.",defaultOpen:""},{default:y(()=>[e("div",je,[o[17]||(o[17]=e("p",{class:"text-xs font-medium text-gray-500 dark:text-gray-400 mb-3"},"🎮 Virtual DOM diffing — Click to change items and see the diff",-1)),e("div",Be,[e("div",Ue,[o[14]||(o[14]=e("p",{class:"text-xs font-medium text-gray-400 mb-2"},"Old VDOM",-1)),e("div",Je,[(r(!0),a(g,null,f(t.vdomDemo.oldTree,s=>(r(),a("div",{key:s.id,class:"px-2 py-1.5 rounded text-xs font-mono bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-300"}," <"+n(s.tag)+"> "+n(s.text),1))),128))])]),e("div",qe,[o[15]||(o[15]=e("p",{class:"text-xs font-medium text-blue-400 mb-2"},"New VDOM",-1)),e("div",Ke,[(r(!0),a(g,null,f(t.vdomDemo.newTree,s=>(r(),a("div",{key:s.id,class:v(["px-2 py-1.5 rounded text-xs font-mono",s.changed?"bg-emerald-500/20 text-emerald-400 ring-1 ring-emerald-500/30":"bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-300"])}," <"+n(s.tag)+"> "+n(s.text)+" "+n(s.changed?"← changed":""),3))),128))])]),e("div",Ye,[o[16]||(o[16]=e("p",{class:"text-xs font-medium text-amber-400 mb-2"},"DOM Patches",-1)),e("div",Ge,[(r(!0),a(g,null,f(t.vdomDemo.patches,(s,i)=>(r(),a("div",{key:i,class:"px-2 py-1.5 rounded text-xs font-mono bg-amber-500/10 text-amber-400"},n(s),1))),128)),e("p",Ze,"Only "+n(t.vdomDemo.patches.length)+" update(s) instead of "+n(t.vdomDemo.oldTree.length)+" full re-renders",1)])])]),e("button",{onClick:t.shuffleVdomDemo,class:"px-4 py-2 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-sm font-medium transition-all"}," 🔀 Change State & Diff ")]),d(t.CodePlayground,{title:"virtual-dom.js",initialCode:t.codes.virtualDom},null,8,["initialCode"])]),_:1}),d(t.ConceptCard,{id:"bundlers",icon:"📦",title:"Bundlers: Webpack vs Vite",subtitle:"How your code gets packaged",definition:"Webpack: bundles everything upfront, uses loaders/plugins. Vite: uses native ES modules in dev (instant HMR), bundles with Rollup for production. Vite is 10-100x faster in dev because it skips bundling.",analogy:"Webpack is like cooking an entire feast before guests arrive (slow but thorough). Vite is like a sushi bar — it prepares each dish (module) on demand as guests order (browser requests).",seniorTip:"Use Vite for new projects. Understand Webpack for legacy maintenance. Know how to analyze bundle size, configure aliases, and set up environment variables in both."},{default:y(()=>[d(t.CodePlayground,{title:"bundlers.js",initialCode:t.codes.bundlers},null,8,["initialCode"])]),_:1})],64)):C("",!0)])])])}const it=K(Z,[["render",Qe]]);export{it as default};
