import { TRawSearchResponse } from "~/types/tmdb-raw.types";
import {
  TAvailableSearchsFields,
  EAvailableSearchTypes,
} from "~/types/tmdb.types";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();

  const type = getRouterParam(event, "type");
  const { query, page } = getQuery(event);

  const response: TRawSearchResponse<TAvailableSearchsFields> = await $fetch(
    `${config.public.tmdbBaseUrl}/search/${type}`,
    {
      params: {
        query,
        page,
      },
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${config.tmdbBearerToken}`,
      },
    }
  );

  return response;
});
