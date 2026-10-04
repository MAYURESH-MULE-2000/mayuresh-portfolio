---
title: "Why NRIs in the Gulf start onboarding at SBNRI and don't finish"
company: "SBNRI"
questionNumber: "Q03"
series: "PM Cases"
type: "Teardown"
order: 0
cardGradient: "from-[#0B2545] to-[#13A89E]"
cardHoverGradient: "from-[#13A89E] to-[#0B2545]"
insights:
  - "SBNRI"
  - "Fintech"
  - "NRI Onboarding"
  - "Teardown"

approach: "I'm a frontend engineer, not a finance person, so I started by trying to understand why this company needs to exist at all. Everything here comes from SBNRI's public material, the regulations that govern NRI investing, and published market data. I haven't seen SBNRI's funnel numbers or internal systems, so this is reasoned inference, not an audit. I've said clearly throughout which claims rest on regulation (solid) and which are my read from outside (less so)."

goal:
  objective: "Lift the completion rate from signup start to first funded investment, split into abandoned and rejected."
  measures:
    - "Abandoned - the user stopped on their own. A product problem."
    - "Rejected - the user submitted and got turned down. A documents problem."
    - "Count \"funded\", not \"verified\" - a completed KYC that never receives money earns nothing and shouldn't count as a win."
  whyItMatters: "SBNRI earns when someone completes onboarding and actually funds an account - mainly trail commission on mutual fund distribution (roughly 1 to 1.5% a year on invested assets), plus fees for tax filing and repatriation paperwork. Trail commission is annual, so a user lost at the document step isn't one lost sale. It's closer to a decade of income, plus whatever was already spent getting them that far. The abandoned/rejected split matters more than the headline number: the fixes point in opposite directions, and one combined figure hides which one you have."

market:
  context: "The number in every article about this space is 35 million NRIs. It's close to useless as a market size. Scope here is the Gulf only - the US corridor fails differently (FATCA, PFIC treatment) and is left out on purpose."
  funnel:
    - label: "Overseas Indians, total (MEA, Jan 2026) - 17.8m NRIs + 19.5m PIOs"
      value: "37.3m"
    - label: "In the Gulf - UAE 4.33m, Saudi 2.75m, Kuwait 1.04m, Qatar 0.83m, Oman 0.68m"
      value: "~9.6m"
    - label: "With real investable surplus (my estimate from UAE occupational data)"
      value: "~1.4 to 3.3m"
    - label: "Actually invested in Indian mutual funds (AMFI publishes no NRI breakdown)"
      value: "not public"
  insight: "The Gulf professional is structurally a good customer: Gulf states offer expatriates no citizenship and no pension, so retirement assets have to be built somewhere else - and India is the obvious place. The surplus is real and recurring (Dubai IT roles pay AED 15,000 to 25,000 a month, untaxed). But the real competitor isn't Kuvera or ICICI Direct. It's gold bought in Dubai, land in the home state, and money sitting in a sibling's account - none of which need KYC, attestation or a FATCA declaration."

users:
  segments:
    - name: "Rajesh, 34 - software engineer in Dubai"
      who: "AED 18,000 a month, untaxed. Family with him, parents in Pune. Already has an NRE account and has been meaning to invest properly for two years."
      coreNeed: "Someone to handle the paperwork - the 1 to 1.5% trail is invisible to him."
      wtp: "High"
    - name: "Anjali, 41 - runs a logistics business in Dubai"
      who: "Left Kochi fourteen years ago. Two flats in Kerala, a daughter starting university in India. Larger tickets, several goals."
      coreNeed: "A way in without an Indian mobile number or Aadhaar - almost every Indian fintech shortcut assumes both."
      wtp: "High"
    - name: "Suresh, 29 - site supervisor in Sharjah"
      who: "AED 7,000 a month, still repaying a recruitment agent. Sends most of it home, where it goes into gold and land."
      coreNeed: "Saving, not investing. A ₹5,000 SIP earns ~₹300 of trail in year one against a KYC cost several times that - not who this product is for."
      wtp: "Low"
  focus: "Rajesh is the core customer. Anjali is the most valuable one - and the most locked out, because the users with the biggest portfolios are often the ones who left longest ago."

pains:
  - title: "The attestation wall - NRI KYC needs documents attested by an embassy, notary or overseas Indian bank branch, so onboarding can't be finished in one sitting. If that isn't said upfront, users find out after they've already uploaded a passport. (Regulatory)"
    frequency: "High"
    severity: "High"
    priority: "P0"
  - title: "The Indian mobile number dependency - DigiLocker and Aadhaar both assume an Aadhaar-linked Indian number. The longer someone has been abroad, the more locked out they are. (Regulatory)"
    frequency: "Medium"
    severity: "High"
    priority: "P0"
  - title: "Document consistency failures - name transliteration, address, date of birth, signature and photo disagree across documents issued by different authorities years apart, and fail at the end instead of before submission. (Regulatory)"
    frequency: "Medium"
    severity: "Medium"
    priority: "P1"
  - title: "Trust asked for before trust is earned - handing a passport and PAN to an app is a high-trust act when the alternative is a brother you've known your whole life. (My read, unverified)"
    frequency: "Unverified"
    severity: "Unverified"
    priority: "P2"

