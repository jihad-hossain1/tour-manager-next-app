'use client'

import { paths } from "@/constat";
import { footerData, paymentMethod } from "@/public/datas";
import { Typography } from "@mui/material";
import Image from "next/image";
import { usePathname } from "next/navigation";

const Footer = () => {
  const path = usePathname()

  const hiddenPath = paths.some((item) => path.startsWith(item));
  return (
    <div className= {hiddenPath ? "hidden" : "block"} >
      <div className= {"grid grid-cols-2 gap-5 lg:flex justify-between border-t bg-gray-100  pb-4 py-8"} >
        {footerData.map((section) => (
          <div
            className="max-w-6xl mx-auto print:hidden mb-10 md:mb-0 "
            key={section.title}
          >
            <Typography
              variant="h5"
              className="font-medium text-lg mb-10 border-b md:border-0 border-gray-300 pb-2"
            >
              {section.title}
            </Typography>
            {section.content.map((item) => (
              <div
                className="my-2 hover:underline cursor-pointer"
                key={item.label}
              >
                <Typography>{item.label}</Typography>
                {/* You can add a link here using the item.path */}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="flex  flex-wrap md:justify-center lg:justify-end gap-5 mx-5 lg:mr-10 h-10">
        {paymentMethod.map((methods, index) => (
          <Image
            height={300}
            width={300}
            key={index}
            className="h-16 w-16"
            src={methods}
            alt=""
          />
        ))}
      </div>

      <hr className="border border-blue-400 container mx-auto my-5" />
      <div className="p-3  text-center ">
        <Typography
          variant="h6"
          noWrap
          sx={{
            fontFamily: "monospace",
            fontWeight: 700,
            letterSpacing: ".3rem",
            color: "inherit",
          }}
        >
          Traveler - {new Date().getFullYear()}
        </Typography>
      </div>
    </div>
  );
};

export default Footer;
