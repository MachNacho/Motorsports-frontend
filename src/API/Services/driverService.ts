import type { DriverDTO } from "../../types/Driver/DriverDTO";
import type { FullDriverDTO } from "../../types/Driver/FullDriverDTO";
import type { UploadOrAddDriverDTO } from "../../types/Driver/UploadOrAddDriverDTO";
import { api } from "../apiClient";
import { DriverEndpoints } from "../endpointlist";

export const driverService = {
  getAll: () => api.get<DriverDTO[]>(DriverEndpoints.getAll),
  getById: (id: string) => api.get<FullDriverDTO>(DriverEndpoints.getById(id)),
  add: (data: UploadOrAddDriverDTO) => api.post(DriverEndpoints.add, data),
  put: (id: string, data: UploadOrAddDriverDTO) =>
    api.put(DriverEndpoints.updateById(id), data),
  delete: (id: string) => api.delete(DriverEndpoints.deleteById(id)),
};
