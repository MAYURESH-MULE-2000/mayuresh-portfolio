<template>
  <div class="learn-module min-h-screen">
    <!-- Header -->
    <div class="px-4 md:px-8 py-8 pb-4 max-w-6xl mx-auto">
      <a href="/learn/ai-engineer" class="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors mb-4">
        ← Back to Curriculum
      </a>
      <div class="flex items-center gap-3 mb-2">
        <span class="text-3xl">📉</span>
        <h1 class="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">M1.4 Data Visualization</h1>
      </div>
      <p class="text-gray-600 dark:text-gray-400 text-sm md:text-base max-w-2xl">
        Matplotlib, Seaborn, and Exploratory Data Analysis (EDA). Uncover hidden patterns before the neural net does.
      </p>
    </div>

    <!-- Layout: Nav + Content -->
    <div class="px-4 md:px-8 max-w-6xl mx-auto flex flex-col lg:flex-row gap-6 pb-16">
      <SectionNav
        :sections="sections"
        :activeSection="activeSection"
        activeColor="bg-fuchsia-600"
        @select="setSection"
        class="lg:w-64 flex-shrink-0"
      />

      <div class="flex-1 min-w-0 space-y-8">
        
        <!-- ==================== 1. CONCEPT OVERVIEW ==================== -->
        <template v-if="activeSection === 'overview'">
          <div class="bg-gradient-to-br from-fuchsia-900 to-pink-900 rounded-2xl p-8 md:p-12 text-center text-white shadow-xl relative overflow-hidden group mb-8">
            <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-fuchsia-400 via-pink-500 to-rose-500"></div>
            <div class="text-6xl mb-6 transform group-hover:scale-110 transition-transform duration-500">📉</div>
            <h2 class="text-3xl md:text-4xl font-bold mb-4 tracking-tight">1. Concept Overview</h2>
            <p class="text-fuchsia-100 mb-8 max-w-lg mx-auto">Blindly feeding models data leads to failure. Visualization is the flashlight AI Engineers use to explore the cave of raw data.</p>
          </div>

          <ConceptCard
            id="overview-viz"
            icon="🧠"
            title="The Purpose of Plots"
            subtitle="EDA: Exploratory Data Analysis"
            definition="Matplotlib is the foundational plotting library in Python, interacting closely with NumPy arrays. Seaborn is built on top of Matplotlib, offering beautiful statistical plots out-of-the-box. We use them for EDA-spotting outliers, discovering multi-collinearity, and checking class imbalances."
            analogy="If Pandas is an X-Ray machine, Matplotlib is the doctor holding up the film to interpret the broken bones."
            seniorTip="Do not over-obsess about pretty colors in Jupyter Notebooks. Engineering plots are exploratory; you just need to spot the outlier. UI engineers make it pretty later."
            defaultOpen
          >
          </ConceptCard>
        </template>

        <!-- ==================== 2. INTUITION FIRST ==================== -->
        <template v-if="activeSection === 'intuition'">
          <ConceptCard
            id="intuition"
            icon="💡"
            title="Mental Models: The Artists Canvas"
            subtitle="Figure vs Axes"
            definition="Matplotlib works on a hierarchy: The `Figure` is the entire blank canvas (the framed picture). The `Axes` (not the x/y axis) is the actual plot area where data is drawn. A figure can have multiple axes (subplots)."
            analogy="Imagine drawing on a whiteboard. `plt.figure()` buys the whiteboard. `plt.axes()` draws a square on it to hold a graph. `plt.plot()` draws the line inside that square."
            defaultOpen
          >
          </ConceptCard>
        </template>

        <!-- ==================== 3. TECHNICAL DEEP DIVE ==================== -->
        <template v-if="activeSection === 'deep-dive'">
          <ConceptCard
            id="deep-dive"
            icon="🔬"
            title="Grammar of Graphics"
            subtitle="Distributions and Scatters"
            definition="Different plots serve specific statistical goals: 1) Histograms check distributions (Normal, Skewed). 2) Scatter plots check correlations (Does X increase as Y increases?). 3) Box plots visualize percentiles and outliers. 4) Heatmaps visualize confusion matrices or correlation grids."
            defaultOpen
          >
             <div class="mt-4 p-4 rounded-xl bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-sm">
                <ul class="space-y-3 dark:text-gray-300">
                    <li><strong class="text-fuchsia-600 dark:text-fuchsia-400 block mb-1">State-based vs Object-Oriented</strong></li>
                    <li><strong>State-based (plt.plot):</strong> Fast, assumes current active canvas. Good for quick scripts.</li>
                    <li><strong>Object-Oriented (fig, ax = plt.subplots()):</strong> Explicitly defines objects. Essential for complex multi-plots.</li>
                </ul>
             </div>
          </ConceptCard>
        </template>

        <!-- ==================== 4. VISUALIZATION ==================== -->
        <template v-if="activeSection === 'visualization'">
          <ConceptCard
            id="viz"
            icon="👁️"
            title="Anatomy of a Plot"
            subtitle="Terms to know"
            defaultOpen
          >
             <ul class="mt-4 space-y-4 text-sm text-gray-700 dark:text-gray-300 list-disc list-inside bg-gray-50 dark:bg-gray-800/50 p-6 rounded-xl border border-gray-200 dark:border-white/10">
                <li><strong>Title:</strong> Macro description (`ax.set_title`)</li>
                <li><strong>Spines:</strong> The bounding box borders of the plot.</li>
                <li><strong>Ticks/Labels:</strong> The numeric points on an axis (0, 10, 20).</li>
                <li><strong>Legend:</strong> The key explaining colors/markers.</li>
                <li><strong>Alpha:</strong> Transparency parameter (0.0 to 1.0) crucial for dense scatter plots to see overlapping points.</li>
             </ul>
          </ConceptCard>
        </template>

        <!-- ==================== 5. CODE IMPLEMENTATION ==================== -->
        <template v-if="activeSection === 'code'">
          <div class="bg-gray-100 dark:bg-gray-800/50 p-6 rounded-2xl border border-gray-200 dark:border-white/10 mb-8">
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Implementation: Building a Chart</h3>
            <div class="bg-[#1e1e1e] rounded-xl overflow-hidden text-sm font-mono leading-relaxed p-4 overflow-x-auto text-gray-300 shadow-xl border border-gray-700">
