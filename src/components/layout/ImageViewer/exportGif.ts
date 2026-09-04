import { GIF_BASE_MS } from "./utils";

type GIFEncoderInstance = {
  writeFrame: (
    index: Uint8Array,
    w: number,
    h: number,
    opts?: { palette: number[][]; delay: number }
  ) => void;
  finish: () => void;
  bytes: () => Uint8Array;
};

type GIFEncoderFactory = (opts?: object) => GIFEncoderInstance;

/**
 * Client-side GIF export from still image URLs.
 * Uses gifenc from unpkg at runtime. Images must allow CORS.
 */
export async function exportGif(options: {
  stillImages: string[];
  gifSpeed: number;
  title: string;
}): Promise<void> {
  const { stillImages, gifSpeed, title } = options;
  if (stillImages.length < 2) return;

  const gifencMod = await import(
    /* webpackIgnore: true */
    // @ts-ignore remote
    "https://unpkg.com/gifenc@1.0.3/dist/gifenc.esm.js"
  );

  const GIFEncoder = (gifencMod.GIFEncoder ||
    gifencMod.default) as GIFEncoderFactory;
  const quantize = gifencMod.quantize as (
    data: Uint8ClampedArray,
    maxColors: number
  ) => number[][];
  const applyPalette = gifencMod.applyPalette as (
    data: Uint8ClampedArray,
    palette: number[][]
  ) => Uint8Array;

  const loadBitmap = (src: string) =>
    new Promise<ImageBitmap>((resolve, reject) => {
      const img = new window.Image();
      img.crossOrigin = "anonymous";
      img.onload = async () => {
        try {
          resolve(await createImageBitmap(img));
        } catch (e) {
          reject(e);
        }
      };
      img.onerror = () => reject(new Error(`Failed to load: ${src}`));
      img.src = src;
    });

  const bitmaps = await Promise.all(stillImages.map(loadBitmap));

  const maxDim = 720;
  let outW = 0;
  let outH = 0;
  for (const bmp of bitmaps) {
    outW = Math.max(outW, bmp.width);
    outH = Math.max(outH, bmp.height);
  }
  const scale = Math.min(1, maxDim / Math.max(outW, outH, 1));
  outW = Math.max(1, Math.round(outW * scale));
  outH = Math.max(1, Math.round(outH * scale));

  const canvas = document.createElement("canvas");
  canvas.width = outW;
  canvas.height = outH;
  const ctx = canvas.getContext("2d", { willReadFrequently: true })!;
  const intervalMs = Math.max(120, Math.round(GIF_BASE_MS / gifSpeed));
  const fadeMs = Math.min(Math.round(intervalMs * 0.4), 700);
  const fadeSteps = Math.max(5, Math.round(fadeMs / 50));
  const stepMs = Math.max(40, Math.round(fadeMs / fadeSteps));
  const holdMs = Math.max(100, intervalMs - fadeMs);

  const drawContain = (bmp: ImageBitmap) => {
    const s = Math.min(outW / bmp.width, outH / bmp.height);
    const dw = bmp.width * s;
    const dh = bmp.height * s;
    ctx.drawImage(bmp, (outW - dw) / 2, (outH - dh) / 2, dw, dh);
  };

  const gif = GIFEncoder();

  const writeFrame = (delay: number) => {
    const { data } = ctx.getImageData(0, 0, outW, outH);
    const palette = quantize(data, 256);
    const index = applyPalette(data, palette);
    gif.writeFrame(index, outW, outH, { palette, delay });
  };

  const n = stillImages.length;
  const order = Array.from({ length: n }, (_, i) => (n - 1 - i + n) % n);

  for (let oi = 0; oi < n; oi++) {
    const curr = bitmaps[order[oi]];
    const prev = bitmaps[order[(oi - 1 + n) % n]];
    for (let step = 1; step <= fadeSteps; step++) {
      const t = step / fadeSteps;
      ctx.globalAlpha = 1;
      ctx.fillStyle = "#0a0a0a";
      ctx.fillRect(0, 0, outW, outH);

      ctx.globalAlpha = 1 - t;
      drawContain(prev);
      ctx.globalAlpha = t;
      drawContain(curr);
      ctx.globalAlpha = 1;

      writeFrame(stepMs);
    }

    ctx.fillStyle = "#0a0a0a";
    ctx.fillRect(0, 0, outW, outH);
    drawContain(curr);
    writeFrame(holdMs);
  }

  gif.finish();
  const bytes = gif.bytes();
  const blob = new Blob([bytes], { type: "image/gif" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = `${title || "animation"}-${gifSpeed.toFixed(1)}x.gif`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1500);

  bitmaps.forEach((b) => b.close());
}