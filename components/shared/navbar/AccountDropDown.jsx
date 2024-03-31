"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const AccountDropDown = () => {
  const isClient = {
    role: "admin",
  };

  const [open, setOpen] = useState(false);
  const dropDownRef = useRef(null);

  const handleLogout = () => {
    localStorage.removeItem("client");
    setClient(null);

    setTimeout(() => {
      navigate("/signin");
    }, 1000);
  };

  useEffect(() => {
    const close = (e) => {
      if (dropDownRef.current && !dropDownRef.current.contains(e.target))
        setOpen(false);
    };

    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  return (
    <div ref={dropDownRef} className="relative mx-auto w-fit text-white">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="rounded-sm transition-all duration-300 border hover:bg-sky-600 px-6 py-2"
      >
        Account
      </button>
      <ul
        className={`${
          open
            ? "visible translate-y-0 duration-300"
            : "invisible translate-y-4"
        } absolute top-12 z-50 w-full space-y-1 rounded-sm bg-sky-400`}
      >
        {!isClient ? (
          <>
            <Link href={"/signin"}>
              <li
                className={`rounded-sm p-2 ${
                  open ? "opacity-100 duration-300" : "opacity-0"
                } hover:bg-sky-500`}
              >
                {"Login"}
              </li>
            </Link>
            <Link href={"/signup"}>
              <li
                className={`rounded-sm p-2 ${
                  open ? "opacity-100 duration-300" : "opacity-0"
                } hover:bg-sky-500`}
              >
                {"Register"}
              </li>
            </Link>
          </>
        ) : (
          <>
            {isClient.role == "admin" && (
              <Link href={"/dashboard"}>
                <li
                  className={`rounded-sm p-2 ${
                    open ? "opacity-100 duration-300" : "opacity-0"
                  } hover:bg-sky-500`}
                >
                  {"Deshboard"}
                </li>
              </Link>
            )}
            <Link href={"/profile"}>
              <li
                className={`rounded-sm p-2 ${
                  open ? "opacity-100 duration-300" : "opacity-0"
                } hover:bg-sky-500`}
              >
                {"Profile"}
              </li>
            </Link>

            <li
              onClick={handleLogout}
              className={`rounded-sm p-2 cursor-pointer ${
                open ? "opacity-100 duration-300" : "opacity-0"
              } hover:bg-sky-500`}
            >
              {"Logout"}
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default AccountDropDown;
