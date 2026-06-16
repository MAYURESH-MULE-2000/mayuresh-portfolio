<template>
  <div class="learn-module min-h-screen">
    <!-- Header -->
    <div class="px-4 md:px-8 py-8 pb-4 max-w-6xl mx-auto">
      <a href="/learn/ai-engineer" class="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors mb-4">
        ← Back to Curriculum
      </a>
      <div class="flex items-center gap-3 mb-2">
        <span class="text-3xl">🤖</span>
        <h1 class="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">M5.1 Transformers & LLMs</h1>
      </div>
      <p class="text-gray-600 dark:text-gray-400 text-sm md:text-base max-w-2xl">
        Self-Attention, the GPT architecture, and how exactly ChatGPT predicts the next word. The end of the RNN era.
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
          <div class="bg-gradient-to-br from-violet-900 to-indigo-900 rounded-2xl p-8 md:p-12 text-center text-white shadow-xl relative overflow-hidden group mb-8">
            <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-violet-400 via-indigo-500 to-blue-500"></div>
            <div class="text-6xl mb-6 transform group-hover:scale-110 transition-transform duration-500">🤖</div>
            <h2 class="text-3xl md:text-4xl font-bold mb-4 tracking-tight">1. Concept Overview</h2>
            <p class="text-violet-100 mb-8 max-w-lg mx-auto">In 2017, Google published 'Attention Is All You Need', introducing the Transformer. It destroyed existing NLP architectures overnight and birthed the modern AI revolution.</p>
          </div>

          <ConceptCard
            id="overview-transformers"
            icon="🧠"
            title="The Parallel Paradigm"
            subtitle="Why RNNs died"
            definition="RNNs processed words sequentially (Word 1, then Word 2, then Word 3). This was agonizingly slow and caused them to forget early words. Transformers process the ENTIRE paragraph simultaneously in parallel using a mathematical trick called Self-Attention, allowing them to scale infinitely on modern GPUs."
            analogy="An RNN reads a book by looking at one word through a tiny hole in a piece of paper, sliding it slowly left to right. A Transformer takes a photograph of the entire page instantly and connects the related words with string."
            seniorTip="Large Language Models (LLMs) like GPT-4 are literally just massive Transformers trained on the entire internet simply to predict the single next most mathematically likely word. That's it."
            defaultOpen
          >
          </ConceptCard>
        </template>

        <!-- ==================== 2. INTUITION FIRST ==================== -->
        <template v-if="activeSection === 'intuition'">
          <ConceptCard
            id="intuition"
            icon="💡"
            title="Mental Models: The Cocktail Party"
            subtitle="Self-Attention"
            definition="At a loud cocktail party, a dozen people are talking. Your brain mathematically computes 'Attention'-it suppresses the noise of the music and amplifies the voice of the person you are talking to. Transformers do this to words."
            analogy="Consider the sentence: 'The bank of the river'. The word 'bank' by itself means 'Financial Institution'. But the Transformer's Attention mechanism sees the word 'river' and mathematically shifts the definition of 'bank' to mean 'Muddy slope'."
            defaultOpen
          >
          </ConceptCard>
        </template>

        <!-- ==================== 3. TECHNICAL DEEP DIVE ==================== -->
        <template v-if="activeSection === 'deep-dive'">
          <ConceptCard
            id="deep-dive"
            icon="🔬"
            title="Query, Key, Value (QKV)"
            subtitle="The mechanics of Attention"
            definition="Self-Attention works like a database search. Every word generates 3 vectors: A Query (What I am looking for), a Key (What I contain), and a Value (My actual meaning). The sentence calculates math: It takes Word 1's Query, multiplies it against every other word's Key. High matches cause Word 1 to 'absorb' the Value of those matching words."
            defaultOpen
          >
             <div class="mt-4 p-4 rounded-xl bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-sm">
                <ul class="space-y-3 dark:text-gray-300">
                    <li><strong class="text-violet-600 dark:text-violet-400 block mb-1">The Transformer Block:</strong></li>
                    <li>GPT-3 isn't just one attention layer. It is 96 "Transformer Blocks" stacked on top of each other.</li>
                    <li>A Block = [Self-Attention Layer] -> [Standard `nn.Linear` MLP Layer]. </li>
                    <li>Attention routes information; MLP memorizes facts.</li>
                </ul>
             </div>
          </ConceptCard>
        </template>

        <!-- ==================== 4. VISUALIZATION ==================== -->
        <template v-if="activeSection === 'visualization'">
          <ConceptCard
            id="viz"
            icon="👁️"
            title="Attention Heatmaps"
            subtitle="Where the LLM is looking"
            defaultOpen
          >
             <div class="mt-4 flex flex-col p-6 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 font-mono text-sm justify-center items-center">
                <div class="text-center mb-4 text-gray-500 font-sans">
                    When understanding the word "it", where does the Attention mechanism look?
                </div>
                
                <div class="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
                    <span>The </span>
                    <span class="text-blue-600 dark:text-blue-400 font-bold bg-blue-100 dark:bg-blue-900 p-1 rounded">animal</span>
                    <span> didn't cross the </span>
                    <span class="text-gray-400">street</span>
                    <span> because </span>
                    <span class="text-red-500 font-bold bg-red-100 dark:bg-red-900 p-1 rounded border-b-2 border-red-500">it</span>
                    <span> was too tired.</span>
                </div>
                <div class="my-2 border-l border-gray-400 h-4"></div>
                <div class="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
                    <span>The </span>
                    <span class="text-gray-400">animal</span>
                    <span> didn't cross the </span>
                    <span class="text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-100 dark:bg-emerald-900 p-1 rounded">street</span>
                    <span> because </span>
                    <span class="text-red-500 font-bold bg-red-100 dark:bg-red-900 p-1 rounded border-b-2 border-red-500">it</span>
                    <span> was too wide.</span>
                </div>
                
                <div class="mt-6 text-xs font-sans text-gray-500 max-w-sm text-center">
                    Notice how changing the last word ("tired" vs "wide") fundamentally alters which word "it" mathematically points to. The Query/Key math figures this out dynamically!
                </div>
             </div>
          </ConceptCard>
        </template>

        <!-- ==================== 5. CODE IMPLEMENTATION ==================== -->
        <template v-if="activeSection === 'code'">
          <div class="bg-gray-100 dark:bg-gray-800/50 p-6 rounded-2xl border border-gray-200 dark:border-white/10 mb-8">
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Implementation: HuggingFace Transformers</h3>
            <div class="bg-[#1e1e1e] rounded-xl overflow-hidden text-sm font-mono leading-relaxed p-4 overflow-x-auto text-gray-300 shadow-xl border border-gray-700">
