import type { FullTrackDTO } from "../../types/Tracks/FullTrackDTO";
import type { TrackDTO } from "../../types/Tracks/TrackDTO";
import { api } from "../apiClient";
import { TrackEndpoints } from "../endpointlist";

export const trackService = {
  getAll: () => api.get<TrackDTO[]>(TrackEndpoints.regular),
  getById: (id: string) =>
    api.get<FullTrackDTO>(TrackEndpoints.regularById(id)),
};
