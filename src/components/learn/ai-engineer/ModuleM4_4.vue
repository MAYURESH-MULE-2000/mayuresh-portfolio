<template>
  <div class="learn-module min-h-screen">
    <!-- Header -->
    <div class="px-4 md:px-8 py-8 pb-4 max-w-6xl mx-auto">
      <a href="/learn/ai-engineer" class="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors mb-4">
        ← Back to Curriculum
      </a>
      <div class="flex items-center gap-3 mb-2">
        <span class="text-3xl">🏃‍♂️</span>
        <h1 class="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">M4.4 Training Best Practices</h1>
      </div>
      <p class="text-gray-600 dark:text-gray-400 text-sm md:text-base max-w-2xl">
        The Holy 5-Step Loop, Adam Optimizers, Dropout, and Checkpointing. How to train models without crying.
      </p>
    </div>

    <!-- Layout: Nav + Content -->
    <div class="px-4 md:px-8 max-w-6xl mx-auto flex flex-col lg:flex-row gap-6 pb-16">
      <SectionNav
        :sections="sections"
        :activeSection="activeSection"
        activeColor="bg-sky-600"
        @select="setSection"
        class="lg:w-64 flex-shrink-0"
      />

      <div class="flex-1 min-w-0 space-y-8">
        
        <!-- ==================== 1. CONCEPT OVERVIEW ==================== -->
        <template v-if="activeSection === 'overview'">
          <div class="bg-gradient-to-br from-sky-900 to-blue-900 rounded-2xl p-8 md:p-12 text-center text-white shadow-xl relative overflow-hidden group mb-8">
            <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-sky-400 via-blue-500 to-cyan-500"></div>
            <div class="text-6xl mb-6 transform group-hover:scale-110 transition-transform duration-500">🏃‍♂️</div>
            <h2 class="text-3xl md:text-4xl font-bold mb-4 tracking-tight">1. Concept Overview</h2>
            <p class="text-sky-100 mb-8 max-w-lg mx-auto">Building the architecture is easy. Actually babysitting the model as it trains over millions of steps is where true engineering expertise shines.</p>
          </div>

          <ConceptCard
            id="overview-training"
            icon="🧠"
            title="The Conductor"
            subtitle="The PyTorch Loop"
            definition="In classical ML plugins (Scikit-Learn), you just type `model.fit()`. Under the hood of deep learning, `fit()` is actually a rigorous manual `for` loop that iterates over your data, calculates error, triggers backpropagation, and steps the optimizer forward."
            analogy="Building the NN architecture is like building a treadmill. The Training Loop is you standing over the runner with a stopwatch, shouting corrections every lap, and manually adjusting the treadmill speed (Learning rate) as they get exhausted."
            seniorTip="Memorize the 5-step PyTorch loop. It is the absolute core of all deep learning engineering. It will be asked in every AI interview."
            defaultOpen
          >
          </ConceptCard>
        </template>

        <!-- ==================== 2. INTUITION FIRST ==================== -->
        <template v-if="activeSection === 'intuition'">
          <ConceptCard
            id="intuition"
            icon="💡"
            title="Mental Models: The Team Project"
            subtitle="Dropout & Overfitting"
            definition="A massive neural network has millions of 'neurons'. In training, some neurons become 'lazy' and just rely on the smartest neuron in the layer to do all the work. The network overfits to the smart neuron."
            analogy="Imagine a group project where Alice does all the work, and Bob does nothing. If Alice gets sick (new data), the project fails. 'Dropout' is a technique where we randomly shoot varying neurons with a tranquilizer dart during training. It forces Bob to step up and learn, making the overall team universally robust."
            defaultOpen
          >
          </ConceptCard>
        </template>

        <!-- ==================== 3. TECHNICAL DEEP DIVE ==================== -->
        <template v-if="activeSection === 'deep-dive'">
          <ConceptCard
            id="deep-dive"
            icon="🔬"
            title="Optimizers and LR Schedulers"
            subtitle="Adam vs SGD"
            definition="The Optimizer is the algorithm that updates the weights using the gradient (from M2.3). Standard SGD (Stochastic Gradient Descent) uses a fixed learning rate. Adam (Adaptive Moment Estimation) is an advanced optimizer that maintains a separate, dynamic learning rate for every single parameter simultaneously."
            defaultOpen
          >
             <div class="mt-4 p-4 rounded-xl bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-sm">
                <ul class="space-y-3 dark:text-gray-300">
                    <li><strong class="text-sky-600 dark:text-sky-400 block mb-1">Learning Rate Schedulers:</strong></li>
                    <li>You start training with a High LR to run down the mountain quickly.</li>
                    <li>As you approach the valley floor, if you keep running fast, you will bounce out of the valley.</li>
                    <li>Schedulers automatically drop the learning rate to tiny increments at the end of training so the model can gently settle into the absolute minimum error.</li>
                </ul>
             </div>
          </ConceptCard>
        </template>

        <!-- ==================== 4. VISUALIZATION ==================== -->
        <template v-if="activeSection === 'visualization'">
          <ConceptCard
            id="viz"
            icon="👁️"
            title="Dropout in Action"
            subtitle="Randomly shutting down connections"
            defaultOpen
          >
             <div class="mt-4 flex flex-col md:flex-row items-center justify-center gap-12 p-6 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 font-mono text-sm overflow-x-auto text-gray-500">
                <!-- Standard -->
                <div class="flex flex-col items-center">
                    <div class="font-bold text-gray-700 dark:text-gray-300 mb-4">Standard Layer</div>
                    <div class="flex gap-2">
                        <div class="w-8 h-8 rounded-full border-2 border-green-500 bg-green-100 dark:bg-green-900"></div>
                        <div class="w-8 h-8 rounded-full border-2 border-green-500 bg-green-100 dark:bg-green-900"></div>
                        <div class="w-8 h-8 rounded-full border-2 border-green-500 bg-green-100 dark:bg-green-900"></div>
                        <div class="w-8 h-8 rounded-full border-2 border-green-500 bg-green-100 dark:bg-green-900"></div>
                    </div>
                </div>

                <div class="font-bold text-gray-400">vs.</div>

                <!-- Dropout -->
                <div class="flex flex-col items-center">
                    <div class="font-bold text-gray-700 dark:text-gray-300 mb-4">Dropout (p=0.5)</div>
                    <div class="flex gap-2 relative">
                        <div class="w-8 h-8 rounded-full border-2 border-green-500 bg-green-100 dark:bg-green-900"></div>
                        <!-- Dead! -->
                        <div class="w-8 h-8 rounded-full border-2 border-gray-500 bg-gray-200 dark:bg-gray-800 relative">
                            <div class="absolute inset-x-1 top-1/2 h-0.5 bg-gray-500 rotate-45"></div>
                        </div>
                        <div class="w-8 h-8 rounded-full border-2 border-green-500 bg-green-100 dark:bg-green-900"></div>
                        <!-- Dead! -->
                        <div class="w-8 h-8 rounded-full border-2 border-gray-500 bg-gray-200 dark:bg-gray-800 relative">
                            <div class="absolute inset-x-1 top-1/2 h-0.5 bg-gray-500 rotate-45"></div>
                        </div>
                    </div>
                </div>
             </div>
             <p class="mt-4 text-xs text-center text-gray-600 dark:text-gray-400">By randomly muting 50% of the neurons every batch, the network cannot mathematically memorize the data. It is forced to learn robust feature generalizations.</p>
          </ConceptCard>
        </template>

        <!-- ==================== 5. CODE IMPLEMENTATION ==================== -->
        <template v-if="activeSection === 'code'">
          <div class="bg-gray-100 dark:bg-gray-800/50 p-6 rounded-2xl border border-gray-200 dark:border-white/10 mb-8">
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Implementation: The Holy 5-Step Loop</h3>
            <div class="bg-[#1e1e1e] rounded-xl overflow-hidden text-sm font-mono leading-relaxed p-4 overflow-x-auto text-gray-300 shadow-xl border border-gray-700">
