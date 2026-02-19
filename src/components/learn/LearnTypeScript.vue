<template>
  <div class="learn-ts min-h-screen">
    <!-- Header -->
    <div class="px-4 md:px-8 py-8 pb-4 max-w-6xl mx-auto">
      <a href="/learn" class="inline-flex items-center gap-1 text-sm text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors mb-4">
        ← Back to Topics
      </a>
      <div class="flex items-center gap-3 mb-2">
        <span class="text-3xl">📘</span>
        <h1 class="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">TypeScript Advanced</h1>
      </div>
      <p class="text-gray-500 dark:text-gray-400 text-sm md:text-base max-w-2xl">
        Go beyond basic types. Master Generics, Utility Types, Conditional Types, and Type Narrowing to write bulletproof code.
      </p>
    </div>

    <!-- Layout: Nav + Content -->
    <div class="px-4 md:px-8 max-w-6xl mx-auto flex flex-col lg:flex-row gap-6 pb-16">
      <SectionNav
        :sections="sections"
        :activeSection="activeSection"
        activeColor="bg-blue-600"
        @select="setSection"
        class="lg:w-56 flex-shrink-0"
      />

      <div class="flex-1 min-w-0 space-y-5">
        <!-- ==================== GENERICS ==================== -->
        <template v-if="activeSection === 'generics'">
          <ConceptCard
            id="generics-basics"
            icon="🧬"
            title="Generics: Reusable Type Logic"
            subtitle="Functions that work with any type"
            definition="Generics allow you to create components that work over a variety of types rather than a single one. Think of them as variables for types. Usage: <T>."
            analogy="Generics are like a cup holder that adjusts to the size of the cup you put in it. It doesn't care if it's coffee or soda, it just holds 'LiquidContainer<T>'."
            seniorTip="Use generics when the return type relates to the input type. Don't use `any`. Common convention: T (Type), K (Key), V (Value), E (Element)."
            defaultOpen
          >
            <CodePlayground
              title="generics.ts"
              :initialCode="codes.generics"
              codeLanguage="typescript"
            />
          </ConceptCard>

          <ConceptCard
            id="generic-constraints"
            icon="⛓️"
            title="Generic Constraints"
            subtitle="Limiting what T can be"
            definition="You can restrict the types a generic can accept using `extends`. e.g., `<T extends { id: number }>` ensures T always has an id property."
            analogy="Generic constraints are like a VIP section rope: 'You can be anyone (Generic), but you must be wearing a tie (extends { tie: boolean }) to enter'."
            seniorTip="Use `keyof` constraints to create type-safe property accessors: `function getProp<T, K extends keyof T>(obj: T, key: K)`."
          >
            <CodePlayground
              title="constraints.ts"
              :initialCode="codes.constraints"
              codeLanguage="typescript"
            />
          </ConceptCard>
        </template>

        <!-- ==================== UTILITY & MAPPED TYPES ==================== -->
        <template v-if="activeSection === 'utility'">
          <ConceptCard
            id="utility-types"
            icon="🛠️"
            title="Utility Types"
            subtitle="Partial, Pick, Omit, Readonly"
            definition="TS provides built-in utilities to transform types. Partial<T> makes all props optional. Pick<T, K> selects props. Omit<T, K> removes props. Readonly<T> makes props immutable."
            analogy="Utility types are like photo filters. Partial is a 'ghost' filter (fades everything). Pick is a 'crop' tool. Omit is an 'eraser'."
            seniorTip="Master Record<K, V> for object maps. Use ReturnType<typeof func> to extract types from functions (great for Redux actions or API handlers)."
            defaultOpen
          >
            <CodePlayground
              title="utility-types.ts"
              :initialCode="codes.utilityTypes"
              codeLanguage="typescript"
            />
          </ConceptCard>

          <ConceptCard
            id="mapped-types"
            icon="🗺️"
            title="Mapped Types"
            subtitle="Iterating over keys to create new types"
            definition="Mapped types allow you to create new types based on old ones by iterating over property keys. Syntax: `[K in keyof T]: Type`."
            analogy="Mapped types are like a factory line: you take a blueprint (type T) and creating a modified version where every bolt is now gold-plated (transformed type)."
            seniorTip="Use mapped types to create powerful modifiers like `Mutable<T>` (removes readonly) or `Optional<T>`."
          >
            <CodePlayground
              title="mapped-types.ts"
              :initialCode="codes.mappedTypes"
              codeLanguage="typescript"
            />
          </ConceptCard>
        </template>

        <!-- ==================== ADVANCED TYPES ==================== -->
        <template v-if="activeSection === 'advanced'">
          <ConceptCard
            id="conditional-types"
            icon="❓"
            title="Conditional Types"
            subtitle="Logic in type definitions"
            definition="Conditional types selects one of two possible types based on a condition expressed as a type relationship test. Syntax: `T extends U ? X : Y`."
            analogy="Conditional types are ternary operators for types. 'If T is a Dog, return BarkType, else return MeowType'."
            seniorTip="Use `infer` keyword within conditional types to extract nested types (e.g., getting the return type of a function or the element type of an array)."
            defaultOpen
          >
            <CodePlayground
              title="conditional-types.ts"
              :initialCode="codes.conditionalTypes"
              codeLanguage="typescript"
            />
          </ConceptCard>

          <ConceptCard
            id="type-narrowing"
            icon="🔎"
            title="Type Narrowing & Guards"
            subtitle="Teaching TS what a variable is at runtime"
            definition="Narrowing is the process of refining a less precise type (like unknown | string) to a more precise one (string) using `typeof`, `instanceof`, or custom type predicates (`is`)."
            analogy="Type narrowing is like a detective deduction. 'It needs fuel (checks property), therefore it must be a Car, not a Bicycle'."
            seniorTip="Use discriminated unions (adding a `kind` literal property) for the most robust narrowing. Write custom type guards `function isFish(pet: Fish | Bird): pet is Fish`."
          >
            <CodePlayground
              title="narrowing.ts"
              :initialCode="codes.narrowing"
              codeLanguage="typescript"
            />
          </ConceptCard>
        </template>

        <!-- ==================== MODULES & API ==================== -->
        <template v-if="activeSection === 'modules'">
          <ConceptCard
            id="declaration-merging"
            icon="🤝"
            title="Declaration Merging & Module Augmentation"
            subtitle="Extending existing libraries"
            definition="Declaration merging allows you to add properties to existing interfaces/namespaces. Module augmentation lets you patch types in external modules (e.g., adding a property to `window` or `Express.Request`)."
            analogy="Declaration merging is like writing a post-script (P.S.) on a letter. You're adding more info to the original page without rewriting it."
            seniorTip="Use this to add custom properties to global objects or third-party libraries. Example: Adding `user` to `Request` in Express."
            defaultOpen
          >
            <CodePlayground
              title="merging.ts"
              :initialCode="codes.merging"
              codeLanguage="typescript"
            />
          </ConceptCard>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import SectionNav from './SectionNav.vue'
