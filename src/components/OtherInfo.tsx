import { Content } from "@prisma/client";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";

interface OtherInfoProps {
  data: Content;
}

const item = {
  hidden: {
    y: "100%",
    transition: { ease: [0.455, 0.03, 0.515, 0.955], duration: 0.85 },
  },
  visible: {
    y: 0,
    transition: { ease: [0.455, 0.03, 0.515, 0.955], duration: 0.75 },
  },
};

const OtherInfo: React.FC<OtherInfoProps> = ({ data }) => {
  return (
    <motion.div initial="hidden" animate="visible" className="flex flex-col space-y-6">
      {data?.titleImageUrl ? (
        <AnimatedImage src={data?.titleImageUrl} className="md:w-full" />
      ) : (
        <AnimatedText
          className="my-1 text-4xl font-semibold md:my-3 md:text-8xl md:leading-[100px]"
          data={data?.title}
        />
      )}
      <AnimatedText className="text-base text-[#D5D5D6]" data={data?.description!} />
    </motion.div>
  );
};

export default OtherInfo;

const AnimatedImage = ({ src, className }: { src: string; className?: string }) => {
  return (
    <span style={{ overflow: "hidden", display: "inline-block" }}>
      <motion.div className={`${className}`} variants={item} key={src} style={{ position: 'relative', width: '100%', height: 'auto' }}>
        <Image
          src={src}
          layout="responsive"
          width={700} // 적절한 비율로 설정
          height={475} // 적절한 비율로 설정
          style={{ objectFit: "contain" }}
          alt="title"
          className="rounded-sm"
        />
      </motion.div>
    </span>
  );
};

const AnimatedText = ({ data, className }: { data?: string; className?: string }) => {
  return (
    <span style={{ overflow: "hidden", display: "inline-block" }}>
      <motion.p className={` ${className}`} variants={item} key={data}>
        {data}
      </motion.p>
    </span>
  );
};
