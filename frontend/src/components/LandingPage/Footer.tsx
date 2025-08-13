import { FaInstagram } from "react-icons/fa";
import { FaFacebookF, FaLinkedinIn, FaYoutube } from "react-icons/fa6";
import Button from "../../ui/Button";

function Footer() {
  return (
    <footer className="bg-textColor mt-[15rem] w-full flex flex-col items-center justify-center">
      <div className="flex flex-col gap-10 p-5 md:p-10 md:w-[700px] w-[400px]">
        <div className="text-center">
          <h1 className="text-textColorThree font-bold md:text-[50px] text-[20px] leading-7  md:leading-[58.59px] md:mb-2 md:mt-2">
            Start Learning Smarter with Apollo
          </h1>
          <p className="md:text-[18px] text-[10px] text-textColorSec font-bold md:leading-[21.09px] text-center opacity-[80%]">
            Join hundreds of students already using Apollo to boost their grades
            and confidence.
          </p>
        </div>

        <div className="flex flex-col items-center justify-center gap-5">
          <button className="w-[150px] h-[50px] text-xl bg-textColorSec rounded-full font-semibold">
            Contact
          </button>
          <p className="text-white">&copy; APOLLO</p>
        </div>

        <div className="w-[350px] md:w-full flex items-center justify-center h-full flex-wrap pt-5 md:pt-5  border-t-[2px] border-opacity-[10%] border-textColorSec">
          <div className="mr-auto">
            <img src="/APOLLO_Footer.svg" alt="APOLLO_Footer_Logo" />
          </div>

          <div className="flex items-center md:mr-auto md:ml-auto gap-10">
            <ul className="text-textColorThree">
              <li>
                <a href="http://">Team</a>
              </li>
            </ul>
            <ul className="text-textColorThree">
              <li>
                <a href="http://">About</a>
              </li>
            </ul>

            <ul className="text-textColorThree">
              <li>
                <a href="http://">Discover</a>
              </li>
            </ul>
          </div>

          <div className="flex gap-5 md:gap-1 mt-5 mb-5 md:mb-0  md:mt-0 ">
            <Button types="ButtonThree">
              <FaLinkedinIn color="#fff" />
            </Button>
            <Button types="ButtonThree">
              <FaFacebookF color="#fff" />
            </Button>
            <Button types="ButtonThree">
              <FaInstagram color="#fff" />
            </Button>
            <Button types="ButtonThree">
              <FaYoutube color="#fff" />
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
}
export default Footer;
