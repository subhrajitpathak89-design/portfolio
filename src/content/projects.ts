import type { Project } from "@/types";

export const projects: Project[] = [
  {
    slug: "nivex-design-platform",
    tldr: [
      "A full design layer — tokens, components, charts, financial patterns — for a wealth platform across web, mobile and Figma.",
      "I built the system and the constraints that let five AI agents produce it without drifting apart.",
      "313 tokens, 14 written decisions, three consoles that still look like one product.",
    ],
    snapshot: {
      business:
        "Nivex prescribes wealth strategy the way a doctor prescribes treatment: read someone's financial health, goals and risk profile first, then recommend, rather than selling products off a shelf. It needed a design layer covering an advisor console, an investor dashboard and an admin pipeline.",
      challenge:
        "The scope was larger than the timeline allowed, so AI agents were the only way to reach it — and that introduced the actual design problem. Agents generate fast and drift quietly. Two sessions asked for a card invent two shadows, two spacing scales and two blues, and no pull request diff makes that visible until the system is already inconsistent.",
      solution:
        "I stopped designing screens and started designing constraints: a three-layer token contract with a CI validator, five agents with non-overlapping file ownership, and 14 decision records written before the code they governed. Screens became the output of the system rather than the work itself.",
      impact: [
        "313 tokens as the single source of truth across three apps — dark mode became a config change, not a redesign.",
        "Three separate consoles built by different agents in different sessions still read as one product.",
        "A fresh session resumes the reasoning from the ADRs instead of re-litigating decisions already made.",
      ],
    },
    baseline: [
      {
        metric: "3 surfaces",
        label: "Had to share one language — web, mobile and Figma",
      },
      {
        metric: "5 agents",
        label: "Working the same repository, with no shared definition of a card",
      },
    ],
    flow: {
      label: "How a change reached production",
      steps: [
        "Decision recorded as an ADR",
        "Token or component agent picks it up",
        "Validator checks for hardcoded values",
        "QA agent reviews against the docs",
        "Human sign-off",
      ],
    },
    tone: "indigo",
    shortName: "Nivex",
    title: "Five AI agents, one design language",
    category: "Design Systems",
    summary:
      "A tokenised design system and three product consoles for an AI-assisted wealth platform, built to stay consistent across five agents and two months.",
    description: [
      "Nivex prescribes wealth strategy the way a doctor prescribes treatment — personalised recommendations built on a read of each person's financial health, goals and risk profile, rather than generic products off a shelf.",
    ],
    role: "Design Systems & Product Design",
    year: "2026",
    tags: ["Design System", "Fintech", "AI Workflow", "Accessibility"],
    liveUrl: "https://techdome-io.github.io/nivex-project/",
    featured: true,
    client: "Nivex, via Techdome",
    duration: "~2 months, 262 commits",
    problem:
      "Nivex needed a complete design layer — tokens, components, charts, financial patterns and a browsable prototype — across web, mobile and Figma, on a timeline a conventional team would not have covered. Using AI agents was the only way to reach that scope, which introduced the actual design problem: agents generate quickly and drift quietly. Two sessions asked for a card will invent two different shadows, two spacing scales and two blues, and nothing in a pull request diff makes that obvious until the system is already inconsistent. The work was less about producing screens than about building the constraints that made generated output trustworthy.",
    frictions: [
      {
        title: "No shared definition of anything",
        body: "Without a token contract, every agent resolved its own idea of the primary blue from its own context window. The inconsistency was invisible in review because each individual screen looked fine — it was only visible across screens, which is exactly where nobody was looking.",
      },
      {
        title: "Overlapping ownership",
        body: "Agents editing the same files produced work that was correct in isolation and contradictory in combination. A component change that assumed one spacing scale landed next to a token change that redefined it.",
      },
      {
        title: "Reasoning that evaporated between sessions",
        body: "Each new session started cold and re-argued settled questions, sometimes reversing them. Decisions that had cost real thought were being undone by an agent with no memory of why they were made.",
      },
    ],
    constraints: [
      "Brand voice explicitly ruled out the obvious fintech defaults: no crypto aesthetics, no gamification, no urgency language, no trend-chasing. It had to still look right in five years.",
      "WCAG 2.1 AA and mobile-first from 320px were baselines to design against, not a pass at the end.",
      "The prototype is frontend-only with no backend, so there was no server anywhere to hold an API key.",
      "Several agents worked the same repository, where the usual failure mode is inconsistent output that no one notices until it is everywhere.",
    ],
    pullQuote:
      "Nothing AI-generated should ever reach a client without a human decision in between.",
    approach: [
      {
        title: "Tokens as the contract, not a palette",
        body: "313 tokens in three layers — raw primitives, semantic intent, then theme overrides — with a validator in CI and a hard rule that nothing is hardcoded. Every value resolves through a token: the allocation donut uses chart tokens, the gain figures and the concentration warning use semantic status colours, so an agent has no way to invent a blue.",
      },
      {
        title: "Five agents, and none of them overlap",
        body: "Token, component, chart, docs and QA agents, each with a written scope and a file-ownership table — a component agent cannot edit token JSON, and vice versa. The proof is that the same primitives produced three separate consoles without drifting apart: the admin case pipeline and the investor dashboard were built by different agents in different sessions.",
      },
      {
        title: "Decisions written down before the code",
        body: "14 ADRs, each with context, decision, alternatives and consequences — the project's memory, so a fresh session resumes the reasoning instead of re-litigating it. The service-and-status model on the staff screens came straight out of ADRs 0008 through 0012, all written before any of it was built.",
      },
      {
        title: "AI drafts the prescription; a human still clicks Add",
        body: "Advisors were typing every recommendation from scratch, so drafting was an obvious win — but suggestions live in local component state behind a dashed 'review before adding' border, and only become plan steps when staff accept them one at a time. No bulk accept, deliberately: reviewing each draft is the feature, not friction to remove.",
      },
    ],
    results: [
      {
        metric: "313 tokens",
        label:
          "One source of truth across three apps — dark mode became a configuration change rather than a redesign",
      },
      {
        metric: "14 ADRs",
        label:
          "Decisions recorded with context and alternatives, so no session re-argues a settled question",
      },
      {
        metric: "3 consoles",
        label:
          "Advisor, investor and admin — built in separate sessions, still reading as one product",
      },
    ],
    outcome:
      "The system shipped as a browsable prototype covering three consoles, and the constraint layer turned out to be the deliverable that mattered. The tokens, the ownership table and the ADRs are what let the work scale past what the timeline should have allowed — and what makes it maintainable by someone who was not in the room.",
    disagreement: {
      decision:
        "Keeping AI-drafted prescriptions one-at-a-time. Suggestions sit behind a dashed 'review before adding' border and only become plan steps when staff accept them individually — no bulk accept, deliberately.",
      // TODO: who pushed back, and on what grounds. One or two sentences.
      pushback: "",
      // TODO: what actually happened after. Include the number if there is one.
      result: "",
    },
    learnings: [
      "Designing the constraints beat designing the screens: once the token contract and the ownership table existed, consistency stopped being something I had to police.",
      "Writing the decision down before the code is what made AI-assisted work reviewable. Without the ADR, a diff is just a diff.",
      "The review step in the recommendation flow is the feature, not friction. Speed is easy to add later; trust is not.",
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
      },
      {
        title: "Generation latency as a design surface",
        body: "Rather than hiding the wait, the flow shows an inline live preview while the video builds. The wait becomes the moment the creator sees it working, which is the opposite of a spinner — and it turned the product's biggest technical constraint into a reason to stay on the screen.",
      },
      {
        title: "A paywall that makes the case first",
        body: "The lock screen became a value-first upgrade path: what the plan unlocks, priced against what the creator was already trying to do, shown at the point they were trying to do it. This single change accounted for roughly a third of the total conversion lift.",
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
    slug: "wizlo-emr-patient-portal",
    tldr: [
      "0 to 1 clinical EMR connecting clinics, medical staff and patients, built by a multi-designer team.",
      "I owned two modules end to end: the five-section patient portal, and the patient-management module clinic staff work in daily.",
      "Client-reported: support calls down 34%, record retrieval 40% faster, three phases shipped with no architectural rework.",
    ],
    snapshot: {
      business:
        "Wizlo is an EMR platform for clinics that want to run the entire patient relationship digitally — scheduling, prescriptions, documents, vitals, clinical notes and medication delivery — in one system connecting clinics, their medical staff and patients.",
      challenge:
        "I owned the patient portal and the clinical patient-management module, and those two audiences use software in opposite ways. Patients open the app anxious, wanting to know whether medication shipped or when an appointment is. Staff open it with intent, needing one patient, one edit, and out. One side needs reassurance; the other needs speed and density.",
      solution:
        "I designed each side to its own job instead of compromising between them: the patient home became a status dashboard answering the two questions that drove support calls, and the staff view stayed a dense scannable table. ID verification, scoped as a checkbox, became a stepped flow with its states surfaced at table level.",
      impact: [
        "Client-reported 34% drop in patient support calls after launch.",
        "Client-reported 40% faster patient record retrieval versus the manual system.",
        "Three delivery phases shipped without architectural rework.",
      ],
    },
    baseline: [
      {
        metric: "3 sides",
        label: "Clinics, medical staff and patients, in one system",
      },
      {
        metric: "0 to 1",
        label: "No existing product to extend — and clinical records leave no room for ambiguity",
      },
    ],
    flow: {
      label: "What a patient actually does",
      steps: [
        "Open the portal",
        "See status at a glance",
        "Book or reschedule",
        "Track a medicine order",
        "Message the clinic",
      ],
    },
    tone: "violet",
    shortName: "Wizlo",
    title: "Cutting no-shows 34% in a new EMR",
    category: "Healthcare",
    summary:
      "Owned the patient portal and clinical patient management module of a 0→1 EMR platform connecting clinics, doctors and patients.",
    description: [
      "Wizlo is an EMR platform built for clinics to manage their entire patient relationship digitally — scheduling, prescriptions, documents, vitals, clinical notes and medication delivery — all inside one system connecting clinics, medical staff and patients.",
    ],
    role: "UX/UI Designer",
    year: "2025",
    tags: ["Healthcare", "EMR", "Patient Portal", "0 to 1"],
    liveUrl: "https://subh-portfolio2026.framer.website/emr",
    featured: true,
    client: "Wizlo",
    duration: "3 delivery phases",
    problem:
      "Wizlo is a 0→1 EMR platform for clinics that want to run the whole patient relationship digitally, connecting three sides: clinics, their medical staff, and patients. I joined a multi-designer team and owned two modules — the patient-facing portal and the clinical patient management module used by clinic staff. The defining difficulty was that those two audiences use software in opposite ways. Patients open the app anxiously, wanting to know whether their medication shipped or when their appointment is. Staff open it with intent, needing to find one patient, update a record, and move on. One side needs reassurance and clarity; the other needs speed and density.",
    frictions: [
      {
        title: "Two audiences, one interface budget",
        body: "The temptation in a platform like this is a single design language stretched across both sides. That produces screens too dense for an anxious patient and too soft for staff working at speed — a compromise that fails both.",
      },
      {
        title: "The clinic phone as the real interface",
        body: "Client call logs showed appointment confusion and medication order status were the top two reasons patients rang the clinic. Every one of those calls was a question the app already had the answer to and was not showing.",
      },
      {
        title: "Compliance treated as a checkbox",
        body: "ID verification came into scope as a single field. Clinics carry real obligations on patient identity, and a boolean cannot express in review, rejected, or resubmitted — the states staff actually need to act on.",
      },
    ],
    constraints: [
      "Not the only designer on the project — I owned my two modules end to end, but the wider platform was split across a team.",
      "Delivery-focused with real client timelines rather than a research-heavy engagement: no ten-week discovery phase to lean on.",
      "Clinical records carry real responsibility, so the UI could not afford ambiguity anywhere.",
      "Clinics onboarding with existing patient lists made bulk upload and ID-verification compliance workflows non-negotiable.",
    ],
    pullQuote:
      "Nobody opens a healthcare app because they want to. They open it because they need something, and they want to get it and leave. The job was not to create an engaging product — it was to create a frictionless one.",
    approach: [
      {
        title: "Home as a status dashboard, not a feature menu",
        body: "The patient home surfaces the three things people actually open the app for: next appointment, order status, unread documents. Client call logs showed appointment confusion and order status were the top two reasons patients rang the clinic, so the screen answers both before being asked.",
      },
      {
        title: "Table first for clinic staff, always",
        body: "The all-clients view is a dense data table by design: staff scan by name, filter by status, and need a record fast. Card grids look friendlier but slow down anyone who already knows who they are looking for.",
      },
      {
        title: "ID verification as a first-class flow",
        body: "Verification was scoped as a checkbox. I argued it up into a stepped flow with explicit states — unverified, in review, verified — because clinics carry compliance obligations on patient identity, and surfaced the status at table level so staff could triage at a glance.",
      },
    ],
    results: [
      {
        metric: "−34%",
        label:
          "Drop in patient support calls — order status and appointment queries were the top two call drivers before launch",
      },
      {
        metric: "40%",
        label:
          "Faster patient record retrieval reported by clinic staff versus the manual system it replaced",
      },
      {
        metric: "3 phases",
        label:
          "Delivered without architectural rework — later phases extended the patient chart rather than rebuilding it",
      },
    ],
    outcome:
      "Wizlo went live and clinics started using it, which for the team was the real validation — not a sign-off meeting but a product real staff and patients used daily. It also became a reference point: other healthcare businesses saw the platform and came to us wanting the same thinking applied to their own products, so the work directly earned further projects in the domain.",
    disagreement: {
      decision:
        "Keeping a dense table as the primary view for clinic staff on every screen size, rather than collapsing to cards on smaller viewports the way the patient side does.",
      // TODO: who pushed back, and on what grounds. One or two sentences.
      pushback: "",
      // TODO: what actually happened after. Include the number if there is one.
      result: "",
    },
    learnings: [
      "Client-reported, deliberately: these numbers came from conversations during and after delivery, not dashboards I had access to. The direction is real; the precision is estimated, and that distinction matters.",
      "Healthcare is unforgiving — the users are not browsing for fun and the cost of getting something wrong is real. It taught me to ask harder questions earlier and to care about edge cases.",
      "Getting the invisible details right — the verification flow, the timeline architecture, the mobile-first calls — is what made the product feel trustworthy, even to people who could not articulate why.",
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
    liveUrl: "https://subh-portfolio2026.framer.website/saral-funding",
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
