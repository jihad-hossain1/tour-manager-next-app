'use client'

import { motion } from "framer-motion";
import { Box, Card } from "@mui/material";
import Link from "next/link";

export const fadeInAnimationVariants = {
  initial: {
    opacity: 0,
    y: 100,
  },
  animate: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.05 * index,
      duration: 0.3,
      type: "spring",
      stiffness: 200,
      dump: 30,
    },
  }),
  exit: { opacity: 0, y: 10 },
};

const SingleContinent = ({ continent, index }) => {
  return (
    <Link href={`/tour-place/${continent?.id}`}>
      <motion.div
        whileHover={{
          scale: 1.03,
          transition: { duration: 0.35 },
        }}
        variants={fadeInAnimationVariants}
        initial="initial"
        whileInView="animate"
        viewport={{
          once: true,
        }}
        custom={index}
        className="relative"
      >
        <Card sx={{ maxWidth: 345 }}>
          <div className="click">
            <div
              className="w-full h-[170px] bg-cover bg-center pt-4 relative group"
              style={{ backgroundImage: `url(${continent?.img})` }}
            >
              <div className="click_class_main">
                <div className="click_class">
                  <span className="viewbtn px-3">Click to view</span>
                  <h1 className="text-white text-3xl mx-auto">
                    {continent?.name}
                  </h1>
                </div>
              </div>
              <div className="absolute bottom-0 block group-hover:hidden w-full text-center ">
                <h4 className="bg-black/50 text-zinc-50 font-semibold text-[16px]">
                  {continent?.name}
                </h4>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>
    </Link>
  );
};

export default SingleContinent;


