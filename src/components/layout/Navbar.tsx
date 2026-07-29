import Link from "next/link";
import { navLinks } from "@/content/nav";

export function Navbar() {
  return (
    <header className="pointer-events-none fixed inset-x-0 top-6 z-50 flex justify-center px-4">
      <div className="pointer-events-auto flex items-center gap-6 rounded-full border border-white/10 bg-black/70 px-6 py-3 shadow-[0_8px_30px_rgba(0,0,0,0.45)] backdrop-blur-xl sm:gap-8 sm:px-8">
        <nav className="flex items-center gap-5 sm:gap-7" aria-label="Main">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-white/80 transition-colors duration-200 hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
