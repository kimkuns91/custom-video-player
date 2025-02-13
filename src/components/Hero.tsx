"use client";

import { AnimatePresence } from "framer-motion";
import BackgroundImage from "@/components/BackgroundImage";
import { Content } from "@prisma/client";
import Controls from "@/components/Controls";
import Header from "@/components/Header";
import React from "react";
import SlideInfo from "@/components/SlideInfo";
import Slides from "@/components/Slides";

export type CurrentSlideData = {
  data: Content;
  index: number;
};

interface HeroProps {
  sliderData: Content[];
  initData: Content;
}

const Hero: React.FC<HeroProps> = ({ sliderData, initData }) => {
  const [data, setData] = React.useState<Content[]>(sliderData.slice(1));
  const [transitionData, setTransitionData] = React.useState<Content>(
    sliderData[0]
  );
  const [currentSlideData, setCurrentSlideData] =
    React.useState<CurrentSlideData>({
      data: initData,
      index: 0,
    });

  return (
    <div
      className={`
        relative h-[70dvh] select-none overflow-hidden text-white antialiased`}
    >
      <AnimatePresence>
        <BackgroundImage
          transitionData={transitionData}
          currentSlideData={currentSlideData}
        />
        <div className="absolute z-30 h-full w-full">
          <div className="flex h-full w-full grid-cols-10 flex-col md:grid">
            {/* Slider Left Section Content */}
            <div className="col-span-4 mb-3 flex h-full flex-1 flex-col justify-end px-5 md:mb-0 md:mt-20 md:justify-center md:px-10">
              <SlideInfo
                transitionData={transitionData}
                currentSlideData={currentSlideData}
              />
            </div>

            {/* Slider Right Carousel Content */}
            <div className="col-span-6 flex h-full flex-1 flex-col justify-start p-4 md:justify-center md:mt-20 md:p-10">
              <Slides data={data} />
              <Controls
                currentSlideData={currentSlideData}
                data={data}
                transitionData={transitionData}
                initData={initData}
                handleData={setData}
                handleTransitionData={setTransitionData}
                handleCurrentSlideData={setCurrentSlideData}
                sliderData={sliderData}
              />
            </div>
          </div>
        </div>
      </AnimatePresence>
    </div>
  );
};

export default Hero;
