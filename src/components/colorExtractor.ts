export const extractColors = (imageSrc: string): Promise<string[]> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.src = imageSrc;

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) return resolve(["#36393f"]);

      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      const colorMap: Record<string, { count: number; vibrancy: number }> = {};

      let mostVibrantColor = "";
      let maxVibrancy = 0;
      let mostUsedColor = "";
      let maxCount = 0;

      for (let i = 0; i < data.length; i += 4 * 50) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        const a = data[i + 3];

        // Skip transparent or near-transparent pixels and very dark colors
        if (a < 50 || r + g + b < 30) continue;

        // Calculate vibrancy using HSL (saturation * lightness)
        const [h, s, l] = rgbToHsl(r, g, b);
        const vibrancy = s * l;

        const color = `rgb(${r},${g},${b})`;
        if (!colorMap[color]) {
          colorMap[color] = { count: 0, vibrancy };
        }
        colorMap[color].count += 1;

        // Track most vibrant color
        if (vibrancy > maxVibrancy) {
          maxVibrancy = vibrancy;
          mostVibrantColor = color;
        }

        // Track most used color
        if (colorMap[color].count > maxCount) {
          maxCount = colorMap[color].count;
          mostUsedColor = color;
        }
      }

      // Return most vibrant and most used colors (deduplicate if same)
      const result =
        mostVibrantColor === mostUsedColor
          ? [mostVibrantColor]
          : [mostVibrantColor, mostUsedColor].filter(Boolean);

      resolve(result.length ? result : ["#36393f"]);
    };

    img.onerror = () => resolve(["#36393f"]);
  });
};

// Helper function to convert RGB to HSL
const rgbToHsl = (
  r: number,
  g: number,
  b: number
): [number, number, number] => {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0,
    s = 0,
    l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  return [h, s, l];
};
