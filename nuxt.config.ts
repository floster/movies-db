// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "@nuxt/ui",
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
