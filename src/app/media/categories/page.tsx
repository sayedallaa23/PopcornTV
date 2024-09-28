"use client";

import CartSlider from "@/components/CartSlider";
import MainMediaSlider from "@/components/MainMediaSlider";
import React, { useContext, useEffect, useState } from "react";
import { MoviesContext, genres } from "@/store/MoviesContextProvider";
import Link from "next/link";
import Image from "next/image";
import { FaArrowRight } from "react-icons/fa";
import { log } from "console";
import { FaImdb } from "react-icons/fa6";

type Props = {};

function Page({}: Props) {
  const {
    moviesList,
    setmoviesList,
    trendingMoviesList,
    setTrendingMoviesList,
    topRatedMovies,
    setTopRatedMovies,
    popularMoviesList,
    setPopularMovies,
    tvList,
    setTvList,
    trendingTvList,
    setTrendingTvList,
    topRatedTv,
    setTopRatedTv,
    popularTvList,
    setPopularTv,
  } = useContext(MoviesContext);

  useEffect(() => {
    console.log(topRatedTv, "topRatedTv");
  }, [topRatedTv]);

  const [moviesSec, setmoviesSec] = useState(true);
  const [tvSec, setTvSec] = useState(false);

  return (
    <div className="mx-auto w-[90%] text-white md:w-[84%]">
      <MainMediaSlider />
      <div className="mb-[50px] flex h-[50px] w-fit items-center rounded-[10px] border-[2px] border-[#1A1A1A] bg-[#141414] text-[#BFBFBF] md:mb-[80px] md:h-[80px] relative lg:hidden">
          <div className="p-0 lg:p-2">
            <button
              className={`mx-2 rounded-[10px] p-[8px] hover:bg-[#1A1A1A] focus:bg-[#1A1A1A] focus:text-white md:p-3 xl:p-4 ${moviesSec ? "bg-[#1A1A1A]" : ""}`}
              onClick={() => {
                setmoviesSec(true);
                setTvSec(false);
              }}
            >
              Movies
            </button>
          </div>
          <div className="p-0 lg:p-2">
            <button
              className={`mx-2 rounded-[10px] p-[8px] hover:bg-[#1A1A1A] focus:bg-[#1A1A1A] focus:text-white md:p-3 xl:p-4 ${tvSec ? "bg-[#1A1A1A]" : ""}`}
              onClick={() => {
                setmoviesSec(false);
                setTvSec(true);
              }}
            >
              Shows
            </button>
          </div>
        </div>
      <div className={`movies-sec relative border-[#262626] lg:border-[1px] ${!moviesSec?"hidden lg:block":"lg:block"}`}>
        <div className="absolute left-[2.5rem] top-[-1.2rem] hidden w-fit rounded-[8px] bg-[#E50000] px-[20px] py-[8px] lg:block">
          Movies
        </div>
        <div className="genres-slick mx-auto mb-[10%] w-[80vw] lg:px-[15px] lg:py-[50px]">
          <CartSlider sliderHeader={"Our Genres"} sliderDis={""}>
            {moviesList.map((movie, index) => (
              <div
                className="rounded-[10px] bg-[#1A1A1A] pl-[20px] pr-[25px] pt-[20px] text-white"
                key={index}
              >
                {movie.movies && movie.movies.length > 0 && (
                  <Link
                    href={`/discover/movies/${index + 1}/${movie.genre.toLowerCase()}`}
                  >
                    <div className="flex flex-col gap-2">
                      <div className="flex gap-2">
                        <Image
                          className="w-[50%] rounded-[10px] object-cover"
                          src={`https://image.tmdb.org/t/p/original${movie.movies[0].poster_path}`}
                          width={100}
                          height={100}
                          alt={""}
                        ></Image>
                        <Image
                          className="w-[50%] rounded-[10px] object-cover"
                          src={`https://image.tmdb.org/t/p/original${movie.movies[1].poster_path}`}
                          width={100}
                          height={100}
                          alt={""}
                        ></Image>
                      </div>
                      <div className="a700 flex gap-2">
                        <Image
                          className="w-[50%] rounded-[10px] object-cover"
                          src={`https://image.tmdb.org/t/p/original${movie.movies[2].poster_path}`}
                          width={100}
                          height={100}
                          alt={""}
                        ></Image>
                        <Image
                          className="w-[50%] rounded-[10px] object-cover"
                          src={`https://image.tmdb.org/t/p/original${movie.movies[3].poster_path}`}
                          width={100}
                          height={100}
                          alt={""}
                        ></Image>
                      </div>
                    </div>
                    <div className="my-[10px] flex items-center justify-between text-[14px] md:text-[16px] lg:text-[18px]">
                      <h4 className="text-[10px] lg:text-[13px]">{movie.genre}</h4>
                      <Link href={""}>
                        <FaArrowRight className="" />
                      </Link>
                    </div>
                  </Link>
                )}
              </div>
            ))}
          </CartSlider>
        </div>
        <div className="trending-slick mx-auto mb-[10%] w-[80vw] lg:px-[15px]">
          <CartSlider sliderHeader={"Trending Now"} sliderDis={""}>
            {trendingMoviesList.map((movie: any, index: any) => (
              <div
                className="m-[2.5%] w-[45%] rounded-[10px] bg-[#1A1A1A] p-[20px] xl:w-[20%]"
                key={index}
              >
                {" "}
                <Link href={`/media/movies/${movie.id}`}>
                  <Image
                    className="h-[95%] w-[100%] rounded-[10px] object-cover"
                    src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                    width={100}
                    height={100}
                    alt={""}
                  ></Image>
                </Link>
                <div className="mt-[10px] flex items-center justify-between text-[10px] text-[#999999]">
                  <p>{movie.release_date}</p>
                  <div className="flex items-center justify-between">
                    <FaImdb className="mr-[5px] text-[20px]" />
                    <p>{movie.vote_average.toFixed(1)}</p>
                  </div>
                </div>
              </div>
            ))}
          </CartSlider>
        </div>
        <div className="top-rated-slick mx-auto mb-[10%] w-[80vw] lg:px-[15px]">
          <CartSlider sliderHeader={"Top Rated"} sliderDis={""}>
            {topRatedMovies.map((movie: any, index: any) => (
              <div
                className="m-[2.5%] w-[45%] rounded-[10px] bg-[#1A1A1A] p-[20px] xl:w-[20%]"
                key={index}
              >
                {" "}
                <Link href={`/media/movies/${movie.id}`}>
                  <Image
                    className="h-[95%] w-[100%] rounded-[10px] object-cover"
                    src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                    width={100}
                    height={100}
                    alt={""}
                  ></Image>
                </Link>
                <div className="mt-[10px] flex items-center justify-between text-[10px] text-[#999999]">
                  <p>{movie.release_date}</p>
                  <div className="flex items-center justify-between">
                    <FaImdb className="mr-[5px] text-[20px]" />
                    <p>{movie.vote_average.toFixed(1)}</p>
                  </div>
                </div>
              </div>
            ))}
          </CartSlider>
        </div>
        <div className="popular-slick mx-auto mb-[20px] w-[80vw] lg:px-[15px]">
          <CartSlider sliderHeader={"Popular Now"} sliderDis={""}>
            {popularMoviesList.map((movie: any, index: any) => (
              <div
                className="m-[2.5%] w-[45%] rounded-[10px] bg-[#1A1A1A] p-[20px] xl:w-[20%]"
                key={index}
              >
                {" "}
                <Link href={`/media/movies/${movie.id}`}>
                  <Image
                    className="h-[95%] w-[100%] rounded-[10px] object-cover"
                    src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                    width={100}
                    height={100}
                    alt={""}
                  ></Image>
                </Link>
                <div className="mt-[10px] flex items-center justify-between text-[10px] text-[#999999]">
                  <p>{movie.release_date}</p>
                  <div className="flex items-center justify-between">
                    <FaImdb className="mr-[5px] text-[20px]" />
                    <p>{movie.vote_average.toFixed(1)}</p>
                  </div>
                </div>
              </div>
            ))}
          </CartSlider>
        </div>
      </div>

      <div className={`Tv-sec relative mb-[10%] mt-[20%] border-[#262626] lg:border-[1px] ${!tvSec?"hidden lg:block":"lg:block"}`}>
        <div className="absolute left-[2.5rem] top-[-1.2rem] hidden w-fit rounded-[8px] bg-[#E50000] px-[20px] py-[8px] lg:block">
          Shows
        </div>
        <div className="genres-slick mx-auto mb-[10%] w-[80vw] lg:px-[15px] lg:py-[50px]">
          <CartSlider sliderHeader={"Our Genres"} sliderDis={""}>
            {tvList.map((movie, index) => (
              <div
                className="rounded-[10px] bg-[#1A1A1A] pl-[20px] pr-[25px] pt-[20px] text-white"
                key={index}
              >
                {movie.shows && movie.shows.length > 0 && (
                  <Link
                    href={`/discover/shows/${index + 1}/${movie.genre.toLowerCase()}`}
                  >
                    <div className="flex flex-col gap-2">
                      <div className="flex gap-2">
                        <Image
                          className="w-[50%] rounded-[10px] object-cover"
                          src={`https://image.tmdb.org/t/p/original${movie.shows[0].poster_path}`}
                          width={100}
                          height={100}
                          alt={""}
                        ></Image>
                        <Image
                          className="w-[50%] rounded-[10px] object-cover"
                          src={`https://image.tmdb.org/t/p/original${movie.shows[1].poster_path}`}
                          width={100}
                          height={100}
                          alt={""}
                        ></Image>
                      </div>
                      <div className="a700 flex gap-2">
                        <Image
                          className="w-[50%] rounded-[10px] object-cover"
                          src={`https://image.tmdb.org/t/p/original${movie.shows[2].poster_path}`}
                          width={100}
                          height={100}
                          alt={""}
                        ></Image>
                        <Image
                          className="w-[50%] rounded-[10px] object-cover"
                          src={`https://image.tmdb.org/t/p/original${movie.shows[3].poster_path}`}
                          width={100}
                          height={100}
                          alt={""}
                        ></Image>
                      </div>
                    </div>
                    <div className="my-[10px] flex items-center justify-between text-[14px] md:text-[16px] lg:text-[18px]">
                      <h4 className="text-[10px] lg:text-[13px]">{movie.genre}</h4>
                      <Link href={""}>
                        <FaArrowRight className="" />
                      </Link>
                    </div>
                  </Link>
                )}
              </div>
            ))}
          </CartSlider>
        </div>
        <div className="trending-slick mx-auto mb-[10%] w-[80vw] lg:px-[15px]">
          <CartSlider sliderHeader={"Trending Now"} sliderDis={""}>
            {trendingTvList.map((movie: any, index: any) => (
              <div
                className="m-[2.5%] w-[45%] rounded-[10px] bg-[#1A1A1A] p-[20px] xl:w-[20%]"
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
                <div className="mt-[10px] flex items-center justify-between text-[10px] text-[#999999]">
                  <p>{movie.first_air_date}</p>
                  <div className="flex items-center justify-between">
                    <FaImdb className="mr-[5px] text-[20px]" />
                    <p>{movie.vote_average.toFixed(1)}</p>
                  </div>
                </div>
              </div>
            ))}
          </CartSlider>
        </div>
        <div className="top-rated-slick mx-auto mb-[20px] w-[80vw] lg:px-[15px]">
          <CartSlider sliderHeader={"Top Rated"} sliderDis={""}>
            {topRatedTv.map((movie: any, index: any) => (
              <div
                className="m-[2.5%] w-[45%] rounded-[10px] bg-[#1A1A1A] p-[20px] xl:w-[20%]"
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
                <div className="mt-[10px] flex items-center justify-between text-[10px] text-[#999999]">
                  <p>{movie.first_air_date}</p>
                  <div className="flex items-center justify-between">
                    <FaImdb className="mr-[5px] text-[20px]" />
                    <p>{movie.vote_average.toFixed(1)}</p>
                  </div>
                </div>
              </div>
            ))}
          </CartSlider>
        </div>
        <div className="popular-slick mx-auto mb-[10%] w-[80vw] lg:px-[15px]">
          <CartSlider sliderHeader={"Popular Now"} sliderDis={""}>
            {popularTvList.map((movie: any, index: any) => (
              <div
                className="m-[2.5%] w-[45%] rounded-[10px] bg-[#1A1A1A] p-[20px] xl:w-[20%]"
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
                <div className="mt-[10px] flex items-center justify-between text-[10px] text-[#999999]">
                  <p>{movie.first_air_date}</p>
                  <div className="flex items-center justify-between">
                    <FaImdb className="mr-[5px] text-[20px]" />
                    <p>{movie.vote_average.toFixed(1)}</p>
                  </div>
                </div>
              </div>
            ))}
          </CartSlider>
        </div>
      </div>
    </div>
  );
}

export default Page;
