"use client";
import React, { useState, useEffect } from "react";
import {
  ArrowRight,
  Mail,
  Lock,
  User,
  LogIn,
  UserPlus,
  RotateCcw,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthFormValues, authSchemas } from "@/lib/validation";
import Button from "../global/Button";
import InputField from "../global/InputField";
import PasswordStrengthMeter from "./password-strength";
import { useMutationData } from "@/hooks/useMutationData";
import { authAction } from "@/actions/auth.action";
import { toast } from "sonner";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
type AuthMode = "signIn" | "signUp" | "forgot" | "reset";
const AuthForm = () => {
  const router = useRouter();
const [mode, setMode] = useState<AuthMode>("signUp");
  const isSignUp = mode === "signUp";
  const isSignIn = mode === "signIn";
  const isForgot = mode === "forgot";
  const isReset = mode === "reset";
  const { mutate, isPending, isError, error } = useMutationData(
    ["auth"],
    authAction
  );
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<AuthFormValues>({
    resolver: async (values, ctx, options) => {
      return zodResolver(authSchemas)(values as any, ctx, options);
    },
    defaultValues: {
      mode: "signIn",
      email: "",
      password: "",
    },
  });

  const passwordValue = watch("password");
  const showStrengthMeter = isSignUp || isReset;

useEffect(() => {
  if (mode === "signIn") {
    reset({
      mode,
      email: "",
      password: "",
    });
  }

  if (mode === "signUp") {
    reset({
      mode,
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  }

  if (mode === "forgot") {
    reset({
      mode,
      email: "",
    });
  }

  if (mode === "reset") {
    reset({
      mode,
      token: "",
      password: "",
      confirmPassword: "",
    });
  }
}, [mode, reset]);

useEffect(() => {
  setValue("mode", mode);
}, [mode, setValue]);

const onSubmit = async (data: AuthFormValues) => {
  try {
    if (data.mode === "signIn") {
      const res = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (res?.error) {
        toast.error(res.error || "Invalid email or password");
        return;
      }
      toast.success("Logged in successfully");
      router.push("/");
      return;
    }
    mutate(data, {
      onSuccess: async (res) => {
        if (res.success) {
          toast.success(res.message || "Success");
          if (data.mode === "signUp") {
            const loginRes = await signIn("credentials", {
              email: data.email,
              password: data.password,
              redirect: false,
            });

            if (loginRes?.error) {
              toast.error("Signup succeeded, but auto-login failed.");
              return;
            }

            toast.success("Logged in successfully");
            router.push("/dashboard");
          }
        } else if (res.fieldErrors) {
          Object.values(res.fieldErrors).flat().forEach((msg) => {
            toast.error(msg);
          });
        } else {
          toast.error(res.message || "Something went wrong");
        }
      },
      onError: () => {
        toast.error("Network error. Please try again.");
      },
    });
  } catch (err) {
    toast.error("Unexpected error occurred");
    console.error(err);
  }
};


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
    mainAction = () => setMode("signIn");
    mainActionLabel = "Sign In";
    secondaryAction = () => setMode("forgot");
    secondaryActionLabel = "Forgot Password?";
  } else if (isSignIn) {
    title = "Welcome Back";
    subtitle = "Log in to access your projects and CRM.";
    submitText = "Sign In";
    submitIcon = LogIn;
    mainAction = () => setMode("signUp");
    mainActionLabel = "Sign Up";
    secondaryAction = () => setMode("forgot");
    secondaryActionLabel = "Forgot Password?";
  } else if (isForgot) {
    title = "Forgot Password";
    subtitle = "Enter your email to receive a password reset link/token.";
    submitText = "Send Reset Link";
    submitIcon = Mail;
    mainAction = () => setMode("signIn");
    mainActionLabel = "Back to Sign In";
    secondaryAction = () => setMode("signUp");
    secondaryActionLabel = "Create Account";
  } else if (isReset) {
    title = "Reset Password";
    subtitle = "Enter the 6-digit token and your new password.";
    submitText = "Reset Password";
    submitIcon = RotateCcw;
    mainAction = () => setMode("signIn");
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

        {isError && (
          <div className="mb-6 p-3 text-sm text-red-200 bg-red-900/20 border border-red-800/50 rounded-lg flex items-center">
            <span className="mr-2">⚠️</span>
            {error instanceof Error ? error.message : "An error occurred"}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input type="hidden" {...register("mode")} />
          {isSignUp && (
            <InputField
              icon={User}
              placeholder="Full Name"
              error={"name" in errors ? errors.name : undefined}
              {...register("name")}
            />
          )}

          {(isSignUp || isSignIn || isForgot) && (
            <InputField
              icon={Mail}
              type="email"
              placeholder="Email Address"
              error={"email" in errors ? errors.email : undefined}
              {...register("email")}
            />
          )}

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

          {(isSignIn || isSignUp || isReset) && (
            <div className="space-y-1">
              <InputField
                icon={Lock}
                type="password"
                placeholder={isReset ? "New Password" : "Password"}
                error={"password" in errors ? errors.password : undefined}
                {...register("password")}
              />

              {showStrengthMeter && (
                <PasswordStrengthMeter password={passwordValue} />
              )}
            </div>
          )}

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
              isLoading={isPending}
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
              disabled={isPending}
            >
              {mainActionLabel}
            </button>
          </p>
          {secondaryAction && (
            <button
              type="button"
              onClick={secondaryAction}
              className="mt-2 text-xs text-neutral-600 hover:text-neutral-400 transition-colors focus:outline-none"
              disabled={isPending}
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
    <div
      className="min-h-screen bg-black text-white font-sans selection:bg-blue-500/30 flex items-center justify-center p-4 overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      <style>{movingDotsStyles}</style>

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
  );
}
