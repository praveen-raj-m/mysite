import React, { useState, useEffect } from "react";
import emailjs from "emailjs-com";
import { motion } from "framer-motion";
import { FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";
import ShinyText from './ShinyText';

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

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
        setIsModalOpen(true); 
        setName("");
        setEmail("");
        setMessage("");

        
        setTimeout(() => {
          setIsModalOpen(false);
        }, 5000);
      })
      .catch((error) => {
        console.error("Error sending email:", error);
        alert("Error sending message, please try again.");
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
            Let's Connect! 
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
          <form className="my-4" onSubmit={handleSubmit}>
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
                  className="mt-1 block w-full px-3 py-2 border text-black rounded-md"
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
                  className="mt-1 block w-full px-3 py-2 border text-black rounded-md"
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
                  className="mt-1 block w-full px-3 py-2 border rounded-md text-black"
                />
              </div>
              <button
                type="submit"
                className="bg-neutral-900 px-4 py-2 text-xl text-white rounded w-3/4 mx-auto block hover:bg-neutral-700"
              >
               <ShinyText text="Send Message" disabled={false} speed={5} />

              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Modal for success message */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-neutral-900 text-white p-8 rounded-lg shadow-lg text-center w-full max-w-sm mx-auto">
            <h2 className="text-2xl font-semibold mb-4">Message Sent!</h2>
            <p>Thanks for reaching out! I'll get back to you as soon as I can.</p>
            <button
              onClick={() => setIsModalOpen(false)} // Close modal
              className="mt-4 px-4 py-2 bg-neutral-700 text-white rounded hover:bg-neutral-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Contact;