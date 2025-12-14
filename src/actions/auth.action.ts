"use server";

import { prisma } from "@/lib/prisma";
import { signUpSchema, AuthFormValues } from "@/lib/validation";
import bcrypt from "bcryptjs";
export async function authAction(data: AuthFormValues) {
  switch (data.mode) {
    case "signUp": {
      const parsed = signUpSchema.safeParse(data);
      if (!parsed.success) {
        const fieldErrors: Record<string, string[]> = {};
        parsed.error.issues.forEach((issue) => {
          const path = issue.path[0] as string;
          if (!fieldErrors[path]) fieldErrors[path] = [];
          fieldErrors[path].push(issue.message);
        });
        return { success: false, fieldErrors };
      }

      const { name, email, password } = parsed.data;

      const existing = await prisma.user.findUnique({ where: { email } });
      if (existing) {
        return { success: false, message: "Email already registered" };
      }
      const hashedPassword = bcrypt.hashSync(password, 10);

      await prisma.user.create({ data: { name, email, password: hashedPassword } });
      return { success: true, message: "Account created successfully" };
    }
    case "signIn": {
      const { email, password } = data;
      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) return { success: false, message: "User not found" };
      const valid = bcrypt.compareSync(password, user.password);
      if (!valid) return { success: false, message: "Incorrect password" };
      return { success: true, message: "Logged in successfully" };
    }
    case "forgot": {
      const { email } = data;
      return { success: true, message: "Reset email sent" };
    }
    case "reset": {
      const { token, password } = data;
      return { success: true, message: "Password reset successfully" };
    }
    default:
      return { success: false, message: "Invalid operation" };
  }
}
