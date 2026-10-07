import { SiteDataProvider } from "@/components/providers/SiteDataProvider";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { Cursor } from "@/components/ui/Cursor";
import { QuantumField } from "@/components/three/QuantumField";
import { Grain } from "@/components/ui/Grain";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { Preloader } from "@/components/layout/Preloader";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { defaultSiteData, fetchSiteData } from "@/lib/site-data";
import { supabase } from "@/lib/supabase";

export default async function SiteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // Snapshot the content at build time so the exported HTML is complete; the
  // provider refreshes it in the browser.
  const initial = await fetchSiteData(supabase).catch(() => defaultSiteData);

  return (
    <SiteDataProvider initial={initial}>
      <Preloader />
      <QuantumField />
      <SmoothScroll />
      <ScrollProgress />
      <Cursor />
      <Grain />
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </SiteDataProvider>
  );
}
