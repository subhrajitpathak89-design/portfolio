# Portfolio

A modern, mixed-discipline design portfolio built with Next.js.

Single-page site with anchored sections (Hero, About, Work, Skills, Contact) plus statically
generated case-study pages for each project. All copy, projects and links are placeholder content.

## Tech stack

- [Next.js 16](https://nextjs.org) (App Router, Turbopack)
- React 19 + TypeScript (strict)
- Tailwind CSS v4 (CSS-first config via `@theme` in `src/app/globals.css`)
- [next-themes](https://github.com/pacocoursey/next-themes) for class-based dark mode
- [lucide-react](https://lucide.dev) icons
- [clsx](https://github.com/lukeed/clsx) for class composition
- `next/font/google` — Space Grotesk (display) + Inter (body)
- ESLint via `eslint-config-next`

## Setup

```bash
npm install     # install dependencies
npm run dev     # start the dev server on http://localhost:3000
npm run build   # production build
npm run start   # serve the production build
npm run lint    # lint
```

## Folder structure

```
portfolio/
├── public/images/            # static assets (og-image.png)
└── src/
    ├── app/
    │   ├── layout.tsx        # fonts, ThemeProvider, Navbar, Footer, root metadata
    │   ├── page.tsx          # composes the section components
    │   ├── globals.css       # Tailwind import, @theme tokens, dark variant
    │   ├── icon.svg          # favicon (auto-detected by Next.js)
    │   ├── robots.ts         # MetadataRoute.Robots
    │   ├── sitemap.ts        # MetadataRoute.Sitemap
    │   └── projects/[slug]/page.tsx   # case study + generateMetadata + generateStaticParams
    ├── components/
    │   ├── layout/           # Navbar, Footer
    │   ├── sections/         # Hero, About, Projects, Skills, Contact
    │   └── ui/               # Container, SectionHeading, ProjectCard,
    │                         # PlaceholderImage, Badge, ThemeToggle, SocialIcons
    ├── content/              # profile, projects, skills, nav — all site copy
    ├── lib/                  # cn() helper, useInView scroll-reveal hook
    └── types/                # Project, SkillCategory, SocialLink, NavLink, Profile
```

## Customizing content

All copy lives in `src/content/*.ts` — no component edits needed for a content refresh.

- `src/content/profile.ts` — name, role, tagline, bio, location, email, social links, and
  `siteUrl` (currently `https://example.com`; replace it with the real domain, since it feeds
  `metadataBase`, the sitemap and robots.txt).
- `src/content/projects.ts` — the case-study entries. Each `Project` needs `slug`, `title`,
  `category`, `summary`, `description` (array of paragraphs), `role`, `year`, `tags` and
  `featured`; `coverImage` and `liveUrl` are optional.
- `src/content/skills.ts` — skill categories shown in the Skills section.
- `src/content/nav.ts` — the navigation links.

For imagery, drop files into `public/images/` and reference them from `coverImage`
(e.g. `coverImage: "/images/meridian-cover.png"`). While `coverImage` is undefined, the site
renders `PlaceholderImage` — an inline SVG whose gradient is derived deterministically from the
project slug, so every card gets a distinct but consistent look with no external image service.
Replace `public/images/og-image.png` (1200×630) with real social-share artwork, and
`src/app/icon.svg` with a real monogram.

## Not included in v1 (possible future additions)

- CMS or MDX-driven content (case studies are typed TS objects today)
- A working contact form backend — the Contact section is a `mailto:` link by design
- Analytics
- Internationalisation (i18n)
- Automated tests and CI
- A page-transition animation library (interactivity is CSS transitions only)
- Dynamic OG image generation (`next/og`) per project

Deployment is not configured. [Vercel](https://vercel.com) is the natural target for a follow-up —
it needs no config for a standard Next.js App Router project, just remember to update `siteUrl`
in `src/content/profile.ts` to the production domain first.
