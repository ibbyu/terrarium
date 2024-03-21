import { z } from "zod";

export const createNewModSchema = z.object({
  name: z.string({ errorMap: (issue, ctx) => ({ message: 'Please enter a name' })}).min(3, { message: "Name must be longer than 3 characters"}),
  summary: z.string()
});

export const updateModSummarySchema = z.object({
  summary: z.string().min(1, { message: "Summary required"})
});

export const updateDescriptionSchema = z.object({
  description: z.string()
});

export const updateModSideSchema = z.object({
  side: z.enum([
    "Client",
    "Server",
    "Client and Server",
    "NoSync",
  ])
});

