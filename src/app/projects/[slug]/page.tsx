import { notFound } from "next/navigation";
import { getProjectBySlug, projects } from "@/content/projects";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="flex min-h-screen items-center justify-center">
      <p className="text-muted-foreground">Redesign in progress: {project.title}</p>
    </main>
  );
}
