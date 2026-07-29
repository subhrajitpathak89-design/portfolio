# Handoff notes

Status snapshot for picking this project back up from a different machine/account.

## What this is
A Next.js 16 (App Router) + Tailwind v4 personal design portfolio, built with placeholder
content so the structure/design can be reviewed before real projects/bio are dropped in.

## Where things live
- **GitHub repo:** https://github.com/subhrajitpathak89-design/portfolio (public, `master` branch)
- **Live site:** https://portfolio-teal-seven-7vraz065mz.vercel.app
  - Auto-deployed via Vercel's GitHub integration — every push to `master` redeploys automatically.
  - Vercel project lives under the `subhrajitpathak89-4064's projects` team (Hobby plan).
- Both GitHub and Vercel are logged in under the **`subhrajitpathak89-design`** account/identity — use that account (or get it re-added as a collaborator) to push or manage the Vercel project from elsewhere.

## Stack & structure
- Next.js 16, TypeScript, Tailwind CSS v4 (CSS-first `@theme` config in `src/app/globals.css`, no `tailwind.config.ts`)
- `next-themes` for dark/light toggle, `clsx` for classnames, `lucide-react` for icons (`Github`/`Linkedin`/`Dribbble` marks were removed upstream in lucide v1, so `src/components/ui/SocialIcons.tsx` inlines those three by hand)
- Single-page scroll home (`/`: Hero → About → Work → Skills → Contact) + `/projects/[slug]` case study pages
- All editable content is in typed files under `src/content/`:
  - `profile.ts` — name, tagline, bio, location, email, socials, `siteUrl`
  - `projects.ts` — the 6 placeholder case studies
  - `skills.ts`, `nav.ts`
- Placeholder project images are generated inline SVG gradients (`src/components/ui/PlaceholderImage.tsx`) — no external image service, nothing to break.
- No CMS, no contact-form backend, no analytics, no tests/CI — all intentionally deferred (see README's "not included in v1" section).

## Known TODOs / things not yet done
1. **`siteUrl` in `src/content/profile.ts` is still `https://example.com`.** Update it to the real Vercel URL (or a custom domain once added) — it feeds `metadataBase`, `sitemap.ts`, and `robots.ts`.
2. **All content is placeholder** — name "Alex Rivera", fake email `hello@example.com`, `#` social links, 6 made-up case studies. Swap these in `src/content/*.ts` before treating this as a real public portfolio.
3. **No custom domain configured** — currently on Vercel's auto-generated subdomain. Add one under the Vercel project's Settings → Domains whenever ready.
4. Real project images: drop files into `public/images/projects/` and set `coverImage` on the relevant entry in `src/content/projects.ts`; `ProjectCard` and the detail page fall back to the gradient placeholder whenever `coverImage` is unset.

## Local dev
```bash
git clone https://github.com/subhrajitpathak89-design/portfolio.git
cd portfolio
npm install
npm run dev
```
`npm run build` / `npm run lint` / `npx tsc --noEmit` all pass clean as of the last commit.
