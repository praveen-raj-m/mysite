import project1 from "../assets/projects/project-1.jpeg";
import project2 from "../assets/projects/project-2.png";
import project3 from "../assets/projects/project-3.png";
import project4 from "../assets/projects/project-4.png";
import project5 from "../assets/projects/Project-5.png";
import project6 from "../assets/projects/project6.png";

export const HERO_CONTENT =
  "I am a Computer Science student experienced in Data Analysis and Full stack Development.  I love creating tools that make a difference in people’s lives. I adapt quickly to new technologies and enjoy diving into the latest trends, constantly learning and growing. For me, it’s not just about building, it’s about creating productive applications. Let’s create something amazing together!";

export const ABOUT_TEXT = `A great man once said, "In the middle of every difficulty lies opportunity." And while I’d like to say I’m an expert at finding opportunities in every challenge, Well let’s be honest, I mostly just find a lot of bugs to fix.`;

export const QUOTES = [
  {
    quote:
      "You don't understand anything until you learn it more than one way.",
    author: "Marvin Minsky",
    specialty: "Turing Award (1969)",
  },
  {
    quote: "Self-righteousness has killed more people than smoking.",
    author: "John McCarthy",
    specialty: "Turing Award (1971)",
  },
  {
    quote: "Life is shockingly short; I don't want to waste that many days.",
    author: "Andrew Ng",
    specialty: "Time 100 Most Influential People in AI (2023)",
  },
  {
    quote: "Even a cat has things it can do that AI cannot.",
    author: "Fei-Fei Li",
    specialty: "Inventor of ImageNet",
  },
  {
    quote:
      "Data is a precious thing and will last longer than the systems themselves.",
    author: "Tim Berners-Lee",
    specialty: "Inventor of the World Wide Web",
  },
  {
    quote: "Not all treasure is silver and gold, mate.",
    author: "Jack Sparrow",
    specialty: "Pirates of the Caribbean",
  },
  {
    quote: "What would I do if I weren’t afraid? And then go do it.",
    author: "Sheryl Sandberg",
    specialty: "COO of Facebook",
  },
  {
    quote: "Get busy living, or get busy dying.",
    author: "Andy Dufresne",
    specialty: "The Shawshank Redemption",
  },
  {
    quote: "The journey of a thousand miles begins with one step.",
    author: "Lao Tzu",
    specialty: "Chinese Philosopher",
  },
];

export const EXPERIENCES = [
  {
    year: "Nov 2023 - Present",
    role: "Energy Data Analyst",
    company: "Energy Efficiency Center, Arizona State University",
    description: `Analyzed large datasets from energy consumption reports, identifying cost-saving opportunities leading to 35% energy savings across facilities. Automated processes for reading energy bills using Python, reducing manual errors and improving reporting accuracy.`,
    technologies: ["Python", "SQL", "LLaMA 3.1", "Excel"],
  },
  {
    year: "May 2024 - Aug 2024",
    role: "Full Stack Developer",
    company: "Energy Efficiency Center, Arizona State University",
    description: (
      <>
        Designed and led the development of the PIEE website, a MERN-stack
        application for industrial energy projects, improving search efficiency
        by 200x. Integrated secure user authentication with JWT and built
        real-time energy dashboards for clients to track energy usage and
        performance.
      </>
    ),
    technologies: ["ReactJS", "Node.js", "MongoDB", "JWT"],
  },
  {
    year: "Dec 2022 - Jun 2023",
    role: "Computer Vision Research Intern",
    company: "RBG Labs, Indian Institute of Technology, Madras",
    description: `Developed a deep-learning pipeline for road safety using real-time traffic camera data. Trained models for object detection, traffic signal classification, and scene text detection with YOLOv7 and MobileNetV3, achieving high accuracy in real-time applications.`,
    technologies: ["YOLOv7", "MobileNetV3", "TensorFlow", "OpenCV"],
  },
  {
    year: "Jul 2021 - Oct 2021",
    role: "Deep Learning Research Intern",
    company: "Space System Laboratory, IIITD, Delhi",
    description: `Worked with a team to develop and train three ensemble deep learning architectures, including LSTMs and deep neural networks, for satellite orbit prediction. Achieved an R-squared error of 0.33 using raw Geospatial datasets from satellites.`,
    technologies: [
      "LSTMs",
      "Deep Neural Networks",
      "Python",
      "Satellite Geospatial Data",
    ],
  },
  {
    year: "May 2022 - Aug 2022",
    role: "Optimization and AI Intern (Fully Funded)",
    company: "Mitacs Internship",
    description: `Implemented a two-phase Python framework to solve the Examination Timetabling problem (NP-hard). Modified AI optimization techniques, improving computational time by 300%. Generated timetables for 800 students using benchmark datasets.`,
    technologies: [
      "Python",
      "AI Optimization",
      "NP-Hard CSP",
      "Timetabling Algorithms",
    ],
  },
  {
    year: "May 2021 - Sep 2021",
    role: "AI and Development Intern",
    company: "Indian Institute of Technology, Roorkee",
    description: `Developed software using Python and PyQT5 to optimize Energy Plus simulations as part of the ZED-I project. The system performed optimization and sensitivity analysis 15x faster using AI algorithms for better building energy simulations.`,
    technologies: ["Python", "PyQT5", "Energy Plus", "Meta-heuristics"],
  },
];

