// Prints SQL that seeds Supabase with the built-in content from
// src/lib/data.ts. Each table and setting is only filled while still empty,
// so the output is safe to run more than once.
//
//   node scripts/seed-sql.mjs > seed.sql
import * as data from "../src/lib/data.ts";

const settings = {
  profile: data.profile,
  about: { heading: data.about.heading, paragraphs: data.about.paragraphs },
  headings: data.headings,
  skills: { marquee: data.skillMarquee },
  seo: data.siteMeta,
};

// Column list per table: [column, sql type, value getter].
const text = (k) => [k, "text", (r) => r[k] ?? ""];
const collections = {
  socials: [data.socials, [text("label"), text("href"), text("handle"), text("icon")]],
  about_highlights: [
    data.about.highlights,
    [text("title"), text("description"), text("icon")],
  ],
  education: [
    data.education,
    [text("degree"), text("institution"), text("period"), text("result")],
  ],
  experiences: [
    data.experiences,
    [
      text("company"),
      text("role"),
      text("period"),
      text("type"),
      text("icon"),
      text("summary"),
      ["projects", "text[]", (r) => r.projects],
    ],
  ],
  skill_groups: [data.skillGroups, [text("category"), ["skills", "jsonb", (r) => r.skills]]],
  projects: [
    data.projects,
    [
      text("name"),
      text("category"),
      text("description"),
      ["long_description", "text", (r) => r.longDescription],
      ["play_store", "text", (r) => r.playStore],
      ["tech", "text[]", (r) => r.tech],
      ["metrics", "jsonb", (r) => r.metrics],
      text("accent"),
    ],
  ],
  stats: [data.stats, [text("value"), text("suffix"), text("label")]],
  achievements: [data.achievements, [text("title"), text("description"), text("icon")]],
  testimonials: [
    data.testimonials,
    [
      text("name"),
      text("initials"),
      text("role"),
      text("company"),
      text("meta"),
      text("email"),
      text("quote"),
      text("accent"),
    ],
  ],
  clients: [data.clients, [text("name")]],
  locations: [
    data.locations,
    [
      text("name"),
      text("flag"),
      ["lng", "float8", (r) => r.lng],
      ["lat", "float8", (r) => r.lat],
    ],
  ],
};

const quote = (s) => `'${String(s).replace(/'/g, "''")}'`;
const literal = (type, v) => {
  if (type === "jsonb") return `${quote(JSON.stringify(v))}::jsonb`;
  if (type === "text[]") return `array[${v.map(quote).join(", ")}]::text[]`;
  if (type === "float8") return String(Number(v));
  return quote(v);
};

const out = [];
for (const [key, value] of Object.entries(settings)) {
  out.push(
    `insert into public.site_settings (key, value) values (${quote(key)}, ${literal("jsonb", value)}) on conflict (key) do nothing;`
  );
}
for (const [table, [rows, cols]] of Object.entries(collections)) {
  const names = ["sort_order", ...cols.map((c) => c[0])].join(", ");
  const values = rows
    .map((r, i) => `  (${[i, ...cols.map(([, type, get]) => literal(type, get(r)))].join(", ")})`)
    .join(",\n");
  out.push(
    `insert into public.${table} (${names})\nselect * from (values\n${values}\n) as v\nwhere not exists (select 1 from public.${table});`
  );
}
console.log(out.join("\n\n"));
