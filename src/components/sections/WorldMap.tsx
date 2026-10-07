"use client";

import { useEffect, useRef, useState } from "react";
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
import { useSiteData } from "@/components/providers/SiteDataProvider";

export function WorldMap() {
  const { locations, headings } = useSiteData();
  // Defer the WebGL map (context + tile fetch) until it's about to be seen.
  const mapBoxRef = useRef<HTMLDivElement>(null);
  const [showMap, setShowMap] = useState(false);

  useEffect(() => {
    const el = mapBoxRef.current;
    if (!el || showMap) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setShowMap(true);
          io.disconnect();
        }
      },
      { rootMargin: "300px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [showMap]);

  return (
    <section id="global" className="relative overflow-hidden py-10 sm:py-28 lg:py-36">
      <BackgroundPaths />

      <div className="relative mx-auto max-w-6xl px-6">
        <SectionHeading
          {...headings.global}
        />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.6 }}
          className="relative mt-6 sm:mt-16"
        >
          <div
            ref={mapBoxRef}
            className="h-[230px] w-full overflow-hidden rounded-2xl border border-card-border shadow-xl shadow-black/5 sm:h-[440px] lg:h-[520px]"
          >
            {showMap && (
              <Map viewport={{ center: [10, 30], zoom: 1.1 }}>
                {locations.map((loc) => (
                  <MapMarker key={loc.name} longitude={loc.lng} latitude={loc.lat}>
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
            )}
          </div>

          {/* Mobile-friendly fallback / quick scan of regions */}
          <div className="mt-4 flex flex-wrap justify-center gap-2 sm:mt-6 sm:gap-2.5">
            {locations.map((loc) => (
              <span
                key={loc.name}
                className="inline-flex items-center gap-1.5 rounded-full glass px-3 py-1.5 text-xs font-medium text-muted sm:gap-2 sm:px-4 sm:py-2 sm:text-sm"
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
