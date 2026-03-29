---
title: "Improve Google Maps for Visually Impaired Users"
company: "Google"
questionNumber: "Q02"
series: "PM 100"
type: "Product"
difficulty: "entry-level"
date: "29 March 2026"
order: 2
cardGradient: "from-blue-500 to-indigo-700"
cardHoverGradient: "from-blue-600 to-indigo-800"
insights:
  - "Google"
  - "Accessibility"
  - "Maps"
  - "Growth"

goal:
  objective: "Increase the end-to-end journey completion rate for visually impaired users by 20% within 6 months of launch."
  measures:
    - "Full funnel completion rate — app open → route start → journey end"
    - "Drop-off rate at each stage (search, route selection, active navigation, arrival)"
    - "Session length delta between visually impaired users and the broader user base"
  whyItMatters: "Google dominates local search, and high-frequency queries like 'restaurants near me' are its primary revenue lever. Visually impaired users who can navigate independently make those searches repeatedly — they become high-LTV, loyal users. Accessibility investment also builds brand equity and reduces regulatory risk in markets where accessibility compliance is becoming mandatory."

market:
  context: "Global sizing (WHO, 2024)"
  funnel:
    - label: "Visually impaired people globally"
      value: "~2 billion"
    - label: "Google Maps users among them (~12.5% of 2B)"
      value: "~250 million"
    - label: "Google-addressable (~75% Maps market share)"
      value: "~187.5 million"
    - label: "Realistic feature adoption (~20%)"
      value: "~37.5 million"
  insight: "At 37.5 million active users, even a conservative ARPU lift of $1/month from increased local search frequency = $37.5 million/month in incremental revenue. This excludes ad impression upside from higher session frequency."

users:
  segments:
    - name: "Companions & Caregivers"
      who: "Family members, guardians, or personal assistants"
      coreNeed: "Peace of mind — know the person arrived safely without calling repeatedly"
      wtp: "High"
    - name: "Independent Mobile Users"
      who: "65–72, semi tech-savvy visually impaired smartphone owners"
      coreNeed: "Travel independently without friction in navigation apps"
      wtp: "Medium"
  focus: "Segment B — Independent Mobile Users. They complete journeys themselves — each successful trip increases their frequency and Google's ad inventory. Solving for Segment B improvements also benefit Segment A downstream."

pains:
  - title: "Silent navigation after route start — no proactive turn alerts"
    frequency: "High"
    severity: "High"
    priority: "P0"
  - title: "No way to share live location with family or caregivers"
    frequency: "High"
    severity: "High"
    priority: "P0"
  - title: "Cannot identify nearby landmarks to orient or direct others"
    frequency: "High"
    severity: "Medium"
    priority: "P1"

features:
  items:
    - name: "Landmark voice alerts"
      reach: 3750
      impact: 3
      confidence: 0.8
      effort: 5
      score: 1800
    - name: "No-Screen navigation mode"
      reach: 950
      impact: 2
      confidence: 0.8
      effort: 8
      score: 190
    - name: "Live location sharing"
      reach: 400
      impact: 2
      confidence: 0.5
      effort: 6
      score: 67
  mvpDecision: "Build in sequence: Landmark voice alerts → No-Screen mode → Live location sharing. Landmark alerts have the best score, moderate effort, and broad appeal beyond the VI segment — making them easiest to get stakeholder buy-in for."

solution:
  name: "Companion Mode"
  features:
    - title: "Landmark Voice Alerts (Ship first)"
      description: "Proactively reads nearby landmarks aloud as the user approaches them (e.g. 'Boots pharmacy on your left in 20 metres'). Works via existing Google Maps Places data — no new data source needed. User can set density preference: major landmarks only vs all named buildings."
    - title: "No-Screen Navigation Mode (Ship second)"
      description: "Screen-off mode that maintains full audio navigation without requiring the display to be active. Proactive turn warnings at 200m, 50m, and at the turn — no user action required. Compatible with TalkBack (Android) and VoiceOver (iOS) — must pass accessibility audit before launch."
    - title: "Live Location Sharing (Ship third)"
      description: "One-tap share of live location with a named contact for the duration of a journey. Recipient sees user's position, estimated arrival, and any deviation from route. Opt-in, journey-scoped (not persistent tracking). Audio confirmation when the recipient starts viewing — reassures the user someone is watching."

metrics:
  northStar: "% of Companion Mode users who complete at least one full journey per week — outcome-based, not feature-based."
  targets:
    - type: "Adoption"
      metric: "% of accounts with Companion Mode active"
      target: "> 30% in 90 days"
    - type: "Quality"
      metric: "Journey completion rate (VI users)"
      target: "+15% vs baseline"
    - type: "Engagement"
      metric: "Sessions per active VI user per week"
      target: "+25% vs baseline"
    - type: "Safety"
      metric: "Avg response time to live location view"
      target: "< 2 min"
  guardrails:
    - "Companion Mode is activated but no journey is completed within 7 days by > 25% of users → signals onboarding friction, not feature value"
    - "Overall Maps session volume drops among VI users after launch → feature is causing confusion, not solving it"

risks:
  - risk: "Assistive tech compatibility (TalkBack / VoiceOver conflicts)"
    likelihood: "High"
    mitigation: "Mandatory accessibility audit with screen reader users before any public release. Dedicated QA pass on both iOS and Android."
  - risk: "Privacy concern — live location sharing misused or accessed without consent"
    likelihood: "Medium"
    mitigation: "Journey-scoped sharing only (not persistent). Explicit opt-in with clear consent UI. No third-party data access."
  - risk: "Low Companion Mode adoption — users unaware feature exists"
    likelihood: "Medium"
    mitigation: "Surface Companion Mode in onboarding for users who have accessibility features enabled at OS level. Partner with VI advocacy organisations for launch."
  - risk: "Landmark data gaps in developing markets reduce feature value"
    likelihood: "High"
    mitigation: "Phase 1 launch in cities with high Places data density (London, NYC, Mumbai). Expand as data quality improves."

summary: "The core bet is that independent navigation is the unlock — visually impaired users who can move freely become high-frequency Maps users and, by extension, high-frequency local search users. Landmark voice alerts are the right first ship: broad appeal beyond the VI segment means easier internal buy-in, and existing Places data keeps effort manageable. No-Screen mode is the real differentiator but requires deeper accessibility work. Phase it, measure completion rates at each step, and only invest in live location sharing once the navigation core is proven."
---
