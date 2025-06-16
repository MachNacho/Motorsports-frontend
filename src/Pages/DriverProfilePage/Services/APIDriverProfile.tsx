import axios from "axios";
import { getdriverbyid } from "../../../API/endpointlist";

export const GetDriverProfile = async (e: string): Promise<any> => {
  const response = await axios.get(getdriverbyid(e));
  return response.data;
};
