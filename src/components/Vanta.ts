import { Vanta } from "@vanta-dev/node";

const apiKey = process.env.VANTA;

function disabledVanta(): Vanta {
  const noop = () => Promise.resolve();
  return {
    track: noop,
    identify: noop,
    group: noop,
    groupBy: noop,
    measure: noop,
    increment: noop,
    decrement: noop,
    error: noop,
    shutdown: () => Promise.resolve(),
  } as unknown as Vanta;
}

export const vanta = apiKey
  ? new Vanta({
      apiKey,
      onDeliveryError: (error) => {
        console.error(error, "Failed to deliver events to Vanta");
      },
    })
  : disabledVanta();

if (!apiKey) {
  console.log(
    "VANTA is not set; Vanta event tracking is disabled",
  );
}

export function reportError(error: unknown): void {
  void vanta.error(error instanceof Error ? error : String(error));
}

export async function flushVanta(): Promise<void> {
  await (vanta as unknown as { flush: () => Promise<boolean> }).flush();
}