import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function RevealText({ text, className = "", delay = 0, once = true }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, amount: 0.05 });
  
  // Split words to animate independently
  const words = text.split(" ");
  
  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: delay * i },
    }),
  };
  
  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 30,
    },
  };

  return (
    <motion.h2
      ref={ref}
      style={{ overflow: "hidden" }}
      className={className}
      variants={container}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {words.map((word, index) => (
        <motion.span
          variants={child}
          style={{ marginRight: "0.25em", display: "inline-block", color: "inherit" }}
          key={index}
        >
          {word}
        </motion.span>
      ))}
    </motion.h2>
  );
}
