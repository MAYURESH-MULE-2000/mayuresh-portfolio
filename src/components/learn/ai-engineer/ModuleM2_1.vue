<template>
  <div class="learn-module min-h-screen">
    <!-- Header -->
    <div class="px-4 md:px-8 py-8 pb-4 max-w-6xl mx-auto">
      <a href="/learn/ai-engineer" class="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors mb-4">
        ← Back to Curriculum
      </a>
      <div class="flex items-center gap-3 mb-2">
        <span class="text-3xl">📐</span>
        <h1 class="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">M2.1 Linear Algebra</h1>
      </div>
      <p class="text-gray-600 dark:text-gray-400 text-sm md:text-base max-w-2xl">
        Vectors, matrices, dot products, matrix multiplication. The fundamental geometric language that neural networks use to understand the world.
      </p>
    </div>

    <!-- Layout: Nav + Content -->
    <div class="px-4 md:px-8 max-w-6xl mx-auto flex flex-col lg:flex-row gap-6 pb-16">
      <SectionNav
        :sections="sections"
        :activeSection="activeSection"
        activeColor="bg-blue-600"
        @select="setSection"
        class="lg:w-64 flex-shrink-0"
      />

      <div class="flex-1 min-w-0 space-y-8">
        
        <!-- ==================== 1. CONCEPT OVERVIEW ==================== -->
        <template v-if="activeSection === 'overview'">
          <div class="bg-gradient-to-br from-blue-900 to-indigo-900 rounded-2xl p-8 md:p-12 text-center text-white shadow-xl relative overflow-hidden group mb-8">
            <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 via-indigo-500 to-cyan-500"></div>
            <div class="text-6xl mb-6 transform group-hover:scale-110 transition-transform duration-500">📐</div>
            <h2 class="text-3xl md:text-4xl font-bold mb-4 tracking-tight">1. Concept Overview</h2>
            <p class="text-indigo-100 mb-8 max-w-lg mx-auto">Computers cannot understand pictures or words. They only understand grids of numbers. Linear Algebra is the math of manipulating those grids simultaneously.</p>
          </div>

          <ConceptCard
            id="overview-algebra"
            icon="🧠"
            title="Tensors: The Data Primitives"
            subtitle="The language of modern AI"
            definition="In AI, data is mapped into multidimensional arrays called Tensors. A 0D Tensor is a Scalar (number). A 1D Tensor is a Vector (list). A 2D Tensor is a Matrix (table). A 3D Tensor is a cube (like RGB channels of an image). Linear Algebra dictates how these structures interact."
            analogy="If programming is writing a recipe step-by-step, Linear Algebra is snapping your fingers and having the entire kitchen instantly transform the ingredients at once based on structural rules."
            seniorTip="Do not get bogged down doing matrix proofs by hand. As an AI Engineer, you need deep intuition for SHAPES (e.g., (100, 50) * (50, 20) = (100, 20)). NumPy/PyTorch does the actual arithmetic."
            defaultOpen
          >
          </ConceptCard>
        </template>

        <!-- ==================== 2. INTUITION FIRST ==================== -->
        <template v-if="activeSection === 'intuition'">
          <ConceptCard
            id="intuition"
            icon="💡"
            title="Mental Models: Arrows vs Data"
            subtitle="Physics vs Computer Science"
            definition="Physicists define a Vector as an arrow in space with length and direction. Computer Scientists define a Vector as an ordered list of numbers. In AI, BOTH are true. A list of 3 numbers like [1.2, 0.5, 9.1] physically represents a specific point (or arrow) in a 3-Dimensional geometric space."
            analogy="Imagine describing where you live using an address (List of data). Now imagine drawing a straight line from the center of the earth to your house (Arrow in space). Both represent the same reality."
            defaultOpen
          >
             <div class="mt-4 p-4 rounded-xl bg-orange-50 dark:bg-orange-900/10 border border-orange-200 dark:border-orange-800/30">
               <h4 class="font-bold text-orange-800 dark:text-orange-400 mb-2">Why this matters:</h4>
               <p class="text-sm dark:text-gray-300">Because if two lists of numbers (e.g., user profiles) are converted to Arrows in space, we can measure the <strong>angle</strong> between those arrows to see how 'similar' the profiles are.</p>
             </div>
          </ConceptCard>
        </template>

        <!-- ==================== 3. TECHNICAL DEEP DIVE ==================== -->
        <template v-if="activeSection === 'deep-dive'">
          <ConceptCard
            id="deep-dive"
            icon="🔬"
            title="The Dot Product & Matrix Multiplication"
            subtitle="The core engines of Neural Networks"
            definition="The Dot Product takes two equal-length vectors, multiplies their corresponding elements, and sums the result into a single Scalar. Matrix Multiplication applies this dot product systematically across rows and columns of 2D grids."
            defaultOpen
          >
             <div class="bg-gray-100 dark:bg-gray-800/50 p-4 rounded-xl border border-gray-200 dark:border-white/10 mt-4 text-sm font-mono overflow-auto text-gray-800 dark:text-gray-300">
                <p><span class="font-bold text-blue-600 dark:text-blue-400">Dot Product:</span></p>
                <p>Vector A: [1, 2, 3]</p>
                <p>Vector B: [4, 5, 6]</p>
                <p>A • B = (1*4) + (2*5) + (3*6) = 4 + 10 + 18 = 32</p>
                
                <p class="mt-4"><span class="font-bold text-blue-600 dark:text-blue-400">Golden Rule of Matrix Multiplication Shapes:</span></p>
                <p>To multiply Matrix A by Matrix B (A @ B):</p>
                <p>Inner dimensions MUST MATCH.</p>
                <p>(m, <span class="text-emerald-500 font-bold">n</span>) @ (<span class="text-emerald-500 font-bold">n</span>, p) -> Output Shape = (m, p)</p>
             </div>
          </ConceptCard>
        </template>

        <!-- ==================== 4. VISUALIZATION ==================== -->
        <template v-if="activeSection === 'visualization'">
          <ConceptCard
            id="viz"
            icon="👁️"
            title="Visualizing Matrix Transforms"
            subtitle="What does a neural network layer actually do?"
            definition="Multiplying input data by a matrix physically stretches, squashes, or rotates the data in mathematical space. A layer in a Neural Network is literally just finding the perfect Matrix (Weights) to rotate your data until the 'Cats' are on one side of a line, and 'Dogs' are on the other."
            defaultOpen
          >
             <div class="mt-4 flex flex-col sm:flex-row gap-4 items-center justify-center p-6 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800">
                <div class="text-center">
                   <div class="w-16 h-16 border-2 border-dashed border-gray-400 relative">
                     <div class="w-2 h-2 rounded-full bg-blue-500 absolute top-2 right-2"></div>
                   </div>
                   <div class="text-xs mt-2 text-gray-500">Input Data Space</div>
                </div>
                <div class="text-xl font-bold text-gray-400">@ Matrix ➔</div>
                <div class="text-center">
                   <div class="w-24 h-8 border-2 border-dashed border-gray-400 relative transform rotate-12">
                     <div class="w-2 h-2 rounded-full bg-blue-500 absolute top-1 right-2"></div>
                   </div>
                   <div class="text-xs mt-2 text-gray-500">Transformed Space</div>
                </div>
             </div>
          </ConceptCard>
        </template>

        <!-- ==================== 5. CODE IMPLEMENTATION ==================== -->
        <template v-if="activeSection === 'code'">
          <div class="bg-gray-100 dark:bg-gray-800/50 p-6 rounded-2xl border border-gray-200 dark:border-white/10 mb-8">
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Implementation: NumPy Linalg</h3>
            <div class="bg-[#1e1e1e] rounded-xl overflow-hidden text-sm font-mono leading-relaxed p-4 overflow-x-auto text-gray-300 shadow-xl border border-gray-700">
