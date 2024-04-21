
export const fadeInAnimationVariants = {
  initial: {
    opacity: 0,
    y: 100,
  },
  animate: (index:number) => ({
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