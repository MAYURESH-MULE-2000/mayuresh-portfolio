<template>
  <div class="learn-module min-h-screen">
    <!-- Header -->
    <div class="px-4 md:px-8 py-8 pb-4 max-w-6xl mx-auto">
      <a href="/learn/ai-engineer" class="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors mb-4">
        ← Back to Curriculum
      </a>
      <div class="flex items-center gap-3 mb-2">
        <span class="text-3xl">🌌</span>
        <h1 class="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">M3.2 Unsupervised Learning</h1>
      </div>
      <p class="text-gray-600 dark:text-gray-400 text-sm md:text-base max-w-2xl">
        K-Means Clustering and Dimensionality Reduction (PCA). Finding hidden structures in the void of unlabelled data.
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
          <div class="bg-gradient-to-br from-fuchsia-900 to-indigo-900 rounded-2xl p-8 md:p-12 text-center text-white shadow-xl relative overflow-hidden group mb-8">
            <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-fuchsia-400 via-indigo-500 to-blue-500"></div>
            <div class="text-6xl mb-6 transform group-hover:scale-110 transition-transform duration-500">🌌</div>
            <h2 class="text-3xl md:text-4xl font-bold mb-4 tracking-tight">1. Concept Overview</h2>
            <p class="text-indigo-100 mb-8 max-w-lg mx-auto">What if you don't have an answer key? Unsupervised learning forces algorithms to explore a dataset entirely blind and group similar things together organically.</p>
          </div>

          <ConceptCard
            id="overview-unsupervised"
            icon="🧠"
            title="The Pattern Finder"
            subtitle="No Labels allowed"
            definition="In Unsupervised Learning, your dataset only contains Features (X). There is no Label (y). The algorithm uses mathematical distances and variance to discover hidden groupings (Clustering) or to compress the data by removing 'noisy' columns (Dimensionality Reduction)."
            analogy="It's like walking into a massive library where all the books fell on the floor, and the dust jackets are torn off so you can't read the summary. You start piling them up just based on similarities: 'These have pictures, pile 1', 'These are 1000 pages thick, pile 2'."
            seniorTip="Do not use Unsupervised Learning if you know the answer you want. It is strictly an exploratory tool, or a preprocessing step to clean data before supervised training."
            defaultOpen
          >
          </ConceptCard>
        </template>

        <!-- ==================== 2. INTUITION FIRST ==================== -->
        <template v-if="activeSection === 'intuition'">
          <ConceptCard
            id="intuition"
            icon="💡"
            title="Mental Models: Gravity and Shadows"
            subtitle="Clustering and PCA"
            definition="K-Means Clustering acts like Gravity. You drop K random 'stars' into your data space. Each data point gets pulled (assigned) to the closest star. The star then moves to the exact center of its pulling points. Repeat until stable."
            analogy="Principal Component Analysis (PCA) is like looking at a 3D shadow. If I hold up a coffee mug and shine a light, the 2D shadow on the wall captures the 'essence' of the mug. PCA squashes 5,000 columns of data into 50 columns while keeping the 'essence'."
            defaultOpen
          >
          </ConceptCard>
        </template>

        <!-- ==================== 3. TECHNICAL DEEP DIVE ==================== -->
        <template v-if="activeSection === 'deep-dive'">
          <ConceptCard
            id="deep-dive"
            icon="🔬"
            title="K-Means and Distances"
            subtitle="How 'similar' is calculated"
            definition="K-Means relies on Euclidean Distance (straight-line geometry using Pythagorean theorem). If you want to group Users by Age and Income, K-Means literally plots (Age, Income) on an X/Y graph and loops to find the dense clusters."
            defaultOpen
          >
             <div class="mt-4 p-4 rounded-xl bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-sm">
                <ul class="space-y-3 dark:text-gray-300">
                    <li><strong class="text-fuchsia-600 dark:text-fuchsia-400 block mb-1">The "K" Problem:</strong></li>
                    <li>The algorithm is dumb. It asks YOU for "K" (How many clusters you want). </li>
                    <li>If you ask for 100 clusters on a dataset of 100 people, it will put each person in their own solitary cluster. You must mathematically determine the optimal K using the 'Elbow Method'.</li>
                </ul>
             </div>
          </ConceptCard>
        </template>

        <!-- ==================== 4. VISUALIZATION ==================== -->
        <template v-if="activeSection === 'visualization'">
          <ConceptCard
            id="viz"
            icon="👁️"
            title="Dimensionality Reduction (PCA)"
            subtitle="Flattening reality"
            defaultOpen
          >
             <div class="mt-4 flex flex-col items-center p-6 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 font-mono text-sm">
                <div class="w-full max-w-sm">
                   <div class="text-indigo-500 font-bold mb-2">Original Dataset (Huge RAM needed)</div>
                   <div class="bg-gray-100 dark:bg-gray-800 p-2 rounded flex justify-between text-xs">
                     <span>Age</span><span>Income</span><span>Zip</span><span>Logins</span><span>... + 500 more</span>
                   </div>
                   
                   <div class="text-center my-4 font-bold text-gray-400">⬇️ PCA Transform ⬇️</div>

                   <div class="text-emerald-500 font-bold mb-2">Compressed Dataset (95% information retained)</div>
                   <div class="bg-gray-100 dark:bg-gray-800 p-2 rounded flex justify-between text-xs">
                     <span>Principal_Comp_1</span><span>Principal_Comp_2</span><span>Principal_Comp_3</span>
                   </div>
                </div>
             </div>
             <p class="mt-4 text-xs text-center text-gray-500 dark:text-gray-400">Notice that after PCA, human-readable column names are gone. They are merged into mathematical 'Components'.</p>
          </ConceptCard>
        </template>

        <!-- ==================== 5. CODE IMPLEMENTATION ==================== -->
        <template v-if="activeSection === 'code'">
          <div class="bg-gray-100 dark:bg-gray-800/50 p-6 rounded-2xl border border-gray-200 dark:border-white/10 mb-8">
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Implementation: Sklearn K-Means</h3>
            <div class="bg-[#1e1e1e] rounded-xl overflow-hidden text-sm font-mono leading-relaxed p-4 overflow-x-auto text-gray-300 shadow-xl border border-gray-700">
