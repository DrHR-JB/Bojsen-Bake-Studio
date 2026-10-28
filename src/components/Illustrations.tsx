import type { RecipeCategory } from "@/lib/types";

type IconProps = { className?: string };

export function WheatMark({ className }: IconProps) {
  return (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.6" className={className} aria-hidden>
      <path d="M16 30V9" strokeLinecap="round" />
      {[11, 16, 21].map((y) => (
        <g key={y}>
          <path d={`M16 ${y}c-4-1-6-4-6-7 3 0 6 3 6 7Z`} fill="currentColor" fillOpacity=".15" />
          <path d={`M16 ${y}c4-1 6-4 6-7-3 0-6 3-6 7Z`} fill="currentColor" fillOpacity=".15" />
        </g>
      ))}
      <path d="M16 9c-1.5-2-1.5-4.5 0-7 1.5 2.5 1.5 5 0 7Z" fill="currentColor" fillOpacity=".15" />
    </svg>
  );
}

function Loaf({ className }: IconProps) {
  return (
    <svg viewBox="0 0 200 140" className={className} aria-hidden>
      <ellipse cx="100" cy="122" rx="78" ry="8" fill="#6c3817" opacity=".15" />
      <path
        d="M24 104c-6-34 26-72 76-72s82 38 76 72c-2 10-12 16-24 16H48c-12 0-22-6-24-16Z"
        fill="#b8722f"
      />
      <path
        d="M30 100c-3-28 26-60 70-60s73 32 70 60"
        fill="none"
        stroke="#d69a52"
        strokeWidth="6"
        strokeLinecap="round"
        opacity=".55"
      />
      {/* Snit i skorpen ("øret") */}
      <path d="M58 58c22-14 58-16 86 2" fill="none" stroke="#f3dcae" strokeWidth="7" strokeLinecap="round" />
      <path d="M58 58c22-14 58-16 86 2" fill="none" stroke="#8a4416" strokeWidth="2" strokeLinecap="round" opacity=".5" transform="translate(0 5)" />
      {/* Mel */}
      {[
        [80, 44],
        [96, 40],
        [112, 42],
        [126, 47],
        [70, 50],
        [104, 50],
      ].map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r="1.6" fill="#fff8ea" opacity=".9" />
      ))}
    </svg>
  );
}

function Pizza({ className }: IconProps) {
  return (
    <svg viewBox="0 0 200 140" className={className} aria-hidden>
      <ellipse cx="100" cy="124" rx="80" ry="8" fill="#6c3817" opacity=".15" />
      <ellipse cx="100" cy="76" rx="80" ry="46" fill="#c98a45" />
      <ellipse cx="100" cy="74" rx="80" ry="46" fill="#dda35c" />
      {/* Leopardpletter på kanten */}
      {[
        [36, 58],
        [58, 38],
        [150, 40],
        [172, 70],
        [140, 112],
        [52, 108],
        [100, 31],
      ].map(([x, y]) => (
        <ellipse key={`${x}-${y}`} cx={x} cy={y} rx="4" ry="2.5" fill="#5a2c12" opacity=".7" />
      ))}
      <ellipse cx="100" cy="76" rx="64" ry="34" fill="#c4432a" />
      <ellipse cx="100" cy="76" rx="64" ry="34" fill="url(#sauce)" />
      {[
        [78, 66, 13],
        [120, 70, 15],
        [98, 92, 12],
        [134, 90, 9],
        [66, 88, 9],
      ].map(([x, y, r]) => (
        <ellipse key={`${x}-${y}`} cx={x} cy={y} rx={r} ry={r * 0.6} fill="#fbf1dc" />
      ))}
      {[
        [92, 62],
        [112, 84],
        [72, 78],
      ].map(([x, y]) => (
        <path key={`${x}-${y}`} d={`M${x} ${y}c4-5 10-5 12 0-4 4-9 4-12 0Z`} fill="#4f6b34" />
      ))}
      <defs>
        <radialGradient id="sauce">
          <stop offset="0" stopColor="#e05a37" stopOpacity=".6" />
          <stop offset="1" stopColor="#a5311d" stopOpacity=".4" />
        </radialGradient>
      </defs>
    </svg>
  );
}

export function RecipeIllustration({ category, className }: { category: RecipeCategory } & IconProps) {
  return category === "Pizza" ? <Pizza className={className} /> : <Loaf className={className} />;
}