<pre><code><span class="text-purple-400">import</span> torch.optim <span class="text-blue-400">as</span> optim
<span class="text-purple-400">import</span> torch.nn <span class="text-blue-400">as</span> nn

<span class="text-green-400"># Model and parameters setup</span>
optimizer = optim.Adam(model.parameters(), lr=<span class="text-emerald-300">0.001</span>)
criterion = nn.CrossEntropyLoss()

<span class="text-green-400"># Enables Dropout and Batch-Norm behaviors</span>
model.train() 

<span class="text-blue-400">for</span> epoch <span class="text-blue-400">in</span> range(num_epochs):
    <span class="text-blue-400">for</span> batch_x, batch_y <span class="text-blue-400">in</span> dataloader:
        
        <span class="text-green-400"># STEP 1. Zero out old gradients from last loop</span>
        optimizer.zero_grad()
        
        <span class="text-green-400"># STEP 2. Forward pass (Guess)</span>
        predictions = model(batch_x)
        
        <span class="text-green-400"># STEP 3. Calculate Loss (Judge the guess)</span>
        loss = criterion(predictions, batch_y)
        
        <span class="text-green-400"># STEP 4. Backward pass (Run calculus chain-rule)</span>
        loss.backward()
        
        <span class="text-green-400"># STEP 5. Step (Optimizer updates the weights using gradient)</span>
        optimizer.step()
