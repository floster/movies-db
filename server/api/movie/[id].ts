export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();

  const id = getRouterParam(event, "id");

  const response = await $fetch(`${config.public.tmdbBaseUrl}/movie/${id}`, {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${config.tmdbBearerToken}`,
    },
  });

  return response;
});
