import type { UserLogin } from "../../types/Account/UserLogin";
import type { UserRegister } from "../../types/Account/UserRegister";
import type { UserReturn } from "../../types/Account/UserReturn";
import { api } from "../apiClient";
import { AccountEndpoints } from "../endpointlist";
import { jwtDecode } from "jwt-decode";

export const accountService = {
  register: async (data: UserRegister) => {
    const user = await api.post<UserReturn>(AccountEndpoints.register, data);
    localStorage.removeItem("jwt");
    localStorage.setItem("jwt", user.token);
    const decodedUser = jwtDecode(user.token);
    return { token: user.token, user: decodedUser };
  },
  login: async (data: UserLogin) => {
    const user = await api.post<UserReturn>(AccountEndpoints.login, data);
    localStorage.removeItem("jwt");
    localStorage.setItem("jwt", user.token);
    const decodedUser = jwtDecode(user.token);
    return { token: user.token, user: decodedUser };
  },
  logout: () => {
    localStorage.removeItem("jwt");
  },
  getToken: () => localStorage.getItem("jwt"),
};
