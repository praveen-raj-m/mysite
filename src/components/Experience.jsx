
import React from "react";
import { EXPERIENCES } from "../constants";
import { motion } from "framer-motion";

const Experience = () => {
  return (
    <section id="experiences">
      <div className="border-b border-neutral-900 pb-4">
        <motion.h1
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: -100 }}
          transition={{ duration: 0.5 }}
          className="my-20 text-center text-5xl"
        >
          Experience
        </motion.h1>
        <div>
          {EXPERIENCES.map((experience, index) => (
            <motion.div 
              key={index} 
              className="mb-8 p-6 rounded-lg shadow-lg bg-neutral-900"
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.5, delay:  0.5 }}
            >
              <div className="flex flex-wrap items-center">
                <motion.div
                  whileInView={{ opacity: 1, x: 0 }}
                  initial={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5 }}
                  className="w-full lg:w-2/5 flex flex-wrap lg:justify-center"
                >
                  <p className="mb-2 text-3xl text-neutral-200">
                    {experience.year}
                  </p>
                </motion.div>
                <motion.div
                  whileInView={{ opacity: 1, x: 0 }}
                  initial={{ opacity: 0, x: 100 }}
                  transition={{ duration: 0.5 }}
                  className="w-full max-w-xl lg:w-3/5 flex flex-wrap lg:justify-left"
                >
                  <h6 className="mb-2 text-3xl font-semibold">
                    {experience.role} -{" "}
                    <span className="text-3xl text-blue-300">
                      {experience.company}
                    </span>
                  </h6>
                  <div className="flex flex-wrap gap-2 mt-4">
                    <p className="mb-4 text-2xl text-neutral-400">
                      {experience.description}
                    </p>
                    {experience.technologies.map((tech, techIndex) => (
                      <motion.span
                        key={techIndex}
                        whileHover={{ scale: 1.1 }}
                        className="mr-2 mt-4 rounded bg-black px-2 py-1 text-xl font-medium text-blue-800"
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
