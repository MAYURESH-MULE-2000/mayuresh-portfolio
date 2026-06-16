<template>
  <div class="learn-module min-h-screen">
    <!-- Header -->
    <div class="px-4 md:px-8 py-8 pb-4 max-w-6xl mx-auto">
      <a href="/learn/ai-engineer" class="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors mb-4">
        ← Back to Curriculum
      </a>
      <div class="flex items-center gap-3 mb-2">
        <span class="text-3xl">🧹</span>
        <h1 class="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">M2.4 Data Engineering</h1>
      </div>
      <p class="text-gray-600 dark:text-gray-400 text-sm md:text-base max-w-2xl">
        Data splits, feature engineering, normalization, and imbalanced datasets. Building bulletproof inputs for machine learning models.
      </p>
    </div>

    <!-- Layout: Nav + Content -->
    <div class="px-4 md:px-8 max-w-6xl mx-auto flex flex-col lg:flex-row gap-6 pb-16">
      <SectionNav
        :sections="sections"
        :activeSection="activeSection"
        activeColor="bg-amber-600"
        @select="setSection"
        class="lg:w-64 flex-shrink-0"
      />

      <div class="flex-1 min-w-0 space-y-8">
        
        <!-- ==================== 1. CONCEPT OVERVIEW ==================== -->
        <template v-if="activeSection === 'overview'">
          <div class="bg-gradient-to-br from-amber-900 to-orange-900 rounded-2xl p-8 md:p-12 text-center text-white shadow-xl relative overflow-hidden group mb-8">
            <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-400 via-orange-500 to-red-500"></div>
            <div class="text-6xl mb-6 transform group-hover:scale-110 transition-transform duration-500">🧹</div>
            <h2 class="text-3xl md:text-4xl font-bold mb-4 tracking-tight">1. Concept Overview</h2>
            <p class="text-amber-100 mb-8 max-w-lg mx-auto">Garbage In, Garbage Out. A brilliant neural network algorithm will fail spectacularly if you feed it unnormalized, leaky dataset features.</p>
          </div>

          <ConceptCard
            id="overview-dataeng"
            icon="🧠"
            title="Shaping the Raw Material"
            subtitle="The unsung heroes of AI"
            definition="Data Engineering is the process of extracting, cleaning, and transforming raw worldly data into neat mathematical features that an algorithm can efficiently process."
            analogy="You can have the most powerful car engine in the world (The AI Model). If you pump muddy, unrefined crude oil into it (Raw Data), the engine explodes safely on line 1."
            seniorTip="Scrubbing data and building pipelines is 80% of an AI Engineer's daily work. Tuning models is 20%. Master this."
            defaultOpen
          >
          </ConceptCard>
        </template>

        <!-- ==================== 2. INTUITION FIRST ==================== -->
        <template v-if="activeSection === 'intuition'">
          <ConceptCard
            id="intuition"
            icon="💡"
            title="Mental Models: The Study Guide"
            subtitle="Train vs Validation vs Test"
            definition="Never train a model on all your data. If you do, you have no way to honestly know if it learned patterns, or if it just legally plagiarized (memorized) the answers. Data must be split into three buckets."
            analogy="Training Data is the homework. Validation Data is the practice quiz you use to see if you are studying well. Test Data is the final exam locked in the teacher's desk until the very end."
            defaultOpen
          >
             <div class="mt-4 p-4 rounded-xl bg-orange-50 dark:bg-orange-900/10 border border-orange-200 dark:border-orange-800/30 text-sm">
                <ul class="space-y-2 dark:text-gray-300">
                    <li><strong class="text-amber-700 dark:text-amber-500">Train (70%):</strong> Model actively sees and learns from this.</li>
                    <li><strong class="text-amber-700 dark:text-amber-500">Validation (15%):</strong> Used while tuning to prevent 'Overfitting'.</li>
                    <li><strong class="text-amber-700 dark:text-amber-500">Test (15%):</strong> Used exactly ONCE at the end. The unvarnished truth.</li>
                </ul>
             </div>
          </ConceptCard>
        </template>

        <!-- ==================== 3. TECHNICAL DEEP DIVE ==================== -->
        <template v-if="activeSection === 'deep-dive'">
          <ConceptCard
            id="deep-dive"
            icon="🔬"
            title="Feature Engineering & Scikit-Learn"
            subtitle="Turning reality into tensors"
            definition="Many data types aren't numeric. Cities (NY, SF) must be One-Hot Encoded (represented as [1,0], [0,1]). Vast numeric ranges (Salary: 100k vs Age: 25) must be Scaled-otherwise the ML model will hallucinate that Salary is 4000x more 'important' just because the raw number is larger."
            defaultOpen
          >
          </ConceptCard>
        </template>

        <!-- ==================== 4. VISUALIZATION ==================== -->
        <template v-if="activeSection === 'visualization'">
          <ConceptCard
            id="viz"
            icon="👁️"
            title="Imbalanced Datasets"
            subtitle="The accuracy illusion"
            defaultOpen
          >
             <div class="mt-4 flex flex-col p-6 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 font-mono text-sm leading-tight text-gray-500 text-center">
                <div class="text-blue-500 mb-2">990 Normal Transactions</div>
                <div class="text-red-500 font-bold mb-4">10 Fraudulent Transactions</div>
                <p class="font-sans text-xs text-gray-400 max-w-sm mx-auto">
                    A terrible AI model that simply guesses "Normal" 100% of the time will achieve a 99% accuracy score here.
                </p>
             </div>
             <p class="mt-4 text-sm text-gray-600 dark:text-gray-400">Class imbalance is solved via undersampling the majority class, oversampling the minority (SMOTE algorithm), or using specialized loss functions (Focal Loss).</p>
          </ConceptCard>
        </template>

        <!-- ==================== 5. CODE IMPLEMENTATION ==================== -->
        <template v-if="activeSection === 'code'">
          <div class="bg-gray-100 dark:bg-gray-800/50 p-6 rounded-2xl border border-gray-200 dark:border-white/10 mb-8">
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Implementation: Train/Test Spilts & Imputers</h3>
            <div class="bg-[#1e1e1e] rounded-xl overflow-hidden text-sm font-mono leading-relaxed p-4 overflow-x-auto text-gray-300 shadow-xl border border-gray-700">
