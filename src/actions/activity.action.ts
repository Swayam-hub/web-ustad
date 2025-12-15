import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { connect } from "http2";
import { getServerSession } from "next-auth";

export const saveActivityLogs = async ({
  agencyId,
  description,
  subAccountId,
}: {
  agencyId?: string;
  description: string;
  subAccountId?: string;
}) => {
  const session = await getServerSession(authOptions);
  let userData;
  if (!session) {
    const response = await prisma.user.findFirst({
      where: {
        Agency: {
          SubAccount: {
            some: {
              id: subAccountId,
            },
          },
        },
      },
    });
    if (response) {
      userData = response;
    }
  } else {
    userData = await prisma.user.findUnique({
      where: { email: session.user?.email! },
    });
    if (!userData) {
      return { success: false, message: "User not found" };
    }
  }
  let foundAgencyId = agencyId;
  if (!foundAgencyId) {
    if (!subAccountId) {
      return { success: false, message: "Agency ID or SubAccount ID required" };
    }
    const response = await prisma.subAccount.findUnique({
      where: { id: subAccountId },
    });
    if (response) foundAgencyId = response.agencyId;
  }
  if (subAccountId) {
    await prisma.notification.create({
      data: {
        notification: `${userData?.name} performed an action: ${description}`,
        User: {
          connect: {
            id: userData?.id,
          },
        },
        Agency: {
          connect: {
            id: foundAgencyId,
          },
        },
        SubAccount: {
          connect: {
            id: subAccountId,
          },
        },
      },
    });
  } else {
    await prisma.notification.create({
      data: {
        notification: `${userData?.name} performed an action: ${description}`,
        User: {
          connect: {
            id: userData?.id,
          },
        },
        Agency: {
          connect: {
            id: foundAgencyId,
          },
        },
      },
    });
  }
};
