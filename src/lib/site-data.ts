import type { SupabaseClient } from "@supabase/supabase-js";
import {
  about,
  achievements,
  clients,
  education,
  experiences,
  headings,
  locations,
  profile,
  projects,
  siteMeta,
  skillGroups,
  skillMarquee,
  socials,
  stats,
  testimonials,
  type Achievement,
  type Client,
  type Education,
  type ExperienceItem,
  type Headings,
  type Highlight,
  type MapLocation,
  type Profile,
  type Project,
  type SiteMeta,
  type SkillGroup,
  type SocialLink,
  type Stat,
  type Testimonial,
} from "./data";

/** Everything the public site renders, in the shape components consume. */
export type SiteData = {
  profile: Profile;
  about: { heading: string; paragraphs: string[] };
  headings: Headings;
  skillMarquee: string[];
  seo: SiteMeta;
  socials: SocialLink[];
  highlights: Highlight[];
  education: Education[];
  experiences: ExperienceItem[];
  skillGroups: SkillGroup[];
  projects: Project[];
  stats: Stat[];
  achievements: Achievement[];
  testimonials: Testimonial[];
  clients: Client[];
  locations: MapLocation[];
};

export const defaultSiteData: SiteData = {
  profile,
  about: { heading: about.heading, paragraphs: about.paragraphs },
  headings,
  skillMarquee,
  seo: siteMeta,
  socials,
  highlights: about.highlights,
  education,
  experiences,
  skillGroups,
  projects,
  stats,
  achievements,
  testimonials,
  clients,
  locations,
};

/** `site_settings` keys, one JSON document each. */
export const SETTINGS_KEYS = ["profile", "about", "headings", "skills", "seo"] as const;

/** Collection tables, in the order the admin lists them. */
export const COLLECTION_TABLES = [
  "socials",
  "about_highlights",
  "education",
  "experiences",
  "skill_groups",
  "projects",
  "stats",
  "achievements",
  "testimonials",
  "clients",
  "locations",
] as const;

export type CollectionTable = (typeof COLLECTION_TABLES)[number];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Row = Record<string, any>;

/**
 * Load all content from Supabase. Anything missing or failing falls back to
 * the built-in defaults, so the site always renders.
 */
export async function fetchSiteData(client: SupabaseClient): Promise<SiteData> {
  const [settingsRes, ...tableRes] = await Promise.all([
    client.from("site_settings").select("key, value"),
    ...COLLECTION_TABLES.map((t) =>
      client.from(t).select("*").order("sort_order").order("created_at")
    ),
  ]);

  const settings: Row = {};
  for (const row of settingsRes.data ?? []) settings[row.key] = row.value;

  const rows = {} as Record<CollectionTable, Row[] | null>;
  COLLECTION_TABLES.forEach((t, i) => {
    rows[t] = tableRes[i].error ? null : (tableRes[i].data as Row[]);
  });

  // An empty table is a valid state once the admin has started managing it;
  // only a failed request falls back to the defaults.
  const list = <T>(table: CollectionTable, fallback: T[], map: (r: Row) => T) =>
    rows[table] ? rows[table]!.map(map) : fallback;

  const d = defaultSiteData;
  return {
    profile: { ...d.profile, ...settings.profile },
    about: { ...d.about, ...settings.about },
    headings: { ...d.headings, ...settings.headings },
    skillMarquee: settings.skills?.marquee ?? d.skillMarquee,
    seo: { ...d.seo, ...settings.seo },
    socials: list("socials", d.socials, (r) => ({
      label: r.label,
      href: r.href,
      handle: r.handle,
      icon: r.icon,
    })),
    highlights: list("about_highlights", d.highlights, (r) => ({
      title: r.title,
      description: r.description,
      icon: r.icon,
    })),
    education: list("education", d.education, (r) => ({
      degree: r.degree,
      institution: r.institution,
      period: r.period,
      result: r.result,
    })),
    experiences: list("experiences", d.experiences, (r) => ({
      company: r.company,
      role: r.role,
      period: r.period,
      type: r.type,
      icon: r.icon,
      summary: r.summary,
      projects: r.projects ?? [],
    })),
    skillGroups: list("skill_groups", d.skillGroups, (r) => ({
      category: r.category,
      skills: r.skills ?? [],
    })),
    projects: list("projects", d.projects, (r) => ({
      id: r.id,
      name: r.name,
      category: r.category,
      description: r.description,
      longDescription: r.long_description,
      playStore: r.play_store,
      tech: r.tech ?? [],
      metrics: r.metrics ?? [],
      accent: r.accent,
      imageUrl: r.image_url || undefined,
    })),
    stats: list("stats", d.stats, (r) => ({
      value: r.value,
      suffix: r.suffix,
      label: r.label,
    })),
    achievements: list("achievements", d.achievements, (r) => ({
      title: r.title,
      description: r.description,
      icon: r.icon,
    })),
    testimonials: list("testimonials", d.testimonials, (r) => ({
      name: r.name,
      initials: r.initials,
      role: r.role,
      company: r.company,
      meta: r.meta || undefined,
      email: r.email || undefined,
      quote: r.quote,
      accent: r.accent,
      avatarUrl: r.avatar_url || undefined,
    })),
    clients: list("clients", d.clients, (r) => ({
      name: r.name,
      logoUrl: r.logo_url || undefined,
    })),
    locations: list("locations", d.locations, (r) => ({
      name: r.name,
      flag: r.flag,
      lng: r.lng,
      lat: r.lat,
    })),
  };
}

/** Contact rows shown in the Contact section, derived from the profile. */
export function contactDetailsFor(p: Profile) {
  const tel = p.phone.replace(/\s/g, "");
  return [
    { label: "Email", value: p.email, href: `mailto:${p.email}`, icon: "Mail" },
    { label: "Phone", value: p.phone, href: `tel:${tel}`, icon: "Phone" },
    {
      label: "WhatsApp",
      value: p.phone,
      href: `https://wa.me/${p.phone.replace(/[^\d]/g, "")}`,
      icon: "WhatsApp",
    },
    { label: "Location", value: p.location, href: undefined, icon: "MapPin" },
  ];
}
