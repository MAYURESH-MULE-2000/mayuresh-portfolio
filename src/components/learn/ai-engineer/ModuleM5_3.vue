<template>
  <div class="learn-module min-h-screen">
    <!-- Header -->
    <div class="px-4 md:px-8 py-8 pb-4 max-w-6xl mx-auto">
      <a href="/learn/ai-engineer" class="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors mb-4">
        ← Back to Curriculum
      </a>
      <div class="flex items-center gap-3 mb-2">
        <span class="text-3xl">📚</span>
        <h1 class="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">M5.3 RAG & Vector DBs</h1>
      </div>
      <p class="text-gray-600 dark:text-gray-400 text-sm md:text-base max-w-2xl">
        Retrieval-Augmented Generation. Curing LLM hallucinations by giving them an explicitly curated memory drive.
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
            <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-fuchsia-400 via-purple-500 to-pink-500"></div>
            <div class="text-6xl mb-6 transform group-hover:scale-110 transition-transform duration-500">📚</div>
            <h2 class="text-3xl md:text-4xl font-bold mb-4 tracking-tight">1. Concept Overview</h2>
            <p class="text-fuchsia-100 mb-8 max-w-lg mx-auto">LLMs hallucinate. If you ask ChatGPT what the PTO policy is for your specific company, it will confidently invent a fake one. RAG bridges the gap between general AI and your private data.</p>
          </div>

          <ConceptCard
            id="overview-rag"
            icon="🧠"
            title="The Open-Book Test"
            subtitle="Context Injection"
            definition="Retrieval-Augmented Generation (RAG) is a 2-step pipeline. Step 1 (Retrieval): When a user asks a question, a search engine finds the 3 most relevant paragraphs from your private database. Step 2 (Generation): You paste those 3 paragraphs directly into the prompt alongside the user's question, telling the LLM to 'Only answer using these paragraphs'."
            analogy="Base ChatGPT is a student taking a closed-book history test. They will guess and hallucinate if they don't know the answer. RAG is giving the student an open textbook and pointing exactly to page 42 before asking the question."
            seniorTip="Do not fine-tune a model to teach it facts. Fine-tuning teaches structural tone and formatting. RAG is how you teach a model facts."
            defaultOpen
          >
          </ConceptCard>
        </template>

        <!-- ==================== 2. INTUITION FIRST ==================== -->
        <template v-if="activeSection === 'intuition'">
          <ConceptCard
            id="intuition"
            icon="💡"
            title="Mental Models: Semantic Search"
            subtitle="Moving past keyword matching"
            definition="In 1999, if you searched 'Dog', Google did a 'lexical/keyword search'. It literally just checked if the letters d-o-g existed in the document. If the document said 'Canine', it failed. RAG uses 'Semantic Search' via Embeddings (M4.3). Because 'Dog' and 'Canine' share identical GPS coordinates in math-space, the database knows they mean the same thing."
            defaultOpen
          >
          </ConceptCard>
        </template>

        <!-- ==================== 3. TECHNICAL DEEP DIVE ==================== -->
        <template v-if="activeSection === 'deep-dive'">
          <ConceptCard
            id="deep-dive"
            icon="🔬"
            title="Vector Databases and Distance"
            subtitle="The plumbing of RAG"
            definition="A Vector Database (like Pinecone, Chroma, or Milvus) is a database designed specifically to store arrays of floating-point numbers (Embeddings). When the user asks a question, we embed their question into an array. The Vector DB runs a mathematical formula called Cosine Similarity to find which document arrays in the database are physically closest to the question array."
            defaultOpen
          >
             <div class="mt-4 p-4 rounded-xl bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-sm">
                <ul class="space-y-3 dark:text-gray-300">
                    <li><strong class="text-fuchsia-600 dark:text-fuchsia-400 block mb-1">The Data Prep Pipeline:</strong></li>
                    <li>1. Ingest PDF -> 2. Chunk it into 500-word blocks.</li>
                    <li>3. Send each block to an Embedding Model (e.g., OpenAI `text-embedding-3-small`).</li>
                    <li>4. Save the returned Array (1536 dimensions) and the raw text into the Vector DB.</li>
                </ul>
             </div>
          </ConceptCard>
        </template>

        <!-- ==================== 4. VISUALIZATION ==================== -->
        <template v-if="activeSection === 'visualization'">
          <ConceptCard
            id="viz"
            icon="👁️"
            title="The RAG Flowchart"
            subtitle="Step by Step"
            defaultOpen
          >
             <div class="mt-4 p-6 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 font-mono text-sm overflow-x-auto text-gray-500">
                
                <div class="flex items-center gap-4 text-center">
                    <div class="p-3 border-2 border-blue-400 rounded-lg max-w-[150px]">
                        <span class="font-bold">User Query</span><br>
                        "How to reset password?"
                    </div>
                    <div>➡️</div>
                    <div class="p-3 border-2 border-green-400 rounded-lg max-w-[150px]">
                        <span class="font-bold">Embedding Model</span><br>
                        converts to [0.2, -0.4...]
                    </div>
                    <div>➡️</div>
                    <div class="p-3 border-2 border-fuchsia-400 rounded-lg bg-fuchsia-50 dark:bg-fuchsia-900/10">
                        <span class="font-bold">Vector DB</span><br>
                        Runs Consine Search.<br>
                        Returns Top 2 chunks
                    </div>
                </div>

                <div class="my-4 border-l-2 border-gray-400 h-8 ml-16"></div>
                ✔️ Chunks retrieved!
                <div class="my-4 border-l-2 border-gray-400 h-8 ml-16"></div>

                <div class="flex">
                    <div class="p-4 border-2 border-orange-400 rounded-lg bg-orange-50 dark:bg-orange-900/10 max-w-full">
                        <span class="font-bold">Prompt Injection</span><br>
                        System: Answer the question using ONLY the provided context.<br>
                        Context 1: [Pulled from DB: "To reset, go to settings -> security"]<br>
                        Context 2: [Pulled from DB: "Passwords must be 8 chars"]<br>
                        User: "How to reset password?"
                    </div>
                    <div class="mt-8 ml-4">➡️</div>
                    <div class="p-4 mt-4 ml-4 border-2 border-red-400 rounded-lg font-bold">
                        LLM replies natively!
                    </div>
                </div>
             </div>
          </ConceptCard>
        </template>

        <!-- ==================== 5. CODE IMPLEMENTATION ==================== -->
        <template v-if="activeSection === 'code'">
          <div class="bg-gray-100 dark:bg-gray-800/50 p-6 rounded-2xl border border-gray-200 dark:border-white/10 mb-8">
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Implementation: Cosine Similarity</h3>
            <div class="bg-[#1e1e1e] rounded-xl overflow-hidden text-sm font-mono leading-relaxed p-4 overflow-x-auto text-gray-300 shadow-xl border border-gray-700">
