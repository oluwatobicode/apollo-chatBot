import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useResetPassword } from "../../contexts/ResetPasswordProvider";
import Modal from "../../ui/Modal";
import { toast } from "react-toastify";
import { FaCheck } from "react-icons/fa";

type InputProps = {
  length?: number;
  onComplete?: (pin: string) => void;
  disabled?: boolean;
};

function OTPInput({ length = 6, onComplete, disabled = false }: InputProps) {
  const inputRef = useRef<HTMLInputElement[]>(Array(length).fill(null));
  const [OTP, setOTP] = useState<string[]>(Array(length).fill(""));
  const [isVerifying, setIsVerifying] = useState(false);
  const navigate = useNavigate();

  const { email, setOtp, goToNextStep, isLoading, setIsLoading } =
    useResetPassword();

  const handleTextChange = (input: string, index: number) => {
    if (disabled || isLoading) return;

    const newPin = [...OTP];
    newPin[index] = input;
    setOTP(newPin);

    //checking if the user has entered the first digit,
    // if they have automatically focus on the next input filed and so on.
    if (input.length === 1 && index < input.length - 1) {
      inputRef.current[index + 1]?.focus();
    }
    if (input.length === 0 && index > 0) {
      inputRef.current[index - 1]?.focus();
    }
    //if user has entered all the digits , grab the digits and set as an argument to the onComplete function
    if (newPin.every((digit) => digit != " ")) {
      const pinString = newPin.join("");
      if (onComplete) {
        onComplete(pinString);
      }
    }
  };

  const handleVerifyClick = async () => {
    const pinString = OTP.join("");
    if (pinString.length !== length) {
      toast.error("Please enter the complete OTP");
      return;
    }

    try {
      setIsVerifying(true);
      setOtp(pinString);
      console.log("OTP collected:", pinString, "for email:", email);

      // this is a brief delay for UX
      await new Promise((resolve) => setTimeout(resolve, 500));
    } catch (error) {
      console.error("Error:", error);
      setIsVerifying(false);
    }
  };

  const handleResendOtp = () => {
    setIsVerifying(false);
    setIsLoading(false);
    goToNextStep();
  };

  const handleResetPasswordClick = () => {
    setIsVerifying(false);
    setIsLoading(false);
    goToNextStep(); // Move to reset password step
  };

  return (
    <Modal>
      <div className="m-5">
        <div className="flex items-center justify-center mt-20">
          <div className="cursor-pointer" onClick={() => navigate("/")}>
            <img src="/APOLLO.svg" className="w-[100px]" alt="nav-logo" />
          </div>
        </div>
        <div className="flex flex-col h-fit p-5 mt-10 items-center justify-center">
          <div className="mb-8 text-center">
            <h1 className="text-[47px] font-bold font-fontOne leading-[58px]">
              OTP
            </h1>
            <p className="font-medium font-fontOne text-[20px]">
              Please enter the OTP sent to your {email} !
            </p>
          </div>
          <div className="flex flex-row items-center mt-5 mb-5">
            {Array.from({ length }, (_, index) => (
              <input
                key={index}
                type="text"
                maxLength={1}
                value={OTP[index]}
                disabled={disabled || isLoading}
                onChange={(e) => handleTextChange(e.target.value, index)}
                ref={(ref) =>
                  (inputRef.current[index] = ref as HTMLInputElement)
                }
                className={`border-2 border-solid rounded-lg text-3xl border-black  p-5 outline-none w-[75px] h-[70px] bg-transparent`}
                style={{ marginRight: index === length - 1 ? "0" : "10px" }}
              />
            ))}
          </div>
          <div className="flex flex-col items-center mb-5">
            <p className="text-[23.88px] font-normal font-fontOne leading-[29.12px] mb-2 text-[#11100BA6]">
              Didn’t receive an OTP?
            </p>
            <button
              onClick={handleResendOtp}
              disabled={disabled || isLoading}
              className="disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <p className="underline text-[20px] font-normal font-fontOne leading-[29.12px] text-textColor">
                {isLoading ? "Resending..." : "Resend OTP?"}
              </p>
            </button>
          </div>

          <Modal.Open opens="verify">
            <button className="md:w-[350px] w-[300px] h-[50px] bg-black text-textColorSec rounded-md mb-5">
              Verify
            </button>
          </Modal.Open>
        </div>

        <Modal.Window name="verify">
          <div className="flex flex-col items-center justify-center gap-[10px]">
            <div className="bg-[#000] w-[80px] h-[80px] rounded-full flex items-center justify-center">
              <FaCheck color="#fff" size="50px" />
            </div>
            <h1 className="leading-[100%] text-[32px] font-semibold">
              Verification Complete
            </h1>
            <p className="text-[14.46px] text-[#000000A6] leading-[100%]">
              Your OTP has been successfully verified
            </p>
            <button
              className="w-[317px] h-[54.63px] bg-[#000] text-[#fff] rounded-[28.12px] cursor-pointer mt-10"
              onClick={handleResetPasswordClick}
            >
              Reset Password
            </button>
          </div>
        </Modal.Window>
      </div>
    </Modal>
  );
}
export default OTPInput;
