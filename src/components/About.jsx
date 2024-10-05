
import React from "react";
import { ABOUT_TEXT, QUOTE, AUTHOR } from "../constants";
import { motion } from "framer-motion";

const container = (delay = 0) => ({
  hidden: { opacity: 0, y: -100 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delay,
      duration: 0.5,
    },
  },
});

const About = () => {
  return (
    <div className="border-b border-neutral-900 pb-4">
      <motion.div
        variants={container(0)}
        initial="hidden"
        animate="visible"
        className="text-center my-20"
      >
        <p className="text-4xl text-neutral-500 italic">
          {QUOTE}{" "}
          </p><p className="text-end mr-20 mt-10">
          <span className="text-white text-4xl italic">- {AUTHOR}</span>
        </p>
      </motion.div>
      <motion.h1
        variants={container(0.5)}
        initial="hidden"
        animate="visible"
        className="my-20 text-center text-5xl"
      >
        So, Who Am <span className="text-neutral-500"> I?</span>
      </motion.h1>
      <div className="flex justify-center">
        <div className="w-full lg:w-3/4 justify-center">
          <motion.div
            variants={container(1)}
            initial="hidden"
            animate="visible"
            className="flex justify-center text-center"
          >
            <p className="my-2 max-w-4xl text-xl lg:text-2xl py-6">{ABOUT_TEXT}</p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default About;
