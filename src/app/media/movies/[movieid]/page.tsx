"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { FaPlay } from "react-icons/fa";
import { log } from "console";
import ReactStars from "react-stars";
import CastSlider from "@/components/CastSlider";
import Link from "next/link";
import ReviewsSlider from "@/components/ReviewsSlider";
// firebase
import { onAuthStateChanged } from "firebase/auth";
import { db, auth } from "../../../../store/firebase";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc,
  setDoc,
  deleteDoc,
  DocumentData,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import ReactPlayer from "react-player";
import { FaXmark } from "react-icons/fa6";
import { IoIosAdd } from "react-icons/io";
import { MdDeleteForever } from "react-icons/md";
import { read } from "fs";
import { Authcontext } from "@/store/AuthContext";
type Props = {
  params: any;
};

function Page({ params }: Props) {
  const [moviedata, setmoviedata] = useState<any>(null);
  const [usersReviews, setUsersReviews] = useState([]);
  const [directorData, setDirectorDate] = useState({
    name: "",
    profile_path: "",
  });
  const [writerData, setWriterDate] = useState({
    name: "",
    profile_path: "",
  });
  const [basedb, setbasedb] = useState<{ data: DocumentData; id: string }[]>(
    [],
  );
  const [movieTrailer, setMovieTrailer] = useState<any>(null);
  const videoRef = useRef<ReactPlayer>(null);
  const [isInWatchList, setIsInWatchList] = useState(false);
  const [isInFavoriteList, setIsInFavoriteList] = useState(false);
  const authContext = React.useContext(Authcontext);

  const token = process.env.NEXT_PUBLIC_TOKEN;
  const apiOptions = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
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

  const getMovieTrailer = useCallback(async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${params.movieid}/videos?language=en-US`,
      apiOptions,
    );
    const data = await response.json();
    return data.results;
  }, [apiOptions, params.movieid]);

  const youtubeRef = React.useRef(null);
  function handlePopUp() {
    if ((youtubeRef.current as any).style.display === "block") {
      (youtubeRef.current as any).style.display = "none";
    } else {
      (youtubeRef.current as any).style.display = "block";
    }
  }

  const username = String(auth.currentUser?.email);
  const usersRef = doc(db, "users", username);

  const addMovieToWatchList = async () => {
    const userDoc = await getDoc(usersRef);
    if (userDoc.exists()) {
      const watchList = userDoc.data().moviesWatchList || [];
      const movieExists = watchList.some(
        (movie: { itemID: any }) => movie.itemID === params.movieid,
      );
      if (!movieExists) {
        await setDoc(
          usersRef,
          {
            moviesWatchList: arrayUnion({
              itemID: params.movieid,
              poster: moviedata.poster_path,
              vote: moviedata.vote_average,
              release: moviedata.release_date,
            }),
          },
          { merge: true },
        );
      }
    } else {
      await setDoc(
        usersRef,
        {
          moviesWatchList: arrayUnion({
            itemID: params.movieid,
            poster: moviedata.poster_path,
            vote: moviedata.vote_average,
            release: moviedata.release_date,
          }),
        },
        { merge: true },
      );
    }
    setIsInWatchList(true)
  };
  const removeMovieFromWatchList = async () => {
    const movieToRemove = {
      itemID: params.movieid,
      poster: moviedata.poster_path,
      vote: moviedata.vote_average,
      release: moviedata.release_date,
    };
    await updateDoc(usersRef, {
      moviesWatchList: arrayRemove(movieToRemove),
    });
    setIsInWatchList(false)
  };

  const addMovieToFavoritesList = async () => {
    const userDoc = await getDoc(usersRef);
    if (userDoc.exists()) {
      const favoritsList = userDoc.data().moviesFavoritesList || [];
      const movieExists = favoritsList.some(
        (movie: { itemID: any }) => movie.itemID === params.movieid,
      );
      if (!movieExists) {
        await setDoc(
          usersRef,
          {
            moviesFavoritesList: arrayUnion({
              itemID: params.movieid,
              poster: moviedata.poster_path,
              vote: moviedata.vote_average,
              release: moviedata.release_date,
            }),
          },
          { merge: true },
        );
      }
    } else {
      await setDoc(
        usersRef,
        {
          moviesFavoritesList: arrayUnion({
            itemID: params.movieid,
            poster: moviedata.poster_path,
            vote: moviedata.vote_average,
            release: moviedata.release_date,
          }),
        },
        { merge: true },
      );
    }
    setIsInFavoriteList(true);
  };
  const removeMovieFromFavoritesList = async () => {
    const movieToRemove = {
      itemID: params.movieid,
      poster: moviedata.poster_path,
      vote: moviedata.vote_average,
      release: moviedata.release_date,
    };
    await updateDoc(usersRef, {
      moviesFavoritesList: arrayRemove(movieToRemove),
    });
    setIsInFavoriteList(false);
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
      
      if (director) {
        setDirectorDate({
          name: director.name,
          profile_path: director.profile_path,
        });
      }
      if (writer) {
        setWriterDate({
          name: writer.name,
          profile_path: writer.profile_path,
        });
      }


      const fetchMovieTrailer = async () => {
        const data = await getMovieTrailer();
        setMovieTrailer(
          data.find((x: any) => {
            return x.type.toLowerCase() === "trailer";
          }),
        );
      };
      fetchMovieTrailer();
    });
  }, []);

  // reviews api 
  useEffect(()=>{
    const apiReviews = moviedata?.reviews.results.slice(0, 6);
    if (apiReviews) {
      setUsersReviews(apiReviews);
    }
    console.log(usersReviews,"line 246")
  },[moviedata])

  useEffect(() => {
    const checkWatchList = async () => {
      const username = String(auth.currentUser?.email);
      const usersRef = doc(db, "users", username);
      const userDoc = await getDoc(usersRef);
      if (userDoc.exists()) {
        const watchList = userDoc.data().moviesWatchList || [];
        const movieExists = watchList.some(
          (movie: { itemID: any }) => movie.itemID === params.movieid,
        );
        if (movieExists) {
          setIsInWatchList(true);
        }
      }
    };
    const checkFavoritesList = async () => {
      const username = String(auth.currentUser?.email);
      const usersRef = doc(db, "users", username);
      const userDoc = await getDoc(usersRef);
      if (userDoc.exists()) {
        const favoritsList = userDoc.data().moviesFavoritesList || [];
        const movieExists = favoritsList.some(
          (movie: { itemID: any }) => movie.itemID === params.movieid,
        );
        if (movieExists) {
          setIsInFavoriteList(true);
        }
       
      }
    };
    checkWatchList();
    checkFavoritesList();
  }, [
    params.movieid,
    isInWatchList,
    isInFavoriteList,
    addMovieToFavoritesList,
    addMovieToWatchList,
  ]);
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
          <button
            className="m-auto flex items-center justify-center rounded-md bg-[#E50000] p-2 sm:p-3"
            onClick={() => {
              handlePopUp();
            }}
          >
            <FaPlay className="m-[8px]" />
            Watch Trailer
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
                {/* <div className="popcorn rounded-[6px] border-[1px] border-[#262626] bg-[rgb(20,20,20)] p-3">
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
                </div> */}
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
            {writerData.profile_path !== "" && (
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
              </div>
            )}
            {authContext?.isSignin&&
            <div className="mt-[10%] flex justify-between">
              {isInWatchList ? (
                <button
                  onClick={() => {
                    removeMovieFromWatchList();
                  }}
                  className="flex items-center justify-between rounded-[8px] border-[1px] border-[#262626] bg-[#141414] p-4"
                >
                  <MdDeleteForever className="mr-1 text-[#E50000]" /> WatchList
                </button>
              ) : (
                <button
                  onClick={() => {
                    addMovieToWatchList();
                  }}
                  className="flex items-center justify-between rounded-[8px] border-[1px] border-[#262626] bg-[#141414] p-4"
                >
                  <IoIosAdd className="mr-1" />
                  watch List
                </button>
              )}

              {isInFavoriteList ? (
                <button
                  onClick={() => {
                    removeMovieFromFavoritesList();
                  }}
                  className="flex items-center justify-between rounded-[8px] border-[1px] border-[#262626] bg-[#141414] p-4"
                >
                  <MdDeleteForever className="mr-1 text-[#E50000]" /> Favorites
                </button>
              ) : (
                <button
                  onClick={() => {
                    addMovieToFavoritesList();
                  }}
                  className="flex items-center justify-between rounded-[8px] border-[1px] border-[#262626] bg-[#141414] p-4"
                >
                  <IoIosAdd className="mr-1" />
                  Favorite
                </button>
              )}
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
            <div className="mb-5 flex items-center justify-between text-white">
              <p>Reviews</p>
              {/* <button className="rounded-[8px] border-[1px] border-[#262626] bg-[#141414] p-4">
                Add Your Review
              </button> */}
            </div>
            {usersReviews.length > 1 ? (
              <ReviewsSlider>
                {usersReviews?.map((rev: any, index) => (
                  <div
                    className="scrollable-element h-[20vh] overflow-x-hidden overflow-y-scroll rounded-[10px] bg-[#141414] lg:h-[40vh]"
                    key={index}
                  >
                    <div className="m-5">
                      <div className="flex items-center justify-between">
                        <div className="text-[12px] text-white">
                          {rev.author}
                        </div>
                        <div className="flex items-center">
                          <ReactStars
                            count={5}
                            value={rev && rev.author_details.rating / 2}
                            size={15}
                            color2={"#E50000"}
                            edit={false}
                            className="mr-2"
                          />
                          <p className="text-[8px] text-white">
                            {rev && (rev.author_details.rating / 2).toFixed(2)}
                          </p>
                        </div>
                      </div>
                      <div>
                        <p className="my-2 text-[12px] text-[#999999]">
                          {rev && rev.content}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </ReviewsSlider>
            ) : (
              <div className="text-center text-white">No available reviews</div>
            )}
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
                moviedata.spoken_languages
                  .filter((language: any) => {
                    return language.name !== "";
                  })
                  .map(
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
                  <div className="text-[10px] text-white">
                    {moviedata && (moviedata.vote_average / 2).toFixed(2)}
                  </div>
                </div>
              </div>
              {/*  
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
                  <div className="text-[10px] text-white">
                    {userRating ? userRating : 0.0}
                  </div>
                </div>
              </div>*/}
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
          {writerData.profile_path !== "" && (
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
            </div>
          )}
          {authContext?.isSignin&&
          <div className="mt-[10%] flex justify-between">
            {isInWatchList ? (
              <button
                onClick={() => {
                  removeMovieFromWatchList();
                }}
                className="flex items-center justify-between rounded-[8px] border-[1px] border-[#262626] bg-[#141414] p-4"
              >
                <MdDeleteForever className="mr-1 text-[#E50000]" /> WatchList
              </button>
            ) : (
              <button
                onClick={() => {
                  addMovieToWatchList();
                }}
                className="flex items-center justify-between rounded-[8px] border-[1px] border-[#262626] bg-[#141414] p-4"
              >
                <IoIosAdd className="mr-1" />
                watch List
              </button>
            )}

            {isInFavoriteList ? (
              <button
                onClick={() => {
                  removeMovieFromFavoritesList();
                }}
                className="flex items-center justify-between rounded-[8px] border-[1px] border-[#262626] bg-[#141414] p-4"
              >
                <MdDeleteForever className="mr-1 text-[#E50000]" /> Favorites
              </button>
            ) : (
              <button
                onClick={() => {
                  addMovieToFavoritesList();
                }}
                className="flex items-center justify-between rounded-[8px] border-[1px] border-[#262626] bg-[#141414] p-4"
              >
                <IoIosAdd className="mr-1" />
                Favorite
              </button>
            )}
          </div>}
        </div>
      </div>
      <div
        className="fixed left-0 right-0 top-[3rem] z-50 mx-auto hidden h-[25vh] lg:h-[80vh] lg:max-w-screen-lg"
        ref={youtubeRef}
      >
        <div className="flex w-[100%]">
          <FaXmark
            className="ml-[98%] cursor-pointer text-[40px] text-white"
            onClick={() => {
              handlePopUp();
              if (videoRef.current) {
                videoRef.current.getInternalPlayer().pauseVideo();
              }
            }}
          />
        </div>
        <ReactPlayer
          url={`https://www.youtube.com/watch?v=${movieTrailer?.key}`}
          controls={true}
          width="100%"
          height="100%"
          ref={videoRef}
        />
      </div>
    </div>
  );
}

export default Page;
