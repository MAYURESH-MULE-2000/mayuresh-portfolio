<template>
  <div class="learn-module min-h-screen">
    <!-- Header -->
    <div class="px-4 md:px-8 py-8 pb-4 max-w-6xl mx-auto">
      <a href="/learn/ai-engineer" class="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors mb-4">
        ← Back to Curriculum
      </a>
      <div class="flex items-center gap-3 mb-2">
        <span class="text-3xl">⚙️</span>
        <h1 class="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">M6.2 MLOps Pipelines</h1>
      </div>
      <p class="text-gray-600 dark:text-gray-400 text-sm md:text-base max-w-2xl">
        Docker, Airflow, and DAGs. Escaping 'It works on my machine' by building automated, reproducible AI assembly lines.
      </p>
    </div>

    <!-- Layout: Nav + Content -->
    <div class="px-4 md:px-8 max-w-6xl mx-auto flex flex-col lg:flex-row gap-6 pb-16">
      <SectionNav
        :sections="sections"
        :activeSection="activeSection"
        activeColor="bg-slate-600"
        @select="setSection"
        class="lg:w-64 flex-shrink-0"
      />

      <div class="flex-1 min-w-0 space-y-8">
        
        <!-- ==================== 1. CONCEPT OVERVIEW ==================== -->
        <template v-if="activeSection === 'overview'">
          <div class="bg-gradient-to-br from-slate-800 to-gray-900 rounded-2xl p-8 md:p-12 text-center text-white shadow-xl relative overflow-hidden group mb-8">
            <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-slate-400 via-gray-400 to-zinc-500"></div>
            <div class="text-6xl mb-6 transform group-hover:scale-110 transition-transform duration-500">⚙️</div>
            <h2 class="text-3xl md:text-4xl font-bold mb-4 tracking-tight">1. Concept Overview</h2>
            <p class="text-slate-200 mb-8 max-w-lg mx-auto">In a real enterprise, your ML Model code makes up roughly 5% of the codebase. The other 95% is plumbing: moving data securely, scheduling training jobs, and containerizing software.</p>
          </div>

          <ConceptCard
            id="overview-mlops"
            icon="🧠"
            title="The Factory Floor"
            subtitle="From artisanal to industrial"
            definition="MLOps (Machine Learning Operations) is a set of practices that aims to deploy and maintain machine learning models reliably and efficiently. It combines Data Engineering, ML, and DevOps. Its core tenets are Automation (No manual clicking run), Reproducibility (Same code = exact same model output), and Versioning (Tracking which dataset trained which model)."
            analogy="A hobbyist car builder (Jupyter Notebook) builds one car in their garage over a month. Ford Motors (MLOps) builds an assembly line that automatically stamps out 1,000 perfectly identical cars a day without human intervention."
            seniorTip="Stop sending people your Jupyter Notebooks. The gold standard for modern AI engineering is delivering a Dockerfile attached to a git repository."
            defaultOpen
          >
          </ConceptCard>
        </template>

        <!-- ==================== 2. INTUITION FIRST ==================== -->
        <template v-if="activeSection === 'intuition'">
          <ConceptCard
            id="intuition"
            icon="💡"
            title="Mental Models: The Shipping Container"
            subtitle="Dockerization"
            definition="If you build an AI app on a Mac using Python 3.10 and PyTorch 2.1, and hand it to a co-worker on Windows with Python 3.8, it will crash. Docker solves this by letting you build a 'virtual box' that contains your code PLUS an identical mini-Operating System and all exact dependencies. This box runs identically on any machine in the universe."
            defaultOpen
          >
          </ConceptCard>
        </template>

        <!-- ==================== 3. TECHNICAL DEEP DIVE ==================== -->
        <template v-if="activeSection === 'deep-dive'">
          <ConceptCard
            id="deep-dive"
            icon="🔬"
            title="DAGs (Directed Acyclic Graphs)"
            subtitle="The order of operations"
            definition="A DAG is a flowchart that only moves forward (meaning it has no infinite loops). Tools like Apache Airflow use DAGs to orchestrate pipelines. Example DAG: Fetch Data -> Clean Data -> Train Model. If 'Clean Data' fails because the database is offline, the DAG halts entirely, preventing a garbage model from accidentally overwriting production."
            defaultOpen
          >
             <div class="mt-4 p-4 rounded-xl bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-sm">
                <ul class="space-y-3 dark:text-gray-300">
                    <li><strong class="text-slate-600 dark:text-slate-400 block mb-1">CI/CD (Continuous Integration / Continuous Deployment):</strong></li>
                    <li>When you push code to GitHub, a CI/CD pipeline starts.</li>
                    <li>It automatically builds your Docker image, runs PyTest unit tests on your ML code, and if tests pass, automatically swaps out the live servers with the new code. Zero downtime.</li>
                </ul>
             </div>
          </ConceptCard>
        </template>

        <!-- ==================== 4. VISUALIZATION ==================== -->
        <template v-if="activeSection === 'visualization'">
          <ConceptCard
            id="viz"
            icon="👁️"
            title="A Standard MLOps Pipeline"
            subtitle="Automating the lifecycle"
            defaultOpen
          >
             <div class="mt-4 flex flex-col p-6 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 font-mono text-sm leading-tight text-gray-500 overflow-x-auto">
                
                <div class="flex items-center gap-4 border-b border-gray-200 dark:border-gray-800 pb-4 mb-4">
                    <div class="p-2 border border-blue-400 rounded bg-blue-50 dark:bg-blue-900/10 text-center">
                        <span class="font-bold text-xs">Trigger</span><br>
                        Cron (Every Sunday)
                    </div>
                    <div>➡️</div>
                    <div class="p-2 border border-gray-400 rounded text-center">
                        <span class="font-bold text-xs">Fetch Data</span><br>
                        Read new CSV
                    </div>
                    <div>➡️</div>
                    <div class="p-2 border border-gray-400 rounded text-center">
                        <span class="font-bold text-xs">Transform</span><br>
                        Drop Nulls, Scale
                    </div>
                </div>

                <div class="flex items-center gap-4 mb-4 ml-8">
                    <div>↘️</div>
                    <div class="p-2 border-2 border-emerald-500 rounded bg-emerald-50 dark:bg-emerald-900/10 text-center shadow-lg">
                        <span class="font-bold text-emerald-700 dark:text-emerald-400 text-xs">Train Model</span><br>
                        GridSearch CV
                    </div>
                    <div>➡️</div>
                    <div class="p-2 border border-orange-400 rounded bg-orange-50 dark:bg-orange-900/10 text-center">
                        <span class="font-bold text-xs">Evaluate</span><br>
                        Is F1 > 0.85?
                    </div>
                </div>

                <div class="flex items-center gap-4 ml-32">
                    <div>↘️ If YES</div>
                    <div class="p-2 border-2 border-purple-500 rounded bg-purple-50 dark:bg-purple-900/10 text-center">
                        <span class="font-bold text-purple-700 dark:text-purple-400 text-xs">Deploy</span><br>
                        Push to DockerHub / Save Registry
                    </div>
                </div>

             </div>
             <p class="mt-4 text-xs text-center text-gray-500">Notice the logic branches. If the Evaluation step produces a bad model score, the pipeline aborts. You do not wake up with a broken AI on Monday.</p>
          </ConceptCard>
        </template>

        <!-- ==================== 5. CODE IMPLEMENTATION ==================== -->
        <template v-if="activeSection === 'code'">
          <div class="bg-gray-100 dark:bg-gray-800/50 p-6 rounded-2xl border border-gray-200 dark:border-white/10 mb-8">
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Implementation: A Serving Dockerfile</h3>
            <div class="bg-[#1e1e1e] rounded-xl overflow-hidden text-sm font-mono leading-relaxed p-4 overflow-x-auto text-gray-300 shadow-xl border border-gray-700">
