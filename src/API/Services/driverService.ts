import type { driverFormSchemaType } from "../../Pages/Admin/Driver/validation/driverFormSchema";
import type { DriverDTO } from "../../types/Driver/DriverDTO";
import type { FullDriverDTO } from "../../types/Driver/FullDriverDTO";
import type { FullDriverTable } from "../../types/Driver/FullDriverTable";
import { api } from "../apiClient";
import { DriverEndpoints } from "../endpointlist";

export const driverService = {
  getAll: () => api.get<DriverDTO[]>(DriverEndpoints.getAll),
  getById: (id: string) => api.get<FullDriverDTO>(DriverEndpoints.getById(id)),
  AdminGetALL: () => api.get<FullDriverTable[]>(DriverEndpoints.adminGet),
  add: (data: driverFormSchemaType) => api.post(DriverEndpoints.add, data),
  put: (id: string, data: driverFormSchemaType) =>
    api.put(DriverEndpoints.updateById(id), data),
  delete: (id: string) => api.delete(DriverEndpoints.deleteById(id)),
};
