import type { TeamDTO } from "../../types/Team/TeamDTO";
import { api } from "../apiClient";
import { TeamEndpoints } from "../endpointlist";

export const teamService = {
  getAll: () => api.get<TeamDTO[]>(TeamEndpoints.getAll),
};
