<template>
  <div class="ai-engineer-hub min-h-screen">
    <!-- Header -->
    <div class="px-4 md:px-8 py-8 pb-4 max-w-6xl mx-auto">
      <a href="/learn" class="inline-flex items-center gap-1 text-sm text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors mb-4">
        ← Back to Topics
      </a>
      <div class="flex items-center gap-3 mb-2">
        <span class="text-3xl">🤖</span>
        <h1 class="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">AI Engineering Roadmap</h1>
      </div>
      <p class="text-gray-500 dark:text-gray-400 text-sm md:text-base max-w-2xl mb-6">
        From complete beginner to job-ready AI Engineer — 6 phases, 24 interactive modules, hands-on projects.
        Click any module to start learning.
      </p>

      <!-- Difficulty Filter -->
      <div class="flex flex-wrap gap-2 mb-8">
        <button
          v-for="level in levels"
          :key="level.id"
          @click="activeLevel = activeLevel === level.id ? 'all' : level.id"
          class="px-3.5 py-1.5 text-xs font-semibold rounded-full border transition-all duration-200"
          :class="activeLevel === level.id
            ? 'text-white border-transparent ' + level.activeBg
            : 'border-gray-200 dark:border-white/10 text-gray-500 dark:text-gray-400 hover:border-gray-400 dark:hover:border-white/30'"
        >
          {{ level.label }}
        </button>
      </div>
    </div>

    <!-- Phases Timeline -->
    <div class="px-4 md:px-8 max-w-6xl mx-auto pb-20">
      <div class="relative">
        <!-- Vertical timeline line (desktop) -->
        <div class="hidden lg:block absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-500 via-violet-500 to-rose-500 rounded-full"></div>

        <div class="space-y-10">
          <div
            v-for="(phase, pi) in filteredPhases"
            :key="phase.id"
            class="relative"
          >
            <!-- Timeline dot -->
            <div class="hidden lg:flex absolute left-5 top-8 w-7 h-7 rounded-full items-center justify-center ring-4 ring-white dark:ring-gray-950 z-10"
              :style="{ background: phase.color }">
              <span class="text-white text-xs font-bold">{{ phase.num }}</span>
            </div>

            <!-- Phase Card -->
            <div class="lg:ml-20 group">
              <div
                class="rounded-2xl border border-gray-200 dark:border-white/5 overflow-hidden transition-all duration-500 hover:shadow-xl hover:shadow-black/5 dark:hover:shadow-black/30"
                :style="{ borderLeftColor: phase.color, borderLeftWidth: '3px' }"
              >
                <!-- Phase Header -->
                <div class="p-6 md:p-8 relative overflow-hidden">
                  <div class="absolute inset-0 opacity-[0.03]"
                    :style="{ background: `linear-gradient(135deg, ${phase.color}, transparent)` }"></div>
                  <div class="relative">
                    <div class="flex flex-wrap items-center gap-3 mb-2">
                      <span class="px-2.5 py-0.5 text-xs font-bold rounded-full text-white" :style="{ background: phase.color }">
                        Phase {{ phase.num }}
                      </span>
                      <span class="px-2.5 py-0.5 text-xs font-medium rounded-full border border-gray-200 dark:border-white/10 text-gray-500 dark:text-gray-400">
                        {{ phase.duration }}
                      </span>
                      <span class="px-2.5 py-0.5 text-xs font-medium rounded-full" :class="phase.levelClass">
                        {{ phase.level }}
                      </span>
                    </div>
                    <h2 class="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-2">{{ phase.title }}</h2>
                    <p class="text-sm text-gray-500 dark:text-gray-400 leading-relaxed max-w-xl">{{ phase.description }}</p>

                    <!-- Tools -->
                    <div class="flex flex-wrap gap-1.5 mt-4">
                      <span v-for="tool in phase.tools" :key="tool"
                        class="px-2 py-0.5 text-xs rounded-full bg-gray-100 dark:bg-white/5 text-gray-500 dark:text-gray-400 font-mono">
                        {{ tool }}
                      </span>
                    </div>
                  </div>
                </div>

                <!-- Modules Grid -->
                <div class="px-6 md:px-8 pb-6 md:pb-8">
                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <a
                      v-for="mod in phase.modules"
                      :key="mod.id"
                      :href="mod.slug"
                      class="group/mod flex items-start gap-3 p-4 rounded-xl border border-gray-200 dark:border-white/5 bg-white/50 dark:bg-gray-900/30 hover:border-transparent hover:shadow-lg transition-all duration-300 relative overflow-hidden"
                    >
                      <div class="absolute inset-0 opacity-0 group-hover/mod:opacity-100 transition-opacity duration-500"
                        :style="{ background: `linear-gradient(135deg, ${phase.color}08, ${phase.color}15)` }"></div>
                      <div class="relative flex items-start gap-3 w-full">
                        <div class="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 text-sm font-bold"
                          :style="{ background: phase.color + '15', color: phase.color }">
                          {{ mod.code }}
                        </div>
                        <div class="flex-1 min-w-0">
                          <div class="font-semibold text-sm text-gray-900 dark:text-white group-hover/mod:text-gray-900 dark:group-hover/mod:text-white transition-colors">
                            {{ mod.title }}
                          </div>
                          <div class="text-xs text-gray-400 dark:text-gray-500 mt-0.5 leading-relaxed">
                            {{ mod.topics }}
                          </div>
                        </div>
                        <span class="text-gray-300 dark:text-gray-600 group-hover/mod:translate-x-1 transition-transform duration-200 flex-shrink-0 mt-1">→</span>
                      </div>
                    </a>
                  </div>

                  <!-- Phase Project -->
                  <div class="mt-4 p-4 rounded-xl border border-dashed border-gray-300 dark:border-white/10 bg-gray-50/50 dark:bg-white/[0.02]">
                    <div class="flex items-center gap-2">
                      <span class="text-lg">🚀</span>
                      <div>
                        <div class="text-sm font-semibold text-gray-900 dark:text-white">{{ phase.project }}</div>
                        <div class="text-xs text-gray-400 mt-0.5">{{ phase.datasets }}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const levels = [
  { id: 'all', label: 'All Levels', activeBg: 'bg-gray-900 dark:bg-white dark:text-gray-900' },
  { id: 'beginner', label: '🟢 Beginner', activeBg: 'bg-emerald-600' },
  { id: 'beginner+', label: '🔵 Beginner+', activeBg: 'bg-blue-600' },
  { id: 'intermediate', label: '🟡 Intermediate', activeBg: 'bg-amber-600' },
  { id: 'intermediate+', label: '🟠 Intermediate+', activeBg: 'bg-orange-600' },
  { id: 'advanced', label: '🔴 Advanced', activeBg: 'bg-red-600' },
]
const activeLevel = ref('all')

