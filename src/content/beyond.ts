export type BeyondItem = {
  title: string;
  description: string;
  span: string;
};

// Placeholder tiles — swap the copy and drop real images into each tile
// once you share them, in src/components/sections/Bento.tsx
export const beyondItems: BeyondItem[] = [
  {
    title: "Photography",
    description: "Street and travel photography, shot mostly on a 35mm prime.",
    span: "sm:col-span-2 sm:row-span-2",
  },
  {
    title: "Sketching",
    description: "Quick ink sketches between design reviews.",
    span: "sm:col-span-1 sm:row-span-1",
  },
  {
    title: "Music",
    description: "Bedroom production and messing around with synths.",
    span: "sm:col-span-1 sm:row-span-1",
  },
  {
    title: "Reading",
    description: "Currently working through a stack of design and sci-fi.",
    span: "sm:col-span-1 sm:row-span-1",
  },
  {
    title: "Travel",
    description: "Collecting small, unplanned trips whenever I can.",
    span: "sm:col-span-1 sm:row-span-1",
  },
];
