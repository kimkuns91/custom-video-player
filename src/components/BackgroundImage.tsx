import { Content } from "@prisma/client";
import { CurrentSlideData } from "./Hero";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";

interface BackgroundImageProps {
  transitionData: Content;
  currentSlideData: CurrentSlideData;
}

const BackgroundImage: React.FC<BackgroundImageProps> = ({
  transitionData,
  currentSlideData,
}) => {
  return (
    <>
      {/* Background Transition Animation  */}
      {transitionData && (
        <motion.img
          key={transitionData.backdropUrl}
          layoutId={transitionData.posterUrl!}
          alt="Transition Image"
          transition={{
            opacity: { ease: "linear" },
            layout: { duration: 0.6 },
          }}
          className="absolute left-0 top-0 z-10 h-full w-full object-cover brightness-50"
          src={transitionData.backdropUrl!}
        />
      )}

      {/* Background Image */}
      <motion.img
        alt="Current Image"
        key={currentSlideData.data.backdropUrl + "transition"}
        src={currentSlideData.data.backdropUrl!}
        className="absolute left-0 top-0 h-full w-full object-cover brightness-50"
      />
      <Image
        className="z-20"
        src={"/images/gradation.png"}
        alt="Onboarding"
        layout="fill"
        style={{ objectFit: "cover" }}
        priority
      />
    </>
  );
};

export default BackgroundImage;
