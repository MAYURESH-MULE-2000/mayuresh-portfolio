<template>
  <div class="learn-module min-h-screen">
    <!-- Header -->
    <div class="px-4 md:px-8 py-8 pb-4 max-w-6xl mx-auto">
      <a href="/learn/ai-engineer" class="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors mb-4">
        ← Back to Curriculum
      </a>
      <div class="flex items-center gap-3 mb-2">
        <span class="text-3xl">🕸️</span>
        <h1 class="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">M4.1 Neural Net Foundations</h1>
      </div>
      <p class="text-gray-600 dark:text-gray-400 text-sm md:text-base max-w-2xl">
        Perceptrons, Multi-Layer Perceptrons (MLPs), Activation Functions, and introduction to PyTorch.
      </p>
    </div>

    <!-- Layout: Nav + Content -->
    <div class="px-4 md:px-8 max-w-6xl mx-auto flex flex-col lg:flex-row gap-6 pb-16">
      <SectionNav
        :sections="sections"
        :activeSection="activeSection"
        activeColor="bg-orange-600"
        @select="setSection"
        class="lg:w-64 flex-shrink-0"
      />

      <div class="flex-1 min-w-0 space-y-8">
        
        <!-- ==================== 1. CONCEPT OVERVIEW ==================== -->
        <template v-if="activeSection === 'overview'">
          <div class="bg-gradient-to-br from-orange-900 to-red-900 rounded-2xl p-8 md:p-12 text-center text-white shadow-xl relative overflow-hidden group mb-8">
            <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-400 via-red-500 to-yellow-500"></div>
            <div class="text-6xl mb-6 transform group-hover:scale-110 transition-transform duration-500">🕸️</div>
            <h2 class="text-3xl md:text-4xl font-bold mb-4 tracking-tight">1. Concept Overview</h2>
            <p class="text-orange-100 mb-8 max-w-lg mx-auto">Classical ML stops working when data becomes insanely complex (video, audio). Deep Learning aims to mimic the biological brain to solve problems no human programmer could.</p>
          </div>

          <ConceptCard
            id="overview-nn"
            icon="🧠"
            title="The Artificial Brain"
            subtitle="Biology meets Calculus"
            definition="A neural network is composed of Neurons (nodes). Each neuron receives inputs from previous neurons, multiplies them by a 'Weight' (importance), adds a 'Bias', and passes the result through an 'Activation Function' to decide if it should fire a signal to the next layer."
            analogy="Imagine an office hierarchy. Frontline workers (Input Layer) look at the data. They send memos to middle managers (Hidden Layers). If a manager receives enough strong memos that cross their threshold (Activation Function), they escalate it to the CEO (Output layer), who makes the final decision."
            seniorTip="Stop trying to 'visualize' what a 100-layer neural network is doing mathematically. At a certain point, it's just matrices flowing through space. Trust the gradients."
            defaultOpen
          >
          </ConceptCard>
        </template>

        <!-- ==================== 2. INTUITION FIRST ==================== -->
        <template v-if="activeSection === 'intuition'">
          <ConceptCard
            id="intuition"
            icon="💡"
            title="Mental Models: The Necessity of 'Squishing'"
            subtitle="Activation Functions"
            definition="If you stack 10 Linear Layers (`y = xw+b`) on top of each other, mathematically, they just collapse into a single straight line. Neural networks require non-linear Activation Functions (like ReLU or Sigmoid) between layers to introduce curves, breaks, and bends into the logic."
            analogy="Linear layers are straight train tracks. Activation functions are the joints and hinges. You cannot build a flexible robotic arm out of just straight metal bars; you need hinges between them."
            defaultOpen
          >
             <div class="mt-4 p-4 rounded-xl bg-orange-50 dark:bg-orange-900/10 border border-orange-200 dark:border-orange-800/30 text-sm">
                <strong class="text-orange-700 dark:text-orange-400 block mb-1">The King of Activations: ReLU</strong>
                ReLU stands for Rectified Linear Unit. It is incredibly simple: `max(0, x)`. If the number is negative, turn it to 0. If it's positive, leave it alone. This simple hinge is the foundation of modern AI.
             </div>
          </ConceptCard>
        </template>

        <!-- ==================== 3. TECHNICAL DEEP DIVE ==================== -->
        <template v-if="activeSection === 'deep-dive'">
          <ConceptCard
            id="deep-dive"
            icon="🔬"
            title="The Framework: PyTorch"
            subtitle="Tensors on GPUs"
            definition="PyTorch is the industry standard for Deep Learning. It does two things: 1) Provides `Tensors`, which are exactly like NumPy arrays but can run on Nvidia GPUs. 2) Provides `Autograd`, an automatic calculus engine that remembers every math operation and calculates derivatives/gradients backwards instantly."
            defaultOpen
          >
          </ConceptCard>
        </template>

        <!-- ==================== 4. VISUALIZATION ==================== -->
        <template v-if="activeSection === 'visualization'">
          <ConceptCard
            id="viz"
            icon="👁️"
            title="The Feed-Forward Network"
            subtitle="A Multi-Layer Perceptron (MLP)"
            defaultOpen
          >
             <div class="mt-4 flex flex-col items-center justify-center p-6 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 font-mono text-sm overflow-x-auto">
                <div class="flex gap-12 text-center text-gray-500">
                   <!-- Input Layer -->
                   <div class="flex flex-col gap-4">
                      <span class="font-bold text-gray-700 dark:text-gray-300">Input (3)</span>
                      <div class="w-8 h-8 rounded-full border-2 border-green-500 bg-green-100 dark:bg-green-900 mx-auto"></div>
                      <div class="w-8 h-8 rounded-full border-2 border-green-500 bg-green-100 dark:bg-green-900 mx-auto"></div>
                      <div class="w-8 h-8 rounded-full border-2 border-green-500 bg-green-100 dark:bg-green-900 mx-auto"></div>
                   </div>
                   
                   <!-- Hidden Layer 1 -->
                   <div class="flex flex-col gap-2">
                      <span class="font-bold text-gray-700 dark:text-gray-300">Hidden (4) + ReLU</span>
                      <div class="w-8 h-8 rounded-full border-2 border-blue-500 bg-blue-100 dark:bg-blue-900 mx-auto"></div>
                      <div class="w-8 h-8 rounded-full border-2 border-blue-500 bg-blue-100 dark:bg-blue-900 mx-auto"></div>
                      <div class="w-8 h-8 rounded-full border-2 border-blue-500 bg-blue-100 dark:bg-blue-900 mx-auto"></div>
                      <div class="w-8 h-8 rounded-full border-2 border-blue-500 bg-blue-100 dark:bg-blue-900 mx-auto"></div>
                   </div>

                   <!-- Output Layer -->
                   <div class="flex flex-col justify-center gap-4">
                      <span class="font-bold text-gray-700 dark:text-gray-300">Output (1)</span>
                      <div class="w-8 h-8 rounded-full border-2 border-red-500 bg-red-100 dark:bg-red-900 mx-auto"></div>
                   </div>
                </div>
                <p class="mt-6 text-xs font-sans max-w-sm text-center">Every node maps to every other node in the next layer. This is why it's called a 'Fully Connected' or 'Linear' layer.</p>
             </div>
          </ConceptCard>
        </template>

        <!-- ==================== 5. CODE IMPLEMENTATION ==================== -->
        <template v-if="activeSection === 'code'">
          <div class="bg-gray-100 dark:bg-gray-800/50 p-6 rounded-2xl border border-gray-200 dark:border-white/10 mb-8">
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Implementation: A PyTorch Model</h3>
            <div class="bg-[#1e1e1e] rounded-xl overflow-hidden text-sm font-mono leading-relaxed p-4 overflow-x-auto text-gray-300 shadow-xl border border-gray-700">
