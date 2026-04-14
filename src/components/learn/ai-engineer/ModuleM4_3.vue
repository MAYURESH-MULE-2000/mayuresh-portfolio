<template>
  <div class="learn-module min-h-screen">
    <!-- Header -->
    <div class="px-4 md:px-8 py-8 pb-4 max-w-6xl mx-auto">
      <a href="/learn/ai-engineer" class="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors mb-4">
        ← Back to Curriculum
      </a>
      <div class="flex items-center gap-3 mb-2">
        <span class="text-3xl">🗣️</span>
        <h1 class="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">M4.3 NLP Fundamentals</h1>
      </div>
      <p class="text-gray-600 dark:text-gray-400 text-sm md:text-base max-w-2xl">
        Natural Language Processing. Tokenization, Embeddings, and the Recurrent Neural Networks (RNNs) that gave AI memory.
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
            <div class="text-6xl mb-6 transform group-hover:scale-110 transition-transform duration-500">🗣️</div>
            <h2 class="text-3xl md:text-4xl font-bold mb-4 tracking-tight">1. Concept Overview</h2>
            <p class="text-emerald-100 mb-8 max-w-lg mx-auto">Calculus cannot multiply the word "Apple" by the word "Cat". Natural Language Processing is the science of converting human language into pure mathematical geometry.</p>
          </div>

          <ConceptCard
            id="overview-nlp"
            icon="🧠"
            title="Translating English to Tensors"
            subtitle="The NLP Pipeline"
            definition="The core NLP pipeline has 3 steps: 1) Tokenization (Chopping sentences into pieces and assigning them ID numbers). 2) Embeddings (Converting those ID numbers into dense vectors/arrows in space). 3) Sequence Modeling (Using architectures like RNNs or Transformers to read those vectors in order)."
            analogy="Tokenization is the dictionary lookup. Embeddings are placing those words on a GPS map so synonyms are geographically close. Sequence Modeling is drawing the path from word to word to understand the sentence's journey."
            seniorTip="Before Transformers (LLMs) ruled the world, RNNs and LSTMs were the kings of NLP. You must understand the flaws of RNNs to understand why ChatGPT was actually invented."
            defaultOpen
          >
          </ConceptCard>
        </template>

        <!-- ==================== 2. INTUITION FIRST ==================== -->
        <template v-if="activeSection === 'intuition'">
          <ConceptCard
            id="intuition"
            icon="💡"
            title="Mental Models: The Concept Map"
            subtitle="Word Embeddings"
            definition="If you represent words as One-Hot Vectors [1, 0, 0...], the math assumes every word is equally un-related. An 'Embedding' is a trainable layer that compresses a word into a short list of continuous numbers (e.g., length 50). These numbers act as GPS coordinates in 'Concept Space'."
            analogy="Imagine a 2D map. The X-axis is 'Fluffiness' and the Y-axis is 'Size'. 'Dog' might be at (0.8, 0.5). 'Cat' is at (0.9, 0.2). Because their coordinates are close, the AI naturally learns they are both Pets, even though they are different words."
            defaultOpen
          >
          </ConceptCard>
        </template>

        <!-- ==================== 3. TECHNICAL DEEP DIVE ==================== -->
        <template v-if="activeSection === 'deep-dive'">
          <ConceptCard
            id="deep-dive"
            icon="🔬"
            title="RNNs and Memory"
            subtitle="Breaking the MLP rule"
            definition="A standard neural network (MLP) forgets everything the moment it finishes generating an output. To read a sentence ('The boy ran fast'), it needs memory. An RNN (Recurrent Neural Network) contains a loop: it reads 'The', generates a hidden 'State', and hands that state back to ITSELF alongside the next word 'boy'. It carries conversational context forward."
            defaultOpen
          >
             <div class="mt-4 p-4 rounded-xl bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-sm">
                <ul class="space-y-3 dark:text-gray-300">
                    <li><strong class="text-emerald-600 dark:text-emerald-400 block mb-1">The Vanishing Gradient Problem:</strong></li>
                    <li>If an RNN reads a 500-word paragraph, passing the state recursively 500 times mathematically dilutes the early memory.</li>
                    <li>By word 500, the RNN completely forgets what happened in word 1. This "short-term memory loss" is why LSTMs (Long Short-Term Memory) were invented to patch the flaw.</li>
                </ul>
             </div>
          </ConceptCard>
        </template>

        <!-- ==================== 4. VISUALIZATION ==================== -->
        <template v-if="activeSection === 'visualization'">
          <ConceptCard
            id="viz"
            icon="👁️"
            title="Embedding Vector Math"
            subtitle="Geometry is meaning"
            defaultOpen
          >
             <div class="mt-4 flex flex-col p-6 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 font-mono text-sm justify-center items-center">
                <div class="text-center mb-4 text-gray-500">
                    If words are coordinates, we can do algebra on them!
                </div>
                <div class="flex flex-col md:flex-row items-center gap-4 text-lg font-bold">
                    <span class="text-blue-500">King</span>
                    <span class="text-gray-400">-</span>
                    <span class="text-blue-300">Man</span>
                    <span class="text-gray-400">+</span>
                    <span class="text-pink-400">Woman</span>
                    <span class="text-gray-400">=</span>
                    <span class="text-pink-600 text-2xl">Queen</span>
                </div>
                <div class="mt-6 text-xs font-sans text-gray-500 max-w-sm text-center">
                    The AI learns the vector/arrow that bridges "Man -> Woman". It realizes that arrow means "Gender Swap". If it applies that same arrow starting from "King", it literally lands on the exact GPS coordinates for "Queen".
                </div>
             </div>
          </ConceptCard>
        </template>

        <!-- ==================== 5. CODE IMPLEMENTATION ==================== -->
        <template v-if="activeSection === 'code'">
          <div class="bg-gray-100 dark:bg-gray-800/50 p-6 rounded-2xl border border-gray-200 dark:border-white/10 mb-8">
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Implementation: PyTorch Embedding</h3>
            <div class="bg-[#1e1e1e] rounded-xl overflow-hidden text-sm font-mono leading-relaxed p-4 overflow-x-auto text-gray-300 shadow-xl border border-gray-700">
