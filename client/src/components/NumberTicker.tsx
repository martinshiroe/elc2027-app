import { useEffect, useRef, useState } from "react";

// Compte de 0 jusqu'à `value` quand l'élément entre dans le viewport.
// Inspiré du composant "Number Ticker" de Magic UI, réécrit sans dépendance
// (pas de framer-motion) pour rester léger sur une page qui n'affiche que
// quelques chiffres.
export default function NumberTicker({ value, suffix = "", duration = 1200 }: { value: number; suffix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const tick = (now: number) => {
            const t = Math.min(1, (now - start) / duration);
            const eased = 1 - Math.pow(1 - t, 3); // ease-out cubic
            setDisplay(Math.round(eased * value));
            if (t < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [value, duration]);

  return (
    <span ref={ref} style={{ fontVariantNumeric: "tabular-nums" }}>
      {display}{suffix}
    </span>
  );
}
