import type { ResourceCard } from "@/content/resources";

/**
 * Coded thumbnails for the resource cards: a small mock of each product,
 * cropped off the card's bottom-right edge like a screenshot peeking in.
 * Drawn in markup rather than images so they stay sharp and theme-aware.
 */
function Window({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`absolute left-[12%] top-[16%] h-[300px] w-[340px] overflow-hidden rounded-xl border border-white/10 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.6)] ${className}`}
    >
      {children}
    </div>
  );
}

const Bar = ({ w, className = "bg-white/20" }: { w: string; className?: string }) => (
  <div className={`h-1.5 rounded-full ${className}`} style={{ width: w }} />
);

export function ResourceThumb({ kind }: { kind: ResourceCard["thumb"] }) {
  switch (kind) {
    case "reactbits":
      return (
        <Window className="bg-[#060010]">
          <div className="absolute -left-10 -top-10 size-40 rounded-full bg-[#5227ff] opacity-60 blur-3xl" />
          <div className="absolute bottom-0 right-10 size-32 rounded-full bg-[#ff6bd6] opacity-40 blur-3xl" />
          <div className="relative p-5">
            <div className="flex gap-1.5">
              <span className="rounded-full bg-white/10 px-2 py-0.5 text-[8px] text-white/70">Text Animations</span>
              <span className="rounded-full bg-[#5227ff] px-2 py-0.5 text-[8px] text-white">Backgrounds</span>
            </div>
            <p className="mt-6 text-[26px] font-semibold leading-none tracking-tight text-white">
              {"Split Text".split("").map((c, i) => (
                <span key={i} className="inline-block" style={{ transform: `translateY(${(i % 3) * -3}px)`, opacity: 1 - (i % 4) * 0.15 }}>
                  {c === " " ? " " : c}
                </span>
              ))}
            </p>
            <p className="mt-2 text-[9px] text-white/50">Animated React components, ready to paste.</p>
            <div className="mt-5 grid grid-cols-3 gap-2">
              {["from-[#5227ff] to-[#ff6bd6]", "from-[#0ff] to-[#5227ff]", "from-[#ff6bd6] to-[#ffb86b]"].map((g) => (
                <div key={g} className={`aspect-square rounded-lg bg-gradient-to-br ${g} opacity-80`} />
              ))}
            </div>
          </div>
        </Window>
      );
    case "refero":
      return (
        <Window className="bg-[#111]">
          <div className="flex items-center gap-2 border-b border-white/10 px-4 py-2.5">
            <span className="size-2 rounded-full bg-white" />
            <div className="h-4 flex-1 rounded-md bg-white/10 px-2 text-[8px] leading-4 text-white/40">Search “onboarding”</div>
          </div>
          <div className="grid grid-cols-3 gap-2 p-3">
            {["bg-[#f5f1ea]", "bg-[#1f3b2d]", "bg-[#e8ecff]", "bg-[#2a2a2a]", "bg-[#ffe7d6]", "bg-[#dfe8e1]"].map((c, i) => (
              <div key={i} className={`aspect-[3/4] rounded-md ${c} p-1.5`}>
                <Bar w="60%" className={i % 2 ? "bg-white/40" : "bg-black/20"} />
                <div className={`mt-1.5 h-6 rounded ${i % 2 ? "bg-white/15" : "bg-black/10"}`} />
              </div>
            ))}
          </div>
        </Window>
      );
    case "mobbin":
      return (
        <div className="absolute inset-x-0 bottom-0 top-[16%] flex items-start justify-center gap-3 overflow-hidden">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="h-[260px] w-[110px] shrink-0 rounded-[20px] border-[3px] border-[#2a2a2a] bg-white p-2 shadow-[0_20px_40px_-12px_rgba(0,0,0,0.6)]"
              style={{ marginTop: Math.abs(i - 1) * 24 }}
            >
              <div className="mx-auto h-1.5 w-8 rounded-full bg-black/80" />
              <Bar w="50%" className="mt-3 bg-black/70" />
              <Bar w="80%" className="mt-1.5 bg-black/15" />
              <div className={`mt-3 h-14 rounded-lg ${["bg-[#ffd8c2]", "bg-[#c9e4ff]", "bg-[#d8f5d0]"][i]}`} />
              <div className="mt-2 h-5 rounded-full bg-black" />
            </div>
          ))}
        </div>
      );
    case "lawsofux":
      return (
        <Window className="bg-[#f2efe8] p-4">
          <div className="grid grid-cols-2 gap-2.5">
            {[
              ["Fitts’s Law", "bg-[#ffcf4a]"],
              ["Hick’s Law", "bg-[#ff7a59]"],
              ["Jakob’s Law", "bg-[#6c8bff]"],
              ["Miller’s Law", "bg-[#3ac08a]"],
            ].map(([t, c]) => (
              <div key={t} className="rounded-lg bg-white p-2.5 shadow-sm">
                <div className={`mb-6 size-6 rounded-full ${c}`} />
                <p className="text-[10px] font-semibold text-[#1a1a1a]">{t}</p>
              </div>
            ))}
          </div>
        </Window>
      );
    case "shadcn":
      return (
        <Window className="bg-white p-4 text-[#0a0a0a]">
          <p className="text-[11px] font-semibold">Create an account</p>
          <p className="mt-0.5 text-[8px] text-black/50">Enter your email below to create your account</p>
          <div className="mt-3 grid grid-cols-2 gap-2">
            <div className="rounded-md border border-black/15 py-1.5 text-center text-[8px]">GitHub</div>
            <div className="rounded-md border border-black/15 py-1.5 text-center text-[8px]">Google</div>
          </div>
          <div className="mt-3 h-6 rounded-md border border-black/15 px-2 text-[8px] leading-6 text-black/40">m@example.com</div>
          <div className="mt-2 h-6 rounded-md bg-[#0a0a0a] text-center text-[8px] leading-6 text-white">Create account</div>
          <div className="mt-3 flex items-center gap-2">
            <div className="flex h-3.5 w-6 items-center rounded-full bg-[#0a0a0a] p-0.5"><div className="ml-auto size-2.5 rounded-full bg-white" /></div>
            <span className="text-[8px]">Airplane mode</span>
          </div>
        </Window>
      );
    case "magicui":
      return (
        <Window className="bg-black">
          <div
            className="absolute inset-0 opacity-40"
            style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.35) 1px, transparent 1px)", backgroundSize: "12px 12px" }}
          />
          <div className="relative flex flex-col items-start p-5">
            <span className="rounded-full border border-white/20 bg-white/5 px-2.5 py-1 text-[8px] text-white/80">✨ Introducing Magic UI</span>
            <p className="mt-4 bg-gradient-to-br from-white to-white/40 bg-clip-text text-[22px] font-semibold leading-tight tracking-tight text-transparent">
              Beautiful UI<br />in minutes
            </p>
            <div className="relative mt-4 overflow-hidden rounded-lg p-[1px]">
              <div className="absolute inset-0 bg-[conic-gradient(from_90deg,#ff6bd6,#5227ff,#00e5ff,#ff6bd6)]" />
              <div className="relative rounded-[7px] bg-black px-3 py-1.5 text-[9px] text-white">Get started →</div>
            </div>
          </div>
        </Window>
      );
    case "v0":
      return (
        <Window className="bg-[#0a0a0a] p-4">
          <div className="rounded-lg border border-white/10 bg-white/5 p-2.5">
            <p className="text-[9px] text-white/80">Build a pricing page with three tiers and a toggle</p>
            <div className="mt-2 flex justify-end"><div className="size-4 rounded-md bg-white" /></div>
          </div>
          <div className="mt-3 grid grid-cols-3 gap-1.5">
            {[0, 1, 2].map((i) => (
              <div key={i} className={`rounded-md p-2 ${i === 1 ? "bg-white" : "border border-white/10"}`}>
                <Bar w="50%" className={i === 1 ? "bg-black/60" : "bg-white/40"} />
                <p className={`mt-2 text-[11px] font-semibold ${i === 1 ? "text-black" : "text-white"}`}>${[0, 20, 50][i]}</p>
                <Bar w="80%" className={`mt-2 ${i === 1 ? "bg-black/15" : "bg-white/15"}`} />
                <Bar w="70%" className={`mt-1 ${i === 1 ? "bg-black/15" : "bg-white/15"}`} />
              </div>
            ))}
          </div>
        </Window>
      );
    case "godly":
      return (
        <Window className="bg-[#0b0b0b]">
          <div className="grid grid-cols-2 gap-2 p-3">
            {[
              "bg-gradient-to-br from-[#ff4d00] to-[#ffb800]",
              "bg-[#e9e4d8]",
              "bg-gradient-to-tr from-[#00172e] to-[#2f6bff]",
              "bg-gradient-to-br from-[#c2ffcf] to-[#2b8a3e]",
            ].map((c, i) => (
              <div key={i} className={`flex aspect-video items-end rounded-md p-2 ${c}`}>
                <span className={`text-[10px] font-bold uppercase tracking-tight ${i === 1 ? "text-black" : "text-white"}`}>
                  {["Studio", "Atelier", "Orbit", "Flora"][i]}
                </span>
              </div>
            ))}
          </div>
        </Window>
      );
  }
}
