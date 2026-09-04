import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Check } from "lucide-react";
import { FlowDiagram } from "@/components/v3/FlowDiagram";
import { LoopVideo } from "@/components/v3/LoopVideo";
import { ToolMarks } from "@/components/v3/ToolMarks";
import { nivexShots, type NivexShot } from "@/content/nivex-shots";
import type { Project } from "@/types";

/**
 * The Nivex case study.
 *
 * Its own layout rather than the shared `CaseStudy` one, because the shared
 * page is built for reading and this one is built for scanning: a hiring
 * manager should get the whole project from the visuals in under a minute, and
 * find the depth only if they want it. Every section here is a statement, a
 * diagram or a screen — the copy is caption-length by design, and the sections
 * deliberately do not share a rhythm, so scrolling has some shape to it.
 *
 * Every screenshot is the real deployed prototype, captured from the live app.
 * Where a concept has no screen — the medical model, the AI gate — it is drawn
 * as a diagram rather than faked as a product feature.
 */

const COLUMN = "mx-auto w-full max-w-[70rem]";
// Capped for measure but not centred: every statement, diagram and screen on
// the page starts at the column's left edge, so a centred paragraph among them
// reads as a mistake rather than as emphasis.
const NARROW = "max-w-[46rem]";

/** All captures are 1440x900, so one ratio covers every frame on the page. */
const RATIO = "aspect-[16/10]";

/**
 * The hero loop: a tour of the investor product — dashboard, portfolio,
 * prescription, goals, trades — cut from a capture of the deployed prototype.
 *
 * Cropped from 16:9 to the page's 16:10 by trimming 96px of wallpaper from each
 * side, so it fills the same frame the screenshots do with none of the window
 * lost. Hashed filenames, because this sits above the fold and a silent
 * re-encode under a stable name would be invisible behind the image and
 * browser caches.
 */
const HERO_VIDEO = "/images/v3/nivex/hero-loop.bc6cfc61.mp4";
const HERO_POSTER = "/images/v3/nivex/hero-loop-poster.b886d85c.webp";

