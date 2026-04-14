<template>
  <div class="learn-module min-h-screen">
    <!-- Header -->
    <div class="px-4 md:px-8 py-8 pb-4 max-w-6xl mx-auto">
      <a href="/learn/ai-engineer" class="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors mb-4">
        ← Back to Curriculum
      </a>
      <div class="flex items-center gap-3 mb-2">
        <span class="text-3xl">👁️</span>
        <h1 class="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">M4.2 Computer Vision</h1>
      </div>
      <p class="text-gray-600 dark:text-gray-400 text-sm md:text-base max-w-2xl">
        Convolutional Neural Networks (CNNs). Stop looking at isolated pixels, start recognizing shapes, textures, and objects.
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
            <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 via-indigo-500 to-emerald-500"></div>
            <div class="text-6xl mb-6 transform group-hover:scale-110 transition-transform duration-500">👁️</div>
            <h2 class="text-3xl md:text-4xl font-bold mb-4 tracking-tight">1. Concept Overview</h2>
            <p class="text-blue-100 mb-8 max-w-lg mx-auto">If you feed an image into a standard Neural Network (MLP), it destroys all spatial relationships. Convolutional Neural Networks (CNNs) were invented to look at 2D grids as whole structures.</p>
          </div>

          <ConceptCard
            id="overview-cv"
            icon="🧠"
            title="Spatial Awareness"
            subtitle="The problem with MLPs"
            definition="An image is a 2D matrix of pixels. A standard MLP requires you to 'flatten' that image into a 1D list of 10,000 numbers. This destroys the fact that Pixel (1,1) is physically next to Pixel (1,2). A CNN uses a mathematical operation called a Convolution to scan the 2D image intact."
            analogy="Flattening an image is like cutting a photograph into 10,000 microscopic pieces, putting them in a single line, and asking someone what the picture is. A CNN simply looks at the unbroken photograph with a magnifying glass."
            seniorTip="Almost no one trains CNNs perfectly from scratch today. You use Transfer Learning—downloading a pre-trained ResNet model that already knows what a dog is, and fine-tuning it to your specific task (e.g., detecting tumors)."
            defaultOpen
          >
          </ConceptCard>
        </template>

        <!-- ==================== 2. INTUITION FIRST ==================== -->
        <template v-if="activeSection === 'intuition'">
          <ConceptCard
            id="intuition"
            icon="💡"
            title="Mental Models: The Flashlight"
            subtitle="Kernels and Filters"
            definition="A Convolution is simply a tiny matrix of weights (e.g., a 3x3 grid) called a 'Kernel'. We slide this 3x3 grid across the big image, stopping at every pixel to do math. The math amplifies certain patterns—like vertical lines, or sharp color changes (edges)."
            analogy="Imagine walking through a dark room with a flashlight (the kernel) that only highlights the color Red. As you sweep it across the room (stride), it builds a mental map of only the red objects (feature map)."
            defaultOpen
          >
          </ConceptCard>
        </template>

        <!-- ==================== 3. TECHNICAL DEEP DIVE ==================== -->
        <template v-if="activeSection === 'deep-dive'">
          <ConceptCard
            id="deep-dive"
            icon="🔬"
            title="Stride, Padding, and Pooling"
            subtitle="The mechanics of CNNs"
            definition="1. Stride: How many pixels the 3x3 kernel jumps after each calculation. 2. Padding: Adding a border of zeros around the image so the kernel doesn't shrink the image. 3. Max Pooling: Grabbing a 2x2 grid and keeping only the largest number, effectively shrinking the image by 50% while retaining the strongest features."
            defaultOpen
          >
             <div class="mt-4 p-4 rounded-xl bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-sm">
                <ul class="space-y-3 dark:text-gray-300">
                    <li><strong class="text-blue-600 dark:text-blue-400 block mb-1">Feature Hierarchy:</strong></li>
                    <li>Layer 1: Filters learn basic lines and edges.</li>
                    <li>Layer 2: Filters combine edges into shapes (circles, squares).</li>
                    <li>Layer 34: Filters combine shapes into absolute concepts (eyes, wheels, dog noses).</li>
                </ul>
             </div>
          </ConceptCard>
        </template>

        <!-- ==================== 4. VISUALIZATION ==================== -->
        <template v-if="activeSection === 'visualization'">
          <ConceptCard
            id="viz"
            icon="👁️"
            title="Max Pooling in Action"
            subtitle="Shrinking for invariant dominance"
            defaultOpen
          >
             <div class="mt-4 flex flex-col md:flex-row gap-8 items-center justify-center p-6 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 font-mono text-sm">
                
                <div class="text-center">
                   <div class="mb-2 font-bold text-gray-500">4x4 Feature Map</div>
                   <div class="grid grid-cols-4 gap-1 p-1 bg-gray-200 dark:bg-gray-800 rounded">
                      <div class="w-8 h-8 flex items-center justify-center bg-gray-300 dark:bg-gray-700">1</div>
                      <div class="w-8 h-8 flex items-center justify-center bg-gray-300 dark:bg-gray-700 font-bold text-red-500">5</div>
                      <div class="w-8 h-8 flex items-center justify-center bg-gray-300 dark:bg-gray-700">2</div>
                      <div class="w-8 h-8 flex items-center justify-center bg-gray-300 dark:bg-gray-700 font-bold text-blue-500">8</div>

                      <div class="w-8 h-8 flex items-center justify-center bg-gray-300 dark:bg-gray-700">4</div>
                      <div class="w-8 h-8 flex items-center justify-center bg-gray-300 dark:bg-gray-700">2</div>
                      <div class="w-8 h-8 flex items-center justify-center bg-gray-300 dark:bg-gray-700">6</div>
                      <div class="w-8 h-8 flex items-center justify-center bg-gray-300 dark:bg-gray-700">1</div>

                      <!-- bottom half -->
                      <div class="w-8 h-8 flex items-center justify-center bg-gray-300 dark:bg-gray-700 font-bold text-emerald-500">9</div>
                      <div class="w-8 h-8 flex items-center justify-center bg-gray-300 dark:bg-gray-700">0</div>
                      <div class="w-8 h-8 flex items-center justify-center bg-gray-300 dark:bg-gray-700 font-bold text-orange-500">7</div>
                      <div class="w-8 h-8 flex items-center justify-center bg-gray-300 dark:bg-gray-700">3</div>

                      <div class="w-8 h-8 flex items-center justify-center bg-gray-300 dark:bg-gray-700">3</div>
                      <div class="w-8 h-8 flex items-center justify-center bg-gray-300 dark:bg-gray-700">1</div>
                      <div class="w-8 h-8 flex items-center justify-center bg-gray-300 dark:bg-gray-700">4</div>
                      <div class="w-8 h-8 flex items-center justify-center bg-gray-300 dark:bg-gray-700">5</div>
                   </div>
                </div>

                <div class="font-bold text-gray-400">➡️ MaxPool 2x2 ➡️</div>

                <div class="text-center">
                   <div class="mb-2 font-bold text-emerald-500">2x2 Pooled</div>
                   <div class="grid grid-cols-2 gap-1 p-1 bg-gray-200 dark:bg-gray-800 rounded">
                      <div class="w-10 h-10 flex items-center justify-center bg-gray-300 dark:bg-gray-700 font-bold text-red-500 text-lg">5</div>
                      <div class="w-10 h-10 flex items-center justify-center bg-gray-300 dark:bg-gray-700 font-bold text-blue-500 text-lg">8</div>
                      <div class="w-10 h-10 flex items-center justify-center bg-gray-300 dark:bg-gray-700 font-bold text-emerald-500 text-lg">9</div>
                      <div class="w-10 h-10 flex items-center justify-center bg-gray-300 dark:bg-gray-700 font-bold text-orange-500 text-lg">7</div>
                   </div>
                </div>

             </div>
          </ConceptCard>
        </template>

        <!-- ==================== 5. CODE IMPLEMENTATION ==================== -->
        <template v-if="activeSection === 'code'">
          <div class="bg-gray-100 dark:bg-gray-800/50 p-6 rounded-2xl border border-gray-200 dark:border-white/10 mb-8">
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Implementation: A Simple CNN</h3>
            <div class="bg-[#1e1e1e] rounded-xl overflow-hidden text-sm font-mono leading-relaxed p-4 overflow-x-auto text-gray-300 shadow-xl border border-gray-700">
