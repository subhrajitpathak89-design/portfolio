import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Container } from "@/components/ui/Container";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
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

  const url = `/projects/${project.slug}`;
  const image = {
    url: "/images/og-image.png",
    width: 1200,
    height: 630,
    alt: project.title,
  };

  return {
    title: project.title,
    description: project.summary,
    keywords: project.tags,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title: project.title,
      description: project.summary,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description: project.summary,
      images: [image.url],
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const currentIndex = projects.findIndex((entry) => entry.slug === project.slug);
  const nextProject = projects[(currentIndex + 1) % projects.length];

  const meta = [
    { label: "Role", value: project.role },
    { label: "Year", value: project.year },
    { label: "Discipline", value: project.category },
  ];

  return (
    <article className="py-14 sm:py-20">
      <Container>
        <Link
          href="/#work"
          className="group inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors duration-200 hover:text-accent"
        >
          <ArrowLeft
            className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-0.5"
            aria-hidden
          />
          Back to all work
        </Link>

        <header className="mt-8 max-w-3xl">
          <Badge variant="accent">{project.category}</Badge>
          <h1 className="mt-5 font-display text-4xl font-semibold leading-tight tracking-tight text-foreground sm:text-5xl">
            {project.title}
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{project.summary}</p>
        </header>

        <div className="mt-12 overflow-hidden rounded-2xl border border-border bg-muted">
          <div className="aspect-[16/9]">
            {project.coverImage ? (
              <Image
                src={project.coverImage}
                alt={project.title}
                width={1600}
                height={900}
                priority
                className="h-full w-full object-cover"
              />
            ) : (
              <PlaceholderImage
                seed={project.slug}
                label={project.title}
                caption={project.category}
              />
            )}
          </div>
        </div>

        <div className="mt-14 grid gap-12 lg:grid-cols-[0.32fr_0.68fr]">
          <aside className="flex flex-col gap-8">
            <dl className="flex flex-col gap-6">
              {meta.map((item) => (
                <div key={item.label}>
                  <dt className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                    {item.label}
                  </dt>
                  <dd className="mt-2 text-base text-foreground">{item.value}</dd>
                </div>
              ))}
            </dl>

            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Tags</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <li key={tag}>
                    <Badge>{tag}</Badge>
                  </li>
                ))}
              </ul>
            </div>

            {project.liveUrl ? (
              <a
                href={project.liveUrl}
                className="group inline-flex w-fit items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-medium text-foreground transition-colors duration-200 hover:border-accent/40 hover:text-accent"
              >
                Visit live project
                <ExternalLink
                  className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
                  aria-hidden
                />
              </a>
            ) : null}
          </aside>

          <div className="space-y-6">
            {project.description.map((paragraph) => (
              <p
                key={paragraph.slice(0, 24)}
                className="text-base leading-relaxed text-muted-foreground"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        <nav
          aria-label="Project navigation"
          className="mt-20 border-t border-border pt-8"
        >
          <Link
            href={`/projects/${nextProject.slug}`}
            className="group flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between"
          >
            <span>
              <span className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                Next project
              </span>
              <span className="mt-2 block font-display text-2xl font-semibold tracking-tight text-foreground transition-colors duration-200 group-hover:text-accent sm:text-3xl">
                {nextProject.title}
              </span>
            </span>
            <ArrowUpRight
              className="h-6 w-6 text-muted-foreground transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
              aria-hidden
            />
          </Link>
        </nav>
      </Container>
    </article>
  );
}