<pre><code><span class="text-purple-400">import</span> torch
<span class="text-purple-400">import</span> torch.nn <span class="text-blue-400">as</span> nn

<span class="text-green-400"># 1. Tokenization (Usually done by a library like HuggingFace via BPE)</span>
<span class="text-green-400"># "I love code" -> [45, 129, 882]</span>
input_tokens = torch.tensor([[<span class="text-emerald-300">45</span>, <span class="text-emerald-300">129</span>, <span class="text-emerald-300">882</span>]]) <span class="text-green-400"># Integer IDs</span>

<span class="text-green-400"># 2. Setup the Embedding Layer</span>
<span class="text-green-400"># param 1: Vocabulary size (e.g., 10,000 known words)</span>
<span class="text-green-400"># param 2: Embedding size (Let's map each word to 16 coordinates)</span>
embedding_layer = nn.Embedding(num_embeddings=<span class="text-emerald-300">10000</span>, embedding_dim=<span class="text-emerald-300">16</span>)

<span class="text-green-400"># 3. Process the words</span>
vectorized_sentence = embedding_layer(input_tokens)

print(vectorized_sentence.shape)
<span class="text-green-400"># Output Shape: (1, 3, 16)</span>
<span class="text-green-400"># 1 Sentence, 3 Words, 16 Dimensional GPS Coordinates per word.</span>
<span class="text-green-400"># It is now fully math. Ready to go into an RNN or Transformer.</span></code></pre>
            </div>
          </div>

          <ConceptCard
            id="your-turn-m4-3"
            icon="✍️"
            title="YOUR TURN: Architecture Challenge"
            subtitle="Shape tracking"
            defaultOpen
          >
             <div class="mt-4 space-y-4 text-sm text-gray-700 dark:text-gray-300">
              <div class="p-4 bg-white dark:bg-gray-800/80 rounded-xl border border-emerald-200 dark:border-emerald-800/30">
                <span class="font-bold text-emerald-600 dark:text-emerald-400 mb-2 block">Task 1: The Size of Meaning</span>
                <p>OpenAI's GPT-3 uses an `embedding_dim` of 12,288. Our toy example above used 16. Why do massive LLMs use such a gigantic coordinate space for a single word?</p>
              </div>
            </div>
          </ConceptCard>
        </template>

        <!-- ==================== 6. MICRO-EXERCISES ==================== -->
        <template v-if="activeSection === 'exercises'">
          <ConceptCard
            id="micro-exercises-m43"
            icon="⚡"
            title="Concept Checks"
            subtitle="NLP pipelines"
            defaultOpen
          >
            <div class="space-y-6 mt-4">
              <!-- Exec 1 -->
              <div>
                <h4 class="font-semibold text-gray-900 dark:text-white text-sm mb-2">1. The purpose of IDs</h4>
                <div class="bg-gray-900 rounded-lg p-3 font-mono text-sm text-gray-300">
                  <p class="font-sans">Why do we have to tokenize "Cat" into an integer like `992` before feeding it to an Embedding layer?</p>
                </div>
              </div>
            </div>
          </ConceptCard>
        </template>

        <!-- ==================== 7. COMMON MISTAKES ==================== -->
        <template v-if="activeSection === 'mistakes'">
          <ConceptCard
            id="mistakes-m43"
            icon="⚠️"
            title="Common Beginner Mistakes"
            subtitle="Save yourself hours of debugging"
            defaultOpen
          >
             <ul class="space-y-4 mt-4 text-sm text-gray-600 dark:text-gray-400">
              <li class="p-4 bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800/30 rounded-xl">
                <strong class="text-red-700 dark:text-red-400 block mb-1">1. Out of Vocabulary (OOV) Errors</strong>
                If your `num_embeddings` is set to 10,000, and your tokenizer accidentally feeds the model the ID `10,005`, PyTorch will crash with an index out-of-bounds error. The embedding layer is literally just a giant look-up table array under the hood.
              </li>
              <li class="p-4 bg-orange-50 dark:bg-orange-900/10 border border-orange-200 dark:border-orange-800/30 rounded-xl">
                <strong class="text-orange-700 dark:text-orange-400 block mb-1">2. Using Float Tensors for Token IDs</strong>
                Token IDs must be integers (`torch.LongTensor`). The embedding algorithm uses the ID as an array index (`table[id]`). You cannot look up index `2.5` in an array!
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
                <span class="font-bold text-purple-700 dark:text-purple-400 block mb-2">➡️ Phase 5: Generative LLMs</span>
                Everything you just learned remains precisely true for ChatGPT. LLMs tokenize words into IDs, pass them through a massive Embedding Layer, but instead of using a weak RNN to sequence them, they use the Attention Mechanism (Transformers).
              </div>
          </ConceptCard>
        </template>

        <!-- ==================== 9. REAL-WORLD ==================== -->
        <template v-if="activeSection === 'real-world'">
           <ConceptCard
            id="real-world"
            icon="🏭"
            title="Real-World Application"
            subtitle="Sub-word Tokenization"
            defaultOpen
          >
            <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
              Modern systems don't tokenize by "Word", they tokenize by "Sub-word" syllables using BPE (Byte-Pair Encoding).
            </p>
            <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              If the model sees "Unbelievable", it breaks it into "Un-", "believe", "-able". Why? Because if someone types "Unfixable" (a made-up word), the AI can still mathematically guess the meaning by piecing together the embeddings for "Un-" and "fix". It makes the AI robust to typos and slang.
            </p>
          </ConceptCard>
        </template>

        <!-- ==================== 10. MINI PROJECT ==================== -->
        <template v-if="activeSection === 'project'">
          <ConceptCard
            id="project"
            icon="🛠️"
            title="Mini Project: Dictionary Indexer"
            subtitle="Your first tokenizer"
            defaultOpen
          >
            <div class="mt-4 p-5 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-gray-800/50">
              <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
                <strong>Goal:</strong> Write python code to convert a list of words into a list of Integer IDs. 
              </p>
              <div class="bg-gray-900 p-4 rounded-xl text-gray-300 font-mono text-xs overflow-auto">
