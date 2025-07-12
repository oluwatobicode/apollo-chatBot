import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { AppDispatch, RootState } from "../../app/store";
import { registerUser } from "../../features/auth/authSlice";
import { SubmitHandler, useForm } from "react-hook-form";

import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import MiniLoader from "../../ui/MiniSpinner";

interface SignUpData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

function SignUpForm({
  firstName = "",
  lastName = "",
  email = "",
  password = "",
  confirmPassword = "",
}: Partial<SignUpData>) {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const dispatch = useDispatch<AppDispatch>();
  const { isLoading } = useSelector((state: RootState) => state.auth);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignUpData>({
    defaultValues: {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
    },
  });

  const Password = watch("password");

  const onSubmit: SubmitHandler<SignUpData> = async (data) => {
    try {
      const result = await dispatch(
        registerUser({
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          password: data.password,
        })
      ).unwrap();
      console.log(result);
      toast.success("Account created successfully! Check your mail");
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="m-10">
      <div className="flex items-center justify-between">
        <div className="" onClick={() => navigate("/")}>
          <img src="/APOLLO.svg" className="" alt="nav-logo" />
        </div>

        <button
          onClick={() => navigate("/login")}
          className="md:w-[150px] md:h-[50px] w-[100px] h-[40px] font-fontOne rounded-md border-2 border-textColor lg:text-[20px] text-[13px] font-semibold"
        >
          Log in
        </button>
      </div>
      <div className="flex flex-col h-fit p-5  items-center justify-center">
        <h1 className="text-[36px] font-bold font-fontOne mt-5 mb-5">
          Sign up
        </h1>
        <p className="font-medium text-[15px] font-fontOne mb-5">
          Create an account with <span className="font-bold">APOLLO</span>
        </p>
        <div className="flex flex-col">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-5">
              <input
                id="firstName"
                type="text"
                placeholder="First Name"
                className={`w-full max-w-[350px] px-4 py-3 font-fontOne bg-transparent border-2 rounded-md font-normal text-[16px] active:bg-transparent ${
                  errors.firstName ? "border-red-500" : "border-textColor"
                }`}
                {...register("firstName", {
                  required: "First Name is required!",
                  minLength: {
                    value: 2,
                    message: "Enter your first name!",
                  },
                })}
              />
              {errors.firstName && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.firstName?.message}
                </p>
              )}
            </div>
            <div className="mb-5">
              <input
                id="lastName"
                type="text"
                placeholder="Last Name"
                className={`w-full max-w-[350px] px-4 py-3 font-fontOne bg-transparent border-2 rounded-md font-normal text-[16px] active:bg-transparent ${
                  errors.firstName ? "border-red-500" : "border-textColor"
                }`}
                {...register("lastName", {
                  required: "Last Name is required!",
                  minLength: {
                    value: 2,
                    message: "Enter your last name!",
                  },
                })}
              />
              {errors.lastName && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.lastName?.message}
                </p>
              )}
            </div>
            <div className="mb-5">
              <input
                id="email"
                type="email"
                placeholder="Email"
                className={`w-full max-w-[350px] px-4 py-3 font-fontOne bg-transparent border-2 rounded-md font-normal text-[16px] active:bg-transparent ${
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
                  {errors.email?.message}
                </p>
              )}
            </div>
            <div className="mb-5">
              <div className="relative">
                <input
                  className={`w-full max-w-[350px] px-4 py-3 font-fontOne bg-transparent border-2 rounded-md font-normal text-[16px] active:bg-transparent ${
                    errors.password ? "border-red-500" : "border-textColor"
                  }`}
                  placeholder="Password"
                  id="password"
                  type={showPassword ? "text" : "password"}
                  {...register("password", {
                    required: "Password is required!",
                    pattern: {
                      value: passwordRegex,
                      message:
                        "Password must be at least 8 characters, including uppercase, lowercase, number and special character",
                    },
                  })}
                />
                {errors?.password && (
                  <p className="mt-1 text-red-500 text-sm">
                    {errors.password?.message}
                  </p>
                )}
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute cursor-pointer right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-[#020267] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {showPassword ? (
                    <FaEye size={18} color="#000" />
                  ) : (
                    <FaEyeSlash size={18} />
                  )}
                </button>
              </div>
            </div>
            <div className="mb-5">
              <div className="relative">
                <input
                  className={`w-full max-w-[350px] px-4 py-3 font-fontOne bg-transparent border-2 rounded-md font-normal text-[16px] active:bg-transparent ${
                    errors.confirmPassword
                      ? "border-red-500"
                      : "border-textColor"
                  }`}
                  placeholder="Confirm password"
                  type={showPassword ? "text" : "password"}
                  {...register("confirmPassword", {
                    required: "Please confirm your password!",
                    validate: (value) =>
                      value === Password || "Passwords do not match",
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
              {errors.confirmPassword && (
                <p className="mt-1 text-red-500 text-sm">
                  {errors.confirmPassword?.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={Object.keys(errors).length > 0 || isLoading}
              // className=" "
              className={`w-[350px] h-[50px] text-[#fff] font-fontOne rounded-md font-normal text-[16px]  bg-textColor ${
                isLoading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
              }`}
            >
              {isLoading ? <MiniLoader /> : "Sign Up"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
export default SignUpForm;
