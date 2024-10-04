import React from "react";
import logo from "../assets/mylogo.png";

const NavBar = () => {
  return (
    <nav className="mb-15 flex items-center justify-between py-6">
      <div className="flex flex-shrink-0 items-center">
        <a href="/">
          <img
            src={logo}
            alt="logo"
            className="mx-2 w-10"
            style={{ width: "75px" }}
          />
        </a>
      </div>
      <div className="m-8 flex items-center justify-center gap-4 text-4xl">
        <a href="#home" className="text-lg px-2 py-2 text-white">
          Home
        </a>
        <a href="#experiences" className="text-lg px-2 py-2  text-white ">
          Experiences
        </a>
        <a href="#projects" className="text-lg px-2 py-2  text-white ">
          Projects
        </a>

        <a href="#contact" className="text-lg px-2 py-2  text-white ">
          Contact
        </a>
      </div>
    </nav>
  );
};

export default NavBar;
