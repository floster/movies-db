// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  app: {
    head: {
      title: "MovieXplore",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width,initial-scale=1" },
      ],
    },
  },
  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxt/image",
    [
      "@nuxtjs/google-fonts",
      {
        families: {
          Afacad: true,
          "Crimson Pro": true,
        },
      },
    ],
  ],
  runtimeConfig: {
    tmdbBearerToken: "",
    public: {
      tmdbBaseUrl: "",
      tmdbImagesBaseUrl: "",
    },
  },
});
