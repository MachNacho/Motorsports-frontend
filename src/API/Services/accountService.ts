import type { UserLogin } from "../../types/Account/UserLogin";
import type { UserRegister } from "../../types/Account/UserRegister";
import { api } from "../apiClient";
import { AccountEndpoints } from "../endpointlist";
import { jwtDecode } from "jwt-decode";

export const accountService = {
  register: async (data: UserRegister) => {
    const userToken = await api.post<string>(AccountEndpoints.register, data);
    localStorage.removeItem("jwt");
    localStorage.setItem("jwt", userToken);
    const decodedUser = jwtDecode(userToken);
    return { token: userToken, user: decodedUser };
  },
  login: async (data: UserLogin) => {
    const userToken = await api.post<string>(AccountEndpoints.login, data);
    localStorage.removeItem("jwt");
    localStorage.setItem("jwt", userToken);
    const decodedUser = jwtDecode(userToken);
    return { token: userToken, user: decodedUser };
  },
  logout: () => {
    localStorage.removeItem("jwt");
  },
  getToken: () => localStorage.getItem("jwt"),
};
