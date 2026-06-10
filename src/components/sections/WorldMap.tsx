"use client";

import { motion } from "motion/react";
import {
  Map,
  MapMarker,
  MarkerContent,
  MarkerTooltip,
  MarkerLabel,
} from "@/components/ui/mapcn-marker-tooltip";
import { BackgroundPaths } from "@/components/ui/background-paths";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { viewportOnce } from "@/lib/motion";

/** Countries I've shipped work for. */
const locations = [
  { id: 1, name: "Morocco", flag: "🇲🇦", lng: -6.8498, lat: 33.9716 },
  { id: 2, name: "United Kingdom", flag: "🇬🇧", lng: -0.1276, lat: 51.5074 },
  { id: 3, name: "India", flag: "🇮🇳", lng: 77.209, lat: 28.6139 },
  { id: 4, name: "Bangladesh", flag: "🇧🇩", lng: 90.4125, lat: 23.8103 },
  { id: 5, name: "United States", flag: "🇺🇸", lng: -77.0369, lat: 38.9072 },
] as const;

export function WorldMap() {
  return (
    <section id="global" className="relative overflow-hidden py-16 sm:py-28 lg:py-36">
      <div className="pointer-events-none absolute inset-0 text-accent opacity-[0.12]">
        <BackgroundPaths className="absolute inset-0" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Global Reach"
          title="Working across borders."
          description="Remote-first collaboration with teams and clients on five markets across three continents. Hover a pin to see where."
        />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.6 }}
          className="relative mt-10 sm:mt-16"
        >
          <div className="h-[340px] w-full overflow-hidden rounded-2xl border border-card-border shadow-xl shadow-black/5 sm:h-[440px] lg:h-[520px]">
            <Map viewport={{ center: [10, 30], zoom: 1.1 }}>
              {locations.map((loc) => (
                <MapMarker key={loc.id} longitude={loc.lng} latitude={loc.lat}>
                  <MarkerContent>
                    <span className="relative flex h-4 w-4">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent/60" />
                      <span className="relative inline-flex h-4 w-4 rounded-full border-2 border-white bg-accent shadow-lg shadow-accent/40 transition-transform hover:scale-125" />
                    </span>
                  </MarkerContent>
                  <MarkerLabel className="text-foreground">
                    {loc.flag} {loc.name}
                  </MarkerLabel>
                  <MarkerTooltip>{loc.name}</MarkerTooltip>
                </MapMarker>
              ))}
            </Map>
          </div>

          {/* Mobile-friendly fallback / quick scan of regions */}
          <div className="mt-6 flex flex-wrap justify-center gap-2.5">
            {locations.map((loc) => (
              <span
                key={loc.id}
                className="inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-sm font-medium text-muted"
              >
                <span className="text-base leading-none">{loc.flag}</span>
                {loc.name}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
