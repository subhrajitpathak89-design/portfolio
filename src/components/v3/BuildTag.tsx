/** Flags how a project was built (e.g. "Vibe coded") so a reviewer sees it at a glance. */
export function BuildTag({ label, className = "" }: { label: string; className?: string }) {
  return (
    <span className={`inline-block rounded-full bg-black/70 px-2 py-0.5 text-[11px] text-white ${className}`}>
      {label}
    </span>
  );
}