<pre><code><span class="text-purple-400">from</span> sklearn.cluster <span class="text-purple-400">import</span> KMeans
<span class="text-purple-400">from</span> sklearn.preprocessing <span class="text-purple-400">import</span> StandardScaler
<span class="text-purple-400">import</span> pandas <span class="text-blue-400">as</span> pd

<span class="text-green-400"># 1. Unlabelled Data (Only Features!)</span>
df = pd.DataFrame({
    <span class="text-orange-300">"time_on_site"</span>: [<span class="text-emerald-300">5</span>, <span class="text-emerald-300">600</span>, <span class="text-emerald-300">12</span>, <span class="text-emerald-300">650</span>],
    <span class="text-orange-300">"cart_value"</span>: [<span class="text-emerald-300">0</span>, <span class="text-emerald-300">200</span>, <span class="text-emerald-300">10</span>, <span class="text-emerald-300">250</span>]
})

<span class="text-green-400"># 2. SCALING IS MANDATORY FOR CLUSTERING</span>
scaler = StandardScaler()
X_scaled = scaler.fit_transform(df)

<span class="text-green-400"># 3. Initialize KMeans (We guess we want 2 groups)</span>
kmeans = KMeans(n_clusters=<span class="text-emerald-300">2</span>, random_state=<span class="text-emerald-300">42</span>)

<span class="text-green-400"># 4. Fit and predict simultaneously</span>
<span class="text-green-400"># The model assigns each row a Cluster ID (0 or 1)</span>
df[<span class="text-orange-300">"assigned_cluster"</span>] = kmeans.fit_predict(X_scaled)

