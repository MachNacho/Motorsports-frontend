import type { NationalityDTO } from "../../types/Nationality/NationalityDTO";
import { api } from "../apiClient";
import { NationalityEndpoints } from "../endpointlist";

export const nationalityService = {
  getAll: () => api.get<NationalityDTO[]>(NationalityEndpoints.getAll),
};
