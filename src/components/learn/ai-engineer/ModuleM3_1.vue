<template>
  <div class="learn-module min-h-screen">
    <!-- Header -->
    <div class="px-4 md:px-8 py-8 pb-4 max-w-6xl mx-auto">
      <a href="/learn/ai-engineer" class="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors mb-4">
        ← Back to Curriculum
      </a>
      <div class="flex items-center gap-3 mb-2">
        <span class="text-3xl">🎯</span>
        <h1 class="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">M3.1 Supervised Learning</h1>
      </div>
      <p class="text-gray-600 dark:text-gray-400 text-sm md:text-base max-w-2xl">
        Predicting truths using labeled data. Linear Regression, Logistic Regression, and the mighty Random Forest.
      </p>
    </div>

    <!-- Layout: Nav + Content -->
    <div class="px-4 md:px-8 max-w-6xl mx-auto flex flex-col lg:flex-row gap-6 pb-16">
      <SectionNav
        :sections="sections"
        :activeSection="activeSection"
        activeColor="bg-red-600"
        @select="setSection"
        class="lg:w-64 flex-shrink-0"
      />

      <div class="flex-1 min-w-0 space-y-8">
        
        <!-- ==================== 1. CONCEPT OVERVIEW ==================== -->
        <template v-if="activeSection === 'overview'">
          <div class="bg-gradient-to-br from-red-900 to-rose-900 rounded-2xl p-8 md:p-12 text-center text-white shadow-xl relative overflow-hidden group mb-8">
            <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-400 via-rose-500 to-pink-500"></div>
            <div class="text-6xl mb-6 transform group-hover:scale-110 transition-transform duration-500">🎯</div>
            <h2 class="text-3xl md:text-4xl font-bold mb-4 tracking-tight">1. Concept Overview</h2>
            <p class="text-rose-100 mb-8 max-w-lg mx-auto">Supervised Learning is the bedrock of Applied AI. You provide historical data AND the historically correct answers (labels). The algorithm finds the mathematical bridge between them.</p>
          </div>

          <ConceptCard
            id="overview-supervised"
            icon="🧠"
            title="Learning from the Answer Key"
            subtitle="Features (X) and Labels (y)"
            definition="In Supervised Learning, your dataset is split into Features (the clues) and Labels (the answer). If predicting House Prices, the Features `X` are [Square Footage, Bedrooms, Zipcode]. The Label `y` is [$450,000]."
            analogy="It is exactly like studying with flashcards. You look at the front (Features), guess the answer, flip it over to check the back (Label), and adjust your brain's logic if you were wrong."
            seniorTip="Do not use Deep Learning if a simple Random Forest can solve the problem. Classical algorithms take seconds to train, cost zero GPU money, and are vastly easier to debug."
            defaultOpen
          >
          </ConceptCard>
        </template>

        <!-- ==================== 2. INTUITION FIRST ==================== -->
        <template v-if="activeSection === 'intuition'">
          <ConceptCard
            id="intuition"
            icon="💡"
            title="Mental Models: Regression vs Classification"
            subtitle="The two types of questions"
            definition="Supervised learning answers only two types of questions: 'How much?' (Regression) and 'Which one?' (Classification)."
            analogy="Regression is predicting exactly what score you will get on a test (e.g., 87.5%). Classification is predicting if you will simply Pass or Fail."
            defaultOpen
          >
             <div class="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div class="p-4 bg-gray-50 dark:bg-gray-800/80 rounded-xl border border-gray-200 dark:border-gray-700">
                    <strong class="text-blue-600 dark:text-blue-400 block mb-1">Regression Outputs</strong>
                    Continuous numbers. Price, Temperature, Stock Value, Lifespan.
                </div>
                <div class="p-4 bg-gray-50 dark:bg-gray-800/80 rounded-xl border border-gray-200 dark:border-gray-700">
                    <strong class="text-purple-600 dark:text-purple-400 block mb-1">Classification Outputs</strong>
                    Discrete categories. Spam/Not Spam, Dog/Cat/Bird, Benign/Malignant.
                </div>
             </div>
          </ConceptCard>
        </template>

        <!-- ==================== 3. TECHNICAL DEEP DIVE ==================== -->
        <template v-if="activeSection === 'deep-dive'">
          <ConceptCard
            id="deep-dive"
            icon="🔬"
            title="The Three Core Algorithms"
            subtitle="Linear, Logistic, and Trees"
            definition="1) Linear Regression draws a straight line through continuous data dots. 2) Logistic Regression uses a Sigmoid curve to draw a boundary between classes (outputs 0 to 1 probabilities). 3) Decision Trees ask a series of IF/ELSE questions to split data, and Random Forests use 100+ trees voting together to prevent errors."
            defaultOpen
          >
          </ConceptCard>
        </template>

        <!-- ==================== 4. VISUALIZATION ==================== -->
        <template v-if="activeSection === 'visualization'">
          <ConceptCard
            id="viz"
            icon="👁️"
            title="Visualizing Decision Boundaries"
            subtitle="How models separate reality"
            defaultOpen
          >
             <div class="mt-4 flex flex-col md:flex-row gap-6 p-6 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 font-mono text-sm justify-center items-center">
                <div class="text-center">
                   <div class="text-blue-500 font-bold mb-2">Logistic Regression</div>
                   <div class="w-32 h-32 border border-gray-400 relative overflow-hidden">
                       <div class="absolute inset-0 bg-blue-100 dark:bg-blue-900/30 w-full hover:w-0 transition-all origin-left" style="clip-path: polygon(0 0, 100% 0, 0 100%);"></div>
                       <div class="absolute inset-0 bg-red-100 dark:bg-red-900/30 w-full" style="clip-path: polygon(100% 100%, 100% 0, 0 100%);"></div>
                       <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rotate-45 w-[150%] h-0.5 bg-black dark:bg-white"></div>
                   </div>
                   <p class="mt-2 text-xs text-gray-500 font-sans">A single straight cut.</p>
                </div>

                <div class="text-center">
                   <div class="text-emerald-500 font-bold mb-2">Decision Tree</div>
                   <div class="w-32 h-32 border border-gray-400 relative">
                       <div class="absolute top-0 right-0 w-1/2 h-1/2 bg-red-100 dark:bg-red-900/30 border-b border-l border-black dark:border-white"></div>
                       <div class="absolute bottom-0 left-0 w-full h-1/2 bg-blue-100 dark:bg-blue-900/30 border-t border-black dark:border-white"></div>
                       <div class="absolute top-0 left-0 w-1/2 h-1/2 bg-blue-100 dark:bg-blue-900/30 "></div>
                   </div>
                   <p class="mt-2 text-xs text-gray-500 font-sans">Blocky, strict IF/ELSE cuts.</p>
                </div>
             </div>
          </ConceptCard>
        </template>

        <!-- ==================== 5. CODE IMPLEMENTATION ==================== -->
        <template v-if="activeSection === 'code'">
          <div class="bg-gray-100 dark:bg-gray-800/50 p-6 rounded-2xl border border-gray-200 dark:border-white/10 mb-8">
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Implementation: Scikit-Learn Paradigm</h3>
            <div class="bg-[#1e1e1e] rounded-xl overflow-hidden text-sm font-mono leading-relaxed p-4 overflow-x-auto text-gray-300 shadow-xl border border-gray-700">
