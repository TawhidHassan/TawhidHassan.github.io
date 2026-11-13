"use client";

import { useSiteData } from "@/components/providers/SiteDataProvider";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BackgroundPaths } from "@/components/ui/background-paths";
import { CustomersSection } from "@/components/ui/customers-section";

export function Clients() {
  const { clients, headings } = useSiteData();
  return (
    <section id="clients" className="relative py-12 sm:py-20 lg:py-24">
      <BackgroundPaths />

      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          index="03"
          {...headings.clients}
        />

        <CustomersSection
          customers={clients.map((c) => ({ alt: c.name, src: c.logoUrl }))}
          className="mt-6 sm:mt-16" />
      </div>
    </section>
  );
}
