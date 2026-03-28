---
title: "Design a ride-sharing app for elderly users"
company: "Uber"
questionNumber: "Q01"
series: "PM 100"
difficulty: "mid"
date: "28 March 2026"
order: 1
cardGradient: "from-violet-500 to-purple-700"
cardHoverGradient: "from-violet-600 to-purple-800"
insights:
  - "Uber"
  - "Accessibility"
  - "India"
  - "Growth"

goal:
  objective: "Increase completed rides by elderly users by 20% within 6 months"
  measures:
    - "App open to ride end (full funnel completion rate)"
    - "Driver cancellation rates on elderly bookings — flat or declining"
  whyItMatters: "Elderly users have high trip frequency (medical, social etc) and low price sensitivity. Capturing this segment also builds loyalty with their adult children — future high LTV users."

market:
  context: "India's context — Uber's largest emerging market for this segment"
  funnel:
    - label: "People aged 65+ in India"
      value: "~140 Million / 14 Crore"
    - label: "Smartphone-enabled (15%)"
      value: "~21 Million / 2.1 Crore"
    - label: "Uber addressable (~35% market share)"
      value: "~7.3 Million / 73 Lakhs"
    - label: "Feature adoption (20%)"
      value: "~1.5 Million / 15 Lakhs"
  insight: "At 15 lakhs active users, even a modest ARPU lift of ₹200/month = ₹3 Cr/month incremental revenue. Low asymmetric upside."

users:
  segments:
    - name: "Adult children (25–45)"
      who: "Working professionals"
      coreNeed: "Know parent is safe, book on their behalf"
      wtp: "High"
    - name: "Mobile Comfortable Elderly"
      who: "65–72, semi tech savvy"
      coreNeed: "Book independently, larger UI"
      wtp: "Medium"
    - name: "Fully assisted elderly"
      who: "73+, hands off phone to others"
      coreNeed: "Driver finds them easily, no app needed"
      wtp: "Low"
  focus: "Segment 1 — Adult Children. High WTP, acts as the onboarding agent for the elderly parent, and directly solves the safety anxiety pain point."

pains:
  - title: "Family can't track elderly parent's live ride"
    frequency: "High"
    severity: "High"
    priority: "P0"
  - title: "Elderly users can't find or type destination"
    frequency: "High"
    severity: "High"
    priority: "P0"
  - title: "Driver can't locate elderly pickup (phone not answered)"
    frequency: "High"
    severity: "High"
    priority: "P1"
  - title: "Small text, cluttered UI, wrong button taps"
    frequency: "High"
    severity: "Medium"
    priority: "P1"
  - title: "Emergency / panic situation"
    frequency: "Low"
    severity: "Critical"
    priority: "P2"

features:
  items:
    - name: "Linked family account + live tracking"
      reach: 450
      impact: 4
      confidence: 0.8
      effort: 6
      score: 240
    - name: "Saved frequent destinations"
      reach: 750
      impact: 3
      confidence: 0.8
      effort: 3
      score: 600
    - name: "Simplified large mode UI"
      reach: 300
      impact: 2
      confidence: 0.5
      effort: 8
      score: 37
    - name: "Driver alert: elderly passenger"
      reach: 1500
      impact: 2
      confidence: 0.5
      effort: 1.5
      score: 1000
    - name: "Voice booking agent"
      reach: 225
      impact: 3
      confidence: 0.5
      effort: 14
      score: 24
  mvpDecision: "Ship Driver alert + Linked family account + Saved destinations together as the MVP — solves both booking friction and tracking anxiety in one sprint."

solution:
  name: "Uber Saathi (companion) mode"
  features:
    - title: "Driver briefing flag"
      description: "When an elderly account books, the driver app shows: 'Senior passenger — please call if you cannot locate pickup.' Reduces cancellations caused by the passenger not answering an unknown number."
    - title: "Linked family account"
      description: "Adult child links parent's Uber account via phone number. They can book a ride for the parent from their own app — the ride shows up on the parent's phone with large-format driver details and a single 'Call driver' button. Both accounts see live tracking simultaneously."
    - title: "Saved My Places with friendly labels"
      description: "Family pre-saves 3–5 frequent destinations (hospital, temple, daughter's home). Elderly user sees these as large tappable tiles — no typing required. Labels can be set as 'Doctor' or 'Home' in the user's language."

metrics:
  northStar: "% of active 65+ accounts that complete at least 1 ride per week, booked by themselves or a linked family member"
  targets:
    - type: "Adoption"
      metric: "% of 65+ accounts with a linked family member within 30 days"
      target: "> 30%"
    - type: "Engagement"
      metric: "Weekly active family members opening the tracking view"
      target: "> 60% of linked accounts"
    - type: "Quality"
      metric: "Ride completion rate for elderly"
      target: "+15% vs baseline"
    - type: "Driver"
      metric: "Cancellation rate on senior-flagged rides"
      target: "Flat or declining"
  guardrails:
    - "Family tracking view opens but elderly user unlinks within 7 days at >25% — signals privacy friction"
    - "Overall elderly ride volume drops after launch — feature is causing confusion, not solving it"
    - "Driver complaint rate on senior-flagged rides increases"

risks:
  - risk: "Privacy — elderly user feels surveilled"
    likelihood: "High"
    mitigation: "Tracking only during active ride; parent can unlink at any time; OTP-based consent flow"
  - risk: "Onboarding drop-off — family doesn't complete setup"
    likelihood: "Medium"
    mitigation: "In-app guided flow with <4 steps; WhatsApp deep-link for family invite"
  - risk: "Driver resistance to senior flag"
    likelihood: "Medium"
    mitigation: "A/B test flag visibility; incentivize good ratings on senior rides"
  - risk: "Regulatory — location data retention (DPDP Act 2023)"
    likelihood: "Low"
    mitigation: "Purge location data within 24hr of ride end; align with India's Digital Personal Data Protection Act"

summary: "The core bet is that the adult child is the real product user for this segment — they onboard the parent, they pay, and they carry the safety anxiety that makes this feature worth building. If family-linked tracking works, voice booking is a natural Phase 2 that reuses the same infrastructure. The MVP is deliberately narrow: two features, one sprint, one measurable north star."
---
