<template>
  <div class="learn-module min-h-screen">
    <!-- Header -->
    <div class="px-4 md:px-8 py-8 pb-4 max-w-6xl mx-auto">
      <a href="/learn/ai-engineer" class="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors mb-4">
        ← Back to Curriculum
      </a>
      <div class="flex items-center gap-3 mb-2">
        <span class="text-3xl">🐍</span>
        <h1 class="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">M1.1 Python Basics</h1>
      </div>
      <p class="text-gray-600 dark:text-gray-400 text-sm md:text-base max-w-2xl">
        Variables, types, operators, data structures (lists, dicts, tuples, sets), control flow, and functions. 
        Your foundation for data engineering and machine learning.
      </p>
    </div>

    <!-- Layout: Nav + Content -->
    <div class="px-4 md:px-8 max-w-6xl mx-auto flex flex-col lg:flex-row gap-6 pb-16">
      <SectionNav
        :sections="sections"
        :activeSection="activeSection"
        activeColor="bg-emerald-600"
        @select="setSection"
        class="lg:w-64 flex-shrink-0"
      />

      <div class="flex-1 min-w-0 space-y-8">
        
        <!-- ==================== 1. CONCEPT OVERVIEW ==================== -->
        <template v-if="activeSection === 'overview'">
          <div class="bg-gradient-to-br from-emerald-900 to-teal-900 rounded-2xl p-8 md:p-12 text-center text-white shadow-xl relative overflow-hidden group mb-8">
            <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 via-teal-500 to-cyan-500"></div>
            <div class="text-6xl mb-6 transform group-hover:scale-110 transition-transform duration-500">🔭</div>
            <h2 class="text-3xl md:text-4xl font-bold mb-4 tracking-tight">1. Concept Overview</h2>
            <p class="text-emerald-100 mb-8 max-w-lg mx-auto">Python is the lingua franca of Artificial Intelligence. To bend data to your will, you must master its primitives.</p>
          </div>

          <ConceptCard
            id="overview-python"
            icon="🧠"
            title="Why Python for AI?"
            subtitle="The syntax of intelligence"
            definition="Python is a high-level, interpreted language. What it lacks in raw execution speed (C/C++), it makes up for with developer velocity and a massive C-optimized backend ecosystem (NumPy, PyTorch). You write Python logic; C/C++ does the heavy lifting underneath."
            analogy="Python is the steering wheel and dashboard. You don't build the engine (C/C++); you just use Python to drive it."
            seniorTip="In AI, Python is rarely used to execute heavy loops directly. We use it to ORCHESTRATE operations that run on heavily optimized C++ or CUDA (GPU) backends."
            defaultOpen
          >
            <div class="mt-4 p-4 rounded-xl bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-white/5">
              <h4 class="font-semibold text-gray-900 dark:text-white mb-2 text-sm">Where it is used in real systems:</h4>
              <ul class="list-disc pl-5 text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <li><strong>Data Loading:</strong> Parsing millions of text files or CSV rows.</li>
                <li><strong>Model Architecture:</strong> Defining the layers of a neural network in PyTorch.</li>
                <li><strong>Serving:</strong> Wrapping the ML model in a FastAPI endpoint for applications to consume.</li>
              </ul>
            </div>
          </ConceptCard>
        </template>

        <!-- ==================== 2. INTUITION FIRST ==================== -->
        <template v-if="activeSection === 'intuition'">
          <ConceptCard
            id="intuition"
            icon="💡"
            title="Mental Models: Names vs Boxes"
            subtitle="How Python thinks about data"
            definition="In languages like C, a variable is a physical 'box' in memory. In Python, variables are 'name tags' attached to objects."
            analogy="If you say `a = [1, 2, 3]` and `b = a`, you didn't copy the data. You literally just printed a new label 'b' and stuck it onto the exact same list that 'a' is sitting on. Modifying 'b' modifies 'a'."
            seniorTip="Understanding that 'everything is an object' and variables are just pointers to those objects is the single most important concept to prevent nasty bugs when mutating lists/dicts."
            defaultOpen
          >
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div class="p-5 rounded-xl border border-blue-200 dark:border-blue-900/30 bg-blue-50/50 dark:bg-blue-900/10">
                <div class="font-bold text-blue-800 dark:text-blue-300 mb-2">Variables in C/Java (Boxes)</div>
                <div class="font-mono text-sm text-blue-900 dark:text-blue-200 space-y-2">
                  <div>int a = 5; <span class="text-blue-600 dark:text-blue-400 whitespace-nowrap">// Put 5 in box 'a'</span></div>
                  <div>int b = a; <span class="text-blue-600 dark:text-blue-400 whitespace-nowrap">// Copy 5 to box 'b'</span></div>
                </div>
              </div>
              <div class="p-5 rounded-xl border border-emerald-200 dark:border-emerald-900/30 bg-emerald-50/50 dark:bg-emerald-900/10">
                <div class="font-bold text-emerald-800 dark:text-emerald-300 mb-2">Variables in Python (Tags)</div>
                <div class="font-mono text-sm text-emerald-900 dark:text-emerald-200 space-y-2">
                  <div>a = 5 <span class="text-emerald-600 dark:text-emerald-400 whitespace-nowrap">// Create object 5, stick label 'a'</span></div>
                  <div>b = a <span class="text-emerald-600 dark:text-emerald-400 whitespace-nowrap">// Stick label 'b' on that same object 5</span></div>
                </div>
              </div>
            </div>
          </ConceptCard>
        </template>

        <!-- ==================== 3. TECHNICAL DEEP DIVE ==================== -->
        <template v-if="activeSection === 'deep-dive'">
          <ConceptCard
            id="deep-dive"
            icon="🔬"
            title="Core Python Primitives & Structures"
            subtitle="The building blocks of AI"
            definition="The core structures govern how we manage state. Lists provide ordered collection (tensors representation). Dicts map keys to values (JSON payloads). Sets offer O(1) membership testing (vocabulary building). Tuples act as immutable records (dataset rows)."
            seniorTip="Dictionary lookups in Python are highly optimized (O(1) average time) due to underlying hash tables. In AI workloads, checking if an item is in a SET is vastly superior to checking a LIST."
            defaultOpen
          >
             <div class="space-y-4 mt-4">
              <div class="border border-gray-200 dark:border-white/10 rounded-xl overflow-hidden">
                <table class="w-full text-left text-sm">
                  <thead class="bg-gray-100 dark:bg-white/5 border-b border-gray-200 dark:border-white/10">
                    <tr>
                      <th class="p-3 font-semibold text-gray-900 dark:text-white">Type</th>
                      <th class="p-3 font-semibold text-gray-900 dark:text-white">Properties</th>
                      <th class="p-3 font-semibold text-gray-900 dark:text-white">AI / Data Use Case</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-gray-200 dark:divide-white/10 text-gray-600 dark:text-gray-300">
                    <tr>
                      <td class="p-3 font-mono text-emerald-600 dark:text-emerald-400">List []</td>
                      <td class="p-3">Mutable, Ordered, Allows Duplicates</td>
                      <td class="p-3">Queues, arrays of sequences, batches of images</td>
                    </tr>
                    <tr>
                      <td class="p-3 font-mono text-emerald-600 dark:text-emerald-400">Dict {}</td>
                      <td class="p-3">Mutable, Key-Value pair, Unordered</td>
                      <td class="p-3">Configuration, mapping token IDs to words to build vocabulary</td>
                    </tr>
                    <tr>
                      <td class="p-3 font-mono text-emerald-600 dark:text-emerald-400">Set (,)</td>
                      <td class="p-3">Mutable, Unordered, Unique elements</td>
                      <td class="p-3">O(1) lookups, finding unique tokens in a massive corpus</td>
                    </tr>
                    <tr>
                      <td class="p-3 font-mono text-emerald-600 dark:text-emerald-400">Tuple ()</td>
                      <td class="p-3">Immutable, Ordered</td>
                      <td class="p-3">Returning multiple values (e.g., loss, gradients), model shapes</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </ConceptCard>

          <ConceptCard
            id="control-flow"
            icon="🛤️"
            title="Control Flow & Functions"
            subtitle="Logic and Scope"
            definition="Functions (def) block code into reusable, scoped logic. Loops (for/while) iterate over iterables. In Python, the `for x in y` construct uses an iterator protocol, meaning it can cleanly iterate over lists, dict keys, file lines, or generator objects without managing integer indices."
            analogy="A `for` loop in Python doesn't ask 'How long are you? Okay, start at 0, count up to length'. Instead, it asks the data structure: 'Give me your next item' until the structure says 'I am empty'."
          >
          </ConceptCard>
        </template>

        <!-- ==================== 4. VISUALIZATION ==================== -->
        <template v-if="activeSection === 'visualization'">
          <ConceptCard
            id="viz"
            icon="👁️"
            title="Visualizing Data Types and Mutability"
            subtitle="Pass-by-object-reference"
            definition="Visualizing Python in memory is critical for Deep Learning since Tensors (large matrix arrays) share underlying memory buffers to save RAM."
            defaultOpen
          >
            <div class="mt-4 p-6 bg-gray-900 dark:bg-black rounded-xl border border-gray-700 font-mono text-sm shadow-inner overflow-x-auto whitespace-pre">
