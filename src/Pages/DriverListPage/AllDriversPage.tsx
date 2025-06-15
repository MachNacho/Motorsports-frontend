import type React from "react";
import { useEffect, useState } from "react";
import type { Driver } from "./Interfaces/Driver";
import { getAllDrivers } from "./Services/APIDriverList";
import css from "./Style/DriverListTableStyle.module.css";

const AllDriversPage: React.FC = () => {
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

  return (
    <div className={css.container}>
      <h1>List of Drivers</h1>
      <table className={css.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Birth Date</th>
            <th>Nationality</th>
            <th>Gender</th>
            <th>Race Number</th>
          </tr>
        </thead>
        <tbody>
          {drivers.length === 0 ? (
            <tr>
              <td colSpan={7}>No drivers found.</td>
            </tr>
          ) : (
            drivers.map((driver) => (
              <tr key={driver.id}>
                <td>{driver.id}</td>
                <td>{driver.firstName}</td>
                <td>{driver.lastName}</td>
                <td>{new Date(driver.birthDate).toLocaleDateString()}</td>
                <td>{driver.nationality}</td>
                <td>{driver.gender}</td>
                <td>{driver.raceNumber}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AllDriversPage;