<pre><code><span class="text-purple-400">import</span> pandas <span class="text-blue-400">as</span> pd
<span class="text-purple-400">from</span> sklearn.model_selection <span class="text-purple-400">import</span> train_test_split
<span class="text-purple-400">from</span> sklearn.preprocessing <span class="text-purple-400">import</span> StandardScaler

<span class="text-green-400"># 1. Load fake tabular data</span>
X = pd.DataFrame({
    <span class="text-orange-300">"age"</span>: [<span class="text-emerald-300">25</span>, <span class="text-emerald-300">35</span>, <span class="text-emerald-300">45</span>, <span class="text-emerald-300">22</span>, <span class="text-emerald-300">50</span>],
    <span class="text-orange-300">"income"</span>: [<span class="text-emerald-300">50000</span>, <span class="text-emerald-300">90000</span>, <span class="text-emerald-300">120000</span>, <span class="text-emerald-300">45000</span>, <span class="text-emerald-300">110000</span>]
})
y = pd.Series([<span class="text-emerald-300">1</span>, <span class="text-emerald-300">0</span>, <span class="text-emerald-300">0</span>, <span class="text-emerald-300">1</span>, <span class="text-emerald-300">1</span>]) <span class="text-green-400"># Targets (Labels to predict)</span>

<span class="text-green-400"># 2. Split it (80% Train, 20% Test)</span>
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=<span class="text-emerald-300">0.2</span>, random_state=<span class="text-emerald-300">42</span>
)

<span class="text-green-400"># 3. Scaling (Scaling makes gradient descent faster/stable)</span>
scaler = StandardScaler()

<span class="text-green-400"># VERY IMPORTANT: We FIT the scaler ONLY on training data.</span>
X_train_scaled = scaler.fit_transform(X_train)

