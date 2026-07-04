import { site } from "@/lib/content";

export default function CalendlyEmbed({ title }: { title: string }) {
  return (
    <div className="border-line overflow-hidden rounded-xl border bg-white">
      <iframe
        src={`${site.calendlyUrl}?hide_gdpr_banner=1`}
        title={title}
        loading="lazy"
        className="h-[680px] w-full border-0"
      />
    </div>
  );
}
