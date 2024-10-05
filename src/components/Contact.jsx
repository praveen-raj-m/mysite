import React, { useState } from "react";
import emailjs from "emailjs-com";
import { motion } from "framer-motion";
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaEnvelope } from "react-icons/fa";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs
      .send(
        import.meta.env.VITE_APP_SERVICE_ID,
        import.meta.env.VITE_APP_TEMPLATE_ID,
        { name, email, message },
        import.meta.env.VITE_APP_USER_ID
      )
      .then((response) => {
        console.log("Email sent successfully!", response.status, response.text);
        setStatus(
          "Your message has been sent and I will get back to you shortly!"
        );
        setName("");
        setEmail("");
        setMessage("");
      })
      .catch((error) => {
        console.error("Error sending email:", error);
        setStatus("Error sending message, please try again.");
      });
  };

  return (
    <section id="contact">
      <div className="border-b border-neutral-900 pb-20 flex justify-center items-center">
        <div className="w-full max-w-lg">
          <motion.h1
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: -100 }}
            transition={{ duration: 1 }}
            className="my-10 text-center text-5xl"
          >
            Let's Talk !!
          </motion.h1>
          <motion.div
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: -100 }}
            transition={{ duration: 1 }}
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
          <form className="my-4 " onSubmit={handleSubmit}>
            <div className="mb-4 mx-auto">
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border rounded-md"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium">
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border rounded-md"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="message" className="block text-sm font-medium">
                  Your Message
                </label>
                <textarea
                  id="message"
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border rounded-md"
                />
              </div>
              <button
                type="submit"
                className="bg-neutral-900 px-4 py-2 text-xl text-black rounded w-3/4 mx-auto block hover:bg-neutral-700"
              >
                Send Message
              </button>
            </div>
          </form>

          {status && <p className="mt-4 text-center">{status}</p>}
        </div>
      </div>
    </section>
  );
};

export default Contact;
