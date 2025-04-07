import React, { useEffect, useState } from "react";
import { ABOUT_TEXT, QUOTES } from "../constants/index.jsx";
import { motion } from "framer-motion";
import TrueFocus from "./TrueFocus";
import Stack from "./Stack";
// import { HandRaisedIcon } from '@heroicons/react/24/outline';

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

const images = [
  { id: 1, img: "myimages/image1.jpeg" },
  { id: 2, img: "myimages/image5.jpeg" },
  { id: 3, img: "myimages/image4.jpeg" },
  { id: 4, img: "myimages/image11.jpeg" },
  { id: 5, img: "myimages/image7.jpeg" },
  { id: 6, img: "myimages/image8.jpeg" },
  { id: 7, img: "myimages/image10.jpeg" },
  { id: 11, img: "myimages/image2.jpeg" },
  { id: 10, img: "myimages/image14.jpeg" },
  { id: 9, img: "myimages/image12.jpeg" },
];

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
    <section id="about">
      <div className="border-b min-h-screen border-neutral-900 pb-2">
        <motion.h1
          variants={container(0.5)}
          initial="hidden"
          animate="visible"
          className="lg:my-5  my-5 text-center text-5xl"
        >
          So, Who Am <span className="text-neutral-500">I?</span>
        </motion.h1>

        <div className="flex flex-col w-full lg:flex-row items-center justify-center gap-10 p-4">
          <div className=" w-10/11">
            <motion.div
              variants={container(1)}
              initial="hidden"
              animate="visible"
            >
              <p className="my-2 text-l text-justify lg:text-2xl py-4">
                Currently, I'm leading the development of the{" "}
                <u>
                  <a href="https://piee.eec.asu.edu">PIEE database</a>
                </u>
                , at the Energy Efficiency Center at ASU supported by{" "}
                <u>
                  <a href="https://www.usaid.gov/">USAID</a>
                </u>{" "}
                to help manufacturers and researchers across America.
                <br />
                <br />
                I’m pursuing my Master’s in Computer Science at Arizona State
                University, specializing in AI, machine learning, and full-stack
                development.
                <br />
                <br /> As part of my projects, I deploy and maintain
                web applications, build dashboards, automate pipelines, and
                build AI solutions to improve performance and efficiency.
                <br />
                <br />
                Albert Einstein once said,{" "}
                <em>
                  "In the middle of every difficulty, lies opportunity."
                </em>{" "}
                I’d like to say I’m great at finding those opportunities, but I
                mostly just find bugs to fix.
                <br />
                <br />
                And also, I love to travel!
                <br />
              </p>
            </motion.div>
          </div>

          <div className="flex flex-col justify-center items-center">
            <Stack
              randomRotation={true}
              sensitivity={100}
              cardDimensions={{
                width: window.innerWidth >= 1024 ? 600 : 275,
                height: window.innerWidth >= 1024 ? 600 : 275,
              }}
              cardsData={images}
            />
            {/* <div className="flex items-center my-2">
    <HandRaisedIcon className="h-6 w-6 text-white lg:h-8 lg:w-8 mr-2" />
    <p className="text-l text-justify lg:text-2xl py-4 text-white">Tap</p>
  </div> */}
          </div>
        </div>

        <div className="w-full justify-center">
          <motion.div
            variants={container(0.5)}
            initial="hidden"
            animate="visible"
            className="text-center my-20"
          >
            <div className=" flex justify-center">
              <TrueFocus
                sentence="Stay Curious , Stay Humble , Keep Building "
                manualMode={false}
                blurAmount={3}
                borderColor="rgb(0, 216, 255)"
                animationDuration={1.3}
                pauseBetweenAnimations={0.5}
              />

              <p className="text-2xl lg:text-4xl  items-center text-white  italic"></p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;

