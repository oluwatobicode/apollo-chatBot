import { useNavigate } from "react-router-dom";
// import { AppDispatch } from "../../app/store";
// import { useDispatch } from "react-redux";
// import { logInWithGoogle } from "../../features/auth/authSlice";

function OnBoarding() {
  const navigate = useNavigate();
  // const dispatch = useDispatch<AppDispatch>();

  const handleGoogleLogin = () => {
    // dispatch(logInWithGoogle());
    navigate("/maintenance");
  };

  return (
    <div className="flex items-center justify-center w-full h-screen">
      <div className="flex flex-col items-center justify-center gap-2 ">
        <div className="" onClick={() => navigate("/")}>
          <img src="/APOLLO.svg" alt="apollo  " />
        </div>
        <p className="font-semibold leading-[43.12px] font-fontOne text-[25.37px]">
          Let&apos;s get started
        </p>

        <div className="flex flex-col gap-5">
          <button
            onClick={() => navigate("/maintenance")}
            className="bg-textColor  text-[20px] font-fontOne font-semiBold leading-[25.6px]  text-textColorSec w-[350px] h-[50px] rounded-lg"
          >
            Sign Up
          </button>
          <button
            onClick={() => navigate("/maintenance")}
            className="text-textColor  text-[20px] font-fontOne font-semiBold leading-[25.6px]  border-2 border-textColor w-[350px] h-[50px] rounded-lg"
          >
            Continue with an account
          </button>

          <div className="flex items-center justify-center gap-5">
            <span className="border-t-2 w-[100px] border-textColor "></span>
            <p className="font-semibold leading-[27.6px] font-fontOne text-[22.64px]">
              Or
            </p>
            <span className="border-t-2 w-[100px] border-textColor "></span>
          </div>

          <button
            onClick={handleGoogleLogin}
            className="text-textColor text-[20px] font-fontOne font-semiBold leading-[25.6px] border-2 flex items-center justify-center border-textColor w-[350px] h-[50px] rounded-lg"
          >
            <img src="/google.svg" className="w-[50px]" alt="" />
            Continue with gmail
          </button>
        </div>

        {/* <button className="mt-20 bg-textColor  text-[20px] font-fontOne font-semiBold leading-[25.6px]  text-textColorSec w-[350px] h-[50px] rounded-lg">
          Continue as a guest
        </button> */}
      </div>
    </div>
  );
}
export default OnBoarding;
