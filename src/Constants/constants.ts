import type { driverFormSchemaType } from "../Pages/Admin/Driver/validation/driverFormSchema";

export const GENDER_OPTIONS = ["Male", "Female", "Other"] as const;

export const EMPTY_DRIVER_DEFAULTS: driverFormSchemaType = {
  firstname: "",
  middleName: "",
  lastname: "",
  birthDate: "",
  nationalityId: "",
  raceNumber: "0",
  gender: "",
  imageURL: "",
  teamId: "",
};
