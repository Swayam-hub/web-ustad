
import AgencyForm from "@/components/forms/agency-form";

const page = () => {
  return (
    <div
      id="agency-card"
      className="glow-card relative w-full max-w-2xl rounded-3xl border border-white/10 bg-neutral-900/60 p-8 shadow-2xl backdrop-blur-xl"
    >
      <AgencyForm />
    </div>
  );
};

export default page;
