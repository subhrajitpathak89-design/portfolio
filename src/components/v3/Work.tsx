import { WorkScroller } from "@/components/v3/WorkScroller";
import { projects } from "@/content/projects";

/**
 * The selected-work section on the homepage: a sticky description on the left
 * and the covers scrolling past on the right (see `WorkScroller`).
 *
 * Unwritten case studies are left out here and shown on `/case-studies`
 * instead: the homepage is the shortlist a reviewer with sixty seconds sees,
 * and a blurred placeholder in it spends a slot saying nothing.
 *
 * Padded on the same edges as the hero and header, so the section's left
 * edge lines up with the headline above it.
 */
export function Work() {
  const featured = projects.filter((project) => project.featured && !project.comingSoon);
  const list = featured.length > 0 ? featured : projects.filter((p) => !p.comingSoon);

  return (
    <section id="work" className="relative scroll-mt-24 bg-v3-bg">
      <div className="v3-column px-5 pb-24 pt-16 sm:px-10 lg:px-16 lg:pb-32 lg:pt-24">
        <WorkScroller projects={list} total={projects.length} />
      </div>
    </section>
  );
}