<pre><code><span class="text-purple-400">import</span> numpy <span class="text-blue-400">as</span> np
<span class="text-purple-400">from</span> sklearn.metrics.pairwise <span class="text-purple-400">import</span> cosine_similarity

<span class="text-green-400"># Imagine an embedding model turned text into 3D vectors</span>
<span class="text-green-400"># (Real ones use 1536 dimensions)</span>

user_query = np.array([[<span class="text-emerald-300">0.8</span>, <span class="text-emerald-300">0.1</span>, <span class="text-emerald-300">0.1</span>]])  <span class="text-green-400"># "Apple the fruit"</span>

<span class="text-green-400"># Database contents</span>
chunk_1 = np.array([[<span class="text-emerald-300">0.9</span>, <span class="text-emerald-300">0.2</span>, <span class="text-emerald-300">0.0</span>]])     <span class="text-green-400"># "Oranges are sweet"</span>
chunk_2 = np.array([[<span class="text-emerald-300">-0.5</span>, <span class="text-emerald-300">0.8</span>, <span class="text-emerald-300">0.9</span>]])    <span class="text-green-400"># "Macbook Pro specs"</span>

<span class="text-green-400"># Compare query to database (Cosine Similarity returns -1.0 to 1.0)</span>
<span class="text-green-400"># 1.0 means exact same angle in space.</span>
score_1 = cosine_similarity(user_query, chunk_1)
score_2 = cosine_similarity(user_query, chunk_2)

