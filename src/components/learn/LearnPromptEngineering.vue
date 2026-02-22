<template>
  <div class="learn-pe min-h-screen">
    <!-- Header -->
    <div class="px-4 md:px-8 py-8 pb-4 max-w-6xl mx-auto">
      <a href="/learn" class="inline-flex items-center gap-1 text-sm text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors mb-4">
        ← Back to Topics
      </a>
      <div class="flex items-center gap-3 mb-2">
        <span class="text-3xl">🤖</span>
        <h1 class="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">Prompt Engineering</h1>
      </div>
      <p class="text-gray-500 dark:text-gray-400 text-sm md:text-base max-w-2xl">
        From tokens to transformers, from zero-shot to enterprise-scale system design.
        Learn to design clarity for probabilistic systems — with interactive exercises.
      </p>
    </div>

    <!-- Layout: Nav + Content -->
    <div class="px-4 md:px-8 max-w-6xl mx-auto flex flex-col lg:flex-row gap-6 pb-16">
      <SectionNav
        :sections="sections"
        :activeSection="activeSection"
        activeColor="bg-indigo-600"
        @select="setSection"
        class="lg:w-56 flex-shrink-0"
      />

      <div class="flex-1 min-w-0 space-y-8">

        <!-- ==================== INTRO ==================== -->
        <template v-if="activeSection === 'intro'">
          <div class="bg-gradient-to-br from-indigo-900 to-purple-900 rounded-2xl p-8 md:p-12 text-center text-white shadow-xl relative overflow-hidden group mb-8">
            <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
            <div class="text-6xl mb-6 transform group-hover:scale-110 transition-transform duration-500">⚡</div>
            <h2 class="text-3xl md:text-4xl font-bold mb-4 tracking-tight">Why Prompt Engineering Matters</h2>
            <p class="text-indigo-200 mb-8 max-w-lg mx-auto">AI doesn't think. It responds to structured input. Your prompt IS the product.</p>
          </div>

          <ConceptCard
            id="intro-ai"
            icon="🧠"
            title="The Shift: Programming to Prompting"
            subtitle="Deterministic systems vs Probabilistic systems"
            definition="Traditional programming relies on deterministic logic models: if X happens, execute Y. Generative AI operates on probabilistic models: it predicts the next sequence based on learned patterns and the provided context (the prompt). Prompt engineering is the discipline of structuring the context to narrow down the statistical probability space toward an optimal, deterministic-like result."
            analogy="If traditional programming is giving a chef an exact, gram-by-gram recipe to follow without question, prompting is giving a highly creative chef an idea of the dish you want, the ingredients they shouldn't use, and the presentation style you expect."
            seniorTip="At an enterprise level, you are not writing 'prompts'—you are architecting input payloads. You're combining Retrieval-Augmented Generation (RAG) contexts, dynamic user state variables, guardrails, and tone guidelines into a single context window payload to get a robust, API-predictable response."
            defaultOpen
          >
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
              <div v-for="item in useCases" :key="item.label" class="flex items-center gap-3 p-4 rounded-xl bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-white/5 hover:border-indigo-300 dark:hover:border-indigo-500/30 transition-all">
                <span class="text-2xl">{{ item.icon }}</span>
                <div>
                  <div class="font-semibold text-gray-900 dark:text-white text-sm">{{ item.label }}</div>
                  <div class="text-xs text-gray-500 dark:text-gray-400">{{ item.tool }}</div>
                </div>
              </div>
            </div>
          </ConceptCard>
        </template>

        <!-- ==================== AI EVOLUTION ==================== -->
        <template v-if="activeSection === 'ai-evolution'">
          <ConceptCard
            id="discriminative-vs-generative"
            icon="🔍"
            title="Discriminative vs Generative AI"
            subtitle="Understanding the paradigm shift"
            definition="Discriminative models learn the boundary between classes to categorize input (Decision boundaries). They predict labels: spam vs not spam, hotdog vs not hotdog. Generative models learn the distribution of the data itself to generate new data instances. They predict the next logical token based on training distribution."
            analogy="Discriminative AI is a museum curator trained to look at a painting and tell you if it's a Picasso or a Monet (classifying). Generative AI is an art student trained to study all paintings and produce a brand new painting in the style of Picasso (generating)."
            seniorTip="Prompt engineering primarily applies to Generative models (LLMs, Diffusion models). When designing systems, use discriminative models (cheaper, faster) as routing gates or safety checkers BEFORE hitting the expensive generative endpoints."
            defaultOpen
          >
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
              <div class="p-5 rounded-xl bg-white dark:bg-gray-800/50 border border-red-200 dark:border-red-800/30">
                <span class="inline-block px-2.5 py-0.5 text-xs font-bold rounded-full bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 mb-3">Discriminative AI</span>
                <p class="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-2">Classifies existing data based on boundaries.</p>
                <div class="text-xs text-gray-400 space-y-1">
                  <p>• Spam filters (Gmail)</p>
                  <p>• Facial recognition</p>
                  <p>• Recommendation engines</p>
                </div>
              </div>
              <div class="p-5 rounded-xl bg-white dark:bg-gray-800/50 border border-emerald-200 dark:border-emerald-800/30">
                <span class="inline-block px-2.5 py-0.5 text-xs font-bold rounded-full bg-emerald-100 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 mb-3">Generative AI</span>
                <p class="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-2">Creates new content from statistical patterns.</p>
                <div class="text-xs text-gray-400 space-y-1">
                  <p>• LLMs (ChatGPT, Claude)</p>
                  <p>• Code Assistants (Copilot)</p>
                  <p>• Image Generators (Midjourney)</p>
                </div>
              </div>
            </div>
          </ConceptCard>

          <ConceptCard
            id="neural-evolution"
            icon="🧬"
            title="The Neural Architecture Evolution"
            subtitle="From RNNs to the Transformer revolution"
            definition="Historically, NLP relied on RNNs (Recurrent Neural Networks) which processed text sequentially, leading to memory loss over long strings (vanishing gradient). The Transformer architecture (2017 'Attention Is All You Need' paper) revolutionized AI by using 'Self-Attention'—allowing the model to process all words simultaneously and understand context regardless of distance."
            analogy="An RNN is like reading a book word-by-word through a tiny peephole; by the end of the page, you've forgotten the first sentence. A Transformer is like having a bird's-eye view of the entire page at once, instantly seeing how every word relates to every other word."
            seniorTip="Understand that Transformers (like GPT - Generative Pre-trained Transformer) have a fixed 'Context Window' because self-attention computation scales quadratically with length. This is why API costs and response latency explode as your prompt gets too large."
          >
            <div class="relative pl-8 space-y-6 mt-4">
              <div class="absolute left-3 top-2 bottom-2 w-0.5 bg-gradient-to-b from-red-500 via-amber-500 to-emerald-500 rounded-full"></div>
              <div v-for="(arch, i) in architectures" :key="i" class="relative">
                <span class="absolute -left-5 top-1 w-3.5 h-3.5 rounded-full ring-4 ring-white dark:ring-gray-900" :class="{ 'bg-red-500': arch.status === 'legacy', 'bg-amber-500': arch.status === 'improved', 'bg-emerald-500': arch.status === 'current' }" :style="{ boxShadow: `0 0 12px ${arch.color}40` }"></span>
                <div class="flex items-baseline gap-3 mb-1">
                  <span class="text-xs font-mono text-gray-400">{{ arch.year }}</span>
                  <span class="text-lg font-bold text-gray-900 dark:text-white">{{ arch.name }}</span>
                </div>
                <div class="text-sm italic mb-1" :class="{ 'text-red-500': arch.status === 'legacy', 'text-amber-500': arch.status === 'improved', 'text-emerald-500': arch.status === 'current' }">{{ arch.full }}</div>
                <p class="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{{ arch.desc }}</p>
              </div>
            </div>
          </ConceptCard>
        </template>

        <!-- ==================== TOKENS & CONTEXT ==================== -->
        <template v-if="activeSection === 'tokens'">
          <ConceptCard
            id="tokenization"
            icon="🔤"
            title="Tokenization Mechanics"
            subtitle="How AI actually 'reads' language"
            definition="AI models don't read words or letters; they read 'Tokens'. A token can be a word, part of a word, or a single character. Common words map to single tokens ('apple'), while complex words are split into chunks ('unbelievable' -> 'un', 'believ', 'able'). Models use subword tokenization (like BPE - Byte Pair Encoding)."
            analogy="Tokens are like Lego bricks. Instead of having a custom block for every possible object in the universe (words), you have a set of fundamental shapes (tokens). You can snap 'play' and 'ing' together to build 'playing'."
            seniorTip="Tokenization is the source of many AI quirks: models struggle with math, counting letters, or spelling rhyming words because they 'see' tokens, not the individual letters within a token. A common rule of thumb: 1 token ≈ 0.75 English words. Code requires more tokens than plain text because of syntax characters."
            defaultOpen
          >
            <!-- Interactive Tokenizer -->
            <div class="p-6 rounded-2xl bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-white/5 mt-4">
              <div class="flex items-center gap-2 mb-4">
                <span class="px-2.5 py-0.5 text-xs font-bold rounded-full bg-amber-100 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400">Interactive</span>
                <span class="text-xs text-gray-400">Token Visualizer (Simulated BPE)</span>
              </div>
              <input
                v-model="tokenInput"
                placeholder="Type anything to see how AI tokenizes it..."
                class="w-full px-4 py-3 bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-gray-900 dark:text-white text-sm font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400"
              />
              <div class="flex flex-wrap gap-1.5 mt-4 min-h-[40px]">
                <span v-for="(t, i) in computedTokens" :key="i"
                  class="px-3 py-1.5 text-sm font-mono rounded-lg border"
                  :style="{ background: t.color + '12', color: t.color, borderColor: t.color + '25' }">
                  {{ t.text }}
                </span>
              </div>
            </div>
          </ConceptCard>

          <ConceptCard
            id="context-window"
            icon="🖼️"
            title="The Context Window Limit"
            subtitle="The AI's short-term memory capacity"
            definition="The Context Window is the maximum number of tokens a model can process in a single request (both input prompt + generated output). Once this limit is exceeded, older tokens 'fall off' or the API returns a length error. Because of attention mechanisms, processing cost increases quadratically as context grows."
            analogy="The Context Window is like a short-order cook's ticket rail. They can only pin up so many orders at once. If you keep adding tickets, old ones fall off the edge and are totally forgotten."
            seniorTip="Don't just stuff the context window because a model boasts '1 Million tokens' capacity. Finding the 'needle in a haystack' degrades in large contexts, and API costs soar. Use RAG (Retrieval-Augmented Generation) to fetch only the top-K relevant chunks of text to insert into the prompt."
          >
            <!-- Context Window Visualization in child slot -->
            <div class="p-6 rounded-2xl bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-white/5 mt-4">
              <div class="h-14 rounded-xl border border-gray-200 dark:border-white/10 relative overflow-hidden bg-gray-50 dark:bg-white/[0.02] mb-3">
                <div class="absolute left-0 top-0 bottom-0 transition-all duration-300 flex items-center pl-3"
                  :style="{ width: contextSlider + '%', background: 'linear-gradient(90deg, rgba(99,102,241,0.2), rgba(139,92,246,0.1))', borderRight: '2px solid #6366f1' }">
                  <span class="text-xs font-semibold text-indigo-500">Used: {{ contextSlider }}%</span>
                </div>
                <div v-if="contextSlider > 85" class="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-red-500 animate-pulse">
                  ⚠ Approaching token limit! Avoid truncation.
                </div>
              </div>
              <input type="range" min="0" max="100" v-model.number="contextSlider" class="w-full accent-indigo-500" />
            </div>
          </ConceptCard>
        </template>

        <!-- ==================== ANATOMY ==================== -->
        <template v-if="activeSection === 'anatomy'">
          <ConceptCard
            id="prompt-anatomy"
            icon="🏗️"
            title="The Anatomy of a Perfect Prompt"
            subtitle="Breaking down the components of system instructions"
            definition="A production-ready prompt isn't a single sentence. It is composed of strict structural elements: 1) Role (persona and expertise), 2) Context (background info and audience), 3) Task (verb-driven specific command), 4) Constraints (boundaries, negative prompts), and 5) Output Format (JSON, Markdown, CSV)."
            analogy="Writing a prompt is like hiring a freelance developer. You wouldn't just say 'build an app' (Task). You say: 'You are an elite iOS dev (Role), our users are seniors (Context), build a medication tracker (Task), do not use dark mode or small fonts (Constraints), deliver the code via GitHub PR (Format).'"
            seniorTip="In applications, prompts shouldn't be hardcoded strings. They should be template files (like `.prompt` or `.hbs` files) where dynamic data injects into the 'Context' layer, but the 'Role' and 'Format' layers remain statically strictly typed to guarantee parseable API outputs."
            defaultOpen
          >
            <div class="space-y-3 mt-4">
              <div v-for="comp in promptComponents" :key="comp.key" class="flex items-start gap-4 p-5 rounded-xl border transition-all hover:shadow-md" :style="{ background: comp.color + '04', borderColor: comp.color + '18' }">
                <div class="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" :style="{ background: comp.color + '15' }">
                  <div class="w-3 h-3 rounded-full" :style="{ background: comp.color }"></div>
                </div>
                <div class="flex-1 min-w-0">
                  <div class="font-semibold text-gray-900 dark:text-white text-sm">{{ comp.label }}</div>
                  <div class="text-xs text-gray-500 dark:text-gray-400 mt-1 leading-relaxed">{{ comp.desc }}</div>
                  <div class="mt-2 inline-block px-3 py-1 rounded-lg bg-gray-100 dark:bg-white/[0.03] text-xs font-mono" :style="{ color: comp.color }">{{ comp.example }}</div>
                </div>
              </div>
            </div>
          </ConceptCard>
        </template>

        <!-- ==================== RULES ==================== -->
        <template v-if="activeSection === 'rules'">
          <ConceptCard
            id="golden-rules"
            icon="📐"
            title="The Golden Rules of Prompt Design"
            subtitle="Best practices for determinism and clarity"
            definition="To maximize output reliability: 1) Be Explicit—leave nothing to assumption. 2) Provide Examples (Few-Shot)—showing the model the desired pattern is 10x more effective than describing it. 3) Use Delimiters—wrap data in triple quotes (```) or XML tags (<data>) so the model separates instructions from content. 4) Use Chain of Thought—forcing the model to break down steps before answering improves logic accuracy."
            analogy="Zero-shot prompting is asking someone to play a new board game by only reading the rules. Few-shot is sitting down and showing them a practice round. They will perform infinitely better."
            seniorTip="XML tags are highly recommended for Claude models (Anthropic explicitly trains them on XML delimiters). Always put the target 'Format' instruction at the very end of the prompt—recency bias is a real phenomenon in LLMs."
            defaultOpen
          >
            <div class="space-y-3 mt-4 mb-6">
              <div v-for="rule in goldenRules" :key="rule.num" class="flex items-start gap-4 p-5 rounded-xl bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-white/5">
                <span class="text-2xl font-extrabold font-mono opacity-40" :style="{ color: rule.color }">{{ rule.num }}</span>
                <div>
                  <div class="font-semibold text-gray-900 dark:text-white">{{ rule.title }}</div>
                  <div class="text-sm text-gray-500 dark:text-gray-400 mt-1 leading-relaxed">{{ rule.desc }}</div>
                </div>
              </div>
            </div>

            <!-- Compare Prompts -->
            <div class="flex gap-2 mb-4">
              <button v-for="(ex, i) in compareExamples" :key="i" @click="activeCompare = i" class="px-3.5 py-1.5 text-xs font-medium rounded-full border transition-all" :class="activeCompare === i ? 'bg-indigo-100 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 border-indigo-300 dark:border-indigo-700' : 'text-gray-500 dark:text-gray-400 border-gray-200 dark:border-white/10'">{{ ex.label }}</button>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div class="p-5 rounded-xl bg-red-50 dark:bg-red-900/5 border border-red-200 dark:border-red-800/20">
                <div class="flex items-center gap-2 mb-3"><span class="text-red-500">✗</span><span class="text-xs font-bold text-red-500 uppercase">Vague Zero-Shot</span></div>
                <pre class="whitespace-pre-wrap text-sm text-gray-500 dark:text-gray-400 font-mono leading-relaxed m-0">{{ compareExamples[activeCompare].bad }}</pre>
              </div>
              <div class="p-5 rounded-xl bg-emerald-50 dark:bg-emerald-900/5 border border-emerald-200 dark:border-emerald-800/20">
                <div class="flex items-center gap-2 mb-3"><span class="text-emerald-500">✓</span><span class="text-xs font-bold text-emerald-500 uppercase">Structured Multi-Shot</span></div>
                <pre class="whitespace-pre-wrap text-sm text-gray-600 dark:text-gray-300 font-mono leading-relaxed m-0">{{ compareExamples[activeCompare].good }}</pre>
              </div>
            </div>
          </ConceptCard>
        </template>

        <!-- ==================== FRAMEWORKS ==================== -->
        <template v-if="activeSection === 'frameworks'">
          <ConceptCard
            id="prompt-frameworks"
            icon="🧩"
            title="Prompt Structural Frameworks"
            subtitle="RTF, CREATE, and PACE patterns"
            definition="Frameworks provide scalable mental models to build prompts. RTF (Role, Task, Format) is the fastest structure for simple queries. CREATE (Character, Request, Examples, Adjustments, Type, Extras) is comprehensive for system prompts. PACE (Persona, Action, Context, Expectation) is widely adopted for marketing teams."
            analogy="A prompt framework is like the architectural blueprint for a house. Without it, you're just nailing boards together. With it, you ensure every essential load-bearing wall (context, constraints) is perfectly placed before you build."
            seniorTip="Adopt a standard framework across your engineering team. When prompts are modularized into Create/PACE segments, they can be version-controlled piece-by-piece, making prompt-tuning a measurable, data-driven A/B testing exercise rather than 'vibe-based' guessing."
            defaultOpen
          >
            <div class="flex gap-2 mb-5 mt-4">
              <button v-for="f in [{ key: 'rtf', label: 'RTF (Fast)' }, { key: 'create', label: 'CREATE (Robust)' }]" :key="f.key" @click="activeFramework = f.key" class="px-5 py-2 text-sm font-semibold rounded-xl border transition-all" :class="activeFramework === f.key ? 'bg-indigo-100 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 border-indigo-300 dark:border-indigo-700' : 'text-gray-500 dark:text-gray-400 border-gray-200 dark:border-white/10'">{{ f.label }}</button>
            </div>

            <!-- RTF -->
            <div v-if="activeFramework === 'rtf'" class="p-6 rounded-2xl bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-white/5">
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div v-for="item in rtfItems" :key="item.letter" class="p-4 rounded-xl text-center border" :style="{ background: item.color + '06', borderColor: item.color + '18' }">
                  <div class="text-3xl font-extrabold font-mono" :style="{ color: item.color }">{{ item.letter }}</div>
                  <div class="text-sm font-semibold text-gray-900 dark:text-white mt-1">{{ item.word }}</div>
                  <div class="text-xs text-gray-400 mt-1">{{ item.desc }}</div>
                </div>
              </div>
            </div>

            <!-- CREATE -->
            <div v-if="activeFramework === 'create'" class="p-6 rounded-2xl bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-white/5">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div v-for="item in createItems" :key="item.word" class="flex items-start gap-3 p-4 rounded-xl border" :style="{ background: item.color + '04', borderColor: item.color + '12' }">
                  <div class="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 text-base font-extrabold font-mono" :style="{ background: item.color + '12', color: item.color }">{{ item.letter }}</div>
                  <div>
                    <div class="text-sm font-semibold text-gray-900 dark:text-white">{{ item.word }}</div>
                    <div class="text-xs text-gray-400 mt-0.5">{{ item.desc }}</div>
                  </div>
                </div>
              </div>
            </div>
          </ConceptCard>
        </template>

        <!-- ==================== PRACTICE ==================== -->
        <template v-if="activeSection === 'practice'">
          <ConceptCard
            id="practice-lab"
            icon="🔬"
            title="Interactive Prompt Engine Lab"
            subtitle="Build a proper instruction block"
            definition="Construct a robust instruction by supplying all 5 essential parts of a structured prompt command block. Observe how separating contexts prevents hallucination and sets guardrails."
            analogy="Building a prompt is assembling a puzzle. If you leave out constraints, the corners are missing, and the model's imagination takes over the empty bounds."
            seniorTip="When building programmatic system prompts, place dynamic user input at the BOTTOM of the prompt context in XML tags, because instructions at the top are sometimes 'forgotten' if the malicious user input includes a prompt-injection ('ignore previous instructions')."
            defaultOpen
          >
            <!-- UI builder mapped from original -->
            <div class="p-6 rounded-2xl bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-white/5 mt-4">
              <div class="flex items-center justify-between mb-5">
                <div class="flex items-center gap-2">
                  <span class="px-2.5 py-0.5 text-xs font-bold rounded-full bg-emerald-100 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400">Builder</span>
                  <span class="text-xs font-semibold" :style="{ color: builderQualityColor }">
                    {{ builderQuality }} — {{ builderFilledCount }}/5 components
                  </span>
                </div>
                <button @click="showPreview = !showPreview" class="px-4 py-1.5 text-xs font-semibold rounded-lg border transition-all" :class="showPreview ? 'bg-indigo-500 text-white border-indigo-500' : 'text-indigo-500 border-indigo-300 dark:border-indigo-700'">{{ showPreview ? 'Edit' : 'Preview' }}</button>
              </div>

              <div v-if="!showPreview" class="space-y-4">
                <div v-for="comp in promptComponents" :key="comp.key">
                  <div class="flex items-center gap-2 mb-1.5">
                    <div class="w-2.5 h-2.5 rounded-full" :style="{ background: comp.color }"></div>
                    <span class="text-sm font-semibold text-gray-900 dark:text-white">{{ comp.label }}</span>
                  </div>
                  <textarea v-model="builderParts[comp.key]" :placeholder="comp.placeholder" rows="2" class="w-full px-3 py-2.5 bg-gray-50 dark:bg-white/[0.03] rounded-xl text-sm text-gray-900 dark:text-white font-mono border border-gray-200 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"></textarea>
                </div>
                <button @click="fillBuilderExample" class="px-4 py-2 text-xs rounded-lg border border-gray-200 dark:border-white/10 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-all">Fill with pattern →</button>
              </div>

              <div v-else class="p-6 rounded-xl bg-indigo-50 dark:bg-indigo-900/10 border border-indigo-100 dark:border-indigo-800/30">
                <div class="text-[10px] text-gray-400 uppercase tracking-widest mb-3">Payload Preview</div>
                <pre class="whitespace-pre-wrap break-words font-mono text-sm text-indigo-700 dark:text-indigo-300 leading-relaxed m-0">{{ assembledPrompt || 'Add components above to build your prompt...' }}</pre>
              </div>
            </div>
          </ConceptCard>
        </template>

        <!-- ==================== APPS ==================== -->
        <template v-if="activeSection === 'applications'">
          <ConceptCard
            id="real-world"
            icon="🚀"
            title="Real-World System Design Domains"
            subtitle="Scaling prompts into production systems"
            definition="In production applications, prompt engineering ceases being mere 'text input' and becomes a core module of application architecture. You are defining the behavior of stateless servers. Instead of single prompts, enterprise pipelines orchestrate multiple LLM calls: 'Agentic reasoning' to plan, 'RAG integration' to search, and 'Structured Data extraction' to guarantee JSON schema outputs."
            analogy="A developer prompt is a chisel used to craft a single statue. An enterprise prompt pipeline is a factory assembly line producing a thousand identical statues an hour."
            seniorTip="When bridging frontends and LLMs, use strict output schema guarantees. Instruct the LLM to 'RESPOND ONLY IN EXACT JSON SCHEMA MATCHING: {schema} AND DO NOT ADD MARKDOWN WRAPPERS OR PADDING TEXT.' This prevents parsing errors in production. Tools like OpenAI's structured outputs or LangChain output parsers strictly enforce this."
            defaultOpen
          >
            <!-- Navigation Grid -->
            <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 mb-4 mt-4">
              <button v-for="(app, i) in appDomains" :key="i" @click="activeApp = activeApp === i ? null : i" class="p-3 rounded-xl text-center text-xs border transition-all" :class="activeApp === i ? 'bg-indigo-100 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 border-indigo-300 dark:border-indigo-700' : 'text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800/50 border-gray-200 dark:border-white/5'">
                <div class="text-xl mb-1">{{ app.icon }}</div>
                {{ app.name }}
              </button>
            </div>

            <!-- Detail View -->
            <div v-if="activeApp !== null" class="p-6 rounded-2xl bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-white/5 animate-fade-in shadow-md">
              <div class="flex items-center gap-3 mb-4">
                <span class="text-3xl">{{ appDomains[activeApp].icon }}</span>
                <div>
                  <h4 class="font-bold text-gray-900 dark:text-white text-lg">{{ appDomains[activeApp].name }}</h4>
                  <p class="text-xs text-gray-500 uppercase tracking-widest mt-0.5 font-semibold">Key AI Modules</p>
                </div>
              </div>
              
              <div class="flex flex-wrap gap-2">
                <span v-for="(mod, j) in appDomains[activeApp].modules" :key="j" class="px-3 py-1.5 rounded-lg text-xs bg-indigo-50 dark:bg-indigo-900/10 border border-indigo-100 dark:border-indigo-800/20 text-indigo-600 dark:text-indigo-400 font-medium">
                  {{ mod }}
                </span>
              </div>
              
              <div class="mt-5 p-4 bg-indigo-50 dark:bg-indigo-900/10 border border-indigo-100 dark:border-indigo-800/20 rounded-xl">
                <p class="text-sm font-semibold text-gray-900 dark:text-white mb-1">Architecture Impact</p>
                <p class="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                  Each module above represents a microservice where the core logic is driven by a system prompt. An LLM acts as the routing engine, parsing unstructured user inputs and translating them into deterministic API calls and structured JSON that standard frontend components can safely render.
                </p>
              </div>
            </div>
          </ConceptCard>
        </template>

        <!-- ==================== QUIZ ==================== -->
        <template v-if="activeSection === 'quiz'">
          <ConceptCard
            id="knowledge-check"
            icon="✅"
            title="Knowledge Validation Lab"
            subtitle="Test your comprehension of prompt mechanics and transformers"
            definition="The following simulation validates your retention of AI architectures, token-context relations, and enterprise-grade prompt strategies."
            analogy="Like a compiler checking your syntax before runtime, this quiz parses your conceptual understanding."
            seniorTip="The best prompt engineers are often systems thinkers who understand both linguistic nuance and strict programmatic constraints."
            defaultOpen
          >
            <!-- Quiz Active -->
            <div v-if="quizFinished" class="p-10 rounded-2xl bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-white/5 text-center mt-4">
              <div class="text-5xl mb-4">{{ quizPercent >= 70 ? '🎉' : '📖' }}</div>
              <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">{{ quizScore }}/{{ quizData.length }} Correct</h3>
              <span class="inline-block px-3 py-1 text-xs font-bold rounded-full uppercase" :class="{'bg-emerald-100 text-emerald-600': quizPercent >= 90, 'bg-indigo-100 text-indigo-600': quizPercent >= 70 && quizPercent < 90, 'bg-red-100 text-red-600': quizPercent < 50}">{{ quizGrade }} Level</span>
              <button @click="restartQuiz" class="mt-5 px-6 py-2.5 rounded-xl bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 transition-colors">Retake Quiz</button>
            </div>
            <div v-else class="mt-4">
              <div class="flex justify-between items-center mb-3">
                <span class="text-xs text-gray-400">Question {{ currentQ + 1 }} of {{ quizData.length }}</span>
                <span class="text-xs font-semibold text-emerald-500">{{ quizScore }} correct</span>
              </div>
              <div class="w-full h-1 bg-gray-200 dark:bg-white/5 rounded-full overflow-hidden mb-5">
                <div class="h-full bg-indigo-500 rounded-full transition-all duration-600" :style="{ width: ((currentQ + 1) / quizData.length * 100) + '%' }"></div>
              </div>
              <div class="p-6 rounded-2xl bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-white/5">
                <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-5 leading-relaxed">{{ quizData[currentQ].q }}</h3>
                <div class="space-y-2">
                  <button v-for="(opt, i) in quizData[currentQ].options" :key="i" @click="selectQuizAnswer(i)" class="w-full flex items-center gap-3 p-3 rounded-xl border text-left text-sm transition-all" :class="quizOptionClass(i)" :disabled="quizSelected !== null">
                    <span class="w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-bold flex-shrink-0" :class="quizSelected !== null && i === quizData[currentQ].correct ? 'border-emerald-500 bg-emerald-100 text-emerald-600' : 'border-gray-300 dark:border-gray-600 text-gray-400'">{{ String.fromCharCode(65 + i) }}</span>
                    {{ opt }}
                  </button>
                </div>
                <!-- Explanation -->
                <div v-if="quizSelected !== null" class="mt-4 p-4 rounded-xl bg-indigo-50 dark:bg-indigo-900/10 border-l-3 border-indigo-500">
                  <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{{ quizData[currentQ].explanation }}</p>
                </div>
                <!-- Next Button -->
                <div v-if="quizSelected !== null" class="flex justify-end mt-4">
                  <button @click="nextQuestion" class="px-5 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700">Next →</button>
                </div>
              </div>
            </div>
          </ConceptCard>
        </template>

        <!-- ==================== FINAL CARD ==================== -->
        <template v-if="activeSection === 'final'">
          <div class="bg-gradient-to-br from-indigo-900 to-purple-900 rounded-2xl p-10 md:p-14 text-center text-white shadow-xl relative overflow-hidden">
            <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
            <div class="text-5xl mb-4">🎯</div>
            <h2 class="text-2xl md:text-3xl font-bold mb-3 tracking-tight">Core Truth</h2>
            <p class="text-indigo-200 max-w-md mx-auto leading-relaxed">
              Prompt Engineering is not about clever tricks.
              <br/>
              <span class="font-semibold text-white">It is about designing clarity for probabilistic systems.</span>
            </p>
          </div>
        </template>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import SectionNav from './SectionNav.vue'
