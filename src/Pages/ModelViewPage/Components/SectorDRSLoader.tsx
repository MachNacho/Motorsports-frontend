import React from "react";
import { Line } from "@react-three/drei";
import type { LineData } from "../Interface/LineData";

// Import JSON data
import drsData from "../Json/drs.json";
import sector1Data from "../Json/sector1.json";
import sector2Data from "../Json/sector2.json";
import sector3Data from "../Json/sectorThree.json";

interface SectorDRSLoaderProps {
  visibility: {
    drs: boolean;
    sector1: boolean;
    sector2: boolean;
    sector3: boolean;
  };
}

const SectorDRSLoader: React.FC<SectorDRSLoaderProps> = ({ visibility }) => {
  // ✅ Safely cast JSON data using `as unknown as LineData`
  const lineGroups: { key: keyof typeof visibility; data: LineData }[] = [
    { key: "drs", data: drsData as unknown as LineData },
    { key: "sector1", data: sector1Data as unknown as LineData },
    { key: "sector2", data: sector2Data as unknown as LineData },
    { key: "sector3", data: sector3Data as unknown as LineData },
  ];

  return (
    <>
      {lineGroups.map(({ key, data }) => (
        <Line
          key={key}
          points={data.points as [number, number, number][]} // ✅ ensures correct tuple type
          color={data.color}
          lineWidth={data.lineWidth}
          dashed={data.dashed}
          transparent
          worldUnits
          visible={visibility[key] && (data.isvisble ?? true)} // ✅ handle optional visibility
        />
      ))}
    </>
  );
};

export default SectorDRSLoader;
