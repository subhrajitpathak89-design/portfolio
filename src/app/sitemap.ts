import type { MetadataRoute } from "next";
import { siteUrl } from "@/content/profile";
import { projects } from "@/content/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: siteUrl,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${siteUrl}/case-studies`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    // Unwritten ones are left out: their route renders the shared template
    // against empty content, and there is nothing there worth indexing yet.
    ...projects
      .filter((project) => !project.comingSoon)
      .map((project) => ({
        url: `${siteUrl}/projects/${project.slug}`,
        lastModified,
        changeFrequency: "yearly" as const,
        priority: 0.7,
      })),
  ];
}
