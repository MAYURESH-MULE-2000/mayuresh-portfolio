<template>
  <div class="learn-react min-h-screen">
    <!-- Header -->
    <div class="px-4 md:px-8 py-8 pb-4 max-w-6xl mx-auto">
      <a href="/learn" class="inline-flex items-center gap-1 text-sm text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors mb-4">
        ← Back to Topics
      </a>
      <div class="flex items-center gap-3 mb-2">
        <span class="text-3xl">⚛️</span>
        <h1 class="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">React Advanced</h1>
      </div>
      <p class="text-gray-500 dark:text-gray-400 text-sm md:text-base max-w-2xl">
        Master React Internals, State Architectures, Concurrent Features, and Performance patterns used in large-scale applications.
      </p>
    </div>

    <!-- Layout: Nav + Content -->
    <div class="px-4 md:px-8 max-w-6xl mx-auto flex flex-col lg:flex-row gap-6 pb-16">
      <SectionNav
        :sections="sections"
        :activeSection="activeSection"
        activeColor="bg-blue-500"
        @select="setSection"
        class="lg:w-56 flex-shrink-0"
      />

      <div class="flex-1 min-w-0 space-y-5">
        <!-- ==================== REACT INTERNALS ==================== -->
        <template v-if="activeSection === 'internals'">
          <ConceptCard
            id="virtual-dom"
            icon="🌳"
            title="Virtual DOM & Reconciliation"
            subtitle="The Diffing Algorithm"
            definition="React keeps a lightweight Virtual DOM. When state changes, it creates a new VDOM tree, diffs it with the old one, and commits only minimal changes to the real DOM."
            analogy="Virtual DOM is like a architectural blueprint. You can redraw it 100 times cheaply. Changing the real bricks (DOM) is expensive, so you only do it when the blueprint is final."
            seniorTip="Keys are crucial for lists! Without stable keys, React's diffing algorithm assumes items changed/moved incorrectly, deleting and recreating DOM nodes unnecessarily (losing focus/state)."
            defaultOpen
          >
            <CodePlayground
              title="reconciliation.js"
              :initialCode="codes.reconciliation"
            />
          </ConceptCard>

          <ConceptCard
            id="lifecycle"
            icon="🔄"
            title="Rendering Lifecycle"
            subtitle="Render Phase vs Commit Phase"
            definition="1. Render Phase (Pure): React calls components to determine VDOM updates. Can be paused/restarted (Concurrent). 2. Commit Phase (Side Effects): React updates real DOM and runs effects (useEffect)."
            analogy="Render Phase is sketching. Commit Phase is printing. You can sketch many drafts (render) without wasting paper, but printing (commit) is final and costs ink."
            seniorTip="Rendering != Updating DOM. A component can render (call function) without changing the DOM if the output is the same. But it still costs CPU. Use React.memo/useMemo to prevent the render step itself."
          >
            <CodePlayground
              title="lifecycle-phases.js"
              :initialCode="codes.lifecycle"
            />
          </ConceptCard>

          <ConceptCard
            id="fiber"
            icon="🧵"
            title="React Fiber & Concurrent Features"
            subtitle="Time-slicing the work"
            definition="Fiber allows React to split work into chunks. It can pause high-priority updates (like typing) to yield to the browser, then resume rendering lower-priority updates (like data charts)."
          >
             <CodePlayground
              title="concurrent.js"
              :initialCode="codes.concurrent"
            />
          </ConceptCard>
        </template>

        <!-- ==================== HOOKS DEEPLY ==================== -->
        <template v-if="activeSection === 'hooks'">
          <ConceptCard
            id="custom-hooks"
            icon="⚓"
            title="Custom Hooks Architecture"
            subtitle="Encapsulating Logic"
            definition="Custom hooks leverage composition. They should isolate one concern (e.g., useFetch, useWindowSize). They allow sharing stateful logic without Higher-Order Components or Render Props."
            seniorTip="Return objects `{ val, setVal }` instead of arrays `[val, setVal]` if you have more than 2 returns. It's more extensible. Also, handle cleanup in effects properly!"
            defaultOpen
          >
            <CodePlayground
              title="useAsync.js"
              :initialCode="codes.customHooks"
            />
          </ConceptCard>

          <ConceptCard
            id="context-perf"
            icon="📉"
            title="Context Performance Pitfalls"
            subtitle="The Context Trap"
            definition="When a Context Provider's value changes, ALL consumers re-render. Providing a new object reference `{ user, theme }` every render forces a full tree re-render."
            seniorTip="1. Split Contexts (UserContext, ThemeContext). 2. Memoize the value object `useMemo(() => ({...}), [deps])`. 3. For high-frequency updates, use a subscription-based store (Zustand) instead."
          >
            <CodePlayground
              title="context-perf.js"
              :initialCode="codes.contextPerf"
            />
          </ConceptCard>
        </template>

        <!-- ==================== STATE MANAGEMENT ==================== -->
        <template v-if="activeSection === 'state'">
          <ConceptCard
            id="state-strategy"
            icon="🧠"
            title="State Strategy: Local vs Global"
            subtitle="Where should data live?"
            definition="Local: UI state (modals, inputs). Global: User session, theme. Server: API data. URL: sharable state (filters, search queries)."
            analogy="Local = Pocket (Wallet). Global = Safe (Marriage cert). Server = Cloud (Photos). URL = Postcard (Anyone with this link sees the same thing)."
            defaultOpen
          >
             <div class="p-4 rounded-xl bg-gray-100/80 dark:bg-white/5 border border-gray-200/50 dark:border-white/5 text-sm">
               <ul class="space-y-2 text-gray-600 dark:text-gray-300">
                 <li><span class="font-bold text-blue-500">Local:</span> useState, useReducer</li>
                 <li><span class="font-bold text-purple-500">Global:</span> Zustand, Redux Toolkit, Context</li>
                 <li><span class="font-bold text-emerald-500">Server:</span> React Query, SWR</li>
                 <li><span class="font-bold text-amber-500">URL:</span> React Router params/search</li>
               </ul>
             </div>
          </ConceptCard>

          <ConceptCard
            id="server-state"
            icon="🌐"
            title="Server State (React Query)"
            subtitle="Caching & Synchronization"
            definition="Server state is asynchronous and shared. React Query handles caching, background updates, deduping, and optimistic updates. Don't put API data in Redux manually!"
            seniorTip="Optimistic Updates give 'instant' feedback. You update the cache immediately, send the request, and rollback if it fails. Zero-latency feel."
          >
            <CodePlayground
              title="react-query.js"
              :initialCode="codes.serverState"
            />
          </ConceptCard>

           <ConceptCard
            id="zustand"
            icon="🐻"
            title="Zustand / Redux Toolkit"
            subtitle="Client-side Global Stores"
            definition="Use for complex client state that doesn't come from an API (e.g. complex multi-step form wizard, layout preferences). Zustand is simpler and less boilerplate than Redux."
          >
            <CodePlayground
              title="zustand.js"
              :initialCode="codes.zustand"
            />
          </ConceptCard>
        </template>

        <!-- ==================== PERFORMANCE ==================== -->
        <template v-if="activeSection === 'perf'">
           <ConceptCard
            id="memoization"
            icon="🏎️"
            title="Memoization Strategy"
            subtitle="useMemo, useCallback, React.memo"
            definition="React.memo skips re-rendering a component if props haven't changed. useCallback stabilizes function references. useMemo caches expensive calculations."
            seniorTip="Don't optimize prematurely! Memoization has a cost. Only use it when: 1) Profiler shows a component rendering too often, 2) It has expensive sub-trees, 3) It's used in a dependency array."
            defaultOpen
          >
            <CodePlayground
              title="memo.js"
              :initialCode="codes.memo"
            />
          </ConceptCard>

          <ConceptCard
            id="lazy"
            icon="💤"
            title="Lazy Loading & Bundle Splitting"
            subtitle="Code Splitting"
            definition="React.lazy allow you to import components dynamically. This splits the JS bundle, so users only download code for the page they are viewing."
            seniorTip="Route-based splitting is the default. Also split heavy interaction libraries (Charts, Maps, Text Editors) so they load only when interacted with."
          >
            <CodePlayground
              title="lazy.js"
              :initialCode="codes.lazy"
            />
          </ConceptCard>

          <ConceptCard
            id="profiler"
            icon="🕵️"
            title="Profiling with DevTools"
            subtitle="Find the bottleneck"
            definition="React DevTools Profiler records why each component rendered. Look for 'Wasted Renders' (rendering without DOM updates). Use 'Highlight updates when components render' to visualize activity."
          >
             <div class="p-4 rounded-xl bg-gray-100/80 dark:bg-white/5 border border-gray-200/50 dark:border-white/5">
                <p class="text-sm text-gray-400">🔥 Flamegraph Colors:</p>
                <div class="flex gap-4 mt-2 text-xs font-mono">
                  <span class="text-gray-400">Grey: Did not render</span>
                  <span class="text-emerald-400">Green: Fast render</span>
                  <span class="text-amber-400">Yellow: Slow render</span>
                </div>
             </div>
          </ConceptCard>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import SectionNav from './SectionNav.vue'
