const BEARER_KEY = import.meta.env.VITE_TMDB_BEARER_KEY

// it's important to add prefix /react in import below
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
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
  IAvailableFavoritesTypes,
  IRawTv,
  IRawTvSeasonResponse,
  IAvalableLocales,
} from '../../types/tmdb.models'
import {
  formatCollectionNew,
  formatMediaHeroData,
  formatMovieCreditsNew,
  formatSearchResultsCollection,
  formatSearchResultsMulti,
  formatTile,
  formatTiles,
} from '../../utils/formatters'
import { TMDB_FETCH_OPTIONS } from '../../config'

const API_ADULTS = false

// set headers for all requests, main goal is to set Authorization header
const prepareHeaders = (headers: Headers) => {
  headers.set('Accept', 'application/json')
  headers.set('Authorization', `Bearer ${BEARER_KEY}`)
  return headers
}

// set params for all requests
const prepareParams = (params: Record<string, any>) => {
  params['include_adult'] = API_ADULTS
  return new URLSearchParams(params).toString()
}

export const tmdbApi = createApi({
  // It specifies the slice name in the Redux store where the generated API slice reducer will be mounted.
  // This is useful when you have multiple API slices in your application.
  reducerPath: 'tmdb_api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.themoviedb.org/3/',
    prepareHeaders: prepareHeaders,
    paramsSerializer: prepareParams,
  }),

  endpoints: build => ({
    // <T, Q>: T - what will be returned; Q - type of param that'll be provided by us
    searchCollection: build.query<ITile[] | [], string>({
      query: (term: string) => ({
        url: `search/collection`,
        params: {
          query: term,
        },
      }),
      // transformResponse - callback that will be called after request
      // here transformResponse is used to get only 'results' from response
      transformResponse: (response: IRawSearchResponse<IRawCollectionSearch>) =>
        formatSearchResultsCollection(response.results),
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
    getMediaTile: build.query<
      ITile,
      { type: IAvailableFavoritesTypes; id: number; locale: IAvalableLocales }
    >({
      query: ({ type, id, locale }) => ({
        url: `${type}/${id}`,
        params: {
          language: locale,
        },
      }),
      transformResponse: (response: IAvailableTileFields) =>
        formatTile(response),
    }),
    getList: build.query<
      ITile[],
      { option: IAvailableListsOptions; locale: IAvalableLocales }
    >({
      query: ({ option, locale }) => {
        const type = option.split(':')[0] as 'movie' | 'tv'
        const list = option.split(':')[1] as IAvailableListsTypes

        return {
          url: `${type}/${list}`,
          params: {
            language: locale,
          },
        }
      },
      // return only 'results' from response
      transformResponse: (response: IRawListResponse<IAvailableTileFields>) =>
        formatTiles(response.results),
    }),
    getMediaHero: build.query<
      IMediaHeroData,
      {
        type: IAvailableMediaHeroTypes
        id: number
        locale: IAvalableLocales
      }
    >({
      query: ({ type, id, locale }) => ({
        url: `${type}/${id}`,
        params: {
          language: locale,
        },
      }),
      transformResponse: (response: IAvailableMediaHeroFields) =>
        formatMediaHeroData(response),
    }),
    getTrendings: build.query<
      ITile[],
      { type: IAvailableTrendingsTypes; locale: IAvalableLocales }
    >({
      query: ({ type, locale }) => ({
        url: `trending/${type}/week`,
        params: {
          language: locale,
        },
      }),
      transformResponse: (response: IRawSearchResponse<IAvailableTileFields>) =>
        formatTiles(response.results),
    }),
    getCollection: build.query<
      ICollection,
      { id: number; locale: IAvalableLocales }
    >({
      query: ({ id, locale }) => ({
        url: `collection/${id}`,
        params: {
          language: locale,
        },
      }),
      transformResponse: (response: IRawCollection) =>
        formatCollectionNew(response),
    }),
    getMovieCredits: build.query<
      IMovieCreditsNew,
      { id: number; locale: IAvalableLocales }
    >({
      query: ({ id, locale }) => ({
        url: `movie/${id}/credits`,
        params: {
          language: locale,
        },
      }),
      transformResponse: (response: IRawMovieCredisResponse) =>
        formatMovieCreditsNew(response),
    }),
    getPersonMovieCredits: build.query<
      ITile[],
      { id: number; locale: IAvalableLocales }
    >({
      query: ({ id, locale }) => ({
        url: `person/${id}/movie_credits`,
        params: {
          language: locale,
        },
      }),
      transformResponse: (
        response: IRawPersonCreditsResponse<IRawPersonCreditsMovieCast>
      ) => formatTiles(response.cast as IAvailableTileFields[]),
    }),
    getPersonTvCredits: build.query<
      ITile[],
      { id: number; locale: IAvalableLocales }
    >({
      query: ({ id, locale }) => ({
        url: `person/${id}/tv_credits`,
        params: {
          language: locale,
        },
      }),
      transformResponse: (
        response: IRawPersonCreditsResponse<IRawPersonCreditsTvCast>
      ) => formatTiles(response.cast as IAvailableTileFields[]),
    }),
    getTvEpisodes: build.query<
      IRawTvSeasonResponse[],
      { id: number; locale: IAvalableLocales }
    >({
      queryFn: async ({ id, locale }) => {
        // fetch tv series data,
        // just in purpose to check how much episodes the tv series has
        const _tvResponse = await fetch(
          `https://api.themoviedb.org/3/tv/${id}?language=${locale}`,
          TMDB_FETCH_OPTIONS
        )

        // in case if tv series not found or wrong id -> throw error
        if (!_tvResponse.ok) {
          throw new Error(`Error: TV Series with ID: ${id} not found`)
        }

        // get tv series data
        const _tv: IRawTv = await _tvResponse.json()

        // fetch all seasons of tv series "at once"
        const _seasons = await Promise.all(
          Array(_tv.number_of_seasons)
            .fill(1)
            .map(async (_, idx) => {
              const _seasonResponse = await fetch(
                `https://api.themoviedb.org/3/tv/${id}/season/${
                  idx + 1
                }?language=${locale}`,
                TMDB_FETCH_OPTIONS
              )

              if (!_seasonResponse.ok)
                throw new Error(
                  `Error: Episode with ID: ${
                    idx + 1
                  } of TV Series with ID: ${id} not found`
                )

              const _season: IRawTvSeasonResponse = await _seasonResponse.json()
              return _season
            })
        )

        return { data: _seasons }
      },
    }),
  }),
})

// useSearchMultiQuery - name that automatically generated by toolkit [*]
// 'SearchMulti' - method name in 'endpoints' callback that we choose
// 'Query' - build method
export const {
  useSearchMultiQuery,
  useSearchCollectionQuery,
  useLazyGetMediaTileQuery,
  useGetListQuery,
  useGetMediaHeroQuery,
  useGetTrendingsQuery,
  useGetCollectionQuery,
  useGetMovieCreditsQuery,
  useGetPersonMovieCreditsQuery,
  useGetPersonTvCreditsQuery,
  useGetTvEpisodesQuery,
} = tmdbApi