<pre><code><span class="text-green-400"># This replaces your "Mac vs Windows" environment.</span>
<span class="text-green-400"># Start with a pristine Linux Ubuntu installation containing Python 3.10</span>
<span class="text-blue-400">FROM</span> python:3.10-slim

<span class="text-green-400"># Create a folder in the new operating system</span>
<span class="text-blue-400">WORKDIR</span> /app

<span class="text-green-400"># Copy your requirements text file into the OS</span>
<span class="text-blue-400">COPY</span> requirements.txt .

<span class="text-green-400"># Install the EXACT dependencies globally in the container</span>
<span class="text-blue-400">RUN</span> pip install --no-cache-dir -r requirements.txt

<span class="text-green-400"># Copy your FastAPI python script and the .onnx model weights file</span>
<span class="text-blue-400">COPY</span> main.py .
<span class="text-blue-400">COPY</span> saved_model.onnx .

<span class="text-green-400"># Expose the web port</span>
<span class="text-blue-400">EXPOSE</span> 8000

<span class="text-green-400"># Command to boot the Uvicorn web server when the container starts</span>
<span class="text-blue-400">CMD</span> [<span class="text-orange-300">"uvicorn"</span>, <span class="text-orange-300">"main:app"</span>, <span class="text-orange-300">"--host"</span>, <span class="text-orange-300">"0.0.0.0"</span>, <span class="text-orange-300">"--port"</span>, <span class="text-orange-300">"8000"</span>]
</code></pre>
            </div>
          </div>

          <ConceptCard
            id="your-turn-m6-2"
            icon="✍️"
            title="YOUR TURN: Automation Challenge"
            subtitle="Model Drift"
            defaultOpen
          >
             <div class="mt-4 space-y-4 text-sm text-gray-700 dark:text-gray-300">
              <div class="p-4 bg-white dark:bg-gray-800/80 rounded-xl border border-slate-200 dark:border-slate-800/30">
                <span class="font-bold text-slate-600 dark:text-slate-400 mb-2 block">Task 1: The Decay Problem</span>
                <p>You train an AI to predict house prices in your city on Jan 1st. It gets 95% accuracy. By Dec 31st, relying on that exact same model, the company is losing millions of dollars on bad predictions. Why did the model 'decay', and how does a DAG pipeline fix it?</p>
              </div>
            </div>
          </ConceptCard>
        </template>

        <!-- ==================== 6. MICRO-EXERCISES ==================== -->
        <template v-if="activeSection === 'exercises'">
          <ConceptCard
            id="micro-exercises-m62"
            icon="⚡"
            title="Concept Checks"
            subtitle="DAG Logic"
            defaultOpen
          >
            <div class="space-y-6 mt-4">
              <!-- Exec 1 -->
              <div>
                <h4 class="font-semibold text-gray-900 dark:text-white text-sm mb-2">1. Spot the Error</h4>
                <div class="bg-gray-900 rounded-lg p-3 font-mono text-sm text-gray-300">
                  <p class="font-sans">Assume a DAG Pipeline order: `[Deploy Container -> Fetch Data -> Train Model]`. Why is this order disastrously wrong for an MLOps platform?</p>
                </div>
              </div>
            </div>
          </ConceptCard>
        </template>

        <!-- ==================== 7. COMMON MISTAKES ==================== -->
        <template v-if="activeSection === 'mistakes'">
          <ConceptCard
            id="mistakes-m62"
            icon="⚠️"
            title="Common Beginner Mistakes"
            subtitle="Save yourself hours of debugging"
            defaultOpen
          >
             <ul class="space-y-4 mt-4 text-sm text-gray-600 dark:text-gray-400">
              <li class="p-4 bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800/30 rounded-xl">
                <strong class="text-red-700 dark:text-red-400 block mb-1">1. Not pinning dependency versions</strong>
                If your `requirements.txt` says `pandas` instead of `pandas==2.1.4`, then when your Docker container builds 6 months from now, it will pull the newest version. Breaking changes in the API could cause your entire production system to fail silently.
              </li>
              <li class="p-4 bg-slate-50 dark:bg-slate-900/10 border border-slate-200 dark:border-slate-800/30 rounded-xl">
                <strong class="text-slate-700 dark:text-slate-400 block mb-1">2. Hardcoding Data Paths</strong>
                If your training script says `pd.read_csv('C:/Users/Brad/Desktop/data.csv')`, it will instantly fail when executed on a Linux server via Airflow. Always use dynamic paths, environment variables (e.g., pulling directly from an S3 bucket), or relative container paths.
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
                <span class="font-bold text-purple-700 dark:text-purple-400 block mb-2">➡️ Phase 6.3: Kubernetes and Cloud deployments</span>
                You just learned how to put the code inside a virtual Docker box. In the next section, you will learn how to take that box, hand it to Amazon Web Services (AWS), and ask them to copy/paste the box 500 times to handle Superbowl-level traffic.
              </div>
          </ConceptCard>
        </template>

        <!-- ==================== 9. REAL-WORLD ==================== -->
        <template v-if="activeSection === 'real-world'">
           <ConceptCard
            id="real-world"
            icon="🏭"
            title="Real-World Application"
            subtitle="The A/B Test Deployment"
            defaultOpen
          >
            <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
              Netflix doesn't replace their recommendation model randomly. They use automated "Shadow Deployments" (Canary testing).
            </p>
            <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              When the Pipeline finishes testing Model V2, it deploys it alongside V1. 95% of traffic still goes to V1. 5% of invisible, background traffic is routed to V2 to ensure it doesn't crash. If metrics hit green, the pipeline dynamically scales V2 to 100% and kills V1.
            </p>
          </ConceptCard>
        </template>

        <!-- ==================== 10. MINI PROJECT ==================== -->
        <template v-if="activeSection === 'project'">
          <ConceptCard
            id="project"
            icon="🛠️"
            title="Mini Project: Registry Linking"
            subtitle="The model store"
            defaultOpen
          >
            <div class="mt-4 p-5 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-gray-800/50">
              <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
                <strong>Goal:</strong> In an automated pipeline, where does the newly trained `model.pkl` actually go so the Serving App can find it?
              </p>
              <div class="bg-gray-900 p-4 rounded-xl text-gray-300 font-mono text-xs overflow-auto">