print(<span class="text-orange-300">"Match 1 (Fruit):"</span>, score_1[<span class="text-emerald-300">0</span>][<span class="text-emerald-300">0</span>])  <span class="text-green-400"># ~0.98 (Extremely high)</span>
print(<span class="text-orange-300">"Match 2 (Tech):"</span>, score_2[<span class="text-emerald-300">0</span>][<span class="text-emerald-300">0</span>])   <span class="text-green-400"># ~-0.20 (Opposite)</span>

<span class="text-green-400"># RAG System rule: "Only grab chunks with similarity > 0.8"</span></code></pre>
            </div>
          </div>

          <ConceptCard
            id="your-turn-m5-3"
            icon="✍️"
            title="YOUR TURN: Architecture Challenge"
            subtitle="Chunking strategies"
            defaultOpen
          >
             <div class="mt-4 space-y-4 text-sm text-gray-700 dark:text-gray-300">
              <div class="p-4 bg-white dark:bg-gray-800/80 rounded-xl border border-fuchsia-200 dark:border-fuchsia-800/30">
                <span class="font-bold text-fuchsia-600 dark:text-fuchsia-400 mb-2 block">Task 1: The Size Problem</span>
                <p>You have a 100-page PDF on HR rules. If you chunk the text into 1 sentence per chunk, what goes wrong in RAG? Conversely, if you chunk the text into 1 massive 50-page block per chunk, what goes wrong?</p>
              </div>
            </div>
          </ConceptCard>
        </template>

        <!-- ==================== 6. MICRO-EXERCISES ==================== -->
        <template v-if="activeSection === 'exercises'">
          <ConceptCard
            id="micro-exercises-m53"
            icon="⚡"
            title="Concept Checks"
            subtitle="Limits"
            defaultOpen
          >
            <div class="space-y-6 mt-4">
              <!-- Exec 1 -->
              <div>
                <h4 class="font-semibold text-gray-900 dark:text-white text-sm mb-2">1. The Need For RAG</h4>
                <div class="bg-gray-900 rounded-lg p-3 font-mono text-sm text-gray-300">
                  <p class="font-sans">Google's Gemini 1.5 Pro has a 2-Million Token Context Window. They let you upload entire books into the prompt directly. If you can fit the entire book in the prompt, do you still need RAG?</p>
                </div>
              </div>
            </div>
          </ConceptCard>
        </template>

        <!-- ==================== 7. COMMON MISTAKES ==================== -->
        <template v-if="activeSection === 'mistakes'">
          <ConceptCard
            id="mistakes-m53"
            icon="⚠️"
            title="Common Beginner Mistakes"
            subtitle="Save yourself hours of debugging"
            defaultOpen
          >
             <ul class="space-y-4 mt-4 text-sm text-gray-600 dark:text-gray-400">
              <li class="p-4 bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800/30 rounded-xl">
                <strong class="text-red-700 dark:text-red-400 block mb-1">1. "Lost in the Middle" Phenomenon</strong>
                If you retrieve the Top 20 chunks from the database and paste them into the Prompt, the LLM will reliably read chunk 1 and chunk 20. But because of how Attention math works, it heavily degrades on chunks 8 through 14. If the answer is hidden in the middle of a massive prompt, the AI will fail. Keep retrieved chunks to the Top 3 - 5.
              </li>
              <li class="p-4 bg-fuchsia-50 dark:bg-fuchsia-900/10 border border-fuchsia-200 dark:border-fuchsia-800/30 rounded-xl">
                <strong class="text-fuchsia-700 dark:text-fuchsia-400 block mb-1">2. Blindly trusting Retrieval</strong>
                Cosine similarity isn't perfect. If the user asks "I do NOT want info on the 2021 tax policy, only 2022", semantic search might ironically fetch the 2021 tax policy because the words are extremely similar geometrically. Re-ranking algorithms are needed in advanced RAG.
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
                <span class="font-bold text-purple-700 dark:text-purple-400 block mb-2">➡️ Phase 5.4: Tool Calling</span>
                Right now, your code manually does the Vector DB search and pastes it in. In M5.4, you will learn how to turn the Database into a "Tool", and let the AI decide for itself when it wants to query the database.
              </div>
          </ConceptCard>
        </template>

        <!-- ==================== 9. REAL-WORLD ==================== -->
        <template v-if="activeSection === 'real-world'">
           <ConceptCard
            id="real-world"
            icon="🏭"
            title="Real-World Application"
            subtitle="Customer Support Chatbots"
            defaultOpen
          >
            <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
              90% of enterprise AI applications are just fancy RAG pipelines.
            </p>
            <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              When you talk to a Stripe or AWS support chatbot, it is taking your question, embedding it, hitting a private ChromaDB filled with thousands of Markdown documentation files, retrieving the exact 3 paragraphs detailing the API error code, pasting them into the hidden System prompt, and replying to you in 2 seconds.
            </p>
          </ConceptCard>
        </template>

        <!-- ==================== 10. MINI PROJECT ==================== -->
        <template v-if="activeSection === 'project'">
          <ConceptCard
            id="project"
            icon="🛠️"
            title="Mini Project: The RAG Output Fuser"
            subtitle="Final step"
            defaultOpen
          >
            <div class="mt-4 p-5 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-gray-800/50">
              <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
                <strong>Goal:</strong> Formulate the final engineered prompt.
              </p>
              <div class="bg-gray-900 p-4 rounded-xl text-gray-300 font-mono text-xs overflow-auto">
