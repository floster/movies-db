const BEARER_KEY = import.meta.env.VITE_TMDB_BEARER_KEY;
const API_LANGUAGE = "en-US"; //"uk-UA";
const API_ADULTS = false;

// it's important to add prefix /react in import below
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  IAvailableListsTypes,
  ITvSeriesListsTypes,
  ICollection,
  ICollectionPart,
  ICollectionSearch,
  IListResponse,
  IListResultMovie,
  IListResultTv,
  IMovieSearch,
  ISearchResponse,
  IAvailableListsOptions,
  ITile,
} from "../../types/tmdb.models";
import { formatTiles } from "../../js/formatters";

// set headers for all requests, main goal is to set Authorization header
const prepareHeaders = (headers: Headers) => {
  headers.set("Accept", "application/json");
  headers.set("Authorization", `Bearer ${BEARER_KEY}`);
  return headers;
};

// set params for all requests
// TODO: think about how to set language dynamically
const prepareParams = (params: Record<string, any>) => {
  params["language"] = API_LANGUAGE;
  params["include_adult"] = API_ADULTS;
  return new URLSearchParams(params).toString();
};

export const tmdbApi = createApi({
  // It specifies the slice name in the Redux store where the generated API slice reducer will be mounted.
  // This is useful when you have multiple API slices in your application.
  reducerPath: "tmdb_api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.themoviedb.org/3/",
    prepareHeaders: prepareHeaders,
    paramsSerializer: prepareParams,
  }),

  endpoints: (build) => ({
    // <T, Q>: T - what will be returned; Q - type of param that'll be provided by us
    searchCollection: build.query<ICollectionSearch[], string>({
      query: (term: string) => ({
        url: `search/collection`,
        params: {
          query: term,
        },
      }),
      // transformResponse - callback that will be called after request
      // here transformResponse is used to get only 'results' from response
      transformResponse: (response: ISearchResponse<ICollectionSearch>) =>
        response.results,
    }),
    getCollection: build.query<ICollection, number>({
      query: (collectionID: number) => ({
        url: `collection/${collectionID}`,
        params: prepareParams,
      }),
    }),
    searchMovie: build.query<IMovieSearch[], string>({
      query: (term: string) => ({
        url: `search/movie`,
        params: {
          query: term,
        },
      }),
      // transformResponse - callback that will be called after request
      // here transformResponse is used to get only 'results' from response
      transformResponse: (response: ISearchResponse<IMovieSearch>) =>
        response.results,
    }),
    getMovie: build.query<ICollectionPart, string>({
      query: (movieID: string) => ({
        url: `movie/${movieID}`,
        params: prepareParams,
      }),
    }),
    getList: build.query<ITile[], IAvailableListsOptions>({
      query: (option: IAvailableListsOptions) => {
        const type = option.split(":")[0] as "movie" | "tv";
        const list = option.split(":")[1] as IAvailableListsTypes;

        return {
          url: `${type}/${list}`,
          params: {
            ...prepareParams,
          },
        };
      },
      // return only 'results' from response
      transformResponse: (
        response: IListResponse<IListResultMovie & IListResultTv>
      ) => formatTiles(response.results, "movie", "id"),
    }),
    getMovieLists: build.query<IListResultMovie[], IAvailableListsTypes>({
      query: (type: IAvailableListsTypes) => ({
        url: `movie/${type}`,
        params: {
          ...prepareParams,
        },
      }),
      // return only 'results' from response
      transformResponse: (response: IListResponse<IListResultMovie>) =>
        response.results,
    }),
    getTvSeriesLists: build.query<IListResultTv[], ITvSeriesListsTypes>({
      query: (type: ITvSeriesListsTypes) => ({
        url: `tv/${type}`,
        params: {
          ...prepareParams,
        },
      }),
      // return only 'results' from response
      transformResponse: (response: IListResponse<IListResultTv>) =>
        response.results,
    }),
  }),
});

// useSearchMultiQuery - name that automatically generated by toolkit [*]
// 'SearchMulti' - method name in 'endpoints' callback that we choose
// 'Query' - build method
export const {
  useSearchMovieQuery,
  useSearchCollectionQuery,
  useLazyGetCollectionQuery,
  useLazyGetMovieQuery,
  useGetListQuery,
} = tmdbApi;
