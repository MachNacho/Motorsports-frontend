import { z } from "zod";

export const driverAddFormSchema = z.object({
  driverFName: z.string().min(1, { message: "Required" }),
  driverLName: z.string(),
  driverMName: z.string(),
  driverGender: z.string(),
  driverNationality: z.string(),
  driverTeam: z.string(),
  driverDescription: z.string(),
});

export type DriverAddFormSchema = z.infer<typeof driverAddFormSchema>;
