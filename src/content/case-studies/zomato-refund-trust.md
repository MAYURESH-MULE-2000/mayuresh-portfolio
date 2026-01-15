---
title: "Strengthening Refund Trust in Food Delivery"
slug: "zomato-refund-trust"
category: "Refund & Complaint Flow"
order: 1
cardGradient: "from-[#E23744] to-[#f4515E]"
cardHoverGradient: "from-[#cb202d] to-[#E23744]"
logo: "../images/caseStudy/zomatoLogo.png"
audioFile: "/audio/zomatoAudio.m4a"
heroVideo: "/video/zomatoVideo.mp4"
insights:
  - "Trust & Safety"
  - "Product Strategy"
  - "Adaptive Verification"
metaTitle: "Case Study: Zomato Refund & Complaint Flow"
metaDescription: "Designing a scalable refund verification system to reduce fraudulent claims for Zomato."
overview:
  sections:
    - title: "The Mission"
      content: "Design a scalable refund verification system that reduces fraudulent claims without degrading the experience for genuine customers."
    - title: "The Problem"
      content: "Zomato relies on image-based complaint submissions to resolve food quality issues quickly. However, recent public discussions by company leadership, including comments by Deepinder Goyal, highlighted increasing misuse of AI-generated images to submit fraudulent refund claims.\n\nThis created a trust and safety gap:\n• Genuine users risk friction and delays\n• Restaurant partners face unfair losses\n• The platform absorbs refund leakage"
  sidebar:
    role:
      - "Product Manager"
    duration: "1 week"
blocks:
  - type: "text"
    data:
      title: "The Outcome"
      content: "Reduce fraudulent refunds while preserving fast resolution for high-trust customers through adaptive verification.\n\nI acted as a Product Manager, owning problem framing, hypothesis formation, solution design, prioritization, and success metrics, while assuming collaboration with Design, Engineering, Trust & Safety, and Support teams."
  - type: "text"
    data:
      title: "Empathizing with the User"
      content: "This problem required empathy without relying on direct interviews, as refund misuse is an adversarial behavior.\n\nHow Understanding Was Built:\nInstead of surveys or interviews, user empathy was built through:\n• Public leadership commentary and industry signals\n• Known marketplace abuse patterns\n• Assumed operational realities of support and restaurant partners"
  - type: "text"
    data:
      title: "Who We’re Building For"
      content: "Rather than static personas, users were segmented by behavior, which is more actionable in trust systems:"
      # \n\nHigh-Trust Customers\n• Rare complaints\n• Expect instant, frictionless refunds\n\nMedium-Trust Customers\n• Occasional complaints\n• Mixed behavioral signals\n\nLow-Trust Customers\n• Frequent refunds\n• Repeated image-based complaints\n\nRestaurant Partners\n• Impacted financially by false claims"
  - type: "image"
    data:
      image: "/images/caseStudy/zomato/Z1.1.png"
      alt: "User segmentation by behavior"
  - type: "text"
    data:
      title: "The “Aha!” Insight"
      content: "In adversarial systems, behavior is more reliable than intent.\n\nImage-only verification fails once AI reduces the cost of fabrication. Trust must therefore be earned dynamically, not assumed uniformly."
  - type: "text"
    data:
      title: "The Strategy"
      content: "The Goal (North Star): Protect trust while minimizing friction\n• Primary metric focus: Refund Fraud Rate\n• Guardrail: Customer Satisfaction for Genuine Complaints\n\nPrioritization Framework (Impact vs. Effort):\n"
  - type: "image"
    data:
      image: "/images/caseStudy/zomato/Z1.2.png"
      alt: "Prioritization Framework Analysis"
  - type: "text"
    data:
      title: "The Solution"
      content: "The MVP: A Customer Trust Score (CTS)–based verification flow:\n• High CTS → Instant refunds (no change)\n• Low CTS → Additional live verification\n\nCore Features:\n• Disable gallery uploads for low-CTS users\n• Enforce camera-only live capture\n• Introduce randomized physical prompts: “Tilt the box”, “Show the restaurant seal”, “Rotate the container”\n\nThese prompts are time-bound, non-repeatable, and difficult for AI to fabricate consistently.\n\nUser Flow (Simplified): Issue reported → CTS evaluated → Verification requested (if required) → Refund decision → CTS updated\n\nCross-Functional Collaboration:\n• Design: Ensure verification feels like “faster resolution”, not punishment\n• Engineering: Camera enforcement, prompt randomization, metadata capture\n• Trust & Safety: Risk thresholds and escalation rules"
  - type: "text"
    data:
      title: "Impact & Results"
      content: "As this is a hypothesis-driven case study, results represent expected directional impact, not actual internal metrics."
  - type: "stats"
    data:
      stats:
        - value: "↓ 20-30%"
          label: "FRAUD RATE"
          description: "Targeted reduction in fraudulent refund claims through adaptive verification."
          icon: "ShieldAlert"
        - value: "REDUCED"
          label: "REFUND LEAKAGE"
          description: "Minimized financial loss from AI-generated or recycled image fraud."
          icon: "TrendingDown"
        - value: "STABLE"
          label: "GENUINE CSAT"
          description: "Zero additional friction for high-trust users ensures satisfaction."
          icon: "Smile"
        - value: "OPTIMIZED"
          label: "MANUAL REVIEW"
          description: "Significant reduction in operational overhead for support teams."
          icon: "Zap"
navigation:
  next:
    title: "Back to Home"
    link: "/"
---
