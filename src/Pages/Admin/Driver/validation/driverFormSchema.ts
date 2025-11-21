import z from "zod";

export const driverFormSchema = z.object({
  firstname: z.string(),
  middleName: z.string(),
  lastname: z.string(),
  birthDate: z.iso.date(),
  nationalityId: z.string(),
  description: z.string(),
  gender: z.string(),
  raceNumber: z.string(),
  teamId: z.string(),
});
export type driverFormSchemaType = z.infer<typeof driverFormSchema>;
