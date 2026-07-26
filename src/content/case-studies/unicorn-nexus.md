---
title: "Unicorn Nexus: Turning a Support Chatbot Into a Knowledge Intelligence Platform"
slug: "unicorn-nexus"
category: "Product Case Study - 0 to 1"
status: "Currently building"
order: 1
cardGradient: "from-[#150E2E] to-[#7C3AED]"
cardHoverGradient: "from-[#7C3AED] to-[#150E2E]"
liveUrl: "https://unicorncraftstudios.com"
liveLabel: "unicorncraftstudios.com"
heroImage: "/images/caseStudy/unicorn-nexus/hero.svg"
insights:
  - "0 to 1 Multi-tenant SaaS"
  - "RAG & Grounded Answers"
  - "Scope Cuts With Reasons"
  - "Solo Product + Engineering"
metaTitle: "Case Study: Unicorn Nexus - An AI Knowledge Intelligence Platform"
metaDescription: "A solo-built, multi-tenant RAG chatbot that reads its own chat log to show businesses what their knowledge base is missing - shipped across 8 phases."
overview:
  sections:
    - title: "TL;DR"
      content: "Most \"AI chatbot for your website\" products optimise for one thing: answering questions. I built **Unicorn Nexus** to answer a different one - *what is your chatbot's inability to answer telling you about your business?*\n\nBusinesses upload their docs, embed an assistant (\"Nova\") on their site, and Nova answers strictly from what it was given, refusing to guess. That part is table stakes. The bet is the layer on top: a dashboard that mines every answered and unanswered question to show what's missing from the knowledge base - turning a support tool into a knowledge-improvement loop.\n\nShipped solo across 8 phases. **53** logged decisions, **6** migrations, **2** production-shaped bugs caught by testing rather than by users, **1** credential incident handled correctly."
    - title: "The two problems"
      content: "**Hallucination is a liability.** Generic LLM chatbots invent prices, policies and facts with total confidence. For a support widget, a hallucinated refund policy isn't a curiosity - it's a legal exposure.\n\n**Silence is invisible.** Even a well-behaved bot saying \"I don't know\" fails quietly. Nobody reads a raw query log, so the business never learns that 40 people asked about a shipping policy that doesn't exist in their docs yet."
  sidebar:
    role: ["Product", "Architecture", "Full-stack", "Prompt Design"]
    duration: "8 phases - solo build, ongoing"
    teamMembers:
      - name: "Mayuresh Mule"
        role: "Solo product & engineering"
        image: ""
        linkedIn: "https://www.linkedin.com/in/mayuresh-mule/"