<pre><code><span class="text-purple-400">import</span> matplotlib.pyplot <span class="text-blue-400">as</span> plt
<span class="text-purple-400">import</span> seaborn <span class="text-blue-400">as</span> sns
<span class="text-purple-400">import</span> numpy <span class="text-blue-400">as</span> np

<span class="text-green-400"># Setting aesthetic theme</span>
sns.set_theme(style=<span class="text-orange-300">"darkgrid"</span>)

<span class="text-green-400"># Generate dummy normal-distribution data (mean=50, std=10)</span>
data = np.random.normal(<span class="text-emerald-300">50</span>, <span class="text-emerald-300">10</span>, <span class="text-emerald-300">1000</span>)

<span class="text-green-400"># Object-oriented plotting: 1 row, 1 col, size 8x5 inc</span>
fig, ax = plt.subplots(figsize=(<span class="text-emerald-300">8</span>, <span class="text-emerald-300">5</span>))

<span class="text-green-400"># Use seaborn to plot distribution onto the axe</span>
sns.histplot(data, bins=<span class="text-emerald-300">30</span>, kde=<span class="text-purple-400">True</span>, ax=ax, color=<span class="text-orange-300">"indigo"</span>)

<span class="text-green-400"># Architecture</span>
ax.set_title(<span class="text-orange-300">"Distribution of Scores"</span>)
ax.set_xlabel(<span class="text-orange-300">"Score"</span>)
ax.set_ylabel(<span class="text-orange-300">"Frequency"</span>)

<span class="text-green-400"># Render</span>
plt.show()</code></pre>
            </div>
          </div>

          <ConceptCard
            id="your-turn-m1-4"
            icon="✍️"
            title="YOUR TURN: Code Tasks"
            subtitle="Scatter it"
            defaultOpen
          >
             <div class="mt-4 space-y-4 text-sm text-gray-700 dark:text-gray-300">
              <div class="p-4 bg-white dark:bg-gray-800/80 rounded-xl border border-fuchsia-200 dark:border-fuchsia-800/30">
                <span class="font-bold text-fuchsia-600 dark:text-fuchsia-400 mb-2 block">Task 1: The Scatter</span>
                <p>Assume you have two arrays: `x = np.array([1,2,3,4,5])` and `y = x * 2`. Use the simpler state-based interface `plt.scatter(x, y)` followed by `plt.show()` to plot these points.</p>
              </div>
            </div>
          </ConceptCard>
        </template>

        <!-- ==================== 6. MICRO-EXERCISES ==================== -->
        <template v-if="activeSection === 'exercises'">
          <ConceptCard
            id="micro-exercises-m14"
            icon="⚡"
            title="Concept Checks"
            subtitle="Predict the outcome"
            defaultOpen
          >
            <div class="space-y-6 mt-4">
              <!-- Exec 1 -->
              <div>
                <h4 class="font-semibold text-gray-900 dark:text-white text-sm mb-2">1. Alpha Blending</h4>
                <div class="bg-gray-900 rounded-lg p-3 font-mono text-sm text-gray-300">
                  <pre>
