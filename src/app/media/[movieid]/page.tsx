"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { FaPlay } from "react-icons/fa";
import { log } from "console";
import ReactStars from "react-stars";
import CastSlider from "@/components/CastSlider";
import Link from "next/link";
import ReviewsSlider from "@/components/ReviewsSlider";

type Props = {
  params: any;
};

function page({ params }: Props) {
  const [moviedata, setmoviedata] = useState<any>(null);
  const token = process.env.NEXT_PUBLIC_TOKEN;

  if (!token) {
    throw new Error("Authorization token is missing");
  }
  const getData = async (catnum: number) => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${catnum}?append_to_response=credits%2Creviews&language=en-US`,
      options,
    );
    const data = await response.json();
    return data;
  };

  const [directorData, setDirectorDate] = useState({
    name: "",
    profile_path: "",
  });
  const [writerData, setWriterDate] = useState({
    name: "",
    profile_path: "",
  });
  const [userRating, setUserRating] = useState(null);
  const [usersReviews, setUsersReviews] = useState([]);
  const handleRating = (rating: any) => {
    setUserRating(rating?.toFixed(2));
  };

  useEffect(() => {
    getData(params.movieid).then((data) => {
      setmoviedata(data);
      const director = data.credits.crew.find((member: any) => {
        return member.job == "Director";
      });
      const writer = data.credits.crew.find((member: any) => {
        return member.job == "Writer";
      });
      setDirectorDate({
        name: director.name,
        profile_path: director.profile_path,
      });
      setWriterDate({
        name: writer.name,
        profile_path: writer.profile_path,
      });

      // const reviews = moviedata.reviews.results;
      

      // console.log(directorData.name,"42")
    });
  }, []);
  useEffect(() => {
    setUsersReviews(moviedata?.reviews.results);
    console.log(usersReviews, "60"); // log the crew array to the console
    console.log(moviedata,"line 80")
    console.log(writerData,"line 81")
  }, [moviedata,usersReviews,writerData]);
  return (
    <div className="">
      <section className="relative bottom-[65px] sm:bottom-[115px]">
        <div className="gradient-background">
          <Image
            src={`https://image.tmdb.org/t/p/original${moviedata && moviedata.backdrop_path}`}
            alt=""
            width={1920}
            height={860}
            className="h-[100%] w-[100%] object-cover opacity-[0.4]"
          />
        </div>
      </section>
      <div className="relative bottom-[13rem] mb-[-8rem] items-center justify-center text-center text-white sm:mb-[-11rem] md:bottom-[20rem] lg:bottom-[30rem] lg:mb-[-20rem]">
        <h2 className="mb-2 text-[28px] lg:text-[58px]">
          {moviedata && moviedata.original_title}
        </h2>
        <p className="mx-auto mb-9 mt-2 hidden w-[90%] text-[18px] text-[#999999] lg:block xl:w-[70%]">
          {moviedata && moviedata.overview}
        </p>
        <div>
          <button className="m-auto flex items-center justify-center rounded-md bg-[#E50000] p-2 sm:p-3">
            <FaPlay className="m-[8px]" />
            Start Watching Now
          </button>
        </div>
      </div>
      <div className="mx-auto mb-[20%] mt-[-5rem] flex w-[90%] flex-col gap-4 md:mb-[10%] md:w-[84%] lg:mb-[8%] lg:mt-[-15rem] lg:flex-row lg:items-start">
        <div className="left-sec flex-col gap-4 rounded-[10px] lg:w-[65%]">
          <div className="discription rounded-[10px] border-[1px] border-[#262626] bg-[#1A1A1A] p-7 text-[14px]">
            <p className="mb-2 text-[#999999]">Description</p>
            <p className="text-white">{moviedata && moviedata.overview}</p>
          </div>
          <div className="movie-details-pc-hidden mt-[20px] rounded-[10px] border-[1px] border-[#262626] bg-[#1A1A1A] p-7 text-[14px] text-white lg:hidden">
            <div>
              <p className="my-2 text-[#999999]">Released Year</p>
              <p>{moviedata && moviedata.release_date.split("-")[0]}</p>
            </div>
            <div>
              <p className="my-2 text-[#999999]">Language</p>
              <div className="flex flex-wrap gap-2">
                {moviedata &&
                  moviedata.spoken_languages.map(
                    (
                      lan: {
                        name:
                          | string
                          | number
                          | bigint
                          | boolean
                          | React.ReactElement<
                              any,
                              string | React.JSXElementConstructor<any>
                            >
                          | Iterable<React.ReactNode>
                          | React.ReactPortal
                          | Promise<React.AwaitedReactNode>
                          | null
                          | undefined;
                      },
                      index: React.Key | null | undefined,
                    ) => {
                      return (
                        <p
                          key={index}
                          className="max-w-fit rounded-[6px] border-[1px] border-[#262626] bg-[#141414] p-2 text-white"
                        >
                          {lan.name}
                        </p>
                      );
                    },
                  )}
              </div>
            </div>
            <div className="rat">
              <p className="my-2 text-[#999999]">Ratings</p>
              <div className="flex justify-between sm:justify-start sm:gap-5">
                <div className="imdb rounded-[6px] border-[1px] border-[#262626] bg-[#141414] p-3">
                  <p className="text-white">IMDB</p>
                  <div className="flex items-center">
                    <ReactStars
                      count={5}
                      value={
                        moviedata && (moviedata.vote_average / 2).toFixed(2)
                      }
                      size={15}
                      color2={"#E50000"}
                      edit={false}
                      className="mr-2"
                    />
                    <div className="text-white">
                      {moviedata && (moviedata.vote_average / 2).toFixed(2)}
                    </div>
                  </div>
                </div>
                <div className="popcorn rounded-[6px] border-[1px] border-[#262626] bg-[rgb(20,20,20)] p-3">
                  <p className="text-white">PopcornTv</p>
                  <div className="flex items-center">
                    <ReactStars
                      count={5}
                      size={15}
                      color2={"#E50000"}
                      className="mr-2"
                      onChange={handleRating}
                      value={userRating as any}
                    />
                    <div className="text-white">
                      {userRating ? userRating : 0.0}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="genres">
              <p className="my-2 text-[#999999]">Genres</p>
              <div className="flex flex-wrap gap-2">
                {moviedata &&
                  moviedata.genres.map((gen: any, index: any) => (
                    <p
                      className="max-w-fit rounded-[6px] border-[1px] border-[#262626] bg-[#141414] p-2 text-white"
                      key={index}
                    >
                      {gen.name}
                    </p>
                  ))}
              </div>
            </div>
            <div className="director">
              <p className="my-2 text-[#999999]">Director</p>
              <div className="flex items-center">
                <div className="">
                  <Image
                    src={`https://image.tmdb.org/t/p/original${directorData.profile_path}`}
                    alt=""
                    width={50}
                    height={50}
                    className="mr-1 h-[50px] w-[50px] rounded-[6px] object-cover"
                  />
                </div>
                <div>
                  <p>{directorData.name}</p>
                </div>
              </div>
            </div>
            {writerData.profile_path!==""&&
            <div className="music">
              <p className="my-2 text-[#999999]">Writer</p>
              <div className="flex items-center">
                <div>
                  <Image
                    src={`https://image.tmdb.org/t/p/original${writerData.profile_path}`}
                    alt=""
                    width={50}
                    height={50}
                    className="mr-1 h-[50px] w-[50px] rounded-[6px] object-cover"
                  />
                </div>
                <div>
                  <p>{writerData.name}</p>
                </div>
              </div>
            </div>}
          </div>
          <div className="cast-section mt-4 w-[100%] rounded-[10px] border-[1px] border-[#262626] bg-[#1A1A1A] p-7">
            <div>
              <CastSlider>
                {moviedata &&
                  moviedata.credits.cast
                    .filter((actor: any) => {
                      return actor.profile_path !== null;
                    })
                    .map((actor: any, index: any) => (
                      <div key={index} className="text-white">
                        <Link href={`/people/${actor.id}`}>
                          <Image
                            src={`https://image.tmdb.org/t/p/original${actor.profile_path}`}
                            alt=""
                            width={50}
                            height={50}
                            className="w-70px] mr-1 h-[75px] rounded-[6px] object-cover"
                          />
                        </Link>
                      </div>
                    ))}
              </CastSlider>
            </div>
          </div>
          <div className="reviwes-carousel mt-4 w-[100%] rounded-[10px] border-[1px] border-[#262626] bg-[#1A1A1A] p-7">
            {/* <ReviewsSlider>
              {usersReviews.filter((review:any)=>{
                return (review.content.lenght <= 160)
              }).map((rev: any, index) => (
                <div className="p-5 bg-[#141414] rounded-[10px]">
                  <div className="flex items-center justify-between">
                    <div className="text-white">{rev.author}</div>
                    <div className="flex items-center">
                      <ReactStars
                        count={5}
                        value={rev && rev.author_details.rating / 2}
                        size={15}
                        color2={"#E50000"}
                        edit={false}
                        className="mr-2"
                      />
                      <div className="text-white">
                        {moviedata && (moviedata.vote_average / 2).toFixed(2)}
                      </div>
                    </div>
                  </div>
                  <div>
                   <p className="my-2 text-[#999999]">{rev&&rev.content}</p> 
                  </div>
                </div>
              ))}
            </ReviewsSlider> */}
            <ReviewsSlider>
              {usersReviews?.slice(0,6).map((rev: any, index) => (
                <div
                  className="h-[20vh] rounded-[10px] bg-[#141414] lg:h-[40vh] overflow-x-hidden overflow-y-scroll scrollable-element"
                  key={index}
                >
                  <div className="m-5">
                    <div className="flex items-center justify-between">
                      <div className="text-white text-[12px]">{rev.author}</div>
                      <div className="flex items-center">
                        <ReactStars
                          count={5}
                          value={rev && rev.author_details.rating / 2}
                          size={15}
                          color2={"#E50000"}
                          edit={false}
                          className="mr-2"
                        />
                        <p className="text-white text-[8px]">
                          {rev && (rev.author_details.rating / 2).toFixed(2)}
                        </p>
                      </div>
                    </div>
                    <div>
                      <p className="my-2 text-[#999999] text-[12px]">
                        {rev && rev.content}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </ReviewsSlider>
          </div>
        </div>
        <div className="right-sec details phone-hidden hidden rounded-[10px] border-[1px] border-[#262626] bg-[#1A1A1A] p-7 text-[14px] text-white lg:block">
          <div>
            <p className="my-2 text-[#999999]">Released Year</p>
            <p>{moviedata && moviedata.release_date.split("-")[0]}</p>
          </div>
          <div>
            <p className="my-2 text-[#999999]">Language</p>
            <div className="flex flex-wrap gap-2">
              {moviedata &&
                moviedata.spoken_languages.filter((language:any)=>{
                  return language.name !== ""
                }).map(
                  (
                    lan: {
                      name:
                        | string
                        | number
                        | bigint
                        | boolean
                        | React.ReactElement<
                            any,
                            string | React.JSXElementConstructor<any>
                          >
                        | Iterable<React.ReactNode>
                        | React.ReactPortal
                        | Promise<React.AwaitedReactNode>
                        | null
                        | undefined;
                    },
                    index: React.Key | null | undefined,
                  ) => {
                    return (
                      <p
                        key={index}
                        className="max-w-fit rounded-[6px] border-[1px] border-[#262626] bg-[#141414] p-2 text-white"
                      >
                        {lan.name}
                      </p>
                    );
                  },
                )}
            </div>
          </div>
          <div className="rat">
            <p className="my-2 text-[#999999]">Ratings</p>
            <div className="flex justify-between">
              <div className="imdb rounded-[6px] border-[1px] border-[#262626] bg-[#141414] p-3">
                <p className="text-white">IMDB</p>
                <div className="flex items-center">
                  <ReactStars
                    count={5}
                    value={moviedata && moviedata.vote_average / 2}
                    size={12}
                    color2={"#E50000"}
                    edit={false}
                    className="mr-2"
                  />
                  <div className="text-white text-[10px]">
                    {moviedata && (moviedata.vote_average / 2).toFixed(2)}
                  </div>
                </div>
              </div>
              <div className="popcorn rounded-[6px] border-[1px] border-[#262626] bg-[rgb(20,20,20)] p-3">
                <p className="text-white">PopcornTv</p>
                <div className="flex items-center">
                  <ReactStars
                    count={5}
                    size={12}
                    color2={"#E50000"}
                    className="mr-2"
                    onChange={handleRating}
                    value={userRating as any}
                  />
                  <div className="text-white  text-[10px]">
                    {userRating ? userRating : 0.0}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="genres">
            <p className="my-2 text-[#999999]">Genres</p>
            <div className="flex flex-wrap gap-2">
              {moviedata &&
                moviedata.genres.map((gen: any, index: any) => (
                  <p
                    className="max-w-fit rounded-[6px] border-[1px] border-[#262626] bg-[#141414] p-2 text-white"
                    key={index}
                  >
                    {gen.name}
                  </p>
                ))}
            </div>
          </div>
          <div className="director">
            <p className="my-2 text-[#999999]">Director</p>
            <div className="flex items-center">
              <div className="">
                <Image
                  src={`https://image.tmdb.org/t/p/original${directorData.profile_path}`}
                  alt=""
                  width={50}
                  height={50}
                  className="mr-1 h-[50px] w-[50px] rounded-[6px] object-cover"
                />
              </div>
              <div>
                <p>{directorData.name}</p>
              </div>
            </div>
          </div>
          {writerData.profile_path!==""&&
          <div className="music">
            <p className="my-2 text-[#999999]">Writer</p>
            <div className="flex items-center">
              <div>
                <Image
                  src={`https://image.tmdb.org/t/p/original${writerData.profile_path}`}
                  alt=""
                  width={50}
                  height={50}
                  className="mr-1 h-[50px] w-[50px] rounded-[6px] object-cover"
                />
              </div>
              <div>
                <p>{writerData.name}</p>
              </div>
            </div>
          </div>}
        </div>
      </div>
    </div>
  );
}

export default page;
