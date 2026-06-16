<template>
  <div class="learn-logical min-h-screen">
    <!-- Header -->
    <div class="px-4 md:px-8 py-8 pb-4 max-w-6xl mx-auto">
      <a href="/learn" class="inline-flex items-center gap-1 text-sm text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors mb-4">
        ← Back to Topics
      </a>
      <div class="flex items-center gap-3 mb-2">
        <span class="text-3xl">🧩</span>
        <h1 class="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">Logical Challenges</h1>
      </div>
      <p class="text-gray-500 dark:text-gray-400 text-sm md:text-base max-w-2xl">
        Polyfill implementations, string manipulation, object utilities, and classic interview coding challenges with runnable solutions.
      </p>
    </div>

    <!-- Layout -->
    <div class="px-4 md:px-8 max-w-6xl mx-auto flex flex-col lg:flex-row gap-6 pb-16">
      <SectionNav
        :sections="sections"
        :activeSection="activeSection"
        activeColor="bg-cyan-600"
        @select="setSection"
        class="lg:w-56 flex-shrink-0"
      />

      <div class="flex-1 min-w-0 space-y-5">
        <!-- ==================== POLYFILLS ==================== -->
        <template v-if="activeSection === 'polyfills'">
          <ConceptCard
            id="map-polyfill"
            icon="🔧"
            title="Array.prototype.map Polyfill"
            subtitle="Write it from scratch"
            definition="map() creates a new array by calling a function on every element. It doesn't mutate the original. Your polyfill must: accept a callback with (element, index, array) args, return a new array, and handle edge cases."
            analogy="map() is like a factory assembly line - each raw material (element) goes through a machine (callback), and the output is a completely new product (new array). The raw materials stay untouched."
            seniorTip="In interviews, show you understand: 1) it returns a NEW array, 2) callback receives (value, index, array), 3) 'this' binding via second argument. Bonus: handle sparse arrays."
            defaultOpen
          >
            <CodePlayground
              title="map-polyfill.js"
              :initialCode="codes.mapPolyfill"
              :autoRun="false"
            />
          </ConceptCard>

          <ConceptCard
            id="filter-polyfill"
            icon="🔧"
            title="Array.prototype.filter Polyfill"
            subtitle="The gatekeeper function"
            definition="filter() creates a new array with elements that pass a test function. The callback returns true/false for each element. Only truthy results are included in the output."
            analogy="filter() is like a bouncer at a club - everyone lines up (array), the bouncer checks each person (callback), and only those who pass the check (return true) get into the new VIP list (new array)."
            seniorTip="filter + map is the most common combination. Know that filter ALWAYS returns an array (even empty). Use findIndex if you want just one match."
          >
            <CodePlayground
              title="filter-polyfill.js"
              :initialCode="codes.filterPolyfill"
              :autoRun="false"
            />
          </ConceptCard>

          <ConceptCard
            id="reduce-polyfill"
            icon="🔧"
            title="Array.prototype.reduce Polyfill"
            subtitle="The swiss-army knife of arrays"
            definition="reduce() executes a reducer function on each element, accumulating a single result. Takes (accumulator, currentValue, index, array). The initial value is optional but recommended - without it, the first element becomes the initial accumulator."
            analogy="reduce() is like a snowball rolling downhill - it starts small (initial value), picks up more snow (each element), and by the end it's combined everything into one big snowball (result)."
            seniorTip="reduce can implement map, filter, flat, groupBy, and more. But don't abuse it - if map or filter is clearer, use those. The interview power move: implement groupBy with reduce."
          >
            <CodePlayground
              title="reduce-polyfill.js"
              :initialCode="codes.reducePolyfill"
              :autoRun="false"
            />
          </ConceptCard>

          <ConceptCard
            id="debounce-impl"
            icon="⏱️"
            title="Debounce Implementation"
            subtitle="Wait for the user to stop typing"
            definition="Debounce delays execution until a pause in events. Each new event resets the timer. Only fires after the specified delay of inactivity. Used for: search input, resize handlers, scroll events."
            analogy="Debounce is like an elevator door - it waits until people stop entering (events stop) before closing (executing). Each new person resets the wait timer."
            seniorTip="Implement both leading and trailing edge. The leading edge fires immediately on the first call, then waits. Know the difference between debounce (wait for pause) and throttle (limit frequency)."
          >
            <CodePlayground
              title="debounce.js"
              :initialCode="codes.debounce"
              :autoRun="false"
            />
          </ConceptCard>

          <ConceptCard
            id="throttle-impl"
            icon="🚰"
            title="Throttle Implementation"
            subtitle="Limit execution frequency"
            definition="Throttle ensures a function runs at most once per specified interval, regardless of how often it's called. Used for: scroll handlers, mousemove, API rate limiting."
            analogy="Throttle is like a faucet - no matter how hard you turn it (events), water (executions) only flows at a fixed rate. Debounce waits for you to stop turning."
            seniorTip="Common mistake: confusing debounce and throttle. Throttle = execute every N ms (regular intervals). Debounce = execute after N ms of silence. Use throttle for continuous events, debounce for burst events."
          >
            <CodePlayground
              title="throttle.js"
              :initialCode="codes.throttle"
              :autoRun="false"
            />
          </ConceptCard>
        </template>

        <!-- ==================== OBJECT UTILITIES ==================== -->
        <template v-if="activeSection === 'objects'">
          <ConceptCard
            id="deep-clone"
            icon="📋"
            title="Deep Clone"
            subtitle="Copy everything, share nothing"
            definition="Deep clone creates a completely independent copy of an object, including nested objects, arrays, dates, and maps. Shallow copy (spread, Object.assign) only copies the first level - nested references are shared."
            analogy="Shallow copy is like photocopying a folder - you get the folder but the photos inside are still the originals. Deep clone is like individually photographing every photo and making entirely new copies."
            seniorTip="structuredClone() is the modern native solution (supported in all browsers). For interviews, implement recursive deep clone handling: objects, arrays, Date, Map, Set, and circular references."
            defaultOpen
          >
            <CodePlayground
              title="deep-clone.js"
              :initialCode="codes.deepClone"
              :autoRun="false"
            />
          </ConceptCard>

          <ConceptCard
            id="flatten"
            icon="📐"
            title="Array & Object Flatten"
            subtitle="Flatten nested structures"
            definition="Array flatten: [1, [2, [3]]] → [1, 2, 3]. Object flatten: { a: { b: 1 } } → { 'a.b': 1 }. Both use recursion. Array.prototype.flat(Infinity) is the native solution for arrays."
            analogy="Flattening is like ironing a crumpled shirt - multiple layers of fabric (nesting) become one smooth surface (flat structure)."
            seniorTip="Know Array.prototype.flat(depth). For a flat polyfill, use recursion with concat. For object flatten, use a prefix parameter. Handle edge cases: null, undefined, empty arrays, circular references."
          >
            <CodePlayground
              title="flatten.js"
              :initialCode="codes.flatten"
              :autoRun="false"
            />
          </ConceptCard>

          <ConceptCard
            id="curry"
            icon="🍛"
            title="Currying & Partial Application"
            subtitle="Functions that remember their arguments"
            definition="Currying transforms f(a, b, c) into f(a)(b)(c). Each call returns a new function until all arguments are provided. Partial application fixes some arguments upfront. Both enable function composition and reusability."
            analogy="Currying is like a vending machine with multiple slots - insert coin 1 (arg 1), then coin 2 (arg 2), then the item drops (result). Each coin slot remembers the previous coins."
            seniorTip="Implement a generic curry function that handles any number of arguments. Use Function.length to know when all args are provided. Real-world use: event handlers with pre-filled context, configuration builders."
          >
            <CodePlayground
              title="curry.js"
              :initialCode="codes.curry"
              :autoRun="false"
            />
          </ConceptCard>
        </template>

        <!-- ==================== STRING & MISC ==================== -->
        <template v-if="activeSection === 'strings'">
          <ConceptCard
            id="string-reverse"
            icon="🔀"
            title="String Reversal & Palindrome"
            subtitle="The warm-up classic"
            definition="Reverse a string in-place or via new string. Multiple approaches: spread + reverse + join, two-pointer swap, recursion, reduce. Palindrome: string reads the same forwards and backwards."
            analogy="String reversal is like reading a word in a mirror - 'hello' becomes 'olleh'. A palindrome is a word that looks the same in the mirror ('racecar')."
            seniorTip="The most efficient approach: two-pointer swap (in-place, O(1) space). For interviews, know all approaches and their trade-offs. Handle Unicode correctly (emojis are multi-byte)."
            defaultOpen
          >
            <CodePlayground
              title="string-reverse.js"
              :initialCode="codes.stringReverse"
              :autoRun="false"
            />
          </ConceptCard>

          <ConceptCard
            id="anagram"
            icon="🔤"
            title="Anagram & Character Frequency"
            subtitle="Do they use the same letters?"
            definition="Two strings are anagrams if they contain the exact same characters with the same frequency. Approach: sort both and compare, OR use a frequency map (O(n) vs O(n log n))."
            analogy="Anagrams are like bag-of-Scrabble-tiles - 'listen' and 'silent' use the exact same tiles, just rearranged."
            seniorTip="Always use the frequency map approach in interviews (O(n) time, O(k) space where k = unique chars). Mention you'd normalize: lowercase, remove spaces. Follow up with: 'grouped anagrams' (common LC medium)."
          >
            <CodePlayground
              title="anagram.js"
              :initialCode="codes.anagram"
              :autoRun="false"
            />
          </ConceptCard>

          <ConceptCard
            id="promises"
            icon="🤝"
            title="Promise.all / Promise.race Polyfill"
            subtitle="Coordinate multiple async operations"
            definition="Promise.all: resolves when ALL promises resolve, rejects if ANY rejects. Promise.race: resolves/rejects with the FIRST settled promise. Promise.allSettled: waits for ALL, never rejects."
            analogy="Promise.all = group dinner reservation - everyone must arrive before you're seated (all resolve), one cancellation cancels for everyone. Promise.race = race to the finish - first to cross the line wins."
            seniorTip="Implement Promise.all from scratch: track resolved count, collect results in order (not completion order), reject immediately on any rejection. Bonus: implement Promise.allSettled."
          >
            <CodePlayground
              title="promise-all.js"
              :initialCode="codes.promiseAll"
              :autoRun="false"
            />
          </ConceptCard>
        </template>

        <!-- ==================== PROBLEM SOLVING ==================== -->
        <template v-if="activeSection === 'problems'">
          <ConceptCard
            id="event-emitter"
            icon="📡"
            title="Event Emitter Implementation"
            subtitle="The pub/sub pattern from scratch"
            definition="EventEmitter: on(event, callback) subscribes, emit(event, ...args) fires all callbacks, off(event, callback) unsubscribes. It's the foundation of Node.js events, Vue's event bus, and DOM events."
            analogy="EventEmitter is like a radio station - listeners tune in (on), the station broadcasts (emit), and listeners can unsubscribe (off). Multiple listeners can tune into the same frequency."
            seniorTip="Implement: on, off, emit, once. Handle edge cases: remove listener during emit, add listener during emit, once that auto-removes. Return 'this' for chaining. This pattern appears in every framework."
            defaultOpen
          >
            <CodePlayground
              title="event-emitter.js"
              :initialCode="codes.eventEmitter"
              :autoRun="false"
            />
          </ConceptCard>

          <ConceptCard
            id="lru-cache"
            icon="🗄️"
            title="LRU Cache"
            subtitle="Least Recently Used eviction"
            definition="LRU Cache stores key-value pairs with a max capacity. When full, the least recently used item is evicted. get() and put() must be O(1). Implementation: HashMap + Doubly Linked List."
            analogy="LRU Cache is like a phone's recent apps - it shows the most recently used apps. When you open a new app and the list is full, the app you haven't used for the longest time disappears."
            seniorTip="Use Map in JavaScript (preserves insertion order). On get/put: delete and re-insert to move to end (most recent). On overflow: delete first key (least recent). This is LeetCode #146 - very commonly asked."
          >
            <CodePlayground
              title="lru-cache.js"
              :initialCode="codes.lruCache"
              :autoRun="false"
            />
          </ConceptCard>

          <ConceptCard
            id="memoize"
            icon="🧠"
            title="Generic Memoize Function"
            subtitle="Cache function results"
            definition="Memoize wraps a function and caches its results based on arguments. If called again with the same args, returns cached result instead of recomputing. Key challenge: creating a unique cache key from arguments."
            analogy="Memoize is like writing answers in the margins of your textbook - the first time you solve a problem, you write the answer. Next time you see it, you just read the margin instead of solving again."
            seniorTip="Handle multi-argument caching with JSON.stringify as key (simple) or a nested Map (efficient). Consider WeakMap for object arguments to prevent memory leaks. Add TTL (time-to-live) for production use."
          >
            <CodePlayground
              title="memoize.js"
              :initialCode="codes.memoize"
              :autoRun="false"
            />
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
  { id: 'polyfills', label: 'Polyfills', icon: '🔧', badge: '5' },
  { id: 'objects', label: 'Objects', icon: '📋', badge: '3' },
  { id: 'strings', label: 'Strings & Async', icon: '🔤', badge: '3' },
  { id: 'problems', label: 'Problems', icon: '📡', badge: '3' },
]

