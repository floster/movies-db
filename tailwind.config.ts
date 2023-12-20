import type { Config } from "tailwindcss";

export default <Partial<Config>>{
  content: ["docs/content/**/*.md"],
  theme: {
    fontFamily: {
      sans: ["Merriweather Sans", "sans-serif"],
    },
    extend: {
      backgroundImage: {
        header:
          "linear-gradient( 220deg, #200451 50%, #3b0970, #69068c, #781e7b, #3c13b4 )",
        "body-dark": "linear-gradient( 290deg, #0f172a, #1e1b4b, #020617)",
        "body-light": "linear-gradient( 110deg, #eef2ff, #f0f9ff, #fdf4ff)",
      },
    },
  },
  plugins: [require("daisyui")],
};
