<template>
  <div class="learn-module min-h-screen">
    <!-- Header -->
    <div class="px-4 md:px-8 py-8 pb-4 max-w-6xl mx-auto">
      <a href="/learn/ai-engineer" class="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors mb-4">
        ← Back to Curriculum
      </a>
      <div class="flex items-center gap-3 mb-2">
        <span class="text-3xl">🐼</span>
        <h1 class="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">M1.3 NumPy & Pandas</h1>
      </div>
      <p class="text-gray-600 dark:text-gray-400 text-sm md:text-base max-w-2xl">
        Arrays, vectorized operations, DataFrames, and Series. Stop writing loops. Start thinking in columns and matrices.
      </p>
    </div>

    <!-- Layout: Nav + Content -->
    <div class="px-4 md:px-8 max-w-6xl mx-auto flex flex-col lg:flex-row gap-6 pb-16">
      <SectionNav
        :sections="sections"
        :activeSection="activeSection"
        activeColor="bg-sky-600"
        @select="setSection"
        class="lg:w-64 flex-shrink-0"
      />

      <div class="flex-1 min-w-0 space-y-8">
        
        <!-- ==================== 1. CONCEPT OVERVIEW ==================== -->
        <template v-if="activeSection === 'overview'">
          <div class="bg-gradient-to-br from-sky-900 to-blue-900 rounded-2xl p-8 md:p-12 text-center text-white shadow-xl relative overflow-hidden group mb-8">
            <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-500"></div>
            <div class="text-6xl mb-6 transform group-hover:scale-110 transition-transform duration-500">🐼</div>
            <h2 class="text-3xl md:text-4xl font-bold mb-4 tracking-tight">1. Concept Overview</h2>
            <p class="text-sky-100 mb-8 max-w-lg mx-auto">Standard Python list loops are incredibly slow for millions of numbers. NumPy and Pandas rewrite the rules using C-optimized vector math.</p>
          </div>

          <ConceptCard
            id="overview-pandas"
            icon="🧠"
            title="Slaying the For-Loop"
            subtitle="The core tenet of Data Engineering"
            definition="NumPy introduces 'ndarrays' (N-dimensional arrays) written in C, allowing contiguous memory block math. Pandas builds on top of NumPy, offering 'DataFrames'—essentially Excel spreadsheets on coding steroids—allowing you to manipulate millions of rows instantly."
            analogy="A Python list is a box of randomly sized, individually wrapped candies. Changing them means unwrapping and modifying each one. A NumPy array is a solid brick of chocolate. Changing it happens in one massive, instantaneous slice."
            seniorTip="If you write a `for` loop to iterate over rows in Pandas, you are doing it wrong. You must 'Vectorize' your thought process."
            defaultOpen
          >
          </ConceptCard>
        </template>

        <!-- ==================== 2. INTUITION FIRST ==================== -->
        <template v-if="activeSection === 'intuition'">
          <ConceptCard
            id="intuition"
            icon="💡"
            title="Mental Models: SIMD and Broadcasting"
            subtitle="Single Instruction, Multiple Data"
            definition="Under the hood, modern CPUs have SIMD instructions. Instead of adding A+B, then C+D, the CPU can pack 4 additions into a single clock cycle. Vectorization takes advantage of this."
            analogy="Instead of a teacher grading 30 tests one-by-one (a for loop), vectorization is like laying all 30 tests on a table and having a robotic stamp mark all of them in exactly 1 second."
            defaultOpen
          >
          </ConceptCard>
        </template>

        <!-- ==================== 3. TECHNICAL DEEP DIVE ==================== -->
        <template v-if="activeSection === 'deep-dive'">
          <ConceptCard
            id="numpy-arrays"
            icon="🧱"
            title="NumPy Basics: Shape and Data Types"
            subtitle="The math foundation"
            definition="An `ndarray` enforces a single data type (unlike Python lists which can mix strings and ints). This homogeneity allows memory to be tightly packed. The most important attribute is `.shape`, which tells you the dimensions (e.g., (100, 3) means 100 rows, 3 columns)."
            defaultOpen
          >
          </ConceptCard>

           <ConceptCard
            id="pandas-df"
            icon="📊"
            title="Pandas Basics: Series and DataFrames"
            subtitle="The tabular foundation"
            definition="A `Series` is a 1D column with an Index (labels for the rows). A `DataFrame` is a 2D collection of Series (like a database table). You access data using `.loc[]` (label-based) or `.iloc[]` (integer-position based)."
          >
          </ConceptCard>
        </template>

        <!-- ==================== 4. VISUALIZATION ==================== -->
        <template v-if="activeSection === 'visualization'">
          <ConceptCard
            id="viz"
            icon="👁️"
            title="Visualizing Broadcasting"
            subtitle="How NumPy stretches data"
            definition="Broadcasting describes how NumPy treats arrays with different shapes during arithmetic operations. Subject to certain constraints, the smaller array is 'broadcast' across the larger array so that they have compatible shapes."
            defaultOpen
          >
            <div class="mt-4 p-6 bg-gray-900 dark:bg-black rounded-xl border border-gray-700 font-mono text-sm shadow-inner overflow-x-auto text-center text-gray-300">
                <div>Array A (3x3)</div>
                <div class="text-emerald-400">[[1, 2, 3],</div>
                <div class="text-emerald-400"> [4, 5, 6],</div>
                <div class="text-emerald-400"> [7, 8, 9]]</div>
                <div class="my-2">+</div>
                <div>Array B (1x3) - Gets "broadcasted" (copied) downwards 3 times in memory automatically</div>
                <div class="text-sky-400">[10, 10, 10]</div>
                <div class="my-2">=</div>
                <div class="text-purple-400">[[11, 12, 13],</div>
                <div class="text-purple-400"> [14, 15, 16],</div>
                <div class="text-purple-400"> [17, 18, 19]]</div>
            </div>
          </ConceptCard>
        </template>

        <!-- ==================== 5. CODE IMPLEMENTATION ==================== -->
        <template v-if="activeSection === 'code'">
          <div class="bg-gray-100 dark:bg-gray-800/50 p-6 rounded-2xl border border-gray-200 dark:border-white/10 mb-8">
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Implementation: Pandas DataFrame</h3>
            <div class="bg-[#1e1e1e] rounded-xl overflow-hidden text-sm font-mono leading-relaxed p-4 overflow-x-auto text-gray-300 shadow-xl border border-gray-700">
