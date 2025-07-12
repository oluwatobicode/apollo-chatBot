import { Link } from "react-router-dom";
import Button from "../../ui/Button";

function Hero() {
  return (
    <div className="flex flex-col lg:h-[80vh] md:h-[40vh] h-[70vh] justify-center items-center ml-5 mr-5">
      <div className="md:w-[965px] mb-3 text-center">
        <h1 className="font-fontOne lg:text-[48px] lg:leading-[58.51px] md:text-[30px] mb-5 text-[20px] font-bold ">
          Meet Apollo: Your AI Companion
          <span className="block">for Educational and School Resources!</span>
        </h1>
      </div>
      <div className="lg:w-[868px] w-fit mb-5 lg:h-[60px] leading-[19.5px]">
        <p className="font-fontOne opacity-[82%]  text-center md:text-[16px] text-[15px] font-semibold  ">
          Meet Apollo, your AI companion for educational support. Access
          homework help, study guides, and personalized learning tips with ease.
          Whether you need assistance with subjects, projects, or studying,
          Apollo is here to support your academic journey.
        </p>
      </div>

      <div className="flex items-center justify-center gap-10">
        <Link to="start">
          <Button types="ButtonOne">Start Now</Button>
        </Link>

        <Button types="ButtonTwo">Download App</Button>
      </div>
    </div>
  );
}
export default Hero;
