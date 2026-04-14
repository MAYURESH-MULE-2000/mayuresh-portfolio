<template>
  <div class="learn-module min-h-screen">
    <!-- Header -->
    <div class="px-4 md:px-8 py-8 pb-4 max-w-6xl mx-auto">
      <a href="/learn/ai-engineer" class="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors mb-4">
        ← Back to Curriculum
      </a>
      <div class="flex items-center gap-3 mb-2">
        <span class="text-3xl">📊</span>
        <h1 class="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">M2.2 Statistics & Probability</h1>
      </div>
      <p class="text-gray-600 dark:text-gray-400 text-sm md:text-base max-w-2xl">
        Mean, variance, distributions, Bayes theorem. Master the mathematics of uncertainty that powers all machine learning logic.
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
          <div class="bg-gradient-to-br from-fuchsia-900 to-purple-900 rounded-2xl p-8 md:p-12 text-center text-white shadow-xl relative overflow-hidden group mb-8">
            <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-fuchsia-400 via-pink-500 to-purple-500"></div>
            <div class="text-6xl mb-6 transform group-hover:scale-110 transition-transform duration-500">📊</div>
            <h2 class="text-3xl md:text-4xl font-bold mb-4 tracking-tight">1. Concept Overview</h2>
            <p class="text-fuchsia-100 mb-8 max-w-lg mx-auto">AI models do not 'know' facts. They output probabilities. To engineer AI is to manage uncertainty statistically.</p>
          </div>

          <ConceptCard
            id="overview-stats"
            icon="🧠"
            title="The Engine of Uncertainty"
            subtitle="Deterministic vs Probabilistic"
            definition="Traditional code is deterministic `if user_clicks: show_menu()`. AI acts probabilistically. Statistics allow us to measure the 'average' (Mean), the 'spread' (Variance/Standard Deviation), and the 'likelihood' (Probability) of data patterns."
            analogy="If you flip a coin 100 times, determinism expects exactly 50 heads. Probability accepts that 48 heads is highly normal, but 2 heads means the coin is rigged (An anomaly)."
            seniorTip="Almost all loss functions (how AI models learn they made a mistake) are built on statistical metrics like Mean Squared Error or Cross-Entropy (Information theory probabilities)."
            defaultOpen
          >
          </ConceptCard>
        </template>

        <!-- ==================== 2. INTUITION FIRST ==================== -->
        <template v-if="activeSection === 'intuition'">
          <ConceptCard
            id="intuition"
            icon="💡"
            title="Mental Models: Spread vs Center"
            subtitle="The problem with Averages"
            definition="The Mean (average) is dangerously deceptive alone. If I hold one hand in boiling water (100°C) and one in freezing ice (0°C), my 'average' hand temp is 50°C (perfectly comfortable). Variance measures how far the data spreads away from that average."
            analogy="Mean says 'We scored 70% on average'. Variance says 'Half the class got 100%, and half got 40%'. You need both."
            defaultOpen
          >
          </ConceptCard>
        </template>

        <!-- ==================== 3. TECHNICAL DEEP DIVE ==================== -->
        <template v-if="activeSection === 'deep-dive'">
          <ConceptCard
            id="deep-dive"
            icon="🔬"
            title="The Normal Distribution & Bayes"
            subtitle="The Gaussian Bell Curve"
            definition="The Normal (Gaussian) Distribution is a bell-shaped curve where most data clusters around the mean, tapering off symmetrically. In ML, we often force data into a standard normal distribution (Mean=0, StdDev=1) so models can digest it cleanly. Bayes Theorem is a formula to update your probability based on NEW evidence."
            defaultOpen
          >
             <div class="mt-4 p-4 rounded-xl bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-sm">
                <ul class="space-y-3 dark:text-gray-300">
                    <li><strong class="text-fuchsia-600 dark:text-fuchsia-400 block mb-1">Standard Deviation Rules (68-95-99.7):</strong></li>
                    <li><strong>68%</strong> of data falls within 1 Standard Deviation of the mean.</li>
                    <li><strong>95%</strong> of data falls within 2 Std Devs.</li>
                    <li><strong>99.7%</strong> of data falls within 3 Std Devs. (Anything outside is an outlier!).</li>
                </ul>
             </div>
          </ConceptCard>
        </template>

        <!-- ==================== 4. VISUALIZATION ==================== -->
        <template v-if="activeSection === 'visualization'">
          <ConceptCard
            id="viz"
            icon="👁️"
            title="Visualizing Variance"
            subtitle="High vs Low Variance"
            defaultOpen
          >
             <div class="mt-4 flex flex-col items-center p-6 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 font-mono text-sm">
                <div class="w-full text-center mb-4">
                   <div class="text-emerald-500 font-bold">Low Variance (Highly predictable)</div>
                   <div class="text-gray-400">...::|||||::...</div>
                </div>
                <div class="w-full h-px bg-gray-300 dark:bg-gray-700 my-2"></div>
                <div class="w-full text-center mt-4">
                   <div class="text-red-500 font-bold">High Variance (Unpredictable spread)</div>
                   <div class="text-gray-400">.-..::|:-.|::-..|..-</div>
                </div>
             </div>
          </ConceptCard>
        </template>

        <!-- ==================== 5. CODE IMPLEMENTATION ==================== -->
        <template v-if="activeSection === 'code'">
          <div class="bg-gray-100 dark:bg-gray-800/50 p-6 rounded-2xl border border-gray-200 dark:border-white/10 mb-8">
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Implementation: Core Stats in NumPy</h3>
            <div class="bg-[#1e1e1e] rounded-xl overflow-hidden text-sm font-mono leading-relaxed p-4 overflow-x-auto text-gray-300 shadow-xl border border-gray-700">
