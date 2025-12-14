import { z } from "zod";

export const signInSchema = z.object({
  mode: z.literal("signIn"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export const signUpSchema = z.object({
  mode: z.literal("signUp"),
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export const forgotSchema = z.object({
  mode: z.literal("forgot"),
  email: z.string().email("Invalid email address"),
});

export const resetSchema = z.object({
  mode: z.literal("reset"),
  token: z.string().length(6, "Token must be 6 digits"),
  password: z.string().min(8, "New password must be at least 8 characters"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export const authSchemas = z.discriminatedUnion("mode", [
  signInSchema,
  signUpSchema,
  forgotSchema,
  resetSchema,
]);

export type SignInValues = z.infer<typeof signInSchema>;
export type SignUpValues = z.infer<typeof signUpSchema>;
export type ForgotValues = z.infer<typeof forgotSchema>;
export type ResetValues = z.infer<typeof resetSchema>;
export type AuthFormValues = z.infer<typeof authSchemas>;
