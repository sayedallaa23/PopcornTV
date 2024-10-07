"use client";
import { Authcontext } from "@/store/AuthContext";
import { useRouter } from "next/navigation";
import React, { useDebugValue, useEffect, useState } from "react";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc,
  setDoc,
  deleteDoc,
  DocumentData,
} from "firebase/firestore";
import { db, auth } from "../../store/firebase";
import Link from "next/link";
import Image from "next/image";
import { FaImdb } from "react-icons/fa6";
type Props = {};

function ProfilePage({}: Props) {
  const authContext = React.useContext(Authcontext);
  const router = useRouter();
  // if (!authContext?.isSignin) {
  //   router.push("/login");
  // }

  const [moviesWatchList, setMoviesWatchList] = useState([]);
  const [moviesFavoritesList, setMoviesFavoritesList] = useState([]);
  const [showsWatchList, setShowsWatchList] = useState([]);
  const [showsFavoritesList, setShowsFavoritesList] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      const username = String(auth.currentUser?.email);
      const usersRef = doc(db, "users", username);
      const userDoc = await getDoc(usersRef);
      if (userDoc.exists()) {
        const userData = userDoc.data();
        setMoviesWatchList(userData.moviesWatchList || []);
        setMoviesFavoritesList(userData.moviesFavoritesList || []);
        setShowsWatchList(userData.showsWatchList || []);
        setShowsFavoritesList(userData.showsFavoritesList || []);
      }
    };
    fetchUserData();
  }, []);

  return (
    <div className="login-container mx-auto my-[10%] mb-[10%] w-[90%] text-white md:w-[84%]">
      <div className="movies-section relative my-[10%] border-[1px] border-[#262626] px-[15px] py-[3rem]">
        <div className="absolute left-[2.5rem] top-[-1.2rem] w-fit rounded-[8px] bg-[#E50000] px-[20px] py-[8px] lg:block">
          Movies
        </div>
        <div className="relative mx-3">
          <h1 className="my-3 ml-2 text-[20px]">Watch List</h1>
          <div className="scrollable-element-red flex overflow-x-scroll rounded-[10px]">
            {moviesWatchList.length > 0 ? (
              moviesWatchList.map((movie: any, index: number) => (
                <Link
                  href={`/media/movies/${movie.itemID}`}
                  className="m-2 rounded-md"
                  key={index}
                >
                  <div className="bg-[#1A1A1A] p-[20px]">
                    <Image
                      className="h-[95%] w-[100%] rounded-[10px] object-cover"
                      src={`https://image.tmdb.org/t/p/original${movie.poster}`}
                      width={100}
                      height={100}
                      alt={""}
                    />
                    <div className="mt-[10px] flex items-center justify-between text-[10px] text-[#999999]">
                      <p>{movie.release}</p>
                      <div className="flex items-center justify-between">
                        <FaImdb className="mr-[5px] text-[20px]" />
                        <p>{movie.vote.toFixed(1)}</p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <h1>No movies available</h1>
            )}
          </div>
          <h1 className="my-3 ml-2 text-[20px]">Favorites</h1>
          <div className="scrollable-element-red flex overflow-x-scroll rounded-md">
            {moviesFavoritesList.length > 0 ? (
              moviesFavoritesList.map((movie: any, index: number) => (
                <Link
                  href={`/media/movies/${movie.itemID}`}
                  className="m-2 rounded-[10px] bg-[#1A1A1A]"
                  key={index}
                >
                  <div className="bg-[#1A1A1A] p-[20px]">
                    <Image
                      className="h-[95%] w-[100%] rounded-[10px] object-cover"
                      src={`https://image.tmdb.org/t/p/original${movie.poster}`}
                      width={100}
                      height={100}
                      alt={""}
                    />
                    <div className="mt-[10px] flex items-center justify-between text-[10px] text-[#999999]">
                      <p>{movie.release}</p>
                      <div className="flex items-center justify-between">
                        <FaImdb className="mr-[5px] text-[20px]" />
                        <p>{movie.vote.toFixed(1)}</p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <h1>No movies available</h1>
            )}
          </div>
        </div>
      </div>
      <div className="movies-section relative my-[10%] border-[1px] border-[#262626] px-[15px] py-[3rem]">
        <div className="absolute left-[2.5rem] top-[-1.2rem] w-fit rounded-[8px] bg-[#E50000] px-[20px] py-[8px] lg:block">
          Shows
        </div>
        <div className="relative mx-3">
          <h1 className="my-3 ml-2 text-[20px]">Watch List</h1>
          <div className="scrollable-element-red flex overflow-x-scroll rounded-[10px]">
            {showsWatchList.length > 0 ? (
              showsWatchList.map((movie: any, index: number) => (
                <Link
                  href={`/media/shows/${movie.itemID}`}
                  className="m-2 rounded-md"
                  key={index}
                >
                  <div className="bg-[#1A1A1A] p-[20px]">
                    <Image
                      className="h-[95%] w-[100%] rounded-[10px] object-cover"
                      src={`https://image.tmdb.org/t/p/original${movie.poster}`}
                      width={100}
                      height={100}
                      alt={""}
                    />
                    <div className="mt-[10px] flex items-center justify-between text-[10px] text-[#999999]">
                      <p>{movie.release}</p>
                      <div className="flex items-center justify-between">
                        <FaImdb className="mr-[5px] text-[20px]" />
                        <p>{movie.vote.toFixed(1)}</p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <h1>No Shows available</h1>
            )}
          </div>
          <h1 className="my-3 ml-2 text-[20px]">Favorites</h1>
          <div className="scrollable-element-red flex overflow-x-scroll rounded-md">
            {showsFavoritesList.length > 0 ? (
              showsFavoritesList.map((movie: any, index: number) => (
                <Link
                  key={index}
                  href={`/media/shows/${movie.itemID}`}
                  className="m-2 rounded-[10px] bg-[#1A1A1A]"
                >
                  <div className="bg-[#1A1A1A] p-[20px]">
                    <Image
                      className="h-[95%] w-[100%] rounded-[10px] object-cover"
                      src={`https://image.tmdb.org/t/p/original${movie.poster}`}
                      width={100}
                      height={100}
                      alt={""}
                    />
                    <div className="mt-[10px] flex items-center justify-between text-[10px] text-[#999999]">
                      <p>{movie.release}</p>
                      <div className="flex items-center justify-between">
                        <FaImdb className="mr-[5px] text-[20px]" />
                        <p>{movie.vote.toFixed(1)}</p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <h1>No Shows available</h1>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
