import { SectionHeading } from "@/components/ui/SectionHeading";
import { BackgroundPaths } from "@/components/ui/background-paths";
import {
  CustomersSection,
  type CustomerLogo,
} from "@/components/ui/customers-section";

/** Brands & organizations I've delivered work for. */
const clients: CustomerLogo[] = [
  { alt: "Sheba xyz" },
  { alt: "Unilever Bangladesh" },
  { alt: "Samsung Bangladesh" },
  { alt: "Regal Furniture" },
  { alt: "ActionAid" },
  { alt: "Biddabari" },
  { alt: "Twentyfive Pvt. Ltd." },
  { alt: "Smile Food" },
  { alt: "GCB" },
  { alt: "Invariant Telecom Bangladesh Ltd." },
  { alt: "Market Access Analytics & Consulting (MAAC)" },
  { alt: "UpscaleBD" },
];

export function Clients() {
  return (
    <section id="clients" className="relative py-12 sm:py-28 lg:py-36">
      <BackgroundPaths />

      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Trusted By"
          title="Brands I've worked for."
          description="From multinationals to fast-moving local teams — products and platforms shipped for organizations across industries."
        />

        <CustomersSection customers={clients} className="mt-12 sm:mt-16" />
      </div>
    </section>
  );
}