export function NivexCaseStudy({ project, next }: { project: Project; next: Project }) {
  return (
    <article
      className="relative bg-v3-bg v3-brand"
      style={{ "--v3-brand": project.brand ?? "#434ce6" } as React.CSSProperties}
    >
      <div className="v3-hatch v3-bleed absolute inset-y-0 left-0" aria-hidden />
      <div className="v3-hatch v3-bleed absolute inset-y-0 right-0" aria-hidden />

      <div className="v3-column px-5 pb-24 pt-28 sm:px-10 lg:px-16 lg:pb-32 lg:pt-36">
        {/* ── 01 Hero ──────────────────────────────────────────────────── */}
        <header className={COLUMN}>
          <Link
            href="/#work"
            className="group inline-flex items-center gap-2 py-2 font-mono text-[11px] uppercase tracking-[0.16em] text-v3-muted transition-colors duration-200 hover:text-v3-fg"
          >
            <ArrowLeft
              aria-hidden
              className="size-3.5 transition-transform duration-200 group-hover:-translate-x-0.5"
              strokeWidth={2}
            />
            All work
          </Link>

          <p
            data-reveal-item
            className="mt-10 font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-v3-accent"
          >
            Lead Designer · Fintech · Product + Design System
          </p>

          <h1
            data-reveal-item
            className="mt-5 max-w-[24ch] font-editorial-display text-[clamp(2rem,5.4vw,4.25rem)] font-normal leading-[1.02] tracking-[-0.025em] text-v3-fg"
          >
            From financial products to financial prescriptions.
          </h1>

          <p
            data-reveal-item
            className="mt-7 max-w-[40rem] text-base leading-relaxed text-v3-muted sm:text-lg"
          >
            Designing Nivex, a wealth platform that diagnoses an investor&rsquo;s
            financial situation before recommending what to do next.
          </p>

          <dl
            data-reveal-item
            className="mt-10 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-v3-line pt-7 sm:grid-cols-4"
          >
            {[
              ["Role", project.role],
              ["Company", project.client ?? "—"],
              ["Year", project.year],
            ].map(([label, value]) => (
              <div key={label}>
                <dt className="font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-v3-muted">
                  {label}
                </dt>
                <dd className="mt-1.5 text-sm text-v3-fg">{value}</dd>
              </div>
            ))}
            <div>
              <dt className="font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-v3-muted">
                Built with
              </dt>
              <dd className="mt-1.5">
                {project.tools && <ToolMarks tools={project.tools} showLabel={false} />}
              </dd>
            </div>
          </dl>
        </header>

        {/* The hero moves, because the product is a sequence rather than a
            screen: the tour walks dashboard, portfolio, prescription, goals and
            trades in one shot, which no single still could say. The prescription
            screen keeps its place further down, where it carries the AI-gate
            argument on its own.

            `LoopVideo` holds the poster under reduced motion and pauses off
            screen, so a reader who has asked for less motion gets a still hero
            and nothing else changes. */}
        <div data-reveal-item className={`${COLUMN} mt-12 lg:mt-16`}>
          <div
            className={`relative ${RATIO} overflow-hidden rounded-xl border border-v3-line bg-v3-surface`}
          >
            <LoopVideo
              src={HERO_VIDEO}
              poster={HERO_POSTER}
              className="absolute inset-0 size-full object-cover"
            />
          </div>
        </div>

        {/* ── 02 The problem ───────────────────────────────────────────── */}
        <Section label="The problem" className={COLUMN}>
          <Statement>
            Most investing apps ask:{" "}
            <span className="text-v3-muted">
              &ldquo;What do you want to invest in?&rdquo;
            </span>
          </Statement>

          {/* Two flows rather than two lists, because the difference between
              them is structural: one asks and sells, the other reads, judges,
              then instructs. Drawn at the same scale so the length of the
              second one is the argument. */}
          {/* Stacked, not side by side: in two columns the Nivex flow ran past
              its half of the grid and had to be scrolled to be read, which is a
              poor way to present the half of the comparison that matters. */}
          <div className="mt-10 space-y-10">
            <FlowDiagram
              label="Traditional"
              columns={[
                { width: 132, nodes: [{ label: "Question" }] },
                { width: 132, nodes: [{ label: "Product" }] },
              ]}
              edges={[{ from: [0, 0], to: [1, 0] }]}
            />
            <FlowDiagram
              label="Nivex"
              columns={[
                { width: 138, nodes: [{ label: "Financial data", variant: "accent" }] },
                { width: 126, nodes: [{ label: "Diagnosis", variant: "accent" }] },
                { width: 132, nodes: [{ label: "Prescription", variant: "accent" }] },
                { width: 110, nodes: [{ label: "Action", variant: "accent" }] },
              ]}
              edges={[
                { from: [0, 0], to: [1, 0], accent: true },
                { from: [1, 0], to: [2, 0], accent: true },
                { from: [2, 0], to: [3, 0], accent: true },
              ]}
            />
          </div>

          <p className={`${NARROW} mt-12 text-base leading-relaxed text-v3-muted`}>
            The problem wasn&rsquo;t finding another financial product. It was
            understanding whether the investor&rsquo;s existing decisions were
            actually working.
          </p>
        </Section>

        {/* ── 03 The big idea ──────────────────────────────────────────── */}
        <Section label="The big idea" className={COLUMN}>
          <p
            data-reveal-item
            className="font-editorial-display text-[clamp(2.25rem,7vw,5rem)] font-normal leading-[0.98] tracking-[-0.03em] text-v3-fg"
          >
            Prescription,
            <br />
            <span className="text-v3-accent">not product.</span>
          </p>

          <ol className="mt-14 grid gap-px overflow-hidden rounded-xl border border-v3-line bg-v3-line sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["Examine", "Understand what the investor owns."],
              ["Diagnose", "Find risks, inefficiencies and behavioural patterns."],
              ["Prescribe", "Provide specific, human-reviewed actions."],
              ["Follow up", "Track progress against the prescription."],
            ].map(([title, body], index) => (
              <li
                key={title}
                data-reveal-item
                className="relative bg-v3-surface p-6 lg:p-7"
              >
                <span className="font-mono text-[10px] font-medium tracking-[0.18em] text-v3-accent">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="mt-4 font-grotesk text-lg font-medium tracking-[-0.02em] text-v3-fg">
                  {title}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-v3-muted">{body}</p>
              </li>
            ))}
          </ol>
        </Section>

        {/* ── 04 The product ecosystem ─────────────────────────────────── */}
        <Section label="The product ecosystem" className={COLUMN}>
          <Statement>One design language, three role-specific experiences.</Statement>

          {/* The investor journey end to end, with the audit path drawn live.
              It branches twice and both branches matter: which service you pick
              decides whether you import anything at all, and the dashboard is
              a fan-out rather than a destination. */}
          <FlowDiagram
            label="User flow · investor"
            /* Seven columns in a 1120px reading column, so the gap is tightened
               from 60 to 34: at the default the last column fell off the edge
               and the branch it shows had to be scrolled into view. */
            gap={34}
            columns={[
              {
                width: 108,
                nodes: [
                  { label: "Sign up", variant: "accent" },
                  { label: "Log in" },
                ],
              },
              { width: 126, nodes: [{ label: "Choose service", variant: "accent" }] },
              {
                width: 150,
                nodes: [
                  { label: "Audit My Portfolio", variant: "accent" },
                  { label: "Build My Portfolio" },
                  { label: "Audit My Trades" },
                ],
              },
              {
                width: 132,
                nodes: [
                  { label: "Import CAS / PAN", variant: "accent" },
                  { label: "Short questions", note: "no upload" },
                ],
              },
              { width: 112, nodes: [{ label: "Processing", variant: "accent" }] },
              { width: 116, nodes: [{ label: "Dashboard", variant: "accent" }] },
              {
                width: 140,
                nodes: [
                  { label: "Prescription", variant: "accent" },
                  { label: "Portfolio" },
                  { label: "Goals" },
                  { label: "Trades" },
                ],
              },
            ]}
            edges={[
              { from: [0, 0], to: [1, 0], accent: true },
              { from: [0, 1], to: [1, 0] },
              { from: [1, 0], to: [2, 0], accent: true },
              { from: [1, 0], to: [2, 1] },
              { from: [1, 0], to: [2, 2] },
              { from: [2, 0], to: [3, 0], accent: true },
              { from: [2, 2], to: [3, 0] },
              { from: [2, 1], to: [3, 1] },
              { from: [3, 0], to: [4, 0], accent: true },
              { from: [3, 1], to: [4, 0] },
              { from: [4, 0], to: [5, 0], accent: true },
              { from: [5, 0], to: [6, 0], accent: true },
              { from: [5, 0], to: [6, 1] },
              { from: [5, 0], to: [6, 2] },
              { from: [5, 0], to: [6, 3] },
            ]}
            caption="Highlighted: the audit path, which is the one most investors arrive on. Build My Portfolio skips the import entirely — it has nothing to upload — and that fork is why the dashboard had to be shaped by the services you own rather than by a fixed menu."
          />

          <div className="mt-16 space-y-16 lg:space-y-24">
            <Role
              name="Investor"
              flow={["Choose", "Import", "Diagnose", "Act"]}
              features={[
                "Service selection",
                "PAN / CAS / Tradebook import",
                "Processing",
                "Dashboard",
                "Portfolio",
                "Goals",
                "Trades",
              ]}
              shot="dashboard"
              alt="The Nivex investor dashboard: wealth score, XIRR, invested versus current value and holdings"
            />
            <Role
              name="Advisor"
              flow={["Clients", "Analyse", "Review", "Prescribe"]}
              features={[
                "Client list",
                "Client detail",
                "Case documents",
                "Financial data",
                "Prescription authoring",
                "Calls",
              ]}
              shot="advisor-clients"
              alt="The Nivex advisor client queue: cases by investor, service and status"
            />
            <Role
              name="Admin"
              flow={["Cases", "Investors", "Staff", "Operations"]}
              features={["Overview", "Cases", "Investors", "Staff", "Calls", "Client preview"]}
              shot="admin-overview"
              alt="The Nivex admin overview: platform-wide case and investor operations"
            />
          </div>
        </Section>

        {/* ── 05 Key design decisions ──────────────────────────────────── */}
        <Section label="Key design decisions" className={COLUMN}>
          <div className="space-y-16 lg:space-y-24">
            <Decision
              index={1}
              title="Calm over consumer-fintech"
              body="Removed pill-heavy and promotional patterns so the experience reads as trusted financial advice rather than a trading app."
              shot="splash"
              alt="The Nivex entry screen: a restrained split layout with a single primary action"
            />

            <Decision
              index={2}
              title="One investor ≠ one service"
              body="The product moved from assuming one service per investor to supporting several, without fragmenting the experience."
              shot="advisor-clients"
              alt="The advisor queue showing one investor holding three separate services"
              caption="Harsh Sharma, three times — Portfolio Audit, Build Portfolio and Trades Audit as separate cases under one investor."
            >
              {/* The whole decision is the fan-out, so the diagram has to
                  branch. Three services under one investor, each its own case
                  with its own status — which is exactly what the queue above
                  shows happening to Harsh Sharma. */}
              <FlowDiagram
                label="One investor, many services"
                columns={[
                  { width: 132, nodes: [{ label: "Investor", variant: "accent" }] },
                  {
                    width: 168,
                    nodes: [
                      { label: "Portfolio Audit", note: "own case" },
                      { label: "Trades Audit", note: "own case" },
                      { label: "Build Portfolio", note: "own case" },
                    ],
                  },
                  { width: 150, nodes: [{ label: "One dashboard", variant: "accent" }] },
                ]}
                edges={[
                  { from: [0, 0], to: [1, 0], accent: true },
                  { from: [0, 0], to: [1, 1], accent: true },
                  { from: [0, 0], to: [1, 2], accent: true },
                  { from: [1, 0], to: [2, 0] },
                  { from: [1, 1], to: [2, 0] },
                  { from: [1, 2], to: [2, 0] },
                ]}
                caption="The fix was not a second dashboard per service. The nav, the home hero and the cross-sell all read from one seam, so owning three services still gives you one product."
              />
            </Decision>

            <Decision
              index={3}
              title="AI proposes. Humans prescribe."
              body="AI can suggest recommendations, but an advisor has to explicitly approve them before they reach the investor."
              shot="audit-prescription"
              alt="The prescription an investor sees: three advisor-approved steps, each with a reason"
              caption="What the investor receives has already passed a person."
            >
              {/* The gate node is filled rather than outlined because it is
                  the only step that cannot be skipped, and the diagram exists
                  to say so. */}
              <FlowDiagram
                label="Human in the loop"
                columns={[
                  { width: 146, nodes: [{ label: "Financial signals", variant: "accent" }] },
                  { width: 122, nodes: [{ label: "AI draft", note: "suggested" }] },
                  {
                    width: 152,
                    nodes: [{ label: "Advisor review", note: "must approve", variant: "gate" }],
                  },
                  { width: 132, nodes: [{ label: "Prescription", variant: "accent" }] },
                  { width: 112, nodes: [{ label: "Investor", variant: "accent" }] },
                ]}
                edges={[
                  { from: [0, 0], to: [1, 0], accent: true },
                  { from: [1, 0], to: [2, 0], accent: true },
                  { from: [2, 0], to: [3, 0], accent: true },
                  { from: [3, 0], to: [4, 0], accent: true },
                ]}
                caption="Nothing passes the filled step automatically. No bulk accept either — an advisor accepts one draft at a time, which is the feature rather than the friction."
              />
            </Decision>
          </div>
        </Section>

        {/* ── 06 The design system ─────────────────────────────────────── */}
        <Section label="The design system" className={COLUMN}>
          <Statement>One system. Multiple products.</Statement>

          {/* One chain into a fan-out: the three token layers resolve in order,
              and everything downstream of them is a consumer. That shape is the
              claim — four surfaces, one source. */}
          <FlowDiagram
            label="Tokens to product"
            columns={[
              { width: 116, nodes: [{ label: "Primitives", variant: "accent" }] },
              { width: 122, nodes: [{ label: "Semantic", variant: "accent" }] },
              { width: 110, nodes: [{ label: "Theme", variant: "accent" }] },
              { width: 132, nodes: [{ label: "Components", variant: "accent" }] },
              {
                width: 128,
                nodes: [
                  { label: "Investor" },
                  { label: "Staff" },
                  { label: "Admin" },
                  { label: "Marketing" },
                ],
              },
            ]}
            edges={[
              { from: [0, 0], to: [1, 0], accent: true },
              { from: [1, 0], to: [2, 0], accent: true },
              { from: [2, 0], to: [3, 0], accent: true },
              { from: [3, 0], to: [4, 0], accent: true },
              { from: [3, 0], to: [4, 1], accent: true },
              { from: [3, 0], to: [4, 2], accent: true },
              { from: [3, 0], to: [4, 3], accent: true },
            ]}
            caption="313 tokens resolving in that order, with a lint on every pull request and nothing hardcoded — which is why dark mode was a configuration change rather than a redesign."
          />

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {([
              ["dashboard", "Investor"],
              ["advisor-clients", "Staff"],
              ["admin-cases", "Admin"],
            ] as const).map(([shot, label]) => (
              <figure key={shot} data-reveal-item>
                <Shot
                  src={shot}
                  alt={`Nivex ${label.toLowerCase()} surface, built from the shared system`}
                  sizes="(min-width: 640px) 22rem, 100vw"
                />
                <figcaption className="mt-3 font-mono text-[10px] uppercase tracking-[0.18em] text-v3-muted">
                  {label}
                </figcaption>
              </figure>
            ))}
          </div>

          <p className={`${NARROW} mt-12 text-base leading-relaxed text-v3-muted`}>
            The design system wasn&rsquo;t a standalone library. It was built to
            ship the product — shared tokens and components keeping every surface
            consistent in look and in behaviour.
          </p>
        </Section>

        {/* ── 07 Designing with Claude Code ────────────────────────────── */}
        <Section label="Method" className={COLUMN}>
          <Statement>Designing at the speed of implementation.</Statement>

          {/* Drawn as a cycle, not a line, because the loop is the whole
              reason it was worth working this way — testing real behaviour
              sends you back to the constraints, not forward to a handoff. */}
          <FlowDiagram
            label="Workflow"
            columns={[
              { width: 146, nodes: [{ label: "Design constraints", variant: "accent" }] },
              { width: 126, nodes: [{ label: "Claude Code", note: "implementation" }] },
              { width: 150, nodes: [{ label: "Working prototype", variant: "accent" }] },
              { width: 108, nodes: [{ label: "Test", variant: "accent" }] },
            ]}
            edges={[
              { from: [0, 0], to: [1, 0], accent: true },
              { from: [1, 0], to: [2, 0], accent: true },
              { from: [2, 0], to: [3, 0], accent: true },
              { from: [3, 0], to: [0, 0], loop: true },
            ]}
            caption="Constraints first, implementation second, human judgment throughout. The dashed return is where most of the design actually happened."
          />

          <p className={`${NARROW} mt-12 text-base leading-relaxed text-v3-muted`}>
            I translated the product decisions and the design system into a
            working React prototype with Claude Code, so I could test real
            product behaviour instead of relying on static screens.
          </p>

          <ul
            data-reveal-item
            className="mt-8 flex flex-wrap gap-2"
          >
            {[
              "CLAUDE.md",
              "14 ADRs",
              "Design tokens",
              "Component docs",
              "React prototype",
              "Storybook",
            ].map((item) => (
              <li
                key={item}
                className="rounded-md border border-v3-line px-3 py-1.5 font-mono text-[11px] text-v3-muted"
              >
                {item}
              </li>
            ))}
          </ul>

          <p className={`${NARROW} mt-8 text-sm leading-relaxed text-v3-muted/80`}>
            Constraints first, implementation second, human judgment throughout.
            The rules and architecture decisions existed before the code they
            governed.
          </p>
        </Section>

        {/* ── 08 The final product ─────────────────────────────────────── */}
        <Section label="The product" className={COLUMN}>
          <div className="space-y-14 lg:space-y-20">
            {([
              [
                "choose-service",
                "Service selection",
                "Three ways in, depending on whether you already hold something.",
              ],
              [
                "import-portfolio",
                "Data import",
                "Holdings pulled from a CAS statement, PAN or tradebook — nothing typed twice.",
              ],
              [
                "audit-prescription",
                "Prescription",
                "Analysis converted into specific, ordered, advisor-approved actions.",
              ],
              [
                "portfolio",
                "Portfolio diagnosis",
                "Raw financial data turned into signals an investor can read.",
              ],
              [
                "dashboard",
                "Investor dashboard",
                "Shaped by the services you own, showing progress against the prescription.",
              ],
              [
                "goals",
                "Goals",
                "What the money is for, and whether anything is actually mapped to it.",
              ],
              [
                "trades",
                "Trades",
                "Holding period, win rate and capital deployed — the habits behind the tradebook.",
              ],
              [
                "advisor-clients",
                "Advisor workspace",
                "The context an advisor needs to review a case and prescribe against it.",
              ],
              [
                "admin-cases",
                "Admin operations",
                "Every case across the platform, by service and status.",
              ],
            ] as const).map(([shot, title, caption]) => (
              <figure key={shot} data-reveal-item>
                <Shot src={shot} alt={`Nivex — ${title}`} />
                <figcaption className="mt-5 flex flex-wrap items-baseline gap-x-4 gap-y-1">
                  <span className="font-grotesk text-base font-medium tracking-[-0.01em] text-v3-fg">
                    {title}
                  </span>
                  <span className="text-sm text-v3-muted">{caption}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </Section>

        {/* ── 09 Outcome ───────────────────────────────────────────────── */}
        <Section label="Delivered" className={COLUMN}>
          <ul className="grid gap-x-8 gap-y-3.5 sm:grid-cols-2">
            {[
              "Investor experience",
              "Advisor experience",
              "Admin experience",
              "Shared design system",
              "Working product prototype",
              "Storybook",
              "Marketing website",
              "Human-in-the-loop prescription model",
            ].map((item) => (
              <li
                key={item}
                data-reveal-item
                className="flex items-center gap-3 border-b border-v3-line pb-3.5 text-sm text-v3-fg"
              >
                <Check aria-hidden className="size-4 shrink-0 text-v3-accent" strokeWidth={2.5} />
                {item}
              </li>
            ))}
          </ul>

          <p
            data-reveal-item
            className="mt-20 max-w-[34ch] font-editorial-display text-[clamp(1.75rem,4.6vw,3.25rem)] font-normal leading-[1.05] tracking-[-0.025em] text-v3-fg"
          >
            The goal wasn&rsquo;t to build another investment app. It was to make
            financial advice understandable, actionable and trustworthy.
          </p>

          <p className={`${NARROW} mt-10 text-base leading-relaxed text-v3-muted`}>
            Nivex changed how I think about AI-assisted product design: the
            important question isn&rsquo;t only what AI can automate, but where it
            should stop.
          </p>
        </Section>

        {/* ── Next ─────────────────────────────────────────────────────── */}
        <div className={`${COLUMN} mt-24 border-t border-v3-line pt-10 lg:mt-32`}>
          <p className="font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-v3-muted">
            Next case study
          </p>
          <Link
            href={`/projects/${next.slug}`}
            className="group mt-5 flex flex-wrap items-end justify-between gap-4"
          >
            <span className="font-grotesk text-[clamp(1.375rem,3vw,2.25rem)] font-medium leading-tight tracking-[-0.03em] text-v3-fg transition-colors duration-200 group-hover:text-v3-accent">
              {next.title}
            </span>
            <ArrowUpRight
              aria-hidden
              className="size-7 shrink-0 text-v3-muted transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-v3-accent"
              strokeWidth={2}
            />
          </Link>
        </div>
      </div>
    </article>
  );
}

/* ───────────────────────────── pieces ───────────────────────────────── */

function Section({
  label,
  className = "",
  children,
}: {
  label: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section className={`${className} mt-28 lg:mt-40`}>
      <h2 className="mb-10 flex items-center gap-4 font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-v3-muted">
        {label}
        <span aria-hidden className="h-px flex-1 bg-v3-line" />
      </h2>
      {children}
    </section>
  );
}

/** A section's one big line. Editorial size, deliberately little of it. */
function Statement({ children }: { children: React.ReactNode }) {
  return (
    <p
      data-reveal-item
      className="max-w-[30ch] font-editorial-display text-[clamp(1.625rem,4vw,2.875rem)] font-normal leading-[1.08] tracking-[-0.02em] text-v3-fg"
    >
      {children}
    </p>
  );
}

/** A real screen from the deployed prototype, in a consistent frame. */
function Shot({
  src,
  alt,
  priority = false,
  sizes = "(min-width: 1024px) 70rem, 100vw",
}: {
  /** Logical screen name; the hashed filename comes from the manifest. */
  src: NivexShot;
  alt: string;
  priority?: boolean;
  sizes?: string;
}) {
  return (
    <div
      className={`relative ${RATIO} overflow-hidden rounded-xl border border-v3-line bg-v3-surface`}
    >
      <Image
        src={nivexShots[src]}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover"
      />
    </div>
  );
}

/** One of the three role-based experiences: screen first, then what it is. */
function Role({
  name,
  flow,
  features,
  shot,
  alt,
}: {
  name: string;
  flow: string[];
  features: string[];
  shot: NivexShot;
  alt: string;
}) {
  return (
    <div data-reveal-item>
      <Shot src={shot} alt={alt} />
      <div className="mt-6 grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] lg:gap-10">
        <div>
          <p className="font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-v3-accent">
            {name}
          </p>
          <p className="mt-3 font-grotesk text-base font-medium tracking-[-0.01em] text-v3-fg">
            {flow.join("  →  ")}
          </p>
        </div>
        <ul className="flex flex-wrap gap-2 lg:justify-end">
          {features.map((feature) => (
            <li
              key={feature}
              className="rounded-md border border-v3-line px-2.5 py-1.5 font-mono text-[11px] text-v3-muted"
            >
              {feature}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/** Visual, then a short title, then one sentence. In that order, deliberately. */
function Decision({
  index,
  title,
  body,
  shot,
  alt,
  caption,
  children,
}: {
  index: number;
  title: string;
  body: string;
  shot: NivexShot;
  alt: string;
  caption?: string;
  children?: React.ReactNode;
}) {
  return (
    <div data-reveal-item>
      <Shot src={shot} alt={alt} />
      {/* Sentence case at 11px, not uppercase at 10px.
          Every other 10px mono on this site is a label — an eyebrow, a `dt`, a
          two-word tag — where uppercase and wide tracking are legible because
          there is nothing to read. These captions are full sentences, and a
          sentence set in 10px letterspaced caps is the least readable thing on
          a phone. */}
      {caption && (
        <p className="mt-3 max-w-[68ch] font-mono text-[11px] leading-relaxed tracking-[0.02em] text-v3-muted">
          {caption}
        </p>
      )}

      <div className="mt-7 grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-12">
        <div>
          <p className="font-mono text-[11px] font-medium tracking-[0.2em] text-v3-accent">
            {String(index).padStart(2, "0")}
          </p>
          <p className="mt-3 font-grotesk text-xl font-medium tracking-[-0.02em] text-v3-fg sm:text-2xl">
            {title}
          </p>
        </div>
        <p className="text-base leading-relaxed text-v3-muted">{body}</p>
      </div>

      {children && <div className="mt-7">{children}</div>}
    </div>
  );
}