<span class="text-green-400"># Immutable objects (Int, String, Tuple) - Reassignment creates a NEW object</span>
x = 10     <span class="text-blue-300"># Label x -> Object [10]</span>
y = x      <span class="text-blue-300"># Label y -> Object [10]</span>
x = x + 1  <span class="text-blue-300"># Label x -> NEW Object [11]. Label y still -> Object [10]</span>

<span class="text-green-400"># Mutable objects (List, Dict, Set) - Direct modification affects ALL labels</span>
a = [1, 2] <span class="text-blue-300"># Label a -> Object [1, 2]</span>
b = a      <span class="text-blue-300"># Label b -> Object [1, 2]</span>
a.append(3)<span class="text-blue-300"># Object is mutated. Both a and b now show [1, 2, 3]</span>
            </div>
            <p class="mt-4 text-sm text-gray-600 dark:text-gray-400">
              In deep learning, you will often perform operations like `y = x.view(...)` in PyTorch. Just like lists, `y` and `x` will share the same memory under the hood! 
            </p>
          </ConceptCard>
        </template>

        <!-- ==================== 5. CODE IMPLEMENTATION ==================== -->
        <template v-if="activeSection === 'code'">
          <div class="bg-gray-100 dark:bg-gray-800/50 p-6 rounded-2xl border border-gray-200 dark:border-white/10 mb-8">
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Implementation: Core Structures</h3>
            <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Study the syntax below. Notice how Python uses indentation (whitespace) instead of curly braces <code>{}</code> to define scope.
            </p>
            <div class="bg-[#1e1e1e] rounded-xl overflow-hidden text-sm font-mono leading-relaxed p-4 overflow-x-auto text-gray-300 shadow-xl border border-gray-700">
