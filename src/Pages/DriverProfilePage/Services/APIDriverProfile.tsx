import axios from "axios";
import { getdriverbyid } from "../../../API/endpointlist";
import type { Driverprofileinterface } from "./Interface/DriverProfile";

export const GetDriverProfile = async (
  e: string
): Promise<Driverprofileinterface> => {
  const response = await axios.get(getdriverbyid(e));
  return response.data;
};
