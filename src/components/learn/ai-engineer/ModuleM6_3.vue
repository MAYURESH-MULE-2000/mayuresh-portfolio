<template>
  <div class="learn-module min-h-screen">
    <!-- Header -->
    <div class="px-4 md:px-8 py-8 pb-4 max-w-6xl mx-auto">
      <a href="/learn/ai-engineer" class="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors mb-4">
        ← Back to Curriculum
      </a>
      <div class="flex items-center gap-3 mb-2">
        <span class="text-3xl">☁️</span>
        <h1 class="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">M6.3 Cloud & Deployment</h1>
      </div>
      <p class="text-gray-600 dark:text-gray-400 text-sm md:text-base max-w-2xl">
        AWS SageMaker, Kubernetes, Serverless GPUs, and scaling your AI from 1 user to 1 million users seamlessly.
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
            <div class="text-6xl mb-6 transform group-hover:scale-110 transition-transform duration-500">☁️</div>
            <h2 class="text-3xl md:text-4xl font-bold mb-4 tracking-tight">1. Concept Overview</h2>
            <p class="text-cyan-100 mb-8 max-w-lg mx-auto">Running AI requires massive hardware. You do not buy $15,000 graphics cards; you rent them by the second from Amazon, Google, or Microsoft to perfectly match your traffic.</p>
          </div>

          <ConceptCard
            id="overview-cloud"
            icon="🧠"
            title="The Infinite Data Center"
            subtitle="Scaling horizontally"
            definition="Cloud Deployment is the act of pushing your Docker container (from M6.2) to platforms like AWS SageMaker or a Kubernetes cluster. These platforms wrap your container in software that constantly monitors traffic. If 10,000 users log on, the cloud automatically rents 50 more GPUs, clones your Docker container 50 times, distributes the traffic, and then deletes them when the users log off."
            analogy="Imagine owning a restaurant where the kitchen physically expands, hiring 10 new chefs instantly during the 6 PM dinner rush, and then physically shrinking back down at 10 PM so you don't have to pay the extra chefs to stand around doing nothing."
            seniorTip="Do not build your own Kubernetes clusters for AI unless you are a massive corporation. Use managed services like AWS SageMaker, Modal, or Baseten. The DevOps overhead of raw Kubernetes will drain your entire team."
            defaultOpen
          >
          </ConceptCard>
        </template>

        <!-- ==================== 2. INTUITION FIRST ==================== -->
        <template v-if="activeSection === 'intuition'">
          <ConceptCard
            id="intuition"
            icon="💡"
            title="Mental Models: The Traffic Cop"
            subtitle="Load Balancing"
            definition="A 'Load Balancer' is the very first machine a user hits. If you have 5 clones of your AI server running, the Load Balancer checks which server is currently busy calculating math, and re-routes the incoming user request to an idle server. It ensures no single GPU gets overwhelmed."
            defaultOpen
          >
          </ConceptCard>
        </template>

        <!-- ==================== 3. TECHNICAL DEEP DIVE ==================== -->
        <template v-if="activeSection === 'deep-dive'">
          <ConceptCard
            id="deep-dive"
            icon="🔬"
            title="Serverless vs Provisioned"
            subtitle="The Cloud Economics"
            definition="1. Provisioned: You rent an AWS EC2 Server 24/7. You pay $500/month even if 0 users visit your site. It is always warm and ready instantly. <br>2. Serverless: The servers are turned completely OFF. When a user clicks, AWS quickly boots the server, processes the AI request, and turns it off. You pay $0.0001 per request. The catch? The 'Cold Start'."
            defaultOpen
          >
             <div class="mt-4 p-4 rounded-xl bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-sm">
                <ul class="space-y-3 dark:text-gray-300">
                    <li><strong class="text-cyan-600 dark:text-cyan-400 block mb-1">Cold Starts in AI:</strong></li>
                    <li>If an AI server is completely off, turning it on means booting an Operating System, loading Python, and loading a 10GB neural network from the hard drive to the GPU.</li>
                    <li>This can take 30+ seconds. The very first user will stare at a loading screen for 30 seconds (Cold Start). Subsequent users will get instant answers while the server is warm.</li>
                </ul>
             </div>
          </ConceptCard>
        </template>

        <!-- ==================== 4. VISUALIZATION ==================== -->
        <template v-if="activeSection === 'visualization'">
          <ConceptCard
            id="viz"
            icon="👁️"
            title="Horizontal Scaling Architecture"
            subtitle="Growing outward, not upward"
            defaultOpen
          >
             <div class="mt-4 flex flex-col items-center justify-center p-6 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 font-mono text-sm overflow-x-auto text-gray-500">
                <div class="text-xs text-gray-400 mb-2 font-bold uppercase tracking-widest">Incoming Traffic</div>
                <div class="flex gap-2 text-2xl mb-4">
                    🧑 🧑 🧑 🧑 🧑 🧑
                </div>
                
                <div>⬇️</div>

                <div class="w-full max-w-sm bg-cyan-100 dark:bg-cyan-900/30 border border-cyan-400 p-3 text-center rounded-lg font-bold text-cyan-800 dark:text-cyan-400 shadow-md">
                    Load Balancer (AWS ALB)
                </div>

                <div class="flex w-full max-w-md justify-between mt-4 px-8">
                    <div>↙️</div>
                    <div>⬇️</div>
                    <div>↘️</div>
                </div>

                <div class="flex w-full max-w-xl justify-between gap-4 mt-2">
                    <div class="flex-1 border-2 border-emerald-500 bg-emerald-50 dark:bg-emerald-900/10 p-4 rounded-xl text-center">
                        <span class="font-bold text-gray-700 dark:text-gray-300">Replica 1</span><br>
                        (Running Docker GPU)
                    </div>
                    <div class="flex-1 border-2 border-emerald-500 bg-emerald-50 dark:bg-emerald-900/10 p-4 rounded-xl text-center">
                        <span class="font-bold text-gray-700 dark:text-gray-300">Replica 2</span><br>
                        (Running Docker GPU)
                    </div>
                    <div class="flex-1 border-2 border-emerald-500 bg-emerald-50 dark:bg-emerald-900/10 p-4 rounded-xl text-center relative overflow-hidden">
                        <span class="font-bold whitespace-nowrap text-gray-700 dark:text-gray-300">Replica 3</span><br>
                        (Auto-booting...)
                        <div class="absolute inset-0 bg-emerald-400/20 animate-pulse"></div>
                    </div>
                </div>
             </div>
             <p class="mt-4 text-xs text-center text-gray-600 dark:text-gray-400">If average CPU usage across Replicas 1 and 2 exceeds 80%, Kubernetes automatically triggers the creation of Replica 3 to offload the pressure.</p>
          </ConceptCard>
        </template>

        <!-- ==================== 5. CODE IMPLEMENTATION ==================== -->
        <template v-if="activeSection === 'code'">
          <div class="bg-gray-100 dark:bg-gray-800/50 p-6 rounded-2xl border border-gray-200 dark:border-white/10 mb-8">
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Implementation: AWS SageMaker</h3>
            <div class="bg-[#1e1e1e] rounded-xl overflow-hidden text-sm font-mono leading-relaxed p-4 overflow-x-auto text-gray-300 shadow-xl border border-gray-700">
