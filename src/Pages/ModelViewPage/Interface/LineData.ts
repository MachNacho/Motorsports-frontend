export interface LineData {
  name: string;
  points: [number, number, number][];
  color: string;
  lineWidth: number;
  dashed?: boolean;
  isvisble?: boolean;
}
