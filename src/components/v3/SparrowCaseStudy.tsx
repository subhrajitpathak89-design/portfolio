import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Check } from "lucide-react";
import { FlowDiagram } from "@/components/v3/FlowDiagram";
import { ToolMarks } from "@/components/v3/ToolMarks";
import { sparrowShots, type SparrowShotName } from "@/content/sparrow-shots";
import type { Project } from "@/types";

/**
 * The Sparrow case study.
 *
 * Its own layout, like Nivex's, and for the same reason: built to be scanned
 * rather than read. The difference is what carries it. Nivex's argument is a
 * reframe, so that page leads with statements; Sparrow's argument is an
 * information architecture, so this one leads with diagrams and dense product
 * screens, and the copy stays at caption length.
 *
 * Every screen is Sparrow's own published UI. Where the brief named a feature
 * the shipped product does not have under that name — "templates", "starred" —
 * the section keeps the idea and uses what the product actually calls it, which
 * is noted where it happens rather than papered over.
 */

const COLUMN = "mx-auto w-full max-w-[70rem]";
const NARROW = "max-w-[46rem]";

export function SparrowCaseStudy({ project, next }: { project: Project; next: Project }) {
  return (
    <article
      className="relative bg-v3-bg v3-brand"
      style={{ "--v3-brand": project.brand ?? "#3670f7" } as React.CSSProperties}
    >
      <div className="v3-hatch v3-bleed absolute inset-y-0 left-0" aria-hidden />
      <div className="v3-hatch v3-bleed absolute inset-y-0 right-0" aria-hidden />

      <div className="v3-column px-5 pb-24 pt-28 sm:px-10 lg:px-16 lg:pb-32 lg:pt-36">
        {/* ── Hero ─────────────────────────────────────────────────────── */}
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
            Product Designer · B2B SaaS · Developer Tools
          </p>

          <h1
            data-reveal-item
            className="mt-5 max-w-[22ch] font-editorial-display text-[clamp(2rem,5.4vw,4.25rem)] font-normal leading-[1.02] tracking-[-0.025em] text-v3-fg"
          >
            A clearer workspace for working with APIs.
          </h1>

          <p
            data-reveal-item
            className="mt-7 max-w-[40rem] text-base leading-relaxed text-v3-muted sm:text-lg"
          >
            Designing Sparrow, a developer-focused API platform built around
            hubs, workspaces and a marketplace for reusable API resources.
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

        {/* The request surface is the hero: it is the densest screen in the
            product and the one the whole architecture exists to keep calm. */}
        <div data-reveal-item className={`${COLUMN} mt-12 lg:mt-16`}>
          <Shot
            name="api-testing"
            alt="Sparrow's request surface: collection tree, request tabs, response pane and an AI panel"
            priority
          />
        </div>

        {/* ── 01 The problem ───────────────────────────────────────────── */}
        <Section label="The problem" className={COLUMN}>
          <Statement>
            API tools are powerful.
            <br />
            <span className="text-v3-muted">Their complexity isn&rsquo;t.</span>
          </Statement>

          <FlowDiagram
            label="What a developer is actually managing"
            gap={30}
            columns={[
              { width: 104, nodes: [{ label: "Requests" }, { label: "Collections" }] },
              { width: 114, nodes: [{ label: "Environments" }, { label: "Variables" }] },
              { width: 108, nodes: [{ label: "Workspaces" }, { label: "Hubs" }] },
              { width: 100, nodes: [{ label: "Test flows" }, { label: "Teams" }] },
              {
                width: 132,
                nodes: [{ label: "Too much to manage", variant: "gate" }],
              },
            ]}
            edges={[
              { from: [0, 0], to: [4, 0] },
              { from: [0, 1], to: [4, 0] },
              { from: [1, 0], to: [4, 0] },
              { from: [1, 1], to: [4, 0] },
              { from: [2, 0], to: [4, 0] },
              { from: [2, 1], to: [4, 0] },
              { from: [3, 0], to: [4, 0] },
              { from: [3, 1], to: [4, 0] },
            ]}
          />

          <p className={`${NARROW} mt-10 text-base leading-relaxed text-v3-muted`}>
            Developers don&rsquo;t just send requests. They manage environments,
            collections, reusable configurations and shared workflows — and every
            one of those is a place work can get lost.
          </p>
        </Section>

        {/* ── 02 The design challenge ──────────────────────────────────── */}
        <Section label="The design challenge" className={COLUMN}>
          <Statement>How do you organise complexity without hiding power?</Statement>

          <div className="mt-10 space-y-10">
            <FlowDiagram
              label="The usual outcome"
              columns={[
                { width: 118, nodes: [{ label: "More features" }] },
                { width: 112, nodes: [{ label: "More menus" }] },
                { width: 122, nodes: [{ label: "More hierarchy" }] },
                { width: 138, nodes: [{ label: "More to hold in mind" }] },
              ]}
              edges={[
                { from: [0, 0], to: [1, 0] },
                { from: [1, 0], to: [2, 0] },
                { from: [2, 0], to: [3, 0] },
              ]}
            />
            <FlowDiagram
              label="Sparrow"
              columns={[
                { width: 118, nodes: [{ label: "Clear structure", variant: "accent" }] },
                { width: 138, nodes: [{ label: "Focused workspace", variant: "accent" }] },
                { width: 140, nodes: [{ label: "Reusable resources", variant: "accent" }] },
                { width: 122, nodes: [{ label: "Faster workflow", variant: "accent" }] },
              ]}
              edges={[
                { from: [0, 0], to: [1, 0], accent: true },
                { from: [1, 0], to: [2, 0], accent: true },
                { from: [2, 0], to: [3, 0], accent: true },
              ]}
            />
          </div>

          <p className={`${NARROW} mt-10 text-base leading-relaxed text-v3-muted`}>
            The goal was never to remove functionality. It was to make the
            functionality easier to navigate.
          </p>
        </Section>

        {/* ── 03 The product model ─────────────────────────────────────── */}
        <Section label="The product model" className={COLUMN}>
          <Statement>One place for the ecosystem, one for the work.</Statement>

          <FlowDiagram
            label="Hierarchy"
            columns={[
              { width: 108, nodes: [{ label: "Hub", note: "org level", variant: "accent" }] },
              { width: 124, nodes: [{ label: "Workspace", note: "where you work", variant: "accent" }] },
              { width: 118, nodes: [{ label: "Collection", variant: "accent" }] },
              { width: 110, nodes: [{ label: "Request", variant: "accent" }] },
              { width: 96, nodes: [{ label: "Test", variant: "accent" }] },
            ]}
            edges={[
              { from: [0, 0], to: [1, 0], accent: true },
              { from: [1, 0], to: [2, 0], accent: true },
              { from: [2, 0], to: [3, 0], accent: true },
              { from: [3, 0], to: [4, 0], accent: true },
            ]}
            caption="Sparrow separates the broader API ecosystem — hubs, members, public workspaces — from the individual workspace where a developer actually does the work."
          />

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            <Figure name="hub" label="Hub" caption="Workspaces, members and settings for an organisation." />
            <Figure
              name="workspace"
              label="Workspace"
              caption="The focused environment where API work happens."
            />
          </div>
        </Section>

        {/* ── 04 The workspace ─────────────────────────────────────────── */}
        <Section label="The workspace" className={COLUMN}>
          <Statement>The one screen that has to stay calm.</Statement>

          <div data-reveal-item className="mt-10">
            <Shot
              name="collections"
              alt="A Sparrow workspace: collection tree on the left, request in the centre, response below"
            />
          </div>

          <ul className="mt-8 grid gap-x-10 gap-y-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["Workspace", "The primary environment for API testing."],
              ["Organisation", "Related API work stays grouped together."],
              ["Reusability", "Start from an existing resource, not a blank request."],
              ["Collaboration", "Shared API work is discoverable and continuable."],
            ].map(([title, body]) => (
              <li key={title} data-reveal-item className="border-t border-v3-line pt-4">
                <p className="font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-v3-accent">
                  {title}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-v3-muted">{body}</p>
              </li>
            ))}
          </ul>
        </Section>

        {/* ── 05 Hubs and workspaces ───────────────────────────────────── */}
        <Section label="Hubs and workspaces" className={COLUMN}>
          <Statement>A predictable place for every kind of API work.</Statement>

          <FlowDiagram
            label="Worked example"
            gap={46}
            columns={[
              { width: 136, nodes: [{ label: "Payments hub", note: "hub", variant: "accent" }] },
              {
                width: 146,
                nodes: [{ label: "Payment Gateway", note: "workspace", variant: "accent" }],
              },
              {
                width: 150,
                nodes: [
                  { label: "Create Payment" },
                  { label: "Refund Payment" },
                  { label: "Get Transaction" },
                ],
              },
            ]}
            edges={[
              { from: [0, 0], to: [1, 0], accent: true },
              { from: [1, 0], to: [2, 0], accent: true },
              { from: [1, 0], to: [2, 1], accent: true },
              { from: [1, 0], to: [2, 2], accent: true },
            ]}
            caption="The hierarchy gives high-level API resources and day-to-day testing work each a predictable home, so neither has to live inside the other."
          />

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            <Figure name="hub-members" label="Members" caption="Access lives at the hub, not per workspace." />
            <Figure
              name="first-workspace"
              label="New workspace"
              caption="Created inside a hub, so it starts with a place to belong."
            />
          </div>
        </Section>

        {/* ── 06 Discoverability ───────────────────────────────────────── */}
        <Section label="Discoverability" className={COLUMN}>
          <Statement>Don&rsquo;t rebuild what already exists.</Statement>

          <div data-reveal-item className="mt-10">
            <Shot
              name="marketplace"
              alt="The Sparrow marketplace: a grid of public workspaces with collection counts, and recently visited workspaces alongside"
            />
          </div>

          <FlowDiagram
            label="Reuse path"
            columns={[
              { width: 110, nodes: [{ label: "Discover", variant: "accent" }] },
              { width: 100, nodes: [{ label: "Select", variant: "accent" }] },
              { width: 148, nodes: [{ label: "Add to workspace", variant: "accent" }] },
              { width: 92, nodes: [{ label: "Use", variant: "accent" }] },
            ]}
            edges={[
              { from: [0, 0], to: [1, 0], accent: true },
              { from: [1, 0], to: [2, 0], accent: true },
              { from: [2, 0], to: [3, 0], accent: true },
            ]}
            caption="The marketplace is a discovery layer over public workspaces — a payment gateway collection someone has already built and documented, copied into your own workspace rather than rebuilt in it."
          />
        </Section>

        {/* ── 07 Reuse in the product ──────────────────────────────────── */}
        <Section label="Reuse" className={COLUMN}>
          <Statement>From blank workspace to ready-to-test.</Statement>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            <Figure
              name="share-workspace"
              label="Publish"
              caption="A workspace made public becomes a resource other teams can start from."
            />
            <Figure
              name="mock-server"
              label="Mock collection"
              caption="Test against a collection before a live service exists."
            />
          </div>

          <p className={`${NARROW} mt-10 text-base leading-relaxed text-v3-muted`}>
            Reuse works in both directions: pull a public workspace in, or
            publish your own for the next team. It cuts the repetitive setup that
            otherwise precedes every first request.
          </p>
        </Section>

        {/* ── 08 Fast access ───────────────────────────────────────────── */}
        <Section label="Fast access" className={COLUMN}>
          <Statement>Keep active work one click away.</Statement>

          <p className={`${NARROW} mt-8 text-base leading-relaxed text-v3-muted`}>
            Recent APIs and recent workspaces sit permanently in the sidebar, and
            the marketplace keeps its own list of recently visited workspaces.
            Returning to live work does not mean walking the hierarchy again.
          </p>

          <div data-reveal-item className="mt-10">
            <Shot
              name="workspace-manage"
              alt="Sparrow's sidebar with recent APIs and recent workspaces above the workspace list"
            />
          </div>
        </Section>

        {/* ── 09 Key design decisions ──────────────────────────────────── */}
        <Section label="Key design decisions" className={COLUMN}>
          <div className="space-y-14 lg:space-y-20">
            <Decision
              index={1}
              title="Structure before features"
              problem="API tooling turns into a pile of disconnected features fast."
              decision="Establish one hierarchy — hubs, then workspaces — and hang everything off it."
              result="Developers get a predictable answer to where a piece of API work belongs."
              name="hub"
            />
            <Decision
              index={2}
              title="Reuse instead of rebuild"
              problem="Developers keep solving the same setup problem in different workspaces."
              decision="Make reusable resources first-class: public workspaces, a marketplace to find them, mock collections to work before a service exists."
              result="Common API work starts from an existing foundation instead of an empty request."
              name="marketplace"
            />
            <Decision
              index={3}
              title="Fast access to active work"
              problem="The work you are actually doing gets buried by the structure that organises it."
              decision="Keep recent APIs and recent workspaces permanently in reach, outside the tree."
              result="Getting back into live work costs one click, not a navigation."
              name="test-flows"
            />
          </div>
        </Section>

        {/* ── 10 Design system ─────────────────────────────────────────── */}
        <Section label="The system" className={COLUMN}>
          <Statement>One system, many dense surfaces.</Statement>

          <FlowDiagram
            label="How it scales"
            columns={[
              { width: 104, nodes: [{ label: "Tokens", variant: "accent" }] },
              { width: 132, nodes: [{ label: "Components", variant: "accent" }] },
              { width: 132, nodes: [{ label: "API patterns", variant: "accent" }] },
              {
                width: 116,
                nodes: [
                  { label: "Workspace" },
                  { label: "Hub" },
                  { label: "Marketplace" },
                  { label: "Admin" },
                ],
              },
            ]}
            edges={[
              { from: [0, 0], to: [1, 0], accent: true },
              { from: [1, 0], to: [2, 0], accent: true },
              { from: [2, 0], to: [3, 0], accent: true },
              { from: [2, 0], to: [3, 1], accent: true },
              { from: [2, 0], to: [3, 2], accent: true },
              { from: [2, 0], to: [3, 3], accent: true },
            ]}
            caption="Request panels, collection trees, workspace cards, tables, tabs, status pills and modals are the same components everywhere, which is what let new workflows land without the product drifting."
          />

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            <Figure name="request-body" label="Request panel" />
            <Figure name="hub-settings" label="Settings and tables" />
            <Figure name="assertions" label="Assertions" />
          </div>
        </Section>

        {/* ── 11 Complexity to clarity ─────────────────────────────────── */}
        <Section label="Complexity to clarity" className={COLUMN}>
          <Statement>
            Complex software doesn&rsquo;t need less information. It needs better
            hierarchy.
          </Statement>

          <div data-reveal-item className="mt-10">
            <Shot
              name="assertions"
              alt="A dense Sparrow request screen, separated into navigation, context, primary task, supporting actions and status"
            />
          </div>

          <ul className="mt-8 grid gap-x-10 gap-y-6 sm:grid-cols-3 lg:grid-cols-5">
            {[
              ["Navigation", "Where things live. Left rail and tree, always in the same place."],
              ["Context", "Which hub, workspace and environment you are in."],
              ["Primary task", "The request. Centre, widest, unobstructed."],
              ["Supporting", "Params, headers, scripts, assertions — tabbed, not stacked."],
              ["Status", "Response, method and state, read without leaving the task."],
            ].map(([title, body]) => (
              <li key={title} data-reveal-item className="border-t border-v3-line pt-4">
                <p className="font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-v3-accent">
                  {title}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-v3-muted">{body}</p>
              </li>
            ))}
          </ul>
        </Section>

        {/* ── 12 The product ───────────────────────────────────────────── */}
        <Section label="The product" className={COLUMN}>
          <div className="space-y-14 lg:space-y-20">
            {(
              [
                ["api-testing", "Request surface", "Send, inspect and script a request without leaving the pane."],
                ["collections", "Collections", "Related requests grouped where the developer expects them."],
                ["hub", "Hub", "Workspaces, members and access at the organisation level."],
                ["workspace", "Workspace", "A focused environment for one body of API work."],
                ["marketplace", "Marketplace", "Discover reusable API resources built by other teams."],
                ["test-flows", "Test flows", "Chain requests into a flow that can be run and re-run."],
                ["mock-server", "Mock collections", "Test a contract before the service behind it exists."],
                ["share-workspace", "Sharing", "Publish a workspace so the next team starts further along."],
              ] as const
            ).map(([name, title, caption]) => (
              <figure key={name} data-reveal-item>
                <Shot name={name} alt={`Sparrow — ${title}`} />
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

        {/* ── 13 Delivered ─────────────────────────────────────────────── */}
        <Section label="Delivered" className={COLUMN}>
          <ul className="grid gap-x-8 gap-y-3.5 sm:grid-cols-2">
            {[
              "Workspace architecture",
              "Hub-based organisation",
              "Marketplace for reusable API resources",
              "Public workspace publishing",
              "Recent APIs and workspaces",
              "Test flows and mock collections",
              "Scalable product patterns",
              "Consistent design system",
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
            className="mt-16 max-w-[36ch] font-editorial-display text-[clamp(1.5rem,3.6vw,2.5rem)] font-normal leading-[1.08] tracking-[-0.02em] text-v3-fg"
          >
            Sparrow turned a set of powerful API capabilities into a workspace
            model you can hold in your head.
          </p>
        </Section>

        {/* ── 14 Reflection ────────────────────────────────────────────── */}
        <Section label="Reflection" className={COLUMN}>
          <p
            data-reveal-item
            className="max-w-[30ch] font-editorial-display text-[clamp(1.75rem,4.6vw,3.25rem)] font-normal leading-[1.05] tracking-[-0.025em] text-v3-fg"
          >
            The hard part wasn&rsquo;t simplifying the product. It was simplifying
            how people understood it.
          </p>

          <p className={`${NARROW} mt-10 text-base leading-relaxed text-v3-muted`}>
            Sparrow reinforced the lesson I keep relearning in B2B: complexity is
            usually not optional. What design decides is whether it feels
            structured and predictable, or whether it feels like a pile.
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

/**
 * A product screen, framed at its own aspect ratio.
 *
 * Sparrow's app screenshots are about 1.91 wide. Forcing them into the 16:10
 * frame the other case studies use would crop the left rail and the AI panel
 * off the sides — and the panel layout is the argument here, so the frame bends
 * to the image rather than the other way round.
 */
function Shot({
  name,
  alt,
  priority = false,
  sizes = "(min-width: 1024px) 70rem, 100vw",
}: {
  name: SparrowShotName;
  alt: string;
  priority?: boolean;
  sizes?: string;
}) {
  const shot = sparrowShots[name];
  return (
    <div
      className="relative overflow-hidden rounded-xl border border-v3-line bg-v3-surface"
      style={{ aspectRatio: `${shot.w} / ${shot.h}` }}
    >
      <Image src={shot.src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover" />
    </div>
  );
}

/** A smaller screen with a label, for the two- and three-up rows. */
function Figure({
  name,
  label,
  caption,
}: {
  name: SparrowShotName;
  label: string;
  caption?: string;
}) {
  return (
    <figure data-reveal-item>
      <Shot name={name} alt={`Sparrow — ${label}`} sizes="(min-width: 640px) 34rem, 100vw" />
      <figcaption className="mt-3">
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-v3-muted">
          {label}
        </span>
        {caption && <p className="mt-1.5 text-sm leading-relaxed text-v3-muted">{caption}</p>}
      </figcaption>
    </figure>
  );
}

/** Problem → Decision → Result, with the screen it applies to above. */
function Decision({
  index,
  title,
  problem,
  decision,
  result,
  name,
}: {
  index: number;
  title: string;
  problem: string;
  decision: string;
  result: string;
  name: SparrowShotName;
}) {
  return (
    <div data-reveal-item>
      <Shot name={name} alt={`Sparrow — ${title}`} />

      <div className="mt-7 flex items-baseline gap-4">
        <span className="font-mono text-[11px] font-medium tracking-[0.2em] text-v3-accent">
          {String(index).padStart(2, "0")}
        </span>
        <p className="font-grotesk text-xl font-medium tracking-[-0.02em] text-v3-fg sm:text-2xl">
          {title}
        </p>
      </div>

      <dl className="mt-6 grid gap-6 sm:grid-cols-3 sm:gap-8">
        {(
          [
            ["Problem", problem],
            ["Decision", decision],
            ["Result", result],
          ] as const
        ).map(([term, body]) => (
          <div key={term} className="border-t border-v3-line pt-4">
            <dt className="font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-v3-muted">
              {term}
            </dt>
            <dd className="mt-2 text-sm leading-relaxed text-v3-muted">{body}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