<pre><code><span class="text-purple-400">import</span> pandas <span class="text-blue-400">as</span> pd
<span class="text-purple-400">import</span> numpy <span class="text-blue-400">as</span> np

<span class="text-green-400"># 1. Create a DataFrame from a Dictionary</span>
data = {
    <span class="text-orange-300">"age"</span>: [<span class="text-emerald-300">25</span>, <span class="text-emerald-300">30</span>, np.nan, <span class="text-emerald-300">45</span>], <span class="text-green-400"># np.nan is missing data</span>
    <span class="text-orange-300">"income"</span>: [<span class="text-emerald-300">50k</span>, <span class="text-emerald-300">60k</span>, <span class="text-emerald-300">55k</span>, <span class="text-emerald-300">90k</span>]
}
df = pd.DataFrame(data)

<span class="text-green-400"># 2. Handle Missing Data</span>
df = df.fillna(df[<span class="text-orange-300">"age"</span>].mean())  <span class="text-green-400"># Fill NaN with column average</span>

<span class="text-green-400"># 3. Vectorized Math (No loops!)</span>
<span class="text-green-400"># Add a new column based on a condition</span>
df[<span class="text-orange-300">"is_senior"</span>] = df[<span class="text-orange-300">"age"</span>] >= <span class="text-emerald-300">40</span>

<span class="text-green-400"># 4. Slicing</span>
young_folks = df[df[<span class="text-orange-300">"age"</span>] < <span class="text-emerald-300">35</span>]</code></pre>
            </div>
          </div>

          <ConceptCard
            id="your-turn-m1-3"
            icon="✍️"
            title="YOUR TURN: Code Tasks"
            subtitle="Vectorize!"
            defaultOpen
          >
             <div class="mt-4 space-y-4 text-sm text-gray-700 dark:text-gray-300">
              <div class="p-4 bg-white dark:bg-gray-800/80 rounded-xl border border-sky-200 dark:border-sky-800/30">
                <span class="font-bold text-sky-600 dark:text-sky-400 mb-2 block">Task 1: The Vector Multiplier</span>
                <p>Assume `prices = np.array([10, 20, 30])`. Write the code to apply a 15% tax to all prices without using a loop, resulting in `[11.5, 23.0, 34.5]`.</p>
              </div>
            </div>
          </ConceptCard>
        </template>

        <!-- ==================== 6. MICRO-EXERCISES ==================== -->
        <template v-if="activeSection === 'exercises'">
          <ConceptCard
            id="micro-exercises-m13"
            icon="⚡"
            title="Concept Checks"
            subtitle="Predict the output"
            defaultOpen
          >
            <div class="space-y-6 mt-4">
              <!-- Exec 1 -->
              <div>
                <h4 class="font-semibold text-gray-900 dark:text-white text-sm mb-2">1. Broadcasting rules</h4>
                <div class="bg-gray-900 rounded-lg p-3 font-mono text-sm text-gray-300">
                  <pre>
a = np.array([1, 2, 3])
b = 2
print(a * b)
# What prints?</pre>
                </div>
              </div>
              <!-- Exec 2 -->
              <div>
                <h4 class="font-semibold text-gray-900 dark:text-white text-sm mb-2">2. DataFrame Filtering</h4>
                <div class="bg-gray-900 rounded-lg p-3 font-mono text-sm text-gray-300">
                  <pre>
