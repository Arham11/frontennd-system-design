"use client";

import { useState } from "react";

interface ISliderProps {
  data: {
    id: number;
    title: string;
    url: string;
  }[];
}

function Slider({ data }: Readonly<ISliderProps>) {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const currentData = data[currentSlide];

  function handleNextSlide() {
    return setCurrentSlide((currentSlide) => {
      if (currentSlide < data.length - 1) {
        return currentSlide + 1;
      } else {
        return 0;
      }
    });
  }

  function handlePrevSlide() {
    return setCurrentSlide((currentSlide) => {
      if (currentSlide > 0) {
        return currentSlide - 1;
      } else {
        return data.length - 1;
      }
    });
  }

  return (
    <div className="flex">
      <button
        className="flex shrink-0 items-center justify-center"
        onClick={handlePrevSlide}
      >
        <span className="inline-block rounded-full bg-black p-2 text-white">
          &lt;
        </span>
      </button>
      <div className="flex flex-col justify-center">
        <div>
          <img src={currentData.url} alt={currentData.title} />
        </div>
        <div className="text-center">{currentData.title}</div>
      </div>
      <button className="flex items-center" onClick={handleNextSlide}>
        &gt;
      </button>
    </div>
  );
}

export default Slider;
