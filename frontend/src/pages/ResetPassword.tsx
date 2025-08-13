import { useResetPassword } from "../contexts/ResetPasswordProvider";
import UserVerifyEmail from "../components/resetpassword/UserVerifyEmail";
import UserVerifyOtp from "../components/resetpassword/UserVerifyOtp";
import ResetPasswordForm from "../components/resetpassword/ResetPasswordForm";

function ResetPassword() {
  const { currentStep } = useResetPassword();

  switch (currentStep) {
    case 1:
      return <UserVerifyEmail />;

    case 2:
      return <UserVerifyOtp />;

    case 3:
      return <ResetPasswordForm />;
  }
}
export default ResetPassword;