<pre><code><span class="text-blue-400">def</span> <span class="text-yellow-200">process_dataset</span>(data):
    <span class="text-green-400"># 1. Dictionary (Vocab mapping)</span>
    vocab = {<span class="text-orange-300">"ai"</span>: <span class="text-emerald-300">0</span>, <span class="text-orange-300">"is"</span>: <span class="text-emerald-300">1</span>, <span class="text-orange-300">"cool"</span>: <span class="text-emerald-300">2</span>}
    
    <span class="text-green-400"># 2. List (representing a sentence of ids)</span>
    encoded = []
    
    <span class="text-green-400"># 3. For loop & condition (Control Flow)</span>
    <span class="text-blue-400">for</span> word <span class="text-blue-400">in</span> data:
        word = word.lower()
        <span class="text-blue-400">if</span> word <span class="text-blue-400">in</span> vocab:
            encoded.append(vocab[word])
        <span class="text-blue-400">else</span>:
            encoded.append(-<span class="text-emerald-300">1</span>) <span class="text-green-400"># Unknown token</span>
            
    <span class="text-blue-400">return</span> encoded

<span class="text-green-400"># Execution</span>
sentence = [<span class="text-orange-300">"AI"</span>, <span class="text-orange-300">"Is"</span>, <span class="text-orange-300">"Cool"</span>, <span class="text-orange-300">"Right"</span>]
result = process_dataset(sentence)
print(<span class="text-orange-300">f"Output: {result}"</span>) <span class="text-green-400"># Output: [0, 1, 2, -1]</span></code></pre>
            </div>
          </div>

          <ConceptCard
            id="your-turn"
            icon="✍️"
            title="YOUR TURN: Code Tasks"
            subtitle="Apply the concepts directly"
            definition="Modify the conceptual snippet mentally or in an IDE to build intuition."
            defaultOpen
          >
            <div class="mt-4 space-y-4 text-sm text-gray-700 dark:text-gray-300">
              <div class="p-4 bg-white dark:bg-gray-800/80 rounded-xl border border-emerald-200 dark:border-emerald-800/30">
                <span class="font-bold text-emerald-600 dark:text-emerald-400 mb-2 block">Task 1: The Unique Filter</span>
                <p>Modify the function to return only UNIQUE encoded values. Hint: Use a data structure that automatically discards duplicates.</p>
              </div>
              <div class="p-4 bg-white dark:bg-gray-800/80 rounded-xl border border-blue-200 dark:border-blue-800/30">
                <span class="font-bold text-blue-600 dark:text-blue-400 mb-2 block">Task 2: Tuple Outputs</span>
                <p>Return a tuple containing both the `encoded` list AND an integer count of how many "Unknown (-1)" tokens were found.</p>
              </div>
            </div>
          </ConceptCard>
        </template>

        <!-- ==================== 6. MICRO-EXERCISES ==================== -->
        <template v-if="activeSection === 'exercises'">
          <ConceptCard
            id="micro-exercises"
            icon="⚡"
            title="Concept Checks"
            subtitle="Predict the output"
            definition="Read the following snippets and predict what prints. This tests your grasp of references and syntax."
            defaultOpen
          >
            <div class="space-y-6 mt-4">
              <!-- Exec 1 -->
              <div>
                <h4 class="font-semibold text-gray-900 dark:text-white text-sm mb-2">1. The Trap</h4>
                <div class="bg-gray-900 rounded-lg p-3 font-mono text-sm text-gray-300">
                  <pre>
