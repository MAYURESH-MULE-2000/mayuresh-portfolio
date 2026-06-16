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
            definition="var is function-scoped and hoisted (initialized as undefined). let and const are block-scoped and hoisted but NOT initialized - accessing them before declaration throws a ReferenceError (the Temporal Dead Zone)."
            analogy="var is like a sticky note placed at the top of a room (function) - everyone can see it. let/const are like sticky notes inside a drawer (block) - only visible when the drawer is open."
            seniorTip="In production, always use const by default. Use let only when you need reassignment. Never use var - it creates bugs with closures in loops."
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
            seniorTip="Closures are the backbone of data privacy, factory functions, and React hooks. In production, watch for accidental closures in loops - use let, not var."
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
            seniorTip="Understanding the call stack helps you debug stack overflow errors (infinite recursion) and understand why async callbacks run later - they wait until the stack is empty."
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
            analogy="You're a chef (call stack). Microtasks are urgent orders (VIP) - you finish ALL of them before touching the next regular order (macrotask). Even if 100 VIPs come, they all go first."
            seniorTip="Promise.then is a microtask, setTimeout(..., 0) is a macrotask. That's why Promise resolves before setTimeout even with 0ms delay."
          >
            <CodePlayground
              title="event-loop.js"
              :initialCode="codes.eventLoop"
              :autoRun="false"
            />
            <!-- Visual Demo: Event Loop -->
            <div class="p-4 rounded-xl bg-gray-100/80 dark:bg-white/5 border border-gray-200/50 dark:border-white/5">
              <p class="text-xs font-medium text-gray-500 dark:text-gray-400 mb-3">🎮 Event Loop Visualizer - Watch the order</p>
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
            definition="'this' depends on HOW a function is called, not WHERE it's defined. Arrow functions DON'T have their own 'this' - they inherit from the enclosing scope. Regular functions get 'this' from the call site."
            analogy="Imagine 'this' is a name tag. Normal functions get a new name tag at every party (call site). Arrow functions keep the name tag from home (parent scope) and never change it."
            seniorTip="Use arrow functions in callbacks/event handlers inside classes to avoid 'this' issues. In production, bind(this) or arrow functions - pick one pattern for your team."
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

          <ConceptCard
            id="loops"
            icon="🔁"
            title="Loops: for, for...of, for...in, while"
            subtitle="Every loop type and when to use which"
            definition="for: classic counter loop. for...of: iterates over values (arrays, strings, Maps, Sets). for...in: iterates over keys (object properties - includes inherited!). while: condition-based loop. forEach: array method, cannot break out. for...of is the modern standard for iteration."
            analogy="for = counting steps on a staircase. for...of = reading each page of a book. for...in = opening each drawer in a cabinet (including inherited drawers from grandma). forEach = a guided tour - you can't leave early."
            seniorTip="Use for...of for arrays (it works with break/continue). Use Object.keys/values/entries for objects instead of for...in (avoids prototype issues). forEach can't be broken - use for...of if you need early exit. Never use for...in on arrays!"
          >
            <CodePlayground
              title="loops.js"
              :initialCode="codes.loops"
              :autoRun="true"
            />
          </ConceptCard>
        </template>

        <!-- ==================== ARRAY METHODS ==================== -->
        <template v-if="activeSection === 'arrays'">
          <ConceptCard
            id="map-filter-reduce"
            icon="🔗"
            title="map, filter, reduce - The Holy Trinity"
            subtitle="Transform, select, aggregate"
            definition="map() transforms each element and returns a new array. filter() selects elements passing a test. reduce() accumulates all elements into a single value. They never mutate the original array."
            analogy="map = a factory assembly line (transform each item). filter = a security gate (only qualified pass). reduce = a snowball rolling downhill (accumulates everything into one)."
            seniorTip="I'd use map for transformation because it keeps immutability intact, which is important for predictable state updates. Chain them declaratively: data.filter(...).map(...) reads like English."
            defaultOpen
          >
            <!-- Live Pipeline Demo -->
            <div class="p-4 rounded-xl bg-gray-100/80 dark:bg-white/5 border border-gray-200/50 dark:border-white/5 mb-3">
              <p class="text-xs font-medium text-gray-500 dark:text-gray-400 mb-3">🎮 Live Array Pipeline - Watch data flow through each step</p>
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
            definition="find() returns the first match (or undefined). some() returns true if ANY element passes. every() returns true only if ALL pass. sort() mutates the original array - use [...arr].sort() to avoid surprises."
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
            subtitle="Interview classic - prove you understand the internals"
            definition="A polyfill is code that provides missing functionality. Writing Array.prototype.map from scratch proves you understand: this binding, callback signature (element, index, array), and returning a new array."
            analogy="It's like building a LEGO replica of a car - you already know what it should do, now prove you understand how each piece fits."
            seniorTip="In production, you wouldn't write polyfills manually - you'd use core-js or Babel. But showing you CAN write one signals deep understanding."
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
            definition="flat(depth) flattens nested arrays by the specified depth (default 1). flatMap() first maps, then flattens one level - perfect for one-to-many transformations."
            analogy="flat() is like ironing wrinkled clothes - each pass removes one level of wrinkle. flatMap() is like unboxing packages that each contain multiple items."
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
            definition="A Promise is an object representing a future value. It's either pending, fulfilled, or rejected. async/await is syntactic sugar over Promises - it makes async code look synchronous."
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
            definition="Promise.all() waits for ALL promises - fails fast on any rejection. Promise.race() resolves/rejects with the FIRST settled promise. Promise.allSettled() waits for ALL, never short-circuits, gives you status of each."
            analogy="Promise.all = group project - if ONE person fails, the whole project fails. Promise.race = a race - only the first finisher matters. Promise.allSettled = teacher collecting all papers - doesn't matter if some are blank."
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
            analogy="Debounce = elevator door - it waits until everyone stops pressing the button, then closes. Throttle = a bus - it departs every 10 minutes regardless of how many people arrive."
            seniorTip="Use debounce for search inputs (wait until user stops typing). Use throttle for scroll/resize events (fire at consistent intervals). In production, I'd handle edge cases like leading/trailing edge options."
          >
            <CodePlayground
              title="debounce-throttle.js"
              :initialCode="codes.debounceThrottle"
            />
            <!-- Interactive Demo -->
            <div class="p-4 rounded-xl bg-gray-100/80 dark:bg-white/5 border border-gray-200/50 dark:border-white/5">
              <p class="text-xs font-medium text-gray-500 dark:text-gray-400 mb-3">🎮 Move your mouse over the box - compare raw vs debounced vs throttled</p>
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
            definition="In async/await, wrap calls in try/catch. For Promises, chain .catch(). Always provide a fallback - unhandled rejections are the #1 source of production bugs in modern JS apps."
            analogy="Error handling is like wearing a seatbelt - you hope you never need it, but when you do, it saves everything."
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
              <p class="text-xs font-medium text-gray-500 dark:text-gray-400 mb-3">🎮 Click any box - the parent catches ALL clicks via delegation</p>
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
            analogy="Repaint = repainting a wall (cheap). Reflow = knocking down a wall and rebuilding (expensive - everything around it shifts too)."
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
            analogy="A memory leak is like leaving the faucet running - the water (memory) keeps accumulating until the sink (browser tab) overflows."
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
            title="ES6 Modules - import/export"
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
            analogy="Optional chaining is like knocking on a door - if no one is home (?. returns undefined), you don't break in, you just leave. ?? is 'use this backup key ONLY if there's truly no one home'."
          >
            <CodePlayground
              title="optional-chaining.js"
              :initialCode="codes.optionalChaining"
              :autoRun="true"
            />
          </ConceptCard>
        </template>

        <!-- ==================== ADVANCED CONCEPTS ==================== -->
        <template v-if="activeSection === 'advanced'">
          <ConceptCard
            id="currying"
            icon="🍛"
            title="Currying & Partial Application"
            subtitle="Transform functions one argument at a time"
            definition="Currying transforms a function that takes multiple arguments into a chain of single-argument functions: f(a, b, c) → f(a)(b)(c). Partial application fixes some arguments upfront and returns a function for the rest."
            analogy="Currying is like a production line - each worker (function) handles one part (argument) before passing it to the next. Partial application is like pre-setting the oven temperature - you fix one setting, then just add the food."
            seniorTip="Use currying for utility functions: const log = level => msg => console.log(level, msg); const warn = log('WARN'). Lodash has _.curry(). In interviews, show you can implement curry() yourself."
            defaultOpen
          >
            <CodePlayground
              title="currying.js"
              :initialCode="codes.currying"
              :autoRun="true"
            />
          </ConceptCard>

          <ConceptCard
            id="memoization"
            icon="🧠"
            title="Memoization"
            subtitle="Cache expensive function results"
            definition="Memoization caches the result of a function call based on its arguments. If the same arguments are passed again, the cached result is returned instead of re-computing. Uses a Map or object as cache."
            analogy="Memoization is like a student writing answers on their hand - if the teacher asks the same question twice, they just read their hand instead of solving it again."
            seniorTip="React.memo, useMemo, and Vue's computed properties are all forms of memoization. In production, be careful with cache size - use WeakMap for object keys or implement LRU cache."
          >
            <CodePlayground
              title="memoization.js"
              :initialCode="codes.memoization"
              :autoRun="true"
            />
          </ConceptCard>

          <ConceptCard
            id="map-set"
            icon="🗺️"
            title="Map, Set, WeakMap, WeakSet"
            subtitle="Modern data structures beyond objects & arrays"
            definition="Map: key-value pairs with ANY key type (not just strings). Set: unique values only. WeakMap/WeakSet: keys are weakly held - garbage collected when no other references exist. Great for caching and preventing memory leaks."
            analogy="Map is a dictionary where the keys can be anything (not just words). Set is a VIP guest list - no duplicates allowed. WeakMap is a sticky note on an object - when the object is thrown away, the note goes too."
            seniorTip="Use Map over objects when keys aren't strings. Use Set for deduplication: [...new Set(array)]. Use WeakMap for private data in classes or DOM element metadata. Maps maintain insertion order."
          >
            <CodePlayground
              title="map-set.js"
              :initialCode="codes.mapSet"
              :autoRun="true"
            />
          </ConceptCard>

          <ConceptCard
            id="generators"
            icon="⚙️"
            title="Generators & Iterators"
            subtitle="Lazy evaluation and custom iteration"
            definition="Generators (function*) can pause and resume execution via yield. They return an iterator with a .next() method. Great for lazy evaluation, infinite sequences, and implementing async flows."
            analogy="A generator is like a book with a bookmark - you read (execute) up to the bookmark (yield), then close the book. Next time you open it, you continue from exactly where you left off."
            seniorTip="Redux-Saga uses generators for side effects. Generators power async/await under the hood. Use for pagination, infinite scroll data loading, or any lazy sequence."
          >
            <CodePlayground
              title="generators.js"
              :initialCode="codes.generators"
              :autoRun="true"
            />
          </ConceptCard>

          <ConceptCard
            id="type-coercion"
            icon="🔄"
            title="Type Coercion & Equality"
            subtitle="== vs === and the weird parts of JS"
            definition="Type coercion: JS automatically converts types in comparisons and operations. == uses coercion (loose equality), === does not (strict equality). Always use === unless you have a specific reason not to."
            analogy="== is like a lenient teacher who accepts 'yes' as 'YES' (converts types). === is a strict teacher who only accepts the exact answer in the exact format."
            seniorTip="Always use ===. Know the classic gotchas: [] == false is true, '0' == false is true, null == undefined is true. In interviews, explain WHY: == triggers ToNumber/ToPrimitive conversions."
          >
            <CodePlayground
              title="type-coercion.js"
              :initialCode="codes.typeCoercion"
              :autoRun="true"
            />
          </ConceptCard>
        </template>

        <!-- ==================== FUNCTIONAL PROGRAMMING ==================== -->
        <template v-if="activeSection === 'functional'">
          <ConceptCard
            id="pure-functions"
            icon="💎"
            title="Pure Functions & Side Effects"
            subtitle="The foundation of reliable code"
            definition="A pure function: 1) Always returns the same output for same input. 2) Has no side effects (doesn't change external state, no API calls, no DOM manipulation). It is predictable and testable."
            analogy="A pure function is like a calculator: 2+2 is always 4, and it doesn't secretly update your bank account. An impure function is like a slot machine: outcomes vary and it takes your money."
            seniorTip="Isolate side effects. Keep core logic pure, and push side effects (API, DOM) to the edges of your application. This makes unit testing trivial."
            defaultOpen
          >
            <CodePlayground
              title="pure-functions.js"
              :initialCode="codes.pureFunctions"
              :autoRun="true"
            />
          </ConceptCard>

          <ConceptCard
            id="immutability"
            icon="🔒"
            title="Immutability"
            subtitle="Don't change it, replace it"
            definition="Immutability means data cannot be changed after creation. Instead of modifying objects/arrays, you create new copies with changes. This prevents unexpected bugs where data changes behind your back."
            analogy="Immutability is like writing in pen. If you make a mistake, you don't erase (mutate) - you rewrite the page (new copy). History is preserved."
            seniorTip="Use spread syntax (...) or libraries like Immer for immutable updates. Immutability is critical for React/Redux performance (allows fast reference equality checks)."
          >
            <CodePlayground
              title="immutability.js"
              :initialCode="codes.immutability"
              :autoRun="true"
            />
          </ConceptCard>

          <ConceptCard
            id="composition"
            icon="🚂"
            title="Function Composition"
            subtitle="Building complex logic from simple blocks"
            definition="Composition is combining simple functions to build more complex ones: f(g(x)). The output of one function becomes the input of the next. Use pipe() or compose() utilities."
            analogy="Composition is like an assembly line. Raw material (input) goes through machine A, then B, then C, resulting in a finished product. Each machine does one simple job perfectly."
            seniorTip="Readability matters to composition. pipe(getName, toUpper, sayHello) flows left-to-right. It replaces deep nesting: sayHello(toUpper(getName(user)))."
          >
            <CodePlayground
              title="composition.js"
              :initialCode="codes.composition"
              :autoRun="true"
            />
          </ConceptCard>
        </template>

        <!-- ==================== INTERNALS & MEMORY ==================== -->
        <template v-if="activeSection === 'under-the-hood'">
          <ConceptCard
            id="memory-management"
            icon="🧠"
            title="Stack vs Heap"
            subtitle="Where does your data live?"
            definition="Stack: Stores primitives (number, string, boolean) and references. Static memory allocation, fast access. Heap: Stores objects and functions. Dynamic memory allocation, slower access."
            analogy="Stack is like your pocket: quick access to small things (keys, wallet). Heap is like a warehouse: stores big boxes (furniture), acts deeper, and you just carry the address (reference) in your pocket."
            seniorTip="Primitives are passed by value (copy). Objects are passed by reference (copy of the address). Modifying an object passed to a function changes the original!"
            defaultOpen
          >
            <CodePlayground
              title="stack-heap.js"
              :initialCode="codes.stackHeap"
              :autoRun="true"
            />
          </ConceptCard>

          <ConceptCard
            id="garbage-collection"
            icon="🗑️"
            title="Garbage Collection (Mark & Sweep)"
            subtitle="How JS frees up memory"
            definition="JS engine automatically frees memory. 'reachability' is the key. The GC starts from 'roots' (global window, current stack) and marks all reachable objects. Anything not marked is swept (deleted)."
            analogy="GC is like a cleaning crew. They start at the front door (root) and put a sticker (mark) on everything they can reach/touch. Afterwards, anything without a sticker gets thrown out."
            seniorTip="Circular references used to cause leaks (Reference Counting), but modern Mark & Sweep handles them fine. The only leaks now are when YOU hold references you don't need (e.g., attached to window or DOM)."
          >
            <CodePlayground
              title="gc.js"
              :initialCode="codes.gc"
              :autoRun="false"
            />
          </ConceptCard>
        </template>

        <!-- ==================== EXERCISES ==================== -->
        <template v-if="activeSection === 'exercises'">
          <div class="p-4 rounded-xl bg-amber-500/5 border border-amber-500/20 mb-2">
            <p class="text-sm text-amber-400 font-medium">💪 Practice Mode</p>
            <p class="text-xs text-gray-400 mt-1">Each challenge starts with a problem description. Write your solution, then click Run to test it. Try solving WITHOUT looking at hints first!</p>
          </div>

          <ConceptCard
            id="ex-debounce"
            icon="💪"
            title="Exercise 1: Implement debounce()"
            subtitle="Control function execution rate"
            definition="Write a debounce function that delays invoking the callback until after 'delay' ms have elapsed since the last call. If called again before the delay, reset the timer."
            seniorTip="Think about: What do you need to track? (timer ID). What happens on each call? (clear old timer, set new one). What does it return? (a new function)."
            defaultOpen
          >
            <CodePlayground
              title="exercise-debounce.js"
              :initialCode="codes.exDebounce"
              :autoRun="false"
            />
          </ConceptCard>

          <ConceptCard
            id="ex-flatten"
            icon="💪"
            title="Exercise 2: Flatten a nested array"
            subtitle="Recursive problem solving"
            definition="Write a function flatten(arr) that takes a deeply nested array and returns a flat array. Do NOT use Array.prototype.flat(). Example: flatten([1, [2, [3, [4]]]]) → [1, 2, 3, 4]"
            seniorTip="Two approaches: recursive (check if element is array, recurse) or iterative (use a stack). The recursive solution is cleaner. Think about base case vs recursive case."
          >
            <CodePlayground
              title="exercise-flatten.js"
              :initialCode="codes.exFlatten"
              :autoRun="false"
            />
          </ConceptCard>

          <ConceptCard
            id="ex-deepclone"
            icon="💪"
            title="Exercise 3: Deep Clone an object"
            subtitle="Handle nested objects, arrays, dates"
            definition="Write a function deepClone(obj) that creates a complete copy. Mutating the clone should NOT affect the original. Handle: objects, arrays, Date, null. JSON.parse(JSON.stringify()) loses functions and Dates."
            seniorTip="Recursive approach: check type, create new container, recurse for nested values. Handle edge cases: null, Date, Array. Don't forget to handle circular references in production (WeakMap)."
          >
            <CodePlayground
              title="exercise-deepclone.js"
              :initialCode="codes.exDeepClone"
              :autoRun="false"
            />
          </ConceptCard>

          <ConceptCard
            id="ex-promise-all"
            icon="💪"
            title="Exercise 4: Implement Promise.all()"
            subtitle="Understand Promise internals"
            definition="Write your own myPromiseAll(promises) that: takes an array of promises, resolves with an array of results (in order), rejects immediately if any promise rejects."
            seniorTip="Key insights: return a new Promise. Track results in an array. Use a counter to know when ALL have resolved. Preserve order (don't push - assign by index)."
          >
            <CodePlayground
              title="exercise-promise-all.js"
              :initialCode="codes.exPromiseAll"
              :autoRun="false"
            />
          </ConceptCard>

          <ConceptCard
            id="ex-event-emitter"
            icon="💪"
            title="Exercise 5: Build an Event Emitter"
            subtitle="The pub/sub pattern from scratch"
            definition="Build a class EventEmitter with: on(event, callback) - subscribe, emit(event, ...args) - trigger all callbacks, off(event, callback) - unsubscribe. This is the foundation of Node.js EventEmitter and many UI frameworks."
            seniorTip="Store listeners in a Map of event → callback arrays. on() pushes to the array. emit() calls all callbacks for that event. off() filters out the specific callback."
          >
            <CodePlayground
              title="exercise-emitter.js"
              :initialCode="codes.exEventEmitter"
              :autoRun="false"
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
  { id: 'fundamentals', label: 'Fundamentals', icon: '📦', badge: '7' },
  { id: 'arrays', label: 'Array Methods', icon: '🔗', badge: '4' },
  { id: 'async', label: 'Async JS', icon: '⏳', badge: '4' },
  { id: 'dom', label: 'DOM & Browser', icon: '🌐', badge: '3' },
  { id: 'es6', label: 'ES6+ Features', icon: '✨', badge: '3' },
  { id: 'advanced', label: 'Advanced', icon: '🧠', badge: '5' },
  { id: 'functional', label: 'Functional', icon: 'λ', badge: '3' },
  { id: 'under-the-hood', label: 'Internals', icon: '⚙️', badge: '2' },
  { id: 'exercises', label: 'Exercises', icon: '💪', badge: '5' },
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
    mouseDemo.throttled++
    throttleReady = false
    setTimeout(() => { throttleReady = true }, 300)
  }
}

