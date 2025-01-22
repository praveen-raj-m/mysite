import { useEffect, useState } from "react";
import {
  motion,
  useMotionValue,
  useAnimation,
  useTransform,
} from "framer-motion";
import { RiReactjsLine } from "react-icons/ri";
import {
  SiMongodb,
  SiExpress,
  SiGithub,
  SiOpenai,
  SiTensorflow,
  SiPytorch,
} from "react-icons/si";
import { FaNodeJs, FaAws, FaTable } from "react-icons/fa";
import { BiBrain } from "react-icons/bi";
import { AiOutlineFileExcel } from "react-icons/ai";

const RollingGallery = ({ autoplay = false, pauseOnHover = false }) => {
  const [isScreenSizeSm, setIsScreenSizeSm] = useState(
    window.innerWidth <= 640
  );

  useEffect(() => {
    const handleResize = () => setIsScreenSizeSm(window.innerWidth <= 640);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const cylinderWidth = isScreenSizeSm ? 1100 : 3000;
  const faceCount = 24;
  const faceWidth = (cylinderWidth / faceCount) * 1.5;
  const radius = cylinderWidth / (2 * Math.PI);

  const dragFactor = 0.05;
  const rotation = useMotionValue(0);
  const controls = useAnimation();

  const transform = useTransform(
    rotation,
    (val) => `rotate3d(0,1,0,${val}deg)`
  );

  const startInfiniteSpin = (startAngle) => {
    controls.start({
      rotateY: [startAngle, startAngle - 360],
      transition: {
        duration: 75,
        ease: "linear",
        repeat: Infinity,
      },
    });
  };

  useEffect(() => {
    if (autoplay) {
      const currentAngle = rotation.get();
      startInfiniteSpin(currentAngle);
    } else {
      controls.stop();
    }
  }, [autoplay]);

  const handleUpdate = (latest) => {
    if (typeof latest.rotateY === "number") {
      rotation.set(latest.rotateY);
    }
  };

  const handleDrag = (_, info) => {
    controls.stop();
    rotation.set(rotation.get() + info.offset.x * dragFactor);
  };

  const handleDragEnd = (_, info) => {
    const finalAngle = rotation.get() + info.velocity.x * dragFactor;
    rotation.set(finalAngle);

    if (autoplay) {
      startInfiniteSpin(finalAngle);
    }
  };

  const handleMouseEnter = () => {
    if (autoplay && pauseOnHover) {
      controls.stop();
    }
  };
  const handleMouseLeave = () => {
    if (autoplay && pauseOnHover) {
      const currentAngle = rotation.get();
      startInfiniteSpin(currentAngle);
    }
  };

  const icons = [
    {
      component: <RiReactjsLine className="text-5xl text-cyan-400" />,
      key: "react",
    },
    {
      component: <SiMongodb className="text-5xl text-green-500" />,
      key: "mongodb",
    },
    {
      component: <SiExpress className="text-5xl text-white" />,
      key: "express",
    },
    { component: <SiGithub className="text-5xl text-white" />, key: "github" },
    {
      component: <FaNodeJs className="text-5xl text-yellow-500" />,
      key: "nodejs",
    },
    { component: <FaAws className="text-5xl text-orange-500" />, key: "aws" },
    {
      component: <RiReactjsLine className="text-5xl text-cyan-400" />,
      key: "react",
    },
    {
      component: <SiMongodb className="text-5xl text-green-500" />,
      key: "mongodb",
    },
    {
      component: <SiExpress className="text-5xl text-white" />,
      key: "express",
    },
    { component: <SiGithub className="text-5xl text-white" />, key: "github" },
    {
      component: <FaNodeJs className="text-5xl text-yellow-500" />,
      key: "nodejs",
    },
    { component: <FaAws className="text-5xl text-orange-500" />, key: "aws" },
    {
      component: <RiReactjsLine className="text-5xl text-cyan-400" />,
      key: "react",
    },
    {
      component: <SiMongodb className="text-5xl text-green-500" />,
      key: "mongodb",
    },
    {
      component: <SiExpress className="text-5xl text-white" />,
      key: "express",
    },
    { component: <SiGithub className="text-5xl text-white" />, key: "github" },
    {
      component: <FaNodeJs className="text-5xl text-yellow-500" />,
      key: "nodejs",
    },
    { component: <FaAws className="text-5xl text-orange-500" />, key: "aws" },
    {
      component: <RiReactjsLine className="text-5xl text-cyan-400" />,
      key: "react",
    },
    {
      component: <SiMongodb className="text-5xl text-green-500" />,
      key: "mongodb",
    },
    {
      component: <SiExpress className="text-5xl text-white" />,
      key: "express",
    },
    { component: <SiGithub className="text-5xl text-white" />, key: "github" },
    {
      component: <FaNodeJs className="text-5xl text-yellow-500" />,
      key: "nodejs",
    },
    { component: <FaAws className="text-5xl text-orange-500" />, key: "aws" },
  ];

  return (
    <div className="relative h-[250px] w-full overflow-hidden">
      <div className="absolute top-0 left-0 h-full w-[36px] z-10" />
      <div className="absolute top-0 right-0 h-full w-[36px] z-10" />

      <div className="flex h-full items-center justify-center [perspective:1000px] [transform-style:preserve-3d]">
        <motion.div
          drag="x"
          dragElastic={0}
          onDrag={handleDrag}
          onDragEnd={handleDragEnd}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          animate={controls}
          onUpdate={handleUpdate}
          style={{
            transform: transform,
            rotateY: rotation,
            width: cylinderWidth,
            transformStyle: "preserve-3d",
          }}
          className="flex min-h-[200px] cursor-grab items-center justify-center [transform-style:preserve-3d]"
        >
          {icons.map(({ component, key }, i) => (
            <div
              key={key}
              className="group absolute flex h-fit items-center justify-center p-[8%] [backface-visibility:hidden] md:p-[6%]"
              style={{
                width: `${faceWidth}px`,
                transform: `rotateY(${
                  (360 / faceCount) * i
                }deg) translateZ(${radius}px)`,
              }}
            >
              <div className="rounded-2xl border-4 border-neutral-800 p-4">
                {component}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default RollingGallery;
