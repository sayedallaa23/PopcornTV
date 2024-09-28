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
  const { moviesList, setmoviesList } = useContext(MoviesContext);
  const moviestomap = moviesList[params.catid - 1];

  return (
    <div>
      <section className="relative bottom-[65px] sm:bottom-[115px]">
        <div className="gradient-background">
          <Image
            src={`https://image.tmdb.org/t/p/original${moviestomap && moviestomap.movies[0].backdrop_path}`}
            alt=""
            width={1920}
            height={860}
            className="h-[100%] w-[100%] object-cover opacity-[0.3]"
          />
        </div>
      </section>
      <div className="relative bottom-[13rem] md:bottom-[20rem] flex-row items-center justify-center text-center text-white  lg:bottom-[30rem]">
        <h2 className="text-[28px] lg:text-[58px] mb-2">
          {moviestomap && moviestomap.movies[0].original_title}
        </h2>
        <p className="mx-auto mb-9 mt-2 hidden w-[90%] text-[18px] text-[#999999] lg:block xl:w-[70%]">
          {moviestomap && moviestomap.movies[0].overview}
        </p>
        <div>
          <button className="m-auto flex items-center justify-center rounded-md bg-[#E50000] p-2 sm:p-3">
            <FaPlay className="m-[8px]" />
            Start Watching Now
          </button>
        </div>
      </div>
      <div className="mx-auto flex w-[90%] flex-wrap md:w-[84%] mt-[-5rem] lg:mt-[-15rem] mb-[20%] md:mb-[10%] lg:mb-[8%]">
        {moviestomap &&
          moviestomap.movies.map(
            (
              movie: {
                release_date: any;
                vote_average: any;
                original_title: any;
                poster_path: any;
                id : any
              },
              index: any,
            ) => (
              <div
                className="m-[2.5%] w-[45%] rounded-[10px] bg-[#1A1A1A] p-[20px] xl:w-[20%] lg:pb-[25px]"
                key={index}
              > <Link href={`/media/movies/${movie.id}`}>
                <Image
                  className="h-[95%] w-[100%] rounded-[10px] object-cover"
                  src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                  width={100}
                  height={100}
                  alt={""}
                ></Image></Link>
                <div className="mt-[10px] flex items-center justify-between pb-[10px] text-[10px] text-[#999999]">
                  <p>{movie.release_date}</p>
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