<span class="text-green-400"># We TRANSFORM the test data using the Training parameters</span>
X_test_scaled = scaler.transform(X_test)</code></pre>
            </div>
          </div>

          <ConceptCard
            id="your-turn-m2-4"
            icon="✍️"
            title="YOUR TURN: Code Tasks"
            subtitle="Pipelines"
            defaultOpen
          >
             <div class="mt-4 space-y-4 text-sm text-gray-700 dark:text-gray-300">
              <div class="p-4 bg-white dark:bg-gray-800/80 rounded-xl border border-amber-200 dark:border-amber-800/30">
                <span class="font-bold text-amber-600 dark:text-amber-400 mb-2 block">Task 1: The Leakage Trap</span>
                <p>Imagine if we ran `scaler.fit_transform(X)` on the ENTIRE dataset BEFORE splitting. Why is this considered cheating (Data Leakage)?</p>
              </div>
            </div>
          </ConceptCard>
        </template>

        <!-- ==================== 6. MICRO-EXERCISES ==================== -->
        <template v-if="activeSection === 'exercises'">
          <ConceptCard
            id="micro-exercises-m24"
            icon="⚡"
            title="Concept Checks"
            subtitle="Logic and Scaling"
            defaultOpen
          >
            <div class="space-y-6 mt-4">
              <!-- Exec 1 -->
              <div>
                <h4 class="font-semibold text-gray-900 dark:text-white text-sm mb-2">1. Image Scaling</h4>
                <div class="bg-gray-900 rounded-lg p-3 font-mono text-sm text-gray-300">
                  <p class="font-sans">Image pixels range from 0 to 255. A common first step in PyTorch is dividing the entire image array by 255.0. What does this achieve?</p>
                </div>
              </div>
            </div>
          </ConceptCard>
        </template>

        <!-- ==================== 7. COMMON MISTAKES ==================== -->
        <template v-if="activeSection === 'mistakes'">
          <ConceptCard
            id="mistakes-m24"
            icon="⚠️"
            title="Common Beginner Mistakes"
            subtitle="Save yourself hours of debugging"
            defaultOpen
          >
             <ul class="space-y-4 mt-4 text-sm text-gray-600 dark:text-gray-400">
              <li class="p-4 bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800/30 rounded-xl">
                <strong class="text-red-700 dark:text-red-400 block mb-1">1. Data Leakage (The Cardinal Sin)</strong>
                Using Information from the Test Set to train your model. E.g., filling missing ages by taking the Mean Age of the ENTIRE dataset instead of just the Training dataset.
              </li>
              <li class="p-4 bg-orange-50 dark:bg-orange-900/10 border border-orange-200 dark:border-orange-800/30 rounded-xl">
                <strong class="text-orange-700 dark:text-orange-400 block mb-1">2. Label Sparsity</strong>
                One-hot encoding a "City" column that has 5,000 distinct cities will add 5,000 empty columns to your DataFrame, crashing your RAM. Highly specialized categories should be hashed or heavily bucketed (e.g. "Major Hub", "Rural").
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
                <span class="font-bold text-purple-700 dark:text-purple-400 block mb-2">➡️ Phase 3: Scikit-Learn Pipelines</span>
                Models like XGBoost expect rigorously defined pipelines where the scaling, encoding, and imputation happens sequentially.
              </div>
          </ConceptCard>
        </template>

        <!-- ==================== 9. REAL-WORLD ==================== -->
        <template v-if="activeSection === 'real-world'">
           <ConceptCard
            id="real-world"
            icon="🏭"
            title="Real-World Application"
            subtitle="Why projects fail in production"
            defaultOpen
          >
            <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
              A healthcare startup trained a model to detect cancer and scored 99% accuracy on their test set using local hospital data.
            </p>
            <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              When deployed nationally, accuracy plummeted to 50%. Why? The baseline lighting (pixels) of the X-Ray machines native to the training hospital was unique. The model learned to identify the *hospital's machine*, not the cancer. Proper cross-validation and feature scaling across multiple disjoint sets prevents this.
            </p>
          </ConceptCard>
        </template>

        <!-- ==================== 10. MINI PROJECT ==================== -->
        <template v-if="activeSection === 'project'">
          <ConceptCard
            id="project"
            icon="🛠️"
            title="Mini Project: One-Hot Encoder"
            subtitle="Transform strings to bits"
            defaultOpen
          >
            <div class="mt-4 p-5 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-gray-800/50">
              <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
                <strong>Goal:</strong> Use Pandas `pd.get_dummies()` to convert a categorical column ("Color" = Red, Blue, Blue) into a binary One-Hot matrix.
              </p>
              <div class="bg-gray-900 p-4 rounded-xl text-gray-300 font-mono text-xs overflow-auto">
<pre>import pandas as pd

df = pd.DataFrame({"ID": [1,2,3], "Color": ["Red", "Blue", "Red"]})
# Your code: df_encoded = pd.get_dummies(df, columns=["Color"])
# Look at the shape of df_encoded!
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
              <li><strong>Train/Val/Test:</strong> Learn on Train, tweak hyperparameters on Validation, report final grade on Test.</li>
              <li><strong>Data Leakage:</strong> Never apply aggregations or scalers across the full dataset before splitting. Only FIT on Train.</li>
              <li><strong>Imbalance:</strong> Accuracy metrics are useless if 99% of labels are identical.</li>
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
                <h4 class="font-bold text-emerald-800 dark:text-emerald-400 mb-2">Micro-Exercises & Tasks</h4>
                <p class="text-gray-700 dark:text-gray-300 mb-4"><strong>Task 1 (Leakage):</strong> If you scale BEFORE splitting, the Mean and Max of the overall dataset (including the Test set) influences the scaled numbers of the Training set. Your training set "peeked" into the future statistical ranges of the exam.</p>
                <p class="text-gray-700 dark:text-gray-300"><strong>Exercise 1 (Image Pixels):</strong> Dividing by 255.0 standardizes the range to exactly `0.0` to `1.0`. Neural networks perform matrix multiplication during Backpropagation. If inputs are large (like 255), the gradients explode rapidly. Small numbers keep training stable.</p>
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
  { id: 'overview', label: '1. Concept Overview', icon: '🧹' },
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
