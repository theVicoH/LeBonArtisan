import { z } from "zod"

export const productSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Name is required"),
  type: z.string().min(1, "Type is required"),
  price: z.number().min(1, "Price must be at least 1"),
  rating: z.number().min(1).max(5, "Rating must be between 1 and 5"),
  warrantyYears: z.number().min(0, "Warranty must be at least 0 years"),
  available: z.boolean(),
})

export type Product = z.infer<typeof productSchema>
