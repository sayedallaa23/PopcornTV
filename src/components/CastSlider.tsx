import React, { useRef, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { FaArrowRight } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";

type Props = {
  children: any;
};

function CastSlider({ children }: Props) {
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
    slidesToShow: isMobile ? 4 : 8,
    slidesToScroll: isMobile ? 4 : 8,
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
      <div className="mb-5 flex justify-between lg:w-[97%]">
        <p className="text-[#999999]">Cast</p>
        <div className="flex justify-between">
          <button
            onClick={previous}
            className="rounded-[50%] bg-[#141414] p-[10px] text-[#999999]"
          >
            <FaArrowLeft />
          </button>
          <button
            onClick={next}
            className="rounded-[50%] bg-[#141414] p-[10px] text-[#999999]"
          >
            <FaArrowRight />
          </button>
        </div>
      </div>
      <div>
        <Slider
          {...settings}
          ref={(slider) => {
            setSlider(slider);
          }}
        >
          {children}
        </Slider>
      </div>
    </div>
  );
}

export default CastSlider;
