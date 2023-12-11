import type { Config } from "tailwindcss";

export default <Partial<Config>>{
  content: ["docs/content/**/*.md"],
  theme: {
    fontFamily: {
      sans: ["Afacad", "sans-serif"],
      serif: ["Crimson Pro", "serif"],
    },
  },
};
