import React, { useCallback, useEffect, useRef, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { FaArrowRight } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";
import { log } from "console";
import Image from "next/image";
import Link from "next/link";
import { FaPlay } from "react-icons/fa";

type Props = {};

function MainMediaSlider({}: Props) {
  const [oldSlide, setOldSlide] = useState(0);
  const [activeSlide, setActiveSlide] = useState(0);
  const [activeSlide2, setActiveSlide2] = useState(0);
  let sliderRef = useRef<Slider>(null);
  const [slider, setSlider] = useState<Slider | null>(null);
  const [slides, setSlides] = useState([]);
  const token = process.env.NEXT_PUBLIC_TOKEN;
  if (!token) {
    throw new Error("Authorization token is missing");
  }
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };


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
    slidesToShow: 1,
    slidesToScroll: 1,
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
    fetch(
      "https://api.themoviedb.org/3/trending/all/day?language=en-US",
      options,
    )
      .then((response) => response.json())
      .then((response) => setSlides(response.results));
  }, []);
  return (
    <div className="relative xl:mb-[-12rem] mb-[-4rem] text-center">
      <Slider
        {...settings}
        ref={(slider) => {
          setSlider(slider);
        }}
      >
        {slides.slice(0, 3).map((movie: any, index: number) => (
          <div className="relative" key={index}>
            <Image
              src={`https://image.tmdb.org/t/p/original${movie?.backdrop_path}`}
              alt=""
              width={1920}
              height={860}
              className="z-1 h-[90%] w-[100%] object-cover opacity-[0.6]"
            />
            <div className="relative bottom-[9rem] lg:bottom-[20rem]">
              <h1 className="text-[28px] lg:text-[58px]">
                {movie.original_name || movie.original_title}
              </h1>
              <p className="mx-auto mb-9 mt-5 hidden text-[#999999] md:text-[18px] lg:block xl:w-[70%]">
                {movie.overview}
              </p>
              <Link href={"/media"}>
                <button className="m-auto flex items-center justify-center rounded-md bg-[#E50000] p-3">
                  <FaPlay className="m-[8px]" />
                  Start Watching Now
                </button>
              </Link>
            </div>
          </div>
        ))}
      </Slider>
      <div className="relative bottom-[22rem] mx-auto hidden h-[55px] w-[95%] items-center justify-between rounded-[12px] lg:flex">
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
            className={activeSlide == 1 ? "active" : ""}
            onClick={() => {
              (slider as any)?.slickGoTo(1);
            }}
          ></button>
          <button
            className={activeSlide == 2 ? "active" : ""}
            onClick={() => {
              (slider as any)?.slickGoTo(2);
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

export default MainMediaSlider;
