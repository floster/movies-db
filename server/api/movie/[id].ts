import { TRawMovie } from "~/types/tmdb-raw.types";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();

  const id = getRouterParam(event, "id");

  const response: TRawMovie = await $fetch(
    `${config.public.tmdbBaseUrl}/movie/${id}`,
    {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${config.tmdbBearerToken}`,
      },
    }
  );

  return response;
});
