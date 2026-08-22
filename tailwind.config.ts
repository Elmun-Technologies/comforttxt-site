import type { Config } from "tailwindcss";

/**
 * Comfort Textile brand system
 *
 * Primary corporate colour: #283593
 * Primary warm neutral:    #F9F5EC
 *
 * The blue scale follows the approved 100 / 80 / 60 / 40 / 20% guidebook
 * tints. Semantic aliases keep the visual identity consistent throughout the
 * storefront and back-office without tying components to a raw colour value.
 */
const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Semantic application colours
        background: "#F9F5EC",
        surface: "#FFFFFF",
        secondary: "#F2F3FA",
        border: "#D4D7E9",
        muted: "#6670A9",
        body: "#3B4675",
        heading: "#283593",
        accent: {
          DEFAULT: "#283593",
          hover: "#202A78",
          light: "#E8EAF6",
        },

        // Approved corporate-blue tint scale
        brand: {
          50: "#F5F6FC",
          100: "#E8EAF6",
          200: "#D4D7E9",
          300: "#A9AED3",
          400: "#7E86BE",
          500: "#535DA9",
          600: "#283593",
          700: "#222D7C",
          800: "#1C2567",
          900: "#151D52",
          950: "#0D1234",
        },

        // Approved warm-neutral tint scale
        cream: {
          50: "#FEFDFC",
          100: "#FCFBF7",
          200: "#FBF9F4",
          300: "#FAF7F0",
          400: "#F9F5EC",
        },

        // Existing semantic dark-surface aliases now use the brand navy scale.
        charcoal: {
          50: "#F5F6FC",
          100: "#E8EAF6",
          700: "#222D7C",
          800: "#1C2567",
          900: "#151D52",
          950: "#0D1234",
        },
      },
      borderRadius: {
        lg: "12px",
        xl: "16px",
        "2xl": "20px",
        "3xl": "24px",
      },
      fontFamily: {
        sans: [
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
        // A restrained editorial accent for the typographic fallback wordmark.
        // Replace with the supplied brand font through next/font/local when its
        // licensed files are added to the repository.
        display: ["Georgia", "Cambria", "Times New Roman", "serif"],
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "Consolas", "monospace"],
      },
      boxShadow: {
        brand: "0 12px 28px rgba(40, 53, 147, 0.16)",
        "brand-sm": "0 4px 14px rgba(40, 53, 147, 0.14)",
      },
      animation: {
        "fade-in-up": "fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "fade-in": "fadeIn 0.5s ease-out forwards",
        "zoom-in": "zoomIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards",
      },
      keyframes: {
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        zoomIn: {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
