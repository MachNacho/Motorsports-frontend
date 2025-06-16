import { useEffect, useState } from "react";
import { GetDriverProfile } from "./Services/APIDriverProfile";
import type { DriverProfile } from "./Services/Interface/DriverProfile";

const DriverProfilePage: React.FC<{ driverId: string }> = ({ driverId }) => {
  const [driver, setDriver] = useState<DriverProfile | null>(null);

  useEffect(() => {
    const fetchDriverProfile = async (id: string): Promise<void> => {
      try {
        const data = await GetDriverProfile(driverId);
        setDriver(data);
      } catch (error) {
        console.error("Failed to fetch drivers:", error);
      }
    };
    fetchDriverProfile("");
  }, [driverId]);

  return (
    <div>
      <h2>
        {driver?.firstName} {driver?.lastName}
      </h2>
      <p>Nationality: {driver?.nationality.name}</p>
      <p>
        Date of Birth:{" "}
        {driver?.birthDate
          ? new Date(driver.birthDate).toLocaleDateString()
          : ""}
      </p>
      <p>Gender: {driver?.gender}</p>
      <p>Race Number: {driver?.raceNumber}</p>
      <p>Team: {driver?.team.teamName}</p>
    </div>
  );
};

export default DriverProfilePage;
