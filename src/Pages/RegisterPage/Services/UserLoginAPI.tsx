import axios from "axios";
import type { UserLogin } from "../Interfaces/UserLogin";
import { loginUserEndpoint } from "../../../API/endpointlist";
import type { UserReturn } from "../Interfaces/UserReturn";
import { saveToken } from "../../../Services/TokenService";

export const UserLoginAPI = async (user: UserLogin): Promise<UserReturn> => {
  const response = await axios.post(loginUserEndpoint, user);
  if (response.status === 200) {
    saveToken(response.data.token); // Save the token to local storage
    return response.data;
  } else {
    throw new Error("Login failed");
  }
};
