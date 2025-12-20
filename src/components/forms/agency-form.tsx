"use client";
import React, { useState, useCallback, useEffect } from "react";
import {
  Loader2,
  ArrowRight,
  Mail,
  Briefcase, // Agency Name
  Image, // Agency Logo/Upload
  Phone, // Company Phone
  MapPin, // Address
  Map, // City/State/Zip
  Globe, // Country
  Target, // Goal
  Upload, // Upload Icon
  Trash2,
} from "lucide-react";
import { useForm, FieldError } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  useMutation,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { AgencyValues } from "@/lib/validation";
import { cn } from "@/lib/utils";
import Button from "../global/Button";
import ToggleField from "../global/ToggleField";
import InputField from "../global/InputField";
import ImageUploader from "../global/ImageUploader";
import { useMutationData } from "@/hooks/useMutationData";
// import { createAgency } from "@/actions/agency.action";

interface AgencyCreationResponse {
  success: boolean;
  agency?: { id: string; name: string };
}

interface AgencyPayload extends AgencyValues {
  logoFilename: string | null;
  logoMimeType: string | null;
}
const createAgency = async (data: any) => {
  return data;
}
const AgencyForm: React.FC = () => {
  const { mutate, isPending, isError, error, isSuccess } = useMutationData(
    ["agency"],
    createAgency
  );
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<AgencyValues>({
    // resolver: zodResolver(agencySchema),
    mode: "onBlur",
    defaultValues: {
      name: "",
      companyEmail: "",
      companyPhone: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      country: "",
      goal: 5,
      whiteLabel: true,
    },
  });

  const whiteLabelValue = watch("whiteLabel");

  const onSubmit = (data: AgencyValues) => {
    // Optional: Perform check on logo file existence if it were mandatory
       mutate(data);
  };

  const title = "Setup Your Agency Profile";
  const subtitle =
    "Fill in the details to establish your main agency account and settings.";

  return (
    <div
      id="agency-card"
      className="w-full max-w-2xl p-8 rounded-3xl border border-white/10 bg-neutral-900/50 shadow-2xl backdrop-blur-xl transition-all duration-500 relative group overflow-hidden"
    >
      <div className="absolute inset-0 bg-linear-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      <div className="relative z-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">{title}</h1>
          <p className="text-sm text-neutral-400">{subtitle}</p>
        </div>

        {isError && (
          <div className="mb-6 p-3 text-sm text-red-200 bg-red-900/20 border border-red-800/50 rounded-lg flex items-center">
            <span className="mr-2">⚠️</span>
            {error instanceof Error
              ? error.message
              : "An unknown error occurred during submission."}
          </div>
        )}

        {isSuccess && (
          <div className="mb-6 p-3 text-sm text-green-200 bg-green-900/20 border border-green-800/50 rounded-lg flex items-center">
            <span className="mr-2">🎉</span>
            {/* {`Agency created successfully! Welcome aboard, ${data.agency.name}.`} */}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <InputField
            icon={Briefcase}
            placeholder="Agency Name (e.g., Digital Masters)"
            // label="Agency Name"
            error={errors.name}
            {...register("name")}
          />

          <ImageUploader
            file={logoFile}
            setFile={setLogoFile}
            isLoading={isPending}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
              icon={Mail}
              type="email"
              placeholder="contact@agency.com"
              //   label="Company Email"
              error={errors.companyEmail}
              {...register("companyEmail")}
            />
            <InputField
              icon={Phone}
              type="tel"
              placeholder="+1 555-123-4567"
              //   label="Company Phone"
              error={errors.companyPhone}
              {...register("companyPhone")}
            />
          </div>

          <InputField
            icon={MapPin}
            placeholder="123 Main Street"
            // label="Street Address"
            error={errors.address}
            {...register("address")}
          />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <InputField
              icon={Map}
              placeholder="City"
              //   label="City"
              error={errors.city}
              {...register("city")}
            />
            <InputField
              icon={Map}
              placeholder="State/Province"
              //   label="State"
              error={errors.state}
              {...register("state")}
            />
            <InputField
              icon={Map}
              placeholder="Zip Code"
              //   label="Zip"
              error={errors.zipCode}
              {...register("zipCode")}
            />
            <InputField
              icon={Globe}
              placeholder="Country"
              //   label="Country"
              error={errors.country}
              {...register("country")}
            />
          </div>
          {/* {data.id && ( */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
            <InputField
              icon={Target}
              type="number"
              placeholder="5"
              //   label="Monthly Client Goal (1-100)"
              error={errors.goal}
              //   description="The target number of new clients per month."
              {...register("goal", { valueAsNumber: true })}
            />

            <ToggleField
              label="White Label Branding"
              description="If checked, client dashboards will use your agency's branding."
              checked={whiteLabelValue}
              onChange={(checked) =>
                setValue("whiteLabel", checked, { shouldValidate: true })
              }
            />
          </div>
          {/* // )} */}
          <div className="pt-4">
            <Button
              type="submit"
              variant="premium"
              size="lg"
              isLoading={isPending}
              icon={Briefcase}
              className="w-full group/btn"
              disabled={isSuccess || isPending}
            >
              {isSuccess ? "Agency Created" : "Create Agency"}
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
            </Button>
          </div>
        </form>

        <div className="mt-6 text-center text-sm">
          <p className="text-neutral-500">
            *Note: File upload is simulated. The 'server' receives only the file
            name and type.
          </p>
        </div>
      </div>
    </div>
  );
};

// const movingDotsStyles: string = `
//   @keyframes dot-pan {
//     0% { background-position: 0 0; }
//     100% { background-position: 128px 128px; }
//   }
//   @-webkit-keyframes dot-pan {
//     0% { background-position: 0 0; }
//     100% { background-position: 128px 128px; }
//   }
// `;

// export default function AgencyFormComponent() {
//   const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
//     const card = document.getElementById("agency-card");
//     if (card) {
//       const rect = card.getBoundingClientRect();
//       const x = e.clientX - rect.left;
//       const y = e.clientY - rect.top;
//       card.style.setProperty("--mouse-x", `${x}px`);
//       card.style.setProperty("--mouse-y", `${y}px`);
//     }
//   };

//   return (
//     <div
//       className="min-h-screen bg-black text-white font-sans selection:bg-blue-500/30 flex items-center justify-center p-4 overflow-hidden"
//       onMouseMove={handleMouseMove}
//     >
//       <style>{movingDotsStyles}</style>

//       {/* Background Layers */}
//       <div className="fixed inset-0 z-0 pointer-events-none">
//         <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-900/20 blur-[120px]" />
//         <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-900/10 blur-[120px]" />
//         <div
//           className="absolute inset-0 opacity-[0.15]"
//           style={{
//             backgroundImage: `radial-gradient(#ffffff 1px, transparent 1px)`,
//             backgroundSize: "32px 32px",
//             maskImage:
//               "radial-gradient(ellipse at center, black 40%, transparent 70%)",
//             WebkitMaskImage:
//               "radial-gradient(ellipse at center, black 40%, transparent 70%)",
//             animation: "dot-pan 30s linear infinite",
//           }}
//         />
//         <div
//           className="absolute inset-0 opacity-[0.03]"
//           style={{
//             backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
//           }}
//         />
//       </div>

//       {/* Content */}
//       <div className="relative z-10 w-full flex flex-col items-center">
//         <div className="flex items-center gap-2 mb-8 animate-in fade-in slide-in-from-top-4 duration-700">
//           <div className="h-8 w-8 bg-linear-to-br from-white to-neutral-400 rounded-lg" />
//           <span className="font-bold text-2xl tracking-tight">
//             Agency <span className="text-neutral-500">Setup</span>
//           </span>
//         </div>

//         <AgencyForm />
//       </div>
//     </div>
//   );
// }

export default AgencyForm;
