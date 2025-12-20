import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { AgencyValues } from "@/lib/validation";
import { prisma } from "@/lib/prisma";

export const createAgency = async (data: AgencyValues) => {
  const session = await getServerSession(authOptions);
  if (!session) {
    throw new Error("Not authenticated");
  }
  const agencyLogo="";
  const updatedData = { ...data, agencyLogo };
//   const agencyService = new AgencyService();
  const agency = await prisma.agency.create({ data: updatedData });
  return {success:true, data: agency};
};

// export const getAgency = async (id: string) => {
//   const session = await getServerSession(authOptions);
//   if (!session) {
//     throw new Error("Not authenticated");
//   }
//   const agencyService = new AgencyService();
//   const agency = await agencyService.getAgency(id);
//   return agency;
// };

// export const updateAgency = async (id: string, data: AgencyValues) => {
//   const session = await getServerSession(authOptions);
//   if (!session) {
//     throw new Error("Not authenticated");
//   }
//   const agencyService = new AgencyService();
//   const agency = await agencyService.updateAgency(id, data);
//   return agency;
// };

// export const deleteAgency = async (id: string) => {
//   const session = await getServerSession(authOptions);
//   if (!session) {
//     throw new Error("Not authenticated");
//   }
//   const agencyService = new AgencyService();
//   const agency = await agencyService.deleteAgency(id);
//   return agency;
// };