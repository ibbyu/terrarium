import { z } from "zod";

export const createNewModSchema = z.object({
  name: z.string({ errorMap: (issue, ctx) => ({ message: 'Please enter a name' })}).min(3, { message: "Name must be longer than 3 characters"}),
  summary: z.string()
});