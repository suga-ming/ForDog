import { motion } from "framer-motion";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import logo from "../../assets/images/logo.png";

const Img = styled(motion.img)``;
const Text = styled(motion.div)``;

const boxVariants = {
  initial: {
    opacity: 1,
    scale: 1,
  },
  visible: {
    scale: 0.4,
    y: -106,
    x: 0,
    ratateZ: 180,
    transition: { type: "twins", delay: 2 },
  },
};

const textVariants = {
  initial: {
    opacity: 1,
    scale: 1,
  },
  visible: {
    opacity: 0,
    transition: { type: "twins", delay: 1.5 },
  },
};

const Spalsh = () => {
  const navigate = useNavigate();
  useEffect(() => {
    let timer = setTimeout(() => {
      navigate("/aHome");
    }, 2300);
  });

  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <Img
        variants={boxVariants}
        initial="initial"
        animate="visible"
        className="w-80 h-80"
        src={logo}
      />
      <Text
        variants={textVariants}
        initial="initial"
        animate="visible"
        className="text-pet_pink text-3xl font-semibold pl-8 mt-4"
      >
        For Dog
      </Text>
    </div>
  );
};

export default Spalsh;
