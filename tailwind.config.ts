import type { Config } from "tailwindcss";

export default <Partial<Config>>{
  content: ["docs/content/**/*.md"],
  theme: {
    fontFamily: {
      sans: ["Afacad", "sans-serif"],
      serif: ["Crimson Pro", "serif"],
    },
    extend: {
      backgroundImage: {
        header:
          "linear-gradient( 200deg, hsl(200, 96%, 15%) 30%, hsl(200, 95%, 25%) 100% )",
      },
    },
  },
  plugins: [require("daisyui")],
};
