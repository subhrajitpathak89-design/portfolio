import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseStudy } from "@/components/v3/CaseStudy";
import { getProjectBySlug, projects } from "@/content/projects";

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
  const index = projects.findIndex((entry) => entry.slug === project.slug);
  const next = projects[(index + 1) % projects.length];

  return (
    <main className="bg-v3-bg">
      <CaseStudy project={project} next={next} />
    </main>
  );
}