</code></pre>
            </div>
          </div>

          <ConceptCard
            id="your-turn-m4-4"
            icon="✍️"
            title="YOUR TURN: Architecture Challenge"
            subtitle="Debugging the loop"
            defaultOpen
          >
             <div class="mt-4 space-y-4 text-sm text-gray-700 dark:text-gray-300">
              <div class="p-4 bg-white dark:bg-gray-800/80 rounded-xl border border-sky-200 dark:border-sky-800/30">
                <span class="font-bold text-sky-600 dark:text-sky-400 mb-2 block">Task 1: The Accumulator Bug</span>
                <p>If you comment out Step 1 (`optimizer.zero_grad()`), what will happen to the gradients (the calculus slopes) in batch 2? Will PyTorch overwrite them, or add them together?</p>
              </div>
            </div>
          </ConceptCard>
        </template>

        <!-- ==================== 6. MICRO-EXERCISES ==================== -->
        <template v-if="activeSection === 'exercises'">
          <ConceptCard
            id="micro-exercises-m44"
            icon="⚡"
            title="Concept Checks"
            subtitle="Modes"
            defaultOpen
          >
            <div class="space-y-6 mt-4">
              <!-- Exec 1 -->
              <div>
                <h4 class="font-semibold text-gray-900 dark:text-white text-sm mb-2">1. Turning off Dropout</h4>
                <div class="bg-gray-900 rounded-lg p-3 font-mono text-sm text-gray-300">
                  <p class="font-sans">We train using `model.train()` so Dropout randomly disables 50% of neurons. When we finish and put the model into the app for real users, do we keep Dropout on?</p>
                </div>
              </div>
            </div>
          </ConceptCard>
        </template>

        <!-- ==================== 7. COMMON MISTAKES ==================== -->
        <template v-if="activeSection === 'mistakes'">
          <ConceptCard
            id="mistakes-m44"
            icon="⚠️"
            title="Common Beginner Mistakes"
            subtitle="Save yourself hours of debugging"
            defaultOpen
          >
             <ul class="space-y-4 mt-4 text-sm text-gray-600 dark:text-gray-400">
              <li class="p-4 bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800/30 rounded-xl">
                <strong class="text-red-700 dark:text-red-400 block mb-1">1. Forgetting `model.eval()` and `torch.no_grad()`</strong>
                When running your Validation/Test loops, you MUST call `model.eval()` to turn off Dropout. Additionally, wrap the evaluation inside a `with torch.no_grad():` block. Otherwise, PyTorch will actively build a massive calculus graph in memory to prepare for a backward pass you aren't going to make, crashing your GPU.
              </li>
              <li class="p-4 bg-orange-50 dark:bg-orange-900/10 border border-orange-200 dark:border-orange-800/30 rounded-xl">
                <strong class="text-orange-700 dark:text-orange-400 block mb-1">2. Hardware vs Tensor locations</strong>
                If your `model` is on the `cuda` GPU, but your `batch_x` data is on the CPU, PyTorch will completely crash. Ensure you explicitly move data: `batch_x = batch_x.to('cuda')`.
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
                <span class="font-bold text-purple-700 dark:text-purple-400 block mb-2">➡️ Phase 6: MLOps Checkpoints</span>
                Training a big LLM takes 3 weeks. If AWS reboots the server on day 15, everything is gone. In Phase 6, you will wrap this loop with Checkpointing hooks: `torch.save(model.state_dict())` every 10 epochs.
              </div>
          </ConceptCard>
        </template>

        <!-- ==================== 9. REAL-WORLD ==================== -->
        <template v-if="activeSection === 'real-world'">
           <ConceptCard
            id="real-world"
            icon="🏭"
            title="Real-World Application"
            subtitle="Distributed Data Parallel"
            defaultOpen
          >
            <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
              Real world LLMs do not fit on a single Nvidia H100 GPU (80GB).
            </p>
            <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              Companies use massive clusters (1,024 GPUs). They use 'Distributed Data Parallel' wrappers around this exact PyTorch loop. The code mathematically synchronizes the `optimizer.step()` across all 1,024 GPUs simultaneously so they all update their local weights in unison via fiber-optic cables.
            </p>
          </ConceptCard>
        </template>

        <!-- ==================== 10. MINI PROJECT ==================== -->
        <template v-if="activeSection === 'project'">
          <ConceptCard
            id="project"
            icon="🛠️"
            title="Mini Project: The Evaluation Loop"
            subtitle="Read-only mode"
            defaultOpen
          >
            <div class="mt-4 p-5 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-gray-800/50">
              <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
                <strong>Goal:</strong> Write the pseudo-code for the Validation loop (which happens right after the training loop finishes).
              </p>
              <div class="bg-gray-900 p-4 rounded-xl text-gray-300 font-mono text-xs overflow-auto">
