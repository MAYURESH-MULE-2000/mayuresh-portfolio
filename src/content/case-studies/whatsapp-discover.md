---
title: "WhatsApp Discover: Turning WhatsApp Into a Local Commerce Mediator"
slug: "whatsapp-discover"
category: "PM Case Study - Product Sense"
status: "Concept study"
order: 2
cardGradient: "from-[#0B1F1C] to-[#25D366]"
cardHoverGradient: "from-[#25D366] to-[#0B1F1C]"
heroImage: "/images/caseStudy/whatsapp-discover/hero.svg"
insights:
  - "Local Discovery"
  - "Consent-First Design"
  - "Free-to-List, Paid Boost"
  - "Interactive Prototype"
metaTitle: "Case Study: WhatsApp Discover - Local Business Discovery via Channels"
metaDescription: "A PM case study adding a local discovery entry point to WhatsApp Channels - opt-in only, merchant-identity hidden, monetised through free-to-list and paid boost. Includes an interactive Android prototype."
overview:
  sections:
    - title: "The gap, in one line"
      content: "WhatsApp has the local merchant base and the broadcast infrastructure (Channels) to support local discovery, but **no discovery entry point** connecting nearby customers to nearby businesses.\n\nDiscovery today happens entirely off-platform - word of mouth, signage, or already having the merchant's number saved. Meanwhile quick-commerce apps solve discovery natively and capture the demand a local merchant would otherwise get organically."
    - title: "The proposal"
      content: "**Discover** is a new entry point into a system that already exists, not a new messaging mechanism. One button, immediately left of Pay, opens a list of nearby opted-in business Channels. You follow the ones you care about; they post catalogue updates; and if you want to buy, *you* start the conversation.\n\nWhatsApp's role is purely as **mediator** - it owns the discovery surface and the relationship layer, not the transaction."
  sidebar:
    role: ["Product Manager", "Prototype"]
    duration: "Self-directed product sense study"
    teamMembers:
      - name: "Mayuresh Mule"
        role: "UX UI Developer"
        image: ""
        linkedIn: "https://www.linkedin.com/in/mayuresh-mule/"
      - name: "Paul Das"
        role: "Sales Development Representative"
        image: ""
        linkedIn: "https://www.linkedin.com/in/pauldass/"
