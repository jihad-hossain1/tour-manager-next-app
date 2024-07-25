"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { FiChevronRight } from "react-icons/fi";

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
    <div ref={dropDownRef} className="relative lg:mx-auto w-fit text-white">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="rounded-sm transition-all duration-300  lg:hover:bg-gray-700 lg:px-6 lg:py-2 max-sm:flex max-sm:gap-8 max-sm:items-center"
      >
        Account
         <FiChevronRight size={20} className="lg:hidden" />
      </button>
      <ul
        className={`${
          open
            ? "visible translate-y-0 duration-300"
            : "invisible translate-y-4 max-sm:translate-x-4"
        } absolute max-sm:top-0 lg:top-14 max-sm:right-[-230px] z-50 max-sm:w-[140px] space-y-1 rounded-sm bg-black bg-opacity-80 `}
      >
        {status === 'authenticated' ? (
          <>
            {userRole && (
              <Link href={"/user-dashboard"}>
                <li
                  className={`rounded-sm p-2 ${open ? "opacity-100 duration-300" : "opacity-0"
                    } hover:bg-gray-700`}
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
                      } hover:bg-gray-700`}
                  >
                    {"Dashboard"}
                  </li>
                </Link>
              )
            }
            {
              adminRole && (
                <Link href={"/super-admin-dashboard"}>
                  <li
                    className={`rounded-sm p-2 ${open ? "opacity-100 duration-300" : "opacity-0"
                      } hover:bg-gray-700`}
                  >
                    {"Dashboard"}
                  </li>
                </Link>
              )
            }

            <li
              onClick={handleLogout}
              className={`rounded-sm p-2 cursor-pointer ${open ? "opacity-100 duration-300" : "opacity-0"
                } hover:bg-gray-700`}
            >
              {"Logout"}
            </li>
          </>
        ) : (
            <>
              <Link href={"/user-login"}>
                <li
                  className={`rounded-sm p-2 ${open ? "opacity-100 duration-300" : "opacity-0"
                    } hover:bg-gray-700`}
                >
                  {"User Login"}
                </li>
              </Link>

              <Link href={"/client-login"}>
                <li
                  className={`rounded-sm p-2 ${open ? "opacity-100 duration-300" : "opacity-0"
                    } hover:bg-gray-700`}
                >
                  {"Client Login"}
                </li>
              </Link>

            </>
        )}
      </ul>
    </div>
  );
};

export default AccountDropDown;
