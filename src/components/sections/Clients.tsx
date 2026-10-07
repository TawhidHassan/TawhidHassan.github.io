"use client";

import { useSiteData } from "@/components/providers/SiteDataProvider";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BackgroundPaths } from "@/components/ui/background-paths";
import { CustomersSection } from "@/components/ui/customers-section";

export function Clients() {
  const { clients, headings } = useSiteData();
  return (
    <section id="clients" className="relative py-10 sm:py-28 lg:py-36">
      <BackgroundPaths />

      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          {...headings.clients}
        />

        <CustomersSection
          customers={clients.map((c) => ({ alt: c.name, src: c.logoUrl }))}
          className="mt-6 sm:mt-16" />
      </div>
    </section>
  );
}
