import siteConfig from "@/content/site-config.json";
import servicesData from "@/content/services.json";
import testimonialsData from "@/content/testimonials.json";
import galleryData from "@/content/gallery.json";
import type { Locale } from "@/i18n/routing";

export interface Service {
  id: string;
  icon: string;
  name: string;
  description: string;
  details: string;
}

export interface Testimonial {
  author: string;
  rating: number;
  text: string;
}

export const site = siteConfig;

export function getAddress(locale: Locale): string {
  return locale === "en" ? siteConfig.address_en : siteConfig.address_zh;
}

export function getServices(locale: Locale): Service[] {
  return servicesData.map((s) => ({
    id: s.id,
    icon: s.icon,
    name: locale === "en" ? s.name_en : s.name_zh,
    description: locale === "en" ? s.description_en : s.description_zh,
    details: locale === "en" ? s.details_en : s.details_zh,
  }));
}

export interface GalleryItem {
  id: string;
  caption: string;
  tag: string;
  before: string;
  after: string;
}

export function getGallery(locale: Locale): GalleryItem[] {
  return galleryData.map((g) => ({
    id: g.id,
    caption: locale === "en" ? g.caption_en : g.caption_zh,
    tag: locale === "en" ? g.tag_en : g.tag_zh,
    before: g.before,
    after: g.after,
  }));
}

export function getTestimonials(locale: Locale): Testimonial[] {
  return testimonialsData.map((t) => ({
    author: t.author,
    rating: t.rating,
    text: locale === "en" ? t.text_en : t.text_zh,
  }));
}