<pre>vocab = {"pad": 0, "i": 1, "am": 2, "groot": 3}
sentence = ["i", "am", "groot", "groot"]

# Your code here: loop over sentence, look up the id
# Expected output: [1, 2, 3, 3]
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
              <li><strong>Tokenization</strong> converts language into Integer IDs.</li>
              <li><strong>Embeddings</strong> converts Integer IDs into a dense GPS coordinate array full of rich meaning.</li>
              <li><strong>RNNs</strong> read vectors in a sequence using internal loops, acting as memory.</li>
              <li><strong>Vanishing Gradients</strong> cause long RNNs to suffer from short-term memory loss.</li>
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
              <div class="p-4 bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-200 dark:bg-emerald-800/20 rounded-xl">
                <h4 class="font-bold text-emerald-800 dark:text-emerald-400 mb-2">Tasks & Exercises</h4>
                <p class="text-gray-700 dark:text-gray-300 mb-4"><strong>Task 1 (LLM Dimensions):</strong> A single word "Apple" has thousands of nuanced contexts. Apple the fruit, Apple the company, the color of an Apple, Apple in a pie, Apple gravity (Newton). A 16-dimensional array is too small to encode all human knowledge. 12,288 dimensions allows the AI to map incredibly deep nuances.</p>
                <p class="text-gray-700 dark:text-gray-300 mb-4"><strong>Exercise 1 (IDs):</strong> An embedding layer is functionally just a Python dictionary / Hashmap. The ID is the `Key`, and the array of floating point coordinates is the `Value`. You need an indexing key to look up the tensor.</p>
                <p class="text-gray-700 dark:text-gray-300"><strong>Project (Tokenizer):</strong><br>
                `tokenized = [vocab[word] for word in sentence]`
                </p>
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
  { id: 'overview', label: '1. Concept Overview', icon: '🗣️' },
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
