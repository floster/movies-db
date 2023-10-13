const BEARER_KEY = import.meta.env.VITE_TMDB_BEARER_KEY;
const API_LANGUAGE = "en-US"; //"uk-UA";
const API_ADULTS = false;

// it's important to add prefix /react in import below
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  IAvailableListsTypes,
  IRawCollectionSearch,
  IRawListResponse,
  IRawSearchResponse,
  IAvailableListsOptions,
  ITile,
  IAvailableTileFields,
  IAvailableMediaHeroTypes,
  IAvailableMediaHeroFields,
  IMediaHeroData,
  IAvailableTrendingsTypes,
  IRawCollection,
  ICollection,
  IMovieCreditsNew,
  IRawMovieCredisResponse,
  IRawPersonCreditsResponse,
  IRawPersonCreditsMovieCast,
  IRawPersonCreditsTvCast,
  IRawSearchMultiResult,
  ISearchResultsMulti,
} from "../../types/tmdb.models";
import {
  formatCollectionNew,
  formatMediaHeroData,
  formatMovieCreditsNew,
  formatSearchResultsMulti,
  formatTiles,
} from "../../js/formatters";

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
    searchCollection: build.query<IRawCollectionSearch[], string>({
      query: (term: string) => ({
        url: `search/collection`,
        params: {
          query: term,
        },
      }),
      // transformResponse - callback that will be called after request
      // here transformResponse is used to get only 'results' from response
      transformResponse: (response: IRawSearchResponse<IRawCollectionSearch>) =>
        response.results,
    }),
    searchMulti: build.query<ISearchResultsMulti, string>({
      query: (term: string) => ({
        url: `search/multi`,
        params: {
          ...prepareParams,
          query: term,
        },
      }),
      // transformResponse - callback that will be called after request
      // here transformResponse is used to get only 'results' from response
      transformResponse: (
        response: IRawSearchResponse<IRawSearchMultiResult>
      ) => formatSearchResultsMulti(response),
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
      transformResponse: (response: IRawListResponse<IAvailableTileFields>) =>
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
      transformResponse: (response: IRawSearchResponse<IAvailableTileFields>) =>
        formatTiles(response.results),
    }),
    getCollection: build.query<ICollection, number>({
      query: (id) => ({
        url: `collection/${id}`,
        params: prepareParams,
      }),
      transformResponse: (response: IRawCollection) =>
        formatCollectionNew(response),
    }),
    getMovieCredits: build.query<IMovieCreditsNew, number>({
      query: (id) => ({
        url: `movie/${id}/credits`,
        params: prepareParams,
      }),
      transformResponse: (response: IRawMovieCredisResponse) =>
        formatMovieCreditsNew(response),
    }),
    getPersonMovieCredits: build.query<ITile[], number>({
      query: (id) => ({
        url: `person/${id}/movie_credits`,
        params: prepareParams,
      }),
      transformResponse: (
        response: IRawPersonCreditsResponse<IRawPersonCreditsMovieCast>
      ) => formatTiles(response.cast as IAvailableTileFields[]),
    }),
    getPersonTvCredits: build.query<ITile[], number>({
      query: (id) => ({
        url: `person/${id}/tv_credits`,
        params: prepareParams,
      }),
      transformResponse: (
        response: IRawPersonCreditsResponse<IRawPersonCreditsTvCast>
      ) => formatTiles(response.cast as IAvailableTileFields[]),
    }),
  }),
});

// useSearchMultiQuery - name that automatically generated by toolkit [*]
// 'SearchMulti' - method name in 'endpoints' callback that we choose
// 'Query' - build method
export const {
  useSearchMultiQuery,
  useSearchCollectionQuery,
  useGetListQuery,
  useGetMediaHeroQuery,
  useGetTrendingsQuery,
  useGetCollectionQuery,
  useGetMovieCreditsQuery,
  useGetPersonMovieCreditsQuery,
  useGetPersonTvCreditsQuery,
} = tmdbApi;
