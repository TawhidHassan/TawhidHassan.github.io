import { createElement, type ComponentType } from "react";
import {
  Award,
  Bell,
  Boxes,
  Brain,
  Briefcase,
  Building2,
  Cloud,
  Code,
  Cpu,
  CreditCard,
  Database,
  Gauge,
  GitBranch,
  Globe,
  GraduationCap,
  Heart,
  Layers,
  Locate,
  Mail,
  Map as MapIcon,
  MapPin,
  Palette,
  Phone,
  Rocket,
  Send,
  Server,
  ShieldCheck,
  ShoppingBag,
  Smartphone,
  Sparkles,
  Star,
  Trophy,
  Users,
  Workflow,
  Zap,
} from "lucide-react";
import { GithubIcon, LinkedinIcon, WhatsAppIcon } from "@/components/ui/BrandIcons";

type IconComponent = ComponentType<{ size?: number | string; className?: string }>;

/**
 * Icons selectable from the admin panel. Content stores the key; importing
 * them explicitly keeps the rest of lucide out of the bundle.
 */
export const ICONS: Record<string, IconComponent> = {
  Award,
  Bell,
  Boxes,
  Brain,
  Briefcase,
  Building2,
  Cloud,
  Code,
  Cpu,
  CreditCard,
  Database,
  Gauge,
  GitBranch,
  Github: GithubIcon,
  Globe,
  GraduationCap,
  Heart,
  Layers,
  Linkedin: LinkedinIcon,
  Locate,
  Mail,
  Map: MapIcon,
  MapPin,
  Palette,
  Phone,
  Rocket,
  Send,
  Server,
  ShieldCheck,
  ShoppingBag,
  Smartphone,
  Sparkles,
  Star,
  Trophy,
  Users,
  WhatsApp: WhatsAppIcon,
  Workflow,
  Zap,
};

export const ICON_NAMES = Object.keys(ICONS);

/** Resolve an icon key, falling back to a neutral glyph for unknown names. */
export function getIcon(name: string): IconComponent {
  return ICONS[name] ?? Sparkles;
}

export function Icon({
  name,
  size,
  className,
}: {
  name: string;
  size?: number | string;
  className?: string;
}) {
  return createElement(getIcon(name), { size, className });
}
