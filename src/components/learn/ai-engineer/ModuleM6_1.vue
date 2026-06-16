<template>
  <div class="learn-module min-h-screen">
    <!-- Header -->
    <div class="px-4 md:px-8 py-8 pb-4 max-w-6xl mx-auto">
      <a href="/learn/ai-engineer" class="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors mb-4">
        ← Back to Curriculum
      </a>
      <div class="flex items-center gap-3 mb-2">
        <span class="text-3xl">🚀</span>
        <h1 class="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">M6.1 Model Serving</h1>
      </div>
      <p class="text-gray-600 dark:text-gray-400 text-sm md:text-base max-w-2xl">
        ONNX, FastAPI, and Serialization. How to take a model out of a Jupyter Notebook and plug it into a real React app.
      </p>
    </div>

    <!-- Layout: Nav + Content -->
    <div class="px-4 md:px-8 max-w-6xl mx-auto flex flex-col lg:flex-row gap-6 pb-16">
      <SectionNav
        :sections="sections"
        :activeSection="activeSection"
        activeColor="bg-blue-500"
        @select="setSection"
        class="lg:w-64 flex-shrink-0"
      />

      <div class="flex-1 min-w-0 space-y-8">
        
        <!-- ==================== 1. CONCEPT OVERVIEW ==================== -->
        <template v-if="activeSection === 'overview'">
          <div class="bg-gradient-to-br from-blue-900 to-indigo-800 rounded-2xl p-8 md:p-12 text-center text-white shadow-xl relative overflow-hidden group mb-8">
            <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 via-indigo-400 to-cyan-500"></div>
            <div class="text-6xl mb-6 transform group-hover:scale-110 transition-transform duration-500">🚀</div>
            <h2 class="text-3xl md:text-4xl font-bold mb-4 tracking-tight">1. Concept Overview</h2>
            <p class="text-blue-100 mb-8 max-w-lg mx-auto">A Python script on your laptop is useless to a user on an iPhone. Model Serving is the act of wrapping an AI inside a Web Server so the world can talk to it.</p>
          </div>

          <ConceptCard
            id="overview-serving"
            icon="🧠"
            title="The Translation Layer"
            subtitle="Bridging Frontend and AI"
            definition="Model Serving (Inference) takes a trained model file (e.g., a `.pt` or `.onnx` file) and loads it into computer RAM. It then exposes an HTTP API endpoint (like `/predict`). When an iOS app sends JSON data to that endpoint, the server runs the math, and returns the AI's prediction back as JSON."
            analogy="The Data Scientist is the Chef in a kitchen, crafting the perfect recipe (the Model). The Chef doesn't talk to the customers. Model Serving is the Waiter (FastAPI). The Waiter takes the order from the customer's table, brings it to the kitchen, gets the food, and delivers it back to the table."
            seniorTip="Never run training code and serving code on the same server. Training is a massive, days-long batch process. Serving requires millisecond latency. They require completely different hardware profiles."
            defaultOpen
          >
          </ConceptCard>
        </template>

        <!-- ==================== 2. INTUITION FIRST ==================== -->
        <template v-if="activeSection === 'intuition'">
          <ConceptCard
            id="intuition"
            icon="💡"
            title="Mental Models: Freezing the Brain"
            subtitle="Serialization"
            definition="When you train a PyTorch model, it's alive in your RAM. If you turn off your computer, it dies. You must 'Serialize' it-freezing all the mathematical weights into a hard drive file (like `.pkl` or `.onnx`). The Serving server then 'Deserializes' that file back into RAM when it boots up."
            defaultOpen
          >
          </ConceptCard>
        </template>

        <!-- ==================== 3. TECHNICAL DEEP DIVE ==================== -->
        <template v-if="activeSection === 'deep-dive'">
          <ConceptCard
            id="deep-dive"
            icon="🔬"
            title="ONNX & Standardized Formats"
            subtitle="The universal language"
            definition="Historically, if you trained a model in PyTorch, you could only serve it using PyTorch. The industry invented ONNX (Open Neural Network Exchange). You can convert a Scikit-Learn tree, a PyTorch Neural Net, or a TensorFlow CNN all into the exact same `.onnx` file format. Then, highly optimized C++ servers run the `.onnx` file at blazing speeds, completely removing Python from the equation."
            defaultOpen
          >
             <div class="mt-4 p-4 rounded-xl bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-sm">
                <ul class="space-y-3 dark:text-gray-300">
                    <li><strong class="text-blue-600 dark:text-blue-400 block mb-1">Why remove Python?</strong></li>
                    <li>Python is famous for the GIL (Global Interpreter Lock), meaning it struggles to do multiple things simultaneously.</li>
                    <li>If 1,000 users hit your Python AI server at the exact same second, Python chokes. ONNX allows you to serve the math using raw, multi-threaded C++.</li>
                </ul>
             </div>
          </ConceptCard>
        </template>

        <!-- ==================== 4. VISUALIZATION ==================== -->
        <template v-if="activeSection === 'visualization'">
          <ConceptCard
            id="viz"
            icon="👁️"
            title="The Serving Architecture"
            subtitle="From User to GPU"
            defaultOpen
          >
             <div class="mt-4 flex flex-col items-center justify-center p-6 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 font-mono text-sm overflow-x-auto text-gray-500">
                <div class="flex flex-col md:flex-row gap-6 items-center w-full justify-center text-center">
                    
                    <div class="p-4 border-2 border-indigo-400 rounded-xl bg-indigo-50 dark:bg-indigo-900/10">
                        <span class="font-bold">Next.js Frontend</span><br>
                        <code>POST /predict</code><br>
                        <code>{"text": "I love it"}</code>
                    </div>

                    <div class="text-2xl font-bold">➡️</div>
                    
                    <div class="p-4 border-2 border-emerald-500 rounded-xl bg-emerald-50 dark:bg-emerald-900/10 max-w-sm">
                        <span class="font-bold text-gray-800 dark:text-gray-200">FastAPI Server</span>
                        <div class="text-xs text-left mt-2 p-2 bg-white dark:bg-gray-800 border rounded">
                            1. Receive JSON<br>
                            2. Clean text, Tokenize<br>
                            3. Pass to ONNX Runtime<br>
                            4. Get raw math [0.99, 0.01]<br>
                            5. Return {"sentiment": "Positive"}
                        </div>
                    </div>

                    <div class="text-2xl font-bold">➡️</div>

                    <div class="p-4 border-2 border-indigo-400 rounded-xl bg-indigo-50 dark:bg-indigo-900/10">
                        <span class="font-bold">Next.js Frontend</span><br>
                        <code>Receives JSON</code><br>
                        Displays Green Checkmark ✅
                    </div>

                </div>
             </div>
          </ConceptCard>
        </template>

        <!-- ==================== 5. CODE IMPLEMENTATION ==================== -->
        <template v-if="activeSection === 'code'">
          <div class="bg-gray-100 dark:bg-gray-800/50 p-6 rounded-2xl border border-gray-200 dark:border-white/10 mb-8">
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Implementation: A FastAPI Predict Route</h3>
            <div class="bg-[#1e1e1e] rounded-xl overflow-hidden text-sm font-mono leading-relaxed p-4 overflow-x-auto text-gray-300 shadow-xl border border-gray-700">
