// Base URL
const BASE_URL = "https://localhost:7016";

// Generic helper to build endpoints safely
const buildEndpoint = (path: string): string => `${BASE_URL}${path}`;

// Driver endpoints
export const DriverEndpoints = {
  getAll: buildEndpoint("/api/Drivers"),
  add: buildEndpoint("/api/Drivers"),
  adminGet: buildEndpoint("/api/Drivers/Admin/Table"),
  getById: (id: string) => buildEndpoint(`/api/Drivers/${id}`),
  updateById: (id: string) => buildEndpoint(`/api/Drivers/${id}`),
  deleteById: (id: string) => buildEndpoint(`/api/Drivers/${id}`),
};

// Team endpoints
export const TeamEndpoints = {
  getAll: buildEndpoint("/api/Teams"),
  add: buildEndpoint("/api/Teams/add"),
  getById: (id: string) => buildEndpoint(`/api/Teams/team/${id}`),
  updateById: (id: string) => buildEndpoint(`/api/Teams/update/${id}`),
  deleteById: (id: string) => buildEndpoint(`/api/Teams/delete/${id}`),
  getOptions: buildEndpoint("/api/Teams/Select/Items"),
};

// Nationality endpoints
export const NationalityEndpoints = {
  getAll: buildEndpoint("/api/Nationality"),
  getStats: buildEndpoint("/api/Nationality/stats"),
};

// Account endpoints
export const AccountEndpoints = {
  login: buildEndpoint("/api/Account/Login"),
  register: buildEndpoint("/api/Account/Register"),
};

export const TrackEndpoints = {
  regular: buildEndpoint("/api/Track"),
  regularById: (id: string) => buildEndpoint(`/api/Track/${id}`),
};
