import React, { useEffect, useRef, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { FaArrowRight } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";
import { log } from "console";
type Props = {
  children: any;
};

function ReviewsSlider({ children }: Props) {
  const [oldSlide, setOldSlide] = useState(0);
  const [activeSlide, setActiveSlide] = useState(0);
  const [activeSlide2, setActiveSlide2] = useState(0);
  let sliderRef = useRef<Slider>(null);
  const [slider, setSlider] = useState<Slider | null>(null);

  const next = () => {
    if (slider) {
      slider.slickNext();
    }
  };

  const previous = () => {
    if (slider) {
      slider.slickPrev();
    }
  };
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" && window.innerWidth < 700,
  );
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: isMobile ? 1 : 2,
    slidesToScroll: isMobile ? 1 : 2,
    arrows: false,
    beforeChange: (
      current: React.SetStateAction<number>,
      next: React.SetStateAction<number>,
    ) => {
      setOldSlide(current);
      setActiveSlide(next);
    },
    afterChange: (current: React.SetStateAction<number>) =>
      setActiveSlide2(current),
  };

  useEffect(() => {
    console.log(activeSlide, "reviews active slide");
  }, [activeSlide]);

  return (
    <div className="text-white">
      <div className="flex justify-between mb-5 items-center">
        <p>Reviews</p>
        <button className="bg-[#141414] p-4 rounded-[8px] border-[1px] border-[#262626]">Add Your Review</button>
      </div>
      <Slider
        {...settings}
        ref={(slider) => {
          setSlider(slider);
        }}
      >
        {children}
      </Slider>
      <div className="flex h-[55px] w-[19%] items-center justify-evenly rounded-[12px] text-white sm:mx-auto ml-[30%]">
        <button
          onClick={previous}
          className="rounded-[50%] bg-[#1A1A1A] p-[10px]"
        >
          <FaArrowLeft />
        </button>
        <div className="doooots">
          <button
            onClick={() => {
              (slider as any)?.slickGoTo(0);
            }}
            className={activeSlide == 0 ? "active" : ""}
          ></button>
          <button
            className={activeSlide == 2 ? "active" : ""}
            onClick={() => {
              (slider as any)?.slickGoTo(2);
            }}
          ></button>
          <button
            className={activeSlide == 4 ? "active" : ""}
            onClick={() => {
              (slider as any)?.slickGoTo(4);
            }}
          ></button>
        </div>
        <button onClick={next} className="rounded-[50%] bg-[#1A1A1A] p-[10px]">
          <FaArrowRight />
        </button>
      </div>
    </div>
  );
}

export default ReviewsSlider;
