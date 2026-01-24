---
title: "Designing a Fraud-Resistant Refund Verification System for Food Delivery"
slug: "zomato-refund-trust"
category: "Refund & Complaint Flow"
order: 1
cardGradient: "from-[#E23744] to-[#f4515E]"
cardHoverGradient: "from-[#cb202d] to-[#E23744]"
logo: "../images/caseStudy/zomatoLogo.png"
audioFile: "/audio/zomatoAudio.m4a"
heroVideo: "/video/zomatoVideo.mp4"
insights:
  - "Trust & Safety Engineering"
  - "Fraud Prevention Strategy"
  - "Adaptive Verification"
  - "AI-Image Forensics"
metaTitle: "Case Study: Zomato Fraud-Resistant Refund System"
metaDescription: "Solving AI-generated refund fraud for Zomato using dynamic Customer Trust Scores and physical verification."
overview:
  sections:
    - title: "The Mission: Scaling Trust in an AI Era"
      content: "As AI image generation becomes more accessible, platforms like Zomato face a new threat: 'Perfect' fraudulent claims. My mission was to design an adaptive verification system that eliminates AI-generated fraud while protecting the experience for 99% of genuine customers."
    - title: "The Problem: The 'Deepfake' Refund Crisis"
      content: "Zomato CEO Deepinder Goyal recently identified a surge in fraudulent refund requests using AI-generated photos of contaminated food. \n\n**The Impact:**\n• **Financial:** Massive 'refund leakage' hitting the bottom line.\n• **Ecosystem:** Restaurant partners losing money on false claims.\n• **Operational:** Support teams overwhelmed by manual verification of high-quality fakes."
  sidebar:
    role: ["Product Manager"]
    duration: "1 week (Rapid Strategy)"
    teamMembers:
      - name: "Mayuresh Mule"
        role: "UX UI Developer"
        image: ""
        linkedIn: "https://www.linkedin.com/in/mayuresh-mule/"
blocks:
  - type: "text"
    data:
      title: "1. Defining the User: Behavioral Segmentation"
      content: "In a trust-based system, we cannot treat all users the same. I segmented our user base into three behavioral tiers based on historical data. This ensures that 'friction' is only applied where risk is highest."

  - type: "image"
    data:
      image: "/images/caseStudy/zomato/Z1.1.png"
      alt: "User segmentation framework by trust score and behavior"

  - type: "text"
    data:
      title: "2. Strategic Prioritization: Impact vs. Effort"
      content: "Solving fraud requires balancing technical complexity with immediate business value. I used an Impact vs. Effort matrix to decide which features would move the needle for the MVP.\n\n**Key Decision:** We prioritized **Adaptive Verification** because it provides high defense against AI with moderate engineering effort, compared to building a custom AI-detection model which is high-effort and prone to errors."

  - type: "image"
    data:
      image: "/images/caseStudy/zomato/Z1.2.png"
      alt: "Prioritization Matrix: Decision making for fraud features"

  - type: "text"
    data:
      title: "3. The 'Aha!' Insight: Action-Based Verification"
      content: "Static images are easy to fake. **Live actions are not.** \n\nThe core insight was to move from 'Proof of Condition' (showing the bad food) to 'Proof of Reality' (showing the user interacting with the food in real-time). By requiring randomized physical actions, we break the automation loop used by fraudsters."

  - type: "text"
    data:
      title: "4. The Solution: The CTS-Based Flow"
      content: "The system runs a **Customer Trust Score (CTS)** evaluation the moment a complaint is filed:\n\n• **Tier 1 (High Trust):** User gets an instant refund. No photos required for low-value orders.\n• **Tier 2 (New/Medium Trust):** Standard photo upload with metadata (EXIF) check.\n• **Tier 3 (High Risk):** **Mandatory Live Verification.** The app disables the gallery and requires a 5-second video or live photo following a random prompt (e.g., 'Move your spoon through the food' or 'Show the restaurant bill next to the container')."

  - type: "text"
    data:
      title: "5. Addressing Edge Cases & Trade-offs"
      content: "**What if a genuine user has bad lighting?**\nThe system allows 2 retries before escalating to a manual support agent. \n\n**What about privacy?**\nWe only capture metadata relevant to the order (time/location) to ensure we aren't over-reaching on user data."

  - type: "stats"
    data:
      stats:
        - value: "25% ↓"
          label: "FRAUD RATE"
          description: "Projected drop in fraudulent payouts by enforcing live verification on high-risk accounts."
          icon: "ShieldAlert"
        - value: "15% ↑"
          label: "PARTNER TRUST"
          description: "Improved restaurant sentiment by reducing false quality claims."
          icon: "Handshake"
        - value: "99%"
          label: "FAST TRACK"
          description: "Percentage of genuine users who still experience instant or near-instant resolution."
          icon: "Zap"
        - value: "OPTIMIZED"
          label: "OPS COST"
          description: "Significant reduction in manual ticket reviews for suspected fraud."
          icon: "TrendingUp"

  - type: "text"
    data:
      title: "Future Roadmap & Expansion"
      content: "1. **Device Fingerprinting:** Identifying 'Fraud Farms' using multiple accounts on one device.\n2. **AI-Forensics:** Integrating server-side checks to detect GAN-generated patterns in uploaded media.\n3. **Incentivized Trust:** Rewarding long-term 'Honest' behavior with Zomato Gold perks or faster support."

  - type: "text"
    data:
      title: "Conclusion"
      content: "This project demonstrates that Product Management in Trust & Safety isn't just about 'blocking'—it's about designing intelligent friction. By using behavioral data and randomized physical prompts, we can outpace the evolution of AI-generated fraud while keeping the platform healthy for everyone."

navigation:
  next:
    title: "Back to Home"
    link: "/"
---