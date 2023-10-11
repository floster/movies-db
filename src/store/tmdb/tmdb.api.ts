const BEARER_KEY = import.meta.env.VITE_TMDB_BEARER_KEY;
const API_LANGUAGE = "en-US"; //"uk-UA";
const API_ADULTS = false;

// it's important to add prefix /react in import below
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  IAvailableListsTypes,
  ICollectionSearch,
  IListResponse,
  IMovieSearch,
  ISearchResponse,
  IAvailableListsOptions,
  ITile,
  IAvailableTileFields,
  IAvailableMediaHeroTypes,
  IAvailableMediaHeroFields,
  IMediaHeroData,
  IAvailableTrendingsTypes,
} from "../../types/tmdb.models";
import { formatMediaHeroData, formatTiles } from "../../js/formatters";

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
      transformResponse: (response: IListResponse<IAvailableTileFields>) =>
        formatTiles(response.results),
    }),
    getMediaHero: build.query<
      IMediaHeroData,
      { type: IAvailableMediaHeroTypes; id: number }
    >({
      query: ({ type, id }) => ({
        url: `${type}/${id}`,
        params: prepareParams,
      }),
      transformResponse: (response: IAvailableMediaHeroFields) =>
        formatMediaHeroData(response),
    }),
    getTrendings: build.query<ITile[], IAvailableTrendingsTypes>({
      query: (type) => ({
        url: `trending/${type}/week`,
        params: prepareParams,
      }),
      transformResponse: (response: ISearchResponse<IAvailableTileFields>) =>
        formatTiles(response.results),
    }),
  }),
});

// useSearchMultiQuery - name that automatically generated by toolkit [*]
// 'SearchMulti' - method name in 'endpoints' callback that we choose
// 'Query' - build method
export const {
  useSearchMovieQuery,
  useSearchCollectionQuery,
  useGetListQuery,
  useGetMediaHeroQuery,
  useGetTrendingsQuery,
} = tmdbApi;