export const PROJECTS = [
  {
    title: "Local AI RAG Agent",
    image: project1,
    description: `Automated question answering and code generation using LLaMA models and RAG with ChromaDB. Stored over 1,000 vector embeddings and implemented robust error handling to enhance accuracy and reliability in code and general queries.`,
    technologies: ["LLaMA", "ChromaDB", "Python", "Pydantic"],
    github: "https://github.com/praveen-raj-m/local-rags",
  },
  {
    title: "Real-time Sales Forecasting",
    image: project2,
    description: `Built a time series sales forecasting model with an r-squared error of 0.996. Integrated with Tableau to create interactive dashboards for analyzing sales by region and year, providing actionable insights for business decisions.`,
    technologies: ["Python", "Tableau", "Time Series", "Machine Learning"],
    github: "https://github.com/praveen-raj-m/LiveForecastAndAnalytics",
  },
  {
    title: "Land Use Land Cover Classification using RESNET50",
    image: project3,
    description: `Leveraged transfer learning for land cover classification using satellite images (27,000+). Tuned hyperparameters of the ResNet50 model, improving the classification accuracy to 94.6%. The project involved working with image processing and neural networks for spectral image analysis.`,
    technologies: [
      "OpenCV",
      "PyTorch",
      "Transfer Learning",
      "Image Processing",
    ],
    github: "https://github.com/praveen-raj-m/satellite-imagery-classification",
  },
  {
    title: "Intelligent Compliance Assistant with MCP",
    image: project4, // (replace with your project image)
    description: `Built a local Retrieval-Augmented Generation (RAG) system for querying regulations and comparing company policies. Integrated Model Context Protocol (MCP) to minimize hallucinations and ensure traceable compliance validations.`,
    technologies: ["Python", "React", "Ollama", "Qdrant", "LLMs", "RAG", "MCP"],
    github: "https://github.com/praveen-raj-m/compliance-ai", // (replace if different)
  },

  // {
  //   title: "Portfolio Website",
  //   image: project4,
  //   description: `Developed a personal portfolio website using ReactJS, showcasing projects, skills, and experiences. Integrated animations and styled the site with Tailwind CSS for a modern and responsive design.`,
  //   technologies: ["ReactJS", "TailwindCSS", "JavaScript", "React Animations"],
  //   github: "https://github.com/praveen-raj-m/mysite",
  // },
  {
    title: "Directional Stock Price Prediction Using News Data",
    image: project5,
    description: `Built predictive models using news sentiment analysis for stock price direction forecasting. Compared ML (SVM, Logistic Regression, XGBoost) and DL models (FinBERT) with over 87,000 articles for Amazon and Apple.`,
    technologies: ["Python", "Transformers", "FinBERT", "Sentiment Analysis"],
    github:
      "https://github.com/Harshith-N-Srivatsa/Bi-Directional-Stock-Prediction",
  },
  {
    title: "Context-Aware SQL Query Validation with MCP",
    image: project6,
    description: `Developed a Retrieval-Augmented Generation (RAG) system with Model Context Protocol (MCP) for schema-aware SQL query validation. Integrated live schema syncing, hallucination filtering, and SQL safety checks for LLM-generated queries.`,
    technologies: ["Python", "SQLite", "LLMs", "RAG", "Regex", "MCP"],
    github: "https://github.com/praveen-raj-m/sql-rag",
  },
];

export const CONTACT = {
  address: "1009 E Univeristy Dr, Tempe AZ 85288 ",
  phoneNo: "+1 (602) 394 2178",
  email: "pmohanr4@asu.edu",
  linkedIn: "https://www.linkedin.com/in/praveenraj-m/",
};
