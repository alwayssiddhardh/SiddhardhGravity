import { useEffect, useRef, useState, createElement } from "react";

const CHARS = "!<>-_\\/[]{}—=+*^?#АБВΩΨΔ█▓▒░01";

/** GSAP ScrambleText-equivalent (free). Scrambles into the final string on mount. */
export function ScrambleText({
  text,
  duration = 1800,
  className,
  as = "span",
}: {
  text: string;
  duration?: number;
  className?: string;
  as?: string;
}) {
  const [out, setOut] = useState(text);
  const ref = useRef<number | null>(null);

  useEffect(() => {
    const start = performance.now();
    const target = text;
    const len = target.length;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      const revealUpTo = Math.floor(p * len);
      let s = "";
      for (let i = 0; i < len; i++) {
        if (i < revealUpTo) s += target[i];
        else if (target[i] === " ") s += " ";
        else s += CHARS[Math.floor(Math.random() * CHARS.length)];
      }
      setOut(s);
      if (p < 1) ref.current = requestAnimationFrame(tick);
      else setOut(target);
    };
    ref.current = requestAnimationFrame(tick);
    return () => {
      if (ref.current) cancelAnimationFrame(ref.current);
    };
  }, [text, duration]);

  return createElement(as, { className }, out);
}
