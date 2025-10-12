import { api } from "../apiClient";
import { TeamEndpoints } from "../endpointlist";

export const teamService = {
  getAll: () => api.get(TeamEndpoints.getAll),
};
