interface Genre {
  id: number;
  name: string;
}

export interface RawMovie {
  id: number;
  title: string;
  tagline: string;
  overview: string;
  genres: Genre[];
  release_date: Date;
  backdrop_path: string;
  poster_path: string;
  vote_average: number;
}

export interface Movie {
  id: number;
  title: string;
  tagline: string,
  overview: string;
  genres: Genre[];
  released: Date;
  votes: number;
  poster: string;
  backdrop: string;
}

export interface ListData {
  movies: Movie[],
  page: number,
  pages: number
}

// <AppSelect> component should recieve an array with following items:
export interface SelectOptions {
  title: String;
  value: MovieListTypes;
}

// possible Movie List types to get from TMDB
export type MovieListTypes = 'top_rated' | 'popular' | 'upcoming' | 'now_playing';