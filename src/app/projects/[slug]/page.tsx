import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseStudy } from "@/components/v3/CaseStudy";
import { NivexCaseStudy } from "@/components/v3/NivexCaseStudy";
import { SparrowCaseStudy } from "@/components/v3/SparrowCaseStudy";
import { getProjectBySlug, projects } from "@/content/projects";

/**
 * Case studies that ship their own layout instead of the shared reading one.
 *
 * Nivex is built to be scanned rather than read — nine visual sections, real
 * product screens, caption-length copy — and that shape does not generalise to
 * the projects whose story is prose. Keyed by slug rather than by a flag on the
 * project so the content file stays about content.
 */
const BESPOKE = {
  "nivex-wealth-platform": NivexCaseStudy,
  "sparrow-api-workspace": SparrowCaseStudy,
} as const;

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

/**
 * Only the readable ones get a route.
 *
 * A locked project used to be built here like any other, so its page was a
 * complete, publicly readable case study that simply had no link pointing at
 * it — the blur and the "coming soon" badge on the card were decoration over a
 * page anyone with the URL could read in full. `comingSoon` is a statement
 * about whether the writing is finished, so it has to gate the route too.
 */
export function generateStaticParams() {
  return projects
    .filter((project) => !project.comingSoon)
    .map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return { title: "Project not found" };
  }

  return {
    title: project.title,
    description: project.summary,
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  // Unknown, or locked. `generateStaticParams` already leaves the locked ones
  // unbuilt, but a direct request still reaches this handler, so the guard has
  // to be here as well or the lock only holds for links the site renders.
  if (!project || project.comingSoon) notFound();

  // Wraps around, so the last study still offers somewhere to go.
  // Skips anything marked `comingSoon`, so "next case study" never sends a
  // reader to a page that is not written. Falls back to this project only if
  // every other one is unwritten, which cannot happen today.
  const readable = projects.filter((entry) => !entry.comingSoon);
  const index = readable.findIndex((entry) => entry.slug === project.slug);
  const next = readable[(index + 1) % readable.length] ?? project;

  const Layout = BESPOKE[project.slug as keyof typeof BESPOKE] ?? CaseStudy;

  return (
    <main className="bg-v3-bg">
      <Layout project={project} next={next} />
    </main>
  );
}
