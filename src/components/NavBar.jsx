import React, { useState } from "react";
import logo from "../assets/mylogo.png";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false); // State to manage dropdown visibility

  const toggleMenu = () => {
    setIsOpen(!isOpen); // Toggle the dropdown menu
  };

  return (
    <nav className="mb-15 flex flex-col items-center py-6 relative">
      <div className="flex justify-between w-full items-center">
        {/* Logo on the Left */}
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
        
        {/* Navigation Links for Medium and Larger Screens on the Right */}
        <div className="hidden md:flex m-8 gap-4 text-4xl">
          <a href="#home" className="text-lg px-2 py-2 text-white">
            Home
          </a>
          <a href="#experiences" className="text-lg px-2 py-2 text-white">
            Experiences
          </a>
          <a href="#projects" className="text-lg px-2 py-2 text-white">
            Projects
          </a>
          <a href="#contact" className="text-lg px-2 py-2 text-white">
            Contact
          </a>
        </div>

        {/* Toggle Button for Small Screens */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-white text-4xl focus:outline-none"
          >
            {isOpen ? "✖" : "☰"} {/* Change icon based on menu state */}
          </button>
        </div>
      </div>

      {/* Dropdown Section for Small Screens */}
      {isOpen && (
        <div className="flex flex-col md:hidden bg-gray-800 rounded-md shadow-lg w-full mt-2">
          <a
            href="#home"
            className="text-lg px-4 py-2 text-white hover:bg-gray-700"
            onClick={() => setIsOpen(false)} // Close menu on link click
          >
            Home
          </a>
          <a
            href="#experiences"
            className="text-lg px-4 py-2 text-white hover:bg-gray-700"
            onClick={() => setIsOpen(false)} // Close menu on link click
          >
            Experiences
          </a>
          <a
            href="#projects"
            className="text-lg px-4 py-2 text-white hover:bg-gray-700"
            onClick={() => setIsOpen(false)} // Close menu on link click
          >
            Projects
          </a>
          <a
            href="#contact"
            className="text-lg px-4 py-2 text-white hover:bg-gray-700"
            onClick={() => setIsOpen(false)} // Close menu on link click
          >
            Contact
          </a>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
