import { TRawMovie, TRawSearchResponse } from "~/types/tmdb-raw.types";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();

  const term = getRouterParam(event, "term");

  const response: TRawSearchResponse<TRawMovie> = await $fetch(
    `${config.public.tmdbBaseUrl}/search/movie`,
    {
      params: {
        query: term,
      },
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${config.tmdbBearerToken}`,
      },
    }
  );

  return response.results;
});
