<template>
  <div class="learn-module min-h-screen">
    <!-- Header -->
    <div class="px-4 md:px-8 py-8 pb-4 max-w-6xl mx-auto">
      <a href="/learn/ai-engineer" class="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors mb-4">
        ← Back to Curriculum
      </a>
      <div class="flex items-center gap-3 mb-2">
        <span class="text-3xl">⚖️</span>
        <h1 class="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">M3.3 Model Evaluation</h1>
      </div>
      <p class="text-gray-600 dark:text-gray-400 text-sm md:text-base max-w-2xl">
        Why 99% accuracy is completely meaningless in the real world. Confusion Matrices, Precision, Recall, and F1 Scores.
      </p>
    </div>

    <!-- Layout: Nav + Content -->
    <div class="px-4 md:px-8 max-w-6xl mx-auto flex flex-col lg:flex-row gap-6 pb-16">
      <SectionNav
        :sections="sections"
        :activeSection="activeSection"
        activeColor="bg-cyan-600"
        @select="setSection"
        class="lg:w-64 flex-shrink-0"
      />

      <div class="flex-1 min-w-0 space-y-8">
        
        <!-- ==================== 1. CONCEPT OVERVIEW ==================== -->
        <template v-if="activeSection === 'overview'">
          <div class="bg-gradient-to-br from-cyan-900 to-blue-900 rounded-2xl p-8 md:p-12 text-center text-white shadow-xl relative overflow-hidden group mb-8">
            <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500"></div>
            <div class="text-6xl mb-6 transform group-hover:scale-110 transition-transform duration-500">⚖️</div>
            <h2 class="text-3xl md:text-4xl font-bold mb-4 tracking-tight">1. Concept Overview</h2>
            <p class="text-cyan-100 mb-8 max-w-lg mx-auto">You trained the model. It said "Done". How do you know it isn't lying? Evaluation metrics prove exactly how and where the model is failing.</p>
          </div>

          <ConceptCard
            id="overview-eval"
            icon="🧠"
            title="Beyond Accuracy"
            subtitle="The metric trap"
            definition="Accuracy is simply (Correct Predictions / Total Predictions). If 99% of emails are purely 'Normal' and 1% are 'Spam', a model that blindly guesses 'Normal' every single time will score 99% Accuracy. It will feel successful, yet fundamentally fail to detect a single piece of Spam."
            analogy="If a security guard sleeps all day, but only 1 out of 100 people entering a building is a thief, the guard is 99% 'Accurate' at letting normal people through. But as an anti-theft system, he is worthless."
            seniorTip="In industry, we rarely use raw Accuracy. We use Precision, Recall, or Area Under the ROC Curve (AUC) which are immune to class imbalances."
            defaultOpen
          >
          </ConceptCard>
        </template>

        <!-- ==================== 2. INTUITION FIRST ==================== -->
        <template v-if="activeSection === 'intuition'">
          <ConceptCard
            id="intuition"
            icon="💡"
            title="Mental Models: The Boy Who Cried Wolf"
            subtitle="False Positives vs False Negatives"
            definition="A True Positive (TP) is catching the wolf. A True Negative (TN) is knowing there is no wolf. The errors are what matter: A False Positive (FP) is crying wolf when there is none (Annoying the villagers). A False Negative (FN) is sleeping while the wolf eats the sheep (Fatal)."
            defaultOpen
          >
          </ConceptCard>
        </template>

        <!-- ==================== 3. TECHNICAL DEEP DIVE ==================== -->
        <template v-if="activeSection === 'deep-dive'">
          <ConceptCard
            id="deep-dive"
            icon="🔬"
            title="Precision vs. Recall"
            subtitle="The eternal tradeoff"
            definition="Recall asks: 'Out of all the REAL wolves that existed, how many did we catch?' (TP / TP + FN). Precision asks: 'Out of all the times we SOAID there was a wolf, how many times were we actually right?' (TP / TP + FP). The 'F1 Score' is the harmonic mean of both, balancing them into a single number."
            defaultOpen
          >
             <div class="mt-4 p-4 rounded-xl bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-sm">
                <ul class="space-y-3 dark:text-gray-300">
                    <li><strong class="text-cyan-600 dark:text-cyan-400 block mb-1">The Slide-bar problem:</strong></li>
                    <li>If you order the alarm to go off at the slightest noise, your <strong>Recall</strong> jumps to 100% (No wolves missed).</li>
                    <li>But your <strong>Precision</strong> plummets to 10% (Lots of false alarms/False Positives). You must choose the business priority.</li>
                </ul>
             </div>
          </ConceptCard>
        </template>

        <!-- ==================== 4. VISUALIZATION ==================== -->
        <template v-if="activeSection === 'visualization'">
          <ConceptCard
            id="viz"
            icon="👁️"
            title="The Confusion Matrix"
            subtitle="The 2x2 grid of truth"
            defaultOpen
          >
             <div class="mt-4 p-6 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 font-mono text-sm overflow-x-auto text-gray-800 dark:text-gray-300">
                <table class="w-full max-w-md mx-auto text-center border-collapse">
                    <tr>
                        <td class="p-2 border border-transparent"></td>
                        <td class="p-2 border border-transparent"></td>
                        <td colspan="2" class="p-2 border-b-2 border-gray-400 font-bold">PREDICTED CLASS</td>
                    </tr>
                    <tr>
                        <td class="p-2 border border-transparent"></td>
                        <td class="p-2 border border-transparent"></td>
                        <td class="p-2 border border-gray-500 bg-gray-100 dark:bg-gray-800 font-bold">Negative (0)</td>
                        <td class="p-2 border border-gray-500 bg-gray-100 dark:bg-gray-800 font-bold">Positive (1)</td>
                    </tr>
                    <tr>
                        <td rowspan="2" class="p-2 border-r-2 border-gray-400 font-bold" style="writing-mode: vertical-lr; transform: rotate(180deg);">ACTUAL</td>
                        <td class="p-2 border border-gray-500 bg-gray-100 dark:bg-gray-800 font-bold">Negative (0)</td>
                        <td class="p-4 border border-gray-500 bg-emerald-100 dark:bg-emerald-900/40 font-bold">True Negative<br><span class="text-xl">900</span></td>
                        <td class="p-4 border border-gray-500 bg-red-100 dark:bg-red-900/40 font-bold text-red-800 dark:text-red-400">False Positive (Type I)<br><span class="text-xl">10</span></td>
                    </tr>
                    <tr>
                        <td class="p-2 border border-gray-500 bg-gray-100 dark:bg-gray-800 font-bold">Positive (1)</td>
                        <td class="p-4 border border-gray-500 bg-orange-100 dark:bg-orange-900/40 font-bold text-orange-800 dark:text-orange-400">False Negative (Type II)<br><span class="text-xl">5</span></td>
                        <td class="p-4 border border-gray-500 bg-emerald-100 dark:bg-emerald-900/40 font-bold">True Positive<br><span class="text-xl">85</span></td>
                    </tr>
                </table>
             </div>
             <p class="mt-4 text-xs text-center text-gray-500">Perfect models only have numbers on the Main Diagonal (Top-Left to Bottom-Right).</p>
          </ConceptCard>
        </template>

        <!-- ==================== 5. CODE IMPLEMENTATION ==================== -->
        <template v-if="activeSection === 'code'">
          <div class="bg-gray-100 dark:bg-gray-800/50 p-6 rounded-2xl border border-gray-200 dark:border-white/10 mb-8">
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Implementation: Scikit-Learn Metrics</h3>
            <div class="bg-[#1e1e1e] rounded-xl overflow-hidden text-sm font-mono leading-relaxed p-4 overflow-x-auto text-gray-300 shadow-xl border border-gray-700">
