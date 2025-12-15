"use server";

import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { signUpSchema, AuthFormValues } from "@/lib/validation";
import bcrypt from "bcryptjs";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { saveActivityLogs } from "./activity.action";
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

      await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
          Agency: {
            create: {
              name: `${name}'s Agency`,
              agencyLogo: "https://example.com/logo.png",
              companyEmail: "agency@example.com",
            },
          },
        },
      });
      // return { success: true, message: "Account created successfully" };
    }
    // case "signIn": {
    //   const { email, password } = data;
    //   const user = await prisma.user.findUnique({ where: { email } });
    //   if (!user) return { success: false, message: "User not found" };
    //   const valid = bcrypt.compareSync(password, user.password);
    //   if (!valid) return { success: false, message: "Incorrect password" };
    //   return { success: true, message: "Logged in successfully" };
    // }
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

export const getAuthUserDetails = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return { success: false, message: "No active session" };
  }
  const user = await prisma.user.findUnique({
    where: { email: session.user?.email! },
    include: {
      Agency: {
        include: {
          // SidebarOption: true,
          SubAccount: true,
          // {
          //   include: {
          //     SidebarOption: true,
          //   },
          // },
        },
      },
      // Permissions:true,
    },
  });
  if (!user) return null;
  return {success:true, message:"User details fetched successfully", data:user};
};

export const createTeamUser = async (agencyId: string, user: any) => {
  if (user.role === "AGENCY_OWNER") return null;
  const response = await prisma.user.create({ data: { ...user } });
  return response;
};

export const verifyAndAcceptInvitation = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return redirect("/auth");
  }
  const invitationExists = await prisma.invitation.findUnique({
    where: { email: session.user?.email!, status: "PENDING" },
  });
  if (invitationExists) {
    const userDetails = await createTeamUser(invitationExists.agencyId, {
      email: invitationExists.email,
      agencyId: invitationExists.agencyId,
      image: session.user.image,
      name: `s${session.user.name}`,
      role: invitationExists.role,
      id: session.user.id,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    await saveActivityLogs({
      agencyId: invitationExists?.agencyId,
      description: `Accepted invitation to join agency.`,
      subAccountId: undefined,
    });
    if (userDetails) {
      // await prisma.users.update(user.id,{
      //   data:{ role:userDetails.role || 'SUBACCOUNT_USER', }
      // })
      await prisma.invitation.delete({
        where: {
          email: userDetails.email,
        },
      });
      return userDetails.agencyId;
    } else return null;
  } else {
    const agency = await prisma.user.findUnique({
      where: { email: session.user?.email! },
    });
    return agency?.agencyId || null;
  }
};
