import { Content } from "@prisma/client";
import React from "react";
import SliderCard from "./SliderCard";

interface SlidesProps {
  data: Content[];
}

const Slides: React.FC<SlidesProps> = ({ data }) => {
  return (
    <div className=" flex w-full gap-6">
      {data.map((data) => {
        return <SliderCard key={data.id} data={data} />;
      })}
    </div>
  );
};

export default Slides;
