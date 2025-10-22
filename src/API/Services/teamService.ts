import type { FullTeamDTO } from "../../types/Team/FullTeamDTO";
import type { TeamDTO } from "../../types/Team/TeamDTO";
import { api } from "../apiClient";
import { TeamEndpoints } from "../endpointlist";

export const teamService = {
  getAll: () => api.get<TeamDTO[]>(TeamEndpoints.getAll),
  getById: (id: string) => api.get<FullTeamDTO>(TeamEndpoints.getById(id)),
};
