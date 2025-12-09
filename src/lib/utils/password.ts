export const passwordChecks = (password: string) => [
  { label: "At least 8 characters", met: password.length >= 8 },
  { label: "Contains a number", met: /\d/.test(password) },
  { label: "Contains a special character", met: /[^A-Za-z0-9]/.test(password) },
  {
    label: "Mixed case (upper & lower)",
    met: /[a-z]/.test(password) && /[A-Z]/.test(password),
  },
];

export const getStrengthColor = (score: number) => {
  if (score <= 1) return "bg-red-500";
  if (score === 2) return "bg-orange-500";
  if (score === 3) return "bg-yellow-500";
  return "bg-green-500";
};

export const getStrengthLabel = (score: number) => {
  if (score <= 1) return "Weak";
  if (score === 2) return "Fair";
  if (score === 3) return "Good";
  return "Strong";
};
