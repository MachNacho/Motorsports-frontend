import axios from "axios";
import { GetDriverList } from "../../../API/endpointlist";

export const getAllDrivers = async (): Promise<any> => {
  const response = await axios.get(GetDriverList);
  return response.data;
};
