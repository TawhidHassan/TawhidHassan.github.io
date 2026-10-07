import { ACCENTS } from "@/lib/data";
import { defaultSiteData, type CollectionTable } from "@/lib/site-data";

/** A form control. `name` may be a dotted path into the value object. */
export type Field = {
  name: string;
  label: string;
  type:
    | "text"
    | "textarea"
    | "number"
    | "icon"
    | "accent"
    | "list"
    | "rows"
    | "image"
    | "file";
  required?: boolean;
  placeholder?: string;
  help?: string;
  /** `list`: edit each entry in a textarea. */
  multiline?: boolean;
  /** `rows`: the columns of each entry. */
  columns?: Field[];
  /** `image` / `file`: storage folder inside the media bucket. */
  folder?: string;
  /** `file`: accepted mime types. */
  accept?: string;
  /** `number`: allow decimals. */
  step?: string;
  /** Heading rendered above this field to start a visual group. */
  group?: string;
};

export type Collection = {
  kind: "collection";
  table: CollectionTable;
  label: string;
  singular: string;
  /** Icon registry key for the sidebar. */
  icon: string;
  titleField: string;
  subtitleField?: string;
  imageField?: string;
  fields: Field[];
};

export type SettingsDoc = {
  kind: "settings";
  key: string;
  label: string;
  icon: string;
  description: string;
  fields: Field[];
  defaults: Record<string, unknown>;
};

const d = defaultSiteData;

const heading = (key: string, label: string): Field[] => [
  { name: `${key}.eyebrow`, label: "Eyebrow", type: "text", group: label },
  { name: `${key}.title`, label: "Title", type: "text" },
  { name: `${key}.description`, label: "Description", type: "textarea" },
];

export const SETTINGS: SettingsDoc[] = [
  {
    kind: "settings",
    key: "profile",
    label: "Profile & Hero",
    icon: "Users",
    description: "Identity, hero copy, photo and CV used across the site.",
    defaults: d.profile,
    fields: [
      { name: "photoUrl", label: "Profile photo", type: "image", folder: "profile" },
      {
        name: "cvUrl",
        label: "CV / résumé (PDF)",
        type: "file",
        folder: "cv",
        accept: "application/pdf",
      },
      { name: "name", label: "Display name", type: "text", required: true },
      { name: "fullName", label: "Full name", type: "text", required: true },
      { name: "initials", label: "Initials", type: "text" },
      { name: "tagline", label: "Tagline", type: "text" },
      {
        name: "roles",
        label: "Roles (hero typewriter)",
        type: "list",
        help: "Cycled one at a time under your name.",
      },
      { name: "shortBio", label: "Short bio", type: "textarea" },
      { name: "availability", label: "Availability badge", type: "text" },
      { name: "experienceYears", label: "Years of experience", type: "text" },
      {
        name: "heroBadges",
        label: "Floating badges",
        type: "list",
        help: "Up to 4 badges float around the photo.",
      },
      { name: "email", label: "Email", type: "text", group: "Contact" },
      { name: "phone", label: "Phone", type: "text" },
      { name: "location", label: "Location", type: "text" },
    ],
  },
  {
    kind: "settings",
    key: "about",
    label: "About",
    icon: "Heart",
    description: "The story block in the About section.",
    defaults: d.about,
    fields: [
      { name: "heading", label: "Heading", type: "text", required: true },
      { name: "paragraphs", label: "Paragraphs", type: "list", multiline: true },
    ],
  },
  {
    kind: "settings",
    key: "headings",
    label: "Section headings",
    icon: "Layers",
    description: "Eyebrow, title and intro text above each section.",
    defaults: d.headings,
    fields: [
      ...heading("experience", "Experience"),
      ...heading("clients", "Clients"),
      ...heading("skills", "Skills"),
      ...heading("projects", "Projects"),
      ...heading("achievements", "Achievements"),
      ...heading("testimonials", "Testimonials"),
      ...heading("global", "World map"),
      ...heading("contact", "Contact"),
    ],
  },
  {
    kind: "settings",
    key: "skills",
    label: "Skills ticker",
    icon: "Zap",
    description: "The scrolling marquee under the skills map.",
    defaults: { marquee: d.skillMarquee },
    fields: [{ name: "marquee", label: "Ticker items", type: "list" }],
  },
  {
    kind: "settings",
    key: "seo",
    label: "SEO",
    icon: "Globe",
    description:
      "Browser title updates live; search and social previews update on the next deploy.",
    defaults: d.seo,
    fields: [
      { name: "title", label: "Page title", type: "text", required: true },
      { name: "description", label: "Meta description", type: "textarea" },
      { name: "url", label: "Site URL", type: "text" },
      { name: "keywords", label: "Keywords", type: "list" },
    ],
  },
];