// ==================== Code Examples ====================
const codes = {
  pureFunctions: `// Pure vs Impure Functions

// ❌ Impure: Depends on outer state
let total = 0;
function addToTotal(amount) {
  total += amount; // Side effect: modifies external variable
  return total;
}

// ❌ Impure: Non-deterministic (different output each time)
function getRandom() {
  return Math.random();
}

// ✅ Pure: Same input -> Same output, no side effects
function add(a, b) {
  return a + b;
}

// Why it matters? Testability.
console.log(add(2, 3)); // Always 5. Easy to test.`,

  immutability: `// Immutability Pattern

const user = { 
  name: "Alice", 
  address: { city: "Wonderland" } 
};

// ❌ Mutation (Bad for React/Redux)
// user.name = "Bob"; 

// ✅ Immutable Update (Good)
const updatedUser = {
  ...user,
  name: "Bob",
  // Nested update requires deep copy or spread
  address: {
    ...user.address,
    city: "Real World"
  }
};

console.log("Original:", user.name); // Alice (Untouched)
console.log("Updated:", updatedUser.name); // Bob`,

  composition: `// Function Composition

const getName = user => user.name;
const toUpper = str => str.toUpperCase();
const sayHello = str => \`Hello, \${str}!\`;

const user = { name: "Alice" };

// ❌ Deep nesting (Hard to read)
console.log(sayHello(toUpper(getName(user))));

// ✅ Composition (using a pipe function)
function pipe(...fns) {
  return (initialValue) => fns.reduce((v, f) => f(v), initialValue);
}

const greetUser = pipe(getName, toUpper, sayHello);

console.log(greetUser(user)); // "Hello, ALICE!"`,

  stackHeap: `// Stack vs Heap

// 1. Primitives -> Stack (Passed by Value)
let a = 10;
let b = a; // Copy value 10
b = 20; 
console.log(a, b); // 10, 20 (a is untouched)

// 2. Objects -> Heap (Passed by Reference)
let obj1 = { val: 10 };
let obj2 = obj1; // Copy ADDRESS 0x123...
obj2.val = 20;

console.log(obj1.val); // 20! (obj1 changed because obj2 points to same spot)

// To copy object properly:
let obj3 = { ...obj1 }; // Shallow copy`,

  gc: `// Garbage Collection Simulator

let family = {
  father: { name: "John" },
  mother: { name: "Jane" }
};
// "John" and "Jane" objects are currently REACHABLE from 'family' root.

// Break the link
family.father = null;
// The object { name: "John" } is now UNREACHABLE.
// Mark-and-Sweep algorithm will find it has no incomings refs (except maybe cycles).
// GC will free that memory.

console.log("Link broken. GC will eventually sweep 'John'.");`,

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
// Prints 0, 1, 2 - let creates a new binding per iteration.`,

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
// You can't access it directly - only through the methods.
// This is the MODULE PATTERN - closures enable data privacy.`,

  callStack: `function third() {
  console.log("3️⃣ third() - top of stack");
}

function second() {
  console.log("2️⃣ second() - calls third");
  third();
  console.log("2️⃣ second() - after third returns");
}

function first() {
  console.log("1️⃣ first() - calls second");
  second();
  console.log("1️⃣ first() - after second returns");
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

console.log(dog.bark());    // "Woof!" - own property
console.log(dog.breathe()); // "breathing..." - from prototype

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
console.log("🟢 COMPOSITE-only (cheap - GPU accelerated):");
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

// 📁 math.js - Named exports
// export const add = (a, b) => a + b;
// export const multiply = (a, b) => a * b;
// export const PI = 3.14159;

// 📁 logger.js - Default export
// export default function log(msg) {
//   console.log('[LOG]', msg);
// }

// 📁 app.js - Importing
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

  // ==================== Loops ====================
  loops: `// Every Loop Type in JavaScript

const fruits = ['🍎 Apple', '🍌 Banana', '🍇 Grape'];

// 1. Classic for loop (use when you need index)
console.log("1️⃣ for loop:");
for (let i = 0; i < fruits.length; i++) {
  console.log("  " + i + ": " + fruits[i]);
}

// 2. for...of (modern, iterates VALUES - use this!)
console.log("\n2️⃣ for...of (values):");
for (const fruit of fruits) {
  console.log("  " + fruit);
}

// 3. for...in (iterates KEYS - use on objects, NOT arrays!)
console.log("\n3️⃣ for...in (keys):");
const user = { name: "Mayuresh", age: 28, city: "Mumbai" };
for (const key in user) {
  console.log("  " + key + ": " + user[key]);
}

// 4. while loop
console.log("\n4️⃣ while loop:");
let count = 3;
while (count > 0) {
  console.log("  Countdown: " + count);
  count--;
}

// 5. forEach (can't break or continue!)
console.log("\n5️⃣ forEach:");
fruits.forEach((fruit, i) => {
  console.log("  [" + i + "] " + fruit);
});

// 6. for...of with break (forEach can't do this!)
console.log("\n6️⃣ Break with for...of:");
for (const fruit of fruits) {
  if (fruit.includes('Banana')) {
    console.log("  Found Banana! Stopping.");
    break;
  }
  console.log("  Checking: " + fruit);
}

// 7. Object iteration (modern way)
console.log("\n7️⃣ Object.entries() (preferred over for...in):");
for (const [key, val] of Object.entries(user)) {
  console.log("  " + key + " → " + val);
}

// ⚠️ NEVER use for...in on arrays!
console.log("\n⚠️ for...in on array (BAD):");
for (const i in fruits) {
  console.log("  Type of index:", typeof i); // string, not number!
}`,

  // ==================== Advanced Concepts ====================
  currying: `// Currying: f(a, b, c) → f(a)(b)(c)

// Simple curry
const multiply = a => b => a * b;
const double = multiply(2);
const triple = multiply(3);

console.log(double(5));  // 10
console.log(triple(5));  // 15
console.log(multiply(4)(6)); // 24

// Generic curry function (interview classic)
function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    }
    return function(...moreArgs) {
      return curried.apply(this, args.concat(moreArgs));
    };
  };
}

