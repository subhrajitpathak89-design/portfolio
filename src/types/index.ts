export type Project = {
  slug: string;
  title: string;
  category: string;
  summary: string;
  description: string[];
  role: string;
  year: string;
  tags: string[];
  coverImage?: string;
  liveUrl?: string;
  featured: boolean;
};

export type Experience = {
  role: string;
  company: string;
  location: string;
  period: string;
  summary: string;
};

export type SkillCategory = {
  name: string;
  skills: string[];
};

export type SocialPlatform = "github" | "linkedin" | "dribbble" | "email";

export type SocialLink = {
  label: string;
  handle: string;
  href: string;
  platform: SocialPlatform;
};

export type NavLink = {
  label: string;
  href: string;
};

export type Profile = {
  name: string;
  role: string;
  tagline: string;
  bio: string[];
  location: string;
  email: string;
  availability: string;
  socials: SocialLink[];
};
