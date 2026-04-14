<template>
  <div class="learn-module min-h-screen">
    <!-- Header -->
    <div class="px-4 md:px-8 py-8 pb-4 max-w-6xl mx-auto">
      <a href="/learn/ai-engineer" class="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors mb-4">
        ← Back to Curriculum
      </a>
      <div class="flex items-center gap-3 mb-2">
        <span class="text-3xl">🗂️</span>
        <h1 class="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">M1.2 Python for Data</h1>
      </div>
      <p class="text-gray-600 dark:text-gray-400 text-sm md:text-base max-w-2xl">
        Classes & OOP, list comprehensions, File I/O, JSON processing, and error handling. Moving from scripting to engineering robust data pipelines.
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
            <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-500"></div>
            <div class="text-6xl mb-6 transform group-hover:scale-110 transition-transform duration-500">🗂️</div>
            <h2 class="text-3xl md:text-4xl font-bold mb-4 tracking-tight">1. Concept Overview</h2>
            <p class="text-blue-100 mb-8 max-w-lg mx-auto">Moving beyond basic syntax to structure data flows. Learn how AI engineers encapsulate models (OOP) and process thousands of API payloads seamlessly.</p>
          </div>

          <ConceptCard
            id="overview-data"
            icon="🧠"
            title="From Scripts to Pipelines"
            subtitle="The Engineering layer"
            definition="Python for Data bridges the gap between running a quick loop and running a sustained system. It introduces Object-Oriented Programming (OOP) to wrap model logic, `try/except` to prevent crashes on bad data, and `with open()` patterns to safely stream gigabytes of files."
            analogy="M1.1 taught you how to use a hammer and nails. M1.2 teaches you how to build a waterproof toolbox (OOP) and read architectural blueprints (File I/O) without the roof collapsing (Error Handling)."
            seniorTip="Almost every HuggingFace or PyTorch model you will ever interact with is implemented as a Python Class. Understanding OOP `__init__` and `self` is strictly non-negotiable."
            defaultOpen
          >
          </ConceptCard>
        </template>

        <!-- ==================== 2. INTUITION FIRST ==================== -->
        <template v-if="activeSection === 'intuition'">
          <ConceptCard
            id="intuition"
            icon="💡"
            title="Mental Models: Factories and Assembly Lines"
            subtitle="Classes and Comprehensions"
            definition="A Class is a Factory Blueprint. It's not a car; it's the design for a car. Instantiating it creates the object (the actual car) with its own state. List Comprehensions are automated assembly lines. Instead of a loop where a worker adds items one-by-one to a bucket, comprehensions stamp out the entire constructed bucket in one fluid pass."
            analogy="Class = Factory Blueprint. Instance = The built car. Comprehension = A conveyor belt stamping parts efficiently."
            defaultOpen
          >
          </ConceptCard>
        </template>

        <!-- ==================== 3. TECHNICAL DEEP DIVE ==================== -->
        <template v-if="activeSection === 'deep-dive'">
          <ConceptCard
            id="oop"
            icon="🧱"
            title="Object-Oriented Programming (OOP)"
            subtitle="Classes, Methods, Self"
            definition="In Python OOP, `class` defines the template. The `__init__` method is the constructor that runs immediately upon creation. `self` is explicitly passed as the first argument to instance methods to reference the specific object being manipulated."
            defaultOpen
          >
             <div class="bg-gray-100 dark:bg-gray-800/50 p-4 rounded-xl border border-gray-200 dark:border-white/10 mt-4 text-sm">
                <ul class="space-y-2 dark:text-gray-300">
                    <li><strong class="text-blue-600 dark:text-blue-400">Class:</strong> `class NeuralNet:`</li>
                    <li><strong class="text-blue-600 dark:text-blue-400">Initialization:</strong> `def __init__(self, layers): self.layers = layers`</li>
                    <li><strong class="text-blue-600 dark:text-blue-400">Instantiation:</strong> `model = NeuralNet(5)` (Creates instance, calls init)</li>
                </ul>
             </div>
          </ConceptCard>

           <ConceptCard
            id="io_errors"
            icon="🛡️"
            title="File I/O, JSON & Error Handling"
            subtitle="Robust data ingestion"
            definition="Data in AI heavily relies on text, CSV, and JSON (API payloads). The Context Manager (`with open()`) guarantees files close properly even if errors happen inside. `try/except` gracefully catches corrupt data, allowing the data pipeline to skip a row rather than crashing the 10-hour training run."
          >
          </ConceptCard>
        </template>

        <!-- ==================== 4. VISUALIZATION ==================== -->
        <template v-if="activeSection === 'visualization'">
          <ConceptCard
            id="viz"
            icon="👁️"
            title="List Comprehension Flow"
            subtitle="Syntactic sugar for maps and filters"
            definition="List comprehensions wrap a `for` loop and an `if` condition into a single readable line."
            defaultOpen
          >
            <div class="mt-4 p-6 bg-gray-900 dark:bg-black rounded-xl border border-gray-700 font-mono text-sm shadow-inner overflow-x-auto text-center">
                <span class="text-gray-400">[</span> <span class="text-emerald-400">transform(item)</span> <span class="text-blue-400">for item in array</span> <span class="text-purple-400">if condition(item)</span> <span class="text-gray-400">]</span>
            </div>
            <div class="mt-4 text-sm text-gray-600 dark:text-gray-400">
                <p>1. <span class="text-blue-600 dark:text-blue-400 font-semibold">Iterate</span> over `array`.</p>
                <p>2. <span class="text-purple-600 dark:text-purple-400 font-semibold">Filter</span> items where `condition` is True.</p>
                <p>3. <span class="text-emerald-600 dark:text-emerald-400 font-semibold">Transform</span> keeping `transform(item)`.</p>
            </div>
          </ConceptCard>
        </template>

        <!-- ==================== 5. CODE IMPLEMENTATION ==================== -->
        <template v-if="activeSection === 'code'">
          <div class="bg-gray-100 dark:bg-gray-800/50 p-6 rounded-2xl border border-gray-200 dark:border-white/10 mb-8">
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Implementation: A Data Processor wrapper</h3>
            <div class="bg-[#1e1e1e] rounded-xl overflow-hidden text-sm font-mono leading-relaxed p-4 overflow-x-auto text-gray-300 shadow-xl border border-gray-700">