<pre><code><span class="text-purple-400">import</span> torch
<span class="text-purple-400">import</span> torch.nn <span class="text-blue-400">as</span> nn
<span class="text-purple-400">import</span> torch.nn.functional <span class="text-blue-400">as</span> F

<span class="text-blue-400">class</span> SimpleCNN(nn.Module):
    <span class="text-blue-400">def</span> __init__(self):
        super().__init__()
        <span class="text-green-400"># (in_channels=1 for Grayscale, out_filters=16, kernel_size=3x3)</span>
        self.conv1 = nn.Conv2d(<span class="text-emerald-300">1</span>, <span class="text-emerald-300">16</span>, kernel_size=<span class="text-emerald-300">3</span>, padding=<span class="text-emerald-300">1</span>)
        
        <span class="text-green-400"># Shrinks images by half</span>
        self.pool = nn.MaxPool2d(<span class="text-emerald-300">2</span>, <span class="text-emerald-300">2</span>)
        
        <span class="text-green-400"># A standard linear layer to make the final Yes/No decision</span>
        <span class="text-green-400"># We must flatten the 2D maps before feeding here</span>
        <span class="text-green-400"># Formula: (pixels) * (pixels) * filters</span>
        self.fc1 = nn.Linear(<span class="text-emerald-300">14</span> * <span class="text-emerald-300">14</span> * <span class="text-emerald-300">16</span>, <span class="text-emerald-300">10</span>) 

    <span class="text-blue-400">def</span> forward(self, x):
        <span class="text-green-400"># Shape in: (Batch, 1, 28, 28) - E.g. MNIST digit</span>
        
        <span class="text-green-400"># 1. Convolute -> Activate -> Pool</span>
        <span class="text-green-400"># Shape out: (Batch, 16, 14, 14)</span>
        x = self.pool(F.relu(self.conv1(x)))
        
        <span class="text-green-400"># 2. Flatten for the Linear layer</span>
        <span class="text-green-400"># Shape out: (Batch, 14*14*16) = (Batch, 3136)</span>
        x = x.view(x.size(<span class="text-emerald-300">0</span>), -<span class="text-emerald-300">1</span>) 
        
        <span class="text-green-400"># 3. Final Prediction</span>
        x = self.fc1(x)
        <span class="text-blue-400">return</span> x</code></pre>
            </div>
          </div>

          <ConceptCard
            id="your-turn-m4-2"
            icon="✍️"
            title="YOUR TURN: Code Tasks"
            subtitle="Channel Math"
            defaultOpen
          >
             <div class="mt-4 space-y-4 text-sm text-gray-700 dark:text-gray-300">
              <div class="p-4 bg-white dark:bg-gray-800/80 rounded-xl border border-blue-200 dark:border-blue-800/30">
                <span class="font-bold text-blue-600 dark:text-blue-400 mb-2 block">Task 1: RGB Images</span>
                <p>If you are processing colored photos of Cats (RGB values), what should the `in_channels` be set to in the `nn.Conv2d` layer?</p>
              </div>
            </div>
          </ConceptCard>
        </template>

        <!-- ==================== 6. MICRO-EXERCISES ==================== -->
        <template v-if="activeSection === 'exercises'">
          <ConceptCard
            id="micro-exercises-m42"
            icon="⚡"
            title="Concept Checks"
            subtitle="Pooling logic"
            defaultOpen
          >
            <div class="space-y-6 mt-4">
              <!-- Exec 1 -->
              <div>
                <h4 class="font-semibold text-gray-900 dark:text-white text-sm mb-2">1. The power of Pooling</h4>
                <div class="bg-gray-900 rounded-lg p-3 font-mono text-sm text-gray-300">
                  <p class="font-sans">Why do we want to aggressively shrink the image using `MaxPool2d`? Why not keep the image 1024x1024 the whole way through the network?</p>
                </div>
              </div>
            </div>
          </ConceptCard>
        </template>

        <!-- ==================== 7. COMMON MISTAKES ==================== -->
        <template v-if="activeSection === 'mistakes'">
          <ConceptCard
            id="mistakes-m42"
            icon="⚠️"
            title="Common Beginner Mistakes"
            subtitle="Save yourself hours of debugging"
            defaultOpen
          >
             <ul class="space-y-4 mt-4 text-sm text-gray-600 dark:text-gray-400">
              <li class="p-4 bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800/30 rounded-xl">
                <strong class="text-red-700 dark:text-red-400 block mb-1">1. The Flatten Mismatch</strong>
                The #1 crash in PyTorch CNNs happens at `x.view(flatten)`. If you calculate your pooling/padding math wrong, you might think you have 14x14 pixels left, but you actually have 13x13. When you hand it to `nn.Linear`, PyTorch throws a massive shape error. (Pro-tip: print `x.shape` right before flatten during debugging).
              </li>
              <li class="p-4 bg-orange-50 dark:bg-orange-900/10 border border-orange-200 dark:border-orange-800/30 rounded-xl">
                <strong class="text-orange-700 dark:text-orange-400 block mb-1">2. Using Softmax in the Network</strong>
                In the `forward()` pass, beginners often apply `F.softmax()` to the final output. In PyTorch, if you are doing classification, the standard Loss function (`CrossEntropyLoss`) mathematically applies Softmax internally! Doing it twice ruins the math.
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
                <span class="font-bold text-purple-700 dark:text-purple-400 block mb-2">➡️ Phase 5: Generative AI</span>
                You just learned how to turn an Image into a Classification number. In Phase 5, you'll see Generative Diffusion models, which use a 'U-Net' architecture. U-Nets take noise, shrink it using Convolutions, and then use *Transpose Convolutions* to blow the numbers back up into a full-scale generated image.
              </div>
          </ConceptCard>
        </template>

        <!-- ==================== 9. REAL-WORLD ==================== -->
        <template v-if="activeSection === 'real-world'">
           <ConceptCard
            id="real-world"
            icon="🏭"
            title="Real-World Application"
            subtitle="Translation Invariance"
            defaultOpen
          >
            <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
              Apple FaceID uses advanced CNN architectures.
            </p>
            <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              If an MLP learns your face in the center of the camera, and then you move your face to the top-right corner, the MLP breaks completely. A CNN scans the *entire* image searching for the "Eye Feature Pattern". Because of this, CNNs are "Translation Invariant"—it doesn't matter where your face is in the frame, the localized math kernel will find it.
            </p>
          </ConceptCard>
        </template>

        <!-- ==================== 10. MINI PROJECT ==================== -->
        <template v-if="activeSection === 'project'">
          <ConceptCard
            id="project"
            icon="🛠️"
            title="Mini Project: Shape Logic"
            subtitle="Do the math"
            defaultOpen
          >
            <div class="mt-4 p-5 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-gray-800/50">
              <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
                <strong>Goal:</strong> Calculate the output shape of an image passing through these layers.
              </p>
              <div class="bg-gray-900 p-4 rounded-xl text-gray-300 font-mono text-xs overflow-auto">
