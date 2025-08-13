import { useResetPassword } from "../../contexts/ResetPasswordProvider";
import OTPInput from "./OTPInput";

const UserVerifyOtp = () => {
  const { setOtp, isLoading } = useResetPassword();

  const handleCompletePin = (pin: string) => {
    setOtp(pin);
  };

  return (
    <OTPInput length={6} onComplete={handleCompletePin} disabled={isLoading} />
  );
};

export default UserVerifyOtp;
