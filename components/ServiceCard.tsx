import ServiceIcon from "./ServiceIcon";
import type { Service } from "@/lib/content";

export default function ServiceCard({
  service,
  index,
}: {
  service: Service;
  index: number;
}) {
  return (
    <div className="bg-paper-card border-line hover:border-amber-500 rounded-xl border p-6 transition-colors">
      <span className="font-mono text-amber-700 text-xs">
        {String(index + 1).padStart(2, "0")}
      </span>
      <div className="mt-3.5 mb-4">
        <ServiceIcon name={service.icon} />
      </div>
      <h3 className="mb-2 text-lg font-bold">{service.name}</h3>
      <p className="text-ink-soft text-sm">{service.description}</p>
    </div>
  );
}
