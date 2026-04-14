<template>
  <div class="learn-module min-h-screen">
    <!-- Header -->
    <div class="px-4 md:px-8 py-8 pb-4 max-w-6xl mx-auto">
      <a href="/learn/ai-engineer" class="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors mb-4">
        ← Back to Curriculum
      </a>
      <div class="flex items-center gap-3 mb-2">
        <span class="text-3xl">🎛️</span>
        <h1 class="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">M3.4 Model Tuning</h1>
      </div>
      <p class="text-gray-600 dark:text-gray-400 text-sm md:text-base max-w-2xl">
        Hyperparameters, the Bias-Variance tradeoff, Grid Search, and XGBoost. How to take a model from average to Kaggle-winning.
      </p>
    </div>

    <!-- Layout: Nav + Content -->
    <div class="px-4 md:px-8 max-w-6xl mx-auto flex flex-col lg:flex-row gap-6 pb-16">
      <SectionNav
        :sections="sections"
        :activeSection="activeSection"
        activeColor="bg-violet-600"
        @select="setSection"
        class="lg:w-64 flex-shrink-0"
      />

      <div class="flex-1 min-w-0 space-y-8">
        
        <!-- ==================== 1. CONCEPT OVERVIEW ==================== -->
        <template v-if="activeSection === 'overview'">
          <div class="bg-gradient-to-br from-violet-900 to-purple-900 rounded-2xl p-8 md:p-12 text-center text-white shadow-xl relative overflow-hidden group mb-8">
            <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-violet-400 via-purple-500 to-fuchsia-500"></div>
            <div class="text-6xl mb-6 transform group-hover:scale-110 transition-transform duration-500">🎛️</div>
            <h2 class="text-3xl md:text-4xl font-bold mb-4 tracking-tight">1. Concept Overview</h2>
            <p class="text-purple-100 mb-8 max-w-lg mx-auto">Models have two types of settings. Parameters (the algorithm learns these itself) and Hyperparameters (the dials that YOU, the human, must tune).</p>
          </div>

          <ConceptCard
            id="overview-tuning"
            icon="🧠"
            title="The Art of Hyperparameters"
            subtitle="Overriding the defaults"
            definition="When you type `RandomForestClassifier()`, it defaults to `n_estimators=100`. Why 100? Because the scikit-learn developers guessed it's a decent default. But for your specific medical data, maybe it needs 500, or maybe just 10. Finding the optimal settings requires computational search techniques."
            analogy="Building a model is like buying an oven with presets. 'Pizza' cooks at 400° for 10 minutes (defaults). But you are baking a massive 5-layer cake (your custom dataset). You must manually tune the temperature and timer dials via trial and error."
            seniorTip="Do not manual-tune dial by dial. Use Grid Search or Random Search to let the computer test thousands of combinations overnight."
            defaultOpen
          >
          </ConceptCard>
        </template>

        <!-- ==================== 2. INTUITION FIRST ==================== -->
        <template v-if="activeSection === 'intuition'">
          <ConceptCard
            id="intuition"
            icon="💡"
            title="Mental Models: The Bias-Variance Tradeoff"
            subtitle="The Goldilocks Zone"
            definition="A model has Underfitting (High Bias) when it is too simple and rigid. It assumes everything is a straight line. A model has Overfitting (High Variance) when it memorizes the noise in the data, drawing insane spaghetti lines to hit every dot."
            analogy="Underfitting is a student who didn't study at all and guesses 'C' on every test question. Overfitting is a student who memorized the exact answer key but fails completely when the teacher changes the names in the word problem. You want the middle ground."
            defaultOpen
          >
          </ConceptCard>
        </template>

        <!-- ==================== 3. TECHNICAL DEEP DIVE ==================== -->
        <template v-if="activeSection === 'deep-dive'">
          <ConceptCard
            id="deep-dive"
            icon="🔬"
            title="Grid Search & Cross Validation"
            subtitle="The systematic approach"
            definition="Grid Search is submitting a dictionary of options (e.g. `n_estimators`: [50, 100, 200], `max_depth`: [5, 10]). The computer tests all 6 combinations. To verify accuracy properly, we use K-Fold Cross Validation. We split the training data into K chunks (like 5), train on 4 chunks, evaluate on the 1, rotate, and average the score."
            defaultOpen
          >
             <div class="mt-4 p-4 rounded-xl bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-sm">
                <ul class="space-y-3 dark:text-gray-300">
                    <li><strong class="text-violet-600 dark:text-violet-400 block mb-1">Why Cross-Validation?</strong></li>
                    <li>If you tune hyperparameters based on a single Validation set score, you might accidentally 'overfit' your settings to that specific validation set's quirks.</li>
                    <li>Cross-Validation ensures your hyperparameter settings are genuinely robust across all randomized variations of the data.</li>
                </ul>
             </div>
          </ConceptCard>
        </template>

        <!-- ==================== 4. VISUALIZATION ==================== -->
        <template v-if="activeSection === 'visualization'">
          <ConceptCard
            id="viz"
            icon="👁️"
            title="The Overfitting Curve"
            subtitle="Training Error vs Test Error"
            defaultOpen
          >
             <div class="mt-4 flex flex-col items-center p-6 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 font-mono text-xs overflow-x-auto">
                <table class="w-full text-left">
                  <tr class="text-gray-500 border-b border-gray-700">
                    <th>Model Complexity</th>
                    <th>Train Error</th>
                    <th>Test (Real) Error</th>
                    <th>Status</th>
                  </tr>
                  <tr>
                    <td class="py-2">Very Simple (Linear)</td>
                    <td class="text-red-500">40%</td>
                    <td class="text-red-500">42%</td>
                    <td>Underfitting (High Bias)</td>
                  </tr>
                  <tr class="bg-violet-50 dark:bg-violet-900/20 font-bold">
                    <td class="py-2">Medium (Random Forest, depth=5)</td>
                    <td class="text-emerald-500">10%</td>
                    <td class="text-emerald-500">12%</td>
                    <td>Sweet Spot</td>
                  </tr>
                  <tr>
                    <td class="py-2">Extremely Complex (Depth=100)</td>
                    <td class="text-emerald-500">0%</td>
                    <td class="text-red-500">35%</td>
                    <td>Overfitting (High Variance)</td>
                  </tr>
                </table>
             </div>
             <p class="mt-4 text-xs text-gray-500 text-center">Notice how Train Error ALWAYS goes to 0% if complexity goes to infinity, while Test error crashes.</p>
          </ConceptCard>
        </template>

        <!-- ==================== 5. CODE IMPLEMENTATION ==================== -->
        <template v-if="activeSection === 'code'">
          <div class="bg-gray-100 dark:bg-gray-800/50 p-6 rounded-2xl border border-gray-200 dark:border-white/10 mb-8">
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Implementation: GridSearchCV</h3>
            <div class="bg-[#1e1e1e] rounded-xl overflow-hidden text-sm font-mono leading-relaxed p-4 overflow-x-auto text-gray-300 shadow-xl border border-gray-700">