<pre><code><span class="text-green-400"># Imagine this Python code running in your CI/CD Pipeline</span>
<span class="text-purple-400">import</span> sagemaker
<span class="text-purple-400">from</span> sagemaker.pytorch <span class="text-purple-400">import</span> PyTorchModel

<span class="text-green-400"># 1. Point AWS to the weights file you uploaded to S3</span>
model_data = <span class="text-orange-300">'s3://my-cloud-bucket/model.tar.gz'</span>

<span class="text-green-400"># 2. Define the Model</span>
pytorch_model = PyTorchModel(
    model_data=model_data,
    role=<span class="text-orange-300">'arn:aws:iam::12345:role/sagemaker-role'</span>,
    framework_version=<span class="text-orange-300">'2.0.0'</span>,
    py_version=<span class="text-orange-300">'py310'</span>,
    entry_point=<span class="text-orange-300">'serving_script.py'</span> <span class="text-green-400"># Your actual prediction code</span>
)

<span class="text-green-400"># 3. Deploy it to the Cloud magically</span>
<span class="text-green-400"># AWS automatically spins up the hardware, installs docker, </span>
<span class="text-green-400"># gives you an HTTPS URL, and handles the load balancing.</span>
predictor = pytorch_model.deploy(
    initial_instance_count=<span class="text-emerald-300">2</span>,      <span class="text-green-400"># Keep 2 servers minimum always running</span>
    instance_type=<span class="text-orange-300">'ml.g4dn.xlarge'</span> <span class="text-green-400"># Rent specific Nvidia T4 GPUs</span>
)

