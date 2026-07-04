export default function BrandMark({ size = 38 }: { size?: number }) {
  return (
    <span
      aria-hidden="true"
      className="border-amber-500 from-navy-800 to-navy-900 flex shrink-0 items-center justify-center rounded-full border-2 bg-gradient-to-br"
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 60 60"
        fill="none"
        style={{ width: size * 0.53, height: size * 0.53 }}
      >
        <path
          d="M30 12 C38 24, 42 32, 42 38 C42 46, 37 51, 30 51 C23 51, 18 46, 18 38 C18 32, 22 24, 30 12 Z"
          fill="#EAF0F7"
        />
        <path d="M34 22 L26 36 L31 36 L27 48 L40 30 L33 30 Z" fill="#D98F3A" />
      </svg>
    </span>
  );
}