print(df)
<span class="text-green-400"># Output shows short-time/low-cart grouped as 0</span>
<span class="text-green-400"># and long-time/high-cart grouped as 1</span></code></pre>
            </div>
          </div>

          <ConceptCard
            id="your-turn-m3-2"
            icon="✍️"
            title="YOUR TURN: Code Tasks"
            subtitle="The scaling disaster"
            defaultOpen
          >
             <div class="mt-4 space-y-4 text-sm text-gray-700 dark:text-gray-300">
              <div class="p-4 bg-white dark:bg-gray-800/80 rounded-xl border border-fuchsia-200 dark:border-fuchsia-800/30">
                <span class="font-bold text-fuchsia-600 dark:text-fuchsia-400 mb-2 block">Task 1: Why Scale?</span>
                <p>Imagine we skipped Step 2 above. `time_on_site` is in Seconds (e.g. 600). `cart_value` is in Dollars (e.g. 200). If K-means uses geometric distance to measure "closeness", which column will completely dominate and ruin the clustering logic?</p>
              </div>
            </div>
          </ConceptCard>
        </template>

        <!-- ==================== 6. MICRO-EXERCISES ==================== -->
        <template v-if="activeSection === 'exercises'">
          <ConceptCard
            id="micro-exercises-m32"
            icon="⚡"
            title="Concept Checks"
            subtitle="PCA Logic"
            defaultOpen
          >
            <div class="space-y-6 mt-4">
              <!-- Exec 1 -->
              <div>
                <h4 class="font-semibold text-gray-900 dark:text-white text-sm mb-2">1. The price of PCA</h4>
                <div class="bg-gray-900 rounded-lg p-3 font-mono text-sm text-gray-300">
                  <p class="font-sans">You compress customer data using PCA to 3 columns, run a Supervised model, and hand it to Marketing. Marketing asks: "What feature drives purchases?". What is the problem?</p>
                </div>
              </div>
            </div>
          </ConceptCard>
        </template>

        <!-- ==================== 7. COMMON MISTAKES ==================== -->
        <template v-if="activeSection === 'mistakes'">
          <ConceptCard
            id="mistakes-m32"
            icon="⚠️"
            title="Common Beginner Mistakes"
            subtitle="Save yourself hours of debugging"
            defaultOpen
          >
             <ul class="space-y-4 mt-4 text-sm text-gray-600 dark:text-gray-400">
              <li class="p-4 bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800/30 rounded-xl">
                <strong class="text-red-700 dark:text-red-400 block mb-1">1. Using K-Means on massive categorical data</strong>
                K-Means uses Euclidean (straight-line geometry) distance. "Distance" between strings (One-hot encoded cities) in geometric space is mathematically meaningless. K-Means expects continuous numeric data (Age, Price, Coordinates).
              </li>
              <li class="p-4 bg-orange-50 dark:bg-orange-900/10 border border-orange-200 dark:border-orange-800/30 rounded-xl">
                <strong class="text-orange-700 dark:text-orange-400 block mb-1">2. Blindly assuming K-Means is 'truth'</strong>
                K-Means randomly drops its starting centroids. In complex data, running it 3 different times might result in 3 entirely different cluster assignments. It is an exploratory heuristic, not absolute truth.
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
                <span class="font-bold text-purple-700 dark:text-purple-400 block mb-2">➡️ Phase 5: Vector Databases</span>
                When searching massive Vector Databases, calculating the distance to every single vector is incredibly slow. Real systems use advanced Clustering to pre-bucket the data space so the search engine only checks the local cluster.
              </div>
          </ConceptCard>
        </template>

        <!-- ==================== 9. REAL-WORLD ==================== -->
        <template v-if="activeSection === 'real-world'">
           <ConceptCard
            id="real-world"
            icon="🏭"
            title="Real-World Application"
            subtitle="Customer Segmentation Analytics"
            defaultOpen
          >
            <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
              Marketing teams don't want to make 10,000 different emails for 10,000 customers.
            </p>
            <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              Data teams run K-Means to find `K=4` distinct groups. Upon analyzing the groups, humans label them: "Bargain Hunters", "Loyal Splurgers", "Holiday Only", and "Window Shoppers". Marketing then designs just 4 highly targeted campaigns for those 4 mathematical clusters.
            </p>
          </ConceptCard>
        </template>

        <!-- ==================== 10. MINI PROJECT ==================== -->
        <template v-if="activeSection === 'project'">
          <ConceptCard
            id="project"
            icon="🛠️"
            title="Mini Project: The Elbow Method Idea"
            subtitle="Finding optimal K"
            defaultOpen
          >
            <div class="mt-4 p-5 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-gray-800/50">
              <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
                <strong>Goal:</strong> The `.inertia_` property tells us the sum of squared distances of samples to their closest cluster center (lower is better, but 0 means every point is its own cluster). Write pseudo-code to loop K from 1 to 10 and print the inertia.
              </p>
              <div class="bg-gray-900 p-4 rounded-xl text-gray-300 font-mono text-xs overflow-auto">
<pre># for k in range(1, 11):
#    # instantiate kmeans with k clusters
#    # fit X_scaled
#    # print(model.inertia_)
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
              <li><strong>No Labels:</strong> Only features exist.</li>
              <li><strong>K-Means</strong> groups data based on geometric distance. Scaling the data is strictly mandatory.</li>
              <li><strong>PCA</strong> compresses data into fewer dimensions to save compute power, at the cost of explainability.</li>
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
              <div class="p-4 bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-200 dark:emerald-800/20 rounded-xl">
                <h4 class="font-bold text-emerald-800 dark:text-emerald-400 mb-2">Tasks & Exercises</h4>
                <p class="text-gray-700 dark:text-gray-300 mb-4"><strong>Task 1 (The Scale Disater):</strong> Because Time is numerically larger (600 vs 200), the Euclidean formula will mathematically treat Time as vastly more important. Clustering will group by Time almost exclusively, completely ignoring the Dollars spent.</p>
                <p class="text-gray-700 dark:text-gray-300"><strong>Exercise 1 (PCA Cost):</strong> You lose <strong>Explainability</strong>. You cannot tell Marketing that "Age" drove the purchase, because "Age" no longer exists. It got blended into "Principal Component 1" along with 14 other variables.</p>
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
  { id: 'overview', label: '1. Concept Overview', icon: '🌌' },
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
