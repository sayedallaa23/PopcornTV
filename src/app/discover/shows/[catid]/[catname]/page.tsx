"use client";

import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaPlay } from "react-icons/fa";
import { MoviesContext } from "@/store/MoviesContextProvider";
import { FaImdb } from "react-icons/fa6";

type Props = {
  params: any;
};

function Page({ params }: Props) {
  const { tvList, setTvList } = useContext(MoviesContext);
  const showstomap = tvList[params.catid - 1];

  return (
    <div>
      <section className="relative bottom-[65px] sm:bottom-[115px]">
        <div className="gradient-background">
          <Image
            src={`https://image.tmdb.org/t/p/original${showstomap && showstomap.shows[0].backdrop_path}`}
            alt=""
            width={1920}
            height={860}
            className="h-[100%] w-[100%] object-cover opacity-[0.3]"
          />
        </div>
      </section>
      <div className="relative bottom-[13rem] flex-row items-center justify-center text-center text-white md:bottom-[20rem] lg:bottom-[30rem]">
        <h2 className="mb-2 text-[28px] lg:text-[58px]">
          {showstomap && showstomap.shows[0].original_title}
        </h2>
        <p className="mx-auto mb-9 mt-2 hidden w-[90%] text-[18px] text-[#999999] lg:block xl:w-[70%]">
          {showstomap && showstomap.shows[0].overview}
        </p>
        <div>
          <Link href={`/media/movies/${showstomap && showstomap.shows[0].id}`}>
            <button className="m-auto flex items-center justify-center rounded-md bg-[#E50000] p-2 sm:p-3">
              <FaPlay className="m-[8px]" />
              Start Watching Now
            </button>
          </Link>
        </div>
      </div>
      <div className="mx-auto mb-[20%] mt-[-5rem] flex w-[90%] flex-wrap md:mb-[10%] md:w-[84%] lg:mb-[8%] lg:mt-[-15rem]">
        {showstomap &&
          showstomap.shows.map(
            (
              movie: {
                first_air_date: any;
                vote_average: any;
                original_name: any;
                poster_path: any;
                id: any;
              },
              index: any,
            ) => (
              <div
                className="m-[2.5%] w-[45%] rounded-[10px] bg-[#1A1A1A] p-[20px] lg:pb-[25px] xl:w-[20%]"
                key={index}
              >
                {" "}
                <Link href={`/media/shows/${movie.id}`}>
                  <Image
                    className="h-[95%] w-[100%] rounded-[10px] object-cover"
                    src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                    width={100}
                    height={100}
                    alt={""}
                  ></Image>
                </Link>
                <div className="mt-[10px] flex items-center justify-between pb-[10px] text-[10px] text-[#999999]">
                  <p>{movie.first_air_date}</p>
                  <div className="flex items-center justify-between">
                    <FaImdb className="mr-[5px] text-[20px]" />
                    <p>{movie.vote_average.toFixed(1)}</p>
                  </div>
                </div>
              </div>
            ),
          )}
      </div>
    </div>
  );
}

export default Page;
