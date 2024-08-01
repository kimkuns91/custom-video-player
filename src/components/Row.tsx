'use client';

import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { useRef, useState } from 'react';

import { Content } from '@prisma/client';
import Thumbnail from './Thumbnail';

interface RowProps {
  title: string;
  contents: Content[];
}

const Row: React.FC<RowProps> = ({ title, contents }) => {
  const rowRef = useRef<HTMLDivElement>(null);
  const [isMoved, setIsMoved] = useState(false);

  // 테스트 끝나면 지울 코드
  const shuffleArray = (array: Content[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const shuffledContents = shuffleArray([...contents]);

  // 테스트 끝나면 지울 코드
  
  const handleClick = (direction: string) => {
    setIsMoved(true);

    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;

      const scrollTo =
        direction === 'left'
          ? scrollLeft - clientWidth
          : scrollLeft + clientWidth;

      rowRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <div className="space-y-4 mt-12 md:space-y-2">
      <h2 className="pl-10 cursor-pointer text-lg font-semibold text-[#e5e5e5] transition duration-200 hover:text-white md:text-2xl">
        {title}
      </h2>
      <div className="group relative md:-ml-2">
        <FaArrowLeft
          className={`absolute top-0 bottom-0 left-2 z-40 m-auto h-9 w-9 cursor-pointer opacity-0 transition hover:scale-125 group-hover:opacity-100 ${
            !isMoved && 'hidden'
          }`}
          onClick={() => handleClick('left')}
        />

        <div
          ref={rowRef}
          className="flex items-center space-x-2 overflow-x-scroll scrollbar-hide md:space-x-2.5 md:p-2"
        >
          {shuffledContents.map((content) => (
            <Thumbnail key={content.id} content={content} />
          ))}

        </div>

        <FaArrowRight
          className={`absolute top-0 bottom-0 right-2 z-40 m-auto h-9 w-9 cursor-pointer opacity-0 transition hover:scale-125 group-hover:opacity-100`}
          onClick={() => handleClick('right')}
        />
      </div>
    </div>
  );
};

export default Row;
