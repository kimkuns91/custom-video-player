import { contentState, modalState } from "@/lib/state/modalAtom";

import { Content } from "@prisma/client";
import React from "react";
import { motion } from "framer-motion";
import { useRecoilState } from "recoil";

interface SliderCardProps {
  data: Content;
}

const SliderCard: React.FC<SliderCardProps> = ({ data }) => {
  const [showModal, setShowModal] = useRecoilState(modalState);
  const [currentMovie, setCurrentMovie] = useRecoilState(contentState);
  
  return (
    <motion.div
      className="relative h-52 min-w-[250px] rounded-2xl shadow-md md:h-80 md:min-w-[250px] cursor-pointer"
      onClick={() => {
        setCurrentMovie(data);
        setShowModal(true);
      }}
      layout
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{
        scale: 1,
        opacity: 1,
        transition: {
          duration: 0.4,
        },
      }}
      exit={{ scale: 0.8, opacity: 0 }}
      transition={{
        type: "spring",
        damping: 20,
        stiffness: 100,
      }}
    >
      <motion.img
        layoutId={data.posterUrl!}
        alt="Transition Image"
        src={data.posterUrl!}
        className=" absolute h-full w-full  rounded-2xl  object-cover brightness-75 "
      />

      <motion.div className=" absolute z-10 flex h-full items-end p-4">
        <motion.div>
          <motion.div
            layout
            className=" mb-2 h-[2px] w-3 rounded-full bg-white"
          ></motion.div>

          <motion.h1
            layoutId={data.title}
            className="text-xl leading-6 text-white mb-3"
          >
            {data.title}
          </motion.h1>
          <motion.p
            layoutId={data.description!}
            className="text-xs text-[#D5D5D6] truncated-text"
          >
            {data.description}
          </motion.p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default SliderCard;