a = [1, 2, 3]
b = a
b.append(4)
print(a)
# What prints?</pre>
                </div>
              </div>
              <!-- Exec 2 -->
              <div>
                <h4 class="font-semibold text-gray-900 dark:text-white text-sm mb-2">2. Dict Keys</h4>
                <div class="bg-gray-900 rounded-lg p-3 font-mono text-sm text-gray-300">
                  <pre>
d = {"AI": 1, "ML": 2}
d["DL"] = 3
print("DL" in d)
# True or False?</pre>
                </div>
              </div>
            </div>
          </ConceptCard>
        </template>

        <!-- ==================== 7. COMMON MISTAKES ==================== -->
        <template v-if="activeSection === 'mistakes'">
          <ConceptCard
            id="mistakes"
            icon="⚠️"
            title="Common Beginner Mistakes"
            subtitle="Save yourself hours of debugging"
            defaultOpen
          >
            <ul class="space-y-4 mt-4 text-sm text-gray-600 dark:text-gray-400">
              <li class="p-4 bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800/30 rounded-xl">
                <strong class="text-red-700 dark:text-red-400 block mb-1">1. Mutable Default Arguments</strong>
                `def train(data, logs=[]): ...` <br>
                Never use a list or dict as a default argument. The list is created ONCE when the function is defined, meaning every time you call it without passing `logs`, it appends to the SAME list, leaking data across calls. Use `logs=None`.
              </li>
              <li class="p-4 bg-orange-50 dark:bg-orange-900/10 border border-orange-200 dark:border-orange-800/30 rounded-xl">
                <strong class="text-orange-700 dark:text-orange-400 block mb-1">2. Modifying Lists While Iterating</strong>
                `for item in my_list: if x: my_list.remove(item)` <br>
                This skips elements and creates havoc because the list shifts while you iterate. Instead, iterate over a copy `for item in my_list[:]:` or build a new list using comprehensions.
              </li>
              <li class="p-4 bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800/30 rounded-xl">
                <strong class="text-amber-700 dark:text-amber-400 block mb-1">3. Confusing append() and extend()</strong>
                `append([1,2])` adds the whole list as a single element. `extend([1,2])` unpacks it and adds the items.
              </li>
            </ul>
          </ConceptCard>
        </template>

        <!-- ==================== 8. CONNECTIONS ==================== -->
        <template v-if="activeSection === 'connections'">
           <ConceptCard
            id="connections"
            icon="🔗"
            title="Curriculum Connections"
            subtitle="How this glues together the roadmap"
            defaultOpen
          >
            <div class="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="p-5 border border-purple-200 dark:border-purple-900/30 bg-purple-50/50 dark:bg-purple-900/10 rounded-xl text-sm">
                <span class="font-bold text-purple-700 dark:text-purple-400 block mb-2">➡️ M1.3 NumPy & Pandas</span>
                Standard Python lists are too slow/inefficient for millions of numbers. NumPy rewrites Python lists as contiguous C-arrays to do operations 100x faster. You must know dicts/lists to convert to them.
              </div>
              <div class="p-5 border border-indigo-200 dark:border-indigo-900/30 bg-indigo-50/50 dark:bg-indigo-900/10 rounded-xl text-sm">
                <span class="font-bold text-indigo-700 dark:text-indigo-400 block mb-2">➡️ Phase 4 PyTorch</span>
                A PyTorch training loop is literally just a Python `for` loop iterating over a Dataloader, updating a Dictionary of gradients, and passing Tuples back and forth.
              </div>
            </div>
          </ConceptCard>
        </template>

        <!-- ==================== 9. REAL-WORLD ==================== -->
        <template v-if="activeSection === 'real-world'">
          <ConceptCard
            id="real-world"
            icon="🏭"
            title="Real-World Application"
            subtitle="Where standard Python shines in AI"
            defaultOpen
          >
            <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
              While heavy neural net layers run on GPUs, pure Python is responsible for everything around it.
            </p>
            
            <div class="space-y-3 text-sm">
              <div class="flex gap-3 items-start border-l-2 border-emerald-500 pl-4">
                <span class="text-xl">📊</span>
                <div>
                  <h4 class="font-semibold text-gray-900 dark:text-white">API Payload Processing</h4>
                  <p class="text-gray-500 dark:text-gray-400 mt-1">When an LLM endpoint hits, the JSON payload string is converted into a native Python dictionary to extract prompts, tokens, and temperature settings.</p>
                </div>
              </div>
              <div class="flex gap-3 items-start border-l-2 border-emerald-500 pl-4 mt-6">
                <span class="text-xl">🧹</span>
                <div>
                  <h4 class="font-semibold text-gray-900 dark:text-white">Corpus Cleaning</h4>
                  <p class="text-gray-500 dark:text-gray-400 mt-1">Before building an NLP vector database, pure Python strings, sets, and lists are used to rapidly strip punctuation, lowercase strings, and filter stop-words.</p>
                </div>
              </div>
            </div>
          </ConceptCard>
        </template>

        <!-- ==================== 10. MINI PROJECT ==================== -->
        <template v-if="activeSection === 'project'">
          <ConceptCard
            id="project"
            icon="🛠️"
            title="Mini Project: The Naive Tokenizer"
            subtitle="Count word frequencies"
            defaultOpen
          >
            <div class="mt-4 p-5 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-gray-800/50">
              <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
                <strong>Goal:</strong> Write a pure Python script that takes a paragraph of text, normalizes it (lowercase, remove punctuation), splits it into words, and counts the frequency of each word using a Dictionary.
              </p>
              <div class="bg-gray-900 p-4 rounded-xl text-gray-300 font-mono text-xs overflow-auto">