<pre><code><span class="text-purple-400">import</span> torch
<span class="text-purple-400">import</span> torch.nn <span class="text-blue-400">as</span> nn
<span class="text-purple-400">import</span> torch.nn.functional <span class="text-blue-400">as</span> F

<span class="text-green-400"># Networks are defined as Classes inheriting from nn.Module</span>
<span class="text-blue-400">class</span> SimpleMLP(nn.Module):
    <span class="text-blue-400">def</span> __init__(self):
        super().__init__()
        <span class="text-green-400"># Define the physical layers of the network</span>
        <span class="text-green-400"># e.g., (input_features, output_features)</span>
        self.fc1 = nn.Linear(<span class="text-emerald-300">3</span>, <span class="text-emerald-300">16</span>)   <span class="text-green-400"># Hidden layer 1</span>
        self.fc2 = nn.Linear(<span class="text-emerald-300">16</span>, <span class="text-emerald-300">8</span>)   <span class="text-green-400"># Hidden layer 2</span>
        self.fc3 = nn.Linear(<span class="text-emerald-300">8</span>, <span class="text-emerald-300">1</span>)    <span class="text-green-400"># Output layer</span>

    <span class="text-green-400"># The forward pass dictates how data flows THROUGH the layers</span>
    <span class="text-blue-400">def</span> forward(self, x):
        <span class="text-green-400"># Pass through layer 1, then apply ReLU activation</span>
        x = F.relu(self.fc1(x))
        <span class="text-green-400"># Pass through layer 2, then ReLU</span>
        x = F.relu(self.fc2(x))
        <span class="text-green-400"># Final output (No activation needed if predicting a raw number)</span>
        x = self.fc3(x)
        <span class="text-blue-400">return</span> x

