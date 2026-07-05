import siteConfig from "@/content/site-config.json";
import servicesData from "@/content/services.json";
import testimonialsData from "@/content/testimonials.json";
import galleryData from "@/content/gallery.json";

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

// The site is zh-TW only (English removed 2026-07). The *_en fields kept in
// the content JSON are unused but preserved in case English returns.
export function getAddress(): string {
  return siteConfig.address_zh;
}

export function getServices(): Service[] {
  return servicesData.map((s) => ({
    id: s.id,
    icon: s.icon,
    name: s.name_zh,
    description: s.description_zh,
    details: s.details_zh,
  }));
}

export interface GalleryItem {
  id: string;
  caption: string;
  tag: string;
  before: string;
  after: string;
}

export function getGallery(): GalleryItem[] {
  return galleryData.map((g) => ({
    id: g.id,
    caption: g.caption_zh,
    tag: g.tag_zh,
    before: g.before,
    after: g.after,
  }));
}

export function getTestimonials(): Testimonial[] {
  return testimonialsData.map((t) => ({
    author: t.author,
    rating: t.rating,
    text: t.text_zh,
  }));
}