<pre><code><span class="text-purple-400">import</span> json

<span class="text-blue-400">class</span> <span class="text-yellow-200">DatasetPipeline</span>:
    <span class="text-blue-400">def</span> <span class="text-yellow-200">__init__</span>(<span class="text-emerald-300">self</span>, file_path):
        <span class="text-emerald-300">self</span>.file_path = file_path
        <span class="text-emerald-300">self</span>.data = []

    <span class="text-blue-400">def</span> <span class="text-yellow-200">load_json</span>(<span class="text-emerald-300">self</span>):
        <span class="text-green-400"># Context manager (with) auto-closes file</span>
        <span class="text-blue-400">try</span>:
            <span class="text-blue-400">with open</span>(<span class="text-emerald-300">self</span>.file_path, <span class="text-orange-300">'r'</span>) <span class="text-blue-400">as</span> file:
                <span class="text-emerald-300">self</span>.data = json.load(file)
        <span class="text-blue-400">except</span> FileNotFoundError:
            print(<span class="text-orange-300">"Warning: File missing! Returning empty."</span>)
            <span class="text-emerald-300">self</span>.data = []

    <span class="text-blue-400">def</span> <span class="text-yellow-200">extract_valid_scores</span>(<span class="text-emerald-300">self</span>, threshold=<span class="text-emerald-300">0.5</span>):
        <span class="text-green-400"># List comprehension: [item for item in list if condition]</span>
        <span class="text-blue-400">return</span> [row[<span class="text-orange-300">'score'</span>] <span class="text-blue-400">for</span> row <span class="text-blue-400">in</span> <span class="text-emerald-300">self</span>.data <span class="text-blue-400">if</span> row.get(<span class="text-orange-300">'score'</span>, <span class="text-emerald-300">0</span>) > threshold]