features:
  items:
    - name: "Tell people what they'll need, before they start"
      reach: 100
      reachLabel: "100%"
      impact: 2
      confidence: 0.7
      effort: 0.5
      score: 280
    - name: "Let people stop and come back without losing progress"
      reach: 100
      reachLabel: "100%"
      impact: 1.5
      confidence: 0.8
      effort: 2
      score: 60
    - name: "DigiLocker fetch, for users who can use it"
      reach: 40
      reachLabel: "~40%"
      impact: 2.5
      confidence: 0.5
      effort: 2
      score: 25
    - name: "Cross-document validation before submit"
      reach: 25
      reachLabel: "~25%"
      impact: 1.5
      confidence: 0.6
      effort: 1.5
      score: 15
    - name: "A verification path for users with no Indian number"
      reach: 30
      reachLabel: "~30%"
      impact: 2.5
      confidence: 0.4
      effort: 3
      score: 10
  mvpDecision: "Confidence is deliberately low where the problem is my inference rather than something the regulation forces. The last row is the honest one: a verification path for users without an Indian number would most help Anjali, the most valuable customer - and it's also the most expensive and least likely to get approved. I've left it in rather than quietly dropping it, because the ranking should look like a judgment and not a wish list. Two things I considered and dropped: right-to-left layout support (Gulf users here are Indian expatriates working in English) and video KYC scheduling (Dubai is only 90 minutes behind IST)."

solution:
  name: "Build onboarding around returning, not finishing"
  features:
    - title: "First: a pre-flight screen"
      description: "One screen, ahead of the first form field - borrowing the term from the checklist a pilot runs before take-off. The documents named. Which ones need a notary's stamp and the three places that can be done. Honest elapsed time, stated in days rather than minutes. Some people will leave, and that's the point: someone who leaves on screen one costs nothing; someone who leaves at step six has consumed support time, document processing and a compliance review. Fewer starts, more completions."
    - title: "Second: save and resume"
      description: "If attestation makes a single sitting impossible, the flow should be built around returning. Progress survives closing the app, the session expiring, and switching from phone to laptop. On return the user sees what's done and what's left, and the nudge to come back is timed to when they're likely to have the document in hand - not on a fixed schedule that fires while they're still waiting for a notary appointment."
    - title: "Third: DigiLocker, for the users who can use it"
      description: "Documents pulled from DigiLocker are digitally signed by the issuer, so they need no attestation, and SEBI already permits DigiLocker-based KYC. It ranks third because it needs an Indian mobile number - ruling out the long-settled NRIs with the most to invest - and it doesn't hold passports or overseas address proof, which are the attestation-heavy items. It removes the easy document and leaves the hard ones, for a subset of users. Still worth building, but it reduces friction rather than removing it."

metrics:
  northStar: "Completion rate from signup start to first funded investment."
  targets:
    - type: "Diagnostic"
      metric: "Drop-off by step"
      target: "Locates the wall instead of confirming one exists"
    - type: "Diagnostic"
      metric: "Abandoned vs rejected"
      target: "Separates the product problem from the documents problem"
    - type: "Speed"
      metric: "Time from start to funded"
      target: "Trend shows whether sequencing helped"
    - type: "Resume"
      metric: "Return rate after drop-off"
      target: "Tests whether save and resume works"
  guardrails:
    - "Rejection rate mustn't rise - pushing more people to submission by hiding requirements would lift completion while creating compliance work."
    - "Support contacts per completed signup mustn't rise - if completions climb because confused users are calling, the cost has moved rather than gone."
    - "Compliance exceptions stay at zero - attestation is law, not a design preference."
    - "What would tell me I'm wrong: with the pre-flight screen I'd expect starts to fall and completions to rise. If both fall, it should come out. If completion doesn't move within a quarter, attestation isn't the main wall."

risks:
  - risk: "The regulation is fixed - attestation, FATCA declarations and in-person verification are legal requirements."
    likelihood: "High"
    mitigation: "Nothing here removes a step. Every fix changes when the user learns about a step, never whether it exists."
  - risk: "Honest disclosure may reduce starts more than it lifts completions."
    likelihood: "Medium"
    mitigation: "If starts fall further than completions rise, roll it back rather than defend it."
  - risk: "DigiLocker's reach is unknowable from outside - it depends on what share of Gulf users still hold an active Indian number."
    likelihood: "Medium"
    mitigation: "Pull that share first. If it's small the fix is marginal; if it's large it should have been first."
  - risk: "Completion isn't retention - the industry SIP stoppage ratio crossed 100% in March and April 2026."
    likelihood: "High"
    mitigation: "Track funded accounts beyond month one. Fixing onboarding fills a bucket that may be leaking somewhere else."

openQuestions:
  - "Drop-off by step, which would locate the wall instead of inferring it"
  - "Rejection reasons by category, and the real split between abandoned and rejected"
  - "Support ticket themes, which would settle the trust question quickly"
  - "What share of Gulf users still hold an active Indian mobile number"
  - "Any NRI-specific benchmark at all - AMFI publishes no NRI cut of AUM or folios"

summary: "The first thing I'd pull with access is the funnel by step, split into abandoned and rejected. Almost every claim in this teardown is confirmed or killed by that one view. Sources: Ministry of External Affairs, population of overseas Indians (Jan 2026) · AMFI industry data via Business Standard and Finnovate · SEBI and DigiLocker KYC circulars · SBNRI public product pages · published UAE salary and demographic data."
---