<pre><code><span class="text-green-400"># We do not write Transformers from scratch. We download them.</span>
<span class="text-purple-400">from</span> transformers <span class="text-purple-400">import</span> pipeline

<span class="text-green-400"># 1. Download a pre-trained open source LLM</span>
<span class="text-green-400"># (Downloads the Tokenizer AND the Transformer weights)</span>
generator = pipeline(<span class="text-orange-300">"text-generation"</span>, model=<span class="text-orange-300">"gpt2"</span>)

<span class="text-green-400"># 2. Autoregressive Generation</span>
<span class="text-green-400"># It will read the prompt segment, predict word 1.</span>
<span class="text-green-400"># Then take Prompt + Word 1, and predict Word 2.</span>
<span class="text-green-400"># It loops this 'autoregressively' until max_length.</span>
prompt = <span class="text-orange-300">"The secret to a happy life is"</span>

results = generator(
    prompt, 
    max_length=<span class="text-emerald-300">30</span>, 
    temperature=<span class="text-emerald-300">0.7</span>, <span class="text-green-400"># Creativity dial (0.0 = strict math)</span>
    num_return_sequences=<span class="text-emerald-300">1</span>
)

print(results[<span class="text-emerald-300">0</span>][<span class="text-orange-300">'generated_text'</span>])
<span class="text-green-400"># Output: "The secret to a happy life is to find balance between..."</span></code></pre>
            </div>
          </div>

          <ConceptCard
            id="your-turn-m5-1"
            icon="✍️"
            title="YOUR TURN: Concept Tasks"
            subtitle="The memory illusion"
            defaultOpen
          >
             <div class="mt-4 space-y-4 text-sm text-gray-700 dark:text-gray-300">
              <div class="p-4 bg-white dark:bg-gray-800/80 rounded-xl border border-violet-200 dark:border-violet-800/30">
                <span class="font-bold text-violet-600 dark:text-violet-400 mb-2 block">Task 1: AI Memory</span>
                <p>When you chat with ChatGPT, it 'remembers' your name from 5 messages ago. Does the Transformer architecture itself actually have a memory hard drive it saves your name to?</p>
              </div>
            </div>
          </ConceptCard>
        </template>

        <!-- ==================== 6. MICRO-EXERCISES ==================== -->
        <template v-if="activeSection === 'exercises'">
          <ConceptCard
            id="micro-exercises-m51"
            icon="⚡"
            title="Concept Checks"
            subtitle="Generation physics"
            defaultOpen
          >
            <div class="space-y-6 mt-4">
              <!-- Exec 1 -->
              <div>
                <h4 class="font-semibold text-gray-900 dark:text-white text-sm mb-2">1. Temperature 0.0</h4>
                <div class="bg-gray-900 rounded-lg p-3 font-mono text-sm text-gray-300">
                  <p class="font-sans">If I set `temperature = 0.0`, the LLM will always output the exact same sentence every time. Why? What does it do mathematically?</p>
                </div>
              </div>
            </div>
          </ConceptCard>
        </template>

        <!-- ==================== 7. COMMON MISTAKES ==================== -->
        <template v-if="activeSection === 'mistakes'">
          <ConceptCard
            id="mistakes-m51"
            icon="⚠️"
            title="Common Beginner Mistakes"
            subtitle="Save yourself hours of debugging"
            defaultOpen
          >
             <ul class="space-y-4 mt-4 text-sm text-gray-600 dark:text-gray-400">
              <li class="p-4 bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800/30 rounded-xl">
                <strong class="text-red-700 dark:text-red-400 block mb-1">1. The Context Window Limit</strong>
                Because Attention physically calculates a matrix comparing EVERY word to EVERY OTHER word, the math grows exponentially ($N^2$). You cannot feed a 1,000,000-word book into a standard Transformer; the $N^2$ memory matrix will literally explode your GPU. This limit is the "Context Window".
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
                <span class="font-bold text-purple-700 dark:text-purple-400 block mb-2">➡️ Phase 5.3: RAG (Retrieval Augmented Generation)</span>
                Because of the Context Window limit, you cannot train an LLM on your private company wiki every day. Instead, you will build RAG (M5.3)-a system that uses Vector DBs to find just the 3 most relevant paragraphs and pastes them into the prompt.
              </div>
          </ConceptCard>
        </template>

        <!-- ==================== 9. REAL-WORLD ==================== -->
        <template v-if="activeSection === 'real-world'">
           <ConceptCard
            id="real-world"
            icon="🏭"
            title="Real-World Application"
            subtitle="Pre-training vs Fine-Tuning"
            defaultOpen
          >
            <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
              Meta trained Llama-3 (Pre-training) on trillions of words using thousands of GPUs for months. The result was a "Base Model".
            </p>
            <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              Base models only predict the next word. If you ask a Base Model "What is the capital of France?", it might complete the text with "What is the capital of Spain?". It doesn't know it's a chatbot. To make ChatGPT, OpenAI used "Fine-Tuning" (Instruct Tuning) on the Base Model to mathematically reward it for answering in a helpful, conversational layout.
            </p>
          </ConceptCard>
        </template>

        <!-- ==================== 10. MINI PROJECT ==================== -->
        <template v-if="activeSection === 'project'">
          <ConceptCard
            id="project"
            icon="🛠️"
            title="Mini Project: The Next Word Pipeline"
            subtitle="Autoregressive loop"
            defaultOpen
          >
            <div class="mt-4 p-5 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-gray-800/50">
              <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
                <strong>Goal:</strong> Write the conceptual loop explaining how ChatGPT types a 50-word response.
              </p>
              <div class="bg-gray-900 p-4 rounded-xl text-gray-300 font-mono text-xs overflow-auto">
