/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#0F3D3E",
          50: "#E8F2F2",
          100: "#D1E5E5",
        },
        accent: {
          DEFAULT: "#C1440E",
          50: "#FBEDE6",
          100: "#F6D5C4",
        },
        "accent-light": "#D9A441",
        background: "#FBF3E7",
        surface: "#FFFFFF",
        body: "#3F4B4A",
        muted: "#6B7280",
      },
      fontFamily: {
        serif: ['"Playfair Display"', "Georgia", "serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 8px 24px rgba(15, 61, 62, 0.08)",
        search: "0 16px 40px rgba(15, 61, 62, 0.12)",
      },
      letterSpacing: {
        eyebrow: "0.18em",
      },
    },
  },
  plugins: [],
};