<pre><code><span class="text-purple-400">from</span> sklearn.metrics <span class="text-purple-400">import</span> confusion_matrix, classification_report

<span class="text-green-400"># Imagine 0 = Not Spam, 1 = Spam</span>
y_true = [<span class="text-emerald-300">0</span>, <span class="text-emerald-300">1</span>, <span class="text-emerald-300">0</span>, <span class="text-emerald-300">0</span>, <span class="text-emerald-300">1</span>, <span class="text-emerald-300">1</span>, <span class="text-emerald-300">0</span>]
y_pred = [<span class="text-emerald-300">0</span>, <span class="text-emerald-300">1</span>, <span class="text-emerald-300">0</span>, <span class="text-emerald-300">1</span>, <span class="text-emerald-300">0</span>, <span class="text-emerald-300">1</span>, <span class="text-emerald-300">0</span>]

<span class="text-green-400"># 1. Generate the Confusion Matrix</span>
cm = confusion_matrix(y_true, y_pred)
print(cm)
<span class="text-green-400"># Prints: [[3 (TN), 1 (FP)], </span>
<span class="text-green-400">#          [1 (FN), 2 (TP)]]</span>

<span class="text-green-400"># 2. Generate the ultimate multi-metric report automatically</span>
report = classification_report(y_true, y_pred)
print(report)
<span class="text-green-400"># Output:</span>
<span class="text-green-400">#               precision    recall  f1-score   support</span>
<span class="text-green-400"># </span>
<span class="text-green-400">#            0       0.75      0.75      0.75         4</span>
<span class="text-green-400">#            1       0.67      0.67      0.67         3</span></code></pre>
            </div>
          </div>

          <ConceptCard
            id="your-turn-m3-3"
            icon="✍️"
            title="YOUR TURN: Scenario Assessment"
            subtitle="Choose your metric"
            defaultOpen
          >
             <div class="mt-4 space-y-4 text-sm text-gray-700 dark:text-gray-300">
              <div class="p-4 bg-white dark:bg-gray-800/80 rounded-xl border border-cyan-200 dark:border-cyan-800/30">
                <span class="font-bold text-cyan-600 dark:text-cyan-400 mb-2 block">Task 1: Cancer Screening AI</span>
                <p>If the AI predicts Positive, the patient gets a scary phone call and comes in for a biopsy. If it predicts Negative, they go home. Which is morally worse here: A False Positive or a False Negative? Would you optimize this model for High Precision or High Recall?</p>
              </div>
            </div>
          </ConceptCard>
        </template>

        <!-- ==================== 6. MICRO-EXERCISES ==================== -->
        <template v-if="activeSection === 'exercises'">
          <ConceptCard
            id="micro-exercises-m33"
            icon="⚡"
            title="Concept Checks"
            subtitle="Metric math"
            defaultOpen
          >
            <div class="space-y-6 mt-4">
              <!-- Exec 1 -->
              <div>
                <h4 class="font-semibold text-gray-900 dark:text-white text-sm mb-2">1. The Youtube Recommendation Problem</h4>
                <div class="bg-gray-900 rounded-lg p-3 font-mono text-sm text-gray-300">
                  <p class="font-sans">YouTube recommends 10 videos (predicts you will click them). You click on 2. What is the Precision of YouTube's model?</p>
                </div>
              </div>
            </div>
          </ConceptCard>
        </template>

        <!-- ==================== 7. COMMON MISTAKES ==================== -->
        <template v-if="activeSection === 'mistakes'">
          <ConceptCard
            id="mistakes-m33"
            icon="⚠️"
            title="Common Beginner Mistakes"
            subtitle="Save yourself hours of debugging"
            defaultOpen
          >
             <ul class="space-y-4 mt-4 text-sm text-gray-600 dark:text-gray-400">
              <li class="p-4 bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800/30 rounded-xl">
                <strong class="text-red-700 dark:text-red-400 block mb-1">1. Using `.predict()` blindly for threshold control</strong>
                By default, `.predict()` returns 1 if probability > 50%. If you are building a Fraud model, you want to flag things even at 15% probability! You should use `.predict_proba()`, grab the probabilities, and apply your own custom threshold (e.g. `y_pred = prob_array > 0.15`).
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
                <span class="font-bold text-purple-700 dark:text-purple-400 block mb-2">➡️ Phase 4: Training Loss vs Evaluation</span>
                During Neural Network training, the model uses 'Loss' (e.g., Cross-Entropy, M2.2) to calculate gradients and update weights. However, humans use Precision/Recall to evaluate if the model is ready for Production (M6.1). Loss is for the machine; Evaluation is for the business.
              </div>
          </ConceptCard>
        </template>

        <!-- ==================== 9. REAL-WORLD ==================== -->
        <template v-if="activeSection === 'real-world'">
           <ConceptCard
            id="real-world"
            icon="🏭"
            title="Real-World Application"
            subtitle="Spam Filters"
            defaultOpen
          >
            <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
              A spam filter missing a spam email (False Negative) is slightly annoying. You just delete it.
            </p>
            <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              A spam filter dumping your CEO's critical contract into the Spam Folder (False Positive) gets you fired. Therefore, email teams tune their models aggressively for extremely high PRECISION (If it says Spam, it better be 100% sure), willfully sacrificing Recall.
            </p>
          </ConceptCard>
        </template>

        <!-- ==================== 10. MINI PROJECT ==================== -->
        <template v-if="activeSection === 'project'">
          <ConceptCard
            id="project"
            icon="🛠️"
            title="Mini Project: F1 Score Calculation"
            subtitle="The Harmonic Mean"
            defaultOpen
          >
            <div class="mt-4 p-5 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-gray-800/50">
              <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
                <strong>Goal:</strong> The F1 score formula acts as a harsh judge. If either Precision or Recall is terrible, the F1 score drags down heavily. Formula: `2 * (Precision * Recall) / (Precision + Recall)`.
                Calculate the F1 if Precision = 1.0 and Recall = 0.1.
              </p>
              <div class="bg-gray-900 p-4 rounded-xl text-gray-300 font-mono text-xs overflow-auto">
