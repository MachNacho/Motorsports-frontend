/**
 * Extracts the track length in km, divides the 300 with it ,
 * and returns expected laps.
 */
export function calculateTrackUnits(input: string, name: string): number {
  const maxLength = name != "Circuit de Monaco " ? 305 : 260;
  const match = input.match(/([\d.]+)\s*km/);

  if (!match) return 0;

  const km = parseFloat(match[1]);

  const units = Math.round(maxLength / km);

  return units;
}
