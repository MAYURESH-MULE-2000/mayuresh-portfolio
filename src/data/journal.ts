/**
 * The journal series.
 *
 * To publish a new day: append an entry to `journalEntries`. Everything else -
 * the hub listing, the 21-day tracker, prev/next links, the sitemap - reads
 * from this file, so no other edits are needed.
 */

export type JournalBlock =
  /** Opening paragraph, set larger than body copy. */
  | { type: 'lead'; text: string }
  /** Regular paragraph. Supports **bold** and *italic*. */
  | { type: 'p'; text: string }
  /** Section heading. */
  | { type: 'h2'; text: string }
  /** A short line on its own - a beat, a pause, a punchline. */
  | { type: 'beat'; text: string }
  /** Pull quote / the thing being quoted or resisted. */
  | { type: 'quote'; text: string }
  /** Boxed emphasis with an optional label above it. */
  | { type: 'callout'; label?: string; text: string }
  /** The doom-scroll sequence - rendered as an animated loop. */
  | { type: 'loop'; steps: string[]; caption?: string }
  /** Rapid-fire questions, revealed one after another. */
  | { type: 'questions'; items: string[] }
  /** A named stat with context underneath. */
  | { type: 'stat'; value: string; label: string }
  /** Horizontal rule. */
  | { type: 'divider' }

export interface JournalWord {
  word: string
  meaning: string
  usage: string
}

export interface JournalEntry {
  day: number
  slug: string
  title: string
  /** Short line used on cards and as the meta description. */
  summary: string
  /** ISO date - when the entry was written. */
  date: string
  /** Optional mood tag shown on the card. */
  mood?: string
  blocks: JournalBlock[]
  words: JournalWord[]
}

export const journalSeries = {
  title: 'Becoming Better, One Day at a Time',
  tagline: 'Even if the future is uncertain, I’ll keep moving forward.',
  description:
    'A daily journal by Mayuresh Mule - what I did, what I learned, where I failed, and what I’m trying to improve. Starting with 21 days.',
  /** The first commitment. The tracker fills up against this. */
  goalDays: 21,
  author: 'Mayuresh Mule',
}

