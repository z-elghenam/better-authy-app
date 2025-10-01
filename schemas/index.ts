import * as z from "zod";

export const updateProfileSchema = z
  .object({
    name: z
      .string()
      .min(2, { message: "Name must be at least 2 characters long" })
      .max(50, { message: "Name must be less than 50 characters" })
      .regex(/^[a-zA-Z\s]*$/, {
        message: "Name can only contain letters and spaces",
      })
      .optional()
      .or(z.literal("")), // Allow empty string
    image: z
      .union([z.instanceof(File), z.undefined(), z.null()])
      .refine((file) => !file || file.size <= 2 * 1024 * 1024, {
        message: "Profile image must be less than 2MB",
      })
      .refine(
        (file) =>
          !file || (file instanceof File && file.type.startsWith("image/")),
        {
          message: "File must be an image",
        }
      )
      .optional(),
  })
  .refine((data) => data.name?.trim() || data.image, {
    message: "At least one field (name or profile image) must be provided",
  });

// Type inference
export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;

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

export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" }),
    confirmPassword: z.string().min(8, {
      message: "Confirm password must be at least 8 characters long",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"], // error will appear under confirmPassword
    message: "Passwords do not match",
  });

export type ResetPasswordValues = z.infer<typeof resetPasswordSchema>;
