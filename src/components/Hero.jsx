import React from "react";
import { HERO_CONTENT } from "../constants/index.jsx";
import profilePic from "../assets/mypic.png";
import { Typewriter } from "react-simple-typewriter";
import { motion } from "framer-motion";
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaEnvelope } from "react-icons/fa";
import BlurText from "./BlurText";
import SplitText from "./SplitText.jsx";

const container = (delay) => ({
  hidden: { scale: 0.75, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.5, delay: delay },
  },
});

const Hero = () => {
  return (
    <section id="home">
      <div className="border-b min-h-screen border-neutral-900 pb-4 lg:mb-35">
        <div className="flex flex-wrap">
          <div className="w-full lg:w-1/2">
            <div className="flex flex-col items-start  ">
              {/* <SplitText
                text="Hello !!"
                className="pb-16 text-6xl font-thin tracking-tight lg:mt-16 lg:text-8xl"
                delay={150}
                animationFrom={{
                  opacity: 0,
                  transform: "translate3d(0,50px,0)",
                }}
                animationTo={{ opacity: 1, transform: "translate3d(0,0,0)" }}
                easing="easeOutCubic"
                threshold={0.2}
                rootMargin="-50px"
              /> */}
              <BlurText
                text="Praveen Raj Mohanraj"
                delay={150}
                animateBy="words"
                direction="top"
                className="pb-8 items-start text-6xl font-thin tracking-tight lg:mt-16 lg:text-8xl"
              />
              {/* <BlurText
                text="I am Praveen Raj Mohanraj"
                delay={150}
                animateBy="words"
                direction="top"
                className="pb-16 text-6xl font-thin tracking-tight lg:mt-16 lg:text-8xl"
              /> */}

              {/* <motion.h1
                variants={container(0)}
                initial="hidden"
                animate="visible"
                className="pb-16 text-6xl font-thin tracking-tight lg:mt-16 lg:text-8xl"
              >
                <p>Hello !! </p> I am Praveen Raj Mohanraj
              </motion.h1> */}
            </div>

            <div className="flex flex-col items-start ">
              <motion.span
                variants={container(0)}
                initial="hidden"
                animate="visible"
                className="bg-gradient-to-r from-blue-200 via-blue-500 to-blue-600 bg-clip-text text-2xl lg:text-4xl tracking-tight text-transparent"
              >
                Data Analyst | Developer
              </motion.span>

              <motion.p
                variants={container(0)}
                initial="hidden"
                animate="visible"
                className="my-2 text-xl lg:text-2xl max-2xl py-6 font-light tracking-tighter"
              >
                {" "}
                I'm a Computer Science Graduate with experience in Data Analysis
                and Full Stack Development. I love building cool things. :-) 
                <br />
                <br />
                Let’s Connect!
              </motion.p>
              <motion.div
                variants={container(0)}
                initial="hidden"
                animate="visible"
                className="m-8 flex mx-auto items-center justify-center gap-4 text-5xl"
              >
                <a
                  href="mailto:pmohanr4@asu.edu"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaEnvelope />
                </a>
                <a
                  href="https://www.linkedin.com/in/praveenraj-m/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaLinkedin />
                </a>
                <a
                  href="https://github.com/praveen-raj-m"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaGithub />
                </a>
              </motion.div>
            </div>
          </div>
          <div className="w-full lg:w-1/2 lg:p-8">
            <div className="flex justify-center">
              <motion.img
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 2, delay: 1 }}
                src={profilePic}
                alt="praveen"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