<span class="text-green-400"># Instantiate</span>
model = SimpleMLP()
print(model)</code></pre>
            </div>
          </div>

          <ConceptCard
            id="your-turn-m4-1"
            icon="✍️"
            title="YOUR TURN: Code Tasks"
            subtitle="The Forward Pass"
            defaultOpen
          >
             <div class="mt-4 space-y-4 text-sm text-gray-700 dark:text-gray-300">
              <div class="p-4 bg-white dark:bg-gray-800/80 rounded-xl border border-orange-200 dark:border-orange-800/30">
                <span class="font-bold text-orange-600 dark:text-orange-400 mb-2 block">Task 1: Feeding the Beast</span>
                <p>Assume you have an input tensor: `data = torch.tensor([1.0, 2.0, 3.0])`. How do you pass this data through the `model` we just wrote to get a prediction?</p>
              </div>
            </div>
          </ConceptCard>
        </template>

        <!-- ==================== 6. MICRO-EXERCISES ==================== -->
        <template v-if="activeSection === 'exercises'">
          <ConceptCard
            id="micro-exercises-m41"
            icon="⚡"
            title="Concept Checks"
            subtitle="ReLU Math"
            defaultOpen
          >
            <div class="space-y-6 mt-4">
              <!-- Exec 1 -->
              <div>
                <h4 class="font-semibold text-gray-900 dark:text-white text-sm mb-2">1. Dead Neurons</h4>
                <div class="bg-gray-900 rounded-lg p-3 font-mono text-sm text-gray-300">
                  <p class="font-sans">ReLU is `max(0, x)`. If a neuron's internal math outputs a `-50`, what comes out of ReLU? How does this affect calculus gradients when multiplying backwards?</p>
                </div>
              </div>
            </div>
          </ConceptCard>
        </template>

        <!-- ==================== 7. COMMON MISTAKES ==================== -->
        <template v-if="activeSection === 'mistakes'">
          <ConceptCard
            id="mistakes-m41"
            icon="⚠️"
            title="Common Beginner Mistakes"
            subtitle="Save yourself hours of debugging"
            defaultOpen
          >
             <ul class="space-y-4 mt-4 text-sm text-gray-600 dark:text-gray-400">
              <li class="p-4 bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800/30 rounded-xl">
                <strong class="text-red-700 dark:text-red-400 block mb-1">1. Shape Mismatches between Layers</strong>
                The output of one layer MUST equal the input of the next. Notice `nn.Linear(3, 16)` flows directly into `nn.Linear(16, 8)`. If you type `nn.Linear(15, 8)`, PyTorch will crash immediately.
              </li>
              <li class="p-4 bg-orange-50 dark:bg-orange-900/10 border border-orange-200 dark:border-orange-800/30 rounded-xl">
                <strong class="text-orange-700 dark:text-orange-400 block mb-1">2. Calling `.forward()` explicitly</strong>
                Never type `model.forward(data)`. PyTorch relies on Python "magic classes". Always type `model(data)`. This triggers hidden hooks essential for backpropagation calculus.
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
                <span class="font-bold text-purple-700 dark:text-purple-400 block mb-2">➡️ Phase 4.4: Training Loops</span>
                This module just defines the <i>brain</i>. In module 4.4, you will learn the exact 5-step `for` loop required to train this brain (Zeroing gradients, Loss calculation, `.backward()`, and Optimizer stepping).
              </div>
          </ConceptCard>
        </template>

        <!-- ==================== 9. REAL-WORLD ==================== -->
        <template v-if="activeSection === 'real-world'">
           <ConceptCard
            id="real-world"
            icon="🏭"
            title="Real-World Application"
            subtitle="Transformers are just MLPs"
            defaultOpen
          >
            <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
              You might think an MLP (Multi-Layer Perceptron) is old technology. It's not.
            </p>
            <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              If you dissect ChatGPT (a Transformer network), 50% of its massive trillion-parameter architecture is just giant `nn.Linear` layers with `ReLU` or `GELU` activations. The structure you just built is the fundamental atom of AI.
            </p>
          </ConceptCard>
        </template>

        <!-- ==================== 10. MINI PROJECT ==================== -->
        <template v-if="activeSection === 'project'">
          <ConceptCard
            id="project"
            icon="🛠️"
            title="Mini Project: Trace the Shapes"
            subtitle="Mental Math"
            defaultOpen
          >
            <div class="mt-4 p-5 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-gray-800/50">
              <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
                <strong>Goal:</strong> Follow the tensor shape as it passes through.
              </p>
              <div class="bg-gray-900 p-4 rounded-xl text-gray-300 font-mono text-xs overflow-auto">
