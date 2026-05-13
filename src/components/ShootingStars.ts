import { useEffect, useRef } from "react";

export const useShootingStars = () => {
  const starContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = starContainerRef.current;
    if (!container) return;

    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const timeoutIds = new Set<ReturnType<typeof setTimeout>>();
    const schedule = (fn: () => void, ms: number) => {
      const id = setTimeout(() => {
        timeoutIds.delete(id);
        fn();
      }, ms);
      timeoutIds.add(id);
      return id;
    };

    const moon = document.createElement("div");
    moon.className = "moon";
    container.appendChild(moon);

    let angle = Math.random() * 2 * Math.PI;
    const radiusX = 20 + Math.random() * 30;
    const radiusY = 15 + Math.random() * 20;
    const speed = 0.001 + Math.random() * 0.002;
    const centerX = 50;
    const centerY = 50;
    let moonRaf = 0;

    const animateMoon = () => {
      angle += speed;
      const x = centerX + radiusX * Math.cos(angle);
      const y = centerY + radiusY * Math.sin(angle);
      moon.style.left = `${x}vw`;
      moon.style.top = `${y}vh`;
      moonRaf = requestAnimationFrame(animateMoon);
    };
    moonRaf = requestAnimationFrame(animateMoon);

    const planet1 = document.createElement("div");
    planet1.className = "planet planet1";
    container.appendChild(planet1);

    const planet2 = document.createElement("div");
    planet2.className = "planet planet2";
    container.appendChild(planet2);

    const createStar = () => {
      const star = document.createElement("div");
      star.className = "shootingStar";
      const top = -5 - Math.random() * 5;
      const left = Math.random() * 100;
      const duration = 2000 + Math.random() * 1000;
      star.style.cssText = `top:${top}vh;left:${left}vw;transform:rotate(135deg);animation-duration:${duration}ms;animation-delay:0ms`;
      container.appendChild(star);

      schedule(() => star.remove(), duration);
    };

    const createComet = () => {
      const comet = document.createElement("div");
      comet.className = "comet";
      const top = -10 - Math.random() * 20;
      const left = Math.random() * 100;
      const right = Math.random() * -100;
      const width = 300 + Math.random() * 200;
      const duration = 5000 + Math.random() * 3000;
      comet.style.cssText = `right:${right}vw;top:${top}vh;left:${left}vw;transform:rotate(200deg);width:${width}px;animation-duration:${duration}ms;animation-delay:0ms`;
      container.appendChild(comet);

      schedule(() => comet.remove(), duration);
    };

    const spawnStars = () => {
      const starCount = Math.floor(Math.random() * 4);
      for (let i = 0; i < starCount; i++) {
        createStar();
      }
      const nextSpawnDelay = 1000 + Math.random() * 4000;
      schedule(spawnStars, nextSpawnDelay);
    };

    const spawnComet = () => {
      if (Math.random() < 0.2) {
        createComet();
      }
      const nextCometDelay = 5000 + Math.random() * 10000;
      schedule(spawnComet, nextCometDelay);
    };

    spawnStars();
    spawnComet();

    return () => {
      cancelAnimationFrame(moonRaf);
      timeoutIds.forEach(clearTimeout);
      timeoutIds.clear();
      container.innerHTML = "";
    };
  }, []);

  return starContainerRef;
};
