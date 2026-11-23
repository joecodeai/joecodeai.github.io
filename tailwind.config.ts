import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      screens: { desk: { raw: "(min-width: 1024px) and (min-height: 760px)" } },
      colors: {
        ink: "#0a0a0b",
        coal: "#121214",
        line: "#26262a",
        paper: "#ece9e2",
        mute: "#8d8a83",
        signal: "#ff4f1f",
        cool: "#8fd3ff",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "monospace"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
      },
      letterSpacing: { tightest: "-0.055em" },
    },
  },
  plugins: [],
};

export default config;
