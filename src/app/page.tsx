"use client";
import Image from "next/image";
import { FaPlay } from "react-icons/fa";
import Pricing from "@/components/Pricing";
import PriceCard from "@/components/PriceCard";
import Carousel from "@/components/Carousel";
import { DiVim } from "react-icons/di";
import { useEffect, useState } from "react";
import CartSlider from "@/components/CartSlider";
import { ApiCalls } from "@/components/ApiCalls";
import { log } from "console";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa6";
import SamplePrevArrow from "@/components/CartSlider";
import SampleNextArrow from "@/components/CartSlider";
import Platforms from "@/components/Platforms";
import Faq from "@/components/Faq";

export default function Home() {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: process.env.API_KEY,
    },
  };

  const genres = [
    {
      id: 28,
      name: "Action",
    },
    {
      id: 12,
      name: "Adventure",
    },
    {
      id: 16,
      name: "Animation",
    },
    {
      id: 35,
      name: "Comedy",
    },
    {
      id: 80,
      name: "Crime",
    },
    {
      id: 99,
      name: "Documentary",
    },
    {
      id: 18,
      name: "Drama",
    },
    {
      id: 10751,
      name: "Family",
    },
    {
      id: 14,
      name: "Fantasy",
    },
    {
      id: 36,
      name: "History",
    },
    {
      id: 27,
      name: "Horror",
    },
    {
      id: 10402,
      name: "Music",
    },
    {
      id: 9648,
      name: "Mystery",
    },
    {
      id: 10749,
      name: "Romance",
    },
    {
      id: 878,
      name: "Science Fiction",
    },
    {
      id: 10770,
      name: "TV Movie",
    },
    {
      id: 53,
      name: "Thriller",
    },
    {
      id: 10752,
      name: "War",
    },
    {
      id: 37,
      name: "Western",
    },
  ];
  const [movies, setmovies] = useState<any[]>([]);
  const getData = async (catnum: number) => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: process.env.TOKEN,
      },
    };
    const response = await fetch(
      `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${catnum}`,
      options,
    );
    const data = await response.json();
    return data.results;
  };

  useEffect(() => {
    const fetchData = async () => {
      const newMovies = [];
      for (const genre of genres) {
        const data = await getData(genre.id);
        newMovies.push({ genre: genre.name, movies: data });
      }
      setmovies(newMovies);
    };
    fetchData();
  }, [genres]);

  return (
    <main className="flex-row items-center justify-center">
      <section className="relative bottom-[60px] sm:bottom-[115px]">
        <div className="gradient-background">
          <Image
            src="/images/SubContainer.jpg"
            alt=""
            width={1920}
            height={860}
            className="h-[90%] w-[100%] object-cover"
          />
        </div>
      </section>
      <div className="relative bottom-[6rem] flex-row items-center justify-center text-center text-white md:bottom-[10rem] md:mb-[-5%] lg:bottom-[14rem]">
        <h2 className="text-[28px] lg:text-[58px]">
          The Best Streaming Experience
        </h2>
        <p className="mx-auto mb-9 mt-5 hidden w-[90%] text-[18px] text-[#999999] lg:block xl:w-[70%]">
          StreamVibe is the best streaming experience for watching your favorite
          movies and shows on demand, anytime, anywhere. With StreamVibe, you
          can enjoy a wide variety of content, including the latest
          blockbusters, classic movies, popular TV shows, and more. You can also
          create your own watchlists, so you can easily find the content you
          want to watch.
        </p>
        <p className="mb-9 text-[14px] text-[#999999] lg:hidden">
          StreamVibe is the best streaming experience for watching your favorite
          movies and shows on demand, anytime, anywhere.
        </p>
        <Link href={"/media"}>
          <button className="m-auto flex items-center justify-center rounded-md bg-[#E50000] p-3">
            <FaPlay className="m-[8px]" />
            Start Watching Now
          </button>
        </Link>
      </div>

      <div className="home-slick mx-auto mb-[10%] w-[80vw]">
        <CartSlider>
          {movies.map((movie, index) => (
            <div className="rounded-[10px] bg-[#1A1A1A] pl-[20px] pr-[25px] pt-[20px] text-white" key={index}>
              <Link href={`/${movie.genre.toLowerCase()}`}>
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
                  <h4 className="">{movie.genre}</h4>
                  <Link href={""}>
                    <FaArrowRight className="" />
                  </Link>
                </div>
              </Link>
            </div>
          ))}
        </CartSlider>
      </div>
      <Platforms />
      <Faq />
      <Pricing />
    </main>
  );
}
function getdata() {
  throw new Error("Function not implemented.");
}
