// "use client";

// import React from "react";
// import Loading from "../Loading/Loading";

// import { useQuery } from "@apollo/client";
// import { GET_COUNTIRES } from "../../queries/countriesQuery";
// import Title from "../Title/Title";
// import { fadeInAnimationVariants } from "../continents/SingleContinent/SingleContinent";
// import Link from "next/link";
// import { motion } from "framer-motion";
// import { Card } from "@mui/material";

// const PopularCountries = () => {
//   const { loading, error, data } = useQuery(GET_COUNTIRES);

//   if (loading) {
//     return (
//       <div>
//         <Loading />
//       </div>
//     );
//   }
//   if (error) {
//     return <div>{error.message}</div>;
//   }
//   // console.log(data);
//   return (
//     <div className="mt-6 md:mt-10  px-2">
//       <Title firstText="Popular Tour" secondText="Countries" />
//       <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
//         {data?.countries?.slice(0, 8).map((country, _i) => (
//           <Link href={`/country/${country?.id}`}>
//             <motion.div
//               whileHover={{
//                 scale: 1.03,
//                 transition: { duration: 0.35 },
//               }}
//               variants={fadeInAnimationVariants}
//               initial="initial"
//               whileInView="animate"
//               viewport={{
//                 once: true,
//               }}
//               custom={_i}
//               className="relative"
//             >
//               <Card sx={{ maxWidth: 345 }}>
//                 <div className="click">
//                   <div
//                     className="w-full h-[170px] bg-cover bg-center pt-4 relative group"
//                     style={{ backgroundImage: `url(${country?.photo})` }}
//                   >
//                     <div className="click_class_main">
//                       <div className="click_class">
//                         <span className="viewbtn px-3">Click to view</span>
//                         <h1 className="text-white text-3xl mx-auto">
//                           {country?.name}
//                         </h1>
//                       </div>
//                     </div>
//                     <div className="absolute bottom-0 block group-hover:hidden w-full text-center ">
//                       <h4 className="bg-black/50 text-zinc-50 font-semibold text-[16px]">
//                         {country?.name}
//                       </h4>
//                     </div>
//                   </div>
//                 </div>
//               </Card>
//             </motion.div>
//           </Link>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default PopularCountries;