export const COLLECTIONS: Collection[] = [
  {
    kind: "collection",
    table: "projects",
    label: "Projects",
    singular: "project",
    icon: "Rocket",
    titleField: "name",
    subtitleField: "category",
    imageField: "image_url",
    fields: [
      { name: "image_url", label: "Cover image", type: "image", folder: "projects" },
      { name: "name", label: "Name", type: "text", required: true },
      { name: "category", label: "Category", type: "text", placeholder: "Enterprise · HR" },
      { name: "description", label: "Short description", type: "textarea" },
      { name: "long_description", label: "Long description", type: "textarea" },
      { name: "play_store", label: "Store / project link", type: "text" },
      { name: "tech", label: "Tech stack", type: "list" },
      {
        name: "metrics",
        label: "Metrics",
        type: "rows",
        help: "Three metrics fit the card best.",
        columns: [
          { name: "label", label: "Label", type: "text" },
          { name: "value", label: "Value", type: "text" },
        ],
      },
      { name: "accent", label: "Accent gradient", type: "accent" },
    ],
  },
  {
    kind: "collection",
    table: "experiences",
    label: "Experience",
    singular: "role",
    icon: "Briefcase",
    titleField: "role",
    subtitleField: "company",
    fields: [
      { name: "company", label: "Company", type: "text", required: true },
      { name: "role", label: "Role", type: "text" },
      { name: "period", label: "Period", type: "text", placeholder: "2024 — Present" },
      { name: "type", label: "Type", type: "text", placeholder: "Full-time" },
      { name: "icon", label: "Icon", type: "icon" },
      { name: "summary", label: "Summary", type: "textarea" },
      { name: "projects", label: "Projects", type: "list" },
    ],
  },
  {
    kind: "collection",
    table: "skill_groups",
    label: "Skills",
    singular: "skill group",
    icon: "Cpu",
    titleField: "category",
    fields: [
      { name: "category", label: "Category", type: "text", required: true },
      {
        name: "skills",
        label: "Skills",
        type: "rows",
        columns: [
          { name: "name", label: "Skill", type: "text" },
          { name: "level", label: "Level (0–100)", type: "number" },
          { name: "icon", label: "Icon", type: "icon" },
        ],
      },
    ],
  },
  {
    kind: "collection",
    table: "testimonials",
    label: "Testimonials",
    singular: "testimonial",
    icon: "Star",
    titleField: "name",
    subtitleField: "role",
    imageField: "avatar_url",
    fields: [
      { name: "avatar_url", label: "Photo", type: "image", folder: "testimonials" },
      { name: "name", label: "Name", type: "text", required: true },
      { name: "initials", label: "Initials", type: "text", help: "Shown when there is no photo." },
      { name: "role", label: "Role", type: "text" },
      { name: "company", label: "Company", type: "text" },
      { name: "meta", label: "Tag", type: "text", placeholder: "Fintech Expert" },
      { name: "email", label: "Email", type: "text" },
      { name: "quote", label: "Quote", type: "textarea", required: true },
      { name: "accent", label: "Accent gradient", type: "accent" },
    ],
  },
  {
    kind: "collection",
    table: "clients",
    label: "Clients",
    singular: "client",
    icon: "Building2",
    titleField: "name",
    imageField: "logo_url",
    fields: [
      {
        name: "logo_url",
        label: "Logo",
        type: "image",
        folder: "clients",
        help: "Optional — the name is shown as a wordmark without one.",
      },
      { name: "name", label: "Name", type: "text", required: true },
    ],
  },
  {
    kind: "collection",
    table: "achievements",
    label: "Achievements",
    singular: "achievement",
    icon: "Trophy",
    titleField: "title",
    subtitleField: "description",
    fields: [
      { name: "title", label: "Title", type: "text", required: true },
      { name: "description", label: "Description", type: "textarea" },
      { name: "icon", label: "Icon", type: "icon" },
    ],
  },
  {
    kind: "collection",
    table: "stats",
    label: "Stats",
    singular: "stat",
    icon: "Gauge",
    titleField: "label",
    subtitleField: "value",
    fields: [
      { name: "value", label: "Number", type: "text", required: true, placeholder: "20" },
      { name: "suffix", label: "Suffix", type: "text", placeholder: "+" },
      { name: "label", label: "Label", type: "text", required: true },
    ],
  },
  {
    kind: "collection",
    table: "about_highlights",
    label: "About highlights",
    singular: "highlight",
    icon: "Sparkles",
    titleField: "title",
    subtitleField: "description",
    fields: [
      { name: "title", label: "Title", type: "text", required: true },
      { name: "description", label: "Description", type: "textarea" },
      { name: "icon", label: "Icon", type: "icon" },
    ],
  },
  {
    kind: "collection",
    table: "education",
    label: "Education",
    singular: "entry",
    icon: "GraduationCap",
    titleField: "degree",
    subtitleField: "institution",
    fields: [
      { name: "degree", label: "Degree", type: "text", required: true },
      { name: "institution", label: "Institution", type: "text" },
      { name: "period", label: "Period", type: "text" },
      { name: "result", label: "Result", type: "text" },
    ],
  },
  {
    kind: "collection",
    table: "socials",
    label: "Social links",
    singular: "link",
    icon: "Send",
    titleField: "label",
    subtitleField: "href",
    fields: [
      { name: "label", label: "Label", type: "text", required: true },
      {
        name: "href",
        label: "Link",
        type: "text",
        required: true,
        placeholder: "https://… , mailto:… or tel:…",
      },
      { name: "handle", label: "Handle", type: "text" },
      { name: "icon", label: "Icon", type: "icon" },
    ],
  },
  {
    kind: "collection",
    table: "locations",
    label: "Map locations",
    singular: "location",
    icon: "MapPin",
    titleField: "name",
    subtitleField: "flag",
    fields: [
      { name: "name", label: "Country / city", type: "text", required: true },
      { name: "flag", label: "Flag emoji", type: "text" },
      { name: "lng", label: "Longitude", type: "number", step: "any", required: true },
      { name: "lat", label: "Latitude", type: "number", step: "any", required: true },
    ],
  },
];

/* ------------------------------ value helpers ------------------------------ */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Values = Record<string, any>;

export function getPath(obj: Values, path: string): unknown {
  return path.split(".").reduce<unknown>(
    (acc, key) => (acc as Values | undefined)?.[key],
    obj
  );
}

/** Immutable set at a dotted path. */
export function setPath(obj: Values, path: string, value: unknown): Values {
  const [head, ...rest] = path.split(".");
  if (rest.length === 0) return { ...obj, [head]: value };
  return { ...obj, [head]: setPath(obj[head] ?? {}, rest.join("."), value) };
}

/** Blank value for a new entry of the given field type. */
export function emptyValue(field: Field): unknown {
  switch (field.type) {
    case "list":
    case "rows":
      return [];
    case "number":
      return 0;
    case "icon":
      return "Sparkles";
    case "accent":
      return ACCENTS[0];
    default:
      return "";
  }
}
