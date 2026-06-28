import React from "react";
import { MockupType } from "@/lib/product-pathways";

/**
 * PathwayPlaceholder — a lightweight, accent-tinted skeleton shown in place of a
 * real mockup. No HTML/iframe animations are loaded; each `mockupType` maps to a
 * polished abstract layout so the data structure stays ready for real mockups
 * to be restored later.
 */

interface PathwayPlaceholderProps {
  type: MockupType;
  accent: string;
  className?: string;
}

type Variant = "panel" | "phone" | "browser" | "spark" | "media";

const TYPE_TO_VARIANT: Record<MockupType, Variant> = {
  dashboard: "panel",
  admin: "panel",
  documentation: "panel",
  designSystem: "panel",
  mobile: "phone",
  commerce: "phone",
  booking: "phone",
  marketplace: "phone",
  fintech: "phone",
  website: "browser",
  ai: "spark",
  branding: "media",
  video: "media",
};

const TYPE_TO_LABEL: Record<MockupType, string> = {
  dashboard: "Dashboard mockup placeholder",
  admin: "Admin mockup placeholder",
  documentation: "Documentation mockup placeholder",
  designSystem: "Design system placeholder",
  mobile: "Mobile flow placeholder",
  commerce: "Commerce flow placeholder",
  booking: "Booking flow placeholder",
  marketplace: "Marketplace flow placeholder",
  fintech: "FinTech flow placeholder",
  website: "Website mockup placeholder",
  ai: "AI experience placeholder",
  branding: "Branding preview placeholder",
  video: "Video case study placeholder",
};

const TYPE_TO_VIDEO_LABEL: Partial<Record<MockupType, string>> = {
  video: "Video case study placeholder",
};

function Bar({ w, o = 1, accent }: { w: string; o?: number; accent?: string }) {
  return (
    <span
      className="block h-2 rounded-full"
      style={{
        width: w,
        background: accent ?? "currentColor",
        opacity: accent ? 0.55 : o * 0.25,
      }}
    />
  );
}

