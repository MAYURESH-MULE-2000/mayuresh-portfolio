<template>
  <div class="learn-js min-h-screen">
    <!-- Header -->
    <div class="px-4 md:px-8 py-8 pb-4 max-w-6xl mx-auto">
      <a href="/learn" class="inline-flex items-center gap-1 text-sm text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors mb-4">
        ← Back to Topics
      </a>
      <div class="flex items-center gap-3 mb-2">
        <span class="text-3xl">⚡</span>
        <h1 class="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">JavaScript Core + Advanced</h1>
      </div>
      <p class="text-gray-500 dark:text-gray-400 text-sm md:text-base max-w-2xl">
        Interactive examples for every concept. Edit the code, hit Run, and see it live. Each example is designed to be unforgettable.
      </p>
    </div>

    <!-- Layout: Nav + Content -->
    <div class="px-4 md:px-8 max-w-6xl mx-auto flex flex-col lg:flex-row gap-6 pb-16">
      <SectionNav
        :sections="sections"
        :activeSection="activeSection"
        activeColor="bg-amber-600"
        @select="setSection"
        class="lg:w-56 flex-shrink-0"
      />

      <div class="flex-1 min-w-0 space-y-5">
        <!-- ==================== FUNDAMENTALS ==================== -->
        <template v-if="activeSection === 'fundamentals'">
          <ConceptCard
            id="var-let-const"
            icon="📦"
            title="var, let, const & Hoisting"
            subtitle="Scoping differences that bite you"
            definition="var is function-scoped and hoisted (initialized as undefined). let and const are block-scoped and hoisted but NOT initialized — accessing them before declaration throws a ReferenceError (the Temporal Dead Zone)."
            analogy="var is like a sticky note placed at the top of a room (function) — everyone can see it. let/const are like sticky notes inside a drawer (block) — only visible when the drawer is open."
            seniorTip="In production, always use const by default. Use let only when you need reassignment. Never use var — it creates bugs with closures in loops."
            defaultOpen
          >
            <CodePlayground
              title="var-vs-let.js"
              :initialCode="codes.varLetConst"
              :autoRun="true"
            />
          </ConceptCard>

          <ConceptCard
            id="closures"
            icon="🔒"
            title="Closures"
            subtitle="Functions that remember their birthplace"
            definition="A closure is when a function retains access to its outer scope's variables even after the outer function has returned. Every function in JS creates a closure."
            analogy="Imagine you leave home but carry a photo album of your room. The room (outer scope) is gone, but you still see everything in the photos (closure)."
            seniorTip="Closures are the backbone of data privacy, factory functions, and React hooks. In production, watch for accidental closures in loops — use let, not var."
          >
            <CodePlayground
              title="closures.js"
              :initialCode="codes.closures"
              :autoRun="true"
            />
            <!-- Interactive: Counter Factory -->
            <div class="p-4 rounded-xl bg-gray-100/80 dark:bg-white/5 border border-gray-200/50 dark:border-white/5">
              <p class="text-xs font-medium text-gray-500 dark:text-gray-400 mb-3">🎮 Try it: Each button has its own closed-over counter</p>
              <div class="flex flex-wrap gap-3">
                <button
                  v-for="(counter, i) in closureCounters"
                  :key="i"
                  @click="counter.count++"
                  class="px-4 py-2 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-600 dark:text-amber-400 font-mono text-sm transition-all active:scale-95"
                >
                  Counter {{ i + 1 }}: {{ counter.count }}
                </button>
                <button @click="resetClosureCounters" class="px-3 py-2 rounded-lg text-xs text-gray-400 hover:text-white hover:bg-white/5 transition-all">
                  Reset All
                </button>
              </div>
            </div>
          </ConceptCard>

          <ConceptCard
            id="execution-context"
            icon="📋"
            title="Execution Context & Call Stack"
            subtitle="How JS runs your code line by line"
            definition="When JS runs code, it creates an Execution Context (a container with: variable environment, scope chain, this). The Call Stack is a LIFO stack that tracks which execution context is currently running."
            analogy="Think of a stack of plates. Each function call adds a plate (context). When the function finishes, the plate is removed. JS always eats from the top plate."
            seniorTip="Understanding the call stack helps you debug stack overflow errors (infinite recursion) and understand why async callbacks run later — they wait until the stack is empty."
          >
            <CodePlayground
              title="call-stack.js"
              :initialCode="codes.callStack"
              :autoRun="true"
            />
          </ConceptCard>

          <ConceptCard
            id="event-loop"
            icon="🔄"
            title="Event Loop, Microtasks vs Macrotasks"
            subtitle="The heart of async JavaScript"
            definition="The Event Loop checks if the call stack is empty, then picks tasks from queues. Microtasks (Promise.then, queueMicrotask) run BEFORE macrotasks (setTimeout, setInterval). The loop: Call Stack → Microtasks (all) → 1 Macrotask → repeat."
            analogy="You're a chef (call stack). Microtasks are urgent orders (VIP) — you finish ALL of them before touching the next regular order (macrotask). Even if 100 VIPs come, they all go first."
            seniorTip="Promise.then is a microtask, setTimeout(..., 0) is a macrotask. That's why Promise resolves before setTimeout even with 0ms delay."
          >
            <CodePlayground
              title="event-loop.js"
              :initialCode="codes.eventLoop"
              :autoRun="false"
            />
            <!-- Visual Demo: Event Loop -->
            <div class="p-4 rounded-xl bg-gray-100/80 dark:bg-white/5 border border-gray-200/50 dark:border-white/5">
              <p class="text-xs font-medium text-gray-500 dark:text-gray-400 mb-3">🎮 Event Loop Visualizer — Watch the order</p>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
                <div class="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                  <p class="text-xs font-medium text-blue-400 mb-2">📚 Call Stack</p>
                  <div class="min-h-[60px] space-y-1">
                    <div v-for="item in eventLoopDemo.callStack" :key="item"
                      class="px-2 py-1 bg-blue-500/20 rounded text-xs font-mono text-blue-300 animate-pulse">
                      {{ item }}
                    </div>
                    <p v-if="!eventLoopDemo.callStack.length" class="text-xs text-gray-500 italic">Empty</p>
                  </div>
                </div>
                <div class="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                  <p class="text-xs font-medium text-purple-400 mb-2">⚡ Microtask Queue</p>
                  <div class="min-h-[60px] space-y-1">
                    <div v-for="item in eventLoopDemo.microtasks" :key="item"
                      class="px-2 py-1 bg-purple-500/20 rounded text-xs font-mono text-purple-300">
                      {{ item }}
                    </div>
                    <p v-if="!eventLoopDemo.microtasks.length" class="text-xs text-gray-500 italic">Empty</p>
                  </div>
                </div>
                <div class="p-3 rounded-lg bg-orange-500/10 border border-orange-500/20">
                  <p class="text-xs font-medium text-orange-400 mb-2">🕐 Macrotask Queue</p>
                  <div class="min-h-[60px] space-y-1">
                    <div v-for="item in eventLoopDemo.macrotasks" :key="item"
                      class="px-2 py-1 bg-orange-500/20 rounded text-xs font-mono text-orange-300">
                      {{ item }}
                    </div>
                    <p v-if="!eventLoopDemo.macrotasks.length" class="text-xs text-gray-500 italic">Empty</p>
                  </div>
                </div>
              </div>
              <div class="flex items-center gap-3 mb-3">
                <button @click="runEventLoopDemo"
                  class="px-4 py-2 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-600 dark:text-amber-400 text-sm font-medium transition-all"
                  :disabled="eventLoopDemo.running"
                >
                  {{ eventLoopDemo.running ? 'Running...' : '▶ Simulate' }}
                </button>
                <button @click="resetEventLoopDemo"
                  class="px-3 py-2 rounded-lg text-xs text-gray-400 hover:text-white hover:bg-white/5 transition-all">
                  Reset
                </button>
              </div>
              <div class="space-y-1">
                <div v-for="(log, i) in eventLoopDemo.output" :key="i"
                  class="text-xs font-mono px-2 py-1 rounded"
                  :class="log.includes('Micro') ? 'text-purple-400 bg-purple-500/5' : log.includes('Macro') ? 'text-orange-400 bg-orange-500/5' : 'text-blue-400 bg-blue-500/5'">
                  {{ i + 1 }}. {{ log }}
                </div>
              </div>
            </div>
          </ConceptCard>

          <ConceptCard
            id="this-keyword"
            icon="👆"
            title="this Keyword & Arrow vs Normal"
            subtitle="The most confusing thing in JS, demystified"
            definition="'this' depends on HOW a function is called, not WHERE it's defined. Arrow functions DON'T have their own 'this' — they inherit from the enclosing scope. Regular functions get 'this' from the call site."
            analogy="Imagine 'this' is a name tag. Normal functions get a new name tag at every party (call site). Arrow functions keep the name tag from home (parent scope) and never change it."
            seniorTip="Use arrow functions in callbacks/event handlers inside classes to avoid 'this' issues. In production, bind(this) or arrow functions — pick one pattern for your team."
          >
            <CodePlayground
              title="this-keyword.js"
              :initialCode="codes.thisKeyword"
              :autoRun="true"
            />
          </ConceptCard>

          <ConceptCard
            id="prototypal-inheritance"
            icon="🧬"
            title="Prototypal Inheritance"
            subtitle="How objects share behavior in JS"
            definition="Every JS object has a hidden [[Prototype]] link. When you access a property, JS looks up the prototype chain until it finds it or reaches null. This is how methods are shared without copying."
            analogy="Like a family tree: if you don't know a recipe, you ask your parent. If they don't know, they ask their parent. The chain goes up until someone knows or there's no one left to ask."
            seniorTip="In production, use class syntax for clarity, but know that under the hood it's still prototypal. Understanding this helps you debug instanceof checks and Object.create patterns."
          >
            <CodePlayground
              title="prototypes.js"
              :initialCode="codes.prototypes"
              :autoRun="true"
            />
          </ConceptCard>
        </template>

        <!-- ==================== ARRAY METHODS ==================== -->
        <template v-if="activeSection === 'arrays'">
          <ConceptCard
            id="map-filter-reduce"
            icon="🔗"
            title="map, filter, reduce — The Holy Trinity"
            subtitle="Transform, select, aggregate"
            definition="map() transforms each element and returns a new array. filter() selects elements passing a test. reduce() accumulates all elements into a single value. They never mutate the original array."
            analogy="map = a factory assembly line (transform each item). filter = a security gate (only qualified pass). reduce = a snowball rolling downhill (accumulates everything into one)."
            seniorTip="I'd use map for transformation because it keeps immutability intact, which is important for predictable state updates. Chain them declaratively: data.filter(...).map(...) reads like English."
            defaultOpen
          >
            <!-- Live Pipeline Demo -->
            <div class="p-4 rounded-xl bg-gray-100/80 dark:bg-white/5 border border-gray-200/50 dark:border-white/5 mb-3">
              <p class="text-xs font-medium text-gray-500 dark:text-gray-400 mb-3">🎮 Live Array Pipeline — Watch data flow through each step</p>
              <div class="space-y-3">
                <div class="flex items-center gap-2 flex-wrap">
                  <span class="text-xs text-gray-400">Input:</span>
                  <span v-for="n in pipelineInput" :key="n" class="px-2 py-1 bg-gray-200 dark:bg-white/10 rounded text-xs font-mono text-gray-700 dark:text-gray-300">{{ n }}</span>
                </div>
                <div class="flex items-center gap-1 text-gray-400">↓ <span class="text-xs">.filter(x => x > 2)</span></div>
                <div class="flex items-center gap-2 flex-wrap">
                  <span class="text-xs text-amber-500">Filtered:</span>
                  <span v-for="n in pipelineFiltered" :key="n" class="px-2 py-1 bg-amber-500/10 rounded text-xs font-mono text-amber-600 dark:text-amber-400">{{ n }}</span>
                </div>
                <div class="flex items-center gap-1 text-gray-400">↓ <span class="text-xs">.map(x => x * 10)</span></div>
                <div class="flex items-center gap-2 flex-wrap">
                  <span class="text-xs text-blue-500">Mapped:</span>
                  <span v-for="n in pipelineMapped" :key="n" class="px-2 py-1 bg-blue-500/10 rounded text-xs font-mono text-blue-600 dark:text-blue-400">{{ n }}</span>
                </div>
                <div class="flex items-center gap-1 text-gray-400">↓ <span class="text-xs">.reduce((sum, x) => sum + x, 0)</span></div>
                <div class="flex items-center gap-2">
                  <span class="text-xs text-emerald-500">Reduced:</span>
                  <span class="px-3 py-1.5 bg-emerald-500/10 rounded-lg text-sm font-mono font-bold text-emerald-600 dark:text-emerald-400">{{ pipelineReduced }}</span>
                </div>
              </div>
            </div>
            <CodePlayground
              title="array-methods.js"
              :initialCode="codes.arrayMethods"
              :autoRun="true"
            />
          </ConceptCard>

          <ConceptCard
            id="find-some-every"
            icon="🔍"
            title="find, some, every, sort"
            subtitle="Search and organize"
            definition="find() returns the first match (or undefined). some() returns true if ANY element passes. every() returns true only if ALL pass. sort() mutates the original array — use [...arr].sort() to avoid surprises."
            analogy="find = looking for your lost keys (stop at first match). some = 'Is ANYONE available?' (one yes is enough). every = 'Is EVERYONE ready?' (one no fails it)."
            seniorTip="sort() without a comparator converts to strings: [10, 2, 1].sort() gives [1, 10, 2]. Always pass a comparator: .sort((a,b) => a - b)."
          >
            <CodePlayground
              title="search-methods.js"
              :initialCode="codes.findSomeEvery"
              :autoRun="true"
            />
          </ConceptCard>

          <ConceptCard
            id="polyfill"
            icon="🔧"
            title="Write Your Own map() Polyfill"
            subtitle="Interview classic — prove you understand the internals"
            definition="A polyfill is code that provides missing functionality. Writing Array.prototype.map from scratch proves you understand: this binding, callback signature (element, index, array), and returning a new array."
            analogy="It's like building a LEGO replica of a car — you already know what it should do, now prove you understand how each piece fits."
            seniorTip="In production, you wouldn't write polyfills manually — you'd use core-js or Babel. But showing you CAN write one signals deep understanding."
          >
            <CodePlayground
              title="map-polyfill.js"
              :initialCode="codes.polyfill"
              :autoRun="true"
            />
          </ConceptCard>

          <ConceptCard
            id="flat-flatmap"
            icon="📐"
            title="flat() & flatMap()"
            subtitle="Flatten nested structures"
            definition="flat(depth) flattens nested arrays by the specified depth (default 1). flatMap() first maps, then flattens one level — perfect for one-to-many transformations."
            analogy="flat() is like ironing wrinkled clothes — each pass removes one level of wrinkle. flatMap() is like unboxing packages that each contain multiple items."
          >
            <CodePlayground
              title="flat-methods.js"
              :initialCode="codes.flatMethods"
              :autoRun="true"
            />
          </ConceptCard>
        </template>

        <!-- ==================== ASYNC JAVASCRIPT ==================== -->
        <template v-if="activeSection === 'async'">
          <ConceptCard
            id="promises"
            icon="🤝"
            title="Promises & async/await"
            subtitle="Taming asynchronous code"
            definition="A Promise is an object representing a future value. It's either pending, fulfilled, or rejected. async/await is syntactic sugar over Promises — it makes async code look synchronous."
            analogy="A Promise is like ordering food online: you get a tracking number (Promise). It's 'pending' during delivery. It 'fulfills' when you get food. It 'rejects' if the order is cancelled."
            seniorTip="Always handle errors with try/catch in async functions. Unhandled promise rejections crash Node.js processes and get silently swallowed in browsers."
            defaultOpen
          >
            <CodePlayground
              title="promises.js"
              :initialCode="codes.promises"
              :autoRun="true"
            />
          </ConceptCard>

          <ConceptCard
            id="promise-all-race"
            icon="🏁"
            title="Promise.all, Promise.race, Promise.allSettled"
            subtitle="Running async operations in parallel"
            definition="Promise.all() waits for ALL promises — fails fast on any rejection. Promise.race() resolves/rejects with the FIRST settled promise. Promise.allSettled() waits for ALL, never short-circuits, gives you status of each."
            analogy="Promise.all = group project — if ONE person fails, the whole project fails. Promise.race = a race — only the first finisher matters. Promise.allSettled = teacher collecting all papers — doesn't matter if some are blank."
            seniorTip="Use Promise.allSettled when you need results from all operations even if some fail (e.g., fetching data from multiple APIs). Use Promise.all when all must succeed."
          >
            <CodePlayground
              title="promise-combinators.js"
              :initialCode="codes.promiseAll"
              :autoRun="true"
            />
          </ConceptCard>

          <ConceptCard
            id="debounce-throttle"
            icon="⏱️"
            title="Debounce & Throttle"
            subtitle="Control the rate of function execution"
            definition="Debounce: waits until the user STOPS doing something for X ms, then fires once. Throttle: fires at most once every X ms, no matter how many times triggered."
            analogy="Debounce = elevator door — it waits until everyone stops pressing the button, then closes. Throttle = a bus — it departs every 10 minutes regardless of how many people arrive."
            seniorTip="Use debounce for search inputs (wait until user stops typing). Use throttle for scroll/resize events (fire at consistent intervals). In production, I'd handle edge cases like leading/trailing edge options."
          >
            <CodePlayground
              title="debounce-throttle.js"
              :initialCode="codes.debounceThrottle"
            />
            <!-- Interactive Demo -->
            <div class="p-4 rounded-xl bg-gray-100/80 dark:bg-white/5 border border-gray-200/50 dark:border-white/5">
              <p class="text-xs font-medium text-gray-500 dark:text-gray-400 mb-3">🎮 Move your mouse over the box — compare raw vs debounced vs throttled</p>
              <div
                @mousemove="handleMouseMove"
                @touchmove="handleMouseMove"
                class="relative h-24 rounded-xl bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 flex items-center justify-center cursor-crosshair select-none"
              >
                <span class="text-sm text-amber-400/60">Move mouse here</span>
              </div>
              <div class="grid grid-cols-3 gap-3 mt-3">
                <div class="text-center p-3 rounded-lg bg-red-500/5 border border-red-500/10">
                  <p class="text-2xl font-mono font-bold text-red-400">{{ mouseDemo.raw }}</p>
                  <p class="text-xs text-gray-400 mt-1">Raw events</p>
                </div>
                <div class="text-center p-3 rounded-lg bg-blue-500/5 border border-blue-500/10">
                  <p class="text-2xl font-mono font-bold text-blue-400">{{ mouseDemo.debounced }}</p>
                  <p class="text-xs text-gray-400 mt-1">Debounced (300ms)</p>
                </div>
                <div class="text-center p-3 rounded-lg bg-emerald-500/5 border border-emerald-500/10">
                  <p class="text-2xl font-mono font-bold text-emerald-400">{{ mouseDemo.throttled }}</p>
                  <p class="text-xs text-gray-400 mt-1">Throttled (300ms)</p>
                </div>
              </div>
              <button @click="mouseDemo.raw = 0; mouseDemo.debounced = 0; mouseDemo.throttled = 0"
                class="mt-2 px-3 py-1.5 text-xs text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-all">
                Reset counters
              </button>
            </div>
          </ConceptCard>

          <ConceptCard
            id="error-handling"
            icon="🛡️"
            title="Error Handling in Async"
            subtitle="Catch errors before they crash your app"
            definition="In async/await, wrap calls in try/catch. For Promises, chain .catch(). Always provide a fallback — unhandled rejections are the #1 source of production bugs in modern JS apps."
            analogy="Error handling is like wearing a seatbelt — you hope you never need it, but when you do, it saves everything."
            seniorTip="Create a centralized error handler. In production, I'd log errors to a service like Sentry and show user-friendly messages instead of raw error objects."
          >
            <CodePlayground
              title="error-handling.js"
              :initialCode="codes.errorHandling"
              :autoRun="true"
            />
          </ConceptCard>
        </template>

        <!-- ==================== DOM & BROWSER ==================== -->
        <template v-if="activeSection === 'dom'">
          <ConceptCard
            id="event-delegation"
            icon="🎯"
            title="Event Delegation, Bubbling & Capturing"
            subtitle="One listener to rule them all"
            definition="Events travel in 3 phases: Capturing (root → target), Target, Bubbling (target → root). Event delegation: instead of adding listeners to each child, add ONE to the parent and use event.target to identify the clicked element."
            analogy="Event delegation is like a receptionist: instead of each employee answering their own door (one listener per element), the receptionist (parent) handles all visitors and routes them."
            seniorTip="Event delegation reduces memory usage and works with dynamically added elements. In production, I'd use it for lists, tables, and any repeating UI patterns."
            defaultOpen
          >
            <!-- Interactive: Clickable Boxes -->
            <div class="p-4 rounded-xl bg-gray-100/80 dark:bg-white/5 border border-gray-200/50 dark:border-white/5">
              <p class="text-xs font-medium text-gray-500 dark:text-gray-400 mb-3">🎮 Click any box — the parent catches ALL clicks via delegation</p>
              <div
                @click="handleDelegation"
                class="grid grid-cols-3 gap-2 mb-3"
              >
                <div
                  v-for="n in 9"
                  :key="n"
                  :data-box="n"
                  class="aspect-square rounded-lg flex items-center justify-center font-mono text-sm font-bold cursor-pointer transition-all duration-200 active:scale-95"
                  :class="delegationClicked === n
                    ? 'bg-amber-500 text-white scale-95'
                    : 'bg-gray-200 dark:bg-white/10 text-gray-500 dark:text-gray-400 hover:bg-amber-500/20'"
                >
                  {{ n }}
                </div>
              </div>
              <p class="text-xs font-mono text-gray-400">
                <span v-if="delegationClicked">
                  ✓ Parent caught click on <span class="text-amber-400">Box {{ delegationClicked }}</span> via event.target.dataset.box
                </span>
                <span v-else>Click any box above...</span>
              </p>
            </div>

            <CodePlayground
              title="event-delegation.js"
              :initialCode="codes.eventDelegation"
            />
          </ConceptCard>

          <ConceptCard
            id="reflow-repaint"
            icon="🖼️"
            title="Reflows, Repaints & Rendering Pipeline"
            subtitle="Why some DOM changes are expensive"
            definition="Reflow (Layout): recalculates positions when geometry changes (width, height, position). Repaint: re-draws pixels when visual properties change (color, shadow). Reflows are expensive because they trigger repaints too."
            analogy="Repaint = repainting a wall (cheap). Reflow = knocking down a wall and rebuilding (expensive — everything around it shifts too)."
            seniorTip="Batch DOM reads/writes to avoid layout thrashing. Use transform/opacity for animations (GPU-composited, skip reflow). In production, use will-change and requestAnimationFrame."
          >
            <CodePlayground
              title="rendering.js"
              :initialCode="codes.reflowRepaint"
            />
          </ConceptCard>

          <ConceptCard
            id="memory-leaks"
            icon="💧"
            title="Preventing Memory Leaks"
            subtitle="Common leaks and how to fix them"
            definition="Memory leaks occur when objects that are no longer needed stay in memory. Common causes: forgotten event listeners, closures holding large objects, uncleared timers, and detached DOM nodes."
            analogy="A memory leak is like leaving the faucet running — the water (memory) keeps accumulating until the sink (browser tab) overflows."
            seniorTip="Always removeEventListener on component unmount. Clear setInterval/setTimeout. In frameworks, use cleanup functions in useEffect (React) or onUnmounted (Vue)."
          >
            <CodePlayground
              title="memory-leaks.js"
              :initialCode="codes.memoryLeaks"
            />
          </ConceptCard>
        </template>

        <!-- ==================== ES6+ MODULES ==================== -->
        <template v-if="activeSection === 'es6'">
          <ConceptCard
            id="modules"
            icon="📦"
            title="ES6 Modules — import/export"
            subtitle="Organizing code into reusable pieces"
            definition="ES6 Modules use import/export for static, analyzable dependencies. Named exports (multiple per file), default export (one per file). They're statically analyzed at parse time, enabling tree shaking."
            analogy="Modules are like shipping containers: each one is sealed (own scope), clearly labeled (exports), and you only unpack what you need (named imports)."
            seniorTip="Use named exports for better tree shaking and refactoring. Default exports make renaming easy but hurt discoverability. In production, barrel files (index.ts re-exports) help organize large projects."
            defaultOpen
          >
            <CodePlayground
              title="modules.js"
              :initialCode="codes.modules"
            />
          </ConceptCard>

          <ConceptCard
            id="destructuring"
            icon="🧩"
            title="Destructuring, Spread & Rest"
            subtitle="Extract and combine with elegance"
            definition="Destructuring extracts values from objects/arrays. Spread (...) expands iterables. Rest (...) collects remaining elements. They make code more readable and reduce temporary variables."
            analogy="Destructuring is like opening a gift box and taking out exactly what you want by name. Spread is pouring the box contents onto the table. Rest is sweeping everything else into a bag."
          >
            <CodePlayground
              title="destructuring.js"
              :initialCode="codes.destructuring"
              :autoRun="true"
            />
          </ConceptCard>

          <ConceptCard
            id="optional-chaining"
            icon="❓"
            title="Optional Chaining & Nullish Coalescing"
            subtitle="Safe navigation through nested objects"
            definition="Optional chaining (?.) short-circuits to undefined if a link is null/undefined. Nullish coalescing (??) provides a default only for null/undefined (not for '' or 0, unlike ||)."
            analogy="Optional chaining is like knocking on a door — if no one is home (?. returns undefined), you don't break in, you just leave. ?? is 'use this backup key ONLY if there's truly no one home'."
          >
            <CodePlayground
              title="optional-chaining.js"
              :initialCode="codes.optionalChaining"
              :autoRun="true"
            />
          </ConceptCard>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import SectionNav from './SectionNav.vue'
