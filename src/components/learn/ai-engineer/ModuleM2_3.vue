<template>
  <div class="learn-module min-h-screen">
    <!-- Header -->
    <div class="px-4 md:px-8 py-8 pb-4 max-w-6xl mx-auto">
      <a href="/learn/ai-engineer" class="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors mb-4">
        ← Back to Curriculum
      </a>
      <div class="flex items-center gap-3 mb-2">
        <span class="text-3xl">📉</span>
        <h1 class="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">M2.3 Calculus Intuition</h1>
      </div>
      <p class="text-gray-600 dark:text-gray-400 text-sm md:text-base max-w-2xl">
        Derivatives, gradients, loss functions, and optimization. How artificial neural networks actually "learn" from their mistakes.
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
            <div class="text-6xl mb-6 transform group-hover:scale-110 transition-transform duration-500">📉</div>
            <h2 class="text-3xl md:text-4xl font-bold mb-4 tracking-tight">1. Concept Overview</h2>
            <p class="text-emerald-100 mb-8 max-w-lg mx-auto">AI models start out stupid. They guess randomly, check how wrong they are, and use calculus to figure out exactly how to adjust their guesses next time.</p>
          </div>

          <ConceptCard
            id="overview-calc"
            icon="🧠"
            title="The Mathematics of Change"
            subtitle="Why do we need Calculus?"
            definition="Calculus allows us to calculate the rate of change (derivative). In AI, we calculate the derivative of our 'Error' with respect to our 'Weights'. If we know that changing a specific weight by +0.1 causes the error to go DOWN, we use calculus to make exactly that change."
            analogy="Imagine tuning an old radio dial. You turn it slightly right, the static gets worse (Error goes up). You turn it left, the static gets better. Calculus is the mathematical formula that tells the AI exactly which way to turn billions of dials simultaneously to eliminate the static."
            seniorTip="You rarely solve derivatives by hand in modern AI. PyTorch's 'Autograd' engine does it dynamically. Let the computer do the math, but you MUST understand the conceptual mechanism."
            defaultOpen
          >
          </ConceptCard>
        </template>

        <!-- ==================== 2. INTUITION FIRST ==================== -->
        <template v-if="activeSection === 'intuition'">
          <ConceptCard
            id="intuition"
            icon="💡"
            title="Mental Models: The Blindfolded Hiker"
            subtitle="Gradient Descent"
            definition="Imagine you are blindfolded at the top of a mountain, and your goal is to reach the valley floor (Error = 0). You feel the ground with your foot. You find the direction that points down the steepest. You take a step. You repeat this until flat ground is hit."
            analogy="Your foot feeling the slope is the 'Derivative'. Taking a step is updating the 'Weights'. The size of your step is the 'Learning Rate'."
            defaultOpen
          >
             <div class="mt-4 p-4 rounded-xl bg-orange-50 dark:bg-orange-900/10 border border-orange-200 dark:border-orange-800/30">
               <h4 class="font-bold text-orange-800 dark:text-orange-400 mb-2">High vs Low Learning Rate</h4>
               <p class="text-sm dark:text-gray-300">If your steps are too small (Low Learning Rate), it takes millions of years to reach the valley. If you take giant, Hulk-sized leaps (High Learning Rate), you'll completely overshoot the valley and end up on the next mountain over.</p>
             </div>
          </ConceptCard>
        </template>

        <!-- ==================== 3. TECHNICAL DEEP DIVE ==================== -->
        <template v-if="activeSection === 'deep-dive'">
          <ConceptCard
            id="deep-dive"
            icon="🔬"
            title="Derivatives, Gradients & Chain Rule"
            subtitle="The Holy Trinity of AI Training"
            definition="A Derivative is the slope of a 2D line. A Gradient is a collection of derivatives across multidimensional space (like slopes on a 3D terrain mapping X and Y). The Chain Rule is a calculus trick allowing us to calculate the derivative of nested functions."
            defaultOpen
          >
             <div class="bg-gray-100 dark:bg-gray-800/50 p-4 rounded-xl border border-gray-200 dark:border-white/10 mt-4 text-sm font-mono overflow-auto text-gray-800 dark:text-gray-300">
                <p><span class="font-bold text-emerald-600 dark:text-emerald-400">The Chain Rule (Backpropagation):</span></p>
                <p>A Neural Network is just nested functions: `Output = F(G(H(Input)))`</p>
                <p>To fix an error at `H` (early layer), we must calculate how `Output` changes when `F` changes, multiplied by how `F` changes when `G` changes, multiplied by how `G` changes when `H` changes.</p>
                <p class="mt-2 text-purple-600 dark:text-purple-400 text-xs">// Essentially, errors flow backwards through the network layer by layer multiplying together.</p>
             </div>
          </ConceptCard>
        </template>

        <!-- ==================== 4. VISUALIZATION ==================== -->
        <template v-if="activeSection === 'visualization'">
          <ConceptCard
            id="viz"
            icon="👁️"
            title="The Loss Landscape"
            subtitle="Finding the global minimum"
            defaultOpen
          >
             <div class="mt-4 flex flex-col items-center p-6 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 font-mono text-sm leading-tight text-gray-500">
                <div class="flex">
                  <div class="w-1/2 flex flex-col items-end">
                    <span>* </span>
                    <span> * </span>
                    <span>  * </span>
                    <span>   * </span>
                    <span>    * </span>
                    <span>     * </span>
                    <span>      * </span>
                  </div>
                  <div class="w-1/2 flex flex-col items-start">
                    <span> *</span>
                    <span> *</span>
                    <span>*</span>
                    <span class="text-red-500 font-bold">* <span class="text-xs ml-2 text-gray-400">← Local Minimum (AI thinks it finished)</span></span>
                    <span>*</span>
                    <span> *</span>
                    <span class="text-emerald-500 font-bold">* <span class="text-xs ml-2 text-gray-400">← Global Minimum (actual goal)</span></span>
                  </div>
                </div>
             </div>
             <p class="mt-4 text-sm text-gray-600 dark:text-gray-400">Because terrain isn't perfectly smooth, models sometimes get stuck in "Local Minima" (a small dip on the side of the mountain) instead of reaching the true bottom.</p>
          </ConceptCard>
        </template>

        <!-- ==================== 5. CODE IMPLEMENTATION ==================== -->
        <template v-if="activeSection === 'code'">
          <div class="bg-gray-100 dark:bg-gray-800/50 p-6 rounded-2xl border border-gray-200 dark:border-white/10 mb-8">
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Implementation: A single Gradient Descent step</h3>
            <div class="bg-[#1e1e1e] rounded-xl overflow-hidden text-sm font-mono leading-relaxed p-4 overflow-x-auto text-gray-300 shadow-xl border border-gray-700">
