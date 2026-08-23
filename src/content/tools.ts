import type { ToolsContent } from "@/types";

export const toolsContent: ToolsContent = {
  eyebrow: "(preferred tools)",
  heading: "tool stack",

  // Placeholder joke in my words — rewrite it.
  caption: ["it's not magic,", "it's just a lot of", "(undo)."],

  // Order matters: the tiles are laid out evenly around the circle in this
  // sequence, so the brand colours are interleaved rather than clumped.
  //
  // Adobe tiles use their real scheme — deep background, bright lettermark —
  // which is how Adobe's own app icons are built.
  tools: [
    { name: "Figma", kind: "icon", icon: "figma", bg: "#F24E1E", fg: "#FFFFFF" },
    { name: "Adobe Photoshop", kind: "mono", mono: "Ps", bg: "#001E36", fg: "#31A8FF" },
    { name: "Claude", kind: "icon", icon: "claude", bg: "#D97757", fg: "#FFFFFF" },
    { name: "Adobe Illustrator", kind: "mono", mono: "Ai", bg: "#330000", fg: "#FF9A00" },
    { name: "GitHub", kind: "icon", icon: "github", bg: "#181717", fg: "#FFFFFF" },
    { name: "Adobe After Effects", kind: "mono", mono: "Ae", bg: "#00005B", fg: "#9999FF" },
    { name: "ChatGPT", kind: "mono", mono: "GPT", bg: "#0F9D77", fg: "#FFFFFF" },
    { name: "Adobe InDesign", kind: "mono", mono: "Id", bg: "#49021F", fg: "#FF3366" },
    { name: "Framer", kind: "icon", icon: "framer", bg: "#0055FF", fg: "#FFFFFF" },
    { name: "Notion", kind: "icon", icon: "notion", bg: "#111111", fg: "#FFFFFF" },
  ],
};