blocks:
  - type: "flow"
    data:
      title: "1. The Discover loop"
      caption: "Every arrow is user-initiated. There is no cold outreach in either direction."
      orientation: "horizontal"
      steps:
        - label: "Tap Discover"
          detail: "New entry point in the Chats header, left of Pay."
          note: "Existing surface"
        - label: "Allow once"
          detail: "Session-based location only - never background tracking."
          note: "Consent gate"
        - label: "See nearby channels"
          detail: "Only businesses that opted in, ranked by relevance and recency."
          note: "Opt-in both ways"
        - label: "Follow"
          detail: "Same mental model as any Channel. The merchant sees a count, never a name."
          note: "Identity hidden"
        - label: "Get updates"
          detail: "Catalogue posts and offers arrive in Updates, with mute and block intact."
          note: "Reversible"
        - label: "You message the shop"
          detail: "Identity flows customer → merchant, only when the customer chooses."
          note: "GMV moment"

  - type: "prototype"
    data:
      name: "whatsapp-discover"
      title: "2. The prototype"
      caption: "An Android shell built to argue the design, not to look pretty. The consent sheet, the hidden-identity rule, and boosted ranking are all playable - those are the three things the case study actually stands on."

  - type: "personas"
    data:
      title: "3. Two sides, one constraint"
      items:
        - name: "Local merchant"
          tag: "Supply side"
          who: "Solo or small local business - grocery, salon, tailor - already using WhatsApp Business daily to talk to existing customers."
          need: "A way to actually acquire nearby customers instead of waiting on word of mouth."
          control: "Opts in to being discoverable; can leave at any time; never receives follower identities."
        - name: "Nearby customer"
          tag: "Demand side"
          who: "Lives or is located inside the discovery radius, and hasn't necessarily met the merchant before."
          need: "Find what's actually available nearby, without installing another app."
          control: "Only sees businesses after explicitly opening Discover; keeps mute, unfollow, and block throughout."

  - type: "callout"
    data:
      variant: "insight"
      title: "Why only WhatsApp can build this"
      content: "No third-party tool (WATI, AiSensy, Interakt, any BSP-layer SaaS) can replicate Discover, because none of them own the social graph or the discovery surface - they only reach a merchant's *existing* contacts through the API.\n\nDiscover depends on owning the identity layer directly. **That's the moat:** not a better tool bolted onto WhatsApp, but a capability only the platform itself can ship. And it extends a product that already exists, so there's no new mental model to teach."

  - type: "table"
    data:
      title: "4. Monetisation: three models, one survivor"
      caption: "The cold-start problem decides this, not the revenue-per-merchant math."
      headers: ["Model", "Mechanism", "Verdict"]
      rows:
        - cells:
            - "Placement / subscription fee"
            - "Merchant pays upfront to be listed at all."
            - "**Rejected.** Excludes the underserved small-merchant tail this is meant to serve, and creates a trap: consumer value can't be proven without merchant density, but density would require paying first."
        - cells:
            - "Transaction fee"
            - "WhatsApp takes a cut of Discover-driven catalogue sales."
            - "**Rejected as primary.** Requires end-to-end payment tracking via WhatsApp Pay, live in only a handful of markets - too geographically constrained to be the core model."
        - cells:
            - "Free-to-list, paid boost"
            - "Every opted-in merchant is discoverable free, ranked by relevance and recency; paying lifts ranking or widens radius."
            - "**Selected.** No barrier to the network effect, no dependency on payment rails, and merchants only pay after seeing organic results - a far easier sell than paying speculatively."
          highlight: true

  - type: "stats"
    data:
      stats:
        - value: "OPT-IN"
          label: "DISCOVERY MODEL"
          description: "Customers only see merchants after opening Discover; merchants never receive follower identities, only aggregate counts."
          icon: "ShieldCheck"
        - value: "FREE"
          label: "TO LIST"
          description: "No listing fee removes the merchant-side barrier to the density a discovery product depends on. Boost is optional and later."
          icon: "Tag"
        - value: "1 DISTRICT"
          label: "PILOT SCOPE"
          description: "Launch dense before wide - a thin catalogue across a huge geography is the fastest way to kill the feature."
          icon: "MapPin"
        - value: "GMV"
          label: "NORTH STAR"
          description: "Local commerce value attributable to a Discover-driven follow - not sessions, not time-in-feed."
          icon: "TrendingUp"

  - type: "callout"
    data:
      variant: "note"
      title: "Measure it as a utility, not a feed"
      content: "Research suggests Discover gets used intent-first - \"I need a bakery near me right now\" - not as habitual browsing. So session frequency is the wrong success signal.\n\n**Leading indicators before GMV is measurable:** merchant opt-in rate inside the pilot radius · share of Discover sessions ending in a follow or visit (conversion of intent, not raw sessions) · follow-to-conversation rate · boost adoption among merchants with organic traction."

  - type: "table"
    data:
      title: "5. Risks and mitigations"
      headers: ["Risk", "Mitigation"]
      rows:
        - cells:
            - "**Privacy and regulatory exposure.** Location-based discovery and merchant-to-consumer connections attract the same scrutiny as other data-driven platform features."
            - "Opt-in and session-based - no passive or background location. Merchants receive aggregate counts and engagement analytics only. This is data minimisation in the design, not a policy promise."
        - cells:
            - "**Cold start.** A discovery feature is worthless with a thin catalogue, but merchants won't opt in before demand is proven."
            - "Free-to-list removes the merchant-side barrier entirely; pilot one dense district to reach usable density before widening."
        - cells:
            - "**Spam drift.** Even with opt-in, aggressive posting after a follow erodes trust."
            - "Standard Channel controls - mute, unfollow, block - stay available throughout, and posting frequency and quality can inform ranking, consistent with existing Business API message-quality handling."

  - type: "callout"
    data:
      variant: "warning"
      title: "Read the research section with this caveat"
      content: "The findings below are **illustrative**. They simulate likely feedback based on market patterns and comparable-product research - they are not a record of interviews actually conducted.\n\nBefore this case study is treated as validated, they need replacing with real conversations. Even 3-4 genuine merchant and customer interviews would substantially strengthen it. Simulated method: 6 local merchants (grocery, salon, tailor, pharmacy, bakery, stationery) and 10 nearby customers."

  - type: "comparison"
    data:
      title: "6. What each side said (illustrative)"
      columns:
        - label: "Merchants"
          verdict: "Simulated"
          tone: "neutral"
          items:
            - "Reach is manual and effortful - messaging customers by hand; bulk tools feel complicated or get ignored"
            - "New-customer discovery is entirely passive - word of mouth or Google, nothing they can influence"
            - "Ban-risk is real: one pharmacy described an account restriction after bulk promotional messages"
            - "\"Only if it brings new customers, not just another way to send messages\" - the acquisition angle is the differentiated pitch"
        - label: "Customers"
          verdict: "Simulated"
          tone: "neutral"
          items:
            - "Discovery today is accidental - Maps, word of mouth, or defaulting to quick-commerce apps"
            - "Consent is a hard boundary: comfort only with self-initiated updates, and discomfort with being \"found\" first"
            - "Low tolerance for over-messaging once followed"
            - "Usage is intent-driven: \"when I'm looking for something specific, not every day\""
        - label: "Still to validate"
          verdict: "Next"
          tone: "positive"
          items:
            - "Do these patterns hold with real merchants and customers? 5-8 genuine interviews using the guide built for this study"
            - "Would merchants actually pay into free-to-list plus boost? Test willingness-to-pay language once organic traction can be described concretely"

  - type: "text"
    data:
      title: "Summary"
      content: "Discover repositions WhatsApp from a pure messaging tool into a local commerce mediator by adding a discovery entry point on top of infrastructure that already exists. It solves a problem no third-party BSP tool can solve, because it depends on owning the identity layer directly. Free-to-list with paid boost avoids gating the network effect the feature depends on, while still creating a monetisation path once density and trust are established.\n\nThe core design constraint - opt-in only, merchant-side identity hidden - is what keeps this from becoming cold-outreach spam. It's treated as non-negotiable throughout the design, not as an afterthought."

navigation:
  next:
    title: "Back to Home"
    link: "/"
---
