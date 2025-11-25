import z from "zod";

export const driverFormSchema = z.object({
  firstname: z.string().min(1, "Need a first name"),
  middleName: z.string(),
  lastname: z.string().min(1, "Need a last name"),
  birthDate: z.iso.date(),
  nationalityId: z.string().min(1, "Need a nation"),
  description: z.string(),
  gender: z.string(),
  raceNumber: z.string(),
  teamId: z.string(),
  racesParticipated: z
    .union([z.string(), z.number()])
    .transform((val) => String(val))
    .refine((val) => val.trim()),
  racePodiums: z
    .union([z.string(), z.number()])
    .transform((val) => String(val))
    .refine((val) => val.trim()),
  raceWins: z
    .union([z.string(), z.number()])
    .transform((val) => String(val))
    .refine((val) => val.trim()),
  championshipTitles: z
    .union([z.string(), z.number()])
    .transform((val) => String(val))
    .refine((val) => val.trim()),
  racePole: z
    .union([z.string(), z.number()])
    .transform((val) => String(val))
    .refine((val) => val.trim()),
  careerPoints: z
    .union([z.string(), z.number()])
    .transform((val) => String(val))
    .refine((val) => val.trim()),
  raceLapsLed: z
    .union([z.string(), z.number()])
    .transform((val) => String(val))
    .refine((val) => val.trim()),
});
export type driverFormSchemaType = z.infer<typeof driverFormSchema>;