const phases = [
  {
    id: 'p1', num: '1', title: 'Python Foundations', color: '#10b981',
    level: 'Beginner', levelId: 'beginner', duration: '4–6 weeks',
    levelClass: 'bg-emerald-100 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400',
    description: 'Build a rock-solid Python foundation — data structures, OOP, file handling, and scientific computing with NumPy & Pandas.',
    tools: ['Python', 'Jupyter', 'NumPy', 'Pandas', 'Matplotlib'],
    datasets: 'Datasets: Titanic, Iris',
    project: 'Project: EDA on Real Dataset',
    modules: [
      { id: 'm1-1', code: '1.1', title: 'Python Basics', slug: '/learn/ai-engineer/m1-1', topics: 'Variables, types, operators, lists, dicts, control flow, functions' },
      { id: 'm1-2', code: '1.2', title: 'Python for Data', slug: '/learn/ai-engineer/m1-2', topics: 'Classes & OOP, File I/O & JSON, list comprehensions, error handling' },
      { id: 'm1-3', code: '1.3', title: 'NumPy & Pandas', slug: '/learn/ai-engineer/m1-3', topics: 'Arrays, vectorized ops, DataFrames, data loading & cleaning' },
      { id: 'm1-4', code: '1.4', title: 'Data Visualization', slug: '/learn/ai-engineer/m1-4', topics: 'Matplotlib basics, Seaborn for EDA, plotting model results' },
    ]
  },
  {
    id: 'p2', num: '2', title: 'Math & Data Fundamentals', color: '#3b82f6',
    level: 'Beginner+', levelId: 'beginner+', duration: '3–4 weeks',
    levelClass: 'bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400',
    description: 'The mathematical backbone of AI — linear algebra, statistics, calculus intuition, and data engineering essentials.',
    tools: ['NumPy', 'SciPy', 'Scikit-learn preprocessing'],
    datasets: 'Datasets: Housing prices, Customer churn',
    project: 'Project: Data Pipeline from Scratch',
    modules: [
      { id: 'm2-1', code: '2.1', title: 'Linear Algebra', slug: '/learn/ai-engineer/m2-1', topics: 'Vectors, matrices, dot products, matrix multiplication' },
      { id: 'm2-2', code: '2.2', title: 'Statistics & Probability', slug: '/learn/ai-engineer/m2-2', topics: 'Mean, variance, distributions, Bayes theorem' },
      { id: 'm2-3', code: '2.3', title: 'Calculus Intuition', slug: '/learn/ai-engineer/m2-3', topics: 'Derivatives, gradients, chain rule, loss functions' },
      { id: 'm2-4', code: '2.4', title: 'Data Engineering', slug: '/learn/ai-engineer/m2-4', topics: 'Train/val/test splits, feature engineering, normalization' },
    ]
  },
  {
    id: 'p3', num: '3', title: 'Classical Machine Learning', color: '#f59e0b',
    level: 'Intermediate', levelId: 'intermediate', duration: '5–6 weeks',
    levelClass: 'bg-amber-100 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400',
    description: 'Master the algorithms that power real-world ML — from linear regression to gradient boosting, with proper evaluation.',
    tools: ['Scikit-learn', 'XGBoost', 'Optuna'],
    datasets: 'Datasets: Kaggle Titanic, Heart disease',
    project: 'Project: End-to-end ML Pipeline + Kaggle Submission',
    modules: [
      { id: 'm3-1', code: '3.1', title: 'Supervised Learning', slug: '/learn/ai-engineer/m3-1', topics: 'Linear & logistic regression, decision trees, SVMs, XGBoost' },
      { id: 'm3-2', code: '3.2', title: 'Unsupervised Learning', slug: '/learn/ai-engineer/m3-2', topics: 'K-Means, PCA, anomaly detection, embeddings intro' },
      { id: 'm3-3', code: '3.3', title: 'Model Evaluation', slug: '/learn/ai-engineer/m3-3', topics: 'Accuracy, precision, recall, F1, ROC-AUC, cross-validation' },
      { id: 'm3-4', code: '3.4', title: 'Model Tuning', slug: '/learn/ai-engineer/m3-4', topics: 'Overfitting, hyperparameter search, regularization L1/L2' },
    ]
  },
  {
    id: 'p4', num: '4', title: 'Deep Learning & Neural Networks', color: '#f97316',
    level: 'Intermediate+', levelId: 'intermediate+', duration: '6–8 weeks',
    levelClass: 'bg-orange-100 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400',
    description: 'Dive deep into neural architectures — CNNs, RNNs, attention, and hands-on PyTorch training for vision and NLP.',
    tools: ['PyTorch', 'torchvision', 'Weights & Biases'],
    datasets: 'Datasets: MNIST, CIFAR-10, IMDb',
    project: 'Project: Image Classifier + Sentiment Analyzer',
    modules: [
      { id: 'm4-1', code: '4.1', title: 'Neural Net Foundations', slug: '/learn/ai-engineer/m4-1', topics: 'Perceptrons, layers, activation functions, backpropagation' },
      { id: 'm4-2', code: '4.2', title: 'Computer Vision', slug: '/learn/ai-engineer/m4-2', topics: 'CNNs, convolutions, transfer learning, ResNet' },
      { id: 'm4-3', code: '4.3', title: 'NLP Fundamentals', slug: '/learn/ai-engineer/m4-3', topics: 'Tokenization, embeddings, RNNs, LSTMs, attention' },
      { id: 'm4-4', code: '4.4', title: 'Training Best Practices', slug: '/learn/ai-engineer/m4-4', topics: 'Batch norm, dropout, learning rate schedules, GPU training' },
    ]
  },
  {
    id: 'p5', num: '5', title: 'LLMs & Modern AI', color: '#8b5cf6',
    level: 'Advanced', levelId: 'advanced', duration: '6–8 weeks',
    levelClass: 'bg-violet-100 dark:bg-violet-900/20 text-violet-600 dark:text-violet-400',
    description: 'The cutting edge — transformers, prompt engineering, RAG systems, vector databases, and agentic AI pipelines.',
    tools: ['HuggingFace', 'LangChain', 'OpenAI API', 'ChromaDB'],
    datasets: 'Datasets: Custom docs, Wikipedia, arXiv',
    project: 'Project: RAG Chatbot over Custom Knowledge Base',
    modules: [
      { id: 'm5-1', code: '5.1', title: 'Transformers & LLMs', slug: '/learn/ai-engineer/m5-1', topics: 'Transformer architecture, GPT/BERT/T5, HuggingFace' },
      { id: 'm5-2', code: '5.2', title: 'Prompt Engineering', slug: '/learn/ai-engineer/m5-2', topics: 'Zero/few-shot, chain-of-thought, system prompts' },
      { id: 'm5-3', code: '5.3', title: 'RAG & Vector DBs', slug: '/learn/ai-engineer/m5-3', topics: 'Embeddings, similarity search, Pinecone, FAISS' },
      { id: 'm5-4', code: '5.4', title: 'LLM Agents & Tools', slug: '/learn/ai-engineer/m5-4', topics: 'LangChain, tool use, function calling, fine-tuning' },
    ]
  },
  {
    id: 'p6', num: '6', title: 'Production & MLOps', color: '#ef4444',
    level: 'Advanced', levelId: 'advanced', duration: '4–6 weeks',
    levelClass: 'bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400',
    description: 'Ship AI to production — serving, monitoring, CI/CD, Docker, cloud deployment, and responsible AI practices.',
    tools: ['FastAPI', 'Docker', 'MLflow', 'AWS SageMaker'],
    datasets: 'Output: Deployed, live AI application',
    project: 'Capstone: Full-stack AI App, Deployed to Cloud',
    modules: [
      { id: 'm6-1', code: '6.1', title: 'Model Serving', slug: '/learn/ai-engineer/m6-1', topics: 'FastAPI, model serialization, batch vs real-time inference' },
      { id: 'm6-2', code: '6.2', title: 'MLOps Pipelines', slug: '/learn/ai-engineer/m6-2', topics: 'Experiment tracking, data versioning, CI/CD for ML' },
      { id: 'm6-3', code: '6.3', title: 'Cloud & Deployment', slug: '/learn/ai-engineer/m6-3', topics: 'AWS/GCP/Azure, serverless, Kubernetes intro' },
      { id: 'm6-4', code: '6.4', title: 'Monitoring & Safety', slug: '/learn/ai-engineer/m6-4', topics: 'Model drift, data quality, LLM guardrails, responsible AI' },
    ]
  },
]

const filteredPhases = computed(() => {
  if (activeLevel.value === 'all') return phases
  return phases.filter(p => p.levelId === activeLevel.value)
})
</script>