<pre>prompt = "The sky is "
# For 50 loops:
# 1. feed `prompt` to LLM
# 2. gets output word (e.g. "blue")
# 3. ???
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
              <li><strong>Transformers</strong> read text in parallel, allowing massive scaling.</li>
              <li><strong>Self-Attention</strong> determines the contextual meaning of a word by cross-referencing it with every other word in the prompt (QKV math).</li>
              <li>LLMs are <strong>Autoregressive</strong>; they ONLY predict the single next token, append it to the prompt, and run the whole thing again.</li>
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
                <p class="text-gray-700 dark:text-gray-300 mb-4"><strong>Task 1 (Memory):</strong> NO! Transformers have literal zero memory of past calls. The web-interface (ChatGPT UI) is actually copy-pasting your entire 50-message chat history silently into the prompt block and sending the ENTIRE thing to the model every single time you hit enter.</p>
                <p class="text-gray-700 dark:text-gray-300 mb-4"><strong>Exercise 1 (Temperature):</strong> The LLM outputs probabilities (e.g., "Blue" 80%, "Cloudy" 15%, "Pizza" 0.001%). At temp > 0, it rolls a weighted dice, occasionally picking "Cloudy". At temp 0.0, the math strictly takes the `.argmax()`-the highest probability guaranteed every time. It becomes deterministic.</p>
                <p class="text-gray-700 dark:text-gray-300"><strong>Project (Loop):</strong><br>
                Step 3: `prompt = prompt + " blue"`. Then it feeds "The sky is blue" to predict the next word. It MUST recount the whole sequence continuously.
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
  { id: 'overview', label: '1. Concept Overview', icon: '🤖' },
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
