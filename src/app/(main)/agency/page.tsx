import {
  getAuthUserDetails,
  verifyAndAcceptInvitation,
} from "@/actions/auth.action";
// import AgencyFormComponent from "@/components/forms/agency-form";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
const Page = async ({
  searchParams,
}: {
  searchParams: { plan: any; state: string; code: string };
}) => {
  const agencyId = await verifyAndAcceptInvitation();
  const user = await getAuthUserDetails();
  console.log(user);

  if (agencyId) {
    // if (user?.data?.role === "SUBACCOUNT_USER" || user?.data?.role === "SUBACCOUNT_GUEST") {
    //   return redirect("/subaccount");
    // }
    if (
      user?.data?.role === "AGENCY_OWNER" ||
      user?.data?.role === "AGENCY_ADMIN"
    ) {
      if (searchParams.plan) {
        return redirect(
          `/agency/${agencyId}/billing?plan=${searchParams.plan}`
        );
      }
      if (searchParams.state) {
        const statePath = searchParams.state.split("___")[0];
        const stateAgencyId = searchParams.state.split("___")[1];
        if (!stateAgencyId) return <div>Invalid state</div>;
        return redirect(
          `/agency/${stateAgencyId}/${statePath}?code=${searchParams.code}`
        );
      } else return redirect(`/agency/${agencyId}`);
    } else {
      return <div>Not Authorized</div>;
    }
  }
  const session = await getServerSession(authOptions);

  if (!session) {
    return redirect("/agency/auth");
  }
  // return <AgencyFormComponent  />;
};

export default Page;