<pre><code><span class="text-green-400"># Imagine we want to find the lowest point of the curve y = x^2</span>
<span class="text-green-400"># The calculus derivative (slope) of x^2 is 2x.</span>

x = <span class="text-emerald-300">5.0</span>               <span class="text-green-400"># Our starting point (random guess)</span>
learning_rate = <span class="text-emerald-300">0.1</span>   <span class="text-green-400"># Our step size</span>

<span class="text-blue-400">for</span> epoch <span class="text-blue-400">in</span> range(<span class="text-emerald-300">10</span>):
    <span class="text-green-400"># 1. Forward Pass (Calculate Current Error/Position)</span>
    y = x ** <span class="text-emerald-300">2</span>
    print(<span class="text-orange-300">f"Epoch {epoch}: Current x = {x:.2f}, Error = {y:.2f}"</span>)
    
    <span class="text-green-400"># 2. Backward Pass (Calculate the Gradient/Slope)</span>
    gradient = <span class="text-emerald-300">2</span> * x
    
    <span class="text-green-400"># 3. Update Step (Go in the OPPOSITE direction of the slope)</span>
    x = x - (learning_rate * gradient)

<span class="text-green-400"># Execution shows 'x' steadily moving towards 0.0 (the minimum!)</span></code></pre>
            </div>
          </div>

          <ConceptCard
            id="your-turn-m2-3"
            icon="✍️"
            title="YOUR TURN: Code Tasks"
            subtitle="Tweak the hyperparameters"
            defaultOpen
          >
             <div class="mt-4 space-y-4 text-sm text-gray-700 dark:text-gray-300">
              <div class="p-4 bg-white dark:bg-gray-800/80 rounded-xl border border-emerald-200 dark:border-emerald-800/30">
                <span class="font-bold text-emerald-600 dark:text-emerald-400 mb-2 block">Task 1: Exploding Gradients</span>
                <p>Mentally trace the loop if `learning_rate = 1.5`. (Step 1: x = 5. Gradient = 10. Update: `x = 5 - (1.5 * 10) = -10`. Next gradient = -20...). Notice how the error rapidly explodes bigger and bigger.</p>
              </div>
            </div>
          </ConceptCard>
        </template>

        <!-- ==================== 6. MICRO-EXERCISES ==================== -->
        <template v-if="activeSection === 'exercises'">
          <ConceptCard
            id="micro-exercises-m23"
            icon="⚡"
            title="Concept Checks"
            subtitle="Calculus mechanics"
            defaultOpen
          >
            <div class="space-y-6 mt-4">
              <!-- Exec 1 -->
              <div>
                <h4 class="font-semibold text-gray-900 dark:text-white text-sm mb-2">1. The purpose of negative updates</h4>
                <div class="bg-gray-900 rounded-lg p-3 font-mono text-sm text-gray-300">
                  <p class="font-sans">Why do we subtract `(learning_rate * gradient)` instead of adding it?</p>
                </div>
              </div>
            </div>
          </ConceptCard>
        </template>

        <!-- ==================== 7. COMMON MISTAKES ==================== -->
        <template v-if="activeSection === 'mistakes'">
          <ConceptCard
            id="mistakes-m23"
            icon="⚠️"
            title="Common Beginner Mistakes"
            subtitle="Save yourself hours of debugging"
            defaultOpen
          >
             <ul class="space-y-4 mt-4 text-sm text-gray-600 dark:text-gray-400">
              <li class="p-4 bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800/30 rounded-xl">
                <strong class="text-red-700 dark:text-red-400 block mb-1">1. Vanishing Gradients</strong>
                Because of the Chain Rule, deep networks multiply dozens of derivatives together. If those derivatives are small fractions (like 0.1), multiplying `0.1 * 0.1 * 0.1 ...` results in practically `0.0`. The early layers stop learning completely. (Fixed typically by using ReLU activation functions which preserve gradient size).
              </li>
              <li class="p-4 bg-orange-50 dark:bg-orange-900/10 border border-orange-200 dark:border-orange-800/30 rounded-xl">
                <strong class="text-orange-700 dark:text-orange-400 block mb-1">2. Naive Learning Rates</strong>
                A static learning rate of `0.01` is rarely optimal. Modern ML uses 'Schedulers' or 'Optimizers' like Adam which dynamically adjust the learning rate per-parameter as it approaches the valley floor.
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
                <span class="font-bold text-purple-700 dark:text-purple-400 block mb-2">➡️ Phase 4.1: PyTorch Backpropagation</span>
                You will rarely write `gradient = 2*x`. Instead, you will define complex layers and simply call `loss.backward()`. PyTorch will automatically run the Chain Rule across everything. This module explains why `backward()` works.
              </div>
          </ConceptCard>
        </template>

        <!-- ==================== 9. REAL-WORLD ==================== -->
        <template v-if="activeSection === 'real-world'">
           <ConceptCard
            id="real-world"
            icon="🏭"
            title="Real-World Application"
            subtitle="Training a Large Language Model"
            defaultOpen
          >
            <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
              When OpenAI trained GPT-4, they pushed petabytes of text through the network.
            </p>
            <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              Every single mispredicted token generated a tiny Error. That Error was then backpropagated (via the Chain Rule) backwards through billions of parameters via massive GPU clusters, slowly nudging the weights over months. The math you saw is exactly what happened, scaled up.
            </p>
          </ConceptCard>
        </template>

        <!-- ==================== 10. MINI PROJECT ==================== -->
        <template v-if="activeSection === 'project'">
          <ConceptCard
            id="project"
            icon="🛠️"
            title="Mini Project: Derivative Check"
            subtitle="Analytic vs Numeric"
            defaultOpen
          >
            <div class="mt-4 p-5 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-gray-800/50">
              <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
                <strong>Goal:</strong> Sometimes math formulas fail us. We can "fake" a derivative numerically using extremely small steps. Formula: `Slope = (f(x + h) - f(x)) / h`. Let `h` be `0.0001`. Calculate the numeric derivative for `x=5` on `y=x^2`.
              </p>
              <div class="bg-gray-900 p-4 rounded-xl text-gray-300 font-mono text-xs overflow-auto">
