import Image from "next/image";
import { profile } from "@/content/profile";

export function Hero() {
  const firstName = profile.name.split(" ")[0];

  return (
    <section id="home" className="relative isolate min-h-[90vh] overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/hero-bg-v2.png"
          alt=""
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background to-transparent" />
      </div>

      <div className="mx-auto max-w-6xl px-6 pb-16 pt-40 sm:pt-48 lg:px-8">
        <p className="flex items-center gap-2 text-lg font-medium text-white sm:text-xl">
          <span aria-hidden>👋</span> Hey, I&apos;m <span className="font-bold">{firstName}</span>
        </p>

        <h1 className="mt-4 font-display text-7xl font-bold leading-[0.9] tracking-tight text-white sm:text-8xl md:text-9xl">
          product
          <br />
          <span className="font-script text-7xl font-normal text-white sm:text-8xl md:text-9xl">
            designer
          </span>
        </h1>

        <p className="mt-8 max-w-md text-lg font-medium text-white sm:text-xl">
          {profile.role} — {profile.availability}
        </p>
      </div>
    </section>
  );
}
