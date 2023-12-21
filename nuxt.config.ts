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
    "@pinia/nuxt",
    "@nuxtjs/tailwindcss",
    "@nuxt/image",
    "nuxt-icon",
    [
      "@nuxtjs/google-fonts",
      {
        families: {
          "Open Sans": [300, 400, 700],
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