<pre><code><span class="text-purple-400">from</span> sklearn.ensemble <span class="text-purple-400">import</span> RandomForestClassifier
<span class="text-purple-400">from</span> sklearn.model_selection <span class="text-purple-400">import</span> GridSearchCV

<span class="text-green-400"># 1. Base Model</span>
rf = RandomForestClassifier(random_state=<span class="text-emerald-300">42</span>)

<span class="text-green-400"># 2. Define the Tuning Grid</span>
param_grid = { 
    <span class="text-orange-300">'n_estimators'</span>: [<span class="text-emerald-300">50</span>, <span class="text-emerald-300">100</span>, <span class="text-emerald-300">200</span>],
    <span class="text-orange-300">'max_depth'</span>: [<span class="text-emerald-300">4</span>, <span class="text-emerald-300">10</span>, <span class="text-purple-400">None</span>] 
}

<span class="text-green-400"># 3. Setup the 5-Fold Cross Validation Searcher</span>
<span class="text-green-400"># This will train 3x3 = 9 combinations. For 5 folds = 45 models total!</span>
grid_search = GridSearchCV(
    estimator=rf, 
    param_grid=param_grid, 
    cv=<span class="text-emerald-300">5</span>, 
    scoring=<span class="text-orange-300">'accuracy'</span>, 
    n_jobs=-<span class="text-emerald-300">1</span> <span class="text-green-400"># Use all CPU cores</span>
)

<span class="text-green-400"># 4. Search and Fit</span>
grid_search.fit(X_train, y_train)

