

import React, { useState } from "react";
import { PROJECTS } from "../constants";
import { motion } from "framer-motion";
import { Flipper, Flipped } from "react-flip-toolkit";
import { FaGithub } from "react-icons/fa"; 

const Projects = () => {
  const [flipped, setFlipped] = useState(null);

  const handleClick = (index) => {
    setFlipped(flipped === index ? null : index);
  };

  return (
    <section id="projects" className="relative">
      <div className="border-b border-neutral-900 pb-4 bg-cover bg-center bg-fixed">
        <div className=" pb-4">
          <motion.h1
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: -100 }}
            transition={{ duration: 0.5 }}
            className="my-20 text-center text-5xl text-white"
          >
            Projects
          </motion.h1>
          <Flipper flipKey={flipped}>
            <div className="flex flex-wrap justify-center">
              {PROJECTS.map((project, index) => (
                <Flipped key={index} flipId={index}>
                  <div
                    className="mb-8 p-6 w-full lg:w-1/3 cursor-pointer perspective"
                    onClick={() => handleClick(index)}
                  >
                    <div
                      className={`relative h-[450px] lg:h-[575px] transition-transform duration-500 transform-style preserve-3d ${
                        flipped === index ? "rotate-y-180" : ""
                      }`}
                    >
                      <div className="absolute w-full h-full backface-hidden bg-neutral-800 rounded-lg shadow-lg overflow-hidden flex flex-col p-6">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-48 object-cover"
                        />
                        <div className="flex-grow">
                          <h6 className="my-4 text-xl lg:text-3xl font-semibold text-white">
                            {project.title}
                          </h6>
                          <div className="flex flex-wrap gap-2">
                            {project.technologies.map((tech, techIndex) => (
                              <span
                                className="py-2 px-4 rounded bg-neutral-900 text-md lg:text-xl font-medium text-blue-400"
                                key={techIndex}
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-3xl text-white mt-4 self-end"
                        >
                          <FaGithub />
                        </a>
                      </div>
                      <div className="absolute w-full h-full backface-hidden bg-neutral-800 rounded-lg shadow-lg p-6 transform rotate-y-180">
                        <h6 className="mb-2 text-xl lg:text-3xl font-semibold text-white">
                          {project.title} - Detailed View
                        </h6>
                        <p className="mb-4 text-xl lg:text-2xl text-neutral-400">
                          {project.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </Flipped>
              ))}
            </div>
          </Flipper>
        </div>
      </div>
    </section>
  );
};

export default Projects;
