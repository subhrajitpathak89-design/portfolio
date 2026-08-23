import type { Project } from "@/types";

export const projects: Project[] = [
  {
    slug: "riseangle-ai-video-saas",
    tldr: [
      "AI faceless-video SaaS with tens of thousands of creators — built desktop-first while 73% of actual usage was mobile.",
      "I owned the redesign end to end: analytics audit, then the creation flow, template discovery and the paywall.",
      "Free-to-paid conversion went 4.2% to 9.1% in six weeks, flow completion 42% to 79%.",
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
    showcase: {
      label: "The mobile flow",
      caption:
        "Preset, generation and library — the three screens that carry the flow on the surface most creators actually use.",
      media: [
        "/media/work/riseangle-mobile-welcome.mp4",
        "/media/work/riseangle-mobile-preset.mp4",
        "/media/work/riseangle-mobile-library.mp4",
      ],
    },
    tone: "slate",
    title: "RiseAngle AI Video Platform",
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
    coverImage: "/images/v2/work/riseangle-cover.webp",
    tags: ["SaaS", "Mobile-First", "Conversion", "AI"],
    liveUrl: "https://subh-portfolio2026.framer.website/case-study-riseangle",
    featured: true,
    client: "RiseAngle",
    duration: "3 months",
    problem:
      "RiseAngle lets creators make and schedule faceless TikTok and YouTube Shorts using AI — no filming, no editing. The product had grown to tens of thousands of active creators, but it was built desktop-first while 73% of users were actually on mobile, and growth was stalling. Free users weren't converting, and a lot of them were dropping out of the creation flow entirely before finishing a single video.",
    constraints: [
      "No dedicated mobile app — everything had to work inside a mobile browser, including the AI preview player.",
      "The AI generation backend couldn't change, so every UX fix had to work around real generation latency (10–40 seconds per clip).",
      "Existing paying customers still relied on the old desktop flow — the redesign couldn't break their muscle memory overnight.",
      "Engineering had capacity for one focused sprint cycle, so scope had to earn its way onto the roadmap.",
    ],
    pullQuote:
      "The flow wasn't badly designed for desktop — it just never got a real mobile version. Fixing that meant rethinking the flow from the ground up, not just shrinking it.",
    approach: [
      {
        title: "Started with data, not a redesign",
        video: "/media/work/riseangle-desktop.mp4",
        poster: "/media/work/riseangle-desktop-poster.jpg",
        image: "/images/v2/work/riseangle-01.webp",
        body: "I ran an analytics audit before touching a screen. The 11-step desktop creation flow was the single biggest drop-off on mobile, with the sharpest cliff right after template selection — so that is where the work went.",
      },
      {
        title: "Rebuilt the creation flow mobile-first",
        image: "/images/v2/work/riseangle-02.webp",
        body: "Eleven steps became a four-step wizard with bottom sheets and an inline live preview. Generation latency of 10–40 seconds became part of the design rather than something to hide: a progress state with real-time captions made the wait feel deliberate.",
      },
      {
        title: "Redesigned discovery and monetization",
        image: "/images/v2/work/riseangle-03.webp",
        body: "Template browsing moved from a form-based picker to a visual gallery. The paywall changed from a contextless lock screen to a value-first upgrade path that shows what you get before asking for payment — worth roughly a third of the total conversion lift on its own.",
      },
      {
        title: "Shipped in stages, not all at once",
        image: "/images/v2/work/riseangle-04.webp",
        body: "Wizard, gallery and paywall went out as three sequential releases behind a feature flag. Each metric change could be attributed to a specific change, and any release could be rolled back cleanly.",
      },
    ],
    results: [
      { metric: "4.2% → 9.1%", label: "Free-to-paid conversion" },
      { metric: "42% → 79%", label: "Flow completion rate" },
      { metric: "58% → 24%", label: "Mobile session drop-off" },
    ],
    outcome:
      "Six weeks post-launch, the redesigned creation flow more than doubled conversion and cut mobile drop-off by more than half. Treating mobile as the primary surface — not an afterthought — turned out to be the highest-leverage decision in the entire redesign.",
    learnings: [
      "Shipping in three staged releases made the impact of each change measurable — worth the extra coordination overhead.",
      "Designing around a real technical constraint (AI generation latency) produced a better experience than hiding it would have.",
      "The paywall redesign alone accounted for roughly a third of the total conversion lift — value-first framing mattered more than expected.",
    ],
  },
  {

    slug: "wizlo-emr-patient-portal",
    tldr: [
      "0 to 1 clinical EMR connecting clinics, medical staff and patients, built by a multi-designer team.",
      "I owned two modules end to end: the five-section patient portal, and the patient-management module clinic staff work in daily.",
      "Client-reported: support calls down 34%, record retrieval 40% faster, three phases shipped with no architectural rework.",
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
    title: "Wizlo EMR Patient Portal",
    category: "Healthcare",
    summary:
      "Owned the patient portal and clinical patient management module of a 0→1 EMR platform connecting clinics, doctors and patients.",
    description: [
      "Wizlo is an EMR platform built for clinics to manage their entire patient relationship digitally — scheduling, prescriptions, documents, vitals, clinical notes and medication delivery — all inside one system connecting clinics, medical staff and patients.",
    ],
    role: "UX/UI Designer",
    year: "2025",
    coverImage: "/images/v2/work/wizlo-cover.webp",
    tags: ["Healthcare", "EMR", "Patient Portal", "0 to 1"],
    liveUrl: "https://subh-portfolio2026.framer.website/emr",
    featured: true,
    client: "Wizlo",
    duration: "3 delivery phases",
    problem:
      "Wizlo is a 0→1 EMR platform for clinics that want to run the whole patient relationship digitally, connecting three sides: clinics, their medical staff, and patients. I joined a multi-designer team and owned two modules — the patient-facing portal and the clinical patient management module used by clinic staff. The defining difficulty was that those two audiences use software in opposite ways. Patients open the app anxiously, wanting to know whether their medication shipped or when their appointment is. Staff open it with intent, needing to find one patient, update a record, and move on. One side needs reassurance and clarity; the other needs speed and density.",
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
        image: "/images/v2/work/wizlo-01.webp",
      },
      {
        title: "Mobile first, desktop validated",
        body: "Every component was built to work at 375px before being extended upward. Most patients open this in a waiting room, not at a desk — treating desktop as primary would have shipped something that felt foreign to the majority on day one.",
        image: "/images/v2/work/wizlo-02.webp",
      },
      {
        title: "Table first for clinic staff, always",
        body: "The all-clients view is a dense data table by design: staff scan by name, filter by status, and need a record fast. Card grids look friendlier but slow down anyone who already knows who they are looking for.",
        image: "/images/v2/work/wizlo-03.webp",
      },
      {
        title: "ID verification as a first-class flow",
        body: "Verification was scoped as a checkbox. I argued it up into a stepped flow with explicit states — unverified, in review, verified — because clinics carry compliance obligations on patient identity, and surfaced the status at table level so staff could triage at a glance.",
        image: "/images/v2/work/wizlo-04.webp",
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
    learnings: [
      "I am deliberate about saying client-reported here. These numbers came from conversations during and after delivery, not dashboards I had access to. The direction is real; the precision is estimated, and that distinction matters.",
      "Healthcare is unforgiving — the users are not browsing for fun and the cost of getting something wrong is real. It taught me to ask harder questions earlier and to care about edge cases.",
      "Getting the invisible details right (the verification flow, the timeline architecture, the mobile-first calls) is what made the product feel trustworthy, even to people who could not articulate why.",
    ],
  },
  {

    slug: "saral-funding-crm",
    tldr: [
      "A loan-consolidation sales team outgrew spreadsheets; every off-the-shelf CRM was too costly, too complex, or missing WhatsApp.",
      "I designed both sides of a purpose-built tool: fast action-oriented screens for executives, data-oriented dashboards for management, and a WhatsApp inbox inside the product.",
      "Sales up 5% shortly after launch, every lead source in one system, third-party CRM cost removed entirely.",
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
    tone: "mist",
    title: "Saral Funding CRM",
    category: "Fintech",
    summary:
      "A purpose-built CRM for a fintech loan-consolidation sales team, unifying pipeline management with an integrated WhatsApp inbox.",
    description: [
      "Saral Funding helps individuals secure loans at lower interest rates — a high-trust, high-touch business that lives or dies on timely follow-ups.",
    ],
    role: "UI/UX Designer",
    year: "2024",
    coverImage: "/images/v2/work/saral-cover.webp",
    tags: ["Fintech", "CRM", "B2B", "Dashboard"],
    liveUrl: "https://subh-portfolio2026.framer.website/saral-funding",
    featured: true,
    client: "Saral Funding",
    duration: "End-to-end build",
    problem:
      "The client is a Chartered Accountant who helps individuals secure loans at lower interest rates — high-trust, high-touch work that depends entirely on timely follow-ups. The business was growing and the process was not keeping up. Leads arrived from website forms and a WhatsApp widget with no single system to track or qualify them, sales executives worked from spreadsheets and memory so deals slipped through the cracks, and management had no visibility into where any lead stood. WhatsApp conversations lived entirely outside the workflow, forcing constant context-switching.",
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
        image: "/images/v2/work/saral-01.webp",
      },
      {
        title: "Leads management with a view for each job",
        body: "A list/Kanban toggle covers both jobs — a table for bulk scanning, a pipeline for stage management. Status changes, call logging and assignment all happen inline, without opening the full profile.",
        image: "/images/v2/work/saral-02.webp",
      },
      {
        title: "A lead profile that answers three questions",
        body: "Who is this person and what do they need, what has happened so far, and what happens next. Loan details, interaction timeline, notes, stage and the WhatsApp thread all sit on one screen so an executive can pick up a call cold.",
        image: "/images/v2/work/saral-03.webp",
      },
      {
        title: "WhatsApp brought inside the CRM",
        body: "A large share of leads arrived through a WhatsApp widget, previously handled in a separate tab. It became an inbox in the tool — thread, unread counts, a jump to the profile, and outcome logged straight to the timeline — removing the biggest context switch in the day.",
        image: "/images/v2/work/saral-04.webp",
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
    title: "Mythic Boost Gaming Marketplace",
    category: "Gaming",
    summary:
      "Fixed chat and payments UX for a US game-boosting marketplace to rebuild trust and drive conversions.",
    description: [
      "Mythic Boost is a US-based game boosting platform where players purchase rank boosts and services, then coordinate with operators and providers in real time. The product had real demand, but its core workflows — chat and payments — were actively hurting trust and conversions.",
      "The work centered on making the two highest-stakes moments of the experience — talking to your booster and paying for the service — feel reliable and transparent instead of like the weakest links in the product.",
    ],
    role: "Product Designer",
    year: "2024",
    coverImage: "/images/v2/work/mythic-cover.webp",
    tags: ["Gaming", "Marketplace", "Payments", "Chat"],
    featured: false,
  },
];

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}