df = pd.DataFrame({"A": [1, 5, 10]})
mask = df["A"] > 4
print(mask.tolist())
# What prints?</pre>
                </div>
              </div>
            </div>
          </ConceptCard>
        </template>

        <!-- ==================== 7. COMMON MISTAKES ==================== -->
        <template v-if="activeSection === 'mistakes'">
          <ConceptCard
            id="mistakes-m13"
            icon="⚠️"
            title="Common Beginner Mistakes"
            subtitle="Save yourself hours of debugging"
            defaultOpen
          >
             <ul class="space-y-4 mt-4 text-sm text-gray-600 dark:text-gray-400">
              <li class="p-4 bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800/30 rounded-xl">
                <strong class="text-red-700 dark:text-red-400 block mb-1">1. `SettingWithCopyWarning` in Pandas</strong>
                If you do `df2 = df[df['A'] > 5]` and then try `df2['B'] = 10`, Pandas screams at you. Why? Because it doesn't know if `df2` is a new object or a view into `df`'s memory. To fix: `df2 = df[df['A'] > 5].copy()`.
              </li>
              <li class="p-4 bg-orange-50 dark:bg-orange-900/10 border border-orange-200 dark:border-orange-800/30 rounded-xl">
                <strong class="text-orange-700 dark:text-orange-400 block mb-1">2. Iterrows() is evil</strong>
                Using `for index, row in df.iterrows():` is famously slow. It bypasses all C-optimizations. Use `.apply()`, or even better, native vectorized math `.sum()`, `.where()`, etc.
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
                <span class="font-bold text-purple-700 dark:text-purple-400 block mb-2">➡️ Phase 3: Scikit-Learn</span>
                In M3.1, you feed models to algorithms like XGBoost. Algorithms only understand 2D numeric matrices. Pandas is the bridge that converts raw CSV data into these numeric grids.
              </div>
              <div class="p-5 border border-indigo-200 dark:border-indigo-900/30 bg-indigo-50/50 dark:bg-indigo-900/10 rounded-xl text-sm">
                <span class="font-bold text-indigo-700 dark:text-indigo-400 block mb-2">➡️ Phase 4: PyTorch Tensors</span>
                PyTorch Tensors are almost identical copies of NumPy arrays, except Tensors live on the GPU and record operations for calculus derivations. Learning NumPy IS learning PyTorch logic.
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
            subtitle="The 80% work of Data Science"
            defaultOpen
          >
            <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
              AI models require perfection. Real UI databases have missing addresses, ages written as "Twenty", and negative incomes.
            </p>
            <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              Pandas is used in the Extract, Transform, Load (ETL) pipeline. AI Engineers write Pandas scripts to drop NA rows, normalize income into 0-1 ranges, and One-Hot encode categorical variables ("City":"NY" -> [0,0,1]) before a model ever sees the data.
            </p>
          </ConceptCard>
        </template>

        <!-- ==================== 10. MINI PROJECT ==================== -->
        <template v-if="activeSection === 'project'">
          <ConceptCard
            id="project"
            icon="🛠️"
            title="Mini Project: Feature Scaling"
            subtitle="Normalization using NumPy"
            defaultOpen
          >
            <div class="mt-4 p-5 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-gray-800/50">
              <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
                <strong>Goal:</strong> Normalization shrinks values to a 0.0 - 1.0 range based on the formula: <code>(V - Min) / (Max - Min)</code>. Write vectorized code to normalize a NumPy array.
              </p>
              <div class="bg-gray-900 p-4 rounded-xl text-gray-300 font-mono text-xs overflow-auto">
<pre>import numpy as np
temperatures = np.array([40, 50, 90, 80, 20])

# Expected: [0.28, 0.42, 1.0, 0.85, 0.0]
# Use np.max() and np.min()
# ...
</pre>
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
              <li><strong>Vectorization:</strong> Avoid loops. Apply operations to the entire column at once.</li>
              <li><strong>Broadcasting:</strong> Operations between mismatched shapes duplicate the smaller one automatically to fit the larger one.</li>
              <li><strong>df.loc[]</strong> is for label-based column/row lookups. <strong>df.iloc[]</strong> is for index-based (0, 1, 2) lookups.</li>
              <li><strong>.copy()</strong> slices explicitly to avoid SettingWithCopyWarning bugs.</li>
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
                <p class="text-gray-700 dark:text-gray-300 mb-2"><strong>1. Broadcasting:</strong> `[2, 4, 6]`. The scalar `2` is broadcasted and multiplied against every element simultaneously.</p>
                <p class="text-gray-700 dark:text-gray-300"><strong>2. Masks:</strong> `[False, True, True]`. Condition checks return boolean masks, which are heavily used inside `df[...]` to filter rows.</p>
              </div>

               <div class="p-4 bg-sky-50 dark:bg-sky-900/10 border border-sky-200 dark:border-sky-800/20 rounded-xl font-mono text-xs overflow-auto text-sky-900 dark:text-sky-300">
                <span class="font-bold text-sky-800 dark:text-sky-400 mb-2 block font-sans text-sm">YOUR TURN Tasks / Project</span>
<pre># Tax Multiplier
taxed_prices = prices * 1.15

# Project: Normalization
min_t = np.min(temperatures)
max_t = np.max(temperatures)
normalized = (temperatures - min_t) / (max_t - min_t)
print(normalized)</pre>
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
  { id: 'overview', label: '1. Concept Overview', icon: '🐼' },
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
