import React, {
  createContext,
  type ReactNode,
  useState,
  useContext,
} from "react";

interface ResetPasswordContextType {
  currentStep: number;
  setCurrentStep: (step: number) => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
  email: string;
  setEmail: (email: string) => void;
  otp: string;
  setOtp: (otp: string) => void;
  resetFlow: () => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

const ResetPasswordContext = createContext<ResetPasswordContextType | null>(
  null
);

export const ResetPasswordProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [email, setEmail] = useState<string>("");
  const [otp, setOtp] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const goToNextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, 3));
  };

  const goToPreviousStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const resetFlow = () => {
    setCurrentStep(1);
    setEmail("");
    setOtp("");
    setIsLoading(false);
  };

  const value: ResetPasswordContextType = {
    currentStep,
    setCurrentStep,
    email,
    setEmail,
    otp,
    setOtp,
    isLoading,
    setIsLoading,
    goToNextStep,
    goToPreviousStep,
    resetFlow,
  };

  return (
    <ResetPasswordContext.Provider value={value}>
      {children}
    </ResetPasswordContext.Provider>
  );
};

export const useResetPassword = () => {
  const context = useContext(ResetPasswordContext);
  if (!context) {
    throw new Error(
      "useResetPassword must be used within a ResetPasswordProvider"
    );
  }

  return context;
};
