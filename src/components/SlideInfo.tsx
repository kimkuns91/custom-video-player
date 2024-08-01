import { contentState, modalState } from "@/lib/state/modalAtom";

import { Content } from "@prisma/client";
import { CurrentSlideData } from "./Hero";
import { IoMdBookmark } from "react-icons/io";
import OtherInfo from "./OtherInfo";
import React from "react";
import { motion } from "framer-motion";
import { useRecoilState } from "recoil";
import { useRouter } from "next/navigation";

interface SlideInfoProps {
  transitionData: Content;
  currentSlideData: CurrentSlideData;
}

const SlideInfo: React.FC<SlideInfoProps> = ({
  transitionData,
  currentSlideData,
}) => {
  const navigate = useRouter();
  const [showModal, setShowModal] = useRecoilState(modalState);
  const [currentMovie, setCurrentMovie] = useRecoilState(contentState);

  return (
    <>
      {/* <motion.span layout className=" mb-2 h-1 w-5 rounded-full bg-white" /> */}
      <OtherInfo
        data={transitionData ? transitionData : currentSlideData.data}
      />
      <motion.div layout className=" mt-5 flex items-center gap-3">
        <button
          onClick={() => {
            navigate.push(`/watch/${currentSlideData.data.id}`);
          }}
          className=" w-fit rounded-full bg-white text-black px-6 py-2 text-lg font-medium transition duration-300 
            ease-in-out hover:bg-white hover:text-black "
        >
재생
        </button>
        <button
          onClick={() => {
            setCurrentMovie(
              transitionData ? transitionData : currentSlideData.data
            );
            setShowModal(true);
          }}
          className=" w-fit rounded-full border-[1px] border-[#ffffff8f] px-6 py-2 text-lg font-medium transition duration-300 
            ease-in-out hover:bg-white hover:text-black "
        >
          상세정보
        </button>
        <button
          className="flex h-[41px] w-[41px] items-center justify-center rounded-full bg-yellow-500 text-xs  transition 
            duration-300 ease-in-out hover:opacity-80 "
        >
          <IoMdBookmark className=" text-xl" />
        </button>
      </motion.div>
    </>
  );
};

export default SlideInfo;
