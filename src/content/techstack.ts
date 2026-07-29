import { SiClaudecode, SiFigma, SiFramer, SiGithub } from "react-icons/si";
import { RiOpenaiFill } from "react-icons/ri";
import type { IconType } from "react-icons";

export type TechStackItem = {
  name: string;
  icon: IconType;
  color: string;
};

export const techStack: TechStackItem[] = [
  { name: "Claude Code", icon: SiClaudecode, color: "#D97757" },
  { name: "Framer", icon: SiFramer, color: "#0055FF" },
  { name: "Figma", icon: SiFigma, color: "#F24E1E" },
  { name: "ChatGPT", icon: RiOpenaiFill, color: "#00A67E" },
  { name: "GitHub", icon: SiGithub, color: "#ffffff" },
];