const add3 = (a, b, c) => a + b + c;
const curriedAdd = curry(add3);

console.log(curriedAdd(1)(2)(3));   // 6
console.log(curriedAdd(1, 2)(3));   // 6
console.log(curriedAdd(1)(2, 3));   // 6
console.log(curriedAdd(1, 2, 3));   // 6

// Practical: logger factory
const log = level => timestamp => msg =>
  console.log("[" + level + "] " + timestamp + ": " + msg);

const warn = log("WARN")(new Date().toISOString());
warn("disk space low");`,

  memoization: `// Memoization: cache function results

function memoize(fn) {
  const cache = new Map();
  return function(...args) {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      console.log("  📦 Cache HIT for:", key);
      return cache.get(key);
    }
    console.log("  🔨 Computing for:", key);
    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  };
}

// Expensive function (simulated)
const factorial = memoize(function f(n) {
  if (n <= 1) return 1;
  return n * f(n - 1);
});

console.log("factorial(5):", factorial(5));
console.log("factorial(5):", factorial(5)); // cached!
console.log("factorial(3):", factorial(3)); // also cached (sub-call)

// Fibonacci with memoization
const fib = memoize(function f(n) {
  if (n <= 1) return n;
  return f(n - 1) + f(n - 2);
});

console.log("\\nfib(10):", fib(10));
console.log("fib(10) again:", fib(10)); // instant!`,

  mapSet: `// Map: any key type, maintains insertion order
const userRoles = new Map();
const adminKey = { id: 1 };  // Object as key!

userRoles.set(adminKey, "admin");
userRoles.set("guest", "viewer");

console.log("Map size:", userRoles.size);        // 2
console.log("Admin:", userRoles.get(adminKey));   // "admin"
console.log("Has guest:", userRoles.has("guest")); // true

// Iterate Maps
for (const [key, value] of userRoles) {
  console.log(" ", typeof key, "→", value);
}

// Set: unique values only
const unique = new Set([1, 2, 2, 3, 3, 3]);
console.log("\\nSet:", [...unique]);        // [1, 2, 3]
console.log("Set size:", unique.size);      // 3

// Deduplicate an array (one-liner!)
const nums = [1, 1, 2, 3, 3, 4];
const deduped = [...new Set(nums)];
console.log("Deduped:", deduped); // [1, 2, 3, 4]

// Set operations
const a = new Set([1, 2, 3, 4]);
const b = new Set([3, 4, 5, 6]);

const union = new Set([...a, ...b]);
const intersection = new Set([...a].filter(x => b.has(x)));
const difference = new Set([...a].filter(x => !b.has(x)));

console.log("\\nUnion:", [...union]);
console.log("Intersection:", [...intersection]);
console.log("Difference:", [...difference]);`,

  generators: `// Generator: function that can pause (yield) and resume

function* countUp(start) {
  let i = start;
  while (true) {
    yield i++;  // pause here, return i
  }
}

const counter = countUp(1);
console.log(counter.next()); // { value: 1, done: false }
console.log(counter.next()); // { value: 2, done: false }
console.log(counter.next()); // { value: 3, done: false }

// Finite generator
function* fibonacci() {
  let a = 0, b = 1;
  while (true) {
    yield a;
    [a, b] = [b, a + b];
  }
}

// Take first 10 fibonacci numbers
const fib = fibonacci();
const first10 = Array.from({ length: 10 }, () => fib.next().value);
console.log("\\nFirst 10 fib:", first10);

// Generator for iteration
function* range(start, end, step = 1) {
  for (let i = start; i < end; i += step) {
    yield i;
  }
}

console.log("\\nRange 0-10 by 2:", [...range(0, 10, 2)]);

// Two-way communication
function* conversation() {
  const name = yield "What is your name?";
  const age = yield "Hello " + name + "! How old are you?";
  return name + " is " + age + " years old.";
}

const chat = conversation();
console.log("\\n" + chat.next().value);
console.log(chat.next("Mayuresh").value);
console.log(chat.next(28).value);`,

  typeCoercion: `// == vs === (The Weird Parts)

console.log("=== STRICT (no coercion) ===");
console.log("1 === 1:", 1 === 1);         // true
console.log("1 === '1':", 1 === '1');     // false (different types)
console.log("null === undefined:", null === undefined); // false

console.log("\\n== LOOSE (with coercion) ==");
console.log("1 == '1':", 1 == '1');       // true ('1' → 1)
console.log("0 == false:", 0 == false);   // true (false → 0)
console.log("'' == false:", '' == false); // true (both → 0)
console.log("null == undefined:", null == undefined); // true (special rule)

console.log("\\n🤯 The Gotchas:");
console.log("[] == false:", [] == false);     // true
console.log("[] == ![]:", [] == ![]);         // true (mind-blown!)
console.log("'' == 0:", '' == 0);             // true
console.log("' ' == 0:", ' ' == 0);           // true
console.log("'0' == false:", '0' == false);   // true

console.log("\\n✅ Truthy/Falsy values:");
const falsyValues = [false, 0, -0, 0n, '', null, undefined, NaN];
console.log("Falsy:", falsyValues.map(v => String(v)));
console.log("Everything else is truthy, including:");
console.log("  [] (empty array):", Boolean([]));
console.log("  {} (empty object):", Boolean({}));
console.log("  '0' (string zero):", Boolean('0'));
console.log("  'false' (string):", Boolean('false'));

console.log("\\n💡 Rule: ALWAYS use ===");`,

  // ==================== Exercises ====================
  exDebounce: `// 💪 EXERCISE: Implement debounce()
// 
// Requirements:
// 1. debounce(fn, delay) returns a new function
// 2. The new function delays calling fn by 'delay' ms
// 3. If called again before delay expires, reset the timer
// 4. The function should pass through all arguments
//
// Write your solution below, then click Run!

function debounce(fn, delay) {
  // YOUR CODE HERE
  // Hint: you need a variable to store the timer ID
  // Hint: use clearTimeout and setTimeout


}

// ===== TEST (don't modify below) =====
let callCount = 0;
const debouncedFn = debounce((msg) => {
  callCount++;
  console.log("Called with:", msg, "| Total calls:", callCount);
}, 100);

// Simulate rapid calls
debouncedFn("first");
debouncedFn("second");
debouncedFn("third");  // Only this should fire

setTimeout(() => {
  console.log("\\n✅ Expected: Called with 'third', Total calls: 1");
  console.log("   Your result: Total calls:", callCount);
  if (callCount === 1) console.log("   🎉 PASSED!");
  else console.log("   ❌ FAILED - debounce should fire only once");
}, 200);`,

  exFlatten: `// 💪 EXERCISE: Flatten a nested array
//
// Requirements:
// 1. flatten([1, [2, [3, [4]]]]) → [1, 2, 3, 4]
// 2. Do NOT use Array.prototype.flat()
// 3. Handle any depth of nesting
// 4. Non-array elements stay as-is
//
// Write your solution below, then click Run!

function flatten(arr) {
  // YOUR CODE HERE
  // Hint: use Array.isArray() to check if element is an array
  // Hint: use recursion or reduce


}

// ===== TEST (don't modify below) =====
const tests = [
  { input: [1, [2, [3, [4]]]], expected: [1, 2, 3, 4] },
  { input: [1, 2, 3], expected: [1, 2, 3] },
  { input: [[1], [[2]], [[[3]]]], expected: [1, 2, 3] },
  { input: [], expected: [] },
];

let passed = 0;
tests.forEach((t, i) => {
  const result = flatten(t.input);
  const ok = JSON.stringify(result) === JSON.stringify(t.expected);
  console.log(ok ? "✅" : "❌", "Test " + (i+1) + ":",
    JSON.stringify(t.input), "→", JSON.stringify(result));
  if (ok) passed++;
});
console.log("\\n" + passed + "/" + tests.length + " tests passed");`,

  exDeepClone: `// 💪 EXERCISE: Deep Clone an object
//
// Requirements:
// 1. deepClone(obj) returns a complete copy
// 2. Changing the clone does NOT affect the original
// 3. Handle: objects, arrays, Date, null, primitives
// 4. Do NOT use JSON.parse/JSON.stringify
//
// Write your solution below, then click Run!

function deepClone(obj) {
  // YOUR CODE HERE
  // Hint: check for null first
  // Hint: check for Date, Array, Object
  // Hint: recurse for nested values


}

// ===== TEST (don't modify below) =====
const original = {
  name: "Mayuresh",
  skills: ["JS", "CSS", "Vue"],
  address: { city: "Mumbai", zip: 400001 },
  joined: new Date("2024-01-01"),
};

const clone = deepClone(original);

// Mutate the clone
clone.name = "Changed";
clone.skills.push("React");
clone.address.city = "Delhi";

console.log("Original name:", original.name);
console.log("  Expected: Mayuresh", original.name === "Mayuresh" ? "✅" : "❌");

console.log("Original skills:", original.skills);
console.log("  Expected: 3 items", original.skills.length === 3 ? "✅" : "❌");

console.log("Original city:", original.address.city);
console.log("  Expected: Mumbai", original.address.city === "Mumbai" ? "✅" : "❌");

console.log("Date preserved:", clone.joined instanceof Date ? "✅" : "❌");`,

  exPromiseAll: `// 💪 EXERCISE: Implement Promise.all()
//
// Requirements:
// 1. myPromiseAll(promises) returns a Promise
// 2. Resolves with array of results IN ORDER
// 3. Rejects immediately if ANY promise rejects
// 4. Handle empty array (resolve with [])
//
// Write your solution below, then click Run!

function myPromiseAll(promises) {
  // YOUR CODE HERE
  // Hint: return new Promise(...)
  // Hint: use a counter & results array
  // Hint: assign results[i] = value (not push!)


}

// ===== TEST (don't modify below) =====
const p1 = new Promise(r => setTimeout(() => r("first"), 100));
const p2 = new Promise(r => setTimeout(() => r("second"), 50));
const p3 = Promise.resolve("third");

myPromiseAll([p1, p2, p3]).then(results => {
  console.log("Results:", results);
  const expected = ["first", "second", "third"];
  const ok = JSON.stringify(results) === JSON.stringify(expected);
  console.log(ok ? "✅ Order preserved!" : "❌ Wrong order");
});

// Test rejection
const p4 = Promise.reject("error!");
myPromiseAll([p1, p4, p3]).catch(err => {
  console.log("\\nRejection caught:", err);
  console.log(err === "error!" ? "✅ Rejects correctly!" : "❌ Wrong error");
});

// Test empty
myPromiseAll([]).then(r => {
  console.log("\\nEmpty:", JSON.stringify(r));
  console.log(r.length === 0 ? "✅ Empty array!" : "❌ Should be []");
});`,

  exEventEmitter: `// 💪 EXERCISE: Build an Event Emitter
//
// Requirements:
// 1. on(event, callback) - subscribe to an event
// 2. emit(event, ...args) - trigger all callbacks for event
// 3. off(event, callback) - unsubscribe specific callback
// 4. once(event, callback) - subscribe, but auto-remove after first call
//
// Write your solution below, then click Run!

class EventEmitter {
  constructor() {
    // YOUR CODE HERE - initialize storage
  }

  on(event, callback) {
    // YOUR CODE HERE
  }

  emit(event, ...args) {
    // YOUR CODE HERE
  }

  off(event, callback) {
    // YOUR CODE HERE
  }

  once(event, callback) {
    // YOUR CODE HERE
    // Hint: create a wrapper that calls off() after executing
  }
}

// ===== TEST (don't modify below) =====
const emitter = new EventEmitter();
let results = [];

const handler1 = (msg) => results.push("h1:" + msg);
const handler2 = (msg) => results.push("h2:" + msg);

emitter.on("greet", handler1);
emitter.on("greet", handler2);
emitter.emit("greet", "hello");
console.log("Test 1 (two handlers):", results);
console.log(results.length === 2 ? "✅" : "❌");

emitter.off("greet", handler1);
results = [];
emitter.emit("greet", "world");
console.log("\\nTest 2 (after off):", results);
console.log(results.length === 1 ? "✅" : "❌");

results = [];
emitter.once("click", (x) => results.push("once:" + x));
emitter.emit("click", "first");
emitter.emit("click", "second");
console.log("\\nTest 3 (once):", results);
console.log(results.length === 1 ? "✅" : "❌");`,
}
</script>