<pre><code><span class="text-purple-400">import</span> numpy <span class="text-blue-400">as</span> np

<span class="text-green-400"># Define 2D Matrices (Tensors)</span>
A = np.array([
    [<span class="text-emerald-300">1</span>, <span class="text-emerald-300">2</span>],
    [<span class="text-emerald-300">3</span>, <span class="text-emerald-300">4</span>]
]) <span class="text-green-400"># Shape (2, 2)</span>

B = np.array([
    [<span class="text-emerald-300">5</span>, <span class="text-emerald-300">6</span>],
    [<span class="text-emerald-300">7</span>, <span class="text-emerald-300">8</span>]
]) <span class="text-green-400"># Shape (2, 2)</span>

<span class="text-green-400"># 1. Element-wise Multiplication (Hadamard product)</span>
<span class="text-green-400"># Multiplies elements in exactly the same position</span>
elem_mult = A * B 

<span class="text-green-400"># 2. True Matrix Multiplication (Dot Product across rows/cols)</span>
<span class="text-green-400"># In Python 3.5+, the '@' symbol represents matrix mult!</span>
mat_mult = A @ B  <span class="text-green-400"># Or np.dot(A, B)</span>

<span class="text-green-400"># 3. Transpose (Flip across diagonal)</span>
A_T = A.T </code></pre>
            </div>
          </div>

          <ConceptCard
            id="your-turn-m2-1"
            icon="✍️"
            title="YOUR TURN: Code Tasks"
            subtitle="Check dimensions"
            defaultOpen
          >
             <div class="mt-4 space-y-4 text-sm text-gray-700 dark:text-gray-300">
              <div class="p-4 bg-white dark:bg-gray-800/80 rounded-xl border border-blue-200 dark:border-blue-800/30">
                <span class="font-bold text-blue-600 dark:text-blue-400 mb-2 block">Task 1: The Shape Checker</span>
                <p>Assume `Input = np.ones((100, 20))` and `Weights = np.ones((50, 20))`. This matrix multiplication `Input @ Weights` will crash! Mismatched inner dimensions: (100, 20) @ (50, 20). Fix `Weights` so the multiplication works and produces a (100, 50) output.</p>
              </div>
            </div>
          </ConceptCard>
        </template>

        <!-- ==================== 6. MICRO-EXERCISES ==================== -->
        <template v-if="activeSection === 'exercises'">
          <ConceptCard
            id="micro-exercises-m21"
            icon="⚡"
            title="Concept Checks"
            subtitle="Predict the outcome"
            defaultOpen
          >
            <div class="space-y-6 mt-4">
              <!-- Exec 1 -->
              <div>
                <h4 class="font-semibold text-gray-900 dark:text-white text-sm mb-2">1. Shape Outputs</h4>
                <div class="bg-gray-900 rounded-lg p-3 font-mono text-sm text-gray-300">
                  <pre>