<pre>text = "AI is cool. AI is the future. Learn AI!"
# Expected Output: {"ai": 3, "is": 2, "cool": 1, "the": 1, "future": 1, "learn": 1}

# 1. Lowercase text
# 2. Replace "." and "!" with ""
# 3. Split by space to get List
# 4. Loop List, update Dict counts</pre>
              </div>
            </div>
          </ConceptCard>
        </template>

        <!-- ==================== 11. SUMMARY ==================== -->
        <template v-if="activeSection === 'summary'">
          <ConceptCard
            id="summary"
            icon="📝"
            title="Summary (High Retention)"
            subtitle="Core takeaways to memorize"
            defaultOpen
          >
            <ul class="list-disc pl-5 text-sm text-gray-700 dark:text-gray-300 space-y-2 mt-4">
              <li>Variables are <strong>name tags</strong> on objects, not memory boxes.</li>
              <li>When assigning mutable objects (Lists, Dicts), it passes the <em>reference</em>. `a=b` means both change together.</li>
              <li><strong>Sets</strong> and <strong>Dicts</strong> provide extremely fast O(1) lookups due to hashing.</li>
              <li><strong>Lists</strong> are mutable and ordered. <strong>Tuples</strong> are immutable and ordered.</li>
              <li>Python uses whitespace (indentation) to define block scope instead of brackets.</li>
            </ul>
          </ConceptCard>
        </template>

        <!-- ==================== 12. ANSWERS ==================== -->
        <template v-if="activeSection === 'answers'">
          <ConceptCard
            id="answers"
            icon="✅"
            title="Answers Section"
            subtitle="Solutions to micro-exercises and tasks"
            defaultOpen
          >
            <div class="space-y-6 mt-4 text-sm">
              <div class="p-4 bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-200 dark:border-emerald-800/20 rounded-xl">
                <h4 class="font-bold text-emerald-800 dark:text-emerald-400 mb-2">Micro-Exercises</h4>
                <p class="text-gray-700 dark:text-gray-300 mb-2"><strong>1. The Trap:</strong> Prints `[1, 2, 3, 4]`. Because `b=a` assigns the label `b` to the exact same list object. Appending to `b` alters that single shared list.</p>
                <p class="text-gray-700 dark:text-gray-300"><strong>2. Dict Keys:</strong> `True`. "DL" was added to the dictionary `d` as a key, so the `in` operator (which checks keys by default) returns True.</p>
              </div>

              <div class="p-4 bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800/20 rounded-xl font-mono text-xs overflow-auto text-blue-900 dark:text-blue-300">
                <span class="font-bold text-blue-800 dark:text-blue-400 mb-2 block font-sans text-sm">YOUR TURN Tasks</span>