<pre># The DAG Training step does not just save locally.
# It uploads to an AWS S3 bucket (The "Model Registry")
import boto3
s3.upload_file("model_v2.pkl", "company-ai-bucket", "prod_model.pkl")

# The Serving API is coded to ALWAYS download "prod_model.pkl" on boot.
# The pipeline simply overwrote the file in the cloud!
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
              <li><strong>MLOps</strong> bridges data science math with industrial software engineering standards.</li>
              <li><strong>Docker</strong> creates identical, isolated application environments, killing "It works on my machine".</li>
              <li><strong>DAGs</strong> (Pipelines) enforce strict sequential steps: Fetch -> Clean -> Train -> Evaluate -> Deploy.</li>
              <li>Automated pipelines protect businesses from deploying degraded models.</li>
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
              <div class="p-4 bg-slate-50 dark:bg-slate-900/10 border border-slate-200 dark:border-slate-800/20 rounded-xl">
                <h4 class="font-bold text-slate-800 dark:text-slate-400 mb-2">Tasks & Exercises</h4>
                <p class="text-gray-700 dark:text-gray-300 mb-4"><strong>Task 1 (Data Drift):</strong> Math didn't break; reality changed. Inflation happened, housing laws passed, and interest rates hiked. The Jan 1st data became irrelevant. MLOps fixes this by setting a DAG to automatically pull fresh data, retrain, and redeploy every single Sunday night, keeping the AI's "brain" updated with reality.</p>
                <p class="text-gray-700 dark:text-gray-300"><strong>Exercise 1 (DAG Error):</strong> You are deploying an empty container BEFORE you fetched data or trained a model. A DAG flows strictly left to right. It must be `Fetch -> Train -> Deploy`. Acyclic means it never flows backwards.</p>
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
  { id: 'overview', label: '1. Concept Overview', icon: '⚙️' },
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
