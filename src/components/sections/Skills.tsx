"use client";

import { skillGroups, skillMarquee, type SkillGroup } from "@/lib/data";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BackgroundPaths } from "@/components/ui/background-paths";
import RadialOrbitalTimeline from "@/components/ui/radial-orbital-timeline";

const avg = (g: SkillGroup) =>
  Math.round(g.skills.reduce((a, s) => a + s.level, 0) / g.skills.length);

/** Map skill categories onto the orbital timeline's node shape. */
const skillsTimeline = skillGroups.map((g, i) => {
  const energy = avg(g);
  const id = i + 1;
  const relatedIds = [id - 1, id + 1].filter(
    (n) => n >= 1 && n <= skillGroups.length
  );
  return {
    id,
    title: g.category,
    date: `${g.skills.length} skills`,
    content: g.skills.map((s) => s.name).join(" · "),
    category: g.category,
    icon: g.skills[0].icon,
    relatedIds,
    status:
      energy >= 90 ? "completed" : energy >= 82 ? "in-progress" : "pending",
    energy,
  } as const;
});

export function Skills() {
  return (
    <section id="skills" className="relative overflow-hidden py-10 sm:py-28 lg:py-36">
      <BackgroundPaths />

      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Capabilities"
          title="A toolkit honed in production."
          description="From pixel-perfect Flutter UI to resilient backends and AI integrations — the full stack of shipping mobile products. Tap a node to explore each domain."
        />
      </div>

      {/* Interactive radial orbital map of capabilities */}
      <div className="relative mt-6 overflow-hidden border-y border-card-border sm:mt-12">
        <RadialOrbitalTimeline timelineData={skillsTimeline} />
      </div>

      {/* Marquee ticker */}
      <div className="relative mt-6 flex flex-col gap-3 sm:mt-20 sm:gap-4">
        <div className="mask-fade-edges flex overflow-hidden">
          <div className="flex shrink-0 animate-marquee gap-4 pr-4">
            {[...skillMarquee, ...skillMarquee].map((s, i) => (
              <span
                key={`a-${s}-${i}`}
                className="whitespace-nowrap rounded-full glass px-4 py-2 text-xs font-medium text-muted sm:px-5 sm:py-2.5 sm:text-sm"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
        <div className="mask-fade-edges flex overflow-hidden">
          <div className="flex shrink-0 animate-marquee-reverse gap-4 pr-4">
            {[...skillMarquee.slice().reverse(), ...skillMarquee.slice().reverse()].map(
              (s, i) => (
                <span
                  key={`b-${s}-${i}`}
                  className="whitespace-nowrap rounded-full glass px-4 py-2 text-xs font-medium text-muted sm:px-5 sm:py-2.5 sm:text-sm"
                >
                  {s}
                </span>
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
