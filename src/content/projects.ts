import type { Project } from "@/types";

export const projects: Project[] = [
  {
    slug: "riseangle-ai-video-saas",
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
        body: "Before touching any screens, I ran an analytics audit to find exactly where users were dropping off, rather than assuming what needed fixing. The 11-step desktop creation flow was the single biggest drop-off point on mobile, with the sharpest cliff right after template selection.",
      },
      {
        title: "Rebuilt the creation flow mobile-first",
        body: "The 11-step flow became a 4-step mobile-first wizard using bottom sheets and an inline live AI preview, so creators could see their video coming together without losing their place. Generation latency became part of the design: a progress state with real-time captions kept the wait feel intentional instead of broken.",
      },
      {
        title: "Redesigned discovery and monetization",
        body: "Template browsing moved from a form-based picker to a visual-first gallery. The paywall changed from a hard, contextless lock screen into a value-first upgrade path that showed what you'd get before asking you to pay.",
      },
      {
        title: "Shipped in stages, not all at once",
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
    title: "Wizlo EMR Patient Portal",
    category: "Healthcare",
    summary:
      "Owned the patient portal and clinical patient management module of a 0→1 EMR platform connecting clinics, doctors and patients.",
    description: [
      "Wizlo is an EMR platform built for clinics to manage their entire patient relationship digitally — scheduling, prescriptions, documents, vitals, clinical notes and medication delivery — all inside one system connecting clinics, medical staff and patients.",
      "Brought onto a multi-designer team, I owned two modules: the patient-facing portal and the clinical patient management module used by staff. For the portal, the job wasn't to make something engaging — nobody opens a healthcare app for fun — it was to make something frictionless, with five areas (Home, Appointments, Orders, Documents, Support) each answering its core question the instant it loads.",
      "The staff-facing module had to support fast patient lookup, in-place editable records, ID verification as a first-class flow, and bulk onboarding for clinics migrating existing patient lists — all while carrying the weight of real clinical data where ambiguity in the UI isn't an option.",
    ],
    role: "UX/UI Designer",
    year: "2025",
    tags: ["Healthcare", "EMR", "Patient Portal", "0 to 1"],
    liveUrl: "https://subh-portfolio2026.framer.website/emr",
    featured: true,
  },
  {
    slug: "saral-funding-crm",
    title: "Saral Funding CRM",
    category: "Fintech",
    summary:
      "A purpose-built CRM for a fintech loan-consolidation sales team, unifying pipeline management with an integrated WhatsApp inbox.",
    description: [
      "Saral Funding helps individuals secure loans at lower interest rates — a high-trust, high-touch business that lives or dies on timely follow-ups. No off-the-shelf CRM fit: tools were either too costly, too complex, or missing the features that actually mattered, like native WhatsApp integration.",
      "The core insight was that the product needed to serve two entirely different users — sales staff who needed fast, action-oriented screens for high call volume, and admins who needed data-oriented dashboards for pipeline visibility. A single interface trying to serve both would have served neither well.",
      "Bringing WhatsApp directly into the CRM (rather than leaving it as a separate app staff had to context-switch to) turned out to be the single highest-leverage decision in the whole project — it fixed the workflow gap that was actually costing conversions.",
    ],
    role: "UI/UX Designer",
    year: "2024",
    tags: ["Fintech", "CRM", "B2B", "Dashboard"],
    liveUrl: "https://subh-portfolio2026.framer.website/saral-funding",
    featured: true,
  },
  {
    slug: "mythic-boost-marketplace",
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
    tags: ["Gaming", "Marketplace", "Payments", "Chat"],
    featured: false,
  },
];

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}
