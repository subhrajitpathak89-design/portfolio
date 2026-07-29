import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { socialIcons } from "@/components/ui/SocialIcons";
import { navLinks } from "@/content/nav";
import { profile } from "@/content/profile";

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <Container className="flex flex-col gap-10 py-14">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <p className="font-display text-lg font-semibold tracking-tight text-foreground">
              {profile.name}
              <span className="text-accent">.</span>
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{profile.role}</p>
            <p className="mt-1 text-sm text-muted-foreground">{profile.location}</p>
          </div>

          <nav className="flex flex-col gap-3" aria-label="Footer">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-muted-foreground transition-colors duration-200 hover:text-accent"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex flex-col gap-3">
            <a
              href={`mailto:${profile.email}`}
              className="text-sm text-muted-foreground transition-colors duration-200 hover:text-accent"
            >
              {profile.email}
            </a>
            <div className="flex gap-2">
              {profile.socials.map((social) => {
                const Icon = socialIcons[social.platform];
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors duration-200 hover:border-accent/40 hover:text-accent"
                  >
                    <Icon className="h-4 w-4" aria-hidden />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {new Date().getFullYear()} {profile.name}. Placeholder portfolio content.
          </p>
          <p>Built with Next.js and Tailwind CSS.</p>
        </div>
      </Container>
    </footer>
  );
}