import ConceptCard from './ConceptCard.vue'

// ==================== Section Navigation ====================
const sections = [
  { id: 'intro', label: 'Why Prompt Engineering', icon: '⚡' },
  { id: 'ai-evolution', label: 'AI Evolution', icon: '🧬' },
  { id: 'tokens', label: 'Tokens & Context', icon: '🔤' },
  { id: 'anatomy', label: 'Anatomy of a Prompt', icon: '🏗️' },
  { id: 'rules', label: 'Golden Rules', icon: '📐' },
  { id: 'frameworks', label: 'Frameworks', icon: '🧩' },
  { id: 'practice', label: 'Practice Lab', icon: '🔬' },
  { id: 'applications', label: 'Real-World Apps', icon: '🚀' },
  { id: 'quiz', label: 'Knowledge Check', icon: '✅' },
  { id: 'final', label: 'Core Truth', icon: '🎯' },
]

const activeSection = ref('intro')
function setSection(id) {
  activeSection.value = id
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

// ==================== Shared Data Objects ====================
const useCases = [
  { label: 'Text Generation', tool: 'ChatGPT, Claude', icon: '📝' },
  { label: 'Image Generation', tool: 'DALL·E, Midjourney', icon: '🎨' },
  { label: 'Code Writing', tool: 'Copilot, Cursor', icon: '💻' },
  { label: 'Data Analysis', tool: 'Code Interpreter', icon: '📊' },
]

const architectures = [
  { year: '~2015', name: 'RNN', full: 'Recurrent Neural Networks', desc: 'Sequential processing with weak memory. Suffered from vanishing gradient problem — couldn\'t handle long context.', status: 'legacy', color: '#ef4444' },
  { year: '~2016', name: 'LSTM', full: 'Long Short-Term Memory', desc: 'Introduced gating mechanism to decide what to remember and forget. Better memory but still slow and inefficient.', status: 'improved', color: '#f59e0b' },
  { year: '2017', name: 'Transformer', full: '"Attention Is All You Need"', desc: 'Parallel processing with self-attention. Foundation of all modern Generative Pre-trained Transformers (GPT).', status: 'current', color: '#10b981' },
]

const tokenInput = ref('Prompt engineering is powerful')
const computedTokens = computed(() => {
  const words = tokenInput.value.split(/\s+/).filter(Boolean)
  const tokens = []
  const colors = ['#6366f1', '#f59e0b', '#10b981', '#ef4444', '#8b5cf6', '#3b82f6', '#ec4899']
  words.forEach((word, i) => {
    if (word.length > 7) {
      const mid = Math.ceil(word.length * 0.6)
      tokens.push({ text: word.slice(0, mid), color: colors[i % colors.length] })
      tokens.push({ text: word.slice(mid), color: colors[(i + 1) % colors.length] })
    } else {
      tokens.push({ text: word, color: colors[i % colors.length] })
    }
  })
  return tokens
})

const contextSlider = ref(30)
const promptComponents = [
  { key: 'role', label: 'Role / Persona', color: '#6366f1', desc: 'Defines identity and expertise level.', placeholder: 'Act as a senior data...', example: 'Act as a senior data scientist.' },
  { key: 'context', label: 'Context', color: '#f59e0b', desc: 'Why the task is needed and background.', placeholder: 'For a quarterly meeting...', example: 'For a quarterly board meeting.' },
  { key: 'task', label: 'Task', color: '#10b981', desc: 'Verb-driven precise instruction.', placeholder: 'Summarize the data...', example: 'Summarize findings.' },
  { key: 'constraints', label: 'Constraints', color: '#ef4444', desc: 'What NOT to do, structural limits.', placeholder: 'Avoid jargon...', example: 'Do not use jargon, max 200 words.' },
  { key: 'format', label: 'Output Format', color: '#3b82f6', desc: 'The exact structural shape required.', placeholder: 'Format as JSON...', example: 'Output as a markdown table.' },
]

const goldenRules = [
  { num: '01', title: 'Be Specific and Explicit', desc: 'Specificity minimizes hallucination space. Use direct verbs.', color: '#6366f1' },
  { num: '02', title: 'Use Delimiters', desc: 'Block off content using XML tags or markdown so logic stays isolated.', color: '#f59e0b' },
  { num: '03', title: 'Few-Shot Learning', desc: 'Provide 3 examples of inputs and ideal outputs. Best strategy for schema adherence.', color: '#10b981' },
  { num: '04', title: 'Chain of Thought', desc: 'Prompt the model to "explain your reasoning step-by-step". Greatly minimizes logic errors.', color: '#ef4444' },
]

const activeCompare = ref(0)
const compareExamples = [
  { label: 'Blog Post', bad: 'Write about coffee.', good: 'ROLE: Food blogger\nCONTEXT: Writing for Gen-Z\nTASK: 500-word persuasive post on origins of organic coffee\nFORMAT: Markdown headers' },
  { label: 'Code Review', bad: 'Review my code.', good: 'Act as a Sr. Architect. Review this code strictly for: security flaws, O(n) performance traits, and PEP 8 format. Return as tabular data.' },
]

const activeFramework = ref('rtf')
const rtfItems = [
  { letter: 'R', word: 'Role', desc: 'Persona', color: '#6366f1' },
  { letter: 'T', word: 'Task', desc: 'Action', color: '#f59e0b' },
  { letter: 'F', word: 'Format', desc: 'Output', color: '#10b981' },
]
const createItems = [
  { letter: 'C', word: 'Character', desc: 'Persona', color: '#6366f1' },
  { letter: 'R', word: 'Request', desc: 'Task', color: '#ef4444' },
  { letter: 'E', word: 'Examples', desc: 'Multi-shot', color: '#f59e0b' },
  { letter: 'A', word: 'Adjustments', desc: 'Constraints', color: '#10b981' },
  { letter: 'T', word: 'Type', desc: 'Format', color: '#3b82f6' },
  { letter: 'E', word: 'Extras', desc: 'Context', color: '#8b5cf6' },
]

const builderParts = reactive({ role: '', context: '', task: '', constraints: '', format: '' })
const showPreview = ref(false)
const builderFilledCount = computed(() => Object.values(builderParts).filter(v => v.trim()).length)
const builderQuality = computed(() => builderFilledCount.value === 0 ? 'Empty' : builderFilledCount.value <= 4 ? 'Good' : 'Pro')
const builderQualityColor = computed(() => builderFilledCount.value === 5 ? '#10b981' : '#f59e0b')
const assembledPrompt = computed(() => promptComponents.filter(c => builderParts[c.key].trim()).map(c => builderParts[c.key].trim()).join('\n\n'))
function fillBuilderExample() { promptComponents.forEach(c => builderParts[c.key] = c.example) }

const activeApp = ref(null)
const appDomains = [
  { name: 'E-Commerce', icon: '🛒', modules: ['Auth flow', 'Product browsing', 'Cart & checkout', 'Payments', 'Order tracking', 'Vendor dashboard', 'AI recommendations', 'Fraud detection'] },
  { name: 'HealthTech', icon: '🏥', modules: ['Patient profiles', 'Medical history', 'Appointments', 'Video consultation', 'Digital prescriptions', 'AI symptom analysis', 'Privacy compliance'] },
  { name: 'EdTech', icon: '📚', modules: ['Courses', 'Live classes', 'Assignments', 'AI quizzes', 'Learning paths', 'Gamification', 'Instructor analytics'] },
  { name: 'FinTech', icon: '💰', modules: ['KYC workflows', 'Wallet management', 'P2P transfers', 'Fraud detection', 'AI financial insights', 'Budgeting', 'Regulatory reporting'] },
  { name: 'Social Media', icon: '💬', modules: ['Content creation', 'Feed algorithms', 'AI moderation', 'Monetization', 'Community mgmt', 'Real-time notifications', 'Safety systems'] },
  { name: 'Travel', icon: '✈️', modules: ['Search & filtering', 'Booking engine', 'Payments', 'AI recommendations', 'Price forecasting', 'Provider dashboards'] },
  { name: 'Food Delivery', icon: '🍕', modules: ['Real-time tracking', 'AI route optimization', 'Demand forecasting', 'Vendor dashboards', 'Subscriptions', 'Fraud detection'] },
  { name: 'Entertainment', icon: '🎬', modules: ['Streaming architecture', 'AI recommendations', 'Monetization', 'DRM', 'Content moderation', 'Adaptive bitrate'] },
  { name: 'Productivity', icon: '📊', modules: ['Task management', 'Time tracking', 'AI assistant', 'Workflow automation', 'Predictive analytics', 'Enterprise admin'] },
  { name: 'Real Estate', icon: '🏠', modules: ['Property listing', 'Map discovery', 'AI price prediction', 'Investment insights', 'Legal workflows'] },
  { name: 'Logistics', icon: '🚚', modules: ['Inventory mgmt', 'Warehouse ops', 'Route optimization', 'Fleet tracking', 'AI demand forecasting', 'Anomaly detection'] },
]

const quizData = [
  {
    q: 'What type of AI requires strong prompt engineering?',
    options: ['Discriminative AI', 'Generative AI', 'Reinforcement AI', 'Symbolic AI'],
    correct: 1,
    explanation: 'Generative AI creates new content (text, images, code) and relies heavily on well-structured prompts to produce quality outputs.',
  },
  {
    q: 'What does AI actually process instead of words?',
    options: ['Characters', 'Sentences', 'Tokens', 'Paragraphs'],
    correct: 2,
    explanation: "AI reads tokens — which can be full words, parts of words, characters, or prefixes/suffixes. 'playing' becomes 'play' + 'ing'.",
  },
  {
    q: 'Which architecture is the foundation of modern LLMs like GPT & Claude?',
    options: ['RNN', 'LSTM', 'CNN', 'Transformer'],
    correct: 3,
    explanation: 'Transformers (2017) introduced parallel processing and attention mechanisms, enabling models to understand entire sentences simultaneously.',
  },
  {
    q: "What is the 'Context Window' in AI?",
    options: ['The UI window of the chat', 'Maximum tokens a model can remember at once', 'The training dataset size', 'The number of users online'],
    correct: 1,
    explanation: "Context Window = maximum tokens a model can hold in memory. Like a blackboard — when it fills up, older content gets erased.",
  },
  {
    q: "Which prompting technique asks the model to 'think step-by-step'?",
    options: ['Zero-shot', 'Few-shot', 'Chain of Thought', 'RTF Framework'],
    correct: 2,
    explanation: 'Chain of Thought (CoT) prompting guides the model through step-by-step reasoning, dramatically improving accuracy on logic and math problems.',
  },
  {
    q: "What does the 'R' in the RTF framework stand for?",
    options: ['Result', 'Role', 'Request', 'Refine'],
    correct: 1,
    explanation: "RTF = Role, Task, Format. It's a simple, fast framework for structuring professional prompts.",
  },
  {
    q: 'Why should you use delimiters in prompts?',
    options: ['To make prompts longer', 'To separate instruction from data', 'To confuse the model', 'For aesthetic purposes'],
    correct: 1,
    explanation: 'Delimiters (triple quotes, XML tags, dashes) clearly separate your instructions from the data, preventing confusion and improving accuracy.',
  },
  {
    q: 'What is the PRIMARY factor in output quality?',
    options: ['Paid vs Free model version', 'Internet speed', 'Prompt structure and clarity', 'Time of day'],
    correct: 2,
    explanation: 'Output Quality = Prompt Quality. A well-structured prompt on a free model often outperforms a vague prompt on a paid model.',
  },
]
const currentQ = ref(0)
const quizSelected = ref(null)
const quizScore = ref(0)
const quizFinished = ref(false)
const quizPercent = computed(() => Math.round((quizScore.value / quizData.length) * 100))
const quizGrade = computed(() => quizPercent.value >= 70 ? 'Advanced' : 'Beginner')

function selectQuizAnswer(idx) {
  if (quizSelected.value !== null) return;
  quizSelected.value = idx;
  if (idx === quizData[currentQ.value].correct) quizScore.value++;
}
function nextQuestion() {
  if (currentQ.value < quizData.length - 1) { currentQ.value++; quizSelected.value = null; }
  else quizFinished.value = true;
}
function restartQuiz() { currentQ.value = 0; quizSelected.value = null; quizScore.value = 0; quizFinished.value = false; }
function quizOptionClass(i) {
  if (quizSelected.value === null) return 'bg-white dark:bg-white/[0.03] border-gray-200 dark:border-white/8';
  if (i === quizData[currentQ.value].correct) return 'bg-emerald-50 dark:bg-emerald-900/10 border-emerald-300 dark:border-emerald-700 text-emerald-700 dark:text-emerald-400';
  if (quizSelected.value === i) return 'bg-red-50 dark:bg-red-900/10 border-red-300 dark:border-red-700 text-red-700 dark:text-red-400';
  return 'opacity-50';
}
</script>