<pre><code><span class="text-purple-400">from</span> sklearn.ensemble <span class="text-purple-400">import</span> RandomForestClassifier
<span class="text-purple-400">from</span> sklearn.metrics <span class="text-purple-400">import</span> accuracy_score

<span class="text-green-400"># Assuming X_train, X_test, y_train, y_test are ready</span>

<span class="text-green-400"># 1. Initialize the Model (The empty brain)</span>
<span class="text-green-400"># n_estimators = number of trees to plant</span>
model = RandomForestClassifier(n_estimators=<span class="text-emerald-300">100</span>, random_state=<span class="text-emerald-300">42</span>)

<span class="text-green-400"># 2. FIT (Train the model using the answer key)</span>
model.fit(X_train, y_train)

<span class="text-green-400"># 3. PREDICT (Test it on unseen data)</span>
predictions = model.predict(X_test)

<span class="text-green-400"># 4. Evaluate</span>
acc = accuracy_score(y_test, predictions)
print(<span class="text-orange-300">f"Model Accuracy: {acc * 100}%"</span>)

<span class="text-green-400"># Getting underlying probabilities (Crucial for UI!)</span>
<span class="text-green-400"># e.g., Returns [0.1, 0.9] meaning 10% sure it's 0, 90% sure it's 1</span>
probs = model.predict_proba(X_test)</code></pre>
            </div>
          </div>

          <ConceptCard
            id="your-turn-m3-1"
            icon="✍️"
            title="YOUR TURN: Regression vs Classification"
            subtitle="Identify the goal"
            defaultOpen
          >
             <div class="mt-4 space-y-4 text-sm text-gray-700 dark:text-gray-300">
              <div class="p-4 bg-white dark:bg-gray-800/80 rounded-xl border border-red-200 dark:border-red-800/30">
                <span class="font-bold text-red-600 dark:text-red-400 mb-2 block">Task 1: Architect the solution</span>
                <p>You work for Netflix. You have the viewing history (`X`) of a user. You need to output the expected minutes they will watch a new movie. Is this Regression or Classification? Which sklearn algorithm (from the Deep Dive) might you choose?</p>
              </div>
            </div>
          </ConceptCard>
        </template>

        <!-- ==================== 6. MICRO-EXERCISES ==================== -->
        <template v-if="activeSection === 'exercises'">
          <ConceptCard
            id="micro-exercises-m31"
            icon="⚡"
            title="Concept Checks"
            subtitle="Logic gaps"
            defaultOpen
          >
            <div class="space-y-6 mt-4">
              <!-- Exec 1 -->
              <div>
                <h4 class="font-semibold text-gray-900 dark:text-white text-sm mb-2">1. The limit of Linear Models</h4>
                <div class="bg-gray-900 rounded-lg p-3 font-mono text-sm text-gray-300">
                  <p class="font-sans">If your dataset is shaped like a perfect circle of "Blue" dots surrounded by an outer ring of "Red" dots, will Logistic Regression work well?</p>
                </div>
              </div>
            </div>
          </ConceptCard>
        </template>

        <!-- ==================== 7. COMMON MISTAKES ==================== -->
        <template v-if="activeSection === 'mistakes'">
          <ConceptCard
            id="mistakes-m31"
            icon="⚠️"
            title="Common Beginner Mistakes"
            subtitle="Save yourself hours of debugging"
            defaultOpen
          >
             <ul class="space-y-4 mt-4 text-sm text-gray-600 dark:text-gray-400">
              <li class="p-4 bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800/30 rounded-xl">
                <strong class="text-red-700 dark:text-red-400 block mb-1">1. Overfitting Decision Trees</strong>
                A single Decision Tree allowed to grow infinitely deep will literally just memorize every single row in the training dataset via hyper-complex IF/ELSE statements. It will score 100% on Train, and 40% on Test. (Always use Random Forests instead, or limit `max_depth`).
              </li>
              <li class="p-4 bg-orange-50 dark:bg-orange-900/10 border border-orange-200 dark:border-orange-800/30 rounded-xl">
                <strong class="text-orange-700 dark:text-orange-400 block mb-1">2. Scaling ignorance in Linear Models</strong>
                Linear/Logistic regression uses distance math to draw its straight lines. If you forget to scale the data (M2.4), the line will warp wildly towards the feature with the biggest numbers. (Note: Trees do NOT require scaling!).
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
                <span class="font-bold text-purple-700 dark:text-purple-400 block mb-2">➡️ Phase 3.4: XGBoost</span>
                Random Forests plant 100 trees completely independent of each other (Bagging). In Module 3.4, you'll learn XGBoost (Boosting) where every new tree planted specifically looks at the mistakes the *previous* tree made. It is the king of Kaggle tabular data competitions.
              </div>
          </ConceptCard>
        </template>

        <!-- ==================== 9. REAL-WORLD ==================== -->
        <template v-if="activeSection === 'real-world'">
           <ConceptCard
            id="real-world"
            icon="🏭"
            title="Real-World Application"
            subtitle="Explainability vs Power"
            defaultOpen
          >
            <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
              Banks predicting if you will default on a loan use Logistic Regression or simple Trees, even if Neural Networks are 3% more accurate. Why?
            </p>
            <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              Because of the Law. If a bank denies a loan, they must legally explain EXACTLY why. "Your Debt-to-Income was &gt; 40%" (A tree's IF statement) is explainable. A Neural network is a black box of billion-parameter calculus, which regulators reject. Supervised Classical ML is preferred in highly regulated industries.
            </p>
          </ConceptCard>
        </template>

        <!-- ==================== 10. MINI PROJECT ==================== -->
        <template v-if="activeSection === 'project'">
          <ConceptCard
            id="project"
            icon="🛠️"
            title="Mini Project: Building the Pipeline"
            subtitle="The universal 4-step framework"
            defaultOpen
          >
            <div class="mt-4 p-5 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-gray-800/50">
              <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
                <strong>Goal:</strong> Write the pseudo-template every tabular ML project uses from scratch.
              </p>
              <div class="bg-gray-900 p-4 rounded-xl text-gray-300 font-mono text-xs overflow-auto">
<pre>from sklearn.linear_model import LogisticRegression

# 1. Define model 
# model = 

# 2. Train model on X_train, y_train
# ...

# 3. Predict on X_test
# preds = ...

# 4. Check accuracy
# (Pseudo code is fine)
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
              <li><strong>Regression</strong> predicts a continuous number. <strong>Classification</strong> predicts a discrete category.</li>
              <li><strong>Logistic Regression</strong> draws a straight line. Bad for complex layered data.</li>
              <li><strong>Decision Trees</strong> draw blocky IF/ELSE boundaries. Prone to memorizing (overfitting).</li>
              <li><strong>Random Forest</strong> averages out hundreds of trees to prevent overfitting and improve generalization.</li>
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
                <h4 class="font-bold text-emerald-800 dark:text-emerald-400 mb-2">Tasks & Exercises</h4>
                <p class="text-gray-700 dark:text-gray-300 mb-4"><strong>Task 1 (Netflix):</strong> Predicting "minutes watched" is predicting a continuous, infinite number. This is <strong>Regression</strong>. You would use a Linear Regression model, or a `RandomForestRegressor`.</p>
                <p class="text-gray-700 dark:text-gray-300"><strong>Exercise 1 (The Circle Problem):</strong> No. Logistic Regression can only mathematically draw a single straight, flat line `y = mx+b`. You cannot draw a single straight line to isolate a circle within a ring. You would need Trees, or feature engineering (converting X/Y coordinates to Distance-From-Center).</p>
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
  { id: 'overview', label: '1. Concept Overview', icon: '🎯' },
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
