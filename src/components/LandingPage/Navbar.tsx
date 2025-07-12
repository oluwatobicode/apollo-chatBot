import { useNavigate } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoClose } from "react-icons/io5";
import Button from "../../ui/Button";
import { useState } from "react";

const navLink = [
  {
    nav: "Home",
    link: "",
  },
  {
    nav: "Services",
    link: "",
  },
  {
    nav: "Skills & Expirence",
    link: "",
  },
  {
    nav: "Contact",
    link: "",
  },
];

function Navbar() {
  const [nav, showNav] = useState(false);
  const navigate = useNavigate();

  const toggleNav = () => {
    showNav(!nav);
  };

  return (
    <div className="bg-navColor text-textColor">
      <div className="hidden  lg:flex p-10 h-16 items-center w-full">
        <div className="mr-auto" onClick={() => navigate("/")}>
          <img src="./APOLLO.svg" className="" alt="apollo" />
        </div>

        <div className="flex items-center mr-auto ml-auto gap-10 transition duration-75">
          {navLink.map((ele, index) => (
            <ul key={index}>
              <li>
                <a className="text-[16px] font-bold" href={ele.link}>
                  {ele.nav}
                </a>
              </li>
            </ul>
          ))}
        </div>

        <div className="flex items-center justify-center gap-5">
          <button
            onClick={() => navigate("/login")}
            className="lg:w-[120px] lg:h-[39px] w-[150px] h-[50px] rounded-[5px] lg:text-[1rem] bg-textColor text-textColorSec font-fontOne"
          >
            Start Now
          </button>
          <Button types="navButtonTwo">Download App</Button>
        </div>
      </div>

      <div className="lg:hidden flex p-10 h-16 items-center w-full">
        <div className="mr-auto" onClick={() => navigate("/")}>
          <img src="./APOLLO.svg" className="" alt="apollo" />
        </div>

        <button onClick={toggleNav}>
          <RxHamburgerMenu size={30} />
        </button>
      </div>

      {nav && (
        <div className="lg:hidden  flex flex-col h-full w-full fixed z-10 top-0 left-0   bg-textColorSec items-center justify-center  gap-10">
          <div className="absolute top-10 right-10" onClick={toggleNav}>
            <IoClose size={30} />
          </div>

          <div className="" onClick={() => navigate("/")}>
            <img src="./APOLLO.svg" className="md:w-[180px]" alt="apollo" />
          </div>

          <div className="text-center relative">
            {" "}
            {navLink.map((ele, index) => (
              <ul key={index}>
                <li>
                  <a
                    className="lg:text-[16px] text-[22px] md:text-[30px]  font-bold"
                    href={ele.link}
                  >
                    {ele.nav}
                  </a>
                </li>
              </ul>
            ))}
          </div>

          <div className="flex flex-col items-center justify-center gap-5">
            <Button types="navButtonOne">Start Now</Button>
            <Button types="navButtonTwo">Download App</Button>
          </div>
        </div>
      )}
    </div>
  );
}
export default Navbar;