blocks:
  - type: "callout"
    data:
      variant: "insight"
      title: "The insight the whole product hangs on"
      content: "Every **unanswered** question is a labelled data point about a content gap. Every **answered** question is a labelled data point about customer intent.\n\nSo the chat log - the thing every competitor already has and ignores - is the asset. The product doesn't need a second data-collection surface; it needs to read the exhaust of the one it already has. Not \"add more AI features,\" but \"make the AI features the business already has legible and actionable.\""

  - type: "flow"
    data:
      title: "1. The core answer loop"
      caption: "Where the money is saved and where the intelligence layer gets its data - in one pass, at answer time."
      orientation: "horizontal"
      steps:
        - label: "Question arrives"
          detail: "From the embedded widget on the tenant's own site."
          note: "~6 KB widget"
        - label: "Embed + vector search"
          detail: "Searches this tenant's chunks only - isolation enforced by Postgres RLS."
          note: "pgvector"
        - label: "Similarity floor"
          detail: "An obvious miss skips the LLM call entirely and costs nothing but a vector search."
          note: "Cost cap"
        - label: "Grounded answer"
          detail: "Gemini Flash answers strictly from what was retrieved, or says it doesn't know."
          note: "Never guesses"
        - label: "Logged + clustered"
          detail: "Every question is matched to a topic cluster in real time - no separate job."
          note: "One engine"
        - label: "Gaps + Intents"
          detail: "The dashboard reads those clusters into two views the owner can act on."
          note: "The product"

  - type: "principles"
    data:
      title: "2. Product principles"
      caption: "These were written before the features, and they settled most arguments later."
      items:
        - title: "Never hallucinate"
          content: "If the answer isn't in the business's own content, the assistant says so and hands off to a human. A hard constraint, not a tunable."
          icon: "ShieldCheck"
        - title: "The chat log is the product"
          content: "Analytics, gap detection, clustering and drafting are all built by reading data the product already generates - no new instrumentation."
          icon: "Database"
        - title: "Free-tier-honest architecture"
          content: "No feature assumes queues, cron, or vector index servers. Every phase works on Supabase and Vercel free tiers at real early-SaaS volumes."
          icon: "Feather"
        - title: "Ship the honest version"
          content: "A smaller feature with real data beats a bigger feature with placeholder data. This one cost four requested features."
          icon: "BadgeCheck"

  - type: "timeline"
    data:
      title: "3. Eight phases, solo"
      caption: "From an empty repo to a configurable multi-tenant SaaS."
      items:
        - marker: "Phase 1-3"
          title: "The core loop"
          description: "Supabase Auth plus Postgres Row Level Security so tenant isolation is a database guarantee, a workspace per signup, ingestion (paste / PDF / URL → chunk → embed → pgvector), and grounded retrieval with a similarity floor."
          status: "done"
        - marker: "Phase 4"
          title: "Distribution - the embeddable widget"
          description: "One script tag, ~6 KB, zero dependencies, Shadow-DOM isolated so it can't break or be broken by the host site's CSS. It derives its own API origin from its script src, so the same file works on every deployment."
          status: "done"
        - marker: "Phase 5"
          title: "The feedback loop - analytics"
          description: "Query volume, response time, grouped content gaps, and the headline \"I don't know\" rate - computed client-side, because at free-tier volumes a server-side aggregation job solves a problem that doesn't exist yet."
          status: "done"
        - marker: "Phase 6"
          title: "Brand, and building for AI search"
          description: "A rebrand plus a marketing page written for GEO as well as SEO - structured data and quotable FAQ content, on the thesis that answer engines are now a real discovery surface that rewards different content."
          status: "done"
        - marker: "Phase 7"
          title: "The strategic pivot - Knowledge Intelligence"
          description: "An 11-feature wishlist collapsed into one clustering engine and two dashboard views. Detailed below - it's the call I'd most want to be judged on."
          status: "done"
        - marker: "Phase 7.5"
          title: "UX maturity pass"
          description: "Functional-but-generic dashboard to a premium responsive SaaS shell with three real breakpoints - done at the design-token and shell level, so ~15 pages inherited it for the cost of two files."
          status: "done"
        - marker: "Phase 7.6"
          title: "Product identity"
          description: "Renamed platform (Unicorn Nexus) and assistant (Nova) across every user-visible surface - while deliberately leaving the historical decision log unedited, old product name and all."
          status: "done"
        - marker: "Phase 8"
          title: "Personalisation and configurability"
          description: "Company settings and an assistant personality engine built purely as prompt engineering on the existing model, with grounding enforced in the function signature. Settings propagate live to embedded widgets - no re-pasting the snippet."
          status: "done"

  - type: "image"
    data:
      image: "/images/caseStudy/unicorn-nexus/widget.svg"
      alt: "Nova answering on a customer site, with the I-don't-know handoff"
      caption: "The honest failure state is the feature: 'I don't know' plus a human handoff, logged as a gap."

  - type: "comparison"
    data:
      title: "4. The pivot: 11 features into 1 engine"
      caption: "I was handed an 11-feature wishlist and instructions to build \"an AI Knowledge Intelligence Platform.\" Building all eleven would have produced eleven shallow, overlapping systems - several of which need real usage volume or infrastructure that doesn't exist yet, and would have had to be populated with fabricated numbers."
      columns:
        - label: "Asked for: 11 features"
          verdict: "Wishlist"
          tone: "neutral"
          items:
            - "Knowledge Gap Intelligence, Customer Intent Analytics"
            - "Knowledge Graph, Health Score, Duplicate Detection"
            - "Freshness Tracking, Contradiction Detection"
            - "AI Documentation Writer, Usage Analytics"
            - "Relationship Explorer, Smart Recommendations"
        - label: "Built: 1 engine, 2 views"
          verdict: "Shipped"
          tone: "positive"
          items:
            - "One clustering engine - every question matched to a topic cluster at answer time, no separate job"
            - "**Knowledge Gaps** - unanswered clusters ranked by volume × priority × recency, with one-click AI documentation drafting"
            - "**Customer Intents** - every cluster with lazily AI-labelled topics, growth trend, and 👍/👎 satisfaction"
            - "Labelling is milestone-gated, so LLM spend scales with signal, not traffic"
        - label: "Deferred: 4 features"
          verdict: "Not built"
          tone: "negative"
          items:
            - "Health Score - needs real usage data to mean anything"
            - "Duplicate Detection - needs real content volume"
            - "Contradiction Detection - O(n²) LLM comparisons, unaffordable on a free tier"
            - "Relationship Explorer / Graph - sequenced behind the content volume that makes a graph legible"
            - "Each was roadmapped with its reason written down, not silently dropped"

  - type: "image"
    data:
      image: "/images/caseStudy/unicorn-nexus/gaps.svg"
      alt: "The Knowledge Gaps dashboard with ranked clusters"
      caption: "Ranked by a formula the owner can read - unanswered volume × priority × recency decay, not a black box."

  - type: "image"
    data:
      image: "/images/caseStudy/unicorn-nexus/intents.svg"
      alt: "The Customer Intents dashboard"
      caption: "High volume plus low satisfaction is the real prioritisation signal for what to document next."

  - type: "stats"
    data:
      stats:
        - value: "53"
          label: "LOGGED DECISIONS"
          description: "Dated, numbered product and architecture decisions, each with its trade-off, written contemporaneously."
          icon: "ClipboardList"
        - value: "8"
          label: "SHIPPED PHASES"
          description: "Auth and multi-tenancy through to per-tenant personalisation - solo, from an empty repo."
          icon: "Layers"
        - value: "11 → 3"
          label: "SCOPE CALL"
          description: "An 11-feature wishlist collapsed into one engine and two views; four features deferred with reasons."
          icon: "Scissors"
        - value: "~6 KB"
          label: "EMBED WIDGET"
          description: "One script tag, zero dependencies, Shadow-DOM isolated, self-configuring from its own src."
          icon: "Code2"

  - type: "decisions"
    data:
      title: "5. Decisions worth defending"
      caption: "Seven calls, each with what it cost."
      items:
        - decision: "Tenant isolation via Postgres RLS, not app-code checks"
          tradeoff: "More upfront schema design on every table."
          why: "Tenant leakage is a security bug, not a UX bug - worth paying for with the database engine's guarantees rather than developer discipline."
        - decision: "Skip the LLM call below a similarity floor"
          tradeoff: "A few borderline \"maybe answerable\" questions get the fallback."
          why: "It caps cost on the highest-volume failure mode - obviously out-of-scope questions - for near-zero UX cost."
        - decision: "11 features → 1 engine, 2 views, 4 deferred"
          tradeoff: "Much less breadth against the requested list."
          why: "It avoided shipping fabricated data on features that need real volume first. The highest-leverage call in the project."
        - decision: "Cluster labelling is lazy and milestone-gated"
          tradeoff: "Labels can lag a fast-growing cluster briefly."
          why: "LLM spend stays proportional to signal rather than to raw traffic - the difference between a viable and a doomed free tier."
        - decision: "Personalisation is prompt-only, and required on the answer function"
          tradeoff: "A more rigid function signature."
          why: "It makes an ungrounded personalised answer structurally impossible instead of a policy someone has to remember."
        - decision: "Widget config is fetched on load, not baked into the snippet"
          tradeoff: "One extra request per widget load."
          why: "The literal difference between \"settings changes need re-integration\" and \"settings changes just work\" - a retention detail disguised as a technical one."
        - decision: "The rebrand didn't rewrite the historical decision log"
          tradeoff: "The log carries an inconsistent product name across its own history."
          why: "An accurate build history is worth more than a cosmetically consistent one - the same discipline a real postmortem needs."

  - type: "table"
    data:
      title: "6. When things went wrong"
      caption: "A portfolio that only shows things going right isn't credible. Three incidents, and what each fix actually was."
      headers: ["Incident", "Why it was dangerous", "The response"]
      rows:
        - cells:
            - "Silent tracking failure"
            - "A migration wasn't applied in one environment, so every chat quietly failed to log. Nothing crashed; the bot worked perfectly while Analytics, Gaps and Intents stayed empty."
            - "Made the failure loud: server-side logging, a `tracked` flag on the API response, and a `/api/diagnostics` health check with a dashboard banner. The fix is a monitoring feature, not a patch."
        - cells:
            - "CORS bug that only fails in production"
            - "A public endpoint allowed only `POST`, left over from before any `GET` endpoint existed. It passed every same-origin local test and would have broken the next real cross-origin request."
            - "Caught by testing the actual cross-origin path. \"It works when I test it\" and \"it works\" are different claims."
        - cells:
            - "Committed `.env` with live keys"
            - "A service-role key that bypasses all row-level security, plus an LLM key, sitting in git history."
            - "Flagged immediately rather than quietly fixed, blast radius explained (full data access), key rotation recommended as the only real remedy, and shared git history left for the repo owner to decide on."

  - type: "table"
    data:
      title: "7. What \"working\" will look like"
      caption: "No live production traffic yet, so instead of invented usage numbers: here's what is already instrumented and how each signal should be read once it has users."
      headers: ["Signal", "How to read it"]
      rows:
        - cells: ["\"I don't know\" rate", "The headline quality metric. Trending down means the knowledge base is closing real gaps, not just growing."]
        - cells: ["Gaps resolved vs ignored", "Whether the gap loop drives content work, or just generates a report nobody acts on."]
        - cells: ["Cluster growth × satisfaction", "Topics that are both high-volume and poorly served - the actual prioritisation signal."]
        - cells: ["`tracked: true` rate", "An internal health metric born from the silent-tracking incident. If it regresses, every metric above becomes unreliable, so it gates trusting the rest."]
          highlight: true

  - type: "timeline"
    data:
      title: "8. Roadmap - sequenced, not a backlog dump"
      caption: "Each phase waits on something specific. Nothing is built on top of a metric that doesn't exist yet."
      items:
        - marker: "Phase 9"
          title: "Leads"
          description: "A widget three-action UI (Chat / Callback / WhatsApp) plus a leads pipeline. Needs a real data model with a status workflow, not a settings tweak."
          status: "next"
        - marker: "Phase 10"
          title: "Hosted public chat page"
          description: "Per-workspace page with location-based greetings. Needs subdomain routing and a geo-IP provider decision not yet made."
          status: "next"
        - marker: "Phase 11"
          title: "Marketing copy rewrite"
          description: "Sequenced after the visual identity, so it's written once against the final brand instead of twice."
          status: "next"
        - marker: "Phase 12"
          title: "Document relationship pipeline"
          description: "Duplicates, contradictions, graph - the Phase 7 cuts, now waiting on enough real content volume to make the signal meaningful instead of fabricated."
          status: "next"
        - marker: "Phase 13-15"
          title: "Freshness, Health Score, Smart Recommendations"
          description: "Each depends on an earlier phase's real data existing first."
          status: "next"

  - type: "text"
    data:
      title: "What I'd do differently"
      content: "**Instrument for the intelligence layer from day one.** The clustering engine retrofits meaning onto a query log that Phase 3 wasn't designed to feed it. It worked because the schema was additive-friendly, but designing the log with clustering in mind would have saved a migration.\n\n**Write the \"what we're explicitly not building and why\" doc earlier.** Collapsing the wishlist was right, but it happened reactively, mid-phase. Doing that scoping exercise as the first step of any large request makes the trade-off visible to a stakeholder before work starts, not after."

navigation:
  next:
    title: "Back to Home"
    link: "/"
---
