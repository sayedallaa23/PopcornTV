import React, { useRef, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { FaArrowRight } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";
type Props = {
  children: any;
  sliderHeader: any;
  sliderDis?: any;
};

function CartSlider({ children, sliderHeader, sliderDis }: Props) {
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
    infinite: isMobile ? false : true,
    speed: 500,
    slidesToShow: isMobile ? 2 : 5,
    slidesToScroll: isMobile ? 2 : 5,
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

  return (
    <div>
      <div className="mb-[3%] flex items-center justify-between">
        <div className="mb-5 md:mb-10">
          <h2 className="text-[24px] text-white md:text-[28px] lg:text-[38px]">
            {sliderHeader}
          </h2>
          {sliderDis && (
            <p className="mt-3 text-[14px] text-[#999999] lg:w-[90%]">
              {sliderDis}
            </p>
          )}
        </div>
        <div className="hidden h-[55px] w-[19%] items-center justify-evenly rounded-[12px] bg-[#0F0F0F] text-white lg:flex">
          <button
            onClick={previous}
            className="rounded-[8px] bg-[#1A1A1A] p-[10px]"
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
              className={activeSlide == 5 ? "active" : ""}
              onClick={() => {
                (slider as any)?.slickGoTo(5);
              }}
            ></button>
            <button
              className={activeSlide == 10 ? "active" : ""}
              onClick={() => {
                (slider as any)?.slickGoTo(10);
              }}
            ></button>
            <button
              className={activeSlide == 15 ? "active" : ""}
              onClick={() => {
                (slider as any)?.slickGoTo(15);
              }}
            ></button>
          </div>
          <button
            onClick={next}
            className="rounded-[8px] bg-[#1A1A1A] p-[10px]"
          >
            <FaArrowRight />
          </button>
        </div>
      </div>
      <Slider
        {...settings}
        ref={(slider) => {
          setSlider(slider);
        }}
      >
        {children}
      </Slider>
      <div className="a7002 lg:hidden">
        <div className={`strond ${activeSlide <= 18 ? "active" : ""}`}></div>
        <div className={activeSlide >= 5 ? "active" : ""}></div>
        <div className={activeSlide >= 10 ? "active" : ""}></div>
        <div className={`strond2 ${activeSlide >= 17 ? "active" : ""}`}></div>
      </div>
    </div>
  );
}

export default CartSlider;
