import { useMemo } from "react";

/** Ambient water-bubble drift behind sections. */
export function Bubbles({ count = 18 }: { count?: number }) {
  const items = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => {
        const colors = ["#ff5fa2", "#6f42c1", "#007bff", "#7ccd75"];
        return {
          id: i,
          left: Math.random() * 100,
          size: 10 + Math.random() * 40,
          delay: Math.random() * 10,
          duration: 14 + Math.random() * 16,
          color: colors[i % colors.length],
        };
      }),
    [count],
  );

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {items.map((b) => (
        <span
          key={b.id}
          style={{
            position: "absolute",
            bottom: -50,
            left: `${b.left}%`,
            width: b.size,
            height: b.size,
            borderRadius: "50%",
            background: `radial-gradient(circle at 30% 30%, ${b.color}aa, ${b.color}22 60%, transparent 80%)`,
            boxShadow: `0 0 30px ${b.color}55`,
            animation: `bubble-rise ${b.duration}s linear ${b.delay}s infinite`,
            mixBlendMode: "screen",
          }}
        />
      ))}
    </div>
  );
}
