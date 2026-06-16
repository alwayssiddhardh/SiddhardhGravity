import { useEffect, useRef } from "react";
import * as flubber from "flubber";
const interpolate = (flubber as any).interpolate ?? (flubber as any).default?.interpolate;

/** MorphSVG-equivalent (free). Cycles through SVG path `d` strings on a timeline. */
const SHAPES = [
  // Diamond
  "M256 32 L480 256 L256 480 L32 256 Z",
  // Rounded blob
  "M256 48 C384 48 480 144 480 256 C480 384 384 464 256 464 C144 464 32 384 32 256 C32 128 144 48 256 48 Z",
  // Hex
  "M128 64 L384 64 L496 256 L384 448 L128 448 L16 256 Z",
  // Star burst
  "M256 24 L312 192 L488 192 L344 296 L400 472 L256 368 L112 472 L168 296 L24 192 L200 192 Z",
];

export function MorphShape({ className }: { className?: string }) {
  const ref = useRef<SVGPathElement>(null);

  useEffect(() => {
    let stop = false;
    let i = 0;
    const run = async () => {
      while (!stop) {
        const from = SHAPES[i % SHAPES.length];
        const to = SHAPES[(i + 1) % SHAPES.length];
        const interp = interpolate(from, to, { maxSegmentLength: 4 });
        const dur = 1400;
        const start = performance.now();
        await new Promise<void>((resolve) => {
          const tick = (t: number) => {
            if (stop) return resolve();
            const p = Math.min(1, (t - start) / dur);
            const eased = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
            if (ref.current) ref.current.setAttribute("d", interp(eased));
            if (p < 1) requestAnimationFrame(tick);
            else resolve();
          };
          requestAnimationFrame(tick);
        });
        await new Promise((r) => setTimeout(r, 700));
        i++;
      }
    };
    run();
    return () => {
      stop = true;
    };
  }, []);

  return (
    <svg viewBox="0 0 512 512" className={className} aria-hidden>
      <defs>
        <linearGradient id="morphGrad" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="var(--rainbow-1)" />
          <stop offset="33%" stopColor="var(--rainbow-2)" />
          <stop offset="66%" stopColor="var(--rainbow-3)" />
          <stop offset="100%" stopColor="var(--rainbow-4)" />
        </linearGradient>
        <filter id="morphGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="6" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <path
        ref={ref}
        d={SHAPES[0]}
        fill="none"
        stroke="url(#morphGrad)"
        strokeWidth="3"
        strokeLinejoin="round"
        filter="url(#morphGlow)"
      />
    </svg>
  );
}
