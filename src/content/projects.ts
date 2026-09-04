import type { Project } from "@/types";

export const projects: Project[] = [
  {
    // Slug, category and tags all used to lead with the design system, which
    // described the deliverable instead of the project: this is a wealth
    // platform, and the system is how three surfaces of it stayed coherent.
    // The old `nivex-design-platform` URL redirects (see `next.config.ts`).
    slug: "nivex-wealth-platform",
    tldr: [
      "Nivex is India's first prescription-based wealth platform: rather than selling a fund, it examines what someone actually holds, diagnoses it, and hands back a written prescription — numbered steps, each with a reason, in plain language.",
      "I led the design end to end: the information architecture, the five stages from financial data to diagnosis to prescription to execution to monitoring, and the diagnosis view that reads income, expenses, loans, insurance, goals and investments as one picture instead of six screens.",
      "Investor, advisor and admin surfaces, built as coded React prototypes on a token-driven system — 25 components and 18 chart patterns — and verified to WCAG 2.1 AA from 320px up.",
    ],
    snapshot: {
      business:
        "Nivex is India's first prescription-based wealth platform, built by Techdome. Retail investing here is product-led — the industry's answer to \"what should I do with my money?\" is a fund to buy or a SIP to start. Nivex borrows the model from medicine instead: you do not walk into a pharmacy and pick a drug, you get examined, diagnosed and prescribed. It runs three services — auditing a portfolio someone already holds, building one from scratch around what they are saving for, and reviewing an active trader's whole tradebook.",
      challenge:
        "Nobody diagnoses first. An investor holding eight overlapping mutual funds, 40% of their net worth in a single stock and a loss-making F&O habit gets shown more products — rather than being told that those three things are the actual problem. A real advisor can read a portfolio properly, but only for a handful of clients a day, and the output ends up in a PDF or a WhatsApp voice note nobody acts on. On top of that, every surface in the category looks like a trading terminal: urgency, streaks, green numbers everywhere. That is exactly the wrong register for the moment someone hands over their financial future.",
      solution:
        "Three things at once. A diagnosis layer that computes real signals — concentration share, fund overlap, cost drag, holdings below cost, F&O share of capital, win rate, goals with no money mapped to them. An advisor surface where AI drafts prescription steps from those signals but a person accepts each one individually. And a token-driven system covering investor, advisor and admin, so one language held three roles instead of three products emerging.",
      impact: [
        "One path a person can finish — financial data, diagnosis, prescription, execution, monitoring — where the category offers a catalogue and calls it advice.",
        "A diagnosis view that reads income, expenses, loans, insurance, goals and investments together, which is the step no product-led competitor performs at all.",
        "AI drafts each prescription step and a human accepts them one at a time, recorded as a decision record so the limit outlives whoever built it.",
      ],
    },
    baseline: [
      {
        metric: "8 funds",
        label:
          "Overlapping holdings in one portfolio, next to 40% of net worth in a single stock — the diagnosis nobody was performing",
      },
      {
        metric: "1 PDF",
        label:
          "Where good advice went to die. An advisor can read a portfolio properly, for a handful of clients a day",
      },
    ],
    flow: {
      label: "What an investor actually does",
      steps: [
        "Choose a service",
        "Import CAS, PAN or tradebook",
        "Processing and review",
        "Read the prescription",
        "Work the numbered steps",
      ],
    },
    // The reframe, made literal. This is the clearest statement of the whole
    // project: not a faster version of the product-led path, a different one.
    flowChange: {
      before: [
        "Ask what to buy",
        "Get shown a product",
        "Open another app",
        "Start a SIP",
        "Never find out whether it helped",
      ],
      after: [
        "Import what you already hold",
        "See the diagnosis: overlap, concentration, cost drag",
        "Get numbered steps, each with a written reason",
        "An advisor approves every one",
        "Track progress against the prescription",
      ],
    },
    tone: "indigo",
    // Sampled off the product's own primary button in the deployed prototype,
    // then checked: 5.89:1 on the page ground, so it carries body-sized link
    // text at AA rather than only working as a large accent.
    brand: "#434ce6",
    shortName: "Nivex",
    title: "Prescription, not product",
    category: "Fintech",
    summary:
      "India's first prescription-based wealth platform: the journey, the diagnosis view and the whole clickable product — investor, advisor and admin — for a service that examines a portfolio instead of selling to it.",
    description: [
      "Nivex prescribes wealth strategy the way a doctor prescribes treatment — examine what someone actually holds, diagnose the real problems in it, then issue specific written steps, rather than selling products off a shelf.",
    ],
    // Lead on this one, not a contributor: the role field is read by the card,
    // the case-study meta row and the résumé, so it is stated once here.
    role: "Lead Designer",
    year: "2026",
    tags: ["Fintech", "Wealth Management", "AI Workflow", "Design System"],
    // How it was built, which is the thing about this project that no domain
    // tag conveys: the whole clickable product — investor, advisor, admin —
    // was built as coded React prototypes conversationally in Claude Code,
    // 262 commits of it, rather than drawn and handed over.
    highlight: "Vibe coded",
    tools: ["figma", "claude", "chatgpt"],
    liveUrl: "https://techdome-io.github.io/nivex-project/",
    featured: true,
    // The card's cover: the real onboarding flow, captured from the deployed
    // prototype. Service choice into import into upload — which puts the three
    // services on the card, and those are the product's shape.
    //
    // 1440x900, cut from a 4:3 desktop capture by trimming 90px of wallpaper
    // top and bottom, so it fills the card's 16:10 exactly with nothing of the
    // window lost. The segment is 1.5s-15.5s deliberately: the product's
    // processing screen is dark, and at 17-18s it would have flashed the card
    // black mid-loop. The prototype navigator button is boxed out of the
    // corner, the same way it is hidden in the page's screenshots — it is a dev
    // affordance, not product UI.
    //
    // No `coverImage`, so the poster is the still. The case study itself has its
    // own hero and does not read these.
    coverVideo: "/images/v3/nivex/cover-loop.98bdf510.mp4",
    coverPoster: "/images/v3/nivex/cover-loop-poster.e9c710c7.webp",
    client: "Nivex, via Techdome",
    duration: "~2 months, 262 commits",
    problem:
      "Retail investing in India is product-led: the default answer to \"what should I do with my money?\" is a fund to buy, an app to open, a SIP to start. Three things break because of it. Nobody diagnoses first — an investor with eight overlapping funds, 40% of net worth in one stock and a loss-making F&O habit is shown more products rather than told those are the problem. Advice does not scale — an advisor can read a portfolio properly for a handful of clients a day, and the output lives in a PDF nobody acts on. And the category has a trust gap: every surface looks like a trading terminal, which is the wrong aesthetic for the moment someone hands over their financial future. Nivex needed a product built on the opposite premise, and a design layer that could hold three different roles — investor, advisor, admin — plus a marketing site, without any of them drifting into a different product.",
    frictions: [
      {
        title: "Diagnosis had no surface to live on",
        body: "Signals like fund overlap, concentration share and cost drag are the actual findings, but a product-led interface has nowhere to put a finding — only somewhere to put an offer. The information architecture had to lead with what is wrong before it could say what to do.",
      },
      {
        title: "The output had to be worth acting on",
        body: "A prescription that reads like a report gets filed. Each step needed a number, an order, and a written reason in plain language, because the thing being asked of an investor is behaviour change, not comprehension.",
      },
      {
        title: "Three roles, one language, no time",
        body: "Investor, advisor and admin want opposite things from an interface — reassurance, authoring speed, and oversight. Designing three products would have been the honest way to fail; the system had to be the shared thing so the surfaces could differ without diverging.",
      },
    ],
    constraints: [
      "Brand voice ruled out the category's defaults explicitly: no crypto aesthetics, no gaming UI or streaks, no noisy dashboards, no decorative illustration, no urgency language, no trend-chasing. The written reference was \"Bloomberg meets Apple\" — data-dense where it needs to be, breathable where it does not.",
      "Slate carries the entire interface. Blue and green are permitted only where they mean something — trust and growth — and red and yellow are reserved for status, never decoration.",
      "Two fonts only, SF Pro falling back to Inter. Motion held to 100–200ms and purposeful, with prefers-reduced-motion respected. WCAG 2.1 AA and mobile-first from 375px, nothing allowed to break at 320px.",
      "Frontend-only with no backend, so no API key could sit anywhere in the bundle. The AI seam is one function returning Promise<string[]>; when a backend exists, only its body changes.",
    ],
    pullQuote:
      "Nothing AI-generated should ever reach a client without a human decision in between.",
    approach: [
      {
        title: "Diagnose first, and give the diagnosis somewhere to live",
        body: "The platform computes the findings before it offers anything: concentration share, fund overlap, cost drag, holdings below cost, biggest loss, F&O share of capital, win rate, and goals with no money mapped to them. Three services front it — audit a portfolio someone already holds, build one from a short set of questions, or review an active trader's whole tradebook — and the investor's dashboard is then shaped by the services they actually own, showing progress against their prescription rather than a generic feed.",
      },
      {
        title: "Tokens as the contract, not a palette",
        body: "313 tokens in three layers — raw primitives, then semantic intent, then theme overrides — authored in W3C DTCG JSON and built through Style Dictionary into light and dark custom properties. A token lint runs on every pull request and nothing is hardcoded anywhere, so every value resolves through the contract: the allocation donut uses chart tokens, the gain figures and the concentration warning use semantic status colours. shadcn/ui re-skinned on those tokens gave the component base; Recharts carries the financial charts; Storybook is the documentation site.",
      },
      {
        title: "Constraints written down before any code",
        body: "A CLAUDE.md the agent reads before every change — kebab-case, BEM, the nine-section component doc template, the no-hardcoded-values rule, mobile-first, WCAG AA, and the brand voice in as many words: no crypto energy, no FOMO, no exclamation points. On top of it, 14 ADRs with context, decision, alternatives and consequences, covering repository structure, token architecture, why shadcn, the admin console, the separate staff login door, the dashboard gate, service-shaped dashboards and chart colours. The ADR is the design rationale; the code is its consequence.",
      },
      {
        title: "AI drafts the prescription; a person still clicks Add",
        body: "Advisors were typing every recommendation from scratch, so drafting from the computed signals was an obvious win — but suggestions live in local component state behind a dashed \"review before adding\" border, and only become plan steps when a human accepts them one at a time. No bulk accept, deliberately: reviewing each draft is the feature, not friction to remove. Cross-sell follows the same rule — a second service is only ever recommended when an advisor has written a human reason for it, which is what stops it being a banner ad.",
      },
      {
        title: "Decisions that came out of building, not drawing",
        body: "Prototypes were the deliverable, so the product argued back. The v1 splash CTA was a full pill; v2 removed pill-shaped primary CTAs entirely, because a pill reads consumer-app and this is someone's retirement. More usefully, a hook named useInvestorCase quietly assumed one service per investor — anyone who bought two saw the wrong dashboard. Making it useInvestorCases meant the nav, the home hero and the cross-sell offer all read from one seam. Neither of those is a decision I would have reached by drawing screens.",
      },
    ],
    // Product outcomes first, the system third. These used to be three
    // design-system metrics in a row, which answered "what did you build?"
    // with "a token pipeline" — true, and the least interesting true thing
    // about a platform that diagnoses someone's money.
    results: [
      {
        metric: "5 stages",
        label:
          "Financial data, diagnosis, prescription, execution, monitoring — one path from what someone holds to what they do about it",
      },
      {
        metric: "One view",
        label:
          "Income, expenses, loans, insurance, goals and investments diagnosed together, rather than as six screens that never meet",
      },
      {
        metric: "313 tokens",
        label:
          "Across investor, advisor and admin, so three surfaces read as one product — and dark mode was a configuration change, not a redesign",
      },
    ],
    outcome:
      "It shipped as a browsable product rather than a deck: the information architecture, the pre-auth and onboarding journeys, and the diagnosis experience for the PWA, plus three role-based prototypes — investor, advisor, admin — and the marketing site, all built on the same system. A floating Prototype Navigator drops a stakeholder straight into a fully-populated dashboard without walking the onboarding first, which is the difference between a demo someone watches and a product they poke at. The system underneath is what let two months cover that much coherently: 25 components, 18 chart patterns, a Style Dictionary pipeline generating themed CSS from one source, and 14 ADRs so the reasoning is legible to someone who was not in the room.",
    disagreement: {
      decision:
        "Keeping AI-drafted prescriptions one-at-a-time. Suggestions sit behind a dashed 'review before adding' border and only become plan steps when staff accept them individually — no bulk accept, deliberately.",
      // TODO: who pushed back, and on what grounds. One or two sentences.
      pushback: "",
      // TODO: what actually happened after. Include the number if there is one.
      result: "",
    },
    learnings: [
      "The reframe did more work than any screen. Once the answer was \"diagnose, then prescribe\" rather than \"recommend a product\", the information architecture, the tone and even the colour rules followed from it — slate everywhere, colour only where it means something.",
      "Designing the constraints beat designing the screens: once CLAUDE.md and the token contract existed, consistency stopped being something I had to police on every change.",
      "Writing the decision down before the code is what made AI-assisted work reviewable. Without the ADR, a diff is just a diff.",
      "The most defensible product decision here is the one that limits the AI. The review step is the feature, not friction — speed is easy to add later, trust is not.",
      "Building instead of drawing found things drawing would not have. A hook name assuming one service per investor was a design bug wearing a code costume, and it only surfaced because the prototype was real enough to be wrong.",
    ],
  },
  {
    slug: "sparrow-api-workspace",
    tone: "slate",
    // Sampled off Sparrow's own Send button. 4.38:1 raw, which the `v3-brand`
    // deepening in globals.css takes past AA for the body-sized links that use
    // it; the raw value stays for diagram strokes, where 3:1 is the bar.
    brand: "#316cf5",
    shortName: "Sparrow",
    title: "A clearer workspace for working with APIs",
    category: "Developer Tools",
    summary:
      "An API platform for developers, organised around hubs and workspaces — with a marketplace so common API work starts from something that already exists.",
    description: [
      "Sparrow is an API client and workspace platform: developers send and script requests, group them into collections, run them as flows, and share the whole workspace with a team. The design problem was never the request pane — it was giving all of that somewhere predictable to live.",
    ],
    role: "Product Designer",
    year: "2025",
    tags: ["B2B SaaS", "Developer Tools", "UX Architecture", "Design System"],
    tools: ["figma", "claude", "chatgpt"],
    liveUrl: "https://docs.sparrowapp.dev/docs/user-manual/introduction",
    featured: true,
    // The card's cover: a scroll through sparrowapp.dev, captured on the
    // desktop. 1440x900, cut from a 4:3 capture by trimming 90px of wallpaper
    // top and bottom, so it fills the card's 16:10 with the browser window
    // whole. Silent, and the whole clip is Sparrow's dark theme, so the card
    // never flashes between grounds mid-loop.
    //
    // No `coverImage`: the poster is the still, and this case study renders its
    // own hero from `sparrow-shots`.
    coverVideo: "/images/v3/sparrow/cover-loop.7604849c.mp4",
    coverPoster: "/images/v3/sparrow/cover-loop-poster.75e44955.webp",
    client: "Sparrow, via Techdome",
    duration: "B2B product design",
    snapshot: {
      business:
        "Sparrow is Techdome's API platform: a client for sending, scripting and asserting on requests, wrapped in a workspace model teams can share. It covers REST, GraphQL, WebSocket and Socket.IO, plus mock collections and chained test flows.",
      challenge:
        "The hard problem in a tool like this is not the request pane, it is everything around it. A developer is simultaneously managing requests, collections, environments, variables, test flows, workspaces, hubs and teammates — and every one of those is somewhere work can get lost. Add features to that without adding structure and you get a pile.",
      solution:
        "One hierarchy, applied everywhere: a hub holds an organisation's workspaces and members, a workspace holds the collections and environments for one body of work, and a request lives inside a collection. On top of it, a marketplace of public workspaces so common API work starts from something that exists, and recent APIs and workspaces kept permanently in reach so the structure never gets in the way of live work.",
      impact: [
        "A predictable answer to where a piece of API work belongs, at every level from hub down to request.",
        "Reuse made first-class rather than incidental: publish a workspace, or start from someone else's.",
        "The same components — request panels, collection trees, workspace cards, tables, status pills — across workspace, hub, marketplace and admin.",
      ],
    },
    constraints: [
      "A developer tool, so density is a feature. The answer could not be to hide capability behind progressive disclosure — the people using it want it all reachable.",
      "Four protocols in one surface — REST, GraphQL, WebSocket, Socket.IO — which the request pane has to absorb without becoming four different screens.",
      "Both a desktop app and a web app, from the same design.",
      "Public and private workspaces in the same model, since a workspace can be published to the marketplace without becoming a different object.",
    ],
    // Countable properties of the product, not business outcomes: there is no
    // post-launch measurement of this work that I can report.
    results: [
      {
        metric: "2 levels",
        label:
          "Hub then workspace — the whole organising idea, applied everywhere so a developer never has to guess where something belongs",
      },
      {
        metric: "4 protocols",
        label:
          "REST, GraphQL, WebSocket and Socket.IO sharing one request surface instead of four separate screens",
      },
      {
        metric: "1 marketplace",
        label:
          "Public workspaces made discoverable, so common API work starts from an existing collection rather than an empty request",
      },
    ],
    outcome:
      "Sparrow ships as a desktop and web app with the hub-and-workspace model, the marketplace, mock collections and test flows in it, and its documentation is public. What I can point at is the architecture and the screens it produced; I have no post-launch measurement of adoption or productivity, so there are no numbers here claiming either.",
    learnings: [
      "Complexity in B2B is usually not optional. What design decides is whether it feels structured and predictable, or whether it feels like a pile — and that is an information-architecture question long before it is a visual one.",
      "The densest screen is the one the architecture is for. Every decision about hubs, workspaces and recents exists so the request pane can stay the widest, calmest thing on screen.",
      "Reuse only works if it is first-class. A template system nobody can find is the same as no template system, which is why the marketplace is a destination rather than a menu item.",
    ],
  },
  {
    slug: "riseangle-ai-video-saas",
    tldr: [
      "AI faceless-video SaaS with tens of thousands of creators — built desktop-first while 73% of actual usage was mobile.",
      "I owned the redesign end to end: analytics audit, then the creation flow, template discovery and the paywall.",
      "Free-to-paid conversion went 4.2% to 9.1% in six weeks, flow completion 42% to 79%.",
    ],
    snapshot: {
      business:
        "RiseAngle lets creators make and schedule faceless TikTok and YouTube Shorts using AI — no filming, no editing. It had grown to tens of thousands of active creators on a product built desktop-first.",
      challenge:
        "73% of usage was mobile, on an interface designed for a desktop browser. Creating one video took eleven steps, template browsing was a form rather than a gallery, and the paywall was a lock screen with no explanation attached. Free users were not converting, and many were abandoning the creation flow before finishing a single video.",
      solution:
        "I started with an analytics audit rather than a redesign, then rebuilt the three screens the numbers pointed at: an eleven-step flow became a four-step mobile wizard with bottom sheets and an inline live preview, the template picker became visual-first, and the paywall became a value-first upgrade path.",
      impact: [
        "Free-to-paid conversion rose from 4.2% to 9.1% in six weeks after launch.",
        "Creation flow completion went from 42% to 79%.",
        "Mobile session drop-off fell from 58% to 24%.",
      ],
    },
    baseline: [
      {
        metric: "11 steps",
        label: "To create one video, on a screen built for desktop",
      },
      {
        metric: "4.2%",
        label: "Free-to-paid conversion, while 73% of usage was mobile",
      },
    ],
    flow: {
      label: "Creating a video",
      steps: [
        "Pick a preset",
        "Add prompt or image",
        "Generate, with live preview",
        "Track progress",
        "Publish to Shorts / TikTok",
      ],
    },
    flowChange: {
      before: [
        "Browse templates",
        "Configure form",
        "Set voice",
        "Set captions",
        "Set schedule",
        "Review",
        "Generate",
      ],
      after: ["Pick a preset", "Add prompt", "Generate with live preview", "Publish"],
    },
    tone: "slate",
    shortName: "RiseAngle",
    title: "11 steps to 4, conversion doubled",
    category: "SaaS",
    summary:
      "A redesign of an AI faceless-video SaaS that took free-to-paid conversion from 4.2% to 9.1% by rebuilding the creation flow mobile-first.",
    description: [
      "RiseAngle lets creators make and schedule faceless TikTok and YouTube Shorts using AI — no filming, no editing. The product had grown to tens of thousands of active creators, but it was built desktop-first while 73% of users were actually on mobile, and growth was stalling.",
      "I redesigned the creation flow, template library and monetisation UX across both platforms — starting with an analytics audit rather than jumping straight to redesign. The 11-step creation flow became a 4-step mobile-first wizard with bottom sheets and an inline live AI preview; template browsing moved from a form-based picker to a visual-first gallery; and the paywall changed from a hard, contextless lock screen into a value-first upgrade path.",
      "Six weeks post-launch: free-to-paid conversion rose from 4.2% to 9.1%, flow completion rate went from 42% to 79%, and mobile session drop-off fell from 58% to 24%.",
    ],
    role: "End-to-End Product Designer",
    year: "2025",
    tags: ["SaaS", "Mobile-First", "Conversion", "AI"],
    tools: ["figma", "chatgpt"],
    // A transparent mockup rather than a screenshot, so it sits on the card's
    // own ground in either theme — and `contain`, because cropping two phones
    // to fill a landscape panel cuts the product in half.
    brand: "#EB00D4",
    // Screen captures of the shipped flows, converted from the GIFs on the
    // Framer build — 58MB of GIF became about 1MB of H.264, which is the
    // difference between a section that loads and one that does not.
    showcase: {
      label: "Final design",
      heading: "Three flows. One experience that works on every screen.",
      caption:
        "The creation wizard, the visual template gallery and the upgrade path — the three screens the analytics pointed at, running on a phone.",
      media: [
        {
          video: "/images/v3/riseangle/create-video.mp4",
          poster: "/images/v3/riseangle/create-video-poster.jpg",
          label: "Create a video",
        },
        {
          video: "/images/v3/riseangle/browse-templates.mp4",
          poster: "/images/v3/riseangle/browse-templates-poster.jpg",
          label: "Browse templates",
        },
        {
          video: "/images/v3/riseangle/upgrade.mp4",
          poster: "/images/v3/riseangle/upgrade-poster.jpg",
          label: "Upgrade to Pro",
        },
      ],
    },
    coverImage: "/images/v3/riseangle-cover.webp",
    coverFit: "contain",
    // The card gets the loop instead of the still: this is the one project
    // whose product is video, and three phones running the real app say that
    // faster than a caption does. The case-study page above still opens on
    // `coverImage` — see `coverVideo` in the type for why.
    //
    // 1152x720: the source animation's full 4:3 frame, padded out to 16:10 on
    // both sides rather than cut down to it. An earlier pass took 54px off the
    // bottom to lose the `jitter.video` watermark and clipped the centre
    // phone's base doing it. The watermark sits at x=795..960, nowhere near the
    // centre phone at x=325..640, so it is boxed out in place instead — the
    // corner behind it is already pure black, which is why a flat dark box
    // disappears into it. Full height, no clipping.
    //
    // The side phones still run off the bottom. That is the animation's own
    // composition, not a crop applied here: they leave the source frame at
    // y=720, so no framing on this end can bring them back.
    coverVideo: "/images/v3/riseangle/cover-loop.d71a82d1.mp4",
    coverPoster: "/images/v3/riseangle/cover-loop-poster.28405fb7.webp",
    // The two screens that carry no single argument in "The work": the preset
    // library the template redesign produced, and the sign-in the whole funnel
    // starts at.
    gallery: [
      "/images/v3/riseangle/presets.webp",
      "/images/v3/riseangle/login.webp",
    ],
    liveUrl: "https://subh-portfolio2026.framer.website/case-study-riseangle",
    featured: true,
    client: "RiseAngle",
    duration: "3 months",
    problem:
      "RiseAngle lets creators make and schedule faceless TikTok and YouTube Shorts using AI — no filming, no editing. The product had grown to tens of thousands of active creators, but it was built desktop-first while 73% of users were actually on mobile, and growth was stalling. Free users weren't converting, and a lot of them were dropping out of the creation flow entirely before finishing a single video.",
    frictions: [
      {
        title: "A desktop flow on a phone",
        body: "Eleven steps meant eleven chances to leave, and each one was a form field sized for a mouse. The drop-off curve did not have one cliff — it leaked at every step, which is the signature of an interface fighting its device rather than one broken screen.",
      },
      {
        title: "Waiting with nothing to look at",
        body: "AI generation takes real time, and the old flow spent it on a spinner. Creators had no way to tell whether the output would be worth the wait, so the safest move was to abandon and not spend the credit.",
      },
      {
        title: "A paywall with no argument",
        body: "The upgrade prompt was a lock screen that appeared at the moment of highest intent and explained nothing. It asked for money before the product had demonstrated why it was worth any.",
      },
    ],
    constraints: [
      "An existing user base of tens of thousands meant the redesign had to be recognisable, not a reset.",
      "AI generation latency is a real technical floor — it could be designed around, not removed.",
      "Both platforms had to ship, so nothing could depend on mobile-only or desktop-only behaviour.",
    ],
    pullQuote:
      "The analytics audit came first for a reason. Redesigning the screens I thought were broken would have missed the paywall entirely — and the paywall turned out to be about a third of the lift.",
    approach: [
      {
        title: "Audit before redesign",
        body: "I started in the analytics rather than in Figma: where sessions ended, which steps were abandoned, what device they were on. That is what surfaced the 73% mobile split and pointed at the paywall — a screen I would not have prioritised on instinct.",
      },
      {
        title: "Eleven steps down to four",
        body: "The creation flow became a mobile-first wizard using bottom sheets, so each decision arrives one at a time with the previous choice still visible. Everything that could be defaulted was defaulted, and everything optional moved out of the critical path.",
        image: "/images/v3/riseangle/my-videos.webp",
      },
      {
        title: "Generation latency as a design surface",
        body: "Rather than hiding the wait, the flow shows an inline live preview while the video builds. The wait becomes the moment the creator sees it working, which is the opposite of a spinner — and it turned the product's biggest technical constraint into a reason to stay on the screen.",
        image: "/images/v3/riseangle/library-progress.webp",
      },
      {
        title: "A paywall that makes the case first",
        body: "The lock screen became a value-first upgrade path: what the plan unlocks, priced against what the creator was already trying to do, shown at the point they were trying to do it. This single change accounted for roughly a third of the total conversion lift.",
        image: "/images/v3/riseangle/pricing.webp",
      },
    ],
    results: [
      {
        metric: "4.2% → 9.1%",
        label: "Free-to-paid conversion, six weeks post-launch",
      },
      {
        metric: "42% → 79%",
        label: "Flow completion rate",
      },
      {
        metric: "58% → 24%",
        label: "Mobile session drop-off",
      },
    ],
    outcome:
      "Six weeks after launch, conversion had more than doubled and completion had nearly doubled with it. The more useful outcome for me was the order of operations: the audit found the paywall, and the paywall was the single highest-return screen on the project. Designing what looked broken would have missed it.",
    disagreement: {
      decision:
        "Spending the opening of the engagement on an analytics audit instead of starting the redesign. The audit is what surfaced the paywall as the highest-return screen on the project.",
      // TODO: who pushed back, and on what grounds. One or two sentences.
      pushback: "",
      // TODO: what actually happened after. Include the number if there is one.
      result: "",
    },
    learnings: [
      "Analytics before Figma: the highest-return screen on this project was not the one my instinct pointed at.",
      "Designing around a real technical constraint — generation latency — produced a better experience than hiding it would have.",
      "Value-first framing at the paywall mattered more than expected, and it cost nothing to build.",
    ],
  },
  {
    slug: "wizlo-form-builder",
    tldr: [
      "Wizlo is a clinical EMR for telehealth clinics running care paths like GLP-1 weight management, TRT and HRT. Its form builder is how a clinic encodes intake: the PHI a form collects, the eligibility gates that decide who can be treated, and the order it terminates in.",
      "I owned the 2.0 redesign end to end, in coded prototypes rather than static frames: the wizard-to-canvas foundation, the forms hub, and the whole logic and AI layer. Colleagues took the later refinement passes, the sprint-scoped template gallery and the Brand Studio integration.",
      "Dialogs gone from field and rule editing, a node canvas that makes a form's branching visible and walkable before publishing, and full parity with 1.0's rules so no clinician had to relearn anything.",
    ],
    snapshot: {
      business:
        "Wizlo is a clinical and patient SaaS — EMR and telehealth — used by clinics running care paths like TRT, HRT, GLP-1 weight management and hair restoration, across a provider app and a patient portal. Forms are its front door: intake is the first clinical touchpoint, collecting PHI, medical and medication history, contraindications and consent before a patient ever speaks to a clinician.",
      challenge:
        "Forms 1.0 was a step-by-step wizard. Editing a field opened a popup; authoring a rule opened another, so the form was never on screen beside the thing being changed. That was merely slow for a ten-field form and actively risky for a fourteen-page branching intake, because conditional logic in a telehealth clinic is not cosmetic — a rule like \"history of thyroid carcinoma → disqualify\" is a clinical safety gate, and it was the most buried thing in the product.",
      solution:
        "I replaced the wizard with a three-panel direct-manipulation canvas, then built the logic layer twice over: inline rule cards in the properties panel that read back as plain English, and a full-screen node canvas where every page is a node and every arrow a real condition — with a simulate mode that walks a branch as a patient would, before anything is published.",
      impact: [
        "Field and rule editing left dialogs entirely: the form stays visible while you change it, and edits render live on the canvas.",
        "A form's branching became visible and testable — the canvas draws every condition, and simulate mode evaluates them live without publishing.",
        "Migration was designed as a non-event: 1.0's operator and action set maps into the new panel unchanged, so a rule a clinician already knew is authored the same way.",
      ],
    },
    baseline: [
      {
        metric: "2 dialogs",
        label:
          "One to edit a field, another to author a rule — and neither showed you the form you were changing",
      },
      {
        metric: "14 pages",
        label:
          "The longest branching intake, with no view of its own flow: the decision tree existed only in the author's head",
      },
    ],
    flow: {
      label: "How a clinic encodes an eligibility gate",
      steps: [
        "Pick the trigger question",
        "Choose an operator",
        "Set the value",
        "Choose the action",
        "Walk the branch in simulate mode",
      ],
    },
    // Authoring one conditional rule, counted the same way on both sides. The
    // step count barely moves; what changes is that every step in the second
    // list happens against a visible form, and the last one did not exist at
    // all before — there was no way to test a gate without publishing it.
    flowChange: {
      before: [
        "Open the field's popup",
        "Open a second popup for logic",
        "Type the condition blind",
        "Dismiss both dialogs",
        "Re-read the form to see what changed",
        "Publish to find out if the branch works",
      ],
      after: [
        "Select the field on the canvas",
        "Open its Logic tab in the panel",
        "Read the rule back in plain English",
        "Watch the canvas update live",
        "Walk the branch in simulate mode",
      ],
    },
    tone: "violet",
    // Sampled off the product's own Publish button rather than guessed, and
    // checked before use: 6.00:1 on the page ground, so it carries body-sized
    // link text at AA rather than only working as a large accent.
    brand: "#713add",
    shortName: "Wizlo",
    title: "Modal wizard to a visible decision tree",
    category: "Healthcare",
    summary:
      "Owned the Form Builder 2.0 redesign for a clinical EMR — the tool a non-technical clinic uses to author intake, encode its eligibility gates and take an order, without an engineer.",
    description: [
      "Wizlo is a clinical and patient SaaS for telehealth clinics — an EMR running care paths like GLP-1 weight management, TRT, HRT and hair restoration across a provider app and a patient portal. Its form builder is the tool clinics use to author intake: the PHI a form collects, the conditional logic that decides eligibility, and the checkout and identity verification it ends in.",
    ],
    role: "Product Designer",
    year: "2026",
    tags: ["Healthcare", "EMR", "Conditional Logic", "AI"],
    tools: ["figma", "claude", "chatgpt"],
    // No `liveUrl`. The old one pointed at the patient-portal page, which is a
    // different piece of work; this initiative lives in an internal prototype
    // repo with real tenant data in it, so there is nothing public to link.
    featured: true,
    // The card's cover. A capture of the builder rather than a still: the whole
    // argument of this work is that a clinician assembles a clinical form by
    // direct manipulation, and a screenshot of a half-built form cannot show
    // that it was built.
    //
    // The builder window on the desktop it was recorded on, wallpaper and all,
    // cut to 960x600 — the card's own 16:10 — so it fills the frame edge to
    // edge with no matte and nothing cropped. The wallpaper is what makes that
    // possible: the 4:3 source had ~120px of it to give up top and bottom,
    // while the window itself sits at y=183..557 and never enters the crop.
    //
    // No `coverVideoFit`, because `cover` is the default and this clip is cut
    // to fit. No `coverImage` either: the poster is the still.
    //
    // The hash in the filename is the content's, and it is there because a
    // re-export under a stable name is invisible to anyone whose browser
    // already holds the old one — which is exactly what happened while these
    // two files were being iterated. Re-encode, re-hash, change these lines,
    // and every browser fetches it as the new URL it is.
    coverVideo: "/images/v3/wizlo/cover-loop.53a05287.mp4",
    coverPoster: "/images/v3/wizlo/cover-loop-poster.851cef25.webp",
    client: "Wizlo",
    duration: "~13 prototype variants across 8 tickets",
    problem:
      "In async telehealth the intake form is not a CMS nicety, it is the clinical encounter. It collects PHI, medical and medication history and contraindications; it encodes the eligibility gates that decide whether a patient can be treated at all; it carries product, subscription and bundle fields; and it terminates in checkout and identity verification. Every clinic needs a different one — per care path, per state's regulations, per protocol — and clinics are not engineers. If authoring a form needs a developer, the platform does not scale, which puts this tool's usability directly on the critical path for onboarding a clinic. Around a quarter of users are tenant admins, and the internal onboarding team lives in this interface daily. Forms 1.0 was a step-by-step wizard: slow for the common case of a five-to-fifteen field form, modal-heavy so the form was never visible beside the field being edited, and with no spatial model at all for a fourteen-page branching intake. Its logic existed — show/hide, jump-to-page, required/optional — but was buried in popups, so clinics under-used it or got it wrong. The brief set targets to design against: halve median creation time, one-click field reordering, a ten-field intake published in under three minutes, and full parity with 1.0's logic. Those were the bar the work was reviewed against, not numbers measured after launch.",
    frictions: [
      {
        title: "The form was never on screen with the edit",
        body: "Every field change happened in a dialog stacked on top of the thing it was changing. You made an edit, dismissed the popup, then looked to see what you had done — a loop that turns authoring into guess-and-check, and gets slower the longer the form gets.",
      },
      {
        title: "A decision tree with no picture of itself",
        body: "A branching intake is a graph, and the builder only ever showed it as a list. Nothing in the interface could answer whether a patient could reach a dead end, whether a disqualification gate actually fired, or whether a branch had orphaned a page — the questions that matter most and were the hardest to ask.",
      },
      {
        title: "The safety-critical part was the most buried",
        body: "In a GLP-1 or TRT clinic the conditional rules are the eligibility gates: they decide who gets treated. That logic lived at the bottom of the deepest popup in the product, which is precisely backwards — the feature carrying clinical consequence had the worst access of anything in the tool.",
      },
    ],
    constraints: [
      "A multi-designer initiative. I authored the foundational redesign, the forms hub and the whole logic and AI layer; the later refinement passes, the sprint-scoped template gallery and the Brand Studio styling integration were colleagues' work.",
      "Parity before expansion. The migration pass was explicitly forbidden from adding operators, because a clinician who already knew a 1.0 rule had to be able to author it in the new panel without training.",
      "Checkout and identity verification are Gr4vy's and Vouched's interfaces at runtime, so the builder could only ever show placeholders for those pages — never a mockup that would not match production.",
      "Clinical eligibility rides on the output. An authoring mistake here is not a cosmetic bug, so the tool had to make a wrong rule hard to write and easy to see.",
    ],
    pullQuote:
      "In a clinical context, an AI that confidently attaches an eligibility rule to the wrong question is worse than one that says it did not understand.",
    approach: [
      {
        title: "Wizard to three panels",
        body: "Palette and page list on the left, the form as the patient will see it in the centre, contextual properties for whatever is selected on the right. Selecting a field on the canvas populates the right panel and edits render live; drag from the palette to add, drag within the canvas to reorder. This is the single change that converts filling in a wizard into editing a document, and it is what removed the dialogs rather than merely making them prettier.",
        image: "/images/v3/wizlo/builder.6cb6d001.webp",
      },
      {
        title: "Rules that read back in plain English",
        body: "Every field and page gets a Logic tab: numbered three-step cards of trigger, operator and value, with Show, Hide, Require, Jump to and Disqualify as actions, chained by an AND/OR toggle. Under each rule sits a live sentence restating it in plain language, so nobody has to mentally compile a condition. The value input is field-type aware — pick a radio field and it offers that field's own options, a date field gets a date picker, a checkbox defaults to \"is checked\" — so a nonsense comparison cannot be authored in the first place.",
        image: "/images/v3/wizlo/logic-rules.3227b263.webp",
      },
      {
        title: "Guardrails built into what the picker offers",
        body: "A rule is three numbered steps — what question triggers this, when the answer is, this value — then an action: show, hide, jump to, disqualify. The guardrail is in the pickers. Choose Show and the \"which field?\" list only offers fields that come after the trigger, so a rule cannot reach backwards and depend on an answer the patient has not given yet. The constraint is enforced by what the interface hands you, not by a validation message after the fact.",
        image: "/images/v3/wizlo/field-rule-editor.5086b15c.webp",
      },
      {
        title: "A canvas that shows the form's shape, and lets you walk it",
        body: "A full-screen node view: each page a draggable node, each arrow a real condition. There is deliberately no separate \"default flow\" concept — sequential connections are seeded on first open and share the same code path as conditional ones, so grey means unconfigured sequence and violet means conditional, and the author holds one mental model instead of two. Nodes expand to show their fields with a badge counting the rules each carries, and one page can branch to several targets, evaluated in order, first match wins. Simulate mode is the payoff: walk the form as a patient from inside the canvas, with the active node highlighted and visibility evaluated live against the real conditions. You author an eligibility gate and confirm it fires without publishing to find out — which, for a rule that decides who gets treated, is the difference between a design and a safeguard.",
        image: "/images/v3/wizlo/logic-canvas.f01db6b1.webp",
      },
      {
        title: "AI that refuses to guess",
        body: "The assistant can build a form from a description, add a field, add a page or author a condition — and the part I would defend hardest is what it does when it cannot. Asked something it cannot parse, it says so and names what it does handle, rather than attaching a rule to the nearest question it can find. In a tool where a condition decides whether a patient is eligible for treatment, an AI that is confidently wrong is worse than one that admits it did not understand. Everything it does produce lands in the same editable primitives a human would have made, so nothing it touches is a black box.",
        image: "/images/v3/wizlo/ai-refusal.1683a2b1.webp",
      },
      {
        title: "Parity as the migration plan, and rollback as a requirement",
        body: "A dedicated pass mirrored 1.0's operators and actions into the new shell with no additions, so the redesign asked nobody to relearn a rule they already knew — it only removed the friction around it. Alongside it, version history keeps named snapshots of full form state with save, restore and rename, and takes an automatic backup of the current state before any restore. For a form that gates clinical eligibility, being able to undo a bad edit is a safety requirement rather than a convenience.",
        image: "/images/v3/wizlo/version-history.b93a1ca6.webp",
      },
    ],
    // The three screens the approach steps above do not each need, captured the
    // same way. Simulate mode leads because it is the one that proves the claim:
    // the age field carries a "shown by rule" badge, so field visibility is
    // visibly being evaluated against the real conditions rather than described.
    gallery: [
      "/images/v3/wizlo/simulate.53a10f51.webp",
      "/images/v3/wizlo/logic-canvas-inspector.283bb381.webp",
      "/images/v3/wizlo/wizzy.3d483034.webp",
    ],
    // Properties of the delivered work, not business outcomes — and that is a
    // deliberate choice rather than a shortage of ambition. The brief's numbers
    // (halve creation time, one-click reorder, sub-three-minute publish) are
    // design targets with no post-launch measurement behind them yet, so they
    // are stated as targets in `problem` and `outcome` instead of dressed up
    // here as results. Everything in this list is countable in the prototype.
    results: [
      {
        metric: "0 dialogs",
        label:
          "To edit a field or author a rule. Forms 1.0 opened a popup for each, so the form was never visible beside the change being made to it",
      },
      {
        metric: "8 operators",
        label:
          "In the inline rule builder, with the value input adapting to the trigger field's type — a radio field offers its own options, a date field a date picker — so a nonsense comparison cannot be authored",
      },
      {
        metric: "99 fields",
        label:
          "The deliberate stress-test template: 14 pages of branching, jump-to-page and disqualification, so the logic system could be walked end to end before any clinic had to build one",
      },
    ],
    outcome:
      "Handed off dev-ready as coded prototypes rather than static frames: every variant is genuinely usable — the CTA opens the modal, the toast fires, the branch evaluates — and each is prefixed with the ticket it came from, so any prototype maps back to the story that asked for it. What I can report is the state of the work at handoff, not its effect in production. The brief set four targets — halve median form-creation time, reorder a field in one click, publish a ten-field intake in under three minutes, and full parity with 1.0's logic. Parity I can show you in the operator mapping. The other three were the bar the design was reviewed against, and I have no post-launch measurement to say whether it cleared them. When that data exists it belongs in this section; until then, claiming it would be fiction.",
    disagreement: {
      decision:
        "Making the AI flow builder return nothing when no field clears the match threshold, rather than falling back to the closest field it can find. An author who types a vague rule gets told it was not understood, instead of getting a rule attached to a question they did not mean.",
      // TODO: who pushed back, and on what grounds — the likely argument is that
      // a no-result AI reads as broken. One or two sentences.
      pushback: "",
      // TODO: what actually happened after. Include the number if there is one.
      result: "",
    },
    learnings: [
      "There are no post-launch numbers here, and I would rather say so than invent them. The metrics in the brief were design targets; what I can evidence is the work itself — the operator set, the parity mapping, the stress-test template. A case study that presents a goal as a result makes the same mistake as a form that presents a guess as an answer.",
      "The safety-critical feature was the buried one. Logic carried the clinical eligibility gates and lived in the deepest popup in the product, which taught me to read information architecture as a safety concern and not only a convenience one.",
      "Parity is a feature. The instinct on a redesign is to improve everything, and the migration pass deliberately added no operators — asking a clinician to relearn a rule they already knew would have cost more than the new capability was worth.",
      "Refusing to guess is a design decision. The most defensible thing in the AI layer is what it declines to do, and that only reads as rigour rather than as a bug because the interface says plainly that it did not understand.",
    ],
  },
  {
    slug: "saral-funding-crm",
    tldr: [
      "A loan-consolidation sales team outgrew spreadsheets; every off-the-shelf CRM was too costly, too complex, or missing WhatsApp.",
      "I designed both sides of a purpose-built tool: fast action-oriented screens for executives, data-oriented dashboards for management, and a WhatsApp inbox inside the product.",
      "Sales up 5% shortly after launch, every lead source in one system, third-party CRM cost removed entirely.",
    ],
    snapshot: {
      business:
        "Saral Funding is a Chartered Accountant's practice helping individuals consolidate loans at lower interest rates — high-trust, high-touch work where the whole business turns on following up at the right moment.",
      challenge:
        "Growth had outrun the process. Leads arrived from website forms and a WhatsApp widget with nothing tracking them, executives worked from spreadsheets and memory so deals slipped, and management had no view of where any lead stood. Every off-the-shelf option was too expensive, too complex for a non-technical team, or missing WhatsApp entirely.",
      solution:
        "A purpose-built CRM designed around the fact that there were two users, not one: action-oriented screens for executives working a call list, data-oriented dashboards for management reading pipeline health — and the WhatsApp thread pulled inside the tool so the biggest context switch of the day disappeared.",
      impact: [
        "5% sales increase measured in a short period after launch.",
        "Every lead source handled in one system for the first time, WhatsApp included.",
        "Third-party CRM dependency removed entirely, along with its cost.",
      ],
    },
    baseline: [
      {
        metric: "Spreadsheets",
        label: "And memory — the system of record for a growing sales pipeline",
      },
      {
        metric: "2 channels",
        label: "Forms and WhatsApp, with nothing joining them together",
      },
    ],
    flow: {
      label: "Lead lifecycle",
      steps: [
        "Lead arrives by form or WhatsApp",
        "Assigned to an executive",
        "Qualified on the lead profile",
        "Moved through the pipeline",
        "Closed won or lost",
      ],
    },
    flowChange: {
      before: [
        "Lead in spreadsheet",
        "Switch to WhatsApp tab",
        "Reply",
        "Back to sheet",
        "Update by hand",
        "Report to management",
      ],
      after: ["Lead in pipeline", "Reply in the inbox", "Outcome logs itself"],
    },
    tone: "mist",
    shortName: "Saral Funding",
    title: "Spreadsheets and WhatsApp to one CRM",
    category: "Fintech",
    summary:
      "A purpose-built CRM for a fintech loan-consolidation sales team, unifying pipeline management with an integrated WhatsApp inbox.",
    description: [
      "Saral Funding helps individuals secure loans at lower interest rates — a high-trust, high-touch business that lives or dies on timely follow-ups.",
    ],
    role: "UI/UX Designer",
    year: "2024",
    tags: ["Fintech", "CRM", "B2B", "Dashboard"],
    tools: ["figma", "chatgpt"],
    liveUrl: "https://subh-portfolio2026.framer.website/saral-funding",
    // Card stays on the page — cover, position and all — but blurred with a
    // "Coming soon" badge and no link, because the case study is not written
    // yet. Nothing routes here: see  in the type.
    comingSoon: true,
    featured: true,
    client: "Saral Funding",
    duration: "End-to-end build",
    problem:
      "The client is a Chartered Accountant who helps individuals secure loans at lower interest rates — high-trust, high-touch work that depends entirely on timely follow-ups. The business was growing and the process was not keeping up. Leads arrived from website forms and a WhatsApp widget with no single system to track or qualify them, sales executives worked from spreadsheets and memory so deals slipped through the cracks, and management had no visibility into where any lead stood. WhatsApp conversations lived entirely outside the workflow, forcing constant context-switching.",
    frictions: [
      {
        title: "The follow-up lived in someone's head",
        body: "In a business where timing is the product, the reminder to call back was a note in a spreadsheet or nothing at all. Leads did not fail on qualification — they failed on being forgotten for three days.",
      },
      {
        title: "The busiest channel was outside the tool",
        body: "A large share of leads arrived by WhatsApp and were answered in a separate tab, so the record of what was actually said never made it into the pipeline. The most useful context in the business was the least accessible.",
      },
      {
        title: "One interface for two opposite jobs",
        body: "Executives need today's work: assigned leads, follow-ups due, unread messages. Management needs conversion rates and pipeline health. Every tool the client had tried served one of those at the expense of the other.",
      },
    ],
    constraints: [
      "Enterprise CRMs were too expensive for the company's stage.",
      "Mid-market tools had broken UX and too steep a learning curve for a non-technical sales team.",
      "Lightweight tools were missing features specific to loan lead management.",
      "Tailwind CSS was the shared foundation with engineering, so components had to be specced in that vocabulary.",
    ],
    pullQuote:
      "This two-tier user model shaped every design decision that followed. Staff need action-oriented UIs, admins need data-oriented ones — a single interface serving both would have served neither well.",
    approach: [
      {
        title: "Two dashboards, because there were two users",
        body: "Executives are on calls all day and need today's work: assigned leads, follow-ups due, unread messages. Management needs conversion rates and pipeline health. One screen serving both would have served neither, so each got its own.",
      },
      {
        title: "WhatsApp brought inside the CRM",
        body: "A large share of leads arrived through a WhatsApp widget, previously handled in a separate tab. It became an inbox in the tool — thread, unread counts, a jump to the profile, and outcome logged straight to the timeline — removing the biggest context switch in the day.",
      },
      {
        title: "Leads management with a view for each job",
        body: "A list/Kanban toggle covers both jobs — a table for bulk scanning, a pipeline for stage management. Status changes, call logging and assignment all happen inline, without opening the full profile.",
      },
      {
        title: "A lead profile that answers three questions",
        body: "Who is this person and what do they need, what has happened so far, and what happens next. Loan details, interaction timeline, notes, stage and the WhatsApp thread all sit on one screen so an executive can pick up a call cold.",
      },
    ],
    results: [
      {
        metric: "+5%",
        label: "Sales increase — measurable conversion growth in a short period post-launch",
      },
      {
        metric: "One tool",
        label: "All lead sources handled in a single system for the first time, WhatsApp included",
      },
      {
        metric: "Zero",
        label: "Third-party CRM dependency, removing costly and broken external tooling",
      },
    ],
    outcome:
      "The sales team reported closing leads more efficiently with everything centralised, and every lead source was handled inside one system for the first time. Because it was built to be market-ready rather than bespoke, the CRM also unlocked an upsell path — the client can productise it and sell it on to other fintech businesses.",
    disagreement: {
      decision:
        "Building two separate dashboards — one for sales executives, one for management — instead of one role-switched view.",
      // TODO: who pushed back, and on what grounds. One or two sentences.
      pushback: "",
      // TODO: what actually happened after. Include the number if there is one.
      result: "",
    },
    learnings: [
      "Designing a data-heavy SaaS product takes a different UX mindset: every pixel of space carries information weight.",
      "Understanding the business model — loan consolidation, the CA's workflow, the lead lifecycle — mattered as much as knowing the UI patterns.",
      "This was my first large product with a deep database architecture behind it, and it changed how I think about systems-level UX.",
    ],
  },
  {
    slug: "mythic-boost-marketplace",
    tldr: [
      "US game-boosting marketplace where players buy rank boosts and coordinate with providers in real time.",
      "I reworked the two highest-stakes moments in the product: the chat between player and booster, and checkout.",
      "The brief was trust — demand existed, but the parts handling money and communication were the weakest links.",
    ],
    snapshot: {
      business:
        "Mythic Boost is a US-based game-boosting marketplace where players buy rank boosts and services, then coordinate with operators and providers in real time while the work is carried out on their own game account.",
      challenge:
        "Demand was not the problem. The two moments carrying the most risk — handing over money, and trusting the stranger playing on your account — were the weakest parts of the product. Both read as unreliable at exactly the point a player needed reassurance.",
      solution:
        "I treated chat and checkout as trust surfaces rather than utilities: making order state legible inside the conversation, and making the payment step state what was being bought, from whom, and what happens next.",
      impact: [
        "Chat and checkout redesigned as the two trust-critical flows in the product.",
        "Order state made visible in the place players were already looking — the conversation.",
      ],
    },
    baseline: [
      {
        metric: "2 flows",
        label: "Chat and payments — the highest-stakes moments, and the weakest screens",
      },
      {
        metric: "Account access",
        label: "What a player hands over, to someone they have never met",
      },
    ],
    flow: {
      label: "Order journey",
      steps: [
        "Choose a boost",
        "Checkout",
        "Matched with a booster",
        "Track progress in chat",
        "Delivery and review",
      ],
    },
    tone: "navy",
    shortName: "Mythic Boost",
    title: "Chat and checkout, rebuilt for trust",
    category: "Gaming",
    summary:
      "Fixed chat and payments UX for a US game-boosting marketplace to rebuild trust and drive conversions.",
    description: [
      "Mythic Boost is a US-based game boosting platform where players purchase rank boosts and services, then coordinate with operators and providers in real time. The product had real demand, but its core workflows — chat and payments — were actively hurting trust and conversions.",
      "The work centered on making the two highest-stakes moments of the experience — talking to your booster and paying for the service — feel reliable and transparent instead of like the weakest links in the product.",
    ],
    role: "Product Designer",
    year: "2024",
    tags: ["Gaming", "Marketplace", "Payments", "Chat"],
    tools: ["figma", "claude", "chatgpt"],
    // Locked, like Saral: the tile stays on /case-studies as a blurred
    // coming-soon card, and nothing routes to the page.
    comingSoon: true,
    featured: false,
    client: "Mythic Boost",
    duration: "Focused engagement",
    problem:
      "Mythic Boost had real demand and a real trust problem. Players were being asked to pay upfront for work carried out on their own game account by someone they had never met, and the two screens carrying that weight were the two weakest in the product. Checkout gave no account of what was being bought or what happened after paying. Chat, where the entire relationship with the booster lived, showed messages but not order state — so the question every player actually had, is this progressing, was the one thing the screen would not answer.",
    frictions: [
      {
        title: "Paying before understanding",
        body: "Checkout collected money without setting expectations: no clear statement of scope, timing, or who would be doing the work. A player's last interaction before handing over payment details was the least informative screen in the flow.",
      },
      {
        title: "A conversation with no order in it",
        body: "Chat carried the whole relationship but knew nothing about the order it belonged to. Players asked for status updates in words because the interface offered no other way to get them, and boosters spent their time answering the same question.",
      },
      {
        title: "No visible proof of progress",
        body: "Between purchase and delivery there was a silent gap. Silence in a marketplace where you have already paid and surrendered account access does not read as neutral — it reads as something going wrong.",
      },
    ],
    constraints: [
      "Real-time coordination between three parties — player, operator and provider — had to stay workable for all of them.",
      "A live marketplace with existing orders in flight, so the flows had to change without stranding anyone mid-order.",
    ],
    pullQuote:
      "In a marketplace, chat and checkout are not features. They are where the customer decides whether to believe you.",
    approach: [
      {
        title: "Checkout that states the deal",
        body: "The payment step was rebuilt to say what is being bought, what it costs, roughly how long it takes and what happens immediately after paying — so the moment of highest risk is also the moment with the most information on screen.",
      },
      {
        title: "Order state inside the conversation",
        body: "Chat became order-aware, carrying the current stage and progress alongside the messages. The status question stops being something a player has to ask, and the booster stops spending the engagement answering it.",
      },
    ],
    disagreement: {
      decision:
        "Adding information to the checkout step rather than removing it: scope, timing, who is doing the work and what happens after paying, all on the screen that collects payment.",
      // TODO: who pushed back, and on what grounds. One or two sentences.
      pushback: "",
      // TODO: what actually happened after. Include the number if there is one.
      result: "",
    },
    learnings: [
      "Trust is not a visual style — it is produced by telling someone what is happening before they have to ask.",
      "The two screens nobody wants to design, payment and messaging, were the two that moved the most in the whole product.",
    ],
  },
];

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}
