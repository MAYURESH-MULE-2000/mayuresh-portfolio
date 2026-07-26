---
title: "Unicorn Nexus: Turning a Support Chatbot Into a Knowledge Intelligence Platform"
slug: "unicorn-nexus"
category: "Product Case Study - 0 to 1"
status: "Currently building"
order: 1
cardGradient: "from-[#150E2E] to-[#7C3AED]"
cardHoverGradient: "from-[#7C3AED] to-[#150E2E]"
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
      content: "Most \"AI chatbot for your website\" products optimise for one thing: answering questions. I built **Unicorn Nexus** to answer a different question - *what is your chatbot's inability to answer telling you about your business?*\n\nThe product is a multi-tenant RAG chatbot. Businesses upload their docs, embed an assistant (\"Nova\") on their site, and Nova answers strictly from what it was given, refusing to guess when it doesn't know. That part is table stakes. The differentiated bet was the layer on top: a dashboard that mines every unanswered and answered question to show a business what is missing from their knowledge base, what customers actually care about, and how to close the gap - turning a support tool into a knowledge-improvement loop.\n\nShipped solo across 8 phases: auth and multi-tenancy, ingestion, grounded chat, embeddable widget, analytics, rebrand and GEO landing page, knowledge-gap and intent intelligence, premium UX pass, and per-tenant personalisation. 53 logged product and architecture decisions, 6 database migrations, 2 production-shaped bugs caught by testing rather than by users, and 1 credential-exposure incident handled correctly."
    - title: "The Problem"
      content: "Small and mid-sized businesses increasingly want an AI chatbot on their site, but the category has a trust problem: generic LLM chatbots hallucinate. They invent prices, policies, and facts with total confidence. For a support widget, a hallucinated refund policy isn't a curiosity - it's a liability.\n\nThe second, quieter problem is worse. Even when a chatbot behaves and simply says \"I don't know,\" that failure is invisible. Nobody reads a raw query log for patterns. The business never learns that 40 people asked about a shipping policy that doesn't exist in their docs yet, or that pricing questions spiked 20% this week. The chatbot becomes a **dead end** for that signal instead of a feedback loop."
  sidebar:
    role: ["Product", "Architecture", "Full-stack", "Prompt Design"]
    duration: "8 phases - solo build, ongoing"
    teamMembers:
      - name: "Mayuresh Mule"
        role: "Solo product & engineering"
        image: ""
        linkedIn: "https://www.linkedin.com/in/mayuresh-mule/"