<pre><code><span class="text-purple-400">import</span> numpy <span class="text-blue-400">as</span> np

salaries = np.array([<span class="text-emerald-300">40000</span>, <span class="text-emerald-300">45000</span>, <span class="text-emerald-300">50000</span>, <span class="text-emerald-300">42000</span>, <span class="text-emerald-300">950000</span>])

<span class="text-green-400"># 1. Measures of Center</span>
mean_sal = np.mean(salaries)    <span class="text-green-400"># Inflated by the 950k CEO outlier</span>
median_sal = np.median(salaries) <span class="text-green-400"># Robust to outliers (45000)</span>

<span class="text-green-400"># 2. Measures of Spread</span>
var_sal = np.var(salaries)      <span class="text-green-400"># Variance</span>
std_sal = np.std(salaries)      <span class="text-green-400"># Standard Deviation (Sqrt of Variance)</span>

<span class="text-green-400"># 3. Correlation (Do two variables move together?)</span>
<span class="text-green-400"># Returns a matrix. 1.0 is perfect correlation. 0.0 is none.</span>
years_exp = np.array([<span class="text-emerald-300">1</span>, <span class="text-emerald-300">2</span>, <span class="text-emerald-300">3</span>, <span class="text-emerald-300">2</span>, <span class="text-emerald-300">25</span>])
corr = np.corrcoef(years_exp, salaries)[<span class="text-emerald-300">0</span>, <span class="text-emerald-300">1</span>] </code></pre>
            </div>
          </div>

          <ConceptCard
            id="your-turn-m2-2"
            icon="✍️"
            title="YOUR TURN: Code Tasks"
            subtitle="Standardize it"
            defaultOpen
          >
             <div class="mt-4 space-y-4 text-sm text-gray-700 dark:text-gray-300">
              <div class="p-4 bg-white dark:bg-gray-800/80 rounded-xl border border-fuchsia-200 dark:border-fuchsia-800/30">
                <span class="font-bold text-fuchsia-600 dark:text-fuchsia-400 mb-2 block">Task 1: The Z-Score Standardizer</span>
                <p>A Z-score normalizes data so the mean is 0 and StdDev is 1. Formula: `(Array - Mean) / StdDev`. Write the code to convert the `salaries` array into Z-scores.</p>
              </div>
            </div>
          </ConceptCard>
        </template>

        <!-- ==================== 6. MICRO-EXERCISES ==================== -->
        <template v-if="activeSection === 'exercises'">
          <ConceptCard
            id="micro-exercises-m22"
            icon="⚡"
            title="Concept Checks"
            subtitle="Logic and Probabilities"
            defaultOpen
          >
            <div class="space-y-6 mt-4">
              <!-- Exec 1 -->
              <div>
                <h4 class="font-semibold text-gray-900 dark:text-white text-sm mb-2">1. Correlation vs Causation</h4>
                <div class="bg-gray-900 rounded-lg p-3 font-mono text-sm text-gray-300">
                  <p class="font-sans">Ice cream sales and shark attacks have a 0.95 correlation. Does eating ice cream cause shark attacks?</p>
                </div>
              </div>
            </div>
          </ConceptCard>
        </template>

        <!-- ==================== 7. COMMON MISTAKES ==================== -->
        <template v-if="activeSection === 'mistakes'">
          <ConceptCard
            id="mistakes-m22"
            icon="⚠️"
            title="Common Beginner Mistakes"
            subtitle="Save yourself hours of debugging"
            defaultOpen
          >
             <ul class="space-y-4 mt-4 text-sm text-gray-600 dark:text-gray-400">
              <li class="p-4 bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800/30 rounded-xl">
                <strong class="text-red-700 dark:text-red-400 block mb-1">1. Assuming all data is Normally Distributed</strong>
                Many algorithms (like Linear Regression) mathematically assume input data is a 'Bell Curve' (Gaussian). E-commerce user incomes follow a 'Power Law' (Right skewed). Force-feeding skewed data into models wrecks accuracy.
              </li>
              <li class="p-4 bg-orange-50 dark:bg-orange-900/10 border border-orange-200 dark:border-orange-800/30 rounded-xl">
                <strong class="text-orange-700 dark:text-orange-400 block mb-1">2. Ignoring outliers before calculating Mean</strong>
                As seen in the code segment, a single CEO salary drags the mean up massively, hiding the reality of the workers. Always use Medians on data with wild outliers!
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
             <div class="mt-4 p-5 border border-purple-200 dark:border-purple-900/30 bg-purple-50/50 dark:bg-purple-900/10 rounded-xl text-sm">
                <span class="font-bold text-purple-700 dark:text-purple-400 block mb-2">➡️ Phase 3: Model Evaluation</span>
                In M3.3, you learn about Precision and Recall. These metrics are mathematically tied to False Positives and False Negatives, which are core concepts of Bayesian statistical probabilities.
              </div>
              <div class="mt-4 p-5 border border-indigo-200 dark:border-indigo-900/30 bg-indigo-50/50 dark:bg-indigo-900/10 rounded-xl text-sm">
                <span class="font-bold text-indigo-700 dark:text-indigo-400 block mb-2">➡️ Phase 4: Batch Normalization</span>
                Deep neural networks suffer when internal values get too big. In M4.4 you learn 'Batch Norm', a layer that actively calculates the Mean and Variance of data flowing through the network and squashes it back to Z-Scores.
              </div>
          </ConceptCard>
        </template>

        <!-- ==================== 9. REAL-WORLD ==================== -->
        <template v-if="activeSection === 'real-world'">
           <ConceptCard
            id="real-world"
            icon="🏭"
            title="Real-World Application"
            subtitle="Fraud & Anomaly Detection"
            defaultOpen
          >
            <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
              Banks process millions of credit card transactions daily. You cannot build 'deterministic rules' to catch every type of fraud.
            </p>
            <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              Instead, they build statistical profiles of a user (Mean transaction amount, deviation of timestamps). If a new transaction falls outside 3 Standard Deviations of your historical norm, it is statistically an "Anomaly" and triggers an SMS alert.
            </p>
          </ConceptCard>
        </template>

        <!-- ==================== 10. MINI PROJECT ==================== -->
        <template v-if="activeSection === 'project'">
          <ConceptCard
            id="project"
            icon="🛠️"
            title="Mini Project: Outlier Detector"
            subtitle="Apply the 3-Sigma Rule"
            defaultOpen
          >
            <div class="mt-4 p-5 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-gray-800/50">
              <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
                <strong>Goal:</strong> Write a boolean mask to find all elements in an array that are further than 2 standard deviations away from the mean (The 95% boundary). 
              </p>
              <div class="bg-gray-900 p-4 rounded-xl text-gray-300 font-mono text-xs overflow-auto">