import ConceptCard from './ConceptCard.vue'
import CodePlayground from './CodePlayground.vue'

// ==================== Section Navigation ====================
const sections = [
  { id: 'fundamentals', label: 'Fundamentals', icon: '📦', badge: '6' },
  { id: 'arrays', label: 'Array Methods', icon: '🔗', badge: '4' },
  { id: 'async', label: 'Async JS', icon: '⏳', badge: '4' },
  { id: 'dom', label: 'DOM & Browser', icon: '🌐', badge: '3' },
  { id: 'es6', label: 'ES6+ Features', icon: '✨', badge: '3' },
]

const activeSection = ref('fundamentals')

function setSection(id) {
  activeSection.value = id
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

// ==================== Interactive Demos ====================

// Closure counters
const closureCounters = reactive([
  { count: 0 }, { count: 0 }, { count: 0 }
])
function resetClosureCounters() {
  closureCounters.forEach(c => c.count = 0)
}

// Event Loop Demo
const eventLoopDemo = reactive({
  callStack: [],
  microtasks: [],
  macrotasks: [],
  output: [],
  running: false
})

async function runEventLoopDemo() {
  eventLoopDemo.running = true
  eventLoopDemo.output = []
  eventLoopDemo.callStack = []
  eventLoopDemo.microtasks = []
  eventLoopDemo.macrotasks = []

  const steps = [
    { action: () => { eventLoopDemo.callStack = ['console.log("Start")']; eventLoopDemo.output.push('Sync: console.log("Start")') }, delay: 600 },
    { action: () => { eventLoopDemo.macrotasks = ['setTimeout callback']; eventLoopDemo.callStack = ['setTimeout(...)'] }, delay: 600 },
    { action: () => { eventLoopDemo.microtasks = ['Promise.then callback']; eventLoopDemo.callStack = ['Promise.resolve().then(...)'] }, delay: 600 },
    { action: () => { eventLoopDemo.callStack = ['console.log("End")']; eventLoopDemo.output.push('Sync: console.log("End")') }, delay: 600 },
    { action: () => { eventLoopDemo.callStack = ['Promise.then callback']; eventLoopDemo.microtasks = []; eventLoopDemo.output.push('Microtask: Promise.then callback') }, delay: 800 },
    { action: () => { eventLoopDemo.callStack = ['setTimeout callback']; eventLoopDemo.macrotasks = []; eventLoopDemo.output.push('Macrotask: setTimeout callback') }, delay: 800 },
    { action: () => { eventLoopDemo.callStack = [] }, delay: 400 },
  ]

  for (const step of steps) {
    await new Promise(r => setTimeout(r, step.delay))
    step.action()
  }

  eventLoopDemo.running = false
}

function resetEventLoopDemo() {
  eventLoopDemo.callStack = []
  eventLoopDemo.microtasks = []
  eventLoopDemo.macrotasks = []
  eventLoopDemo.output = []
  eventLoopDemo.running = false
}

// Array Pipeline Demo
const pipelineInput = [1, 2, 3, 4, 5, 6, 7, 8]
const pipelineFiltered = pipelineInput.filter(x => x > 2)
const pipelineMapped = pipelineFiltered.map(x => x * 10)
const pipelineReduced = pipelineMapped.reduce((sum, x) => sum + x, 0)

// Event Delegation Demo
const delegationClicked = ref(null)
function handleDelegation(e) {
  const box = e.target.closest('[data-box]')
  if (box) delegationClicked.value = parseInt(box.dataset.box)
}

// Debounce/Throttle Mouse Demo
const mouseDemo = reactive({ raw: 0, debounced: 0, throttled: 0 })
let debounceTimer = null
let throttleReady = true

function handleMouseMove() {
  mouseDemo.raw++

  // Debounce
  clearTimeout(debounceTimer)
  debounceTimer = setTimeout(() => { mouseDemo.debounced++ }, 300)

  // Throttle
  if (throttleReady) {
    throttleReady = false
    mouseDemo.throttled++
    setTimeout(() => { throttleReady = true }, 300)
  }
}

// ==================== Code Examples ====================
const codes = {
  varLetConst: `// 🔹 var: function-scoped, hoisted as undefined
console.log(a); // undefined (hoisted!)
var a = 10;

// 🔹 let: block-scoped, NOT initialized
// console.log(b); // ❌ ReferenceError: TDZ!
let b = 20;

// 🔹 const: block-scoped, cannot reassign
const c = 30;
// c = 40; // ❌ TypeError!

// 🔹 The classic loop trap
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log("var i =", i), 0);
}
// All print 3! Because var is function-scoped.

for (let j = 0; j < 3; j++) {
  setTimeout(() => console.log("let j =", j), 0);
}
// Prints 0, 1, 2 — let creates a new binding per iteration.`,

  closures: `// A closure = function + its outer scope
function createCounter(start) {
  let count = start; // This variable is "closed over"
  return {
    increment: () => ++count,
    decrement: () => --count,
    getCount: () => count,
  };
}

const counter = createCounter(10);
console.log(counter.increment()); // 11
console.log(counter.increment()); // 12
console.log(counter.decrement()); // 11
console.log(counter.getCount());  // 11

// The 'count' variable is private!
// You can't access it directly — only through the methods.
// This is the MODULE PATTERN — closures enable data privacy.`,

  callStack: `function third() {
  console.log("3️⃣ third() — top of stack");
}

function second() {
  console.log("2️⃣ second() — calls third");
  third();
  console.log("2️⃣ second() — after third returns");
}

function first() {
  console.log("1️⃣ first() — calls second");
  second();
  console.log("1️⃣ first() — after second returns");
}

first();
// Stack: first → second → third → (unwind)`,

  eventLoop: `// Prediction challenge: What order do these print?
// Try to guess BEFORE running!

console.log("1. Synchronous");

setTimeout(() => console.log("2. setTimeout (macrotask)"), 0);

Promise.resolve().then(() => console.log("3. Promise.then (microtask)"));

console.log("4. Synchronous");

// Answer: 1 → 4 → 3 → 2
// Why? Microtasks (Promise) run before macrotasks (setTimeout)`,

  thisKeyword: `// 🔹 Regular function: 'this' depends on CALLER
const obj = {
  name: "Mayuresh",
  greet: function() {
    console.log("Regular:", this.name); // "Mayuresh"
  },
  greetArrow: () => {
    // Arrow inherits 'this' from enclosing scope (module/global)
    console.log("Arrow:", typeof this); // object (window) or undefined
  }
};

obj.greet();      // ✅ this = obj
obj.greetArrow(); // ❌ this != obj

// 🔹 The callback trap
const user = {
  name: "Mayuresh",
  friends: ["Alice", "Bob"],
  showFriends() {
    // Arrow function inherits 'this' from showFriends
    this.friends.forEach(f => {
      console.log(this.name + " knows " + f); // ✅ Works!
    });
  }
};
user.showFriends();`,

  prototypes: `// Every object has a [[Prototype]] chain
const animal = {
  breathe() { return "breathing..."; }
};

const dog = Object.create(animal);
dog.bark = function() { return "Woof!"; };

console.log(dog.bark());    // "Woof!" — own property
console.log(dog.breathe()); // "breathing..." — from prototype

// Class syntax (same thing under the hood)
class Vehicle {
  constructor(type) { this.type = type; }
  describe() { return "I am a " + this.type; }
}

class Car extends Vehicle {
  honk() { return "Beep!"; }
}

const myCar = new Car("sedan");
console.log(myCar.describe()); // From Vehicle prototype
console.log(myCar.honk());    // From Car prototype
console.log(myCar instanceof Vehicle); // true`,

  arrayMethods: `const numbers = [1, 2, 3, 4, 5, 6, 7, 8];

// map: transform each element → new array
const doubled = numbers.map(n => n * 2);
console.log("map:", doubled);

// filter: keep elements passing test → new array
const evens = numbers.filter(n => n % 2 === 0);
console.log("filter:", evens);

// reduce: accumulate into single value
const sum = numbers.reduce((acc, n) => acc + n, 0);
console.log("reduce sum:", sum);

// 🔥 Chain them! (Declarative programming)
const result = numbers
  .filter(n => n > 3)         // [4, 5, 6, 7, 8]
  .map(n => n * 10)           // [40, 50, 60, 70, 80]
  .reduce((sum, n) => sum + n, 0);  // 300

console.log("Chained result:", result);`,

  findSomeEvery: `const users = [
  { name: "Alice", age: 28, active: true },
  { name: "Bob", age: 34, active: false },
  { name: "Charlie", age: 22, active: true },
];

// find: first match or undefined
const found = users.find(u => u.age > 25);
console.log("find:", found.name); // "Alice"

// some: does ANY match?
console.log("some active?", users.some(u => u.active)); // true

// every: do ALL match?
console.log("all active?", users.every(u => u.active)); // false

// sort: ⚠️ MUTATES! Use spread to avoid
const nums = [10, 1, 21, 2];
console.log("Bad sort:", [...nums].sort());           // [1, 10, 2, 21] 😱
console.log("Good sort:", [...nums].sort((a, b) => a - b)); // [1, 2, 10, 21] ✅`,

  polyfill: `// Write your own Array.prototype.map
Array.prototype.myMap = function(callback) {
  const result = [];
  for (let i = 0; i < this.length; i++) {
    // callback receives: element, index, original array
    result.push(callback(this[i], i, this));
  }
  return result;
};

// Test it!
const nums = [1, 2, 3, 4];
const squared = nums.myMap(x => x * x);
console.log("myMap result:", squared); // [1, 4, 9, 16]

// Verify it matches native map
const native = nums.map(x => x * x);
console.log("Native match:", JSON.stringify(squared) === JSON.stringify(native));`,

  flatMethods: `// flat: flatten nested arrays
const nested = [1, [2, 3], [4, [5, 6]]];
console.log("flat(1):", nested.flat());     // [1, 2, 3, 4, [5, 6]]
console.log("flat(2):", nested.flat(2));     // [1, 2, 3, 4, 5, 6]
console.log("flat(∞):", nested.flat(Infinity)); // [1, 2, 3, 4, 5, 6]

// flatMap: map + flat(1) in one step
const sentences = ["Hello world", "Goodbye moon"];
const words = sentences.flatMap(s => s.split(" "));
console.log("flatMap:", words); // ["Hello", "world", "Goodbye", "moon"]

// Real use case: one-to-many transformation
const orders = [
  { id: 1, items: ["🍕", "🍔"] },
  { id: 2, items: ["🌮", "🌯", "🥤"] },
];
const allItems = orders.flatMap(o => o.items);
console.log("All items:", allItems);`,

  promises: `// Creating a Promise
function fetchUser(id) {
  return new Promise((resolve, reject) => {
    // Simulating API call
    if (id > 0) {
      resolve({ id, name: "Mayuresh", role: "Frontend Dev" });
    } else {
      reject(new Error("Invalid user ID"));
    }
  });
}

// Using .then/.catch
fetchUser(1)
  .then(user => console.log(".then:", user.name))
  .catch(err => console.log("Error:", err.message));

// Using async/await (same thing, cleaner syntax)
async function getUser() {
  try {
    const user = await fetchUser(1);
    console.log("await:", user.name, "-", user.role);
  } catch (err) {
    console.error("Error:", err.message);
  }
}
getUser();`,

  promiseAll: `// Helper: simulate async operation
const delay = (name, ms, fail = false) =>
  new Promise((resolve, reject) => {
    if (fail) reject(new Error(name + " failed!"));
    else resolve(name + " done (" + ms + "ms)");
  });

// Promise.all: ALL must succeed
Promise.all([
  delay("API 1", 100),
  delay("API 2", 200),
  delay("API 3", 50),
]).then(results => console.log("all:", results));

// Promise.race: first to settle wins
Promise.race([
  delay("Fast", 50),
  delay("Slow", 500),
]).then(winner => console.log("race:", winner));

// Promise.allSettled: get ALL results, even failures
Promise.allSettled([
  delay("Success", 100),
  delay("Failure", 50, true),
  delay("Success2", 200),
]).then(results => {
  results.forEach(r => {
    console.log(r.status + ":", r.value || r.reason?.message);
  });
});`,

  debounceThrottle: `// 🔹 Debounce: delay until "calm"
function debounce(fn, delay) {
  let timer;
  return function(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

// 🔹 Throttle: at most once per interval
function throttle(fn, interval) {
  let lastTime = 0;
  return function(...args) {
    const now = Date.now();
    if (now - lastTime >= interval) {
      lastTime = now;
      fn.apply(this, args);
    }
  };
}

// Test them
const debouncedLog = debounce(
  (msg) => console.log("Debounced:", msg), 300
);
const throttledLog = throttle(
  (msg) => console.log("Throttled:", msg), 300
);

// Simulate rapid calls
for (let i = 0; i < 5; i++) {
  debouncedLog("call " + i); // Only last one fires
  throttledLog("call " + i); // First one fires immediately
}`,

  errorHandling: `// ❌ BAD: Unhandled rejection
// fetchData().then(data => use(data));
// If fetchData rejects, error is SWALLOWED!

// ✅ GOOD: Always handle errors
async function safeFetch(url) {
  try {
    // Simulating fetch
    if (url.includes("bad")) {
      throw new Error("Network error: " + url);
    }
    return { data: "Response from " + url };
  } catch (error) {
    console.log("❌ Caught:", error.message);
    // In production: log to Sentry, show toast notification
    return { data: null, error: error.message };
  } finally {
    console.log("✅ Cleanup: always runs (like a finally block)");
  }
}

// Test with good and bad URLs
async function run() {
  const good = await safeFetch("https://api.example.com/users");
  console.log("Good:", good);

  const bad = await safeFetch("https://bad.example.com");
  console.log("Bad:", bad);
}
run();`,

  eventDelegation: `// ❌ BAD: One listener per button
// document.querySelectorAll('.btn').forEach(btn => {
//   btn.addEventListener('click', handleClick);
// });
// Problem: 1000 buttons = 1000 listeners! 💀

// ✅ GOOD: One listener on parent (Event Delegation)
// document.getElementById('button-container')
//   .addEventListener('click', (e) => {
//     const btn = e.target.closest('[data-action]');
//     if (!btn) return;
//
//     console.log('Clicked:', btn.dataset.action);
//     // Works for dynamically added buttons too!
//   });

// How bubbling works:
console.log("Events bubble: child → parent → grandparent");
console.log("Click on inner div triggers ALL parent listeners");
console.log("Use e.stopPropagation() to stop bubbling");
console.log("Use { capture: true } to listen during capture phase");`,

  reflowRepaint: `// 🔴 BAD: Layout Thrashing (forced sync layout)
// Reading then writing in a loop forces reflow each time
// for (let i = 0; i < 100; i++) {
//   const height = el.offsetHeight; // READ (forces layout)
//   el.style.height = height + 1 + 'px'; // WRITE (invalidates)
// }

// ✅ GOOD: Batch reads, then batch writes
// const heights = elements.map(el => el.offsetHeight); // All reads
// elements.forEach((el, i) => {
//   el.style.height = heights[i] + 1 + 'px'; // All writes
// });

// What triggers reflow vs repaint?
console.log("🔴 REFLOW triggers (expensive):");
console.log("  width, height, padding, margin, position");
console.log("  offsetTop, scrollTop, getBoundingClientRect()");
console.log("");
console.log("🟡 REPAINT triggers (moderate):");
console.log("  color, background, box-shadow, border-color");
console.log("");
console.log("🟢 COMPOSITE-only (cheap — GPU accelerated):");
console.log("  transform, opacity");
console.log("");
console.log("💡 TIP: animate with transform & opacity only!");`,

  memoryLeaks: `// Common memory leak sources and fixes

// 1️⃣ Forgotten event listeners
// ❌ BAD:
// element.addEventListener('click', handler);
// // Element removed, but listener still references it!

// ✅ GOOD:
// element.addEventListener('click', handler);
// element.removeEventListener('click', handler); // On cleanup

// 2️⃣ Uncleared timers
// ❌ BAD:
// setInterval(() => updateData(), 1000);
// // Never cleared even when component unmounts!

// ✅ GOOD:
// const id = setInterval(() => updateData(), 1000);
// clearInterval(id); // On cleanup

// 3️⃣ Closures holding large objects
function demo() {
  // ❌ BAD: closure keeps 'hugeData' alive
  // const hugeData = new Array(1000000);
  // return () => console.log(hugeData.length);

  // ✅ GOOD: extract only what you need
  const length = 1000000; // Just the value
  return () => console.log("Length:", length);
}

const fn = demo();
fn();

console.log("✅ Always clean up: listeners, timers, references");
console.log("✅ Use WeakMap/WeakSet for object references");
console.log("✅ In Vue: onUnmounted(), In React: useEffect cleanup");`,

  modules: `// ES6 Modules (can't actually run import/export here,
// but showing the syntax)

// 📁 math.js — Named exports
// export const add = (a, b) => a + b;
// export const multiply = (a, b) => a * b;
// export const PI = 3.14159;

// 📁 logger.js — Default export
// export default function log(msg) {
//   console.log('[LOG]', msg);
// }

// 📁 app.js — Importing
// import log from './logger.js';          // Default
// import { add, PI } from './math.js';    // Named
// import * as math from './math.js';      // Namespace

// Key differences from CommonJS:
console.log("ES6 Modules vs CommonJS:");
console.log("• ES6: static imports (analyzed at parse time)");
console.log("• CJS: dynamic require() (evaluated at runtime)");
console.log("• ES6: enables tree shaking (dead code removal)");
console.log("• CJS: no tree shaking possible");
console.log("");
console.log("💡 Rule: Use named exports for tree shaking");
console.log("💡 Use barrel files (index.ts) for organization");`,

  destructuring: `// Object destructuring
const user = { name: "Mayuresh", age: 25, city: "Mumbai", role: "Frontend" };

const { name, age, city: location } = user; // Rename 'city' to 'location'
console.log(name, age, location);

// Default values
const { role, company = "Freelance" } = user;
console.log(role, company); // "Frontend", "Freelance"

// Nested destructuring
const response = { data: { users: [{ id: 1, name: "Alice" }] } };
const { data: { users: [firstUser] } } = response;
console.log("First user:", firstUser);

// Array destructuring + swap
let a = 1, b = 2;
[a, b] = [b, a];
console.log("Swapped:", a, b); // 2, 1

// Spread: clone & merge
const original = { x: 1, y: 2 };
const clone = { ...original, z: 3 };
console.log("Spread:", clone);

// Rest: collect remaining
const [first, ...rest] = [1, 2, 3, 4, 5];
console.log("First:", first, "Rest:", rest);`,

  optionalChaining: `// Without optional chaining (old way)
const user = {
  profile: {
    address: { city: "Mumbai" }
  }
};

// ❌ Verbose null checks
// const city = user && user.profile && user.profile.address
//   && user.profile.address.city;

// ✅ Optional chaining
const city = user?.profile?.address?.city;
console.log("City:", city); // "Mumbai"

// When property doesn't exist
const zip = user?.profile?.address?.zip;
console.log("Zip:", zip); // undefined (no error!)

// Works with methods and arrays too
const arr = [1, 2, 3];
console.log("Array:", arr?.[0]); // 1
console.log("Method:", arr?.map?.(x => x * 2)); // [2, 4, 6]

// Nullish coalescing ??
const port = null ?? 3000;
console.log("Port:", port); // 3000

// ?? vs || (important difference!)
const count = 0;
console.log("|| :", count || 10);  // 10 (0 is falsy!)
console.log("?? :", count ?? 10);  // 0  (only null/undefined)`,
}
</script>