<pre><code><span class="text-purple-400">from</span> fastapi <span class="text-purple-400">import</span> FastAPI
<span class="text-purple-400">from</span> pydantic <span class="text-purple-400">import</span> BaseModel
<span class="text-purple-400">import</span> joblib  <span class="text-green-400"># Imagine this loads an sklearn model</span>

app = FastAPI()

<span class="text-green-400"># 1. LOAD THE MODEL ONCE WHEN THE SERVER BOOTS!</span>
model = joblib.load(<span class="text-orange-300">"spam_detector.pkl"</span>)

<span class="text-green-400"># 2. Define the expected JSON format from the React app</span>
<span class="text-blue-400">class</span> PredictRequest(BaseModel):
    message: str

<span class="text-green-400"># 3. Create the HTTP Endpoint</span>
<span class="text-purple-400">@app.post</span>(<span class="text-orange-300">"/predict"</span>)
<span class="text-blue-400">def</span> predict_spam(req: PredictRequest):
    
    <span class="text-green-400"># The model expects a 2D Array/List</span>
    prediction = model.predict([req.message])
    
    <span class="text-green-400"># 1 = Spam, 0 = Normal</span>
    is_spam = bool(prediction[<span class="text-emerald-300">0</span>] == <span class="text-emerald-300">1</span>)
    
    <span class="text-green-400"># Return JSON back to the user's phone</span>
    <span class="text-blue-400">return</span> {<span class="text-orange-300">"is_spam"</span>: is_spam}</code></pre>
            </div>
          </div>

          <ConceptCard
            id="your-turn-m6-1"
            icon="✍️"
            title="YOUR TURN: Architecture Challenge"
            subtitle="The Out-of-Memory Crash"
            defaultOpen
          >
             <div class="mt-4 space-y-4 text-sm text-gray-700 dark:text-gray-300">
              <div class="p-4 bg-white dark:bg-gray-800/80 rounded-xl border border-blue-200 dark:border-blue-800/30">
                <span class="font-bold text-blue-600 dark:text-blue-400 mb-2 block">Task 1: The Boot Bug</span>
                <p>If I accidentally put `model = joblib.load("model_weights.pkl")` INSIDE the `predict_spam` function block instead of at the top of the file, what happens when 100 users click the 'Predict' button on my website at the same time?</p>
              </div>
            </div>
          </ConceptCard>
        </template>

        <!-- ==================== 6. MICRO-EXERCISES ==================== -->
        <template v-if="activeSection === 'exercises'">
          <ConceptCard
            id="micro-exercises-m61"
            icon="⚡"
            title="Concept Checks"
            subtitle="Statelessness"
            defaultOpen
          >
            <div class="space-y-6 mt-4">
              <!-- Exec 1 -->
              <div>
                <h4 class="font-semibold text-gray-900 dark:text-white text-sm mb-2">1. Memory in APIs</h4>
                <div class="bg-gray-900 rounded-lg p-3 font-mono text-sm text-gray-300">
                  <p class="font-sans">FastAPI endpoints should be 'Stateless'. If User A sends a photo to be classified, does the server remember User A's photo when User B connects 2 seconds later?</p>
                </div>
              </div>
            </div>
          </ConceptCard>
        </template>

        <!-- ==================== 7. COMMON MISTAKES ==================== -->
        <template v-if="activeSection === 'mistakes'">
          <ConceptCard
            id="mistakes-m61"
            icon="⚠️"
            title="Common Beginner Mistakes"
            subtitle="Save yourself hours of debugging"
            defaultOpen
          >
             <ul class="space-y-4 mt-4 text-sm text-gray-600 dark:text-gray-400">
              <li class="p-4 bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800/30 rounded-xl">
                <strong class="text-red-700 dark:text-red-400 block mb-1">1. Forgetting Pre-Processing in production</strong>
                In your Jupyter notebook, you likely applied `StandardScaler` to your data, or resized your image to 224x224 before feeding it to `model`. Beginners often forget to do this in the FastAPI code. So the React app sends a 1080p image, FastAPI shoves it blindly into the model, and the server crashes with a massive PyTorch `ShapeMismatch` error.
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
                <span class="font-bold text-purple-700 dark:text-purple-400 block mb-2">➡️ Phase 6.2: MLOps Dockerization</span>
                FastAPI runs on your laptop. How do you get it into the cloud? You must package the Python code, the `.pkl` AI weights file, and the requirements together into a 'Docker' container block, which can then be booted up on AWS or Google Cloud.
              </div>
          </ConceptCard>
        </template>

        <!-- ==================== 9. REAL-WORLD ==================== -->
        <template v-if="activeSection === 'real-world'">
           <ConceptCard
            id="real-world"
            icon="🏭"
            title="Real-World Application"
            subtitle="Triton / specialized hardware"
            defaultOpen
          >
            <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
              Nvidia created the 'Triton Inference Server' for enterprise deployment.
            </p>
            <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              If your app receives 50 requests at once, executing them 1 by 1 is too slow. Triton automatically holds requests for 5 milliseconds, batches all 50 together into a single giant matrix, pushes it through the GPU in one massive mathematical wave, un-bundles the answers, and shoots them back to the 50 users simultaneously. It increases throughput by 10,000%.
            </p>
          </ConceptCard>
        </template>

        <!-- ==================== 10. MINI PROJECT ==================== -->
        <template v-if="activeSection === 'project'">
          <ConceptCard
            id="project"
            icon="🛠️"
            title="Mini Project: Security Check"
            subtitle="Safeguarding types"
            defaultOpen
          >
            <div class="mt-4 p-5 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-gray-800/50">
              <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
                <strong>Goal:</strong> If a hacker sends `{"message": 12345}` (an integer instead of a string), what protects the server from crashing when the Python model tries to tokenize a number?
              </p>
              <div class="bg-gray-900 p-4 rounded-xl text-gray-300 font-mono text-xs overflow-auto">