<pre>P = 1.0
R = 0.1

# F1 = ?
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
              <li><strong>Accuracy</strong> is misleading on imbalanced datasets.</li>
              <li><strong>Recall</strong> focuses on catching everything (minimize False Negatives). Crucial in Medical/Fraud.</li>
              <li><strong>Precision</strong> focuses on being right when you sound the alarm (minimize False Positives). Crucial in Spam/Legal.</li>
              <li><strong>F1 Score</strong> provides a balanced singular metric to judge overall health.</li>
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
              <div class="p-4 bg-cyan-50 dark:bg-cyan-900/10 border border-cyan-200 dark:border-cyan-800/20 rounded-xl">
                <h4 class="font-bold text-cyan-800 dark:text-cyan-400 mb-2">Tasks & Exercises</h4>
                <p class="text-gray-700 dark:text-gray-300 mb-4"><strong>Task 1 (Cancer AI):</strong> A False Negative is sending a sick person home to die. A False Positive just results in an unnecessary biopsy and an apology. A False Negative is infinitely worse. Therefore, you must optimize for extremely high <strong>Recall</strong> (catch every possible hint of cancer), even if Precision suffers.</p>
                <p class="text-gray-700 dark:text-gray-300"><strong>Exercise 1 (YouTube):</strong> Precision is "Out of all you predicted positive, what was actually true?". YouTube predicted 10. You clicked 2. Precision = 2/10 = 20%.</p>
                <p class="text-gray-700 dark:text-gray-300"><strong>Project (F1 Score):</strong> `2 * (1.0 * 0.1) / (1.0 + 0.1)` = `0.2 / 1.1` = <strong>0.18</strong>. Because Recall was terrible, the F1 Score reflects that it's a terrible model, ignoring the perfect 100% precision!</p>
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
  { id: 'overview', label: '1. Concept Overview', icon: '⚖️' },
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