<pre>import numpy as np

sensor_data = np.array([45, 47, 46, 45, 99, 44, 46, 2])

# Find the mean
# Find the standard_dev
# upper_bound = mean + (2 * std)
# lower_bound = mean - (2 * std)

# outliers = [...]
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
              <li><strong>Mean</strong> is the center, <strong>Variance</strong> is the spread.</li>
              <li>A <strong>Standard Deviation</strong> brings variance back to scale. 99.7% of data lives within 3 std devs on a normal curve.</li>
              <li>Always check the <strong>Median</strong> to handle skewed/outlier-heavy data safely.</li>
              <li>Correlation is not causation (beware confounding variables like "Summer Heat" causing both ice cream sales and shark attacks).</li>
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
                <p class="text-gray-700 dark:text-gray-300"><strong>1. Correlation:</strong> No! This is the classic "confounding variable" trap. Summer heat increases ice cream sales AND drives people to beaches, causing shark attacks. Math finds patterns, humans must infer logic.</p>
              </div>

               <div class="p-4 bg-fuchsia-50 dark:bg-fuchsia-900/10 border border-fuchsia-200 dark:border-fuchsia-800/20 rounded-xl font-mono text-xs overflow-auto text-fuchsia-900 dark:text-fuchsia-300">
                <span class="font-bold text-fuchsia-800 dark:text-fuchsia-400 mb-2 block font-sans text-sm">YOUR TURN Tasks / Project</span>
<pre># Task 1: Z-Score Standardizer
z_scores = (salaries - np.mean(salaries)) / np.std(salaries)

# Project: Outlier Detector
mean = np.mean(sensor_data)
std = np.std(sensor_data)
upper = mean + (2 * std)
lower = mean - (2 * std)

# NumPy vectorized mask
outliers = sensor_data[(sensor_data > upper) | (sensor_data < lower)]
print(outliers) # Captures 99 and 2
</pre>
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
  { id: 'overview', label: '1. Concept Overview', icon: '📊' },
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
