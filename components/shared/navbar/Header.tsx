"use client";

import "./Header.css";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import AccountDropDown from "./AccountDropDown";
import Container from "@/components/ui/container";
import { usePathname } from "next/navigation";
import { paths } from "@/constat";
import { FiAlignLeft } from "react-icons/fi";

const Header = () => {
  const dropDownRef = useRef(null);
  const path = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const menuItems = [
    <li key={0}>
      <Link className="Button" href="/">
        Home
      </Link>
    </li>,
    <li key={1}>
      <Link className="Button" href={"/tour-guide"}>
        Tour Guide
      </Link>
    </li>,
    <li key={4}>
      <Link className="Button" href={"/tour-place"}>
        Tour Place
      </Link>
    </li>,
    <li key={2}>
      <Link className="Button" href="/about">
        About Us
      </Link>
    </li>,
    <li className="" key={3}>
      <AccountDropDown />
    </li>,
  ];

  useEffect(() => {
    const close = (e: { target: any }) => {
      if (dropDownRef.current && !dropDownRef.current.contains(e.target))
        setIsMenuOpen(false);
    };

    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  const hiddenPath = paths.find((item) => item.search(path) )
  console.log("🚀 ~ Header ~ hiddenPath:", hiddenPath)
  return (
    <div className={ 
      hiddenPath
       ? "hidden": " w-full bg-black bg-opacity-60 lg:h-[85px] text-white max-sm:p-0 p-4"}>
      <>
        <div className="flex items-center justify-between py-3">
          <div ref={dropDownRef} className="flex items-center justify-between  gap-4">
            <div className="group relative">
              <button
                onClick={toggleMenu}
                className="lg:hidden focus:outline-none px-2"
              >
                <FiAlignLeft className="text-3xl" />
              </button>
              {isMenuOpen && (
                <ul  className="absolute z-20 mt-[12px] p-2 shadow bg-black bg-opacity-80 rounded-br-sm w-52  flex flex-col  gap-5">
                  {menuItems}
                </ul>
              )}
            </div>
            <Link href={"/"} className="text-2xl max-sm:-mt-2 flex items-center">
              Travel Master
            </Link>
          </div>

          <div className="hidden lg:flex">
            <ul className="flex gap-6 items-center">{menuItems}</ul>
          </div>
        </div>
      </>
    </div>
  );
};

export default Header;
