
import React, { useEffect, useState } from "react";
import { ABOUT_TEXT, QUOTES } from "../constants"; 
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

const quoteAnimation = {
  initial: { opacity: 0 },
  enter: { opacity: 1, transition: { duration: 0.5 } },
  exit: { opacity: 0, transition: { duration: 0.5 } },
};

const About = () => {
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false); 
      setTimeout(() => {
        setCurrentQuoteIndex((prevIndex) => (prevIndex + 1) % QUOTES.length);
        setIsVisible(true); 
      }, 500);
    }, 6000); 

    return () => clearInterval(interval); 
  }, []);

  return (
    <div className="border-b border-neutral-900 pb-4">
      <motion.div
        variants={container(0)}
        initial="hidden"
        animate="visible"
        className="text-center my-20"
      >
       <div className="h-48 lg:h-60 flex justify-center">
        <motion.div
          key={currentQuoteIndex} 
          variants={quoteAnimation}
          initial="initial"
          animate={isVisible ? "enter" : "exit"}
        >
          <p className="text-2xl lg:text-4xl  items-center text-white  italic">
            {QUOTES[currentQuoteIndex].quote}
          </p>
          <p className="text-end lg:mr-20 mt-10">
            <span className="text-neutral-500 text-right text-lg lg:text-2xl italic">
              - {QUOTES[currentQuoteIndex].author}, {QUOTES[currentQuoteIndex].specialty}
            </span>
          </p>
        </motion.div>
         </div>
      </motion.div>
      <motion.h1
        variants={container(0.5)}
        initial="hidden"
        animate="visible"
        className="my-20 text-center text-5xl"
      >
        So, Who Am <span className="text-neutral-500">I?</span>
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