const activeSection = ref('polyfills')

function setSection(id) {
  activeSection.value = id
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const codes = {
  mapPolyfill: `// Implement Array.prototype.map from scratch

Array.prototype.myMap = function(callback, thisArg) {
  if (typeof callback !== 'function') {
    throw new TypeError(callback + ' is not a function');
  }

  const result = [];
  for (let i = 0; i < this.length; i++) {
    // Check if index exists (handle sparse arrays)
    if (i in this) {
      result[i] = callback.call(thisArg, this[i], i, this);
    }
  }
  return result;
};

// Test it!
const nums = [1, 2, 3, 4, 5];
const doubled = nums.myMap(x => x * 2);
console.log("Original:", nums);
console.log("Doubled:", doubled);

// Test with index
const indexed = nums.myMap((val, idx) => val + " at " + idx);
console.log("With index:", indexed);

// Test sparse array
const sparse = [1, , 3];
console.log("Sparse:", sparse.myMap(x => x * 10));`,

  filterPolyfill: `// Implement Array.prototype.filter from scratch

Array.prototype.myFilter = function(callback, thisArg) {
  if (typeof callback !== 'function') {
    throw new TypeError(callback + ' is not a function');
  }

  const result = [];
  for (let i = 0; i < this.length; i++) {
    if (i in this) {
      // Only push if callback returns truthy
      if (callback.call(thisArg, this[i], i, this)) {
        result.push(this[i]);
      }
    }
  }
  return result;
};

// Test it!
const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const evens = nums.myFilter(x => x % 2 === 0);
console.log("Evens:", evens);

const words = ["hello", "hi", "hey", "greetings", "yo"];
const long = words.myFilter(w => w.length > 3);
console.log("Long words:", long);

// Chaining with myMap
const result = nums
  .myFilter(x => x > 5)
  .myMap(x => x * 10);
console.log("Filter > 5, then * 10:", result);`,

  reducePolyfill: `// Implement Array.prototype.reduce from scratch

Array.prototype.myReduce = function(callback, initialValue) {
  if (typeof callback !== 'function') {
    throw new TypeError(callback + ' is not a function');
  }

  let accumulator;
  let startIndex;

  if (initialValue !== undefined) {
    accumulator = initialValue;
    startIndex = 0;
  } else {
    if (this.length === 0) {
      throw new TypeError('Reduce of empty array with no initial value');
    }
    accumulator = this[0];
    startIndex = 1;
  }

  for (let i = startIndex; i < this.length; i++) {
    if (i in this) {
      accumulator = callback(accumulator, this[i], i, this);
    }
  }

  return accumulator;
};

// Test: sum
const sum = [1, 2, 3, 4, 5].myReduce((acc, val) => acc + val, 0);
console.log("Sum:", sum);

// Test: groupBy with reduce
const people = [
  { name: "Alice", dept: "Eng" },
  { name: "Bob", dept: "Sales" },
  { name: "Carol", dept: "Eng" },
];

const grouped = people.myReduce((acc, person) => {
  acc[person.dept] = acc[person.dept] || [];
  acc[person.dept].push(person.name);
  return acc;
}, {});
console.log("Grouped:", grouped);`,

  debounce: `// Implement debounce from scratch

function debounce(fn, delay) {
  let timerId;

  return function(...args) {
    // Clear previous timer on each call
    clearTimeout(timerId);

    // Set new timer
    timerId = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}

// Test it!
let callCount = 0;
const search = debounce((query) => {
  callCount++;
  console.log("API call #" + callCount + ": searching for '" + query + "'");
}, 300);

// Simulate rapid typing
console.log("Typing 'hello' rapidly...");
search("h");
search("he");
search("hel");
search("hell");
search("hello");  // Only this one fires after 300ms

// Wait and see the result
setTimeout(() => {
  console.log("\\nTotal API calls: " + callCount);
  console.log("(Only 1 - the last call after 300ms of silence!)");
}, 500);`,

  throttle: `// Implement throttle from scratch

function throttle(fn, limit) {
  let lastCall = 0;
  let timer = null;

  return function(...args) {
    const now = Date.now();

    if (now - lastCall >= limit) {
      // Enough time passed - execute immediately
      lastCall = now;
      fn.apply(this, args);
    } else if (!timer) {
      // Schedule trailing call
      timer = setTimeout(() => {
        lastCall = Date.now();
        timer = null;
        fn.apply(this, args);
      }, limit - (now - lastCall));
    }
  };
}

// Test it!
let count = 0;
const logScroll = throttle(() => {
  count++;
  console.log("Scroll handler #" + count + " at " + Date.now());
}, 200);

// Simulate rapid scroll events (10 events in 100ms)
console.log("Simulating 10 rapid scroll events...");
for (let i = 0; i < 10; i++) {
  logScroll();
}

setTimeout(() => {
  console.log("\\nThrottle limited " + 10 + " events → " + count + " executions");
  console.log("(First fires immediately, rest limited to 1 per 200ms)");
}, 500);`,

  deepClone: `// Deep Clone Implementation

function deepClone(obj, seen = new WeakMap()) {
  // Handle primitives and null
  if (obj === null || typeof obj !== 'object') return obj;

  // Handle circular references
  if (seen.has(obj)) return seen.get(obj);

  // Handle Date
  if (obj instanceof Date) return new Date(obj.getTime());

  // Handle RegExp
  if (obj instanceof RegExp) return new RegExp(obj.source, obj.flags);

  // Handle Array
  if (Array.isArray(obj)) {
    const clone = [];
    seen.set(obj, clone);
    obj.forEach((item, i) => { clone[i] = deepClone(item, seen); });
    return clone;
  }

  // Handle Map
  if (obj instanceof Map) {
    const clone = new Map();
    seen.set(obj, clone);
    obj.forEach((val, key) => { clone.set(key, deepClone(val, seen)); });
    return clone;
  }

  // Handle Object
  const clone = Object.create(Object.getPrototypeOf(obj));
  seen.set(obj, clone);
  for (const key of Object.keys(obj)) {
    clone[key] = deepClone(obj[key], seen);
  }
  return clone;
}

// Test it!
const original = {
  name: "Alice",
  address: { city: "NYC", zip: [1, 0, 0, 0, 1] },
  born: new Date("1990-01-01"),
};

const cloned = deepClone(original);
cloned.address.city = "LA";
cloned.address.zip.push(9);

console.log("Original city:", original.address.city);  // NYC ✅
console.log("Cloned city:", cloned.address.city);       // LA
console.log("Original zip:", original.address.zip);     // [1,0,0,0,1] ✅
console.log("Cloned zip:", cloned.address.zip);         // [1,0,0,0,1,9]
console.log("\\n✅ Deep clone - no shared references!");`,

  flatten: `// Flatten Array & Object

// 1. Array Flatten
function flattenArray(arr, depth = Infinity) {
  const result = [];
  function helper(items, d) {
    for (const item of items) {
      if (Array.isArray(item) && d > 0) {
        helper(item, d - 1);
      } else {
        result.push(item);
      }
    }
  }
  helper(arr, depth);
  return result;
}

const nested = [1, [2, [3, [4, [5]]]]];
console.log("Flat(1):", flattenArray(nested, 1));
console.log("Flat(∞):", flattenArray(nested));

// 2. Object Flatten
function flattenObject(obj, prefix = '', result = {}) {
  for (const key of Object.keys(obj)) {
    const newKey = prefix ? prefix + '.' + key : key;
    if (obj[key] && typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
      flattenObject(obj[key], newKey, result);
    } else {
      result[newKey] = obj[key];
    }
  }
  return result;
}

const config = {
  db: { host: "localhost", port: 5432 },
  app: { name: "MyApp", debug: true },
};
console.log("\\nFlattened object:", flattenObject(config));`,

  curry: `// Currying Implementation

function curry(fn) {
  return function curried(...args) {
    // If enough args, call the original function
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    }
    // Otherwise, return a new function that collects more args
    return function(...moreArgs) {
      return curried.apply(this, [...args, ...moreArgs]);
    };
  };
}

// Test it!
function add(a, b, c) {
  return a + b + c;
}

const curriedAdd = curry(add);

console.log("curry(add)(1)(2)(3):", curriedAdd(1)(2)(3));
console.log("curry(add)(1, 2)(3):", curriedAdd(1, 2)(3));
console.log("curry(add)(1)(2, 3):", curriedAdd(1)(2, 3));
console.log("curry(add)(1, 2, 3):", curriedAdd(1, 2, 3));

// Real-world use: creating specialized functions
const multiply = curry((a, b) => a * b);
const double = multiply(2);
const triple = multiply(3);

console.log("\\ndouble(5):", double(5));
console.log("triple(5):", triple(5));`,

  stringReverse: `// String Reversal - Multiple Approaches

// Approach 1: Built-in methods
function reverse1(str) {
  return [...str].reverse().join('');
}

// Approach 2: Two-pointer (most efficient)
function reverse2(str) {
  const arr = [...str];
  let left = 0, right = arr.length - 1;
  while (left < right) {
    [arr[left], arr[right]] = [arr[right], arr[left]];
    left++;
    right--;
  }
  return arr.join('');
}

// Approach 3: Reduce
function reverse3(str) {
  return [...str].reduce((rev, char) => char + rev, '');
}

// Test all approaches
const test = "Hello, World!";
console.log("Original:", test);
console.log("Method 1 (spread+reverse):", reverse1(test));
console.log("Method 2 (two-pointer):", reverse2(test));
console.log("Method 3 (reduce):", reverse3(test));

// Palindrome check
function isPalindrome(str) {
  const clean = str.toLowerCase().replace(/[^a-z0-9]/g, '');
  return clean === [...clean].reverse().join('');
}

console.log("\\nPalindrome checks:");
console.log("'racecar':", isPalindrome("racecar"));
console.log("'A man a plan a canal Panama':", isPalindrome("A man a plan a canal Panama"));
console.log("'hello':", isPalindrome("hello"));`,

  anagram: `// Anagram Check - Frequency Map Approach

function isAnagram(str1, str2) {
  // Normalize: lowercase, remove non-alpha
  const clean = s => s.toLowerCase().replace(/[^a-z]/g, '');
  const a = clean(str1);
  const b = clean(str2);

  if (a.length !== b.length) return false;

  // Build frequency map
  const freq = {};
  for (const char of a) {
    freq[char] = (freq[char] || 0) + 1;
  }

  // Subtract frequencies
  for (const char of b) {
    if (!freq[char]) return false;
    freq[char]--;
  }

  return true;
}

console.log("Anagram tests:");
console.log("listen / silent:", isAnagram("listen", "silent"));
console.log("hello / world:", isAnagram("hello", "world"));
console.log("Astronomer / Moon starer:", isAnagram("Astronomer", "Moon starer"));

// Bonus: Group anagrams
function groupAnagrams(words) {
  const groups = {};
  for (const word of words) {
    const key = [...word.toLowerCase()].sort().join('');
    groups[key] = groups[key] || [];
    groups[key].push(word);
  }
  return Object.values(groups);
}

console.log("\\nGrouped anagrams:");
const words = ["eat", "tea", "tan", "ate", "nat", "bat"];
console.log(JSON.stringify(groupAnagrams(words)));`,

  promiseAll: `// Promise.all Polyfill

function promiseAll(promises) {
  return new Promise((resolve, reject) => {
    const results = [];
    let completed = 0;
    const total = promises.length;

    if (total === 0) {
      resolve([]);
      return;
    }

    promises.forEach((promise, index) => {
      // Wrap in Promise.resolve to handle non-promise values
      Promise.resolve(promise)
        .then(value => {
          results[index] = value;  // Maintain order!
          completed++;
          if (completed === total) {
            resolve(results);
          }
        })
        .catch(reject);  // Reject immediately on first error
    });
  });
}

// Test: all succeed
promiseAll([
  Promise.resolve(1),
  Promise.resolve(2),
  Promise.resolve(3),
]).then(r => console.log("All resolved:", r));

// Test: one fails
promiseAll([
  Promise.resolve("ok"),
  Promise.reject("ERROR!"),
  Promise.resolve("also ok"),
]).catch(e => console.log("Rejected:", e));

// Test: with non-promise values
promiseAll([1, "hello", true])
  .then(r => console.log("Non-promises:", r));`,

  eventEmitter: `// Event Emitter Implementation

class EventEmitter {
  constructor() {
    this.events = {};
  }

  on(event, callback) {
    if (!this.events[event]) this.events[event] = [];
    this.events[event].push(callback);
    return this; // for chaining
  }

  off(event, callback) {
    if (!this.events[event]) return this;
    this.events[event] = this.events[event].filter(cb => cb !== callback);
    return this;
  }

  emit(event, ...args) {
    if (!this.events[event]) return false;
    this.events[event].forEach(cb => cb(...args));
    return true;
  }

  once(event, callback) {
    const wrapper = (...args) => {
      callback(...args);
      this.off(event, wrapper);
    };
    this.on(event, wrapper);
    return this;
  }
}

// Test it!
const emitter = new EventEmitter();

emitter.on('greet', name => console.log("Hello, " + name + "!"));
emitter.on('greet', name => console.log("Welcome, " + name + "!"));

emitter.emit('greet', 'Alice');

// Once - fires only once
emitter.once('init', () => console.log("\\nInitialized! (only once)"));
emitter.emit('init');
emitter.emit('init');  // Won't fire

console.log("\\n✅ Custom EventEmitter working!");`,

  lruCache: `// LRU Cache - Using Map (preserves order)

class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.cache = new Map();
  }

  get(key) {
    if (!this.cache.has(key)) return -1;

    // Move to end (most recently used)
    const value = this.cache.get(key);
    this.cache.delete(key);
    this.cache.set(key, value);
    return value;
  }

  put(key, value) {
    // If exists, delete first (will re-insert at end)
    if (this.cache.has(key)) {
      this.cache.delete(key);
    }

    // If at capacity, evict least recently used (first key)
    if (this.cache.size >= this.capacity) {
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
      console.log("  Evicted key:", firstKey);
    }

    this.cache.set(key, value);
  }

  toString() {
    return JSON.stringify([...this.cache.entries()]);
  }
}

// Test it!
const cache = new LRUCache(3);

cache.put("a", 1);
cache.put("b", 2);
cache.put("c", 3);
console.log("Cache:", cache.toString());

cache.get("a");  // Access 'a' - moves to end
cache.put("d", 4);  // Evicts 'b' (least recently used)
console.log("After get(a) + put(d):", cache.toString());

console.log("get(b):", cache.get("b"));  // -1 (was evicted)
console.log("get(a):", cache.get("a"));  // 1 (still here)`,

  memoize: `// Generic Memoize Function

function memoize(fn) {
  const cache = new Map();

  return function(...args) {
    // Create cache key from arguments
    const key = JSON.stringify(args);

    if (cache.has(key)) {
      console.log("  📦 Cache hit for:", key);
      return cache.get(key);
    }

    console.log("  🔨 Computing for:", key);
    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  };
}

// Test: expensive Fibonacci
function fib(n) {
  if (n <= 1) return n;
  return memoizedFib(n - 1) + memoizedFib(n - 2);
}

const memoizedFib = memoize(fib);

console.log("fib(10):", memoizedFib(10));
console.log("\\nfib(10) again:");
console.log("Result:", memoizedFib(10));  // Instant!

// Test: generic function
const expensiveCalc = memoize((a, b) => {
  return a * b + a;
});

console.log("\\n5 * 3 + 5:", expensiveCalc(5, 3));
console.log("5 * 3 + 5:", expensiveCalc(5, 3));  // Cached!
console.log("2 * 4 + 2:", expensiveCalc(2, 4));`,
}
</script>
