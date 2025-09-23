import axios from "axios";
import type { UserLogin } from "../Interfaces/UserLogin";
import { loginUserEndpoint } from "../../../API/endpointlist";
import type { UserReturn } from "../Interfaces/UserReturn";

export const UserLoginAPI = async (user: UserLogin): Promise<UserReturn> => {
  const response = await axios.post(loginUserEndpoint, user);
  if (response.status === 200) {
    return response.data;
  } else {
    throw new Error("Login failed");
  }
};
