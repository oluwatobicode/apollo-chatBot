import { useState, useEffect } from "react";
import { AppDispatch, RootState } from "../../app/store";
import { useDispatch, useSelector } from "react-redux";

import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { logInUser, clearError } from "../../features/auth/authSlice";
import toast from "react-hot-toast";
import MiniLoader from "../../ui/MiniSpinner";

interface logInData {
  email: string;
  password: string;
}

function LogInForm({ email = "", password = "" }: Partial<logInData>) {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const { isLoading, isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<logInData>({
    defaultValues: {
      email,
      password,
    },
  });

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/chat");
      toast.success("Logged in successfully!");
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  const onSubmit: SubmitHandler<logInData> = async (data) => {
    dispatch(clearError());

    try {
      const result = await dispatch(
        logInUser({
          email: data.email,
          password: data.password,
        })
      ).unwrap();

      console.log("Login successful:", result);
    } catch (error: any) {
      let errorMessage = "Login failed. Please try again.";
      if (error?.message) {
        if (error.message.includes("Invalid login credentials")) {
          errorMessage =
            "Invalid email or password. Please check your credentials.";
        } else if (error.message.includes("Email not confirmed")) {
          errorMessage = "Please verify your email address before logging in.";
        } else if (error.message.includes("Too many requests")) {
          errorMessage = "Too many failed attempts. Please try again later.";
        } else {
          errorMessage = error.message;
        }
      }

      toast.error(errorMessage);
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="m-10">
      <div className="flex items-center justify-between">
        <div className="" onClick={() => navigate("/")}>
          <img src="/APOLLO.svg" className="" alt="nav-logo" />
        </div>

        <button
          onClick={() => navigate("/signup")}
          className="md:w-[150px] md:h-[50px] w-[100px] h-[40px] font-fontOne rounded-md border-2 border-textColor lg:text-[20px] text-[13px] font-semibold"
        >
          Sign Up
        </button>
      </div>
      <div className="flex flex-col h-fit p-5  items-center justify-center">
        <h1 className="md:text-[36px] text-[20px] font-bold font-fontOne mt-2 mb-5">
          Sign In
        </h1>
        <p className="font-medium md:text-[20px] text-[15px] leading-[100%] font-fontOne mb-5">
          <span className="font-bold">APOLLO</span> welcome&apos;s you back!
        </p>

        <div className="flex flex-col">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-5">
              <input
                id="email"
                type="email"
                placeholder="Email"
                className={`w-full max-w-[443px] px-4 py-3 font-fontOne bg-transparent border-2 rounded-md font-normal text-[16px] active:bg-transparent ${
                  errors.email ? "border-red-500" : "border-textColor"
                }`}
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
              />
              {errors?.email && (
                <p className="mt-1 text-sm text-red-600">
                  {errors?.email.message}
                </p>
              )}
            </div>
            <div className="mb-5 flex flex-col">
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className={`active:bg-transparent w-full max-w-[443px] px-4 py-3 font-fontOne bg-transparent border-2 rounded-md font-normal text-[16px] ${
                    errors.password ? "border-red-500" : "border-textColor"
                  }`}
                  {...register("password", {
                    required: "Password is required!",
                  })}
                />

                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute cursor-pointer right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-[#020267] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {showPassword ? (
                    <FaEye size={18} />
                  ) : (
                    <FaEyeSlash size={18} />
                  )}
                </button>
              </div>
              {errors?.password && (
                <p className="text-red-500 text-sm mt-1 w-[350px]">
                  {errors?.password.message}
                </p>
              )}

              <button
                type="button"
                onClick={() => navigate("/resetPassword")}
                className="text-right mt-2 underline font-fontOne font-normal leading-[20.72px] text-[13px]"
              >
                Forgot Password? Reset
              </button>
            </div>
            <button
              type="submit"
              disabled={isLoading || Object.keys(errors).length > 0}
              className="w-[350px] h-[50px] text-textColorSec bg-textColor font-fontOne rounded-md font-normal text-[16px] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? <MiniLoader /> : "Log In"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
export default LogInForm;