plt.scatter(X, Y, alpha=0.1)
# Why lower alpha to 0.1 on a dataset with 50,000 overlapping dots?</pre>
                </div>
              </div>
            </div>
          </ConceptCard>
        </template>

        <!-- ==================== 7. COMMON MISTAKES ==================== -->
        <template v-if="activeSection === 'mistakes'">
          <ConceptCard
            id="mistakes-m14"
            icon="⚠️"
            title="Common Beginner Mistakes"
            subtitle="Save yourself hours of debugging"
            defaultOpen
          >
             <ul class="space-y-4 mt-4 text-sm text-gray-600 dark:text-gray-400">
              <li class="p-4 bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800/30 rounded-xl">
                <strong class="text-red-700 dark:text-red-400 block mb-1">1. The Missing `plt.show()`</strong>
                In standard python scripts, if you construct a figure but forget `plt.show()`, the script ends and nothing pops up on your screen. (Jupyter notebooks auto-show final lines, causing bad habits).
              </li>
              <li class="p-4 bg-orange-50 dark:bg-orange-900/10 border border-orange-200 dark:border-orange-800/30 rounded-xl">
                <strong class="text-orange-700 dark:text-orange-400 block mb-1">2. Memory Leaks in Loops</strong>
                If you plot charts inside a loop using `plt.figure()`, matplotlib keeps them all in RAM until the kernel dies. If looping charts to save them to disk, always use `plt.close()`.
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
                <span class="font-bold text-purple-700 dark:text-purple-400 block mb-2">➡️ Phase 3: Model Evaluation</span>
                You will use Matplotlib heavily in module M3.3 to plot Confusion Matrices (Heatmaps) and ROC curves to visually prove "Is my ML model actually accurate?"
              </div>
              <div class="p-5 border border-indigo-200 dark:border-indigo-900/30 bg-indigo-50/50 dark:bg-indigo-900/10 rounded-xl text-sm">
                <span class="font-bold text-indigo-700 dark:text-indigo-400 block mb-2">➡️ Phase 4: Training Loops</span>
                As Neural networks train over 'Epochs', you will chart Loss Curves using Matplotlib to see if the model is Overfitting (the curve starts going up).
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
            subtitle="Sanity checking datasets"
            defaultOpen
          >
            <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
              Imagine receiving a banking dataset to predict defaults. A histogram of "Age" reveals a massive spike at Age = 999.
            </p>
            <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              If you fed that directly to XGBoost, the model would fail instantly because 999 is a system placeholder for NaN, not a real human age. Without EDA and data visualization spotting that outlier, algorithms learn garbage rules.
            </p>
          </ConceptCard>
        </template>

        <!-- ==================== 10. MINI PROJECT ==================== -->
        <template v-if="activeSection === 'project'">
          <ConceptCard
            id="project"
            icon="🛠️"
            title="Mini Project: Plot the Curve"
            subtitle="Visualizing Loss"
            defaultOpen
          >
            <div class="mt-4 p-5 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-gray-800/50">
              <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
                <strong>Goal:</strong> Simulate a learning curve. Plot epochs (x-axis) against error/loss (y-axis). Include a title and labels.
              </p>
              <div class="bg-gray-900 p-4 rounded-xl text-gray-300 font-mono text-xs overflow-auto">
<pre>import matplotlib.pyplot as plt

epochs = [1, 2, 3, 4, 5]
loss = [0.8, 0.5, 0.3, 0.2, 0.15]

# Your plot code here...
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
              <li><strong>Figure & Axes:</strong> Figure is the window canvas; axes is the plotted chart inside it.</li>
              <li><strong>EDA First:</strong> Visualization is how we find data poison (outliers/NaNs) before training.</li>
              <li><strong>Histograms:</strong> For distribution density. <strong>Scatters:</strong> For correlations between two variables.</li>
              <li><strong>Alpha:</strong> Transparency solves overlapping scatter blobs.</li>
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
                <p class="text-gray-700 dark:text-gray-300 mb-2"><strong>1. Alpha:</strong> If 50,000 dots overlap with solid color (alpha=1.0), it just looks like a giant blob. With alpha=0.1, you can visually see <em>density</em> because 10 dots overlapping forms a darker distinct center than a standalone dot.</p>
              </div>

               <div class="p-4 bg-fuchsia-50 dark:bg-fuchsia-900/10 border border-fuchsia-200 dark:border-fuchsia-800/20 rounded-xl font-mono text-xs overflow-auto text-fuchsia-900 dark:text-fuchsia-300">
                <span class="font-bold text-fuchsia-800 dark:text-fuchsia-400 mb-2 block font-sans text-sm">YOUR TURN Tasks / Project</span>
<pre># Task 1: Scatter
plt.scatter(x, y)
plt.show()

# Project: Loss Curve
plt.figure()
plt.plot(epochs, loss, marker='o', color='red')
plt.title("Model Training Loss")
plt.xlabel("Epoch")
plt.ylabel("Loss value")
plt.show()</pre>
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
  { id: 'overview', label: '1. Concept Overview', icon: '📉' },
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
