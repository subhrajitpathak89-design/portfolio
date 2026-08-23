import type { Project } from "@/types";

export const projects: Project[] = [
  {
    slug: "riseangle-ai-video-saas",
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
        image: "/images/v2/work/riseangle-01.webp",
        body: "Before touching any screens, I ran an analytics audit to find exactly where users were dropping off, rather than assuming what needed fixing. The 11-step desktop creation flow was the single biggest drop-off point on mobile, with the sharpest cliff right after template selection.",
      },
      {
        title: "Rebuilt the creation flow mobile-first",
        image: "/images/v2/work/riseangle-02.webp",
        body: "The 11-step flow became a 4-step mobile-first wizard using bottom sheets and an inline live AI preview, so creators could see their video coming together without losing their place. Generation latency became part of the design: a progress state with real-time captions kept the wait feel intentional instead of broken.",
      },
      {
        title: "Redesigned discovery and monetization",
        image: "/images/v2/work/riseangle-03.webp",
        body: "Template browsing moved from a form-based picker to a visual-first gallery. The paywall changed from a hard, contextless lock screen into a value-first upgrade path that showed what you'd get before asking you to pay.",
      },
      {
        title: "Shipped in stages, not all at once",
        image: "/images/v2/work/riseangle-04.webp",
        body: "The wizard, gallery and paywall shipped as three sequential releases behind a feature flag, so we could attribute each metric change to a specific change and roll back cleanly if a release underperformed.",
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
        body: "The patient home screen surfaces the three things people actually check: next appointment, active order status, and unread documents. It is not a navigation hub, it gives direct answers. That came out of client calls about where patients were phoning support most — appointment confusion and order status were the top two reasons anyone rang the clinic.",
        image: "/images/v2/work/wizlo-01.webp",
      },
      {
        title: "Mobile first, desktop validated",
        body: "Every component — nav, cards, document list, order tracker — was built to work at 375px before being extended to desktop. Healthcare portal usage skews heavily mobile; most patients open this in a waiting room, not at a desk. Treating desktop as primary would have shipped something that felt foreign to most patients on day one.",
        image: "/images/v2/work/wizlo-02.webp",
      },
      {
        title: "Table first for clinic staff, always",
        body: "The all-clients view is a dense data table by design. Staff scan for patients by name, filter by status, and need to reach a record fast. Card grids look friendlier but slow down anyone who already knows what they are looking for. The client confirmed it matched how their team actually works.",
        image: "/images/v2/work/wizlo-03.webp",
      },
      {
        title: "ID verification as a first-class flow",
        body: "Client ID verification was originally scoped as a checkbox on the patient record. I pushed for a distinct stepped flow with explicit states — unverified, in review, verified — because clinics carry compliance obligations around patient identity. Surfacing that status at table level let staff triage verification at a glance instead of opening every record.",
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
        body: "Sales executives are on calls all day and need today's work: assigned leads, pending follow-ups, recent WhatsApp messages, pipeline at a glance. Admins need team performance: total leads, conversion rates, stage distribution, individual activity. Splitting them let each screen be built for its own mode of thinking rather than compromising between the two.",
        image: "/images/v2/work/saral-01.webp",
      },
      {
        title: "Leads management with a view for each job",
        body: "The central hub carries a list/Kanban toggle — a table for bulk scanning, a pipeline for stage-based management. Status updates, call logging and assignment happen inline without opening the full profile, and multi-parameter filtering covers stage, source, assigned executive and date range.",
        image: "/images/v2/work/saral-02.webp",
      },
      {
        title: "A lead profile that answers three questions",
        body: "The single most important screen for an executive. It is built to answer, instantly: who is this person and what do they need, what has happened so far, and what should happen next. Personal and loan details, a timeline of interactions, notes, assigned executive, current stage and the WhatsApp thread all sit in one place.",
        image: "/images/v2/work/saral-03.webp",
      },
      {
        title: "WhatsApp brought inside the CRM",
        body: "A significant share of leads arrived through a WhatsApp widget. Rather than leave chat in a separate tab, it became an inbox inside the tool: conversation list with unread indicators, the full thread, a quick link to the lead's profile, and the ability to log the outcome straight to the timeline. This removed the biggest context-switch in the executives' day.",
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