export const journalEntries: JournalEntry[] = [
  {
    day: 0,
    slug: 'day-0',
    title: "Why I'm Starting This Journal",
    summary:
      'The introduction. Who I am, how I went from failing Java to leading a Quasar app, and why my real problem isn’t AI - it’s my phone.',
    date: '2026-09-05',
    mood: 'Honest',
    blocks: [
      {
        type: 'lead',
        text: 'Awesome. You landed on a page where probably **none of the people are interested in coming**.',
      },
      {
        type: 'p',
        text: 'Or maybe you are here temporarily, just like me, trying to escape the addiction of social media or games.',
      },
      { type: 'beat', text: 'Either way, welcome. :)' },
      {
        type: 'p',
        text: 'I’m going to start writing journal blogs where I’ll share my daily stories, what I did, what I learned, where I failed, and what I’m trying to improve.',
      },
      { type: 'p', text: 'My first goal is simple:' },
      {
        type: 'callout',
        label: 'The commitment',
        text: '**21 days.**',
      },
      {
        type: 'p',
        text: 'I want to do this consistently for at least 21 days. After that, I’ll continue if my brain still brains. :)',
      },
      {
        type: 'p',
        text: 'But before starting the actual daily journal, this is my **Day 0 introduction**.',
      },

      { type: 'h2', text: 'A little bit about me' },
      {
        type: 'p',
        text: 'I’m **Mayuresh Mule from Mumbai**, and I’ve been working at a startup for a little over four years.',
      },
      {
        type: 'p',
        text: 'I completed my **MCA (Master of Computer Applications) from NMIMS**, and currently, my role is something that I still find difficult to explain in one sentence:',
      },
      { type: 'beat', text: '**UX/UI Developer.**' },
      {
        type: 'p',
        text: 'It sounds simple, but my journey to this role definitely wasn’t.',
      },
      {
        type: 'p',
        text: 'Back in December 2023, I started at the startup where I currently work as a **Web Developer**.',
      },
      { type: 'beat', text: 'And from Day 1, I was given backend development work.' },
      { type: 'p', text: 'Now, this was... complicated.' },
      {
        type: 'p',
        text: 'At that time, I was comfortable with basically one programming language, and ironically, I had already failed in the same language that was suddenly becoming relevant to me:',
      },
      { type: 'beat', text: '**Java.**' },
      {
        type: 'p',
        text: 'I know some tech people might say, “Bro, .NET Core and Java syntax are similar.”',
      },
      { type: 'p', text: 'Maybe they are.' },
      { type: 'beat', text: 'But dude, I hadn’t even tried Java once. 😂' },
      { type: 'p', text: 'So everything felt completely confusing.' },
      {
        type: 'p',
        text: 'I was honestly like **Ishaan Awasthi from** *Taare Zameen Par*, except instead of struggling with school, I was struggling with code and trying to figure out what the hell I was supposed to do.',
      },
      {
        type: 'p',
        text: 'I wasn’t confident about what to say, why to say it, what to do, and what *not* to do.',
      },
      {
        type: 'p',
        text: 'During that phase, I noticed that my startup was outsourcing some of its frontend development and UX design work.',
      },
      { type: 'p', text: 'So naturally, I started observing what those people were doing.' },
      { type: 'p', text: 'Then I started trying to understand their work.' },
      { type: 'p', text: 'And eventually, that became an opportunity.' },
      { type: 'beat', text: 'Or maybe a mistake.' },
      { type: 'beat', text: '**That’s a question I’m still asking myself.**' },

      { type: 'h2', text: 'From Backend to UX/UI' },
      {
        type: 'p',
        text: 'The frontend framework I started working with was **Vue.js**.',
      },
      {
        type: 'p',
        text: 'Honestly, I really like Vue.js. It’s relatively easy to learn and enjoyable to work with.',
      },
      { type: 'beat', text: 'But there’s another reality.' },
      {
        type: 'p',
        text: 'The current job market seems to favour **React and Next.js** much more, while my experience is mainly with **Vue.js, Nuxt, and Quasar**.',
      },
      { type: 'p', text: 'So sometimes I feel like I accidentally narrowed my options.' },
      { type: 'beat', text: 'Then came **Figma**.' },
      {
        type: 'p',
        text: 'I took a Udemy course and learned how to use Figma and understand UX design.',
      },
      {
        type: 'p',
        text: 'A few months later, I took another course because I wanted to learn more.',
      },
      { type: 'p', text: 'And that’s where I felt I made a pretty big mistake.' },
      {
        type: 'p',
        text: 'It was a **Henry Harvin** course where XYZ was teaching UX design.',
      },
      { type: 'beat', text: 'The funny part?' },
      {
        type: 'p',
        text: 'By that point, I felt like I already knew more than the instructor.',
      },
      { type: 'p', text: 'That experience taught me something too:' },
      {
        type: 'callout',
        label: 'Lesson',
        text: '**Not every course is going to teach you something valuable just because you paid for it.**',
      },
      { type: 'p', text: 'Meanwhile, things at work were moving forward.' },
      {
        type: 'p',
        text: 'I went from being a **Web Developer Intern** to working as a **UX/UI Developer**.',
      },
      {
        type: 'p',
        text: 'And for a while, everything felt like it was finally coming together.',
      },
      { type: 'p', text: 'I led the development of our business website.' },
      {
        type: 'p',
        text: 'I worked with **Webflow** to create a new website as part of a migration from WordPress.',
      },
      { type: 'p', text: 'Then I worked on X number of projects.' },
      {
        type: 'p',
        text: 'Eventually, I also got the opportunity to lead an entire application built using **Quasar Framework**, something that can target web, desktop, and mobile applications from a common codebase.',
      },
      { type: 'p', text: 'Looking back, I’ve actually done quite a lot.' },
      { type: 'beat', text: 'But here’s where things get interesting.' },

      { type: 'h2', text: 'Then AI happened' },
      {
        type: 'p',
        text: 'While all of this was happening, AI started becoming a much bigger part of software development.',
      },
      { type: 'p', text: 'And now I’m questioning some of the choices I’ve made.' },
      {
        type: 'questions',
        items: [
          'Why should I spend months learning backend development?',
          'Why should I learn React?',
          'Why should I spend hundreds of hours doing DSA?',
          'Should I be worried about losing my job when AI can already do a huge amount of the work I used to do?',
        ],
      },
      { type: 'p', text: 'These questions have been sitting in my head for a while.' },
      {
        type: 'p',
        text: 'And instead of simply running away from technology, I’m thinking about **pivoting**.',
      },
      { type: 'p', text: 'I’m currently exploring **Product Management**.' },
      {
        type: 'p',
        text: 'Not simply because I’m afraid AI will replace my current role.',
      },
      {
        type: 'p',
        text: 'I actually think PM could be a natural direction for me because I already have experience sitting somewhere between **technology, UX, and business**.',
      },
      { type: 'p', text: 'I’ve worked with the technology.' },
      { type: 'p', text: 'I’ve worked on UX.' },
      { type: 'p', text: 'I’ve worked on products.' },
      { type: 'p', text: 'I’ve seen projects from the inside.' },
      {
        type: 'p',
        text: 'Maybe I can use all of that experience instead of starting completely from zero again.',
      },
      { type: 'beat', text: 'I don’t know yet.' },
      { type: 'beat', text: 'And that’s okay.' },
      { type: 'beat', text: 'I’m still figuring it out.' },

      { type: 'h2', text: 'So what’s the actual problem?' },
      {
        type: 'p',
        text: 'This entire story might make it sound like my biggest problem is AI.',
      },
      { type: 'beat', text: 'It isn’t.' },
      { type: 'beat', text: '**My bigger problem is me.**' },
      { type: 'p', text: 'More specifically:' },
      { type: 'beat', text: '**Scrolling and gaming.**' },
      {
        type: 'p',
        text: 'I want to stay consistent with my work, learn how to use AI properly instead of becoming dependent on it, and prepare for MBA entrance exams.',
      },
      { type: 'p', text: 'But there’s a pretty big obstacle in front of all of that.' },
      { type: 'beat', text: 'My phone.' },
      {
        type: 'stat',
        value: '7-8 hrs',
        label: 'Average phone screen time, every day, for the last month or two.',
      },
      { type: 'p', text: 'And that’s probably one of the worst records I’ve created for myself.' },
      { type: 'p', text: 'I can lose hours scrolling.' },
      { type: 'p', text: 'I can lose hours gaming.' },
      { type: 'p', text: 'And sometimes I don’t even consciously decide to do it.' },
      {
        type: 'loop',
        steps: [
          'I just pick up my phone.',
          'Open something.',
          'Scroll.',
          'Close it.',
          'Open something else.',
        ],
        caption: 'And suddenly an hour is gone.',
      },
      { type: 'beat', text: 'That’s the habit I want to change.' },

      { type: 'h2', text: 'Why this journal?' },
      { type: 'p', text: 'So from tomorrow, I’m starting a series called:' },
      {
        type: 'callout',
        label: 'The series',
        text: '**Becoming Mayuresh**',
      },
      { type: 'p', text: 'Every night, I’ll sit down and write about my day.' },
      {
        type: 'questions',
        items: [
          'What did I do?',
          'What did I learn?',
          'What did I screw up?',
          'Did I waste time?',
          'Did I actually make progress?',
          'What can I do better tomorrow?',
        ],
      },
      {
        type: 'p',
        text: 'I don’t want this to become some fake motivational blog where every day I write:',
      },
      {
        type: 'quote',
        text: 'Wake up at 5 AM. Grind. Hustle. Become successful.',
      },
      { type: 'beat', text: 'No.' },
      { type: 'p', text: 'Some days might be productive.' },
      { type: 'p', text: 'Some days might be terrible.' },
      { type: 'p', text: 'Some days I might completely fail.' },
      { type: 'p', text: 'And I’m going to write about those days too.' },
      { type: 'p', text: 'Because the point isn’t to **look disciplined**.' },
      { type: 'beat', text: 'The point is to **become disciplined**.' },
      {
        type: 'p',
        text: 'I also want to add **three new English words every day** and actually try to use them in my writing.',
      },
      {
        type: 'p',
        text: 'Maybe someone reading these short journals will learn something too.',
      },
      {
        type: 'p',
        text: 'And maybe, years from now, I’ll come back to this Day 0 post and laugh at how confused I was.',
      },
      { type: 'beat', text: 'I hope I do.' },
      { type: 'beat', text: 'Because that would mean I moved forward.' },
      { type: 'p', text: 'So...' },
      { type: 'beat', text: '**This is Day 0.**' },
      { type: 'beat', text: 'Tomorrow, we start Day 1.' },
      { type: 'p', text: 'Let’s see how long my brain actually brains. :)' },
      { type: 'beat', text: '**See you tomorrow.**' },
    ],
    words: [
      {
        word: 'Deliberate',
        meaning: 'Done consciously and intentionally.',
        usage: 'I want to be more deliberate about how I spend my time.',
      },
      {
        word: 'Pivot',
        meaning:
          'To change direction or strategy, especially after learning something new.',
        usage: 'I’m considering a career pivot towards Product Management.',
      },
      {
        word: 'Consistency',
        meaning: 'The ability to continue doing something regularly over time.',
        usage: 'My biggest goal isn’t perfection; it’s consistency.',
      },
    ],
  },
  {
    day: 1,
    slug: 'day-1',
    title: 'I Thought I Was Addicted to Social Media',
    summary:
      'Turns out the apps were never the problem. I uninstalled Instagram and found the same endless scroll waiting on YouTube Shorts, and then on Facebook.',
    date: '2026-09-06',
    mood: 'Blunt',
    blocks: [
      { type: 'lead', text: 'And I have to say it out loud: **I am phone addicted.**' },
      {
        type: 'p',
        text: 'My first goal was to uninstall games and social media platforms. But the problem I identified is that it’s not actually social media.',
      },
      { type: 'beat', text: '**It’s doom scrolling.**' },
      { type: 'beat', text: 'It’s the going and going and going with no end.' },
      {
        type: 'p',
        text: 'I uninstalled Instagram. Then I realised doom scrolling exists on YouTube Shorts too. Shit.',
      },
      {
        type: 'p',
        text: 'And a few minutes after figuring that out, I found that Facebook has the same endless scrolling thing.',
      },
      {
        type: 'beat',
        text: 'And WTF, I watched an entire Doraemon movie through Facebook videos.',
      },
      {
        type: 'loop',
        steps: [
          'Uninstall Instagram.',
          'Open YouTube Shorts.',
          'Realise it’s the exact same thing.',
          'Move to Facebook.',
          'Lose another hour.',
        ],
        caption: 'It’s literally an endless loop.',
      },
      {
        type: 'p',
        text: 'So officially, my problem is not Instagram, Facebook, YouTube, or games.',
      },
      {
        type: 'callout',
        label: 'The real problem',
        text: '**My problem is my phone.**',
      },
      { type: 'beat', text: 'And that makes the problem bigger.' },

      { type: 'h2', text: 'On the learning side' },
      {
        type: 'p',
        text: 'I only revisited concepts I had already learned: coding-decoding and calendars.',
      },
      { type: 'beat', text: 'But my brain is not braining.' },
      {
        type: 'p',
        text: 'There’s something I need to figure out about why I’m struggling to concentrate and actually learn.',
      },
      {
        type: 'p',
        text: 'Maybe the problem isn’t just the phone. Maybe it’s also how I’m approaching learning.',
      },
      { type: 'beat', text: 'I don’t know yet.' },

      { type: 'h2', text: 'So what changes now?' },
      {
        type: 'stat',
        value: 'No change',
        label: 'My screen time on day one. I swapped the apps, not the hours.',
      },
      {
        type: 'p',
        text: 'My screen time didn’t reduce. But today officially confirms one thing:',
      },
      {
        type: 'callout',
        label: 'Confirmed',
        text: '**I am phone addicted. Not social media addicted, not game addicted.**',
      },
      { type: 'p', text: 'So now I need to change my approach.' },
      {
        type: 'p',
        text: 'Instead of trying to suddenly study for hours, I think I need to start learning in **small chunks**.',
      },
      {
        type: 'p',
        text: 'Otherwise it’s going to get difficult to manage everything: learning, my phone, and now this blog too. :/',
      },
      { type: 'beat', text: 'It may be a bad start, but it’s still not the worst.' },
      { type: 'beat', text: 'At least I’ve identified something I need to work on.' },
      {
        type: 'p',
        text: 'From now on, I’m going to decide the night before what I’m doing the next day.',
      },
      { type: 'p', text: 'So my main goal for tomorrow is:' },
      {
        type: 'callout',
        label: "Tomorrow's goal",
        text: '**Complete Ratio and Proportion. Learning plus practice.**',
      },
      { type: 'beat', text: 'Let’s see.' },
    ],
    words: [
      {
        word: 'Compulsion',
        meaning: 'An urge to do something that is very hard to resist.',
        usage: 'Picking up my phone isn’t a decision any more, it’s a compulsion.',
      },
      {
        word: 'Misdiagnose',
        meaning: 'To identify a problem incorrectly.',
        usage: 'I misdiagnosed my problem as social media when it was the phone itself.',
      },
      {
        word: 'Incremental',
        meaning: 'Happening in small stages instead of all at once.',
        usage: 'Small chunks of study is an incremental approach, and I think that’s what I need.',
      },
    ],
  },
]

/** Newest first - what the hub lists. */
export const journalEntriesNewestFirst = [...journalEntries].sort(
  (a, b) => b.day - a.day,
)

export function getJournalEntry(slug: string) {
  return journalEntries.find((entry) => entry.slug === slug) ?? null
}

/** Prev = the day before, next = the day after. Either can be null. */
export function getJournalNeighbours(day: number) {
  const ordered = [...journalEntries].sort((a, b) => a.day - b.day)
  const index = ordered.findIndex((entry) => entry.day === day)
  return {
    prev: index > 0 ? ordered[index - 1] : null,
    next: index >= 0 && index < ordered.length - 1 ? ordered[index + 1] : null,
  }
}

/** Rough reading time, used on cards and in the entry header. */
export function getReadingMinutes(entry: JournalEntry) {
  const words = entry.blocks
    .map((block) => {
      if ('text' in block) return block.text
      if (block.type === 'loop') return block.steps.join(' ')
      if (block.type === 'questions') return block.items.join(' ')
      return ''
    })
    .join(' ')
    .split(/\s+/)
    .filter(Boolean).length

  return Math.max(1, Math.round(words / 200))
}

export function formatJournalDate(date: string) {
  return new Date(`${date}T00:00:00Z`).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  })
}