blocks:
  - type: "text"
    data:
      title: "1. The Insight"
      content: "If every unanswered question is a labelled data point about a **content gap**, and every answered question is a labelled data point about **customer intent**, then the chat log - something every competitor already has - is an underused asset.\n\nThe product doesn't need a second data-collection surface. It needs to read the exhaust of the product it already has and turn that into a second, higher-value surface: a knowledge intelligence dashboard, not just a chat log viewer.\n\nThat reframing is the core strategic bet of this project. Not \"add more AI features,\" but \"make the AI features the business already has legible and actionable.\""

  - type: "text"
    data:
      title: "2. Who It's For"
      content: "• **Primary ICP:** small and mid-size businesses and SaaS teams that already have documentation - FAQs, policy docs, product pages - and want to deflect support volume without hand-authoring a bot's answers or risking hallucinated ones.\n• **Buyer persona:** a founder, support lead, or growth owner - someone who cares as much about what the chatbot *reveals* about their content gaps as about the chat experience itself.\n• **Explicitly not for:** enterprises needing SSO and seat management, or teams wanting an open-ended agent that can take actions. This is a grounded-answers-only product by design."

  - type: "text"
    data:
      title: "3. Product Principles (the north star)"
      content: "**1. Never hallucinate.** If the answer isn't in the business's own content, the assistant says so and hands off to a human. This is a hard constraint, not a tunable, and it shaped nearly every later decision.\n\n**2. The chat log is the product.** Every feature after the core Q&A loop - analytics, gap detection, intent clustering, documentation drafting - is built by reading data the product already generates, not by bolting on new instrumentation.\n\n**3. Free-tier-honest architecture.** No feature assumes infrastructure (queues, cron, vector index servers) that a bootstrapped deployment doesn't have. Every phase had to work on Supabase and Vercel free tiers at the traffic volumes a new SaaS actually sees.\n\n**4. Ship the honest version, not the impressive-looking one.** A smaller feature with real data beats a bigger feature with placeholder data - repeatedly, throughout the build."

  - type: "text"
    data:
      title: "4. The Core Loop (Phases 1-3)"
      content: "Multi-tenant auth on Supabase Auth plus Postgres **Row Level Security**, so tenant isolation is enforced by the database rather than by app-code discipline. A workspace is auto-provisioned per signup.\n\nThen the ingestion pipeline: paste text, upload a PDF, or drop a URL - chunked, embedded, and indexed in pgvector. Then retrieval and answering: embed the question, vector-search *this tenant's* chunks only, and let Gemini Flash answer strictly from what was retrieved - with a **similarity floor** that skips the LLM call entirely on an obvious miss, so an unanswerable question costs nothing but a vector search."

  - type: "text"
    data:
      title: "5. Distribution and Feedback (Phases 4-6)"
      content: "**Phase 4 - the embeddable widget.** A single `<script>` tag, roughly 6 KB, zero dependencies, Shadow-DOM isolated so it can't break (or be broken by) a customer's site CSS. Zero configuration: the widget derives its own API origin from the script tag's `src`, so the same file works unmodified on every deployment.\n\n**Phase 5 - analytics.** Query volume, an **\"I don't know\" rate** (the headline content-gap signal), response time, and grouped content-gap and most-asked views - computed client-side from the raw log, deliberately, because at free-tier volumes a server-side aggregation job solves a problem that doesn't exist yet.\n\n**Phase 6 - brand and GEO.** A rebrand and a marketing page written for Generative Engine Optimization as well as SEO - structured data, quotable FAQ content - on the thesis that AI answer engines are now a real discovery surface, and that surface rewards different content than a keyword-stuffed landing page."

  - type: "text"
    data:
      title: "6. The Strategic Pivot: 11 Features Into 1 Engine"
      content: "This is the phase that matters most, so it's worth telling straight. I was handed an 11-feature wishlist - Knowledge Gap Intelligence, Customer Intent Analytics, Knowledge Graph, Health Score, Duplicate Detection, Freshness Tracking, Contradiction Detection, AI Documentation Writer, Usage Analytics, Relationship Explorer, Smart Recommendations - with instructions to build toward \"an AI Knowledge Intelligence Platform.\"\n\nBuilding all 11 separately would have produced 11 shallow, overlapping systems. Several don't scale on a free-tier budget (naive Contradiction Detection is an O(n²) LLM comparison across every document pair), and several would need fabricated or estimated data to populate before real usage volume exists.\n\nInstead I collapsed the wishlist into **one clustering engine** - every question is matched to a topic cluster in real time, at answer-time, with no separate job - and **two dashboard views** on top of it:\n\n• **Knowledge Gaps** - clusters containing unanswered questions, ranked by a transparent formula (unanswered volume × owner-assigned priority × recency decay, not a black-box model), each with a one-click **AI documentation draft** that reuses the existing ingestion pipeline to publish.\n• **Customer Intents** - every cluster, answered or not, with lazily AI-labelled topics (never labelled on the hot chat path, only when a cluster crosses a size milestone, so cost scales with signal rather than traffic), growth trend, and satisfaction from a new 👍/👎 capture on the widget.\n\nFour of the original eleven - Health Score, Duplicate Detection, Contradiction Detection, and the Relationship Explorer - were explicitly **not built** and roadmapped instead, each with its reason written down: they need real usage data or real infrastructure this product doesn't have yet, and faking them would mean showing a business fabricated numbers about their own content. That refusal is the product decision worth highlighting."

  - type: "text"
    data:
      title: "7. Maturity and Configurability (Phases 7.5-8)"
      content: "**Phase 7.5 - UX maturity pass.** A redesign from a functional-but-generic dashboard to a premium, light, responsive SaaS shell with three real breakpoints. Done as a design-token and shell-level change rather than a page-by-page rewrite, so roughly 15 existing pages inherited the new look for the cost of touching two files.\n\n**Phase 7.6 - product identity.** Renamed the platform (Unicorn Nexus) and the assistant (Nova) across every user-visible surface - while deliberately not rewriting historical decision-log entries that used the old name, on the principle that a changelog documenting a real timeline shouldn't be quietly edited to look like the final name was always the name.\n\n**Phase 8 - personalisation and multi-tenant configurability.** From \"one voice for every tenant\" to configurable Company Settings and a Personalisation engine (assistant name, tone, communication style, emoji usage, language behaviour) - implemented entirely as prompt engineering on the existing model, not a second AI pipeline. One hard rule is enforced in code, not just in the prompt: personalisation can change *how* the assistant answers, and the function signature makes it structurally impossible to skip *whether* it is grounded. Settings changes propagate live to every embedded widget via a config-fetch pattern, so a site owner never re-pastes their embed snippet after a dashboard change."

  - type: "text"
    data:
      title: "8. Decisions Worth Highlighting (with the trade-off)"
      content: "**Tenant isolation via Postgres RLS, not app-code checks.** *Trade-off:* more upfront schema design per table. *Why:* tenant leakage is a security bug, not a UX bug - worth paying for with the database engine's own guarantees rather than developer discipline.\n\n**Skip the LLM call below a similarity floor.** *Trade-off:* a few borderline \"maybe answerable\" questions get the fallback. *Why:* it caps cost on the highest-volume failure mode - obviously out-of-scope questions - for near-zero UX cost.\n\n**11-feature wishlist into 1 engine, 2 views, 4 deferred.** *Trade-off:* less breadth against the requested list. *Why:* it avoided shipping fabricated data on features that need real usage volume or real infrastructure first. The single highest-leverage call in the project.\n\n**Cluster labelling is lazy and milestone-gated.** *Trade-off:* labels can lag a fast-growing cluster briefly. *Why:* LLM spend stays proportional to signal, not to raw traffic.\n\n**Personalisation is prompt-only and required on the answer function.** *Trade-off:* a slightly more rigid function signature. *Why:* it makes an ungrounded personalised answer a structurally impossible state rather than a policy someone has to remember.\n\n**Widget config is fetch-on-load, not baked into the embed snippet.** *Trade-off:* one extra request per widget load. *Why:* it is the literal difference between \"settings changes require re-integration\" and \"settings changes just work\" - a retention detail disguised as a technical one.\n\n**The rebrand didn't rewrite the historical decision log.** *Trade-off:* the log carries an inconsistent product name across its own history. *Why:* an accurate build history is worth more than a cosmetically consistent one."

  - type: "stats"
    data:
      stats:
        - value: "53"
          label: "LOGGED DECISIONS"
          description: "Dated, numbered product and architecture decisions, each with its trade-off, written contemporaneously rather than reconstructed."
          icon: "ClipboardList"
        - value: "8"
          label: "SHIPPED PHASES"
          description: "Auth and multi-tenancy through to per-tenant personalisation - solo, from an empty repo."
          icon: "Layers"
        - value: "11 → 3"
          label: "SCOPE CALL"
          description: "An 11-feature wishlist collapsed into one clustering engine and two dashboard views; four features deferred with reasons."
          icon: "Scissors"
        - value: "~6 KB"
          label: "EMBED WIDGET"
          description: "One script tag, zero dependencies, Shadow-DOM isolated, self-configuring from its own src."
          icon: "Code2"

  - type: "text"
    data:
      title: "9. When Things Went Wrong"
      content: "A portfolio that only shows things going right isn't credible. Three incidents happened during this build, and the response is more representative of judgement than any single feature.\n\n**Silent tracking failure.** A schema migration adding columns to the query log wasn't applied in one environment, so every chat request quietly failed to log - Analytics, Gaps, and Intents all stayed empty while the chatbot itself worked perfectly. The failure was invisible by construction: nothing crashed, no user noticed. Fixed by making the failure loud - server-side logging, a `tracked` flag on the API response, and a `/api/diagnostics` health check with a dashboard banner. The fix is a monitoring feature, not just a patch.\n\n**A CORS bug that only fails in production.** A public endpoint's allowed-methods header listed only `POST`, left over from before any `GET`-based public endpoint existed. It passed every same-origin local test and would have silently broken the very next cross-origin browser request. Caught by testing the actual cross-origin path - a reminder that \"it works when I test it\" and \"it works\" are different claims.\n\n**A committed `.env` with live API keys.** Found mid-session while merging unrelated asset files: a database service-role key that bypasses all row-level security, plus an LLM key, sitting in git history. Handled by flagging it immediately rather than quietly fixing it, explaining the actual blast radius (full data access, not inconvenience), recommending key rotation as the only step that closes the leak, and stopping short of unilaterally rewriting shared git history - that call belongs to whoever owns the repo."

  - type: "text"
    data:
      title: "10. Instrumentation: What \"Working\" Will Look Like"
      content: "This is a solo-built project without live production traffic, so rather than claim invented usage numbers, here is what the product already instruments and how each signal should be read once it has users:\n\n• **\"I don't know\" rate** - the single most important quality metric. Trending down means the knowledge base is closing real gaps, not just growing.\n• **Knowledge gaps resolved vs ignored** - measures whether the gap-detection loop actually drives content work, or just generates a report nobody acts on.\n• **Cluster growth and satisfaction by intent** - surfaces topics that are both high-volume and poorly served, which is the real prioritisation signal for what to document next.\n• **`tracked: true` rate** - an internal health metric that exists because of the silent-tracking incident. If it regresses, every other metric becomes unreliable, so it gates trusting the rest."

  - type: "text"
    data:
      title: "11. Roadmap (sequenced, not a backlog dump)"
      content: "**Phase 9 - Leads.** A widget three-action UI (Chat / Callback / WhatsApp) plus a Leads pipeline page. Needs a real new data model with a status workflow, not a settings tweak.\n\n**Phase 10 - Hosted public chat page** per workspace with location-based greetings. Needs subdomain routing and a geo-IP provider decision not yet made.\n\n**Phase 11 - Marketing copy rewrite.** Sequenced *after* the visual identity so it is written once against the final brand instead of twice.\n\n**Phase 12 - Document relationship pipeline** (duplicates, contradictions, graph). The features cut from Phase 7, now sequenced for when there is enough real content volume to make the signal meaningful instead of fabricated.\n\n**Phases 13-15 - Freshness and usage analytics, Health Score, Smart Recommendations digest.** Each depends on an earlier phase's real data existing first, deliberately ordered so nothing is built on top of a metric that doesn't exist yet."

  - type: "text"
    data:
      title: "What I'd Do Differently"
      content: "**Instrument for the intelligence layer from day one.** The clustering engine retrofits meaning onto a query log that Phase 3 wasn't designed to feed it. It worked because the schema was additive-friendly, but designing the log schema with clustering in mind from the start would have saved a migration.\n\n**Write the \"what we're explicitly not building and why\" doc earlier.** Collapsing the wishlist was the right call, but it was made reactively, mid-phase. Doing that scoping exercise as the first step of any large feature request - before writing code - makes the trade-off visible to a stakeholder before work starts, not after."

navigation:
  next:
    title: "Back to Home"
    link: "/"
---
