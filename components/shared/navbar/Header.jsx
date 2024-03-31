"use client";

import "./Header.css";
import Link from "next/link";
import { useState } from "react";
import AccountDropDown from "./AccountDropDown";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const menuItems = [
    <li>
      <Link className="Button" href="/">
        Home
      </Link>
    </li>,
    <li>
      <Link className="Button" href={"/tourGuide"}>
        Tour Guides
      </Link>
    </li>,
    <li>
      <Link className="Button" href="/about">
        About Us
      </Link>
    </li>,
    <li className="hidden md:block">
      <AccountDropDown />
    </li>,
  ];

  return (
    <div className=" w-full bg-black bg-opacity-60 lg:h-[85px] text-white p-4">
      <div className="flex items-center justify-between pt-3">
        <div className="flex items-center space-x-4">
          <div className="group relative">
            <button
              onClick={toggleMenu}
              className="lg:hidden focus:outline-none"
            >
              =
            </button>
            {isMenuOpen && (
              <ul className="mt-[28px] z-10 p-2 shadow bg-black bg-opacity-80 rounded w-52 absolute">
                {menuItems}
              </ul>
            )}
          </div>
          <Link href={"/"} className="lg:text-3xl text-lg flex items-center">
            <span className="text-[#3081D0] mr-2">Travel</span>Master
          </Link>
        </div>

        <div className="hidden lg:flex">
          <ul className="flex gap-6">{menuItems}</ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
