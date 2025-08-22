import { useEffect, useRef } from "react";

export const useShootingStars = () => {
  const starContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = starContainerRef.current;
    if (!container) return;

    const moon = document.createElement("div");
    moon.className = "moon";
    container.appendChild(moon);

    let angle = Math.random() * 2 * Math.PI;
    const radiusX = 20 + Math.random() * 30;
    const radiusY = 15 + Math.random() * 20;
    const speed = 0.001 + Math.random() * 0.002;
    const centerX = 50;
    const centerY = 50;

    const animateMoon = () => {
      angle += speed;
      const x = centerX + radiusX * Math.cos(angle);
      const y = centerY + radiusY * Math.sin(angle);
      moon.style.left = `${x}vw`;
      moon.style.top = `${y}vh`;
      requestAnimationFrame(animateMoon);
    };
    animateMoon();

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
      star.style.top = `${top}vh`;
      star.style.left = `${left}vw`;
      const angle = 135;
      star.style.transform = `rotate(${angle}deg)`;
      const duration = 2000 + Math.random() * 1000;
      star.style.animationDuration = `${duration}ms`;
      star.style.animationDelay = `0ms`;
      container.appendChild(star);

      setTimeout(() => {
        star.remove();
      }, duration);
    };

    const createComet = () => {
      const comet = document.createElement("div");
      comet.className = "comet";
      const top = -10 - Math.random() * 20;
      const left = Math.random() * 100;
      const right = Math.random() * -100;
      comet.style.right = `${right}vw`;
      comet.style.top = `${top}vh`;
      comet.style.left = `${left}vw`;
      const angle = 200;
      comet.style.transform = `rotate(${angle}deg)`;
      const width = 300 + Math.random() * 200;
      comet.style.width = `${width}px`;
      const duration = 5000 + Math.random() * 3000;
      comet.style.animationDuration = `${duration}ms`;
      comet.style.animationDelay = `0ms`;
      container.appendChild(comet);

      setTimeout(() => {
        comet.remove();
      }, duration);
    };

    const spawnStars = () => {
      const starCount = Math.floor(Math.random() * 4);
      for (let i = 0; i < starCount; i++) {
        createStar();
      }
      const nextSpawnDelay = 1000 + Math.random() * 4000;
      setTimeout(spawnStars, nextSpawnDelay);
    };

    const spawnComet = () => {
      if (Math.random() < 0.2) {
        createComet();
      }
      const nextCometDelay = 5000 + Math.random() * 10000;
      setTimeout(spawnComet, nextCometDelay);
    };

    spawnStars();
    spawnComet();

    return () => {
      container.innerHTML = "";
    };
  }, []);

  return starContainerRef;
};
