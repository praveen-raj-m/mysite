import React from "react";
import { EXPERIENCES } from "../constants/index.jsx";
import { motion } from "framer-motion";

const Experience = () => {
  return (
    <section id="experiences">
      <div className="border-b border-neutral-900 pb-4">
        <motion.h1
          initial={{ opacity: 0, y: -100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="my-20 text-center text-5xl"
          viewport={{ once: true }} 
        >
          Experience
        </motion.h1>
        <div>
          {EXPERIENCES.map((experience, index) => (
            <motion.div 
              key={index} 
              className="mb-8 p-6 rounded-lg shadow-lg bg-neutral-900"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <div className="flex flex-wrap items-center">
                <motion.div
                  initial={{ opacity: 0, x: -100 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  className="w-full lg:w-2/5 flex flex-wrap lg:justify-center"
                  viewport={{ once: true }} 
                >
                  <p className="mb-2 text-xl lg:text-3xl text-neutral-200">
                    {experience.year}
                  </p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 100 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  className="w-full max-w-xl lg:w-3/5 flex flex-wrap lg:justify-left"
                  viewport={{ once: true }} 
                >
                  <h6 className="mb-2 text-xl lg:text-3xl font-semibold">
                    {experience.role} -{" "}
                    <span className="text-xl lg:text-3xl text-blue-300">
                      {experience.company}
                    </span>
                  </h6>
                  <div className="flex flex-wrap gap-2 mt-4">
                    <p className="mb-4 text-xl lg:text-2xl text-neutral-400">
                      {experience.description}
                    </p>
                    {experience.technologies.map((tech, techIndex) => (
                      <motion.span
                        key={techIndex}
                        whileHover={{ scale: 1.1 }}
                        className="flex flex-wrap gap-2 rounded bg-black px-2 py-1 text-xl font-medium text-blue-400"
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