<pre># Incoming Image: (Channels: 3, Height: 64, Width: 64)

# 1. nn.Conv2d(..., out_channels=32, kernel=3, padding=1)
# Output Shape: (?, ?, ?)  -> Formula with padding=1 keeps size same.

# 2. nn.MaxPool2d(2, 2)
# Output Shape: (?, ?, ?)  -> Divides H and W by 2.
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
              <li><strong>Convolutions</strong> sweep a small matrix (Kernel) across an image to find patterns, remaining translation invariant.</li>
              <li><strong>Padding</strong> adds zeroes around the border so the edge pixels get processed.</li>
              <li><strong>Max Pooling</strong> cuts the resolution in half to compress the data down to its most dominant features.</li>
              <li><strong>Flattening</strong> is required at the very end to pass the 2D maps into a 1D classification layer.</li>
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
                <p class="text-gray-700 dark:text-gray-300 mb-4"><strong>Task 1 (RGB):</strong> `in_channels=3`. Color images are actually 3 layered matrices (Red, Green, Blue). Black/White (Grayscale) is 1 channel.</p>
                <p class="text-gray-700 dark:text-gray-300 mb-4"><strong>Exercise 1 (Pooling):</strong> If you kept images at 1024x1024, the final `Flatten()` command would create dense layers with hundreds of millions of parameters. You would run out of GPU Memory immediately. Pooling distills spatial data into manageable information density.</p>
                <p class="text-gray-700 dark:text-gray-300"><strong>Project (Shape Math):</strong><br>
                1. After Conv: `(32, 64, 64)`. Channels jumped to 32 because we applied 32 different filters. Size stayed 64 because of padding.<br>
                2. After Pool: `(32, 32, 32)`. Channels stay 32. Height and Width are cut in half by the 2x2 max pool.</p>
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
  { id: 'overview', label: '1. Concept Overview', icon: '👁️' },
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
