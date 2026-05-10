# Launch Strategy

> Read this document at the start of every phase. Re-read it before every public action.
> This is the difference between a library people dismiss and one people whisper about.

---

## The Fundamental Truth

The libraries that made people whisper didn't announce themselves. They were **discovered**.
The community found them, tried them, and did the announcing.

Your job is to make that discovery inevitable and the first impression undeniable.

**The wrong model:** build → launch → hope for attention.
**The right model:** establish → seed → launch → the community does the rest.

---

## How the Best Launches Actually Worked

| Library | What they did | Why it worked |
|---|---|---|
| **shadcn/ui** | The distribution model WAS the story — copy-paste, not install | The idea spread before anyone ran a component |
| **Tailwind CSS** | Adam Wathan wrote about utility-first CSS for months before launch | By launch, thousands already agreed with the philosophy |
| **TanStack Query** | Showed the PROBLEM publicly and repeatedly before the solution | Community trusted him before the product existed |
| **Vite** | One sentence of pain: "webpack is slow." | Everyone nodded. The solution sold itself. |

**The pattern:** thought leadership before product. Education before announcement. Trust before launch.

---

## The Sequenced Path

### Step 1 — Build in Public (Starting Now)

Your GitHub commit history is already your content. Make it visible.

- Write commit messages that tell a story
- Post occasional updates in Angular communities — not "look at my library" but "here's an interesting problem I solved implementing combobox ARIA correctly"
- Developers collect receipts. When you launch, they'll look at your history and see someone who spent months doing this properly

**The goal:** by the time you announce, you're not a stranger asking for attention — you're someone the community has been quietly watching.

---

### Step 2 — Establish Thought Leadership (During Hardening)

Write. Not about your library — about **Angular UI problems**.

#### Articles to write, in order

**1. The axe-core benchmark article** *(write this when Phase 1 audit is complete)*
> *"I ran axe-core on the 4 biggest Angular component libraries. Here's what I found."*

This is your **biggest pre-launch asset**. It is a news event in the Angular community, not a blog post. It establishes you as the accessibility authority before you've announced a single component. Plan everything around it.

**2. Deep technical education pieces**
> *"Why combobox is the hardest ARIA pattern to get right — and why every Angular library gets it wrong"*
> *"What signals-first actually means for component API design"*
> *"The right way to implement focus management in Angular overlays"*

These are educational. No product pitch. Pure value. They signal deep expertise.

**3. The "State of Angular UI" piece** *(pre-launch)*
> *"What the Angular UI ecosystem is still missing in 2026"*

Frame the gap. When your library fills it, the connection is obvious — and you don't even have to say it explicitly.

**Rule:** every article teaches something real. The library is never the point of the article — it is the natural conclusion a reader reaches themselves.

---

### Step 3 — Seed Before You Announce

Before any public announcement, get **10–15 real Angular developers** using it privately.

- Not friends — people you respect from the community
- Give them early access with zero fanfare
- Ask for brutal, honest feedback
- Collect authentic testimonials from the ones who are genuinely impressed

When you launch, you don't launch alone. You launch with people already saying:
> *"I've been using this for two months and it's different."*

That social proof is worth more than any announcement you could make.

---

### Step 4 — Go Where Angular Developers Actually Live

This is not a Product Hunt play. Not a Hacker News play.

| Channel | How to use it |
|---|---|
| **Angular Discord** | The most active community hub — be present there during hardening, not just at launch |
| **Twitter / X** | Tight, interconnected Angular dev community — the axe-core article goes here first |
| **Angular Weekly newsletter** | Submit for inclusion on launch week |
| **ng-conf** | Annual Angular conference — a demo or talk here is legitimately transformative |
| **Dev.to / Medium** | Publish the educational articles here for reach |

#### People worth connecting with

If any of these people authentically engage with your work, the Angular world notices. Reach out during the seed phase — not to ask for promotion, but to share the benchmark article and ask for a technical opinion.

- Manfred Steyer (Angular Architects)
- Enea Jahollari
- Brandon Roberts
- Deborah Kurata
- Santosh Yadav
- ng-conf organizers

**How to approach them:** share the axe-core benchmark article. Ask for a technical opinion. Build a relationship. Never ask for promotion directly.

---

### Step 5 — The Launch Event

**One launch. One moment.** Not a features list. Not a component catalogue.

#### What the launch looks like

**A 4–5 minute demo video**
Not a tour of every component. A developer building something real — fast, with great autocomplete, with keyboard navigation that just works. Show, don't tell. The video is the thing people share.

**The benchmark article drops the same day**
> *"The most accessible Angular component library — here's the evidence."*
The article and the launch are one event, not two.

**The docs site IS the landing page**
Interactive playgrounds. Copy-paste examples. Live demos. Accessibility notes per component. The docs are the product experience at launch — they must be as good as the code.

**One killer moment**
A single component or interaction impressive enough to screenshot and share. Not a list of features — one thing. A perfectly keyboard-navigable menu. A Dialog focus trap that actually works. Something specific and undeniable.

#### What NOT to do at launch

- Post "I made a thing, check it out" — it signals low confidence
- Lead with a features comparison table — it signals defensiveness
- Launch before the docs site is ready — the first impression is permanent
- Announce on channels where Angular developers aren't

---

### Step 6 — After Launch, Responsiveness IS the Marketing

The Angular community is small enough that how you respond to the first 20 GitHub issues defines your reputation for years.

- Close issues fast
- Write thoughtful, detailed responses
- Say thank you publicly
- Be honest when something is broken
- Ship fixes visibly

The developers who feel heard become your most effective advocates. There is no marketing budget that buys what authentic responsiveness builds.

---

## What "Big Boys Pay Attention To"

They pay attention when:

- The **benchmark is credible and reproducible** — not "we're the best" but "here are the scripts, run them yourself"
- The **quality of the first impression is undeniable** — one component, perfectly done, is more impressive than 76 mediocre ones
- The **author clearly understands the problem space** at a deep level
- Someone they **already trust** says "this is worth looking at"

They do not pay attention to launch announcements. They pay attention to things that other people they respect are already talking about.

---

## Readiness Checklist (Before Any Public Action)

Do not take a step in the launch sequence until the gate before it is passed.

| Gate | Required before |
|---|---|
| Phase 1 axe-core audit clean | Writing the benchmark article |
| Phase 3 complete (all 76 components ≥ 8) | Seeding early access |
| Docs site genuinely impressive | Any public announcement |
| Demo video recorded | Launch day |
| 10+ seed developers with positive signal | Launch day |
| Benchmark article written and ready | Launch day |

---

## The Honest Summary

You are not ready to launch yet — and that is exactly right.

The hardening work you are doing now IS the launch preparation. Every component you evolve to ≥ 8, every a11y test you add, every axe-core violation you eliminate — that is the launch. The announcement is just the moment you let people find what already exists.

> **The Angular ecosystem has been waiting for this library.**
> **Make sure it's ready when they find it.**

---

## Related Documents

| Document | How it connects |
|---|---|
| [`ROADMAP.md`](ROADMAP.md) | Phase gates that unlock each launch step |
| [`COMPETITIVE_STRATEGY.md`](COMPETITIVE_STRATEGY.md) | The benchmark repo and "Built Different" content |
| [`VISION.md`](VISION.md) | The why behind every decision |
| [`COMPONENT_SCORES.md`](../COMPONENT_SCORES.md) | The scoreboard that tells you when you're ready |
