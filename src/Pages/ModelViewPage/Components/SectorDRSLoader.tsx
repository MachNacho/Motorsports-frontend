import { Line } from "@react-three/drei";
import type { LineData } from "../Interface/LineData";
import React from "react";
import data from "../Json/trackData.json";

const SectorDRSLoader: React.FC = () => {
  return (
    <>
      {(data as LineData[]).map((line, index) => (
        <Line
          key={index}
          points={line.points}
          color={line.color}
          lineWidth={line.lineWidth}
          dashed={line.dashed}
          transparent
          worldUnits={true}
          visible={line.isvisble}
        />
      ))}
    </>
  );
};

export default SectorDRSLoader;
