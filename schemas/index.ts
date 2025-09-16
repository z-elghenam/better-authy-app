import * as z from "zod";

export const loginSchema = z.object({
  email: z.email({ message: "Email address is required" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" }),
});

export const registerSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required",
  }),
  email: z.email({
    message: "Email address is required",
  }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" }),
});

export const emailSchema = z.object({
  email: z.email({
    message: "Email adress is required",
  }),
});
