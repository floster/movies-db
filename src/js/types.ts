interface genre {
  id: number;
  name: string;
}

export interface RawMovie {
  id: number;
  title: string;
  tagline: string;
  overview: string;
  genres: genre[];
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
  genres: genre[];
  released: Date;
  votes: number;
  poster: string;
  backdrop: string;
}

export interface Populars {
  movies: Movie[],
  page: number,
  pages: number
}

export interface MoviePage {
  page: number;
  movies: Movie[];
}