<pre># Input shape is (Batch_Size, Features). Let's say Batch=10.
# Input shape: (10, 3)

# Pass through fc1 (3, 16)
# New shape: ?

# Pass through fc2 (16, 8)
# New shape: ?

# Pass through fc3 (8, 1)
# Final shape: ?
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
              <li><strong>nn.Linear</strong> creates a fully connected matrix of weights and biases.</li>
              <li><strong>ReLU</strong> is the activation function that turns negative values to zero, adding the non-linearity required for complex learning.</li>
              <li>Always define layers in `__init__`, and data flow in `forward()`.</li>
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
              <div class="p-4 bg-orange-50 dark:bg-orange-900/10 border border-orange-200 dark:border-orange-800/20 rounded-xl">
                <h4 class="font-bold text-orange-800 dark:text-orange-400 mb-2">Tasks & Exercises</h4>
                <p class="text-gray-700 dark:text-gray-300 mb-4"><strong>Task 1 (Forward Pass):</strong> Simply type `prediction = model(data)`. Do NOT type `.forward()`. </p>
                <p class="text-gray-700 dark:text-gray-300 mb-4"><strong>Exercise 1 (Dead Neurons):</strong> ReLU output is `0`. In calculus, the derivative of a flat line (`0`) is `0`. Because Backpropagation (Chain Rule) multiplies derivatives backwards, multiplying by 0 kills the gradient entirely. The network stops learning. This is known as the "Dying ReLU" problem.</p>
                <p class="text-gray-700 dark:text-gray-300"><strong>Project (Shapes):</strong><br>
                1. `(10, 16)`<br>
                2. `(10, 8)`<br>
                3. `(10, 1)` - You fed the model 10 items, you got 10 predictions out!</p>
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
  { id: 'overview', label: '1. Concept Overview', icon: '🕸️' },
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
