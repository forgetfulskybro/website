const colorCache = new Map<string, string[]>();
export const extractColors = (imageSrc: string): Promise<string[]> => {
  if (colorCache.has(imageSrc)) {
    return Promise.resolve(colorCache.get(imageSrc)!);
  }

  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.src = imageSrc;

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) return resolve(["#5b65f04e"]);

      const maxSize = 100;
      const scale = Math.min(maxSize / img.width, maxSize / img.height);
      canvas.width = Math.floor(img.width * scale);
      canvas.height = Math.floor(img.height * scale);

      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      const colorMap = new Map<number, { count: number; vibrancy: number }>();

      let mostVibrantColor = 0;
      let maxVibrancy = 0;
      let mostUsedColor = 0;
      let maxCount = 0;

      for (let i = 0; i < data.length; i += 4 * 16) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        const a = data[i + 3];

        if (a < 50 || r + g + b < 30) continue;
        const vibrancy = calculateVibrancy(r, g, b);
        const colorKey = (r << 16) | (g << 8) | b;
        const existing = colorMap.get(colorKey);
        if (existing) {
          existing.count += 1;
        } else {
          colorMap.set(colorKey, { count: 1, vibrancy });
        }

        const currentEntry = colorMap.get(colorKey)!;
        if (vibrancy > maxVibrancy) {
          maxVibrancy = vibrancy;
          mostVibrantColor = colorKey;
        }

        if (currentEntry.count > maxCount) {
          maxCount = currentEntry.count;
          mostUsedColor = colorKey;
        }
      }

      const result: string[] = [];
      if (mostVibrantColor) {
        result.push(colorKeyToRgb(mostVibrantColor));
      }
      if (mostUsedColor && mostUsedColor !== mostVibrantColor) {
        result.push(colorKeyToRgb(mostUsedColor));
      }

      const finalResult = result.length ? result : ["#5b65f04e"];
      colorCache.set(imageSrc, finalResult);
      resolve(finalResult);
    };

    img.onerror = () => resolve(["#5b65f04e"]);
  });
};

const calculateVibrancy = (r: number, g: number, b: number): number => {
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const diff = max - min;
  const sum = max + min;

  if (max === 0) return 0;

  const saturation = diff / max;
  const lightness = sum / 510;
  return saturation * (1 - Math.abs(lightness - 0.5) * 2);
};

const colorKeyToRgb = (colorKey: number): string => {
  const r = (colorKey >> 16) & 0xff;
  const g = (colorKey >> 8) & 0xff;
  const b = colorKey & 0xff;
  return `rgb(${r},${g},${b})`;
};

export const clearColorCache = () => {
  if (colorCache.size > 100) {
    colorCache.clear();
  }
};
