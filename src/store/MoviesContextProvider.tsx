// "use client";

// import React, { useEffect, useState, createContext } from "react";
// type Props = { children: any };
// export const genres = [
//   {
//     id: 28,
//     name: "Action",
//   },
//   {
//     id: 12,
//     name: "Adventure",
//   },
//   {
//     id: 16,
//     name: "Animation",
//   },
//   {
//     id: 35,
//     name: "Comedy",
//   },
//   {
//     id: 80,
//     name: "Crime",
//   },
//   {
//     id: 99,
//     name: "Documentary",
//   },
//   {
//     id: 18,
//     name: "Drama",
//   },
//   {
//     id: 10751,
//     name: "Family",
//   },
//   {
//     id: 14,
//     name: "Fantasy",
//   },
//   {
//     id: 36,
//     name: "History",
//   },
//   {
//     id: 27,
//     name: "Horror",
//   },
//   {
//     id: 10402,
//     name: "Music",
//   },
//   {
//     id: 9648,
//     name: "Mystery",
//   },
//   {
//     id: 10749,
//     name: "Romance",
//   },
//   {
//     id: 878,
//     name: "Science Fiction",
//   },
//   {
//     id: 10770,
//     name: "TV Movie",
//   },
//   {
//     id: 53,
//     name: "Thriller",
//   },
//   {
//     id: 10752,
//     name: "War",
//   },
//   {
//     id: 37,
//     name: "Western",
//   },
// ];
// type MoviesContextType = {
//   moviesList: any[];
//   setmoviesList: React.Dispatch<React.SetStateAction<any[]>>;
// };
// export const MoviesContext = createContext<MoviesContextType>({
//   moviesList: [],
//   setmoviesList: () => {},
// });
// function MoviesContextProvider({ children }: Props) {
//   const [moviesList, setmoviesList] = useState<any[]>([]);
//   const token = process.env.NEXT_PUBLIC_TOKEN;

//   if (!token) {
//     throw new Error("Authorization token is missing");
//   }

//   const getData = async (catnum: number) => {
//     const options = {
//       method: "GET",
//       headers: {
//         accept: "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//     };
//     const response = await fetch(
//       `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${catnum}`,
//       options,
//     );
//     const data = await response.json();
//     return data.results;
//   };

//   // useEffect(() => {
//     const fetchData = async () => {
//       const newMovies = [];
//       for (const genre of genres) {
//         const data = await getData(genre.id);
//         newMovies.push({ genre: genre.name, movies: data });
//       }
//       setmoviesList(newMovies);
//     };
//     fetchData();
//   // }, [genres]);


//   return (
//     <MoviesContext.Provider value={{ moviesList, setmoviesList }}>
//       {children}
//     </MoviesContext.Provider>
//   );
// }

// export default MoviesContextProvider;

"use client";

import React, { useEffect, useState, createContext, useCallback, useMemo } from "react";

type Props = { children: any };

// export const genres = [...];
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

type MoviesContextType = {
  moviesList: any[];
  setmoviesList: React.Dispatch<React.SetStateAction<any[]>>;
};

export const MoviesContext = createContext<MoviesContextType>({
  moviesList: [],
  setmoviesList: () => {},
});

function MoviesContextProvider({ children }: Props) {
  const [moviesList, setmoviesList] = useState<any[]>([]);
  const token = process.env.NEXT_PUBLIC_TOKEN;

  if (!token) {
    throw new Error("Authorization token is missing");
  }

  const getData = useCallback(async (catnum: number) => {
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
    fetchData();
  }, [getData, genres]);

  const value = useMemo(() => ({ moviesList, setmoviesList }), [moviesList, setmoviesList]);
  // useEffect(()=>{
  //   console.log(moviesList)
  // },[moviesList])
  return (
    <MoviesContext.Provider value={value}>
      {children}
    </MoviesContext.Provider>
  );
}

const MemoizedMoviesContextProvider = React.memo(MoviesContextProvider);

export default MemoizedMoviesContextProvider;
