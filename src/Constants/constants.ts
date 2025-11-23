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
  teamId: "",
  raceLapsLed: "0",
  racePodiums: "0",
  raceWins: "0",
  racesParticipated: "0",
  careerPoints: "0",
  racePole: "0",
  championshipTitles: "0",
  description: "",
};

export const PAGE_SIZE = 6;