import ConceptCard from './ConceptCard.vue'
import CodePlayground from './CodePlayground.vue'

// Section Nav
const sections = [
  { id: 'generics', label: 'Generics', icon: '🧬', badge: '2' },
  { id: 'utility', label: 'Utility Types', icon: '🛠️', badge: '2' },
  { id: 'advanced', label: 'Advanced Types', icon: '🧠', badge: '2' },
  { id: 'modules', label: 'Modules', icon: '📦', badge: '1' },
]

const activeSection = ref('generics')

function setSection(id) {
  activeSection.value = id
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

// ==================== Code Examples ====================
const codes = {
  generics: `// Generics: Flexible & Reusable Code

// Without Generics:
function identityAny(arg: any): any {
  return arg;
}
// ❌ Lost type information
const result1 = identityAny("hello"); // type is any

// With Generics:
function identity<T>(arg: T): T {
  return arg;
}
// ✅ Type preserved
const result2 = identity<string>("hello"); // type is string
const result3 = identity(42); // type inferred as number

// Generic Interface
interface Box<T> {
  contents: T;
}

const stringBox: Box<string> = { contents: "Gift" };
const numberBox: Box<number> = { contents: 100 };

console.log(stringBox.contents);
console.log(numberBox.contents);`,

  constraints: `// Generic Constraints

// We want a function that logs the .length of ANY object that HAS a length
interface Lengthwise {
  length: number;
}

function loggingIdentity<T extends Lengthwise>(arg: T): T {
  console.log("Length is: " + arg.length); // ✅ Now we know it has .length
  return arg;
}

// loggingIdentity(3); // ❌ Error: number doesn't have .length
loggingIdentity({ length: 10, value: 3 }); // ✅
loggingIdentity("Hello World"); // ✅ Strings have .length
loggingIdentity([1, 2, 3]); // ✅ Arrays have .length

// "keyof" Constraint
// K can only be a key of T
function getProperty<T, K extends keyof T>(obj: T, key: K) {
  return obj[key];
}

const x = { a: 1, b: 2, c: 3 };

getProperty(x, "a"); // ✅
// getProperty(x, "m"); // ❌ Error: "m" is not a key of x`,

  utilityTypes: `// Utility Types
interface User {
  id: number;
  name: string;
  email: string;
}

// 1. Partial<T> - Make everything optional
const updateUser = (user: Partial<User>) => {
  console.log("Updating", user);
}
updateUser({ name: "New Name" }); // ✅

// 2. Pick<T, K> - Select specific keys
type UserSummary = Pick<User, "id" | "name">;
const summary: UserSummary = { id: 1, name: "Alice" }; 
// summary.email // ❌ Error

// 3. Omit<T, K> - Remove specific keys
type UserWithoutEmail = Omit<User, "email">;

// 4. Record<K, T> - Map keys to values
type Role = "admin" | "user" | "guest";
const permissions: Record<Role, string[]> = {
  admin: ["create", "delete"],
  user: ["create"],
  guest: ["read"]
};

// 5. ReturnType<T> - Get return type of function
function createUser() { return { id: 1, name: "Test" }; }
type UserResponse = ReturnType<typeof createUser>;`,

  mappedTypes: `// Mapped Types

type FeatureFlags = {
  darkMode: boolean;
  betaFeatures: boolean;
  logging: boolean;
};

// Create a type where all flags are OPTIONAL
type OptionsFlags<T> = {
  [P in keyof T]?: boolean; // ? makes it optional
};

type FeatureOptions = OptionsFlags<FeatureFlags>;
// Result: { darkMode?: boolean; betaFeatures?: boolean; ... }

// Mutable (Remove readonly)
type LockedAccount = {
  readonly id: number;
  readonly name: string;
};

type Mutable<T> = {
  -readonly [P in keyof T]: T[P]; // -readonly removes it
};

type UnlockedAccount = Mutable<LockedAccount>;
const acc: UnlockedAccount = { id: 1, name: "Bob" };
acc.name = "Alice"; // ✅ Allowed now`,

  conditionalTypes: `// Conditional Types & Infer

type IsString<T> = T extends string ? "yes" : "no";

type A = IsString<string>;  // "yes"
type B = IsString<number>;  // "no"

// "infer" - Extracting types
// Example: Get the type inside a Promise<T> or Array<T>
type Flatten<T> = T extends Array<infer U> ? U : T;

type StrArr = Flatten<string[]>; // string
type Num = Flatten<number>;      // number

// Extract Return Type (simplified ReturnType)
type GetReturnType<T> = T extends (...args: any[]) => infer R ? R : never;

function demo() { return true; }
type DemoReturn = GetReturnType<typeof demo>; // boolean`,

  narrowing: `// Type Narrowing & Guards

type Fish = { swim: () => void; kind: "fish" };
type Bird = { fly: () => void; kind: "bird" };

function move(animal: Fish | Bird) {
  // 1. Discriminated Union (checking particular property)
  if (animal.kind === "fish") {
    animal.swim(); // ✅ TS knows it's a Fish
  } else {
    animal.fly(); // ✅ TS knows it's a Bird
  }
}

// 2. Custom Type Predicate "is"
function isFish(pet: Fish | Bird): pet is Fish {
  return (pet as Fish).swim !== undefined;
}

function interact(pet: Fish | Bird) {
  if (isFish(pet)) {
    pet.swim(); // ✅
  } else {
    pet.fly(); // ✅ TS infers Bird
  }
}`,

  merging: `// Declaration Merging & Module Augmentation

// 1. Merging Interfaces
interface Box {
  height: number;
}
interface Box {
  width: number;
}
// Result: Box has BOTH height and width
const box: Box = { height: 10, width: 20 };

// 2. Module Augmentation (Simulated)
// Imagine this is in a definition file (e.g., express.d.ts)
/*
declare module 'express' {
  interface Request {
    user?: { id: string; role: string };
  }
}
*/

// Usage in app code:
// app.get('/profile', (req) => {
//   console.log(req.user?.id); // ✅ No error, 'user' exists now
// });

console.log("Merged Box:", box);`
}
</script>