<pre>x = 5.0
h = 0.0001
# f(x) = x**2
# Calculate: fake_slope = ?
# Compare it to the real slope (2 * x)
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
              <li><strong>Calculus</strong> tells the model how a small change in its parameters affects its error.</li>
              <li><strong>Gradient Descent</strong> is the algorithm of walking down the error hill optimally.</li>
              <li><strong>The Chain Rule</strong> propagates that error backwards through deep layers.</li>
              <li><strong>Learning Rate</strong> governs the step size. Too high = Exploding error. Too low = Never learns.</li>
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
                <p class="text-gray-700 dark:text-gray-300 mb-2"><strong>1. Negative Updates:</strong> A positive slope means the curve is going UP when moving right. We always want to go DOWN the minimum. So we subtract the slope to move left against it.</p>
              </div>

               <div class="p-4 bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-200 dark:border-emerald-800/20 rounded-xl font-mono text-xs overflow-auto text-emerald-900 dark:text-emerald-300">
                <span class="font-bold text-emerald-800 dark:text-emerald-400 mb-2 block font-sans text-sm">Mini Project Solution</span>
<pre>x = 5.0
h = 0.0001
f_x = x**2
f_x_plus_h = (x + h) ** 2

fake_slope = (f_x_plus_h - f_x) / h
print(fake_slope)  # ~ 10.0001
print(2 * x)       # Exactly 10.0

# The numerical slope is beautifully close to the true analytical slope!
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
