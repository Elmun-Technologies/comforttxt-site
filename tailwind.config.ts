import type { Config } from "tailwindcss";

/**
 * Comfort Textile brand system
 *
 * Primary corporate colour: #283593 (blue)
 * Primary warm neutral:    #F9F5EC (cream)
 *
 * The blue scale follows the approved 100 / 80 / 60 / 40 / 20% guidebook
 * tints. Semantic aliases keep the visual identity consistent throughout the
 * storefront and back-office without tying components to a raw colour value.
 *
 * Note: an earlier "atelier" pass introduced a copper/bronze accent and a
 * desaturated "ink" navy that were NOT part of the supplied brand guidebook.
 * Those have been removed; everything now stays strictly within the
 * corporate blue + cream palette. The "charcoal" dark-surface aliases are
 * darkened tints of the same corporate blue, not a new hue.
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
        lg: "10px",
        xl: "14px",
        "2xl": "18px",
        "3xl": "26px",
      },
      fontFamily: {
        // Brand typeface — Exo 2, loaded via `next/font/local` in
        // `src/lib/fonts.ts` and exposed as the `--font-exo2` CSS variable on
        // `<html>`. Both roles point at the same font: Exo 2's own weight
        // range (100–900) already covers the body/display contrast this
        // storefront needs, so there is no separate serif fallback anymore.
        sans: [
          "var(--font-exo2)",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
        display: [
          "var(--font-exo2)",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Arial",
          "sans-serif",
        ],
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "Consolas", "monospace"],
      },
      boxShadow: {
        brand: "0 24px 48px -16px rgba(13, 18, 52, 0.35)",
        "brand-sm": "0 8px 24px -8px rgba(40, 53, 147, 0.25)",
        "card-hover": "0 24px 48px -20px rgba(13, 18, 52, 0.4)",
        "accent-glow": "0 10px 30px -10px rgba(40, 53, 147, 0.5)",
      },
      backgroundImage: {
        "hero-grain":
          "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E\")",
      },
      animation: {
        "fade-in-up": "fadeInUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "fade-in": "fadeIn 0.5s ease-out forwards",
        "zoom-in": "zoomIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "marquee": "marquee 32s linear infinite",
        "marquee-slow": "marquee 48s linear infinite",
        "float-slow": "floatSlow 7s ease-in-out infinite",
        "pulse-dot": "pulseDot 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
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
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        floatSlow: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        pulseDot: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.35" },
        },
      },
      letterSpacing: {
        widest2: "0.28em",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
