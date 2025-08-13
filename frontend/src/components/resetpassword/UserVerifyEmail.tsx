import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useResetPassword } from "../../contexts/ResetPasswordProvider";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../app/store";
import { clearError } from "../../features/auth/authSlice";

interface userVerifyEmailData {
  email: string;
}

const UserVerifyEmail = () => {
  const { email, setEmail, goToNextStep } = useResetPassword();

  const dispatch = useDispatch<AppDispatch>();
  const { isLoading } = useSelector((state: RootState) => state.auth);

  console.log(isLoading);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<userVerifyEmailData>({
    defaultValues: {
      email,
    },
  });

  const onSubmit: SubmitHandler<userVerifyEmailData> = async (formData) => {
    console.log(formData);
    setEmail(formData.email);
    goToNextStep();

    dispatch(clearError());
    // try {
    //   const result = await dispatch(
    //     resetUserPassword({
    //       email: formData.email,
    //     })
    //   ).unwrap();
    // } catch (error) {}
  };

  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md space-y-5">
        <div className="flex justify-center">
          <div className="cursor-pointer" onClick={() => navigate("/")}>
            <img src="/APOLLO.svg" className="w-[100px]" alt="ArkPay Logo" />
          </div>
        </div>

        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold font-fontOne text-textColor text-[30px] leading-[59.92px]">
            Reset Password
          </h1>
          <p className="text-sm font-medium font-fontOne text-textColor outline-0 leading-[29.96px]">
            Enter your email to reset password
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <input
              id="email"
              type="email"
              placeholder="Email"
              className={`w-full max-w-[350px] px-4 py-3 border-2 bg-transparent ${
                errors.email ? "border-red-500" : "border-textColor"
              } rounded-lg bg-transparent placeholder:text-gray-500 placeholder:font-medium text-base focus:outline-none focus:ring-2 focus:ring-[#020267] focus:border-transparent transition duration-200 disabled:opacity-50`}
              {...register("email", {
                required: "An email is required!",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
            />
            {errors.email && (
              <p className="mt-2 text-sm text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <button
              type="submit"
              disabled={Object.keys(errors).length > 0}
              className="w-[350px] py-3 px-4 mb-5 text-textColorSec bg-textColor font-fontOne rounded-md font-normal text-[16px] focus:outline-none focus:ring-2 focus:ring-[#020267] focus:ring-offset-2 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserVerifyEmail;