A = np.zeros((10, 64))
B = np.zeros((64, 128))
C = A @ B
print(C.shape)
# What is the shape of C?</pre>
                </div>
              </div>
               <!-- Exec 2 -->
              <div>
                <h4 class="font-semibold text-gray-900 dark:text-white text-sm mb-2">2. Orthogonal Dot Product</h4>
                <div class="bg-gray-900 rounded-lg p-3 font-mono text-sm text-gray-300">
                  <pre>
Right = np.array([1, 0])
Up = np.array([0, 1])
print(np.dot(Right, Up))
# What prints?</pre>
                </div>
              </div>
            </div>
          </ConceptCard>
        </template>

        <!-- ==================== 7. COMMON MISTAKES ==================== -->
        <template v-if="activeSection === 'mistakes'">
          <ConceptCard
            id="mistakes-m21"
            icon="⚠️"
            title="Common Beginner Mistakes"
            subtitle="Save yourself hours of debugging"
            defaultOpen
          >
             <ul class="space-y-4 mt-4 text-sm text-gray-600 dark:text-gray-400">
              <li class="p-4 bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800/30 rounded-xl">
                <strong class="text-red-700 dark:text-red-400 block mb-1">1. Confusing `*` with `@`</strong>
                In MATLAB, `*` means matrix multiplication. In Python/NumPy, `*` means Element-wise multiplication, and `@` means Matrix multiplication. Using `*` when you meant `@` is the #1 silent math bug in ML code.
              </li>
              <li class="p-4 bg-orange-50 dark:bg-orange-900/10 border border-orange-200 dark:border-orange-800/30 rounded-xl">
                <strong class="text-orange-700 dark:text-orange-400 block mb-1">2. Ignoring 1D vs 2D subtleties</strong>
                Shape `(5,)` is a 1D array. Shape `(5, 1)` is a 2D array representing a column. Shape `(1, 5)` is a 2D array representing a row. Matrix operations act differently depending on these exact dimensions! Use `reshape()` to be safe.
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
                <span class="font-bold text-purple-700 dark:text-purple-400 block mb-2">➡️ Phase 4/5: Neural Networks & Transformers</span>
                A standard Neural Network "Linear Layer" is represented by the equation: `Y = XW + b`. 
                <br><br>
                `X` is your input matrix. `W` is your weight matrix. `b` is bias. The network learns by updating the numbers inside `W`. LLMs like GPT-4 are essentially doing trillions of matrix multiplications (`X @ W`) under the hood to predict the next word.
              </div>
          </ConceptCard>
        </template>

        <!-- ==================== 9. REAL-WORLD ==================== -->
        <template v-if="activeSection === 'real-world'">
           <ConceptCard
            id="real-world"
            icon="🏭"
            title="Real-World Application"
            subtitle="Word Embeddings and Similarity"
            defaultOpen
          >
            <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
              In Vector Databases (Phase 5.3) used for RAG, every document (e.g., a PDF page) is converted into a vector arrow in a 1,536-dimensional space using OpenAI's API.
            </p>
            <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              When a user asks a question, the query is converted to a vector. To find the "most relevant" document, the database simply uses dot products to find which document arrow is closest to the query arrow in space (Cosine Similarity). Search engines are powered entirely by linear algebra.
            </p>
          </ConceptCard>
        </template>

        <!-- ==================== 10. MINI PROJECT ==================== -->
        <template v-if="activeSection === 'project'">
          <ConceptCard
            id="project"
            icon="🛠️"
            title="Mini Project: Cosine Similarity"
            subtitle="Build a mini 'Search Engine'"
            defaultOpen
          >
            <div class="mt-4 p-5 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-gray-800/50">
              <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
                <strong>Goal:</strong> Cosine similarity measures the angle between two vectors. Formula: `(A • B) / (||A|| * ||B||)`.
                <br> `||A||` is the magnitude (norm) of A, found via `np.linalg.norm(A)`. Write a function to check if User1 is more similar to User2 or User3.
              </p>
              <div class="bg-gray-900 p-4 rounded-xl text-gray-300 font-mono text-xs overflow-auto">
