// Base URL
const BASE_URL = "https://localhost:7016";

// Generic helper to build endpoints safely
const buildEndpoint = (path: string): string => `${BASE_URL}${path}`;

// Driver endpoints
export const DriverEndpoints = {
  getAll: buildEndpoint("/api/Drivers"),
  add: buildEndpoint("/api/Drivers/add"),
  getById: (id: string) => buildEndpoint(`/api/Drivers/driver/${id}`),
  updateById: (id: string) => buildEndpoint(`/api/Drivers/update/${id}`),
  deleteById: (id: string) => buildEndpoint(`/api/Drivers/delete/${id}`),
};

// Team endpoints
export const TeamEndpoints = {
  getAll: buildEndpoint("/api/Teams"),
  add: buildEndpoint("/api/Teams/add"),
  getById: (id: string) => buildEndpoint(`/api/Teams/team/${id}`),
  updateById: (id: string) => buildEndpoint(`/api/Teams/update/${id}`),
  deleteById: (id: string) => buildEndpoint(`/api/Teams/delete/${id}`),
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
