"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { defaultSiteData, fetchSiteData, type SiteData } from "@/lib/site-data";

const SiteDataContext = createContext<SiteData>(defaultSiteData);

/**
 * Serves site content to every section. Starts from the build-time snapshot
 * so the static HTML is complete, then swaps in live Supabase data.
 */
export function SiteDataProvider({
  initial,
  children,
}: {
  initial: SiteData;
  children: React.ReactNode;
}) {
  const [data, setData] = useState(initial);

  useEffect(() => {
    let cancelled = false;
    fetchSiteData(supabase)
      .then((fresh) => {
        if (!cancelled) setData(fresh);
      })
      .catch(() => {
        // Keep the snapshot when Supabase is unreachable.
      });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    document.title = data.seo.title;
  }, [data.seo.title]);

  return (
    <SiteDataContext.Provider value={data}>{children}</SiteDataContext.Provider>
  );
}

export function useSiteData() {
  return useContext(SiteDataContext);
}