<span class="text-green-400"># Execution</span>
pipeline = DatasetPipeline(<span class="text-orange-300">"data.json"</span>)
pipeline.load_json()
high_scores = pipeline.extract_valid_scores()</code></pre>
            </div>
          </div>

          <ConceptCard
            id="your-turn-m1-2"
            icon="✍️"
            title="YOUR TURN: Code Tasks"
            subtitle="Build upon the pipeline"
            defaultOpen
          >
             <div class="mt-4 space-y-4 text-sm text-gray-700 dark:text-gray-300">
              <div class="p-4 bg-white dark:bg-gray-800/80 rounded-xl border border-blue-200 dark:border-blue-800/30">
                <span class="font-bold text-blue-600 dark:text-blue-400 mb-2 block">Task 1: The Writer</span>
                <p>Add a method `save_json(self, output_path, data)` that uses `with open` in write mode (`'w'`) and `json.dump()` to save processed results.</p>
              </div>
              <div class="p-4 bg-white dark:bg-gray-800/80 rounded-xl border border-emerald-200 dark:border-emerald-800/30">
                <span class="font-bold text-emerald-600 dark:text-emerald-400 mb-2 block">Task 2: Error Resistance</span>
                <p>Update the comprehension. What if `row['score']` exists but is a String "N/A" instead of a float? Wrap the float conversion in a `try/except ValueError` block (requiring a standard loop instead of comprehension).</p>
              </div>
            </div>
          </ConceptCard>
        </template>

        <!-- ==================== 6. MICRO-EXERCISES ==================== -->
        <template v-if="activeSection === 'exercises'">
          <ConceptCard
            id="micro-exercises-m12"
            icon="⚡"
            title="Concept Checks"
            subtitle="Predict the output"
            defaultOpen
          >
            <div class="space-y-6 mt-4">
              <!-- Exec 1 -->
              <div>
                <h4 class="font-semibold text-gray-900 dark:text-white text-sm mb-2">1. List Comprehension Power</h4>
                <div class="bg-gray-900 rounded-lg p-3 font-mono text-sm text-gray-300">
                  <pre>
nums = [1, 2, 3, 4, 5]
res = [x*2 for x in nums if x % 2 == 1]
print(res)
# What prints?</pre>
                </div>
              </div>
              <!-- Exec 2 -->
              <div>
                <h4 class="font-semibold text-gray-900 dark:text-white text-sm mb-2">2. Exception Flow</h4>
                <div class="bg-gray-900 rounded-lg p-3 font-mono text-sm text-gray-300">
                  <pre>
try:
    x = 10 / 0
except ZeroDivisionError:
    print("Zero!")
finally:
    print("Done!")
# What prints?</pre>
                </div>
              </div>
            </div>
          </ConceptCard>
        </template>

        <!-- ==================== 7. COMMON MISTAKES ==================== -->
        <template v-if="activeSection === 'mistakes'">
          <ConceptCard
            id="mistakes-m12"
            icon="⚠️"
            title="Common Beginner Mistakes"
            subtitle="Save yourself hours of debugging"
            defaultOpen
          >
             <ul class="space-y-4 mt-4 text-sm text-gray-600 dark:text-gray-400">
              <li class="p-4 bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800/30 rounded-xl">
                <strong class="text-red-700 dark:text-red-400 block mb-1">1. Forgetting `self`</strong>
                In Python, instance methods must have `self` as the first parameter. `def calculate_loss():` inside a class will throw an error when called as `model.calculate_loss()`. It must be `def calculate_loss(self):`.
              </li>
              <li class="p-4 bg-orange-50 dark:bg-orange-900/10 border border-orange-200 dark:border-orange-800/30 rounded-xl">
                <strong class="text-orange-700 dark:text-orange-400 block mb-1">2. Naked `except:` blocks</strong>
                Using just `except:` catches EVERYTHING, including KeyboardInterrupt (preventing you from stopping a deadlocked program with Ctrl+C). Always catch specific errors, e.g., `except Exception as e:` or `except ValueError:`.
              </li>
              <li class="p-4 bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800/30 rounded-xl">
                <strong class="text-amber-700 dark:text-amber-400 block mb-1">3. Not wrapping File I/O in `with`</strong>
                `f = open('data.json')` opens a file. If your code errors out before `f.close()`, the file descriptor remains locked. The `with open()` context manager guarantees closure.
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
            <div class="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="p-5 border border-purple-200 dark:border-purple-900/30 bg-purple-50/50 dark:bg-purple-900/10 rounded-xl text-sm">
                <span class="font-bold text-purple-700 dark:text-purple-400 block mb-2">➡️ M4.1 Neural Networks (PyTorch)</span>
                A Neural Network in PyTorch is created by subclassing `nn.Module`. Your knowledge of OOP and `__init__` vs `forward()` methods will be the direct interface to building Deep Learning models.
              </div>
              <div class="p-5 border border-indigo-200 dark:border-indigo-900/30 bg-indigo-50/50 dark:bg-indigo-900/10 rounded-xl text-sm">
                <span class="font-bold text-indigo-700 dark:text-indigo-400 block mb-2">➡️ M6.1 Model Serving (FastAPI)</span>
                When you deploy models, you'll wrap them in an API class. JSON payloads will flow in via HTTP, parsing logic identical to what you learned here will run, and predictions will flow out.
              </div>
            </div>
          </ConceptCard>
        </template>

        <!-- ==================== 9. REAL-WORLD ==================== -->
        <template v-if="activeSection === 'real-world'">
           <ConceptCard
            id="real-world"
            icon="🏭"
            title="Real-World Application"
            subtitle="HuggingFace Datasets & Error resilience"
            defaultOpen
          >
            <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
              When processing Wikipedia dumps or Twitter firehoses to train LLMs, files are multi-gigabyte JSONL (JSON lines) formats.
            </p>
            <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              Standard list comprehensions cannot load a 50GB file into RAM. AI Data Engineers use `with open(...)` to stream files line-by-line using Generators resulting in a tiny, constant memory footprint. Additionally, social media data is highly corrupt. Aggressive `try/except` parsing is required because crashing an ingestion pipeline that's been running for hours due to one malformed JSON brace is unacceptable.
            </p>
          </ConceptCard>
        </template>

        <!-- ==================== 10. MINI PROJECT ==================== -->
        <template v-if="activeSection === 'project'">
          <ConceptCard
            id="project"
            icon="🛠️"
            title="Mini Project: The Config Manager Class"
            subtitle="OOP and JSON combined"
            defaultOpen
          >
            <div class="mt-4 p-5 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-gray-800/50">
              <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
                <strong>Goal:</strong> Write a class `ConfigManager`. The `__init__` takes a filename. Provide a `load()` method to safely load JSON (handling File Not Found gracefully by returning an empty dict). Provide a `get(key)` method to fetch a property.
              </p>
              <div class="bg-gray-900 p-4 rounded-xl text-gray-300 font-mono text-xs overflow-auto">
