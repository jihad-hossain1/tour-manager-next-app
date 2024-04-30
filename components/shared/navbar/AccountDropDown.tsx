"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";

const AccountDropDown = () => {
  const navigate = useRouter();

  const { data, status } = useSession();

  let clientRole = data?.user?.role == 'client'
  let adminRole = data?.user?.role == 'admin';
  let userRole = data?.user?.role == 'user';

  console.log(clientRole)

  const [open, setOpen] = useState(false);
  const dropDownRef = useRef(null);

  const handleLogout = () => {
    signOut({ redirect: false });
    if (clientRole) {
      navigate.push("/client-login");
    } else if (userRole) {
      navigate.push("/user-login");
    }
  };

  useEffect(() => {
    const close = (e: { target: any }) => {
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
        {status === 'authenticated' ? (
          <>
            {userRole && (
              <Link href={"/user-dashboard"}>
                <li
                  className={`rounded-sm p-2 ${open ? "opacity-100 duration-300" : "opacity-0"
                    } hover:bg-sky-500`}
                >
                  {"Deshboard"}
                </li>
              </Link>
            )}
            {
              clientRole && (
                <Link href={"/client-dashboard"}>
                  <li
                    className={`rounded-sm p-2 ${open ? "opacity-100 duration-300" : "opacity-0"
                      } hover:bg-sky-500`}
                  >
                    {"Dashboard"}
                  </li>
                </Link>
              )
            }

            <li
              onClick={handleLogout}
              className={`rounded-sm p-2 cursor-pointer ${open ? "opacity-100 duration-300" : "opacity-0"
                } hover:bg-sky-500`}
            >
              {"Logout"}
            </li>
          </>
        ) : (
            <>
              <Link href={"/user-login"}>
                <li
                  className={`rounded-sm p-2 ${open ? "opacity-100 duration-300" : "opacity-0"
                    } hover:bg-sky-500`}
                >
                  {"User Login"}
                </li>
              </Link>
              <Link href={"/user-register"}>
                <li
                  className={`rounded-sm p-2 ${open ? "opacity-100 duration-300" : "opacity-0"
                    } hover:bg-sky-500`}
                >
                  {"User Register"}
                </li>
              </Link>
              <Link href={"/client-login"}>
                <li
                  className={`rounded-sm p-2 ${open ? "opacity-100 duration-300" : "opacity-0"
                    } hover:bg-sky-500`}
                >
                  {"Client Login"}
                </li>
              </Link>
              <Link href={"/client-register"}>
                <li
                  className={`rounded-sm p-2 ${open ? "opacity-100 duration-300" : "opacity-0"
                    } hover:bg-sky-500`}
                >
                  {"Client Register"}
                </li>
              </Link>
            </>
        )}
      </ul>
    </div>
  );
};

export default AccountDropDown;