<pre># 1. Flip model mode
# model... 

# 2. Tell PyTorch to stop tracking calculus
# with ...:

# 3. Standard forward pass only!
# for x, y in val_loader:
#     preds = model(x)
#     # NO loss.backward()!
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
              <li><strong>Zero, Forward, Loss, Backward, Step.</strong> Say it out loud.</li>
              <li><strong>Adam Optimizer</strong> dynamically adjusts learning rates for every parameter based on momentum.</li>
              <li><strong>Dropout</strong> randomly kills neurons to prevent overfitting and force generalization.</li>
              <li>Always toggle <strong>model.train()</strong> and <strong>model.eval()</strong>.</li>
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
              <div class="p-4 bg-sky-50 dark:bg-sky-900/10 border border-sky-200 dark:bg-sky-800/20 rounded-xl">
                <h4 class="font-bold text-sky-800 dark:text-sky-400 mb-2">Tasks & Exercises</h4>
                <p class="text-gray-700 dark:text-gray-300 mb-4"><strong>Task 1 (Accumulator):</strong> PyTorch <i>adds</i> them together. By design, `.backward()` strictly accumulates gradients. If you don't zero them, batch 2's gradient adds to batch 1's gradient. By batch 50, your gradients are so massively inflated that the optimizer takes a leap into the mathematical stratosphere and your model crashes with `NaN` loss.</p>
                <p class="text-gray-700 dark:text-gray-300 mb-4"><strong>Exercise 1 (Eval vs Train):</strong> No! We never want a user app to randomly be missing 50% of its brain. We run `model.eval()` to permanently turn back ON all neurons for inference, and internally PyTorch scales the weights to compensate.</p>
                <p class="text-gray-700 dark:text-gray-300"><strong>Project (Eval Loop):</strong><br>
                `model.eval()`<br>
                `with torch.no_grad():`<br>
                `    for x, y in val:`<br>
                `         pred = model(x)`
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
  { id: 'overview', label: '1. Concept Overview', icon: '🏃‍♂️' },
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