print(<span class="text-orange-300">"Deployed Endpoint URL: "</span>, predictor.endpoint_name)</code></pre>
            </div>
          </div>

          <ConceptCard
            id="your-turn-m6-3"
            icon="✍️"
            title="YOUR TURN: Cloud Logic"
            subtitle="Cost Optimization"
            defaultOpen
          >
             <div class="mt-4 space-y-4 text-sm text-gray-700 dark:text-gray-300">
              <div class="p-4 bg-white dark:bg-gray-800/80 rounded-xl border border-cyan-200 dark:border-cyan-800/30">
                <span class="font-bold text-cyan-600 dark:text-cyan-400 mb-2 block">Task 1: The Idle Burn</span>
                <p>You deployed an `ml.p4d.24xlarge` server instance (contains 8x Nvidia A100 GPUs). It costs $32.00 per hour. Your app is mainly used by businessmen during 9AM - 5PM. What happens financially at 3:00 AM if you leave `initial_instance_count=1`?</p>
              </div>
            </div>
          </ConceptCard>
        </template>

        <!-- ==================== 6. MICRO-EXERCISES ==================== -->
        <template v-if="activeSection === 'exercises'">
          <ConceptCard
            id="micro-exercises-m63"
            icon="⚡"
            title="Concept Checks"
            subtitle="Scaling limits"
            defaultOpen
          >
            <div class="space-y-6 mt-4">
              <!-- Exec 1 -->
              <div>
                <h4 class="font-semibold text-gray-900 dark:text-white text-sm mb-2">1. Up vs Out</h4>
                <div class="bg-gray-900 rounded-lg p-3 font-mono text-sm text-gray-300">
                  <p class="font-sans">What is the difference between "Vertical Scaling" (Scaling Up) and "Horizontal Scaling" (Scaling Out)? Which one is preferred in modern cloud engineering?</p>
                </div>
              </div>
            </div>
          </ConceptCard>
        </template>

        <!-- ==================== 7. COMMON MISTAKES ==================== -->
        <template v-if="activeSection === 'mistakes'">
          <ConceptCard
            id="mistakes-m63"
            icon="⚠️"
            title="Common Beginner Mistakes"
            subtitle="Save yourself hours of debugging"
            defaultOpen
          >
             <ul class="space-y-4 mt-4 text-sm text-gray-600 dark:text-gray-400">
              <li class="p-4 bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800/30 rounded-xl">
                <strong class="text-red-700 dark:text-red-400 block mb-1">1. Forgetting to destroy resources</strong>
                If you run `.deploy()` while practicing AWS, and then close your laptop, AWS is still running the $10/hour GPU in their warehouse. You will wake up to a $7,000 credit card bill at the end of the month. You must explicitly run `.delete_endpoint()` when practicing.
              </li>
              <li class="p-4 bg-cyan-50 dark:bg-cyan-900/10 border border-cyan-200 dark:border-cyan-800/30 rounded-xl">
                <strong class="text-cyan-700 dark:text-cyan-400 block mb-1">2. Storing Data Locally (Stateful)</strong>
                If you construct your Python API to save user images to `C:/downloads`, and then deploy to Kubernetes horizontally, it will break. Load Balancers route User A to Server 1. If User A asks to view their image 5 seconds later, the Load Balancer might route them to Server 2. Server 2 doesn't have the file. AI APIs must be STATELESS. Save all files to an external S3 bucket database.
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
                <span class="font-bold text-purple-700 dark:text-purple-400 block mb-2">➡️ Phase 6.4: Monitoring & Logging</span>
                The model is live. Millions of predictions are happening per hour. You are totally blind. In the final module (M6.4), you will learn how to attach dashboards, metrics, and toxic-content filters to this live endpoint to ensure it isn't making catastrophic mistakes.
              </div>
          </ConceptCard>
        </template>

        <!-- ==================== 9. REAL-WORLD ==================== -->
        <template v-if="activeSection === 'real-world'">
           <ConceptCard
            id="real-world"
            icon="🏭"
            title="Real-World Application"
            subtitle="Modal and Serverless GPUs"
            defaultOpen
          >
            <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
              Modern AI startups rarely use AWS SageMaker anymore. It's too complex.
            </p>
            <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              They use platforms like <strong>Modal.com</strong> or <strong>Replicate</strong>. These platforms have masterfully solved the "Cold Start" problem. You can deploy a massive LLM Serverless. At 3 AM, you pay $0. When a user pings it, Modal boots the GPU container entirely in less than 2 seconds. The cloud landscape is evolving toward abstracting infrastructure completely away from the Data Scientist.
            </p>
          </ConceptCard>
        </template>

        <!-- ==================== 10. MINI PROJECT ==================== -->
        <template v-if="activeSection === 'project'">
          <ConceptCard
            id="project"
            icon="🛠️"
            title="Mini Project: Auto-scaling rules"
            subtitle="Setting the bounds"
            defaultOpen
          >
            <div class="mt-4 p-5 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-gray-800/50">
              <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
                <strong>Goal:</strong> Look at this Kubernetes configuration. What is the maximum amount of money this deployment could cost per hour if a DDOS attack hits it? (Assume 1 replica = $1.00/hour).
              </p>
              <div class="bg-gray-900 p-4 rounded-xl text-gray-300 font-mono text-xs overflow-auto">