<pre>user_q = "Can my dog fly on Delta?"
fetched_chunk = "Delta Airlines permits small dogs in the cabin."

# Combine them securely.
final_prompt = f"""
System: Answer using only the context below. If you don't know, say "IDK".

Context: 
{fetched_chunk}

Question:
{user_q}
"""
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
              <li><strong>RAG</strong> completely solves hallucinations by feeding the LLM actual facts in the prompt.</li>
              <li><strong>Embeddings</strong> convert text into GPS coordinates.</li>
              <li><strong>Vector Databases</strong> store these coordinates and use <strong>Cosine Similarity</strong> to find the closest matches.</li>
              <li>RAG is a two-step dance: Data Retrieval (Search), followed by Generation (LLM Synthesis).</li>
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
              <div class="p-4 bg-fuchsia-50 dark:bg-fuchsia-900/10 border border-fuchsia-200 dark:border-fuchsia-800/20 rounded-xl">
                <h4 class="font-bold text-fuchsia-800 dark:text-fuchsia-400 mb-2">Tasks & Exercises</h4>
                <p class="text-gray-700 dark:text-gray-300 mb-4"><strong>Task 1 (Chunk Size):</strong> 1 sentence chunks lack context. If the sentence is "He signed the bill", who is 'He'? You destroy semantic meaning. If the chunk is 50-pages, you retrieve 50 pages of noise, instantly filling up the Context Window, crashing the app or causing "Lost in the middle" forgetting. Industry standard is 500 to 1,000 token chunks with 10% overlap.</p>
                <p class="text-gray-700 dark:text-gray-300"><strong>Exercise 1 (Massive Context):</strong> Yes, you often still need RAG. Pumping 2 million tokens (a whole book) into an LLM takes 30+ seconds to process and costs $10 API compute per request. A Vector Search takes 0.05 seconds and costs fractions of a penny. RAG is cheaper, faster, and more accurate than massive context dumps.</p>
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
  { id: 'overview', label: '1. Concept Overview', icon: '📚' },
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