function PanelVisual({ accent }: { accent: string }) {
  return (
    <div className="absolute inset-0 flex gap-3 p-5">
      {/* sidebar */}
      <div className="hidden sm:flex w-1/5 flex-col gap-2 rounded-xl bg-[var(--color-fg)]/[0.04] p-3">
        <span className="h-6 w-6 rounded-md" style={{ background: accent, opacity: 0.6 }} />
        <Bar w="80%" />
        <Bar w="60%" />
        <Bar w="70%" />
        <Bar w="50%" />
      </div>
      {/* main */}
      <div className="flex flex-1 flex-col gap-3">
        <div className="grid grid-cols-3 gap-3">
          {[0, 1, 2].map((i) => (
            <div key={i} className="rounded-xl bg-[var(--color-fg)]/[0.04] p-3 flex flex-col gap-2">
              <Bar w="60%" accent={accent} />
              <Bar w="90%" o={0.6} />
            </div>
          ))}
        </div>
        <div className="flex-1 rounded-xl bg-[var(--color-fg)]/[0.04] p-4 flex items-end gap-2">
          {[40, 65, 50, 80, 35, 70, 55].map((h, i) => (
            <span
              key={i}
              className="flex-1 rounded-t-md"
              style={{ height: `${h}%`, background: accent, opacity: 0.3 + (i % 3) * 0.18 }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function PhoneVisual({ accent }: { accent: string }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center p-5">
      <div className="h-full max-h-[260px] aspect-[9/18] rounded-[1.75rem] border border-[var(--color-line)] bg-[var(--color-fg)]/[0.03] p-3 flex flex-col gap-2.5">
        <div className="flex items-center justify-between">
          <Bar w="40%" />
          <span className="h-4 w-4 rounded-full" style={{ background: accent, opacity: 0.6 }} />
        </div>
        <div className="rounded-xl h-16 w-full" style={{ background: accent, opacity: 0.18 }} />
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="flex items-center gap-2 rounded-lg bg-[var(--color-fg)]/[0.04] p-2"
          >
            <span className="h-7 w-7 rounded-md" style={{ background: accent, opacity: 0.4 }} />
            <span className="flex flex-1 flex-col gap-1.5">
              <Bar w="70%" />
              <Bar w="45%" o={0.6} />
            </span>
          </div>
        ))}
        <div className="mt-auto rounded-full h-8 w-full" style={{ background: accent, opacity: 0.55 }} />
      </div>
    </div>
  );
}

function BrowserVisual({ accent }: { accent: string }) {
  return (
    <div className="absolute inset-0 flex flex-col p-5">
      <div className="flex items-center gap-1.5 rounded-t-xl bg-[var(--color-fg)]/[0.05] px-3 py-2">
        <span className="h-2.5 w-2.5 rounded-full bg-[var(--color-fg)]/20" />
        <span className="h-2.5 w-2.5 rounded-full bg-[var(--color-fg)]/20" />
        <span className="h-2.5 w-2.5 rounded-full bg-[var(--color-fg)]/20" />
        <span className="ml-3 h-3 flex-1 rounded-full bg-[var(--color-fg)]/[0.06]" />
      </div>
      <div className="flex flex-1 flex-col gap-3 rounded-b-xl bg-[var(--color-fg)]/[0.03] p-4">
        <Bar w="55%" accent={accent} />
        <Bar w="80%" o={0.6} />
        <div className="mt-1 grid grid-cols-3 gap-3 flex-1">
          {[0, 1, 2].map((i) => (
            <div key={i} className="rounded-lg bg-[var(--color-fg)]/[0.05] flex flex-col gap-2 p-2">
              <span className="h-1/2 rounded-md" style={{ background: accent, opacity: 0.15 }} />
              <Bar w="80%" />
              <Bar w="55%" o={0.6} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SparkVisual({ accent }: { accent: string }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="relative h-40 w-40">
        <span
          className="absolute inset-0 rounded-full border"
          style={{ borderColor: accent, opacity: 0.25 }}
        />
        <span
          className="absolute inset-6 rounded-full border"
          style={{ borderColor: accent, opacity: 0.4 }}
        />
        <span
          className="absolute left-1/2 top-1/2 h-14 w-14 -translate-x-1/2 -translate-y-1/2 rounded-2xl"
          style={{ background: accent, opacity: 0.85 }}
        />
        {[
          { top: "4%", left: "50%" },
          { top: "50%", left: "94%" },
          { top: "94%", left: "50%" },
          { top: "50%", left: "6%" },
        ].map((pos, i) => (
          <span
            key={i}
            className="absolute h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{ ...pos, background: accent, opacity: 0.55 }}
          />
        ))}
      </div>
    </div>
  );
}

function MediaVisual({ accent, video }: { accent: string; video: boolean }) {
  if (video) {
    return (
      <div className="absolute inset-0 flex items-center justify-center p-5">
        <div className="relative h-full w-full rounded-xl bg-[var(--color-fg)]/[0.05] flex items-center justify-center overflow-hidden">
          <span className="absolute bottom-3 left-3 right-3 h-2 rounded-full bg-[var(--color-fg)]/10">
            <span className="block h-full w-1/3 rounded-full" style={{ background: accent }} />
          </span>
          <span
            className="flex h-16 w-16 items-center justify-center rounded-full"
            style={{ background: accent, opacity: 0.9 }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="white" aria-hidden>
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
        </div>
      </div>
    );
  }
  // branding — colour swatches + type specimen
  return (
    <div className="absolute inset-0 flex flex-col gap-3 p-5">
      <div className="flex gap-2">
        {[0.9, 0.6, 0.35, 0.18].map((o, i) => (
          <span
            key={i}
            className="h-12 flex-1 rounded-xl"
            style={{ background: accent, opacity: o }}
          />
        ))}
      </div>
      <div className="flex-1 rounded-xl bg-[var(--color-fg)]/[0.04] p-4 flex flex-col justify-center gap-2.5">
        <span className="text-4xl font-semibold tracking-tight" style={{ color: accent }}>
          Aa
        </span>
        <Bar w="70%" />
        <Bar w="50%" o={0.6} />
      </div>
    </div>
  );
}

export function PathwayPlaceholder({ type, accent, className = "" }: PathwayPlaceholderProps) {
  const variant = TYPE_TO_VARIANT[type];
  const label = TYPE_TO_VIDEO_LABEL[type] ?? TYPE_TO_LABEL[type];

  return (
    <div
      className={`relative h-full w-full overflow-hidden bg-[var(--color-surface)] ${className}`}
      role="img"
      aria-label={label}
    >
      {variant === "panel" && <PanelVisual accent={accent} />}
      {variant === "phone" && <PhoneVisual accent={accent} />}
      {variant === "browser" && <BrowserVisual accent={accent} />}
      {variant === "spark" && <SparkVisual accent={accent} />}
      {variant === "media" && <MediaVisual accent={accent} video={type === "video"} />}

      <span className="absolute bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-[var(--color-bg)]/70 px-3 py-1 text-[11px] font-medium tracking-wide text-[var(--color-fg)]/55 backdrop-blur-sm">
        {label}
      </span>
    </div>
  );
}
