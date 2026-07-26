---
title: "ShellScholars: One Link, Many Versions of You"
slug: "shellscholars"
category: "Product Build - In Progress"
status: "Currently building"
order: 0
cardGradient: "from-[#151C28] to-[#0D9488]"
cardHoverGradient: "from-[#0D9488] to-[#151C28]"
logo: "/images/secondary-shellscholars.png"
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
    - title: "What ShellScholars Is"
      content: "**Proof of work, not proof of posting.**\n\nShellScholars is a portfolio builder. Instead of a static resume or a LinkedIn profile you don't fully control, you get one link - your **shell** - that shows the right person the right proof. A recruiter, a friend, and a stranger can each open the same link and see a version tailored to them.\n\n**One link · many versions of you.**"
    - title: "The Problem It Solves"
      content: "The tools people use to represent themselves are each broken in a different way:\n\n• **Resumes** are static, one-size-fits-all, and out of date the moment you send them.\n• **LinkedIn** is a walled garden - you don't own the design, the layout, or who sees what, and everyone sees the same profile.\n• **Personal sites** are powerful, but expensive in time and skill to build and maintain.\n\nNone of them let you control what a specific audience sees. A recruiter, a potential client, and a curious stranger all arrive with different questions - and today you answer all of them with the same page."
  sidebar:
    role: ["Product", "Design", "Frontend", "Database"]
    duration: "Ongoing - building in public"
    teamMembers:
      - name: "Mayuresh Mule"
        role: "Sole product, design & engineering owner"
        image: ""
        linkedIn: "https://www.linkedin.com/in/mayuresh-mule/"
blocks:
  - type: "text"
    data:
      title: "1. The Idea"
      content: "ShellScholars gives every person **one durable link** (`shellscholars.com/p/your-slug`) backed by a portfolio built from drag-and-drop **blocks** - banners, project cards, timelines, metrics, testimonials, bios, contact, and more.\n\nTwo things separate it from a normal site builder:\n\n• **Audience-aware visibility.** For every block you decide what is **public**, what is only visible to **people you approve** (connections), and what stays **hidden**. The same link renders differently depending on who is looking.\n• **It gets better on its own.** Like a phone OS, your shell receives design and presentation upgrades over time. Your content stays yours - only the packaging improves."

  - type: "text"
    data:
      title: "2. Who It's For"
      content: "Anyone who needs to prove what they have done and control who sees it - students, job-seekers, freelancers, founders, career-switchers, and creators across disciplines: Technology, Design, Business, Writing & Media, Sales & Marketing, Healthcare, Legal, Founder, and Education.\n\nThe first wedge is the person who has real work to show but no good surface to show it on: the career-switcher whose resume undersells them, and the builder whose best work lives across five different links."

  - type: "text"
    data:
      title: "3. The 0 to 1 Flow"
      content: "**Step 1 - Claim your shell.** Sign in with Google or a passwordless email magic link. No password to set; new users go straight into onboarding.\n\n**Step 2 - Onboarding wizard (2 steps).**\n• *Your details:* name, location, and a public URL - checked live for availability and suggested from your name.\n• *Choose how to start:* upload a resume and let AI build it (drop in a PDF, image, or text file and ShellScholars extracts roles, skills, education, projects, and milestones, matches a job family, and generates a filled-in shell), start from a discipline template that seeds roughly 10 curated starter blocks, or start from a blank canvas.\n\n**Step 3 - Edit your shell.** Add, reorder, and edit blocks inline on your live page. Set per-block visibility. Save when ready - there is a change log of everything you published.\n\n**Step 4 - Share one link.** Send the same URL to anyone. Connections you approve unlock the blocks you reserved for them.\n\n**Step 5 - Learn from it.** Insights show how your shell is being viewed; connection requests let people ask for deeper access."

  - type: "text"
    data:
      title: "4. Core Concepts"
      content: "The product runs on five nouns, and holding the vocabulary tight is what keeps the UI teachable:\n\n• **Shell** - your portfolio and its single public link. You can have more than one.\n• **Block** - a modular content card (banner, project, timeline, metric, and so on) you drag onto your shell.\n• **Visibility** - a per-block setting: Public, Connections-only, or Hidden.\n• **Connection** - someone you have approved to see your restricted blocks.\n• **Insights** - analytics on how your shell is being viewed."

  - type: "text"
    data:
      title: "5. What's Shipped"
      content: "• One durable public link per shell (`shellscholars.com/p/your-slug`).\n• Drag-and-drop block editor - you always edit your live page, and changes publish on Save.\n• AI resume import that builds a full shell from a PDF, image, or text file.\n• Discipline templates that seed a tailored starter set of blocks.\n• Per-block, audience-aware visibility: public, connections, or hidden.\n• Connection requests and approvals that gate restricted content.\n• Insights and analytics on views.\n• Automatic design and presentation upgrades - your content stays yours."

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
          description: "Discipline templates seed a curated starter shell so the blank page is never the first screen."
          icon: "LayoutGrid"
        - value: "0 to 1"
          label: "SOLE OWNER"
          description: "Product, design, frontend, and database - built end to end on Nuxt and Supabase."
          icon: "Hammer"

  - type: "text"
    data:
      title: "6. Trade-offs I Made"
      content: "**Edit-in-place over a separate builder view.** A preview mode would have been simpler to build, but splitting \"edit\" from \"see\" is exactly what makes portfolio tools feel heavy. You edit the live page and publish on Save.\n\n**Blocks over free-form canvas.** A free canvas gives more freedom and worse output. Constrained blocks keep every shell legible and let me upgrade the design system underneath without touching anyone's content.\n\n**AI import as an accelerator, not an authority.** The resume parser fills the first draft; the user always confirms and edits. Treating extraction as truth would have made the first impression wrong in a way people don't come back from.\n\n**Visibility as a per-block property, not a separate \"private page\".** Audience control belongs on the smallest unit of content, otherwise people end up maintaining two portfolios again."

  - type: "text"
    data:
      title: "7. What I'm Building Next"
      content: "• Deeper insights - not just view counts, but which blocks actually carry a visit.\n• Richer connection flows so requesting and granting access feels social, not administrative.\n• More block types across disciplines, seeded by template.\n• Continued design upgrades that roll out to existing shells without asking anyone to rebuild."

  - type: "text"
    data:
      title: "What I'm Taking Away From It"
      content: "Owning every layer - product, design, frontend, and database - means every scope decision is also an engineering decision. The hardest part of ShellScholars has not been building blocks; it has been deciding what the product refuses to do so the thing it does do stays sharp: give one person one link that tells the right story to the right reader."

navigation:
  next:
    title: "Back to Home"
    link: "/"
---
