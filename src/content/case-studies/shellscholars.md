---
title: "ShellScholars: One Link, Many Versions of You"
slug: "shellscholars"
category: "Product Build - In Progress"
status: "Currently building"
order: 0
cardGradient: "from-[#151C28] to-[#0D9488]"
cardHoverGradient: "from-[#0D9488] to-[#151C28]"
logo: "/images/secondary-shellscholars.png"
liveUrl: "https://shellscholars.com"
liveLabel: "shellscholars.com"
heroImage: "/images/caseStudy/shellscholars/hero.svg"
insights:
  - "0 to 1 Product"
  - "Audience-Aware Visibility"
  - "AI Resume Import"
  - "Nuxt + Supabase"
metaTitle: "Case Study: ShellScholars - A Portfolio Builder for Proof of Work"
metaDescription: "The 0 to 1 story behind ShellScholars - one durable link that renders a different version of you for recruiters, connections, and strangers."
overview:
  sections:
    - title: "Proof of work, not proof of posting"
      content: "ShellScholars is a portfolio builder. Instead of a static resume or a LinkedIn profile you don't fully control, you get one link - your **shell** - that shows the right person the right proof.\n\nA recruiter, a friend, and a stranger can each open the same URL and see a version tailored to them. **One link · many versions of you.**"
    - title: "Why it exists"
      content: "Every tool people use to represent themselves fails at the same job: none of them let you control *what a specific audience sees*. A recruiter, a client, and a curious stranger arrive with different questions - and today you answer all of them with the same page."
  sidebar:
    role: ["Product", "Design", "Frontend", "Database"]
    duration: "Ongoing - building in public"
    teamMembers:
      - name: "Mayuresh Mule"
        role: "Sole product, design & engineering owner"
        image: ""
        linkedIn: "https://www.linkedin.com/in/mayuresh-mule/"
