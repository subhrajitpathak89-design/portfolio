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

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
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

  if (!project) notFound();

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
