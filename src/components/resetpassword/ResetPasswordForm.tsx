import { SubmitHandler, useForm } from "react-hook-form";
import { useResetPassword } from "../../contexts/ResetPasswordProvider";
import { useNavigate } from "react-router-dom";

interface ResetPasswordData {
  Password: string;
  confirmPassword: string;
}

const ResetPasswordForm = () => {
  const navigate = useNavigate();
  const { email, otp, resetFlow, isLoading, setIsLoading } = useResetPassword();
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordData>({
    defaultValues: {
      Password: "",
      confirmPassword: "",
    },
  });

  const password = watch("Password");

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const onSubmit: SubmitHandler<ResetPasswordData> = async (data) => {
    console.log(data);

    resetFlow();
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md space-y-8">
        <div className="flex flex-col justify-center">
          <div className="cursor-pointer" onClick={() => navigate("/")}>
            <img src="/APOLLO.svg" className="w-[200px]" alt="ArkPay Logo" />
          </div>

          <div className="text-center space-y-1">
            <h1>Reset Password</h1>
            <p>Enter a new password for {email}</p>
          </div>

          <form
            className="flex flex-col gap-[10px]"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div>
              <input
                type="password"
                placeholder="New password"
                id="Password"
                {...register("Password", {
                  required: "Password is required",
                  pattern: {
                    value: passwordRegex,
                    message:
                      "Password must contain at least 8 characters, including uppercase, lowercase, number and special character",
                  },
                })}
                className={`w-full max-w-[433px] px-4 py-3 border-2 ${
                  errors.Password ? "border-red-500" : "border-[#020267]"
                } rounded-lg bg-transparent placeholder:text-gray-500 placeholder:font-medium text-base focus:outline-none focus:ring-2 focus:ring-[#020267] focus:border-transparent transition duration-200 disabled:opacity-50`}
              />
              {errors.Password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.Password.message}
                </p>
              )}
            </div>

            <div>
              <input
                type="password"
                placeholder="Confirm password"
                id="confirmPassword"
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (value) =>
                    value === password || "Passwords do not match",
                })}
                className={`w-full max-w-[433px] px-4 py-3 border-2 ${
                  errors.confirmPassword ? "border-red-500" : "border-[#020267]"
                } rounded-lg bg-transparent placeholder:text-gray-500 placeholder:font-medium text-base focus:outline-none focus:ring-2 focus:ring-[#020267] focus:border-transparent transition duration-200 disabled:opacity-50`}
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            {/* Password Requirements */}
            <div className="text-sm text-gray-600 bg-gray-100 p-3 rounded-lg">
              <p className="font-medium mb-2">Password must contain:</p>
              <ul className="space-y-1">
                <li
                  className={`${
                    password && /[a-z]/.test(password)
                      ? "text-green-600"
                      : "text-gray-500"
                  }`}
                >
                  ✓ At least one lowercase letter
                </li>
                <li
                  className={`${
                    password && /[A-Z]/.test(password)
                      ? "text-green-600"
                      : "text-gray-500"
                  }`}
                >
                  ✓ At least one uppercase letter
                </li>
                <li
                  className={`${
                    password && /\d/.test(password)
                      ? "text-green-600"
                      : "text-gray-500"
                  }`}
                >
                  ✓ At least one number
                </li>
                <li
                  className={`${
                    password && /[@$!%*?&]/.test(password)
                      ? "text-green-600"
                      : "text-gray-500"
                  }`}
                >
                  ✓ At least one special character (@$!%*?&)
                </li>
                <li
                  className={`${
                    password && password.length >= 8
                      ? "text-green-600"
                      : "text-gray-500"
                  }`}
                >
                  ✓ At least 8 characters long
                </li>
              </ul>
            </div>

            <div>
              <button
                type="submit"
                disabled={Object.keys(errors).length > 0}
                className="w-full max-w-[433px] cursor-pointer bg-[#020267] text-white font-medium py-3 px-4 rounded-lg hover:bg-[#030299] focus:outline-none focus:ring-2 focus:ring-[#020267] focus:ring-offset-2 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Confirm
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordForm;
