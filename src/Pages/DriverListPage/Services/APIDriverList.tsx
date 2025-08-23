import axios from "axios";
import { GetDriverList, GetNationalityList } from "../../../API/endpointlist";
import type { Driver } from "../Interfaces/Driver";
import type { Nations } from "../Interfaces/Nations";

export const getAllDrivers = async (): Promise<Driver[]> => {
  const response = await axios.get(GetDriverList);
  return response.data;
};

export const getNationalities = async (): Promise<Nations[]> => {
  const response = await axios.get(GetNationalityList);
  return response.data;
};
