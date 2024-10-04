import React from 'react';

const SkillsSection = () => {
  return (
    <section className="bg-white py-20" id="skills">
      <div className="container mx-auto text-center">
        <h2 className="text-5xl font-bold mb-10">Skills</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="bg-teal-100 p-6 rounded-lg shadow-md">ReactJS</div>
          <div className="bg-teal-100 p-6 rounded-lg shadow-md">Node.js</div>
          <div className="bg-teal-100 p-6 rounded-lg shadow-md">MongoDB</div>
          <div className="bg-teal-100 p-6 rounded-lg shadow-md">Tailwind CSS</div>
          <div className="bg-teal-100 p-6 rounded-lg shadow-md">Python</div>
          <div className="bg-teal-100 p-6 rounded-lg shadow-md">Machine Learning</div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
