"use client";
import React, { useState, useEffect } from "react";
import {
  ArrowRight,
  Mail,
  Lock,
  User,
  LogIn,
  UserPlus,
  Check,
  X,
  RotateCcw,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useMutation,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { AuthFormValues, authSchemas } from "@/lib/validation";
import { cn } from "@/lib/utils";
import Button from "../global/Button";
import InputField from "../global/InputField";
import PasswordStrengthMeter from "./password-strength";

const queryClient = new QueryClient();
//   if (!password) return null;

//   const strengthChecks = [
//     { label: "At least 8 characters", met: password.length >= 8 },
//     { label: "Contains a number", met: /\d/.test(password) },
//     {
//       label: "Contains a special character",
//       met: /[^A-Za-z0-9]/.test(password),
//     },
//     {
//       label: "Mixed case (upper & lower)",
//       met: /[a-z]/.test(password) && /[A-Z]/.test(password),
//     },
//   ];

//   const strengthScore = strengthChecks.filter((c) => c.met).length;

//   const getStrengthColor = (score: number) => {
//     if (score <= 1) return "bg-red-500";
//     if (score === 2) return "bg-orange-500";
//     if (score === 3) return "bg-yellow-500";
//     return "bg-green-500";
//   };

//   const getStrengthLabel = (score: number) => {
//     if (score <= 1) return "Weak";
//     if (score === 2) return "Fair";
//     if (score === 3) return "Good";
//     return "Strong";
//   };

//   return (
//     <div className="w-full space-y-2 mt-2 animate-in fade-in slide-in-from-top-2">
//       <div className="flex justify-between items-center mb-1">
//         <span className="text-xs text-neutral-400">Password Strength</span>
//         <span
//           className={cn(
//             "text-xs font-medium",
//             strengthScore <= 1
//               ? "text-red-400"
//               : strengthScore === 2
//               ? "text-orange-400"
//               : strengthScore === 3
//               ? "text-yellow-400"
//               : "text-green-400"
//           )}
//         >
//           {getStrengthLabel(strengthScore)}
//         </span>
//       </div>

//       <div className="flex gap-1 h-1 w-full">
//         {[1, 2, 3, 4].map((level) => (
//           <div
//             key={level}
//             className={cn(
//               "h-full flex-1 rounded-full transition-all duration-500",
//               level <= strengthScore
//                 ? getStrengthColor(strengthScore)
//                 : "bg-neutral-800"
//             )}
//           />
//         ))}
//       </div>

//       <div className="grid grid-cols-2 gap-1 mt-2">
//         {strengthChecks.map((check, idx) => (
//           <div key={idx} className="flex items-center gap-1.5">
//             {check.met ? (
//               <Check className="h-3 w-3 text-green-500" />
//             ) : (
//               <div className="h-1 w-1 rounded-full bg-neutral-600 ml-1 mr-1" />
//             )}
//             <span
//               className={cn(
//                 "text-[10px]",
//                 check.met ? "text-neutral-300" : "text-neutral-600"
//               )}
//             >
//               {check.label}
//             </span>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

const AuthForm: React.FC = () => {
  // Component manages its own state for the current flow
  const [mode, setMode] = useState<"signin" | "signup" | "forgot" | "reset">(
    "signup"
  );

  // Helper booleans
  const isSignUp = mode === "signup";
  const isSignIn = mode === "signin";
  const isForgot = mode === "forgot";
  const isReset = mode === "reset";

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<AuthFormValues>({
    resolver: async (values, ctx, options) => {
      return zodResolver(authSchemas)(values as any, ctx, options);
    },
    defaultValues: {},
  });

  // Watch password for strength meter (only if signing up or resetting)
  const passwordValue = watch("password");
  const showStrengthMeter = isSignUp || isReset;

  // Reset form when mode changes
  useEffect(() => {
    // Reset form data and errors when the mode switches
    reset();
  }, [mode, reset]);

  // 2. Initialize React Query Mutation
  const mutation = useMutation({
    mutationFn: async (data: AuthFormValues) => {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // NARROW TYPE BY MODE
      if (isForgot) {
        if (!("email" in data)) throw new Error("Email is required.");
        if (data.email.includes("error"))
          throw new Error("Email address not found.");
        return { success: true, mode: "forgot" };
      }

      if (isReset) {
        if (!("token" in data)) throw new Error("Token is required.");
        if (data.token === "000000")
          throw new Error("Invalid or expired token.");
        return { success: true, mode: "reset" };
      }

      if (isSignIn || isSignUp) {
        if (!("email" in data)) throw new Error("Email is required.");
        if (data.email.includes("error"))
          throw new Error("Invalid credentials or user already exists.");
        return { success: true, mode: "auth" };
      }

      return { success: false, mode: "auth" };
    },
    onSuccess: (result) => {
      if (result.mode === "forgot") {
        alert("Password reset link/token sent!");
        setMode("reset");
      } else if (result.mode === "reset") {
        alert("Password updated!");
        setMode("signin");
      } else {
        alert(`${isSignUp ? "Sign Up" : "Sign In"} Successful!`);
      }
    },
  });

  const onSubmit = (data: AuthFormValues) => {
    mutation.mutate(data);
  };

  // UI Configuration based on mode
  let title, subtitle, submitText, submitIcon;
  let mainAction: () => void = () => {};
  let mainActionLabel: string = "";
  let secondaryAction: () => void = () => {};
  let secondaryActionLabel: string = "";

  if (isSignUp) {
    title = "Create Your Account";
    subtitle = "Start building high-performing sites in seconds.";
    submitText = "Sign Up Now";
    submitIcon = UserPlus;
    mainAction = () => setMode("signin");
    mainActionLabel = "Sign In";
    secondaryAction = () => setMode("forgot");
    secondaryActionLabel = "Forgot Password?";
  } else if (isSignIn) {
    title = "Welcome Back";
    subtitle = "Log in to access your projects and CRM.";
    submitText = "Sign In";
    submitIcon = LogIn;
    mainAction = () => setMode("signup");
    mainActionLabel = "Sign Up";
    secondaryAction = () => setMode("forgot");
    secondaryActionLabel = "Forgot Password?";
  } else if (isForgot) {
    title = "Forgot Password";
    subtitle = "Enter your email to receive a password reset link/token.";
    submitText = "Send Reset Link";
    submitIcon = Mail;
    mainAction = () => setMode("signin");
    mainActionLabel = "Back to Sign In";
    secondaryAction = () => setMode("signup");
    secondaryActionLabel = "Create Account";
  } else if (isReset) {
    title = "Reset Password";
    subtitle = "Enter the 6-digit token and your new password.";
    submitText = "Reset Password";
    submitIcon = RotateCcw;
    mainAction = () => setMode("signin");
    mainActionLabel = "Back to Sign In";
    secondaryAction = () => setMode("forgot");
    secondaryActionLabel = "Resend Token";
  }

  return (
    <div
      id="auth-card"
      className="w-full max-w-md p-8 rounded-3xl border border-white/10 bg-neutral-900/50 shadow-2xl backdrop-blur-xl transition-all duration-500 relative group overflow-hidden"
    >
      <div className="absolute inset-0 bg-linear-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      <div className="relative z-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">{title}</h1>
          <p className="text-sm text-neutral-400">{subtitle}</p>
        </div>

        {mutation.isError && (
          <div className="mb-6 p-3 text-sm text-red-200 bg-red-900/20 border border-red-800/50 rounded-lg flex items-center">
            <span className="mr-2">⚠️</span>
            {mutation.error instanceof Error
              ? mutation.error.message
              : "An error occurred"}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Only show Name field during Sign Up */}
          {isSignUp && (
            <InputField
              icon={User}
              placeholder="Full Name"
              error={"name" in errors ? errors.name : undefined}
              {...register("name")}
            />
          )}

          {/* Email is required for Sign In, Sign Up, and Forgot Password */}
          {(isSignUp || isSignIn || isForgot) && (
            <InputField
              icon={Mail}
              type="email"
              placeholder="Email Address"
              error={"email" in errors ? errors.email : undefined}
              {...register("email")}
            />
          )}

          {/* Token is required for Reset Password */}
          {isReset && (
            <InputField
              icon={Lock}
              type="text"
              inputMode="numeric"
              placeholder="6-Digit Reset Token"
              maxLength={6}
              error={"token" in errors ? errors.token : undefined}
              {...register("token")}
            />
          )}

          {/* Password Fields for Sign In, Sign Up, and Reset */}
          {(isSignIn || isSignUp || isReset) && (
            <div className="space-y-1">
              <InputField
                icon={Lock}
                type="password"
                placeholder={isReset ? "New Password" : "Password"}
                error={"password" in errors ? errors.password : undefined}
                {...register("password")}
              />

              {/* Password Strength Meter - Only visible on Sign Up and Reset */}
              {showStrengthMeter && (
                <PasswordStrengthMeter password={passwordValue} />
              )}
            </div>
          )}

          {/* Confirm Password for Sign Up and Reset */}
          {(isSignUp || isReset) && (
            <InputField
              icon={Lock}
              type="password"
              placeholder="Confirm Password"
              error={
                "confirmPassword" in errors ? errors.confirmPassword : undefined
              }
              {...register("confirmPassword")}
            />
          )}

          <div className="pt-2">
            <Button
              type="submit"
              variant="premium"
              size="lg"
              isLoading={mutation.isPending}
              icon={submitIcon}
              className="w-full group/btn"
            >
              {submitText}{" "}
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
            </Button>
          </div>
        </form>

        <div className="mt-6 text-center text-sm">
          <p className="text-neutral-500">
            {isSignUp || isReset
              ? "Already have an account?"
              : "Don't have an account?"}{" "}
            <button
              type="button"
              onClick={mainAction}
              className="font-medium text-blue-400 hover:text-blue-300 transition-colors focus:outline-none"
              disabled={mutation.isPending}
            >
              {mainActionLabel}
            </button>
          </p>
          {secondaryAction && (
            <button
              type="button"
              onClick={secondaryAction}
              className="mt-2 text-xs text-neutral-600 hover:text-neutral-400 transition-colors focus:outline-none"
              disabled={mutation.isPending}
            >
              {secondaryActionLabel}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const movingDotsStyles: string = `
  @keyframes dot-pan {
    0% { background-position: 0 0; }
    100% { background-position: 128px 128px; }
  }
  @-webkit-keyframes dot-pan {
    0% { background-position: 0 0; }
    100% { background-position: 128px 128px; }
  }
`;

export default function AuthPage() {
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = document.getElementById("auth-card");
    if (card) {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty("--mouse-x", `${x}px`);
      card.style.setProperty("--mouse-y", `${y}px`);
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <div
        className="min-h-screen bg-black text-white font-sans selection:bg-blue-500/30 flex items-center justify-center p-4 overflow-hidden"
        onMouseMove={handleMouseMove}
      >
        <style>{movingDotsStyles}</style>

        {/* Background Layers */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-900/20 blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-900/10 blur-[120px]" />
          <div
            className="absolute inset-0 opacity-[0.15]"
            style={{
              backgroundImage: `radial-gradient(#ffffff 1px, transparent 1px)`,
              backgroundSize: "32px 32px",
              maskImage:
                "radial-gradient(ellipse at center, black 40%, transparent 70%)",
              WebkitMaskImage:
                "radial-gradient(ellipse at center, black 40%, transparent 70%)",
              animation: "dot-pan 30s linear infinite",
            }}
          />
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            }}
          />
        </div>

        {/* Content */}
        <div className="relative z-10 w-full flex flex-col items-center">
          <div className="flex items-center gap-2 mb-8 animate-in fade-in slide-in-from-top-4 duration-700">
            <div className="h-8 w-8 bg-linear-to-br from-white to-neutral-400 rounded-lg" />
            <span className="font-bold text-2xl tracking-tight">
              Web <span className="text-neutral-500">Ustad</span>
            </span>
          </div>
          <AuthForm />
        </div>
      </div>
    </QueryClientProvider>
  );
}
