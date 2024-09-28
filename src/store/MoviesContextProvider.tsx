"use client";

import React, {
  useEffect,
  useState,
  createContext,
  useCallback,
  useMemo,
} from "react";

type Props = { children: any };

export const genres = [
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

export const tvgenres= [
  {
    "id": 10759,
    "name": "Action & Adventure"
  },
  {
    "id": 16,
    "name": "Animation"
  },
  {
    "id": 35,
    "name": "Comedy"
  },
  {
    "id": 80,
    "name": "Crime"
  },
  {
    "id": 99,
    "name": "Documentary"
  },
  {
    "id": 18,
    "name": "Drama"
  },
  {
    "id": 10751,
    "name": "Family"
  },
  {
    "id": 10762,
    "name": "Kids"
  },
  {
    "id": 9648,
    "name": "Mystery"
  },
  {
    "id": 10763,
    "name": "News"
  },
  {
    "id": 10764,
    "name": "Reality"
  },
  {
    "id": 10765,
    "name": "Sci-Fi & Fantasy"
  },
  {
    "id": 10766,
    "name": "Soap"
  },
  {
    "id": 10767,
    "name": "Talk"
  },
  {
    "id": 10768,
    "name": "War & Politics"
  },
  {
    "id": 37,
    "name": "Western"
  }
]

type MoviesContextType = {
  // movies
  moviesList: any[];
  setmoviesList: React.Dispatch<React.SetStateAction<any[]>>;
  trendingMoviesList: any[];
  setTrendingMoviesList: React.Dispatch<React.SetStateAction<any[]>>;
  topRatedMovies: any[];
  setTopRatedMovies: React.Dispatch<React.SetStateAction<any[]>>;
  popularMoviesList: any[];
  setPopularMovies: React.Dispatch<React.SetStateAction<any[]>>;
  // tv
  tvList: any[];
  setTvList: React.Dispatch<React.SetStateAction<any[]>>;
  trendingTvList: any[];
  setTrendingTvList: React.Dispatch<React.SetStateAction<any[]>>;
  topRatedTv: any[];
  setTopRatedTv: React.Dispatch<React.SetStateAction<any[]>>;
  popularTvList: any[];
  setPopularTv: React.Dispatch<React.SetStateAction<any[]>>;
};

export const MoviesContext = createContext<MoviesContextType>({
  // movies
  moviesList: [],
  setmoviesList: () => {},
  trendingMoviesList: [],
  setTrendingMoviesList: () => {},
  topRatedMovies: [],
  setTopRatedMovies: () => {},
  popularMoviesList: [],
  setPopularMovies: () => {},
  // tv
  tvList: [],
  setTvList: () => {},
  trendingTvList: [],
  setTrendingTvList: () => {},
  topRatedTv: [],
  setTopRatedTv: () => {},
  popularTvList: [],
  setPopularTv: () => {}
});

function MoviesContextProvider({ children }: Props) {
  // movies
  const [moviesList, setmoviesList] = useState<any[]>([]);
  const [trendingMoviesList, setTrendingMoviesList] = useState<any[]>([]);
  const [topRatedMovies, setTopRatedMovies] = useState<any[]>([]);
  const [popularMoviesList, setPopularMovies] = useState<any[]>([]);
  // tv
  const [tvList, setTvList] = useState<any[]>([]);
  const [trendingTvList, setTrendingTvList] = useState<any[]>([]);
  const [topRatedTv, setTopRatedTv] = useState<any[]>([]);
  const [popularTvList, setPopularTv] = useState<any[]>([]);


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

  //************************** */ Movies sections*************************

  const getData = useCallback(
    async (catnum: number) => {
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await fetch(
        `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${catnum}`,
        options,
      );
      const data = await response.json();
      return data.results;
    },
    [token],
  );

  const trendingMovies = useCallback(async () => {
    const response = await fetch(
      "https://api.themoviedb.org/3/trending/movie/day?language=en-US",
      apiOptions,
    );
    const data = await response.json();
    return data.results;
  }, [token]);

  const topratedmovies = useCallback(async () => {
    const response = await fetch(
      "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
      apiOptions,
    );
    const data = await response.json();
    return data.results;
  }, [token]);

  const popularmovies = useCallback(async () => {
    const response = await fetch(
      "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
      apiOptions,
    );
    const data = await response.json();
    return data.results;
  }, [token]);

  useEffect(() => {
    const fetchData = async () => {
      const promises = genres.map((genre) => getData(genre.id));
      const results = await Promise.all(promises);
      const newMovies = genres.map((genre, index) => ({
        genre: genre.name,
        movies: results[index],
      }));
      setmoviesList(newMovies);
    };
    const fetchTrendingMovies = async () => {
      const data = await trendingMovies();
      setTrendingMoviesList(data);
    };
    const fetchTopRatedMovies = async () => {
      const data = await topratedmovies();
      setTopRatedMovies(data);
    };
    const fetchPopularMovies = async () => {
      const data = await popularmovies();
      setPopularMovies(data);
    };

    fetchData();
    fetchTrendingMovies();
    fetchTopRatedMovies();
    fetchPopularMovies();
  }, [getData, trendingMovies, topratedmovies, popularmovies]);
  // useEffect(()=>{
  //   console.log(tvList,"line 305")
  // },[tvList])

  //************************** */ SHOWS sections*************************
  const shows = useCallback(async (catnum:number) => {
    const response = await fetch(
      `https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${catnum}`,
      apiOptions,
    );
    const data = await response.json();
    return data.results;
  }, [token],)

  const trendingShows = useCallback(async () => {
    const response = await fetch(
      "https://api.themoviedb.org/3/trending/tv/day?language=en-US",
      apiOptions,
    );
    const data = await response.json();
    return data.results;
  }, [token]);

  const topratedShows = useCallback(async () => {
    const response = await fetch(
      "https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1",
      apiOptions,
    );
    const data = await response.json();
    return data.results;
  }, [token]);

  const popularShows = useCallback(async () => {
    const response = await fetch(
      "https://api.themoviedb.org/3/tv/popular?language=en-US&page=1",
      apiOptions,
    );
    const data = await response.json();
    return data.results;
  }, [token]);

  useEffect(() => {
    const fetchData = async () => {
      const promises = tvgenres.map((genre) => shows(genre.id));
      const results = await Promise.all(promises);
      const newShows = tvgenres.map((genre, index) => ({
        genre: genre.name,
        shows: results[index],
      }));
      setTvList(newShows);
    };
    const fetchTrendingShows = async () => {
      const data = await trendingShows();
      setTrendingTvList(data);
    };
    const fetchTopRatedShows = async () => {
      const data = await topratedShows();
      setTopRatedTv(data);
    };
    const fetchPopularShows = async () => {
      const data = await popularShows();
      setPopularTv(data);
    };

    fetchData();
    fetchTrendingShows();
    fetchTopRatedShows();
    fetchPopularShows();
  }, [getData, trendingShows, topratedShows, popularShows]);


  const value = useMemo(
    () => ({
      // movies
      moviesList,
      setmoviesList,
      trendingMoviesList,
      setTrendingMoviesList,
      topRatedMovies,
      setTopRatedMovies,
      popularMoviesList,
      setPopularMovies,
      // shows
      tvList,
      setTvList,
      trendingTvList,
      setTrendingTvList,
      topRatedTv,
      setTopRatedTv,
      popularTvList ,
      setPopularTv ,
    }),
    [
      // movies
      moviesList,
      setmoviesList,
      trendingMoviesList,
      setTrendingMoviesList,
      topRatedMovies,
      setTopRatedMovies,
      popularMoviesList,
      setPopularMovies,
      // shows
      tvList,
      setTvList,
      trendingTvList,
      setTrendingTvList,
      topRatedTv,
      setTopRatedTv,
      popularTvList ,
      setPopularTv ,
    ],
  );

  return (
    <MoviesContext.Provider value={value}>{children}</MoviesContext.Provider>
  );
}

const MemoizedMoviesContextProvider = React.memo(MoviesContextProvider);

export default MemoizedMoviesContextProvider;