<pre>import numpy as np

# Users represented as [Age, Income_index, Shopping_score]
u1 = np.array([25, 4, 9])
u2 = np.array([26, 4, 8]) # Similar to u1
u3 = np.array([60, 9, 2]) # Different

def cosine_sim(a, b):
    # Your code here: 
    # dot_prod = ?
    # norm_a = np.linalg.norm(a)
    # norm_b = np.linalg.norm(b)
    # return dot_prod / (norm_a * norm_b)
    pass
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
              <li><strong>Scalar (0D), Vector (1D), Matrix (2D), Tensor (3D+).</strong></li>
              <li>Matrix Multiplication `A @ B` requires inner dimensions to match: `(m, n) @ (n, p)`.</li>
              <li>The <strong>Dot Product</strong> takes two vectors and returns a single scalar representing how much they point in the same direction.</li>
              <li>Data isn't just numbers; it's points in high-dimensional geometric space.</li>
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
                <p class="text-gray-700 dark:text-gray-300 mb-2"><strong>1. Shape Outputs:</strong> `(10, 128)`. The inner dimension (64) matches and collapses, leaving the outer dimensions.</p>
                <p class="text-gray-700 dark:text-gray-300"><strong>2. Orthogonal Dot Product:</strong> `0`. The math: (1*0) + (0*1) = 0. In geometry: When two vectors are exactly perpendicular (90 degrees), their dot product is always zero. They share zero similarity.</p>
              </div>

               <div class="p-4 bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800/20 rounded-xl font-mono text-xs overflow-auto text-blue-900 dark:text-blue-300">
                <span class="font-bold text-blue-800 dark:text-blue-400 mb-2 block font-sans text-sm">YOUR TURN Tasks / Project</span>
<pre># Task 1: Shape Checker
# We must transpose Weights to switch (50, 20) -> (20, 50)
Output = Input @ Weights.T  # (100, 20) @ (20, 50) = (100, 50)

# Project: Cosine Similarity
def cosine_sim(a, b):
    dot_prod = np.dot(a, b)
    norm_a = np.linalg.norm(a)
    norm_b = np.linalg.norm(b)
    return dot_prod / (norm_a * norm_b)
    
print(cosine_sim(u1, u2)) # ~ 0.99 (Very close to 1)
print(cosine_sim(u1, u3)) # ~ 0.65 (Further away)
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
  { id: 'overview', label: '1. Concept Overview', icon: '📐' },
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