blocks:
  - type: "comparison"
    data:
      title: "1. The problem, four ways"
      caption: "Each existing option breaks somewhere different - and the break is always the same shape: you cannot decide what a given reader sees."
      columns:
        - label: "Resume"
          verdict: "Static"
          tone: "negative"
          items:
            - "One file, one version, sent to everyone"
            - "Out of date the moment you send it"
            - "No way to show working proof - only claims about it"
        - label: "LinkedIn"
          verdict: "Not yours"
          tone: "negative"
          items:
            - "You don't own the design, layout, or ordering"
            - "Everyone sees the same profile"
            - "Depth gets flattened into buzzwords"
        - label: "Personal site"
          verdict: "Expensive"
          tone: "negative"
          items:
            - "Real time and skill cost to build"
            - "Rots the moment you stop maintaining it"
            - "Still one page for every audience"
        - label: "A shell"
          verdict: "Selected"
          tone: "positive"
          items:
            - "One durable link you own"
            - "Per-block audience control"
            - "Design upgrades arrive on their own"

  - type: "callout"
    data:
      variant: "insight"
      title: "The reframe"
      content: "A portfolio isn't a page - it's an **answer to a question**, and different readers arrive with different questions. So visibility belongs on the smallest unit of content (the block), not on the page. That single decision is what makes one link able to be many versions of you."

  - type: "flow"
    data:
      title: "2. The 0 to 1 flow"
      caption: "Signup to shared link, with no blank canvas anywhere in the path."
      orientation: "horizontal"
      steps:
        - label: "Claim your shell"
          detail: "Google or a passwordless magic link. No password to set."
          note: "0 friction"
        - label: "Onboard in 2 steps"
          detail: "Name, location, and a public URL checked live for availability."
          note: "Suggested slug"
        - label: "Seed the content"
          detail: "Upload a resume and let AI build it, pick a discipline template, or start blank."
          note: "Never a blank page"
        - label: "Edit in place"
          detail: "Add, reorder, and edit blocks on your live page. Set per-block visibility."
          note: "Publish on save"
        - label: "Share one link"
          detail: "The same URL for everyone. Approved connections unlock reserved blocks."
          note: "One surface"
        - label: "Learn from it"
          detail: "Insights show how the shell is viewed; requests ask for deeper access."
          note: "Feedback loop"

  - type: "image"
    data:
      image: "/images/caseStudy/shellscholars/onboarding.png"
      alt: "AI resume import review step"
      caption: "Import is an accelerator, not an authority - the parser drafts, the user confirms."

  - type: "table"
    data:
      title: "3. Five nouns the whole product runs on"
      caption: "Keeping this vocabulary tight is what keeps the UI teachable."
      headers: ["Term", "What it means"]
      rows:
        - cells: ["Shell", "Your portfolio and its single public link. You can have more than one."]
        - cells: ["Block", "A modular content card - banner, project, timeline, metric, testimonial, bio, contact."]
        - cells: ["Visibility", "A per-block setting: Public, Connections-only, or Hidden."]
        - cells: ["Connection", "Someone you approved to see your restricted blocks."]
        - cells: ["Insights", "Analytics on how your shell is being viewed."]

  - type: "comparison"
    data:
      title: "4. What each audience gets from the same URL"
      caption: "Visibility is a property of every block, so the page composes itself around the reader."
      columns:
        - label: "Public"
          verdict: "Anyone"
          tone: "positive"
          items:
            - "Banner, bio, headline projects"
            - "Public metrics and testimonials"
            - "Enough proof to decide whether to ask for more"
        - label: "Connections"
          verdict: "Approved"
          tone: "neutral"
          items:
            - "Everything public, plus reserved blocks"
            - "Detailed case studies, salary or client context, references"
            - "Unlocked by an approval you control, one person at a time"
        - label: "Hidden"
          verdict: "Nobody"
          tone: "neutral"
          items:
            - "Drafts and work in progress"
            - "Content parked for a future audience"
            - "Still yours, still on the shell, simply not rendered"

  - type: "image"
    data:
      image: "/images/caseStudy/shellscholars/audience-views.svg"
      alt: "The same shell rendered for the public and for an approved connection"
      caption: "Same link, two readers, two pages."

  - type: "image"
    data:
      image: "/images/caseStudy/shellscholars/editor.png"
      alt: "The ShellScholars block editor with a visibility menu open"
      caption: "You always edit the live page; Save publishes and writes a change log entry."

  - type: "personas"
    data:
      title: "5. Who it's for"
      caption: "Anyone who needs to prove what they've done and control who sees it."
      items:
        - name: "The career-switcher"
          tag: "Primary wedge"
          who: "Has real work across disciplines, but a resume that reads like someone else's job history."
          need: "Show the proof that doesn't fit a resume line, to the one recruiter who will care."
          control: "Keeps the old-career detail hidden without deleting it."
        - name: "The builder / freelancer"
          tag: "Second wedge"
          who: "Ships constantly; the work lives across GitHub, Figma, Notion, and five dead links."
          need: "One durable URL that survives every job change and client."
          control: "Client-specific proof reserved for approved connections."

  - type: "stats"
    data:
      stats:
        - value: "1 LINK"
          label: "ONE SURFACE"
          description: "A single durable URL replaces the resume, the profile, and the scattered project links."
          icon: "Link"
        - value: "3 MODES"
          label: "PER-BLOCK VISIBILITY"
          description: "Public, connections-only, or hidden - the same link renders a different version of you."
          icon: "EyeOff"
        - value: "~10"
          label: "STARTER BLOCKS"
          description: "Discipline templates seed a curated starter shell, so the blank page is never the first screen."
          icon: "LayoutGrid"
        - value: "0 to 1"
          label: "SOLE OWNER"
          description: "Product, design, frontend, and database - built end to end on Nuxt and Supabase."
          icon: "Hammer"

  - type: "decisions"
    data:
      title: "6. Trade-offs I made"
      caption: "Four calls that shaped everything downstream."
      items:
        - decision: "Edit in place, not a separate builder view"
          tradeoff: "A preview mode would have been simpler to build and safer to ship."
          why: "Splitting \"edit\" from \"see\" is exactly what makes portfolio tools feel heavy. You edit the live page and publish on Save."
        - decision: "Blocks, not a free-form canvas"
          tradeoff: "Less creative freedom for the author."
          why: "Constrained blocks keep every shell legible and let me upgrade the design system underneath without touching anyone's content."
        - decision: "AI import is an accelerator, not an authority"
          tradeoff: "An extra confirmation step between upload and a finished shell."
          why: "Treating extraction as truth makes the first impression wrong in a way people don't come back from."
        - decision: "Visibility per block, not a second private page"
          tradeoff: "More state to design and explain per block."
          why: "Audience control on the page level just means maintaining two portfolios again - the exact problem this replaces."

  - type: "timeline"
    data:
      title: "7. Shipped, and what's next"
      items:
        - marker: "Shipped"
          title: "Identity and onboarding"
          description: "Passwordless auth, live slug availability, discipline templates, and AI resume import."
          status: "done"
        - marker: "Shipped"
          title: "The block editor"
          description: "Drag-and-drop editing on the live page, per-block visibility, publish-on-save with a change log."
          status: "done"
        - marker: "Shipped"
          title: "Connections and insights"
          description: "Connection requests and approvals that gate restricted blocks; analytics on how a shell is viewed."
          status: "done"
        - marker: "Next"
          title: "Insights that name the block, not the visit"
          description: "Which blocks actually carry a visit - the signal that tells someone what to write more of."
          status: "next"
        - marker: "Next"
          title: "Richer connection flows"
          description: "Requesting and granting access should feel social, not administrative."
          status: "next"
        - marker: "Next"
          title: "More block types, seeded by discipline"
          description: "Plus continued design upgrades that roll out to existing shells without asking anyone to rebuild."
          status: "next"

  - type: "text"
    data:
      title: "What I'm taking away from it"
      content: "Owning every layer - product, design, frontend, and database - means every scope decision is also an engineering decision. The hardest part of ShellScholars hasn't been building blocks; it's been deciding what the product refuses to do, so the thing it does do stays sharp: give one person one link that tells the right story to the right reader."

navigation:
  next:
    title: "Back to Home"
    link: "/"
---
