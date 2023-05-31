export interface RawMovie {
  id: number;
  title: string;
  overview: string;
  genre_ids: number[];
  release_date: Date;
  backdrop_path: string;
  poster_path: string;
  vote_average: number;
}

export interface Movie {
  id: number;
  title: string;
  overview: string;
  genres: number[];
  released: Date;
  votes: number;
  poster: string;
  backdrop: string;
}
