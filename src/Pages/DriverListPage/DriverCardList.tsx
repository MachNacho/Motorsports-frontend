import { useEffect, useState } from "react";
import type { Driver } from "./Interfaces/Driver";
import { getAllDrivers } from "./Services/APIDriverList";

const DriverCardList: React.FC = () => {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  useEffect(() => {
    const fetchAllDrivers = async (): Promise<void> => {
      try {
        const data: Driver[] = await getAllDrivers();
        setDrivers(data);
      } catch (error) {
        console.error("Failed to fetch drivers:", error);
      }
    };

    fetchAllDrivers();
  }, []);
};