<pre># Look at the code implementation step 2:
class PredictRequest(BaseModel):
    message: str

# Pydantic is a library that mathematically enforces this.
# If an int comes in, Pydantic intercepts it and returns an 
# HTTP 422 Error to the user BEFORE it ever touches your AI model.
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
              <li><strong>Model Serving</strong> exposes your frozen model file via a Web API (like REST/FastAPI).</li>
              <li>Models must be loaded into memory <strong>ONCE</strong> globally at server startup.</li>
              <li>Always mirror your Training pre-processing steps in your Serving API endpoint.</li>
              <li>ONNX is an industry-standard blueprint that allows Python models to run in lightning-fast C++.</li>
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
              <div class="p-4 bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800/20 rounded-xl">
                <h4 class="font-bold text-blue-800 dark:text-blue-400 mb-2">Tasks & Exercises</h4>
                <p class="text-gray-700 dark:text-gray-300 mb-4"><strong>Task 1 (The Boot Bug):</strong> The server attempts to read and load the 5GB `.pkl` file from the hard drive 100 individual times simultaneously. It will instantly run out of memory (OOM), hit 100% CPU, and the server will crash entirely. Load weights globally on boot.</p>
                <p class="text-gray-700 dark:text-gray-300"><strong>Exercise 1 (Stateless):</strong> No. AI Endpoints should know absolutely nothing about previous calls. If you need memory (like in a Chatbot), the Client (React/iOS) must save the history and send the entire history payload to the API on every single request.</p>
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
  { id: 'overview', label: '1. Concept Overview', icon: '🚀' },
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
