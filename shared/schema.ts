import { z } from "zod";

export const contactSchema = z.object({
  businessName: z.string().min(1),
  contact: z.string().min(1),
  hasWebsite: z.string().min(1),
  goal: z.string().min(1),
  values: z.string().min(1),
});

export type ContactFormData = z.infer<typeof contactSchema>;

export const subscriberSchema = z.object({
  email: z.string().email(),
});

export type SubscriberData = z.infer<typeof subscriberSchema>;
