import { z } from "zod";

export const registrationSchema = z.object({
  isSociety: z.boolean().default(false),
  societyName: z.string().optional(),
  name: z.string().min(2, { message: "Le nom doit contenir au moins 2 caractères" }),
  arabicName: z
    .string()
    .regex(/^[\u0600-\u06FF\s]+$/, { message: "Le nom doit contenir uniquement des lettres arabes" }),
  address: z.string().min(5, { message: "L'adresse doit contenir au moins 5 caractères" }),
  dateOfBirth: z.string().refine((value) => !isNaN(Date.parse(value)), {
    message: "Date de naissance invalide",
  }),
  phoneNumber: z.string().regex(/^\+?[0-9]{10,14}$/, { message: "Numéro de téléphone invalide" }),
  activityType: z.enum(["Transport de passagers", "Transport de marchandises"]),
  nin: z
    .string()
    .regex(/^\d{18}$/, { message: "Le NIN doit contenir exactement 18 chiffres" }),
  transporterNumber: z.string().min(5, { message: "Numéro d'enregistrement invalide" }),
});