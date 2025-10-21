import type { NationalityDTO } from "../../types/Nationality/NationalityDTO";
import type { NationalityStatsDTO } from "../../types/Nationality/NationalityStatsDTO";
import { api } from "../apiClient";
import { NationalityEndpoints } from "../endpointlist";

export const nationalityService = {
  getAll: () => api.get<NationalityDTO[]>(NationalityEndpoints.getAll),
  getAllStats: () =>
    api.get<NationalityStatsDTO[]>(NationalityEndpoints.getStats),
};
