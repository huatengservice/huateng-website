const PATHS: Record<string, React.ReactNode> = {
  zap: <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8z" />,
  droplet: <path d="M12 2c4 5 6 8 6 11a6 6 0 1 1-12 0c0-3 2-6 6-11z" />,
  plug: (
    <path d="M9 2v6H7a2 2 0 0 0-2 2v3a5 5 0 0 0 4 4.9V22h6v-4.1a5 5 0 0 0 4-4.9v-3a2 2 0 0 0-2-2h-2V2h-3v6h-1V2H9z" />
  ),
  wrench: (
    <path d="M21 6.5a5.5 5.5 0 0 1-7.6 5.1L6.9 18.1a2.1 2.1 0 0 1-3-3l6.5-6.5A5.5 5.5 0 0 1 17.5 1l-3 3 2.5 2.5 3-3c.3.9.5 2 .5 3z" />
  ),
  layers: (
    <path d="M12 2 2 8l10 6 10-6-10-6zM2 13l10 6 10-6-2.5-1.5L12 16 4.5 11.5 2 13z" />
  ),
  building: (
    <path d="M4 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18h4v-9a2 2 0 0 0-2-2h-2v11H4zm4-14h2v2H8V8zm0 4h2v2H8v-2zm0 4h2v2H8v-2zm4-8h2v2h-2V8zm0 4h2v2h-2v-2z" />
  ),
};

export default function ServiceIcon({ name }: { name: string }) {
  return (
    <span
      aria-hidden="true"
      className="bg-navy-800 flex h-11 w-11 items-center justify-center rounded-lg"
    >
      <svg viewBox="0 0 24 24" className="h-[22px] w-[22px] fill-[#D98F3A]">
        {PATHS[name] ?? PATHS.wrench}
      </svg>
    </span>
  );
}