<pre># Kubernetes HorizontalPodAutoscaler
spec:
  scaleTargetRef:
    name: ai-model-api
  minReplicas: 2
  maxReplicas: 50
  metrics:
  - type: Resource
    resource:
      name: cpu
      targetAverageUtilization: 70
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
              <li><strong>Horizontal Scaling</strong> (adding more clone servers) is the only way to handle infinite web traffic safely.</li>
              <li><strong>Load Balancers</strong> are the traffic cops that sit in front of your servers, distributing HTTP requests to the quietest machine.</li>
              <li><strong>Serverless deployments</strong> drop costs to zero when idle, but suffer from <strong>Cold Starts</strong> when initially booting.</li>
              <li>Never allow APIs to save data locally (Stateful) if you plan on scaling them behind a Load Balancer.</li>
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
                <p class="text-gray-700 dark:text-gray-300 mb-4"><strong>Task 1 (Idle Burn):</strong> The server stays blindly ON. During the 12 hours of night when no one is using it, you are literally burning $384 a night for the privilege of keeping the RAM warm. You must write Cron jobs or use Serverless to scale `instance_count=0` during off-hours.</p>
                <p class="text-gray-700 dark:text-gray-300 mb-4"><strong>Exercise 1 (Up vs Out):</strong> Vertical (Up) means buying a physically bigger, better computer (Upgrading 16GB RAM to 128GB). Horizontal (Out) means buying 10 cheap computers and chaining them together. Horizontal is overwhelmingly preferred because computers physically cannot get infinitely larger, but you can always just add more smaller computers.</p>
                <p class="text-gray-700 dark:text-gray-300"><strong>Project (Autoscaler):</strong><br>
                Under attack, the CPU hits 100%. The autoscaler sees it's above the `70` target limit, so it clones the server up to `maxReplicas: 50`. Thus, the max cost is $50.00/hour. It acts as a financial circuit breaker!
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
  { id: 'overview', label: '1. Concept Overview', icon: '☁️' },
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