import ConceptCard from './ConceptCard.vue'
import CodePlayground from './CodePlayground.vue'

const sections = [
  { id: 'internals', label: 'React Internals', icon: '⚛️', badge: 'Core' },
  { id: 'hooks', label: 'Hooks Deeply', icon: '⚓', badge: 'Patterns' },
  { id: 'state', label: 'State Management', icon: '💾', badge: 'Arch' },
  { id: 'perf', label: 'Performance', icon: '🚀', badge: 'Speed' },
]

const activeSection = ref('internals')

function setSection(id) {
  activeSection.value = id
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const codes = {
  reconciliation: `// Reconciliation: The Diffing Algorithm

// 1. Same Type? Keep & Update
// Old: <Button color="red" />
// New: <Button color="blue" />
// -> Instance kept, props updated, componentDidUpdate called.

// 2. Different Type? Destroy & Rebuild
// Old: <div>...</div>
// New: <span>...</span>
// -> Old tree destroyed (unmount), new tree built (mount).

// 3. Lists needs Keys!
// ❌ Bad Key (Index)
// [A, B] -> Prepend C -> [C, A, B]
// React sees: 
// 0: A->C (Changed!)
// 1: B->A (Changed!)
// 2: New B (Added!)
// Result: 3 updates + Bugs with input focus

// ✅ Good Key (ID)
// A (key=1), B (key=2) -> C (key=3), A (key=1), B (key=2)
// React sees: Old keys [1,2]. New Keys [3,1,2]. 
// "Okay, 1 and 2 moved. 3 is new." -> Efficient!`,

  lifecycle: `// Render vs Commit

function App() {
  const [count, setCount] = useState(0);

  // 1. RENDER PHASE
  // Pure calculation. Might run multiple times!
  const doubled = count * 2;
  console.log("Render"); 

  // 2. COMMIT PHASE (Side Effects)
  // Runs ONLY after DOM updates
  useEffect(() => {
    console.log("Effect (Commit)");
    document.title = \`Count: \${count}\`;
  }, [count]);

  return <button onClick={() => setCount(c => c+1)}>{doubled}</button>;
}`,

  concurrent: `// Concurrent Mode: useTransition

import { useState, useTransition } from 'react';

function Search() {
  const [query, setQuery] = useState("");
  const [list, setList] = useState([]);
  const [isPending, startTransition] = useTransition();

  function handleChange(e) {
    // 1. High Priority (Urgent)
    // Update the input field immediately so it feels responsive
    setQuery(e.target.value);

    // 2. Low Priority (Transition)
    // Update the heavy list in the background
    startTransition(() => {
      const results = heavyFilterAlgorithm(e.target.value);
      setList(results);
    });
  }

  return (
    <div>
      <input value={query} onChange={handleChange} />
      {isPending ? "Loading..." : null}
      <HeavyList items={list} />
    </div>
  );
}`,

  customHooks: `// Architecture: Composition
// useAuth.js
function useAuth() {
  const [user, setUser] = useState(null);
  // ... login logic
  return { user, login };
}

// useTodos.js (Dependent on Auth)
function useTodos() {
  const { user } = useAuth(); // Compose!
  const { data } = useQuery(['todos', user?.id], fetchTodos, {
    enabled: !!user,
  });
  return data;
}

// Reusable Hook
function useAsync(asyncFunction) {
  const [status, setStatus] = useState("idle");
  const [value, setValue] = useState(null);
  const [error, setError] = useState(null);

  const execute = useCallback(async (...args) => {
    setStatus("pending");
    try {
      const response = await asyncFunction(...args);
      setValue(response);
      setStatus("success");
    } catch (err) {
      setError(err);
      setStatus("error");
    }
  }, [asyncFunction]);

  return { execute, status, value, error };
}`,

  contextPerf: `// Context Optimization

// ❌ Bad: Triggers all consumers on every render
const BadProvider = ({ children }) => {
  const [theme, setTheme] = useState('dark');
  // New object reference created every time BadProvider renders!
  return <Ctx.Provider value={{ theme, setTheme }}>{children}</Ctx.Provider>;
};

// ✅ Good: Memoize value
const GoodProvider = ({ children }) => {
  const [theme, setTheme] = useState('dark');
  
  const value = useMemo(() => ({ theme, setTheme }), [theme]);
  
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
};

// 🏆 Best: Split Contexts
// If 'Sidebar' only needs 'theme', it shouldn't re-render 
// when 'user' changes.
// <ThemeCtx.Provider>
//   <UserCtx.Provider>
//     {children}`,

  serverState: `// React Query: Optimistic Updates

const useAddTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newTodo) => axios.post('/todos', newTodo),
    
    // 1. Run before request
    onMutate: async (newTodo) => {
      // Cancel refetches so they don't overwrite our optimistic update
      await queryClient.cancelQueries(['todos']);

      // Snapshot previous value
      const previousTodos = queryClient.getQueryData(['todos']);

      // Optimistically update to the new value
      queryClient.setQueryData(['todos'], (old.push(newTodo)));

      return { previousTodos };
    },

    // 2. If it fails, roll back
    onError: (err, newTodo, context) => {
      queryClient.setQueryData(['todos'], context.previousTodos);
    },

    // 3. Always refetch true data after
    onSettled: () => {
      queryClient.invalidateQueries(['todos']);
    },
  });
};`,

  zustand: `// Zustand: Simplified Store
import { create } from 'zustand';

const useStore = create((set) => ({
  bears: 0,
  increase: () => set((state) => ({ bears: state.bears + 1 })),
  removeAll: () => set({ bears: 0 }),
}));

function BearCounter() {
  // Selector selects ONLY 'bears'.
  // Component won't re-render if other parts of store change.
  const bears = useStore((state) => state.bears);
  return <h1>{bears} around here ...</h1>;
}`,

  memo: `// useMemo vs useCallback vs React.memo

// 1. React.memo: Wraps Component
// Re-renders only if props change
const Child = React.memo(({ onClick }) => {
  console.log("Child render");
  return <button onClick={onClick}>Click</button>;
});

function Parent() {
  const [count, setCount] = useState(0);

  // 2. useCallback: Stabilizes function reference
  // Without this, 'handleClick' is new every render, breaking React.memo above
  const handleClick = useCallback(() => {
    console.log("Clicked");
  }, []);

  // 3. useMemo: Caches expensive value
  const expensiveValue = useMemo(() => {
    return heavyCalculation(count);
  }, [count]);

  return (
    <>
      <Child onClick={handleClick} />
      <div>Result: {expensiveValue}</div>
    </>
  );
}`,

  lazy: `// Lazy Loading & Suspense

import React, { Suspense, lazy } from 'react';

// Dynamic Import (Webpack/Vite splits this into separate chunk)
const HeavyChart = lazy(() => import('./HeavyChart'));

function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      
      {/* Fallback shown while chunk is downloading */}
      <Suspense fallback={<LoadingSpinner />}>
        <HeavyChart />
      </Suspense>
    </div>
  );
}`
}
</script>
