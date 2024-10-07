"use client";
import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { Authcontext } from "@/store/AuthContext";

type Props = {
  searchParams: any;
};

function SearchPage({ searchParams }: Props) {
  const [searchResults, setSearchResults] = useState([]);
  const token = process.env.NEXT_PUBLIC_TOKEN;
  const authContext = React.useContext(Authcontext);
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
  const getSearchData = useCallback(async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/multi?query=${searchParams.q}&include_adult=false&language=en-US&page=1`,
      apiOptions,
    );
    const data = await response.json();
    return data.results;
  }, [token, apiOptions, searchParams.q]);

  useEffect(() => {
    const fetchSearchResults = async () => {
      const data = await getSearchData();
      setSearchResults(data);
    };
    fetchSearchResults();
  }, [getSearchData]);

  useEffect(() => {
    console.log(authContext?.isSignin, "line 45");
  }, [authContext]);
  return (
    <div className="search-page mx-auto w-[90%] text-white md:w-[84%]">
      {searchResults
        .filter(
          (par: any) => par.poster_path != null || par.profile_path != null,
        )
        .map((res: any, index: any) => (
          <div
            className="my-5 flex w-full items-start rounded-[10px] border-[1px] border-[#262626] bg-[#1A1A1A] p-5"
            key={index}
          >
            <div className="w-1/3 flex-shrink-0 rounded-[10px]">
              <Link
                href={
                  res?.media_type === "person"
                    ? `/people/${res.id}`
                    : `/media/${res?.media_type === "movie" ? "movies/" + res?.id : "shows/" + res.id}`
                }
                className="block w-full"
              >
                <Image
                  src={`https://image.tmdb.org/t/p/original${res?.poster_path || res?.profile_path}`}
                  alt=""
                  width={150}
                  height={225}
                  className="w-full rounded-[10px] object-cover transition-all duration-75 hover:scale-105"
                />
              </Link>
            </div>
            <div className="m-3 mx-7 flex-grow">
              <div className="name">
                {res?.name || res?.original_title || res?.original_name}
              </div>
              <div className="overview md:text-md text-[#999999]">
                {res?.overview || ""}
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}

export default SearchPage;
