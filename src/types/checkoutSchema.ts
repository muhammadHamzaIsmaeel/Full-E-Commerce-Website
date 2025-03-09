// src/schemas/checkoutSchema.ts
import { z } from "zod";

export const formSchema = z.object({
  fullName: z.string().min(2, "Full Name is too short").max(100),
  addressLine1: z.string().min(5, "Address Line 1 is too short"),
  addressLine2: z.string().optional(),
  city: z.string().min(2, "City is required"),
  province: z.string().min(2, "Province is required"),
  zipCode: z.string().regex(/^\d{5}(?:-\d{4})?$/, "Invalid Zip Code"),
  courierService: z.literal("leopard"),
  phoneNumber1: z.string().regex(/^\d{11}$/, "Invalid Phone Number"),
  phoneNumber2: z.string().regex(/^\d{11}$/, "Invalid Phone Number").optional(),
  emailAddress: z.string().email("Invalid email address"),
  additionalInformation: z.string().max(1000).optional(),
  paymentMethod: z.literal("cod"),
  landmark: z.string().optional(),
  addressType: z.enum(["home", "office"]),
});

export type FormSchemaType = z.infer<typeof formSchema>;