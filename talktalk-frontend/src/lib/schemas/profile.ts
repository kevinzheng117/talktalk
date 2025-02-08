import * as z from "zod";

export const profileFormSchema = z.object({
  displayName: z
    .string()
    .min(2, {
      message: "Display name must be at least 2 characters.",
    })
    .max(30, {
      message: "Display name must not be longer than 30 characters.",
    }),
  bio: z.string().max(160, {
    message: "Bio must not be longer than 160 characters.",
  }),
  targetLanguage: z.string().nonempty({
    message: "Please select a language to learn.",
  }),
  proficiencyLevels: z.record(z.string()),
  learningIntensity: z.number().min(1).max(7),
  interests: z.string().nonempty({
    message: "Please select an interest.",
  }),
});

export type ProfileFormData = z.infer<typeof profileFormSchema>;
