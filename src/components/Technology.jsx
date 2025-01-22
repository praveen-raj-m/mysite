import React from "react";
import { RiReactjsLine } from "react-icons/ri";
import { FaAws } from "react-icons/fa";
import { SiOpenai } from "react-icons/si";
import { BiBrain } from "react-icons/bi";
import {
  SiMongodb,
  SiTensorflow,
  SiPytorch,
  SiNumpy,
  SiExpress,
  SiPandas,
  SiMicrosoftsqlserver,
} from "react-icons/si";
import { FaNodeJs, FaPython, FaTable } from "react-icons/fa";
import { GiChart } from "react-icons/gi";
import { AiOutlineFileExcel } from "react-icons/ai";
import { SiGithub } from "react-icons/si";
import { animate, motion } from "framer-motion";
import RollingGallery from "./RollingGallery";
import RollingGallery1 from "./RollingGallery1";

const iconVatiants = (duration) => ({
  initial: { y: -5 },
  animate: {
    y: [6, -6],
    transition: {
      duration: duration,
      ease: "linear",
      repeat: Infinity,
      repeatType: "reverse",
    },
  },
});
const Technology = () => {
  return (
    <div className="border-b w-4/5 mx-auto border-neutral-800 pb-24">
      <motion.h2
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: -100 }}
        transition={{ duration: 0.5 }}
        className="my-20 text-center text-5xl"
      >
       <span className="text-neutral-400">Tech Stack</span> I worked with
      </motion.h2>
      <div className="hidden lg:block">
        <RollingGallery autoplay={true} pauseOnHover={true} />
        <RollingGallery1 autoplay={true} pauseOnHover={true} />
      </div>

      <motion.div
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: 100 }}
        transition={{ duration: 0.5 }}
        className="flex flex-wrap items-center justify-center lg:hidden gap-4"
      >
        <motion.div
          variants={iconVatiants(2.5)}
          initial="initial"
          animate="animate"
          className="rounded-2xl border-4 border-neutral-800 p-4"
        >
          <RiReactjsLine className="text-7xl text-cyan-400" />
        </motion.div>
        <motion.div
          variants={iconVatiants(3)}
          initial="initial"
          animate="animate"
          className="rounded-2xl border-4 border-neutral-800 p-4"
        >
          <SiMongodb className="text-7xl text-green-500" />
        </motion.div>
        <motion.div
          variants={iconVatiants(2)}
          initial="initial"
          animate="animate"
          className="rounded-2xl border-4 border-neutral-800 p-4"
        >
          <SiExpress className="text-7xl text-white" />
        </motion.div>
        <motion.div
          variants={iconVatiants(3)}
          initial="initial"
          animate="animate"
          className="rounded-2xl border-4 border-neutral-800 p-4"
        >
          <SiGithub className="text-7xl text-white" />
        </motion.div>
        <motion.div
          variants={iconVatiants(1)}
          initial="initial"
          animate="animate"
          className="rounded-2xl border-4 border-neutral-800 p-4"
        >
          <FaNodeJs className="text-7xl text-green-500" />
        </motion.div>
        <motion.div
          variants={iconVatiants(1.5)}
          initial="initial"
          animate="animate"
          className="rounded-2xl border-4 border-neutral-800 p-4"
        >
          <FaAws className="text-7xl text-orange-500" />
        </motion.div>
        <motion.div
          variants={iconVatiants(3)}
          initial="initial"
          animate="animate"
          className="rounded-2xl border-4 border-neutral-800 p-4"
        >
          <SiOpenai className="text-7xl text-white" />
        </motion.div>
        <motion.div
          variants={iconVatiants(0.5)}
          initial="initial"
          animate="animate"
          className="rounded-2xl border-4 border-neutral-800 p-4"
        >
          <SiTensorflow className="text-7xl text-orange-500" />
        </motion.div>
        <motion.div
          variants={iconVatiants(3)}
          initial="initial"
          animate="animate"
          className="rounded-2xl border-4 border-neutral-800 p-4"
        >
          <SiPytorch className="text-7xl text-orange-500" />
        </motion.div>

        <motion.div
          variants={iconVatiants(1)}
          initial="initial"
          animate="animate"
          className="rounded-2xl border-4 border-neutral-800 p-4"
        >
          <FaTable className="text-7xl text-blue-700" />{" "}
        </motion.div>
        <motion.div
          variants={iconVatiants(6)}
          initial="initial"
          animate="animate"
          className="rounded-2xl border-4 border-neutral-800 p-4"
        >
          <BiBrain className="text-7xl text-gray-700" />{" "}
        </motion.div>
        <motion.div
          variants={iconVatiants(0.5)}
          initial="initial"
          animate="animate"
          className="rounded-2xl border-4 border-neutral-800 p-4"
        >
          <AiOutlineFileExcel className="text-7xl text-green-700" />{" "}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Technology;
