"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { navLinks } from "@/content/nav";
import { profile } from "@/content/profile";

export function Navbar() {
  const [activeHash, setActiveHash] = useState("#home");

  useEffect(() => {
    const sectionIds = navLinks
      .map((link) => link.href.replace("/", ""))
      .filter((hash) => hash.startsWith("#"))
      .map((hash) => hash.slice(1));

    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveHash(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-6 z-50 flex justify-center px-4">
      <div className="pointer-events-auto flex items-center gap-6 rounded-full border border-white/10 bg-black/70 px-4 py-3 shadow-[0_8px_30px_rgba(0,0,0,0.45)] backdrop-blur-xl sm:gap-8 sm:px-6">
        <Link
          href="/#home"
          aria-label={`${profile.name} — home`}
          className="relative flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full"
        >
          <Image src="/images/logo.png" alt="" fill priority className="object-cover" />
        </Link>

        <nav className="flex items-center gap-5 sm:gap-7" aria-label="Main">
          {navLinks.map((link) => {
            const isActive = link.href.replace("/", "") === activeHash;

            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive ? "true" : undefined}
                className={`text-sm font-medium transition-colors duration-200 ${
                  isActive ? "text-white" : "text-white/60 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