<span class="text-green-400"># 5. Access the absolute best model configuration</span>
print(<span class="text-orange-300">"Best params:"</span>, grid_search.best_params_)
best_model = grid_search.best_estimator_</code></pre>
            </div>
          </div>

          <ConceptCard
            id="your-turn-m3-4"
            icon="✍️"
            title="YOUR TURN: Tuning Challenge"
            subtitle="Understand the impact"
            defaultOpen
          >
             <div class="mt-4 space-y-4 text-sm text-gray-700 dark:text-gray-300">
              <div class="p-4 bg-white dark:bg-gray-800/80 rounded-xl border border-violet-200 dark:border-violet-800/30">
                <span class="font-bold text-violet-600 dark:text-violet-400 mb-2 block">Task 1: Fixing Overfitting</span>
                <p>Your Random Forest scores 99% on Train and 65% on Test (Massive overfitting). Which hyperparameter should you alter to force the model to be simpler and less rigid in its memorization?</p>
              </div>
            </div>
          </ConceptCard>
        </template>

        <!-- ==================== 6. MICRO-EXERCISES ==================== -->
        <template v-if="activeSection === 'exercises'">
          <ConceptCard
            id="micro-exercises-m34"
            icon="⚡"
            title="Concept Checks"
            subtitle="Logic gaps"
            defaultOpen
          >
            <div class="space-y-6 mt-4">
              <!-- Exec 1 -->
              <div>
                <h4 class="font-semibold text-gray-900 dark:text-white text-sm mb-2">1. Computation Time</h4>
                <div class="bg-gray-900 rounded-lg p-3 font-mono text-sm text-gray-300">
                  <p class="font-sans">If you provide 4 hyperparameters, each with 5 options, and you run 10-Fold CV, how many times will the computer train a model?</p>
                </div>
              </div>
            </div>
          </ConceptCard>
        </template>

        <!-- ==================== 7. COMMON MISTAKES ==================== -->
        <template v-if="activeSection === 'mistakes'">
          <ConceptCard
            id="mistakes-m34"
            icon="⚠️"
            title="Common Beginner Mistakes"
            subtitle="Save yourself hours of debugging"
            defaultOpen
          >
             <ul class="space-y-4 mt-4 text-sm text-gray-600 dark:text-gray-400">
              <li class="p-4 bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800/30 rounded-xl">
                <strong class="text-red-700 dark:text-red-400 block mb-1">1. Grid Search vs Random Search</strong>
                If your parameter grid is massive (e.g. 5,000 combinations), `GridSearchCV` will take days to finish. In industry, we rely heavily on `RandomizedSearchCV`, which randomly samples 100 combinations. Mathematical proofs show 100 random draws get you within 5% of the true maximum 95% of the time.
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
                <span class="font-bold text-purple-700 dark:text-purple-400 block mb-2">➡️ Phase 4: Neural Network Tuning</span>
                Tuning Classical ML takes minutes/hours. Tuning a Deep Neural Network architecture (number of layers, learning rate) via Grid Search is nearly impossible because 1 model takes 3 days to train. You will learn dynamic LR Schedulers to auto-tune as it goes.
              </div>
          </ConceptCard>
        </template>

        <!-- ==================== 9. REAL-WORLD ==================== -->
        <template v-if="activeSection === 'real-world'">
           <ConceptCard
            id="real-world"
            icon="🏭"
            title="Real-World Application"
            subtitle="The domination of XGBoost"
            defaultOpen
          >
            <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
              If an AI engineer encounters flat, tabular data (Excel/CSVs), they don't use Neural Networks. They use XGBoost or LightGBM.
            </p>
            <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              XGBoost is an evolution of trees. But it has roughly 20 hyperparameter dials. Entire MLOps cloud systems (like AWS SageMaker) are built around hyperparameter optimization engines (using Bayesian Optimization) to automate the turning of these dials until the perfect XGBoost model is synthesized.
            </p>
          </ConceptCard>
        </template>

        <!-- ==================== 10. MINI PROJECT ==================== -->
        <template v-if="activeSection === 'project'">
          <ConceptCard
            id="project"
            icon="🛠️"
            title="Mini Project: Spot the Bias/Variance"
            subtitle="Diagnostic test"
            defaultOpen
          >
            <div class="mt-4 p-5 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-gray-800/50">
              <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
                <strong>Goal:</strong> Read the following 3 output logs and identify if it is Underfitting, Overfitting, or Good.
              </p>
              <div class="bg-gray-900 p-4 rounded-xl text-gray-300 font-mono text-xs overflow-auto">
<pre>Model A:
Train Acc: 52% | Test Acc: 50%

Model B: 
Train Acc: 94% | Test Acc: 92%

Model C:
Train Acc: 99.8% | Test Acc: 71%
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
              <li><strong>Hyperparameters:</strong> Settings you configure before training starts.</li>
              <li><strong>Bias:</strong> Assuming reality is too simple (Underfit). <strong>Variance:</strong> Memorizing the noise (Overfit).</li>
              <li><strong>Cross-Validation:</strong> Rotating the training/validation splits multiple times to ensure the score is universally true.</li>
              <li><strong>GridSearchCV:</strong> Brute forcing the optimal configuration automatically.</li>
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
              <div class="p-4 bg-violet-50 dark:bg-violet-900/10 border border-violet-200 dark:border-violet-800/20 rounded-xl">
                <h4 class="font-bold text-violet-800 dark:text-violet-400 mb-2">Tasks & Exercises</h4>
                <p class="text-gray-700 dark:text-gray-300 mb-4"><strong>Task 1 (Fixing Overfit):</strong> You must reduce the `max_depth` of the trees. If a tree cannot grow deeply, it physically cannot ask enough IF/ELSE questions to memorize every single data point, forcing it to learn broad general rules instead.</p>
                <p class="text-gray-700 dark:text-gray-300 mb-4"><strong>Exercise 1 (Math):</strong> 5 * 5 * 5 * 5 = 625 combinations. Multiplied by 10 Folds = <strong>6,250 model training runs</strong>.</p>
                <p class="text-gray-700 dark:text-gray-300"><strong>Project (Diagnosis):</strong><br>
                Model A: Underfitting. It sucks at both.<br>
                Model B: Good Fit. High accuracy, and Train closely matches Test.<br>
                Model C: Massive Overfitting. Perfect memory, fails on unseen data.</p>
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
  { id: 'overview', label: '1. Concept Overview', icon: '🎛️' },
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