<pre># Skeleton to complete
class ConfigManager:
    def __init__(self, filename):
        # assign filename to instance
        pass
        
    def load(self):
        # try opening file, catch error, load json
        pass
        
    def get(self, key):
        # return the key if it exists
        pass</pre>
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
              <li><strong>OOP</strong> encapsulates logic and state. PyTorch/HuggingFace are heavily OOP-driven.</li>
              <li><strong>self</strong> explicitly maps a method back to its parent instance.</li>
              <li><strong>List Comprehensions</strong> `[x for x in data if y]` are pythonic, faster, and clearer maps/filters.</li>
              <li><strong>with open()</strong> guarantees file handles close, crucial for memory safety in large pipelines.</li>
              <li><strong>try/except</strong> is not just for debugging, it's for robust control flow on messy real-world ML data.</li>
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
              <div class="p-4 bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-200 dark:border-emerald-800/20 rounded-xl">
                <h4 class="font-bold text-emerald-800 dark:text-emerald-400 mb-2">Micro-Exercises</h4>
                <p class="text-gray-700 dark:text-gray-300 mb-2"><strong>1. Comprehension:</strong> `[2, 6, 10]`. It filters to odd numbers (1, 3, 5) and then multiplies each by 2.</p>
                <p class="text-gray-700 dark:text-gray-300"><strong>2. Exceptions:</strong> Prints `Zero!` then prints `Done!`. Finally blocks execute no matter what happens in the try/except blocks.</p>
              </div>

               <div class="p-4 bg-purple-50 dark:bg-purple-900/10 border border-purple-200 dark:border-purple-800/20 rounded-xl font-mono text-xs overflow-auto text-purple-900 dark:text-purple-300">
                <span class="font-bold text-purple-800 dark:text-purple-400 mb-2 block font-sans text-sm">Mini Project Solution</span>
<pre>import json

class ConfigManager:
    def __init__(self, filename):
        self.filename = filename
        self.config = {}
        
    def load(self):
        try:
            with open(self.filename, 'r') as f:
                self.config = json.load(f)
        except Exception as e:
            print(f"Error loading: {e}")
            self.config = {}
            
    def get(self, key):
        return self.config.get(key, None)</pre>
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
  { id: 'overview', label: '1. Concept Overview', icon: '🗂️' },
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
