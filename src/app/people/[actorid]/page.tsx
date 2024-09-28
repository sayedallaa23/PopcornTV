"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

type Props = { params: any };

function Page({ params }: Props) {
  const [actorDetails, setActorDetails] = useState<any>({});
  const token = process.env.NEXT_PUBLIC_TOKEN;

  if (!token) {
    throw new Error("Authorization token is missing");
  }

  const apiOptions = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const actorData = useCallback(async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/person/${params.actorid}?append_to_response=combined_credits&language=en-US`,
      apiOptions,
    );
    const data = await response.json();
    setActorDetails(data);
  }, [token]);
  useEffect(() => {
    actorData();
  }, [actorData]);

  useEffect(() => {
    console.log(actorDetails, "line 37");
  }, [actorDetails]);

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
    <div className="mx-auto mb-[10%] w-[90%] text-white md:w-[84%]">
      <div className="flex gap-3">
        <div className="actor-photo w-[35%] bg-[#1A1A1A] p-3 lg:p-9">
          <Image
            src={`https://image.tmdb.org/t/p/original${actorDetails ? actorDetails.profile_path : ""}`}
            width={200}
            height={300}
            alt=""
            className="w-[100%]"
          />
          <div className="py-2">
            <div className="placeofbirth">
              <div>Place of birth</div>
              <p className="text-[14px] text-[#999999]">
                {actorDetails ? actorDetails.place_of_birth : ""}
              </p>
            </div>
            <div className="birthday">
              <div>Birthday</div>
              <p className="text-[14px] text-[#999999]">
                {actorDetails ? actorDetails.birthday : ""}
              </p>
            </div>
          </div>
        </div>
        <div className="actor-details w-[65%] bg-[#1A1A1A] p-3 lg:p-9">
          <div className="">
            <div className="det-upper">
              <h1 className="actor-name text-[28px]">
                {actorDetails ? actorDetails.name : ""}
              </h1>
              <div className="actor-overview">
                <h1 className="my-3">Overview</h1>
                <p className="scrollable-element h-[30vh] overflow-y-scroll text-[14px] text-[#999999] lg:h-[50vh]">
                  {actorDetails ? actorDetails.biography : ""}
                </p>
              </div>
            </div>
            <div className="actor-movies">
              <div className="my-4 flex items-center justify-between">
                <h3 className="text-[24px] text-white md:text-[28px] lg:text-[38px]">
                  Known for
                </h3>
                <div className="arrows-section hidden h-[55px] w-fit items-center justify-evenly rounded-[12px] bg-[#0F0F0F] p-2 text-white lg:flex">
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
                {actorDetails.combined_credits?.cast
                  .slice(0, 20)
                  .map((movie: any, index: any) => (
                    <Link href={`/media/movies/${movie.id}`} key={index}>
                      <Image
                        className="h-[95%] w-[100%] rounded-[10px] object-cover"
                        src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                        width={100}
                        height={100}
                        alt={""}
                      ></Image>
                    </Link>
                  ))}
              </Slider>
              <div className="a7002 lg:hidden">
                <div
                  className={`strond ${activeSlide <= 18 ? "active" : ""}`}
                ></div>
                <div className={activeSlide >= 5 ? "active" : ""}></div>
                <div className={activeSlide >= 10 ? "active" : ""}></div>
                <div
                  className={`strond2 ${activeSlide >= 17 ? "active" : ""}`}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
