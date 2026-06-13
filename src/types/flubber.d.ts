declare module "flubber" {
  export function interpolate(
    from: string,
    to: string,
    opts?: { maxSegmentLength?: number; string?: boolean },
  ): (t: number) => string;
}