<pre># Task 1: Unique Filter
return list(set(encoded))

# Task 2: Tuple Outputs
unknowns = encoded.count(-1)
return (encoded, unknowns)</pre>
              </div>

               <div class="p-4 bg-purple-50 dark:bg-purple-900/10 border border-purple-200 dark:border-purple-800/20 rounded-xl font-mono text-xs overflow-auto text-purple-900 dark:text-purple-300">
                <span class="font-bold text-purple-800 dark:text-purple-400 mb-2 block font-sans text-sm">Mini Project Solution</span>
<pre>text = "AI is cool. AI is the future. Learn AI!"
text_clean = text.lower().replace(".", "").replace("!", "")
words = text_clean.split(" ")

counts = {}
for word in words:
    if word in counts:
        counts[word] += 1
    else:
        counts[word] = 1
        
print(counts)</pre>
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
import SectionNav from '../SectionNav.vue'
import ConceptCard from '../ConceptCard.vue'

const sections = [
  { id: 'overview', label: '1. Concept Overview', icon: '🔭' },
  { id: 'intuition', label: '2. Intuition First', icon: '💡' },
  { id: 'deep-dive', label: '3. Technical Deep Dive', icon: '🔬' },
  { id: 'visualization', label: '4. Visualization', icon: '👁️' },
  { id: 'code', label: '5. Code Implementation', icon: '💻' },
  { id: 'exercises', label: '6. Micro-Exercises', icon: '⚡' },
  { id: 'mistakes', label: '7. Common Mistakes', icon: '⚠️' },
  { id: 'connections', label: '8. Connections', icon: '🔗' },
  { id: 'real-world', label: '9. Real-World', icon: '🏭' },
  { id: 'project', label: '10. Mini Project', icon: '🛠️' },
  { id: 'summary', label: '11. Summary', icon: '📝' },
  { id: 'answers', label: '12. Answers', icon: '✅' },
]

const activeSection = ref('overview')

function setSection(id) {
  activeSection.value = id
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>
